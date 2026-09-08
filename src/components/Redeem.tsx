"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const LOCK_KEY = "purchased_p1-sim";

export default function Redeem() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "ok" | "err"; text: string }>({
    kind: "idle",
    text: "",
  });

  async function submit() {
    const c = code.trim();
    if (!c) {
      setStatus({ kind: "err", text: "请输入兑换码。" });
      return;
    }
    setStatus({ kind: "loading", text: "正在核验兑换码…" });
    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: c }),
      });
      const j = await res.json();
      if (j.ok) {
        localStorage.setItem(LOCK_KEY, "true");
        setStatus({ kind: "ok", text: "兑换成功！正在打开你的志愿结构体检报告…" });
        setTimeout(() => {
          window.location.href = "/tools/p1-simulator/report?t=" + Date.now();
        }, 900);
      } else if (j.reason === "used") {
        setStatus({ kind: "err", text: "这个兑换码已被使用过。每个兑换码只能兑换一次。" });
      } else if (j.reason === "invalid") {
        setStatus({ kind: "err", text: "兑换码无效或不存在，请核对后重新输入（格式：SIM-XXXX-XXXX）。" });
      } else {
        setStatus({ kind: "err", text: "兑换失败，请稍后重试。" });
      }
    } catch {
      setStatus({ kind: "err", text: "网络错误，请检查网络后重试。" });
    }
  }

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[520px] px-4 pb-24 pt-16">
        <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Redeem · 兑换码</p>
        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-[var(--p-fg)]">
          兑换你的志愿结构体检报告
        </h1>
        <p className="mt-2 text-sm text-[var(--p-secondary)]">
          在小红书购买的港学荟兑换码长这样：<span className="font-mono">SIM-XXXX-XXXX</span>。
          输入后自动解锁 Pro 模拟器的完整体检报告。
        </p>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="SIM-XXXX-XXXX"
            className="w-full rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-3 font-mono text-lg uppercase tracking-widest text-[var(--p-fg)] outline-none"
          />
          <button
            onClick={submit}
            disabled={status.kind === "loading"}
            className="mt-4 w-full rounded-[8px] bg-[var(--p-fg)] px-6 py-3 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
          >
            {status.kind === "loading" ? "核验中…" : "兑换"}
          </button>
          {status.kind === "ok" && (
            <p className="mt-4 rounded-[8px] bg-[var(--p-hl-bg)] px-4 py-3 text-sm font-bold text-[var(--p-hl-border)]">
              ✅ {status.text}
            </p>
          )}
          {status.kind === "err" && (
            <p className="mt-4 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm text-[#C2410C]">
              ⚠️ {status.text}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6 text-sm leading-relaxed text-[var(--p-secondary)]">
          <p className="font-bold text-[var(--p-fg)]">没有兑换码？</p>
          <p className="mt-1">
            可以<a className="underline" href="/tools/p1-simulator">在模拟器页直接支付解锁（Stripe）</a>。
            每个兑换码仅限使用一次；兑换成功后报告绑定当前浏览器，请勿清除浏览器数据。
          </p>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

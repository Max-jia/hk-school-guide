"use client";

import { useEffect, useState } from "react";
import { useLang, s2t } from "@/lib/zh";

// 付费墙（照搬正式站无后端模型：Stripe Payment Link + localStorage 解锁）
// - 未解锁：显示解锁卡（HK$99 全解锁 / HK$9.9 单份），付费章节隐藏
// - 已解锁：显示全部内容 + 分享按钮（token 链接）
export default function Paywall({
  slug,
  allAccessUrl,
  singleUrl,
}: {
  slug: string;
  allAccessUrl: string;
  singleUrl: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [pending, setPending] = useState(false); // SSR 首帧前的占位态
  const [lang] = useLang();
  const z = (s: string) => (lang === "tc" ? s2t(s) : s); // 繁体模式文案跟着转

  useEffect(() => {
    // 旧站逻辑：保存当前报告到 localStorage（unlock 页读取）
    localStorage.setItem("pending_report", slug);
    const ok =
      localStorage.getItem("purchased_" + slug) === "true" ||
      localStorage.getItem("all_access") === "true";
    setUnlocked(ok);
    setPending(true);
  }, [slug]);

  useEffect(() => {
    if (!pending) return;
    // 解锁后显示付费章节（照搬正式站 body.purchased → CSS 显示）
    const el = document.getElementById("premium-content");
    if (el) el.style.display = unlocked ? "block" : "none";
  }, [unlocked, pending]);

  /* 购买：向本站 API 要一个带支付凭证回跳的 Checkout 链接（防白嫖核心）
     本站 API 用 Stripe 密钥创建会话，价格服务端定死 */
  async function buy(mode: "all" | "single") {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, mode }),
      });
      const j = await res.json();
      if (j.url) {
        window.location.href = j.url; // 跳 Stripe 支付页
      } else {
        alert(z("支付通道暂时不可用，请稍后再试。"));
      }
    } catch {
      alert(z("网络异常，请稍后再试。"));
    }
  }

  /* 分享按钮：已购买用户 → 2 次完整解锁；未购买用户 → 普通报告页链接 */
  async function share() {
    try {
      const license =
        localStorage.getItem("license_all") ||
        localStorage.getItem("license_" + slug);
      const res = await fetch("/api/share/create", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug, license }),
      });
      const j = await res.json();
      if (!j.ok || !j.url) {
        alert(z("分享链接生成失败，请稍后再试。"));
        return;
      }
      await navigator.clipboard.writeText(j.url);
      alert(
        j.purchased
          ? z("已复制分享链接！可分享给 2 位朋友查看完整报告。")
          : z("已复制分享链接！朋友打开后将看到报告试读版。")
      );
    } catch {
      alert(z("网络异常，请稍后再试。"));
    }
  }

  if (!pending) return null; // SSR 首帧不渲染（防闪烁：内容默认隐藏，解锁卡先不显示）

  return (
    <div className="mt-8">
      <div className="text-center">
        <button
          onClick={share}
          className="inline-block rounded-[6px] border border-[var(--p-fg)] px-4 py-1.5 font-mono text-xs uppercase text-[var(--p-fg)] no-underline transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
        >
          {z("分享此报告 ↗")}
        </button>
      </div>

      {!unlocked && (
        <div className="mt-12 rounded-[6px] border-2 border-[var(--p-fg)] p-6 text-center">
          <p className="m-0 font-mono text-sm uppercase text-[var(--p-secondary)]">{z("试读结束")}</p>
          <p className="font-serif text-2xl font-bold text-[var(--p-fg)]">
            {z("解锁全部 8 章深度分析")}
          </p>
          <p className="text-[var(--p-secondary)]">
            {z("教学解读 · 升学通路 · 入读攻略 · 插班叩门 · 家庭画像 · 同类对比 · 专家总结")}
          </p>

          <div className="mt-6 rounded-[6px] bg-[var(--p-fg)] p-5 text-[var(--p-bg)]">
            <button
              onClick={() => buy("all")}
              className="block w-full cursor-pointer border-0 bg-transparent text-3xl font-bold text-[var(--p-bg)] no-underline"
            >
              HK$99 <span className="text-base font-normal opacity-80">{z("一键解锁全部报告")}</span>
            </button>
            <p className="m-0 mt-1 text-xs opacity-70">{z("126 份单买共约 HK$1,247")}</p>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => buy("single")}
              className="cursor-pointer rounded-[6px] border-2 border-[var(--p-fg)] px-6 py-2.5 font-bold text-[var(--p-fg)] no-underline transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
            >
              {z("HK$9.9 单份解锁 · 本报告")}
            </button>
          </div>
          <p className="mt-2 text-xs text-[var(--p-secondary)]">
            {z("解锁保存在当前浏览器 · 换手机或清缓存后需重新购买")}
          </p>
          <p className="mt-2 text-xs text-[var(--p-secondary)]">
            {z("支付成功后，在 Stripe 页面点「返回商家」即可自动解锁")}
          </p>
        </div>
      )}
    </div>
  );
}

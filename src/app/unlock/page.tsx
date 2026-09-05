"use client";

import { useEffect, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// 解锁页 v2（防白嫖版）：
// 只有 Stripe 支付成功后回跳（URL 带 session_id）才解锁
// 流程：Stripe 支付完成 → 自动跳回本页 → 本页调用共享支付后端（checkout-api）向 Stripe 核实
//       验证通过 → 写入解锁标记 → 跳回报告页
// 无 session_id 或验证失败 → 拒绝解锁（不再像旧版那样无条件放行）
export default function UnlockPage() {
  const [status, setStatus] = useState("正在验证支付…");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    const shareToken = params.get("token");
    const shareReport = params.get("report");

    // 分享链接：服务端核销一次额度（每份报告最多 2 人）
    if (shareToken && shareReport) {
      fetch("/api/share/redeem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: shareToken, slug: shareReport }),
      })
        .then((r) => r.json())
        .then((j) => {
          if (j.ok && j.slug) {
            localStorage.setItem("purchased_" + j.slug, "true");
            setStatus("分享解锁成功 · 已解锁「" + j.slug + "」· 正在打开…");
            setTimeout(() => {
              window.location.href = "/reports/" + j.slug + "?t=" + Date.now();
            }, 800);
          } else if (j.reason === "limit") {
            setStatus("此分享链接已达可查看人数上限（2 人），无法继续解锁。");
          } else {
            setStatus("分享链接无效或已失效。");
          }
        })
        .catch(() => setStatus("网络验证失败，请检查网络后重试。"));
      return;
    }

    // 没有支付凭证：直接拒绝，这是旧版白嫖的入口
    if (!sessionId) {
      setStatus("未检测到支付凭证。请从支付页面的「返回商家」按钮进入，或重新购买。");
      return;
    }

    // 本站 API 用 Stripe 密钥查这笔支付，返回的 report/mode 来自订单本身（伪造不了）
    const tryVerify = () =>
      fetch("/api/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      }).then((r) => r.json());

    // 微信/支付宝这类支付：网页跳回时「到账通知」可能还没到，自动重试等它
    let tries = 0;
    const maxTries = 10; // 10 次 × 4 秒 ≈ 等 40 秒

    const attempt = () => {
      tryVerify()
        .then((j) => {
          if (j.ok && j.report && j.license) {
            // 全解锁订单 → 解锁全部；单份订单 → 只解锁该报告
            if (j.mode === "all") {
              localStorage.setItem("all_access", "true");
              localStorage.setItem("license_all", j.license);
            } else {
              localStorage.setItem("purchased_" + j.report, "true");
              localStorage.setItem("license_" + j.report, j.license);
            }
            setStatus("支付验证通过 · 已解锁「" + j.report + "」· 正在打开…");
            setTimeout(() => {
              window.location.href = "/reports/" + j.report + "?t=" + Date.now();
            }, 800);
          } else if (tries < maxTries) {
            tries += 1;
            setStatus("支付确认中… 银行到账通知通常需要几秒，正在自动重试(" + tries + "/" + maxTries + ")");
            setTimeout(attempt, 4000);
          } else {
            setStatus("支付确认超时。钱款已在途中，请稍等片刻后刷新本页，即可自动解锁。");
          }
        })
        .catch(() => {
          if (tries < maxTries) {
            tries += 1;
            setTimeout(attempt, 4000);
          } else {
            setStatus("网络验证失败，请检查网络后重试。");
          }
        });
    };
    attempt();
  }, []);

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[560px] px-4 pb-24 pt-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-[var(--p-fg)]">
          {status.startsWith("支付验证通过") || status.startsWith("分享解锁成功")
            ? "✅ 支付成功！"
            : status.startsWith("支付确认中")
              ? "⏳ 正在确认支付…"
              : "⚠️ 无法解锁"}
        </h1>
        <p className="mt-3 text-[var(--p-secondary)]">{status}</p>
        <p className="mt-6 font-mono text-sm text-[var(--p-secondary)]">
          <a href="/reports" className="text-[var(--p-fg)] underline underline-offset-2">
            查看全部报告 →
          </a>
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}

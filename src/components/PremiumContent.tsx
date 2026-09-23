"use client";

import { useEffect, useState } from "react";
import { L, type Locale } from "@/lib/i18n";

// 付费章节（第 2-8 章）。
//
// 2026-09 审计修正：这段正文以前是用 <div style="display:none"> 直接写在静态 HTML 里的，
// 任何人「查看原始码」就能免费拿到；解锁判断也只读 localStorage 的 "true"。
// 现在改成向 /api/report-content 取——服务端会验 HMAC 签名 license，伪造不了。
//
// 渲染位置刻意跟旧版一模一样（同一个 wrapper 内的兄弟节点、同一个 id），
// 这样视觉与既有 CSS 完全不变，只是内容来源从「HTML 内嵌」换成「验签后下发」。

type State = "loading" | "ready" | "denied" | "error";

export default function PremiumContent({
  slug,
  license,
  locale = "tc",
}: {
  slug: string;
  license: string | null;
  locale?: Locale;
}) {
  const [state, setState] = useState<State>("loading");
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!license) {
      setState("denied");
      return;
    }

    let alive = true;
    fetch("/api/report-content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug, license }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (!alive) return;
        if (j.ok && j.html) {
          setHtml(j.html);
          setState("ready");
        } else {
          setState("error");
        }
      })
      .catch(() => {
        if (alive) setState("error");
      });

    return () => {
      alive = false;
    };
  }, [slug, license]);

  if (state === "loading") {
    return (
      <div className="mt-8 text-center font-mono text-sm text-[var(--p-secondary)]">
        {L("正在载入已解锁内容…", locale)}
      </div>
    );
  }

  // 没有凭证（正常情况：付费墙会盖在上面）；或凭证无效/过期
  if (state === "denied") return null;

  if (state === "error") {
    return (
      <div className="callout warn mt-8">
        <strong>{L("内容载入失败", locale)}</strong>
        <br />
        {L(
          "你的解锁凭证可能已过期，或网络暂时不通。凭证保存在本机浏览器，请先确认没有清理过浏览数据；若持续失败，请把下面这串凭证发给客服核对。",
          locale
        )}
        <br />
        <code className="mt-2 block break-all font-mono text-xs opacity-70">
          {license || "-"}
        </code>
      </div>
    );
  }

  return <div id="premium-content" dangerouslySetInnerHTML={{ __html: L(html, locale) }} />;
}

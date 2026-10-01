"use client";

import { useEffect, useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import { enhanceReportHtml, usesEditorialReportLayout } from "@/lib/report-html";

// 付费章节（第 2-8 章）。
//
// 2026-09 审计修正：这段正文以前是用 <div style="display:none"> 直接写在静态 HTML 里的，
// 任何人「查看原始码」就能免费拿到；解锁判断也只读 localStorage 的 "true"。
// 现在改成向 /api/report-content 取——服务端会验 HMAC 签名 license，伪造不了。
//
// 付费正文始终在服务端验签后下发。新版式只在授权后的渲染层增强内容。

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
      // Defensive client state only; the API independently rejects missing/invalid licenses.
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // No credential means the parent should leave the paywall in place.
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

  const localizedHtml = L(html, locale);
  const renderedHtml = usesEditorialReportLayout(slug) ? enhanceReportHtml(localizedHtml, locale, true) : localizedHtml;
  return <div id="premium-content" dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
}

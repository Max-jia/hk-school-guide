"use client";

import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Paywall from "@/components/Paywall";
import { useLang, s2t } from "@/lib/zh";

// 报告页渲染 + 简繁切换
// 点「繁」:整份报告(标题/评级/正文/付费章节)即时转成香港繁体,选择记在浏览器
export default function ReportViewer({
  slug,
  hero,
  body,
  premiumHtml,
  free,
  allAccessUrl,
  singleUrl,
  related = [],
}: {
  slug: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
  related?: { slug: string; title: string }[];
}) {
  const [lang, toggle] = useLang();
  const z = (s: string) => (lang === "tc" ? s2t(s) : s);

  // hero 里藏着老站的「繁」链接(指向不存在的 report-xxx-tc.html,点了就 404)
  // 渲染时把它原地变成切简繁的按钮:去掉跳转,点击由下面的事件委托接管
  const heroHtml = z(hero).replace(
    /<a href="\.\/report-[^"]*\.html"[^>]*>([^<]*)<\/a>/g,
    () => `<a data-zh-toggle="1">${lang === "tc" ? "簡" : "繁"}</a>`
  );

  // 事件委托:点击 hero 里的简繁切换按钮 → 切换语言,不跳转
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-zh-toggle]");
      if (el) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full">
      <SiteHeader />
      {/* hero 色带全宽(样式见 globals.css .report-hero 区) */}
      <div className="report-article" dangerouslySetInnerHTML={{ __html: heroHtml }} />
      {/* 正文(免费章节 HTML 原样渲染) */}
      <div className="mx-auto max-w-[960px] px-4 pb-24">
        <div className="report-body" dangerouslySetInnerHTML={{ __html: z(body) }} />

        {!free && (
          <>
            {/* 付费墙:未解锁显示解锁卡,解锁后显示付费章节(样式/逻辑见 components/Paywall.tsx) */}
            <Paywall slug={slug} allAccessUrl={allAccessUrl} singleUrl={singleUrl} />
            <div
              id="premium-content"
              style={{ display: "none" }}
              dangerouslySetInnerHTML={{ __html: z(premiumHtml) }}
            />
          </>
        )}

        {related.length > 0 && (
          <section className="mt-14 border-t border-black/15 pt-7 dark:border-white/15">
            <h2 className="font-serif text-xl font-bold text-[var(--p-gray-900)] dark:text-[var(--p-gray-100)]">
              相关报告
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`/reports/${r.slug}`}
                  className="block rounded-xl border border-black/10 bg-[var(--p-bg)] p-4 text-sm font-medium leading-snug text-[var(--p-gray-800)] no-underline transition-colors hover:border-black/25 hover:bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.04] dark:text-[var(--p-gray-200)] dark:hover:bg-white/[0.07]"
                >
                  {r.title}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

"use client";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Paywall from "@/components/Paywall";
import { L, LOCALE_META, localeHref, otherLocale, type Locale } from "@/lib/i18n";

// 报告页渲染。语言由 URL 决定(/reports/** = 繁體,/cn/reports/** = 简体),
// 不再用浏览器端 toggle——那样 Google 抓不到简体版本。
export default function ReportViewer({
  slug,
  hero,
  body,
  premiumHtml,
  free,
  allAccessUrl,
  singleUrl,
  related = [],
  locale = "tc",
}: {
  slug: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
  related?: { slug: string; title: string }[];
  locale?: Locale;
}) {
  const lang = locale;
  const z = (s: string) => L(s, locale);
  const switchUrl = localeHref(`/reports/${slug}`, otherLocale(locale));

  // hero 里藏着老站的「繁」链接(指向不存在的 report-xxx-tc.html,点了就 404)
  // 渲染时把它换成指向另一语言版本的真正链接(可被搜索引擎抓取)
  const heroHtml = z(hero).replace(
    /<a href="\.\/report-[^"]*\.html"[^>]*>([^<]*)<\/a>/g,
    () =>
      `<a href="${switchUrl}" hreflang="${LOCALE_META[otherLocale(locale)].hreflang}">${
        LOCALE_META[otherLocale(locale)].label
      }</a>`
  );

  return (
    <main className="w-full">
      <SiteHeader locale={locale} />
      {/* hero 色带全宽(样式见 globals.css .report-hero 区) */}
      <div className="report-article" dangerouslySetInnerHTML={{ __html: heroHtml }} />
      {/* 正文(免费章节 HTML 原样渲染) */}
      <div className="mx-auto max-w-[960px] px-4 pb-24">
        <div className="report-body" dangerouslySetInnerHTML={{ __html: z(body) }} />

        {!free && (
          <>
            {/* 付费墙:未解锁显示解锁卡,解锁后显示付费章节(样式/逻辑见 components/Paywall.tsx) */}
            <Paywall slug={slug} allAccessUrl={allAccessUrl} singleUrl={singleUrl} locale={locale} />
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
              {L("相关报告", locale)}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={localeHref(`/reports/${r.slug}`, locale)}
                  className="block rounded-xl border border-black/10 bg-[var(--p-bg)] p-4 text-sm font-medium leading-snug text-[var(--p-gray-800)] no-underline transition-colors hover:border-black/25 hover:bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.04] dark:text-[var(--p-gray-200)] dark:hover:bg-white/[0.07]"
                >
                  {L(r.title, locale)}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}

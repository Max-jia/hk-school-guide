"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Paywall from "@/components/Paywall";
import PremiumContent from "@/components/PremiumContent";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { readStoredLicense } from "@/lib/unlock-client";
import { buildEditorialHeroHtml, enhanceReportHtml, reportChapterItems, usesEditorialReportLayout } from "@/lib/report-html";
import { useReportTableOverflow } from "@/hooks/useReportTableOverflow";

// 报告页渲染。语言由 URL 决定(/reports/** = 繁體,/cn/reports/** = 简体),
// 不再用浏览器端 toggle——那样 Google 抓不到简体版本。
export default function ReportViewer({
  slug,
  hero,
  body,
  free,
  allAccessUrl,
  singleUrl,
  related = [],
  locale = "tc",
}: {
  slug: string;
  hero: string;
  body: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
  related?: { slug: string; title: string }[];
  locale?: Locale;
}) {
  const z = (s: string) => L(s, locale);
  const editorialReport = usesEditorialReportLayout(slug);
  const reportBodyRef = useRef<HTMLDivElement>(null);
  const localizedBody = z(body);
  const renderedBody = editorialReport
    ? enhanceReportHtml(localizedBody, locale, true)
    : localizedBody;
  const [chapterItems, setChapterItems] = useState(() => editorialReport ? reportChapterItems(renderedBody) : []);

  // 解锁状态：只认 localStorage 里的签名 license（见 lib/unlock-client.ts）。
  // 付费正文本身不在本页 HTML 里，要向 /api/report-content 验签换取——
  // 所以就算有人手动改 localStorage，也拿不到内容。
  const [license, setLicense] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    // Read the browser-only signed license after hydration to keep server/client markup aligned.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLicense(readStoredLicense(slug));
    setPending(true);
  }, [slug]);

  useReportTableOverflow(reportBodyRef);

  // Only chapters present in the rendered DOM appear in the index. Premium
  // chapter headings therefore become visible in the TOC only after the
  // signed-content endpoint has authorized and returned their HTML.
  useEffect(() => {
    if (!editorialReport) return;
    const root = reportBodyRef.current;
    if (!root) return;

    const updateChapters = () => {
      const next = [...root.querySelectorAll<HTMLElement>(".editorial-chapter[id]")].flatMap((chapter) => {
        const heading = chapter.querySelector<HTMLElement>(".chapter-rail h2");
        if (!heading || !chapter.id) return [];
        const titleHeading = heading.cloneNode(true) as HTMLElement;
        titleHeading.querySelectorAll(".num, .cal-badge").forEach((badge) => badge.remove());
        const title = titleHeading.textContent?.replace(/\s+/g, " ").trim();
        return title ? [{ id: chapter.id, title }] : [];
      });

      setChapterItems((current) => {
        if (current.length === next.length && current.every((item, index) => item.id === next[index]?.id && item.title === next[index]?.title)) {
          return current;
        }
        return next;
      });
    };

    updateChapters();
    const observer = new MutationObserver(updateChapters);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [editorialReport]);

  const heroHtml = editorialReport
    ? buildEditorialHeroHtml(hero, localizedBody, locale, free)
    : z(hero);

  return (
    <main className={`w-full${editorialReport ? " report-page--editorial" : ""}`} data-report-slug={slug}>
      <SiteHeader locale={locale} />
      {/* Editorial report rendering changes presentation only; premium content authorization stays separate. */}
      <div className="report-article" dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <div className={`report-page__content mx-auto max-w-[960px] px-4 pb-24${editorialReport ? " report-editorial__content" : ""}`}>
        <div className={editorialReport ? "report-layout" : undefined}>
          {editorialReport && (
            <nav
              className={`toc${chapterItems.length === 1 ? " toc--single" : chapterItems.length === 2 ? " toc--two" : ""}`}
              aria-label={L("报告目录", locale)}
            >
              <div className="toc-title">{L("目录", locale)}</div>
              <ol>
                {chapterItems.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a href={`#${chapter.id}`}>
                      <span className="report-toc__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span>{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article ref={reportBodyRef} className={editorialReport ? "report-document report-content" : "report-document"}>
            <div className="report-body" dangerouslySetInnerHTML={{ __html: renderedBody }} />

            {!free && (
              <div className={`report-page__access${editorialReport ? " report-editorial__access" : ""}`}>
                {/* Premium HTML remains server-authorized; the client only receives it after license verification. */}
                {pending && (
                  <div className="report-editorial__paywall">
                    <Paywall
                      slug={slug}
                      allAccessUrl={allAccessUrl}
                      singleUrl={singleUrl}
                      unlocked={license !== null}
                      locale={locale}
                    />
                  </div>
                )}
                {license && <PremiumContent slug={slug} license={license} locale={locale} />}
              </div>
            )}
          </article>
        </div>

        {related.length > 0 && (
          <section className={`mt-14 border-t border-black/15 pt-7 dark:border-white/15${editorialReport ? " report-editorial__related" : ""}`}>
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

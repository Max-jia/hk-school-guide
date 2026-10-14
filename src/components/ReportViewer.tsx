"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShortlistButton from "@/components/ShortlistButton";
import ReportVerificationPanel from "@/components/ReportVerificationPanel";
import ReportActionTimeline from "@/components/ReportActionTimeline";
import ReportParentQuestions from "@/components/ReportParentQuestions";
import ReportCommutePanel from "@/components/ReportCommutePanel";
import type { ReportCommuteInfo } from "@/lib/report-commute";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { buildEditorialHeroHtml, enhanceReportHtml, reportChapterItems, usesEditorialReportLayout } from "@/lib/report-html";
import { useReportTableOverflow } from "@/hooks/useReportTableOverflow";

// 报告页渲染。语言由 URL 决定(/reports/** = 繁體,/cn/reports/** = 简体),
// 不再用浏览器端 toggle——那样 Google 抓不到简体版本。
export default function ReportViewer({
  slug,
  hero,
  body,
  premiumHtml,
  related = [],
  locale = "tc",
  schoolName,
  shortlistKind,
  commuteInfo,
}: {
  slug: string;
  hero: string;
  body: string;
  premiumHtml: string;
  related?: { slug: string; title: string }[];
  locale?: Locale;
  schoolName: string;
  shortlistKind: "primary" | "kindergarten";
  commuteInfo: ReportCommuteInfo;
}) {
  const z = (s: string) => L(s, locale);
  const editorialReport = usesEditorialReportLayout(slug);
  const reportBodyRef = useRef<HTMLDivElement>(null);
  const localizedBody = z(body);
  const localizedPremiumHtml = z(premiumHtml);
  const completeBody = `${localizedBody}\n${localizedPremiumHtml}`;
  const renderedBody = editorialReport ? enhanceReportHtml(completeBody, locale, true) : completeBody;
  const [chapterItems, setChapterItems] = useState(() => editorialReport ? reportChapterItems(renderedBody) : []);

  useReportTableOverflow(reportBodyRef);

  // Only chapters present in the rendered DOM appear in the index.
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
    ? buildEditorialHeroHtml(hero, localizedBody, locale, true)
    : z(hero);

  return (
    <main className={`w-full${editorialReport ? " report-page--editorial" : ""}`} data-report-slug={slug}>
      <SiteHeader locale={locale} />
      {/* 所有报告章节均公开展示；付费标记只保留在历史数据中，不再作为访问限制。 */}
      <div className="report-article" dangerouslySetInnerHTML={{ __html: heroHtml }} />
      <div className={`report-page__content mx-auto max-w-[960px] px-4 pb-24${editorialReport ? " report-editorial__content" : ""}`}>
        <div className="mb-5">
          <ShortlistButton
            name={schoolName}
            kind={shortlistKind}
            href={`/reports/${slug}`}
            locale={locale}
          />
        </div>
        <ReportVerificationPanel body={localizedBody} kind={shortlistKind} locale={locale} />
        <ReportActionTimeline body={localizedBody} locale={locale} />
        <ReportParentQuestions schoolName={schoolName} locale={locale} />
        <ReportCommutePanel info={commuteInfo} locale={locale} />
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

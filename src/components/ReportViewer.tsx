"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ShortlistButton from "@/components/ShortlistButton";
import ReportVerificationPanel from "@/components/ReportVerificationPanel";
import ReportActionTimeline from "@/components/ReportActionTimeline";
import ReportParentQuestions from "@/components/ReportParentQuestions";
import ReportCommutePanel from "@/components/ReportCommutePanel";
import ReportSourcePanel from "@/components/ReportSourcePanel";
import type { ReportCommuteInfo } from "@/lib/report-commute";
import type { ReportSourceReference } from "@/lib/report-sources";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { buildEditorialHeroHtml, enhanceReportHtml, enhanceReportTables, reportChapterItems, usesEditorialReportLayout } from "@/lib/report-html";
import { useReportTableOverflow } from "@/hooks/useReportTableOverflow";
import { downloadReportPdf } from "@/lib/report-pdf";

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
  sourceReferences = [],
}: {
  slug: string;
  hero: string;
  body: string;
  premiumHtml: string;
  related?: { slug: string; title: string }[];
  locale?: Locale;
  schoolName: string;
  shortlistKind: "primary" | "kindergarten" | "secondary";
  commuteInfo: ReportCommuteInfo;
  sourceReferences?: ReportSourceReference[];
}) {
  const z = (s: string) => L(s, locale);
  const editorialReport = usesEditorialReportLayout(slug);
  const reportBodyRef = useRef<HTMLDivElement>(null);
  const localizedBody = z(body);
  const localizedPremiumHtml = z(premiumHtml);
  const completeBody = `${localizedBody}\n${localizedPremiumHtml}`;
  const renderedBody = editorialReport
    ? enhanceReportHtml(completeBody, locale, true)
    : enhanceReportTables(completeBody, locale);
  const [chapterItems, setChapterItems] = useState(() => editorialReport ? reportChapterItems(renderedBody) : []);
  const [pdfBusy, setPdfBusy] = useState(false);

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
        titleHeading.querySelectorAll(".num, .cal-badge, .expert-tag").forEach((badge) => badge.remove());
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

  async function handleDownloadPdf() {
    if (pdfBusy) return;
    setPdfBusy(true);
    try {
      await downloadReportPdf(slug, schoolName);
    } catch {
      window.alert(z("PDF 生成失败，请刷新页面后重试。"));
    } finally {
      setPdfBusy(false);
    }
  }

  const layoutSample = slug === "our-ladys-kindergarten";
  const supplementaryTools = (
    <div className="report-screen-only report-supplementary-tools">
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
    </div>
  );

  return (
    <main className={`w-full report-document-page${editorialReport ? " report-page--editorial" : ""}${layoutSample ? " report-page--layout-sample" : ""}`} data-report-slug={slug}>
      <SiteHeader locale={locale} />
      {/* 所有报告章节均公开展示；付费标记只保留在历史数据中，不再作为访问限制。 */}
      <div className="report-article" dangerouslySetInnerHTML={{ __html: heroHtml }} />
        <div className={`report-page__content mx-auto max-w-[960px] px-4 pb-24${editorialReport ? " report-editorial__content" : ""}`}>
        <section className="report-contact-cta" aria-label={z("微信及 WhatsApp 咨询")}>
          <div className="report-contact-cta__copy">
            <p className="report-contact-cta__eyebrow">港学荟 · 家长择校支持</p>
            <h2>如有深度择校及插班申请需求，扫码咨询！</h2>
          </div>
          <div className="report-contact-cta__channels">
            <div className="report-contact-cta__channel">
              <Image
                src="/brand/wechat-qr.jpg"
                alt="微信二维码：扫码添加为朋友"
                width={630}
                height={630}
                unoptimized
                className="report-contact-cta__qr"
              />
              <span>微信</span>
            </div>
            <div className="report-contact-cta__channel">
              <Image
                src="/brand/whatsapp-qr.jpg"
                alt="WhatsApp 联系二维码"
                width={515}
                height={515}
                unoptimized
                className="report-contact-cta__qr"
              />
              <span>WhatsApp</span>
            </div>
          </div>
        </section>
        <div className="report-export-actions report-screen-only mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-[var(--p-secondary)]">{z("完整报告可打印或保存为 PDF")}</div>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={pdfBusy}
            className="inline-flex min-h-11 items-center justify-center border border-[#0F766E] bg-[#0F766E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0B5F59] disabled:cursor-wait disabled:opacity-70"
          >
            {pdfBusy ? z("正在生成 PDF…") : z("下载为 PDF")}
          </button>
        </div>
        <details className="mb-6 border border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-4 py-3 sm:px-5">
          <summary className="cursor-pointer text-sm font-bold text-[var(--p-fg)]">
            {L("資料與評價標示說明", locale)}
          </summary>
          <p className="mt-2 text-xs leading-6 text-[var(--p-secondary)]">
            {L("報告把可核對資料、平台分析、公開分享和待核內容分開；標示只說明資料性質，不代表錄取機會。", locale)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {[
              ["可核對資料", "教育局、學校或其他公開來源可查"],
              ["平台分析", "港學荟整理的比較和判斷"],
              ["公開分享", "家長或公開討論中的個別經驗"],
              ["待核", "尚未有足夠來源確認"],
            ].map(([label, description]) => (
              <span
                key={label}
                className="border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2.5 py-1.5 text-[var(--p-secondary)]"
                title={L(description, locale)}
              >
                <strong className="text-[var(--p-fg)]">{L(label, locale)}</strong>
                <span className="ml-1">· {L(description, locale)}</span>
              </span>
            ))}
          </div>
        </details>
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

        <ReportSourcePanel sources={sourceReferences} locale={locale} />
        {supplementaryTools}

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

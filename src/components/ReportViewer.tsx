"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Paywall from "@/components/Paywall";
import PremiumContent from "@/components/PremiumContent";
import { L, LOCALE_META, localeHref, otherLocale, type Locale } from "@/lib/i18n";
import { readStoredLicense } from "@/lib/unlock-client";

function findMatchingTagEnd(html: string, start: number, tagName: "div" | "table"): number {
  const tags = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = tags.exec(html))) {
    if (match[0].startsWith("</")) depth -= 1;
    else if (!match[0].endsWith("/>")) depth += 1;
    if (depth === 0) return tags.lastIndex;
  }

  return -1;
}

function compactReliabilityNotice(html: string, locale: Locale): string {
  const callouts = /<div\b(?=[^>]*\bclass=(["'])[^"']*\bcallout\b[^"']*\bwarn\b[^"']*\1)[^>]*>/gi;
  let opening: RegExpExecArray | null;

  while ((opening = callouts.exec(html))) {
    const end = findMatchingTagEnd(html, opening.index, "div");
    if (end < 0) continue;

    const contentStart = opening.index + opening[0].length;
    const contentEnd = end - "</div>".length;
    const inner = html.slice(contentStart, contentEnd);
    const heading = inner.match(/^\s*<strong>([^<]*)<\/strong>\s*<br\s*\/?>/i);
    if (!heading || !/(?:數據|数据|資料|资料)可靠性(?:聲明|声明)/.test(heading[1])) continue;

    const details = inner.slice(heading[0].length);
    const compacted = `<details class="callout warn report-data-reliability"><summary><strong>${heading[1]}</strong><span>${L("展開查看資料來源與核實標準", locale)}</span></summary><div class="report-data-reliability__content">${details}</div></details>`;
    return `${html.slice(0, opening.index)}${compacted}${html.slice(end)}`;
  }

  return html;
}

function getDirectTableRows(contents: string): ("th" | "td")[][] {
  const tags = /<\/?(table|tr|th|td)\b[^>]*>/gi;
  const rows: ("th" | "td")[][] = [];
  let tableDepth = 0;
  let currentRow: ("th" | "td")[] | null = null;
  let match: RegExpExecArray | null;

  while ((match = tags.exec(contents))) {
    const tagName = match[1].toLowerCase();
    const isClosing = match[0].startsWith("</");
    if (tagName === "table") {
      tableDepth += isClosing ? -1 : 1;
      continue;
    }
    if (tableDepth > 0) continue;

    if (tagName === "tr") {
      if (isClosing && currentRow) {
        rows.push(currentRow);
        currentRow = null;
      } else if (!isClosing) {
        currentRow = [];
      }
    } else if (!isClosing && currentRow) {
      currentRow.push(tagName as "th" | "td");
    }
  }

  return rows;
}

function enhanceTables(html: string, locale: Locale): string {
  const opening = /<table\b([^>]*)>/i.exec(html);
  if (!opening) return html;

  const start = opening.index;
  const end = findMatchingTagEnd(html, start, "table");
  if (end < 0) return html;

  const openingEnd = start + opening[0].length;
  const contentsEnd = end - "</table>".length;
  const contents = html.slice(openingEnd, contentsEnd);
  const enhancedContents = enhanceTables(contents, locale);
  const attributes = opening[1];
  const classMatch = attributes.match(/\bclass=(["'])(.*?)\1/i);
  let table = `<table${attributes}>${enhancedContents}</table>`;

  if (classMatch && classMatch[2].split(/\s+/).includes("dt")) {
    const rows = getDirectTableRows(contents);
    const isSummaryTable = rows.length >= 2 && rows.every((row) => row.length === 2 && row[0] === "th" && row[1] === "td");
    const markerClass = isSummaryTable ? "report-summary-table" : "report-scroll-table";
    const nextAttributes = attributes.replace(
      classMatch[0],
      `class=${classMatch[1]}${classMatch[2]} ${markerClass}${classMatch[1]}`
    );
    table = `<table${nextAttributes}>${enhancedContents}</table>`;

    if (!isSummaryTable) {
      const scrollHint = L("左右滑動查看更多欄位", locale);
      const scrollLabel = L("可左右滑動查看其他欄位的表格", locale);
      table = `<div class="report-table-scroll"><p class="report-table-scroll__hint" aria-hidden="true">${scrollHint}</p><div class="report-table-scroll__viewport" role="region" tabindex="0" aria-label="${scrollLabel}">${table}</div></div>`;
    }
  }

  return `${html.slice(0, start)}${table}${enhanceTables(html.slice(end), locale)}`;
}

function enhanceReportHtml(html: string, locale: Locale): string {
  return enhanceTables(compactReliabilityNotice(html, locale), locale);
}

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
  const lang = locale;
  const z = (s: string) => L(s, locale);
  const switchUrl = localeHref(`/reports/${slug}`, otherLocale(locale));
  const reportBodyRef = useRef<HTMLDivElement>(null);

  // 解锁状态：只认 localStorage 里的签名 license（见 lib/unlock-client.ts）。
  // 付费正文本身不在本页 HTML 里，要向 /api/report-content 验签换取——
  // 所以就算有人手动改 localStorage，也拿不到内容。
  const [license, setLicense] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setLicense(readStoredLicense(slug));
    setPending(true);
  }, [slug]);

  useEffect(() => {
    const root = reportBodyRef.current;
    if (!root) return;

    const wrappers = [...root.querySelectorAll<HTMLElement>(".report-table-scroll")];
    const observers: ResizeObserver[] = [];
    const cleanups: (() => void)[] = [];

    for (const wrapper of wrappers) {
      const viewport = wrapper.querySelector<HTMLElement>(".report-table-scroll__viewport");
      const table = viewport?.querySelector("table");
      if (!viewport || !table) continue;

      const updateOverflow = () => {
        wrapper.classList.toggle("is-overflowing", table.scrollWidth > viewport.clientWidth + 1);
      };
      const markScrolled = () => {
        if (viewport.scrollLeft > 4) wrapper.classList.add("has-scrolled");
      };

      updateOverflow();
      viewport.addEventListener("scroll", markScrolled, { passive: true });
      cleanups.push(() => viewport.removeEventListener("scroll", markScrolled));

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(viewport);
        observer.observe(table);
        observers.push(observer);
      } else {
        window.addEventListener("resize", updateOverflow);
        cleanups.push(() => window.removeEventListener("resize", updateOverflow));
      }
    }

    return () => {
      observers.forEach((observer) => observer.disconnect());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [body, slug]);

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
        <div
          ref={reportBodyRef}
          className="report-body"
          dangerouslySetInnerHTML={{ __html: enhanceReportHtml(z(body), locale) }}
        />

        {!free && (
          <>
            {/* 付费墙:未解锁显示解锁卡,解锁后显示付费章节(样式/逻辑见 components/Paywall.tsx) */}
            {pending && (
              <Paywall
                slug={slug}
                allAccessUrl={allAccessUrl}
                singleUrl={singleUrl}
                unlocked={license !== null}
                locale={locale}
              />
            )}
            {license && <PremiumContent slug={slug} license={license} locale={locale} />}
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

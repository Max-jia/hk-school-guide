import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE_URL } from "./seo";
import { L, localeHref, languageAlternates, type Locale } from "./i18n";
import type { ReportSourceReference } from "./report-sources";

// 深度报告(reports)的数据访问与元数据。繁简两棵路由共用。

export const CONTENT_DIR = path.join(process.cwd(), "src/content/reports");

// skhyl 已合并到 skhyl2
export const EXCLUDED_SLUGS = new Set(["skhyl"]);

export type ReportData = {
  slug: string;
  title: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
};

export function listReportSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !EXCLUDED_SLUGS.has(f.replace(/\.json$/, "")))
    .map((f) => f.replace(/\.json$/, ""));
}

export function loadReport(slug: string): ReportData | null {
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ReportData;
}

export function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function reportName(d: ReportData): string {
  const fromTitle = d.title.replace(/\s*深度(?:[择擇]校)?[报報]告$/, "").trim();
  if (fromTitle) return fromTitle;

  const heading = (d.hero || "").match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
  return toPlainText(heading).replace(/\s*深度(?:[择擇]校)?[报報]告$/, "").trim() || d.slug;
}

/** 搜索摘要使用报告类型和用户关心的主题生成，避免从免责声明或表格表头硬截文字。 */
export function makeReportDescription(d: ReportData, locale: Locale): string {
  const base = reportName(d);
  const isKindergarten = /幼稚[园園]/.test(`${d.title} ${d.hero}`);
  const isSecondary = d.slug.endsWith("-secondary");
  const focus = isKindergarten
    ? "学校定位、课程、学费与收生或面试安排"
    : isSecondary
      ? "课程路线、学费、招生与公开升学资料"
      : "学校定位、学费、小一入学与升中去向";
  const scope = isSecondary ? `${base}（中学部）深度择校报告` : `${base}深度择校报告`;
  const description = `${scope}，整理${focus}。报告列明资料来源；招生和学费安排以学校最新公布为准。`;
  return L(description, locale).trim();
}

/** 标题突出学校名和家长常查主题，避免标题堆叠长标签或暗示未核实的评级。 */
export function reportTitle(d: ReportData, locale: Locale): string {
  const base = reportName(d);
  const isKg = /幼稚[园園]/.test(d.title || "") || /幼稚[园園]/.test(d.hero || "");
  const isSecondary = d.slug.endsWith("-secondary");
  const isUnrated = /暂缓评级|暂不评级|未作评级|未评级|暂无评级|暫緩評級|暫不評級|未作評級|未評級|暫無評級/i.test(d.hero);
  const focus = isKg
    ? isUnrated
      ? "课程、学费与面试"
      : "评级、学费与面试"
    : isSecondary ? "课程、招生与升学" : isUnrated ? "入学、课程与升学" : "评级、学费与升学";
  const scope = isSecondary ? `${base}（中学部）` : base;
  return L(`${scope}｜${focus}｜港学荟`, locale);
}

export function reportOgImage(slug: string): string {
  const png = path.join(process.cwd(), "public", "covers", `${slug}.png`);
  return fs.existsSync(png) ? `/covers/${slug}.png` : "/og-home.png";
}

function reportSourceNotes(d: ReportData, locale: Locale): string[] {
  const text = `${d.body}\n${d.premiumHtml}`;
  const notes = [...text.matchAll(/來源(?:：|:)\s*([^<\n]+)/gu)]
    .map((match) => toPlainText(match[1]).trim())
    .filter((note) => note.length >= 4)
    .map((note) => L(note, locale))
    .filter((note, index, all) => all.indexOf(note) === index);
  return notes.slice(0, 12);
}

export function reportMetadata(slug: string, locale: Locale): Metadata {
  const d = loadReport(slug);
  if (!d) return {};
  const title = reportTitle(d, locale);
  const description = makeReportDescription(d, locale);
  const url = localeHref(`/reports/${slug}`, locale);
  const image = reportOgImage(slug);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(`/reports/${slug}`) },
    openGraph: {
      type: "article",
      siteName: L("港学荟", locale),
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function reportJsonLd(d: ReportData, locale: Locale, sourceReferences: ReportSourceReference[] = []) {
  const citations = reportSourceNotes(d, locale);
  const pageUrl = `${SITE_URL}${localeHref(`/reports/${d.slug}`, locale)}`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const schoolName = (d.title || d.slug).replace(/\s*(深度择校报告|深度擇校報告)$/, "").trim();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: reportTitle(d, locale),
    description: makeReportDescription(d, locale),
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: pageUrl,
    image: `${SITE_URL}${reportOgImage(d.slug)}`,
    citation: [
      ...sourceReferences.map((source) => source.url),
      ...citations,
      ...(citations.length === 0 && sourceReferences.length === 0 ? [`${SITE_URL}${localeHref("/about/data-methodology", locale)}`] : []),
    ].filter((citation, index, all) => all.indexOf(citation) === index),
    isPartOf: { "@id": websiteId },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: L("首頁", locale), item: `${SITE_URL}${localeHref("/", locale)}` },
        { "@type": "ListItem", position: 2, name: L("學校報告", locale), item: `${SITE_URL}${localeHref("/reports", locale)}` },
        { "@type": "ListItem", position: 3, name: L(schoolName, locale), item: pageUrl },
      ],
    },
    // 现阶段报告全文公开展示，不再向搜索引擎声明存在付费墙。
    isAccessibleForFree: true,
  };
}

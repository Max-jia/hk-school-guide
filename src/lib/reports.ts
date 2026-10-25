import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import reportMeta from "@/content/report-meta.json";
import { SITE_URL } from "./seo";
import { L, LOCALE_META, localeHref, languageAlternates, type Locale } from "./i18n";
import type { ReportSourceReference } from "./report-sources";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "./structured-data";

// 深度报告(reports)的数据访问与元数据。繁简两棵路由共用。

export const CONTENT_DIR = path.join(process.cwd(), "src/content/reports");

// skhyl 已合并到 skhyl2
export const EXCLUDED_SLUGS = new Set(["skhyl"]);

const PRIMARY_REPORT_SLUGS = new Set(reportMeta.PS_REPORTS.map((report) => report.c));
const KINDERGARTEN_REPORT_SLUGS = new Set(reportMeta.KG_REPORTS.map((report) => report.c));

export type ReportData = {
  slug: string;
  title: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
  /** Actual editorial revision date, never a build or source-link check date. */
  updatedAt?: string;
};

export function reportRevisionDate(d: Pick<ReportData, "updatedAt">): string | undefined {
  return d.updatedAt && /^\d{4}-\d{2}-\d{2}$/.test(d.updatedAt) ? d.updatedAt : undefined;
}

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

function isKindergartenReport(d: ReportData): boolean {
  if (PRIMARY_REPORT_SLUGS.has(d.slug)) return false;
  if (KINDERGARTEN_REPORT_SLUGS.has(d.slug)) return true;
  return /幼稚[园園]/.test(`${d.title} ${d.hero}`);
}

/** 搜索摘要使用报告类型和用户关心的主题生成，避免从免责声明或表格表头硬截文字。 */
export function makeReportDescription(d: ReportData, locale: Locale): string {
  if (d.slug === "spk") {
    return L("聖保祿幼稚園位于香港湾仔区铜锣湾，通讯地址为礼顿道140B号（园方同时列明礼顿道第1018号地段地下至2楼）。报告整理地区、收费、课程和入学资料。", locale);
  }
  if (d.slug === "spcs") {
    return L("查看聖保祿學校（小學部）的課程、教學語言、學費和小一收生資料，並了解小學部與中學部的升學銜接及選校時要核對的重點。", locale);
  }
  if (d.slug === "mcs") {
    return L("整理瑪利諾修院學校（小學部）的課程、小一收生、教學語言、學費及直屬中學安排，附家庭適配分析與申請前核對事項。", locale);
  }
  if (d.slug === "dgjs") {
    return L("了解拔萃女小學的課程特點、英語教學、小一收生與拔萃女書院升學安排，並參考家庭適配分析及申請前關注事項。", locale);
  }
  if (d.slug === "hkups") {
    return L("了解港大同學會小學的中英文教學、小一收生與港大同學會書院升學路徑，並參考家庭適配分析及申請前核對重點。", locale);
  }
  const base = reportName(d);
  const isKindergarten = isKindergartenReport(d);
  const isSecondary = d.slug.endsWith("-secondary");
  const focus = isKindergarten
    ? "授课语言、课程、学费、K1入学与升小去向"
    : isSecondary
      ? "课程与教学语言、学费、收生安排和公开升学资料"
      : "授课语言、课程特点、学费、小一入学与升中通路";
  const scope = isSecondary ? `${base}（中学部）深度择校报告` : `${base}深度择校报告`;
  const description = isKindergarten
    ? `${scope}，整理${focus}，附家庭适配与申请前核对重点。招生和收费以学校当届公布为准。`
    : isSecondary
      ? `${scope}，整理${focus}，附家庭适配与报名核对重点。收费和申请条件以学校当届公布为准。`
      : `${scope}，整理${focus}，附家庭适配与申请核对重点。招生和收费以学校当届公布为准。`;
  return L(description, locale).trim();
}

/** 标题突出学校名和家长常查主题，避免标题堆叠长标签或暗示未核实的评级。 */
export function reportTitle(d: ReportData, locale: Locale): string {
  if (d.slug === "spk") return L("聖保祿幼稚園 SPK｜湾仔铜锣湾地址、学费与入学｜港学荟", locale);
  if (d.slug === "spcs") return L("聖保祿學校（小學部）｜小一入學、課程與升中銜接｜港學薈", locale);
  if (d.slug === "mcs") return L("瑪利諾修院學校（小學部）｜小一入學、課程與升中｜港學薈", locale);
  if (d.slug === "dgjs") return L("拔萃女小學｜課程、小一入學與升中銜接｜港學薈", locale);
  if (d.slug === "hkups") return L("港大同學會小學｜課程、小一入學與升學路徑｜港學薈", locale);
  const base = reportName(d);
  const isKg = isKindergartenReport(d);
  const isSecondary = d.slug.endsWith("-secondary");
  const focus = isKg
    ? "课程、学费与K1入读"
    : isSecondary
      ? "课程、收生与升学路径"
      : "课程、小一入学与升中路径";
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
      modifiedTime: reportRevisionDate(d),
      siteName: L("港学荟", locale),
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function reportJsonLd(d: ReportData, locale: Locale, sourceReferences: ReportSourceReference[] = [], schoolProfiles: { name: string; href: string }[] = []) {
  const citations = reportSourceNotes(d, locale);
  const pageUrl = `${SITE_URL}${localeHref(`/reports/${d.slug}`, locale)}`;
  const path = `/reports/${d.slug}`;
  const articleId = `${pageUrl}#article`;
  const title = reportTitle(d, locale);
  const description = makeReportDescription(d, locale);
  const schoolName = (d.title || d.slug).replace(/\s*(深度择校报告|深度擇校報告)$/, "").trim();
  return jsonLdGraph(locale, [{
    "@type": "Article",
    "@id": articleId,
    headline: title,
    description,
    dateModified: reportRevisionDate(d),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    image: `${SITE_URL}${reportOgImage(d.slug)}`,
    citation: [
      ...sourceReferences.map((source) => source.url),
      ...citations,
      ...(citations.length === 0 && sourceReferences.length === 0 ? [`${SITE_URL}${localeHref("/about/data-methodology", locale)}`] : []),
    ].filter((citation, index, all) => all.indexOf(citation) === index),
    inLanguage: LOCALE_META[locale].htmlLang,
    // Only explicit, stage-checked catalogue mappings supplied by the route.
    about: schoolProfiles.length ? schoolProfiles.map((school) => ({ "@type": "School", "@id": `${SITE_URL}${school.href}#school`, name: L(school.name, locale) })) : undefined,
    isPartOf: { "@id": WEBSITE_ID },
    // 现阶段报告全文公开展示，不再向搜索引擎声明存在付费墙。
    isAccessibleForFree: true,
  }, webPageJsonLd({ path, title, description, locale, mainEntity: { "@id": articleId } }),
  breadcrumbJsonLd(path, [
    { name: "首頁", path: "/" },
    { name: "學校報告", path: "/reports" },
    { name: schoolName, path },
  ], locale)]);
}

import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { SITE_URL } from "./seo";
import { L, localeHref, languageAlternates, type Locale } from "./i18n";

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

/** 描述:先按简体源做清洗与断句,再转成目标语言(顺序不能反,否则正则匹配不到) */
export function makeReportDescription(d: ReportData, locale: Locale): string {
  const sub = d.hero.match(/<p class="sub">([^<]*)<\/p>/);
  const body = toPlainText(d.body)
    .replace(/本报告数据可靠性声明[\s\S]*?主观分析部分不构成入学建议[。.]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const text = `${sub ? sub[1] : ""} ${body}`.replace(/\s+/g, " ").trim();
  const cut = text.slice(0, 150);
  const lastDot = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("！"), cut.lastIndexOf("?"));
  return L(lastDot > 40 ? cut.slice(0, lastDot + 1) : cut, locale).trim();
}

/** 标题:空 title 从 hero 的 h1 兜底,再补评级/类型/校网标签避免过短 */
export function reportTitle(d: ReportData, locale: Locale): string {
  const h1 = (d.hero || "").match(/<h1[^>]*>([^<]*)<\/h1>/);
  const base =
    (d.title || "").replace(/\s*深度择校报告$/, "").trim() ||
    (h1 ? h1[1].replace(/\s*深度择校报告$/, "").trim() : "");
  const tier = (d.hero || "").match(/<div class="tier-mega">([^<]*)<\/div>/);
  if (tier) return L(`${base} 深度择校报告（${tier[1].trim()}）`, locale);
  const isKg = /幼稚[园園]/.test(d.title || "") || /幼稚[园園]/.test(d.hero || "");
  const focus = isKg ? "评级/学费/面试" : "评级/学费/升学";
  return L(`${base} 深度择校报告（${focus}全解）`, locale);
}

export function reportOgImage(slug: string): string {
  const png = path.join(process.cwd(), "public", "covers", `${slug}.png`);
  return fs.existsSync(png) ? `/covers/${slug}.png` : "/og-home.png";
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

export function reportJsonLd(d: ReportData, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: reportTitle(d, locale),
    description: makeReportDescription(d, locale),
    author: { "@type": "Organization", name: L("港学荟", locale) },
    publisher: { "@type": "Organization", name: L("港学荟", locale) },
    mainEntityOfPage: `${SITE_URL}${localeHref(`/reports/${d.slug}`, locale)}`,
    image: `${SITE_URL}${reportOgImage(d.slug)}`,
  };
}

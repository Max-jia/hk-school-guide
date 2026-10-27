import { L, LOCALE_META, localeHref, type Locale } from "./i18n";
import { SITE_URL } from "./seo";

type JsonLdNode = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Use the existing platform identity; do not invent individual authors or credentials. */
export function siteEntityNodes(locale: Locale): JsonLdNode[] {
  return [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: L("港学荟", locale),
      alternateName: locale === "tc" ? "港学荟" : "港學薈",
      url: SITE_URL,
      publishingPrinciples: `${SITE_URL}${localeHref("/about/data-methodology", locale)}`,
      logo: {
        "@type": "ImageObject",
        "@id": `${SITE_URL}/#logo`,
        url: `${SITE_URL}/brand/site-mark.png`,
        width: 512,
        height: 512,
        caption: L("港学荟", locale),
      },
      description: L("整理香港学校资料、升学路线和择校工具，供家长核对公开信息和规划下一步。", locale),
      knowsAbout: [
        L("香港幼稚园、小学与中学资料", locale),
        "DSE",
        "IB",
        "A-Level",
        L("小一入学与校网", locale),
      ],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: L("港学荟", locale),
      alternateName: [locale === "tc" ? "港学荟" : "港學薈", "hkschool.guide"],
      url: SITE_URL,
      description: L("把香港教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。", locale),
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: [LOCALE_META.tc.htmlLang, LOCALE_META.sc.htmlLang],
    },
  ];
}

/** Paths are unprefixed internal paths; localize once at the output boundary. */
export function breadcrumbJsonLd(
  path: string,
  items: { name: string; path: string }[],
  locale: Locale,
): JsonLdNode {
  const pageUrl = `${SITE_URL}${localeHref(path, locale)}`;
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: L(item.name, locale),
      item: `${SITE_URL}${localeHref(item.path, locale)}`,
    })),
  };
}

export function webPageJsonLd({
  path,
  title,
  description,
  locale,
  type = "WebPage",
  mainEntity,
}: {
  path: string;
  title: string;
  description?: string;
  locale: Locale;
  type?: "WebPage" | "CollectionPage" | "AboutPage";
  mainEntity?: { "@id": string };
}): JsonLdNode {
  const pageUrl = `${SITE_URL}${localeHref(path, locale)}`;
  return {
    "@type": type,
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: L(title, locale),
    description: description ? L(description, locale) : undefined,
    inLanguage: LOCALE_META[locale].htmlLang,
    publisher: { "@id": ORGANIZATION_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity,
    breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
  };
}

/** Include named site entities in each document so publisher references resolve locally. */
export function jsonLdGraph(locale: Locale, nodes: JsonLdNode[]) {
  return { "@context": "https://schema.org", "@graph": [...siteEntityNodes(locale), ...nodes] };
}

/** Keep content containing a literal closing script tag inside the JSON string. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

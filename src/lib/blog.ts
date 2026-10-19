import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import blogMeta from "@/content/blog-meta.json";
import { SITE_URL, toISODate, trimTitle, makeDescription } from "./seo";
import { L, localeHref, languageAlternates, type Locale } from "./i18n";

// 热文(blog)的数据访问与元数据。繁简两棵路由共用,避免两套逻辑漂移。

export const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export type BlogMetaEntry = {
  cat: string;
  slug: string;
  date: string;
  tag: string;
  cover: string;
  title: string;
  tease: string;
  /** 简体版专用标题:内地家长搜的是「香港小学…」，与繁体标题不是同一批词 */
  scTitle?: string;
  /** 人工编辑的搜索标题；避免自动截断文章标题。 */
  seoTitle?: string;
  scSeoTitle?: string;
  /** 简体版专用摘要 */
  scTease?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  body: string;
  premium: boolean;
  faq?: { question: string; answer: string }[];
};

export const BLOG_META = blogMeta as BlogMetaEntry[];

export function listBlogSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getBlogPost(slug: string): BlogPost | null {
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as BlogPost;
}

export function getBlogMeta(slug: string): BlogMetaEntry | undefined {
  return BLOG_META.find((m) => m.slug === slug);
}

/** 该文章在指定语言下的完整搜索标题。 */
export function blogTitle(post: BlogPost, locale: Locale): string {
  const meta = getBlogMeta(post.slug);
  if (locale === "sc" && meta?.scSeoTitle) return trimTitle(meta.scSeoTitle);
  if (locale === "tc" && meta?.seoTitle) return trimTitle(meta.seoTitle);
  if (locale === "sc" && meta?.scTitle) return trimTitle(meta.scTitle);
  return trimTitle(L(post.title, locale));
}

/** 该文章在指定语言下的描述 */
export function blogDescription(post: BlogPost, locale: Locale): string {
  const meta = getBlogMeta(post.slug);
  if (locale === "sc" && meta?.scTease) return meta.scTease.replace(/\s+/g, " ").trim().slice(0, 155);
  const tease = meta?.tease;
  const fromTease = tease ? L(tease, locale).replace(/\s+/g, " ").trim().slice(0, 155) : "";
  return fromTease || L(makeDescription(post.body), locale);
}

export function blogPostMetadata(slug: string, locale: Locale): Metadata {
  const post = getBlogPost(slug);
  if (!post) return {};
  const meta = getBlogMeta(slug);
  const title = blogTitle(post, locale);
  const description = blogDescription(post, locale);
  const url = localeHref(`/blog/${slug}`, locale);
  const ogImage = `/covers/og/${slug}.png`;

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(`/blog/${slug}`) },
    openGraph: {
      type: "article",
      siteName: L("港学荟", locale),
      title,
      description,
      url,
      publishedTime: meta ? toISODate(meta.date) || undefined : undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export function blogPostJsonLd(post: BlogPost, locale: Locale) {
  const meta = getBlogMeta(post.slug);
  const iso = meta ? toISODate(meta.date) : "";
  const pageUrl = `${SITE_URL}${localeHref(`/blog/${post.slug}`, locale)}`;
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogTitle(post, locale),
    description: blogDescription(post, locale),
    datePublished: iso || undefined,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: pageUrl,
    image: `${SITE_URL}/covers/og/${post.slug}.png`,
    isPartOf: { "@id": websiteId },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: L("首頁", locale), item: `${SITE_URL}${localeHref("/", locale)}` },
        { "@type": "ListItem", position: 2, name: L("熱文", locale), item: `${SITE_URL}${localeHref("/blog", locale)}` },
        { "@type": "ListItem", position: 3, name: blogTitle(post, locale), item: pageUrl },
      ],
    },
  };
}

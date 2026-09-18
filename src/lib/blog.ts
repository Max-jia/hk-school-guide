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

/** 该文章在指定语言下的标题(已做繁简归一 + 截短) */
export function blogTitle(post: BlogPost, locale: Locale): string {
  const meta = getBlogMeta(post.slug);
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
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blogTitle(post, locale),
    description: blogDescription(post, locale),
    datePublished: iso || undefined,
    dateModified: iso || undefined,
    author: { "@type": "Organization", name: L("港学荟", locale) },
    publisher: { "@type": "Organization", name: L("港学荟", locale) },
    mainEntityOfPage: `${SITE_URL}${localeHref(`/blog/${post.slug}`, locale)}`,
    image: `${SITE_URL}/covers/og/${post.slug}.png`,
  };
}

export function blogFaqJsonLd(post: BlogPost, locale: Locale) {
  if (!post.faq?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: L(f.question, locale),
      acceptedAnswer: { "@type": "Answer", text: L(f.answer, locale) },
    })),
  };
}

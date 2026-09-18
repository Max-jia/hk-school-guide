import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import blogMeta from "@/content/blog-meta.json";
import districts from "@/content/districts.json";
import { SITE_URL, toISODate } from "@/lib/seo";
import { LOCALES, localeHref, languageAlternates } from "@/lib/i18n";

const REPORTS_DIR = path.join(process.cwd(), "src/content/reports");
const DISTRICTS = districts as { slug: string }[];

function reportSitemap(): MetadataRoute.Sitemap {
  return fs
    .readdirSync(REPORTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => f !== "skhyl.json")
    .map((f) => {
      const slug = f.replace(/\.json$/, "");
      const stat = fs.statSync(path.join(REPORTS_DIR, f));
      return {
        url: `${SITE_URL}/reports/${slug}`,
        lastModified: stat.mtime,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    });
}

/**
 * 每条路径同时输出繁體(根)与简体(/cn)两个 URL,并互相声明 hreflang。
 * 简体版本不是机器镜像:两个 URL 都进 sitemap,Google 才知道两条都能被抓取。
 */
function withLocales(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  for (const e of entries) {
    const path = e.url.replace(SITE_URL, "") || "/";
    // sitemap 里的 hreflang 必须是绝对 URL,相对路径会被 Google 忽略
    const rel = languageAlternates(path);
    const languages: Record<string, string> = {};
    for (const [lang, href] of Object.entries(rel)) languages[lang] = `${SITE_URL}${href}`;
    for (const locale of LOCALES) {
      out.push({
        ...e,
        url: `${SITE_URL}${localeHref(path, locale)}`,
        alternates: { languages },
      });
    }
  }
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = (blogMeta as { slug: string; date: string }[]).map((p) => {
    const iso = toISODate(p.date);
    return {
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: iso || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  const base: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/reports`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/p1-self-check`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/p1-school-net`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tools/p1-simulator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/tools/p1-discretionary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/questions`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/districts`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...DISTRICTS.map((d) => ({
      url: `${SITE_URL}/districts/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts,
    ...reportSitemap(),
  ];
  return withLocales(base);
}

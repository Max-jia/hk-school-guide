import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import blogMeta from "@/content/blog-meta.json";
import districts from "@/content/districts.json";
import { SITE_URL, toISODate } from "@/lib/seo";

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

  return [
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
}

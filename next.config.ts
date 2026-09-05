import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// 旧静态站页面 → 新站路径的 301 映射，避免 Google 同时收录新旧两套 URL
const blogSlugs = (
  JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/content/blog-meta.json"), "utf8")
  ) as { slug: string }[]
).map((m) => m.slug);

const reportSlugs = fs
  .readdirSync(path.join(process.cwd(), "src/content/reports"))
  .filter((f) => f.endsWith(".json"))
  .filter((f) => f !== "skhyl.json")
  .map((f) => f.replace(/\.json$/, ""));

// skhyl 是 skhyl2 的旧版重复报告，统一合并到 skhyl2
const skhylRedirects = [
  { source: "/reports/skhyl", destination: "/reports/skhyl2", permanent: true },
  { source: "/reports/skhyl/", destination: "/reports/skhyl2", permanent: true },
  { source: "/report-skhyl.html", destination: "/reports/skhyl2", permanent: true },
  { source: "/report-skhyl-tc.html", destination: "/reports/skhyl2", permanent: true },
];

const legacyRedirects = [
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/index-tc.html", destination: "/", permanent: true },
  { source: "/reports.html", destination: "/reports", permanent: true },
  { source: "/explore.html", destination: "/tools", permanent: true },
  { source: "/primary.html", destination: "/reports", permanent: true },
  { source: "/kindergarten.html", destination: "/reports", permanent: true },
  { source: "/interview-questions.html", destination: "/questions", permanent: true },
  { source: "/data-sources.html", destination: "/reports", permanent: true },
  { source: "/blog/index.html", destination: "/blog", permanent: true },
  { source: "/blog/index-tc.html", destination: "/blog", permanent: true },
  ...blogSlugs.flatMap((slug) => [
    { source: `/blog/${slug}.html`, destination: `/blog/${slug}`, permanent: true },
    { source: `/blog/${slug}-tc.html`, destination: `/blog/${slug}`, permanent: true },
  ]),
  ...reportSlugs.flatMap((slug) => [
    { source: `/report-${slug}.html`, destination: `/reports/${slug}`, permanent: true },
    { source: `/report-${slug}-tc.html`, destination: `/reports/${slug}`, permanent: true },
  ]),
];

const nextConfig: NextConfig = {
  async redirects() {
    return [...skhylRedirects, ...legacyRedirects];
  },
};

export default nextConfig;

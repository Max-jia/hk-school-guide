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
  // The registered-school slug was replaced by the reviewed profile; preserve indexed URLs.
  ...[
    ["primary/puikei", "primary/stewards-pooi-kei-primary-school"],
    ["primary/mosllps", "primary/ma-on-shan-ling-liang-primary-school"],
    ["secondary/po-leung-kuk-lo-kit-sing-1983-college-190489", "secondary/po-leung-kuk-lo-kit-sing-1983-college"],
    ["secondary/dbs-secondary", "secondary/diocesan-boys-school"],
    ["secondary/spcc-secondary", "secondary/st-pauls-co-educational-college"],
    ["kindergarten/the-salvation-army-centaline-charity-fund-kindergarten-576743", "kindergarten/salvation-army-centaline-charity-fund-kindergarten-576743"],
    ["kindergarten/cckg", "kindergarten/christ-church-kindergarten"],
    ["kindergarten/stcat", "kindergarten/st-catherines-international-kindergarten"],
  ].flatMap(([oldPath, newPath]) => ["", "/cn"].map((locale) => ({
    source: `${locale}/schools/${oldPath}`, destination: `${locale}/schools/${newPath}`, permanent: true,
  }))),
  { source: "/index.html", destination: "/", permanent: true },
  { source: "/index-tc.html", destination: "/", permanent: true },
  { source: "/reports.html", destination: "/reports", permanent: true },
  { source: "/explore.html", destination: "/tools", permanent: true },
  { source: "/primary.html", destination: "/tools", permanent: true },
  { source: "/kindergarten.html", destination: "/tools", permanent: true },
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
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  // Let local development pages use either hostname; otherwise Next dev assets
  // are rejected as cross-origin when opened via 127.0.0.1.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [...skhylRedirects, ...legacyRedirects];
  },
  // 这两个 API 在运行时用 fs 读 src/content/ 下的数据文件。
  // Next 的产物追踪（@vercel/nft）对动态拼接的路径不保证能追到，
  // 不显式 include 的话，线上 serverless 函数里会缺文件、接口 500。
  outputFileTracingIncludes: {
    "/api/report-content": ["./src/content/reports/**"],
    "/api/reports/*/pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./src/content/reports/**",
    ],
    "/api/schools": [
      "./src/content/schools.json",
      "./src/content/kindergartens.json",
      "./src/content/report-meta.json",
    ],
  },
};

export default nextConfig;

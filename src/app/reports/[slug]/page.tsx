import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ReportViewer from "@/components/ReportViewer";
import { SITE_URL } from "@/lib/seo";

const CONTENT_DIR = path.join(process.cwd(), "src/content/reports");

type ReportData = {
  slug: string;
  title: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
};

type RelatedReport = { slug: string; title: string };

// 报告 hero 里的评级标签，如「A+ 级 · 34校网顶尖资助女校」
const TYPE_KEYS = [
  "官立", "资助", "直资", "私立", "国际", "券校", "连锁品牌",
  "一条龙", "神校", "名校", "男校", "女校", "男女校", "IB",
];
const AREA_KEYS = [
  "九龙塘", "九龙城", "湾仔", "中西区", "西贡区", "观塘区", "黄大仙",
  "离岛", "大埔", "沙田", "荃湾", "元朗", "南区", "东区", "北区", "深水埗",
];

function reportTokens(d: ReportData): Set<string> {
  const m = (d.hero || "").match(/<div class="tier-mega">([\s\S]*?)<\/div>/);
  const tag = m ? m[1] : "";
  const tokens = new Set<string>();
  const net = tag.match(/(\d+)\s*(?:校網|校网)/) || tag.match(/(?:校網|校网)\s*(\d+)/);
  if (net) tokens.add("net:" + (net[1] || net[2]));
  for (const kw of TYPE_KEYS) if (tag.includes(kw)) tokens.add("type:" + kw);
  for (const area of AREA_KEYS) if (tag.includes(area)) tokens.add("area:" + area);
  return tokens;
}

function reportTier(d: ReportData): string {
  const m = (d.hero || "").match(/(S|A\+?|B|C)\s*级/);
  return m ? m[1] : "";
}

function reportCategory(d: ReportData): string {
  const t = d.title;
  if (t.includes("幼稚园") || t.includes("幼稚園")) return "kg";
  if (t.includes("小学") || t.includes("小學")) return "primary";
  return "";
}

// skhyl 已合并到 skhyl2，相关推荐里也不再出现
const EXCLUDED_SLUGS = new Set(["skhyl"]);

let relatedCache: Map<string, RelatedReport[]> | null = null;

function loadAllReports(): ReportData[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json") && !EXCLUDED_SLUGS.has(f.replace(/\.json$/, "")))
    .map((f) => loadReport(f.replace(/\.json$/, "")))
    .filter((d): d is ReportData => Boolean(d));
}

function buildRelatedMap(limit = 3): Map<string, RelatedReport[]> {
  const all = loadAllReports();
  const bySlug = new Map(all.map((d) => [d.slug, d]));
  const ranked = new Map<string, { score: number; d: ReportData }[]>();

  for (const cur of all) {
    const curTokens = reportTokens(cur);
    const curTier = reportTier(cur);
    const curCategory = reportCategory(cur);
    const scored: { score: number; d: ReportData }[] = [];
    for (const d of all) {
      if (d.slug === cur.slug) continue;
      let score = 0;
      const other = reportTokens(d);
      for (const t of other) {
        if (!curTokens.has(t)) continue;
        score += t.startsWith("net:") ? 3 : 1;
      }
      if (score > 0) scored.push({ score, d });
      else if (curTier && reportTier(d) === curTier) scored.push({ score: 0.5, d });
      else if (curCategory && reportCategory(d) === curCategory) scored.push({ score: 0.2, d });
    }
    scored.sort((a, b) => b.score - a.score || a.d.slug.localeCompare(b.d.slug));
    ranked.set(cur.slug, scored);
  }

  const picks = new Map<string, string[]>();
  for (const cur of all) {
    picks.set(cur.slug, (ranked.get(cur.slug) || []).slice(0, limit).map((x) => x.d.slug));
  }

  // 保证每个报告至少被另一份报告推荐（内链覆盖）
  const inbound = new Map<string, number>();
  for (const targets of picks.values()) {
    for (const t of targets) inbound.set(t, (inbound.get(t) || 0) + 1);
  }
  for (const cur of all) {
    if ((inbound.get(cur.slug) || 0) > 0) continue;
    let bestSrc = "";
    let bestScore = -Infinity;
    for (const src of all) {
      if (src.slug === cur.slug) continue;
      const hit = (ranked.get(src.slug) || []).find((x) => x.d.slug === cur.slug);
      if (hit && hit.score > bestScore) {
        bestScore = hit.score;
        bestSrc = src.slug;
      }
    }
    if (bestSrc) {
      const targets = picks.get(bestSrc)!;
      if (targets.length < limit) targets.push(cur.slug);
      else targets[targets.length - 1] = cur.slug;
      inbound.set(cur.slug, 1);
    }
  }

  const result = new Map<string, RelatedReport[]>();
  for (const cur of all) {
    result.set(
      cur.slug,
      (picks.get(cur.slug) || []).map((s) => ({
        slug: s,
        title: (bySlug.get(s)?.title || "").replace(/\s*深度择校报告$/, "").trim(),
      }))
    );
  }
  return result;
}

function findRelated(slug: string, limit = 3): RelatedReport[] {
  if (!relatedCache) relatedCache = buildRelatedMap(limit);
  return (relatedCache.get(slug) || []).slice(0, limit);
}

function loadReport(slug: string): ReportData | null {
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ReportData;
}

function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function makeReportDescription(d: ReportData): string {
  const sub = d.hero.match(/<p class="sub">([^<]*)<\/p>/);
  const body = toPlainText(d.body)
    .replace(/本报告数据可靠性声明[\s\S]*?主观分析部分不构成入学建议[。.]\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const text = `${sub ? sub[1] : ""} ${body}`.replace(/\s+/g, " ").trim();
  const cut = text.slice(0, 150);
  const lastDot = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("！"), cut.lastIndexOf("?"));
  return (lastDot > 40 ? cut.slice(0, lastDot + 1) : cut).trim();
}

// 报告标题：空 title 从 hero 的 h1 兜底，再补上评级/类型/校网标签避免过短
function reportTitle(d: ReportData): string {
  const h1 = (d.hero || "").match(/<h1[^>]*>([^<]*)<\/h1>/);
  const base = (d.title || "").replace(/\s*深度择校报告$/, "").trim()
    || (h1 ? h1[1].replace(/\s*深度择校报告$/, "").trim() : "");
  const tier = (d.hero || "").match(/<div class="tier-mega">([^<]*)<\/div>/);
  if (tier) return `${base} 深度择校报告（${tier[1].trim()}）`;
  const focus = reportCategory(d) === "kg" ? "评级/学费/面试" : "评级/学费/升学";
  return `${base} 深度择校报告（${focus}全解）`;
}

function reportOgImage(slug: string): string {
  const png = path.join(process.cwd(), "public", "covers", `${slug}.png`);
  return fs.existsSync(png) ? `/covers/${slug}.png` : "/og-home.png";
}

export function generateStaticParams() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !EXCLUDED_SLUGS.has(f.replace(/\.json$/, "")))
    .map((f) => ({ slug: f.replace(/\.json$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = loadReport(slug);
  if (!d) return {};

  const title = reportTitle(d);
  const description = makeReportDescription(d);
  const url = `/reports/${slug}`;
  const image = reportOgImage(slug);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "港学荟",
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = loadReport(slug);
  if (!d) return <main className="w-full"><SiteHeader /><p className="p-8">报告不存在</p><SiteFooter /></main>;

  const title = reportTitle(d);
  const description = makeReportDescription(d);
  const related = findRelated(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    author: { "@type": "Organization", name: "港学荟" },
    publisher: { "@type": "Organization", name: "港学荟" },
    mainEntityOfPage: `${SITE_URL}/reports/${slug}`,
    image: `${SITE_URL}${reportOgImage(slug)}`,
  };

  // 简繁切换在客户端做(ReportViewer),这里只负责读数据
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReportViewer
        slug={slug}
        hero={d.hero}
        body={d.body}
        premiumHtml={d.premiumHtml}
        free={d.free}
        allAccessUrl={d.allAccessUrl}
        singleUrl={d.singleUrl}
        related={related}
      />
    </>
  );
}

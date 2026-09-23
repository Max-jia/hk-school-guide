import fs from "fs";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ReportViewer from "@/components/ReportViewer";
import {
  CONTENT_DIR,
  EXCLUDED_SLUGS,
  listReportSlugs,
  loadReport,
  reportMetadata,
  reportJsonLd,
  type ReportData,
} from "@/lib/reports";
import { L, type Locale } from "@/lib/i18n";

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

export function generateStaticParams() {
  return listReportSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return reportMetadata(slug, "tc");
}

export default async function ReportPage({
  params,
  locale = "tc",
}: {
  params: Promise<{ slug: string }>;
  locale?: Locale;
}) {
  const { slug } = await params;
  const d = loadReport(slug);
  if (!d) {
    return (
      <main className="w-full">
        <SiteHeader locale={locale} />
        <p className="p-8">{L("报告不存在", locale)}</p>
        <SiteFooter locale={locale} />
      </main>
    );
  }

  const related = findRelated(slug);
  const jsonLd = reportJsonLd(d, locale);

  // 在服务端就把正文转好再传给 ReportViewer(client component):
  // 否则 RSC flight payload 里带的会是未转换的简体原文,AI 抓取器读到的是错的字形。
  // 转换是幂等的,ReportViewer 里再转一次不会出问题。
  //
  // 注意:付费章节(premiumHtml)刻意不在这里传下去。它是付费商品,改成解锁后
  // 向 /api/report-content 验签换取(见 components/PremiumContent.tsx)。
  // 免费章节(hero + body,约第 0-1 章)仍然照旧进静态 HTML,给搜索引擎与 AI 读。
  const relatedLocalized = related.map((r) => ({ ...r, title: L(r.title, locale) }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReportViewer
        slug={slug}
        hero={L(d.hero, locale)}
        body={L(d.body, locale)}
        free={d.free}
        allAccessUrl={d.allAccessUrl}
        singleUrl={d.singleUrl}
        related={relatedLocalized}
        locale={locale}
      />
    </>
  );
}

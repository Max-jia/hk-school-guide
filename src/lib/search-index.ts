// 全站搜索索引：报告 + Blog + 题库，供首页搜索框下拉
import reportMeta from "@/content/report-meta.json";
import blogMeta from "@/content/blog-meta.json";
import questions from "@/content/questions.json";

export type SearchHit = {
  type: "报告" | "热文" | "题库";
  title: string;
  tease: string;
  href: string;
};

function buildIndex(): SearchHit[] {
  const hits: SearchHit[] = [];
  for (const r of (reportMeta as any).PS_REPORTS) {
    hits.push({ type: "报告", title: r.n, tease: `${r.t} 级 · ${r.d} · ${r.h}`, href: `/reports/${r.c}` });
  }
  for (const r of (reportMeta as any).KG_REPORTS) {
    hits.push({ type: "报告", title: r.n, tease: `${r.t} 级 · ${r.d} · ${r.h}`, href: `/reports/${r.c}` });
  }
  for (const b of blogMeta as any[]) {
    hits.push({ type: "热文", title: b.title, tease: b.tease, href: `/blog/${b.slug}` });
  }
  for (const q of (questions as (any | null)[]).filter((x): x is any => x != null)) {
    hits.push({ type: "题库", title: q.n, tease: `${q.t} · ${q.d} · ${q.lvl} 级 · ${q.yr}`, href: `/questions#${encodeURIComponent(q.n)}` });
  }
  return hits;
}

export const SEARCH_INDEX: SearchHit[] = buildIndex();

export function searchAll(q: string, limit = 8): SearchHit[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  const chars = s.split("");
  return SEARCH_INDEX.filter((h) => {
    const hay = (h.title + " " + h.tease).toLowerCase();
    return hay.includes(s) || chars.every((c) => hay.includes(c));
  }).slice(0, limit);
}

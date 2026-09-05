"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import blogMeta from "@/content/blog-meta.json";

const POSTS = (blogMeta as any[]) as {
  cat: string; slug: string; date: string; tag: string; cover: string; title: string; tease: string;
}[];

const CATS: Record<string, string> = {
  all: "全部",
  trends: "热搜学校",
  system: "制度攻略",
  guide: "升学实战",
};

// 分组顺序(组内文章按 meta 顺序,已是日期倒序)
const GROUPS: [string, string][] = [
  ["trends", "热搜学校"],
  ["system", "制度攻略"],
  ["guide", "升学实战"],
];

export default function BlogList() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const chars = q.trim().toLowerCase().split("");
    return POSTS.filter((p) => {
      if (cat !== "all" && p.cat !== cat) return false;
      if (!q.trim()) return true;
      const hay = (p.title + p.tease).toLowerCase();
      return chars.every((c) => hay.includes(c));
    });
  }, [cat, q]);

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Blog · 热文</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            择校攻略与制度解读
          </h1>
          <p className="mt-2 max-w-[560px] text-[var(--p-secondary)]">
            校网排名、计分制、叩门攻略、热搜学校研究。每周更新，直接可读。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            港学荟的热文与攻略基于香港教育局公开资料、学校官方信息与家长口碑交叉整理，
            覆盖小一派位计分、校网分析、幼稚园资助、名校面试与暴雨停课等实际升学问题。
            每篇标注数据来源与时效，评级与制度解读供择校参考，不构成入学建议。
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-sm uppercase">
          {Object.entries(CATS).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setCat(k)}
              className={`transition-opacity ${cat === k ? "font-bold opacity-100" : "opacity-33 hover:opacity-60"}`}
            >
              {label}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="ml-auto rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm normal-case text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none"
          />
        </div>

        {list.length === 0 && <p className="py-12 text-center text-[var(--p-secondary)]">没有匹配的文章</p>}
        <ul className="m-0 p-0">
          {GROUPS.map(([key, label]) => {
            const items = list.filter((p) => p.cat === key);
            if (items.length === 0) return null;
            return (
              <li key={key} className="list-none px-2 py-6">
                <div className="mb-1 flex items-baseline gap-2 font-mono text-sm uppercase text-[var(--p-secondary)]">
                  <h2 className="m-0">{label}</h2>
                  <span>({items.length})</span>
                  <div className="h-px flex-1 bg-[rgba(48,48,48,.15)]" />
                </div>
                <ul className="m-0 p-0">
                  {items.map((p, i) => (
                    <li key={p.slug} className="list-none">
                      <a
                        href={`/blog/${p.slug}`}
                        className="group flex items-baseline gap-4 border-b border-[rgba(48,48,48,.12)] py-3 no-underline"
                      >
                        <span className="w-[3.2em] shrink-0 rounded-full border border-[var(--p-fg)] p-1 text-center font-mono text-sm uppercase text-[var(--p-fg)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-lg font-bold leading-snug tracking-[-.3px] text-[var(--p-fg)] transition-transform duration-100 group-hover:-translate-y-0.5">
                            {p.title}
                          </span>
                          <span className="mt-1 block truncate text-sm text-[var(--p-secondary)]">
                            {p.tease}
                          </span>
                        </span>
                        <span className="shrink-0 font-mono text-xs uppercase text-[var(--p-secondary)]">
                          {p.date}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}

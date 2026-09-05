"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import reportMeta from "@/content/report-meta.json";
import { matchesZh } from "@/lib/zh";

const META = reportMeta as any;
const TIER_CFG = META.TIER_CFG as Record<string, { c: string; b: string }>;

type Rep = { n: string; t: string; d: string; h: string; c: string; premium?: boolean };
const ALL: Rep[] = [...META.PS_REPORTS, ...META.KG_REPORTS];

const TIERS = ["全部", "S", "A+", "A", "B", "暂无评级"];

export default function ReportsPage() {
  const [tab, setTab] = useState<"ps" | "kg">("ps");
  const [tier, setTier] = useState("全部");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const src = tab === "ps" ? META.PS_REPORTS : META.KG_REPORTS;
    return src.filter((r: Rep) => {
      if (tier !== "全部" && (r.t || "暂无评级") !== tier) return false;
      const hay = (r.n + r.d + r.h).toLowerCase();
      return matchesZh(q, hay); // 简繁体都能搜
    });
  }, [tab, tier, q]);

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Reports · 深度报告</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            全港 {ALL.length} 份深度择校报告
          </h1>
          <p className="mt-2 max-w-[560px] text-[var(--p-secondary)]">
            每份报告 8 章讲透一所学校：四因子评级、升学通路、入读攻略。数据来自教育局公开资料。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            报告覆盖全港小学与幼稚园，按四因子评级（锚点、共识、竞争、世袭）与校网、学费、师生比、
            升中通路逐项拆解，并附家长口碑与同类对比。评级基于公开数据建模，属于参考工具，
            不构成任何入学建议；各校实际收生以校方公布为准。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            评级数据来源包括教育局学校概览（KGP/PSP）、收费证明书、校方官网、媒体报道与家长社群口碑，
            每项事实均标注核实程度。报告按「定位与核心竞争力、教学深度、升学通路、入读攻略、插班求位、
            在读家庭画像、同类对比、专家总结」8 章组织，既回答「这所学校好不好」，也回答
            「它适合谁、怎么考、有没有风险」。点开任一份报告可查看完整评分卡与数据来源。
          </p>
        </div>

        {/* tab + 筛选 + 搜索 */}
        <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-sm uppercase">
          <div className="flex gap-2">
            {(["ps", "kg"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-[6px] border border-[var(--p-fg)] px-3 py-1 ${
                  tab === t ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : ""
                }`}
              >
                {t === "ps" ? "小学" : "幼稚园"}
              </button>
            ))}
          </div>
          {TIERS.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`transition-opacity ${tier === t ? "font-bold opacity-100" : "opacity-33 hover:opacity-60"}`}
            >
              {t}
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

        {/* 卡片网格（Pudding 封面卡：彩色方块 + tier 徽章） */}
        {list.length === 0 && <p className="py-12 text-center text-[var(--p-secondary)]">没有匹配的报告</p>}
        <ul className="m-0 flex flex-wrap p-0">
          {list.map((r: Rep) => {
            const cfg = TIER_CFG[r.t] || TIER_CFG["暂无评级"];
            const idx = ALL.findIndex((x) => x.c === r.c);
            return (
              <li key={r.c} className="w-full list-none px-2 py-6 md:w-1/2 lg:w-1/3">
                <article>
                  <div className="mb-2 flex items-center justify-between font-mono transition-transform duration-100 hover:-translate-y-1">
                    <p className="w-[4em] rounded-full border border-[var(--p-fg)] p-1 text-center text-sm uppercase">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm uppercase">{cfg.b}</p>
                  </div>
                  <a href={`/reports/${r.c}`} className="block cursor-pointer no-underline">
                    <div
                      className="relative aspect-square overflow-hidden"
                      style={{ background: cfg.c }}
                    >
                      <img
                        src={`/covers/${r.c}.svg`}
                        alt={r.n}
                        loading="lazy"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                        className="absolute bottom-0 left-1/2 aspect-[6/7] w-[calc(100%-32px)] -translate-x-1/2 object-cover transition-transform duration-100 hover:scale-105"
                      />
                      <span className="absolute left-2 top-2 rounded-full bg-[var(--p-fg)] px-2 py-1 font-mono text-xs uppercase text-[var(--p-bg)]">
                        {r.premium ? "付费 HK$9.9" : "免费试看"}
                      </span>
                    </div>
                    <div className="mt-3 font-sans">
                      <h3 className="mb-1 text-[clamp(20px,3vw,24px)] font-bold leading-[1.15] tracking-[-.5px] text-[var(--p-fg)]">
                        {r.n}
                      </h3>
                      <p className="text-sm text-[var(--p-secondary)]">{r.d} · {r.h}</p>
                    </div>
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      <SiteFooter />
    </main>
  );
}

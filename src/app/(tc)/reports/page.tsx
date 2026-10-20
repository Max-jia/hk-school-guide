"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import reportMeta from "@/content/report-meta.json";
import { matchesZh } from "@/lib/zh";
import { L, localeHref, type Locale } from "@/lib/i18n";

const META = reportMeta;
const TIER_CFG = META.TIER_CFG as Record<string, { c: string; b: string }>;

type Rep = { n: string; t: string; d: string; h: string; c: string; premium?: boolean };
const ALL: Rep[] = [...META.PS_REPORTS, ...META.KG_REPORTS, ...META.SS_REPORTS];

const TIERS = ["全部", "S", "A+", "A", "B", "暂无评级"];
const PAGE_SIZE = 24;

export default function ReportsPage({ locale = "tc" }: { locale?: Locale }) {
  const [tab, setTab] = useState<"ps" | "kg" | "ss">("ps");
  const [tier, setTier] = useState("全部");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const list = useMemo(() => {
    const src = tab === "ps" ? META.PS_REPORTS : tab === "kg" ? META.KG_REPORTS : META.SS_REPORTS;
    return src.filter((r: Rep) => {
      if (tier !== "全部" && (r.t || "暂无评级") !== tier) return false;
      const hay = (r.n + r.d + r.h).toLowerCase();
      const query = q.trim().toLowerCase();
      return /^[a-z0-9-]+$/.test(query) ? hay.includes(query) : matchesZh(q, hay);
    });
  }, [tab, tier, q]);
  const pageCount = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleList = list.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Reports · 深度报告</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            全港 {ALL.length} 份深度择校报告
          </h1>
          <p className="mt-2 max-w-[560px] text-[var(--p-secondary)]">
            每份报告按学校阶段拆解定位、课程与升学、申请、费用及家庭核对事项，并标明资料来源与适用学年。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {tab === "ss"
              ? "中学报告聚焦课程路线、公开招生安排、学费及校方公布的升学结果；不设学校排名或个人录取概率。申请与收费信息均按学年核对，最终以校方当届公告为准。"
              : "小学及幼稚园报告会按办学、学费、课程、收生与升学等项目整理公开资料；平台评级仅供比较参考，不构成入学建议。各校实际收生以校方公布为准。"}
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {tab === "ss"
              ? "中学报告以学校官网的课程、招生与收费资料为主，并区分年度数据、学校公布结果、平台分析和暂未公开的信息。点开报告可查看各章节引用来源与核对日期。"
              : "报告来源包括教育局学校概览、校方官网及其他公开资料，并尽量注明核实程度。点开报告可查看评分说明、具体分析与资料来源。"}
          </p>
        </div>

        {META.SS_REPORTS.length > 0 && (
          <aside className="mb-6 flex flex-wrap items-center gap-2 border-l-4 border-[#0F766E] bg-[#F2FBF8] px-4 py-3 text-sm" aria-label={L("中学深度报告", locale)}>
            <span className="font-bold text-[#0F766E]">{L("中学深度报告", locale)}</span>
            <a href={localeHref(`/reports/${META.SS_REPORTS[0].c}`, locale)} className="font-bold text-[var(--p-fg)] underline underline-offset-2">
              {L(META.SS_REPORTS[0].n, locale)} · {L("查看报告样本", locale)} →
            </a>
          </aside>
        )}

        <nav aria-label={L("近期幼稚园报告", locale)} className="mb-6 border-l-4 border-[#0F766E] bg-[#F2FBF8] px-4 py-3 text-sm">
          <span className="mr-3 font-bold text-[#0F766E]">{L("近期幼稚园报告", locale)}</span>
          <span className="inline-flex flex-wrap gap-x-4 gap-y-1">
            <a href={localeHref("/reports/st-hilarys-kg", locale)} className="font-medium text-[var(--p-fg)] underline underline-offset-2">
              {L("德萃幼稚園（馬鞍山及紅磡）", locale)}
            </a>
            <a href={localeHref("/reports/plk-tam-au-yeung-siu-fong", locale)} className="font-medium text-[var(--p-fg)] underline underline-offset-2">
              {L("保良局譚歐陽少芳紀念幼稚園", locale)}
            </a>
          </span>
        </nav>

        {/* tab + 筛选 + 搜索 */}
        <div className="mb-6 flex flex-wrap items-center gap-4 font-mono text-sm uppercase">
          <div className="flex gap-2">
            {(["ps", "kg", "ss"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setTier("全部"); setPage(1); }}
                className={`rounded-[6px] border border-[var(--p-fg)] px-3 py-1 ${
                  tab === t ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : ""
                }`}
              >
                {t === "ps" ? "小学" : t === "kg" ? "幼稚园" : "中学"}
              </button>
            ))}
          </div>
          {tab !== "ss" && TIERS.map((t) => (
            <button
              key={t}
              onClick={() => { setTier(t); setPage(1); }}
              className={`transition-opacity ${tier === t ? "font-bold opacity-100" : "opacity-33 hover:opacity-60"}`}
            >
              {t}
            </button>
          ))}
          <input
            type="text"
            placeholder="Search…"
            aria-label={L("搜索学校报告", locale)}
            value={q}
            onChange={(e) => { setQ(e.target.value); setPage(1); }}
            className="ml-auto rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm normal-case text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none"
          />
        </div>

        <nav aria-label={L("报告列表分页", locale)} className="mb-2 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--p-gray-300)] py-3">
          <p className="m-0 text-xs text-[var(--p-secondary)]">
            {list.length === 0
              ? L("没有匹配的报告", locale)
              : L(`显示第 ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, list.length)} 份，共 ${list.length} 份`, locale)}
          </p>
          {pageCount > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage === 1}
                aria-label={L("上一页报告", locale)}
                className="min-h-10 border border-[var(--p-gray-300)] px-3 text-xs font-bold text-[var(--p-fg)] hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {L("上一页", locale)}
              </button>
              <span aria-live="polite" className="min-w-16 text-center font-mono text-xs text-[var(--p-secondary)]">
                {L(`第 ${currentPage} / ${pageCount} 页`, locale)}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                disabled={currentPage === pageCount}
                aria-label={L("下一页报告", locale)}
                className="min-h-10 border border-[var(--p-gray-300)] px-3 text-xs font-bold text-[var(--p-fg)] hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {L("下一页", locale)}
              </button>
            </div>
          )}
        </nav>

        {/* 卡片网格：按页分批展示，筛选／搜索后回到第一批 */}
        {list.length === 0 && <p className="py-12 text-center text-[var(--p-secondary)]">没有匹配的报告</p>}
        <ul className="m-0 flex flex-wrap p-0">
          {visibleList.map((r: Rep) => {
            const cfg = TIER_CFG[r.t] || TIER_CFG["暂无评级"];
            const idx = ALL.findIndex((x) => x.c === r.c);
            return (
              <li key={r.c} className="w-full list-none px-2 py-6 md:w-1/2 lg:w-1/3">
                <article>
                  <div className="mb-2 flex items-center justify-between font-mono transition-transform duration-100 hover:-translate-y-1">
                    <p className="w-[4em] rounded-full border border-[var(--p-fg)] p-1 text-center text-sm uppercase">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="text-sm uppercase">{tab === "ss" ? L("中学报告", locale) : cfg.b}</p>
                  </div>
                  <a href={localeHref(`/reports/${r.c}`, locale)} className="block cursor-pointer no-underline">
                    <div
                      className="relative aspect-square overflow-hidden"
                      style={{ background: cfg.c }}
                    >
                      {tab === "ss" ? (
                        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[#234B4B] p-5 text-[#F4EFE3] sm:p-6">
                          <span className="font-mono text-[10px] font-bold tracking-[.16em] sm:text-xs">SCHOOL REPORT · SECONDARY</span>
                          <div className="min-h-0">
                            <span className="mb-3 block h-1 w-12 bg-[#D9B36C]" aria-hidden="true" />
                            <span className="line-clamp-5 break-words font-serif text-[clamp(20px,2.4vw,32px)] font-bold leading-tight tracking-tight">
                              {L(r.n, locale)}
                            </span>
                          </div>
                          <span className="border-t border-[#D9B36C] pt-3 font-mono text-[10px] font-bold tracking-wide sm:text-xs">
                            {L("课程 · 招生 · 学费 · 升学", locale)}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={`/covers/${r.c}.svg`}
                          alt={r.n}
                          loading="lazy"
                          onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                          className="absolute bottom-0 left-1/2 aspect-[6/7] w-[calc(100%-32px)] -translate-x-1/2 object-cover transition-transform duration-100 hover:scale-105"
                        />
                      )}
                      <span className={`absolute top-2 rounded-full bg-[var(--p-fg)] px-2 py-1 font-mono text-xs uppercase text-[var(--p-bg)] ${tab === "ss" ? "right-2" : "left-2"}`}>
                        全文公开
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
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

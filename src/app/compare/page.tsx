"use client";

import { useMemo, useRef, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import schoolsJson from "@/content/schools.json";
import kgsJson from "@/content/kindergartens.json";
import reportMeta from "@/content/report-meta.json";
import reportDigests from "@/content/report-digests.json";

type School = (typeof schoolsJson)[number];
type Kg = (typeof kgsJson)[number];
type Item = School | Kg;

const META = reportMeta as any;
const DIGESTS = reportDigests as Record<string, any>;
const TIER_CFG = META.TIER_CFG as Record<string, { c: string; b: string }>;

const PS_CODE: Record<string, string> = {};
(META.PS_REPORTS as { n: string; c: string }[]).forEach((r) => (PS_CODE[r.n] = r.c));
const KG_CODE: Record<string, string> = {};
(META.KG_REPORTS as { n: string; c: string }[]).forEach((r) => (KG_CODE[r.n] = r.c));

const PS_QUICK = ["拔萃女小學", "喇沙小學", "聖保羅男女中學附屬小學", "瑪利曼小學", "英華小學"];
const KG_QUICK = ["寶山幼兒園", "銅鑼灣維多利亞國際幼稚園", "學之園幼稚園(海翩康城)", "基督堂幼稚園", "聖公會幼稚園"];

function tierLabel(t: string | null | undefined): string {
  if (!t) return "暂无评级";
  const s = String(t).toUpperCase();
  if (s.startsWith("S")) return "S";
  if (s.startsWith("A+")) return "A+";
  if (s.startsWith("A")) return "A";
  if (s.startsWith("B")) return "B";
  return "暂无评级";
}

function reportCode(x: Item, isKg: boolean): string | undefined {
  const map = isKg ? KG_CODE : PS_CODE;
  const n = (x as any).name_display || (x as any).name_zh;
  return map[(x as any).name_zh] || map[n];
}

function scoreColor(score: number): string {
  if (score >= 9) return "#0F766E";
  if (score >= 8) return "#178B9E";
  if (score >= 7) return "#D97732";
  return "#B45309";
}

export default function ComparePage() {
  const [tab, setTab] = useState<"ps" | "kg">("ps");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Item[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const pool: Item[] = tab === "ps" ? (schoolsJson as unknown as Item[]) : (kgsJson as unknown as Item[]);

  const suggestions = useMemo(() => {
    const chars = q.trim().toLowerCase().split("");
    if (!q.trim()) return [];
    return pool
      .filter((x) => {
        const hay = ((x as any).name_display || (x as any).name_zh || "").toLowerCase();
        return chars.every((c) => hay.includes(c));
      })
      .filter((x) => !selected.includes(x))
      .slice(0, 8);
  }, [q, pool, selected]);

  function add(x: Item) {
    if (selected.length >= 3) return;
    setSelected((p) => [...p, x]);
    setQ("");
  }
  function remove(x: Item) {
    setSelected((p) => p.filter((y) => y !== x));
  }
  function addQuick(name: string) {
    const hit = pool.find((x) => (x as any).name_zh === name || (x as any).name_display === name);
    if (hit && !selected.includes(hit) && selected.length < 3) add(hit);
  }

  const isKg = tab === "kg";
  const quick = isKg ? KG_QUICK : PS_QUICK;

  const dims: { label: string; get: (x: Item) => string | null }[] = isKg
    ? [
        { label: "评级", get: (x) => tierLabel((x as any).tier) },
        { label: "类型", get: (x) => (x as any).kg_type || "—" },
        { label: "地区", get: (x) => (x as any).district_zh || "—" },
        {
          label: "学费",
          get: (x) => {
            const f = (x as any).fees || "";
            if (f) return String(f).trim();
            const fy = (x as any).fee_year;
            return fy ? `$${fy}/年` : "—";
          },
        },
        { label: "师生比", get: (x) => (x as any).teacher_ratio || "—" },
        { label: "教学语言", get: (x) => (x as any).teaching_language || "—" },
        { label: "PN 班", get: (x) => ((x as any).has_pn ? "有" : "—") },
        { label: "班制", get: (x) => ((x as any).sessions || []).join(" / ") || "—" },
        { label: "升小衔接", get: (x) => (x as any).feeder_primary || "—" },
      ]
    : [
        { label: "评级", get: (x) => tierLabel((x as any).tier) },
        { label: "类型", get: (x) => (x as any).finance_type || "—" },
        { label: "地区", get: (x) => (x as any).district_zh || "—" },
        { label: "校网", get: (x) => (x as any).school_net ? `${(x as any).school_net} 网` : "不限校网" },
        { label: "性别", get: (x) => (x as any).gender || "—" },
        { label: "宗教", get: (x) => (x as any).religion_zh || "—" },
        { label: "学费", get: (x) => (x as any).fees || "—" },
        { label: "师生比", get: (x) => (x as any).teacher_ratio || "—" },
        { label: "教学语言", get: (x) => (x as any).teaching_language || "—" },
        { label: "一条龙/直属", get: (x) => (x as any).through_train || "—" },
        { label: "校车", get: (x) => (x as any).school_bus === "無" ? "无" : (x as any).school_bus || "—" },
      ];

  const digests = selected.map((x) => {
    const code = reportCode(x, isKg);
    return code ? DIGESTS[code] || null : null;
  });

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[1180px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Compare · 学校对比</p>
          <h1 className="font-serif text-[clamp(32px,5vw,50px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            2-3 所学校并排对比
          </h1>
          <p className="mt-2 max-w-[640px] text-[var(--p-secondary)]">
            选 2-3 所小学或幼稚园，学费、师生比、评级、校网、升小通路同屏对比。
          </p>
        </div>

        <div className="mb-6 flex gap-2 font-mono text-sm uppercase">
          {(["ps", "kg"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setQ(""); setSelected([]); }}
              className={`rounded-[6px] border border-[var(--p-fg)] px-4 py-1.5 ${
                tab === t ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : "text-[var(--p-fg)]"
              }`}
            >
              {t === "ps" ? "小学" : "幼稚园"}
            </button>
          ))}
        </div>

        {/* 搜索 */}
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={selected.length >= 3 ? "最多选 3 所（先移除再换）" : "输入学校名称搜索…"}
            disabled={selected.length >= 3}
            className="w-full rounded-[8px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-3 text-sm text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 mt-1 w-full list-none rounded-[8px] border border-black/10 bg-[var(--p-bg)] p-0 shadow-lg dark:border-white/10">
              {suggestions.map((x, i) => (
                <li key={i}>
                  <button
                    onClick={() => add(x)}
                    className="w-full px-4 py-2 text-left text-sm text-[var(--p-fg)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  >
                    {(x as any).name_display || (x as any).name_zh}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 快捷添加 */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">快捷添加：</span>
          {quick.map((name) => (
            <button
              key={name}
              onClick={() => addQuick(name)}
              disabled={selected.length >= 3}
              className="rounded-full border border-[var(--p-fg)] px-3 py-1 text-xs text-[var(--p-fg)] transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)] disabled:opacity-40"
            >
              {name}
            </button>
          ))}
        </div>

        {/* 已选 */}
        {selected.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {selected.map((x, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--p-fg)] px-3 py-1 text-sm text-[var(--p-fg)]"
              >
                {(x as any).name_display || (x as any).name_zh}
                <button onClick={() => remove(x)} className="text-xs opacity-60 hover:opacity-100">✕</button>
              </span>
            ))}
          </div>
        )}

        {/* 对比表 */}
        <div ref={boxRef} className="mt-8">
          {selected.length === 0 ? (
            <p className="py-12 text-center text-[var(--p-secondary)]">选 2-3 所学校开始对比</p>
          ) : (
            <>
              {/* 评分条与摘要卡 */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {selected.map((x, i) => {
                  const dig = digests[i];
                  const t = tierLabel((x as any).tier);
                  const cfg = TIER_CFG[t] || { c: "#9CA3AF", b: t };
                  const code = reportCode(x, isKg);
                  return (
                    <div
                      key={i}
                      className="rounded-[12px] border border-black/10 bg-[var(--p-bg)] p-5 dark:border-white/10"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-[17px] font-bold leading-snug text-[var(--p-fg)]">
                          {(x as any).name_display || (x as any).name_zh}
                        </h3>
                        <span
                          className="inline-block shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-bold text-white"
                          style={{ background: cfg.c }}
                        >
                          {t}
                        </span>
                      </div>

                      {dig?.scores?.length ? (
                        <div className="mt-4 space-y-2">
                          {dig.scores.map((s: any, si: number) => (
                            <div key={si} className="flex items-center gap-2">
                              <span className="w-[72px] shrink-0 text-xs text-[var(--p-secondary)]">{s.label}</span>
                              <span className="h-2 flex-1 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                <span
                                  className="block h-full rounded-full"
                                  style={{
                                    width: `${Math.min(100, s.score * 10)}%`,
                                    background: scoreColor(s.score),
                                  }}
                                />
                              </span>
                              <span className="w-[30px] shrink-0 text-right font-mono text-xs font-bold text-[var(--p-fg)]">
                                {s.score}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-4 text-xs text-[var(--p-secondary)]">该学校暂无平台评分条</p>
                      )}

                      {dig?.positioning && (
                        <p className="mt-4 text-sm leading-relaxed text-[var(--p-fg)]">
                          {dig.positioning.slice(0, 120)}
                          {dig.positioning.length > 120 ? "…" : ""}
                        </p>
                      )}

                      {dig?.suitable && (
                        <p className="mt-3 rounded-[8px] bg-black/[0.03] p-3 text-xs leading-relaxed text-[var(--p-secondary)] dark:bg-white/[0.05]">
                          <strong className="text-[var(--p-fg)]">适合人群：</strong>
                          {dig.suitable.slice(0, 160)}
                          {dig.suitable.length > 160 ? "…" : ""}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {code && (
                          <a
                            href={`/reports/${code}`}
                            className="inline-block rounded-[6px] border border-[var(--p-fg)] px-3 py-1 font-mono text-xs uppercase text-[var(--p-fg)] no-underline transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                          >
                            查看完整报告 →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 维度对比表 */}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[820px] border-collapse">
                  <thead>
                    <tr>
                      <th className="w-[160px] py-3 pr-3 text-left font-mono text-xs uppercase text-[var(--p-secondary)]">
                        维度
                      </th>
                      {selected.map((x, i) => (
                        <th key={i} className="border-l border-black/10 py-3 pl-3 text-left dark:border-white/10">
                          <span className="font-serif text-[16px] font-bold leading-snug text-[var(--p-fg)]">
                            {(x as any).name_display || (x as any).name_zh}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dims.map((d, di) => (
                      <tr key={di} className="border-t border-black/10 dark:border-white/10">
                        <td className="py-3 pr-3 font-mono text-xs uppercase text-[var(--p-secondary)]">{d.label}</td>
                        {selected.map((x, si) => (
                          <td
                            key={si}
                            className="border-l border-black/10 py-3 pl-3 text-sm text-[var(--p-fg)] dark:border-white/10"
                          >
                            {d.get(x) || "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {/* 好评/吐槽行 */}
                    <tr className="border-t border-black/10 dark:border-white/10">
                      <td className="py-3 pr-3 font-mono text-xs uppercase text-[var(--p-secondary)]">家长口碑</td>
                      {digests.map((dig, si) => (
                        <td key={si} className="border-l border-black/10 py-3 pl-3 align-top text-sm dark:border-white/10">
                          {dig?.pros?.length || dig?.cons?.length ? (
                            <>
                              {dig.pros.length > 0 && (
                                <div className="mb-2">
                                  <div className="mb-1 inline-flex items-center gap-1 font-mono text-xs font-bold text-[#0F766E]"><ThumbsUp className="size-3.5" />好评</div>
                                  <ul className="m-0 list-none space-y-1 p-0 text-xs leading-relaxed text-[var(--p-secondary)]">
                                    {dig.pros.slice(0, 3).map((p: string, j: number) => (
                                      <li key={j}>· {p.slice(0, 50)}{p.length > 50 ? "…" : ""}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {dig.cons.length > 0 && (
                                <div>
                                  <div className="mb-1 inline-flex items-center gap-1 font-mono text-xs font-bold text-[#B45309]"><ThumbsDown className="size-3.5" />吐槽</div>
                                  <ul className="m-0 list-none space-y-1 p-0 text-xs leading-relaxed text-[var(--p-secondary)]">
                                    {dig.cons.slice(0, 3).map((c: string, j: number) => (
                                      <li key={j}>· {c.slice(0, 50)}{c.length > 50 ? "…" : ""}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </>
                          ) : (
                            "暂无口碑样本"
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        <p className="mt-8 font-mono text-xs text-[var(--p-secondary)]">
          数据来源：教育局学校概览（KGP/PSP 2025）与公开资料 · 评级为本平台参考体系 · 不构成入学建议
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}

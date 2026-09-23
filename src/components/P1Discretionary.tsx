"use client";

import Localize from "@/components/Localize";
import { type Locale } from "@/lib/i18n";

import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SchoolCombobox, { type SchoolOpt } from "@/components/SchoolCombobox";
import p1NetsJson from "@/content/p1-nets.json";
import { toPng } from "html-to-image";
import {
  DP_REL_OPTS, DP_ORG_OPTS, calcDpScore, dpScoreTips, dpScorePosition,
  assessCandidate, buildDiscretionaryReport, SAME_SCORE_NOTE,
} from "@/lib/p1-discretionary-engine";

const P1 = p1NetsJson as {
  nets: {
    net: string; area_short: string;
    schools: { name: string; simp: string; quota: number | null }[];
  }[];
};

const MAX_CANDIDATES = 5;
const LOCK_KEY = "purchased_p1-sim";

type Candidate = { name: string; sib: boolean; parent: boolean };

export default function P1Discretionary({ locale = "tc" }: { locale?: Locale }) {
  const [rel, setRel] = useState("");
  const [org, setOrg] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([{ name: "", sib: false, parent: false }]);
  const [target, setTarget] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);
  const [tip, setTip] = useState("");
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUnlocked(localStorage.getItem(LOCK_KEY) === "true");
  }, []);

  const allSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const out: SchoolOpt[] = [];
    for (const n of P1.nets) for (const sc of n.schools) out.push({ name: sc.name, simp: sc.simp, quota: sc.quota, net: n.net, area_short: n.area_short });
    return out;
  }, []);

  const score = calcDpScore(rel, org);
  const position = dpScorePosition(score);
  const tips = useMemo(() => dpScoreTips(rel, org).tips, [rel, org]);

  const filledCount = candidates.filter((c) => c.name.trim()).length;
  const canAdd = candidates.length < MAX_CANDIDATES;
  const addLocked = !unlocked && filledCount >= 1;

  function setCandidate(i: number, patch: Partial<Candidate>) {
    setCandidates((cs) => cs.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  }

  function addCandidate() {
    if (!canAdd) return;
    if (addLocked) {
      setTip("解锁 Pro 后最多可对比 5 所候选校");
      setTimeout(() => setTip(""), 2000);
      return;
    }
    setCandidates((cs) => [...cs, { name: "", sib: false, parent: false }]);
  }

  function removeCandidate(i: number) {
    setCandidates((cs) => cs.filter((_, j) => j !== i));
    if (target === candidates[i].name) setTarget("");
  }

  function buy() {
    setBuying(true);
    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product: "sim" }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.url) window.location.href = j.url;
        else alert("下单失败：" + (j.error || "请稍后重试"));
      })
      .catch(() => alert("网络错误，请稍后重试"))
      .finally(() => setBuying(false));
  }

  const report = useMemo(() => {
    const hit = candidates.find((c) => c.name.trim() === target);
    if (!hit || !target) return null;
    const school = allSchoolOpts.find((o) => o.name === target);
    return buildDiscretionaryReport(target, school?.quota ?? null, rel, org, hit.sib, hit.parent);
  }, [target, candidates, rel, org, allSchoolOpts]);

  async function downloadPng() {
    const node = reportRef.current;
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.download = "港学荟-自行分配投表决策报告.png";
      a.href = dataUrl;
      a.click();
    } catch { /* ignore */ }
  }

  const inputCls =
    "w-full rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 text-sm text-[var(--p-fg)] outline-none";
  const toneColor = (t: string) => (t === "good" ? "#0F766E" : t === "mid" ? "#B45309" : "#C2410C");
  const toneBg = (t: string) => (t === "good" ? "#E7F6F2" : t === "mid" ? "#FEF3E2" : "#FDEBE7");

  return (
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[880px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · 阶段一 · 自行分配</p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            自行分配这一票，投给谁？
          </h1>
          <p className="mt-2 max-w-[640px] text-[var(--p-secondary)]">
            自行分配只能申请 1 间官津小学（不限校网）：失败自动进统一派位（无损失），录取须注册（退出统派）。所以这一票，填的一定是「录取了也不后悔」的学校。
          </p>
          <p className="mt-3 rounded-[8px] border-l-4 border-[var(--p-hl-yellow-border)] bg-[var(--p-hl-yellow-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            本工具只做「可核实的规则核对＋相对竞争位置＋投表策略」，不预测录取概率——同分一律抽签。
          </p>
          <p className="mt-3 text-sm">
            定了这一票之后？<a className="underline" href="/tools/p1-simulator">去「统一派位选校表决策台」排甲部＋乙部志愿 →</a>
          </p>
        </div>

        {/* ① 计分组合 */}
        <section className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">① 计分组合 · 自动算分</h2>
            <span className="rounded-full bg-[#FEF3E2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#B45309]">免费</span>
          </div>
          <div className="mt-4 rounded-[8px] bg-[var(--p-fg)] px-4 py-3 text-[var(--p-bg)]">
            <span className="text-lg font-bold">乙类计分：{score} 分</span>
            <span className="block text-xs opacity-80">关系项 {DP_REL_OPTS.find((o) => o.v === rel)?.pts ?? 0} ＋ 办学团体项 {DP_ORG_OPTS.find((o) => o.v === org)?.pts ?? 0} ＋ 适龄 10（最高 35）</span>
            <span className="mt-1 block text-xs font-bold" style={{ color: toneColor(position.tone) }}>定位：{position.label}</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <fieldset className="block">
              <legend className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">关系项（5 选 1，最高 20 分）</legend>
              {DP_REL_OPTS.map((o) => (
                <label key={o.v} className="flex cursor-pointer items-start gap-2 py-1 text-sm text-[var(--p-fg)]">
                  <input type="radio" name="dp-rel" checked={rel === o.v} onChange={() => setRel(o.v)} className="mt-1" />
                  <span>{o.label}{o.pts ? `（${o.pts} 分）` : ""}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="block">
              <legend className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">办学团体项（2 选 1，最高 5 分）</legend>
              {DP_ORG_OPTS.map((o) => (
                <label key={o.v} className="flex cursor-pointer items-start gap-2 py-1 text-sm text-[var(--p-fg)]">
                  <input type="radio" name="dp-org" checked={org === o.v} onChange={() => setOrg(o.v)} className="mt-1" />
                  <span>{o.label}{o.pts ? `（${o.pts} 分）` : ""}</span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="mt-4 rounded-[8px] bg-[var(--p-bg)] px-4 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
            {tips.map((t, i) => (
              <p key={i} className={i === tips.length - 1 ? "mt-1 font-bold text-[var(--p-fg)]" : ""}>{t}</p>
            ))}
          </div>
        </section>

        {/* 同分抽签说明 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">同分抽签 · 先看懂再投表</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--p-fg)]">{SAME_SCORE_NOTE}</p>
          <p className="mt-2 text-xs text-[var(--p-secondary)]">来源：教育局《小一入学统筹办法要点》；同分抽签操作以教育局/学校公布为准。</p>
        </section>

        {/* ② 候选校清单 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">② 候选校清单 · 这票投给谁</h2>
            {!unlocked && <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO · 免费 1 所</span>}
          </div>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            把心仪的官津小学加进来，逐校看甲类预检、相对位置与投表策略；最后挑 1 所生成投表决策报告。
          </p>
          <div className="mt-4 grid gap-4">
            {candidates.map((c, i) => {
              const school = allSchoolOpts.find((o) => o.name === c.name.trim());
              const outOfRoster = c.name.trim() && !school;
              const ass = school ? assessCandidate(c.name.trim(), school.quota ?? null, score, c.sib, c.parent) : null;
              const lockedRow = !unlocked && i >= 1;
              return (
                <div key={i} className="rounded-[10px] border border-[var(--p-gray-300)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">候选 {i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <SchoolCombobox
                        options={allSchoolOpts}
                        value={c.name}
                        onChange={(v) => setCandidate(i, { name: v })}
                        placeholder="选择一所官津小学…"
                        locale={locale}
                      />
                    </div>
                    {i > 0 && (
                      <button onClick={() => removeCandidate(i)} className="rounded border border-[#FDEBE7] bg-[#FDEBE7] px-2.5 py-1.5 text-xs font-bold text-[#C2410C]">
                        移除
                      </button>
                    )}
                  </div>
                  {lockedRow && (
                    <div className="relative mt-3">
                      <div className="rounded-[8px] border border-dashed border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-5 text-center text-sm text-[var(--p-secondary)]">
                        解锁 Pro 后可添加至 5 所候选校
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center rounded-[8px] bg-[rgba(255,255,255,.82)]">
                        <button onClick={buy} disabled={buying} className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50">
                          {buying ? "正在前往支付…" : "解锁候选校清单 · HK$68"}
                        </button>
                      </div>
                    </div>
                  )}
                  {outOfRoster && (
                    <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
                      「{c.name.trim()}」不在官津名册内（可能是直资/私立/国际）——不走自行分配，请走自行申请。
                    </p>
                  )}
                  {school && (
                    <div className="mt-3 rounded-[8px] bg-[var(--p-bg)] px-4 py-3">
                      <p className="font-mono text-xs font-bold uppercase text-[var(--p-secondary)]">甲类资格预检（官方：凡属此类别必获录取）</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-[var(--p-secondary)]">
                        官方甲类仅限：兄/姊在同一小学（小学部）就读、或父/母在该小学任职。兄/姊在同一校址中学部就读、父/母在同址中学部任职属计分 20 分关系项，不是甲类必录取。
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--p-fg)]">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" checked={c.sib} onChange={(e) => setCandidate(i, { sib: e.target.checked })} className="mt-0" />
                          兄/姊正在 {school.name} 就读
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" checked={c.parent} onChange={(e) => setCandidate(i, { parent: e.target.checked })} className="mt-0" />
                          父/母在 {school.name} 任职
                        </label>
                      </div>
                    </div>
                  )}
                  {ass?.catA && school && (
                    <div className="mt-3 rounded-[10px] border-l-4 border-[#0F766E] bg-[#E7F6F2] px-4 py-3">
                      <p className="font-bold text-[#0F766E]">甲类 · 必录取（官方规则）</p>
                      <p className="mt-1 text-sm text-[var(--p-fg)]">
                        你符合「{ass.catAReasons.join(" ／ ")}」条件——只要申请必获录取，不看计分。录取后须注册，注册＝退出统一派位。
                      </p>
                      {unlocked && (
                        <button
                          onClick={() => setTarget(school.name)}
                          className="mt-3 rounded-[8px] border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)]"
                        >
                          {target === school.name ? "✓ 已设为目标" : "设为本票目标 → 生成决策报告"}
                        </button>
                      )}
                    </div>
                  )}
                  {ass && !ass.catA && school && (
                    <div className="mt-3 space-y-3">
                      <div className="rounded-[10px] border-l-4 px-4 py-3" style={{ borderColor: toneColor(ass.fit?.tone ?? "warn"), background: toneBg(ass.fit?.tone ?? "warn") }}>
                        <p className="font-bold text-[var(--p-fg)]">{ass.fit?.label} · {school.name}</p>
                        <p className="mt-1 text-sm text-[var(--p-fg)]">{ass.fit?.advice}</p>
                        <p className="mt-1 text-xs text-[var(--p-secondary)]">计分 {score} 分 · 学额 {school.quota ?? "—"} · 同分抽签，非录取概率。</p>
                      </div>
                      {ass.strategy && (
                        <div className="rounded-[10px] border-l-4 px-4 py-3" style={{ borderColor: toneColor(ass.strategy.tone), background: toneBg(ass.strategy.tone) }}>
                          <p className="font-bold text-[var(--p-fg)]">投表策略 · {ass.strategy.title}</p>
                          <p className="mt-1 text-sm text-[var(--p-fg)]">{ass.strategy.text}</p>
                        </div>
                      )}
                      {unlocked && (
                        <button
                          onClick={() => setTarget(school.name)}
                          className="rounded-[8px] border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)]"
                        >
                          {target === school.name ? "✓ 已设为目标" : "设为本票目标 → 生成决策报告"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {canAdd && (
              <button onClick={addCandidate} className="rounded-[8px] border border-dashed border-[var(--p-gray-300)] px-4 py-2 text-sm text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]">
                ＋ 添加候选校（{candidates.length}/{MAX_CANDIDATES}）
              </button>
            )}
            {tip && <span className="text-sm text-[#B45309]">{tip}</span>}
          </div>
        </section>

        {/* ③ 投表决策报告 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">③ 投表决策报告</h2>
            {!unlocked && <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>}
          </div>
          {!unlocked ? (
            <div className="mt-4 rounded-[10px] bg-[#FEF3E2] px-5 py-4 text-[#B45309]">
              <p className="font-bold">解锁 Pro 后：选定 1 所目标校，生成一页投表决策报告</p>
              <p className="mt-1 text-sm">计分组合核对 ＋ 甲类预检 ＋ 相对位置 ＋ 冲稳结论 ＋ 录取后时间线 ＋ 1-1-1/叩门衔接，可打印可存图。</p>
              <button onClick={buy} disabled={buying} className="mt-3 rounded-[8px] bg-[var(--p-fg)] px-5 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50">
                {buying ? "正在前往支付…" : "解锁投表决策报告 · HK$68"}
              </button>
            </div>
          ) : !report ? (
            <p className="mt-4 rounded-[8px] bg-[var(--p-bg)] px-4 py-3 text-sm text-[var(--p-secondary)]">
              先在候选校清单里点「设为本票目标」，报告会自动生成在这里。
            </p>
          ) : (
            <div className="mt-4">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => window.print()} className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)]">
                  保存为 PDF（打印）
                </button>
                <button onClick={downloadPng} className="rounded-[8px] border border-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-fg)]">
                  下载图片
                </button>
              </div>
              <div ref={reportRef} className="mt-4 rounded-[12px] border-2 border-[#1C1C1C] bg-white p-6" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="flex items-baseline justify-between border-b-2 border-[#1C1C1C] pb-3">
                  <span className="font-serif text-xl font-bold text-[#1C1C1C]">港学荟 · 自行分配投表决策报告</span>
                  <span className="font-mono text-xs text-[#57534E]">2027/28 学年 · 数据版本 2026-09</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[#57534E]">
                  <span>目标校：{report.school}</span>
                  <span>计分：{report.score} 分</span>
                  <span>学额：{report.quota ?? "—"}</span>
                </div>
                {report.catA ? (
                  <div className="mt-5 rounded-[10px] border-l-6 px-5 py-4" style={{ borderLeft: "6px solid #0F766E", background: "#E7F6F2" }}>
                    <p className="font-bold text-[#0F766E]">甲类 · 必录取（官方规则）</p>
                    <p className="mt-1 text-sm text-[#1C1C1C]">符合「{report.catAReasons.join(" ／ ")}」条件，只要申请必获录取，不看计分、不用抽签。</p>
                  </div>
                ) : (
                  <>
                    <div className="mt-5 rounded-[10px] px-5 py-4" style={{ borderLeft: `6px solid ${toneColor(report.fit?.tone ?? "warn")}`, background: toneBg(report.fit?.tone ?? "warn") }}>
                      <p className="font-bold text-[#1C1C1C]">相对位置：{report.fit?.label}</p>
                      <p className="mt-1 text-sm text-[#1C1C1C]">{report.fit?.advice}</p>
                    </div>
                    {report.strategy && (
                      <div className="mt-3 rounded-[10px] px-5 py-4" style={{ borderLeft: `6px solid ${toneColor(report.strategy.tone)}`, background: toneBg(report.strategy.tone) }}>
                        <p className="font-bold text-[#1C1C1C]">投表策略：{report.strategy.title}</p>
                        <p className="mt-1 text-sm text-[#1C1C1C]">{report.strategy.text}</p>
                      </div>
                    )}
                  </>
                )}
                <h3 className="mt-6 font-serif text-base font-bold text-[#1C1C1C]">计分组合核对</h3>
                <ul className="m-0 mt-2 list-disc pl-5 text-sm text-[#44403C]">
                  {report.scoreTips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
                <h3 className="mt-6 font-serif text-base font-bold text-[#1C1C1C]">录取后时间线</h3>
                <ul className="m-0 mt-2 list-none space-y-1.5 p-0 text-sm">
                  {report.timeline.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="shrink-0 font-mono text-xs font-bold text-[#57534E]">{t.when}</span>
                      <span className="text-[#44403C]">{t.action}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mt-6 font-serif text-base font-bold text-[#1C1C1C]">跨阶段衔接</h3>
                <p className="mt-1 text-sm text-[#44403C]">
                  1-1-1 诚意矩阵：自行分配、统派甲一、统派乙一填同一校，是叩门时最有力的诚意证明；若目标校在你校网内，建议甲一乙一统一。
                </p>
                <div className="mt-6 border-t border-[#E4E0D8] pt-3 text-xs leading-relaxed text-[#8A8378]">
                  依据：教育局 2027/28《小一入学统筹办法要点》及计分办法准则 · 相对位置为竞争烈度推导，非录取概率；同分一律抽签
                  <br />
                  港学荟 hkschool.guide · 2027/28 版 · 更新于 2026-09
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

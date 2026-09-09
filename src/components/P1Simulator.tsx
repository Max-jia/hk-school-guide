"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import p1NetsJson from "@/content/p1-nets.json";
import SchoolCombobox, { type SchoolOpt } from "@/components/SchoolCombobox";
import type { SimSchool, SimTier } from "@/lib/sim-engine";

const P1 = p1NetsJson as {
  nets: { net: string; area_short: string; count: number; schools: { name: string; simp: string; quota: number | null }[] }[];
};

const TIERS: { v: SimTier; label: string }[] = [
  { v: "sprint", label: "冲刺" },
  { v: "match", label: "匹配" },
  { v: "safe", label: "保底" },
];

const REL_PTS: Record<string, number> = { work: 20, sec: 20, manager: 20, grad: 10, first: 5 };
const ORG_PTS: Record<string, number> = { religion: 5, member: 5 };
const REL_OPTS: { v: string; label: string }[] = [
  { v: "", label: "无" },
  { v: "work", label: "父/母全职在与该小学同一校址的幼稚园或中学部工作（20分）" },
  { v: "sec", label: "兄/姊在与该小学同一校址的中学部就读（20分）" },
  { v: "manager", label: "父/母为该小学的校董（20分）" },
  { v: "grad", label: "父/母或兄/姊为该小学的毕业生（10分）" },
  { v: "first", label: "首名出生子女（家庭中最年长的孩子，5分）" },
];
const ORG_OPTS: { v: string; label: string }[] = [
  { v: "", label: "无" },
  { v: "religion", label: "与该校办学团体有相同宗教信仰（5分）" },
  { v: "member", label: "父/母为该小学主办社团的成员（5分）" },
];
function calcScore(rel: string, org: string): number {
  return (REL_PTS[rel] || 0) + (ORG_PTS[org] || 0) + 10;
}

const EMPTY_A: SimSchool[] = Array.from({ length: 3 }, () => ({ name: "", tier: "sprint" }));
const INIT_NET = P1.nets[0].net;
const INIT_B_COUNT = Math.min(10, P1.nets[0].schools.length);
const EMPTY_B: SimSchool[] = Array.from({ length: INIT_B_COUNT }, () => ({ name: "", tier: "match" }));

export default function P1Simulator() {
  const [net, setNet] = useState(INIT_NET);
  const [rel, setRel] = useState("");
  const [org, setOrg] = useState("");
  const [partA, setPartA] = useState<SimSchool[]>(EMPTY_A);
  const [partB, setPartB] = useState<SimSchool[]>(EMPTY_B);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);
  const [savedTip, setSavedTip] = useState(false);

  const allSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const out: SchoolOpt[] = [];
    for (const n of P1.nets) for (const sc of n.schools) out.push({ name: sc.name, simp: sc.simp, quota: sc.quota, net: n.net, area_short: n.area_short });
    return out;
  }, []);

  const netSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const n = P1.nets.find((x) => x.net === net);
    return n ? n.schools.map((sc) => ({ name: sc.name, simp: sc.simp, quota: sc.quota, net: n.net, area_short: n.area_short })) : [];
  }, [net]);

  const quotaMap = useMemo(() => {
    const n = P1.nets.find((x) => x.net === net);
    const m = new Map<string, number>();
    if (n) for (const sc of n.schools) m.set(sc.name, sc.quota ?? 0);
    return m;
  }, [net]);

  // 乙部可填上限 = 本网官津学校数（官方 30 只是表格上限）
  const targetB = useMemo(() => {
    const n = P1.nets.find((x) => x.net === net);
    return n ? Math.min(30, n.schools.length) : 30;
  }, [net]);

  useEffect(() => {
    setUnlocked(localStorage.getItem("purchased_p1-sim") === "true");
    try {
      const raw = localStorage.getItem("p1sim_input");
      if (raw) {
        const d = JSON.parse(raw) as {
          net?: string; rel?: string; org?: string; partA?: SimSchool[]; partB?: SimSchool[];
        };
        if (d.net && P1.nets.some((n) => n.net === d.net)) setNet(d.net);
        if (typeof d.rel === "string") setRel(d.rel);
        if (typeof d.org === "string") setOrg(d.org);
        if (d.partA) setPartA(d.partA);
        if (d.partB) setPartB(d.partB);
      }
    } catch { /* ignore */ }
  }, []);

  const filledB = partB.filter((s) => s.name.trim());
  const bCount = filledB.length;
  const safeCount = filledB.filter((s) => s.tier === "safe").length;
  const sprintCount = filledB.filter((s) => s.tier === "sprint").length;
  const dupNames = useMemo(() => {
    const seen = new Set<string>(); const dup = new Set<string>();
    for (const s of filledB) {
      const k = s.name.trim();
      if (!k) continue;
      if (seen.has(k)) dup.add(k);
      seen.add(k);
    }
    return [...dup];
  }, [filledB]);

  const snapshot = useMemo(() => {
    const tips: { kind: "danger" | "info" | "ok"; text: string }[] = [];
    if (safeCount === 0) tips.push({ kind: "danger", text: "没有保底校——这是最危险的结构错误。" });
    if (bCount <= Math.floor(targetB * 0.4)) tips.push({ kind: "danger", text: `乙部只填了 ${bCount}/${targetB} 个志愿，结构严重空洞。` });
    else if (bCount < targetB) tips.push({ kind: "info", text: `乙部 ${bCount}/${targetB}，还有空位可以补保底。` });
    if (dupNames.length) tips.push({ kind: "danger", text: `乙部有重复志愿：${dupNames.join("、")}` });
    const score = calcScore(rel, org);
    if (score <= 20 && sprintCount >= 6) tips.push({ kind: "info", text: `计分 ${score} 分但冲刺 ${sprintCount} 所，底牌和目标错配。` });
    const a1 = partA.find((x) => x.name.trim())?.name.trim() || "";
    const b1 = filledB[0]?.name.trim() || "";
    if (a1 && b1 && a1 !== b1) tips.push({ kind: "info", text: "甲一与乙一不是同一所（1-1-1 未对齐），若目标校在网内建议统一。" });
    if (tips.length === 0) tips.push({ kind: "ok", text: "结构看起来没有明显硬伤，建议解锁完整报告再核对一遍。" });
    return tips.slice(0, 3);
  }, [safeCount, bCount, dupNames, rel, org, sprintCount, targetB]);

  function save() {
    try {
      localStorage.setItem("p1sim_input", JSON.stringify({ net, rel, org, score: calcScore(rel, org), netSchoolCount: targetB, partA, partB }));
      setSavedTip(true);
      setTimeout(() => setSavedTip(false), 1500);
    } catch { /* ignore */ }
  }

  function setRow(list: SimSchool[], setter: (v: SimSchool[]) => void, i: number, patch: Partial<SimSchool>) {
    setter(list.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  }

  function buy() {
    save();
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

  const inputCls =
    "w-full rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 text-sm text-[var(--p-fg)] outline-none";
  const tierCls =
    "rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2 py-2 text-sm text-[var(--p-fg)] outline-none";

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[880px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · Pro 模拟器</p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            交表前，先模拟一遍整张志愿表
          </h1>
          <p className="mt-2 max-w-[620px] text-[var(--p-secondary)]">
            把甲部＋乙部志愿填进来，免费看结构快照；解锁 Pro 体检报告——风险等级、逐项检查、修改建议、叩门预案，一页 PDF 带走。
          </p>
          <p className="mt-3 rounded-[8px] border-l-4 border-[var(--p-hl-yellow-border)] bg-[var(--p-hl-yellow-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            ⚠️ 我们不预测录取概率（随机编号不可模拟）。这个模拟器只回答一个问题：<strong>你这张表，有没有结构性错误。</strong>
          </p>
        </div>

        {/* 第一步：校网与计分 */}
        <section className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">① 基本信息</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">所属校网</span>
              <select value={net} onChange={(e) => setNet(e.target.value)} className={inputCls}>
                {P1.nets.map((n) => (
                  <option key={n.net} value={n.net}>{n.net} 网（{n.area_short}）</option>
                ))}
              </select>
            </label>
            <div className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">
                乙类计分 · 勾选条件自动计算
              </span>
              <div className="rounded-[8px] bg-[var(--p-fg)] px-4 py-3 text-[var(--p-bg)]">
                <span className="text-lg font-bold">
                  乙类计分：{calcScore(rel, org)} 分
                </span>
                <span className="block text-xs opacity-80">
                  关系项 {REL_PTS[rel] || 0} + 办学团体项 {ORG_PTS[org] || 0} + 适龄 10（最高 35）
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <fieldset className="block">
              <legend className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">关系项（只可选一项，最高 20 分）</legend>
              {REL_OPTS.map((o) => (
                <label key={o.v} className="flex cursor-pointer items-start gap-2 py-1 text-sm text-[var(--p-fg)]">
                  <input type="radio" name="rel" checked={rel === o.v} onChange={() => setRel(o.v)} className="mt-1" />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="block">
              <legend className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">办学团体项（只可选一项，最高 5 分）</legend>
              {ORG_OPTS.map((o) => (
                <label key={o.v} className="flex cursor-pointer items-start gap-2 py-1 text-sm text-[var(--p-fg)]">
                  <input type="radio" name="org" checked={org === o.v} onChange={() => setOrg(o.v)} className="mt-1" />
                  <span>{o.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </section>

        {/* 甲部 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">② 甲部志愿（不受校网限制，最多 3 个）</h2>
          <div className="mt-4 grid gap-2">
            {partA.map((s, i) => (
              <div key={i} className="flex gap-2">
                <SchoolCombobox
                  options={allSchoolOpts}
                  value={s.name}
                  onChange={(v) => setRow(partA, setPartA, i, { name: v })}
                  placeholder={`甲部第 ${i + 1} 志愿（全港任选，可搜索或下拉）`}
                />
                <select
                  value={s.tier}
                  onChange={(e) => setRow(partA, setPartA, i, { tier: e.target.value as SimTier })}
                  className={tierCls + " w-24"}
                >
                  {TIERS.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
                </select>
              </div>
            ))}
          </div>
        </section>

        {/* 乙部 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">③ 乙部志愿（所属校网，最多 30 个）</h2>
            <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">已填 {bCount}/{targetB}（本网共 {targetB} 所）</span>
          </div>
          <div className="mt-4 grid gap-2">
            {partB.map((s, i) => (
              <div key={i} className="flex gap-2">
                <SchoolCombobox
                  options={netSchoolOpts}
                  value={s.name}
                  onChange={(v) => setRow(partB, setPartB, i, { name: v })}
                  placeholder={`乙部第 ${i + 1} 志愿（可搜索或下拉）`}
                />
                {(quotaMap.get(s.name.trim()) ?? 0) > 0 && (quotaMap.get(s.name.trim()) ?? 0) <= 30 && (
                  <span className="shrink-0 self-center rounded bg-[var(--p-hl-yellow-bg)] px-2 py-1 font-mono text-xs text-[var(--p-fg)]">
                    学额{quotaMap.get(s.name.trim())}
                  </span>
                )}
                <select
                  value={s.tier}
                  onChange={(e) => setRow(partB, setPartB, i, { tier: e.target.value as SimTier })}
                  className={tierCls + " w-24"}
                >
                  {TIERS.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
                </select>
              </div>
            ))}
          </div>
          {partB.length < targetB && (
            <button
              onClick={() => setPartB((p) => [...p, { name: "", tier: "match" }])}
              className="mt-3 rounded-[8px] border border-dashed border-[var(--p-gray-300)] px-4 py-2 text-sm text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]"
            >
              ＋ 添加志愿（{partB.length}/{targetB}）
            </button>
          )}
          {partB.length >= targetB && (
            <p className="mt-3 text-xs text-[var(--p-secondary)]">本网共 {targetB} 所官津学校，已全部列出。</p>
          )}
        </section>

        {/* 免费快照 */}
        <section className="mt-6 rounded-[12px] border-2 border-[var(--p-fg)] bg-[var(--p-bg)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">实时结构快照（免费）</h2>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-[var(--p-secondary)]">
            <span>乙部 {bCount}/30</span>
            <span>冲刺 {filledB.filter((s) => s.tier === "sprint").length}</span>
            <span>匹配 {filledB.filter((s) => s.tier === "match").length}</span>
            <span>保底 {safeCount}</span>
          </div>
          <ul className="m-0 mt-3 list-none space-y-1 p-0 text-sm">
            {snapshot.map((t, i) => (
              <li key={i} className={
                t.kind === "danger" ? "font-bold text-[#C2410C]" : t.kind === "ok" ? "font-bold text-[var(--p-hl-border)]" : "text-[var(--p-secondary)]"
              }>
                {t.kind === "danger" ? "⚠️ " : t.kind === "ok" ? "✅ " : "📌 "}{t.text}
              </li>
            ))}
          </ul>
        </section>

        {/* 付费墙 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1">
              <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">完整体检报告（Pro）</h2>
              <p className="mt-1 text-sm text-[var(--p-secondary)]">
                风险等级（A/B/C）＋ 8 项结构检查明细 ＋ 修改建议 ＋ 叩门预案清单，可保存为一页 PDF。
              </p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-2xl font-bold text-[var(--p-fg)]">HK$68</span>
                <span className="text-[var(--p-secondary)]"> / 一份，支付后永久可看</span>
              </p>
            </div>
            {unlocked ? (
              <a
                href="/tools/p1-simulator/report"
                className="rounded-[8px] bg-[var(--p-fg)] px-6 py-3 text-sm font-bold text-[var(--p-bg)] no-underline"
              >
                已解锁 → 查看我的报告
              </a>
            ) : (
              <button
                onClick={buy}
                disabled={buying}
                className="rounded-[8px] bg-[var(--p-fg)] px-6 py-3 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
              >
                {buying ? "正在前往支付…" : "解锁完整体检报告 HK$68"}
              </button>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={save} className="rounded-[8px] border border-[var(--p-gray-300)] px-4 py-2 text-sm text-[var(--p-secondary)]">
              {savedTip ? "已保存草稿 ✓" : "保存草稿到本机"}
            </button>
            <span className="text-xs text-[var(--p-secondary)]">输入只保存在你自己的浏览器，不上传服务器。</span>
          </div>
          <p className="mt-4 text-sm text-[var(--p-secondary)]">
            已有兑换码？<a className="underline" href="/redeem">去兑换 →</a>
          </p>
        </section>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6 text-sm leading-relaxed text-[var(--p-secondary)]">
          <p className="font-bold text-[var(--p-fg)]">📎 检查依据</p>
          <p className="mt-2">
            结构检查规则基于本站《香港小一入学2027/28完整攻略》的志愿金字塔方法论（冲刺/匹配/保底），
            学校名单来自教育局 2027/28 官方校网名册（<a className="underline" href="/tools/p1-school-net">校网数据库</a>）。
            模拟器只做结构自查，不预测录取结果；正式交表请以教育局公布为准。
          </p>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

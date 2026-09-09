"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import p1NetsJson from "@/content/p1-nets.json";
import SchoolCombobox, { type SchoolOpt } from "@/components/SchoolCombobox";
import SchoolCompare from "@/components/SchoolCompare";
import SchoolFitCard from "@/components/SchoolFitCard";
import DataVersionBadge from "@/components/DataVersionBadge";
import type { SimSchool, SimTier } from "@/lib/sim-engine";
import { computeSlideLine, suggestOrder, runSimCheck, relativeBand } from "@/lib/sim-engine";
import { RENEW_NOTE } from "@/lib/data-version";

const P1 = p1NetsJson as {
  nets: {
    net: string; area_short: string; count: number;
    schools: {
      name: string; simp: string; quota: number | null;
      gender?: string; sessions?: string[]; through_train?: string; language?: string; religion?: string;
    }[];
  }[];
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

type SavedPlan = {
  id: string;
  name: string;
  savedAt: string;
  net: string;
  rel: string;
  org: string;
  kidGender: string;
  partA: SimSchool[];
  partB: SimSchool[];
};

const PLANS_KEY = "p1sim_plans";
const PLAN_SLOTS = ["方案 A", "方案 B", "方案 C"];

export default function P1Simulator() {
  const [net, setNet] = useState(INIT_NET);
  const [rel, setRel] = useState("");
  const [org, setOrg] = useState("");
  const [kidGender, setKidGender] = useState("不限");
  const [partA, setPartA] = useState<SimSchool[]>(EMPTY_A);
  const [partB, setPartB] = useState<SimSchool[]>(EMPTY_B);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);
  const [savedTip, setSavedTip] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [planTip, setPlanTip] = useState("");

  const allSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const out: SchoolOpt[] = [];
    for (const n of P1.nets) for (const sc of n.schools) out.push(toOpt(sc, n.net, n.area_short));
    return out;
  }, []);

  const netSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const n = P1.nets.find((x) => x.net === net);
    return n ? n.schools.map((sc) => toOpt(sc, n.net, n.area_short)) : [];
  }, [net]);

  function toOpt(sc: (typeof P1.nets)[number]["schools"][number], net: string, area_short: string): SchoolOpt {
    return { name: sc.name, simp: sc.simp, quota: sc.quota, net, area_short, gender: sc.gender, sessions: sc.sessions, through_train: sc.through_train, language: sc.language, religion: sc.religion };
  }

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
          net?: string; rel?: string; org?: string; kidGender?: string; partA?: SimSchool[]; partB?: SimSchool[];
        };
        if (d.net && P1.nets.some((n) => n.net === d.net)) setNet(d.net);
        if (typeof d.rel === "string") setRel(d.rel);
        if (typeof d.org === "string") setOrg(d.org);
        if (typeof d.kidGender === "string") setKidGender(d.kidGender);
        if (d.partA) setPartA(d.partA);
        if (d.partB) setPartB(d.partB);
      }
      } catch { /* ignore */ }
      try {
        const pRaw = localStorage.getItem(PLANS_KEY);
        if (pRaw) setPlans(JSON.parse(pRaw) as SavedPlan[]);
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

  const genderMismatchNames = useMemo(() => {
    const names: string[] = [];
    const arr = [...partA.filter((x) => x.name.trim()), ...filledB];
    for (const s of arr) {
      const info = allSchoolOpts.find((o) => o.name === s.name.trim());
      if (
        info?.gender &&
        kidGender !== "不限" &&
        ((info.gender === "男校" && kidGender === "女") || (info.gender === "女校" && kidGender === "男"))
      ) {
        if (!names.includes(s.name.trim())) names.push(s.name.trim());
      }
    }
    return names;
  }, [partA, filledB, allSchoolOpts, kidGender]);

  const partAOutOfRoster = useMemo(() => {
    const hit = partA.find((x) => x.name.trim() && !allSchoolOpts.some((o) => o.name === x.name.trim()));
    return hit ? hit.name.trim() : null;
  }, [partA, allSchoolOpts]);

  const partBOutOfRoster = useMemo(() => {
    const hit = filledB.find((x) => !allSchoolOpts.some((o) => o.name === x.name.trim()));
    return hit ? hit.name.trim() : null;
  }, [filledB, allSchoolOpts]);

  const slide = useMemo(
    () => computeSlideLine(filledB, (n) => quotaMap.get(n) ?? null),
    [filledB, quotaMap]
  );
  const advice = useMemo(
    () => suggestOrder(filledB, (n) => quotaMap.get(n) ?? null),
    [filledB, quotaMap]
  );

  const snapshot = useMemo(() => {
    const tips: { kind: "danger" | "info" | "ok"; text: string }[] = [];
    if (safeCount === 0) tips.push({ kind: "danger", text: "没有保底校——这是最危险的结构错误。" });
    if (bCount <= Math.floor(targetB * 0.4)) tips.push({ kind: "danger", text: `乙部只填了 ${bCount}/${targetB} 个志愿，结构严重空洞。` });
    else if (bCount < targetB) tips.push({ kind: "info", text: `乙部 ${bCount}/${targetB}，还有空位可以补保底。` });
    if (dupNames.length) tips.push({ kind: "danger", text: `乙部有重复志愿：${dupNames.join("、")}` });
    if (genderMismatchNames.length) {
      tips.push({
        kind: "danger",
        text: `性别不符：${genderMismatchNames.join("、")} 为${kidGender === "女" ? "男校" : "女校"}，${kidGender === "女" ? "女孩" : "男孩"}不会获派，请移除或改填男女校。`,
      });
    }
    const score = calcScore(rel, org);
    if (score <= 20 && sprintCount >= 6) tips.push({ kind: "info", text: `计分 ${score} 分但冲刺 ${sprintCount} 所，底牌和目标错配。` });
    const a1 = partA.find((x) => x.name.trim())?.name.trim() || "";
    const b1 = filledB[0]?.name.trim() || "";
    if (a1 && b1 && a1 !== b1) tips.push({ kind: "info", text: "甲一与乙一不是同一所（1-1-1 未对齐），若目标校在网内建议统一。" });

    if (tips.length === 0) tips.push({ kind: "ok", text: "结构看起来没有明显硬伤，建议解锁完整报告再核对一遍。" });
    return tips.slice(0, 3);
  }, [safeCount, bCount, dupNames, rel, org, sprintCount, targetB, allSchoolOpts]);

  // 输入变化自动写入本机草稿：填校网/学校/计分条件都会实时保存，报告页才能读到
  function persist() {
    try {
      localStorage.setItem("p1sim_input", JSON.stringify({ net, rel, org, kidGender, score: calcScore(rel, org), netSchoolCount: targetB, partA, partB }));
    } catch { /* ignore */ }
  }

  useEffect(() => {
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [net, rel, org, kidGender, partA, partB, targetB]);

  function save() {
    persist();
    try {
      setSavedTip(true);
      setTimeout(() => setSavedTip(false), 1500);
    } catch { /* ignore */ }
  }

  function moveRow(list: SimSchool[], setter: (v: SimSchool[]) => void, from: number, to: number) {
    if (to < 0 || to >= list.length || from === to) return;
    const next = [...list];
    const [it] = next.splice(from, 1);
    next.splice(to, 0, it);
    setter(next);
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

  function quotaOfAny(netName: string, schoolName: string): number | null {
    const n = P1.nets.find((x) => x.net === netName);
    const sc = n?.schools.find((s) => s.name === schoolName.trim());
    return sc?.quota ?? null;
  }

  function planMetrics(plan: SavedPlan) {
    const n = P1.nets.find((x) => x.net === plan.net);
    const netCount = n ? Math.min(30, n.schools.length) : 30;
    const rep = runSimCheck({
      net: plan.net,
      score: calcScore(plan.rel, plan.org),
      partA: plan.partA,
      partB: plan.partB,
      netSchoolCount: netCount,
    });
    const slide = computeSlideLine(
      plan.partB.filter((s) => s.name.trim()),
      (nm) => quotaOfAny(plan.net, nm)
    );
    return { rep, slide };
  }

  function savePlan() {
    const used = new Set(plans.map((p) => p.name));
    const slot = PLAN_SLOTS.find((n) => !used.has(n));
    if (!slot) {
      setPlanTip("最多保存 3 套方案，先删除一套再保存。");
      return;
    }
    const plan: SavedPlan = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: slot,
      savedAt: new Date().toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong" }),
      net,
      rel,
      org,
      kidGender,
      partA,
      partB,
    };
    const next = [...plans, plan];
    setPlans(next);
    try { localStorage.setItem(PLANS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    setPlanTip(`已保存「${slot}」`);
    setTimeout(() => setPlanTip(""), 1800);
  }

  function restorePlan(id: string) {
    const p = plans.find((x) => x.id === id);
    if (!p) return;
    setNet(p.net);
    setRel(p.rel);
    setOrg(p.org);
    setKidGender(p.kidGender);
    setPartA(p.partA);
    setPartB(p.partB);
    setPlanTip(`已载入「${p.name}」，可继续调整`);
    setTimeout(() => setPlanTip(""), 2000);
  }

  function deletePlan(id: string) {
    const next = plans.filter((p) => p.id !== id);
    setPlans(next);
    try { localStorage.setItem(PLANS_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }

  function genderBadSchool(o: SchoolOpt) {
    return (
      o?.gender &&
      kidGender !== "不限" &&
      ((o.gender === "男校" && kidGender === "女") || (o.gender === "女校" && kidGender === "男"))
    );
  }

  // 一键补齐：把网内未填、性别符合的学校按「竞争度」从充裕到稀缺排入剩余志愿
  function fillMissing() {
    const filled = new Set(filledB.map((s) => s.name.trim()));
    const rank = (o: SchoolOpt) => {
      const b = relativeBand(o.name, o.quota ?? null);
      return b === "充裕" ? 0 : b === "普通" ? 1 : 2;
    };
    const candidates = netSchoolOpts
      .filter((o) => !filled.has(o.name) && !genderBadSchool(o))
      .sort((a, b) => rank(a) - rank(b) || (b.quota ?? 0) - (a.quota ?? 0));
    const need = Math.max(0, targetB - filled.size);
    // 自动标档：学额充裕→保底（安全垫），普通/稀缺→匹配（可接受），避免补齐后保底为 0
    const picks = candidates.slice(0, need).map((o) => ({
      name: o.name,
      tier: (relativeBand(o.name, o.quota ?? null) === "充裕" ? "safe" : "match") as SimTier,
    }));
    if (picks.length === 0) {
      setSavedTip(true);
      setTimeout(() => setSavedTip(false), 1500);
      return;
    }
    // 保留已填顺序，剩余空位补入候选
    const filledArr = filledB.map((s) => ({ ...s }));
    const blanks = Array.from({ length: Math.max(0, targetB - filledArr.length - picks.length) }, () => ({ name: "", tier: "match" as SimTier }));
    setPartB([...filledArr, ...picks, ...blanks]);
    setSavedTip(true);
    setTimeout(() => setSavedTip(false), 1500);
  }

  // 按建议顺序一键重排（只重排已填学校，空位保留在末尾）
  function applyAdvice() {
    const sug: SimSchool[] = advice.suggested.map((s) => ({ ...s }));
    const len = partB.length;
    while (sug.length < len) sug.push({ name: "", tier: "match" });
    setPartB(sug);
  }

  function genderBadge(name: string, options: SchoolOpt[]) {
    const info = options.find((o) => o.name === name.trim());
    if (
      info?.gender &&
      kidGender !== "不限" &&
      ((info.gender === "男校" && kidGender === "女") || (info.gender === "女校" && kidGender === "男"))
    ) {
      return (
        <span className="shrink-0 self-center rounded bg-[#FDEBE7] px-2 py-1 text-xs font-bold text-[#C2410C]">
          ⚠️ {info.gender}
        </span>
      );
    }
    return null;
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
          <div className="mt-3 grid gap-2 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#B45309]">阶段一 · 自行分配（看计分）</p>
              <p className="mt-1 text-[var(--p-secondary)]">底牌卡＋甲类预检用这里。只有 1 次机会：失败自动进统一派位（无损失）、录取须注册（退出统派）——填的一定是「录取了也不后悔」的学校。</p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#0F766E]">阶段二 · 统一派位（随机编号，不看计分）</p>
              <p className="mt-1 text-[var(--p-secondary)]">甲部＋乙部志愿表、滑档线、顺序建议都是这里：10 分和 35 分完全平等，只看志愿顺序和随机编号。</p>
            </div>
          </div>
          <p className="mt-3 text-sm">
            阶段一还没想好？<a className="underline" href="/tools/p1-discretionary">先去「自行分配投表决策台」定这唯一一票 →</a>
          </p>
          <DataVersionBadge />
        </div>

        {/* 第一步：校网与计分 */}
        <section className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">① 基本信息</h2>
            <span className="rounded-full bg-[#FEF3E2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#B45309]">阶段一 · 自行分配用</span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">所属校网</span>
              <select value={net} onChange={(e) => setNet(e.target.value)} className={inputCls}>
                {P1.nets.map((n) => (
                  <option key={n.net} value={n.net}>{n.net} 网（{n.area_short}）</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">孩子性别（用于排除男/女校）</span>
              <select value={kidGender} onChange={(e) => setKidGender(e.target.value)} className={inputCls}>
                {["不限", "男", "女"].map((g) => (
                  <option key={g} value={g}>{g === "不限" ? "不限（先不筛选）" : `${g}孩`}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4">
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
              <span className="mt-1 block text-xs font-bold text-[var(--p-hl-yellow-border)]">
                {(() => {
                  const s = calcScore(rel, org);
                  if (s >= 30) return "定位：强势组合 · 自行分配可锁定心仪校";
                  if (s === 25) return "定位：有竞争力 · 热门校同分抽签";
                  if (s === 20) return "定位：最常见组合 · 热门校基本靠抽签";
                  return "定位：底牌偏弱 · 重心放统一派位乙部";
                })()}
              </span>
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
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">② 甲部志愿（不受校网限制，最多 3 个）</h2>
            <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">阶段二 · 统一派位</span>
          </div>
          <div className="mt-4 grid gap-2">
            {partA.map((s, i) => (
              <div key={i} className="flex gap-2">
                <SchoolCombobox
                  options={allSchoolOpts}
                  value={s.name}
                  onChange={(v) => setRow(partA, setPartA, i, { name: v })}
                  placeholder={`甲部第 ${i + 1} 志愿（全港任选，可搜索或下拉）`}
                />
                {genderBadge(s.name, allSchoolOpts)}
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
          {partAOutOfRoster && (
            <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
              ⚠️ 「{partAOutOfRoster}」不在官津名册内（可能是直资/私立/国际学校）——不参加统一派位，甲部填了也不会被派位，请走自行申请，或改填官津学校。
            </p>
          )}
        </section>

        {/* 乙部 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">③ 乙部志愿（所属校网，最多 30 个）</h2>
            <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">阶段二 · 统一派位</span>
            <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">已填 {bCount}/{targetB}（本网共 {targetB} 所）</span>
          </div>
          <div className="mt-2 rounded-[8px] bg-[var(--p-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
            <b className="text-[var(--p-fg)]">冲刺 / 匹配 / 保底 是什么意思？</b><br />
            派位按你填的<b>顺序 + 随机编号</b>逐一分派，所以志愿顺序很重要：<b>冲刺</b>=最想进、竞争激烈，命中靠运气，放 1-2 间；
            <b>匹配</b>=底牌相当、真实能接受的，是志愿表主力；<b>保底</b>=学额充足、派到也满意的安全垫。
            工具会检查你标的是否和实际学额/竞争匹配。
            <b className="text-[#B45309]">注意：乙部不看计分——10 分和 35 分在这里完全平等，只按志愿顺序＋随机编号派位；你的计分只影响阶段一（自行分配）。</b>
          </div>
          <p className="mt-2 text-xs text-[var(--p-secondary)]">
            💡 可拖拽或点 ↑↓ 调整顺序，滑档线和顺序建议会实时重算
          </p>
          <div className="mt-3 grid gap-2">
            {partB.map((s, i) => (
              <div
                key={i}
                draggable
                onDragStart={() => setDragIdx(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIdx !== null && dragIdx !== i) moveRow(partB, setPartB, dragIdx, i);
                  setDragIdx(null);
                }}
                className={`flex items-center gap-2 rounded-[8px] border px-2 py-1.5 ${
                  dragIdx === i ? "border-[var(--p-hl-border)] bg-[var(--p-hl-yellow-bg)]" : "border-[var(--p-gray-300)]"
                }`}
              >
                <span className="w-10 shrink-0 text-center font-mono text-xs text-[var(--p-secondary)]">{i + 1}</span>
                <button
                  type="button"
                  onClick={() => moveRow(partB, setPartB, i, i - 1)}
                  disabled={i === 0}
                  className="shrink-0 rounded border border-[var(--p-gray-300)] px-1.5 text-xs disabled:opacity-30"
                >
                  ↑
                </button>
                <SchoolCombobox
                  options={netSchoolOpts}
                  value={s.name}
                  onChange={(v) => setRow(partB, setPartB, i, { name: v })}
                  placeholder={`乙部第 ${i + 1} 志愿（可搜索或下拉）`}
                />
                {genderBadge(s.name, netSchoolOpts)}
                {(quotaMap.get(s.name.trim()) ?? 0) > 0 && (quotaMap.get(s.name.trim()) ?? 0) <= 30 && (
                  <span className="shrink-0 self-center rounded bg-[var(--p-hl-yellow-bg)] px-2 py-1 font-mono text-xs text-[var(--p-fg)]">
                    学额{quotaMap.get(s.name.trim())}
                  </span>
                )}
                <select
                  value={s.tier}
                  onChange={(e) => setRow(partB, setPartB, i, { tier: e.target.value as SimTier })}
                  className={tierCls + " w-20"}
                >
                  {TIERS.map((t) => <option key={t.v} value={t.v}>{t.label}</option>)}
                </select>
                <button
                  type="button"
                  onClick={() => moveRow(partB, setPartB, i, i + 1)}
                  disabled={i >= partB.length - 1}
                  className="shrink-0 rounded border border-[var(--p-gray-300)] px-1.5 text-xs disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            ))}
          </div>
          {partBOutOfRoster && (
            <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
              ⚠️ 「{partBOutOfRoster}」不在官津名册内（可能是直资/私立/国际或他网学校）——不参加本网统一派位，乙部填了也不会被派位，请走自行申请，或改填本网官津学校。
            </p>
          )}
          {/* 网内学校体检（Pro）：逐校标签 */}
          {filledB.length > 0 && (
            <div className="mt-4 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
              <div className="flex items-center gap-2">
                <p className="font-serif text-lg font-bold text-[var(--p-fg)]">网内学校体检</p>
                {!unlocked && (
                  <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>
                )}
              </div>
              <div className="mt-3 grid gap-2">
                {filledB.slice(0, unlocked ? filledB.length : 1).map((s2, i2) => {
                  const info = netSchoolOpts.find((o) => o.name === s2.name.trim());
                  if (!info) return null;
                  const genderBad = kidGender !== "不限" && ((info.gender === "男校" && kidGender === "女") || (info.gender === "女校" && kidGender === "男"));
                  return (
                    <div key={i2} className="rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-white)] px-3 py-2 text-sm">
                      <p className="font-bold text-[var(--p-fg)]">
                        {info.name}
                        {genderBad && <span className="ml-2 rounded bg-[#FDEBE7] px-1.5 py-0.5 text-xs font-bold text-[#C2410C]">性别不符</span>}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-[var(--p-secondary)]">
                        {info.gender && <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">{(info.gender || "").replace("校", "")}校</span>}
                        {info.religion && <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">{info.religion}</span>}
                        {info.sessions?.length ? <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">{info.sessions.join("/")}班</span> : null}
                        {info.through_train ? <span className="rounded bg-[var(--p-hl-yellow-bg)] px-1.5 py-0.5">🔗 {info.through_train}</span> : null}
                        {info.quota ? <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">学额{info.quota}</span> : null}
                        {info.language ? <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">{info.language.slice(0, 18)}</span> : null}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!unlocked && (
                <div className="mt-3 rounded-[8px] bg-[#FEF3E2] px-3 py-2 text-sm text-[#B45309]">
                  <p className="font-bold">🔒 逐校体检是 Pro 功能</p>
                  <p className="mt-1">
                    解锁后可查看全部志愿学校的性别 / 宗教 / 班制 / 升中通路 / 学额标签，自动标出「填了也白填」的学校。
                  </p>
                  <button
                    onClick={buy}
                    disabled={buying}
                    className="mt-2 rounded-[8px] bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
                  >
                    {buying ? "正在前往支付…" : "解锁完整逐校体检 · HK$68"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 决策工作台：滑档线 + 顺序建议（实时联动） */}
          {slide.positions.length > 0 && (
            <div className="mt-4 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-serif text-lg font-bold text-[var(--p-fg)]">滑档线（实时）</p>
                <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">阶段二 · 统一派位</span>
              </div>
              <div className="mt-2 rounded-[8px] bg-[var(--p-hl-yellow-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
                <b className="text-[var(--p-fg)]">什么是滑档线？</b><br />
                派位像「大风吹」：电脑按你的志愿顺序一位一位看，前面没中就看下一位。
                <b>「滑档」</b>= 前面的志愿都没中，落到后面。
                <b>滑档线</b>= 从第几位开始相对安全——这所学校学额较多、竞争相对没那么激烈（热门名校除外），你大概率会停在这条线附近；线之前是「抽签区」。
                <b>最坏落点</b>= 假设抽签区的热门校全落空，你会停在哪一所。
                注意：学额多 ≠ 容易进——喇沙这类神校就算 90 个名额也挤破头，已按抽签区处理；滑档线是竞争度推导，不是录取概率。
              </div>
              <p className="mt-1 text-sm text-[var(--p-fg)]">{slide.note}</p>
              <div className="mt-3 flex items-end gap-1">
                {slide.positions.map((p, i) => (
                  <div key={i} className="flex-1 text-center">
                    <div
                      className="flex h-7 items-center justify-center rounded font-mono text-[11px]"
                      style={{
                        background: p.band === "稀缺" ? "#FDEBE7" : p.band === "普通" ? "#FEF3E2" : "#E7F6F2",
                        color: p.band === "稀缺" ? "#C2410C" : p.band === "普通" ? "#B45309" : "#0F766E",
                        border: slide.slideLineIndex === i + 1 ? "2px solid #1C1C1C" : "1px solid var(--p-gray-300)",
                      }}
                      title={p.name}
                    >
                      {i + 1}
                    </div>
                    {slide.slideLineIndex === i + 1 && (
                      <div className="font-mono text-[10px] text-[var(--p-fg)]">▲滑档线</div>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-[var(--p-secondary)]">
                红=学额稀缺 · 黄=普通 · 绿=充裕（相对竞争烈度，非录取概率）
              </p>
              <p className="mt-1 text-[11px] text-[var(--p-secondary)]">
                ⓘ 滑档线与顺序建议为本站方法论（基于学额相对竞争度推导），非教育局规则；录取仍以随机编号为准。
              </p>
            </div>
          )}

          {advice.suggested.length > 0 && (
            <div className="mt-4 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
              <p className="font-serif text-lg font-bold text-[var(--p-fg)]">顺序建议（可参考调整）</p>
              <ol className="m-0 mt-2 list-none space-y-1 p-0">
                {advice.suggested.map((sg, i) => (
                  <li key={i} className="text-sm text-[var(--p-fg)]">
                    {i + 1}. {sg.name}
                    <span className="text-[var(--p-secondary)]">
                      （{sg.tier === "sprint" ? "冲刺" : sg.tier === "match" ? "匹配" : "保底"}）
                    </span>
                  </li>
                ))}
              </ol>
              {advice.differences.length > 0 && (
                <div className="mt-3 rounded-[8px] bg-[#FEF3E2] px-3 py-2 text-sm text-[#B45309]">
                  <p className="font-bold">与当前顺序的差异：</p>
                  {advice.differences.map((d, i) => (
                    <p key={i} className="mt-1">
                      第 {d.index} 位：当前「{d.current}」→ 建议「{d.suggested}」· {d.why}
                    </p>
                  ))}
                </div>
              )}
              <button
                onClick={applyAdvice}
                disabled={advice.differences.length === 0}
                className="mt-3 rounded-[8px] bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-40"
              >
                按建议顺序一键重排
              </button>
              <p className="mt-2 text-xs text-[var(--p-secondary)]">{advice.note}</p>
            </div>
          )}

          <div className="mt-3 flex flex-wrap gap-2">
            {partB.length < targetB && (
              <button
                onClick={() => setPartB((p) => [...p, { name: "", tier: "match" }])}
                className="rounded-[8px] border border-dashed border-[var(--p-gray-300)] px-4 py-2 text-sm text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]"
              >
                ＋ 添加志愿（{partB.length}/{targetB}）
              </button>
            )}
            {filledB.length < targetB && (
              <button
                onClick={fillMissing}
                className="rounded-[8px] border border-dashed border-[var(--p-hl-border)] px-4 py-2 text-sm font-bold text-[var(--p-hl-border)] hover:bg-[var(--p-hl-bg)]"
                title="把网内未填、性别符合的学校按学额充裕度自动补入"
              >
                一键补齐剩余 {targetB - filledB.length} 所（按学额充裕度）
              </button>
            )}
          </div>
          {partB.length >= targetB && (
            <p className="mt-3 text-xs text-[var(--p-secondary)]">本网共 {targetB} 所官津学校，已全部列出。</p>
          )}
        </section>

        {/* 免费快照 */}
        <section className="mt-6 rounded-[12px] border-2 border-[var(--p-fg)] bg-[var(--p-bg)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">实时结构快照（免费）</h2>
          <div className="mt-3 flex flex-wrap gap-4 font-mono text-sm text-[var(--p-secondary)]">
            <span>乙部 {bCount}/{targetB}</span>
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

        <SchoolFitCard options={allSchoolOpts} score={calcScore(rel, org)} kidGender={kidGender} unlocked={unlocked} buying={buying} buy={buy} />

        <SchoolCompare unlocked={unlocked} buying={buying} buy={buy} />

        {/* 方案存档（Pro）：多套顺序 A/B 试错 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">方案存档 · A/B 试错</h2>
            {!unlocked && (
              <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>
            )}
          </div>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            最多存 3 套志愿方案（不同校网/顺序/保底配置），并排对比每套的保底位置、滑档线和结构等级——调表前先看差异，不再凭感觉改。
          </p>

          {unlocked && (
            <div className="mt-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={savePlan}
                  className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)]"
                >
                  保存当前为方案
                </button>
                {planTip && <span className="text-sm text-[var(--p-hl-border)]">{planTip}</span>}
              </div>

              {plans.length === 0 && (
                <p className="mt-4 rounded-[8px] bg-[var(--p-bg)] px-4 py-3 text-sm text-[var(--p-secondary)]">
                  还没有保存的方案。先调好一套顺序（比如「全热门」），存为方案 A；再改成「保底前移」，存为方案 B，对比两套的滑档线差异。
                </p>
              )}

              {plans.length > 0 && (
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[var(--p-gray-300)] text-left">
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">方案</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">校网</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">乙部</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">保底</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">冲刺</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">滑档线</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">最坏落点</th>
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">等级</th>
                        <th className="py-2 font-mono text-xs text-[var(--p-secondary)]">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((p) => {
                        const { rep, slide } = planMetrics(p);
                        const gColor = rep.grade === "A" ? "#0F766E" : rep.grade === "B" ? "#B45309" : "#C2410C";
                        return (
                          <tr key={p.id} className="border-b border-[var(--p-gray-300)]">
                            <td className="py-2 pr-3 font-bold text-[var(--p-fg)]">{p.name}</td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">{p.net}</td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">{rep.partBCount}/{rep.targetB}</td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">{rep.safe}</td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">{rep.sprint}</td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">
                              {slide.slideLineIndex ? `第 ${slide.slideLineIndex} 位` : "—"}
                            </td>
                            <td className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">
                              {slide.worstFall ? `${slide.worstFall.index} · ${slide.worstFall.name}` : "—"}
                            </td>
                            <td className="py-2 pr-3">
                              <span className="rounded px-2 py-0.5 font-mono text-xs font-bold" style={{ color: gColor, background: gColor + "14" }}>
                                {rep.grade}
                              </span>
                            </td>
                            <td className="py-2">
                              <div className="flex gap-2">
                                <button onClick={() => restorePlan(p.id)} className="rounded border border-[var(--p-gray-300)] px-2 py-1 text-xs text-[var(--p-fg)]">
                                  载入
                                </button>
                                <button onClick={() => deletePlan(p.id)} className="rounded border border-[#FDEBE7] bg-[#FDEBE7] px-2 py-1 text-xs text-[#C2410C]">
                                  删除
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="mt-3 text-xs text-[var(--p-secondary)]">
                方案只保存在你自己的浏览器（localStorage），换设备或清缓存会丢失；等级为「结构等级」，非录取概率。
              </p>
            </div>
          )}

          {!unlocked && (
            <div className="relative mt-4">
              <div className="rounded-[10px] border border-dashed border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-6 text-center text-sm text-[var(--p-secondary)]">
                解锁后可保存 3 套方案并排对比（保底位置 / 滑档线 / 结构等级）
              </div>
              <div className="absolute inset-0 flex items-center justify-center rounded-[10px] bg-[rgba(255,255,255,.82)]">
                <div className="rounded-[10px] bg-[#FEF3E2] px-6 py-4 text-center text-[#B45309]">
                  <p className="font-bold">方案存档是 Pro 功能</p>
                  <button
                    onClick={buy}
                    disabled={buying}
                    className="mt-3 rounded-[8px] bg-[var(--p-fg)] px-5 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
                  >
                    {buying ? "正在前往支付…" : "解锁方案存档 · HK$68"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 付费墙 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">完整体检报告（Pro）</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
                风险等级（A/B/C）＋ 逐项结构检查明细 ＋ 修改建议 ＋ 三套预案（叩门 72h／直资私立后手／注册时限），可保存为一页 PDF。
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
          <p className="mt-2 rounded-[8px] bg-[var(--p-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
            {RENEW_NOTE}
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

"use client";

import Localize from "@/components/Localize";
import { L, type Locale } from "@/lib/i18n";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import p1NetsJson from "@/content/p1-nets.json";
import { getNetAllocationHistory, getSystemAllocationHistory, P1_ALLOCATION_HISTORY } from "@/lib/p1-allocation-history";
import SchoolCombobox, { type SchoolOpt } from "@/components/SchoolCombobox";
import SchoolCompare from "@/components/SchoolCompare";
import SchoolFitCard from "@/components/SchoolFitCard";
import DataVersionBadge from "@/components/DataVersionBadge";
import type { CapacityBand, SimSchool, SimTier } from "@/lib/sim-engine";
import { applySuggestedOrder, computeSlideLine, suggestOrder, runSimCheck, relativeBand } from "@/lib/sim-engine";
import { RENEW_NOTE } from "@/lib/data-version";
import { readShortlist, SHORTLIST_CHANGE_EVENT, type ShortlistEntry } from "@/lib/shortlist";

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
  partANetFilter?: string;
  partAGenderFilter?: string;
  partBNetFilter?: string;
  partBGenderFilter?: string;
  partA: SimSchool[];
  partB: SimSchool[];
};

const PLANS_KEY = "p1sim_plans";
const PLAN_SLOTS = ["方案 A", "方案 B", "方案 C"];
const ALL_NETS = "全部校网";

export default function P1Simulator({ locale = "tc" }: { locale?: Locale }) {
  const [net, setNet] = useState(INIT_NET);
  const [rel, setRel] = useState("");
  const [org, setOrg] = useState("");
  const [kidGender, setKidGender] = useState("不限");
  const [partAGenderFilter, setPartAGenderFilter] = useState("不限");
  const [partA, setPartA] = useState<SimSchool[]>(EMPTY_A);
  const [partB, setPartB] = useState<SimSchool[]>(EMPTY_B);
  // 全站工具目前开放完整功能；保留这个布尔值是为了兼容旧草稿结构。
  const unlocked = true;
  const [savedTip, setSavedTip] = useState(false);
  const [fillTip, setFillTip] = useState("");
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [plans, setPlans] = useState<SavedPlan[]>([]);
  const [planTip, setPlanTip] = useState("");
  const [partANetFilter, setPartANetFilter] = useState(ALL_NETS);
  const [partBNetFilter, setPartBNetFilter] = useState(INIT_NET);
  const [partBGenderFilter, setPartBGenderFilter] = useState("不限");
  const [shortlist, setShortlist] = useState<ShortlistEntry[]>([]);

  useEffect(() => {
    const syncShortlist = () => setShortlist(readShortlist());
    syncShortlist();
    window.addEventListener(SHORTLIST_CHANGE_EVENT, syncShortlist);
    window.addEventListener("storage", syncShortlist);
    return () => {
      window.removeEventListener(SHORTLIST_CHANGE_EVENT, syncShortlist);
      window.removeEventListener("storage", syncShortlist);
    };
  }, []);

  const allSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const out: SchoolOpt[] = [];
    for (const n of P1.nets) for (const sc of n.schools) out.push(toOpt(sc, n.net, n.area_short));
    return out;
  }, []);

  const partBSchoolOpts = useMemo<SchoolOpt[]>(() => {
    const n = P1.nets.find((x) => x.net === partBNetFilter);
    return n ? n.schools.map((sc) => toOpt(sc, n.net, n.area_short)) : [];
  }, [partBNetFilter]);

  // 甲部仍然是全港任选；这里的校网和性别都是甲部自己的候选筛选器，
  // 不读取基本信息的孩子性别，也不把甲部错误限制为所属校网。
  const partASchoolOpts = useMemo<SchoolOpt[]>(() => {
    return allSchoolOpts.filter((o) => {
      if (partANetFilter !== ALL_NETS && o.net !== partANetFilter) return false;
      if (partAGenderFilter === "不限") return true;
      return !(
        (o.gender === "男校" && partAGenderFilter === "女") ||
        (o.gender === "女校" && partAGenderFilter === "男")
      );
    });
  }, [allSchoolOpts, partAGenderFilter, partANetFilter]);

  const shortlistedPrimary = useMemo(() => {
    function sameSchool(entry: ShortlistEntry, option: SchoolOpt): boolean {
      const entryNames = [entry.name, L(entry.name, "tc"), L(entry.name, "sc")].map((value) => value.trim());
      return entryNames.includes(option.name) || entryNames.includes(option.simp || "");
    }

    return shortlist
      .filter((entry) => entry.kind === "primary")
      .map((entry) => ({ entry, option: allSchoolOpts.find((option) => sameSchool(entry, option)) }))
      .filter((item, index, items) => items.findIndex((candidate) => candidate.entry.id === item.entry.id) === index);
  }, [allSchoolOpts, shortlist]);

  function toOpt(sc: (typeof P1.nets)[number]["schools"][number], net: string, area_short: string): SchoolOpt {
    return { name: sc.name, simp: sc.simp, quota: sc.quota, net, area_short, gender: sc.gender, sessions: sc.sessions, through_train: sc.through_train, language: sc.language, religion: sc.religion };
  }

  const quotaMap = useMemo(() => {
    const n = P1.nets.find((x) => x.net === partBNetFilter);
    const m = new Map<string, number>();
    if (n) for (const sc of n.schools) m.set(sc.name, sc.quota ?? 0);
    return m;
  }, [partBNetFilter]);

  // 乙部可填上限 = 本网官津学校数（官方 30 只是表格上限）
  const targetB = useMemo(() => {
    const n = P1.nets.find((x) => x.net === partBNetFilter);
    return n ? Math.min(30, n.schools.length) : 30;
  }, [partBNetFilter]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("p1sim_input");
      if (raw) {
        const d = JSON.parse(raw) as {
          net?: string; rel?: string; org?: string; kidGender?: string; partANetFilter?: string; partAGenderFilter?: string; partBNetFilter?: string; partBGenderFilter?: string; partA?: SimSchool[]; partB?: SimSchool[];
        };
        if (d.net && P1.nets.some((n) => n.net === d.net)) setNet(d.net);
        if (typeof d.rel === "string") setRel(d.rel);
        if (typeof d.org === "string") setOrg(d.org);
        if (typeof d.kidGender === "string") setKidGender(d.kidGender);
        if (typeof d.partANetFilter === "string") setPartANetFilter(d.partANetFilter);
        if (typeof d.partAGenderFilter === "string") setPartAGenderFilter(d.partAGenderFilter);
        if (typeof d.partBNetFilter === "string" && P1.nets.some((n) => n.net === d.partBNetFilter)) setPartBNetFilter(d.partBNetFilter);
        else if (d.net && P1.nets.some((n) => n.net === d.net)) setPartBNetFilter(d.net);
        if (typeof d.partBGenderFilter === "string") setPartBGenderFilter(d.partBGenderFilter);
        else if (typeof d.kidGender === "string") setPartBGenderFilter(d.kidGender);
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
  const currentRosterOption = (name: string) => {
    const value = name.trim();
    return partBSchoolOpts.find((o) => o.name === value || o.simp === value);
  };
  // 旧草稿会在切换校网后保留并显示警告，但不能占用当前校网的补齐名额。
  const currentRosterFilledB = filledB.filter((s) => currentRosterOption(s.name));
  const bCount = currentRosterFilledB.length;
  const safeCount = currentRosterFilledB.filter((s) => s.tier === "safe").length;
  const sprintCount = currentRosterFilledB.filter((s) => s.tier === "sprint").length;
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
    for (const s of filledB) {
      const info = allSchoolOpts.find((o) => o.name === s.name.trim());
      if (
        info?.gender &&
        partBGenderFilter !== "不限" &&
        ((info.gender === "男校" && partBGenderFilter === "女") || (info.gender === "女校" && partBGenderFilter === "男"))
      ) {
        if (!names.includes(s.name.trim())) names.push(s.name.trim());
      }
    }
    return names;
  }, [filledB, allSchoolOpts, partBGenderFilter]);

  const partAGenderMismatchNames = useMemo(() => {
    const names: string[] = [];
    for (const s of partA) {
      const info = allSchoolOpts.find((o) => o.name === s.name.trim());
      const mismatch = info?.gender && partAGenderFilter !== "不限" && (
        (info.gender === "男校" && partAGenderFilter === "女") ||
        (info.gender === "女校" && partAGenderFilter === "男")
      );
      if (mismatch && !names.includes(s.name.trim())) names.push(s.name.trim());
    }
    return names;
  }, [partA, allSchoolOpts, partAGenderFilter]);

  const partAOutOfRoster = useMemo(() => {
    const hit = partA.find((x) => x.name.trim() && !allSchoolOpts.some((o) => o.name === x.name.trim()));
    return hit ? hit.name.trim() : null;
  }, [partA, allSchoolOpts]);

  const partBOutOfRoster = useMemo(() => {
    // 乙部只能填当前所属校网；切换校网后保留的旧草稿不能继续参加
    // 滑档线/排序推导，否则未知学额会被当成普通档，结果会误导用户。
    const hit = filledB.find((x) => {
      const value = x.name.trim();
      return !partBSchoolOpts.some((o) => o.name === value || o.simp === value);
    });
    return hit ? hit.name.trim() : null;
  }, [filledB, partBSchoolOpts]);

  const slide = useMemo(() => {
    const selectedNet = P1.nets.find((entry) => entry.net === partBNetFilter);
    const peerQuotas = selectedNet?.schools.map((school) => school.quota ?? 0) ?? [];
    return computeSlideLine(filledB, (name) => quotaMap.get(name) ?? null, peerQuotas);
  }, [filledB, partBNetFilter, quotaMap]);
  const netAllocationHistory = useMemo(
    () => getNetAllocationHistory(partBNetFilter),
    [partBNetFilter]
  );
  const systemAllocationHistory = getSystemAllocationHistory();
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
        text: `乙部性别不符：${genderMismatchNames.join("、")} 不符合乙部候选性别筛选，请移除或改填男女校。`,
      });
    }
    if (partAGenderMismatchNames.length) {
      tips.push({
        kind: "danger",
        text: `甲部性别不符：${partAGenderMismatchNames.join("、")} 不符合甲部候选性别筛选，请移除或改填男女校。`,
      });
    }
    const score = calcScore(rel, org);
    if (score <= 20 && sprintCount >= 6) tips.push({ kind: "info", text: `计分 ${score} 分但冲刺 ${sprintCount} 所，底牌和目标错配。` });
    const a1 = partA.find((x) => x.name.trim())?.name.trim() || "";
    const b1 = filledB[0]?.name.trim() || "";
    if (a1 && b1 && a1 !== b1) tips.push({ kind: "info", text: "甲一与乙一不是同一所（1-1-1 未对齐），若目标校在网内建议统一。" });

    if (tips.length === 0) tips.push({ kind: "ok", text: "结构看起来没有明显硬伤，可以继续检查完整报告。" });
    return tips.slice(0, 3);
  }, [safeCount, bCount, dupNames, rel, org, sprintCount, targetB, genderMismatchNames, partAGenderMismatchNames, partA, filledB]);

  // 输入变化自动写入本机草稿：填校网/学校/计分条件都会实时保存，报告页才能读到
  function persist() {
    try {
      localStorage.setItem("p1sim_input", JSON.stringify({ net, rel, org, kidGender, partANetFilter, partAGenderFilter, partBNetFilter, partBGenderFilter, score: calcScore(rel, org), netSchoolCount: targetB, partA, partB }));
    } catch { /* ignore */ }
  }

  useEffect(() => {
    persist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [net, rel, org, kidGender, partANetFilter, partAGenderFilter, partBNetFilter, partBGenderFilter, partA, partB, targetB]);

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

  function quotaOfAny(netName: string, schoolName: string): number | null {
    const n = P1.nets.find((x) => x.net === netName);
    const sc = n?.schools.find((s) => s.name === schoolName.trim());
    return sc?.quota ?? null;
  }

  function planMetrics(plan: SavedPlan) {
    const bNet = plan.partBNetFilter || plan.net;
    const n = P1.nets.find((x) => x.net === bNet);
    const netCount = n ? Math.min(30, n.schools.length) : 30;
    const rep = runSimCheck({
      net: bNet,
      score: calcScore(plan.rel, plan.org),
      partA: plan.partA,
      partB: plan.partB,
      netSchoolCount: netCount,
    });
    const slide = computeSlideLine(
      plan.partB.filter((s) => s.name.trim()),
      (nm) => quotaOfAny(bNet, nm),
      n?.schools.map((school) => school.quota ?? 0) ?? []
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
      partANetFilter,
      partAGenderFilter,
      partBNetFilter,
      partBGenderFilter,
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
    setPartANetFilter(p.partANetFilter || ALL_NETS);
    setPartAGenderFilter(p.partAGenderFilter || "不限");
    setPartBNetFilter(p.partBNetFilter || p.net);
    setPartBGenderFilter(p.partBGenderFilter || p.kidGender || "不限");
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
      partBGenderFilter !== "不限" &&
      ((o.gender === "男校" && partBGenderFilter === "女") || (o.gender === "女校" && partBGenderFilter === "男"))
    );
  }

  function showFillTip(message: string) {
    setFillTip(message);
    setTimeout(() => setFillTip(""), 2500);
  }

  function importShortlistToPartA(option: SchoolOpt) {
    if (!partASchoolOpts.some((candidate) => candidate.name === option.name)) {
      showFillTip("这所候选学校不符合当前甲部校网或性别筛选，请先调整筛选条件。");
      return;
    }
    if (partA.some((school) => school.name === option.name || school.name === option.simp)) {
      showFillTip(`「${option.name}」已经在甲部志愿中。`);
      return;
    }
    const emptyIndex = partA.findIndex((school) => !school.name.trim());
    if (emptyIndex < 0) {
      showFillTip("甲部 3 个志愿已经填满，请先清空一个位置。");
      return;
    }
    setRow(partA, setPartA, emptyIndex, { name: option.name, tier: "match" });
    showFillTip(`已把「${option.name}」加入甲部第 ${emptyIndex + 1} 志愿。`);
  }

  function importShortlistToPartB(option: SchoolOpt) {
    const allowed = partBSchoolOpts.some((candidate) => candidate.name === option.name) && !genderBadSchool(option);
    if (!allowed) {
      showFillTip(`「${option.name}」不符合当前乙部校网 ${partBNetFilter} 或性别筛选，请先调整筛选条件。`);
      return;
    }
    if (filledB.some((school) => school.name === option.name || school.name === option.simp)) {
      showFillTip(`「${option.name}」已经在乙部志愿中。`);
      return;
    }
    const emptyIndex = partB.findIndex((school) => !school.name.trim());
    if (emptyIndex < 0) {
      showFillTip("当前乙部没有空位，请先清空一个位置再导入候选学校。");
      return;
    }
    setRow(partB, setPartB, emptyIndex, { name: option.name, tier: "match" });
    showFillTip(`已把「${option.name}」加入乙部第 ${emptyIndex + 1} 志愿。`);
  }

  // 一键补齐：只按当前校网的有效学校计算空位，再把性别符合的学校按
  // 「竞争度」从充裕到稀缺排入剩余志愿。切换校网后旧草稿仍保留，但不能
  // 被误算成当前校网已填，否则按钮会提前消失或只补入一部分学校。
  function fillMissing() {
    const currentFilledRows = filledB
      .map((s) => ({ row: s, option: currentRosterOption(s.name) }))
      .filter((entry): entry is { row: SimSchool; option: SchoolOpt } => Boolean(entry.option));
    const outOfRosterRows = filledB.filter((s) => !currentRosterOption(s.name));
    const filled = new Set(currentFilledRows.map(({ option }) => option.name));
    const rank = (o: SchoolOpt) => {
      const b = relativeBand(o.name, o.quota ?? null);
      return b === "充裕" ? 0 : b === "普通" ? 1 : 2;
    };
    const candidates = partBSchoolOpts
      .filter((o) => !filled.has(o.name) && !genderBadSchool(o))
      .sort((a, b) => rank(a) - rank(b) || (b.quota ?? 0) - (a.quota ?? 0));
    const need = Math.max(0, targetB - filled.size);
    // 自动标档：学额充裕→保底（安全垫），普通/稀缺→匹配（可接受），避免补齐后保底为 0
    const picks = candidates.slice(0, need).map((o) => ({
      name: o.name,
      tier: (relativeBand(o.name, o.quota ?? null) === "充裕" ? "safe" : "match") as SimTier,
    }));
    if (need === 0) {
      showFillTip(`当前已填满 ${partBNetFilter} 网的 ${targetB} 所有效学校。`);
      return;
    }

    // 保留当前校网已有顺序；简体别名统一回存为名册中的繁体名称。
    const filledArr = currentFilledRows.map(({ row, option }) => ({ ...row, name: option.name }));
    const blanks = Array.from(
      { length: Math.max(0, targetB - filledArr.length - picks.length) },
      () => ({ name: "", tier: "match" as SimTier })
    );
    // 不删除切换校网后留下的旧草稿，放到末尾继续显示警告；当前校网学校会先被真正补齐。
    setPartB([...filledArr, ...picks, ...blanks, ...outOfRosterRows]);

    if (picks.length < need) {
      showFillTip(
        `已补入 ${picks.length} 所；${partBNetFilter} 网在当前「${partBGenderFilter}」筛选下只有 ${filled.size + picks.length}/${targetB} 所可选。切换为“不限”可列出本网全部学校。`
      );
    } else if (outOfRosterRows.length > 0) {
      showFillTip(`已补齐 ${partBNetFilter} 网有效学校；另保留 ${outOfRosterRows.length} 个旧校网草稿，请替换或删除。`);
    } else {
      showFillTip(`已补齐 ${targetB} 所 ${partBNetFilter} 网学校。`);
    }
  }

  // 按建议顺序一键重排（只重排已填学校，空位保留在末尾）
  function applyAdvice() {
    // Recompute from the setter's current value. This avoids applying a
    // suggestion captured before the last keystroke/drag and keeps the slide
    // line and the displayed order based on the same snapshot.
    setPartB((current) => {
      const currentFilled = current.filter((s) => s.name.trim());
      const currentAdvice = suggestOrder(currentFilled, (n) => quotaMap.get(n) ?? null);
      return applySuggestedOrder(current, currentAdvice.suggested);
    });
  }

  function genderBadge(name: string, options: SchoolOpt[], genderFilter = kidGender) {
    const info = options.find((o) => o.name === name.trim());
    if (
      info?.gender &&
      genderFilter !== "不限" &&
      ((info.gender === "男校" && genderFilter === "女") || (info.gender === "女校" && genderFilter === "男"))
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
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[880px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · 志愿结构模拟器</p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            交表前，先模拟一遍整张志愿表
          </h1>
          <p className="mt-2 max-w-[620px] text-[var(--p-secondary)]">
            把甲部＋乙部志愿填进来，查看完整结构体检、风险等级、修改建议与叩门预案，一页 PDF 带走。
          </p>
          <p className="mt-3 rounded-[8px] border-l-4 border-[var(--p-hl-yellow-border)] bg-[var(--p-hl-yellow-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            ⚠️ 我们不预测录取概率（随机编号不可模拟）。这个模拟器只回答一个问题：<strong>你这张表，有没有结构性错误。</strong>
          </p>
          <div className="mt-3 grid gap-2 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#B45309]">阶段一 · 自行分配（看计分）</p>
              <p className="mt-1 text-[var(--p-secondary)]">底牌卡＋甲类预检用这里。只有 1 次机会：失败自动进统一派位（无损失）、录取须注册（退出统派）——填的一定是「录取了也不后悔」的学校。</p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase text-[#0F766E]">阶段二 · 统一派位（随机编号，不看计分）</p>
              <p className="mt-1 text-[var(--p-secondary)]">甲部＋乙部志愿表、派位历史参考和顺序建议都在这里：10 分和 35 分完全平等，统一派位仍按真实志愿顺序及随机编号处理。</p>
            </div>
          </div>
          <p className="mt-3 text-sm">
            阶段一还没想好？<a className="underline" href="/tools/p1-discretionary">先去「自行分配投表决策台」定这唯一一票 →</a>
          </p>
          <DataVersionBadge locale={locale} />
        </div>

        {/* 第一步：校网与计分 */}
        <section className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
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
              <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">孩子性别（阶段一底牌卡用）</span>
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

        {/* 阶段一工具：先确定自行分配的目标校，再进入统一派位填表 */}
        <SchoolFitCard options={allSchoolOpts} score={calcScore(rel, org)} kidGender={kidGender} locale={locale} />

        <SchoolCompare locale={locale} />

        {shortlistedPrimary.length > 0 && (
          <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">我的候选 · 导入志愿</h2>
              <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">本机清单</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">
              报告页或学校对比页收藏的小学会显示在这里。导入只会填入当前空位，不会自动改变其他志愿顺序；甲部、乙部仍分别遵守自己的校网和性别筛选。
            </p>
            <div className="mt-4 grid gap-2">
              {shortlistedPrimary.map(({ entry, option }) => {
                const aAllowed = Boolean(option && partASchoolOpts.some((candidate) => candidate.name === option.name));
                const bAllowed = Boolean(option && partBSchoolOpts.some((candidate) => candidate.name === option.name) && !genderBadSchool(option));
                return (
                  <div key={entry.id} className="flex flex-wrap items-center gap-2 rounded-[8px] border border-[var(--p-gray-300)] px-3 py-2">
                    <span className="min-w-0 flex-1 text-sm font-bold text-[var(--p-fg)]">{entry.name}</span>
                    {option ? (
                      <>
                        <span className="font-mono text-[10px] text-[var(--p-secondary)]">{option.net} 网 · {option.gender || "男女校"}</span>
                        <button
                          type="button"
                          onClick={() => importShortlistToPartA(option)}
                          disabled={!aAllowed}
                          className="rounded-[6px] border border-[var(--p-fg)] px-2.5 py-1 text-xs font-bold text-[var(--p-fg)] disabled:cursor-not-allowed disabled:opacity-35"
                          title={!aAllowed ? "不符合当前甲部筛选" : undefined}
                        >
                          加入甲部
                        </button>
                        <button
                          type="button"
                          onClick={() => importShortlistToPartB(option)}
                          disabled={!bAllowed}
                          className="rounded-[6px] border border-[var(--p-hl-border)] px-2.5 py-1 text-xs font-bold text-[var(--p-hl-border)] disabled:cursor-not-allowed disabled:opacity-35"
                          title={!bAllowed ? `不属于当前乙部校网 ${partBNetFilter} 或性别不符` : undefined}
                        >
                          加入乙部
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-[#C2410C]">不在当前小一官津名册</span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-[var(--p-secondary)]">
              乙部按钮只允许导入当前选择校网内、且符合当前性别筛选的学校；如按钮变灰，请先调整对应筛选。
            </p>
          </section>
        )}

        {/* 甲部 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">② 甲部志愿（不受校网限制，最多 3 个）</h2>
            <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">阶段二 · 统一派位</span>
          </div>
          <div className="mt-3 rounded-[8px] bg-[var(--p-bg)] px-3 py-3 text-sm text-[var(--p-secondary)]">
            <p>
              甲部仍可填全港学校；以下条件只用于收窄候选，不改变甲部不受校网限制的规则。
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs font-bold uppercase">候选校网</span>
                <select
                  value={partANetFilter}
                  onChange={(e) => setPartANetFilter(e.target.value)}
                  className={tierCls + " w-52"}
                >
                  <option value={ALL_NETS}>{ALL_NETS}（甲部全港任选）</option>
                  {P1.nets.map((n) => (
                    <option key={n.net} value={n.net}>{n.net} 网（{n.area_short}）</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs font-bold uppercase">候选性别</span>
                <select
                  value={partAGenderFilter}
                  onChange={(e) => setPartAGenderFilter(e.target.value)}
                  className={tierCls + " w-32"}
                >
                  <option value="不限">不限（不筛选）</option>
                  <option value="男">男孩（男校＋男女校）</option>
                  <option value="女">女孩（女校＋男女校）</option>
                </select>
              </label>
              <span className="rounded-full bg-[#E7F6F2] px-2 py-1 text-xs font-bold text-[#0F766E]">
                甲部独立筛选：{partAGenderFilter === "不限" ? "不限" : `${partAGenderFilter}孩可接受${partAGenderFilter === "男" ? "男校＋男女校" : "女校＋男女校"}`}
              </span>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            {partA.map((s, i) => (
              <div key={i} className="flex gap-2">
                <SchoolCombobox
                  options={partASchoolOpts}
                  value={s.name}
                  onChange={(v) => setRow(partA, setPartA, i, { name: v })}
                  placeholder={`甲部第 ${i + 1} 志愿（全港任选，可搜索或下拉）`}
                  ariaLabel={L(`甲部第 ${i + 1} 志愿学校`, locale)}
                  locale={locale}
                />
                {genderBadge(s.name, allSchoolOpts, partAGenderFilter)}
                <select
                  value={s.tier}
                  onChange={(e) => setRow(partA, setPartA, i, { tier: e.target.value as SimTier })}
                  className={tierCls + " w-24"}
                  aria-label={L(`甲部第 ${i + 1} 志愿风险类别`, locale)}
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
          {partAGenderMismatchNames.length > 0 && (
            <p className="mt-3 rounded-[8px] bg-[#FDEBE7] px-4 py-3 text-sm font-bold text-[#C2410C]">
              ⚠️ 甲部有性别不符的学校：{partAGenderMismatchNames.join("、")}。当前性别筛选已将这类学校排除在候选下拉之外，请替换志愿。
            </p>
          )}
        </section>

        {/* 乙部 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">③ 乙部志愿（所属校网，最多 30 个）</h2>
            <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">阶段二 · 统一派位</span>
            <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">已填 {bCount}/{targetB}（本网共 {targetB} 所）</span>
          </div>
          <div className="mt-3 rounded-[8px] bg-[var(--p-bg)] px-3 py-3 text-sm text-[var(--p-secondary)]">
            <p>乙部校网及性别为独立筛选，不读取上方基本信息；乙部实际派位仍以这里选定的所属校网为准。</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <label className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs font-bold uppercase">乙部校网</span>
                <select
                  value={partBNetFilter}
                  onChange={(e) => setPartBNetFilter(e.target.value)}
                  className={tierCls + " w-52"}
                >
                  {P1.nets.map((n) => (
                    <option key={n.net} value={n.net}>{n.net} 网（{n.area_short}）</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2">
                <span className="shrink-0 font-mono text-xs font-bold uppercase">乙部性别</span>
                <select
                  value={partBGenderFilter}
                  onChange={(e) => setPartBGenderFilter(e.target.value)}
                  className={tierCls + " w-32"}
                >
                  <option value="不限">不限（不筛选）</option>
                  <option value="男">男孩（男校＋男女校）</option>
                  <option value="女">女孩（女校＋男女校）</option>
                </select>
              </label>
              <span className="rounded-full bg-[#E7F6F2] px-2 py-1 text-xs font-bold text-[#0F766E]">
                乙部独立筛选：{partBGenderFilter === "不限" ? "不限" : `${partBGenderFilter}孩可接受${partBGenderFilter === "男" ? "男校＋男女校" : "女校＋男女校"}`}
              </span>
            </div>
          </div>
          <div className="mt-2 rounded-[8px] bg-[var(--p-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
            <b className="text-[var(--p-fg)]">冲刺 / 匹配 / 保底 是什么意思？</b><br />
            统派像「抢椅子」：电脑按你填的顺序，从乙一开始一所一所试——这所学额还够吗、你的随机编号排得上吗？排不上就试下一所，直到有一所把你收下。所以每所志愿都要按你的偏好放：
            <b>冲刺</b>=最想进、竞争激烈，中了是惊喜，放 1-2 间（放多了大概率都轮不到，浪费位置）；
            <b>匹配</b>=够得着、竞争适中、<b>派到也满意</b>的学校，这是志愿表主力——你大概率就落在这里；
            <b>保底</b>=学额充足、派到也满意的安全垫，放在前 60% 位置内——万一前面全滑了，至少还有它接住你，不会落空。
            工具会检查你标的是否和实际学额/竞争匹配。
            <b className="text-[#B45309]">注意：乙部不看计分——10 分和 35 分在这里完全平等，只按志愿顺序＋随机编号派位；你的计分只影响阶段一（自行分配）。</b>
          </div>
          <p className="mt-2 text-xs text-[var(--p-secondary)]">
            💡 可拖拽或点 ↑↓ 调整顺序；名额规模参考和顺序建议会实时更新
          </p>
          <div className="mt-3 grid gap-2">
            {partB.map((s, i) => (
              // Keep the row mounted while its controlled input value changes.
              // Including s.name here remounted the combobox after every keystroke,
              // which dropped focus and forced users to click before deleting again.
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
                  options={partBSchoolOpts.filter((o) => {
                    if (partBGenderFilter === "不限") return true;
                    return !(
                      (o.gender === "男校" && partBGenderFilter === "女") ||
                      (o.gender === "女校" && partBGenderFilter === "男")
                    );
                  })}
                  value={s.name}
                  onChange={(v) => setRow(partB, setPartB, i, { name: v })}
                  placeholder={`乙部第 ${i + 1} 志愿（可搜索或下拉）`}
                  ariaLabel={L(`乙部第 ${i + 1} 志愿学校`, locale)}
                  locale={locale}
                />
                {genderBadge(s.name, partBSchoolOpts, partBGenderFilter)}
                {(quotaMap.get(s.name.trim()) ?? 0) > 0 && (quotaMap.get(s.name.trim()) ?? 0) <= 30 && (
                  <span className="shrink-0 self-center rounded bg-[var(--p-hl-yellow-bg)] px-2 py-1 font-mono text-xs text-[var(--p-fg)]">
                    学额{quotaMap.get(s.name.trim())}
                  </span>
                )}
                <select
                  value={s.tier}
                  onChange={(e) => setRow(partB, setPartB, i, { tier: e.target.value as SimTier })}
                  className={tierCls + " w-20"}
                  aria-label={L(`乙部第 ${i + 1} 志愿风险类别`, locale)}
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
          {/* 网内学校体检：逐校标签 */}
          {filledB.length > 0 && (
            <div className="mt-4 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
              <div className="flex items-center gap-2">
                <p className="font-serif text-lg font-bold text-[var(--p-fg)]">网内学校体检</p>
              </div>
              <div className="mt-3 grid gap-2">
                {filledB.slice(0, unlocked ? filledB.length : 1).map((s2, i2) => {
                  const info = partBSchoolOpts.find((o) => o.name === s2.name.trim());
                  if (!info) return null;
                  const genderBad = partBGenderFilter !== "不限" && ((info.gender === "男校" && partBGenderFilter === "女") || (info.gender === "女校" && partBGenderFilter === "男"));
                  return (
                    <div key={i2} className="rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-card)] px-3 py-2 text-sm">
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
            </div>
          )}

          {/* 派位数据参考：不以名额大小或未核验热度推导个人安全线 */}
          {slide.positions.length > 0 && (
            <div className="mt-4 rounded-[10px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-serif text-lg font-bold text-[var(--p-fg)]">统一派位需求参考</p>
                <span className="rounded-full bg-[#E7F6F2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#0F766E]">校网 {partBNetFilter}</span>
                <span className="rounded-full bg-[#FEF3E2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#9A5B00]">校级热度：未核实</span>
              </div>
              <div className="mt-2 rounded-[8px] bg-[var(--p-hl-yellow-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
                <b className="text-[var(--p-fg)]">为什么不显示「滑档线」？</b><br />
                本次核验的教育局 2024、2025 年度报告只提供<strong>校网层面的获派结果</strong>，没有逐校申请人数、逐校志愿排名人数或申请/名额比。名额多不等于竞争低；把名额单独当成安全信号会误导，所以暂不推断安全线和最坏落点。
              </div>
              <p className="mt-2 text-sm text-[var(--p-fg)]">{slide.note}</p>
              <div className="mt-3 flex items-end gap-1" aria-label="乙部志愿名额相对规模">
                {slide.positions.map((position, i) => {
                  const colors: Record<CapacityBand, string> = {
                    相对偏小: "#64748B",
                    网内常见: "#2563EB",
                    相对偏大: "#0F766E",
                    资料不足: "#94A3B8",
                  };
                  return (
                    <div key={`${position.name}-${i}`} className="flex-1 text-center">
                      <div
                        className="flex h-7 items-center justify-center rounded font-mono text-[11px] text-white"
                        style={{ background: colors[position.capacityBand] }}
                        title={`${i + 1}. ${position.name}；2027/28 名册自行分配学位 ${position.quota ?? "未列"}；${position.capacityBand}；校级统一派位需求未知`}
                        aria-label={`${i + 1}：${position.name}，自行分配学位 ${position.quota ?? "未列"}，${position.capacityBand}，校级需求未知`}
                      >
                        {i + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold">
                <span className="rounded px-2 py-0.5 text-white" style={{ background: "#64748B" }}>名额相对偏小</span>
                <span className="rounded px-2 py-0.5 text-white" style={{ background: "#2563EB" }}>网内常见</span>
                <span className="rounded px-2 py-0.5 text-white" style={{ background: "#0F766E" }}>名额相对偏大</span>
                <span className="font-normal text-[var(--p-secondary)]">只比较本校网 2027/28 名册中的自行分配学位数，不代表统一派位名额或竞争热度</span>
              </div>

              <div className="mt-4 border-t border-[var(--p-gray-300)] pt-3">
                <h3 className="text-sm font-bold text-[var(--p-fg)]">本校网历年获派人数（按派位阶段及志愿）</h3>
                <p className="mt-1 text-xs text-[var(--p-secondary)]">
                  统计居住在校网 {partBNetFilter} 的申请儿童最终获派的人数。这里数的是<strong>获派结果</strong>，不是申请总人数、学校热门度或个人成功率。
                </p>
                {netAllocationHistory.length > 0 ? (
                  <div className="mt-2 overflow-x-auto">
                    <table className="min-w-[920px] border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-[var(--p-gray-300)] text-left text-[var(--p-secondary)]">
                          <th rowSpan={2} className="py-2 pr-3 align-bottom">年度</th>
                          <th rowSpan={2} className="px-3 py-2 align-bottom">自行分配阶段<br />获派人数</th>
                          <th colSpan={1} className="px-3 py-2 text-center">甲部（全港选校）</th>
                          <th colSpan={3} className="px-3 py-2 text-center">乙部（本校网选校）</th>
                          <th rowSpan={2} className="px-3 py-2 align-bottom">统一派位<br />获派小计</th>
                          <th rowSpan={2} className="py-2 pl-3 align-bottom">两阶段获派合计</th>
                        </tr>
                        <tr className="border-b border-[var(--p-gray-300)] text-left text-[var(--p-secondary)]">
                          <th className="px-3 py-2">第 1–3 志愿</th>
                          <th className="px-3 py-2">第 1–3 志愿</th>
                          <th className="px-3 py-2">第 4–10 志愿</th>
                          <th className="px-3 py-2">第 11 志愿及以后</th>
                        </tr>
                      </thead>
                      <tbody>
                        {netAllocationHistory.map((row) => (
                          <tr key={row.year} className="border-b border-[var(--p-gray-300)] text-[var(--p-fg)]">
                            <td className="py-2 pr-3 font-mono">{row.year}</td>
                            <td className="px-3 py-2">{row.discretionarySubtotal.toLocaleString("zh-HK")}</td>
                            <td className="px-3 py-2">{row.unrestrictedTop3.toLocaleString("zh-HK")}</td>
                            <td className="px-3 py-2">{row.homeNetTop3.toLocaleString("zh-HK")}</td>
                            <td className="px-3 py-2">{row.homeNet4to10.toLocaleString("zh-HK")}</td>
                            <td className="px-3 py-2">{row.homeNetBeyond10.toLocaleString("zh-HK")}</td>
                            <td className="px-3 py-2">{row.centralSubtotal.toLocaleString("zh-HK")}</td>
                            <td className="py-2 pl-3 font-semibold">{row.totalAllocated.toLocaleString("zh-HK")}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2 space-y-1 text-[11px] text-[var(--p-secondary)]">
                      <p><strong>怎么算：</strong>“统一派位获派小计”＝甲部第 1–3 志愿＋乙部三个志愿区间；“两阶段获派合计”＝自行分配阶段获派人数＋统一派位获派小计。</p>
                      {netAllocationHistory.length > 0 && (() => {
                        const latest = netAllocationHistory[netAllocationHistory.length - 1];
                        return <p>例如 {latest.year} 年校网 {partBNetFilter}：自行分配 {latest.discretionarySubtotal.toLocaleString("zh-HK")} 人＋统一派位 {latest.centralSubtotal.toLocaleString("zh-HK")} 人＝合计 {latest.totalAllocated.toLocaleString("zh-HK")} 人。</p>;
                      })()}
                      <p>校网表按居住校网统计；下方全港年度表范围不同，不能把两者视为同一分母。</p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-xs text-[var(--p-secondary)]">所选校网暂无已录入的逐网年度结果。</p>
                )}
              </div>

              <details className="mt-4 border-t border-[var(--p-gray-300)] pt-3">
                <summary className="cursor-pointer text-sm font-bold text-[var(--p-fg)]">查看 2015–2025 全港学位分配年度总数</summary>
                <p className="mt-1 text-xs text-[var(--p-secondary)]">全港自行分配及统一派位获分配学位的年度总数，不是报名人数或竞争热度。</p>
                <div className="mt-2 overflow-x-auto">
                  <table className="min-w-[420px] border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[var(--p-gray-300)] text-left text-[var(--p-secondary)]">
                        <th className="py-2 pr-4">年度</th><th className="py-2 pr-4">自行分配</th><th className="py-2 pr-4">统一派位</th><th className="py-2">总数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemAllocationHistory.map((row) => (
                        <tr key={row.year} className="border-b border-[var(--p-gray-300)] text-[var(--p-fg)]">
                          <td className="py-1.5 pr-4 font-mono">{row.year}</td>
                          <td className="py-1.5 pr-4">{row.discretionaryAllocated.toLocaleString("zh-HK")}</td>
                          <td className="py-1.5 pr-4">{row.centralAllocated.toLocaleString("zh-HK")}</td>
                          <td className="py-1.5">{row.totalAllocated.toLocaleString("zh-HK")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>

              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--p-secondary)]">
                {P1_ALLOCATION_HISTORY.meta.sources.map((source) => (
                  <a key={source.year} href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    教育局 {source.year} 年度报告（{source.table}）
                  </a>
                ))}
                <a href={P1_ALLOCATION_HISTORY.meta.rosterSource.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                  教育局 {P1_ALLOCATION_HISTORY.meta.rosterSource.title}（名额参考）
                </a>
                <span>数据核验至 {P1_ALLOCATION_HISTORY.meta.last_verified}</span>
              </div>
              <p className="mt-2 text-[11px] text-[var(--p-secondary)]">
                ⓘ 校级需求/热度尚无可用的核实记录；即使名额较大，也不标作保底。校网统计只能作为历史背景，不能替代学校层面的申请数据或录取概率。
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
                disabled={advice.differences.length === 0 || Boolean(partBOutOfRoster)}
                title={partBOutOfRoster ? "请先替换不属于当前校网的乙部学校" : undefined}
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
            {bCount < targetB && (
              <button
                onClick={fillMissing}
                className="rounded-[8px] border border-dashed border-[var(--p-hl-border)] px-4 py-2 text-sm font-bold text-[var(--p-hl-border)] hover:bg-[var(--p-hl-bg)]"
                title="把当前校网尚未填写、且符合乙部性别筛选的学校自动补入"
              >
                一键补齐剩余 {targetB - bCount} 所（按学额充裕度）
              </button>
            )}
          </div>
          {fillTip && (
            <p className="mt-3 rounded-[8px] bg-[var(--p-hl-yellow-bg)] px-3 py-2 text-xs font-bold text-[var(--p-fg)]">
              {fillTip}
            </p>
          )}
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

        {/* 方案存档：多套顺序 A/B 试错 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">方案存档 · A/B 试错</h2>
          </div>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            最多存 3 套志愿方案（不同校网/顺序/保底配置），并排对比志愿结构和校级需求数据状态；不把未经核实的热度当成录取判断。
          </p>

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
                  还没有保存的方案。分别保存不同志愿顺序或校网方案，可对比志愿结构；系统不会虚构校级热度或安全线。
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
                        <th className="py-2 pr-3 font-mono text-xs text-[var(--p-secondary)]">需求数据</th>
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
                              {slide.positions.length > 0 ? "校级未知" : "暂无志愿"}
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
        </section>

        {/* 完整体检报告 */}
        <section className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1">
          <h2 className="font-serif text-xl font-bold text-[var(--p-fg)]">完整体检报告</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
                风险等级（A/B/C）＋ 逐项结构检查明细 ＋ 修改建议 ＋ 三套预案（叩门 72h／直资私立后手／注册时限），可保存为一页 PDF。
              </p>
              <p className="mt-2 font-mono text-sm">
                <span className="text-[var(--p-secondary)]">完整功能现已开放，可直接查看和保存。</span>
              </p>
            </div>
            {unlocked ? (
              <a
                href="/tools/p1-simulator/report"
                className="rounded-[8px] bg-[var(--p-fg)] px-6 py-3 text-sm font-bold text-[var(--p-bg)] no-underline"
              >
                查看我的报告 →
              </a>
            ) : null}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={save} className="rounded-[8px] border border-[var(--p-gray-300)] px-4 py-2 text-sm text-[var(--p-secondary)]">
              {savedTip ? "已保存草稿 ✓" : "保存草稿到本机"}
            </button>
            <span className="text-xs text-[var(--p-secondary)]">输入只保存在你自己的浏览器，不上传服务器。</span>
          </div>
          <p className="mt-2 rounded-[8px] bg-[var(--p-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">
            {RENEW_NOTE}
          </p>
        </section>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6 text-sm leading-relaxed text-[var(--p-secondary)]">
          <p className="font-bold text-[var(--p-fg)]">📎 检查依据</p>
          <p className="mt-2">
            结构检查规则基于本站《香港小一入学2027/28完整攻略》的志愿金字塔方法论（冲刺/匹配/保底），
            学校名单来自教育局 2027/28 官方校网名册（<a className="underline" href="/tools/p1-school-net">校网数据库</a>）。
            模拟器只做结构自查，不预测录取结果；正式交表请以教育局公布为准。
          </p>
        </div>
      </div>
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

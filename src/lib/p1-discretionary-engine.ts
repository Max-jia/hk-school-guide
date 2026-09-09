// 阶段一 · 自行分配「投表决策台」引擎（纯函数）
// 只做「可核实的规则核对 + 相对竞争位置 + 策略推导」，不预测录取概率
import { assessSchoolFit, type FitResult } from "@/lib/sim-engine";

export const DP_REL_OPTS: { v: string; label: string; pts: number }[] = [
  { v: "", label: "无", pts: 0 },
  { v: "work", label: "父/母全职在与该小学同一校址的幼稚园或中学部工作", pts: 20 },
  { v: "sec", label: "兄/姊在与该小学同一校址的中学部就读", pts: 20 },
  { v: "manager", label: "父/母为该小学的校董", pts: 20 },
  { v: "grad", label: "父/母或兄/姊为该小学的毕业生", pts: 10 },
  { v: "first", label: "首名出生子女（家庭中最年长的孩子）", pts: 5 },
];

export const DP_ORG_OPTS: { v: string; label: string; pts: number }[] = [
  { v: "", label: "无", pts: 0 },
  { v: "religion", label: "与该校办学团体有相同宗教信仰", pts: 5 },
  { v: "member", label: "父/母为该小学主办社团的成员", pts: 5 },
];

export function calcDpScore(rel: string, org: string): number {
  const r = DP_REL_OPTS.find((o) => o.v === rel)?.pts ?? 0;
  const o = DP_ORG_OPTS.find((x) => x.v === org)?.pts ?? 0;
  return r + o + 10;
}

// 防算错提示：关系项 5 选 1、办学团体项 2 选 1，不能叠加；给出常见组合与最高可得分
export function dpScoreTips(rel: string, org: string): { ok: boolean; tips: string[] } {
  const tips: string[] = [];
  if (rel !== "") tips.push(`关系项已选「${DP_REL_OPTS.find((o) => o.v === rel)?.label}」（${DP_REL_OPTS.find((o) => o.v === rel)?.pts} 分）——关系项 5 项只能选 1 项，不能与其他关系叠加。`);
  if (org !== "") tips.push(`办学团体项已选「${DP_ORG_OPTS.find((o) => o.v === org)?.label}」（${DP_ORG_OPTS.find((o) => o.v === org)?.pts} 分）——办学团体项 2 项只能选 1 项。`);
  const s = calcDpScore(rel, org);
  if (s === 15) tips.push("常见组合参考：首名出生子女（5）＋宗教（5）＋适龄（10）＝20 分；毕业校友（10）＋适龄（10）＝20 分。");
  if (s === 20) tips.push("常见组合参考：毕业校友（10）＋宗教（5）＋适龄（10）＝25 分；20 分关系（同址兄姊/父母任职/校董）＋适龄（10）＝30 分。");
  if (s === 25) tips.push("若家庭符合 20 分关系（同址兄姊就读/父母任职/校董），可到 30 分；再加办学团体 5 分可到 35 分顶格。");
  tips.push(`当前最高可得分：${s} 分（适龄 10 ＋ 关系 ${DP_REL_OPTS.find((o) => o.v === rel)?.pts ?? 0} ＋ 办学团体 ${DP_ORG_OPTS.find((o) => o.v === org)?.pts ?? 0}）。`);
  return { ok: true, tips };
}

export function dpScorePosition(score: number): { label: string; tone: "good" | "mid" | "warn" } {
  if (score >= 30) return { label: "强势组合 · 可锁定心仪校", tone: "good" };
  if (score === 25) return { label: "有竞争力 · 热门校同分抽签", tone: "good" };
  if (score === 20) return { label: "最常见组合 · 热门校基本靠抽签", tone: "mid" };
  return { label: "底牌偏弱 · 重心放统一派位乙部", tone: "warn" };
}

// 投表策略：基于官方规则推导（失败自动进统派=无损失；录取须注册=锁定），非官方建议
export function dpStrategy(score: number): { title: string; text: string; tone: "good" | "mid" | "warn" } {
  if (score >= 30) return { title: "强势组合 · 可锁定心仪校", text: "自行分配直接填你最想去的那间：中了就注册，等于提前上岸；不中自动进统派，没损失。", tone: "good" };
  if (score === 25) return { title: "有竞争力 · 放心冲", text: "热门校同分靠抽签，但失败无损失——自行分配就该冲最想进的，别保守。", tone: "good" };
  if (score === 20) return { title: "最常见组合 · 冲一下不亏", text: "热门校基本靠抽签，中了是惊喜，不中自动进统派继续抽。填最想去的，别浪费这次免费机会。", tone: "mid" };
  return { title: "底牌偏弱 · 重心放统派", text: "自行分配陪跑为主，别抱期待；把精力放在统一派位乙部结构和叩门预案上。", tone: "warn" };
}

export const SAME_SCORE_NOTE =
  "同分抽签：同一分数申请者超额时须抽签决定（以教育局/学校公布为准）。所以「XX 分=稳进」不成立——25 分旧生在热门校也可能要抽签；反之 20 分也不等于没机会，抽签人人平等。";

export type CandidateAssessment = {
  name: string;
  quota: number | null;
  catA: boolean;
  catAReasons: string[];
  fit: FitResult | null;
  strategy: { title: string; text: string; tone: "good" | "mid" | "warn" } | null;
};

export function assessCandidate(
  name: string,
  quota: number | null,
  score: number,
  catASib: boolean,
  catAParent: boolean
): CandidateAssessment {
  const reasons: string[] = [];
  if (catASib) reasons.push("兄/姊正在该校就读");
  if (catAParent) reasons.push("父/母在该校任职");
  const catA = reasons.length > 0;
  return {
    name,
    quota,
    catA,
    catAReasons: reasons,
    fit: catA ? null : assessSchoolFit(score, quota, name),
    strategy: catA ? null : dpStrategy(score),
  };
}

// 投表决策报告：选定最终目标后的一页结论
export type DiscretionaryReport = {
  school: string;
  quota: number | null;
  score: number;
  scoreTips: string[];
  catA: boolean;
  catAReasons: string[];
  fit: FitResult | null;
  strategy: { title: string; text: string; tone: "good" | "mid" | "warn" } | null;
  timeline: { when: string; action: string }[];
};

export function buildDiscretionaryReport(
  name: string,
  quota: number | null,
  rel: string,
  org: string,
  catASib: boolean,
  catAParent: boolean
): DiscretionaryReport {
  const score = calcDpScore(rel, org);
  const ass = assessCandidate(name, quota, score, catASib, catAParent);
  return {
    school: name,
    quota,
    score,
    scoreTips: dpScoreTips(rel, org).tips,
    catA: ass.catA,
    catAReasons: ass.catAReasons,
    fit: ass.fit,
    strategy: ass.strategy,
    timeline: [
      { when: "交表（2026-09-17~25）", action: "向所选学校递交自行分配申请表；只可交 1 间，多交全部作废。" },
      { when: "放榜（2026-11-23）", action: "学校公布结果；可于上午 10 时起经小一入学电子平台查阅。" },
      { when: "注册（2026-11-25~26）", action: ass.catA ? "甲类必录取——获录取后须在指定日期注册，注册＝退出统一派位。" : "若获录取，须在指定日期注册；逾期视为放弃。注册＝退出统一派位。" },
      { when: "未获录取", action: "自动参加统一派位（无须另行申请）；统派仍可把该校放第一志愿（双保险）。" },
    ],
  };
}

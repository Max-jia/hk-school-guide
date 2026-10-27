// 阶段一 · 自行分配「投表决策台」引擎（纯函数）
// 核对计分与申请步骤；缺少当届申请者分数分布时，不判断个人胜算。
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
  tips.push(`当前得分：${s} 分（适龄 10 ＋ 关系 ${DP_REL_OPTS.find((o) => o.v === rel)?.pts ?? 0} ＋ 办学团体 ${DP_ORG_OPTS.find((o) => o.v === org)?.pts ?? 0}）。适龄 10 分以翌年 9 月开学时年满 5 岁 8 个月至 7 岁为准。`);
  return { ok: true, tips };
}

export function dpScorePosition(score: number): { label: string; tone: "good" | "mid" | "warn" } {
  return { label: `${score} 分 · 须结合该校当届申请情况`, tone: "mid" };
}

export function dpStrategy(score: number): { title: string; text: string; tone: "good" | "mid" | "warn" } {
  return {
    title: `${score} 分怎样选校`,
    text: "先选获录取后愿意入读、通勤及教学安排都能接受的学校，再核对证明文件。分数用于同校计分申请者之间的排序；缺少当届分数分布和实际计分学额，不能判断是否够分或是否需要抽签。未获自行学位仍须按时办理统一派位选校。",
    tone: "mid",
  };
}

export const SAME_SCORE_NOTE =
  "计分申请先按分数高低分配；在剩余学额不足以取录某一同分组的全部申请者时，才以随机方式决定该同分组的取录名单。不同分数并非同池抽签。单凭20分或25分，不能判断是否轮到该分数组，也不能判断个人录取机会。";

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
      { when: "交表（2026-09-17~25）", action: "电子平台 9/17-25 递交；直接交回申请学校 9/21-25。只可交 1 间，多交全部作废。" },
      { when: "放榜（2026-11-23）", action: "学校公布结果；可于上午 10 时起经小一入学电子平台查阅。" },
      { when: "注册（2026-11-25~26）", action: ass.catA ? "甲类必录取——获录取后须在指定日期注册，获派自行学位者不再获统派另一学位。" : "若获录取，须在指定日期注册；逾期视为放弃。获派自行学位者不再获统派另一学位。" },
      { when: "未获录取", action: "仍符合统筹资格且未因接受直资小学学位退出统筹时，继续办理统一派位选校；统派仍可把该校放第一志愿（须按当届选校表及校网规则填写）。" },
    ],
  };
}

// 小一志愿结构体检引擎（纯函数，客户端可安全运行）
// 只做「表结构检查」，不做录取概率预测——这是产品底线。

export type SimTier = "sprint" | "match" | "safe";

export type SimSchool = {
  name: string;
  tier: SimTier;
  note?: string;
};

export type SimInput = {
  net: string;
  score: number; // 乙类计分 10–35
  partA: SimSchool[]; // 甲部，最多 3
  partB: SimSchool[]; // 乙部，最多 30
  netSchoolCount?: number; // 本网参加派位的官津学校数（乙部可填上限）
};

export type CheckStatus = "pass" | "warn" | "fail";

export type CheckItem = {
  id: string;
  title: string;
  status: CheckStatus;
  detail: string;
  fix?: string;
};

export type SimReport = {
  grade: "A" | "B" | "C";
  gradeLabel: string;
  net: string;
  score: number;
  partACount: number;
  partBCount: number;
  targetB: number;
  sprint: number;
  match: number;
  safe: number;
  duplicateNames: string[];
  checks: CheckItem[];
  suggestions: string[];
  knockList: { name: string; reason: string }[];
  generatedAt: string;
};

const TIER_LABEL: Record<SimTier, string> = {
  sprint: "冲刺",
  match: "匹配",
  safe: "保底",
};

function countByTier(list: SimSchool[], tier: SimTier): number {
  return list.filter((s) => s.tier === tier).length;
}

function findDuplicates(list: SimSchool[]): string[] {
  const seen = new Set<string>();
  const dup = new Set<string>();
  for (const s of list) {
    const key = s.name.trim();
    if (!key) continue;
    if (seen.has(key)) dup.add(key);
    seen.add(key);
  }
  return [...dup];
}

export function runSimCheck(input: SimInput): SimReport {
  const partA = input.partA.filter((s) => s.name.trim());
  const partB = input.partB.filter((s) => s.name.trim());
  const score = Math.min(35, Math.max(10, input.score));

  const sprint = countByTier(partB, "sprint");
  const match = countByTier(partB, "match");
  const safe = countByTier(partB, "safe");
  const total = partB.length;
  const netCount = input.netSchoolCount && input.netSchoolCount > 0 ? input.netSchoolCount : 30;
  const target = Math.min(30, netCount); // 乙部可填上限 = 本网学校数（官方30只是表格上限）
  const duplicates = findDuplicates(partB);

  const checks: CheckItem[] = [];

  // 1) 乙部志愿数量（上限 = 本网学校数，不是30）
  if (total <= Math.floor(target * 0.4)) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "fail", detail: `本网共 ${target} 所官津学校，你只填了 ${total} 个志愿，结构严重空洞。`,
      fix: `把网内 ${target} 所真实可接受的学校尽量填满，每个都别抱着「填了也后悔」的心态。`,
    });
  } else if (total < target) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "warn", detail: `本网共 ${target} 所官津学校，你填了 ${total} 个，还有 ${target - total} 个空位。`,
      fix: "空位用来补「派到也满意」的学校，填满不浪费选择权。",
    });
  } else if (total > target) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "warn", detail: `本网官津学校只有 ${target} 所，你却填了 ${total} 个——多出的可能是直资/私立或他网学校，统一派位乙部不会派位这些学校。`,
      fix: "乙部只填本网官津学校；直资/私立走自主申请，可填在志愿表备注里而不是乙部。",
    });
  } else {
    checks.push({ id: "b-count", title: "乙部志愿数量", status: "pass", detail: `本网 ${target} 所官津学校全部填满，没有浪费空位。` });
  }

  // 2) 保底校
  if (safe === 0) {
    checks.push({
      id: "safe", title: "保底校数量",
      status: "fail", detail: "整张表没有任何一间保底校——这是最危险的结构错误。",
      fix: "至少补 2 所「派到也满意」的保底校，这是整张表的安全垫。",
    });
  } else if (safe === 1) {
    checks.push({
      id: "safe", title: "保底校数量",
      status: "warn", detail: "只有 1 所保底校，安全垫偏薄。",
      fix: "建议保底校加到 2–3 所，分散「唯一保底」的风险。",
    });
  } else {
    checks.push({ id: "safe", title: "保底校数量", status: "pass", detail: `有 ${safe} 所保底校，安全垫足够。` });
  }

  // 3) 冲刺比例
  if (sprint >= 6 && sprint / Math.max(total, 1) > 0.6) {
    checks.push({
      id: "sprint-ratio", title: "冲刺/匹配/保底比例",
      status: "warn", detail: `冲刺校占了 ${sprint}/${total}（超过六成），结构失衡。`,
      fix: "冲刺校控制在 30% 以内（一般 2–5 所），中段由匹配校扛，尾部保底收底。",
    });
  } else {
    checks.push({ id: "sprint-ratio", title: "冲刺/匹配/保底比例", status: "pass", detail: `冲刺 ${sprint} · 匹配 ${match} · 保底 ${safe}，结构比例大致健康。` });
  }

  // 4) 重复志愿
  if (duplicates.length > 0) {
    checks.push({
      id: "duplicate", title: "重复志愿",
      status: "fail", detail: `以下学校在乙部出现了不止一次：${duplicates.join("、")}。`,
      fix: "同一间学校在乙部只填一次，重复不会提高命中率，只会浪费志愿位。",
    });
  } else {
    checks.push({ id: "duplicate", title: "重复志愿", status: "pass", detail: "乙部没有重复学校。" });
  }

  // 5) 甲部
  if (partA.length <= 1) {
    checks.push({
      id: "partA", title: "甲部志愿",
      status: "warn", detail: `甲部只填了 ${partA.length}/3。甲部不受校网限制、不占乙部名额，不填满等于放弃免费的机会。`,
      fix: "甲部填满 3 间（全港任选，包括心仪的网外学校）。",
    });
  } else {
    checks.push({ id: "partA", title: "甲部志愿", status: "pass", detail: "甲部填满 3 个选择。" });
  }

  // 6) 计分适配
  if (score <= 20 && sprint >= 6) {
    checks.push({
      id: "fit", title: "计分与冲刺匹配",
      status: "warn", detail: `乙类计分 ${score} 分，却放了 ${sprint} 所冲刺校——底牌和目标明显错配。`,
      fix: "计分不高时，自行阶段热门校基本靠抽签。冲刺留 2–3 所即可，把志愿重心放到匹配校。",
    });
  } else {
    checks.push({ id: "fit", title: "计分与冲刺匹配", status: "pass", detail: `计分 ${score} 分与冲刺校数量没有明显错配。` });
  }

  // 7) 空洞（填了也后悔）
  if (safe < 2 && total < target) {
    checks.push({
      id: "blank", title: "空洞检查",
      status: "warn", detail: `还有 ${target - total} 个空位，且保底校不足 2 所——这些空位应该用来补「派到也满意」的学校。`,
    });
  } else {
    checks.push({ id: "blank", title: "空洞检查", status: "pass", detail: "没有明显「填了也后悔」的空洞。" });
  }

  // 8) 1-1-1 诚意矩阵：甲一与乙一是否同一学校
  const a1 = partA[0]?.name?.trim() || "";
  const b1 = partB[0]?.name?.trim() || "";
  if (a1 && b1) {
    if (a1 === b1) {
      checks.push({
        id: "111", title: "1-1-1 诚意矩阵",
        status: "pass", detail: `甲部第一志愿与乙部第一志愿都是「${a1}」，一致性能在叩门阶段形成诚意筹码。`,
      });
    } else {
      checks.push({
        id: "111", title: "1-1-1 诚意矩阵",
        status: "warn", detail: `甲部第一志愿「${a1}」与乙部第一志愿「${b1}」不是同一所——若目标校在你校网内，建议甲一乙一统一为同一间（1-1-1）；若目标校在网外，本条不适用。`,
        fix: "1-1-1 = 自行分配、甲部第一志愿、乙部第一志愿全填同一间，是叩门时最有力的诚意证明。",
      });
    }
  }

  // 9) 乙一撞车预警：第一志愿冲刺且计分不占优
  if (b1 && partB[0].tier === "sprint" && score <= 20) {
    checks.push({
      id: "b1-collision", title: "乙一撞热门预警",
      status: "warn", detail: `乙部第一志愿「${b1}」是冲刺档，而计分仅 ${score} 分——热门校同分靠抽签，第一志愿命中率并不占优。`,
      fix: "乙一可以保留心仪冲刺校，但乙二务必换成「守得住」的学校，并确保尾部保底充足。",
    });
  } else {
    checks.push({ id: "b1-collision", title: "乙一撞热门预警", status: "pass", detail: "乙一没有明显的撞车风险。" });
  }

  // 10) 乙二宜守不宜攻
  const b2 = partB[1]?.name?.trim() || "";
  if (b2 && partB[1].tier === "sprint") {
    checks.push({
      id: "b2-advice", title: "乙二宜守不宜攻",
      status: "warn", detail: `乙部第二志愿「${b2}」仍是冲刺档——热门校学额大多在乙一用尽，乙二继续冲，滑档风险高。`,
      fix: "乙二改放「匹配档」里你真实能接受的学校，这是填表攻略里最实用的一条。",
    });
  } else {
    checks.push({ id: "b2-advice", title: "乙二宜守不宜攻", status: "pass", detail: "乙二没有采用高风险策略。" });
  }

  const fails = checks.filter((c) => c.status === "fail").length;
  const warns = checks.filter((c) => c.status === "warn").length;
  let grade: "A" | "B" | "C";
  let gradeLabel: string;
  if (fails >= 2) {
    grade = "C"; gradeLabel = "高风险：表结构有明显错误，先改表再交";
  } else if (fails === 1 || warns >= 3) {
    grade = "B"; gradeLabel = "需调整：结构基本成立，但有几处必须补强";
  } else {
    grade = "A"; gradeLabel = "结构健康：这张表没有明显的结构性错误";
  }

  const suggestions: string[] = [];
  checks.forEach((c) => {
    if (c.status !== "pass" && c.fix) suggestions.push(c.fix);
  });
  if (suggestions.length === 0) {
    suggestions.push("保持当前结构，交表前对照《小一入学指南》复核一遍即可。");
  }
  suggestions.push("统一派位含随机编号，任何「保录取」承诺都不可信——你的可控变量只有这张表本身。");

  // 叩门预案：从匹配/保底档里推荐
  const knockPool = [...partB.filter((s) => s.tier === "match"), ...partB.filter((s) => s.tier === "safe")];
  const knockList = knockPool.slice(0, 3).map((s) => ({
    name: s.name,
    reason: s.tier === "safe" ? "保底档，叩门命中面相对大" : "匹配档，作为叩门目标性价比高",
  }));
  if (knockList.length === 0) {
    knockList.push({ name: "（先补保底校）", reason: "没有可用的匹配/保底校，叩门预案无从谈起" });
  }

  return {
    grade,
    gradeLabel,
    net: input.net,
    score,
    partACount: partA.length,
    partBCount: total,
    targetB: target,
    sprint,
    match,
    safe,
    duplicateNames: duplicates,
    checks,
    suggestions,
    knockList,
    generatedAt: new Date().toLocaleString("zh-HK", { timeZone: "Asia/Hong_Kong" }),
  };
}

export { TIER_LABEL };


// ================= v2：决策工作台扩展 =================

export type RiskBand = "稀缺" | "普通" | "充裕";

export function quotaBand(q: number | null | undefined): RiskBand {
  if (!q) return "普通";
  if (q <= 25) return "稀缺";
  if (q <= 50) return "普通";
  return "充裕";
}

export type SlidePosition = {
  name: string;
  band: RiskBand;
  quota: number | null;
};

export type SlideResult = {
  positions: SlidePosition[];
  slideLineIndex: number | null; // 1-based：从这一位起相对安全
  worstFall: { index: number; name: string } | null; // 最坏落点（第一个非稀缺）
  note: string;
};

// 滑档模拟：按当前顺序，用学额稀缺度标风险，推导滑档线与最坏落点
// 明确：这是顺序推导 + 相对竞争烈度，不是录取概率预测
export function computeSlideLine(
  partB: { name: string }[],
  quotaOf: (name: string) => number | null
): SlideResult {
  const positions: SlidePosition[] = partB
    .filter((s) => s.name.trim())
    .map((s) => {
      const q = quotaOf(s.name.trim());
      return { name: s.name.trim(), band: quotaBand(q), quota: q };
    });
  if (positions.length === 0) {
    return { positions: [], slideLineIndex: null, worstFall: null, note: "乙部还没有填写志愿。" };
  }
  // 滑档线：第一个「充裕」，且其后没有「稀缺」的位置
  let slideLineIndex: number | null = null;
  for (let i = 0; i < positions.length; i++) {
    if (positions[i].band === "充裕") {
      let restSafe = true;
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[j].band === "稀缺") { restSafe = false; break; }
      }
      if (restSafe) { slideLineIndex = i + 1; break; }
    }
  }
  // 没有充裕则找第一个「普通」且其后无稀缺的位置
  if (slideLineIndex === null) {
    for (let i = 0; i < positions.length; i++) {
      if (positions[i].band === "普通") {
        let restSafe = true;
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[j].band === "稀缺") { restSafe = false; break; }
        }
        if (restSafe) { slideLineIndex = i + 1; break; }
      }
    }
  }
  // 最坏落点：假设前面所有稀缺校都落空，落到第一个非稀缺位置
  const firstNonScarce = positions.findIndex((p) => p.band !== "稀缺");
  let worstFall: SlideResult["worstFall"] = null;
  if (firstNonScarce >= 0) {
    worstFall = { index: firstNonScarce + 1, name: positions[firstNonScarce].name };
  } else {
    worstFall = { index: positions.length + 1, name: "（无安全落点）" };
  }
  let note: string;
  const scarceCount = positions.filter((p) => p.band === "稀缺").length;
  if (slideLineIndex !== null) {
    note = `按当前顺序，第 ${slideLineIndex} 位起相对安全；最坏情况会落到第 ${worstFall.index} 位（${worstFall.name}）。`;
  } else {
    note = `本网学额普遍偏紧，没有明确的相对安全位；建议把保底校尽量前移，并提前准备叩门。`;
  }
  if (scarceCount > 0) {
    note += ` 前段有 ${scarceCount} 所学额稀缺校，命中依赖抽签。`;
  }
  return { positions, slideLineIndex, worstFall, note };
}

export type OrderAdvice = {
  suggested: SimSchool[];
  differences: { index: number; current: string; suggested: string; why: string }[];
  note: string;
};

// 乙部顺序建议：规则写死（乙一够得着 / 乙二守得住 / 保底在安全窗口）
export function suggestOrder(
  partB: SimSchool[],
  quotaOf: (name: string) => number | null
): OrderAdvice {
  const filled = partB.filter((s) => s.name.trim());
  if (filled.length === 0) {
    return { suggested: [], differences: [], note: "乙部还没有填写志愿。" };
  }
  const sprint = filled.filter((s) => s.tier === "sprint");
  const match = filled.filter((s) => s.tier === "match");
  const safe = filled.filter((s) => s.tier === "safe");
  const q = (s: SimSchool) => quotaOf(s.name.trim()) ?? 0;

  // 冲刺：学额大的（够得着）排前
  const sprintSorted = [...sprint].sort((a, b) => q(b) - q(a));
  // 匹配：学额大的排前
  const matchSorted = [...match].sort((a, b) => q(b) - q(a));
  // 保底：学额大的排前（最稳的放最后兜底）
  const safeSorted = [...safe].sort((a, b) => q(b) - q(a));

  const total = filled.length;
  const safeWindow = Math.max(2, Math.floor(total * 0.6)); // 保底必须在前 60% 内
  let suggested: SimSchool[] = [];
  // 结构：冲刺在前（至少乙一是冲刺或第一所匹配），匹配中段，保底在安全窗口
  suggested = suggested.concat(sprintSorted, matchSorted);
  // 把保底插入到 safeWindow 位置附近：先保证前 safeWindow 位有保底
  const safeInsertAt = Math.min(safeWindow - 1, suggested.length);
  if (safeSorted.length > 0) {
    suggested = [
      ...suggested.slice(0, safeInsertAt),
      ...safeSorted,
      ...suggested.slice(safeInsertAt),
    ];
  }
  // 与当前顺序对比差异
  const differences: OrderAdvice["differences"] = [];
  const maxLen = Math.min(suggested.length, filled.length);
  for (let i = 0; i < maxLen; i++) {
    const cur = filled[i].name.trim();
    const sug = suggested[i]?.name.trim();
    if (cur !== sug) {
      const band = quotaBand(quotaOf(cur));
      differences.push({
        index: i + 1,
        current: cur,
        suggested: sug || "（后移）",
        why: explainWhy(suggested[i], quotaOf),
      });
    }
  }
  const note =
    "建议原则：乙一放「最想要又够得着」的冲刺校，乙二必须守得住，保底校放在前 60% 位置内。当前顺序与建议有差异的位置已标出，可参考调整。";
  return { suggested, differences, note };
}

function explainWhy(s: SimSchool | undefined, quotaOf: (name: string) => number | null): string {
  if (!s) return "该位置建议放保底或匹配校。";
  const q = quotaOf(s.name.trim());
  const band = quotaBand(q);
  const tierLabel = s.tier === "sprint" ? "冲刺" : s.tier === "match" ? "匹配" : "保底";
  if (s.tier === "sprint") return `${tierLabel}校（学额${q ?? "?"}），够得着才值得冲`;
  if (s.tier === "match") return `${tierLabel}校（学额${q ?? "?"}），守得住的中段`;
  return `${tierLabel}校（学额${q ?? "?"}，${band}），安全垫`;
}


// ================= 底牌卡：相对竞争位置（非录取概率） =================

export type FitTone = "good" | "mid" | "warn";

export type FitResult = {
  label: string;
  advice: string;
  tone: FitTone;
};

// 输入：乙类计分（10-35）+ 该校自行分配学额（名册 quota）
// 输出：相对竞争位置结论（基于计分组合段位 × 学额稀缺度，不是录取概率）
export function assessSchoolFit(score: number, quota: number | null): FitResult {
  const q = quota ?? 50;
  const scarce = q <= 25;
  const roomy = q > 50;

  if (score >= 30) {
    if (roomy) return { label: "优势明显", advice: `计分 ${score} 分＋学额充裕（${q}），在这所学校处于有利位置；同分仍要抽签。`, tone: "good" };
    if (scarce) return { label: "组合强但学额紧", advice: `计分 ${score} 分但学额仅 ${q}，竞争烈度高，仍要抽签。`, tone: "mid" };
    return { label: "组合强", advice: `计分 ${score} 分，处于该校申请者前列组合；同分抽签。`, tone: "good" };
  }
  if (score === 25) {
    if (roomy) return { label: "可冲", advice: `计分 ${score} 分＋学额充裕（${q}），值得放前；同分抽签。`, tone: "good" };
    if (scarce) return { label: "拼运气", advice: `计分 ${score} 分但学额仅 ${q}，热门校同分靠抽签。`, tone: "mid" };
    return { label: "有机会", advice: `计分 ${score} 分（校友/强关系组合），热门校竞争仍大。`, tone: "mid" };
  }
  if (score === 20) {
    if (roomy) return { label: "有机会", advice: `计分 ${score} 分（最常见组合）但学额充裕（${q}），可以一试。`, tone: "mid" };
    if (scarce) return { label: "基本靠抽签", advice: `计分 ${score} 分＋学额仅 ${q}——最常见组合撞上最紧张学额，热门校基本靠抽签。`, tone: "warn" };
    return { label: "看运气", advice: `计分 ${score} 分是自行分配最常见组合，热门校同分抽签。`, tone: "warn" };
  }
  if (score === 15) return { label: "偏弱", advice: `计分 ${score} 分在自行分配阶段不占优，建议把重心放统一派位乙部。`, tone: "warn" };
  return { label: "仅适龄分", advice: `计分 ${score} 分只有适龄基础分，自行分配基本陪跑，全力准备乙部＋叩门。`, tone: "warn" };
}

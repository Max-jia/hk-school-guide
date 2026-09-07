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
  const duplicates = findDuplicates(partB);

  const checks: CheckItem[] = [];

  // 1) 乙部志愿数量
  if (total <= 9) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "fail", detail: `只填了 ${total}/30 个志愿，结构严重空洞。`,
      fix: "把网内真实可接受的学校填满（至少 20 个），每个都别抱着「填了也后悔」的心态。",
    });
  } else if (total < 20) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "warn", detail: `填了 ${total}/30，还有不少空位没用上。`,
      fix: "空位不是用来「随便填」的，但用来补「派到也满意」的保底校是划算的。",
    });
  } else if (total < 30) {
    checks.push({
      id: "b-count", title: "乙部志愿数量",
      status: "warn", detail: `填了 ${total}/30，建议尽量填满。`,
    });
  } else {
    checks.push({ id: "b-count", title: "乙部志愿数量", status: "pass", detail: "30 个志愿全部填满，没有浪费空位。" });
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
  if (safe < 2 && total < 30) {
    checks.push({
      id: "blank", title: "空洞检查",
      status: "warn", detail: `还有 ${30 - total} 个空位，且保底校不足 2 所——这些空位应该用来补「派到也满意」的学校。`,
    });
  } else {
    checks.push({ id: "blank", title: "空洞检查", status: "pass", detail: "没有明显「填了也后悔」的空洞。" });
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

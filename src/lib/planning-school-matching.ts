export type PlanningSchoolStage = "kindergarten" | "primary";
export type EducationRoute = "dse" | "ib" | "a-level";
export type PlanningSchoolSector = "all" | "funded" | "direct-subsidy" | "private" | "international";
export type PlanningSchoolLanguage = "all" | "chinese" | "english" | "bilingual";
export type PlanningSchoolLanguageMedium = "chinese" | "english";
export type PlanningPrimaryRoster = "all" | "listed" | "not-listed";

function normalizePlanningDistrict(value: string): string {
  const normalized = value.trim()
    .replaceAll("区", "區")
    .replaceAll("东", "東")
    .replaceAll("观", "觀")
    .replaceAll("黄", "黃")
    .replaceAll("龙", "龍")
    .replaceAll("离", "離")
    .replaceAll("湾", "灣")
    .replaceAll("门", "門")
    .replaceAll("贡", "貢");
  if (normalized === "香港東區" || normalized === "香港南區") return normalized.slice(2);
  return normalized;
}

export type PlanningSchoolRouteSignal = {
  route: EducationRoute;
  kind: "primary-programme" | "same-school" | "one-dragon" | "attached" | "linked";
  label: string;
  note: string;
  priority: number;
  checkedOn: string | null;
  sourceLabel: string;
  sourceUrl: string | null;
  relatedSources?: { sourceLabel: string; sourceUrl: string }[];
  gradeScope?: { label: string; note?: string; sources: { sourceLabel: string; sourceUrl: string }[] };
  linkedSchoolName: string | null;
};

export function parsePlanningSchoolThroughTrain(value: string | null | undefined): {
  kind: PlanningSchoolRouteSignal["kind"];
  destinations: string[];
} | null {
  if (!value) return null;
  const match = value.trim().match(/^(一条龙直升|一條龍直升|一条龙|一條龍|直属|直屬|联系|聯繫|附属小学|附屬小學)\s*(.*)$/u);
  if (!match) return null;

  const kind: PlanningSchoolRouteSignal["kind"] = /一条龙|一條龍/u.test(match[1])
    ? "one-dragon"
    : /直属|直屬|附属小学|附屬小學/u.test(match[1])
      ? "attached"
      : "linked";
  const destinations = match[2]
    .split(/[、，,；;/]+/u)
    .flatMap((destination) => {
      const fullName = destination.trim();
      // Parentheses can be part of a school's official name, but some directory
      // rows use them for campus or quota notes. Match both forms rather than
      // deleting parenthetical text before the full name gets a chance to match.
      const withoutParentheticalNotes = fullName.replace(/[（(][^）)]*[）)]/gu, "").trim();
      return [...new Set([fullName, withoutParentheticalNotes].filter(Boolean))];
    });
  return destinations.length > 0 ? { kind, destinations } : null;
}

export type PlanningSchoolCandidate = {
  id: string;
  stage: PlanningSchoolStage;
  names: { zh: string; en: string | null; sc: string | null };
  aliases: string[];
  district: string | null;
  gender: string | null;
  teachingLanguage: string | null;
  teachingLanguageMediums?: PlanningSchoolLanguageMedium[] | null;
  teachingLanguageEvidence?: {
    sourceLabel: string;
    sourceUrl: string;
    checkedOn: string;
    note?: string;
    relatedSources?: { sourceLabel: string; sourceUrl: string }[];
  } | null;
  kindergartenType: string | null;
  kindergartenSessions: string[] | null;
  primaryFinance: string | null;
  primarySchoolNet: string | null;
  primaryP1Participation: boolean | null;
  kindergartenEnglishFlag: boolean | null;
  kindergartenMandarinFlag: boolean | null;
  freeScheme: boolean | null;
  fees: string | null;
  annualFeeAmount: number | null;
  address: string | null;
  website: string | null;
  routeSignals: PlanningSchoolRouteSignal[];
};

export type PlanningSchoolMatchCriteria = {
  stage: PlanningSchoolStage;
  query: string;
  district: string;
  studentGender: "all" | "boy" | "girl";
  language: PlanningSchoolLanguage;
  kindergartenType: "all" | "voucher" | "private" | "international";
  kindergartenSession: "all" | "上午" | "下午" | "全日";
  primaryFinance: PlanningSchoolSector;
  primarySchoolNet: string;
  primaryP1Participation: PlanningPrimaryRoster;
};

export type PlanningSchoolMatchResult<T> = {
  matches: T[];
  unclassifiedCount: number;
};

/**
 * Keep hard eligibility filtering separate from route alignment: a route only
 * changes the order of primary candidates, never whether a school is shown.
 */
export function filterPlanningSchoolCandidatesByRouteSignal<T extends PlanningSchoolCandidate>(
  candidates: T[],
  route: EducationRoute,
): T[] {
  return candidates.filter((candidate) => candidate.routeSignals.some((signal) => signal.route === route));
}

export function prioritizePlanningSchoolCandidates<T extends PlanningSchoolCandidate>(
  candidates: T[],
  route?: EducationRoute,
): T[] {
  if (!route || candidates.every((candidate) => candidate.stage !== "primary")) return candidates.slice();

  return candidates
    .map((candidate, index) => ({ candidate, index }))
    .sort((a, b) => {
      const priorityFor = (candidate: T) => candidate.routeSignals
        .filter((signal) => signal.route === route)
        .reduce((priority, signal) => Math.min(priority, signal.priority), Number.POSITIVE_INFINITY);
      return priorityFor(a.candidate) - priorityFor(b.candidate) || a.index - b.index;
    })
    .map(({ candidate }) => candidate);
}

function normalized(text: string): string {
  return text.toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

export function planningSchoolSearchVariants(candidate: PlanningSchoolCandidate): string[] {
  return [
    candidate.names.zh,
    candidate.names.en ?? "",
    candidate.names.sc ?? "",
    ...candidate.aliases,
    candidate.district ?? "",
    candidate.teachingLanguage ?? "",
    candidate.primarySchoolNet ?? "",
    candidate.address ?? "",
    candidate.kindergartenType ?? "",
    candidate.primaryFinance ?? "",
  ].map(normalized).filter(Boolean);
}

function genderMatches(gender: string, requested: "boy" | "girl"): boolean {
  const value = gender.toLocaleLowerCase();
  const boys = /男校|男生|\bboys?\b|\bmale\b/.test(value);
  const girls = /女校|女生|\bgirls?\b|\bfemale\b/.test(value);
  const coed = /男女|mixed|co-?ed/.test(value);
  return requested === "boy" ? boys || coed : girls || coed;
}

type MediumFacts = { chinese: boolean; english: boolean } | null;

function mediumFacts(candidate: PlanningSchoolCandidate): MediumFacts {
  if (candidate.teachingLanguageMediums) {
    return {
      chinese: candidate.teachingLanguageMediums.includes("chinese"),
      english: candidate.teachingLanguageMediums.includes("english"),
    };
  }

  const text = candidate.teachingLanguage?.trim() ?? "";
  if (candidate.stage === "kindergarten") {
    if (!text && candidate.kindergartenEnglishFlag === null && candidate.kindergartenMandarinFlag === null) return null;
    const chinese = /粤语|廣東話|广东话|中文|普通話|普通话|兩文三語|两文三语|中英/.test(text)
      || candidate.kindergartenMandarinFlag === true;
    const english = candidate.kindergartenEnglishFlag ?? /英語|英语|英文|english/i.test(text);
    return { chinese, english };
  }

  if (!text) return null;
  return {
    chinese: /中文|粵語|粤语|普通話|普通话/.test(text),
    english: /英文|英語|英语|english/i.test(text),
  };
}

function languageMatches(facts: MediumFacts, requested: Exclude<PlanningSchoolLanguage, "all">): boolean {
  if (!facts) return false;
  if (requested === "chinese") return facts.chinese;
  if (requested === "english") return facts.english;
  return facts.chinese && facts.english;
}

function sectorMatches(value: string, requested: Exclude<PlanningSchoolSector, "all">): boolean | null {
  const normalizedValue = value.trim().toLocaleLowerCase();
  if (!normalizedValue) return null;
  if (requested === "funded") return normalizedValue === "官立" || normalizedValue === "資助" || normalizedValue === "资助";
  if (requested === "direct-subsidy") return normalizedValue === "直資" || normalizedValue === "直资";
  if (requested === "private") return normalizedValue === "私立";
  return normalizedValue === "英基" || normalizedValue.includes("private independent sch scheme");
}

function hasUnknownSelectedFact(candidate: PlanningSchoolCandidate, criteria: PlanningSchoolMatchCriteria): boolean {
  if (criteria.district !== "all" && !candidate.district) return true;
  if (criteria.studentGender !== "all" && !candidate.gender) return true;
  if (criteria.language !== "all" && mediumFacts(candidate) === null) return true;

  if (candidate.stage === "kindergarten") {
    if (criteria.kindergartenType !== "all" && !candidate.kindergartenType) return true;
    if (criteria.kindergartenType === "voucher" && candidate.freeScheme === null) return true;
    if (criteria.kindergartenSession !== "all" && (!candidate.kindergartenSessions || candidate.kindergartenSessions.length === 0)) return true;
    return false;
  }

  if (criteria.primaryFinance !== "all" && !candidate.primaryFinance) return true;
  if (criteria.primarySchoolNet !== "all" && candidate.primaryP1Participation === null) return true;
  if (criteria.primarySchoolNet !== "all" && candidate.primaryP1Participation === true && !candidate.primarySchoolNet) return true;
  return criteria.primaryP1Participation !== "all" && candidate.primaryP1Participation === null;
}

function hasKnownMismatch(candidate: PlanningSchoolCandidate, criteria: PlanningSchoolMatchCriteria): boolean {
  if (criteria.district !== "all" && candidate.district && normalizePlanningDistrict(candidate.district) !== normalizePlanningDistrict(criteria.district)) return true;
  if (criteria.studentGender !== "all" && candidate.gender && !genderMatches(candidate.gender, criteria.studentGender)) return true;
  if (criteria.language !== "all") {
    const medium = mediumFacts(candidate);
    if (medium && !languageMatches(medium, criteria.language)) return true;
  }

  if (candidate.stage === "kindergarten") {
    if (criteria.kindergartenType !== "all" && candidate.kindergartenType) {
      if (criteria.kindergartenType === "voucher" && (candidate.kindergartenType !== "券校" || candidate.freeScheme === false)) return true;
      if (criteria.kindergartenType === "private" && candidate.kindergartenType !== "私立") return true;
      if (criteria.kindergartenType === "international" && candidate.kindergartenType !== "國際" && candidate.kindergartenType !== "国际") return true;
    }
    if (criteria.kindergartenSession !== "all" && candidate.kindergartenSessions && !candidate.kindergartenSessions.includes(criteria.kindergartenSession)) return true;
    return false;
  }

  if (criteria.primaryFinance !== "all" && candidate.primaryFinance) {
    const matched = sectorMatches(candidate.primaryFinance, criteria.primaryFinance);
    if (matched === false) return true;
  }
  if (criteria.primarySchoolNet !== "all") {
    if (candidate.primaryP1Participation === false) return true;
    if (candidate.primaryP1Participation === true && candidate.primarySchoolNet && candidate.primarySchoolNet !== criteria.primarySchoolNet) return true;
    if (candidate.primaryP1Participation === true && candidate.primarySchoolNet === "不限校網") return true;
  }
  if (criteria.primaryP1Participation === "listed" && candidate.primaryP1Participation === false) return true;
  if (criteria.primaryP1Participation === "not-listed" && candidate.primaryP1Participation === true) return true;
  return false;
}

function matchesQuery(candidate: PlanningSchoolCandidate, query: string): boolean {
  const term = normalized(query.trim());
  return !term || planningSchoolSearchVariants(candidate).some((value) => value.includes(term));
}

export function filterPlanningSchoolCandidates<T extends PlanningSchoolCandidate>(
  candidates: T[],
  criteria: PlanningSchoolMatchCriteria,
): PlanningSchoolMatchResult<T> {
  const queryMatches = candidates.filter((candidate) => candidate.stage === criteria.stage && matchesQuery(candidate, criteria.query));
  const matches: T[] = [];
  let unclassifiedCount = 0;

  for (const candidate of queryMatches) {
    if (hasKnownMismatch(candidate, criteria)) continue;
    if (hasUnknownSelectedFact(candidate, criteria)) {
      unclassifiedCount += 1;
      continue;
    }
    matches.push(candidate);
  }

  return { matches, unclassifiedCount };
}

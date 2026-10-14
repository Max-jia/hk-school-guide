import kindergartensJson from "@/content/kindergartens.json";
import primarySchoolsJson from "@/content/schools.json";
import p1NetsJson from "@/content/p1-nets.json";
import secondaryPlanningJson from "@/content/secondary-school-planning-candidates.json";
import primaryIbEvidenceJson from "@/content/primary-school-ib-evidence.json";
import primaryLanguageEvidenceJson from "@/content/primary-school-language-evidence.json";
import primaryIbPathwayEvidenceJson from "@/content/primary-school-ib-pathway-evidence.json";
import { L } from "@/lib/i18n";
import { normalizePlanningDistrict } from "@/lib/planning-district";
import { parsePlanningSchoolThroughTrain, type EducationRoute, type PlanningSchoolCandidate, type PlanningSchoolLanguageMedium, type PlanningSchoolRouteSignal, type PlanningSchoolStage } from "@/lib/planning-school-matching";

type KindergartenRow = {
  school_no?: number;
  name_zh: string;
  name_display?: string;
  name_en?: string | null;
  district_zh?: string | null;
  gender?: string | null;
  teaching_language?: string | null;
  kg_type?: string | null;
  sessions?: string[] | null;
  lang_eng?: boolean | null;
  lang_mand?: boolean | null;
  is_free_scheme?: boolean | null;
  fees?: string | null;
  fee_year?: number | null;
  address_zh?: string | null;
  website?: string | null;
};

type PrimarySchoolRow = {
  school_no?: number;
  name_zh: string;
  name_display?: string;
  name_en?: string | null;
  simp?: string | null;
  district_zh?: string | null;
  gender?: string | null;
  teaching_language?: string | null;
  finance_type?: string | null;
  school_net?: string | null;
  p1_2027?: boolean | null;
  through_train?: string | null;
  fees?: string | null;
  address_zh?: string | null;
  website?: string | null;
};

const KINDERGARTENS = kindergartensJson as KindergartenRow[];
const PRIMARY_SCHOOLS = primarySchoolsJson as PrimarySchoolRow[];
type SecondaryRouteRow = {
  id: string;
  fallbackName: string;
  names?: { en?: string | null; tc?: string | null; sc?: string | null } | null;
  routes: EducationRoute[];
  routeEvidence?: { route: EducationRoute; sources?: { sourceLabel?: string; sourceUrl?: string }[] }[];
};
const SECONDARY_SCHOOLS = (secondaryPlanningJson as { schools: SecondaryRouteRow[] }).schools;
type IbEvidenceSource = { sourceLabel: string; sourceUrl: string };
type IbEvidenceRow = {
  schoolNo: number;
  displayName?: string;
  sourceLabel: string;
  sourceUrl: string;
  programmes: string[];
  programmeStatus?: "planned";
  priority?: number;
  note?: string;
  relatedSources?: IbEvidenceSource[];
  progression?: { label: string; note: string; priority: number; checkedOn?: string; sources?: IbEvidenceSource[] };
  gradeScope?: { label: string; note?: string; sources: IbEvidenceSource[] };
};
const PRIMARY_IB_EVIDENCE_DATA = primaryIbEvidenceJson as { metadata: { checked: string }; schools: IbEvidenceRow[] };
const PRIMARY_IB_EVIDENCE = PRIMARY_IB_EVIDENCE_DATA.schools;
type PrimaryIbPathwayEvidenceRow = {
  schoolNo: number;
  route: EducationRoute;
  relationshipType?: "same-school" | "linked";
  linkedSchoolName: string;
  label: string;
  note: string;
  priority: number;
  checkedOn: string;
  sourceLabel: string;
  sourceUrl: string;
  relatedSources?: IbEvidenceSource[];
};
const PRIMARY_IB_PATHWAY_EVIDENCE_DATA = primaryIbPathwayEvidenceJson as {
  metadata: { checked: string };
  schools: PrimaryIbPathwayEvidenceRow[];
};
const PRIMARY_IB_PATHWAY_EVIDENCE = PRIMARY_IB_PATHWAY_EVIDENCE_DATA.schools;
type PrimaryLanguageEvidenceRow = {
  schoolNo: number;
  mediums: PlanningSchoolLanguageMedium[];
  displayLabel: string;
  sourceLabel: string;
  sourceUrl: string;
  note?: string;
  checkedOn?: string;
  relatedSources?: IbEvidenceSource[];
};
const PRIMARY_LANGUAGE_EVIDENCE_DATA = primaryLanguageEvidenceJson as {
  metadata: { checked: string };
  schools: PrimaryLanguageEvidenceRow[];
};
const PRIMARY_LANGUAGE_EVIDENCE = PRIMARY_LANGUAGE_EVIDENCE_DATA.schools;
const P1_NETS = p1NetsJson as {
  meta: { title: string; source: string; source_url: string; compiled: string; extracted: string; total_schools: number; note: string };
  nets: { net: string; area_short: string }[];
};

export type PlanningSchoolFilterOptions = {
  districts: string[];
  primarySchoolNets: { net: string; areaShort: string }[];
  primaryRoster: { source: string; sourceUrl: string; extracted: string; schoolCount: number; note: string };
  kindergartenCount: number;
  primaryCount: number;
};

function nullableString(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function normalizedSchoolName(value: string): string {
  return value.toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

function localizedSchoolNameKeys(value: string): Set<string> {
  return new Set([value, L(value, "tc"), L(value, "sc")].map(normalizedSchoolName).filter(Boolean));
}

function getSecondaryRouteSources(school: SecondaryRouteRow, route: EducationRoute): IbEvidenceSource[] {
  return (school.routeEvidence ?? [])
    .filter((item) => item.route === route)
    .flatMap((item) => item.sources ?? [])
    .filter((source): source is { sourceLabel: string; sourceUrl: string } => Boolean(source.sourceLabel && source.sourceUrl))
    .filter((source, index, sources) => sources.findIndex((item) => item.sourceUrl === source.sourceUrl) === index);
}

const PRIMARY_SAME_SCHOOL_SECONDARY_IDS: Record<string, string[]> = {
  // These primary-directory records share a school identity with a secondary
  // candidate but need an explicit ID mapping across campuses or naming forms.
  "214558000123": ["german-swiss-international-school"],
  "214558000221": ["german-swiss-international-school"],
  "598356000223": ["nord-anglia-international-school-hong-kong"],
  "216275000623": ["australian-international-school-hong-kong"],
  "567485000123": ["renaissance-college-esf"],
  "325147000223": ["yew-chung-international-school-secondary"],
  "216003000223": ["singapore-international-school-hong-kong"],
  "569747000223": ["discovery-college"],
  "560138000223": ["victoria-shanghai-academy"],
  "215589000123": ["cis"],
  "539155000323": ["hong-kong-academy"],
  "216011000523": ["cdnis"],
  "605638000123": ["stamford-american-school-hong-kong"],
  "553190000323": ["isf-academy"],
  "606766000123": ["malvern-college-hong-kong"],
  "216186000323": ["carmel-school-hong-kong-elsa-high-school"],
  "230979000123": ["international-college-hong-kong"],
};

function routeSignalsForPrimary(row: PrimarySchoolRow): PlanningSchoolRouteSignal[] {
  const schoolNo = row.school_no;
  const ibEvidence = PRIMARY_IB_EVIDENCE.find((item) => item.schoolNo === schoolNo);
  const signals: PlanningSchoolRouteSignal[] = [];

  if (ibEvidence) {
    const hasSecondaryContinuity = ibEvidence.programmes.includes("MYP") && ibEvidence.programmes.includes("DP");
    const isPlannedPyp = ibEvidence.programmeStatus === "planned";
    const sameSchoolStageLabels = ["MYP", "DP", "CP"].filter((programme) => ibEvidence.programmes.includes(programme)).join("／");
    const relatedSources = [...(ibEvidence.relatedSources ?? []), ...(ibEvidence.progression?.sources ?? [])]
      .filter((source, index, sources) => sources.findIndex((item) => item.sourceUrl === source.sourceUrl) === index);
    const note = ibEvidence.progression?.note
      ?? (isPlannedPyp
        ? ibEvidence.note ?? "校方计划开办 IB PYP，授权状态待核；不可视为已获 IB 授权或保证入读。"
        : hasSecondaryContinuity
        ? `校方资料列有小学 PYP 及同校 ${sameSchoolStageLabels}；这表示学校开办相关课程，不代表升班／升学自动获派或保证入读 IBDP。实际安排请核对学校当年公布。`
        : ibEvidence.programmes.includes("DP")
          ? "校方资料同时列有小学 PYP 及高中 DP，但不代表中间课程连续或升学自动获派；实际安排请核对学校当年公布。"
          : "这是小学课程体系线索，不代表自动升中、保证获录取或保证入读 IBDP；升中和课程安排仍须核对学校当年公布。");
    signals.push({
      route: "ib",
      kind: "primary-programme",
      label: ibEvidence.progression?.label
        ?? (isPlannedPyp
          ? "校方计划开办 IB PYP（授权待确认）"
          : hasSecondaryContinuity ? `小学阶段开办 IB PYP；同校资料列有 ${sameSchoolStageLabels}` : "小学阶段开办 IB PYP"),
      note,
      priority: hasSecondaryContinuity ? 0 : ibEvidence.progression?.priority ?? (isPlannedPyp ? ibEvidence.priority ?? 99 : ibEvidence.programmes.includes("DP") ? 1 : 2),
      checkedOn: ibEvidence.progression?.checkedOn ?? PRIMARY_IB_EVIDENCE_DATA.metadata.checked,
      sourceLabel: ibEvidence.sourceLabel,
      sourceUrl: ibEvidence.sourceUrl,
      relatedSources,
      ...(ibEvidence.gradeScope ? { gradeScope: ibEvidence.gradeScope } : {}),
      linkedSchoolName: null,
    });
  }

  const throughTrain = parsePlanningSchoolThroughTrain(row.through_train);
  const targetNames = new Set<string>();
  for (const destination of throughTrain?.destinations ?? []) {
    for (const key of localizedSchoolNameKeys(destination)) targetNames.add(key);
  }
  const linkedSecondarySchools = SECONDARY_SCHOOLS.filter((school) => {
    const schoolKeys = [school.fallbackName, school.names?.tc, school.names?.sc, school.names?.en]
      .filter((name): name is string => Boolean(name))
      .flatMap((name) => [...localizedSchoolNameKeys(name)]);
    return schoolKeys.some((key) => targetNames.has(key));
  });

  const secondaryIds = new Set([
    ...linkedSecondarySchools.map((school) => school.id),
    ...(schoolNo === undefined ? [] : PRIMARY_SAME_SCHOOL_SECONDARY_IDS[String(schoolNo)] ?? []),
  ]);
  const sameSchoolIds = new Set(schoolNo === undefined ? [] : PRIMARY_SAME_SCHOOL_SECONDARY_IDS[String(schoolNo)] ?? []);
  const routeTitles: Record<EducationRoute, string> = { dse: "DSE", ib: "IB", "a-level": "A-Level" };

  for (const secondary of SECONDARY_SCHOOLS.filter((school) => secondaryIds.has(school.id))) {
    for (const route of secondary.routes) {
      if (signals.some((signal) => signal.route === route && signal.linkedSchoolName === secondary.fallbackName)) continue;
      const routeSources = getSecondaryRouteSources(secondary, route);
      const [source, ...relatedSources] = routeSources;
      const kind = sameSchoolIds.has(secondary.id) ? "same-school" : throughTrain?.kind;
      if (!kind) continue;
      const priority = kind === "one-dragon" ? 3 : kind === "same-school" ? 4 : kind === "attached" ? 5 : 6;
      const relationLabel = kind === "one-dragon"
        ? "学校资料显示有一条龙升中关系"
        : kind === "attached"
          ? "学校资料显示有直属／附属升中关系"
          : kind === "linked"
            ? "学校资料显示有升中联系学校"
            : "同一学校的中学阶段资料列有课程路线";
      const note = kind === "same-school"
        ? `「${secondary.fallbackName}」的中学阶段资料列有 ${routeTitles[route]} 路线；本标记不是自动升中或自动获派该课程的承诺。`
        : `${relationLabel}至「${secondary.fallbackName}」，其现有课程资料列有 ${routeTitles[route]} 路线；关系类别不等于保证升中或保证进入该课程。`;
      signals.push({
        route,
        kind,
        label: `${relationLabel} · ${routeTitles[route]}`,
        note,
        priority,
        checkedOn: null,
        sourceLabel: source?.sourceLabel ?? "学校课程资料",
        sourceUrl: source?.sourceUrl ?? null,
        ...(relatedSources.length > 0 ? { relatedSources } : {}),
        linkedSchoolName: secondary.fallbackName,
      });
    }
  }

  const pathwayEvidence = PRIMARY_IB_PATHWAY_EVIDENCE.find((item) => item.schoolNo === schoolNo);
  if (pathwayEvidence) {
    const linkedSchoolKeys = localizedSchoolNameKeys(pathwayEvidence.linkedSchoolName);
    const linkedSignalIndex = signals.findIndex((signal) => {
      if (signal.route !== pathwayEvidence.route || !signal.linkedSchoolName) return false;
      return [...localizedSchoolNameKeys(signal.linkedSchoolName)].some((key) => linkedSchoolKeys.has(key));
    });
    if (linkedSignalIndex >= 0) {
      const signal = signals[linkedSignalIndex];
      signals[linkedSignalIndex] = {
        ...signal,
        label: pathwayEvidence.label,
        note: pathwayEvidence.note,
        priority: pathwayEvidence.priority,
        checkedOn: pathwayEvidence.checkedOn,
        sourceLabel: pathwayEvidence.sourceLabel,
        sourceUrl: pathwayEvidence.sourceUrl,
        ...(pathwayEvidence.relatedSources ? { relatedSources: pathwayEvidence.relatedSources } : {}),
      };
    }
  }

  return signals;
}

export function getPlanningSchoolFilterOptions(stage?: PlanningSchoolStage): PlanningSchoolFilterOptions {
  const rows = stage === "kindergarten" ? KINDERGARTENS : PRIMARY_SCHOOLS;
  const districts = [...new Set(rows
    .map((row) => nullableString(row.district_zh))
    .filter((value): value is string => Boolean(value))
    .map(normalizePlanningDistrict))]
    .sort((a, b) => a.localeCompare(b, "zh-Hant"));
  return {
    districts,
    primarySchoolNets: P1_NETS.nets.map(({ net, area_short }) => ({ net, areaShort: area_short })),
    primaryRoster: {
      source: P1_NETS.meta.source,
      sourceUrl: P1_NETS.meta.source_url,
      extracted: P1_NETS.meta.extracted,
      schoolCount: P1_NETS.meta.total_schools,
      note: P1_NETS.meta.note,
    },
    kindergartenCount: KINDERGARTENS.length,
    primaryCount: PRIMARY_SCHOOLS.length,
  };
}

function kindergartenCandidates(): PlanningSchoolCandidate[] {
  return KINDERGARTENS.map((row, index) => {
    const displayName = nullableString(row.name_display) ?? row.name_zh;
    const simplifiedName = L(displayName, "sc");
    return {
      id: String(row.school_no ?? `${row.name_zh}-${index}`),
      stage: "kindergarten",
      names: {
        zh: displayName,
        en: nullableString(row.name_en),
        sc: simplifiedName,
      },
      aliases: [...new Set([row.name_zh, displayName, simplifiedName])],
      district: nullableString(row.district_zh),
      gender: nullableString(row.gender),
      teachingLanguage: nullableString(row.teaching_language),
      kindergartenType: nullableString(row.kg_type),
      kindergartenSessions: Array.isArray(row.sessions) ? row.sessions.filter((session): session is string => typeof session === "string") : null,
      primaryFinance: null,
      primarySchoolNet: null,
      primaryP1Participation: null,
      kindergartenEnglishFlag: typeof row.lang_eng === "boolean" ? row.lang_eng : null,
      kindergartenMandarinFlag: typeof row.lang_mand === "boolean" ? row.lang_mand : null,
      freeScheme: typeof row.is_free_scheme === "boolean" ? row.is_free_scheme : null,
      fees: nullableString(row.fees),
      annualFeeAmount: typeof row.fee_year === "number" && Number.isFinite(row.fee_year) ? row.fee_year : null,
      address: nullableString(row.address_zh),
      website: nullableString(row.website),
      routeSignals: [],
    };
  });
}

function primaryCandidates(): PlanningSchoolCandidate[] {
  return PRIMARY_SCHOOLS.map((row, index) => {
    const languageEvidence = PRIMARY_LANGUAGE_EVIDENCE.find((item) => item.schoolNo === row.school_no);
    const ibEvidence = PRIMARY_IB_EVIDENCE.find((item) => item.schoolNo === row.school_no);
    const displayName = nullableString(ibEvidence?.displayName) ?? nullableString(row.name_display) ?? row.name_zh;
    const simplifiedName = nullableString(row.simp) ?? L(displayName, "sc");
    return {
      id: String(row.school_no ?? `${row.name_zh}-${index}`),
      stage: "primary",
      names: {
        zh: displayName,
        en: nullableString(row.name_en),
        sc: simplifiedName,
      },
      aliases: [...new Set([row.name_zh, displayName, simplifiedName])],
      district: nullableString(row.district_zh),
      gender: nullableString(row.gender),
      teachingLanguage: languageEvidence?.displayLabel ?? nullableString(row.teaching_language),
      teachingLanguageMediums: languageEvidence?.mediums ?? null,
      teachingLanguageEvidence: languageEvidence
        ? {
            sourceLabel: languageEvidence.sourceLabel,
            sourceUrl: languageEvidence.sourceUrl,
            checkedOn: languageEvidence.checkedOn ?? PRIMARY_LANGUAGE_EVIDENCE_DATA.metadata.checked,
            ...(languageEvidence.note ? { note: languageEvidence.note } : {}),
            ...(languageEvidence.relatedSources ? { relatedSources: languageEvidence.relatedSources } : {}),
          }
        : null,
      kindergartenType: null,
      kindergartenSessions: null,
      primaryFinance: nullableString(row.finance_type),
      primarySchoolNet: nullableString(row.school_net),
      primaryP1Participation: typeof row.p1_2027 === "boolean" ? row.p1_2027 : null,
      kindergartenEnglishFlag: null,
      kindergartenMandarinFlag: null,
      freeScheme: null,
      fees: nullableString(row.fees),
      annualFeeAmount: null,
      address: nullableString(row.address_zh),
      website: nullableString(row.website),
      routeSignals: routeSignalsForPrimary(row),
    };
  });
}

export function getPlanningSchoolCandidates(stage: PlanningSchoolStage): PlanningSchoolCandidate[] {
  return stage === "kindergarten" ? kindergartenCandidates() : primaryCandidates();
}

export function getPrimaryRosterMetadata() {
  return P1_NETS.meta;
}

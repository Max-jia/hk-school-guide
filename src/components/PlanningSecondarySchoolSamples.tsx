"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import secondarySchoolPlanning from "@/content/secondary-school-planning.json";
import secondarySchoolCandidates from "@/content/secondary-school-planning-candidates.json";
import ShortlistButton from "@/components/ShortlistButton";
import { usePlanningPreferences } from "@/components/PlanningPreferencesProvider";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { filterSecondarySchools, type SecondarySchoolDistrictScope } from "@/lib/secondary-school-filter";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type SampleStatus = "verified" | "annual";
type Snapshot = { field: string; value: string; sourceLabel: string; sourceUrl: string; status: SampleStatus };
type SchoolSample = { id: string; name: string; verifiedOn?: string; routes: EducationRoute[]; snapshot: Snapshot[]; pending: string[] };
type SchoolFacet = { id: string; district: string | null; districtScopes?: SecondarySchoolDistrictScope[] | null; gender: string | null; schoolType: "public-funded" | "dss" | "international" | null; teachingMedium: { chinese: boolean; english: boolean } | null; teachingMediumEvidence: string | null; sourceLabel: string; sourceUrl: string; status: string };
type RouteEvidenceSource = { field: string; sourceLabel: string; sourceUrl: string };
type RouteEvidence = { route: EducationRoute; sourceKind: "chsc" | "school-profile"; sourceLabel: string; evidenceCount: number; sources: RouteEvidenceSource[] };
type SchoolCandidate = {
  id: string;
  profileId: string | null;
  names: { en: string; tc: string; sc: string } | null;
  fallbackName: string | null;
  routes: EducationRoute[];
  directoryId: string | null;
  district: string | null;
  districtScopes?: SecondarySchoolDistrictScope[] | null;
  districtNames: { en: string; tc: string; sc: string } | null;
  gender: string | null;
  schoolType: SchoolFacet["schoolType"];
  teachingMedium: SchoolFacet["teachingMedium"];
  teachingMediumEvidence: string | null;
  s1Tuition: string | null;
  website: string | null;
  sourceKind: "chsc" | "school-profile";
  sourceLabel: string;
  sourceUrls: { en: string; tc: string; sc: string } | null;
  routeEvidence: RouteEvidence[];
};
type CandidateCatalog = {
  metadata: {
    verifiedOn: string;
    sourceEdition: string;
    sourceUrl: string;
    scopeNote: string;
    directoryTaggedSchoolCount: number;
    curatedProfileCount: number;
    mappedCuratedLocalCount: number;
    profileOnlyLocalCount: number;
    internationalProfileCount: number;
    routeCounts: Record<RouteFilter, number>;
  };
  schools: SchoolCandidate[];
};
type RouteFilter = EducationRoute | "all";

const DATA = secondarySchoolPlanning as { verifiedOn: string; scopeNote: string; schools: SchoolSample[] };
const CATALOG = secondarySchoolCandidates as CandidateCatalog;
const PROFILE_BY_ID = new Map(DATA.schools.map((school) => [school.id, school]));
const PAGE_SIZE = 12;
const ROUTES: { key: RouteFilter; label: string }[] = [
  { key: "all", label: "全部路线" },
  { key: "dse", label: "DSE" },
  { key: "ib", label: "IB" },
  { key: "a-level", label: "A-Level" },
];

const STATUS_LABELS: Record<SampleStatus, string> = { verified: "官网已核对", annual: "需按年度更新" };
const STATUS_STYLES: Record<SampleStatus, string> = {
  verified: "bg-[var(--p-bg-green)] text-[var(--p-gray-900)]",
  annual: "bg-[var(--p-bg-yellow)] text-[var(--p-gray-900)]",
};

function normalizeSearchText(text: string): string {
  return text.toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
}

function searchableVariants(text: string, locale: Locale): string[] {
  return [text, L(text, locale), L(text, "tc"), L(text, "sc")].map(normalizeSearchText);
}

function summaryFor(school: SchoolSample): Snapshot | undefined {
  return school.snapshot.find((item) => /身份|校址|位置|课程|路线/.test(item.field)) ?? school.snapshot[0];
}

function schoolTypeLabel(type: SchoolFacet["schoolType"], locale: Locale): string {
  if (type === "public-funded") return L("官立／资助", locale);
  if (type === "dss") return L("直资", locale);
  if (type === "international") return L("国际学校样本", locale);
  return L("类别待核", locale);
}

function districtScopeLabel(scopes: SecondarySchoolDistrictScope[], locale: Locale): string {
  return scopes.map((scope) => {
    const routes = scope.routes.length > 0 ? ` · ${scope.routes.map((route) => route.toUpperCase()).join(" / ")}` : "";
    return `${L(scope.district, locale)}${scope.ageRange ? ` · ${scope.ageRange}` : ""}${routes}`;
  }).join("；");
}

function candidateSourceUrl(candidate: SchoolCandidate, locale: Locale): string {
  return candidate.sourceUrls?.[locale]
    ?? candidate.routeEvidence[0]?.sources[0]?.sourceUrl
    ?? candidate.website
    ?? "";
}

function candidateName(candidate: SchoolCandidate, school: SchoolSample, locale: Locale): string {
  return candidate.names?.[locale] ?? L(candidate.fallbackName ?? school.name, locale);
}

function routeSourceLabel(sourceKind: RouteEvidence["sourceKind"], locale: Locale): string {
  return sourceKind === "chsc" ? L("CHSC学校概览线索", locale) : L("学校资料样本", locale);
}

export default function PlanningSecondarySchoolSamples({ locale = "tc", stage, route }: { locale?: Locale; stage?: PlanningStage; route?: EducationRoute }) {
  const isSecondary = stage === "secondary";
  const router = useRouter();
  const { profile, updateProfile } = usePlanningPreferences();
  // Keep the candidate route filter in the URL so it cannot drift away from
  // the route shown in the planning header and matrix.
  const routeFilter: RouteFilter = route ?? "all";
  const [query, setQuery] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(PAGE_SIZE);

  const searchIndex = useMemo(() => CATALOG.schools.map((candidate) => {
    const profile = candidate.profileId ? PROFILE_BY_ID.get(candidate.profileId) : undefined;
    const school = profile
      ? { ...profile, routes: candidate.routes }
      : { id: candidate.id, name: candidate.fallbackName ?? candidate.names?.sc ?? candidate.id, routes: candidate.routes, snapshot: [], pending: [] };
    const facet: SchoolFacet = {
      id: candidate.id,
      district: candidate.district,
      districtScopes: candidate.districtScopes ?? null,
      gender: candidate.gender,
      schoolType: candidate.schoolType,
      teachingMedium: candidate.teachingMedium,
      teachingMediumEvidence: candidate.teachingMediumEvidence,
      sourceLabel: candidate.sourceLabel,
      sourceUrl: candidateSourceUrl(candidate, locale),
      status: candidate.directoryId ? "annual" : "school-profile",
    };
    const fields = [
      ...(candidate.names ? Object.values(candidate.names) : []),
      candidate.fallbackName ?? "",
      school.name,
      candidate.district ?? "",
      ...(candidate.districtScopes?.flatMap((scope) => [scope.district, scope.ageRange ?? "", ...scope.routes]) ?? []),
      ...(candidate.districtNames ? Object.values(candidate.districtNames) : []),
      ...school.routes,
      ...school.snapshot.flatMap((item) => [item.field, item.value, item.sourceLabel]),
      ...school.pending,
      ...candidate.routeEvidence.flatMap((item) => [item.route, item.sourceLabel, ...item.sources.flatMap((source) => [source.field, source.sourceLabel])]),
    ];
    const searchVariants = [...new Set(fields.flatMap((field) => searchableVariants(field, locale)))];
    return {
      candidate,
      school,
      facet,
      searchVariants,
      routes: candidate.routes,
      facts: {
        district: facet.district,
        districtScopes: facet.districtScopes,
        gender: facet.gender,
        schoolType: facet.schoolType,
        teachingMedium: facet.teachingMedium,
      },
      displayName: candidateName(candidate, school, locale),
    };
  }), [locale]);

  const queryTerms = useMemo(
    () => query.trim() ? searchableVariants(query.trim(), locale).filter(Boolean) : [],
    [locale, query],
  );
  const filterResult = useMemo(() => filterSecondarySchools(searchIndex, {
    route: routeFilter,
    queryTerms,
    district: profile.district,
    studentGender: profile.studentGender,
    schoolType: profile.schoolType,
    language: profile.language,
  }), [profile.district, profile.language, profile.schoolType, profile.studentGender, queryTerms, routeFilter, searchIndex]);
  const routeAndSearchMatches = filterResult.baseMatches;
  const unclassifiedCount = filterResult.unclassifiedCount;
  const filteredSchools = useMemo(() => filterResult.matches
    .slice()
    .sort((a, b) => a.displayName.localeCompare(b.displayName, locale === "tc" ? "zh-Hant" : "zh-Hans")),
  [filterResult.matches, locale]);

  const visibleSchools = filteredSchools.slice(0, visibleLimit);
  const hasSelectedCandidateCriteria = profile.district !== "all"
    || profile.studentGender !== "all"
    || profile.schoolType !== "all"
    || profile.language !== "all";
  const hasExplicitCandidateCriteria = hasSelectedCandidateCriteria || Boolean(query.trim());
  const hasCandidateDisplayCriteria = hasExplicitCandidateCriteria || routeFilter !== "all";
  const routeCounts = CATALOG.metadata.routeCounts;

  function selectRoute(next: RouteFilter) {
    setVisibleLimit(PAGE_SIZE);
    const params = new URLSearchParams();
    if (stage) params.set("stage", stage);
    if (next !== "all") params.set("route", next);
    const queryString = params.toString();
    router.push(localeHref(`/planning${queryString ? `?${queryString}` : ""}`, locale), { scroll: false });
  }

  function clearSearch() {
    setQuery("");
    setVisibleLimit(PAGE_SIZE);
  }

  function resetCandidateFilters() {
    updateProfile("district", "all");
    updateProfile("studentGender", "all");
    updateProfile("schoolType", "all");
    updateProfile("language", "all");
    setQuery("");
    setVisibleLimit(PAGE_SIZE);
  }

  const activeCriteria = [
    routeFilter === "all" ? L("全部路线", locale) : routeFilter.toUpperCase(),
    query.trim() ? L(`搜索：${query.trim()}`, locale) : null,
    profile.district !== "all" ? L(profile.district, locale) : null,
    profile.studentGender === "boy" ? L("男孩可申请", locale) : profile.studentGender === "girl" ? L("女孩可申请", locale) : null,
    profile.schoolType === "all" ? null : schoolTypeLabel(profile.schoolType, locale),
    profile.language === "all" ? null : profile.language === "bilingual" ? L("中、英文均有授课的非语言科目", locale) : profile.language === "english" ? L("有英文授课的非语言科目", locale) : L("有中文授课的非语言科目", locale),
  ].filter((value): value is string => Boolean(value));

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pb-14" aria-labelledby="planning-secondary-samples-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">{isSecondary ? "04" : "06"} / {L("中学课程路线候选资料池", locale)} · {CATALOG.schools.length} {L("所", locale)}</p>
            <h2 id="planning-secondary-samples-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">{L("符合条件的学校候选", locale)}</h2>
          </div>
          <span className="font-mono text-xs text-[var(--p-secondary)]">{L(`资料核对：${CATALOG.metadata.verifiedOn}`, locale)}</span>
        </div>
        <p className="mt-3 max-w-[900px] text-sm leading-relaxed text-[var(--p-secondary)]">{L(CATALOG.metadata.scopeNote, locale)}</p>
        {isSecondary && <p className="mt-2 max-w-[900px] border-l-2 border-[var(--p-bg-yellow)] bg-[var(--p-gray-50)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">{L(`目前整理了${CATALOG.schools.length}所候选学校：${CATALOG.metadata.directoryTaggedSchoolCount}所本地学校在CHSC《中学概览》2025/2026中有明确路线线索，${CATALOG.metadata.profileOnlyLocalCount}所本地学校另有已整理的路线资料样本，另有${CATALOG.metadata.internationalProfileCount}所国际学校样本；其中${CATALOG.metadata.curatedProfileCount}所有较完整的学校资料卡。没有路线标记，不代表学校没有开办。资料不完整时，不会自动判定为符合；符合条件的结果会按12所一批显示。`, locale)}</p>}
        {!isSecondary ? (
          <div className="mt-6 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-6 text-sm leading-relaxed text-[var(--p-secondary)]">{L("这批中学样本会在进入中学阶段后使用；幼稚园和小学页面暂不把它们当成当前选校建议。", locale)}</div>
        ) : (
          <>
            <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <label htmlFor="planning-secondary-search" className="block min-w-0 flex-1">
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("搜学校、课程或科目", locale)}</span>
                <input
                  id="planning-secondary-search"
                  type="search"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setVisibleLimit(PAGE_SIZE); }}
                  placeholder={L("例如：拔萃女书院、经济、IBDP…", locale)}
                  autoComplete="off"
                  className="mt-2 min-h-12 w-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 text-base text-[var(--p-fg)] outline-none placeholder:text-[var(--p-secondary)] focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15"
                />
              </label>
              <button type="button" onClick={clearSearch} className="min-h-12 border border-[var(--p-gray-300)] px-4 font-mono text-xs font-bold text-[var(--p-fg)] hover:border-[var(--p-fg)]">{L("清除搜索", locale)}</button>
            </div>
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={L("按课程路线筛选", locale)}>
                {ROUTES.map(({ key, label }) => {
                  const selected = routeFilter === key;
                  const count = routeCounts[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => selectRoute(key)}
                      className={`min-h-10 border px-3 font-mono text-xs font-bold transition-colors ${selected ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] text-[var(--p-fg)] hover:border-[var(--p-fg)]"}`}
                    >
                      {L(label, locale)} <span className={selected ? "opacity-75" : "text-[var(--p-secondary)]"}>({count})</span>
                    </button>
                  );
                })}
              </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--p-gray-300)] pt-3">
                <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{L("名单只按已选路线和上方明确选择的学校条件筛选；费用取向、目的地和转路线意愿暂作规划参考，不代表学校排名或录取机会。", locale)}</p>
                <p className="font-mono text-xs font-bold text-[var(--p-fg)]" aria-live="polite">
                  {hasExplicitCandidateCriteria
                    ? L(`符合条件 ${filteredSchools.length} 所`, locale)
                    : L(`路线资料样本 ${routeAndSearchMatches.length} 所（尚未按家庭条件筛选）`, locale)}
                  {hasExplicitCandidateCriteria && filteredSchools.length > 0 && ` · ${L(`目前显示 ${visibleSchools.length} 所`, locale)}`}
                </p>
              </div>
            {activeCriteria.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-2" aria-label={L("正在使用的筛选条件", locale)}>
                <span className="font-mono text-[10px] font-bold text-[var(--p-secondary)]">{L("筛选条件", locale)}</span>
                {activeCriteria.map((criterion) => <span key={criterion} className="border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2 py-1 font-mono text-[10px] font-bold text-[var(--p-fg)]">{criterion}</span>)}
              </div>
            )}

            {unclassifiedCount > 0 && (
              <aside className="mt-3 border-l-4 border-[var(--p-bg-yellow)] bg-[var(--p-gray-50)] px-4 py-3 text-xs leading-relaxed text-[var(--p-secondary)]">
                {L(`${unclassifiedCount} 所学校资料不足，暂时无法确认是否符合，未列入结果。国际学校没有本地校网资料。`, locale)}
              </aside>
            )}

            {!hasCandidateDisplayCriteria ? (
              <div className="mt-4 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-8 text-center">
                <p className="font-serif text-xl font-bold text-[var(--p-fg)]">{L("先选一条升学路线", locale)}</p>
                <p className="mt-2 text-sm text-[var(--p-secondary)]">{L(`目前有 ${routeAndSearchMatches.length} 所学校资料样本。选择 DSE、IB 或 A-Level 后会显示相关学校，也可以再按地区、性别、学校类别或授课语言筛选。`, locale)}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <a href="#planning-school-filters" className="inline-flex min-h-10 items-center border-2 border-[var(--p-fg)] bg-[var(--p-fg)] px-4 font-mono text-xs font-bold text-[var(--p-bg)] no-underline hover:bg-transparent hover:text-[var(--p-fg)]">{L("填写筛选条件", locale)} ↑</a>
                </div>
              </div>
            ) : visibleSchools.length === 0 ? (
              <div className="mt-4 border border-dashed border-[var(--p-gray-300)] px-5 py-10 text-center">
                <p className="font-serif text-xl font-bold text-[var(--p-fg)]">{L("没有已核实符合全部条件的学校", locale)}</p>
                <p className="mt-2 text-sm text-[var(--p-secondary)]">{L("可以放宽地区、性别或类别条件；资料缺项的学校会单独提示，不会自动混入结果。", locale)}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button type="button" onClick={clearSearch} className="border border-[var(--p-fg)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-fg)]">{L("清除搜索", locale)}</button>
                  <button type="button" onClick={resetCandidateFilters} className="border border-[var(--p-gray-300)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-secondary)]">{L("重设候选条件", locale)}</button>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  {visibleSchools.map(({ candidate, school, facet }) => {
                    const summary = summaryFor(school);
                    const annualCount = school.snapshot.filter((item) => item.status === "annual").length;
                    const displayName = candidateName(candidate, school, locale);
                    const hasCuratedProfile = Boolean(candidate.profileId);
                    const sourceUrl = candidateSourceUrl(candidate, locale);
                    const tuition = candidate.s1Tuition?.trim();
                    const matchedReasons = [
                      routeFilter === "all" ? null : routeFilter.toUpperCase(),
                      query.trim() ? L(`搜索：${query.trim()}`, locale) : null,
                      profile.district !== "all" ? L(profile.district, locale) : null,
                      profile.studentGender === "boy" ? L("男孩可申请", locale) : profile.studentGender === "girl" ? L("女孩可申请", locale) : null,
                      profile.schoolType === "all" ? null : schoolTypeLabel(profile.schoolType, locale),
                      profile.language === "bilingual" ? L("中、英文均有授课的非语言科目", locale) : profile.language === "english" ? L("有英文授课的非语言科目", locale) : profile.language === "chinese" ? L("有中文授课的非语言科目", locale) : null,
                    ].filter((reason): reason is string => Boolean(reason));
                    return (
                      <article key={school.id} className="min-w-0 border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4 md:p-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-1.5">
                              {school.routes.map((schoolRoute) => {
                                const evidence = candidate.routeEvidence.filter((item) => item.route === schoolRoute);
                                const sourceKinds = [...new Set(evidence.map((item) => item.sourceKind))];
                                return <span key={schoolRoute} title={sourceKinds.map((kind) => routeSourceLabel(kind, locale)).join(" · ")} className="border border-[var(--p-gray-300)] px-2 py-1 font-mono text-[10px] font-bold uppercase text-[var(--p-secondary)]">{schoolRoute}</span>;
                              })}
                            </div>
                            <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{displayName}</h3>
                            <p className="mt-2 font-mono text-[10px] text-[var(--p-secondary)]">
                              {facet?.districtScopes?.length ? `${L("校区／年龄范围", locale)}：${districtScopeLabel(facet.districtScopes, locale)}` : facet?.district ? L(facet.district, locale) : L("地区待核", locale)} · {facet?.gender === "Boys" ? L("男校", locale) : facet?.gender === "Girls" ? L("女校", locale) : facet?.gender === "Co-ed" ? L("男女校", locale) : L("男女校资料待核", locale)} · {schoolTypeLabel(facet?.schoolType ?? null, locale)}
                            </p>
                          </div>
                          <ShortlistButton name={displayName} kind="secondary" routes={school.routes} locale={locale} />
                        </div>
                        {matchedReasons.length > 0 && <p className="mt-2 font-mono text-[10px] font-bold text-[var(--p-green-dark)]">{L("匹配条件：", locale)}{matchedReasons.join(" · ")}</p>}
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--p-secondary)]">
                          {summary
                            ? L(summary.value, locale)
                            : L("此校资料来自《中学概览》中的路线信息。这里只用于查找候选学校；当届课程、选科和收生安排请向学校核实。", locale)}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--p-gray-300)] pt-3">
                          <span className="font-mono text-[10px] text-[var(--p-secondary)]">
                            {hasCuratedProfile
                              ? L(`${school.snapshot.length} 项校级资料`, locale) + ` · ${annualCount} ${L("项需按年度更新", locale)} · ${school.pending.length} ${L("项待核", locale)}`
                              : L("CHSC路线线索 · 学校基础资料", locale)}
                          </span>
                          <details className="group">
                            <summary className="cursor-pointer list-none font-mono text-xs font-bold text-[var(--p-fg)] underline decoration-[var(--p-gray-300)] underline-offset-4 hover:decoration-[var(--p-fg)]">
                              {L("查看资料与来源", locale)} <span aria-hidden="true" className="ml-1 inline-block group-open:rotate-180">⌄</span>
                            </summary>
                            <div className="mt-4 grid gap-3 border-t border-[var(--p-gray-300)] pt-3">
                              {school.verifiedOn && <p className="font-mono text-[10px] text-[var(--p-secondary)]">{L(`本校资料核对日期：${school.verifiedOn}`, locale)}</p>}
                              {facet.teachingMediumEvidence && <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{L(facet.teachingMediumEvidence, locale)}。{L("这只是学校概览中的资料，不代表全校统一教学语言；具体班级安排请向学校确认。", locale)}</p>}
                              {school.snapshot.map((item) => (
                                <div key={item.field} className="border-l-2 border-[var(--p-gray-300)] pl-3">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-mono text-[10px] font-bold text-[var(--p-secondary)]">{L(item.field, locale)}</span>
                                    <span className={`px-2 py-1 font-mono text-[10px] font-bold ${STATUS_STYLES[item.status]}`}>{L(STATUS_LABELS[item.status], locale)}</span>
                                  </div>
                                  <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(item.value, locale)}</p>
                                  <a href={item.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`school:${school.id}:${item.field}`} className="mt-2 inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] no-underline hover:underline">{L(item.sourceLabel, locale)} ↗</a>
                                </div>
                              ))}
                              {school.pending.length > 0 && (
                                <div className="border-l-2 border-[var(--p-bg-yellow)] pl-3">
                                  <p className="font-mono text-[10px] font-bold text-[var(--p-secondary)]">{L("仍待核对", locale)}</p>
                                  <p className="mt-2 text-xs leading-relaxed text-[var(--p-secondary)]">{L(school.pending.join("、"), locale)}</p>
                                </div>
                              )}
                              {!hasCuratedProfile && tuition && !/^[-–—]$/.test(tuition) && (
                                <p className="font-mono text-xs text-[var(--p-secondary)]">{L(`中一年度学费（CHSC ${CATALOG.metadata.sourceEdition}）`, locale)}：{tuition}</p>
                              )}
                              {candidate.routeEvidence.map((item) => (
                                <div key={`${item.route}-${item.sourceKind}`} className="border-l-2 border-[var(--p-gray-300)] pl-3">
                                  <p className="font-mono text-[10px] font-bold text-[var(--p-secondary)]">
                                    {item.route.toUpperCase()} · {routeSourceLabel(item.sourceKind, locale)}
                                    {item.sourceKind === "chsc" && ` · ${L(`文本线索 ${item.evidenceCount} 处`, locale)}`}
                                  </p>
                                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                    {item.sources.map((source) => {
                                      const href = item.sourceKind === "chsc" ? candidate.sourceUrls?.[locale] ?? source.sourceUrl : source.sourceUrl;
                                      return href ? <a key={`${item.route}-${item.sourceKind}-${source.sourceUrl}-${source.field}`} href={href} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`route:${candidate.id}:${item.route}`} className="font-mono text-[10px] font-bold text-[var(--p-fg)] no-underline hover:underline">{L(source.sourceLabel, locale)}{source.field ? ` · ${L(source.field, locale)}` : ""} ↗</a> : null;
                                    })}
                                  </div>
                                </div>
                              ))}
                              {candidate.website && <a href={candidate.website} target="_blank" rel="noreferrer" className="font-mono text-[10px] font-bold text-[var(--p-fg)] no-underline hover:underline">{L("学校官网", locale)} ↗</a>}
                              {!hasCuratedProfile && <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{L("这张卡只提供学校基础资料，不是完整校情报告；申请资格、学额、具体选科、课程是否当届开班及最新费用，均须向学校确认。", locale)}</p>}
                              {sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-mono text-[10px] font-bold text-[var(--p-fg)] no-underline hover:underline">{L(candidate.sourceLabel, locale)} ↗</a>}
                            </div>
                          </details>
                        </div>
                      </article>
                    );
                  })}
                </div>
                {visibleSchools.length < filteredSchools.length && (
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <button type="button" onClick={() => setVisibleLimit((current) => current + PAGE_SIZE)} className="min-h-12 border-2 border-[var(--p-fg)] px-6 font-mono text-sm font-bold text-[var(--p-fg)] hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]">
                      {L("再显示 12 所学校", locale)} ↓
                    </button>
                    <span className="font-mono text-[10px] text-[var(--p-secondary)]">{L(`目前 ${visibleSchools.length} / ${filteredSchools.length}`, locale)}</span>
                  </div>
                )}
                {(hasSelectedCandidateCriteria || query.trim()) && (
                  <div className="mt-5 text-center">
                    <button type="button" onClick={resetCandidateFilters} className="min-h-10 border border-[var(--p-gray-300)] px-4 font-mono text-xs font-bold text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]">{L("重设候选条件", locale)}</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

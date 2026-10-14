"use client";

import { useMemo, useState } from "react";
import ShortlistButton from "@/components/ShortlistButton";
import { usePlanningPreferences } from "@/components/PlanningPreferencesProvider";
import { L, type Locale } from "@/lib/i18n";
import {
  filterPlanningSchoolCandidates,
  filterPlanningSchoolCandidatesByRouteSignal,
  prioritizePlanningSchoolCandidates,
  type EducationRoute,
  type PlanningSchoolCandidate,
  type PlanningSchoolLanguage,
  type PlanningSchoolStage,
} from "@/lib/planning-school-matching";
import type { PlanningStage } from "@/components/EducationPlanningPage";
import type { PlanningSchoolFilterOptions } from "@/lib/planning-school-data";
import type { PlanningPreferences } from "@/lib/planning-preferences";

const PAGE_SIZE = 12;
const INPUT_CLASS = "min-h-11 w-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 text-sm text-[var(--p-fg)] outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15";

function genderLabel(gender: string | null, locale: Locale): string | null {
  if (!gender) return null;
  if (/男女|mixed|co-?ed/i.test(gender)) return L("男女校", locale);
  if (/女|\bgirls?\b|\bfemale\b/i.test(gender)) return L("女校", locale);
  if (/男|\bboys?\b|\bmale\b/i.test(gender)) return L("男校", locale);
  return L(gender, locale);
}

function primaryFinanceLabel(finance: string | null, locale: Locale): string | null {
  if (!finance) return null;
  if (finance === "官立" || finance === "資助" || finance === "资助") return L("官立／资助", locale);
  if (finance === "直資" || finance === "直资") return L("直资", locale);
  if (finance === "私立") return L("私立", locale);
  if (finance === "英基") return L("英基", locale);
  if (finance.toLocaleLowerCase().includes("private independent sch scheme")) return L("私立独立学校计划", locale);
  return L(finance, locale);
}

function selectedCriteria(candidateStage: PlanningSchoolStage, profile: PlanningPreferences, query: string): boolean {
  return Boolean(query.trim())
    || profile.district !== "all"
    || profile.studentGender !== "all"
    || profile.language !== "all"
    || (candidateStage === "kindergarten"
      ? profile.kindergartenType !== "all" || profile.kindergartenSession !== "all"
      : profile.primaryFinance !== "all" || profile.primarySchoolNet !== "all" || profile.primaryP1Participation !== "all");
}

export default function PlanningStageSchoolCandidates({
  locale = "tc",
  stage,
  route,
  candidates,
  schoolFilterOptions,
}: {
  locale?: Locale;
  stage: Exclude<PlanningStage, "secondary">;
  route?: EducationRoute;
  candidates: PlanningSchoolCandidate[];
  schoolFilterOptions: PlanningSchoolFilterOptions;
}) {
  const { profile } = usePlanningPreferences();
  const [query, setQuery] = useState("");
  const [pagination, setPagination] = useState<{ key: string; extraPages: number }>({ key: "", extraPages: 0 });
  const candidateStage: PlanningSchoolStage = stage === "kindergarten" ? "kindergarten" : "primary";
  const isKindergarten = candidateStage === "kindergarten";
  const hasExplicitCriteria = selectedCriteria(candidateStage, profile, query);
  const routeScopeOnly = !isKindergarten && stage === "primary" && Boolean(route) && !hasExplicitCriteria;
  const hasCandidateScope = hasExplicitCriteria || routeScopeOnly;
  const filterKey = JSON.stringify([
    route ?? "all", query.trim(), profile.district, profile.studentGender, profile.language,
    isKindergarten ? profile.kindergartenType : profile.primaryFinance,
    isKindergarten ? profile.kindergartenSession : profile.primarySchoolNet,
    !isKindergarten && stage === "primary-one" ? profile.primaryP1Participation : "all",
  ]);

  const result = useMemo(() => filterPlanningSchoolCandidates(candidates, {
    stage: candidateStage,
    query,
    district: profile.district,
    studentGender: profile.studentGender,
    language: profile.language as PlanningSchoolLanguage,
    kindergartenType: isKindergarten ? profile.kindergartenType : "all",
    kindergartenSession: isKindergarten ? profile.kindergartenSession : "all",
    primaryFinance: isKindergarten ? "all" : profile.primaryFinance,
    primarySchoolNet: isKindergarten ? "all" : profile.primarySchoolNet,
    primaryP1Participation: isKindergarten || stage !== "primary-one" ? "all" : profile.primaryP1Participation,
  }), [candidateStage, candidates, isKindergarten, profile.district, profile.kindergartenSession, profile.kindergartenType, profile.language, profile.primaryFinance, profile.primaryP1Participation, profile.primarySchoolNet, profile.studentGender, query, stage]);

  const filteredCandidates = useMemo(() => {
    const routeMatches = routeScopeOnly && route
      ? filterPlanningSchoolCandidatesByRouteSignal(result.matches, route)
      : result.matches;
    const alphabetical = routeMatches
      .slice()
      .sort((a, b) => L(a.names.zh, locale).localeCompare(L(b.names.zh, locale), locale === "tc" ? "zh-Hant" : "zh-Hans"));
    return prioritizePlanningSchoolCandidates(alphabetical, route);
  }, [locale, result.matches, route, routeScopeOnly]);
  const routeSignalCount = !isKindergarten && route
    ? filteredCandidates.filter((candidate) => candidate.routeSignals.some((signal) => signal.route === route)).length
    : 0;
  const visibleLimit = PAGE_SIZE * (1 + (pagination.key === filterKey ? pagination.extraPages : 0));
  const visibleCandidates = filteredCandidates.slice(0, visibleLimit);
  const scopeCount = isKindergarten ? schoolFilterOptions.kindergartenCount : schoolFilterOptions.primaryCount;
  const sectionTitle = isKindergarten ? "幼稚园候选资料" : stage === "primary-one" ? "小一候选小学资料" : "小学候选资料";
  const activeCriteria = [
    profile.district !== "all" ? L(profile.district, locale) : null,
    profile.studentGender === "boy" ? L("男孩（兼容男校及男女校）", locale) : profile.studentGender === "girl" ? L("女孩（兼容女校及男女校）", locale) : null,
    profile.language === "all" ? null : profile.language === "chinese" ? L("有中文授课", locale) : profile.language === "english" ? L("有英文授课", locale) : L("中、英文均有授课", locale),
    isKindergarten && profile.kindergartenType !== "all"
      ? L(profile.kindergartenType === "voucher" ? "参加免费幼稚园教育计划" : profile.kindergartenType === "private" ? "私立" : "国际幼稚园", locale)
      : null,
    isKindergarten && profile.kindergartenSession !== "all" ? L(`${profile.kindergartenSession}班`, locale) : null,
    !isKindergarten && profile.primaryFinance !== "all"
      ? L(({ funded: "官立／资助", "direct-subsidy": "直资", private: "私立", international: "英基／私立独立学校计划" } as const)[profile.primaryFinance], locale)
      : null,
    !isKindergarten && profile.primarySchoolNet !== "all" ? `${profile.primarySchoolNet} ${L("网", locale)}` : null,
    !isKindergarten && stage === "primary-one" && profile.primaryP1Participation !== "all"
      ? L(profile.primaryP1Participation === "listed" ? "列入 2027/28 官津名册" : "不在该官津名册", locale)
      : null,
    query.trim() ? L(`搜索：${query.trim()}`, locale) : null,
    routeScopeOnly && route ? L(`${route === "a-level" ? "A-Level" : route.toUpperCase()} 路线有已核实课程或衔接依据`, locale) : null,
  ].filter((value): value is string => Boolean(value));

  function clearSearch() {
    setQuery("");
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pb-14" aria-labelledby="planning-stage-school-candidates-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">04 / {L(sectionTitle, locale)} · {scopeCount} {L("所学校", locale)}</p>
            <h2 id="planning-stage-school-candidates-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">{L("符合条件的学校候选", locale)}</h2>
          </div>
          <p className="font-mono text-xs text-[var(--p-secondary)]">{L("候选资料按已选条件筛选，不作排名或录取预测。", locale)}</p>
        </div>

        <div className="mt-4 border-l-2 border-[var(--p-bg-yellow)] bg-[var(--p-gray-50)] px-3 py-3 text-xs leading-relaxed text-[var(--p-secondary)]">
          {isKindergarten ? (
            <>
              <p>{L("以下名单是港学荟整理的幼稚园基础资料。地区、性别、班次、语言和收费等项目，部分还没有附上对应的学校官网或教育局链接；报名前请分别到学校官网和教育局资料核对。", locale)}</p>
              <p className="mt-2">{L("语言条件只按已公开列出的语言信息初步筛选，不代表每个年级、班别或课堂的实际安排。卡片会注明是否有逐校来源链接。", locale)}</p>
            </>
          ) : (
            <>
              <p>{L("以下名单是港学荟整理的小学基础资料；校网条件另按教育局 2027/28 官津小一自行分配名册筛选。除特别标注的项目外，其他资料未必附有逐校官方链接，申请前请向学校核对。", locale)}</p>
              <a href={schoolFilterOptions.primaryRoster.sourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4" data-analytics-event="planning_source_opened" data-planning-source-id="primary:2027-28-discretionary-roster">
                {L(schoolFilterOptions.primaryRoster.source, locale)} · {L(`抽取日期 ${schoolFilterOptions.primaryRoster.extracted}`, locale)} ↗
              </a>
              <p className="mt-2">{L(schoolFilterOptions.primaryRoster.note, locale)}</p>
            </>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label htmlFor="planning-stage-school-search" className="block min-w-0 flex-1">
            <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("搜索学校名称", locale)}</span>
            <input id="planning-stage-school-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={L("可输入繁体、简体或英文校名", locale)} autoComplete="off" className={`${INPUT_CLASS} mt-2`} />
          </label>
          <button type="button" onClick={clearSearch} className="min-h-11 shrink-0 border border-[var(--p-gray-300)] px-4 font-mono text-xs font-bold text-[var(--p-fg)] hover:border-[var(--p-fg)]">{L("清除搜索", locale)}</button>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--p-gray-300)] pt-3">
          <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{hasExplicitCriteria
            ? L("以下结果同时符合所有已选条件；有路线依据的学校会优先排列。", locale)
            : routeScopeOnly
              ? L("按已选路线，先展示有课程或升中衔接依据的学校；加入家庭条件后，仍会保留其他符合条件的候选。", locale)
              : L("先在上方选择地区、类别等条件，或搜索学校名称；不会直接展开全港名单。", locale)}</p>
          {hasCandidateScope && <p className="font-mono text-xs font-bold text-[var(--p-fg)]" aria-live="polite">{L(`符合条件 ${filteredCandidates.length} 条`, locale)}{filteredCandidates.length > 0 ? ` · ${L(`目前显示 ${visibleCandidates.length} 条`, locale)}` : ""}</p>}
        </div>

        {!isKindergarten && route && (
          <div className="mt-4 border-l-4 border-[var(--p-bg-purple)] bg-[var(--p-gray-50)] px-4 py-3 text-xs leading-relaxed text-[var(--p-secondary)]" aria-live="polite">
            <p className="font-bold text-[var(--p-fg)]">{L(`${route === "a-level" ? "A-Level" : route.toUpperCase()} 路线线索优先排列`, locale)} · {L(`目前有 ${routeSignalCount} 所符合当前筛选的学校带有已整理路线线索`, locale)}</p>
            <p className="mt-1">{L(routeScopeOnly
              ? "未加入其他筛选条件时，先显示带有当前路线资料的学校；加入地区、语言等条件后，会保留所有符合家庭条件的学校，并把有路线依据者排在前面。路线线索不等于自动升中或保证入读该课程。"
              : "仍会保留所有符合筛选条件的学校；没有路线标记只代表目前未核实到直接课程或升中关联，不代表不能选择该路线。路线线索也不等于自动升中或保证入读该课程。", locale)}</p>
          </div>
        )}

        {activeCriteria.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2" aria-label={L("正在使用的筛选条件", locale)}>
            <span className="font-mono text-[10px] font-bold text-[var(--p-secondary)]">{L("筛选条件", locale)}</span>
            {activeCriteria.map((criterion) => <span key={criterion} className="border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2 py-1 font-mono text-[10px] font-bold text-[var(--p-fg)]">{criterion}</span>)}
          </div>
        )}

        {!hasCandidateScope ? (
          <div className="mt-5 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-7 text-center">
            <p className="font-serif text-xl font-bold text-[var(--p-fg)]">{L("填写条件后，这里会出现匹配学校", locale)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(`目前整理了 ${scopeCount} 所学校；选择一项或多项条件后，学校名单会即时筛选并分批显示。`, locale)}</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="mt-5 border border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-7 text-center">
            <p className="font-serif text-xl font-bold text-[var(--p-fg)]">{L("目前没有可确认符合条件的学校", locale)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{result.unclassifiedCount > 0
              ? L(`${result.unclassifiedCount} 所学校资料不足，暂时无法确认是否符合，未列入结果。`, locale)
              : L("目前没有学校同时符合这些条件。你可以清除搜索或重设上方筛选条件。", locale)}</p>
          </div>
        ) : (
          <>
            {result.unclassifiedCount > 0 && (
              <p className="mt-4 border-l-2 border-[var(--p-bg-yellow)] bg-[var(--p-gray-50)] px-3 py-2 text-xs leading-relaxed text-[var(--p-secondary)]">{L(`${result.unclassifiedCount} 所学校资料不足，暂时无法确认是否符合，未列入结果。`, locale)}</p>
            )}
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {visibleCandidates.map((candidate) => {
                const name = L(candidate.names.zh, locale);
                const district = candidate.district ? L(candidate.district, locale) : null;
                const gender = genderLabel(candidate.gender, locale);
                const sector = isKindergarten
                  ? candidate.kindergartenType ? L(candidate.kindergartenType, locale) : null
                  : primaryFinanceLabel(candidate.primaryFinance, locale);
                const language = candidate.teachingLanguage ? L(candidate.teachingLanguage, locale) : null;
                const shortlistName = district ? `${name} · ${district}` : name;
                const rosterLabel = candidate.primaryP1Participation === true
                  ? L("列入 2027/28 官津自行分配名册", locale)
                  : candidate.primaryP1Participation === false
                    ? L("不在该官津名册（不代表不招收小一）", locale)
                    : null;
                const routeSignals = !isKindergarten && route
                  ? candidate.routeSignals.filter((signal) => signal.route === route)
                  : [];

                return (
                  <article key={candidate.id} className="min-w-0 border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4 md:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--p-secondary)]">{L(isKindergarten ? "幼稚园" : "小学", locale)}{candidate.primaryP1Participation === true && !isKindergarten ? " · P1 2027/28" : ""}</p>
                        <h3 className="mt-1 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{name}</h3>
                        <p className="mt-2 font-mono text-[10px] text-[var(--p-secondary)]">{[district, gender, sector].filter(Boolean).join(" · ") || L("学校基本资料待核", locale)}</p>
                      </div>
                      <ShortlistButton name={shortlistName} kind={isKindergarten ? "kindergarten" : "primary"} locale={locale} />
                    </div>
                    <dl className="mt-4 grid gap-x-4 gap-y-2 border-t border-[var(--p-gray-300)] pt-3 text-xs sm:grid-cols-2">
                      {!isKindergarten && candidate.primarySchoolNet && candidate.primarySchoolNet !== "不限校網" && candidate.primaryP1Participation === true && (
                        <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("自行分配所属校网", locale)}</dt><dd className="mt-1 font-bold text-[var(--p-fg)]">{candidate.primarySchoolNet} {L("网", locale)}</dd></div>
                      )}
                      {!isKindergarten && rosterLabel && <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("小一名册", locale)}</dt><dd className="mt-1 text-[var(--p-fg)]">{rosterLabel}</dd></div>}
                      {isKindergarten && candidate.kindergartenSessions && candidate.kindergartenSessions.length > 0 && <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("学校资料中的班次", locale)}</dt><dd className="mt-1 text-[var(--p-fg)]">{candidate.kindergartenSessions.map((session) => L(session, locale)).join("、")}</dd></div>}
                      {isKindergarten && candidate.freeScheme !== null && <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("免费幼稚园教育计划", locale)}</dt><dd className="mt-1 text-[var(--p-fg)]">{L(candidate.freeScheme ? "目前资料显示：参加" : "目前资料显示：未参加", locale)}</dd></div>}
                      {language && <div>
                        <dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("授课语言", locale)}</dt>
                        <dd className="mt-1 text-[var(--p-fg)]">
                          <p>{language}</p>
                          {candidate.teachingLanguageEvidence?.note && <p className="mt-1 leading-relaxed text-[var(--p-secondary)]">{L(candidate.teachingLanguageEvidence.note, locale)}</p>}
                          {candidate.teachingLanguageEvidence && <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                            <a href={candidate.teachingLanguageEvidence.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`language:${candidate.id}`} className="inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L(candidate.teachingLanguageEvidence.sourceLabel, locale)} · {L(`核对 ${candidate.teachingLanguageEvidence.checkedOn}`, locale)} ↗</a>
                            {candidate.teachingLanguageEvidence.relatedSources?.map((source, sourceIndex) => <a key={`${source.sourceUrl}-${sourceIndex}`} href={source.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`language:${candidate.id}:related:${sourceIndex}`} className="inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L(source.sourceLabel, locale)} ↗</a>)}
                          </div>}
                          {!candidate.teachingLanguageEvidence && <p className="mt-1 text-[10px] leading-relaxed text-[var(--p-secondary)]">{L("这项资料暂未附学校官网或教育局链接，请先按学校官网或教育局当年资料核对。", locale)}</p>}
                        </dd>
                      </div>}
                      {candidate.fees && <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("学费／收费参考", locale)}</dt><dd className="mt-1 text-[var(--p-fg)]">{L(candidate.fees, locale)}<p className="mt-1 text-[10px] leading-relaxed text-[var(--p-secondary)]">{L("这项收费资料暂未附学校官网链接，报名前请以学校当年公布为准。", locale)}</p></dd></div>}
                      {!candidate.fees && candidate.annualFeeAmount !== null && <div><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("年度费用参考", locale)}</dt><dd className="mt-1 text-[var(--p-fg)]">HK${candidate.annualFeeAmount.toLocaleString(locale === "tc" ? "zh-HK" : "zh-CN")}<p className="mt-1 text-[10px] leading-relaxed text-[var(--p-secondary)]">{L("这项收费资料暂未附学校官网链接，报名前请以学校当年公布为准。", locale)}</p></dd></div>}
                      {candidate.address && <div className="sm:col-span-2"><dt className="font-mono text-[10px] text-[var(--p-secondary)]">{L("地址", locale)}</dt><dd className="mt-1 leading-relaxed text-[var(--p-fg)]">{L(candidate.address, locale)}</dd></div>}
                    </dl>
                    {routeSignals.length > 0 && (
                      <div className="mt-4 border-l-4 border-[var(--p-bg-purple)] bg-[var(--p-gray-50)] px-3 py-2.5 text-xs leading-relaxed">
                        {routeSignals.map((signal, signalIndex) => (
                          <div key={`${signal.route}-${signal.kind}-${signal.linkedSchoolName ?? signalIndex}`} className={signalIndex > 0 ? "mt-2 border-t border-[var(--p-gray-300)] pt-2" : ""}>
                            <p className="font-bold text-[var(--p-fg)]">{L(signal.label, locale)}</p>
                            <p className="mt-1 text-[var(--p-secondary)]">{L(signal.note, locale)}</p>
                            {signal.gradeScope && (
                              <div className="mt-2 border-t border-[var(--p-gray-300)] pt-2">
                                <p className="font-mono text-[10px] font-bold text-[var(--p-fg)]">{L("IB 课程适用年级", locale)}</p>
                                <p className="mt-1 text-[var(--p-secondary)]">{L(signal.gradeScope.label, locale)}</p>
                                {signal.gradeScope.note && <p className="mt-1 text-[var(--p-secondary)]">{L(signal.gradeScope.note, locale)}</p>}
                                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                                  {signal.gradeScope.sources.map((source, sourceIndex) => (
                                    <a key={`${source.sourceUrl}-${sourceIndex}`} href={source.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`route:${candidate.id}:ib:grade-scope:${sourceIndex}`} className="inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L(source.sourceLabel, locale)} ↗</a>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                              {signal.sourceUrl && <a href={signal.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`route:${candidate.id}:${signal.route}:${signal.kind}`} className="inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L(signal.sourceLabel, locale)}{signal.checkedOn ? ` · ${L(`核对 ${signal.checkedOn}`, locale)}` : ""} ↗</a>}
                              {signal.relatedSources?.map((source, sourceIndex) => <a key={`${source.sourceUrl}-${sourceIndex}`} href={source.sourceUrl} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`route:${candidate.id}:${signal.route}:${signal.kind}:related:${sourceIndex}`} className="inline-flex font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L(source.sourceLabel, locale)} ↗</a>)}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--p-gray-300)] pt-3">
                      <span className="font-mono text-[10px] text-[var(--p-secondary)]">{L("符合筛选条件，不代表录取机会或学校排名。", locale)}</span>
                      {candidate.website && <a href={candidate.website} target="_blank" rel="noreferrer" data-analytics-event="planning_source_opened" data-planning-source-id={`school:${candidate.id}:website`} className="font-mono text-[10px] font-bold text-[var(--p-fg)] underline underline-offset-4">{L("学校网站", locale)} ↗</a>}
                    </div>
                  </article>
                );
              })}
            </div>
            {visibleCandidates.length < filteredCandidates.length && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <button type="button" onClick={() => setPagination((current) => ({ key: filterKey, extraPages: (current.key === filterKey ? current.extraPages : 0) + 1 }))} className="min-h-12 border-2 border-[var(--p-fg)] px-6 font-mono text-sm font-bold text-[var(--p-fg)] hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]">{L("再显示 12 条", locale)} ↓</button>
                <span className="font-mono text-[10px] text-[var(--p-secondary)]">{L(`目前 ${visibleCandidates.length} / ${filteredCandidates.length}`, locale)}</span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

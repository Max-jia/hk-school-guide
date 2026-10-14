"use client";

import { useMemo } from "react";
import { L, type Locale } from "@/lib/i18n";
import { normalizePlanningDistrict } from "@/lib/planning-district";
import { trackPlanningEvent } from "@/lib/analytics";
import { usePlanningPreferences } from "@/components/PlanningPreferencesProvider";
import type { PlanningPreferences } from "@/lib/planning-preferences";
import type { PlanningSchoolFilterOptions } from "@/lib/planning-school-data";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";
import secondarySchoolCandidates from "@/content/secondary-school-planning-candidates.json";

const ROUTE_LABELS: Record<EducationRoute, string> = {
  dse: "DSE",
  ib: "IB",
  "a-level": "A-Level",
};

const STAGE_NEXT: Record<PlanningStage, string> = {
  kindergarten: "确认幼稚园收生、學費和升小安排",
  "primary-one": "确认自行分配与统一派位的选择次序",
  primary: "比较学校，并开始准备将来的升中选择",
  secondary: "核对学校课程、招生方式和升学出口",
};

const SECONDARY_DISTRICTS = [...new Set(
  secondarySchoolCandidates.schools
    .map((school) => school.district)
    .filter((district): district is string => Boolean(district)),
  )].map(normalizePlanningDistrict).filter((district, index, districts) => districts.indexOf(district) === index);

export default function PlanningDecisionWorkspace({
  locale = "tc",
  stage,
  route,
  schoolFilterOptions,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
  schoolFilterOptions?: PlanningSchoolFilterOptions;
}) {
  const { profile, updateProfile, saveProfile, saved } = usePlanningPreferences();
  const routeLabel = route ? ROUTE_LABELS[route] : L("尚未决定", locale);
  const risk = useMemo(() => {
    if (profile.destination !== "hong-kong") return "还要核对课程资格、目标地区要求和申请时间线。";
    if (profile.language === "english") return "不要只看学校标签，要向学校核对实际教学语言、課時和銜接安排。";
    if (profile.budget === "controlled") return "先把學費、交通、課外活動和額外支援成本列出來，再比較學校。";
    return "目前仍缺少具体学校名单，下一步要用公开资料逐校核对。";
  }, [profile]);

  const alternative = route === "dse" ? "IB 或 A-Level" : route ? "DSE" : "先比较三条路线";

  const update = <K extends keyof PlanningPreferences>(key: K, value: PlanningPreferences[K]) => updateProfile(key, value);

  const save = () => {
    saveProfile();
    trackPlanningEvent("planning_workspace_completed", { stage, route, source: "planning" });
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-workspace-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">03 / {L("路线工作台", locale)}</p>
        <h2 id="planning-workspace-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
          {L("先把家庭条件放进去，再看下一步", locale)}
        </h2>
        <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("这里不是测验，也不会计算录取概率。它只把你目前的方向、限制和待核实问题整理出来，方便下一步比较学校和路线。", locale)}
        </p>

        {stage === "secondary" && (
          <p className="mt-4 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("下面的地区、孩子性别、学校类别和授课语言会直接筛选下方候选清单；目的地、费用取向和转路线意愿只作规划提醒，不会用来推断学校是否适合。结果只按公开资料中能核实的条件匹配，不是排名或录取机会。", locale)}
          </p>
        )}

        {stage === "secondary" && (
          <div id="planning-school-filters" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("希望就读地区", locale)}</span>
              <select value={profile.district} onChange={(event) => update("district", event.target.value)} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                <option value="all">{L("不限制地区", locale)}</option>
                {SECONDARY_DISTRICTS
                  .slice()
                  .sort((a, b) => L(a, locale).localeCompare(L(b, locale), locale === "tc" ? "zh-Hant" : "zh-Hans"))
                  .map((district) => <option key={district} value={district}>{L(district, locale)}</option>)}
              </select>
            </label>
            <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("孩子性别", locale)}</span>
              <select value={profile.studentGender} onChange={(event) => update("studentGender", event.target.value as PlanningPreferences["studentGender"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                <option value="all">{L("不限制", locale)}</option>
                <option value="boy">{L("男孩（包括男校及男女校）", locale)}</option>
                <option value="girl">{L("女孩（包括女校及男女校）", locale)}</option>
              </select>
            </label>
            <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("学校类别", locale)}</span>
              <select value={profile.schoolType} onChange={(event) => update("schoolType", event.target.value as PlanningPreferences["schoolType"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                <option value="all">{L("不限制类别", locale)}</option>
                <option value="public-funded">{L("官立／资助", locale)}</option>
                <option value="dss">{L("直资", locale)}</option>
                <option value="international">{L("国际学校样本", locale)}</option>
              </select>
            </label>
            <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("非语言科目授课线索", locale)}</span>
              <select value={profile.language} onChange={(event) => update("language", event.target.value as PlanningPreferences["language"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                <option value="all">{L("不限制", locale)}</option>
                <option value="chinese">{L("有中文授课的非语言科目", locale)}</option>
                <option value="bilingual">{L("中、英文均有授课的非语言科目", locale)}</option>
                <option value="english">{L("有英文授课的非语言科目", locale)}</option>
              </select>
            </label>
            <div className="sm:col-span-2 xl:col-span-4 flex flex-wrap items-center justify-between gap-3 border-l-2 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3">
              <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{L("改变以上条件后，下方学校名单会即时更新。学校资料没有写明的项目，不会直接算作符合；结果较多时会分批显示。授课语言根据学校概览列出的非语言科目作初步筛选，不代表全校统一安排。", locale)}</p>
              <button
                type="button"
                onClick={() => {
                  update("district", "all");
                  update("studentGender", "all");
                  update("schoolType", "all");
                  update("language", "all");
                }}
                className="min-h-9 shrink-0 border border-[var(--p-gray-300)] px-3 font-mono text-[10px] font-bold text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]"
              >
                {L("重设学校条件", locale)}
              </button>
            </div>
          </div>
        )}
        {(stage === "kindergarten" || stage === "primary" || stage === "primary-one") && (
          <>
            <p className="mt-4 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
              {stage === "kindergarten"
                ? L("以下条件会直接筛选幼稚园候选。我们只根据学校资料中明确列出的地区、性别、类别、班次和语言信息来匹配；没有写明的内容不会自行推断，学费和收生安排请再向学校核实。", locale)
                : L("以下条件会直接筛选小学候选。选择校网时，只按教育局 2027/28 官津小一自行分配名册的所属校网匹配；不在该名册不代表学校不招收小一，统一派位选择范围也需另行核实。", locale)}
            </p>
            <div id="planning-school-filters" className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("希望就读地区", locale)}</span>
                <select value={profile.district} onChange={(event) => update("district", event.target.value)} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                  <option value="all">{L("不限制地区", locale)}</option>
                  {(schoolFilterOptions?.districts ?? []).map((district) => <option key={district} value={district}>{L(district, locale)}</option>)}
                </select>
              </label>
              <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("孩子性别", locale)}</span>
                <select value={profile.studentGender} onChange={(event) => update("studentGender", event.target.value as PlanningPreferences["studentGender"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                  <option value="all">{L("不限制", locale)}</option>
                  <option value="boy">{L("男孩（包括男校及男女校）", locale)}</option>
                  <option value="girl">{L("女孩（包括女校及男女校）", locale)}</option>
                </select>
              </label>
              {stage === "kindergarten" ? (
                <>
                  <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("幼稚园类别", locale)}</span>
                    <select value={profile.kindergartenType} onChange={(event) => update("kindergartenType", event.target.value as PlanningPreferences["kindergartenType"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                      <option value="all">{L("不限制类别", locale)}</option>
                      <option value="voucher">{L("参加免费幼稚园教育计划", locale)}</option>
                      <option value="private">{L("私立", locale)}</option>
                      <option value="international">{L("国际幼稚园", locale)}</option>
                    </select>
                  </label>
                  <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("可考虑的班次", locale)}</span>
                    <select value={profile.kindergartenSession} onChange={(event) => update("kindergartenSession", event.target.value as PlanningPreferences["kindergartenSession"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                      <option value="all">{L("不限制班次", locale)}</option>
                      <option value="上午">{L("上午班", locale)}</option>
                      <option value="下午">{L("下午班", locale)}</option>
                      <option value="全日">{L("全日班", locale)}</option>
                    </select>
                  </label>
                </>
              ) : (
                <>
                  <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("小学类别", locale)}</span>
                    <select value={profile.primaryFinance} onChange={(event) => update("primaryFinance", event.target.value as PlanningPreferences["primaryFinance"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                      <option value="all">{L("不限制类别", locale)}</option>
                      <option value="funded">{L("官立／资助", locale)}</option>
                      <option value="direct-subsidy">{L("直资", locale)}</option>
                      <option value="private">{L("私立", locale)}</option>
                      <option value="international">{L("英基／私立独立学校计划", locale)}</option>
                    </select>
                  </label>
                  <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("2027/28 官津小一自行分配校网", locale)}</span>
                    <select
                      value={profile.primarySchoolNet}
                      disabled={stage === "primary-one" && profile.primaryP1Participation === "not-listed"}
                      onChange={(event) => update("primarySchoolNet", event.target.value)}
                      className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="all">{L("不按校网筛选", locale)}</option>
                      {(schoolFilterOptions?.primarySchoolNets ?? []).map(({ net, areaShort }) => <option key={net} value={net}>{net} {L("网", locale)} · {L(areaShort, locale)}</option>)}
                    </select>
                    {stage === "primary-one" && profile.primaryP1Participation === "not-listed" && (
                      <span className="mt-2 block text-[10px] leading-relaxed text-[var(--p-secondary)]">{L("不在该名册的学校没有这份名册所属校网资料，校网筛选已关闭。", locale)}</span>
                    )}
                  </label>
                  {stage === "primary-one" && (
                    <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                      <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("小一名册范围", locale)}</span>
                      <select
                        value={profile.primaryP1Participation}
                        onChange={(event) => {
                          const participation = event.target.value as PlanningPreferences["primaryP1Participation"];
                          update("primaryP1Participation", participation);
                          if (participation === "not-listed") update("primarySchoolNet", "all");
                        }}
                        className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none"
                      >
                        <option value="all">{L("不限制", locale)}</option>
                        <option value="listed">{L("列入 2027/28 官津名册", locale)}</option>
                        <option value="not-listed">{L("不在该官津名册（不等于不招生）", locale)}</option>
                      </select>
                    </label>
                  )}
                </>
              )}
              <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L(stage === "kindergarten" ? "公开资料中的授课语言" : "学校概览中的授课语言", locale)}</span>
                <select value={profile.language} onChange={(event) => update("language", event.target.value as PlanningPreferences["language"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
                  <option value="all">{L("不限制", locale)}</option>
                  <option value="chinese">{L("有中文授课", locale)}</option>
                  <option value="bilingual">{L("中、英文均有授课", locale)}</option>
                  <option value="english">{L("有英文授课", locale)}</option>
                </select>
              </label>
              <div className="sm:col-span-2 xl:col-span-4 flex flex-wrap items-center justify-between gap-3 border-l-2 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3">
                <p className="text-xs leading-relaxed text-[var(--p-secondary)]">
                  {L(stage === "kindergarten"
                    ? "所有已选条件会同时生效。筛选根据目前整理的学校资料进行，不代表校方对录取、学费或教学安排的承诺；资料不完整时，我们会另外提示。"
                    : "所有已选条件会同时生效。校网来自教育局 2027/28 自行分配名册（433 所官立及资助小学，抽取于 2026-09-07）；它不是统一派位完整选校范围。资料不完整时，我们会另外提示。", locale)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    update("district", "all");
                    update("studentGender", "all");
                    update("language", "all");
                    if (stage === "kindergarten") {
                      update("kindergartenType", "all");
                      update("kindergartenSession", "all");
                    } else {
                      update("primaryFinance", "all");
                      update("primarySchoolNet", "all");
                      update("primaryP1Participation", "all");
                    }
                  }}
                  className="min-h-9 shrink-0 border border-[var(--p-gray-300)] px-3 font-mono text-[10px] font-bold text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]"
                >
                  {L("重设学校条件", locale)}
                </button>
              </div>
            </div>
          </>
        )}

        <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${stage === "secondary" ? "xl:grid-cols-3" : "xl:grid-cols-4"}`}>
          <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
            <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("升学目的地", locale)}</span>
            <select value={profile.destination} onChange={(event) => update("destination", event.target.value as PlanningPreferences["destination"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
              <option value="hong-kong">{L("香港为主", locale)}</option>
              <option value="overseas">{L("海外为主", locale)}</option>
              <option value="both">{L("香港及海外都考虑", locale)}</option>
            </select>
          </label>
          <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
            <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("费用取向", locale)}</span>
            <select value={profile.budget} onChange={(event) => update("budget", event.target.value as PlanningPreferences["budget"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
              <option value="controlled">{L("先控制固定成本", locale)}</option>
              <option value="flexible">{L("可接受一定弹性", locale)}</option>
              <option value="international">{L("可考虑国际课程成本", locale)}</option>
            </select>
          </label>
          <label className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
            <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("转校或转路线", locale)}</span>
            <select value={profile.flexibility} onChange={(event) => update("flexibility", event.target.value as PlanningPreferences["flexibility"])} className="mt-3 w-full border-b-2 border-[var(--p-fg)] bg-transparent py-2 text-sm text-[var(--p-fg)] outline-none">
              <option value="stable">{L("希望路线稳定", locale)}</option>
              <option value="open">{L("可以保持弹性", locale)}</option>
            </select>
          </label>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="border-2 border-[var(--p-fg)] bg-[var(--p-bg-yellow)] p-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--p-gray-700)]">{L("当前主线", locale)}</p>
            <p className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)]">{routeLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p-gray-700)]">{L("以目前选择为工作假设，后续可以随时更改。", locale)}</p>
          </div>
          <div className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--p-secondary)]">{L("下一次决策", locale)}</p>
            <p className="mt-2 font-serif text-xl font-bold text-[var(--p-fg)]">{stage ? L(STAGE_NEXT[stage], locale) : L("先选择当前阶段", locale)}</p>
          </div>
          <div className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--p-secondary)]">{L("需要留意", locale)}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(risk, locale)}</p>
            <p className="mt-2 text-xs text-[var(--p-secondary)]">{L(`备选路线：${alternative}`, locale)}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs leading-relaxed text-[var(--p-secondary)]">{L("以上是当前家庭条件下的整理结果，不是路线匹配度、录取预测或学校排名。", locale)}</p>
          <button type="button" onClick={save} className="inline-flex min-h-10 shrink-0 items-center justify-center border-2 border-[var(--p-fg)] bg-[var(--p-fg)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-bg)] transition-colors duration-100 hover:bg-transparent hover:text-[var(--p-fg)]">
            {saved ? L("已保存这次整理", locale) : L("保存这次整理", locale)}
          </button>
        </div>
      </div>
    </section>
  );
}

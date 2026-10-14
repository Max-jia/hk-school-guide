import Image from "next/image";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Link from "next/link";
import PlanningReportSuggestions from "@/components/PlanningReportSuggestions";
import PlanningShortlistSummary from "@/components/PlanningShortlistSummary";
import PlanningProfileBar from "@/components/PlanningProfileBar";
import PlanningDecisionWorkspace from "@/components/PlanningDecisionWorkspace";
import PlanningRouteMatrix from "@/components/PlanningRouteMatrix";
import PlanningSecondaryAuditPanel from "@/components/PlanningSecondaryAuditPanel";
import PlanningSecondarySchoolSamples from "@/components/PlanningSecondarySchoolSamples";
import PlanningStageSchoolCandidates from "@/components/PlanningStageSchoolCandidates";
import PlanningSchoolRouteChecklist from "@/components/PlanningSchoolRouteChecklist";
import PlanningTaskBoard from "@/components/PlanningTaskBoard";
import PlanningEvidencePanel from "@/components/PlanningEvidencePanel";
import PlanningActionTimeline from "@/components/PlanningActionTimeline";
import PlanningAnalytics from "@/components/PlanningAnalytics";
import PlanningPreferencesProvider from "@/components/PlanningPreferencesProvider";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { getPlanningSchoolCandidates, getPlanningSchoolFilterOptions } from "@/lib/planning-school-data";

export type PlanningStage = "kindergarten" | "primary-one" | "primary" | "secondary";
export type EducationRoute = "dse" | "ib" | "a-level";

const ROUTES = [
  { key: "dse" as const, label: "DSE", description: "先了解 DSE、JUPAS，以及本地和海外升学选择。", bg: "bg-[var(--p-bg-yellow)]", next: "先看学校的升中安排和 DSE 资料，再比较收生条件。" },
  { key: "ib" as const, label: "IB", description: "先看课程内容、评核方式，以及学校有没有开办。", bg: "bg-[var(--p-bg-purple)]", next: "先找有 IB 课程的学校，再比较课程、學費和升學方向。" },
  { key: "a-level" as const, label: "A-Level", description: "先比较选科组合、考试安排和目标地区的要求。", bg: "bg-[var(--p-bg-blue)]", next: "先看学校提供哪些科目，再对照目标地区的升学要求。" },
];

const STAGES = [
  { key: "kindergarten" as const, label: "幼稚園", description: "先处理学费、语言、校网与升小安排。", href: "/tools" },
  { key: "primary-one" as const, label: "小一", description: "进入自行分配或统一派位的实际决策。", href: "/tools/p1-discretionary" },
  { key: "primary" as const, label: "小學", description: "比较学校，也留意将来的升中选择。", href: "/compare" },
  { key: "secondary" as const, label: "中學", description: "先把不同路线和学校情况摸清。", href: "/reports" },
];

function isPlanningStage(value: string | string[] | undefined): value is PlanningStage {
  return typeof value === "string" && STAGES.some((stage) => stage.key === value);
}

function isEducationRoute(value: string | string[] | undefined): value is EducationRoute {
  return typeof value === "string" && ROUTES.some((route) => route.key === value);
}

function planningHref(locale: Locale, params: { stage?: PlanningStage; route?: EducationRoute }) {
  const query = new URLSearchParams();
  if (params.stage) query.set("stage", params.stage);
  if (params.route) query.set("route", params.route);
  const suffix = query.toString();
  return localeHref(suffix ? `/planning?${suffix}` : "/planning", locale);
}

export default function EducationPlanningPage({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: string | string[];
  route?: string | string[];
}) {
  const selectedStage = isPlanningStage(stage) ? stage : undefined;
  const selectedRoute = isEducationRoute(route) ? route : undefined;
  const stageInfo = STAGES.find((item) => item.key === selectedStage);
  const routeInfo = ROUTES.find((item) => item.key === selectedRoute);
  const candidateStage = selectedStage === "kindergarten"
    ? "kindergarten"
    : selectedStage === "primary" || selectedStage === "primary-one"
      ? "primary"
      : undefined;
  const schoolCandidates = candidateStage ? getPlanningSchoolCandidates(candidateStage) : undefined;
  const schoolFilterOptions = candidateStage ? getPlanningSchoolFilterOptions(candidateStage) : undefined;

  return (
    <>
      <SiteHeader locale={locale} />
      <PlanningAnalytics surface="planning" stage={selectedStage} route={selectedRoute} />
      <PlanningPreferencesProvider>
      <main id="planning-page" className="mx-auto w-full min-w-0 max-w-[1280px] overflow-x-clip px-4 pb-20">
        <section className="relative isolate flex min-h-[clamp(560px,68svh,700px)] flex-col justify-end overflow-hidden border-y-2 border-[var(--p-fg)] px-5 py-12 md:px-10 md:py-16">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <Image
              src="/home/hong-kong-school-building.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1280px"
              className="object-cover object-[68%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,241,0.9)_0%,rgba(250,248,241,0.78)_58%,rgba(250,248,241,0.52)_100%)] md:bg-[linear-gradient(90deg,rgba(250,248,241,0.9)_0%,rgba(250,248,241,0.7)_54%,rgba(250,248,241,0.2)_100%)]" />
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">{L("升学规划", locale)}</p>
          <h1 className="mt-4 max-w-[760px] font-serif text-[clamp(40px,7vw,76px)] font-bold leading-[0.98] tracking-[-1.5px] text-[var(--p-fg)]">
            {L("先看方向，再选学校", locale)}
          </h1>
          <p className="mt-5 max-w-[680px] text-base leading-relaxed text-[var(--p-secondary)] md:text-lg">
            {L("先选孩子现在的阶段，再看 DSE、IB 或 A-Level。接下来会按你的选择，列出相关学校、工具和资料。", locale)}
          </p>
          {(stageInfo || routeInfo) && (
            <div className="mt-6 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 text-sm leading-relaxed text-[var(--p-gray-700)]">
              {stageInfo && routeInfo
                ? L(`当前先看「${stageInfo.label}」的 ${routeInfo.label} 路线。`, locale)
                : stageInfo
                  ? L(`当前先看「${stageInfo.label}」。`, locale)
                  : L(`当前先看 ${routeInfo?.label} 路线。`, locale)}
            </div>
          )}
        </section>

        <nav aria-label={L("本页快速导航", locale)} className="sticky top-0 z-30 -mx-4 mb-8 border-y border-[var(--p-gray-300)] bg-[var(--p-card)] px-4 py-2 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="shrink-0 font-mono text-[10px] font-bold text-[var(--p-secondary)]">{L("跳到", locale)}</span>
            <a href="#planning-stage-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("阶段", locale)}</a>
            <a href="#planning-route-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("路线", locale)}</a>
            {selectedStage && selectedStage !== "secondary" && (
              <a href="#planning-stage-school-candidates-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("学校候选", locale)}</a>
            )}
            {selectedStage === "secondary" && (
              <a href="#planning-secondary-samples-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("学校候选", locale)}</a>
            )}
            <a href="#planning-route-matrix-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("路线比较", locale)}</a>
            {(selectedStage || selectedRoute) && (
              <a href="#planning-task-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("行动清单", locale)}</a>
            )}
            {(selectedStage || selectedRoute) && (
              <a href="#planning-timeline-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("时间安排", locale)}</a>
            )}
            {selectedStage && (
              <a href="#planning-report-title" className="shrink-0 border border-[var(--p-gray-300)] px-3 py-2 text-xs font-bold text-[var(--p-fg)] no-underline hover:border-[var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">{L("报告", locale)}</a>
            )}
          </div>
        </nav>

        <PlanningShortlistSummary locale={locale} />
        <PlanningProfileBar locale={locale} stage={selectedStage} route={selectedRoute} />

        <section className="relative mt-12 overflow-hidden" aria-labelledby="planning-stage-title">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block" aria-hidden="true">
            <Image
              src="/home/hk-campus-skyline.jpg"
              alt=""
              fill
              sizes="46vw"
              className="object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--p-bg)_0%,rgba(250,248,241,0.72)_44%,rgba(250,248,241,0.18)_100%)]" />
          </div>
          <div className="relative z-10 border-t-2 border-[var(--p-fg)] pt-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">01 / {L("先定孩子的阶段", locale)}</p>
            <h2 id="planning-stage-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
              {L("先选孩子现在的阶段", locale)}
            </h2>
            <div className="mt-6 grid gap-0 border-y-2 border-[var(--p-fg)] md:grid-cols-2">
              {STAGES.map((stage) => (
                <Link
                  key={stage.key}
                  href={planningHref(locale, { stage: stage.key, route: selectedRoute })}
                  scroll={false}
                  aria-current={selectedStage === stage.key ? "page" : undefined}
                  data-analytics-event="stage_selected"
                  data-planning-stage={stage.key}
                  className={`group border-b border-[var(--p-gray-300)] px-1 py-5 no-underline last:border-b-0 md:px-4 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0 ${selectedStage === stage.key ? "bg-[var(--p-green)]" : "hover:bg-[var(--p-gray-50)]"}`}
                >
                  <span className="block font-serif text-2xl font-bold text-[var(--p-fg)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{L(stage.label, locale)}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-[var(--p-secondary)]">{L(stage.description, locale)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="planning-route-title">
          <div className="border-t-2 border-[var(--p-fg)] pt-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">02 / {L("再看升学方向", locale)}</p>
            <h2 id="planning-route-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
              {L("DSE、IB、A-Level，先看哪一条？", locale)}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {ROUTES.map((route) => (
                <Link
                  key={route.key}
                  href={planningHref(locale, { stage: selectedStage, route: route.key })}
                  scroll={false}
                  aria-current={selectedRoute === route.key ? "page" : undefined}
                  data-analytics-event="route_selected"
                  data-planning-route={route.key}
                  className={`group block border-2 border-[var(--p-fg)] p-5 no-underline transition-transform duration-100 hover:-translate-y-1 ${route.bg} ${selectedRoute === route.key ? "ring-4 ring-[var(--p-fg)] ring-offset-2" : ""}`}
                >
                  <span className="font-mono text-sm font-bold text-[var(--p-gray-900)]">{route.label}</span>
                  <p className="mt-6 text-sm leading-relaxed text-[var(--p-gray-700)]">{L(route.description, locale)}</p>
                  <span className="mt-6 block font-mono text-xs font-bold text-[var(--p-gray-900)]">{L("看看这条路线", locale)} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <PlanningDecisionWorkspace locale={locale} stage={selectedStage} route={selectedRoute} schoolFilterOptions={schoolFilterOptions} />

        {selectedStage && selectedStage !== "secondary" && schoolCandidates && schoolFilterOptions && (
          <PlanningStageSchoolCandidates
            key={selectedStage}
            locale={locale}
            stage={selectedStage}
            route={selectedRoute}
            candidates={schoolCandidates}
            schoolFilterOptions={schoolFilterOptions}
          />
        )}

        {selectedStage === "secondary" && (
          <PlanningSecondarySchoolSamples key={`${selectedStage}-${selectedRoute ?? "all"}`} locale={locale} stage={selectedStage} route={selectedRoute} />
        )}

        <PlanningRouteMatrix locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningSecondaryAuditPanel locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningSchoolRouteChecklist locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningTaskBoard locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningEvidencePanel locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningActionTimeline locale={locale} stage={selectedStage} route={selectedRoute} />

        <PlanningReportSuggestions locale={locale} stage={selectedStage} />

        <p className="mt-10 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("资料会继续补齐。现在先把阶段和方向定下来；学校资料、工具和核验记录会按你的选择展开。", locale)}
        </p>
      </main>
      </PlanningPreferencesProvider>
      <SiteFooter locale={locale} />
    </>
  );
}

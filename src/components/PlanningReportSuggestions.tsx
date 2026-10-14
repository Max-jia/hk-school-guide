import reportMeta from "@/content/report-meta.json";
import { L, localeHref, type Locale } from "@/lib/i18n";
import type { PlanningStage } from "@/components/EducationPlanningPage";

type ReportSummary = {
  n: string;
  t?: string;
  d: string;
  h: string;
  c: string;
  premium?: boolean;
};

const META = reportMeta as { PS_REPORTS: ReportSummary[]; KG_REPORTS: ReportSummary[] };

export default function PlanningReportSuggestions({
  locale = "tc",
  stage,
}: {
  locale?: Locale;
  stage?: PlanningStage;
}) {
  if (!stage) return null;

  if (stage === "secondary") {
    return (
      <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-report-title">
        <div className="border-t-2 border-[var(--p-fg)] pt-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
            11 / {L("中学资料建设中", locale)}
          </p>
          <h2 id="planning-report-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
            {L("先看路线框架，不把小学报告当成中学结论", locale)}
          </h2>
          <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("目前中学学校、课程和升学出口资料仍在逐步核验。这里暂不推荐小学报告作为中学选择依据；可以先比较 DSE、IB、A-Level，再记录需要向学校和官方来源核对的问题。", locale)}
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              ["dse", "DSE", "先看 DSE、JUPAS 和本地及海外升学出口。"],
              ["ib", "IB", "先看课程结构、评核方式和学校是否开办。"],
              ["a-level", "A-Level", "先看选科组合、考试安排和目标地区要求。"],
            ].map(([key, label, description]) => (
              <a
                key={key}
                href={localeHref(`/planning?stage=secondary&route=${key}`, locale)}
                className="block border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4 no-underline transition-colors duration-100 hover:bg-[var(--p-gray-50)]"
              >
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{label}</span>
                <p className="mt-3 text-sm leading-relaxed text-[var(--p-secondary)]">{L(description, locale)}</p>
                <span className="mt-4 block font-mono text-xs font-bold text-[var(--p-fg)]">{L("查看路线", locale)} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const reports = stage === "kindergarten" ? META.KG_REPORTS.slice(0, 3) : META.PS_REPORTS.slice(0, 3);
  const label = stage === "kindergarten" ? "幼稚園" : "小学";

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-report-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
              11 / {L("从学校资料开始", locale)}
            </p>
            <h2 id="planning-report-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
              {L(`这阶段可以先看 ${label} 报告`, locale)}
            </h2>
          </div>
          <a href={localeHref("/reports", locale)} className="font-mono text-sm font-bold text-[var(--p-fg)] no-underline hover:underline">
            {L("查看全部报告 →", locale)}
          </a>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {reports.map((report) => (
            <a
              key={report.c}
              href={localeHref(`/reports/${report.c}`, locale)}
              data-analytics-event="report_opened_from_planning"
              className="group block border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4 no-underline transition-transform duration-100 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{report.t || "未评级"}</span>
                <span className="font-mono text-[10px] text-[var(--p-secondary)]">
                  {L("全文公开", locale)}
                </span>
              </div>
              <h3 className="mt-7 font-serif text-xl font-bold leading-tight text-[var(--p-fg)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                {L(report.n, locale)}
              </h3>
              <p className="mt-2 text-sm text-[var(--p-secondary)]">{L(report.d, locale)}</p>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(report.h, locale)}</p>
              <span className="mt-5 block font-mono text-xs font-bold text-[var(--p-fg)]">{L("查看报告", locale)} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

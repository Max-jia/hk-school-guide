"use client";

import { useEffect, useMemo, useState } from "react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { readShortlist, SHORTLIST_CHANGE_EVENT, type ShortlistEntry } from "@/lib/shortlist";
import { trackPlanningEvent } from "@/lib/analytics";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

const STORAGE_KEY = "hk-guide-planning-school-route-v1";

type RouteCheck = {
  id: string;
  title: string;
};

const ROUTE_CHECKS: Record<EducationRoute, RouteCheck[]> = {
  dse: [
    { id: "programme", title: "学校是否实际开办这条课程路线" },
    { id: "subjects", title: "科目、选修和评核安排是否已核对" },
    { id: "outcomes", title: "升学出口和申请要求是否有当届资料" },
  ],
  ib: [
    { id: "stage", title: "学校开办的 IB 学段是否已核对" },
    { id: "assessment", title: "语言、评核和课程安排是否已核对" },
    { id: "admission", title: "收生、费用和衔接要求是否有当届资料" },
  ],
  "a-level": [
    { id: "qualification", title: "IGCSE、AS、A-Level 阶段是否已核对" },
    { id: "subjects", title: "考试局和目标科目是否已核对" },
    { id: "requirements", title: "申请要求、费用和时间线是否有当届资料" },
  ],
};

type Completed = Record<string, string[]>;

function readCompleted(): Completed {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const value = raw ? JSON.parse(raw) as unknown : {};
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter(([, checks]) => Array.isArray(checks) && checks.every((check) => typeof check === "string")),
    ) as Completed;
  } catch {
    return {};
  }
}

function stageKind(stage?: PlanningStage): ShortlistEntry["kind"] | null {
  if (stage === "kindergarten") return "kindergarten";
  if (stage === "primary" || stage === "primary-one") return "primary";
  if (stage === "secondary") return "secondary";
  return null;
}

export default function PlanningSchoolRouteChecklist({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const [entries, setEntries] = useState<ShortlistEntry[]>([]);
  const [completed, setCompleted] = useState<Completed>({});
  const kind = stageKind(stage);
  const checks = route ? ROUTE_CHECKS[route] : [];

  useEffect(() => {
    // Read browser-only shortlist and checklist state after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(readShortlist());
    setCompleted(readCompleted());
    const syncShortlist = () => setEntries(readShortlist());
    window.addEventListener(SHORTLIST_CHANGE_EVENT, syncShortlist);
    window.addEventListener("storage", syncShortlist);
    return () => {
      window.removeEventListener(SHORTLIST_CHANGE_EVENT, syncShortlist);
      window.removeEventListener("storage", syncShortlist);
    };
  }, []);

  const visibleEntries = useMemo(() => kind ? entries.filter((entry) => entry.kind === kind) : [], [entries, kind]);
  const routeLabel = route || L("尚未选择路线", locale);

  function toggle(entry: ShortlistEntry, check: RouteCheck) {
    setCompleted((current) => {
      const currentChecks = current[entry.id] || [];
      const nextChecks = currentChecks.includes(check.id)
        ? currentChecks.filter((id) => id !== check.id)
        : [...currentChecks, check.id];
      const next = { ...current, [entry.id]: nextChecks };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // The checklist remains available for this session if storage is blocked.
      }
      if (!currentChecks.includes(check.id)) {
        trackPlanningEvent("planning_school_check_completed", { stage, route, school: entry.id, check: check.id, source: "planning" });
      }
      return next;
    });
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pb-14" aria-labelledby="planning-school-route-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">07 / {L("候选学校核对", locale)}</p>
            <h2 id="planning-school-route-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
              {L("把候选学校带进这条路线", locale)}
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--p-secondary)]">{L(`当前路线：${routeLabel}`, locale)}</span>
        </div>
        <p className="mt-3 max-w-[800px] text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("这里不会替学校补资料，也不会自动判断适合度。每一项只是一个核对记录，完成前应先找到学校或官方来源。", locale)}
        </p>

        {!route ? (
          <div className="mt-6 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-6 text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("先选择 DSE、IB 或 A-Level，才可以把候选学校按路线拆成核对事项。", locale)}
          </div>
        ) : visibleEntries.length === 0 ? (
          <div className="mt-6 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-6 text-sm leading-relaxed text-[var(--p-secondary)]">
            <p className="font-serif text-xl font-bold text-[var(--p-fg)]">{L("还没有这一阶段的候选学校", locale)}</p>
            <p className="mt-2">{L("先在学校报告或学校对比页加入候选，回来后就可以按当前路线逐项记录核对进度。", locale)}</p>
            <a href={localeHref("/shortlist", locale)} className="mt-4 inline-flex font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline">{L("打开候选清单", locale)} →</a>
          </div>
        ) : (
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {visibleEntries.map((entry) => {
              const done = completed[entry.id] || [];
              const routeCompatible = entry.kind !== "secondary" || !entry.routes || entry.routes.includes(route);
              return (
                <article key={entry.id} className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--p-secondary)]">{entry.kind === "primary" ? L("小学候选", locale) : entry.kind === "kindergarten" ? L("幼稚园候选", locale) : L("中学候选", locale)}</span>
                      <h3 className="mt-2 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{entry.name}</h3>
                    </div>
                    <span className="font-mono text-[10px] text-[var(--p-secondary)]">{done.length} / {checks.length}</span>
                  </div>
                  {routeCompatible ? (
                    <div className="mt-4 grid gap-2">
                      {checks.map((check) => {
                        const checked = done.includes(check.id);
                        return (
                          <label key={check.id} className={`flex items-start gap-2 border px-3 py-2 text-sm leading-relaxed ${checked ? "border-[#0F766E] bg-[#E7F6F2] text-[#0F766E]" : "border-[var(--p-gray-300)] text-[var(--p-secondary)]"}`}>
                            <input type="checkbox" checked={checked} onChange={() => toggle(entry, check)} className="mt-1 h-4 w-4 shrink-0 accent-[var(--p-fg)]" />
                            <span>{L(check.title, locale)}</span>
                          </label>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-3 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
                      {L("這所學校的已核對樣本沒有列入當前路線；先切換到學校列出的路線，再繼續核對。", locale)}
                    </div>
                  )}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {entry.href && <a href={localeHref(entry.href, locale)} className="font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline">{L("打开学校资料", locale)} →</a>}
                    {entry.kind === "secondary" ? (
                      <a href={localeHref(`/planning?stage=secondary&route=${route}`, locale)} className="font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline">{L("回到升学规划", locale)} →</a>
                    ) : (
                      <a href={localeHref("/compare", locale)} className="font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline">{L("去学校对比", locale)} →</a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

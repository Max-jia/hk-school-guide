import { L, localeHref, type Locale } from "@/lib/i18n";

const STAGES = [
  { key: "kindergarten", label: "幼稚園", caption: "學費、語言，同升小安排" },
  { key: "primary-one", label: "小一", caption: "先分清自行分配與統一派位" },
  { key: "primary", label: "小學", caption: "比較學校，也留意將來升中選擇" },
  { key: "secondary", label: "中學", caption: "先把不同路線和學校情況摸清" },
] as const;

const ROUTES = [
  { key: "dse", label: "DSE", tone: "bg-[var(--p-bg-yellow)]" },
  { key: "ib", label: "IB", tone: "bg-[var(--p-bg-purple)]" },
  { key: "a-level", label: "A-Level", tone: "bg-[var(--p-bg-blue)]" },
] as const;

export default function EducationRouteMap({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-12" aria-labelledby="route-map-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
              01 / {L("先定当前阶段", locale)}
            </p>
            <h2 id="route-map-title" className="mt-2 font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
              {L("先从孩子现在的阶段看起", locale)}
            </h2>
          </div>
          <p className="max-w-[360px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("不用一次决定全部。先处理眼前的择校问题，再看下一步。", locale)}
          </p>
        </div>

        <div className="mt-7 grid gap-3 md:grid-cols-4 md:gap-0 md:border-b md:border-[var(--p-gray-300)]">
          {STAGES.map((stage, index) => (
            <a
              key={stage.key}
              href={localeHref(`/planning?stage=${stage.key}`, locale)}
              data-analytics-event="stage_selected"
              data-planning-stage={stage.key}
              className="group relative border-b border-[var(--p-gray-300)] pb-4 pt-2 no-underline last:border-b-0 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--p-fg)] bg-[var(--p-green)] font-mono text-xs font-bold text-[var(--p-gray-900)] transition-transform duration-100 group-hover:scale-110">
                  {index + 1}
                </span>
                <span className="font-serif text-2xl font-bold text-[var(--p-fg)]">{L(stage.label, locale)}</span>
              </span>
              <span className="mt-3 block pl-11 text-sm leading-relaxed text-[var(--p-secondary)]">{L(stage.caption, locale)}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">
            {L("升学方向", locale)}
          </span>
          <span className="hidden h-px flex-1 bg-[var(--p-gray-300)] md:block" aria-hidden="true" />
          <div className="grid flex-1 gap-2 sm:grid-cols-3">
            {ROUTES.map((route) => (
              <a
                key={route.key}
                href={localeHref(`/planning?route=${route.key}`, locale)}
                data-analytics-event="route_selected"
                data-planning-route={route.key}
                className={`group flex min-h-12 items-center justify-between border-2 border-[var(--p-fg)] px-4 py-2 font-mono text-sm font-bold text-[var(--p-fg)] no-underline transition-transform duration-100 hover:-translate-y-0.5 ${route.tone}`}
              >
                <span>{route.label}</span>
                <span aria-hidden="true" className="text-base transition-transform duration-100 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

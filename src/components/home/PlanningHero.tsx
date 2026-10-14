import Image from "next/image";
import { L, localeHref, type Locale } from "@/lib/i18n";

const START_OPTIONS = [
  { label: "幼稚園", description: "先看學費、語言和升小安排", href: "/planning?stage=kindergarten" },
  { label: "小一", description: "先分清自行分配和統一派位", href: "/tools/p1-discretionary" },
  { label: "小學", description: "比較學校，也留意將來升中", href: "/compare" },
  { label: "中學路線", description: "先看 DSE、IB、A-Level", href: "/planning?stage=secondary" },
] as const;

export default function PlanningHero({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="w-full max-w-none pb-10 pt-2 md:pb-14 md:pt-6">
      <div className="relative isolate overflow-hidden border-y-2 border-[var(--p-fg)] px-5 py-10 md:px-10 md:py-12">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src="/home/hk-city-school-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-[center_58%] md:block"
          />
          <Image
            src="/home/hk-city-school-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,241,0.96)_0%,rgba(250,248,241,0.92)_55%,rgba(250,248,241,0.72)_100%)] md:bg-[linear-gradient(90deg,rgba(250,248,241,0.9)_0%,rgba(250,248,241,0.68)_55%,rgba(250,248,241,0.22)_100%)]" />
        </div>
        <div className="mx-auto max-w-[1280px]">
          <div className="relative z-10 max-w-[930px]">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
            {L("升学规划", locale)}
          </p>
          <h1 className="mt-4 max-w-[760px] font-serif text-[clamp(40px,7vw,82px)] font-bold leading-[0.98] tracking-[-1.5px] text-[var(--p-fg)]">
            {L("先看方向，再选学校", locale)}
          </h1>
          <p className="mt-6 max-w-[680px] text-base font-medium leading-relaxed text-[var(--p-fg)] md:text-lg">
            {L(
              "先选孩子现在的阶段，再看 DSE、IB 或 A-Level。学校报告、择校工具和资料来源，会按你的选择接着展开。",
              locale,
            )}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={localeHref("/planning", locale)}
              data-analytics-event="planning_start"
              className="inline-flex min-h-12 items-center justify-center bg-[var(--p-green)] px-6 py-3 font-mono text-sm font-bold text-[var(--p-gray-900)] no-underline shadow-[3px_4px_0_var(--p-fg)] transition-transform duration-100 hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--p-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--p-fg)]"
            >
              {L("开始规划", locale)}
            </a>
            <a
              href={localeHref("/reports", locale)}
              data-analytics-event="report_opened_from_home"
              className="inline-flex min-h-12 items-center justify-center border-2 border-[var(--p-fg)] px-6 py-3 font-mono text-sm font-bold text-[var(--p-fg)] no-underline transition-colors duration-100 hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--p-fg)]"
            >
              {L("我有目标学校", locale)}
            </a>
          </div>
          <div className="mt-9 border-t border-[var(--p-gray-300)] pt-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">
              {L("你现在先处理哪一段？", locale)}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {START_OPTIONS.map((option, index) => (
                <a
                  key={option.href}
                  href={localeHref(option.href, locale)}
                  data-analytics-event="stage_selected"
                  data-planning-stage={index === 0 ? "kindergarten" : index === 1 ? "primary-one" : index === 2 ? "primary" : "secondary"}
                  className="group border border-[rgba(42,42,42,0.35)] bg-[rgba(248,246,238,0.78)] px-3 py-3 no-underline transition-colors duration-100 hover:border-[var(--p-fg)] hover:bg-[rgba(248,246,238,0.94)]"
                >
                  <span className="block font-serif text-lg font-bold text-[var(--p-fg)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                    {L(option.label, locale)}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-[var(--p-secondary)]">{L(option.description, locale)}</span>
                </a>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

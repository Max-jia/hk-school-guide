import { L, type Locale } from "@/lib/i18n";

export default function CoverageTrustNote({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8" aria-labelledby="coverage-title">
      <div className="border-t border-[var(--p-gray-300)] py-6 md:flex md:items-start md:justify-between md:gap-12">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
            {L("资料说明", locale)}
          </p>
          <h2 id="coverage-title" className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)]">
            {L("每项资料从哪里来，先说清楚", locale)}
          </h2>
        </div>
        <div className="mt-4 max-w-[720px] text-sm leading-relaxed text-[var(--p-secondary)] md:mt-0">
          <p>
            {L("我们会列出资料来源和核验状态，方便你自己判断。评级、匹配结果和模拟结果只作参考；学校怎么收生，还是以校方最新公布为准。", locale)}
          </p>
          <p className="mt-2">
            {L("现时小学、幼稚园和小一工具的资料较齐；中学和高中出口会逐步补上，暂时先提供 DSE、IB、A-Level 的基本路线。", locale)}
          </p>
        </div>
      </div>
    </section>
  );
}

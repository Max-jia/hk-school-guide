import planningData from "@/content/secondary-school-planning.json";
import { L, type Locale } from "@/lib/i18n";
import { getSecondaryPlanningFields, type SecondaryAuditStatus } from "@/lib/secondary-planning";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

const STATUS_LABELS: Record<SecondaryAuditStatus, string> = { system: "资料标准已建立", school: "需要逐校核实", annual: "需要按年度更新" };
const STATUS_STYLES: Record<SecondaryAuditStatus, string> = {
  system: "bg-[var(--p-bg-green)] text-[var(--p-gray-900)]",
  school: "bg-[var(--p-bg-yellow)] text-[var(--p-gray-900)]",
  annual: "bg-[var(--p-gray-50)] text-[var(--p-secondary)]",
};

export default function PlanningSecondaryAuditPanel({ locale = "tc", stage, route }: { locale?: Locale; stage?: PlanningStage; route?: EducationRoute }) {
  const fields = getSecondaryPlanningFields(route);
  const isSecondary = stage === "secondary";
  const routeLabel = route || L("三条路线", locale);

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pb-14" aria-labelledby="planning-secondary-audit-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">06 / {L("中学资料台账", locale)}</p>
            <h2 id="planning-secondary-audit-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">{L("先把学校资料补齐，再谈路线建议", locale)}</h2>
          </div>
          <span className="font-mono text-xs text-[var(--p-secondary)]">{L(`当前范围：${routeLabel}`, locale)}</span>
        </div>
        <p className="mt-3 max-w-[800px] text-sm leading-relaxed text-[var(--p-secondary)]">{L("这是一份公开的资料模型和核验台账，不是学校排名。学校只有在每个关键字段都有来源、适用学年和核验记录后，才适合进入路线比较。", locale)}</p>
        {!isSecondary ? (
          <div className="mt-6 border border-dashed border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-5 py-6 text-sm leading-relaxed text-[var(--p-secondary)]">{L("进入中学阶段后，这里会逐校记录课程、收生、费用、支援和升学出口；现在先不用把中学资料当成当前阶段的选校结论。", locale)}</div>
        ) : (
          <>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["资料入口", "制度先行", "先核对官方制度，再接学校资料。", "bg-[var(--p-bg-green)]"],
                ["学校数据", "逐校建立", "课程、收费和收生不能由学校标签推断。", "bg-[var(--p-card)]"],
                ["结论边界", "不代替录取预测", "公开结果不等于个人机会。", "bg-[var(--p-card)]"],
              ].map(([eyebrow, title, description, background]) => (
                <div key={eyebrow} className={`border ${eyebrow === "资料入口" ? "border-2 border-[var(--p-fg)]" : "border-[var(--p-gray-300)]"} ${background} p-4`}>
                  <p className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L(eyebrow, locale)}</p>
                  <p className="mt-2 font-serif text-xl font-bold text-[var(--p-fg)]">{L(title, locale)}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(description, locale)}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <article key={field.id} className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2 py-1 font-mono text-[10px] font-bold ${STATUS_STYLES[field.status]}`}>{L(STATUS_LABELS[field.status], locale)}</span>
                    <span className="font-mono text-[10px] text-[var(--p-secondary)]">{field.id}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{L(field.label, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(field.question, locale)}</p>
                  <p className="mt-3 border-t border-[var(--p-gray-300)] pt-3 text-xs leading-relaxed text-[var(--p-secondary)]"><strong className="text-[var(--p-fg)]">{L("应保留：", locale)}</strong>{L(field.sourceRequirement, locale)}</p>
                </article>
              ))}
            </div>
            <p className="mt-4 border-l-4 border-[var(--p-yellow)] bg-[var(--p-gray-50)] px-4 py-3 text-xs leading-relaxed text-[var(--p-secondary)]">{L(`目前已整理${planningData.schools.length}所学校资料样本；这是持续补充中的资料池，不代表已覆盖主要中学或资料已完成。每个字段保留来源网址与适用学年；年度数据、校方尚未公布的项目及待核事项继续逐校列出。`, locale)}</p>
          </>
        )}
      </div>
    </section>
  );
}

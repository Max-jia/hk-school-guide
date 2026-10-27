import { coreGuidesForStage } from "@/lib/core-guides";
import { L, localeHref, type Locale } from "@/lib/i18n";
import type { SchoolStage } from "@/lib/school-directory-pilot";

export default function CoreGuideIndex({ stage, locale }: { stage: SchoolStage; locale: Locale }) {
  const guides = coreGuidesForStage(stage);
  const groups = [...new Set(guides.map((guide) => guide.group))];
  if (!guides.length) return null;
  return <section id="guides" className="mt-12 scroll-mt-6" aria-labelledby="core-guides-title">
    <div className="border-b border-black/10 pb-4 dark:border-white/10">
      <h2 id="core-guides-title" className="font-serif text-2xl font-bold text-[var(--p-fg)]">{L("按问题找攻略", locale)}</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(`共${guides.length}篇核心指南。先找到你家正在作的决定，再看规则、代价与下一步。`, locale)}</p>
    </div>
    <div className="mt-5 grid gap-5 md:grid-cols-3">
      {groups.map((group) => <nav key={group} aria-label={L(group, locale)} className="rounded-xl border border-black/10 bg-[var(--p-bg)] p-5 dark:border-white/10">
        <h3 className="mb-2 text-base font-bold text-[var(--p-fg)]">{L(group, locale)}</h3>
        <ul className="m-0 list-none divide-y divide-black/10 p-0 dark:divide-white/10">
          {guides.filter((guide) => guide.group === group).map((guide) => <li key={guide.slug}>
            <a href={localeHref(`/blog/${guide.slug}`, locale)} className="group flex min-h-11 items-start justify-between gap-3 py-3 text-[var(--p-fg)] no-underline">
              <span><span className="block text-sm font-semibold group-hover:underline">{L(guide.label, locale)}</span><span className="mt-1 block text-xs leading-relaxed text-[var(--p-secondary)]">{L(guide.question, locale)}</span></span>
              <span aria-hidden="true" className="shrink-0 text-[var(--p-secondary)]">→</span>
            </a>
          </li>)}
        </ul>
      </nav>)}
    </div>
  </section>;
}

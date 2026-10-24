import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import type { PilotSchool } from "@/lib/school-directory-pilot";

export type SchoolPreview = Pick<PilotSchool, "stage" | "slug" | "name" | "nameEn" | "district" | "districts" | "schoolType" | "gender" | "address" | "schoolNet" | "tuition" | "reportSlug" | "relatedReportSlugs">;

export default function SchoolPreviewCard({ school, locale = "tc" }: { school: SchoolPreview; locale?: Locale }) {
  const profileHref = `/schools/${school.stage}/${school.slug}`;
  const reportSlugs = school.relatedReportSlugs?.length ? [...new Set(school.relatedReportSlugs)] : school.reportSlug ? [school.reportSlug] : [];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-5 shadow-[0_3px_0_rgba(25,32,39,.08)] dark:border-white/10 dark:bg-[var(--p-bg)]">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="rounded-full bg-[var(--p-fg)] px-2.5 py-1 font-bold text-[var(--p-bg)]">{L(school.schoolType, locale)}</span>
        <span className="text-[var(--p-secondary)]">{L(school.district, locale)}</span>
        {school.gender && <span className="text-[var(--p-secondary)]">· {L(school.gender, locale)}</span>}
      </div>
      <h3 className="mt-4 font-serif text-xl font-bold leading-snug text-[var(--p-fg)]">
        <a href={localeHref(profileHref, locale)} className="text-inherit underline decoration-transparent underline-offset-4 hover:decoration-current">
          {L(school.name, locale)}
        </a>
      </h3>
      <p className="mt-1 text-sm text-[var(--p-secondary)]">{school.nameEn}</p>
      <dl className="mt-5 grid gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
        {school.address && <div className="flex gap-3">
          <dt className="w-16 shrink-0 text-[var(--p-secondary)]">{L("地址", locale)}</dt>
          <dd className="m-0 text-[var(--p-fg)]">{L(school.address, locale)}</dd>
        </div>}
        {school.schoolNet && <div className="flex gap-3"><dt className="w-16 shrink-0 text-[var(--p-secondary)]">{L("校網", locale)}</dt><dd className="m-0 text-[var(--p-fg)]">{L(school.schoolNet, locale)}</dd></div>}
        {school.tuition && <div className="flex gap-3"><dt className="w-16 shrink-0 text-[var(--p-secondary)]">{L("費用", locale)}</dt><dd className="m-0 text-[var(--p-fg)]">{L(school.tuition, locale)}</dd></div>}
      </dl>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
        <a href={localeHref(profileHref, locale)} className="inline-flex min-h-11 items-center rounded-lg bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] no-underline hover:opacity-85">
          {L("查看學校資料", locale)} <span aria-hidden="true" className="ml-2">→</span>
        </a>
        {reportSlugs.length ? (
          reportSlugs.map((slug, index) => <a key={slug} href={localeHref(`/reports/${slug}`, locale)} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)] no-underline hover:bg-black/5 dark:hover:bg-white/10">
            {L(reportSlugs.length > 1 ? `深度報告 ${index + 1}` : "深度報告", locale)}
          </a>)
        ) : (
          <span className="text-xs text-[var(--p-secondary)]">{L("暫無深度報告", locale)}</span>
        )}
      </div>
    </article>
  );
}

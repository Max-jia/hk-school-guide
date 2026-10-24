import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import type { PilotSchool } from "@/lib/school-directory-pilot";

export type SchoolPreview = Pick<PilotSchool, "stage" | "slug" | "name" | "nameEn" | "district" | "districts" | "schoolType" | "schoolCategories" | "gender" | "address" | "schoolNet" | "tuition" | "language" | "reportSlug" | "relatedReportSlugs">;

export default function SchoolPreviewCard({ school, locale = "tc", compact = false }: { school: SchoolPreview; locale?: Locale; compact?: boolean }) {
  const schoolNet = school.stage === "primary" ? school.schoolNet?.replace(/^(\d{2})\s*校[網网]$/, "$1") : school.schoolNet;
  const tuition = school.stage === "primary" ? school.tuition?.replace(/^"|"$/g, "") : school.tuition;
  const profileHref = `/schools/${school.stage}/${school.slug}`;
  const reportSlugs = school.relatedReportSlugs?.length ? [...new Set(school.relatedReportSlugs)] : school.reportSlug ? [school.reportSlug] : [];
  return (
    <article className={`flex h-full min-w-0 flex-col rounded-xl border border-black/10 bg-white ${compact ? "p-4" : "p-5"} dark:border-white/10 dark:bg-[var(--p-bg)]`}>
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {(school.schoolCategories || [school.schoolType]).map((category) => <span key={category} className="rounded bg-[#edf3ef] px-2 py-1 font-semibold text-[#214b3c] dark:bg-white/10 dark:text-white">{L(category, locale)}</span>)}
        <span className="text-[var(--p-secondary)]">{L(school.district, locale)}</span>
        {school.gender && <span className="text-[var(--p-secondary)]">· {L(school.gender, locale)}</span>}
      </div>
      <h3 title={L(school.name, locale)} className={`${compact ? "mt-2 line-clamp-2 text-lg" : "mt-4 text-xl"} font-serif font-bold leading-snug text-[var(--p-fg)]`}>
        <a href={localeHref(profileHref, locale)} className="text-inherit underline decoration-transparent underline-offset-4 hover:decoration-current">
          {L(school.name, locale)}
        </a>
      </h3>
      <p title={school.nameEn} className={`mt-1 text-xs leading-relaxed text-[var(--p-secondary)] ${compact ? "line-clamp-1" : ""}`}>{school.nameEn}</p>
      <dl className={`${compact ? "mt-3 gap-2 pt-3" : "mt-5 gap-3 pt-4"} grid border-t border-black/10 text-sm dark:border-white/10`}>
        {schoolNet && <div className="flex gap-3"><dt className="w-8 shrink-0 text-[var(--p-secondary)]">{L("校網", locale)}</dt><dd className="m-0 text-[var(--p-fg)]">{L(schoolNet, locale)}</dd></div>}
        {school.stage !== "kindergarten" && school.language && <div className="flex gap-3"><dt className="w-8 shrink-0 text-[var(--p-secondary)]">{L("語言", locale)}</dt><dd title={L(school.language, locale)} className={`m-0 min-w-0 leading-relaxed text-[var(--p-fg)] ${compact ? school.stage === "secondary" ? "line-clamp-2" : "line-clamp-1" : ""}`}>{L(school.language, locale)}</dd></div>}
        {school.address && <div className="flex gap-3">
          <dt className="w-8 shrink-0 text-[var(--p-secondary)]">{L("地址", locale)}</dt>
          <dd title={L(school.address, locale)} className={`m-0 min-w-0 leading-relaxed text-[var(--p-fg)] ${compact ? "line-clamp-2" : ""}`}>{L(school.address, locale)}</dd>
        </div>}

        {tuition && <div className="flex gap-3"><dt className="w-8 shrink-0 text-[var(--p-secondary)]">{L("費用", locale)}</dt><dd title={L(tuition, locale)} className={`m-0 min-w-0 leading-relaxed text-[var(--p-fg)] ${compact ? "line-clamp-2" : ""}`}>{L(tuition, locale)}</dd></div>}
      </dl>
      <div className={`mt-auto flex flex-wrap items-center gap-2 ${compact ? "pt-3" : "pt-5"}`}>
        <a href={localeHref(profileHref, locale)} className="inline-flex min-h-11 items-center rounded-lg bg-[var(--p-fg)] px-3 py-2 text-sm font-bold text-[var(--p-bg)] no-underline hover:opacity-85">
          {L("查看學校資料", locale)} <span aria-hidden="true" className="ml-2">→</span>
        </a>
        {reportSlugs.length ? (
          reportSlugs.map((slug, index) => <a key={slug} href={localeHref(`/reports/${slug}`, locale)} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--p-fg)] px-3 py-2 text-sm font-bold text-[var(--p-fg)] no-underline hover:bg-black/5 dark:hover:bg-white/10">
            {L(reportSlugs.length > 1 ? `深度報告 ${index + 1}` : "深度報告", locale)}
          </a>)
        ) : (
          <span className="text-xs text-[var(--p-secondary)]">{L("暫無深度報告", locale)}</span>
        )}
      </div>
    </article>
  );
}

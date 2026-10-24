import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { SCHOOL_STAGES, schoolsForStage, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import SchoolDirectorySearch from "@/components/schools/SchoolDirectorySearch";

export default function SchoolDirectoryPage({ stage, locale = "tc" }: { stage: SchoolStage; locale?: Locale }) {
  const config = SCHOOL_STAGES[stage];
  const schools = schoolsForStage(stage, locale);
  const searchSchools = schools.map(({ stage: schoolStage, slug, name, nameEn, district, districts, schoolType, schoolCategories, gender, address, schoolNet, language, tuition, reportSlug, relatedReportSlugs }) => ({
    stage: schoolStage, slug, name, nameEn, district, districts, schoolType, schoolCategories, gender, address, schoolNet, language: schoolStage !== "kindergarten" ? language : undefined, tuition, reportSlug, relatedReportSlugs,
  }));
  return (
    <Localize locale={locale}>
      <main className="w-full">
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[1180px] px-4 pb-24">
          <nav aria-label={L("麵包屑", locale)} className="pt-6 text-sm text-[var(--p-secondary)]">
            <a className="no-underline hover:underline" href={localeHref("/", locale)}>{L("首頁", locale)}</a>
            <span className="px-2">/</span><a className="no-underline hover:underline" href={localeHref(`/schools/${stage}`, locale)}>{L(config.label, locale)}</a>
            <span className="px-2">/</span>{L("學校名錄", locale)}
          </nav>
          <header className="py-6 sm:py-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">{L(config.label, locale)} · {L("學校名錄", locale)}</p>
            <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] sm:text-4xl">{L("香港", locale)}{L(config.label, locale)}{L("學校名錄", locale)}</h1>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--p-secondary)]">{L("按校名、地區及類型篩選。先查簡明資料中的課程、收費與來源，再閱讀深度報告。", locale)}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-[var(--p-secondary)]">
              <span className="rounded-full border border-black/15 px-3 py-1.5 dark:border-white/15">{L("教育局学校编号", locale)}：{schools.length} {L("所学校", locale)}</span>
              <span className="rounded-full border border-black/15 px-3 py-1.5 dark:border-white/15">{L("含已有深度報告的學校", locale)}</span>
            </div>
          </header>
          <SchoolDirectorySearch schools={searchSchools} locale={locale} />
          <aside className="mt-8 rounded-xl border-l-4 border-[#6d9877] bg-[#eff5f0] p-4 text-sm leading-relaxed text-[var(--p-fg)] dark:bg-white/5">
            <strong>{L("資料口徑", locale)}</strong>：{L("名錄按教育局六位學校編號歸併，涵蓋名錄中的幼稚園、本地及國際小學和中學；同一學校的不同校址按四位校址編號逐項列出。學校位置資料截至 2026-09-30（教育局於 2026-10-05 更新）；非政府學校登記狀態按每日資料於 2026-10-23 核對，政府學校不在該註冊資料檔內，會標明適用情況。收費、課程及招生安排按各自來源年度展示，缺少來源的欄位不作推算。", locale)}
          </aside>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

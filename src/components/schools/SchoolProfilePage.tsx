import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { L, languageAlternates, localeHref } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getPilotSchool, SCHOOL_STAGES, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";

function labelFor(key: string, locale: Locale) {
  const labels: Record<string, string> = {
    nameEn: "英文校名", curriculumType: "課程類別", schoolType: "辦學類別", gradeSpan: "開設級別", district: "地區", address: "地址", telephone: "電話", registrationStatus: "教育局登記狀態",
    schoolNumber: "教育局學校編號", principal: "校長", establishedYear: "創校年份", sponsoringBody: "辦學團體",
    gender: "學生性別", religion: "宗教", schoolNet: "小一校網", tuition: "學費/費用", language: "教學語言",
  };
  return L(labels[key] || key, locale);
}

export function schoolProfileMetadata(stage: string, slug: string, locale: Locale): Metadata {
  const school = getPilotSchool(stage, slug);
  if (!school) return { title: L("找不到學校資料", locale), robots: { index: false, follow: false } };
  const title = L(`${school.name}｜${SCHOOL_STAGES[school.stage].label}資料`, locale);
  const hasSchoolFeatures = school.detailSections?.some((section) => /理念|課程特色|教學特色/.test(section.title));
  const description = L(hasSchoolFeatures
    ? `${school.name}的基本資料、校方公開的辦學理念與課程特色，以及可追溯的官方資料來源。`
    : `${school.name}的基本資料：地區、校址、辦學類別、學段和可追溯的官方資料來源。`, locale);
  const path = `/schools/${stage}/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: localeHref(path, locale), languages: languageAlternates(path) },
    openGraph: { type: "article", title, description, url: `${SITE_URL}${localeHref(path, locale)}` },
  };
}

export default function SchoolProfilePage({ stage, slug, locale = "tc" }: { stage: SchoolStage; slug: string; locale?: Locale }) {
  const school = getPilotSchool(stage, slug);
  if (!school) return null;
  const path = `/schools/${stage}/${slug}`;
  const reportSlugs = school.relatedReportSlugs?.length ? [...new Set(school.relatedReportSlugs)] : school.reportSlug ? [school.reportSlug] : [];
  const factGroups = [
    { title: "課程與費用", entries: [["schoolType", school.schoolType], ["curriculumType", school.curriculumType], ["gradeSpan", school.gradeSpan], ["language", school.language], ["tuition", school.tuition], ["schoolNet", school.schoolNet]] },
    { title: "校址與聯絡", entries: [["district", school.district], ["address", school.address], ["telephone", school.telephone]] },
    { title: "學校背景", entries: [["principal", school.principal], ["establishedYear", school.establishedYear], ["sponsoringBody", school.sponsoringBody], ["gender", school.gender], ["religion", school.religion], ["schoolNumber", school.schoolNumber], ["registrationStatus", school.registrationStatus]] },
  ].map((group) => ({ ...group, entries: group.entries.filter((entry): entry is [string, string] => Boolean(entry[1])) })).filter((group) => group.entries.length);
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "School",
    name: L(school.name, locale),
    alternateName: school.nameEn,
    url: `${SITE_URL}${localeHref(path, locale)}`,
    sameAs: school.website ? [school.website] : undefined,
    telephone: school.telephone,
    address: school.address && (school.registryLocations || 1) === 1 ? {
      "@type": "PostalAddress",
      streetAddress: L(school.address, locale),
      addressLocality: L(school.district, locale),
      addressCountry: "HK",
    } : undefined,
  };

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }} />
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[1060px] px-4 pb-24">
          <nav aria-label={L("麵包屑", locale)} className="pt-6 text-sm text-[var(--p-secondary)]">
            <a href={localeHref("/", locale)} className="no-underline hover:underline">{L("首頁", locale)}</a><span className="px-2">/</span>
            <a href={localeHref(`/schools/${stage}`, locale)} className="no-underline hover:underline">{L(SCHOOL_STAGES[stage].label, locale)}</a><span className="px-2">/</span>
            <a href={localeHref(`/schools/${stage}/directory`, locale)} className="no-underline hover:underline">{L("學校名錄", locale)}</a>
          </nav>

          <header className="mt-5 rounded-3xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[var(--p-bg)] sm:p-7">
            <div className="flex flex-wrap gap-2 text-xs font-bold text-[var(--p-secondary)]">
              <span className="rounded-full bg-[#e8f1eb] px-3 py-1.5 text-[#214b3c] dark:bg-white/10 dark:text-white">{L(SCHOOL_STAGES[stage].label, locale)}</span>
              <span className="rounded-full border border-black/15 px-3 py-1.5 dark:border-white/15">{L(school.district, locale)}</span>
              {(school.schoolCategories || [school.schoolType]).map((category) => <span key={category} className="rounded-full border border-black/15 px-3 py-1.5 dark:border-white/15">{L(category, locale)}</span>)}
            </div>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight tracking-tight text-[var(--p-fg)] sm:text-4xl">{L(school.name, locale)}</h1>
            {school.nameEn && <p className="mt-2 text-sm text-[var(--p-secondary)]">{school.nameEn}</p>}
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--p-fg)]">{L("課程、費用與學校特色按公開來源整理，數字保留適用年度。", locale)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {school.website && <a href={school.website} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] no-underline">{L("學校官方網站", locale)} <span aria-hidden="true" className="ml-2">↗</span></a>}
              {reportSlugs.map((reportSlug, index) => <a key={reportSlug} href={localeHref(`/reports/${reportSlug}`, locale)} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)] no-underline hover:bg-black/5 dark:hover:bg-white/10">{L(reportSlugs.length > 1 ? `閱讀深度報告 ${index + 1}` : "閱讀深度報告", locale)} →</a>)}
            </div>
          </header>

          <nav aria-label={L("本頁內容", locale)} className="mt-4 flex flex-wrap gap-x-5 border-b border-black/10 text-sm font-semibold dark:border-white/10">
            <a className="inline-flex min-h-11 items-center no-underline hover:underline" href="#profile-facts-title">{L("基本資料", locale)}</a>
            {school.detailSections?.length ? <a className="inline-flex min-h-11 items-center no-underline hover:underline" href="#profile-details-title">{L("課程與學校特色", locale)}</a> : null}
            <a className="inline-flex min-h-11 items-center no-underline hover:underline" href="#profile-sources-title">{L("來源與資料說明", locale)}</a>
          </nav>

          <section className="mt-7" aria-labelledby="profile-facts-title">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-black/10 pb-3 dark:border-white/10">
              <div><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">01 / {L("學校檔案", locale)}</p><h2 id="profile-facts-title" className="mt-1 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("基本資料", locale)}</h2></div>
              <span className="text-xs text-[var(--p-secondary)]">{L(school.dataYear, locale)}</span>
            </div>
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {factGroups.map((group, index) => <article key={group.title} className={`min-w-0 rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[var(--p-bg)] sm:p-5 ${index === 0 ? "lg:col-span-2" : ""}`}>
                <h3 className="mb-2 text-base font-bold text-[var(--p-fg)]">{L(group.title, locale)}</h3>
                <dl className={`grid gap-x-8 ${index === 0 ? "md:grid-cols-2" : ""}`}>
                  {group.entries.map(([key, value]) => <div key={key} className={`grid min-w-0 grid-cols-[88px_minmax(0,1fr)] gap-3 border-t border-black/8 py-2.5 dark:border-white/10 ${key === "tuition" ? "md:col-span-2" : ""}`}>
                    <dt className="text-sm text-[var(--p-secondary)]">{labelFor(key, locale)}</dt>
                    <dd className="m-0 break-words text-sm leading-relaxed text-[var(--p-fg)]">{L(value, locale)}
                      {(key === "schoolType" || key === "curriculumType") && !!school.classificationSources?.length && <a href="#profile-sources-title" className="ml-2 whitespace-nowrap text-xs text-[var(--p-secondary)] underline underline-offset-2">{L("來源", locale)}</a>}
                    </dd>
                  </div>)}
                </dl>
              </article>)}
            </div>
          </section>

          {school.detailSections && <section className="mt-10" aria-labelledby="profile-details-title">
            <div className="border-b border-black/10 pb-3 dark:border-white/10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">02 / {L("深入了解", locale)}</p>
              <h2 id="profile-details-title" className="mt-1 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("課程與學校特色", locale)}</h2>
              <p className="mb-0 mt-2 text-sm text-[var(--p-secondary)]">{L("先看課程與教學安排，再核對師資、班制及收費。校方理念屬學校自述。", locale)}</p>
            </div>
            <div className="mt-4 grid gap-4">
              {[...school.detailSections].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).map((section) => (
                <article key={section.title} className="min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-[var(--p-bg)]">
                  <h3 className="border-b border-black/10 bg-[#f1f5f2] px-4 py-3 text-base font-bold leading-relaxed text-[var(--p-fg)] dark:border-white/10 dark:bg-white/5 sm:px-5">{L(section.title, locale)}</h3>
                  {section.note && <p className="mx-4 mb-0 mt-3 rounded-lg bg-[#fff6df] px-3 py-2 text-xs leading-relaxed text-[#604b1e] dark:bg-white/10 dark:text-[var(--p-secondary)]">{L(section.note, locale)}</p>}
                  <dl className="divide-y divide-black/10 px-4 dark:divide-white/10 sm:px-5">
                    {section.details.map((detail) => (
                      <div key={detail.label} className="grid min-w-0 gap-1 py-3.5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-5">
                        <dt className="text-sm font-bold text-[var(--p-fg)]">{L(detail.label, locale)}</dt>
                        <dd className="m-0 min-w-0 break-words text-sm leading-7 text-[var(--p-fg)]">
                          {L(detail.value, locale)}
                          <span className="mt-1 block text-xs leading-relaxed text-[var(--p-secondary)]">
                            {detail.period && <span>{L(detail.period, locale)} · </span>}
                            <a href={detail.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-2">{L("來源", locale)} ↗</a>
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </section>}

          <section className="mt-8 rounded-2xl border border-[#eadcb6] bg-[#fff9e9] p-5 text-sm leading-relaxed text-[#493d21] dark:border-white/10 dark:bg-white/5 dark:text-[var(--p-fg)]" aria-labelledby="profile-scope-title">
            <h2 id="profile-scope-title" className="font-serif text-lg font-bold">{L("資料範圍與注意事項", locale)}</h2>
            <p className="mt-2">{L(school.sourceNote, locale)}</p>
          </section>

          <section className="mt-9" aria-labelledby="profile-sources-title">
            <div className="border-b border-black/10 pb-3 dark:border-white/10"><p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">{school.detailSections ? "03" : "02"} / {L("資料可追溯", locale)}</p><h2 id="profile-sources-title" className="mt-1 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("資料來源", locale)}</h2></div>
            <details className="mt-4 rounded-xl border border-black/10 p-4 dark:border-white/10"><summary className="cursor-pointer text-sm font-bold text-[var(--p-fg)]">{L("查看全部資料來源", locale)}（{school.sources.length}）</summary><ol className="mt-3 grid list-none gap-3 p-0 md:grid-cols-2">
              {school.sources.map((source) => (
                <li key={source.url} className="rounded-xl border border-black/10 p-4 dark:border-white/10">
                  <a href={source.url} target="_blank" rel="noreferrer" className="font-bold text-[var(--p-fg)] underline underline-offset-4">{L(source.label, locale)} ↗</a>
                  <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(source.scope, locale)}</p>
                </li>
              ))}
            </ol></details>
            <p className="mt-4 text-xs text-[var(--p-secondary)]">{L("資料整理日期", locale)}：{school.reviewedAt || "2026-10-23"}。{L("招生、學費及課程內容可能更新，請點開來源核對當屆版本。", locale)}</p>
          </section>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5 dark:border-white/10">
            <a href={localeHref(`/schools/${stage}/directory`, locale)} className="min-h-11 inline-flex items-center text-sm font-bold text-[var(--p-fg)] no-underline hover:underline">← {L("返回學校名錄", locale)}</a>
            {!reportSlugs.length && <span className="text-sm text-[var(--p-secondary)]">{L("目前尚無本站深度報告；可先用官方資料與校方聯絡頁核對。", locale)}</span>}
          </div>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

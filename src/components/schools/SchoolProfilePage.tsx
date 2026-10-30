import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getPilotSchool, SCHOOL_STAGES, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import { createPageMetadata } from "@/lib/page-metadata";
import { registeredPhone, schoolProfileSummary } from "@/lib/school-profile-summary";
import { breadcrumbJsonLd, jsonLdGraph, serializeJsonLd, webPageJsonLd } from "@/lib/structured-data";

function labelFor(key: string, locale: Locale, stage: SchoolStage) {
  const labels: Record<string, string> = {
    nameEn: "英文校名", curriculumType: "課程類別", schoolType: "辦學類別", gradeSpan: "開設級別", district: "地區", address: "地址", telephone: "電話", registrationStatus: "教育局登記狀態",
    schoolNumber: "教育局學校編號", principal: "校長", establishedYear: "創校年份", sponsoringBody: "辦學團體",
    gender: "學生性別", religion: "宗教", schoolNet: "小一校網", tuition: "學費/費用", language: "教學語言",
  };
  if (stage !== "kindergarten") { labels.schoolNumber = "學校編號"; labels.registrationStatus = "登記狀態"; }
  if (stage === "secondary") labels.language = "語言安排與政策";
  return L(labels[key] || key, locale);
}

export function schoolProfileMetadata(stage: string, slug: string, locale: Locale): Metadata {
  const school = getPilotSchool(stage, slug);
  if (!school) return { title: L("找不到學校資料", locale), robots: { index: false, follow: false } };
  const net = school.stage === "primary" && (school.registryLocations || 1) === 1
    ? school.schoolNet?.match(/^(\d{1,2})(?:\s*校[網网])?$/)?.[1]
    : undefined;
  // Use only complete, known directory categories; never infer a funding type.
  const type = /^(?:官立小學|資助小學|資助全日制小學|直接資助計劃小學|私立小學|英基學校協會（小學）|國際學校（小學）|官立中學|資助中學|按位津貼中學|直接資助計劃中學|直資中學|直資全日制中學|私立中學|私立中學（日校 \/ 夜校）|英基學校協會（中學）|國際學校（中學）|資助特殊學校)$/.test(school.schoolType || "") ? school.schoolType : undefined;
  const focus = net ? `${net}校網・小學資料` : type ? `${type}資料` : `${SCHOOL_STAGES[school.stage].label}資料`;
  const title = school.stage === "kindergarten"
    ? `${school.name}｜${school.district}・${SCHOOL_STAGES[school.stage].label}資料`
    : `${school.name}｜${school.district}・${focus}`;
  const description = schoolProfileSummary(school);
  const path = `/schools/${stage}/${slug}`;
  return createPageMetadata({ title, description, path, locale });
}

export default function SchoolProfilePage({ stage, slug, locale = "tc" }: { stage: SchoolStage; slug: string; locale?: Locale }) {
  const school = getPilotSchool(stage, slug);
  if (!school) return null;
  const path = `/schools/${stage}/${slug}`;
  const summary = schoolProfileSummary(school);
  const registryPhone = stage === "kindergarten" ? undefined : registeredPhone(school);
  const phone = school.telephone || (registryPhone ? `${registryPhone.value}（登記資料截至 ${registryPhone.date}）` : undefined);
  const reportSlugs = school.relatedReportSlugs?.length ? [...new Set(school.relatedReportSlugs)] : school.reportSlug ? [school.reportSlug] : [];
  const detailLabel = stage !== "kindergarten" ? "教學與學校特色" : "課程與學校特色";
  const sectionPriority = (section: NonNullable<typeof school.detailSections>[number]) => {
    if (section.featured || (stage !== "kindergarten" && /理念|課程特色|教學特色|辦學方向|學習特色/.test(section.title))) return 0;
    if (stage !== "kindergarten" && /登記校址|聯絡與授課/.test(section.title)) return 2;
    return 1;
  };
  const orderedSections = [...(school.detailSections || [])].map((section) => ({
    ...section,
    details: section.details.filter((detail) => !(stage === "secondary" && school.languageSourceUrl && detail.label === "語言政策" && detail.value === school.language)),
  })).filter((section) => section.details.length).sort((a, b) => sectionPriority(a) - sectionPriority(b));
  const factGroups = [
    { title: stage === "secondary" ? "課程、語言與費用" : stage === "primary" ? "入學與學習安排" : "課程與費用", entries: [["schoolType", school.schoolType], ["schoolNet", school.schoolNet], ["curriculumType", school.curriculumType], ["gradeSpan", school.gradeSpan], ["language", school.language], ["tuition", stage === "primary" ? school.tuition?.replace(/^"|"$/g, "") : school.tuition]] },
    { title: "校址與聯絡", entries: [["district", school.district], ["address", school.address], ["telephone", phone]] },
    { title: "學校背景", entries: [["principal", school.principal], ["establishedYear", school.establishedYear], ["sponsoringBody", school.sponsoringBody], ["gender", school.gender], ["religion", school.religion], ["schoolNumber", school.schoolNumber], ["registrationStatus", school.registrationStatus]] },
  ].map((group) => ({ ...group, entries: group.entries.filter((entry): entry is [string, string] => Boolean(entry[1])) })).filter((group) => group.entries.length);
  const schoolEntityId = `${SITE_URL}${path}#school`;
  // Registry keys carry the six-digit EDB ID; visible notes may also contain a
  // separate campus code or an older registration number. Do not conflate them.
  const edbNumber = school.registryKey?.match(/\/(\d{6})$/)?.[1]
    || school.schoolNumber?.match(/^(\d{6})(?:\b|$)/)?.[1];
  const schoolEntity = {
    "@type": "School",
    "@id": schoolEntityId,
    name: L(school.name, locale),
    alternateName: school.nameEn,
    url: school.website || `${SITE_URL}${path}`,
    identifier: edbNumber ? { "@type": "PropertyValue", propertyID: "香港教育局學校編號", value: edbNumber } : undefined,
    telephone: school.telephone,
    address: school.address && (school.registryLocations || 1) === 1 ? {
      "@type": "PostalAddress",
      streetAddress: L(school.address, locale),
      addressLocality: L(school.district, locale),
      addressCountry: "HK",
    } : undefined,
  };
  const profileSchema = jsonLdGraph(locale, [
    schoolEntity,
    { ...webPageJsonLd({ path, title: school.name, description: summary, locale, mainEntity: { "@id": schoolEntityId } }), citation: [...new Set(school.sources.map((source) => source.url))] },
    breadcrumbJsonLd(path, [{ name: "首頁", path: "/" }, { name: SCHOOL_STAGES[stage].label, path: `/schools/${stage}` }, { name: "學校名錄", path: `/schools/${stage}/directory` }, { name: school.name, path }], locale),
  ]);

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileSchema) }} />
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
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--p-fg)]">{L(summary, locale)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {school.website && <a href={school.website} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-lg bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] no-underline">{L("學校官方網站", locale)} <span aria-hidden="true" className="ml-2">↗</span></a>}
              {reportSlugs.map((reportSlug, index) => <a key={reportSlug} href={localeHref(`/reports/${reportSlug}`, locale)} className="inline-flex min-h-11 items-center rounded-lg border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)] no-underline hover:bg-black/5 dark:hover:bg-white/10">{L(reportSlugs.length > 1 ? `閱讀深度報告 ${index + 1}` : "閱讀深度報告", locale)} →</a>)}
            </div>
          </header>

          <nav aria-label={L("本頁內容", locale)} className="mt-4 flex flex-wrap gap-x-5 border-b border-black/10 text-sm font-semibold dark:border-white/10">
            <a className="inline-flex min-h-11 items-center no-underline hover:underline" href="#profile-facts-title">{L("基本資料", locale)}</a>
            {school.detailSections?.length ? <a className="inline-flex min-h-11 items-center no-underline hover:underline" href="#profile-details-title">{L(detailLabel, locale)}</a> : null}
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
                  {group.entries.map(([key, value]) => <div key={key} className={`grid min-w-0 grid-cols-[88px_minmax(0,1fr)] gap-3 border-t border-black/8 py-2.5 dark:border-white/10 ${key === "tuition" || (stage === "secondary" && key === "language") ? "md:col-span-2" : ""}`}>
                    <dt className="text-sm text-[var(--p-secondary)]">{key === "curriculumType" && /特殊學校/.test(value) ? L("服務類別", locale) : labelFor(key, locale, stage)}</dt>
                    <dd className="m-0 whitespace-pre-line break-words text-sm leading-relaxed text-[var(--p-fg)]">{L(value, locale)}
                      {key === "language" && school.languageSourceUrl && <a href={school.languageSourceUrl} target="_blank" rel="noreferrer" className="ml-2 whitespace-nowrap text-xs text-[var(--p-secondary)] underline underline-offset-2">{L("來源", locale)} ↗</a>}
                      {key === "telephone" && !school.telephone && registryPhone && <a href={registryPhone.sourceUrl} target="_blank" rel="noreferrer" className="ml-2 whitespace-nowrap text-xs text-[var(--p-secondary)] underline underline-offset-2">{L("來源", locale)} ↗</a>}
                      {(key === "schoolType" || key === "curriculumType") && !!school.classificationSources?.length && <a href="#profile-sources-title" className="ml-2 whitespace-nowrap text-xs text-[var(--p-secondary)] underline underline-offset-2">{L("來源", locale)}</a>}
                    </dd>
                  </div>)}
                </dl>
              </article>)}
            </div>
          </section>

          {orderedSections.length > 0 && <section className="mt-10" aria-labelledby="profile-details-title">
            <div className="border-b border-black/10 pb-3 dark:border-white/10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">02 / {L("深入了解", locale)}</p>
              <h2 id="profile-details-title" className="mt-1 font-serif text-2xl font-bold text-[var(--p-fg)]">{L(detailLabel, locale)}</h2>
              <p className="mb-0 mt-2 text-sm text-[var(--p-secondary)]">{L("先看課程與教學安排，再核對師資、班制及收費。校方理念屬學校自述。", locale)}</p>
            </div>
            <div className="mt-4 grid gap-4">
              {orderedSections.map((section) => (
                <article key={section.title} className="min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-[var(--p-bg)]">
                  <h3 className="border-b border-black/10 bg-[#f1f5f2] px-4 py-3 text-base font-bold leading-relaxed text-[var(--p-fg)] dark:border-white/10 dark:bg-white/5 sm:px-5">{L(section.title, locale)}</h3>
                  {section.note && <p className="mx-4 mb-0 mt-3 rounded-lg bg-[#fff6df] px-3 py-2 text-xs leading-relaxed text-[#604b1e] dark:bg-white/10 dark:text-[var(--p-secondary)]">{L(section.note, locale)}</p>}
                  <dl className="divide-y divide-black/10 px-4 dark:divide-white/10 sm:px-5">
                    {section.details.map((detail) => (
                      <div key={detail.label} className="grid min-w-0 gap-1 py-3.5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-5">
                        <dt className="text-sm font-bold text-[var(--p-fg)]">{L(detail.label, locale)}</dt>
                        <dd className="m-0 min-w-0 whitespace-pre-line break-words text-sm leading-7 text-[var(--p-fg)]">
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

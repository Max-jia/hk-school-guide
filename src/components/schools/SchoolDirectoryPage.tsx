import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { SCHOOL_STAGES, schoolsForStage, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import KindergartenDirectory from "@/components/schools/KindergartenDirectory";
import SchoolStageDirectory, { type SchoolStageDirectoryRow } from "@/components/schools/SchoolStageDirectory";
import SchoolDirectoryGuides from "@/components/schools/SchoolDirectoryGuides";
import guideStyles from "@/components/schools/SchoolDirectoryGuides.module.css";
import { kindergartenDirectoryRows } from "@/lib/kindergarten-directory-data";
import { createPageMetadata } from "@/lib/page-metadata";
import { DIRECTORY_PAGE_SIZE, directoryPagePath } from "@/lib/school-directory-pagination";
import { SITE_URL } from "@/lib/seo";
import { breadcrumbJsonLd, jsonLdGraph, serializeJsonLd, webPageJsonLd } from "@/lib/structured-data";

export function schoolDirectoryMetadata(stage: SchoolStage, locale: Locale, page = 1): Metadata {
  const label = SCHOOL_STAGES[stage].label;
  return createPageMetadata({
    title: `香港${label}學校名錄｜地區、辦學類別與課程資料${page > 1 ? `｜第 ${page} 頁` : ""}`,
    description: `搜尋香港${label}的地區、辦學類別、課程與官方來源${page > 1 ? `，本頁為名錄第 ${page} 頁` : ""}。簡明資料頁供核對學校事實；已有深度報告的學校另提供課程、入學與家庭適配分析。`,
    path: directoryPagePath(stage, page), locale,
  });
}

export default function SchoolDirectoryPage({ stage, locale = "tc", page = 1 }: { stage: SchoolStage; locale?: Locale; page?: number }) {
  const config = SCHOOL_STAGES[stage];
  const directoryDescription = {
    kindergarten: "先看照顧安排，再比較語言環境與學費。",
    primary: "先看校網與入學途徑，再比較課程、學費與升中銜接。",
    secondary: "先看收生途徑與教學語言，再比較課程路線與升學出口。",
  }[stage];
  const schools = schoolsForStage(stage, stage === "kindergarten" ? "tc" : locale);
  // The directory keeps compact row facts; source-rich school profiles remain the canonical detail view.
  const directorySchools: SchoolStageDirectoryRow[] = schools.map((school) => ({
    stage: school.stage as Exclude<SchoolStage, "kindergarten">,
    slug: school.slug,
    name: school.name,
    nameEn: school.nameEn,
    district: school.district,
    districts: school.districts || [],
    address: school.address,
    schoolNumber: school.schoolNumber || "",
    schoolType: school.schoolType,
    categories: school.schoolCategories || [school.schoolType],
    gender: school.gender || "",
    religion: school.religion || "",
    schoolNet: school.schoolNet || "",
    language: school.language || "",
    tuition: school.tuition || "",
    gradeSpan: school.gradeSpan,
    sponsoringBody: school.sponsoringBody || "",
    dataYear: school.dataYear,
    reviewedAt: school.reviewedAt || "",
    sourceNote: school.sourceNote,
    website: school.website,
    reportSlugs: [...new Set([school.reportSlug, ...(school.relatedReportSlugs || [])].filter((slug): slug is string => Boolean(slug)))],
    sources: (school.sources || []).slice(0, 5).map(({ label, scope, url }) => ({ label, scope, url })),
  })).sort((a, b) => a.name.localeCompare(b.name, locale === "sc" ? "zh-Hans" : "zh-Hant"));
  const path = directoryPagePath(stage, page);
  const itemListId = `${SITE_URL}${localeHref(path, locale)}#schools`;
  const schema = jsonLdGraph(locale, [
    webPageJsonLd({ path, title: `香港${config.label}學校名錄${page > 1 ? `｜第 ${page} 頁` : ""}`, locale, type: "CollectionPage", mainEntity: { "@id": itemListId } }),
    breadcrumbJsonLd(path, [{ name: "首頁", path: "/" }, { name: config.label, path: `/schools/${stage}` }, { name: "學校名錄", path: directoryPagePath(stage) }, ...(page > 1 ? [{ name: `第 ${page} 頁`, path }] : [])], locale),
    ...(stage === "kindergarten" ? [] : [{ "@type": "ItemList", "@id": itemListId, numberOfItems: directorySchools.slice((page - 1) * DIRECTORY_PAGE_SIZE, page * DIRECTORY_PAGE_SIZE).length,
      itemListElement: directorySchools.slice((page - 1) * DIRECTORY_PAGE_SIZE, page * DIRECTORY_PAGE_SIZE).map((school, index) => ({ "@type": "ListItem", position: (page - 1) * DIRECTORY_PAGE_SIZE + index + 1, name: L(school.name, locale), url: `${SITE_URL}${localeHref(`/schools/${stage}/${school.slug}`, locale)}` })),
    }]),
  ]);
  return (
    <Localize locale={locale}>
      <main className={guideStyles.page}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
        <SiteHeader locale={locale} compact />
        <div className={`mx-auto max-w-[1180px] px-4 pb-24 ${guideStyles.container}`}>
          <nav aria-label={L("麵包屑", locale)} className="hidden pt-2 text-sm text-[var(--p-secondary)] sm:block">
            <a className="no-underline hover:underline" href={localeHref("/", locale)}>{L("首頁", locale)}</a>
            <span className="px-2">/</span><a className="no-underline hover:underline" href={localeHref(`/schools/${stage}`, locale)}>{L(config.label, locale)}</a>
            <span className="px-2">/</span>{L("學校名錄", locale)}
          </nav>
          <header className={guideStyles.hero}>
            <div>
              <p className={guideStyles.kicker}>{L("從家庭需要出發，找到合適的學校", locale)}</p>
              <h1>{L(`香港${config.label}名錄`, locale)}</h1>
              <p className={guideStyles.heroDescription}>{L(directoryDescription, locale)}{page > 1 && ` · ${L(`第 ${page} 頁`, locale)}`}</p>
            </div>
            <div className={guideStyles.coverage}><strong>{schools.length}</strong><span>{L(`所${config.label}`, locale)}<small>{L("學校資料與來源，一起查閱", locale)}</small></span></div>
          </header>
          <div className={guideStyles.layout}>
            <SchoolDirectoryGuides locale={locale} stage={stage} compact />
            <div className={guideStyles.main}>
              <h2 className="sr-only">{L("搜尋及瀏覽學校", locale)}</h2>
              {stage === "kindergarten" ? <KindergartenDirectory schools={kindergartenDirectoryRows(schools)} locale={locale} initialPage={page} /> : <SchoolStageDirectory schools={directorySchools} stage={stage} locale={locale} initialPage={page} />}
            </div>
            <SchoolDirectoryGuides locale={locale} stage={stage} />
          </div>
          <aside className="mt-8 rounded-xl border-l-4 border-[#6d9877] bg-[#eff5f0] p-4 text-sm leading-relaxed text-[var(--p-fg)] dark:bg-white/5">
            <strong>{L("資料口徑", locale)}</strong>：{L("名錄按教育局六位學校編號歸併，涵蓋名錄中的幼稚園、本地及國際小學和中學；同一學校的不同校址按四位校址編號逐項列出。學校位置資料截至 2026-09-30（教育局於 2026-10-05 更新）；非政府學校登記狀態按每日資料於 2026-10-23 核對，政府學校不在該註冊資料檔內，會標明適用情況。收費、課程及招生安排按各自來源年度展示，缺少來源的欄位不作推算。", locale)}
          </aside>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

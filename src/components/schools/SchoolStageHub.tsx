import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { SCHOOL_STAGES, schoolsForStage, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import CoreGuideIndex from "./CoreGuideIndex";
import { coreGuidesForStage } from "@/lib/core-guides";
import SchoolPreviewCard from "@/components/schools/SchoolPreviewCard";
import { collectionSchema } from "@/lib/collection-schema";
import { serializeJsonLd } from "@/lib/structured-data";

export default function SchoolStageHub({ stage, locale = "tc" }: { stage: SchoolStage; locale?: Locale }) {
  const content = SCHOOL_STAGES[stage];
  const schools = schoolsForStage(stage, locale);
  const previewSchools = schools.filter((school) => school.relatedReportSlugs?.length).slice(0, 6);
  const path = `/schools/${stage}`;
  const featuredIds = { kindergarten: ["K01", "K02", "K05"], primary: ["P01", "P02", "P04"], secondary: ["S01", "S02", "S09"] }[stage];
  const readyGuides = coreGuidesForStage(stage).filter((guide) => featuredIds.includes(guide.id));
  const featuredGuides = readyGuides.length === 3 ? readyGuides.map((guide) => ({ href: `/blog/${guide.slug}`, label: guide.label, description: guide.question })) : content.guides;
  const schema = collectionSchema({ path, title: `${content.label}選校指南`, description: content.description, locale,
    breadcrumbs: [{ name: "首頁", path: "/" }, { name: "學校資料", path: "/schools" }, { name: content.label, path }],
    items: previewSchools.map((school) => ({ name: school.name, path: `/schools/${stage}/${school.slug}` })),
  });

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[1180px] px-4 pb-24">
          <nav aria-label={L("麵包屑", locale)} className="pt-6 text-sm text-[var(--p-secondary)]">
            <a className="no-underline hover:underline" href={localeHref("/", locale)}>{L("首頁", locale)}</a>
            <span className="px-2">/</span>
            <a className="no-underline hover:underline" href={localeHref("/schools", locale)}>{L("學校資料", locale)}</a>
            <span className="px-2">/</span>{L(content.label, locale)}
          </nav>

          <header className="relative mt-5 overflow-hidden rounded-3xl bg-[#173e45] px-6 py-9 text-white sm:px-10 sm:py-12">
            <div aria-hidden="true" className="absolute -right-12 -top-16 h-64 w-64 rounded-full border-[28px] border-white/10" />
            <div aria-hidden="true" className="absolute -bottom-28 right-28 h-64 w-64 rounded-full border border-white/10" />
            <div className="relative max-w-3xl">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#a8d4c1]">Hong Kong School Guide · {L("學段指南", locale)}</p>
              <h1 className="mt-3 font-serif text-4xl font-bold leading-tight sm:text-5xl">{L(content.label, locale)}{L("選校指南", locale)}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{L(content.intro, locale)}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{L(content.description, locale)}</p>
              <a href={localeHref(content.directoryHref, locale)} className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-white px-5 py-3 font-bold text-[#173e45] no-underline transition hover:bg-[#e5f2ec]">
                {L("瀏覽學校名錄", locale)} <span aria-hidden="true" className="ml-2">→</span>
              </a>
            </div>
          </header>

          <section className="mt-12" aria-labelledby="guide-list-title">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">01 / {L("先看方法", locale)}</p>
                <h2 id="guide-list-title" className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)] sm:text-3xl">{L("這個階段，家長通常先要弄清楚的事", locale)}</h2>
              </div>
              <a href="#guides" className="min-h-11 rounded-lg border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)] no-underline hover:bg-black/5 dark:hover:bg-white/10">{L("全部攻略", locale)} →</a>
            </div>
            <ul className="mt-5 grid list-none gap-4 p-0 md:grid-cols-3">
              {featuredGuides.map((guide, index) => (
                <li key={guide.href}>
                  <a href={localeHref(guide.href, locale)} className="group flex h-full min-h-40 flex-col rounded-2xl border border-black/10 bg-white p-5 no-underline transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[var(--p-bg)]">
                    <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">0{index + 1} · {L("擇校攻略", locale)}</span>
                    <span className="mt-3 font-serif text-xl font-bold text-[var(--p-fg)] group-hover:underline">{L(guide.label, locale)}</span>
                    <span className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(guide.description, locale)}</span>
                    <span className="mt-auto pt-4 text-sm font-bold text-[var(--p-fg)]">{L("閱讀攻略", locale)} →</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <CoreGuideIndex stage={stage} locale={locale} />

          <section className="mt-14" aria-labelledby="sample-directory-title">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">02 / {L("先認識學校", locale)}</p>
                <h2 id="sample-directory-title" className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)] sm:text-3xl">{L(content.label, locale)}{L("學校資料", locale)}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--p-secondary)]">{L("簡明資料頁整理身份、地區、校址與公開資料來源；已有深度報告的學校保留兩種入口，先查基本資料或直接閱讀專題分析。", locale)}</p>
              </div>
              <a href={localeHref(content.directoryHref, locale)} className="min-h-11 rounded-lg bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] no-underline">{L("查看學校名錄", locale)} →</a>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {previewSchools.map((school) => <SchoolPreviewCard key={school.slug} school={school} locale={locale} />)}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-[var(--p-secondary)]">{L("全港名錄使用教育局截至 2026-09-30 的學校位置資料，並以 2026-10-23 每日註冊資料核對非政府學校；多校址學校合併展示，學校資料頁可再連到本站深度報告。", locale)}</p>
          </section>

          <section className="mt-14 grid gap-5 rounded-2xl border border-[#d8e3dc] bg-[#f0f5f1] p-6 dark:border-white/10 dark:bg-white/5 md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">03 / {L("深入比較", locale)}</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("需要看課程、升學和家庭適配度？", locale)}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--p-secondary)]">{L("深度報告會在基本資料之外，進一步解讀制度、結果與家庭取捨；報告頁和簡明資料頁並行保留。", locale)}</p>
            </div>
            <a href={localeHref("/reports", locale)} className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[var(--p-fg)] px-5 py-3 font-bold text-[var(--p-fg)] no-underline hover:bg-white/70 dark:hover:bg-white/10">{L("打開深度報告", locale)} →</a>
          </section>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

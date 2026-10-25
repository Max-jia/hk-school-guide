"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { DIRECTORY_PAGE_SIZE, directoryPageCount, directoryPagePath } from "@/lib/school-directory-pagination";
import SchoolPreviewCard, { type SchoolPreview } from "@/components/schools/SchoolPreviewCard";

export default function SchoolDirectorySearch({ schools, locale = "tc", initialPage = 1 }: { schools: SchoolPreview[]; locale?: Locale; initialPage?: number }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [category, setCategory] = useState("");
  const categories = useMemo(() => {
    const values = [...new Set(schools.flatMap((school) => school.schoolCategories || [school.schoolType]))];
    const primaryOrder = ["資助", "官立", "直資", "私立", "國際", "英基", "按位津貼", "特殊學校", "類別待核實"];
    return schools[0]?.stage !== "kindergarten" ? values.sort((a, b) => primaryOrder.indexOf(a) - primaryOrder.indexOf(b)) : values.sort();
  }, [schools]);
  const [visibleCount, setVisibleCount] = useState(DIRECTORY_PAGE_SIZE);
  const isFiltering = Boolean(query.trim() || district || category);
  const start = isFiltering ? 0 : (initialPage - 1) * DIRECTORY_PAGE_SIZE;
  const pageCount = directoryPageCount(schools.length);
  const stage = schools[0]?.stage;
  const districts = useMemo(() => [...new Set(schools.flatMap((school) => school.districts?.length ? school.districts : [school.district]))].sort(), [schools]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return schools.filter((school) => {
      const schoolDistricts = school.districts?.length ? school.districts : [school.district];
      const searchableNames = [school.name, L(school.name, "sc"), school.nameEn, school.district, ...schoolDistricts];
      const matchesName = !needle || searchableNames.join(" ").toLocaleLowerCase().includes(needle);
      return matchesName && (!district || schoolDistricts.includes(district)) && (!category || (school.schoolCategories || [school.schoolType]).includes(category));
    });
  }, [category, district, query, schools]);

  return (
    <>
      <form className="grid grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[var(--p-bg)] md:grid-cols-[1fr_180px_200px] sm:p-5" onSubmit={(event) => event.preventDefault()}>
        <label className="col-span-2 grid gap-1.5 text-sm font-bold text-[var(--p-fg)] md:col-span-1">
          {L("搜尋學校名稱或地區", locale)}
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisibleCount(DIRECTORY_PAGE_SIZE); }}
            type="search"
            placeholder={L("例如：九龍城、培基", locale)}
            className="min-h-12 min-w-0 w-full rounded-lg border border-black/20 bg-transparent px-3 font-normal outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15 dark:border-white/20"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-[var(--p-fg)]">
          {L("按地區篩選", locale)}
          <select value={district} onChange={(event) => { setDistrict(event.target.value); setVisibleCount(DIRECTORY_PAGE_SIZE); }} className="min-h-12 min-w-0 w-full rounded-lg border border-black/20 bg-transparent px-3 font-normal outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15 dark:border-white/20">
            <option value="">{L("全部地區", locale)}</option>
            {districts.map((name) => <option key={name} value={name}>{L(name, locale)}</option>)}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-[var(--p-fg)]">
          {L("按學校類型篩選", locale)}
          <select value={category} onChange={(event) => { setCategory(event.target.value); setVisibleCount(DIRECTORY_PAGE_SIZE); }} className="min-h-12 min-w-0 w-full rounded-lg border border-black/20 bg-transparent px-3 font-normal outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15 dark:border-white/20">
            <option value="">{L("全部類型", locale)}</option>
            {categories.map((name) => <option key={name} value={name}>{L(name, locale)}</option>)}
          </select>
        </label>
      </form>
      {schools[0]?.stage === "kindergarten" && <p className="mt-2 text-xs leading-relaxed text-[var(--p-secondary)]">{L("辦學類別與課程分開標示：國際／非本地課程可同時屬非牟利或私立。類別按概覽及已核實資料列示，不以校名判斷。", locale)}</p>}
      {schools[0]?.stage !== "kindergarten" && <p className="mt-2 text-xs leading-relaxed text-[var(--p-secondary)]">{L("類型按教育局名錄及已核實類別整理；英基、國際及特殊學校分開列示。完整辦學類別及資料年份可在學校資料頁查閱。", locale)}</p>}
      <p className="mt-4 text-sm text-[var(--p-secondary)]" aria-live="polite">
        {L("搜尋結果", locale)}：{filtered.length} / {schools.length} {L("所學校", locale)}
      </p>
      {filtered.length > 0 ? (
        <ul className="mt-4 grid list-none gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(start, start + visibleCount).map((school) => <li key={`${school.stage}-${school.slug}`}><SchoolPreviewCard school={school} locale={locale} compact /></li>)}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-black/20 p-8 text-center text-[var(--p-secondary)] dark:border-white/20">
          {L("沒有符合條件的學校，請更換搜尋字詞或地區。", locale)}
        </div>
      )}
      {filtered.length > start + visibleCount && <div className="mt-6 flex flex-col items-center gap-2">
        <p className="m-0 text-xs text-[var(--p-secondary)]">{L("目前顯示", locale)} {start + 1}–{start + visibleCount} / {filtered.length}</p>
        <button type="button" onClick={() => setVisibleCount((count) => count + DIRECTORY_PAGE_SIZE)} className="min-h-11 rounded-lg border border-black/20 px-5 py-2 text-sm font-bold text-[var(--p-fg)] hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">{L("顯示更多學校", locale)}</button>
      </div>}
      {!isFiltering && stage && pageCount > 1 && <nav aria-label={L("學校名錄分頁", locale)} className="mt-8 border-t border-black/10 pt-5 dark:border-white/10">
        <p className="mb-3 text-sm text-[var(--p-secondary)]">{L(`分頁瀏覽：第 ${initialPage} / ${pageCount} 頁，每頁 ${DIRECTORY_PAGE_SIZE} 所學校。搜尋及篩選涵蓋整份名錄。`, locale)}</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => <a key={page} href={localeHref(directoryPagePath(stage, page), locale)} aria-label={L(`第 ${page} 頁`, locale)} aria-current={page === initialPage ? "page" : undefined} className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border px-2 text-sm font-bold no-underline ${page === initialPage ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-black/20 text-[var(--p-fg)] hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"}`}>{page}</a>)}
        </div>
      </nav>}
    </>
  );
}

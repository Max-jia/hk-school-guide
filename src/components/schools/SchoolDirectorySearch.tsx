"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { L } from "@/lib/i18n";
import SchoolPreviewCard, { type SchoolPreview } from "@/components/schools/SchoolPreviewCard";

export default function SchoolDirectorySearch({ schools, locale = "tc" }: { schools: SchoolPreview[]; locale?: Locale }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("");
  const [visibleCount, setVisibleCount] = useState(50);
  const districts = useMemo(() => [...new Set(schools.flatMap((school) => school.districts?.length ? school.districts : [school.district]))].sort(), [schools]);
  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    return schools.filter((school) => {
      const schoolDistricts = school.districts?.length ? school.districts : [school.district];
      const searchableNames = [school.name, L(school.name, "sc"), school.nameEn, school.district, ...schoolDistricts];
      const matchesName = !needle || searchableNames.join(" ").toLocaleLowerCase().includes(needle);
      return matchesName && (!district || schoolDistricts.includes(district));
    });
  }, [district, query, schools]);

  return (
    <>
      <form className="grid gap-3 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[var(--p-bg)] sm:grid-cols-[1fr_220px] sm:p-5" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1.5 text-sm font-bold text-[var(--p-fg)]">
          {L("搜尋學校名稱或地區", locale)}
          <input
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisibleCount(50); }}
            type="search"
            placeholder={L("例如：九龍城、培基", locale)}
            className="min-h-12 rounded-lg border border-black/20 bg-transparent px-3 font-normal outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15 dark:border-white/20"
          />
        </label>
        <label className="grid gap-1.5 text-sm font-bold text-[var(--p-fg)]">
          {L("按地區篩選", locale)}
          <select value={district} onChange={(event) => { setDistrict(event.target.value); setVisibleCount(50); }} className="min-h-12 rounded-lg border border-black/20 bg-transparent px-3 font-normal outline-none focus:border-[var(--p-fg)] focus:ring-2 focus:ring-[var(--p-fg)]/15 dark:border-white/20">
            <option value="">{L("全部地區", locale)}</option>
            {districts.map((name) => <option key={name} value={name}>{L(name, locale)}</option>)}
          </select>
        </label>
      </form>
      <p className="mt-4 text-sm text-[var(--p-secondary)]" aria-live="polite">
        {L("搜尋結果", locale)}：{filtered.length} / {schools.length} {L("所學校", locale)}
      </p>
      {filtered.length > 0 ? (
        <ul className="mt-4 grid list-none gap-4 p-0 md:grid-cols-2">
          {filtered.slice(0, visibleCount).map((school) => <li key={`${school.stage}-${school.slug}`}><SchoolPreviewCard school={school} locale={locale} /></li>)}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-black/20 p-8 text-center text-[var(--p-secondary)] dark:border-white/20">
          {L("沒有符合條件的學校，請更換搜尋字詞或地區。", locale)}
        </div>
      )}
      {filtered.length > visibleCount && <div className="mt-6 flex flex-col items-center gap-2">
        <p className="m-0 text-xs text-[var(--p-secondary)]">{L("目前顯示", locale)} {visibleCount} / {filtered.length}</p>
        <button type="button" onClick={() => setVisibleCount((count) => count + 50)} className="min-h-11 rounded-lg border border-black/20 px-5 py-2 text-sm font-bold text-[var(--p-fg)] hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">{L("顯示更多學校", locale)}</button>
      </div>}
    </>
  );
}

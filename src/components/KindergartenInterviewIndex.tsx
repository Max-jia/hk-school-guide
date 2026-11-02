"use client";

import { useMemo, useState } from "react";
import { L, localeHref, type Locale } from "@/lib/i18n";

type Item = { slug: string; title: string; scTitle?: string; tease: string; scTease?: string; verifiedAt?: string };

export default function KindergartenInterviewIndex({ items, locale }: { items: Item[]; locale: Locale }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    const variants = [needle, L(needle, "sc"), L(needle, "tc")];
    return items.filter((item) => {
      const searchable = [item.title, item.scTitle ?? "", L(item.title, "sc"), L(item.title, "tc"), item.slug].join(" ").toLowerCase();
      return variants.some((term) => searchable.includes(term));
    });
  }, [items, query]);

  return <section className="mt-9" aria-labelledby="interview-schools-heading">
    <h2 id="interview-schools-heading" className="font-serif text-2xl font-bold text-[var(--p-fg)]">{L("按学校查找面试文章", locale)}</h2>
    <label htmlFor="interview-school-search" className="block text-sm font-semibold text-[var(--p-fg)]">{L("搜索学校名称", locale)}</label>
    <input id="interview-school-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={L("例如：德信、学之园", locale)} className="mt-2 w-full max-w-lg rounded-lg border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-3 text-base text-[var(--p-fg)] focus:outline-2 focus:outline-offset-2" />
    <p className="mt-3 text-sm text-[var(--p-secondary)]" role="status" aria-live="polite">{L("找到", locale)} {filtered.length} {L("所学校", locale)}</p>
    {filtered.length ? <ul className="grid gap-3 p-0 md:grid-cols-2">
      {filtered.map((entry) => <li key={entry.slug} className="list-none rounded-xl border border-[var(--p-gray-300)] p-4">
        <a href={localeHref(`/blog/${entry.slug}`, locale)} className="font-semibold text-[var(--p-fg)] hover:underline">{locale === "sc" && entry.scTitle ? entry.scTitle : L(entry.title, locale)}</a>
        <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(locale === "sc" && entry.scTease ? entry.scTease : entry.tease, locale)}</p>
        {entry.verifiedAt && <p className="mb-0 mt-2 text-xs text-[var(--p-secondary)]">{L("资料核对", locale)}：<time dateTime={entry.verifiedAt}>{entry.verifiedAt}</time></p>}
      </li>)}
    </ul> : <p className="rounded-lg bg-[var(--p-bg-yellow)] p-4 text-sm">{L("没有找到相关学校，可尝试学校简称或其他字词。", locale)}</p>}
  </section>;
}

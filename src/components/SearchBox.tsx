"use client";

import { useState } from "react";
import { searchAll, type SearchHit } from "@/lib/search-index";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const hits = searchAll(query);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="搜报告 / 热文 / 工具…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="ml-1 w-[140px] rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-3 font-sans text-base font-normal normal-case text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none md:ml-0 md:w-[180px] md:scale-[.875] md:p-2 md:text-sm"
      />
      {open && query.trim() && (
        <ul className="absolute left-0 top-full z-[1500] mt-2 w-[300px] list-none rounded-[6px] border border-[var(--p-fg)] bg-[var(--p-bg)] p-0 shadow-[0_4px_12px_rgba(0,0,0,.2)] md:scale-[.875] md:origin-top-left">
          {hits.length === 0 && (
            <li className="p-3 text-sm text-[var(--p-secondary)]">没有结果，换个词试试</li>
          )}
          {hits.map((h: SearchHit) => (
            <li key={h.href + h.title}>
              <a
                href={h.href}
                className="flex flex-col border-b border-[var(--p-gray-200)] p-3 no-underline last:border-b-0 hover:bg-[var(--p-gray-100)]"
              >
                <span className="text-sm font-bold text-[var(--p-fg)]">{h.title}</span>
                <span className="flex items-center justify-between gap-2 text-xs text-[var(--p-secondary)]">
                  <span className="truncate">{h.tease}</span>
                  <span className="shrink-0 font-mono uppercase">{h.type}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

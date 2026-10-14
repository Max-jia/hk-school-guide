"use client";

import { useEffect, useState } from "react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { readShortlist, SHORTLIST_CHANGE_EVENT } from "@/lib/shortlist";

export default function PlanningShortlistSummary({ locale = "tc" }: { locale?: Locale }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readShortlist().length);
    sync();
    window.addEventListener(SHORTLIST_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SHORTLIST_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-10" aria-labelledby="planning-shortlist-title">
      <div className="border-y border-[var(--p-gray-300)] py-4 md:flex md:items-center md:justify-between md:gap-8">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">
            {L("你的清單", locale)}
          </p>
          <h2 id="planning-shortlist-title" className="mt-1 font-serif text-xl font-bold text-[var(--p-fg)]">
            {count > 0 ? L(`你已經留了 ${count} 所候選學校`, locale) : L("看過的學校，可以先留下來", locale)}
          </h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            {count > 0
              ? L("回到清單，再逐間比較或查看報告。", locale)
              : L("候選清單只保存在這個瀏覽器，不會上傳到伺服器。", locale)}
          </p>
        </div>
        <a
          href={localeHref("/shortlist", locale)}
          data-analytics-event="shortlist_started"
          className="mt-4 inline-flex min-h-10 items-center border-2 border-[var(--p-fg)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-fg)] no-underline transition-colors duration-100 hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)] md:mt-0"
        >
          {count > 0 ? L("查看我的清單", locale) : L("打开候选清单", locale)} →
        </a>
      </div>
    </section>
  );
}

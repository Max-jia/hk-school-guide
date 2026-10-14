"use client";

import { useEffect, useMemo, useState } from "react";
import Localize from "@/components/Localize";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { localeHref, L, type Locale } from "@/lib/i18n";
import { readShortlist, SHORTLIST_CHANGE_EVENT, writeShortlist, type ShortlistEntry } from "@/lib/shortlist";

type Filter = "all" | "primary" | "kindergarten" | "secondary";

export default function ShortlistPage({ locale = "tc" }: { locale?: Locale }) {
  const [entries, setEntries] = useState<ShortlistEntry[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const sync = () => setEntries(readShortlist());
    sync();
    window.addEventListener(SHORTLIST_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SHORTLIST_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? entries : entries.filter((entry) => entry.kind === filter)),
    [entries, filter]
  );

  function remove(entry: ShortlistEntry) {
    writeShortlist(entries.filter((item) => item.id !== entry.id));
  }

  function clearAll() {
    if (window.confirm(L("确定清空全部候选学校吗？", locale))) writeShortlist([]);
  }

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[980px] px-4 pb-24">
          <div className="py-8">
            <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Shortlist · 我的候选</p>
            <h1 className="font-serif text-[clamp(32px,5vw,50px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
              我的候选学校
            </h1>
            <p className="mt-2 max-w-[680px] text-[var(--p-secondary)]">
              把看过、想比较或准备申请的学校先收进清单，再回到报告、学校对比和派位模拟器继续判断。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--p-gray-300)] pb-4">
            {([
              ["all", "全部"],
              ["primary", "小学"],
              ["kindergarten", "幼稚园"],
              ["secondary", "中学"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={`rounded-full border px-4 py-1.5 text-sm font-bold ${
                  filter === value ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] text-[var(--p-fg)]"
                }`}
              >
                {L(label, locale)}
              </button>
            ))}
            <span className="ml-auto font-mono text-xs text-[var(--p-secondary)]">{entries.length} / 60</span>
            {entries.length > 0 && (
              <button type="button" onClick={clearAll} className="text-xs text-[#C2410C] underline underline-offset-2">
                {L("清空", locale)}
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="mt-8 rounded-[12px] border border-dashed border-[var(--p-gray-300)] px-6 py-12 text-center">
              <p className="font-serif text-xl font-bold text-[var(--p-fg)]">还没有候选学校</p>
              <p className="mt-2 text-sm text-[var(--p-secondary)]">在学校报告或学校对比页点击「加入候选」，这里会自动保存。</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <a href={localeHref("/reports", locale)} className="rounded-[8px] bg-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-bg)] no-underline">
                  {L("浏览学校报告", locale)}
                </a>
                <a href={localeHref("/compare", locale)} className="rounded-[8px] border border-[var(--p-fg)] px-4 py-2 text-sm font-bold text-[var(--p-fg)] no-underline">
                  {L("去学校对比", locale)}
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((entry) => (
                <article key={entry.id} className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase text-[var(--p-secondary)]">
                        {entry.kind === "primary" ? L("小学", locale) : entry.kind === "kindergarten" ? L("幼稚园", locale) : L("中学", locale)}
                      </span>
                      <h2 className="mt-1 font-serif text-lg font-bold leading-snug text-[var(--p-fg)]">{entry.name}</h2>
                    </div>
                    <button type="button" onClick={() => remove(entry)} aria-label={L("移除候选", locale)} className="text-sm text-[var(--p-secondary)] hover:text-[#C2410C]">✕</button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.href && (
                      <a href={localeHref(entry.href, locale)} className="rounded-[6px] border border-[var(--p-fg)] px-3 py-1 font-mono text-xs text-[var(--p-fg)] no-underline">
                        {L("查看报告", locale)}
                      </a>
                    )}
                    {entry.kind === "secondary" ? (
                      <a href={localeHref("/planning?stage=secondary&route=dse", locale)} className="rounded-[6px] border border-[var(--p-gray-300)] px-3 py-1 font-mono text-xs text-[var(--p-fg)] no-underline">
                        {L("回到升学规划", locale)}
                      </a>
                    ) : (
                      <a href={localeHref("/compare", locale)} className="rounded-[6px] border border-[var(--p-gray-300)] px-3 py-1 font-mono text-xs text-[var(--p-fg)] no-underline">
                        {L("去对比", locale)}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          <p className="mt-8 text-xs text-[var(--p-secondary)]">ⓘ 候选清单只保存在当前浏览器，不会上传或同步到服务器；清除浏览器资料后会消失。</p>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

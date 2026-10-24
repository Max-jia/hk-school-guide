import type { Locale } from "@/lib/i18n";
import { L, localeHref } from "@/lib/i18n";
import { SCHOOL_STAGES, type SchoolStage } from "@/lib/school-directory-pilot";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";

const STAGE_ORDER: SchoolStage[] = ["kindergarten", "primary", "secondary"];

export default function SchoolStagesLanding({ locale = "tc" }: { locale?: Locale }) {
  return (
    <Localize locale={locale}>
      <main className="w-full">
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[1180px] px-4 pb-24">
          <header className="py-10 sm:py-14">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">Hong Kong School Guide · School Directory</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight text-[var(--p-fg)] sm:text-6xl">{L("香港學校資料與選校指南", locale)}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--p-secondary)]">{L("先按孩子所處階段進入，再看選校攻略、學校基本資料和深度報告。基本資料回答學校是什麼；深度報告解讀它對不同家庭意味著什麼。", locale)}</p>
          </header>
          <section aria-labelledby="school-stage-list-title">
            <div className="border-b border-black/10 pb-4 dark:border-white/10">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">01 / {L("先選階段", locale)}</p>
              <h2 id="school-stage-list-title" className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)] sm:text-3xl">{L("你現在要為哪個階段選校？", locale)}</h2>
            </div>
            <ul className="mt-5 grid list-none gap-4 p-0 md:grid-cols-3">
              {STAGE_ORDER.map((stage, index) => {
                const item = SCHOOL_STAGES[stage];
                return <li key={stage}>
                  <a href={localeHref(`/schools/${stage}`, locale)} className="group flex h-full min-h-64 flex-col rounded-2xl border border-black/10 bg-white p-6 no-underline shadow-[0_3px_0_rgba(25,32,39,.08)] transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[var(--p-bg)]">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">0{index + 1} / Hong Kong schools</span>
                    <span className="mt-4 font-serif text-3xl font-bold text-[var(--p-fg)] group-hover:underline">{L(item.label, locale)}</span>
                    <span className="mt-3 text-sm leading-relaxed text-[var(--p-secondary)]">{L(item.intro, locale)}</span>
                    <span className="mt-auto flex items-center justify-between border-t border-black/10 pt-4 text-sm font-bold text-[var(--p-fg)] dark:border-white/10">
                      <span>{L("選校攻略與學校名錄", locale)}</span><span aria-hidden="true">→</span>
                    </span>
                  </a>
                </li>;
              })}
            </ul>
          </section>
          <aside className="mt-10 rounded-2xl bg-[#173e45] p-6 text-white sm:p-8">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#a8d4c1]">02 / {L("資料怎麼讀", locale)}</p>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <div><h2 className="font-serif text-lg font-bold">{L("學校基本資料", locale)}</h2><p className="mb-0 mt-1 text-sm leading-relaxed text-white/75">{L("身份、地址、地區與官方來源；年度資料會標明版本。", locale)}</p></div>
              <div><h2 className="font-serif text-lg font-bold">{L("擇校攻略", locale)}</h2><p className="mb-0 mt-1 text-sm leading-relaxed text-white/75">{L("按申請、課程、校網和升學問題整理成主題入口。", locale)}</p></div>
              <div><h2 className="font-serif text-lg font-bold">{L("深度報告", locale)}</h2><p className="mb-0 mt-1 text-sm leading-relaxed text-white/75">{L("把學校制度與公開結果翻譯成家庭選擇、代價和下一步。", locale)}</p></div>
            </div>
          </aside>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

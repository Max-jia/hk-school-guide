import type { ReportSourceReference } from "@/lib/report-sources";
import { L, localeHref, type Locale } from "@/lib/i18n";

const SOURCE_TYPE_LABELS: Record<ReportSourceReference["sourceType"], string> = {
  "school-profile": "學校概覽",
  "school-official": "學校官方網站",
  government: "政府官方資料",
  "operator-official": "交通營辦商官方資料",
  "independent-inspection": "獨立檢查報告",
  "third-party-estimate": "第三方參考估算",
  "parent-discussion": "匿名家長討論",
  "media-report": "媒體報道／專題",
};

export default function ReportSourcePanel({
  sources,
  locale,
}: {
  sources: ReportSourceReference[];
  locale: Locale;
}) {
  if (sources.length === 0) return null;

  return (
    <section className="mt-12 border-t-2 border-[var(--p-fg)] pt-6" aria-labelledby="report-source-title">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">
        {L("來源與核對", locale)}
      </p>
      <h2 id="report-source-title" className="mt-2 font-serif text-2xl font-bold text-[var(--p-fg)]">
        {L("可直接查閱的來源", locale)}
      </h2>
      <p className="mt-2 max-w-[760px] text-sm leading-7 text-[var(--p-secondary)]">
        {L("以下連結列出本報告使用的學校、政府及第三方公開資料。匿名討論與第三方估算只作參考，不能視為官方結論、整體口碑或個人取錄機會；申請前以教育局及校方最新公布為準。", locale)}
      </p>
      <a
        href={localeHref("/about/data-methodology", locale)}
        className="mt-3 inline-block text-sm font-bold text-[var(--p-fg)] underline underline-offset-4"
      >
        {L("查看資料整理、核對日期和更正方法", locale)} →
      </a>
      <ul className="mt-5 space-y-3">
        {sources.map((source) => (
          <li key={source.url} className="border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-[var(--p-gray-300)] px-2 py-1 font-mono text-xs font-bold text-[var(--p-secondary)]">
                {L(SOURCE_TYPE_LABELS[source.sourceType], locale)}
              </span>
              {source.academicYear && (
                <span className="font-mono text-xs text-[var(--p-secondary)]">
                  {L("適用資料", locale)}：{L(source.academicYear, locale)}
                </span>
              )}
            </div>
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block font-bold leading-relaxed text-[var(--p-fg)] underline underline-offset-4"
            >
              {L(source.label, locale)} ↗
            </a>
            <p className="mt-1 text-sm leading-6 text-[var(--p-secondary)]">{L(source.scope, locale)}</p>
            <p className="mt-2 font-mono text-xs text-[var(--p-secondary)]">
              {L("連結查閱日期", locale)}：{source.checkedOn}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

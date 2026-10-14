import { L, localeHref, type Locale } from "@/lib/i18n";

const TOOLS = [
  { title: "小一自行分配决策台", description: "按校網、性別和計分，先列出可以考慮的學校", href: "/tools/p1-discretionary" },
  { title: "小一統一派位模擬器", description: "分開甲部與乙部，試排志願，也看看滑檔風險", href: "/tools/p1-simulator" },
  { title: "学校对比", description: "把入學途徑、評級、收費和升中路線放在一起比較", href: "/compare" },
  { title: "我的候选学校", description: "把看過的學校留下來，慢慢整理自己的名單", href: "/shortlist" },
  { title: "深度学校报告", description: "看資料來源、核驗日期和完整分析", href: "/reports" },
] as const;

export default function FeaturedTools({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="featured-tools-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
          03 / {L("选校工具", locale)}
        </p>
        <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <h2 id="featured-tools-title" className="font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
            {L("选学校时，先用这些工具", locale)}
          </h2>
          <a href={localeHref("/tools", locale)} className="font-mono text-sm font-bold text-[var(--p-fg)] no-underline hover:underline">
            {L("查看全部工具 →", locale)}
          </a>
        </div>
        <div className="mt-6 divide-y-2 divide-[var(--p-gray-300)] border-y-2 border-[var(--p-fg)]">
          {TOOLS.map((tool, index) => (
            <a
              key={tool.href}
              href={localeHref(tool.href, locale)}
              data-analytics-event={
                tool.href.startsWith("/tools")
                  ? "tool_opened_from_home"
                  : tool.href === "/shortlist"
                    ? "shortlist_started"
                    : tool.href === "/reports"
                      ? "report_opened_from_home"
                      : undefined
              }
              className="group grid gap-2 py-4 no-underline transition-colors duration-100 hover:bg-[var(--p-gray-50)] md:grid-cols-[64px_1fr_auto] md:items-center md:gap-5 md:px-3"
            >
              <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">0{index + 1}</span>
              <span>
                <span className="block font-serif text-xl font-bold leading-tight text-[var(--p-fg)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                  {L(tool.title, locale)}
                </span>
                <span className="mt-1 block text-sm text-[var(--p-secondary)]">{L(tool.description, locale)}</span>
              </span>
              <span className="font-mono text-sm font-bold text-[var(--p-fg)] md:text-right">{L("打开", locale)} →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

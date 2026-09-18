import { L, localeHref, type Locale } from "@/lib/i18n";

const ABOUT_LINKS: { label: string; href: string }[] = [
  { label: "全部报告", href: "/reports" },
  { label: "择校工具", href: "/tools" },
  { label: "面试题库", href: "/questions" },
  { label: "热文", href: "/blog" },
  { label: "40 校网排名", href: "/blog/net40-ranking" },
];

const FOLLOW_LINKS: { label: string; href: string }[] = [
  { label: "圣保罗男女", href: "/reports/spcs" },
  { label: "拔萃男书院", href: "/reports/dbs" },
  { label: "玛利诺修院", href: "/reports/mcs" },
  { label: "喇沙书院", href: "/reports/lsps" },
  { label: "40 校网", href: "/blog/net40-ranking" },
  { label: "计分制", href: "/blog/p1-scoring-guide" },
  { label: "叩门信", href: "/blog/knocking-letter-guide" },
  { label: "高才通", href: "/blog/talent-scheme-school-guide" },
];

export default function SiteFooter({ locale = "tc" }: { locale?: Locale }) {
  return (
    <footer className="mt-15 font-sans">
      <div className="mx-auto mb-24 mt-8 max-w-[1280px] px-4 pb-16">
        <div className="mb-16 text-center">
          <p className="mx-auto max-w-[900px] text-xl font-bold text-[var(--p-fg)] md:text-[28px]">
            {L("香港择校，先看数据。", locale)}
            <br />
            {L("每一份报告都来自教育局公开资料，评级仅供决策参考。", locale)}
          </p>
        </div>
        <div className="flex flex-col items-stretch justify-between gap-12 md:flex-row">
          {/* CTA 贴纸卡 */}
          <div className="flex w-full flex-col gap-12 md:w-2/3 md:flex-row md:gap-12">
            <section className="flex w-full flex-col items-center md:w-1/2 md:items-start">
              <div className="img-wrapper">
                <a href={localeHref("/blog", locale)}>
                  <img
                    src="/stickers/popular@2x.png"
                    alt={L("看全部热文", locale)}
                    className="w-full max-w-[180px] rotate-2 transition-transform duration-100 hover:rotate-0 hover:scale-105"
                  />
                </a>
              </div>
              <p className="mt-4 text-center text-sm text-[var(--p-fg)] md:text-left">
                <a
                  href={localeHref("/blog", locale)}
                  className="inline-block py-2 -my-2 font-bold text-[var(--p-fg)] no-underline underline decoration-2 underline-offset-4"
                >
                  {L("看全部 40 篇热文", locale)}
                </a>
                <span className="arrow inline-block h-[18px] w-[18px] translate-x-[-4px] translate-y-[4px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </span>
                <br />
                <span className="text-[var(--p-secondary)]">
                  {L("计分制、校网排名、叩门信", locale)}
                  <br />
                  {L("每周更新，直接可读", locale)}
                </span>
              </p>
            </section>
            <section className="flex w-full flex-col items-center md:w-1/2 md:items-start">
              <div className="img-wrapper">
                <a href={localeHref("/tools", locale)}>
                  <img
                    src="/stickers/your_input@2x.png"
                    alt={L("开始匹配", locale)}
                    className="w-full max-w-[180px] -rotate-2 transition-transform duration-100 hover:rotate-0 hover:scale-105"
                  />
                </a>
              </div>
              <p className="mt-4 text-center text-sm text-[var(--p-fg)] md:text-left">
                <a
                  href={localeHref("/tools", locale)}
                  className="inline-block py-2 -my-2 font-bold text-[var(--p-fg)] no-underline underline decoration-2 underline-offset-4"
                >
                  {L("开始择校匹配", locale)}
                </a>
                <span className="arrow inline-block h-[18px] w-[18px] translate-x-[-4px] translate-y-[4px]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </span>
                <br />
                <span className="text-[var(--p-secondary)]">
                  {L("输入校网、预算、孩子性格", locale)}
                  <br />
                  {L("669 所小学 + 962 所幼稚园", locale)}
                </span>
              </p>
            </section>
          </div>

          {/* 双列贴纸链接 */}
          <div className="flex w-full gap-8 md:w-1/3">
            <div className="w-1/2">
              <h4 className="font-mono text-xs uppercase text-[var(--p-fg)]">{L("内容", locale)}</h4>
              <ul className="m-0 mt-2 list-none p-0">
                {ABOUT_LINKS.map((l) => (
                  <li key={l.href} className="mb-1.5">
                    <a
                      href={localeHref(l.href, locale)}
                      className="py-1 -my-1 text-sm font-bold text-[var(--p-fg)] no-underline transition-colors duration-100 hover:underline hover:underline-offset-2"
                    >
                      {L(l.label, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-1/2">
              <h4 className="font-mono text-xs uppercase text-[var(--p-fg)]">{L("延伸阅读", locale)}</h4>
              <ul className="m-0 mt-2 list-none p-0">
                {FOLLOW_LINKS.map((l) => (
                  <li key={l.href} className="mb-1.5">
                    <a
                      href={localeHref(l.href, locale)}
                      className="py-1 -my-1 text-sm font-bold text-[var(--p-fg)] no-underline transition-colors duration-100 hover:underline hover:underline-offset-2"
                    >
                      {L(l.label, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 底部旋转 wordmark + 免责声明 */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <span className="-rotate-2 text-3xl font-bold text-[var(--p-fg)] transition-transform duration-100 hover:rotate-0 hover:scale-105">
            {L("港学荟", locale)}
          </span>
          <p className="text-center text-sm text-[var(--p-secondary)]">
            {L("评级与数据为参考（非官方）· 数据来源：香港教育局 CHSC", locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}

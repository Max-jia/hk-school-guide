import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import { L, type Locale } from "@/lib/i18n";

export default function Redeem({ locale = "tc" }: { locale?: Locale }) {
  return (
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[520px] px-4 pb-24 pt-16">
        <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Access · 访问说明</p>
        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.1] tracking-[-1px] text-[var(--p-fg)]">
          报告和工具现在都可以直接使用
        </h1>
        <p className="mt-2 text-sm text-[var(--p-secondary)]">
          港学荟已取消学校报告和工具的付费墙，不需要兑换码或付款。
        </p>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6 text-center">
          <p className="text-sm leading-relaxed text-[var(--p-secondary)]">打开学校报告或工具页面即可直接查看完整内容。</p>
          <a href="/tools/p1-simulator" className="mt-5 inline-block rounded-[8px] bg-[var(--p-fg)] px-6 py-3 text-sm font-bold text-[var(--p-bg)] no-underline">打开志愿模拟器 →</a>
        </div>
      </div>
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

import Localize from "@/components/Localize";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { L, localeHref, type Locale } from "@/lib/i18n";

export default function UnlockPage({ locale = "tc" }: { locale?: Locale }) {
  return (
    <Localize locale={locale}>
      <main className="w-full">
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[560px] px-4 pb-24 pt-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-[var(--p-fg)]">
            {L("报告和工具现已开放使用", locale)}
          </h1>
          <p className="mt-3 text-[var(--p-secondary)]">
            {L("无需付款或验证，直接打开页面即可查看完整内容。", locale)}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 font-mono text-sm">
            <a href={localeHref("/reports", locale)} className="text-[var(--p-fg)] underline underline-offset-2">
              {L("浏览学校报告", locale)} →
            </a>
            <a href={localeHref("/tools", locale)} className="text-[var(--p-fg)] underline underline-offset-2">
              {L("浏览择校工具", locale)} →
            </a>
          </div>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

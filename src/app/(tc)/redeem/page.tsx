import type { Metadata } from "next";
import Redeem from "@/components/Redeem";
import { L, languageAlternates, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("港学荟工具与报告已开放", "tc"),
  description: L("港学荟的学校报告和规划工具现已开放使用，不需要兑换码。", "tc"),
  alternates: { canonical: "/redeem", languages: languageAlternates("/redeem") },
  robots: { index: false, follow: false },
};

export default function Page({ locale = "tc" }: { locale?: Locale }) {
  return <Redeem locale={locale} />;
}

import type { Metadata } from "next";
import Redeem from "@/components/Redeem";
import { L, languageAlternates, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("兑换码兑换 - 志愿结构体检报告", "tc"),
  description: L("输入在小红书购买的港学荟兑换码，解锁小一志愿结构模拟器 Pro 体检报告。", "tc"),
  alternates: { canonical: "/redeem", languages: languageAlternates("/redeem") },
  robots: { index: false, follow: false },
};

export default function Page({ locale = "tc" }: { locale?: Locale }) {
  return <Redeem locale={locale} />;
}

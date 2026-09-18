import type { Metadata } from "next";
import P1SimReport from "@/components/P1SimReport";
import { L, languageAlternates, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("我的志愿结构体检报告 | 港学荟", "tc"),
  description: L("小一志愿表结构体检报告：风险等级、检查明细、修改建议、叩门预案。", "tc"),
  alternates: {
    canonical: "/tools/p1-simulator/report",
    languages: languageAlternates("/tools/p1-simulator/report"),
  },
  robots: { index: false, follow: false },
};

export default function Page({ locale = "tc" }: { locale?: Locale }) {
  return <P1SimReport locale={locale} />;
}

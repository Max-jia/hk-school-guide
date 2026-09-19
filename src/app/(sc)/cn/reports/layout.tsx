import type { Metadata } from "next";
import { L, languageAlternates } from "@/lib/i18n";
import { REPORT_COUNT } from "@/lib/report-count";

export const metadata: Metadata = {
  title: L(`全港 ${REPORT_COUNT} 份小学及幼稚园深度择校报告`, "sc"),
  description: L(
    "全港小学及幼稚园深度择校报告：四因子评级、升学通路、入读攻略、家长口碑。数据来自教育局公开资料，评级参考·非官方。",
    "sc"
  ),
  alternates: { canonical: "/cn/reports", languages: languageAlternates("/reports") },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import { L, languageAlternates } from "@/lib/i18n";
import { REPORT_COUNT } from "@/lib/report-count";

export const metadata: Metadata = {
  title: L(`全港 ${REPORT_COUNT} 份小学、幼稚园及中学深度择校报告`, "tc"),
  description: L(
    "全港小学、幼稚园及中学深度择校报告：学校定位、课程路线、申请安排、费用和公开升学资料。逐份列明来源与适用年份；中学报告不设评级。",
    "tc"
  ),
  alternates: { canonical: "/reports", languages: languageAlternates("/reports") },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

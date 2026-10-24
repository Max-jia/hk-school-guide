import type { Metadata } from "next";
import SchoolStagesLanding from "@/components/schools/SchoolStagesLanding";
import { languageAlternates, L } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港学校资料与选校指南｜幼儿园、小学、中学", "sc"),
  description: L("按幼儿园、小学和中学阶段浏览学校基本资料、选校攻略与深度报告；学校资料附官方来源与年度标记。", "sc"),
  alternates: { canonical: "/cn/schools", languages: languageAlternates("/schools") },
};

export default function Page() {
  return <SchoolStagesLanding locale="sc" />;
}

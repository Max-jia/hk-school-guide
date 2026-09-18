import type { Metadata } from "next";
import TcPage from "@/app/(tc)/reports/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港小学与幼稚园深度择校报告全集", "sc"),
  description: L(
    "全港小学、幼稚园的深度择校报告：评级、学费、师生比、升中通路、面试与家长口碑，数据来自教育局公开资料与学校官方信息。",
    "sc"
  ),
  alternates: { canonical: "/cn/reports", languages: languageAlternates("/reports") },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

import type { Metadata } from "next";
import SchoolStagesLanding from "@/components/schools/SchoolStagesLanding";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "香港學校資料與選校指南｜幼稚園、小學、中學",
  description: "按幼稚園、小學和中學階段瀏覽學校基本資料、選校攻略與深度報告；學校資料附官方來源與年度標記。",
  alternates: { canonical: "/schools", languages: languageAlternates("/schools") },
};

export default function Page() {
  return <SchoolStagesLanding locale="tc" />;
}

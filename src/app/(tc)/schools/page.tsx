import type { Metadata } from "next";
import SchoolStagesLanding from "@/components/schools/SchoolStagesLanding";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "香港學校資料與選校指南｜幼稚園、小學、中學",
  description: "按幼稚園、小學和中學階段瀏覽學校基本資料、選校攻略與深度報告；學校資料附官方來源與年度標記。",
  path: "/schools", locale: "tc",
});

export default function Page() {
  return <SchoolStagesLanding locale="tc" />;
}

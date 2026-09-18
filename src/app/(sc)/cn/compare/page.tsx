import type { Metadata } from "next";
import TcPage from "@/app/(tc)/compare/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港学校对比：2-3 所并排看评级、学费、师生比", "sc"),
  alternates: { canonical: "/cn/compare", languages: languageAlternates("/compare") },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

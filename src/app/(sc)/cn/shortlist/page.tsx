import type { Metadata } from "next";
import TcPage from "@/app/(tc)/shortlist/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("我的候选学校：收藏、比较与择校清单", "sc"),
  alternates: { canonical: "/cn/shortlist", languages: languageAlternates("/shortlist") },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

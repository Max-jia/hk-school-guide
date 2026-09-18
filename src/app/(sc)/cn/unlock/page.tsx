import type { Metadata } from "next";
import TcPage from "@/app/(tc)/unlock/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("解锁全部深度择校报告", "sc"),
  alternates: { canonical: "/cn/unlock", languages: languageAlternates("/unlock") },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

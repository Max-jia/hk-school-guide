import type { Metadata } from "next";
import TcPage, { metadata as tcMetadata } from "@/app/(tc)/tools/p1-school-net/page";
import { L, languageAlternates } from "@/lib/i18n";

const base = tcMetadata as { title?: string; description?: string };
export const metadata: Metadata = {
  title: L(String(base.title ?? ""), "sc"),
  description: L(String(base.description ?? ""), "sc"),
  alternates: {
    canonical: "/cn/tools/p1-school-net",
    languages: languageAlternates("/tools/p1-school-net"),
  },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

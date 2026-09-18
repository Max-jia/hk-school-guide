import type { Metadata } from "next";
import TcPage, { metadata as tcMetadata } from "@/app/(tc)/tools/p1-self-check/page";
import { L, languageAlternates } from "@/lib/i18n";

const base = tcMetadata as { title?: string; description?: string };
export const metadata: Metadata = {
  title: L(String(base.title ?? ""), "sc"),
  description: L(String(base.description ?? ""), "sc"),
  alternates: {
    canonical: "/cn/tools/p1-self-check",
    languages: languageAlternates("/tools/p1-self-check"),
  },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

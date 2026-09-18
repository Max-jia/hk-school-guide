import type { Metadata } from "next";
import TcPage, { metadata as tcMetadata } from "@/app/(tc)/tools/p1-discretionary/page";
import { L, languageAlternates } from "@/lib/i18n";

// 简体页面复用主版本的标题文案,转成简体后覆盖 canonical / hreflang
const base = tcMetadata as { title?: string; description?: string };
export const metadata: Metadata = {
  title: L(String(base.title ?? ""), "sc"),
  description: L(String(base.description ?? ""), "sc"),
  alternates: {
    canonical: "/cn/tools/p1-discretionary",
    languages: languageAlternates("/tools/p1-discretionary"),
  },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

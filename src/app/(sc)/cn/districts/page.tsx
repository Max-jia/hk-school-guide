import type { Metadata } from "next";
import TcPage from "@/app/(tc)/districts/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港 18 区小学与幼稚园盘点：校网、评级、学费一次看清", "sc"),
  description: L(
    "按地区浏览香港小学与幼稚园：中西区、湾仔、九龙城、沙田……每区列出学校清单、评级、学费与班师比（小学）／师生比（幼稚园），数据来自教育局公开资料。",
    "sc"
  ),
  alternates: { canonical: "/cn/districts", languages: languageAlternates("/districts") },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

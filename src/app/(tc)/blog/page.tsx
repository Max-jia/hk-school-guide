import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港择校热文与攻略合集：校网排名、计分制、叩门信", "tc"),
  description: L(
    "香港幼稚园及小学择校攻略合集：校网排名、计分制、叩门信、热搜学校研究与制度解读。每周更新，直接可读。",
    "tc"
  ),
  alternates: { canonical: "/blog", languages: languageAlternates("/blog") },
};

export default function Page() {
  return <BlogList locale="tc" />;
}

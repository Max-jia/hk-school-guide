import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港小学与幼稚园择校文章｜入学、学费、选校比较", "tc"),
  description: L(
    "按小学、幼稚园与家长问题找文章：入学申请、学费资助、学校观察和选校比较。每篇注明发布时间，有实质更新时单独标记。",
    "tc"
  ),
  alternates: { canonical: "/blog", languages: languageAlternates("/blog") },
};

export default function Page() {
  return <BlogList locale="tc" />;
}

import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { L } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: L("香港幼稚园、小学与中学指南｜入学、学费、选校比较", "tc"),
  description: L(
    "按幼稚园、小学、中学与家长问题找文章：入学申请、学费资助、学校观察和选校比较。每篇注明发布时间，有实质更新时单独标记。",
    "tc"
  ),
  path: "/blog", locale: "tc",
});

export default function Page() {
  return <BlogList locale="tc" />;
}

import type { Metadata } from "next";
import BlogList from "@/components/BlogList";
import { L } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: L("香港小学与幼儿园择校文章｜入学、学费、选校比较", "sc"),
  description: L(
    "按小学、幼儿园与家长问题找文章：入学申请、学费资助、学校观察和选校比较。每篇注明发布时间，有实质更新时单独标记。",
    "sc"
  ),
  path: "/blog", locale: "sc",
});

export default function Page() {
  return <BlogList locale="sc" />;
}

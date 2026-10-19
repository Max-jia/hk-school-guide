import MethodologyPage from "@/components/MethodologyPage";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "学校资料来源与评估方法",
  description: "了解港学荟学校资料的公开来源、报告评分的性质、资料年份及使用限制。学校招生与费用请以教育局及校方最新公布为准。",
  path: "/about/data-methodology",
  locale: "sc",
});

export default function Page() {
  return <MethodologyPage locale="sc" />;
}

import MethodologyPage from "@/components/MethodologyPage";
import { createPageMetadata } from "@/lib/page-metadata";
import { METHODOLOGY_DESCRIPTION } from "@/lib/editorial-policy";

export const metadata = createPageMetadata({
  title: "学校资料来源与评估方法",
  description: METHODOLOGY_DESCRIPTION,
  path: "/about/data-methodology",
  locale: "sc",
});

export default function Page() {
  return <MethodologyPage locale="sc" />;
}

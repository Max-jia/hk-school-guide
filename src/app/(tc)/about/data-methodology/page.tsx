import MethodologyPage from "@/components/MethodologyPage";
import { createPageMetadata } from "@/lib/page-metadata";
import { METHODOLOGY_DESCRIPTION } from "@/lib/editorial-policy";

export const metadata = createPageMetadata({
  title: "學校資料來源與評估方法",
  description: METHODOLOGY_DESCRIPTION,
  path: "/about/data-methodology",
  locale: "tc",
});

export default function Page() {
  return <MethodologyPage locale="tc" />;
}

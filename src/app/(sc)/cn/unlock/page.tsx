import TcPage from "@/app/(tc)/unlock/page";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "报告与工具使用说明",
  description: "港学荟的学校报告和择校工具现已开放，无需付款或验证。",
  path: "/unlock",
  locale: "sc",
  indexable: false,
});

export default function Page() {
  return <TcPage locale="sc" />;
}

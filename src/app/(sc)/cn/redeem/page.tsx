import TcPage from "@/app/(tc)/redeem/page";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "港学荟工具与报告已开放",
  description: "学校报告和规划工具现已开放使用，无需兑换码或付款。",
  path: "/redeem",
  locale: "sc",
  indexable: false,
});

export default function Page() {
  return <TcPage locale="sc" />;
}

import MethodologyPage from "@/components/MethodologyPage";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "學校資料來源與評估方法",
  description: "了解港學荟學校資料的公開來源、報告評分的性質、資料年份及使用限制。學校收生與費用請以教育局及校方最新公布為準。",
  path: "/about/data-methodology",
  locale: "tc",
});

export default function Page() {
  return <MethodologyPage locale="tc" />;
}

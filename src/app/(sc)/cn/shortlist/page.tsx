import TcPage from "@/app/(tc)/shortlist/page";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "我的候选学校清单",
  description: "查看本设备保存的候选学校，并整理比较清单。收藏内容保存在当前浏览器，不会同步到其他设备。",
  path: "/shortlist",
  locale: "sc",
  indexable: false,
});

export default function Page() {
  return <TcPage locale="sc" />;
}

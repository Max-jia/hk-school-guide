import type { Metadata } from "next";
import P1SchoolNet from "@/components/P1SchoolNet";

export const metadata: Metadata = {
  title: "小一校网数据库：36 个校网 × 官立资助小学名单 | 港学荟",
  description:
    "2027/28 学年小一学校网小学名册：36 个校网、433 所官立及资助小学，含学校编号、类别、宗教、自行分配学额与地址。数据来自教育局官方名册（2026年8月编制）。",
  alternates: { canonical: "/tools/p1-school-net" },
  openGraph: {
    type: "website",
    siteName: "港学荟",
    title: "小一校网数据库：36 个校网 × 官立资助小学名单",
    description: "输入校网即可查看网内全部参加派位小学，数据来自教育局 2027/28 官方名册。",
    url: "/tools/p1-school-net",
  },
};

export default function Page() {
  return <P1SchoolNet />;
}

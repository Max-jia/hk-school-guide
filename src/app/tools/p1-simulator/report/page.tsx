import type { Metadata } from "next";
import P1SimReport from "@/components/P1SimReport";

export const metadata: Metadata = {
  title: "我的志愿结构体检报告 | 港学荟",
  description: "小一志愿表结构体检报告：风险等级、检查明细、修改建议、叩门预案。",
  alternates: { canonical: "/tools/p1-simulator/report" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <P1SimReport />;
}

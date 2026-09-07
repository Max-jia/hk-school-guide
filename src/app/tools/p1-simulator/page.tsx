import type { Metadata } from "next";
import P1Simulator from "@/components/P1Simulator";

export const metadata: Metadata = {
  title: "小一志愿结构模拟器：填表前推演，拿一页风控体检报告 | 港学荟",
  description:
    "把志愿表（甲部＋乙部）填进模拟器，免费看结构快照；解锁 Pro 体检报告：风险等级、逐项检查、修改建议、叩门预案，可保存为 PDF。不预测录取概率。",
  alternates: { canonical: "/tools/p1-simulator" },
  openGraph: {
    type: "website",
    siteName: "港学荟",
    title: "小一志愿结构模拟器 · 填表前推演",
    description: "30 个志愿怎么排、有没有保底、有没有填了也后悔的空洞——一页报告说清楚。",
    url: "/tools/p1-simulator",
  },
};

export default function Page() {
  return <P1Simulator />;
}

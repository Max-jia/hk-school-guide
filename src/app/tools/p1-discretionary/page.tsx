import type { Metadata } from "next";
import P1Discretionary from "@/components/P1Discretionary";

export const metadata: Metadata = {
  title: "自行分配投表决策台：这一票投给谁 | 港学荟",
  description:
    "小一自行分配只能申请 1 间官津小学：计分组合自动核对、甲类必录取预检、候选校逐校对比、投表决策报告。不预测录取概率，只做可核实的规则核对与策略推导。",
  alternates: { canonical: "/tools/p1-discretionary" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "港学荟",
    title: "自行分配投表决策台 · 这一票投给谁",
    description: "计分防算错＋甲类必录取预检＋候选校对比＋投表决策报告。失败自动进统派，录取即锁定——这票投给谁要想清楚。",
    url: "/tools/p1-discretionary",
  },
};

export default function Page() {
  return <P1Discretionary />;
}

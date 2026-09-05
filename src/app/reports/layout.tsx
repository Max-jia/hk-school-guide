import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全港 126 份小学及幼稚园深度择校报告",
  description:
    "全港小学及幼稚园深度择校报告：四因子评级、升学通路、入读攻略、家长口碑。数据来自教育局公开资料，评级参考·非官方。",
  alternates: { canonical: "/reports" },
};

export default function ReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

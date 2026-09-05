import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "香港择校匹配工具：按校网、预算、性格筛学校",
  description:
    "输入校网、预算、孩子性格，从 669 所小学、962 所幼稚园中筛出适合的学校。免费、即时、数据来自教育局公开资料。",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "香港择校与小一派位工具：匹配、模拟、校网查询",
  description:
    "香港小学、幼稚园与小一派位工具：学校匹配、志愿结构模拟、计分自查、校网数据库。数据来自教育局公开资料。",
  alternates: { canonical: "/tools" },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

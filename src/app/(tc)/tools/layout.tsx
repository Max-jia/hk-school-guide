import type { Metadata } from "next";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("香港择校与小一派位工具：匹配、模拟、校网查询", "tc"),
  description: L(
    "香港小学、幼稚园与小一派位工具：学校匹配、志愿结构模拟、计分自查、校网数据库。数据来自教育局公开资料。",
    "tc"
  ),
  alternates: { canonical: "/tools", languages: languageAlternates("/tools") },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

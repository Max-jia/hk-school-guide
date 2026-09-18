import type { Metadata } from "next";

// canonical / hreflang 由各页自己声明(/blog 列表页与 /blog/[slug] 文章页各自不同)
export const metadata: Metadata = {};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "香港学校对比：评级、学费与升学资料并排比较",
  description: "一次选择最多 3 所香港小学或幼稚园，并排查看评级、学费、校网、课程及相关报告；学校最新安排请以校方公布为准。",
  path: "/compare",
  locale: "tc",
});

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}

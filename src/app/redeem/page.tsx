import type { Metadata } from "next";
import Redeem from "@/components/Redeem";

export const metadata: Metadata = {
  title: "兑换码兑换 - 志愿结构体检报告 | 港学荟",
  description: "输入在小红书购买的港学荟兑换码，解锁小一志愿结构模拟器 Pro 体检报告。",
  alternates: { canonical: "/redeem" },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Redeem />;
}

import type { Metadata } from "next";
import TcPage from "@/app/(tc)/redeem/page";
import { L, languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("兑换码兑换 - 志愿结构体检报告", "sc"),
  description: L("输入在小红书购买的港学荟兑换码，解锁小一志愿结构模拟器 Pro 体检报告。", "sc"),
  alternates: { canonical: "/cn/redeem", languages: languageAlternates("/redeem") },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <TcPage locale="sc" />;
}

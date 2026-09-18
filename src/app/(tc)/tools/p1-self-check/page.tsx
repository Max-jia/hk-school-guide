import type { Metadata } from "next";
import P1SelfCheck from "@/components/P1SelfCheck";
import { L, languageAlternates, type Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: L("小一派位自查：计分计算器＋交表清单 | 港学荟", "tc"),
  description:
    L("免费的小一派位交表自查工具：乙类计分计算器、交表前5条自查清单、可分享结果卡。依据教育局2027/28官方《计分办法准则》，不预测录取概率。", "tc"),
  alternates: { canonical: "/tools/p1-self-check", languages: languageAlternates("/tools/p1-self-check") },
  openGraph: {
    type: "website",
    siteName: L("港学荟", "tc"),
    title: L("小一派位自查：计分计算器＋交表清单 | 港学荟", "tc"),
    description:
      L("交表前先做派位体检：算出乙类计分、过一遍5条自查清单，生成可分享的结果卡。", "tc"),
    url: "/tools/p1-self-check",
  },
};

export default function Page({ locale = "tc" }: { locale?: Locale }) {
  return <P1SelfCheck locale={locale} />;
}

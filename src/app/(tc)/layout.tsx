import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { L, LOCALE_META, languageAlternates } from "@/lib/i18n";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// 主版本(繁體)根 layout。簡體版本在 (sc)/cn/layout.tsx,兩個 route group
// 各有自己的 <html lang>,這樣 SSR 出來的語言宣告才和各版內容一致。
export const metadata: Metadata = {
  metadataBase: new URL("https://hkschool.guide"),
  title: {
    default: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "tc"),
    template: `%s | ${L("港学荟", "tc")}`,
  },
  description: L(
    "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
    "tc"
  ),
  alternates: { canonical: "/", languages: languageAlternates("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: L("港学荟", "tc"),
    title: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "tc"),
    description: L(
      "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
      "tc"
    ),
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
    locale: LOCALE_META.tc.ogLocale,
  },
  twitter: {
    card: "summary_large_image",
    title: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "tc"),
    description: L(
      "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
      "tc"
    ),
    images: ["/og-home.png"],
  },
};

export default function TcRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LOCALE_META.tc.htmlLang} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7649257223930816"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}

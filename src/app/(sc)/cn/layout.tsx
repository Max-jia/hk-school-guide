import type { Metadata } from "next";
import Script from "next/script";
import "../../globals.css";
import { L, LOCALE_META, languageAlternates } from "@/lib/i18n";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

// 简体版本根 layout(/cn 前缀)。
// route group (sc) 不参与 URL,所以这一棵对应 /cn/**。
export const metadata: Metadata = {
  metadataBase: new URL("https://hkschool.guide"),
  title: {
    default: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "sc"),
    template: `%s | ${L("港学荟", "sc")}`,
  },
  description: L(
    "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
    "sc"
  ),
  alternates: { canonical: "/cn", languages: languageAlternates("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: L("港学荟", "sc"),
    title: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "sc"),
    description: L(
      "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
      "sc"
    ),
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
    locale: LOCALE_META.sc.ogLocale,
  },
  twitter: {
    card: "summary_large_image",
    title: L("香港幼稚园、小学、中学资料与择校指南｜港学荟", "sc"),
    description: L(
      "按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具；招生以校方当届公告为准。",
      "sc"
    ),
    images: ["/og-home.png"],
  },
};

export default function ScRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={LOCALE_META.sc.htmlLang} className="h-full antialiased">
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

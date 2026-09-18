import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { L, LOCALE_META, languageAlternates } from "@/lib/i18n";

// 主版本(繁體)根 layout。簡體版本在 (sc)/cn/layout.tsx,兩個 route group
// 各有自己的 <html lang>,這樣 SSR 出來的語言宣告才和各版內容一致。
export const metadata: Metadata = {
  metadataBase: new URL("https://hkschool.guide"),
  title: {
    default: L("港学荟 · 香港择校的数据工作室", "tc"),
    template: `%s | ${L("港学荟", "tc")}`,
  },
  description: L(
    "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
    "tc"
  ),
  alternates: { canonical: "/", languages: languageAlternates("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: L("港学荟", "tc"),
    title: L("港学荟 · 香港择校的数据工作室", "tc"),
    description: L(
      "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
      "tc"
    ),
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
    locale: LOCALE_META.tc.ogLocale,
  },
  twitter: {
    card: "summary_large_image",
    title: L("港学荟 · 香港择校的数据工作室", "tc"),
    description: L(
      "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
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

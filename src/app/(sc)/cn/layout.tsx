import type { Metadata } from "next";
import Script from "next/script";
import "../../globals.css";
import { L, LOCALE_META, languageAlternates } from "@/lib/i18n";

// 简体版本根 layout(/cn 前缀)。
// route group (sc) 不参与 URL,所以这一棵对应 /cn/**。
export const metadata: Metadata = {
  metadataBase: new URL("https://hkschool.guide"),
  title: {
    default: L("港学荟 · 香港择校的数据工作室", "sc"),
    template: `%s | ${L("港学荟", "sc")}`,
  },
  description: L(
    "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
    "sc"
  ),
  alternates: { canonical: "/cn", languages: languageAlternates("/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: L("港学荟", "sc"),
    title: L("港学荟 · 香港择校的数据工作室", "sc"),
    description: L(
      "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
      "sc"
    ),
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
    locale: LOCALE_META.sc.ogLocale,
  },
  twitter: {
    card: "summary_large_image",
    title: L("港学荟 · 香港择校的数据工作室", "sc"),
    description: L(
      "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
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

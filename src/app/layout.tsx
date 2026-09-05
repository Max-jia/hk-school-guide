import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hkschool.guide"),
  title: {
    default: "港学荟 · 香港择校的数据工作室",
    template: "%s | 港学荟",
  },
  description:
    "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "港学荟",
    title: "港学荟 · 香港择校的数据工作室",
    description: "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
    images: [{ url: "/og-home.png", width: 1200, height: 630 }],
    locale: "zh_HK",
  },
  twitter: {
    card: "summary_large_image",
    title: "港学荟 · 香港择校的数据工作室",
    description: "把教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
    images: ["/og-home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
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

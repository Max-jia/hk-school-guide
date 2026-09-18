import type { Metadata } from "next";
import TcPage, { generateStaticParams } from "@/app/(tc)/reports/[slug]/page";
import { reportMetadata } from "@/lib/reports";

// 简体版本:复用主版本页面组件,locale 驱动繁简转换。
export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return reportMetadata(slug, "sc");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <TcPage params={params} locale="sc" />;
}

import type { Metadata } from "next";
import TcPage, { generateStaticParams } from "@/app/(tc)/blog/[slug]/page";
import { blogPostMetadata } from "@/lib/blog";

// 简体版本:复用主版本的页面组件,由 locale 参数驱动繁简转换。
export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata(slug, "sc");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <TcPage params={params} locale="sc" />;
}

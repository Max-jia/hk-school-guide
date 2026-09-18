import type { Metadata } from "next";
import TcPage, { generateStaticParams } from "@/app/(tc)/districts/[slug]/page";
import { districtMetadata } from "@/lib/districts";

export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return districtMetadata(slug, "sc");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <TcPage params={params} locale="sc" />;
}

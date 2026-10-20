import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogClusterPage from "@/components/BlogClusterPage";
import { BLOG_CLUSTERS, getBlogCluster } from "@/lib/blog-clusters";
import { L } from "@/lib/i18n";

export function generateStaticParams() {
  return BLOG_CLUSTERS.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getBlogCluster(slug);
  if (!cluster) return {};
  const path = `/blog/topics/${slug}`;
  const title = `${L(cluster.title, "sc")}｜香港择校指南`;
  const description = L(cluster.description, "sc");
  return {
    title,
    description,
    alternates: { canonical: `/cn${path}`, languages: { "zh-Hant-HK": path, "zh-Hans": `/cn${path}`, "x-default": path } },
    openGraph: { type: "website", title: `${title}｜港学荟`, description, url: `/cn${path}` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getBlogCluster(slug);
  if (!cluster) notFound();
  return <BlogClusterPage cluster={cluster} locale="sc" />;
}

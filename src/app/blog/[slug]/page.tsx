import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import blogMeta from "@/content/blog-meta.json";
import { SITE_URL, toISODate, trimTitle, makeDescription } from "@/lib/seo";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

const META = (blogMeta as any[]) as {
  slug: string; date: string; tag: string; title: string; tease: string;
}[];

export function generateStaticParams() {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(/\.json$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return {};
  const d = JSON.parse(fs.readFileSync(file, "utf8")) as { title: string; body: string };
  const meta = META.find((m) => m.slug === slug);
  const title = trimTitle(d.title);
  const description = meta?.tease?.replace(/\s+/g, " ").trim().slice(0, 155) || makeDescription(d.body);
  const publishedTime = meta ? toISODate(meta.date) : "";
  const url = `/blog/${slug}`;
  const ogImage = `/covers/og/${slug}.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "港学荟",
      title,
      description,
      url,
      publishedTime: publishedTime || undefined,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return <main className="w-full"><SiteHeader /><p className="p-8">文章不存在</p><SiteFooter /></main>;
  const d = JSON.parse(fs.readFileSync(file, "utf8")) as {
    title: string;
    body: string;
    premium: boolean;
    faq?: { question: string; answer: string }[];
  };
  const meta = META.find((m) => m.slug === slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: trimTitle(d.title),
    description: meta?.tease?.replace(/\s+/g, " ").trim().slice(0, 155) || makeDescription(d.body),
    datePublished: meta ? toISODate(meta.date) : undefined,
    dateModified: meta ? toISODate(meta.date) : undefined,
    author: { "@type": "Organization", name: "港学荟" },
    publisher: { "@type": "Organization", name: "港学荟" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/covers/og/${slug}.png`,
  };
  const faqJsonLd = d.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: d.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}
      <SiteHeader />
      <div className="mx-auto max-w-[880px] px-4 pb-24">
        <p className="pt-8 font-mono text-sm uppercase text-[var(--p-secondary)]">
          <a href="/blog" className="text-[var(--p-secondary)] no-underline hover:underline">热文</a> · 阅读
        </p>
        {/* 正文含 h1 标题，样式见 globals.css .blog-article 区 */}
        <div className="blog-article" dangerouslySetInnerHTML={{ __html: d.body }} />
      </div>
      <SiteFooter />
    </main>
  );
}

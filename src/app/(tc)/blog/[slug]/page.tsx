import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import { L, localeHref, type Locale } from "@/lib/i18n";
import {
  listBlogSlugs,
  getBlogPost,
  blogPostMetadata,
  blogPostJsonLd,
  blogFaqJsonLd,
} from "@/lib/blog";

export function generateStaticParams() {
  return listBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return blogPostMetadata(slug, "tc");
}

export default async function BlogPostPage({
  params,
  locale = "tc",
}: {
  params: Promise<{ slug: string }>;
  locale?: Locale;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return (
      <main className="w-full">
        <SiteHeader locale={locale} />
        <p className="p-8">{L("文章不存在", locale)}</p>
        <SiteFooter locale={locale} />
      </main>
    );
  }
  const jsonLd = blogPostJsonLd(post, locale);
  const faqJsonLd = blogFaqJsonLd(post, locale);

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {faqJsonLd ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        ) : null}
        <SiteHeader locale={locale} />
        <div className="mx-auto max-w-[880px] px-4 pb-24">
          <p className="pt-8 font-mono text-sm uppercase text-[var(--p-secondary)]">
            <a
              href={localeHref("/blog", locale)}
              className="text-[var(--p-secondary)] no-underline hover:underline"
            >
              热文
            </a>{" "}
            · 阅读
          </p>
          {/* 正文含 h1 标题，样式见 globals.css .blog-article 区 */}
          <div className="blog-article" dangerouslySetInnerHTML={{ __html: L(post.body, locale) }} />
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

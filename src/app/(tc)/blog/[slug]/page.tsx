import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import { L, localeHref, type Locale } from "@/lib/i18n";
import {
  listBlogSlugs,
  getBlogPost,
  getBlogMeta,
  BLOG_META,
  blogBodyContent,
  blogPublishedAt,
  blogPostMetadata,
  blogPostJsonLd,
} from "@/lib/blog";
import { blogStage, blogTopic, BLOG_STAGE_LABELS, BLOG_TOPIC_LABELS } from "@/lib/blog-taxonomy";
import { blogClustersForArticle, clusterArticles, clusterCoreArticle } from "@/lib/blog-clusters";

function readableDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

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
  const meta = getBlogMeta(slug);
  const publishedAt = blogPublishedAt(meta);
  const stage = blogStage(slug);
  const topic = blogTopic(slug);
  const hasBodyRelatedLinks = /(?:相关阅读|延伸阅读|相关文章)<\/strong>/.test(post.body);
  const clusters = blogClustersForArticle(slug);
  const cluster = clusters[0];
  const clusterCore = cluster ? clusterCoreArticle(cluster) : undefined;
  const clusterRelated = cluster ? clusterArticles(cluster)
    .filter((item) => item.slug !== slug && item.slug !== cluster.coreSlug)
    .slice(0, 2) : [];
  const related = cluster ? [clusterCore, ...clusterRelated]
    .filter((item): item is NonNullable<typeof item> => Boolean(item && item.slug !== slug))
    .slice(0, 3) : BLOG_META.filter((item) => item.slug !== slug)
    .sort((a, b) => {
      const aMatch = Number(blogStage(a.slug) === stage) * 2 + Number(blogTopic(a.slug) === topic);
      const bMatch = Number(blogStage(b.slug) === stage) * 2 + Number(blogTopic(b.slug) === topic);
      return bMatch - aMatch || (b.updatedAt ?? blogPublishedAt(b)).localeCompare(a.updatedAt ?? blogPublishedAt(a));
    })
    .slice(0, 3);

  return (
    <Localize locale={locale}>
      <main className="w-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
          {clusters.length > 0 && (
            <p className="mb-0 rounded-lg bg-[var(--p-bg-yellow)] px-4 py-3 text-sm leading-relaxed text-[var(--p-fg)]">
              <strong>{L("相关专题：", locale)}</strong>
              {clusters.map((item, index) => (
                <span key={item.slug}>
                  {index > 0 && " · "}
                  <a href={localeHref(`/blog/topics/${item.slug}`, locale)} className="font-bold text-[var(--p-fg)] underline underline-offset-4">{L(item.title, locale)}</a>
                </span>
              ))}
            </p>
          )}
          <article className="blog-article">
            <header className="border-b border-[var(--p-gray-300)] pb-6">
              <p className="mb-3 font-mono text-sm text-[var(--p-secondary)]">
                {L(BLOG_STAGE_LABELS[stage], locale)} · {L(BLOG_TOPIC_LABELS[topic], locale)}
              </p>
              <h1>{L(post.title, locale)}</h1>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--p-secondary)]">
                <span>{L("编辑：港学荟", locale)}</span>
                {publishedAt && <span>{L("发布", locale)} <time dateTime={publishedAt}>{readableDate(publishedAt)}</time></span>}
                {meta?.updatedAt && <span>{L("更新", locale)} <time dateTime={meta.updatedAt}>{readableDate(meta.updatedAt)}</time></span>}
                {meta?.verifiedAt && <span>{L("资料核对", locale)} <time dateTime={meta.verifiedAt}>{readableDate(meta.verifiedAt)}</time></span>}
              </div>
              {!meta?.verifiedAt && (
                <p className="mb-0 mt-3 text-sm text-[var(--p-secondary)]">
                  {L("本文尚未标记本轮资料核对日期。学费和招生安排请以学校及教育局当届公告为准。", locale)}
                </p>
              )}
            </header>
            <div className="pt-6" dangerouslySetInnerHTML={{ __html: blogBodyContent(L(post.body, locale), locale) }} />
            {!hasBodyRelatedLinks && <section className="mt-14 border-t border-[var(--p-gray-300)] pt-7" aria-labelledby="blog-related-heading">
              <h2 id="blog-related-heading" className="!mt-0 !border-0 !pt-0">{L("继续阅读", locale)}</h2>
              <ul className="grid gap-3 !pl-0 md:grid-cols-3">
                {related.map((item) => (
                  <li key={item.slug} className="!m-0 list-none rounded-lg border border-[var(--p-gray-300)] p-4">
                    <a href={localeHref(`/blog/${item.slug}`, locale)} className="block font-semibold no-underline hover:underline">
                      {locale === "sc" && item.scTitle ? item.scTitle : L(item.title, locale)}
                    </a>
                    <span className="mt-2 block text-xs text-[var(--p-secondary)]">
                      {L(BLOG_STAGE_LABELS[blogStage(item.slug)], locale)} · {L(BLOG_TOPIC_LABELS[blogTopic(item.slug)], locale)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>}
          </article>
        </div>
        <SiteFooter locale={locale} />
      </main>
    </Localize>
  );
}

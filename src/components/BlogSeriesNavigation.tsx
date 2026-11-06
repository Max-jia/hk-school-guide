import { clusterArticles, type BlogCluster } from "@/lib/blog-clusters";
import { L, localeHref, type Locale } from "@/lib/i18n";

export default function BlogSeriesNavigation({ series, slug, locale, position }: {
  series: BlogCluster;
  slug: string;
  locale: Locale;
  position: "top" | "bottom";
}) {
  const articles = clusterArticles(series);
  const index = articles.findIndex((article) => article.slug === slug);
  const title = (article: typeof articles[number]) => locale === "sc" && article.scTitle ? article.scTitle : L(article.title, locale);
  const section = series.sections?.find((item) => item.articleSlugs.includes(slug));
  const directory = localeHref(`/blog/topics/${series.slug}`, locale);
  const linkClass = "rounded-lg border border-[var(--p-gray-300)] p-4 text-sm leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-[var(--p-bg-yellow)]";

  if (position === "bottom") {
    const previous = articles[index - 1];
    const next = articles[index + 1];
    return (
      <nav aria-label={L("系列前后篇导航", locale)} className="mt-10 border-t border-[var(--p-gray-300)] pt-6">
        <p className="text-sm font-semibold">{L(series.title, locale)} · {index + 1}/{articles.length}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {previous && <a rel="prev" href={localeHref(`/blog/${previous.slug}`, locale)} className={linkClass}>
            <span className="mb-2 block text-xs text-[var(--p-secondary)]">← {L("上一篇", locale)}</span>{title(previous)}
          </a>}
          {next && <a rel="next" href={localeHref(`/blog/${next.slug}`, locale)} className={linkClass}>
            <span className="mb-2 block text-xs text-[var(--p-secondary)]">{L("下一篇", locale)} →</span>{title(next)}
          </a>}
        </div>
        {section && <a href={localeHref(`/blog/topics/${section.clusterSlug}`, locale)} className="mr-5 mt-4 inline-block text-sm font-semibold">{L("返回分类目录：", locale)}{L(section.title, locale)}</a>}
        <a href={directory} className="mt-4 inline-block text-sm font-semibold">{L("返回系列目录", locale)} →</a>
      </nav>
    );
  }

  return (
    <nav aria-label={L("本系列阅读目录", locale)} className="mt-6 rounded-xl bg-[var(--p-bg-yellow)] p-4 md:p-5">
      <p className="!mb-3 text-sm font-semibold"><a href={directory}>{L(series.title, locale)}</a> · {L("第", locale)} {index + 1}/{articles.length} {L("篇", locale)}</p>
      {series.sections && <p className="!mb-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">{series.sections.map((item) => <a key={item.clusterSlug} href={localeHref(`/blog/topics/${item.clusterSlug}`, locale)} aria-current={item === section ? "true" : undefined}>{L(item.title, locale)} · {item.articleSlugs.length}{L("篇", locale)}</a>)}</p>}
      <details open={!series.sections}>
        <summary className={series.sections ? "cursor-pointer text-sm font-semibold" : "hidden"}>{L("展开全部文章目录", locale)}</summary>
      <ol className="m-0 grid gap-2 p-0 text-sm leading-relaxed">
        {articles.map((article, order) => <li key={article.slug} className="!m-0 list-none">
          <a href={localeHref(`/blog/${article.slug}`, locale)} aria-current={article.slug === slug ? "page" : undefined} className={article.slug === slug ? "font-bold" : undefined}>
            <span aria-hidden="true">{order + 1}. </span>{title(article)}{article.slug === slug && <span className="ml-2 text-xs">{L("（当前）", locale)}</span>}
          </a>
        </li>)}
      </ol>
      </details>
    </nav>
  );
}

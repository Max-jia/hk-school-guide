import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { clusterArticles, clusterCoreArticle, type BlogCluster } from "@/lib/blog-clusters";
import { L, localeHref, type Locale } from "@/lib/i18n";

function titleFor(entry: { title: string; scTitle?: string }, locale: Locale): string {
  return locale === "sc" && entry.scTitle ? entry.scTitle : L(entry.title, locale);
}

export default function BlogClusterPage({ cluster, locale }: { cluster: BlogCluster; locale: Locale }) {
  const core = clusterCoreArticle(cluster);
  const articles = clusterArticles(cluster).filter((entry) => entry.slug !== cluster.coreSlug);
  return (
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[960px] px-4 pb-24">
        <p className="pt-8 font-mono text-sm uppercase text-[var(--p-secondary)]">
          <a href={localeHref("/blog", locale)} className="text-[var(--p-secondary)] no-underline hover:underline">{L("择校文章", locale)}</a>
          {" · "}{L("专题", locale)}
        </p>
        <header className="max-w-[820px] border-b border-[var(--p-gray-300)] pb-7">
          <p className="mb-2 font-mono text-sm text-[var(--p-secondary)]">{L("择校专题", locale)} · {articles.length + (core ? 1 : 0)} {L("篇文章", locale)}</p>
          <h1 className="m-0 font-serif text-[clamp(32px,5vw,48px)] font-bold leading-tight text-[var(--p-fg)]">{L(cluster.title, locale)}</h1>
          <p className="mb-0 mt-4 text-base leading-relaxed text-[var(--p-secondary)] md:text-lg">{L(cluster.description, locale)}</p>
          <p className="mb-0 mt-4 rounded-lg bg-[var(--p-bg-yellow)] p-4 text-sm leading-relaxed text-[var(--p-fg)]">
            <strong>{L("适合你在这个阶段查看：", locale)}</strong>{L(cluster.intent, locale)}。
          </p>
        </header>

        {core && (
          <section className="mt-8" aria-labelledby="cluster-core-heading">
            <h2 id="cluster-core-heading" className="font-serif text-2xl font-bold text-[var(--p-fg)]">{L("先读核心指南", locale)}</h2>
            <a href={localeHref(`/blog/${core.slug}`, locale)} className="block rounded-xl border-2 border-[var(--p-fg)] p-5 text-[var(--p-fg)] no-underline hover:bg-[var(--p-bg-yellow)]">
              <h3 className="m-0 font-serif text-xl font-bold">{titleFor(core, locale)}</h3>
              <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(locale === "sc" && core.scTease ? core.scTease : core.tease, locale)}</p>
              <span className="mt-3 inline-block text-sm font-bold">{L("阅读核心指南", locale)} →</span>
            </a>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mt-9" aria-labelledby="cluster-supporting-heading">
            <h2 id="cluster-supporting-heading" className="font-serif text-2xl font-bold text-[var(--p-fg)]">{L("按具体问题继续", locale)}</h2>
            <ul className="grid gap-3 p-0 md:grid-cols-2">
              {articles.map((entry) => (
                <li key={entry.slug} className="list-none rounded-xl border border-[var(--p-gray-300)] p-4">
                  <a href={localeHref(`/blog/${entry.slug}`, locale)} className="font-semibold text-[var(--p-fg)] hover:underline">{titleFor(entry, locale)}</a>
                  <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(locale === "sc" && entry.scTease ? entry.scTease : entry.tease, locale)}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 border-t border-[var(--p-gray-300)] pt-5 text-sm text-[var(--p-secondary)]">
          {L("相关制度、收费和招生安排会按学年更新。涉及申请资格、日期或金额时，请打开文章核对资料日期，并以教育局及学校当届公告为准。", locale)}
        </p>
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}

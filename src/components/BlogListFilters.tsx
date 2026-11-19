"use client";

import { useMemo, useRef, useState } from "react";
import { localeHref, type Locale } from "@/lib/locale";
import type { BlogStage, BlogTopic } from "@/lib/blog-taxonomy";
import type { collectionSchema } from "@/lib/collection-schema";
import { useDirectoryData } from "@/lib/use-directory-data";
import type { BlogSearchRow } from "@/lib/blog-search-index";
import BlogClusterCardsView, { type ClusterCardsData } from "./BlogClusterCardsView";
import preparedData from "@/content/generated/blog-list-data.json";
import { normalizeSearch } from "@/lib/normalize-search";

export type BlogListEntry = {
  slug: string; title: string; tease: string; schemaName?: string;
  stage: BlogStage; topic: BlogTopic; updatedAt?: string;
  displayDate: string; sortDate: string;
};
type SharedCopy = {
  locale: Locale; copy: Record<string, string>;
  stageLabels: Record<BlogStage, string>; topicLabels: Record<BlogTopic, string>;
};
type CardProps = SharedCopy & { post: BlogListEntry; featured?: boolean };
type PreparedData = SharedCopy & {
  clusterCards: ClusterCardsData;
  posts: BlogListEntry[]; topicOrder: BlogTopic[];
  schemaBase: ReturnType<typeof collectionSchema>; searchAsset: { url: string; total: number };
};
const FEATURED = ["stcat-interview", "kg-subsidy-guide", "good-hope-primary-guide"];

function BlogCard({ post, locale, copy, stageLabels, topicLabels, featured = false }: CardProps) {
  const { stage, topic } = post;
  return (
    <li className="list-none">
      <a
        href={localeHref("/blog/" + post.slug, locale)}
        className="group block h-full rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4 no-underline transition-colors hover:bg-[var(--p-bg-yellow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)] md:p-5"
      >
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--p-secondary)]">
          <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{stageLabels[stage]}</span>
          <span>{topicLabels[topic]}</span>
          <span aria-hidden="true">·</span>
          <span>{post.updatedAt ? copy["更新"] : copy["发布"]} {post.displayDate}</span>
        </div>
        {featured ? (
          <h3 className="m-0 line-clamp-2 font-serif text-xl font-bold leading-snug text-[var(--p-fg)] group-hover:underline">{post.title}</h3>
        ) : (
          <h4 className="m-0 line-clamp-2 font-serif text-xl font-bold leading-snug text-[var(--p-fg)] group-hover:underline">{post.title}</h4>
        )}
        <p className="mb-0 mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--p-secondary)]">
          {post.tease}
        </p>
      </a>
    </li>
  );
}

export default function BlogListFilters({ locale }: { locale: Locale }) {
  // Data lives in a cacheable JS asset rather than being duplicated into route HTML.
  const { clusterCards, posts: POSTS, copy, stageLabels, topicLabels, topicOrder: BLOG_TOPIC_ORDER, schemaBase, searchAsset } = preparedData[locale] as Omit<PreparedData, "locale">;
  const queryVersion = useRef(0);
  const [stage, setStage] = useState<BlogStage | "all">("all");
  const [topic, setTopic] = useState<BlogTopic | "all">("all");
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const index = useDirectoryData<BlogSearchRow>(searchAsset, query);
  const searchIndex = useMemo(() => new Map(index.schools?.map(row => [row.slug, row])), [index.schools]);
  function searchArticles(value: string) {
    const version = ++queryVersion.current;
    setQuery(value);
    setSearch(normalizeSearch(value));
    if (!value.trim()) return;
    // Load only the small Traditional-to-Simplified search converter, on demand.
    void import("@/lib/blog-query-normalizer").then(({ normalizeBlogQuery }) => {
      if (version === queryVersion.current) setSearch(normalizeBlogQuery(value));
    }).catch(() => { /* Keep the basic search usable if the optional chunk fails. */ });
  }

  const list = useMemo(() => {
    const terms = search.split(" ").filter(Boolean);
    return POSTS.filter((post) => {
      if (stage !== "all" && post.stage !== stage && (stage === "new-arrivals" || post.stage !== "both")) return false;
      if (topic !== "all" && post.topic !== topic) return false;
      if (terms.length === 0 || !index.schools) return true;
      return terms.every((term) => (searchIndex.get(post.slug)?.searchText ?? "").includes(term));
    }).sort((a, b) => {
      if (terms.length && index.schools) {
        const aTitle = searchIndex.get(a.slug)?.searchTitle ?? "";
        const bTitle = searchIndex.get(b.slug)?.searchTitle ?? "";
        const aRank = Number(aTitle.includes(search));
        const bRank = Number(bTitle.includes(search));
        if (aRank !== bRank) return bRank - aRank;
      }
      return b.sortDate.localeCompare(a.sortDate);
    });
  }, [POSTS, stage, topic, search, searchIndex, index.schools]);

  const featured = FEATURED.map((slug) => POSTS.find((post) => post.slug === slug)).filter((post): post is BlogListEntry => Boolean(post));
  const hasFilter = stage !== "all" || topic !== "all" || query.trim().length > 0;
  const schema = { ...schemaBase, "@graph": schemaBase["@graph"].map((node) => node["@type"] === "ItemList" ? {
    ...node, numberOfItems: list.length,
    itemListElement: list.map((post, index) => ({ "@type": "ListItem", position: index + 1, name: post.schemaName ?? post.title, url: `https://hkschool.guide${localeHref(`/blog/${post.slug}`, locale)}` })),
  } : node) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <header className="max-w-[800px] py-8 md:py-12">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Blog · {copy["热文"]}</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            {copy["择校文章与入学指南"]}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--p-secondary)] md:text-lg">
            {copy["按幼稚园、小学、中学和家长眼前的问题找文章。先看申请、费用与学校比较，再核对文章注明的学年和资料来源。"]}
          </p>
        </header>

        <BlogClusterCardsView {...clusterCards} />

        {!hasFilter && (
          <section className="mb-10" aria-labelledby="blog-featured-heading">
            <div className="mb-4 flex items-baseline justify-between border-b border-[var(--p-gray-300)] pb-3">
              <h2 id="blog-featured-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">{copy["先看这几篇"]}</h2>
              <span className="text-sm text-[var(--p-secondary)]">{copy["近期核对资料"]}</span>
            </div>
            <ul className="grid gap-3 p-0 md:grid-cols-3">
              {featured.map((post) => <BlogCard key={post.slug} post={post} locale={locale} copy={copy} stageLabels={stageLabels} topicLabels={topicLabels} featured />)}
            </ul>
          </section>
        )}

        <section aria-labelledby="blog-all-heading">
          <div className="mb-5 border-b border-[var(--p-gray-300)] pb-3">
            <h2 id="blog-all-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">{copy["找你需要的文章"]}</h2>
          </div>

          <div className="mb-6 grid gap-5 rounded-xl bg-[var(--p-bg-yellow)] p-4 md:p-5">
            <div>
              <p className="mb-2 text-sm font-bold text-[var(--p-fg)]">{copy["孩子读哪个阶段？"]}</p>
              <div className="flex flex-wrap gap-2">
                {(["all", "kg", "primary", "secondary", "new-arrivals", "both"] as const).map((value) => (
                  <button key={value} type="button" aria-pressed={stage === value} onClick={() => setStage(value)}
                    className={"rounded-full border px-3 py-1.5 text-sm " + (stage === value ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] bg-[var(--p-bg)] text-[var(--p-fg)] hover:border-[var(--p-fg)]")}>
                    {value === "all" ? copy["全部"] : stageLabels[value]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-[var(--p-fg)]">{copy["现在想解决什么？"]}</p>
              <div className="flex flex-wrap gap-2">
                {(["all", ...BLOG_TOPIC_ORDER] as const).map((value) => (
                  <button key={value} type="button" aria-pressed={topic === value} onClick={() => setTopic(value)}
                    className={"rounded-full border px-3 py-1.5 text-sm " + (topic === value ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] bg-[var(--p-bg)] text-[var(--p-fg)] hover:border-[var(--p-fg)]")}>
                    {value === "all" ? copy["全部问题"] : topicLabels[value]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="blog-search" className="mb-2 block text-sm font-bold text-[var(--p-fg)]">{copy["按学校或关键词搜索"]}</label>
              <input id="blog-search" type="search" value={query} onChange={(event) => searchArticles(event.target.value)}
                placeholder={copy["例如：德望、K1 面试、学费"]}
                className="w-full rounded-lg border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2.5 text-base text-[var(--p-fg)] outline-none focus:border-[var(--p-fg)] md:max-w-[520px]" />
            </div>
          </div>

          {query.trim() && index.status !== "ready" && <p role="status" className="text-sm text-[var(--p-secondary)]">
            {index.status === "error" ? <>{copy["暂时未能搜索，请重试；文章仍可按分类浏览。"]} <button type="button" className="underline" onClick={() => void index.load()}>{copy["重试搜索"]}</button></> : copy["正在查找相关文章…"]}
          </p>}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--p-secondary)]" aria-live="polite">
            <p className="m-0">{copy["找到 {count} 篇文章"].replace("{count}", String(list.length))}</p>
            {hasFilter && <button type="button" onClick={() => { setStage("all"); setTopic("all"); searchArticles(""); }} className="font-bold text-[var(--p-fg)] underline underline-offset-4">{copy["清除筛选"]}</button>}
          </div>

          {list.length === 0 && <p className="rounded-xl border border-[var(--p-gray-300)] p-8 text-center text-[var(--p-secondary)]">{copy["没有找到匹配的文章。试试学校简称，或清除一项筛选。"]}</p>}
          <div className="space-y-10">
            {BLOG_TOPIC_ORDER.map((group) => {
              const items = list.filter((post) => post.topic === group && (hasFilter || !FEATURED.includes(post.slug)));
              if (items.length === 0) return null;
              const initial = hasFilter ? items : items.slice(0, 4);
              const remaining = hasFilter ? [] : items.slice(4);
              return (
                <section key={group} aria-labelledby={"blog-topic-" + group}>
                  <div className="mb-4 flex items-baseline gap-3 border-b border-[var(--p-gray-300)] pb-3">
                    <h3 id={"blog-topic-" + group} className="m-0 font-serif text-xl font-bold text-[var(--p-fg)] md:text-2xl">{topicLabels[group]}</h3>
                    <span className="text-sm text-[var(--p-secondary)]">{items.length}</span>
                  </div>
                  <ul className="grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
                    {initial.map((post) => <BlogCard key={post.slug} post={post} locale={locale} copy={copy} stageLabels={stageLabels} topicLabels={topicLabels} />)}
                  </ul>
                  {remaining.length > 0 && (
                    <details className="group mt-3 rounded-xl border border-[var(--p-gray-300)] p-4 open:bg-[var(--p-bg-yellow)]">
                      <summary className="cursor-pointer font-bold text-[var(--p-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">
                        <span className="group-open:hidden">{copy["查看其余 {count} 篇{topic}文章"].replace("{count}", String(remaining.length)).replace("{topic}", topicLabels[group])}</span>
                        <span className="hidden group-open:inline">{copy["收起{topic}文章"].replace("{topic}", topicLabels[group])}</span>
                      </summary>
                      <ul className="mt-4 grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
                        {remaining.map((post) => <BlogCard key={post.slug} post={post} locale={locale} copy={copy} stageLabels={stageLabels} topicLabels={topicLabels} />)}
                      </ul>
                    </details>
                  )}
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

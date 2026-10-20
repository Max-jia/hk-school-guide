"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import blogMeta from "@/content/blog-meta.json";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { toISODate } from "@/lib/seo";
import {
  blogStage, blogTopic, BLOG_STAGE_LABELS, BLOG_TOPIC_LABELS, BLOG_TOPIC_ORDER,
  type BlogStage, type BlogTopic,
} from "@/lib/blog-taxonomy";
import type { BlogMetaEntry } from "@/lib/blog";
import BlogClusterCards from "@/components/BlogClusterCards";

const POSTS = blogMeta as BlogMetaEntry[];
const FEATURED = ["stcat-interview", "kg-subsidy-guide", "good-hope-primary-guide"];
const SEARCH_HINTS: Record<string, string> = {
  "stcat-interview": "st cat stcat 聖嘉勒 九龍塘 九龙塘",
  "good-hope-primary-guide": "ghps good hope 牛池灣 牛池湾 黃大仙 黄大仙",
  "hkuga-primary": "hkuga 港同 柴灣 柴湾 東區 东区",
  "school-net-41-vs-12": "九龍塘 九龙塘 九龍城 九龙城 灣仔 湾仔 跑馬地 跑马地",
  "lh-kg": "learning habitat 學之園 学之园",
};

function normalize(value: string): string {
  return L(value, "sc").normalize("NFKC").toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, " ").replace(/\s+/g, " ").trim();
}

function displayDate(post: BlogMetaEntry): string {
  const iso = post.updatedAt ?? toISODate(post.date);
  if (!iso) return post.date;
  const [year, month, day] = iso.split("-");
  return year + "/" + Number(month) + "/" + Number(day);
}

function displayTitle(post: BlogMetaEntry, locale: Locale): string {
  return locale === "sc" && post.scTitle ? post.scTitle : L(post.title, locale);
}

function displayTease(post: BlogMetaEntry, locale: Locale): string {
  return locale === "sc" && post.scTease ? post.scTease : L(post.tease, locale);
}

function BlogCard({ post, locale, featured = false }: { post: BlogMetaEntry; locale: Locale; featured?: boolean }) {
  const stage = blogStage(post.slug);
  const topic = blogTopic(post.slug);
  return (
    <li className="list-none">
      <a
        href={localeHref("/blog/" + post.slug, locale)}
        className="group block h-full rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4 no-underline transition-colors hover:bg-[var(--p-bg-yellow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)] md:p-5"
      >
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-[var(--p-secondary)]">
          <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{L(BLOG_STAGE_LABELS[stage], locale)}</span>
          <span>{L(BLOG_TOPIC_LABELS[topic], locale)}</span>
          <span aria-hidden="true">·</span>
          <span>{post.updatedAt ? L("更新", locale) : L("发布", locale)} {displayDate(post)}</span>
        </div>
        {featured ? (
          <h3 className="m-0 line-clamp-2 font-serif text-xl font-bold leading-snug text-[var(--p-fg)] group-hover:underline">{displayTitle(post, locale)}</h3>
        ) : (
          <h4 className="m-0 line-clamp-2 font-serif text-xl font-bold leading-snug text-[var(--p-fg)] group-hover:underline">{displayTitle(post, locale)}</h4>
        )}
        <p className="mb-0 mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--p-secondary)]">
          {displayTease(post, locale)}
        </p>
      </a>
    </li>
  );
}

export default function BlogList({ locale = "tc" }: { locale?: Locale }) {
  const [stage, setStage] = useState<BlogStage | "all">("all");
  const [topic, setTopic] = useState<BlogTopic | "all">("all");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const search = normalize(query);
    const terms = search.split(" ").filter(Boolean);
    return POSTS.filter((post) => {
      if (stage !== "all" && blogStage(post.slug) !== stage && blogStage(post.slug) !== "both") return false;
      if (topic !== "all" && blogTopic(post.slug) !== topic) return false;
      if (terms.length === 0) return true;
      const haystack = normalize([
        post.title, post.scTitle, post.tease, post.scTease, post.tag, post.slug.replace(/-/g, " "), SEARCH_HINTS[post.slug],
        BLOG_STAGE_LABELS[blogStage(post.slug)], BLOG_TOPIC_LABELS[blogTopic(post.slug)],
      ].filter(Boolean).join(" "));
      return terms.every((term) => haystack.includes(term));
    }).sort((a, b) => {
      if (terms.length) {
        const aTitle = normalize([a.title, a.scTitle].filter(Boolean).join(" "));
        const bTitle = normalize([b.title, b.scTitle].filter(Boolean).join(" "));
        const aRank = Number(aTitle.includes(search));
        const bRank = Number(bTitle.includes(search));
        if (aRank !== bRank) return bRank - aRank;
      }
      return (b.updatedAt ?? toISODate(b.date)).localeCompare(a.updatedAt ?? toISODate(a.date));
    });
  }, [stage, topic, query]);

  const featured = FEATURED.map((slug) => POSTS.find((post) => post.slug === slug)).filter((post): post is BlogMetaEntry => Boolean(post));
  const hasFilter = stage !== "all" || topic !== "all" || query.trim().length > 0;

  return (
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[1280px] px-4 pb-24">
        <header className="max-w-[800px] py-8 md:py-12">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Blog · {L("热文", locale)}</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            {L("择校文章与入学指南", locale)}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[var(--p-secondary)] md:text-lg">
            {L("按小学、幼稚园和家长眼前的问题找文章。先看申请、费用与学校比较，再核对文章注明的学年和资料来源。", locale)}
          </p>
        </header>

        <BlogClusterCards locale={locale} />

        {!hasFilter && (
          <section className="mb-10" aria-labelledby="blog-featured-heading">
            <div className="mb-4 flex items-baseline justify-between border-b border-[var(--p-gray-300)] pb-3">
              <h2 id="blog-featured-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("先看这几篇", locale)}</h2>
              <span className="text-sm text-[var(--p-secondary)]">{L("近期核对资料", locale)}</span>
            </div>
            <ul className="grid gap-3 p-0 md:grid-cols-3">
              {featured.map((post) => <BlogCard key={post.slug} post={post} locale={locale} featured />)}
            </ul>
          </section>
        )}

        <section aria-labelledby="blog-all-heading">
          <div className="mb-5 border-b border-[var(--p-gray-300)] pb-3">
            <h2 id="blog-all-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">{L("找你需要的文章", locale)}</h2>
          </div>

          <div className="mb-6 grid gap-5 rounded-xl bg-[var(--p-bg-yellow)] p-4 md:p-5">
            <div>
              <p className="mb-2 text-sm font-bold text-[var(--p-fg)]">{L("孩子读哪个阶段？", locale)}</p>
              <div className="flex flex-wrap gap-2">
                {(["all", "kg", "primary", "both"] as const).map((value) => (
                  <button key={value} type="button" aria-pressed={stage === value} onClick={() => setStage(value)}
                    className={"rounded-full border px-3 py-1.5 text-sm " + (stage === value ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] bg-[var(--p-bg)] text-[var(--p-fg)] hover:border-[var(--p-fg)]")}>
                    {L(value === "all" ? "全部" : BLOG_STAGE_LABELS[value], locale)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-bold text-[var(--p-fg)]">{L("现在想解决什么？", locale)}</p>
              <div className="flex flex-wrap gap-2">
                {(["all", ...BLOG_TOPIC_ORDER] as const).map((value) => (
                  <button key={value} type="button" aria-pressed={topic === value} onClick={() => setTopic(value)}
                    className={"rounded-full border px-3 py-1.5 text-sm " + (topic === value ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]" : "border-[var(--p-gray-300)] bg-[var(--p-bg)] text-[var(--p-fg)] hover:border-[var(--p-fg)]")}>
                    {L(value === "all" ? "全部问题" : BLOG_TOPIC_LABELS[value], locale)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="blog-search" className="mb-2 block text-sm font-bold text-[var(--p-fg)]">{L("按学校或关键词搜索", locale)}</label>
              <input id="blog-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
                placeholder={L("例如：德望、K1 面试、学费", locale)}
                className="w-full rounded-lg border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2.5 text-base text-[var(--p-fg)] outline-none focus:border-[var(--p-fg)] md:max-w-[520px]" />
            </div>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-sm text-[var(--p-secondary)]" aria-live="polite">
            <p className="m-0">{L("找到 " + list.length + " 篇文章", locale)}</p>
            {hasFilter && <button type="button" onClick={() => { setStage("all"); setTopic("all"); setQuery(""); }} className="font-bold text-[var(--p-fg)] underline underline-offset-4">{L("清除筛选", locale)}</button>}
          </div>

          {list.length === 0 && <p className="rounded-xl border border-[var(--p-gray-300)] p-8 text-center text-[var(--p-secondary)]">{L("没有找到匹配的文章。试试学校简称，或清除一项筛选。", locale)}</p>}
          <div className="space-y-10">
            {BLOG_TOPIC_ORDER.map((group) => {
              const items = list.filter((post) => blogTopic(post.slug) === group && (hasFilter || !FEATURED.includes(post.slug)));
              if (items.length === 0) return null;
              const initial = hasFilter ? items : items.slice(0, 4);
              const remaining = hasFilter ? [] : items.slice(4);
              return (
                <section key={group} aria-labelledby={"blog-topic-" + group}>
                  <div className="mb-4 flex items-baseline gap-3 border-b border-[var(--p-gray-300)] pb-3">
                    <h3 id={"blog-topic-" + group} className="m-0 font-serif text-xl font-bold text-[var(--p-fg)] md:text-2xl">{L(BLOG_TOPIC_LABELS[group], locale)}</h3>
                    <span className="text-sm text-[var(--p-secondary)]">{items.length}</span>
                  </div>
                  <ul className="grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
                    {initial.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
                  </ul>
                  {remaining.length > 0 && (
                    <details className="group mt-3 rounded-xl border border-[var(--p-gray-300)] p-4 open:bg-[var(--p-bg-yellow)]">
                      <summary className="cursor-pointer font-bold text-[var(--p-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)]">
                        <span className="group-open:hidden">{L(`查看其余 ${remaining.length} 篇${BLOG_TOPIC_LABELS[group]}文章`, locale)}</span>
                        <span className="hidden group-open:inline">{L(`收起${BLOG_TOPIC_LABELS[group]}文章`, locale)}</span>
                      </summary>
                      <ul className="mt-4 grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
                        {remaining.map((post) => <BlogCard key={post.slug} post={post} locale={locale} />)}
                      </ul>
                    </details>
                  )}
                </section>
              );
            })}
          </div>
        </section>
      </div>
      <SiteFooter locale={locale} />
    </main>
  );
}

import { clusterCardsData } from "./blog-cluster-cards-data";
import blogMeta from "@/content/blog-meta.json";
import { L, type Locale } from "@/lib/i18n";
import { toISODate } from "@/lib/seo";
import { blogStage, blogTopic, BLOG_STAGE_LABELS, BLOG_TOPIC_LABELS, BLOG_TOPIC_ORDER } from "@/lib/blog-taxonomy";
import type { BlogMetaEntry } from "@/lib/blog";
import type { BlogListEntry } from "@/components/BlogListFilters";
import { collectionSchema } from "@/lib/collection-schema";
import searchAsset from "@/content/generated/blog-search-asset.json";

const POSTS = blogMeta as BlogMetaEntry[];
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

const COPY = [
  "热文",
  "择校文章与入学指南",
  "按幼稚园、小学、中学和家长眼前的问题找文章。先看申请、费用与学校比较，再核对文章注明的学年和资料来源。",
  "先看这几篇",
  "近期核对资料",
  "找你需要的文章",
  "孩子读哪个阶段？",
  "现在想解决什么？",
  "按学校或关键词搜索",
  "例如：德望、K1 面试、学费",
  "清除筛选",
  "没有找到匹配的文章。试试学校简称，或清除一项筛选。",
  "更新",
  "发布",
  "全部",
  "全部问题",
  "找到 {count} 篇文章",
  "查看其余 {count} 篇{topic}文章",
  "正在查找相关文章…",
  "暂时未能搜索，请重试；文章仍可按分类浏览。",
  "重试搜索",
  "收起{topic}文章"
];

// Localize and index once on the server. Filters receive ready-to-display values,
// not the converter dictionary, taxonomy source or full metadata archive.
export function blogListData(locale: Locale) {
  const posts: BlogListEntry[] = POSTS.map((post) => ({
    slug: post.slug, title: displayTitle(post, locale), tease: displayTease(post, locale),
    ...(L(displayTitle(post, locale), locale) !== displayTitle(post, locale) ? { schemaName: L(displayTitle(post, locale), locale) } : {}),
    stage: blogStage(post.slug), topic: blogTopic(post.slug), updatedAt: post.updatedAt,
    displayDate: displayDate(post), sortDate: post.updatedAt ?? toISODate(post.date),

  }));
  const copy = Object.fromEntries(COPY.map((text) => [text, L(text, locale)]));
  const stageLabels = Object.fromEntries(Object.entries(BLOG_STAGE_LABELS).map(([key, text]) => [key, L(text, locale)])) as typeof BLOG_STAGE_LABELS;
  const topicLabels = Object.fromEntries(Object.entries(BLOG_TOPIC_LABELS).map(([key, text]) => [key, L(text, locale)])) as typeof BLOG_TOPIC_LABELS;
  const schemaBase = collectionSchema({ path: "/blog", title: "擇校文章與入學指南", locale,
    breadcrumbs: [{ name: "首頁", path: "/" }, { name: "擇校文章", path: "/blog" }], items: [],
  });
  return { clusterCards: clusterCardsData(locale), posts, copy, stageLabels, topicLabels, topicOrder: BLOG_TOPIC_ORDER, schemaBase, searchAsset };
}

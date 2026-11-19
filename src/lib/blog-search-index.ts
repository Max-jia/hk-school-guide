import blogMeta from "@/content/blog-meta.json";
import { L } from "./i18n";
import { normalizeSearch } from "./normalize-search";
import { blogStage, blogTopic, BLOG_STAGE_LABELS, BLOG_TOPIC_LABELS } from "./blog-taxonomy";

export type BlogSearchRow = { slug: string; searchText: string; searchTitle: string };
const SEARCH_HINTS: Record<string, string> = {
  "stcat-interview": "st cat stcat 聖嘉勒 九龍塘 九龙塘",
  "good-hope-primary-guide": "ghps good hope 牛池灣 牛池湾 黃大仙 黄大仙",
  "hkuga-primary": "hkuga 港同 柴灣 柴湾 東區 东区",
  "school-net-41-vs-12": "九龍塘 九龙塘 九龍城 九龙城 灣仔 湾仔 跑馬地 跑马地",
  "lh-kg": "learning habitat 學之園 学之园",
};

function normalize(value: string): string {
  return normalizeSearch(L(value, "sc"));
}

export function blogSearchRows(): BlogSearchRow[] {
  return blogMeta.map((post) => ({
    slug: post.slug,
    searchText: normalize([
      post.title, post.scTitle, post.tease, post.scTease, post.tag, post.slug.replace(/-/g, " "), SEARCH_HINTS[post.slug],
      BLOG_STAGE_LABELS[blogStage(post.slug)], BLOG_TOPIC_LABELS[blogTopic(post.slug)],
    ].filter(Boolean).join(" ")),
    searchTitle: normalize([post.title, post.scTitle].filter(Boolean).join(" ")),
  }));
}

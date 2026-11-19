import { BLOG_CLUSTERS } from "./blog-clusters";
import { L, localeHref, type Locale } from "./i18n";
import type { ClusterCardsData } from "@/components/BlogClusterCardsView";

export function clusterCardsData(locale: Locale): ClusterCardsData {
  return {
    heading: L("按择校问题看专题", locale),
    description: L("查找术语可先看教育术语指南，也可按学段进入分类目录；入学流程、选校和费用另有专题。", locale),
    items: BLOG_CLUSTERS.map(cluster => ({
      slug: cluster.slug, title: L(cluster.title, locale), description: L(cluster.description, locale),
      href: localeHref(`/blog/topics/${cluster.slug}`, locale),
      label: L(cluster.kind === "series" ? `查看系列目录 · ${cluster.articleSlugs.length}篇` : "打开专题", locale),
    })),
  };
}

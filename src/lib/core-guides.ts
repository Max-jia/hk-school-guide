import catalog from "@/content/core-guides.json";
import blogMeta from "@/content/blog-meta.json";
import type { SchoolStage } from "./school-directory-pilot";
import type { BlogTopic } from "./blog-taxonomy";

export type CoreGuide = {
  id: string;
  stage: SchoolStage;
  slug: string;
  title: string;
  label: string;
  question: string;
  group: string;
  topic: BlogTopic;
};

export const CORE_GUIDES = catalog as CoreGuide[];
const registered = new Set(blogMeta.map((post) => post.slug));

/** Only registered, reviewed articles may appear in a public navigation module. */
export function coreGuidesForStage(stage: SchoolStage): CoreGuide[] {
  return CORE_GUIDES.filter((guide) => guide.stage === stage && registered.has(guide.slug));
}

export function coreGuideForArticle(slug: string): CoreGuide | undefined {
  return CORE_GUIDES.find((guide) => guide.slug === slug);
}

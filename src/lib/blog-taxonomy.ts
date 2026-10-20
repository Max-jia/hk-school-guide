export type BlogStage = "kg" | "primary" | "both";
export type BlogTopic = "admissions" | "fees" | "schools" | "comparison" | "practical";

// Editorial classification is explicit so a school name or a translated title
// cannot silently put an article in the wrong parent-facing filter.
const STAGES: Record<string, BlogStage> = {
  "true-light-primary-search": "primary",
  "munsang-kg-search": "kg",
  "soka-kg-search": "kg",
  "gt-primary-guide": "primary",
  "skh-same-name-schools": "primary",
  "psp-2026-guide": "primary",
  "lui-ming-choi-5-schools": "primary",
  "pooi-to-kg": "kg",
  "skh-kg": "kg",
  "lh-kg": "kg",
  "spcps-primary": "primary",
  "ling-liang-kg-search-2026": "kg",
  "hk-school-agency-red-flags": "both",
  "hk-school-net-diy-analysis": "primary",
  "kg-open-day-guide-2026": "kg",
  "hk-kg-k1-transparency-audit-2027-28": "kg",
  "hk-kg-k1-application-roadmap-2027-28": "kg",
  "hk-kg-interview-prep-guide-2027-28": "kg",
  "ma-on-shan-kg-2026": "kg",
  "hy-kg-search-2026": "kg",
  "hk-p1-admission-guide-2027": "primary",
  "school-net-41-vs-12": "primary",
  "plk-skh-kg-comparison": "kg",
  "n-class-guide": "kg",
  "kg-english-guide": "kg",
  "eduhk-jcps-guide": "primary",
  "good-hope-primary-guide": "primary",
  "kg-subsidy-guide": "kg",
  "rainstorm-class-guide": "both",
  "st-margaret-kg": "kg",
  "p1-scoring-guide": "primary",
  "st-margaret-primary": "primary",
  "net40-ranking": "primary",
  "funful-kg": "kg",
  "wellcome-kg": "kg",
  "zenith-kg": "kg",
  "cheungchau-kg": "kg",
  "hyps-primary": "primary",
  "dgs-primary": "primary",
  "lht-primary": "primary",
  "delia-primary": "primary",
  "mulberry-kg": "kg",
  "plk-camoes-primary": "primary",
  "hkuga-primary": "primary",
  "st-joseph-primary": "primary",
  "knocking-letter-guide": "primary",
  "talent-scheme-school-guide": "both",
  "trending-kindergartens-2026": "kg",
  "breakout-schools-2026": "primary",
  "primary-rankings-2026": "primary",
  "stcat-interview": "kg",
  "through-train-guide": "primary",
  "school-types-guide": "primary",
  "hot-schools-2026-07": "primary",
};

const TOPICS: Partial<Record<string, BlogTopic>> = {
  "hk-p1-admission-guide-2027": "admissions",
  "p1-scoring-guide": "admissions",
  "knocking-letter-guide": "admissions",
  "talent-scheme-school-guide": "admissions",
  "stcat-interview": "admissions",
  "kg-open-day-guide-2026": "admissions",
  "hk-kg-k1-transparency-audit-2027-28": "admissions",
  "hk-kg-k1-application-roadmap-2027-28": "admissions",
  "hk-kg-interview-prep-guide-2027-28": "admissions",
  "spcps-primary": "admissions",
  "kg-subsidy-guide": "fees",
  "good-hope-primary-guide": "fees",
  "lh-kg": "fees",
  "n-class-guide": "fees",
  "school-net-41-vs-12": "comparison",
  "plk-skh-kg-comparison": "comparison",
  "ma-on-shan-kg-2026": "comparison",
  "net40-ranking": "comparison",
  "primary-rankings-2026": "comparison",
  "through-train-guide": "comparison",
  "school-types-guide": "comparison",
  "trending-kindergartens-2026": "comparison",
  "cheungchau-kg": "comparison",
  "skh-same-name-schools": "comparison",
  "lui-ming-choi-5-schools": "comparison",
  "hot-schools-2026-07": "comparison",
  "breakout-schools-2026": "comparison",
  "psp-2026-guide": "practical",
  "hk-school-net-diy-analysis": "practical",
  "hk-school-agency-red-flags": "practical",
  "rainstorm-class-guide": "practical",
  "kg-english-guide": "practical",
};

export function blogStage(slug: string): BlogStage {
  return STAGES[slug] ?? "both";
}

export function blogTopic(slug: string): BlogTopic {
  return TOPICS[slug] ?? "schools";
}

export const BLOG_STAGE_LABELS: Record<BlogStage, string> = {
  kg: "幼稚园",
  primary: "小学",
  both: "综合",
};

export const BLOG_TOPIC_LABELS: Record<BlogTopic, string> = {
  admissions: "入学申请",
  fees: "学费资助",
  schools: "学校观察",
  comparison: "选校比较",
  practical: "实用指南",
};

export const BLOG_TOPIC_ORDER: BlogTopic[] = [
  "admissions", "fees", "comparison", "schools", "practical",
];

import blogMeta from "@/content/blog-meta.json";
import type { BlogMetaEntry } from "@/lib/blog";

export type BlogCluster = {
  slug: string;
  kind?: "series";
  title: string;
  description: string;
  intent: string;
  coreSlug: string;
  articleSlugs: string[];
};

/** Editorial topic hubs. Keep membership deliberate; broad category labels are not a substitute for a cluster. */
export const BLOG_CLUSTERS: BlogCluster[] = [
  {
    slug: "kg-system",
    "kind": "series",
    "title": "香港幼稚园制度与入学：三篇系列",
    "description": "从班级与资助开始，逐步了解报名、面试、注册和升小衔接。每篇集中回答一个阶段的问题，并列出家长下一步可做的事。",
    "intent": "希望系统了解香港幼稚园，并结合未来生活地点、课程和预算做准备的内地来港家庭",
    "coreSlug": "hk-kg-system-1",
    "articleSlugs": [
      "hk-kg-system-1",
      "hk-kg-system-2",
      "hk-kg-system-3"
    ]
  },
  {
    slug: "primary-system",
    "kind": "series",
    "title": "香港小学制度与入学：三篇系列",
    "description": "从学校类别与家庭路线开始，逐步了解小一申请、派位、入学适应和升中。每篇集中回答一个阶段的问题，并列出家长下一步可做的事。",
    "intent": "希望系统了解香港小学，并结合未来生活地点、课程和预算做准备的内地来港家庭",
    "coreSlug": "hk-primary-system-1",
    "articleSlugs": [
      "hk-primary-system-1",
      "hk-primary-system-2",
      "hk-primary-system-3"
    ]
  },
  {
    slug: "primary-admission",
    title: "小一派位与入学申请",
    description: "按申请阶段看懂小一派位：先确认制度与计分，再比较学校类别，最后准备放榜后的后备行动。每年日期和个别学校收生规则都要以当届公告复核。",
    intent: "准备申请、正在选校，或需要为派位结果预留后路的家庭",
    coreSlug: "hk-p1-admission-guide-2027",
    articleSlugs: ["hk-p1-admission-guide-2027", "p1-scoring-guide", "school-types-guide", "p1-offer-registration-guide", "primary-interview-guide", "knocking-letter-guide", "primary-transfer-guide", "talent-scheme-school-guide"],
  },
  {
    slug: "primary-school-net",
    title: "小学选校与校网判断",
    description: "把住址、校网、学校名单和竞争情况放在同一张决策图里。校网是筛选条件之一，不等于录取概率；跨网、借地址和排名数据都要看清适用边界。",
    intent: "正在按地区缩小小学名单，或比较不同校网的家庭",
    coreSlug: "hk-school-net-diy-analysis",
    articleSlugs: ["hk-school-net-diy-analysis", "school-net-41-vs-12", "net40-ranking", "psp-2026-guide", "primary-rankings-2026"],
  },
  {
    slug: "primary-school-profiles",
    title: "小学选择、学习与升中",
    description: "先用综合文章建立比较框架，再按学校专题核对课程、收费、收生和升学安排。单校文章不是排名；招生条件、学费和升学数据须按当届校方资料复核。",
    intent: "已经有目标学校名单，想比较具体学校特点、成本和升学路径的家庭",
    coreSlug: "school-types-guide",
    articleSlugs: ["school-types-guide", "primary-school-learning-guide", "primary-transfer-guide", "through-train-guide", "breakout-schools-2026", "true-light-primary-search", "gt-primary-guide", "spcps-primary", "eduhk-jcps-guide", "good-hope-primary-guide", "hyps-primary", "dgs-primary", "lht-primary", "plk-camoes-primary", "hkuga-primary", "st-joseph-primary", "st-margaret-primary", "delia-primary"],
  },
  {
    slug: "kindergarten-interviews",
    title: "幼稚园面试专题",
    description: "查找50所幼稚园的面试文章，了解已公开的申请安排、往年面见经验和家庭准备。不同校舍、学年与年级的资料不应混用。",
    intent: "准备幼稚园申请、想了解个别学校面见形式的家庭",
    coreSlug: "hk-kg-interview-prep-guide-2027-28",
    articleSlugs: [
    "victoria-ocean-pride-kg-interview-guide",
    "learning-habitat-hampton-loft-kg-interview-guide",
    "topkids-yuen-long-kg-interview-guide",
    "plk-tam-au-yeung-siu-fong-kg-interview-guide",
    "good-health-tsing-yi-south-kg-interview-guide",
    "yew-chung-somerset-kg-interview-guide",
    "think-laguna-city-kg-interview-guide",
    "tutor-time-kowloon-tong-kg-interview-guide",
    "christian-youth-centre-kg-interview-guide",
    "st-margaret-mary-kg-interview-guide",
    "immaculate-heart-mary-kg-interview-guide",
    "st-nicholas-kg-interview-guide",
    "luk-yeung-kg-interview-guide",
    "ming-wai-north-point-kg-interview-guide",
    "st-pauls-church-kg-interview-guide",
    "creative-primary-school-kg-interview-guide",
    "hk-true-light-tai-hang-kg-interview-guide",
    "st-stephens-girls-kg-interview-guide",
    "kowloon-ling-liang-kg-interview-guide",
    "raimondi-kg-interview-guide",
    "precious-blood-happy-valley-kg-interview-guide",
    "kowloon-city-baptist-kg-interview-guide",
    "holy-trinity-centre-kg-interview-guide",
    "creative-kowloon-tong-kg-interview-guide",
    "kiangsu-chekiang-kg-interview-guide",
    "cckg-interview-guide",
    "york-klt-kg-interview-guide",
    "pooi-to-kg-interview-guide",
    "tsung-tsin-kg-interview-guide",
    "tak-sun-kg-interview-guide",
    "kowloon-rhenish-kg-interview-guide",
    "st-rose-of-lima-kg-interview-guide",
    "soka-kg-interview-guide",
    "heep-yunn-kg-interview-guide",
    "kowloon-true-light-kg-interview-guide",
    "alliance-kg-interview-guide",
    "keen-mind-kg-interview-guide",
    "kau-yan-kg-interview-guide",
    "skh-kg-interview-guide",
    "good-hope-kg-interview-guide",
    "pui-ching-kg-interview-guide",
    "learning-habitat-chatham-lv-kg-interview-guide",
    "braemar-hill-kg-interview-guide",
    "cannan-kowloon-tong-kg-interview-guide",
    "st-pauls-kg-interview-guide",
    "hong-kong-ling-liang-kg-interview-guide",
    "victoria-south-horizons-kg-interview-guide",
    "munsang-kg-interview-guide",
    "yau-yat-chuen-interview-guide",
    "stcat-interview"
],
  },
  {
    slug: "kindergarten-admission",
    title: "幼稚园申请与面试准备",
    description: "按申请资格、学校身份、文件与校本流程、面见、注册和候补后备逐步准备。教育局安排与学校报名程序并不相同；每届日期及个别要求都要以当届公告复核。",
    intent: "准备报读 K1、比较学校申请要求，或为面试做准备的家庭",
    coreSlug: "hk-kg-k1-application-roadmap-2027-28",
    articleSlugs: ["hk-kg-k1-application-roadmap-2027-28", "hk-kg-interview-prep-guide-2027-28", "kg-open-day-guide-2026", "hk-kg-k1-transparency-audit-2027-28", "stcat-interview", "kg-english-guide", "kg-waitlist-transfer-guide"],
  },
  {
    slug: "kindergarten-selection",
    title: "幼稚园比较与升小衔接",
    description: "不只看热度或校名，比较课程、语言、收费、照顾安排与升小路径。个别学校的公开数据和家庭体验要分开读，联系或衔接也不等于保证升读。",
    intent: "在几所幼稚园之间取舍，或想判断幼稚园特点是否适合孩子的家庭",
    coreSlug: "kg-school-types-guide",
    articleSlugs: ["kg-school-types-guide", "kg-school-hours-care-guide", "kg-english-guide", "kg-primary-outcomes-guide", "kg-open-day-guide-2026", "trending-kindergartens-2026", "plk-skh-kg-comparison", "ma-on-shan-kg-2026", "cheungchau-kg", "munsang-kg-search", "soka-kg-search", "pooi-to-kg", "skh-kg", "lh-kg"],
  },
  {
    slug: "kindergarten-fees-support",
    title: "幼稚园学费与资助预算",
    description: "区分幼稚园教育计划、学费减免、就学开支津贴与幼儿中心支援，再把校方收费、杂费与家庭现金流逐项核对。N班能否获得支援，要看服务及家庭资格。",
    intent: "需要估算幼稚园实际支出，或想了解资助资格与申请时间的家庭",
    coreSlug: "kg-subsidy-guide",
    articleSlugs: ["kg-subsidy-guide", "kg-school-hours-care-guide", "n-class-guide", "lh-kg", "wellcome-kg", "funful-kg", "zenith-kg", "mulberry-kg"],
  },
  {
    slug: "secondary-admission",
    title: "升中申请、派位与直资取舍",
    description: "从2027/28升中总流程，进入自行两校、统一派位、直资offer与叩门插班。分别核对文件、时限及后备安排，校本日期和空缺以当届公告为准。",
    intent: "正在准备升中申请、比较offer，或需要叩门与转校安排的家庭",
    coreSlug: "secondary-admission-guide",
    articleSlugs: ["secondary-admission-guide", "secondary-discretionary-guide", "secondary-central-allocation-guide", "secondary-dss-offer-guide", "secondary-transfer-guide", "secondary-new-arrival-guide", "through-train-guide"],
  },
  {
    slug: "secondary-selection",
    title: "中学选校与家庭条件",
    description: "分清孩子派位组别与学校非官方Banding，再看逐科语言、六年成本和可用支援。名气和考试成绩要与孩子实际学习条件一起判断。",
    intent: "正在缩小中学名单、比较语言与预算，或安排新来港入学的家庭",
    coreSlug: "secondary-banding-guide",
    articleSlugs: ["secondary-banding-guide", "secondary-language-guide", "secondary-school-cost-guide", "secondary-new-arrival-guide", "secondary-admission-guide"],
  },
  {
    slug: "secondary-curriculum",
    title: "中学课程、成绩与选科",
    description: "读懂DSE和升学数字，再比较DSE、IB与A-Level的课程、中文及转轨代价。中三选科从学校实际开科、孩子能力和大学先修条件一起考虑。",
    intent: "想比较高中路线、审读学校成绩，或准备中三选科的家庭",
    coreSlug: "secondary-curriculum-pathways-guide",
    articleSlugs: ["secondary-curriculum-pathways-guide", "secondary-results-guide", "secondary-subject-choice-guide", "secondary-language-guide", "secondary-transfer-guide", "secondary-school-cost-guide"],
  },
];

const META = blogMeta as BlogMetaEntry[];

export function getBlogCluster(slug: string): BlogCluster | undefined {
  return BLOG_CLUSTERS.find((cluster) => cluster.slug === slug);
}

export function blogClustersForArticle(articleSlug: string): BlogCluster[] {
  return BLOG_CLUSTERS.filter((cluster) => cluster.articleSlugs.includes(articleSlug));
}

export function clusterArticles(cluster: BlogCluster): BlogMetaEntry[] {
  return cluster.articleSlugs
    .map((slug) => META.find((entry) => entry.slug === slug))
    .filter((entry): entry is BlogMetaEntry => Boolean(entry));
}

export function clusterCoreArticle(cluster: BlogCluster): BlogMetaEntry | undefined {
  return META.find((entry) => entry.slug === cluster.coreSlug);
}


import blogMeta from "@/content/blog-meta.json";
import allocationHistory from "@/content/p1-allocation-history.json";
import Localize from "@/components/Localize";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { REPORT_COUNT } from "@/lib/report-count";

type Story = {
  id: string;
  month: string;
  title: string;
  tease: string;
  img: string;
  href: string;
  bg: string;
  filter: string;
};

function allocationChoiceSummary(net: number): string {
  const row = allocationHistory.netResultsByYear["2025"].find((item) => item.net === net);
  if (!row) throw new Error(`Missing official 2025 allocation results for net ${net}`);
  const partB = row.homeNetTop3 + row.homeNet4to10 + row.homeNetBeyond10;
  const percent = ((row.homeNetTop3 / partB) * 100).toFixed(1);
  return `${net}网${row.homeNetTop3}/${partB}人（${percent}%）`;
}

const netComparisonTease = `2025年乙部获派前三：${allocationChoiceSummary(41)}，${allocationChoiceSummary(12)}。再按孩子能填的学校和接送安排比较。`;

const STORIES: Story[] = [
  {
    id: "#S-01",
    month: "全文开放",
    title: "寶山幼兒園",
    tease: "核对寶山的课程与申请安排，比较孩子的学习需要、家庭预算和接送。",
    img: "/shots/2025_04_birthday-effect.jpg",
    href: "/reports/braemar-hill",
    bg: "var(--p-bg-green)",
    filter: "报告",
  },
  {
    id: "#S-02",
    month: "全文开放",
    title: "拔萃女小學",
    tease: "小一怎样申请、费用怎样算？再了解学校课程与升中安排。",
    img: "/shots/2025_03_language.jpg",
    href: "/reports/dgjs",
    bg: "var(--p-bg-blue)",
    filter: "报告",
  },
  {
    id: "#S-03",
    month: "深度报告",
    title: "圣保禄学校（小学部）",
    tease: "查看课程、收费和小一申请，分清小学录取与后续升中条件。",
    img: "/shots/2025_02_middle-school.jpg",
    href: "/reports/spcs",
    bg: "var(--p-bg-red)",
    filter: "报告",
  },
  {
    id: "#S-04",
    month: "深度报告",
    title: "拔萃男书院附属小学",
    tease: "从小一申请看课程与升中安排，再核对家庭投入及实际入读条件。",
    img: "/shots/2025_11_democracy.jpg",
    href: "/reports/dbs",
    bg: "var(--p-bg-blue)",
    filter: "报告",
  },
  {
    id: "#S-05",
    month: "深度报告",
    title: "玛利诺修院学校（小学部）",
    tease: "41校网资助女校，直属玛利诺修院学校中学部。升中时须核当届资格与学额。",
    img: "/shots/2025_05_aapi-casting.jpg",
    href: "/reports/mcs",
    bg: "var(--p-bg-purple)",
    filter: "报告",
  },
  {
    id: "#S-06",
    month: "深度报告",
    title: "喇沙小学",
    tease: "41校网资助男校，直属喇沙书院。比较小一申请、课堂安排和升中条件。",
    img: "/shots/2025_06_hello-stranger.jpg",
    href: "/reports/lsps",
    bg: "var(--p-bg-yellow)",
    filter: "报告",
  },
  {
    id: "#H-01",
    month: "8 月",
    title: "深水埗40网，小学怎样选？",
    tease: "先看20所官津小学，再比较升中联系和另行报名的直资学校。",
    img: "/shots/2026_02_happy-map.jpg",
    href: "/blog/net40-ranking",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-02",
    month: "8 月",
    title: "自行分配学位计分制，逐项拆解",
    tease: "首名子女 5 分、宗教 5 分、校友 10 分……一张表看懂怎么计分。",
    img: "/shots/2025_04_music-dna.jpg",
    href: "/blog/p1-scoring-guide",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-03",
    month: "7 月",
    title: "叩门信怎么写",
    tease: "说明孩子的具体情况、入读意愿和需要补交的资料，申请前核学校收表安排。",
    img: "/shots/2026_07_essential-words.jpg",
    href: "/blog/knocking-letter-guide",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-04",
    month: "7 月",
    title: "高才通子女插班全攻略",
    tease: "直资私立怎么选、申请时间表、语言门槛，一步步走完不踩坑。",
    img: "/shots/2024_11_sitters-standers.jpg",
    href: "/blog/talent-scheme-school-guide",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-05",
    month: "6 月",
    title: "一条龙、直属、联系，到底差在哪",
    tease: "分别了解直升与保留学额的适用条件，再看孩子具有什么资格。",
    img: "/shots/2026_05_similes.jpg",
    href: "/blog/through-train-guide",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-06",
    month: "6 月",
    title: "41 校网 vs 12 校网",
    tease: netComparisonTease,
    img: "/shots/2026_05_kpop-generations.jpg",
    href: "/blog/school-net-41-vs-12",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
];

const REPORTS = STORIES.filter((s) => s.filter === "报告");
const BLOGS = STORIES.filter((s) => s.filter === "热文");

// 热文卡右上角日期从 blog-meta 自动读，不再手写月份
type BlogMetaDate = { slug: string; date: string };
const dateMap: Record<string, string> = Object.fromEntries(
  (blogMeta as BlogMetaDate[]).map((m) => ["/blog/" + m.slug, m.date]),
);

function SectionHeader({
  index,
  title,
  href,
  linkLabel,
  locale = "tc",
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
  locale?: Locale;
}) {
  return (
    <Localize locale={locale}>
    <div className="mb-2 flex items-baseline justify-between border-b-2 border-[var(--p-gray-200)] px-4 pb-4">
      <h2 className="m-0 font-mono text-base font-bold uppercase tracking-wide text-[var(--p-fg)] md:text-xl">
        <span className="mr-3 text-[var(--p-secondary)]">{index}</span>
        {title}
      </h2>
      {href && linkLabel && (
        <a
          href={href}
          className="py-2 font-sans text-base font-bold text-[var(--p-fg)] no-underline hover:underline md:text-lg"
        >
          {linkLabel} →
        </a>
      )}
    </div>
    </Localize>
  );
}

function StoryCard({ s, locale = "tc" }: { s: Story; locale?: Locale }) {
  return (
    <Localize locale={locale}>
    <article className="story" style={{ "--story-bg": s.bg } as React.CSSProperties}>
      <div className="mb-2 flex items-center justify-between font-mono transition-transform duration-100 hover:-translate-y-1">
        <p className="rounded-full border border-[var(--p-fg)] p-1 px-2 text-sm uppercase">
          {s.filter} {s.id}
        </p>
        {s.filter === "报告" ? (
          <p className="rounded-full bg-[var(--p-green)] p-1 px-3 text-sm font-bold text-[var(--p-gray-900)]">
            全文开放
          </p>
        ) : s.filter === "工具" ? (
          <p className="rounded-full bg-[var(--p-green)] p-1 px-3 text-sm font-bold text-[var(--p-gray-900)]">
            开始使用 →
          </p>
        ) : (
          <p className="text-sm uppercase">{dateMap[s.href] ?? s.month}</p>
        )}
      </div>
      <a
        href={localeHref(s.href, locale)}
        className="block cursor-pointer no-underline"
      >
        <div className="relative aspect-square overflow-hidden bg-[var(--story-bg)]">
          <img
            src={s.img}
            alt={L(s.title, locale)}
            loading="lazy"
            className="absolute bottom-0 left-1/2 aspect-[6/7] w-[calc(100%-var(--padding)*2)] -translate-x-1/2 object-cover transition-transform duration-100 hover:scale-105"
          />
        </div>
        <div className="mt-3 font-sans">
          <h3 className="text-[clamp(26px,6vw,30px)] leading-[1.1] tracking-[-.8px] text-[var(--p-fg)]">
            {s.title}
          </h3>
          <p className="mt-2 text-sm leading-snug text-[var(--p-secondary)]">{s.tease}</p>
        </div>
      </a>
    </article>
    </Localize>
  );
}

function CardList({
  stories,
  locale = "tc",
}: {
  stories: Story[];
  locale?: Locale;
}) {
  return (
    <Localize locale={locale}>
    <ul className="m-0 flex flex-wrap p-0">
      {stories.map((s) => (
        <li
          key={s.id}
          className="w-full list-none px-4 py-8 [--padding:clamp(16px,12vw,48px)] md:w-1/2 md:[--padding:clamp(16px,6vw,48px)] lg:w-1/3 lg:[--padding:clamp(24px,4vw,56px)]"
        >
          <StoryCard s={s} locale={locale} />
        </li>
      ))}
    </ul>
    </Localize>
  );
}

export default function StoryGrid({ locale = "tc" }: { locale?: Locale }) {
  return (
    <Localize locale={locale}>
    <div className="relative">
      <section className="mt-8">
        <SectionHeader
          index="05"
          title="精选报告"
          href={localeHref("/reports", locale)}
          linkLabel={`查看全部 ${REPORT_COUNT} 份`}
          locale={locale}
        />
        <CardList stories={REPORTS} locale={locale} />
      </section>

      <section className="mt-8 bg-[var(--p-band-blog)] py-6 md:py-10">
        <SectionHeader
          index="06"
          title="热文阅读"
          href={localeHref("/blog", locale)}
          linkLabel={`查看全部 ${blogMeta.length} 篇`}
          locale={locale}
        />
        <CardList stories={BLOGS} locale={locale} />
        {/* 原 promo 黑条降级：热文区底部一行小字（避免首屏双黑块竞争） */}
        <p className="mt-2 px-4 pb-8 text-center text-sm text-[var(--p-secondary)]">
          准备小一选校，先了解计分及派位规则 ·{" "}
          <a
            href={localeHref("/blog/p1-scoring-guide", locale)}
            className="inline-block py-2 -my-2 font-mono text-sm font-bold text-[var(--p-fg)] no-underline hover:underline"
          >
            计分制逐项拆解 →
          </a>
        </p>
      </section>
    </div>
    </Localize>
  );
}

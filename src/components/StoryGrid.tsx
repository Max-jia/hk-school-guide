
import blogMeta from "@/content/blog-meta.json";

type Story = {
  id: string;
  month: string;
  title: string;
  tease: string;
  img: string;
  href: string;
  bg: string;
  filter: string;
  free?: boolean;
};

const STORIES: Story[] = [
  {
    id: "#S-01",
    month: "免费试读",
    title: "寶山幼兒園",
    tease: "40 校网名幼，联系学位与收生数据全公开，全文免费读。",
    img: "/shots/2025_04_birthday-effect.jpg",
    href: "/reports/braemar-hill",
    bg: "var(--p-bg-green)",
    filter: "报告",
    free: true,
  },
  {
    id: "#S-02",
    month: "免费试读",
    title: "拔萃女小學",
    tease: "女拔小，直资一条龙，DSE 女校标杆，全文免费读。",
    img: "/shots/2025_03_language.jpg",
    href: "/reports/dgjs",
    bg: "var(--p-bg-blue)",
    filter: "报告",
    free: true,
  },
  {
    id: "#S-03",
    month: "深度报告",
    title: "圣保禄学校（小学部）",
    tease: "A+ 级私立女校，1864 年创校，英文教学，一条龙直升联系中学。",
    img: "/shots/2025_02_middle-school.jpg",
    href: "/reports/spcs",
    bg: "var(--p-bg-red)",
    filter: "报告",
  },
  {
    id: "#S-04",
    month: "深度报告",
    title: "拔萃男书院附属小学",
    tease: "九龙一条龙男校小学部：直资、直升中学，IB+DSE 双轨，运动与学业并重。",
    img: "/shots/2025_11_democracy.jpg",
    href: "/reports/dbs",
    bg: "var(--p-bg-blue)",
    filter: "报告",
  },
  {
    id: "#S-05",
    month: "深度报告",
    title: "玛利诺修院学校（小学部）",
    tease: "41 校网英文学校小学部：联系小学 + 直属学位双重保障，收生数据全公开。",
    img: "/shots/2025_05_aapi-casting.jpg",
    href: "/reports/mcs",
    bg: "var(--p-bg-purple)",
    filter: "报告",
  },
  {
    id: "#S-06",
    month: "深度报告",
    title: "喇沙小学",
    tease: "48 校网官津名校小学部：联系中学喇沙书院，学费全免，成绩稳定前列。",
    img: "/shots/2025_06_hello-stranger.jpg",
    href: "/reports/lsps",
    bg: "var(--p-bg-yellow)",
    filter: "报告",
  },
  {
    id: "#H-01",
    month: "8 月",
    title: "40 校网，到底有多强？",
    tease: "九龙城名校密度全港第一，官津直资私立一条街集齐，数据一次算清。",
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
    tease: "派位没中？7 月叩门是最后机会，附完整模板与学校偏好分析。",
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
    tease: "升中保障排序：一条龙 > 直属 > 联系，用图讲清三者的实际差别。",
    img: "/shots/2026_05_similes.jpg",
    href: "/blog/through-train-guide",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
  {
    id: "#H-06",
    month: "6 月",
    title: "41 校网 vs 12 校网",
    tease: "41 网首三志愿获派率 79.6% 全港第三,12 网 70.4%——但 41 网首志愿命中率全港最低。名单、派位数据、边界陷阱一次讲清。",
    img: "/shots/2026_05_kpop-generations.jpg",
    href: "/blog/school-net-41-vs-12",
    bg: "var(--p-gray-100)",
    filter: "热文",
  },
];

const REPORTS = STORIES.filter((s) => s.filter === "报告");
const BLOGS = STORIES.filter((s) => s.filter === "热文");

// 热文卡右上角日期从 blog-meta 自动读，不再手写月份
const dateMap: Record<string, string> = Object.fromEntries(
  (blogMeta as any[]).map((m) => ["/blog/" + m.slug, m.date]),
);

function SectionHeader({
  index,
  title,
  href,
  linkLabel,
}: {
  index: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
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
  );
}

function StoryCard({ s, showPrice }: { s: Story; showPrice?: boolean }) {
  return (
    <article className="story" style={{ "--story-bg": s.bg } as React.CSSProperties}>
      <div className="mb-2 flex items-center justify-between font-mono transition-transform duration-100 hover:-translate-y-1">
        <p className="rounded-full border border-[var(--p-fg)] p-1 px-2 text-sm uppercase">
          {s.filter} {s.id}
        </p>
        {s.free ? (
          <p className="rounded-full bg-[var(--p-green)] p-1 px-3 text-sm font-bold text-[var(--p-gray-900)]">
            免费试读
          </p>
        ) : s.filter === "工具" ? (
          <p className="rounded-full bg-[var(--p-green)] p-1 px-3 text-sm font-bold text-[var(--p-gray-900)]">
            开始使用 →
          </p>
        ) : showPrice ? (
          <p className="rounded-full bg-[var(--p-fg)] p-1 px-3 text-sm font-bold text-[var(--p-bg)]">
            HK$9.9
          </p>
        ) : (
          <p className="text-sm uppercase">{dateMap[s.href] ?? s.month}</p>
        )}
      </div>
      <a
        href={s.href}
        className="block cursor-pointer no-underline"
      >
        <div className="relative aspect-square overflow-hidden bg-[var(--story-bg)]">
          <img
            src={s.img}
            alt={s.title}
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
  );
}

function CardList({ stories, showPrice }: { stories: Story[]; showPrice?: boolean }) {
  return (
    <ul className="m-0 flex flex-wrap p-0">
      {stories.map((s) => (
        <li
          key={s.id}
          className="w-full list-none px-4 py-8 [--padding:clamp(16px,12vw,48px)] md:w-1/2 md:[--padding:clamp(16px,6vw,48px)] lg:w-1/3 lg:[--padding:clamp(24px,4vw,56px)]"
        >
          <StoryCard s={s} showPrice={showPrice} />
        </li>
      ))}
    </ul>
  );
}

export default function StoryGrid() {
  return (
    <div className="relative">
      <section className="mt-8">
        <SectionHeader index="01" title="精选报告" href="/reports" linkLabel="查看全部 126 份" />
        <CardList stories={REPORTS} showPrice />
      </section>

      <section className="mt-8 bg-[var(--p-band-blog)] py-6 md:py-10">
        <SectionHeader index="02" title="热文阅读" href="/blog" linkLabel="查看全部 33 篇" />
        <CardList stories={BLOGS} />
        {/* 原 promo 黑条降级：热文区底部一行小字（避免首屏双黑块竞争） */}
        <p className="mt-2 px-4 pb-8 text-center text-sm text-[var(--p-secondary)]">
          2026-27 学年自行分配学位申请即将开始 ·{" "}
          <a
            href="/blog/p1-scoring-guide"
            className="inline-block py-2 -my-2 font-mono text-sm font-bold text-[var(--p-fg)] no-underline hover:underline"
          >
            计分制逐项拆解 →
          </a>
        </p>
      </section>
    </div>
  );
}

import StoryGrid from "@/components/StoryGrid";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/seo";

const webJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "港学荟",
  alternateName: "香港升学择校平台",
  url: SITE_URL,
  description:
    "把香港教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
};

export default function Home() {
  return (
    <main className="w-full">
      <h1 className="sr-only">港学荟 · 香港择校数据与学校报告</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd) }} />
      {/* header（原站：tagline + wordmark 旋转 + 贴纸按钮 + menu 面板） */}
      <SiteHeader />

      {/* 双入口分流卡（线上站布局：有心仪学校 → 报告；还在纠结 → 匹配） */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/reports"
            className="block -rotate-1 bg-[var(--p-bg-yellow)] p-8 no-underline transition-transform duration-100 hover:rotate-0 hover:scale-[1.01] md:p-10"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-[var(--p-gray-700)]">
              有心仪的学校？
            </p>
            <h2 className="mt-2 font-serif text-[clamp(24px,3vw,34px)] font-bold leading-tight text-[var(--p-gray-900)]">
              已经有心仪的学校
            </h2>
            <p className="mt-3 text-[15px] font-medium text-[var(--p-gray-700)]">
              直接查这所学校的深度报告，收生数据、学费、面试一次讲透。
            </p>
            <span className="mt-6 inline-block font-mono text-sm font-bold text-[var(--p-gray-900)]">
              浏览全部 126 份报告 →
            </span>
          </a>
          <a
            href="/tools"
            className="block rotate-1 bg-[var(--p-bg-purple)] p-8 no-underline transition-transform duration-100 hover:rotate-0 hover:scale-[1.01] md:p-10"
          >
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-[var(--p-gray-700)]">
              还没想好？
            </p>
            <h2 className="mt-2 font-serif text-[clamp(24px,3vw,34px)] font-bold leading-tight text-[var(--p-gray-900)]">
              还在纠结选哪所
            </h2>
            <p className="mt-3 text-[15px] font-medium text-[var(--p-gray-700)]">
              输入校网、预算、孩子性格，从 669 所小学 / 962 所幼稚园筛出答案。
            </p>
            <span className="mt-6 inline-block font-mono text-sm font-bold text-[var(--p-gray-900)]">
              开始择校匹配 →
            </span>
          </a>
        </div>
      </section>

      {/* 故事网格 */}
      <StoryGrid />

      {/* 数据说明 */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10">
        <div className="border-t border-black/10 py-6 text-sm leading-relaxed text-[var(--p-secondary)] dark:border-white/10">
          <p>
            港学荟把香港教育局公开资料做成看得懂的内容：学校深度报告、择校工具、面试题库与热文攻略。
            报告按四因子评级（锚点、共识、竞争、世袭）拆解校网、学费、师生比与升中通路，
            数据经多源交叉核实。评级与匹配结果仅供参考，不构成入学建议，各校实际收生以校方公布为准。
          </p>
          <p className="mt-2">
            当前站内已整理 669 所小学、962 所幼稚园数据，沉淀 126 份深度择校报告与 25 所学校面试真题；
            报告按小学四因子、幼稚园五维竞争力两套评分体系输出，每份均标注数据来源与核实程度，
            方便家长从「全港名单」逐层筛选到「适合自家的那几所」。
          </p>
        </div>
      </section>

      {/* footer（原站：贴纸卡 + 双列贴纸链接 + 旋转 wordmark） */}
      <SiteFooter />
    </main>
  );
}

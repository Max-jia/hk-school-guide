import StoryGrid from "@/components/StoryGrid";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Localize from "@/components/Localize";
import PlanningHero from "@/components/home/PlanningHero";
import StageEntryList from "@/components/home/StageEntryList";
import CoreRouteCards from "@/components/home/CoreRouteCards";
import FeaturedTools from "@/components/home/FeaturedTools";
import CoverageTrustNote from "@/components/home/CoverageTrustNote";
import PlanningAnalytics from "@/components/PlanningAnalytics";
import { L, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

function webJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: L("港学荟", locale),
    alternateName: L("香港升学择校平台", locale),
    url: SITE_URL,
    description: L(
      "把香港教育局公开数据做成看得懂的视觉内容：学校报告、择校工具、面试题库、热文与趋势。",
      locale
    ),
  };
}

export default function Home({ locale = "tc" }: { locale?: Locale }) {
  return (
    <Localize locale={locale}>
    <main className="w-full">
      <h1 className="sr-only">港学荟 · 香港择校数据与学校报告</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webJsonLd(locale)) }} />
      {/* header（原站：tagline + wordmark 旋转 + 贴纸按钮 + menu 面板） */}
      <SiteHeader locale={locale} />
      <PlanningAnalytics surface="home" />

      <PlanningHero locale={locale} />
      <StageEntryList locale={locale} />
      <CoreRouteCards locale={locale} />
      <FeaturedTools locale={locale} />

      {/* 故事网格 */}
      <StoryGrid locale={locale} />

      <CoverageTrustNote locale={locale} />

      {/* footer（原站：贴纸卡 + 双列贴纸链接 + 旋转 wordmark） */}
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

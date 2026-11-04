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
import { jsonLdGraph, serializeJsonLd, webPageJsonLd } from "@/lib/structured-data";

export default function Home({ locale = "tc" }: { locale?: Locale }) {
  const homeDescription = L("按幼稚园、小学和中学查找香港学校资料与深度报告，比较课程、学费、校网和升学路径，并使用小一派位及择校工具。", locale);
  const homeJsonLd = jsonLdGraph(locale, [
    webPageJsonLd({
      path: "/",
      title: L("香港学校资料与升学规划｜港学荟", locale),
      description: homeDescription,
      locale,
    }),
  ]);

  return (
    <Localize locale={locale}>
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }} />
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

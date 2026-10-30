import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import reportMeta from "@/content/report-meta.json";
import { SITE_URL } from "./seo";
import { L, LOCALE_META, localeHref, languageAlternates, type Locale } from "./i18n";
import type { ReportSourceReference } from "./report-sources";
import { ORGANIZATION_ID, WEBSITE_ID, breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "./structured-data";

// 深度报告(reports)的数据访问与元数据。繁简两棵路由共用。

export const CONTENT_DIR = path.join(process.cwd(), "src/content/reports");

// skhyl 已合并到 skhyl2
export const EXCLUDED_SLUGS = new Set(["skhyl"]);

const PRIMARY_REPORT_SLUGS = new Set(reportMeta.PS_REPORTS.map((report) => report.c));
const KINDERGARTEN_REPORT_SLUGS = new Set(reportMeta.KG_REPORTS.map((report) => report.c));
const SECONDARY_REPORT_SLUGS = new Set(reportMeta.SS_REPORTS.map((report) => report.c));

export type ReportData = {
  slug: string;
  title: string;
  hero: string;
  body: string;
  premiumHtml: string;
  free: boolean;
  allAccessUrl: string;
  singleUrl: string;
  /** Actual editorial revision date, never a build or source-link check date. */
  updatedAt?: string;
};

export function reportRevisionDate(d: Pick<ReportData, "updatedAt">): string | undefined {
  return d.updatedAt && /^\d{4}-\d{2}-\d{2}$/.test(d.updatedAt) ? d.updatedAt : undefined;
}

export function listReportSlugs(): string[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !EXCLUDED_SLUGS.has(f.replace(/\.json$/, "")))
    .map((f) => f.replace(/\.json$/, ""));
}

export function loadReport(slug: string): ReportData | null {
  const file = path.join(CONTENT_DIR, slug + ".json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8")) as ReportData;
}

export function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function reportName(d: ReportData): string {
  const fromTitle = d.title.replace(/\s*深度(?:[择擇]校)?[报報]告$/, "").trim();
  if (fromTitle) return fromTitle;

  const heading = (d.hero || "").match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
  return toPlainText(heading).replace(/\s*深度(?:[择擇]校)?[报報]告$/, "").trim() || d.slug;
}

function isKindergartenReport(d: ReportData): boolean {
  if (PRIMARY_REPORT_SLUGS.has(d.slug)) return false;
  if (KINDERGARTEN_REPORT_SLUGS.has(d.slug)) return true;
  return /幼稚[园園]/.test(`${d.title} ${d.hero}`);
}

function reportScope(d: ReportData): string {
  const base = reportName(d);
  // Keep a K–12 section explicit without repeating “中学（中学部）”.
  const alreadySecondary = /中[学學]部|中[学學](?:[（(][^）)]*[）)])?$/.test(base);
  return d.slug.endsWith("-secondary") && !alreadySecondary ? `${base}（中学部）` : base;
}

/** 搜索摘要使用报告类型和用户关心的主题生成，避免从免责声明或表格表头硬截文字。 */
export function makeReportDescription(d: ReportData, locale: Locale): string {
  if (d.slug === "hkbaptist") {
    return L("香港浸信會聯會小學位於荃灣62小一校網。報告整理小班及數學分組、小一收生和升中選校，分清小一校網與中學派位網。", locale);
  }
  if (d.slug === "victoria") {
    return L("維多利亞幼稚園品牌報告：比較八個校區、課程及升小路徑。校方四屆692人獲滬江維多利亞學校錄取；這是累計offer人數，並非單屆錄取率。", locale);
  }
  if (d.slug === "canaan") {
    return L("迦南幼稚園品牌報告：比較分校、課程與入讀安排，解讀升小去向及資料限制；未有已核實的全品牌升小分母，不推算直私錄取率。", locale);
  }
  if (d.slug === "cckg") {
    return L("基督堂幼稚園 CCKG深度择校报告：只设K2、K3，不设K1。解读英语教学、K2申请准备、升小去向与家庭适配；学校历史结果不等于个别孩子的录取机会。", locale);
  }
  if (d.slug === "spk") {
    return L("聖保祿幼稚園（SPK）位於灣仔區銅鑼灣禮頓道140B號。查看2026/27學費HK$34,050、半日制、K1至K3及不設PN；報告亦說明升讀小學的公開資料與仍須向校方確認的條件。", locale);
  }
  if (d.slug === "dbs") {
    return L("拔萃男書院附屬小學深度報告：了解小一收生、一條龍升中及非官方Banding參考；2026/27本地生全年學費HK$60,630，以校方公告為準。", locale);
  }
  if (d.slug === "spcs") {
    return L("聖保祿學校（小學部）深度報告：核對2026/27學費 HK$55,000、英文教學、小一收生，以及校方所稱的小學至中學銜接安排；實際升中條件需向校方確認。", locale);
  }
  if (d.slug === "mcs") {
    return L("整理瑪利諾修院學校（小學部）MCS 的課程、小一收生、教學語言、學費及直屬中學安排，附家庭適配分析與申請前核對事項。", locale);
  }
  if (d.slug === "dgjs") {
    return L("拔萃女小學 DGJS 深度報告：2026/27 學費全年 HK$94,000，另看小一申請、英語教學及拔萃女書院升學安排。收費和招生以校方當屆公布為準。", locale);
  }
  if (d.slug === "hkups") {
    return L("港大同學會小學深度報告：核對2026/27學費 HK$41,630、小一收生安排、教學特色，以及升讀港大同學會書院的路徑與條件。", locale);
  }
  if (d.slug === "spccps") {
    return L("聖保羅男女中學附屬小學深度報告：查看課程、評估、小一收生及升讀聖保羅男女中學的銜接條件；校方未公開可核驗的完整直升分母，不推算升讀率。", locale);
  }
  if (d.slug === "tlps") {
    return L("香港真光中學附屬小學暨幼稚園深度報告：整理教學語言、學費、小一收生與已公布升中去向，並說明公開比例的分母限制和家庭適配。", locale);
  }
  if (d.slug === "gt") {
    return L("優才（楊殷有娣）書院深度報告：聚焦資優教育、旺角與將軍澳校舍安排，以及中學 DSE／IB 路線；另整理小一收生與家庭選校要點。", locale);
  }
  if (d.slug === "sscps") {
    return L("聖士提反書院附屬小學深度報告：校方說明六年級學生須在校寄宿一年；另看小一收生、課程與升讀聖士提反書院的安排，评估寄宿对孩子和家庭日常的影响。", locale);
  }
  if (d.slug === "ssgps") {
    return L("聖士提反女子中學附屬小學位於11校網；一至三年級中文以粵語教學，四至六年級普教中，其他科目以粵語為主。報告整理小一收生、升讀聯繫中學的條件與家庭適配。", locale);
  }
  if (d.slug === "veo-op") {
    return L("維多利亞（海之戀）國際幼稚園2026/27半日學費：K1 HK$117,370、K2 HK$106,390、K3 HK$109,360。另看IB PYP、三語課程、PN與升小安排；VEO整體升小數據不等於本校錄取率。", locale);
  }
  if (d.slug === "canaan-klt") {
    return L("九龍塘迦南幼稚園參加2026/27幼稚園教育計劃，提供K1至K3上午及下午班，不設PN及全日班。報告整理課程、家庭照顧安排與升小去向，並說明學費資料的年份及核實範圍。", locale);
  }
  if (d.slug === "lh-sf") {
    return L("學之園凱帆薈校舍2026/27半日英粵班全年HK$90,000、英普班HK$93,600；登記顯示當屆沒有開辦全日班。另看PN、K1至K3安排及分校升小資料限制。", locale);
  }
  if (d.slug === "fssas") {
    return L("福建中學附屬學校是直資小學，不參加小一入學統籌辦法；校方公布2027/28分階段申請，升讀福建中學須達校方要求。報告整理課程、收費與家庭適配。", locale);
  }
  if (d.slug === "lsps") {
    return L("喇沙小學是九龍城41校網資助男校，直屬喇沙書院；報告分析小一自行分配與統一派位、課程及升中條件。直屬學額安排不等於每名學生保證升讀。", locale);
  }
  if (d.slug === "tt") {
    return L("崇真小學暨幼稚園幼稚園部設ACK本地課程與EPK英普課程，全年學費相差HK$49,620。報告比較課程、家庭投入與升小資料；校方未公開可核驗的分班升小率，不作推算。", locale);
  }
  if (d.slug === "evangel") {
    return L("播道書院2026/27小學全年學費為HK$26,000；了解英語為主的教學安排、小一校本收生及原校升中條件。報告說明一條龍制度的適用邊界，不把歷年升學資料當作個人結果。", locale);
  }
  if (d.slug === "pkcps") {
    return L("培僑書院2026/27本地生小學全年學費為HK$31,260；了解全面普教中、英普學習環境及一條龍升中安排。報告分開解讀小學與中學資料，不把校內銜接當作個人升學保證。", locale);
  }
  if (d.slug === "pkps") {
    return L("培僑小學是東區16校網資助男女校，《小學概覽2026》未列一條龍、直屬或聯繫中學。報告整理小一派位、教學特色及升中規劃，並說明它與沙田培僑書院的分別。", locale);
  }
  if (d.slug === "ywps") {
    return L("英華小學是深水埗直資男校，中文科以普通話教學，並與英華書院有條件銜接。報告整理小一校本收生、評估安排與升中要求，區分小學和書院的歷史及制度。", locale);
  }
  if (d.slug === "plklht") {
    return L("保良局陸慶濤小學2026/27全年學費HK$14,260，與保良局羅氏基金中學一條龍；安達臣道新校舍預計2028/29落成及遷入。報告說明升中條件，以及現址與規劃校舍的差異。", locale);
  }
  if (d.slug === "wyps") {
    return L("番禺會所華仁小學位於東區14校網，是資助男校，與香港華仁書院為直屬關係而非一條龍。報告解釋保留學額規則、校網派位及升中資料的分母限制。", locale);
  }
  if (d.slug === "pt") {
    return L("培道幼稚園部參加2026/27幼稚園教育計劃，提供K1至K3上午及下午班，不設PN。報告解讀升讀培道小學的校內銜接安排；校方未公開可核驗的畢業生分母，不能據此推算升小率或保證學位。", locale);
  }
  if (d.slug === "cps") {
    return L("啟思小學提供IB PYP及探究式課程；2026/27學費在《小學概覽》與校方資料頁有差異，報名前宜核對正式收費。另看小一收生、評估，以及與啟思中學的校本聯繫和升中選擇。", locale);
  }
  if (d.slug === "plkflpy") {
    return L("保良局西區婦女福利會馮李佩瑤小學是屯門71校網資助男女校，聯繫保良局百周年李兆忠紀念中學及保良局董玉娣中學。報告解讀聯繫學額規則、課程與升中規劃，不把保留比例當作升讀率。", locale);
  }
  if (d.slug === "tutor") {
    return L("多多幼稚園四個校區的註冊範圍、開班年級、收費及師生比各有差異；校方公布英語與普通話各佔一半的沉浸式教學。報告按校區比較PN與K班服務、費用及升小安排，不把個別校區數據套用全品牌。", locale);
  }
  if (d.slug === "stcat") {
    return L("國際英文幼稚園九龍塘校舍設英粵及英普班，2026/27學費按年級而異；紅磡幼兒服務屬另一登記校址，須分開核對。報告比較班型、升小準備與家庭取捨，不把學校名氣當作升小保障。", locale);
  }
  if (d.slug === "sjps") {
    return L("聖若瑟小學是灣仔12校網資助男校，以英文為主要教學語言，並與聖若瑟書院有直屬關係。報告拆解保留學額規則、校舍安排和升中風險；一般情況下，85%是中學扣除自行分配及重讀學位後的保留比例，不是小學畢業生升讀比例。", locale);
  }
  if (d.slug === "krs") {
    return L("九龍禮賢學校幼稚園部不參加免費幼稚園教育計劃，2026/27學費全年HK$44,000；校方列有英粵雙語班。報告整理K1申請、課程與升小銜接，並說明升讀小學部仍須按校方安排確認。", locale);
  }
  if (d.slug === "tpom") {
    return L("大埔舊墟公立學校（安祥路）是84校網資助男女校，中文科以普通話授課。報告核對校本課程、升中去向及逐校人數資料，並與寶湖道同名學校分開；校名中的「公立」不代表官立辦學。", locale);
  }
  if (d.slug === "tsl") {
    return L("保良局陳守仁小學2026/27學費為HK$20,500，屬直資男女校，不限小一校網；沒有一條龍或直屬中學。報告比較課程、入學競爭與升中選擇，並說明學費以外的家庭投入。", locale);
  }
  const isKindergarten = isKindergartenReport(d);
  const isSecondary = SECONDARY_REPORT_SLUGS.has(d.slug) || d.slug.endsWith("-secondary");
  const focus = isKindergarten
    ? "授课语言、课程、学费、入学申请与升小去向"
    : isSecondary
      ? "课程与教学语言、学费、收生安排和公开升学资料"
      : "授课语言、课程特点、学费、小一入学与升中通路";
  const scope = `${reportScope(d)}深度择校报告`;
  const description = isKindergarten
    ? `${scope}：解读${focus}，比较孩子适配、家庭投入与选校关注点。收费及收生安排按正文所列年度核对。`
    : isSecondary
      ? `${scope}：解读${focus}，比较课程路线、家庭投入与选校关注点。收费及申请条件按正文所列年度核对。`
      : `${scope}：解读${focus}，比较孩子适配、家庭投入与升学取舍。收费及收生安排按正文所列年度核对。`;
  return L(description, locale).trim();
}

/** 标题突出学校名和家长常查主题，避免标题堆叠长标签或暗示未核实的评级。 */
export function reportTitle(d: ReportData, locale: Locale): string {
  if (d.slug === "hkbaptist") return L("香港浸信會聯會小學｜62校網、小一收生與升中｜港學薈", locale);
  if (d.slug === "victoria") return L("維多利亞幼稚園｜八校區、課程及升小去向｜港學薈", locale);
  if (d.slug === "canaan") return L("迦南幼稚園深度报告｜分校比較、升小去向與入學｜港學薈", locale);
  if (d.slug === "spk") return L("SPK在哪一區？聖保祿幼稚園銅鑼灣校址、學費與升小｜港學薈", locale);
  if (d.slug === "spcs") return L("聖保祿學校（小學部）深度报告｜2026/27學費、小一入學與升中｜港學薈", locale);
  if (d.slug === "mcs") return L("瑪利諾修院學校（小學部）MCS 深度报告｜小一入學與升中｜港學薈", locale);
  if (d.slug === "dgjs") return L("拔萃女小學 DGJS 深度报告｜学费、小一入学与升中｜港学荟", locale);
  if (d.slug === "hkups") return L("港大同學會小學深度报告｜學費、小一收生與升中｜港學薈", locale);
  if (d.slug === "spccps") return L("聖保羅男女中學附屬小學深度報告｜小一收生、課程與升中｜港學薈", locale);
  if (d.slug === "tlps") return L("香港真光中學附屬小學暨幼稚園深度報告｜小一入學與升中｜港學薈", locale);
  if (d.slug === "dbs") return L("拔萃男書院附屬小學：小一收生、升中與 Banding｜港學薈", locale);
  if (d.slug === "gt") return L("優才書院深度报告｜資優教育、收生與 DSE／IB｜港學薈", locale);
  if (d.slug === "sscps") return L("聖士提反書院附屬小學深度報告｜小六一年寄宿、小一入學與升中｜港學薈", locale);
  if (d.slug === "ssgps") return L("聖士提反女子中學附屬小學深度報告｜11校網、普教中與升中｜港學薈", locale);
  if (d.slug === "veo-op") return L("維多利亞（海之戀）國際幼稚園｜2026/27學費、IB課程與升小｜港學薈", locale);
  if (d.slug === "canaan-klt") return L("迦南幼稚園（九龍塘）深度報告｜課程、班制與升小｜港學薈", locale);
  if (d.slug === "lh-sf") return L("學之園凱帆薈幼稚園深度報告｜2026/27學費、英粵與英普｜港學薈", locale);
  if (d.slug === "fssas") return L("福建中學附屬學校深度報告｜2027/28小一收生與升中｜港學薈", locale);
  if (d.slug === "lsps") return L("喇沙小學深度報告｜41校網、男校與小一入學｜港學薈", locale);
  if (d.slug === "tt") return L("崇真小學暨幼稚園（幼稚園部）深度報告｜課程與學費比較｜港學薈", locale);
  if (d.slug === "evangel") return L("播道書院深度報告｜小一收生、英語教學與一條龍升中｜港學薈", locale);
  if (d.slug === "pkcps") return L("培僑書院深度報告｜2026/27學費、英普教學與升中｜港學薈", locale);
  if (d.slug === "pkps") return L("培僑小學深度報告｜16校網、教學特色與升中規劃｜港學薈", locale);
  if (d.slug === "ywps") return L("英華小學深度報告｜男校、普教中與英華書院銜接｜港學薈", locale);
  if (d.slug === "plklht") return L("保良局陸慶濤小學深度報告｜學費、一條龍升中與遷校｜港學薈", locale);
  if (d.slug === "wyps") return L("番禺會所華仁小學深度報告｜14校網、香港華仁書院與升中｜港學薈", locale);
  if (d.slug === "pt") return L("香港培道小學（幼稚園部）深度報告｜免費計劃、升小銜接｜港學薈", locale);
  if (d.slug === "cps") return L("啟思小學深度報告｜IB PYP、學費核對與升中選擇｜港學薈", locale);
  if (d.slug === "plkflpy") return L("馮李佩瑤小學深度報告｜71校網、聯繫中學與升中｜港學薈", locale);
  if (d.slug === "tutor") return L("多多幼稚園深度報告｜四校區、英普課程與升小｜港學薈", locale);
  if (d.slug === "stcat") return L("國際英文幼稚園深度報告｜英粵英普班、學費與升小｜港學薈", locale);
  if (d.slug === "sjps") return L("聖若瑟小學深度報告｜12校網、英文教學與升中｜港學薈", locale);
  if (d.slug === "krs") return L("九龍禮賢學校幼稚園部深度報告｜學費、雙語班與升小｜港學薈", locale);
  if (d.slug === "tpom") return L("大埔舊墟公立學校（安祥路）深度報告｜84校網、普教中與升中｜港學薈", locale);
  if (d.slug === "tsl") return L("保良局陳守仁小學深度報告｜學費、語言課程與升中｜港學薈", locale);
  if (d.slug === "cckg") return L("基督堂幼稚園 CCKG深度报告｜K2申请、英语教学与升小｜港学荟", locale);
  const isKg = isKindergartenReport(d);
  const isSecondary = SECONDARY_REPORT_SLUGS.has(d.slug) || d.slug.endsWith("-secondary");
  const focus = isKg
    ? "课程、学费与入学选择"
    : isSecondary
      ? "课程、收生与升学路径"
      : "课程、小一入学与升中路径";
  const scope = reportScope(d);
  return L(`${scope}深度报告｜${focus}｜港学荟`, locale);
}

export function reportOgImage(slug: string): string {
  const png = path.join(process.cwd(), "public", "covers", `${slug}.png`);
  return fs.existsSync(png) ? `/covers/${slug}.png` : "/og-home.png";
}

function reportSourceNotes(d: ReportData, locale: Locale): string[] {
  const text = `${d.body}\n${d.premiumHtml}`;
  const notes = [...text.matchAll(/來源(?:：|:)\s*([^<\n]+)/gu)]
    .map((match) => toPlainText(match[1]).trim())
    .filter((note) => note.length >= 4)
    .map((note) => L(note, locale))
    .filter((note, index, all) => all.indexOf(note) === index);
  return notes.slice(0, 12);
}

export function reportMetadata(slug: string, locale: Locale): Metadata {
  const d = loadReport(slug);
  if (!d) return {};
  const title = reportTitle(d, locale);
  const description = makeReportDescription(d, locale);
  const url = localeHref(`/reports/${slug}`, locale);
  const image = reportOgImage(slug);

  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(`/reports/${slug}`) },
    openGraph: {
      type: "article",
      modifiedTime: reportRevisionDate(d),
      siteName: L("港学荟", locale),
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function reportJsonLd(d: ReportData, locale: Locale, sourceReferences: ReportSourceReference[] = [], schoolProfiles: { name: string; href: string }[] = []) {
  const citations = reportSourceNotes(d, locale);
  const declaredCitations = [
    ...sourceReferences.map((source) => source.url),
    ...citations,
  ].filter((citation, index, all) => all.indexOf(citation) === index);
  const pageUrl = `${SITE_URL}${localeHref(`/reports/${d.slug}`, locale)}`;
  const path = `/reports/${d.slug}`;
  const articleId = `${pageUrl}#article`;
  const title = reportTitle(d, locale);
  const description = makeReportDescription(d, locale);
  const schoolName = (d.title || d.slug).replace(/\s*(深度择校报告|深度擇校報告)$/, "").trim();
  return jsonLdGraph(locale, [{
    "@type": "Article",
    "@id": articleId,
    headline: title,
    description,
    dateModified: reportRevisionDate(d),
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    image: `${SITE_URL}${reportOgImage(d.slug)}`,
    // Editorial policy is linked from the publisher. It is not school evidence.
    citation: declaredCitations.length ? declaredCitations : undefined,
    inLanguage: LOCALE_META[locale].htmlLang,
    // Only explicit, stage-checked catalogue mappings supplied by the route.
    about: schoolProfiles.length ? schoolProfiles.map((school) => ({ "@type": "School", "@id": `${SITE_URL}${school.href}#school`, name: L(school.name, locale) })) : undefined,
    isPartOf: { "@id": WEBSITE_ID },
    // 现阶段报告全文公开展示，不再向搜索引擎声明存在付费墙。
    isAccessibleForFree: true,
  }, webPageJsonLd({ path, title, description, locale, mainEntity: { "@id": articleId } }),
  breadcrumbJsonLd(path, [
    { name: "首頁", path: "/" },
    { name: "學校報告", path: "/reports" },
    { name: schoolName, path },
  ], locale)]);
}

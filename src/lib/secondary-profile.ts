import chineseProfiles from "@/content/secondary-profile-chinese-2025-2026.json";
import type { PilotSchool, SchoolDetail } from "./school-directory-pilot";

const CATEGORIES: Record<string, string> = {
  "資助中學": "資助", "官立中學": "官立", "直接資助計劃中學": "直資", "直資中學": "直資", "直資全日制中學": "直資",
  "私立中學（日校 / 夜校）": "私立", "私立中學": "私立", "國際學校（中學）": "國際",
  "英基學校協會（中學）": "英基", "資助特殊學校": "特殊學校", "按位津貼中學": "按位津貼",
};
type ChineseProfile = { name: string; district: string; address: string; telephone: string; fields: Record<string, string> };
const profiles: Record<string, ChineseProfile> = chineseProfiles.schools;

/** Names, source URLs and official programme identifiers are never machine translated. */
function needsChinese(value: string) {
  const withoutUrls = value.replace(/https?:\/\/[^\s]+/g, "");
  const letters = (withoutUrls.match(/[a-z]/gi) || []).length;
  const han = (withoutUrls.match(/[\u3400-\u9fff]/g) || []).length;
  return letters > 1 && han < letters / 5;
}

const TERMS: [RegExp, string, string][] = [
  [/\bHKDSE\b|\bDSE\b/g, "香港中學文憑考試", "香港中學文憑"],
  [/\bIBDP\b/g, "國際文憑大學預科課程", "大學預科"],
  [/\bIBCP\b/g, "國際文憑職業相關課程", "職業相關課程"],
  [/\bMYP\b/g, "國際文憑中學項目", "中學項目"],
  [/\bIGCSE\b/g, "國際普通中學教育文憑考試", "國際普通中學教育文憑"],
  [/\bGCE A[ -]?Levels?\b|\bA[ -]Levels?\b/gi, "英國普通教育高級程度課程", "高級程度"],
  [/\bIB\b/g, "國際文憑課程", "國際文憑"],
  [/\bNSS\b/g, "新高中課程", "新高中"],
  [/\b2X\b/g, "兩科選修", "兩科選修"],
  [/\b3X\b/g, "三科選修", "三科選修"],
  [/\b4X\b/g, "四科選修", "四科選修"],
  [/\bRAC\b/g, "跨課程閱讀", "跨課程閱讀"],
  [/\bLAC\b/g, "跨課程語文學習", "跨課程語文"],
  [/\bMOI\b/g, "教學語言", "教學語言"],
  [/\bEMI\b/g, "英語授課", "英語授課"],
  [/\bCMI\b/g, "中文授課", "中文授課"],
  [/\bELA\b/g, "英語延展學習活動", "延展學習"],
  [/\bNETs?\b/g, "外籍英語教師", "外籍英語"],
  [/\bSTEM\b/g, "科學、科技、工程與數學教育", "科學、科技、工程"],
  [/\bSTEAM\b/g, "科學、科技、工程、藝術與數學教育", "科學、科技、工程"],
  [/\bBYOD\b/g, "自攜電子裝置學習", "自攜"],
  [/\bSEN\b/g, "特殊教育需要", "特殊教育需要"],
];

export function explainSecondaryTerms(value: string) {
  // Preserve embedded URLs and add each short explanation only once per passage.
  const parts = value.split(/(https?:\/\/[^\s]+)/g);
  for (const [pattern, explanation, alreadyExplained] of TERMS) {
    if (value.includes(alreadyExplained)) continue;
    let explained = false;
    for (let index = 0; index < parts.length; index += 2) {
      parts[index] = parts[index].replace(pattern, (term) => {
        if (explained) return term;
        explained = true;
        return `${term}（${explanation}）`;
      });
    }
  }
  return parts.join("");
}

function chineseText(value: string) {
  if (value === "Development of Soul Mind Body") return "靈、智、體的發展（校訓中譯）";
  return explainSecondaryTerms(value);
}

/** Repair the profile's English-field selection using the same-edition official Chinese CSV. */
export function prepareSecondaryProfile(school: PilotSchool): Partial<PilotSchool> {
  if (school.stage !== "secondary") return {};
  const id = String(school.schoolNumber || "").replace(/\D/g, "").slice(0, 6);
  const row = profiles[id];
  const source = school.sources.find((item) => item.url.endsWith("SCH_LOC_EDB.csv"));
  let address = school.address;
  if (row && needsChinese(address) && (school.registryLocations || 1) === 1) address = row.address;
  const sunnysideSource = {
    label: "家校會《特殊學校概覽》：靈實恩光學校",
    scope: "同一校舍的官方中文校址；中學部與小學部仍按學段保留獨立頁面。",
    url: "https://www.chsc.hk/spsp/school_detail.php?sch_id=2880",
  };
  if (id === "250473" && needsChinese(address)) address = "新界將軍澳安達臣道301號";
  const translateDetail = (detail: SchoolDetail): SchoolDetail => {
    const officialChinese = row?.fields[detail.label];
    const useChinese = detail.sourceUrl === chineseProfiles.sourceUrl && needsChinese(detail.value) && officialChinese && !/^(?:-|不適用)$/.test(officialChinese);
    let value = useChinese ? officialChinese : detail.value;
    if (address !== school.address) value = value.replace(school.address, address);
    return { ...detail, value: chineseText(value) };
  };
  const language = row && school.language && needsChinese(school.language) && row.fields["語言政策"]
    ? row.fields["語言政策"] : school.language;
  const localizedLanguage = language ? chineseText(language) : undefined;
  const detailSections = school.detailSections?.map((section) => ({ ...section, details: section.details.map(translateDetail) }));
  const languageSourceUrl = detailSections?.flatMap((section) => section.details).find((detail) => detail.label === "語言政策" && detail.value === localizedLanguage)?.sourceUrl
    || (localizedLanguage === school.language ? school.languageSourceUrl : undefined);
  return {
    schoolCategories: [CATEGORIES[school.schoolType] || "類別待核實"],
    classificationSources: source ? [source] : undefined,
    address,
    language: localizedLanguage,
    languageSourceUrl,
    gradeSpan: chineseText(school.gradeSpan),
    tuition: school.tuition ? chineseText(school.tuition) : undefined,
    detailSections,
    ...(id === "250473" && address !== school.address ? { sources: [...school.sources, sunnysideSource] } : {}),
  };
}

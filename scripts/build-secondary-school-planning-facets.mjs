import fs from "node:fs";
import path from "node:path";
import * as OpenCC from "opencc-js";
import { getSecondaryTeachingMedium } from "./secondary-teaching-medium.mjs";

const root = process.cwd();
const planning = JSON.parse(fs.readFileSync(path.join(root, "src/content/secondary-school-planning.json"), "utf8"));
const directory = JSON.parse(fs.readFileSync(path.join(root, "src/content/secondary-school-directory-2025-2026.json"), "utf8"));
const toTraditional = OpenCC.Converter({ from: "cn", to: "hk" });
const toSimplified = OpenCC.Converter({ from: "hk", to: "cn" });
const normalize = (value) => value.toLocaleLowerCase().replace(/[\s\p{P}\p{S}（）()·．.，,：:、]/gu, "");
const directoryByName = new Map();
for (const school of directory.schools) {
  for (const name of Object.values(school.names)) {
    if (!name) continue;
    for (const variant of [name, toTraditional(name), toSimplified(name)]) directoryByName.set(normalize(variant), school);
  }
}

const aliases = {
  "creative-secondary-school": "creative-secondary-school-dc7ef8",
};
const internationalSampleIds = new Set([
  "cis", "kellett", "kgv-esf", "cdnis", "hong-kong-academy", "victoria-shanghai-academy",
  "discovery-college", "island-school-esf", "shatin-college-esf", "south-island-school-esf",
  "west-island-school-esf", "renaissance-college-esf", "harrow-international-school-hong-kong",
  "german-swiss-international-school", "french-international-school-hong-kong", "stamford-american-school-hong-kong",
  "isf-academy", "nord-anglia-international-school-hong-kong", "australian-international-school-hong-kong",
  "yew-chung-international-school-secondary", "singapore-international-school-hong-kong",
  "malvern-college-hong-kong", "carmel-school-hong-kong-elsa-high-school", "international-college-hong-kong",
]);
const internationalFacetOverrides = {
  "stamford-american-school-hong-kong": {
    district: "油尖旺区",
    gender: null,
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "Stamford 2025–26 High School Profile列英语为主要授课语言；仅适用于Grade 9–12 West Kowloon高中候选；中学校区学生性别属性未找到直接来源，保持未分类",
    sourceLabel: "Stamford American School Hong Kong · High School Profile 2025–26; Home Affairs Department · Yau Tsim Mong District",
    sourceUrl: "https://www.sais.edu.hk/wp-content/uploads/sites/19/2022/05/2025-26_SASHK_HS_School-Profile-1.pdf",
    status: "school-profile",
  },
  "german-swiss-international-school": {
    district: "中西区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "仅对应中西区Peak校区的English International Stream（IB路线）；校方说明EIS英语授课，GIS德语授课且位于另一校区，不纳入此IB候选语言标签",
    sourceLabel: "GSIS · Admissions — English International Stream; EDB English Stream (Peak Campus)",
    sourceUrl: "https://www.gsis.edu.hk/english-stream/admissions/",
    status: "school-profile",
  },
  "harrow-international-school-hong-kong": {
    district: "屯门区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "教育局国际学校名录 · Harrow International School Hong Kong",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/14.html",
    status: "school-profile",
  },
  "west-island-school-esf": {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "West Island School 2025–26官方简介标明English medium institution；语言科不据此标记为中文媒介",
    sourceLabel: "West Island School Profile 2025–2026; Education Bureau International Schools Directory",
    sourceUrl: "https://wis.esf.edu.hk/upload/files/1/file/68d5ea415fac8.pdf",
    status: "school-profile",
  },
  "south-island-school-esf": {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "南岛中学官方学校简介说明课程以英语授课；中文语言科不据此标记为中文媒介",
    sourceLabel: "South Island School Profile 2024–2025; Education Bureau International Schools Directory",
    sourceUrl: "https://sis.esf.edu.hk/upload/page/120/self/67a42871b6bef.pdf",
    status: "school-profile",
  },
  "shatin-college-esf": {
    district: "沙田区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "Sha Tin College 2026 Language Guidelines明确英语为主要教学语言，中文和其他语言科不据此标记为中文媒介",
    sourceLabel: "Sha Tin College Language Guidelines 2026; Education Bureau International Schools Directory",
    sourceUrl: "https://shatincollege.esf.edu.hk/parent/upload/page/59/self/69ba47e835a4b.pdf",
    status: "school-profile",
  },
  "island-school-esf": {
    district: "中西区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "Island School校方自述为英语授课的国际教育机构；中文按语言科处理，不据此标记中文媒介",
    sourceLabel: "Island School · About Us; Education Bureau International Schools Directory",
    sourceUrl: "https://island.esf.edu.hk/en/about_us/",
    status: "school-profile",
  },
  kellett: {
    district: "观塘区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "教育局国际学校名录 · Kellett School (Kowloon Bay Campus)",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/56.html",
    status: "school-profile",
  },
  cis: {
    district: "东区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "汉基中学部课程介绍说明主要教学语言为英语，普通话为必修语言科；因此只将英语列为非语言科授课媒介，不把学校双语定位误标成中英双语授课",
    sourceLabel: "教育局国际学校名录 · Chinese International School",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/6.html",
    status: "school-profile",
  },
  "kgv-esf": {
    district: "九龙城区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "教育局国际学校名录列明 KGV 授课语言为英语；中文作为语言科目不计为中文授课",
    sourceLabel: "教育局国际学校名录 · King George V School",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/47.html",
    status: "school-profile",
  },
  "isf-academy": {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · The ISF Academy",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/92.html",
    status: "school-profile",
  },
  "nord-anglia-international-school-hong-kong": {
    district: null,
    districtScopes: [
      { district: "观塘区", ageRange: "10–16岁", routes: [] },
      { district: "九龙城区", ageRange: "16–18岁", routes: ["ib", "a-level"] },
    ],
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Nord Anglia International School Hong Kong (Kwun Tong Campus)",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/31.html",
    status: "school-profile",
  },
  "australian-international-school-hong-kong": {
    district: "九龙城区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Australian International School Hong Kong",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/60.html",
    status: "school-profile",
  },
  "yew-chung-international-school-secondary": {
    district: "九龙城区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Yew Chung International School - Secondary",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/94.html",
    status: "school-profile",
  },
  "singapore-international-school-hong-kong": {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "校方说明英语是大部分学科与活动的授课语言；中文在此按语言科目处理",
    sourceLabel: "Singapore International School (Hong Kong) · Bilingualism",
    sourceUrl: "https://www.singapore.edu.hk/bilingualism/",
    status: "school-profile",
  },
  "french-international-school-hong-kong": {
    district: "湾仔区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "仅对应Blue Pool Road English International Stream；French Stream不纳入此授课语言标签",
    sourceLabel: "Education Bureau International Schools Directory · FIS English Stream, Blue Pool Road Campus",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/97.html",
    status: "school-profile",
  },
  cdnis: {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Canadian International School of Hong Kong",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/61.html",
    status: "school-profile",
  },
  "hong-kong-academy": {
    district: "西贡区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Hong Kong Academy",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/15.html",
    status: "school-profile",
  },
  "renaissance-college-esf": {
    district: "沙田区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "RCHK校方说明本校为Year 1–13英语授课学校；中文语言科不据此标记为中文授课",
    sourceLabel: "Education Bureau International Schools Directory · Renaissance College; RCHK official school profile",
    sourceUrl: "https://rchk.esf.edu.hk/en/",
    status: "school-profile",
  },
  "victoria-shanghai-academy": {
    district: "南区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "VSA校方说明中学课程以英语授课，并另设中文课程；未将中文语言课标作非语言科目中文授课",
    sourceLabel: "Victoria Shanghai Academy · School Overview and EDB International Schools Directory",
    sourceUrl: "https://www.vsa.edu.hk/",
    status: "school-profile",
  },
  "malvern-college-hong-kong": {
    district: "大埔区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Education Bureau International Schools Directory · Malvern College Hong Kong",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/30.html",
    status: "school-profile",
  },
  "carmel-school-hong-kong-elsa-high-school": {
    district: "东区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: "Carmel School · Elsa High School Campus Address and EDB International Schools Directory",
    sourceUrl: "https://www.carmel.edu.hk/contact",
    status: "school-profile",
  },
  "international-college-hong-kong": {
    district: "北区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "ICHK Admissions Info明确说明英语是授课语言；此处只标中学教学媒介，不把语言科当作中文授课科目",
    sourceLabel: "Education Bureau International Schools Directory · ICHK (New Territories) and ICHK Admissions Info",
    sourceUrl: "https://internationalschools.edb.gov.hk/en/schools/18.html",
    status: "school-profile",
  },
  "discovery-college": {
    district: "离岛区",
    gender: "Co-ed",
    schoolType: "international",
    teachingMedium: { chinese: false, english: true },
    teachingMediumEvidence: "校方说明Year 1–13全部科目以英语为主要授课媒介；中文按语言科处理",
    sourceLabel: "Discovery College · Language; EDB International Schools Directory",
    sourceUrl: "https://discovery.esf.edu.hk/en/outstanding_education/language/",
    status: "school-profile",
  },
};
const schoolType = (raw) => {
  if (raw === "DSS") return "dss";
  if (raw === "Gov't" || raw === "Aided" || raw === "CAPUT") return "public-funded";
  return null;
};
const records = planning.schools.map((school) => {
  const matched = directory.schools.find((item) => item.id === school.id)
    ?? directory.schools.find((item) => item.id === aliases[school.id])
    ?? directoryByName.get(normalize(school.name));
  if (matched) {
    const offerings = matched.subjectOfferingsByMedium?.["2025_2026"];
    const teachingMedium = getSecondaryTeachingMedium(offerings);
    return {
      id: school.id,
      district: matched.district.sc,
      gender: matched.studentGender,
      schoolType: schoolType(matched.schoolType),
      teachingMedium,
      teachingMediumEvidence: teachingMedium ? `中学概览 ${directory.metadata.sourceEdition} 按非语言科目授课语言列出的课程` : null,
      sourceLabel: "中学概览 2025/2026 · CHSC",
      sourceUrl: directory.metadata.sources.sc,
      status: "annual",
    };
  }
  if (!internationalSampleIds.has(school.id)) {
    throw new Error(`No verified directory mapping or explicit international profile classification for ${school.id}`);
  }
  const facetOverride = internationalFacetOverrides[school.id];
  if (facetOverride) return { id: school.id, ...facetOverride };
  const identityEvidence = school.snapshot.find((item) => /身份|校址|路线|课程|定位/.test(item.field)) ?? school.snapshot[0];
  return {
    id: school.id,
    district: null,
    gender: null,
    schoolType: "international",
    teachingMedium: null,
    teachingMediumEvidence: null,
    sourceLabel: identityEvidence?.sourceLabel ?? "学校资料样本",
    sourceUrl: identityEvidence?.sourceUrl ?? school.snapshot[0]?.sourceUrl ?? "",
    status: "school-profile",
  };
});

const result = {
  sourceEdition: directory.metadata.sourceEdition,
  sourceUrl: directory.metadata.sources.sc,
  unmatchedNote: "国际学校路线样本未纳入 CHSC《中学概览 2025/2026》本地学校名录，故不会臆填其地区、男女校或授课科目资料；选用对应条件时，资料不足的学校会从精准匹配中排除并单独提示。",
  schools: records,
};
const output = path.join(root, "src/content/secondary-school-planning-facets.json");
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Wrote ${records.length} records: ${records.filter((r) => r.district).length} with districts, ${records.filter((r) => r.gender).length} with gender, ${records.filter((r) => r.teachingMedium).length} with structured teaching-medium evidence, ${records.filter((r) => r.schoolType === "international").length} international profiles.`);

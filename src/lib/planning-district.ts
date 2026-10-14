// Keep the planning state independent from the source directory's Chinese form.
// Primary/kindergarten data is mostly Traditional; the secondary catalogue is
// mostly Simplified and also has a few international-school aliases.
const DISTRICT_ALIASES: Record<string, string> = {
  "北區": "北區", "北区": "北區",
  "大埔區": "大埔區", "大埔区": "大埔區",
  "東區": "東區", "东区": "東區", "香港東區": "東區", "香港东区": "東區",
  "觀塘區": "觀塘區", "观塘区": "觀塘區",
  "黃大仙區": "黃大仙區", "黄大仙区": "黃大仙區",
  "九龍城區": "九龍城區", "九龙城区": "九龍城區",
  "葵青區": "葵青區", "葵青区": "葵青區",
  "離島區": "離島區", "离岛区": "離島區",
  "南區": "南區", "南区": "南區", "香港南區": "南區", "香港南区": "南區",
  "荃灣區": "荃灣區", "荃湾区": "荃灣區",
  "沙田區": "沙田區", "沙田区": "沙田區",
  "深水埗區": "深水埗區", "深水埗区": "深水埗區",
  "屯門區": "屯門區", "屯门区": "屯門區",
  "灣仔區": "灣仔區", "湾仔区": "灣仔區",
  "西貢區": "西貢區", "西贡区": "西貢區",
  "油尖旺區": "油尖旺區", "油尖旺区": "油尖旺區",
  "元朗區": "元朗區", "元朗区": "元朗區",
  "中西區": "中西區", "中西区": "中西區",
};

export function normalizePlanningDistrict(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "all") return "all";
  return DISTRICT_ALIASES[trimmed] ?? trimmed;
}

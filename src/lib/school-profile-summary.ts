import type { PilotSchool } from "./school-directory-pilot";

/** Use sourced profile fields, never infer a school's language, fees or quality. */
export function schoolProfileSummary(school: PilotSchool): string {
  const sentences = [`${school.name}位於${school.district}，辦學類別為${school.schoolType}。`];
  const facts: string[] = [];
  if (school.gender) facts.push(school.gender);
  if (school.schoolNet) facts.push(`小一校網：${school.schoolNet.replace(/\s*校[網网]$/, "")}`);
  if (school.language && school.language.length <= 80) facts.push(`教學語言：${school.language.replace(/[。；;\s]+$/, "")}`);
  if (facts.length) sentences.push(`${facts.join("；")}。`);
  if ((school.registryLocations || 1) > 1) sentences.push("設多個登記校址，請按下方校址及資料年度核對課程與收費。");
  else sentences.push("課程、聯絡資料與適用年度見下表，附公開來源。");
  return sentences.join("");
}

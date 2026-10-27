import type { PilotSchool } from "./school-directory-pilot";
import { kindergartenReviewedFields } from "./kindergarten-reviewed-fields";

// Directory previews can describe a missing fact rather than the fact itself.
// Keep those qualifications in the complete profile, not as search-result copy.
const PREVIEW_OR_UNKNOWN = /待(?:核實|核实|確認|确认|查)|見下[方表]|见下[方表]|未(?:能|取得|公開|公开|公布|核實|核实)|按校址|以校方|依校方|詳細安排|详细安排/;
const EXPLICIT_KG_LANGUAGE = new Set([
  "explicit-medium", "explicit-arrangement", "explicit-streams", "explicit-coteaching",
  "explicit-daily-language-class", "school-level-medium", "chinese-unspecified",
]);

function clean(value?: string): string {
  return (value || "").replace(/\s+/g, " ").replace(/[。；;\s]+$/, "").trim();
}

/** Do not truncate a policy before a later exception or turn an activity into MOI. */
function shortKnown(value: string | undefined, limit = 64): string | undefined {
  const text = clean(value);
  return text && text.length <= limit && !PREVIEW_OR_UNKNOWN.test(text) ? text : undefined;
}

function registeredSession(school: PilotSchool): string | undefined {
  const details = (school.detailSections || []).flatMap((section) => section.details);
  const record = details.find((detail) => /^https:\/\/applications\.edb\.gov\.hk\//.test(detail.sourceUrl)
    && /授課時間[：:]/.test(detail.value));
  const session = record?.value.match(/授課時間[：:]\s*(上午|下午|全日)(?:[；;。]|$)/)?.[1];
  const date = record?.period?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  return session && date ? `登記班制：${session}（${date}）` : undefined;
}

/** One factual summary is used by the visible introduction, metadata and schema.
 * Full fields and source notes retain uncertainty; no annualisation or new facts.
 */
export function schoolProfileSummary(school: PilotSchool): string {
  const district = shortKnown(school.district, 70);
  const nature = shortKnown(school.schoolType, 40);
  const sentences = [`${school.name}${district ? `位於${district}` : ""}${nature ? `，屬${nature}` : ""}。`];
  const add = (fact?: string) => {
    if (!fact) return;
    const sentence = `${clean(fact)}。`;
    // Omit a complete optional fact if it would make the summary unwieldy;
    // never cut a school name, fee basis or qualifier in half.
    if (sentences.join("").length + sentence.length <= 150) sentences.push(sentence);
  };
  const number = school.schoolNumber?.match(/^\d{6}/)?.[0];
  const reviewed = school.stage === "kindergarten" && number ? kindergartenReviewedFields(number) : undefined;
  if (reviewed?.closed) {
    sentences.push("校方已公告停辦；歷史班制、收費及課程資料不代表當屆招生。");
    return sentences.join("");
  }
  if ((school.registryLocations || 1) > 1) {
    sentences.push("設多個登記校址；班制、教學語言與收費須按校址及資料年度核對。");
    return sentences.join("");
  }

  if (school.stage === "kindergarten") {
    const curriculum = shortKnown(school.curriculumType, 24);
    if (curriculum) add(`課程類別：${curriculum}`);
    if (/^(臨時註冊|临时注册)$/.test(school.registrationStatus || "")) add(`登記狀態：${school.registrationStatus}`);
    const sessions = reviewed?.sessions;
    // A registration is not evidence of current places or extended care.
    if (sessions?.sourceUrl && sessions.values?.length && !/差異|差异/.test(sessions.text)) {
      const readDate = sessions.period?.match(/\d{4}-\d{2}-\d{2}/)?.[0];
      if (readDate) add(`登記班制：${sessions.values.join("／")}（${readDate}讀取）`);
    }
    const language = reviewed?.language;
    if (language?.sourceUrl && language.mode && EXPLICIT_KG_LANGUAGE.has(language.mode)) {
      const text = shortKnown(language.text, 48);
      // Keep the intake/edition distinction for a published language stream.
      if (text && language.period) add(`語言安排：${text}（${language.period}）`);
    }
    const fee = reviewed?.fee;
    if (fee?.sourceUrl && fee.period && /\d{4}\/\d{2}/.test(fee.period)
      && !/部分校址/.test(fee.period) && shortKnown(fee.text, 48)
      && !/費表與[^。]*未能完整對應/.test(fee.detail)
      && /[$＄]/.test(fee.text) && /／年|\/年|全年|每年/.test(fee.text)) {
      const afterSubsidy = /扣[減除]政府資助後|扣資助後/.test(fee.detail);
      const basis = afterSubsidy && !/扣.*資助後/.test(fee.period) ? "；扣資助後" : "";
      add(`全年學費：${fee.text}（${fee.period}${basis}；按年級及班別）`);
    }
  } else {
    const net = school.schoolNet?.match(/^(\d{1,2})(?:\s*校[網网])?$/)?.[1];
    if (school.stage === "primary" && net) add(`小一校網：${net}`);
    add(shortKnown(school.gender, 16));
    add(registeredSession(school));
    const language = shortKnown(school.language);
    if (language) add(`教學語言：${language}`);
    else if (school.language && school.languageSourceUrl) add("附校方教學語言政策，按科目及年級核對");
  }
  return sentences.join("");
}

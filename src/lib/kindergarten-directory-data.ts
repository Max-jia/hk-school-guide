import type { PilotSchool, SchoolDetail } from "./school-directory-pilot";
import { L } from "./i18n";
import type { DirectoryFact, KindergartenRow } from "./kindergarten-directory";
import { kindergartenReviewedFields } from "./kindergarten-reviewed-fields";

const unknown = (detail = "公開資料未能確認，請按申請校址向學校查詢。"): DirectoryFact => ({ text: "待確認", detail });
const displayedFact = (fact: DirectoryFact): DirectoryFact => ({ text: fact.text, detail: fact.detail, period: fact.period, sourceUrl: fact.sourceUrl });

/** Presentation extraction only: retain the original claim, campus and observation date.
 * Fee certificates do not prove a session is operating; ratios only prove a dated
 * observation. Never infer PN from a school name, or English-medium from NET staff.
 */
export function kindergartenDirectoryRows(schools: PilotSchool[]): KindergartenRow[] {
  return schools.map((s): KindergartenRow => {
    const number = s.schoolNumber?.match(/\d{6}/)?.[0] || s.slug;
    const multiCampus = (s.registryLocations || 1) > 1;
    const details = (s.detailSections || []).flatMap((section) => section.details);
    const own = details.filter((d) => d.sourceUrl.includes(`schid=${number}`));
    const fact = (d: SchoolDetail, text: string, fallback?: string): DirectoryFact => ({ text, detail: d.value, sourceUrl: d.sourceUrl, period: d.period && d.period !== "按概覽年度" ? d.period : fallback });
    const campusNote = "不同校址的安排需分別核對；請在學校資料頁選擇校址。";

    let sessions: KindergartenRow["sessions"] = { ...unknown(), values: [] };
    const session = own.find((d) => d.label === "班制與 PN");
    if (!multiCampus && session) {
      const text = session.value.split("；")[0];
      const values = ["上午", "下午", "長全日", "全日"].filter((v) => text.includes(v) && !(v === "全日" && text.includes("長全日")));
      sessions = { ...fact(session, values.join("／") || "待確認", "2026/27概覽"), values };
    }

    let pn: KindergartenRow["pn"] = { ...unknown(), value: "unknown" };
    const pnDetail = own.find((d) => d.label === "PN／2至3歲服務");
    if (!multiCampus && pnDetail) {
      const v = pnDetail.value;
      const no = /(?:沒有|未有|未|不)提供\s*2[至–—-]3歲/.test(v);
      const yes = !no && /(?:列有|提供)\s*2[至–—-]3歲服務|列有2至3歲全日服務/.test(v);
      pn = { ...fact(pnDetail, no ? "未提供" : yes ? "有記錄" : "待確認", "2025年9月統計"), value: no ? "no" : yes ? "yes" : "unknown" };
    } else if (!multiCampus && session?.value.includes("設幼兒班（PN）")) {
      pn = { ...fact(session, "有記錄", "2026/27概覽"), value: "yes" };
    }

    const rawLanguage = L(s.language || "", "tc");
    const languageDetail = own.find((d) => /^(授課語言|語言安排)$/.test(d.label));
    const overviewLanguage = /^(粵語|英語|普通話)$/.test(rawLanguage) || /概覽[^；。]*列(?:粵語|英語|普通話)/.test(rawLanguage);
    const sourceUrl = s.languageSourceUrl || languageDetail?.sourceUrl || (overviewLanguage ? s.sources.find((source) => source.url.includes(`schid=${number}`))?.url : undefined);
    let language: KindergartenRow["language"] = { ...unknown("未能確認主要授課語言；有英語活動或兩文三語目標不等於英語主導。"), values: [] };
    if (rawLanguage && !multiCampus) language.detail = rawLanguage;
    if (!multiCampus && rawLanguage && sourceUrl) {
      language = { text: "主語言待確認", values: [], detail: rawLanguage, sourceUrl, period: "公開資料" };
      const explicit = /^(粵語|英語|普通話)$/.exec(rawLanguage)?.[1] || /(?:概覽[^；。]*列|以)(粵語|英語|普通話)(?:為主要授課語言|為主|；|$)/.exec(rawLanguage)?.[1];
      if (explicit) language = { text: `${explicit}（概覽）`, values: [explicit], detail: rawLanguage, sourceUrl, period: "2026/27概覽" };
      else if (/兩文三語/.test(rawLanguage)) language = { text: "兩文三語；主語言未明", values: [], detail: rawLanguage, sourceUrl, period: "校方公開資料" };
    }

    const feeDetail = [...details].reverse().find((d) => /^(核准學費|K1至K3全年學費與期數|全年學費與期數|學費)$/.test(d.label) && (d.sourceUrl.includes(`schid=${number}`) || d.sourceUrl.includes(`/schoolfee/${number}.pdf`)));
    const feeRaw = s.tuition || feeDetail?.value || "";
    const feeCurrent = /2026\/27/.test(`${s.dataYear} ${feeDetail?.period || ""} ${feeRaw}`) && !/歷史|舊證書|2024-08|2024 年|當屆.*(?:未核實|待確認)/.test(feeRaw);
    let fee = unknown(feeRaw || undefined);
    if (!multiCampus && feeDetail && feeCurrent) {
      const freeHalfDay = /半日(?:班)?(?:扣除政府資助後|扣減政府資助後)?免費|半日免费/.test(L(feeRaw, "tc")) || /上午及下午班扣減政府資助後免費/.test(feeDetail.value);
      // Only recognise amounts with an explicit year/grade/session meaning.
      // The first number in a prose fee statement could be a year, PN fee or instalment.
      const annualPatterns: [RegExp, string][] = [
        [/K1全年([\d,]+)元/, "K1"],
        [/K1至K3半日班全年([\d,]+)元/, "半日班"],
        [/K1至K3全年([\d,]+)元/, "K1–K3"],
        [/半日班全年([\d,]+)元/, "半日班"],
        [/全日班(?:各級)?全年([\d,]+)元/, "全日班"],
      ];
      const annual = annualPatterns.map(([pattern, label]) => ({ amount: pattern.exec(feeDetail.value)?.[1], label })).find((m) => m.amount);
      const text = freeHalfDay ? "半日班學費 $0" : annual ? `${annual.label} $${annual.amount}／年` : "按班別收費";
      fee = { ...fact(feeDetail, text, "2026/27學年"), detail: feeDetail.value.includes(feeRaw) ? feeDetail.value : `${feeRaw}。${feeDetail.value}` };
    } else if (feeRaw && !feeCurrent) fee = { text: "舊資料待更新", detail: feeRaw, sourceUrl: feeDetail?.sourceUrl };

    // Explicitly reviewed exceptions: keep school-level fees separate from PN at
    // another school number, and never let an older profile override these facts.
    if (number === "531910") {
      const url = "https://kgp2026.kindergartenprofile.com/school/?schid=5319100001";
      sessions = { text: "上午／下午", values: ["上午", "下午"], detail: "本校址只設上午及下午班，無全日或延長服務。", sourceUrl: url, period: "2026/27概覽" };
      pn = { text: "未提供", value: "no", detail: "本校址無2至3歲PN服務，不套用其他迦南校區。", sourceUrl: url, period: "2026/27概覽" };
      language = { text: "粵語（概覽）", values: ["粵語"], detail: `${s.language}；校方另列英語及普通話活動，逐級課時未公開。`, sourceUrl: url, period: "2026/27概覽" };
      fee = { text: "半日班 $5,440／年", detail: s.tuition!, period: "2026/27學年", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/531910.pdf" };
    }
    if (number === "215120") {
      const admission = "https://admission.ekinder.com.hk/stcikg/";
      sessions = { text: "上午／下午", values: ["上午", "下午"], detail: "九龍塘K1申請列上午、下午班；實際編班以錄取安排為準。", sourceUrl: admission, period: "2027/28招生" };
      language = { text: "英粵班／英普班", values: ["英粵／英普班"], detail: "九龍塘K1招生列英粵及英普班，不由班名推算每日英語比例。", sourceUrl: admission, period: "2027/28招生" };
      pn = { ...unknown("紅磡PN屬另一學校編號586625，不能當作本頁九龍塘校舍提供PN的證據。"), value: "unknown" };
      fee = { text: "K1 $80,234／年", detail: s.tuition!, period: "2026/27；11期", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf" };
    }
    if (["520071", "619850"].includes(number)) {
      const url = `https://kgp2026.kindergartenprofile.com/school/?schid=${number}0001`;
      sessions = { text: "上午／下午", values: ["上午", "下午"], detail: number === "520071" ? "校方校舍頁列上午、下午作息；2026/27概覽註冊費欄列沒有開辦全日班，不以收費表推定全日班已開設。" : "2026/27概覽列上午、下午收費，註冊費欄列沒有開辦全日班；班別與學額仍須按校方當屆安排。", sourceUrl: url, period: "2026/27概覽" };
    }
    if (number === "563692") {
      sessions = { text: "全日", values: ["全日"], detail: "2026/27概覽的註冊費欄列沒有開辦半日班；不可從上午和下午兩個師生比例推斷為兩個半日班。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5636920001", period: "2026/27概覽" };
    }
    if (multiCampus && number !== "215120") {
      sessions = { ...unknown(campusNote), text: "按校址查看", values: [] };
      pn = { ...unknown(campusNote), text: "按校址查看", value: "unknown" };
      language = { ...unknown(campusNote), text: "按校址查看", values: [] };
      fee = { ...unknown(campusNote), text: "按校址查看" };
    }
    const reviewed = kindergartenReviewedFields(number);
    if (reviewed?.sessions) sessions = { ...displayedFact(reviewed.sessions), values: reviewed.sessions.values || [] };
    if (reviewed?.language) language = { ...displayedFact(reviewed.language), values: reviewed.language.values || [] };
    if (reviewed?.fee) fee = displayedFact(reviewed.fee);
    if (reviewed?.pn) pn = { ...displayedFact(reviewed.pn), value: reviewed.pn.value };
    const nature = (s.schoolCategories || []).filter((c) => c !== "國際／非本地課程").map((c) => c === "私立" ? "私立獨立" : c);
    const curriculum = s.curriculumType ? [s.curriculumType.includes("非本地") ? "非本地" : "本地", ...(/本地及非本地|^本地；|；本地/.test(s.curriculumType) ? ["本地"] : [])] : [];
    const reports = [...new Set(s.relatedReportSlugs?.length ? s.relatedReportSlugs : s.reportSlug ? [s.reportSlug] : [])];
    return { slug: s.slug, number, name: s.name, nameEn: s.nameEn, district: s.district, districts: s.districts?.length ? s.districts : [s.district], address: s.address,
      multiCampus, nature: nature.length ? nature : ["類別待核實"], curriculum, sessions, pn, language, fee, reports,
      searchText: L(`${s.name} ${s.nameEn} ${s.address} ${s.district} ${(s.districts || []).join(" ")}`, "sc").toLowerCase().replace(/[\s()（）]/g, ""),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "zh-Hant") || a.number.localeCompare(b.number));
}

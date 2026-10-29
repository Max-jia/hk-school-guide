import type { PilotSchool, SchoolDetail } from "./school-directory-pilot";
import { L } from "./i18n";
import type { DirectoryFact, KindergartenRow } from "./kindergarten-directory";
import { kindergartenReviewedFields } from "./kindergarten-reviewed-fields";
import schemeEvidence from "@/content/kindergarten-scheme-status-2026-27.json";

type SchemeRecord = { value: "yes" | "no" | "unknown"; text: string; detail: string; period: string; sourceUrl: string };
const schemeBySchoolNumber = schemeEvidence.statusBySchoolNumber as Record<string, SchemeRecord>;

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

    // PN data in the 2025-09 profile field is a dated service observation, not
    // proof of a 2026/27 class. Only a current-year class record can answer yes/no.
    const pnHistory = reviewed?.pn || pn;
    const currentYearFact = <T extends DirectoryFact>(fact?: T) => fact && /2026\/?27|2027\/?28/.test(fact.period || "") ? fact : undefined;
    const currentPnFact = currentYearFact(pnDetail ? { text: "", detail: pnDetail.value, period: pnDetail.period, sourceUrl: pnDetail.sourceUrl } : undefined)
      || currentYearFact(reviewed?.pn);
    const currentSessionFact = currentYearFact(reviewed?.sessions) || currentYearFact(session ? { text: "", detail: session.value, period: session.period, sourceUrl: session.sourceUrl } : undefined);
    const explicitCurrentFact = [currentPnFact, currentSessionFact].find((item) => item && /幼兒班\s*[（(]?PN|PN班|2[至–—-]3歲/.test(item.detail));
    const hasCurrentPnClass = !!explicitCurrentFact && /(?:幼兒班\s*[（(]?PN|PN班|提供\s*2[至–—-]3歲服務)/.test(explicitCurrentFact.detail) && !/(?:不設|沒有|未有|未開辦|無)\s*(?:幼兒班\s*[（(]?PN|PN班|2[至–—-]3歲)/.test(explicitCurrentFact.detail);
    const confirmsNoCurrentPn = !!explicitCurrentFact && /(?:不設|沒有|未有|未開辦|無)\s*(?:幼兒班\s*[（(]?PN|PN班|2[至–—-]3歲)/.test(explicitCurrentFact.detail);
    if (!multiCampus && hasCurrentPnClass && explicitCurrentFact) {
      pn = { text: "當屆有PN班記錄", value: "yes", detail: `${explicitCurrentFact.detail}。此記錄只確認資料所列學年和校址，不代表仍有空缺。`, period: explicitCurrentFact.period, sourceUrl: explicitCurrentFact.sourceUrl };
    } else if (!multiCampus && confirmsNoCurrentPn && explicitCurrentFact) {
      pn = { text: "當屆未開PN班", value: "no", detail: `${explicitCurrentFact.detail}。此結論只適用於資料所列學年和校址。`, period: explicitCurrentFact.period, sourceUrl: explicitCurrentFact.sourceUrl };
    } else if (/2025年9月/.test(pnHistory.period || "")) {
      const historicClaim = pnHistory.value === "yes" ? "2025年9月曾列有2至3歲服務" : pnHistory.value === "no" ? "2025年9月未列2至3歲服務" : "2025年9月資料未能確認2至3歲服務";
      pn = { text: multiCampus ? "按校址確認；當屆待確認" : "當屆待確認", value: "unknown", detail: `${historicClaim}；這是歷史記錄，不能直接確認2026/27學年仍否開設PN班${multiCampus ? "，多校址亦不能互相套用" : ""}，須向該校址查詢當屆班別及招生安排。`, period: pnHistory.period, sourceUrl: pnHistory.sourceUrl };
    }

    // Make the primary language legible while keeping class streams and broad
    // bilingual/trilingual aspirations separate from the main teaching medium.
    const classStreams = language.values.find((value) => /英粵|英普/.test(value));
    if (classStreams) language = { ...language, text: `按班型分流：${classStreams}` };
    else if (language.values.length > 1) {
      const languages = language.values.join("／");
      const split = /分時段|分班|按班|班型/.test(`${language.text} ${language.detail}`);
      language = {
        ...language,
        text: split ? `按時段／班型分流：${languages}` : `${languages}授課；主次未明`,
        detail: `${language.detail}公開資料列出多種授課語言，但未能確定哪一種為主，因此不標成單一主導語言。`,
        values: [],
      };
    }
    else if (language.values.length === 1 && ["粵語", "普通話", "英語"].includes(language.values[0])) language = { ...language, text: `${language.values[0]}為主` };
    else if (/兩文三語/.test(`${language.text} ${language.detail}`)) language = { ...language, text: "列兩文三語；主導語言未明" };
    else if (!language.text || language.text === "待確認" || language.text === "按校址查看") language = { ...language, text: "主導授課語言待確認" };

    const schemeRecord = schemeBySchoolNumber[number];
    const scheme: KindergartenRow["scheme"] = schemeRecord
      ? { text: schemeRecord.text, value: schemeRecord.value, detail: schemeRecord.detail, period: schemeRecord.period, sourceUrl: schemeRecord.sourceUrl }
      : { text: "待確認", value: "unknown", detail: "未能按教育局當屆參加名單確認此校號；請按實際校址查核。", period: "2026/27學年", sourceUrl: schemeEvidence.sourcePage };
    const nature = (s.schoolCategories || []).filter((c) => c !== "國際／非本地課程").map((c) => c === "私立" ? "私立獨立" : c);
    const curriculum = s.curriculumType ? [s.curriculumType.includes("非本地") ? "非本地" : "本地", ...(/本地及非本地|^本地；|；本地/.test(s.curriculumType) ? ["本地"] : [])] : [];
    const reports = [...new Set(s.relatedReportSlugs?.length ? s.relatedReportSlugs : s.reportSlug ? [s.reportSlug] : [])];
    return { slug: s.slug, number, name: s.name, nameEn: s.nameEn, district: s.district, districts: s.districts?.length ? s.districts : [s.district], address: s.address,
      multiCampus, nature: nature.length ? nature : ["類別待核實"], curriculum, sessions, pn, scheme, language, fee, reports,
      searchText: L(`${s.name} ${s.nameEn} ${s.address} ${s.district} ${(s.districts || []).join(" ")}`, "sc").toLowerCase().replace(/[\s()（）]/g, ""),
    };
  }).sort((a, b) => a.name.localeCompare(b.name, "zh-Hant") || a.number.localeCompare(b.number));
}

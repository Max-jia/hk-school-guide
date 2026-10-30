import type { PilotSchool } from "./school-directory-pilot";

// These are school-specific corrections backed by the 2026-10-25 research ledgers.
// Never apply a report's fees or secondary-school relationship to a namesake campus.
const PRIMARY_REVIEWS = {
  "575240": { fee: "HK$60,000", perMonth: "HK$6,000", teachers: 53, classes: 26, psp: 409, relation: "直屬高主教書院（資助男女校）；非一條龍，符合派位條件仍非保證", chinese: "https://rcps.raimondi.edu.hk/wordpress/curriculum/中文科/" },
  "132047": { fee: "HK$65,000", perMonth: "HK$6,500", teachers: 43, classes: 22, psp: 420, relation: "聯繫香港真光中學（資助女校）；男生不能沿此女中路線升讀，非保證", chinese: "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=38" },
} as const;

// Concise versions of the schools' own 2025/26 language policies. The full
// policy remains in the original detail section for exceptions and context.
const SECONDARY_LANGUAGE_REVIEWS: Record<string, string> = {
  "132837": "2025/26主要以英語授課；初中中文以普通話授課，高中中文及中史以粵語授課",
  "190489": "2025/26初中數學及科學等以英語授課；中文、中史及生活德育以中文授課",
  "510424": "2025/26以英語為主要教學語言；初中中國語文、中史及普通話以中文授課",
  "170305": "2025/26以英語授課為主；中文、中史及部分宗教、公民等科目除外",
  "536539": "2025/26初中科學以英語授課；數學等科以中文授課並有英語延展活動",
  "210536": "2025/26除中文、中史、普通話及宗教外，其他科目以英語為主要教學語言",
  "170410": "2025/26初中以母語授課；部分科目設英語延展學習，英文科以英語授課",
  "283495": "2025/26初中以中文教學為主；非華語學生部分科目以英文授課",
  "212725": "2025/26多科以英語授課；中文、中史及部分公民、宗教等科目除外",
  "131318": "2025/26數學等科按班組安排；初中設英語授課班，中文及中史以中文授課",
  "190837": "2025/26中一數學及高中物理、化學等以英語授課；其餘科目按年級及班組核對",
  "260312": "2025/26初中及高中所列多科以中文授課，英國語文以英語授課",
  "133183": "2025/26實行母語教學；英文科以英語授課，部分科目有英語延展學習",
  "311863": "2025/26初中數學及中一、中二科學以英語授課；其他科目按班組核對",
  "512079": "2025/26初中設英語授課班別；中文科以普通話授課，其他科目按班別核對",
  "510599": "2025/26數學及綜合科學等以中文授課；英國語文以英語授課",
  "135968": "2025/26中一除中國語文及中國歷史外，其他科目以英語授課",
  "170089": "2025/26多科以英語授課；中文、中史及部分公民相關科目以中文授課",
  "552810": "2025/26大部分科目以英語授課；中文及中史等另按課程及學生需要安排",
  "170186": "2025/26以英語為主要教學語言；中文、中史及普通話等按科目安排",
  "536580": "2025/26初中多科以中文授課；部分科目設英語延展教學活動",
  "510262": "2025/26初中數學及科學按班組安排，英國語文以英語授課；其他科目按年級核對",
  "214485": "2025/26以母語教學；初中科學部分按班組安排，高中物理及化學以英語授課",
  "322857": "2025/26多科以中文授課；英國語文以英語授課，數學按班組安排",
  "545228": "2025/26中一設數學及科學英語教學班別；其他科目按年級及班別核對",
  "170097": "2025/26以英語為主要授課語言；中文及部分科目另按課程安排",
  "512281": "2025/26初中主要以中文教學，並設英語延展活動；英國語文以英語授課",
  "510041": "2025/26以中文為主要教學語言；英國語文以英語授課，具體科目按年級核對",
  "171042": "2025/26以中文為主要教學語言；英國語文以英語授課，具體科目按年級核對",
  "211990": "2025/26初中數學及科學按班別或組別安排；英國語文以英語授課",
  "536598": "2025/26以英語為主要教學語言；中國語文、中史及普通話等按科目安排",
  "541850": "2025/26以英語為主要教學語言；中文相關科目及各科安排按學年核對",
  "190535": "2026/27起中一數學及中四化學以英語授課；初中其他科目按科目核對",
  "190446": "2025/26以英語為主要教學語言；中文、中史等科目按年級及課程核對",
  "511617": "2025/26以母語教學；英國語文以英語授課，部分科目按班別或組別安排",
  "214752": "2025/26初中數學、綜合科學及地理以英語授課；其他科目語言按科目核對",
  "190160": "2025/26初中數學、地理及科學等以英語授課；中文、中史等以中文授課",
  "510580": "2025/26以母語教學；英國語文以英語授課，科目與班組安排按當屆核對",
  "170852": "2025/26初中多科以中文授課；英國語文以英語授課，並設英語跨課程詞彙學習",
  "542105": "2025/26多科以英語授課；中文、中史、現代語言等除外，中文以普通話或粵語授課",
  "527467": "2025/26以中文為主要授課語言；英國語文以英語授課，科目安排按年級核對",
  "190071": "2025/26中一至中六實施母語教學；英國語文以英語授課，科目安排按當屆核對",
  "514802": "2025/26除中文、中國歷史及普通話外，各科以英語授課",
  "170968": "2025/26初中數學、科學等以英語授課；中文、中史、普通話等以中文授課",
  "150894": "2025/26以英語為主要教學語言；按班別學生英語程度安排漸進式學習，具體科目請核對",
  "270032": "2025/26非華語學生班以英語授課；中國語文及中國歷史等除外，其他班別按科目核對",
  "521981": "2025/26初中數學、科學等以英語授課；中文、中史、普通話、宗教及體育以中文授課",
  "510475": "2025/26主要以英語授課；中文、中史、宗教倫理及普通話等除外，部分初中中文班以普通話授課",
  "190705": "2025/26各級主要以英語授課；中國語文、中國歷史及初中普通話除外",
  "114081": "2025/26多數科目以英語授課；中文、中史、體育、宗教倫理及普通話等科按當屆安排核對",
  "514128": "2025/26校方語文政策列中文及中史以外的科目以英語授課，具體科目以當屆資料為準",
  "214957": "2025/26以母語教學為基礎；部分班別及科目有英語授課安排，請按年級及科目核對",
  "512842": "2025/26初中數學、科學等以中文授課；英國語文以英語授課，部分科目設英語延展活動",
  "170810": "2025/26初中多數班別主要科目以英語授課；中一及中二中文科按課題以普通話授課",
  "170437": "2025/26中一全級數學及科學以英語授課；其他科目按年級及班別核對",
  "151335": "2025/26中一除中文、中史、普通話及宗教外，其餘科目以英語授課",
  "529656": "2025/26初中採母語教學，部分科目按學生能力加入英語學習課題",
  "114111": "2025/26除列明中文及部分人文科外，其餘科目以英語授課；按科目核對",
  "510912": "2025/26校方稱以中文教學；數理科採用英文課本，授課語言與課本語言須分開理解",
  "510408": "2025/26除中文、中史、普通話及部分公民相關科目外，其餘科目以英語授課",
  "170445": "2025/26校方列中一至中六大部分科目以英語授課，各科安排請核對當屆資料",
  "190870": "2025/26除中文、中史、普通話及部分公民和體育科目外，各級科目以英語授課",
};

export function applyReviewedProfileFacts(school: PilotSchool): PilotSchool {
  if (school.stage === "primary") {
    school = { ...school, detailSections: school.detailSections?.map((section) => ({ ...section, details: section.details.map((detail) => {
      // The imported yes/no flag also mapped entries such as 保姆車 and 「—」
      // to 無. Do not present a negative unless a school-specific source says so.
      if (detail.label === "學費與校車" && /chsc\.hk\/psp2026\/?$/.test(detail.sourceUrl || "")) {
        return { ...detail, value: detail.value.replace(/校車[：:]無/g, "校車服務須向校方核實") };
      }
      if (detail.label !== "直屬中學") return detail;
      if (/^(?:联系|聯繫)/.test(detail.value)) return { ...detail, label: "聯繫中學" };
      if (/^(?:一条龙|一條龍)/.test(detail.value)) return { ...detail, label: "一條龍中學" };
      return detail;
    }) })) };
  }
  if (school.stage === "primary" && school.schoolType === "資助特殊學校") {
    const referral = "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/Annual%20Report.pdf";
    school = {
      ...school,
      schoolNet: undefined,
      tuition: school.tuition === "免费（政府资助）" ? undefined : school.tuition,
      dataYear: "教育局學校位置資料截至2026-09-30（更新2026-10-05）；登記資料截至2026-10-23",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局小一入學報告", url: referral, scope: "特殊學校按專家評估與家長同意另行轉介；不能以普通小一校網推斷學位。" }],
      detailSections: school.detailSections?.filter((section) => !section.title.startsWith("小學概覽｜")),
    };
  }
  const number = school.schoolNumber?.match(/^\d{6}/)?.[0];
  if (school.stage === "primary" && number === "607371") {
    const admissions = "https://dshk.edu.hk/zh-hant/admissions-international-program/";
    const certificate = "https://applications.edb.gov.hk/schoolsearch/schoolfee/607371.pdf";
    school = { ...school, schoolNet: undefined, dataYear: "教育局登記資料截至2026-10-23；國際課程學費按校方2026/27公告核對",
      tuition: "校方2026/27國際課程小學費用分年級列示；本地課程及其他費用另核",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "香港道爾頓學校國際課程入學資料", url: admissions, scope: "2026/27國際課程學費及建校年費；校方列出的三年級區間重疊，須核對。" }, { label: "教育局收費證明書：香港道爾頓學校", url: certificate, scope: "分國際及本地課程、級別及生效日列示收費；未列學年。" }],
      detailSections: [{ title: "課程與費用", details: [{ label: "國際課程費用", value: "校方列2026/27國際課程預備班至三年級全年HK$215,380、三至五年級HK$218,680，均分11期；三年級在校方兩個區間中均出現，適用金額須向校方確認。首名子女建校年費另列HK$45,000；其他費用按校方通知。", period: "2026/27", sourceUrl: admissions }, { label: "本地課程與費證", value: "教育局費證將本地課程與其他課程分開列示，並列不同生效日期；費證與校方2026/27國際課程費用不同，現行課程開班和各級收費請向學校確認，不可混用。", sourceUrl: certificate }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "215406") {
    const pokfulam = "https://internationalschools.edb.gov.hk/en/schools/22.html";
    const bay = "https://internationalschools.edb.gov.hk/en/schools/112.html";
    school = { ...school, schoolNet: undefined, dataYear: "教育局登記資料截至2026-10-23；課程及語言參考教育局國際學校資料", curriculumType: "教育局兩校舍資料列英國國家課程",
      language: "教育局兩校舍資料均列英語為主要教學語言；實際安排請按校舍核實",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局國際學校資料：薄扶林校舍", url: pokfulam, scope: "該校舍課程、語言及聯絡資料。" }, { label: "教育局國際學校資料：九龍灣校舍", url: bay, scope: "該校舍課程、語言及聯絡資料。" }],
      detailSections: [{ title: "校舍與課程", details: [{ label: "按校舍核對", value: "教育局分列薄扶林及九龍灣校舍，兩份資料均列英國國家課程、英語為主要教學語言。各校舍開設級別、入學與費用可能不同，請按目標校舍核實。", sourceUrl: pokfulam }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "590800") {
    const edb = "https://internationalschools.edb.gov.hk/en/schools/14.html";
    school = { ...school, schoolNet: undefined, dataYear: "教育局登記資料截至2026-10-23；課程及語言參考教育局國際學校資料", curriculumType: "教育局國際學校資料列英國課程", language: "教育局國際學校資料列英語為主要教學語言",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局國際學校資料：哈羅香港", url: edb, scope: "辦學地點、英國課程及主要教學語言；各年級收費及寄宿按校方當屆資料確認。" }],
      detailSections: [{ title: "課程與申請", details: [{ label: "課程語言", value: "教育局國際學校資料列英國課程及英語為主要教學語言；年級、寄宿、報名與費用請按校方當屆資料核對。", sourceUrl: edb }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "622079") {
    const fee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/622079.pdf";
    school = { ...school, schoolNet: undefined,
      tuition: "教育局費證列小一至小六每級HK$154,000，分10期；2025年9月1日起生效，當屆費用請核實",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局收費證明書：安基司學校", url: fee, scope: "小一至小六每期HK$15,400、10期；生效日2025-09-01，非當屆學費確認。" }],
      detailSections: [{ title: "學費資料", details: [{ label: "小學課程費用", value: "教育局收費證明書列小一至小六每級每期HK$15,400、10期，每級課程收費HK$154,000，生效日2025年9月1日；此費證未標2026/27學年，報讀當屆費用須向校方確認。", sourceUrl: fee }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "603600") {
    const fee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/603600.pdf";
    school = { ...school, schoolNet: undefined,
      tuition: "教育局收費證明書列小一至小六各級課程收費HK$106,128，分11期；2026年9月1日起生效",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局收費證明書：德萃小學", url: fee, scope: "大埔校小一至小六每期HK$9,648、共11期，生效日2026-09-01。" }],
      detailSections: [{ title: "學費及申請", details: [{ label: "學費證明書", value: "教育局收費證明書列小一至小六各級每期HK$9,648、共11期，每級課程收費HK$106,128，2026年9月1日起生效；其他費用及最新安排請向大埔校核對。", sourceUrl: fee }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "522775") {
    school = { ...school, schoolNet: undefined,
      curriculumType: "日文部及英文部採不同課程；英文部設IB小學項目",
      language: "教育局分列日文部以日語、英文部以英語為主要教學語言，須按部別核對",
      tuition: "日文部與英文部收費不同；金額及適用學年請向校方確認",
      sources: school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")),
      detailSections: [{ title: "費用核實", details: [{ label: "不同學部的費用", value: "兩部門公開收費和適用時間可能不同；校方日文部2026/27網頁註明部分數字以往年收費作參考及須經批准，應向相應部門核對當屆學費、資本費與校車費。", sourceUrl: "https://jis.edu.hk/r8-school-fee/" }] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
      dataYear: "教育局學校登記資料截至2026-10-23；國際學校部別資料及費用以來源日期與校方公布為準",
    };
  }
  if (school.stage === "primary" && number === "629685") {
    const official = "https://ykpaoschool.hk/";
    const fees = "https://applications.edb.gov.hk/schoolsearch/schoolfee/629685.pdf";
    school = { ...school, website: official, schoolNet: undefined,
      dataYear: "教育局登記資料截至2026-10-23；校方課程與2026/27收費按公開資料核對",
      tuition: "2026/27 Year 1–4 全年HK$220,000，分10期；其他費用按校方資料核對",
      language: "校方列英語及普通話雙語教學；Year 1–5 語文學習中英各佔50%",
      gradeSpan: "校方稱2026/27開辦Year 1–3；2027/28申請包括Year 1及Year 2–4插班",
      curriculumType: "雙語國際課程；IB候選申請及課程開辦須待批准",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "香港包玉剛學校官網", url: official, scope: "校方列示的課程、語言、開班、申請及收費；IB計劃須經批准。" }, { label: "教育局收費證明書：香港包玉剛學校", url: fees, scope: "Year 1–4每期HK$22,000、共10期；生效日2026-04-01。" }],
      detailSections: [{ title: "課程與入學資料", details: [
        { label: "語言與課程", value: "校方稱以英語及普通話雙語學習；Year 1–5 的語文學習為中、英各50%。學校正申請成為IB候選學校，擬開辦小學及中學項目，須經國際文憑組織批准，不能視為已獲授權。", sourceUrl: official },
        { label: "2026/27學費", value: "校方列Year 1–4全年HK$220,000，分十期；教育局收費證明書亦列每期HK$22,000。校方稱九龍東校舍期間豁免每年資本費，該費用仍以教育局批准及校方通知為準。", period: "2026/27", sourceUrl: fees },
        { label: "申請與開班", value: "校方稱2026/27開辦Year 1–3；2027/28接受Year 1及Year 2–4插班申請，公布申請期為2026年8月1日至10月31日。實際學位、期限及安排須向校方核實。", period: "2026/27及2027/28", sourceUrl: official },
      ] }, ...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜"))],
    };
  }
  if (school.stage === "primary" && number === "511722") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=93";
    school = { ...school, reportSlug: undefined, relatedReportSlugs: [],
      tuition: "2026/27學費欄列「—」；堂費及其他費用另計",
      sources: [...school.sources.filter((source) => !source.url.includes("sch_id=78")), { label: "家校會小學概覽2026：拔萃小學", url: psp, scope: "校網、教學語言、費用與校車；本校與拔萃男書院附屬小學為不同學校。" }],
      detailSections: school.detailSections?.map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽學費欄列「—」；堂費HK$3,000、家長教師會會費HK$150、非標準項目核准收費HK$470。概覽列校車，路線與費用向校方確認。", period: "2026/27", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "primary" && number === "510777") {
    const fee = "https://www.dbspd.edu.hk/node/416";
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=78";
    school = { ...school, reportSlug: "dbs", relatedReportSlugs: ["dbs"],
      tuition: "2026/27本地學生小一至小六全年HK$60,630；其他收費另計",
      sources: [...school.sources, { label: "拔萃男書院附屬小學：2026/27學費公告", url: fee, scope: "本地及非本地學生分年級學費；學校公告與概覽金額不同。" }, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "英文教學、一條龍關係及概覽所列收費和校車。" }],
      detailSections: school.detailSections?.map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "校方2026/27學費公告列本地生小一至小六每年HK$60,630，非本地生每年HK$141,173；概覽列家長教師會會費HK$500及校車。概覽所列學費HK$58,190與校方較後公告不同，請以校方確認為準。", period: "2026/27", sourceUrl: fee } : detail) }),
    };
  }
  if (school.stage === "primary" && number && ["542580", "510602", "114871"].includes(number)) {
    const reviewed: Record<string, { id: string; detail: string }> = {
      "542580": { id: "370", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$50，特定用途收費HK$500。概覽列校車，路線及收費向校方確認。" },
      "510602": { id: "294", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$70、非標準項目核准收費HK$280。概覽列校車，路線及收費向校方確認。" },
      "114871": { id: "313", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$100，非標準項目按需要收取，每年不多於HK$300。概覽列校車，路線及收費向校方確認。" },
    };
    const fact = reviewed[number];
    const psp = `https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=${fact.id}`;
    school = { ...school, tuition: "2026/27學費及堂費欄列「—」；其他費用另計",
      sources: [...school.sources, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "2026/27全年費用及校車服務；具體路線與收費須向校方確認。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: fact.detail, period: "2026/27", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "secondary" && number && ["132837", "190489", "510424", "514128", "214957", "512842", "190705", "114081", "510475", "150894", "270032", "521981", "170852", "542105", "527467", "190071", "514802", "170968", "190446", "511617", "214752", "190160", "510580", "541850", "190535", "510041", "171042", "211990", "536598", "545228", "170097", "512281", "214485", "322857", "170186", "536580", "510262", "510599", "135968", "170089", "552810", "133183", "311863", "512079", "260312", "190837", "131318", "212725", "170410", "283495", "170305", "536539", "210536"].includes(number)) {
    const ids: Record<string, string> = { "132837": "50", "190489": "4", "510424": "413", "514128": "153", "214957": "135", "512842": "214", "190705": "258", "114081": "21", "510475": "125", "150894": "47", "270032": "227", "521981": "210", "170852": "53", "542105": "304", "527467": "105", "190071": "295", "514802": "372", "170968": "328", "190446": "232", "511617": "458", "214752": "350", "190160": "376", "510580": "340", "541850": "9", "190535": "183", "510041": "84", "171042": "198", "211990": "441", "536598": "455", "545228": "435", "170097": "449", "512281": "446", "214485": "395", "322857": "408", "170186": "429", "536580": "333", "510262": "55", "510599": "270", "135968": "148", "170089": "65", "552810": "131", "133183": "297", "311863": "108", "512079": "121", "260312": "369", "190837": "393", "131318": "129", "212725": "283", "170410": "272", "283495": "223", "170305": "448", "536539": "85", "210536": "219" };
    const ssp = `https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=${ids[number]}`;
    return { ...school, language: SECONDARY_LANGUAGE_REVIEWS[number], languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "校方語文政策及按年級列示的科目授課語言。" }],
    };
  }
  if (school.stage === "secondary" && number && ["190080", "170321", "519111", "270067", "170720", "511030", "190438", "270202", "190527", "513369", "536857", "510297", "530689", "170623", "270105", "510394", "270156", "536997", "214981", "512141", "170550", "270091", "530778", "523208", "230774", "171026", "170682", "510270", "190012", "552801", "518395", "135712", "250740", "230936", "214477", "190250", "553700", "170470", "190373", "170372", "170046", "530352", "113182", "529656", "512710", "170534", "171000", "190888", "190721", "210528", "190233", "536547", "510386", "518417", "170313", "190349", "545147", "190853", "210277", "170615", "514047", "514110", "132209", "170593", "190292", "316377", "230057", "213209", "511536", "170291", "530018", "214990", "270199", "170402", "130893", "170631", "282758", "170453", "510440", "215139", "510890", "190462", "510025", "190659", "132756", "170178", "190519", "511960", "541532", "270075"].includes(number)) {
    const facts: Record<string, { id: string; language: string; gradeSpan?: string }> = {
      "270075": { id: "38", language: "2025/26初中華語學生的數學及科學等以中文授課；非華語學生多科以英語授課，中文科例外" },
      "190519": { id: "79", language: "2025/26初中英文以英語授課，數學及科學按班組安排；部分中文授課科目設英語延展活動" },
      "511960": { id: "359", language: "2025/26初中以英語為主要教學語言，部分班級以普通話教授中文；各科安排按概覽核對" },
      "541532": { id: "332", language: "2025/26初中數學、科學及歷史等按班組安排中英文授課，學校參考學生意願及表現安排分班" },
      "132756": { id: "204", language: "2025/26初中英文、數學及中三理科以英語授課，綜合科學等以中文授課；高中部分科目按班組安排" },
      "170178": { id: "26", language: "2025/26初中數學及科學等以中文授課；非華語學生的部分科目採用英語教學，具體按班組核對" },
      "190659": { id: "33", language: "2025/26初中英文、數學及中一中二綜合科學以英語授課；中三科學及高中部分科目按班組安排" },
      "510025": { id: "37", language: "2025/26中一至中三以母語教學，中一大部分科目加入英語延展活動；英文科以英語授課" },
      "510890": { id: "412", language: "2025/26大部分班別以英語為主要授課語言；各科與班別安排請核對概覽" },
      "190462": { id: "193", language: "2025/26多數科目以英語授課；中文、中國歷史及公民相關科目等除外" },
      "510440": { id: "269", language: "2025/26以英語為主要教學語言；初中中文、中國歷史、普通話及公民相關科目以中文授課" },
      "215139": { id: "391", language: "2025/26中一及中二數學、地理、歷史及綜合科學等以英語授課；中文、中國歷史及普通話以中文授課" },
      "282758": { id: "229", language: "2025/26初中及高中英文科以英語授課；數學、科學等科目以中文授課，初中部分科目設英語延展活動" },
      "170453": { id: "186", language: "2025/26初中英文以英語授課，數學按班組安排；科學、地理等以中文授課並設英語延展活動" },
      "170402": { id: "314", language: "2025/26初中綜合科學及綜合人文以英語授課，數學等以中文授課；高中部分科目按班組安排" },
      "130893": { id: "167", language: "2025/26初中以英語為主要授課語言；各科例外及當屆安排請核對概覽" },
      "170631": { id: "431", language: "2025/26多數科目以英語授課，中文、中國歷史、普通話及宗教教育除外" },
      "214990": { id: "287", language: "2025/26初中英文、地理及跨學科英語以英語授課，數學及綜合科學等以中文授課；高中英文科以英語授課" },
      "270199": { id: "12", language: "2025/26初中數學、綜合科學等以中文授課並設英語延展；中三科學按班組安排，高中化學以英語授課" },
      "530018": { id: "110", language: "2025/26初中數學、科學、歷史及地理等以英語授課；中文、中國歷史、普通話及宗教教育等以中文授課" },
      "511536": { id: "454", language: "2025/26初中主要以英語授課，中文、中國歷史及基督教教育等除外；高中多個科目按班組安排語言" },
      "170291": { id: "36", language: "2025/26以英語為主要教學語言；初中中文、中史、體育、普通話及宗教與倫理以中文授課" },
      "230057": { id: "334", language: "2025/26多數科目以英語授課；中文、中國歷史、普通話、倫理及宗教教育和公民相關科目等除外" },
      "213209": { id: "422", language: "2025/26初中部分班別數學及科學以英語授課，亦設英語延展活動；高中部分物理、化學、生物及經濟以英語授課" },
      "170593": { id: "322", language: "2025/26初中英文及數學以英語授課，科學、地理及歷史等按班組安排；高中部分理科以英語授課" },
      "190292": { id: "77", language: "2025/26初中英文及數學以英語授課，歷史按班組安排；高中物理及化學等以英語授課" },
      "316377": { id: "150", language: "2025/26高中理科以英語授課，數學、地理、經濟及資訊科技等部分科目設英文組別；初中另設英語延展課程" },
      "170615": { id: "400", language: "2025/26初中英文科以英語授課，數學及綜合科學按班組安排；高中多個科目按班組訂定語言" },
      "514047": { id: "151", language: "2025/26除中文、中國歷史、普通話、資訊素養及宗教與倫理教育外，其他科目以英語授課" },
      "514110": { id: "303", language: "2025/26英語為主要教學語言；初中中文、中國歷史、宗教教育、普通話及體育以中文授課" },
      "132209": { id: "54", language: "2025/26初中部分班別的三個指定非語文科目以英語授課；高中相關科目設英語及母語教學機會" },
      "190349": { id: "19", language: "2025/26初中英文科以英語授課，多科以中文授課並設英語延展活動；部分科目按班別安排" },
      "545147": { id: "196", language: "2025/26初中部分班組以英語教授數學及科學，部分其他科目設英語延展活動；高中部分科目以英語授課" },
      "190853": { id: "163", language: "2025/26中文科以普通話授課，中國歷史及中國文學以廣東話授課，其他科目以英語授課" },
      "210277": { id: "279", language: "2025/26以英語為主要教學語言；初中中國語文、中國歷史及普通話等科目以中文授課，高中例外科目見概覽" },
      "510386": { id: "122", language: "2025/26初中以中文為主要授課語言，部分科目設英語延展活動；高中選修科按科目及學生能力安排語言" },
      "518417": { id: "318", language: "2025/26初中英文科以英語授課，數學及科學按班別或組別安排語言；其他科目詳見概覽" },
      "170313": { id: "126", language: "2025/26多數科目以英語授課；中文、中國歷史、宗教教育及體育等科目除外，部分科目另有安排" },
      "190233": { id: "324", language: "2025/26初中數學、科學及多個科目以英語授課；中文等科目按概覽核對" },
      "536547": { id: "80", language: "2025/26初中部分班別以英語教授數學和科學；其他科目語言及班組安排按概覽核對" },
      "210528": { id: "45", language: "2025/26初中英語及數學以英語授課；科學、地理及電腦按班組語文能力安排" },
      "190888": { id: "368", language: "概覽列自2022學年起中一除中文、中史及部分公民等科目外以英語授課；其他年級按當屆核實" },
      "190721": { id: "282", language: "2025/26大部分科目以英語授課；中文及其他科目安排按概覽核對" },
      "170534": { id: "158", language: "2025/26數學全級以英語授課，初中科學按班以英語授課，高中理科用英語教學" },
      "171000": { id: "197", language: "2025/26以母語教學為主；初中學科以母語授課，具體科目語言按概覽核對" },
      "113182": { id: "444", language: "2025/26以母語教學為主，輔以英語延展教學活動" },
      "529656": { id: "195", language: "2025/26初中以母語教學，部分科目按學生能力加入英語學習課題" },
      "512710": { id: "184", language: "2025/26概覽列英文科以英語授課；其餘科目請按年級及概覽核對" },
      "530352": { id: "407", language: "2025/26概覽稱初中及高中各科按學生能力加入不同程度的英語教學內容；具體科目請向校方核實" },
      "170372": { id: "92", language: "2025/26初中部分班別以英語教授非語文科目；科目及班別請按概覽核對" },
      "170046": { id: "35", language: "2025/26初中分科、分組及分時段設英語延展教學活動；實際授課語言請向校方核對" },
      "190250": { id: "442", language: "2025/26個別初中班級以英語授課，中文、中史、普通話及宗教教育除外" },
      "553700": { id: "438", language: "2025/26中英並用；初中數學、綜合科學等科目以英語授課，中文等科以中文授課" },
      "170470": { id: "452", language: "2025/26大部分科目以英語授課；中文等科目的語言安排以概覽為準" },
      "190373": { id: "66", language: "2025/26除中文、中史、普通話及部分公民等科目外，多數科目以英語授課" },
      "214477": { id: "234", language: "2025/26初中部分班別以英語教授歷史及地理，科學科設英語延展教學活動" },
      "230936": { id: "243", language: "2025/26初中大部分非語文科設英語延展教學活動，實際科目語言請按概覽核對" },
      "135712": { id: "138", language: "2025/26初中依班別與科目安排英語或母語授課，個別科目設英語延展活動" },
      "250740": { id: "72", language: "2025/26初中數學、科學等以中文授課並設英語延展活動；英文科以英語授課" },
      "518395": { id: "286", language: "2025/26以母語教學為基礎，初中彈性加入約15%英語課時；具體科目請向校方核實" },
      "510270": { id: "331", language: "2025/26中一至中三設數學、地理、歷史及科學的跨學科英語增潤課程" },
      "190012": { id: "248", language: "2025/26初中英文、數學及科學以英語授課；其他科目安排按概覽核對" },
      "552801": { id: "18", language: "2025/26以英語為教學語言；中一及中二中國語文以普通話教授" },
      "170682": { id: "191", language: "2025/26以英語為主要教學及學習語言；部分中文及宗教等科目以中文授課" },
      "171026": { id: "17", language: "2025/26合作初中書院概覽列高中多科以英語授課；個別科目及當屆安排請向本校確認", gradeSpan: "高中課程於本校開設；2025/26合作初中書院概覽列中四至中六課程，當屆收生請向本校核實" },
      "270091": { id: "73", language: "2025/26以中文為教學語言，另聘外籍英語教師及設英語學習設施" },
      "530778": { id: "241", language: "2025/26推行母語教學；部分科目有英語延展教學活動" },
      "523208": { id: "67", language: "2025/26初中數學、科學等以中文授課；英文科及其他安排以概覽為準" },
      "230774": { id: "5", language: "2025/26除中文、中史、普通話及部分公民等科目外，其餘科目以英語授課" },
      "512141": { id: "388", language: "2025/26初中部分班別以英語授課，其他班別以雙語授課；各科安排請向校方核實" },
      "170550": { id: "41", language: "2025/26初中除中國語文、中國歷史及普通話外，其他科目以英語授課" },
      "214981": { id: "421", language: "2025/26非華語學生以英語授課；初中部分班別數學及綜合科學以英語授課，其餘按班別及能力安排" },
      "270156": { id: "228", language: "2025/26採用母語教學，另設外籍教師英語會話及英語學習活動" },
      "536997": { id: "117", language: "2025/26主要以英語溝通；部分科目按學生語文能力安排中文或英文授課" },
      "510394": { id: "124", language: "2025/26初中部分班別主要以英語授課；其他班別設英語延展教學活動" },
      "170623": { id: "78", language: "2025/26初中科學等科以英語授課；學校在初中加入英文元素並設高中英語銜接課程" },
      "270105": { id: "260", language: "2025/26高中數學及多個選修科以中文授課；英文科及其他科目按概覽核對" },
      "510297": { id: "345", language: "2025/26除中文、中史及部分科目外以英語授課；個別科目請參考概覽" },
      "530689": { id: "302", language: "2025/26以英語為主要教學語言；具體科目及例外請參考概覽" },
      "513369": { id: "237", language: "2025/26以母語教育為基礎，按學生學習能力增設英語加強班；科目安排以校方資料為準" },
      "536857": { id: "106", language: "2025/26初中數學、科學及多個科目以英語授課；中文及其他科目安排按概覽核對" },
      "270202": { id: "451", language: "2025/26初中數學、科學等以中文授課並設英語延展活動；英國語文以英語授課" },
      "190527": { id: "262", language: "2025/26多數科目以英語授課；中文科粵語或普通話安排視乎報讀人數，中史等以中文授課" },
      "270067": { id: "83", language: "2025/26初中英國語文以英語授課；其他科目及當屆安排請按概覽與校方資料核實" },
      "170720": { id: "284", language: "2025/26學校語文政策重視母語教學；英文科及跨科英語元素安排以校方資料為準" },
      "511030": { id: "417", language: "2025/26除中文相關科目、宗教及體育外以英語授課" },
      "190438": { id: "352", language: "2025/26以英語為主要授課語言；各年級科目例外請參考概覽及校方安排" },
      "190080": { id: "291", language: "2025/26以英語為主要教學語言；中文、中史及部分公民、宗教等科目以中文授課" },
      "170321": { id: "300", language: "2025/26初中數學、科學等以英語授課；中文、中史、普通話及宗教生命教育以中文授課" },
      "519111": { id: "17", language: "2025/26初中除中文、中史及部分科目外，以英語及英語延展活動教授其他科目", gradeSpan: "2025/26概覽列中一至中三；高中課程由保良局莊啟程預科書院開設" },
    };
    const fact = facts[number];
    const ssp = `https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=${fact.id}`;
    return { ...school, language: fact.language, languageSourceUrl: ssp, ...(fact.gradeSpan ? { gradeSpan: fact.gradeSpan } : {}),
      sources: [...school.sources, { label: number === "171026" ? "家校會中學概覽2025/26：唐乃勤初中書院及合作高中課程" : "家校會中學概覽2025/26：本校資料", url: ssp, scope: "學校語文政策、年級及所列科目；當屆安排請向校方核實。" }],
    };
  }
  if (number && ["250325", "250279", "250392", "114448", "250112", "260290", "313343", "250503", "250520", "250406", "260266", "250210", "250490", "250414", "250031", "250201", "250651", "250317", "250635", "250309", "250147", "250627", "250481", "250600"].includes(number) && (school.stage === "primary" || school.stage === "secondary")) {
    const facts: Record<string, { url: string; type: string; detail: string }> = {
      "250481": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2871", type: "中度智障兒童特殊學校", detail: "特殊學校概覽列本校服務中度智障學生，重視獨立生活及成人生活轉銜。" },
      "250600": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2856", type: "輕度及中度智障兒童特殊學校", detail: "特殊學校概覽列本校服務輕中度智障學生；校車路線與當屆安排請向校方確認。" },
      "250627": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2825", type: "中度智障兒童特殊學校", detail: "特殊學校概覽列本校服務中度智障學生，教學包括個別化計劃、生活技能及社區實踐。" },
      "250309": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/19.html", type: "輕度及中度智障兒童特殊學校", detail: "教育局資料列本校為輕中度智障兒童學校，教學重視學生的獨立生活能力。" },
      "250147": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/miid.html", type: "輕度智障兒童特殊學校", detail: "教育局特殊學校名單將本校列於輕度智障兒童學校。" },
      "250635": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2872", type: "嚴重智障兒童特殊學校", detail: "特殊學校概覽將本校列為嚴重智障兒童學校；課程按學生需要調適，住宿安排請向校方核實。" },
      "250201": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/16.html", type: "輕度智障兒童特殊學校", detail: "教育局特殊教育資料列本校為輕度智障兒童提供十二年教育服務，注重生活及職業技能。" },
      "250651": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/20.html", type: "中度智障兒童特殊學校", detail: "教育局特殊教育資料列本校為中度智障兒童學校，重視自主及日常生活能力。" },
      "250317": { url: "https://sense.edb.gov.hk/en/special-education/features-of-special-schools/3.html", type: "中度智障兒童特殊學校", detail: "教育局特殊教育資料列本校服務中度智障學生，並設住宿部；住宿資格及安排需向校方核實。" },
      "250031": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2842", type: "肢體傷殘兒童特殊學校", detail: "特殊學校概覽列本校為肢體傷殘兒童學校，亦為多類殘障學童提供服務。" },
      "250414": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2877", type: "嚴重智障兒童特殊學校", detail: "特殊學校概覽列本校服務嚴重智障學生；支援與住宿安排須向校方確認。" },
      "250490": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2829", type: "中度智障兒童特殊學校", detail: "特殊學校概覽列本校服務中度智障學生，並列自置校車接送部分地區學生；路線及安排請向校方確認。" },
      "250210": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/70.html", type: "群育學校（特殊學校）", detail: "教育局特殊教育資料列本校為群育學校，提供針對學生需要的教育及支援。" },
      "260266": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/52.html", type: "肢體傷殘兒童特殊學校", detail: "教育局資料列本校為肢體傷殘或多重殘疾學生提供教育，並按學生需要調適課程及結合治療支援。" },
      "250406": { url: "https://sense.edb.gov.hk/shine2022/tc/galleries/activities/sid/20519.html", type: "嚴重智障兒童特殊學校", detail: "教育局特殊教育資料將本校列於嚴重智障兒童學校；教育及支援安排按個別需要及校方資料核實。" },
      "250503": { url: "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2853", type: "輕度及中度智障兒童特殊學校", detail: "家校會特殊學校概覽列本校服務輕度及中度智障學生；住宿及校車安排請向校方核實。" },
      "250520": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/miid.html", type: "輕度智障兒童特殊學校", detail: "教育局特殊學校名單將本校列於輕度智障兒童學校。" },
      "250325": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/32.html", type: "肢體傷殘兒童特殊學校", detail: "教育局資料列學校服務肢體傷殘學生，並按學生能力和需要調適課程，提供復康和專業支援。" },
      "250279": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/65.html", type: "輕度及中度智障兒童特殊學校", detail: "教育局資料列學校服務輕度及中度智障學生，課程重視獨立生活及工作能力。" },
      "250112": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/6.html", type: "輕度智障兒童特殊學校", detail: "教育局資料列學校為輕度智障學生提供小一至中六的調適課程及專業支援。" },
      "260290": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/51.html", type: "聽障兒童特殊學校", detail: "教育局資料列學校提供小一至中六的聽障教育，並為普通學校的聽障學生提供增強支援服務；課程亦可按學生需要調適。" },
      "313343": { url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=313343000223", type: "嚴重智障兒童特殊學校", detail: "教育局學校資料列本校為嚴重智障兒童特殊學校。" },
      "114448": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/miid.html", type: "輕度智障兒童特殊學校", detail: "教育局特殊學校名單將本校列於輕度智障兒童學校。" },
      "250392": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/miid.html", type: "輕度智障兒童特殊學校", detail: "教育局特殊學校名單將本校列於輕度智障兒童學校。" },
    };
    const fact = facts[number];
    return { ...school, curriculumType: fact.type,
      ...(number === "250210" && school.stage === "primary" ? { gradeSpan: "特殊學校概覽列小五及小六；當屆開班與轉介安排請向校方核實" } : {}),
      sources: [...school.sources, { label: ["250503", "250490", "250414", "250031", "250635", "250627", "250481", "250600"].includes(number) ? "家校會特殊學校概覽" : "教育局特殊學校資料", url: fact.url, scope: "服務類別與學校特色；實際轉介與服務按當屆核實。" }],
      detailSections: [...(school.detailSections || []), { title: "服務對象與申請", details: [{ label: "教育服務", value: `${fact.detail} 學位、支援細節及轉介程序請向教育局或學校確認。`, sourceUrl: fact.url }] }],
    };
  }
  if (school.stage === "secondary" && number === "270040") {
    const ssp = "https://preview.chsc.hk/pdf/ssp2025/221_2.pdf";
    const news = "https://kkp.org.hk/past/detail/48373/";
    return { ...school,
      gradeSpan: "2025/26概覽列僅有中六；過往報道預計2026年停辦，現況及收生請核實",
      language: "2025/26中六科目資料列中文授課、英國語文以英語授課；不代表之後學年有開班",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：明愛柴灣馬登基金中學", url: ssp, scope: "2025/26僅列中六；2026/27擬開科目未列。" }, { label: "天主教香港教區週報2022年報道", url: news, scope: "辦學團體當時公布停收中一及預計2026年停辦，實際狀態仍須核實。" }],
      detailSections: [{ title: "開班與收生狀態", details: [{ label: "歷史資料及現況", value: "《中學概覽2025/26》列該學年只有中六，2026/27擬開科目未列；2022年辦學團體公布預計2026年停辦。未取得最新正式確認，現時是否營運、開班或收生須向教育局及辦學團體查詢。", period: "2025/26概覽及2022年報道", sourceUrl: ssp }] }, ...(school.detailSections || [])],
    };
  }
  if (school.stage === "secondary" && number === "510220") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=268";
    return { ...school,
      gradeSpan: "2025/26概覽列中一、中二無開班；2026年9月中一不參加統一派位，其後安排請向校方確認",
      language: "2025/26初中主要以母語授課；英國語文以英語授課，科目按年級核對",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：筲箕灣東官立中學", url: ssp, scope: "2025/26班級數目及2026年9月中一派位安排；不推斷後續年度。" }],
      detailSections: [{ title: "中一及班級安排", details: [{ label: "2025/26至2026年中一", value: "中學概覽列2025/26中一、中二班數均為零，並載明學校不參加2026年9月升讀中一的統一派位。其他年級及其後學年收生、搬遷安排，請直接向校方及教育局確認。", period: "2025/26概覽", sourceUrl: ssp }] }, ...(school.detailSections || [])],
    };
  }
  if (school.stage === "secondary" && number === "524867") {
    const edb = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ytm.html";
    return { ...school, gradeSpan: "實際開辦課程與級別待核實", tuition: undefined,
      sources: [...school.sources, { label: "教育局油尖旺區學校名單", url: edb, scope: "登記學校名稱、地址及資助類別；課程與招生不由此推斷。" }],
      detailSections: [...(school.detailSections || []), { title: "課程及報讀資料", details: [{ label: "登記與課程", value: "教育局區域名單列出遵理學校（旺角）為私立學校；當屆實際開辦課程、報讀年級及收費請向教育局或校方核實，不按一般日間中學推算。", sourceUrl: edb }] }],
    };
  }
  if (number === "260215" && (school.stage === "primary" || school.stage === "secondary")) {
    const report = "https://www.hkrchs.edu.hk/Files/Documents/Plan/20241124__School%20Report%2022-23__%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%2022-23.pdf";
    return { ...school, curriculumType: "住院學童教育服務",
      sources: [...school.sources, { label: "校方2022/23學校報告", url: report, scope: "住院與日間醫院轉介適齡學童教學；細則按當屆服務確認。" }],
      detailSections: [...(school.detailSections || []), { title: "醫院教學服務", details: [{ label: "服務對象", value: "校方2022/23報告說明，學校為住院或日間醫院轉介的適齡學童提供小一至中六教學，並依健康情況安排床邊或小組教學；服務條件和醫院安排請向校方核實。", period: "2022/23學校報告", sourceUrl: report }] }],
    };
  }
  if (number === "215996" && school.stage === "secondary") {
    const edb = "https://internationalschools.edb.gov.hk/en/schools/9.html";
    return { ...school, curriculumType: "美國課程", gradeSpan: "中學階段；當屆年級以校方資料為準", language: "英語為主要教學語言；另列普通話教學",
      sources: [...school.sources, { label: "教育局國際學校資料", url: edb, scope: "美國課程、主要教學語言及中學階段；年級與收費請向校方確認。" }],
      detailSections: [...(school.detailSections || []), { title: "課程與語言", details: [{ label: "學習安排", value: "教育局國際學校資料列美國課程、英語為主要教學語言，並列普通話為其他教學語言。學校的實際年級、選科及當屆收費請向校方確認。", sourceUrl: edb }] }],
    };
  }
  if (number === "215791" && (school.stage === "primary" || school.stage === "secondary")) {
    const official = school.stage === "primary" ? "https://dsc.edu.hk/elementary/" : "https://dsc.edu.hk/secondary/";
    return { ...school, gradeSpan: school.stage === "primary" ? "Grade 1–6；當屆年級以校方資料為準" : "Grade 7–12；當屆年級以校方資料為準", curriculumType: "加拿大安大略省課程",
      sources: [...school.sources, { label: "校方課程介紹", url: official, scope: "加拿大安大略省課程及該學段的年級；當屆選科與招生須向校方確認。" }],
      detailSections: [...(school.detailSections || []), { title: "課程路徑", details: [{ label: "課程與年級", value: school.stage === "primary" ? "校方介紹小學Grade 1–6採加拿大安大略省課程，開設英語、數學、科學、藝術與語言等課程；具體年級與選課按當屆安排核對。" : "校方介紹Grade 7–8為中學初段、Grade 9–12為高中，學生可修讀安大略省中學文憑課程；畢業要求與實際選科以校方當屆資料為準。", sourceUrl: official }] }],
    };
  }
  if (school.stage === "secondary" && number === "630004") {
    const edb = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tw.html";
    return { ...school, gradeSpan: "實際開設年級及課程待核實", tuition: undefined,
      sources: [...school.sources, { label: "教育局荃灣區學校名單", url: edb, scope: "2026年9月30日的校名、編號及註冊地址；不推斷課程、招生或認證狀態。" }],
      detailSections: [...(school.detailSections || []), { title: "辦學與申請", details: [{ label: "登記及當屆安排", value: "教育局2026年9月30日區域名單列為荃灣區私立中學；該名單未列電話及校長。實際開課年級、課程、收費與招生須向校方或教育局核對。", period: "教育局名單2026-09-30", sourceUrl: edb }] }],
    };
  }
  if (school.stage === "secondary" && number === "519162") {
    const annual = "https://www.caritasfsc.edu.hk/media/about_us/annual-report-24-25.pdf";
    return { ...school, gradeSpan: "高中實地考察支援中心；非一般中一至中六入學", curriculumType: "高中生物及地理實地考察",
      sources: [...school.sources, { label: "校方2024/25學校周年報告", url: annual, scope: "學園提供全港高中學校的野外考察課程，招生以學校報名及編配安排為準。" }],
      detailSections: [...(school.detailSections || []), { title: "服務及申請", details: [{ label: "高中實地考察", value: "校方2024/25周年報告說明，學園以資助中學模式營運，為其他學校中四至中六生物及地理學生提供住宿野外考察課程；屬學校課程支援，不應當作一般中一自行分配學位學校。", period: "2024/25周年報告", sourceUrl: annual }] }],
    };
  }
  if (school.stage === "secondary" && number === "558095") {
    const official = "https://www.creativehk.edu.hk/";
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=387";
    return { ...school, gradeSpan: "2025/26中四至中六；校方公布2027/28亦招中一，當屆安排請核對", curriculumType: "校本創意藝術及中學文憑課程",
      sources: [...school.sources, { label: "校方招生及課程", url: official, scope: "校方列2027/28中一與中四招生，安排須依當屆公告。" }, { label: "中學概覽2025/26", url: ssp, scope: "當屆課程與年級；不可推算未來年級開辦。" }],
      detailSections: [...(school.detailSections || []), { title: "課程及入學", details: [{ label: "開設年級", value: "2025/26概覽介紹高中創意藝術及香港中學文憑課程；校方另公布2027/28招收中一及中四學生，實際申請日期、條件及開辦安排須以校方當屆公告為準。", sourceUrl: official }] }],
    };
  }
  if (number === "250538" && (school.stage === "primary" || school.stage === "secondary")) {
    const psp = "https://www.chsc.hk/spsp/public/index.php/school/sch_detail.html?sch_id=2823";
    return { ...school, curriculumType: "中度智障兒童特殊學校",
      sources: [...school.sources, { label: "特殊學校概覽", url: psp, scope: "學校服務對象與辦學理念。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與支援", details: [{ label: "服務對象", value: "特殊學校概覽將學校列為中度智障兒童學校；適配、學額及教育局轉介請按個別情況查詢。", sourceUrl: psp }] }],
    };
  }
  if (school.stage === "primary" && number === "543314") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=230";
    const oldPsp = "https://www.chsc.hk/psp2025/sch_detail.php?lang_id=2&sch_id=230";
    return { ...school, schoolNet: "直資小學，自行招生，不參加官津小一統一派位", gradeSpan: "五年小學課程；中小學銜接條件按校方當屆安排核對", tuition: "2026/27全年HK$28,600（概覽列分10期）；各年級及其他費用請向校方核對",
      sources: [...school.sources, { label: "家校會小學概覽2026", url: psp, scope: "2026/27收費及班級結構。" }, { label: "家校會小學概覽2025", url: oldPsp, scope: "五年小學課程及校方中學銜接說明。" }],
      detailSections: school.detailSections?.map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => {
        if (detail.label === "小一校網與班制") return { ...detail, value: "直資學校自行招生，不參加官津小一統一派位；全日", sourceUrl: psp };
        if (detail.label === "學費與校車") return { ...detail, value: "2026/27概覽列全年HK$28,600，分10期；其他費用及適用年級按校方當屆資料核對", period: "2026/27", sourceUrl: psp };
        return detail;
      }) }),
    };
  }
  if (school.stage === "primary" && number === "114391") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=322";
    return { ...school, tuition: "2026/27學費及堂費欄列「—」；其他費用另計", sources: [...school.sources, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "二至四年級中文科粵語及普通話班別、收費與交通。" }],
      detailSections: [...(school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$20、非標準項目核准收費HK$300。概覽列保姆車，路線及費用請向校方確認。", period: "2026/27", sourceUrl: psp } : detail) }), { title: "中文科教學", details: [{ label: "粵教中及普教中", value: "概覽列小二至小四中文科設粵語及普通話班別；升二年級家庭與孩子商議選擇，除特別原因外三年沿用相同語言。", period: "小學概覽2026", sourceUrl: psp }] }],
    };
  }
  if (school.stage === "secondary" && number === "578789") {
    const official = "https://www.ichk.edu.hk/learning";
    const ib = "https://ibo.org/school/006655/";
    return { ...school, gradeSpan: "Year 7–13；各年級課程及學位按校方公布為準", curriculumType: "IGCSE、IB文憑及其他高中課程路徑", language: "IB資料列英語授課；具體科目及語文支援請向校方確認", languageSourceUrl: ib,
      sources: [...school.sources, { label: "校方課程介紹", url: official, scope: "Year 7銜接、高中IB及BTEC課程路徑；實際選科與入讀要求另核。" }, { label: "國際文憑組織學校名錄", url: ib, scope: "IB授權學校資料、教學語言及校址；與康樂園校舍分開。" }],
      detailSections: [...(school.detailSections || []), { title: "課程與升學", details: [{ label: "中學課程路徑", value: "校方介紹Year 7銜接課程、IGCSE及Year 12–13的IB文憑課程，亦設IB科目與BTEC課程組合；各路徑的入讀要求、選科及當屆開課請向校方查詢。", sourceUrl: official }] }],
    };
  }
  if (school.stage === "secondary" && number === "230030") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=29";
    return { ...school, language: "2025/26初中設中文班及英語授課課程；高中另列英語班與IAL，科目按班別核對", languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "初中不同語言班別及高中按班別列出的授課安排。" }],
    };
  }
  if (number === "250333" && (school.stage === "primary" || school.stage === "secondary")) {
    const official = "https://www.jcefs.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/";
    const edb = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=250333000323";
    return { ...school, curriculumType: "肢體傷殘兒童特殊學校",
      sources: [...school.sources, { label: "校方學校簡介", url: official, scope: "服務對象、小一至中六及引導式教育理念。" }, { label: "教育局學校登記資料", url: edb, scope: "學校編號及特殊學校種類。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與支援", details: [{ label: "服務對象", value: "校方介紹為6至18歲身體弱能或兼具多種弱能兒童提供小一至中六教育，並採用引導式教育理念；入讀、轉介及住宿安排請向教育局或校方查詢。", sourceUrl: official }] }],
    };
  }
  if (number && ["608491", "260339", "250236", "250244", "250619"].includes(number)) {
    const reviewed = {
      "250619": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/15.html", kind: "嚴重智障兒童特殊學校", fact: "教育局介紹學校為6至18歲嚴重智障學生提供教育、治療、住宿及家庭支援；實際轉介及宿位按個別情況核實。" },
      "608491": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/39.html", kind: "群育學校", fact: "教育局資料介紹學校為有適應困難的12至18歲女青少年提供學習及住宿訓練；服務、轉介及住宿須按個別情況查詢。" },
      "260339": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/48.html", kind: "群育學校", fact: "教育局將學校列為群育學校；服務對象、住宿與轉介安排請向教育局或校方查詢。" },
      "250236": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/miid.html", kind: "輕度智障兒童特殊學校", fact: "教育局將學校列於輕度智障兒童學校；實際教育支援及轉介安排應按孩子需要查詢。" },
      "250244": { url: "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/33.html", kind: "中度智障兒童特殊學校", fact: "教育局資料介紹學校為中度智障學生提供教育及住宿支援；是否適合及宿位安排須按個別情況核實。" },
    } as const;
    const entry = reviewed[number as keyof typeof reviewed];
    return { ...school, curriculumType: entry.kind,
      sources: [...school.sources, { label: "教育局特殊學校特色", url: entry.url, scope: "學校服務類別及特色，按來源的更新日期理解。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與支援", details: [{ label: "服務對象與轉介", value: entry.fact, sourceUrl: entry.url }] }],
    };
  }
  if (school.stage === "secondary" && number === "615471") {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/45.html";
    return { ...school, curriculumType: "兼收輕、中及嚴重智障學生的特殊學校",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "服務對象及住宿服務；實際學額與轉介須另行核實。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與支援", details: [{ label: "服務對象", value: "教育局資料列學校兼收輕、中及嚴重智障學生，並為中度及嚴重智障學生提供住宿服務；具體轉介與學額按教育局或校方安排查詢。", sourceUrl: edb }] }],
    };
  }
  if (number === "112526" && (school.stage === "primary" || school.stage === "secondary")) {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/42.html";
    const register = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=112526000123";
    return { ...school, curriculumType: "輕度智障兒童特殊學校",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "學校服務特色及跨專業支援。" }, { label: "教育局學校登記資料", url: register, scope: "學校編號、地址及特殊學校種類；按登記資料日期理解。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與支援", details: [{ label: "服務對象", value: "教育局登記列為輕度智障兒童特殊學校，校方提供跨專業支援；入讀須按個別評估和教育局轉介安排查詢。", sourceUrl: edb }] }],
    };
  }
  if (school.stage === "secondary" && number === "170690") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=290";
    return { ...school, language: "2025/26以英語為主要授課語言；部分初中學生的部分科目按需要以中文授課", languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "校方全校語文政策及部分初中科目的例外安排。" }],
    };
  }
  if (school.stage === "secondary" && number === "132918") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=143";
    return { ...school, language: "2025/26除英國語文外，中一至中六以母語授課；初中部分科目設英語延展活動", languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "全校語文政策、英語延展活動及按年級的科目語言。" }],
    };
  }
  if (school.stage === "secondary" && number === "557528") {
    const fees = "https://applications.edb.gov.hk/schoolsearch/schoolfee/557528.pdf";
    return { ...school, gradeSpan: "成人教育中心；當屆開辦課程待核實", tuition: undefined,
      sources: [...school.sources, { label: "教育局歷史收費證明書", url: fees, scope: "列成人教育中心及夜校校址；文件的歷史課程及收費不代表現時開辦。" }],
      detailSections: [...(school.detailSections || []), { title: "課程與招生核實", details: [{ label: "成人教育中心", value: "教育局歷史收費證明書列此地址為成人教育中心夜校；現時是否開辦、招生年級、課程及費用未核實。請先向辦學機構或教育局查詢，不要按日間中學的安排理解。", sourceUrl: fees }] }],
    };
  }
  if (number === "250384" && (school.stage === "primary" || school.stage === "secondary")) {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/34.html";
    const official = "https://www.hcp2.edu.hk/chi/school-information/about-school";
    return { ...school,
      curriculumType: "嚴重智障兒童特殊學校",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "學校服務對象及住宿支援。" }, { label: "校方學校資料", url: official, scope: "6至18歲服務對象、小一至中六及住宿支援；實際安排向校方查詢。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務", details: [{ label: "服務對象與住宿", value: "校方說明為6至18歲嚴重智障學生提供小一至中六課程，另為有需要的學生提供住宿與訓練；入讀及住宿安排請向教育局或學校查詢。", sourceUrl: official }] }],
    };
  }
  if (number === "154105" && (school.stage === "primary" || school.stage === "secondary")) {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/8.html";
    return { ...school,
      gradeSpan: school.stage === "primary" ? "小二至小六；以教育局及校方當屆資料為準" : "中一至中六；以教育局及校方當屆資料為準",
      curriculumType: "群育學校；提供住宿服務",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "群育服務對象、全校服務年級及住宿；學額資料應以當屆為準。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務", details: [{ label: "服務對象與年級", value: "教育局列為群育學校，服務有嚴重情緒和行為發展障礙或學習困難的學童；全校服務年級為小二至中六，並提供住宿。轉介及實際學額請向教育局或校方確認。", period: "教育局頁面更新2025-08-25", sourceUrl: edb }] }],
    };
  }
  if (school.stage === "secondary" && number === "560480") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=414";
    return { ...school,
      language: "2025/26初中多科以中文授課；部分科目為非華語學生設英語授課安排，高中部分科目可選英語",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "按年級列出的授課語言，包括非華語學生安排及高中科目語言選擇。" }],
    };
  }
  if (school.stage === "secondary" && number === "190578") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=70";
    return { ...school,
      language: "2025/26多科以英語授課；中文、中史、普通話、中國文學及部分高中科目除外",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "校方語文政策與列明例外科目。" }],
    };
  }
  if (school.stage === "secondary" && number === "516961") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=235";
    return { ...school,
      language: "2025/26初中數學、科學等以中文授課；英國語文及英語會話以英語授課",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "按年級及科目列出的授課語言、課程及學生支援；2026/27科目為擬開設資料。" }],
      detailSections: [...(school.detailSections || []), { title: "教學語言與學生支援", details: [
        { label: "科目授課語言", value: "2025/26初中數學、科學等科以中文授課，英國語文與英語會話以英文授課；高中各科及新學年安排請按當屆資料核對。", period: "2025/26", sourceUrl: ssp },
        { label: "課程與支援", value: "概覽列學校為不同學習需要的學生提供課程調適；為合適學生安排中學文憑試，並提供資歷架構與職前學習機會。實際支援及選科須向校方核對。", period: "中學概覽2025/26", sourceUrl: ssp },
      ] }],
    };
  }
  if (school.stage === "secondary" && number === "630381") {
    const edb = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kc.html";
    return { ...school,
      gradeSpan: "中學；實際開設年級待核實",
      sources: [...school.sources, { label: "教育局九龍城區學校名單", url: edb, scope: "2026年9月30日名單列學校名稱、編號、校址及類別；不代表招生、開課或課程認證已確認。" }],
      detailSections: [...(school.detailSections || []), { title: "資料核實範圍", details: [
        { label: "辦學及招生", value: "教育局2026年9月30日名單列本校為九龍城區私立中學（日校／夜校），並列男女校；名單未列校長及電話。實際開課、課程、費用和招生安排仍須向教育局或校方確認。", period: "教育局名單2026-09-30", sourceUrl: edb },
      ] }],
    };
  }
  if (number === "287695" && (school.stage === "primary" || school.stage === "secondary")) {
    const edb = "https://internationalschools.edb.gov.hk/en/schools/1.html";
    return { ...school, language: "英語為主要教學語言；教育局另列普通話、西班牙語及法語", languageSourceUrl: edb,
      curriculumType: "美國共同核心課程及AP大學先修課程",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局國際學校資料：美國國際學校", url: edb, scope: "學校課程、教學語言與學段；當屆收費向校方核實。" }],
      detailSections: (school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜")),
    };
  }
  if (number === "605557" && (school.stage === "primary" || school.stage === "secondary")) {
    const edb = "https://internationalschools.edb.gov.hk/en/schools/7.html";
    const fees = "https://www.caisbv.edu.hk/fees-capital-notes/";
    return { ...school,
      language: "英語為主要教學語言；教育局另列普通話、法語及西班牙語",
      languageSourceUrl: edb,
      curriculumType: "加拿大亞伯達省課程；另設AP及IB文憑課程",
      tuition: school.stage === "primary" ? "2026/27第1至6級全年學費HK$157,600–190,000；其他費用另計" : "2026/27第7至12級全年學費HK$205,400–237,000；其他費用另計",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")), { label: "教育局國際學校資料：宣道國際學校", url: edb, scope: "學段、課程及教學語言。" }, { label: "學校2026/27收費表", url: fees, scope: "各年級全年學費、分期與資本費；實際適用條件向校方核實。" }],
      detailSections: [...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜")), { title: "課程與收費", details: [{ label: "2026/27學費", value: school.stage === "primary" ? "校方列第1至3級每年HK$157,600、第4級HK$165,700、第5級HK$177,700、第6級HK$190,000，分十期繳交；Preparatory及其他費用按校方收費表核實。" : "校方列第7至9級每年HK$205,400、第10至12級HK$224,600；第11及12級IB文憑課程每年HK$237,000，分十期繳交；其他費用另計。", period: "2026/27", sourceUrl: fees }, { label: "資本費", value: "校方列有資本證或年度資本費安排；適用條件和其他入學費用請向校方確認。", sourceUrl: fees }] }],
    };
  }
  if (number === "522775" && (school.stage === "primary" || school.stage === "secondary")) {
    const english = "https://internationalschools.edb.gov.hk/en/schools/20.html";
    const japanese = "https://internationalschools.edb.gov.hk/en/schools/21.html";
    return { ...school,
      schoolNet: school.stage === "primary" ? "國際學校，入學申請以校方安排為準" : school.schoolNet,
      gradeSpan: "設英文及日文部；具體年級與校舍請向各部確認",
      sources: [...school.sources, { label: "教育局國際學校資料：英文部", url: english, scope: "英文部教學語言及IB小學課程；具體年級與升讀條件向學校核對。" }, { label: "教育局國際學校資料：日文部", url: japanese, scope: "日文部課程及教學語言；不能與英文部混同。" }],
      detailSections: [...(school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "小一校網與班制" ? { ...detail, value: "國際學校；報讀及班制請按所選學部向校方確認。", sourceUrl: english } : detail) }), { title: "學部及課程", details: [{ label: "英文部", value: "教育局國際學校資料列英文為主要教學語言，並列IB小學課程（PYP）；具體年級、收費及升讀條件請向英文部確認。", sourceUrl: english }, { label: "日文部", value: "教育局資料列日文為主要教學語言，採日本課程，亦有英語課；實際年級及入讀資格請向日文部確認。", sourceUrl: japanese }] }],
    };
  }
  if (school.stage === "primary" && number && ["575399", "529770", "579319", "588130", "212326", "514055", "133442", "510050", "513849", "115703", "518468", "114863", "114910", "114529", "114960", "575500", "511315", "560642", "114820", "572357", "543195", "618128", "115568", "115789", "113000", "511579", "115479", "511420", "115614", "115720", "511749", "138177", "115576", "115746", "114804", "510882", "535630", "510017"].includes(number)) {
    const facts: Record<string, { id: string; tuition: string; detail: string }> = {
      "510017": { id: "457", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$25、非標準項目核准收費HK$400；概覽列校車及保姆車，路線及費用向校方確認；概覽聯絡電話為23372058，與登記資料所列號碼不同，請向校方核實。" },
      "535630": { id: "471", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$20及學校設備費HK$470；概覽列保姆車，路線及費用向校方確認。" },
      "510882": { id: "8", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列補發學生證HK$30；學費、堂費及家長教師會會費欄列「—」。概覽列保姆車，路線及費用向校方確認。" },
      "114804": { id: "197", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$20及特定用途收費HK$450；概覽列保姆車，路線及費用向校方確認。" },
      "138177": { id: "279", tuition: "2026/27全年學費HK$62,200；聯課活動費另計", detail: "2026/27概覽列全年學費HK$62,200；聯課活動費每學期約HK$1,000–2,000。概覽列保姆車，路線及費用向校方確認。" },
      "115576": { id: "343", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$20及課程發展活動費HK$150；概覽列校車，路線及費用向校方確認。" },
      "115746": { id: "480", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$20及非標準項目核准收費HK$300；概覽列保姆車，路線及費用向校方確認。" },
      "115614": { id: "308", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費六年HK$150；概覽列校車，路線及費用向校方確認。" },
      "115720": { id: "477", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$50及非標準項目核准收費每年HK$310；概覽列校車，路線及費用向校方確認。" },
      "511749": { id: "210", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$50、特定用途費HK$450及補發證件費HK$35；概覽列保姆車，路線及費用向校方確認。" },
      "115479": { id: "218", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$30、非標準項目核准收費HK$300及教學費HK$600；概覽列校車，路線及費用向校方確認。" },
      "511420": { id: "95", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$40、非標準項目核准收費HK$470；概覽列保姆車，路線及費用向校方確認。" },
      "113000": { id: "208", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$30；校車服務列校車及保姆車，路線及費用向校方確認。" },
      "511579": { id: "427", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$100、非標準項目核准收費HK$400；概覽列保姆車，路線及費用向校方確認。" },
      "115789": { id: "165", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$20、非標準項目班級發展經費HK$380；概覽列保姆車，路線及費用向校方確認。" },
      "618128": { id: "546", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$30、非標準項目核准收費HK$300；概覽列校車，路線及收費向校方確認。" },
      "115568": { id: "335", tuition: "2026/27費用請向校方確認", detail: "2026/27概覽列保姆車；路線、收費及其他費用請向校方確認。" },
      "543195": { id: "154", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$30、增添校園設施HK$310及增聘外籍英語教師HK$390；概覽列校車，路線與收費向校方確認。" },
      "572357": { id: "486", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$30、非標準項目核准收費HK$300。概覽列保姆車，路線及收費請向校方確認。" },
      "560642": { id: "84", tuition: "2026/27費用按概覽及校方通知核對", detail: "2026/27概覽列家長教師會會費HK$100、非標準項目核准收費HK$500；概覽列校車及保姆車，路線與費用向校方確認。" },
      "114820": { id: "288", tuition: "2026/27費用按概覽及校方通知核對", detail: "概覽列校車；路線及收費以校方當屆安排為準。" },
      "575500": { id: "329", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$30、非標準項目核准收費HK$360。概覽列校車，路線及費用向校方確認。" },
      "511315": { id: "57", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費、堂費及其他收費欄均列「—」；校車欄亦列「—」，實際交通安排請向校方確認。" },
      "114529": { id: "344", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$30、非標準項目核准收費HK$150。概覽列校車，路線及費用向校方確認。" },
      "114960": { id: "359", tuition: "2026/27費用請向校方確認", detail: "概覽列保姆車；校車路線、收費及其他費用請向校方確認。" },
      "114863": { id: "403", tuition: "2026/27其他費用按概覽及校方通知核對", detail: "2026/27概覽列家長教師會會費HK$50、特定用途費HK$300；概覽列校車，路線及收費請向校方確認。" },
      "114910": { id: "340", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」，家長教師會會費HK$40；概覽列校車，路線及費用向校方確認。" },
      "115703": { id: "382", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$40、非標準項目核准收費HK$400。概覽列校車，路線及費用向校方確認。" },
      "518468": { id: "237", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；非標準項目核准收費HK$450。概覽列保姆車，路線及費用向校方確認。" },
      "513849": { id: "527", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$20、非標準項目核准收費HK$450。概覽列保姆車，路線及費用向校方確認。" },
      "575399": { id: "104", tuition: "2026/27全年學費HK$64,200，分十期繳交", detail: "2026/27學費HK$64,200，分十期繳交；概覽列保姆車，路線與收費請向校方確認。" },
      "529770": { id: "474", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27學費及堂費欄列「—」；家長教師會會費HK$30、非標準項目核准收費HK$300，補發證件另收費。概覽列校車及保姆車，路線及費用向校方確認。" },
      "579319": { id: "150", tuition: "2026/27全年學費HK$45,800，分十期繳交；其他費用另計", detail: "2026/27學費HK$45,800，分十期繳交；家長教師會會費HK$50，部分書簿、校車及午膳等另計。概覽列有校車，路線及收費請向校方確認。" },
      "588130": { id: "443", tuition: "2026/27小一至小三學費HK$56,500，小四至小六HK$57,500", detail: "2026/27小一至小三學費HK$56,500，小四至小六HK$57,500；概覽列有校車，路線及收費請向校方確認。" },
      "212326": { id: "425", tuition: "2026/27小一全年學費HK$55,000；其他年級請向校方核實", detail: "2026/27概覽列小一學費HK$55,000、入學報名費HK$50；其他年級及費用請向校方確認。概覽列有校車，路線及費用另行核實。" },
      "514055": { id: "266", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$50、非標準項目核准收費HK$400。概覽列有校車，路線及費用向校方確認。" },
      "133442": { id: "89", tuition: "2026/27全年學費HK$64,250，分十期繳交", detail: "2026/27概覽列全年學費HK$64,250，分十期繳交；校車服務欄列保姆車，路線及費用向校方確認。" },
      "510050": { id: "98", tuition: "2026/27學費及堂費欄列「—」；其他費用另計", detail: "2026/27概覽列家長教師會會費HK$50、非標準項目校本管理費HK$300；校車欄列「—」，實際交通請向校方確認。" },
    };
    const fact = facts[number];
    const psp = `https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=${fact.id}`;
    return { ...school, tuition: fact.tuition, ...(number === "618128" ? { language: "中文；概覽稱中文科主要以廣東話授課，課外活動配合普通話及英語語境", languageSourceUrl: psp } : {}),
      sources: [...school.sources, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "2026/27全年收費及校車服務；路線及收費向校方核實。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: [...section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: fact.detail, period: "2026/27", sourceUrl: psp } : number === "510882" && detail.label === "聯繫中學" ? { ...detail, value: "2026概覽列聯繫英皇書院、庇理羅士女子中學、金文泰中學及鄧肇堅維多利亞官立中學；聯繫不等於保證升讀，須符合當屆派位條件。", sourceUrl: psp } : detail), ...(number === "511315" ? [{ label: "科目與語言", value: "概覽列科學科、小四至小六數學及常識科按班本使用英文課本及英語教學；當屆安排請向校方確認。", sourceUrl: psp }] : number === "572357" ? [{ label: "中文科語言", value: "概覽列小一至小六各級個別班的中文科以普通話授課，實際班別與當屆安排請向校方確認。", sourceUrl: psp }] : number === "114960" ? [{ label: "中文科語言", value: "概覽稱全部年級所有班組實施普通話教授中文；當屆安排請向校方確認。", sourceUrl: psp }] : [])] }),
    };
  }
  if (school.stage === "primary" && number === "511927") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99";
    return { ...school, tuition: "2026/27堂費HK$3,000；學費欄列「—」，其他費用另計",
      sources: [...school.sources, { label: "家校會小學概覽2026：協恩中學附屬小學", url: psp, scope: "34校網、2026/27收費、交通及中學關係欄。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽列堂費HK$3,000、家長教師會會費HK$50及非標準項目收費HK$450；學費欄列「—」。校車服務欄列保姆車，路線及費用請向校方確認。", period: "2026/27", sourceUrl: psp } : detail.label === "直屬中學" ? { ...detail, label: "升中關係", value: "《小學概覽2026》的一條龍、直屬及聯繫中學欄均列「—」；與協恩中學的實際升學安排及當屆條件請向校方核實，不能據校名推斷直屬派位保障。", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "primary" && number === "571130") {
    const edb = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=571130000323";
    const official = "https://aoipuischool.hk/curriculum/";
    return { ...school, schoolNet: undefined, curriculumType: "經調適的英國國家課程", address: "九龍紅磡差館里16號（登記校舍）",
      sources: [...school.sources, { label: "教育局學校登記資料", url: edb, scope: "私立小學、登記校址及學校編號。" }, { label: "校方課程介紹", url: official, scope: "調適英國國家課程及個別化教學。" }],
      detailSections: [...(school.detailSections || []).filter((section) => !section.title.startsWith("小學概覽｜")), { title: "課程與支援", details: [{ label: "教學安排", value: "校方介紹按學生需要調適英國國家課程，並採用應用行為分析及個別化教學；報讀資格、教學語言、收費和支援安排請向學校確認。", sourceUrl: official }] }],
    };
  }
  if (school.stage === "primary" && number === "114545") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=175";
    return { ...school, tuition: "2026/27概覽學費及堂費欄列「—」；其他費用另列",
      sources: [...school.sources, { label: "家校會小學概覽2026：郭怡雅神父紀念學校", url: psp, scope: "40校網、荔盈街校址、2026/27收費與交通。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$20、非標準項目核准收費HK$400及學生證HK$40。校車服務欄列校車及保姆車，路線及費用請向校方確認。", period: "2026/27", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "primary" && number === "114405") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=205";
    return { ...school,
      tuition: "2026/27概覽學費及堂費欄列「—」；家長教師會會費及核准收費另列",
      sources: [...school.sources, { label: "家校會小學概覽2026：鳳溪第一小學", url: psp, scope: "80校網、中文教學、2026/27收費及校車服務。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽學費及堂費欄列「—」；家長教師會會費HK$40，非標準項目核准收費HK$310。校車服務欄列保姆車，路線及費用請向校方確認。", period: "2026/27", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "primary" && number === "510149") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=71";
    return { ...school,
      tuition: "2026/27概覽學費及堂費欄列「—」；其他支出按當屆核實",
      sources: [...school.sources, { label: "家校會小學概覽2026：梅窩學校", url: psp, scope: "98校網、中文教學、2026/27班級及校車欄目。" }],
      detailSections: (school.detailSections || []).map((section) => !section.title.startsWith("小學概覽｜") ? section : { ...section, details: section.details.map((detail) => detail.label === "學費與校車" ? { ...detail, value: "2026/27概覽學費及堂費欄列「—」；校車欄亦列「—」，實際交通安排請向校方確認。", period: "2026/27", sourceUrl: psp } : detail) }),
    };
  }
  if (school.stage === "primary" && number === "511676") {
    const schoolNotice = "https://taishingprimary.edu.hk/%E5%85%A5%E5%AD%B8%E8%B3%87%E8%A8%8A";
    const notice = "https://taishingprimary.edu.hk/sites/default/files/files/ban_xue_tuan_ti_geng_gai_yue_jian_da_cheng_xiao_xue_chi_fen_zhe_tong_han_.pdf";
    return { ...school,
      gradeSpan: "校方公告2025/26起停收小一及各級插班，2026年8月31日結束營辦；現況請向教育局確認",
      tuition: undefined, schoolNet: undefined,
      sources: [...school.sources, { label: "校方入學資訊：結束營辦安排", url: schoolNotice, scope: "2025/26起停止小一及插班收生；2026/27結束營辦。" }, { label: "辦學團體給持分者的通函", url: notice, scope: "公告2026年8月31日停辦；實際登記狀態向教育局核實。" }],
      detailSections: [{ title: "停止收生與營辦公告", details: [{ label: "校方公布", value: "學校入學資訊寫明2025/26起停止小一及所有年級插班收生；辦學團體通函列2026年8月31日停辦。舊校網、學費及課程資料僅供歷史參考，現時登記狀況請向教育局核實。", sourceUrl: schoolNotice }] }, ...(school.detailSections || []).map((section) => section.title.startsWith("小學概覽｜") ? { ...section, title: "歷史資料｜小學概覽", note: "校方已公告結束營辦及停止收生；以下並非現行招生資料。" } : section)],
    };
  }
  if (school.stage === "primary" && number === "114855") {
    const gov = "https://www.info.gov.hk/gia/general/202608/29/P2026082800384p.htm";
    const news = "https://news.rthk.hk/rthk/ch/component/k2/1868349-20260901.htm";
    return { ...school,
      address: "大埔富善邨（2026/27學年起使用；詳細位置請向校方確認）",
      sourceNote: `${school.sourceNote || ""} 2026/27學年起使用富善邨校舍，其他登記地址不能當作現時同時授課校舍。`,
      sources: [...school.sources, { label: "政府新聞公報：新校舍開幕", url: gov, scope: "教育局確認2026/27起使用大埔富善邨校舍。" }, { label: "香港電台2026年9月報道", url: news, scope: "報道新學年遷入富善邨上課；與登記歷史校址分開理解。" }],
      detailSections: [{ title: "2026/27校舍安排", details: [{ label: "現行上課校舍", value: "教育局及香港電台資料顯示，學校於2026/27學年起遷入大埔富善邨新校舍上課。下列其他地址是登記資料中的歷史或臨時校址，不能當作現時多個校舍同時授課；到訪及接送前請向學校核對。", period: "2026/27", sourceUrl: gov }] }, ...(school.detailSections || []).map((section) => section.title === "小學概覽｜校址 0003" ? { ...section, title: "小學概覽資料（歷史配對校址 0003）", note: "此資料原按臨時校址配對；學校2026/27學年已遷往富善邨，課程及收費請按當屆校方資料確認。" } : section)],
    };
  }
  if (school.stage === "primary" && number === "510289") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=345";
    const edb = "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf";
    return { ...school,
      tuition: "2026/27概覽列學費及堂費均為「—」；家長教師會年費HK$20及校本管理費HK$100另列",
      sources: [...school.sources, { label: "家校會小學概覽2026：屯門官立小學", url: psp, scope: "校網、中文教學、聯繫中學及2026/27列示收費。" }, { label: "教育局2024/26升中常見問題", url: edb, scope: "聯繫學位的保留比例、資格及分配條件。" }],
      detailSections: [...(school.detailSections || []), { title: "升中與收費", details: [
        { label: "聯繫中學", value: "《小學概覽2026》列聯繫屯門官立中學、南屯門官立中學及新界鄉議局元朗區中學；聯繫不等於保證升讀，須符合派位資格及當屆條件。", sourceUrl: psp },
        { label: "2026/27列示收費", value: "概覽學費和堂費均列「—」，另列家長教師會年費HK$20及校本管理費HK$100；用品及其他支出按校方資料核對。", period: "2026/27", sourceUrl: psp },
      ] }],
    };
  }
  if (school.stage === "primary" && number === "542580") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=370";
    return { ...school,
      sources: [...school.sources, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "教學語言與按年級列出的普通話教授中文安排。" }],
      detailSections: [...(school.detailSections || []), { title: "中文科教學安排", details: [{ label: "普通話教授中文", value: "概覽列小一至小三設普通話班及循序漸進普通話班，小四至小六全面推行普通話教授中文；其他科目語言應向校方核對。", period: "小學概覽2026", sourceUrl: psp }] }],
    };
  }
  if (school.stage === "secondary" && number === "629081") {
    const curriculum = "https://zwa.com.hk/curriculum";
    return { ...school,
      curriculumType: "校方介紹本地與非本地升學路徑",
      sources: [...school.sources, { label: "中黃書院課程介紹", url: curriculum, scope: "校方介紹本地及非本地課程；各課程開辦和認證狀態須按當屆核對。" }],
      detailSections: [...(school.detailSections || []), { title: "課程與申請", details: [
        { label: "課程路徑", value: "校方介紹香港中學文憑試及非本地課程路徑；具體開班、課程認證、年級及招生安排請向校方核實，不能僅憑課程介紹推斷已獲認證。", sourceUrl: curriculum },
      ] }],
    };
  }
  if (school.stage === "primary" && number && ["260150", "615471", "250228"].includes(number)) {
    const first = number === "260150";
    const moderate = number === "250228";
    const edb = `https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/${first ? "71" : moderate ? "67" : "45"}.html`;
    const fact = first ? "為輕度智障學生提供初小至高中教育服務" : moderate ? "為6歲以上中度智障學生提供教育服務" : "兼收輕、中及嚴重智障學生，另為中度及嚴重智障學生提供住宿服務";
    return { ...school, curriculumType: first ? "輕度智障兒童特殊學校" : moderate ? "中度智障兒童特殊學校" : "兼收輕、中及嚴重智障學生的特殊學校",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "學校服務對象與課程特色；按頁面更新日期理解。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務", details: [{ label: "服務對象", value: `${fact}；學額及轉介程序請向教育局或學校核實。`, sourceUrl: edb }] }],
    };
  }
  if (school.stage === "primary" && number === "543292") {
    const psp = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=228";
    const poa = "https://www.edb.gov.hk/tc/student-parents/spa-systems/overview/index.html";
    return { ...school,
      schoolNet: "直資小學，不參加小一入學統籌辦法；向學校申請",
      tuition: "2026/27小一全年HK$35,310；其他年級及額外費用按校方當屆資料核對",
      sources: [...school.sources, { label: "家校會小學概覽2026：本校資料", url: psp, scope: "2026/27小一全年學費及小一至小六的校舍安排。" }, { label: "教育局小一入學制度", url: poa, scope: "直資小學不屬小一入學統籌辦法。" }],
      detailSections: school.detailSections?.map((section) => !section.title.startsWith("小學概覽｜") ? section : ({
        ...section,
        details: section.details.map((detail) => {
          if (detail.label === "小一校網與班制") return { ...detail, value: "直資小學不參加小一入學統籌辦法；全日", sourceUrl: poa };
          if (detail.label === "學費與校車") return { ...detail, value: "2026/27小一全年HK$35,310；其他年級及其他費用按校方當屆資料核對；概覽列有校車", period: "2026/27", sourceUrl: psp };
          if (detail.label === "直屬中學" || detail.label === "一條龍中學") return { ...detail, label: "中小學關係", value: "與優才（楊殷有娣）書院中學部一條龍；銜接條件按校方當屆安排核對", sourceUrl: psp };
          return detail;
        }),
      })),
    };
  }
  if (school.stage === "secondary" && number && SECONDARY_LANGUAGE_REVIEWS[number] && school.languageSourceUrl) {
    return { ...school, language: SECONDARY_LANGUAGE_REVIEWS[number] };
  }
  if (school.stage === "secondary" && number === "190284") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=202";
    return { ...school,
      language: "2025/26中一至中三設英語及母語為主要授課語言的班別，安排按班別核對",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "校方語文政策；不同班別以不同語言授課。" }],
    };
  }
  if (school.stage === "secondary" && number === "213705") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=366";
    return { ...school,
      language: "2025/26校方列中一全級以英語學習數學及科學，其他科目按年級及班別核對",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "校方語文政策及中一數學、科學教學語言。" }],
    };
  }
  if (school.stage === "primary" && number === "250376") {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/64.html";
    return { ...school,
      curriculumType: "中度智障兒童特殊學校",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "學校類別及生活知識、技能為本的教育。" }],
      detailSections: [...(school.detailSections || []), { title: "學校類別與課程", details: [
        { label: "教育服務", value: "教育局資料列本校為服務中度智障學生的特殊學校，課程重視生活知識和技能；學額及轉介程序請向教育局或學校核實。", sourceUrl: edb },
      ] }],
    };
  }
  if (school.stage === "secondary" && number === "190829") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=206";
    return { ...school,
      language: "2025/26校方語文政策：除中國語文、中史及中國文學外，其他科目以英語授課",
      languageSourceUrl: ssp,
      sources: [...school.sources, { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "學校語文政策及按年級、科目列示的授課語言。" }],
    };
  }
  if (school.stage === "secondary" && number === "260282") {
    const edb = "https://sense.edb.gov.hk/tc/special-education/features-of-special-schools/22.html";
    return { ...school,
      curriculumType: "群育學校，須經教育局中央轉介",
      sources: [...school.sources, { label: "教育局特殊學校特色", url: edb, scope: "群育男校、教育局中央轉介及課程安排；資料按頁面更新日期理解。" }],
      detailSections: [...(school.detailSections || []), { title: "學校服務與入學", details: [
        { label: "學校類別與轉介", value: "群育男校；教育局資料列所有學生須經中央轉介。學校提供文憑試課程及短期適應課程；個別適配與轉介安排須向教育局核實。", period: "教育局頁面更新2025-08-25", sourceUrl: edb },
      ] }],
    };
  }
  if (school.stage === "primary" && number === "114871") {
    const curriculum = "https://satkp.edu.hk/%E6%A0%A1%E6%9C%AC%E8%AA%B2%E7%A8%8B";
    return { ...school,
      curriculumType: "校本科學探究課程",
      sources: [...school.sources, { label: "校方校本課程", url: curriculum, scope: "校方公布的科學探究及學習安排。" }],
      detailSections: [...(school.detailSections || []), { title: "校本課程", details: [
        { label: "科學探究", value: "校方列有田小玩轉「海陸空」探究課程，培養科學觀察與研究能力；各年級安排可向學校查詢。", sourceUrl: curriculum },
      ] }],
    };
  }
  if (school.stage === "secondary" && number === "190403") {
    const ssp = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=68";
    const brochure = "https://www.twghlkss.edu.hk/attachment/upload/MediaCoverage/LKS_2022brochure.pdf";
    return {
      ...school,
      language: "2025/26初中數學、地理及科學等以英語授課；中文、中史等以中文授課",
      languageSourceUrl: ssp,
      sources: [...school.sources,
        { label: "家校會中學概覽2025/26：本校資料", url: ssp, scope: "按年級及科目列出教學語言；申請前核對新學年安排。" },
        { label: "校方學校概覽", url: brochure, scope: "校方學校簡介及科目語言，按文件年份理解。" },
      ],
      detailSections: [...(school.detailSections || []), {
        title: "教學語言與課程",
        details: [{ label: "科目授課語言", value: "2025/26初中數學、地理及科學等以英語授課；中國語文、中國歷史等以中文授課。高中語言依科目及年級而異，請查當屆概覽。", period: "2025/26", sourceUrl: ssp }],
      }],
    };
  }
  if (school.stage === "primary" && number === "170348") {
    const edb = "https://internationalschools.edb.gov.hk/en/schools/40.html";
    const esf = "https://join-us.esf.edu.hk/schools/esf-beacon-hill-school/";
    const poa = "https://www.edb.gov.hk/tc/student-parents/spa-systems/overview/index.html";
    return {
      ...school,
      telephone: "2336 5221",
      website: "https://beaconhill.esf.edu.hk/",
      gradeSpan: "Year 1–6，約5至11歲",
      schoolNet: "不參加小一入學統籌辦法；向英基申請",
      language: "英語為主要教學語言",
      languageSourceUrl: edb,
      curriculumType: "IB小學課程（PYP）",
      dataYear: "教育局國際學校資料及英基校方資料，核對2026-10-30；登記資料截至2026-10-23",
      sourceNote: "校址、電話及課程以教育局國際學校資料與英基校方頁核對；英基小學不參加小一入學統籌辦法。收費及當屆招生安排請向英基查詢。",
      sources: [...school.sources.filter((source) => !source.url.includes("chsc.hk/psp2026")),
        { label: "教育局國際學校資料", url: edb, scope: "校址、性別、語言與IB PYP課程；收費按適用年度另核對。" },
        { label: "英基Beacon Hill School", url: esf, scope: "校址、聯絡電話、年齡及課程。" },
        { label: "教育局學位分配制度", url: poa, scope: "英基小學不屬小一入學統籌辦法。" },
      ],
      detailSections: [...(school.detailSections || []).filter((section) => section.title !== "小學概覽｜學校概覽資料"), {
        title: "課程與申請",
        details: [
          { label: "課程與教學語言", value: "IB小學課程（PYP）；英語為主要教學語言。", sourceUrl: edb },
          { label: "小一學位安排", value: "英基小學不屬小一入學統籌辦法；家長須按英基當屆程序申請。", sourceUrl: poa },
        ],
      }],
    };
  }
  if (school.stage === "primary" && number && number in PRIMARY_REVIEWS) {
    const review = PRIMARY_REVIEWS[number as keyof typeof PRIMARY_REVIEWS];
    const psp = `https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=${review.psp}`;
    const feeUrl = `https://applications.edb.gov.hk/schoolsearch/schoolfee/${number}.pdf`;
    const tuition = `2026/27全年${review.fee}，10期、每期${review.perMonth}；其他費用另計`;
    return {
      ...school,
      tuition,
      language: "中文（包括普通話）及英文；中文科普教中，各科英語課時比例未公開",
      dataYear: "《小學概覽2026》及教育局2026-09-01生效收費證；教師統計2025/26；核對2026-10-25",
      sources: [...(school.sources || []),
        { label: "2026/27教育局收費證", url: feeUrl, scope: "全年與每期核准學費，不作下一學年報價。" },
        { label: "本校PSP2026詳細資料", url: psp, scope: "教師、班級及中學關係；學校提供及核實，並非獨立教學評鑑。" },
        { label: "校方中文科", url: review.chinese, scope: "核對普教中，不推算全部學科授課語言比例。" },
      ],
      detailSections: school.detailSections?.map((section) => section.title !== "小學概覽｜學校概覽資料" ? section : ({
        ...section,
        note: "收費及中學關係按2026/27資料核對；人員統計為2025/26。教師與班級比例不等於師生比例或每班同時在場人數。",
        details: section.details.map((detail) => {
          if (detail.label === "小一校網與班制") return { ...detail, value: "私立小學，不適用小一校網；全日", sourceUrl: psp };
          if (detail.label === "教學語言") return { ...detail, value: "中文（包括普通話）及英文；中文科普教中；各科英語課時比例未公開", sourceUrl: review.chinese };
          if (detail.label === "學費與校車") return { ...detail, value: `${tuition}；概覽列有校車，路線與費用另問校方`, period: "2026/27", sourceUrl: feeUrl };
          if (detail.label === "每班平均教師人數") return { ...detail, value: `${review.teachers}名教師、${review.classes}班，約${(review.teachers / review.classes).toFixed(2)}名教師／班；不是師生比例`, period: "2025/26教師統計", sourceUrl: psp };
          if (["直屬中學", "聯繫中學", "一條龍中學"].includes(detail.label)) return { ...detail, label: "中學關係", value: review.relation, sourceUrl: psp };
          return detail;
        }),
      })),
    };
  }
  if (school.stage === "kindergarten" && number === "531910") {
    const kgp = "https://kgp2026.kindergartenprofile.com/school/?schid=5319100001";
    const feeUrl = "https://applications.edb.gov.hk/schoolsearch/schoolfee/531910.pdf";
    return {
      ...school,
      tuition: "2026/27半日班扣資助後全年HK$5,440，10期、每期HK$544；其他費用另計",
      gradeSpan: "K1–K3，上午及下午班；本校址無PN、全日或延長服務",
      dataYear: "概覽2026/27；教師與比例2025年9月；收費2026-09-01生效；核對2026-10-25",
      sources: [...(school.sources || []),
        { label: "本校2026/27概覽", url: kgp, scope: "校址5319100001的班制、師資、語言與服務；不套用其他迦南校區。" },
        { label: "2026/27教育局收費證", url: feeUrl, scope: "扣資助後半日費用544×10=5440，並非免費。" },
      ],
      detailSections: [...(school.detailSections || []), { title: "當屆費用與校址資料", details: [
        { label: "核准學費", value: "K1–K3上午／下午扣資助後每年HK$5,440，分10期；書本、校服、茶點和交通另計", period: "2026/27", sourceUrl: feeUrl },
        { label: "師資與比例", value: "校長及教學人員41人，其中34人持學位；時段師生比上午1:9.3、下午1:9.4，不等於班額或一對一時間", period: "2025年9月", sourceUrl: kgp },
        { label: "照顧時段", value: "只設K1–K3上午、下午班；無2–3歲PN、全日及延長服務。歷史家長曾讀N的經驗不能代替本校址當屆安排", period: "2026/27概覽", sourceUrl: kgp },
      ] }],
    };
  }
  return school;
}

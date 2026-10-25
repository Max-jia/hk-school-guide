import type { PilotSchool } from "./school-directory-pilot";

// These are school-specific corrections backed by the 2026-10-25 research ledgers.
// Never apply a report's fees or secondary-school relationship to a namesake campus.
const PRIMARY_REVIEWS = {
  "575240": { fee: "HK$60,000", perMonth: "HK$6,000", teachers: 53, classes: 26, psp: 409, relation: "直屬高主教書院（資助男女校）；非一條龍，符合派位條件仍非保證", chinese: "https://rcps.raimondi.edu.hk/wordpress/curriculum/中文科/" },
  "132047": { fee: "HK$65,000", perMonth: "HK$6,500", teachers: 43, classes: 22, psp: 420, relation: "聯繫香港真光中學（資助女校）；男生不能沿此女中路線升讀，非保證", chinese: "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=38" },
} as const;

export function applyReviewedProfileFacts(school: PilotSchool): PilotSchool {
  const number = school.schoolNumber?.match(/^\d{6}/)?.[0];
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
          if (detail.label === "直屬中學") return { ...detail, label: "中學關係", value: review.relation, sourceUrl: psp };
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

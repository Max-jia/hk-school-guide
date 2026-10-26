import { applyReviewedProfileFacts } from "./reviewed-profile-facts";
import { applyKindergartenReviewedFields } from "./kindergarten-reviewed-fields";
import { prepareSecondaryProfile } from "./secondary-profile";
import { classifyPrimary } from "./primary-classification";
import { classifyKindergarten } from "./kindergarten-classification";
import type { Locale } from "@/lib/i18n";
import reportMeta from "@/content/report-meta.json";
import allRegisteredSchoolDirectory from "@/content/all-registered-school-directory.json";
import { KINDERGARTEN_BATCH_19 } from "./school-directory-batch-19";
import { KINDERGARTEN_BATCH_20 } from "./school-directory-batch-20";
import { KINDERGARTEN_BATCH_21 } from "./school-directory-batch-21";
import { KINDERGARTEN_BATCH_22 } from "./school-directory-batch-22";
import { KINDERGARTEN_BATCH_23 } from "./school-directory-batch-23";
import { KINDERGARTEN_BATCH_24 } from "./school-directory-batch-24";
import { KINDERGARTEN_BATCH_25 } from "./school-directory-batch-25";
import { KINDERGARTEN_BATCH_26 } from "./school-directory-batch-26";
import { KINDERGARTEN_BATCH_27 } from "./school-directory-batch-27";
import { KINDERGARTEN_BATCH_28 } from "./school-directory-batch-28";
import { KINDERGARTEN_BATCH_29 } from "./school-directory-batch-29";
import { KINDERGARTEN_BATCH_30 } from "./school-directory-batch-30";
import { KINDERGARTEN_BATCH_31 } from "./school-directory-batch-31";
import { KINDERGARTEN_BATCH_32 } from "./school-directory-batch-32";
import { KINDERGARTEN_BATCH_33 } from "./school-directory-batch-33";
import { KINDERGARTEN_BATCH_34 } from "./school-directory-batch-34";
import { KINDERGARTEN_BATCH_35 } from "./school-directory-batch-35";
import { KINDERGARTEN_BATCH_36 } from "./school-directory-batch-36";
import { KINDERGARTEN_BATCH_37 } from "./school-directory-batch-37";
import { KINDERGARTEN_BATCH_38 } from "./school-directory-batch-38";
import { KINDERGARTEN_BATCH_39 } from "./school-directory-batch-39";
import { KINDERGARTEN_BATCH_40 } from "./school-directory-batch-40";
import { KINDERGARTEN_BATCH_41 } from "./school-directory-batch-41";
import { KINDERGARTEN_BATCH_42 } from "./school-directory-batch-42";
import { KINDERGARTEN_BATCH_43 } from "./school-directory-batch-43";
import { KINDERGARTEN_BATCH_44 } from "./school-directory-batch-44";
import { KINDERGARTEN_BATCH_45 } from "./school-directory-batch-45";
import { KINDERGARTEN_BATCH_46 } from "./school-directory-batch-46";
import { KINDERGARTEN_BATCH_47 } from "./school-directory-batch-47";
import { KINDERGARTEN_BATCH_48 } from "./school-directory-batch-48";
import { KINDERGARTEN_BATCH_49 } from "./school-directory-batch-49";
import { KINDERGARTEN_BATCH_50 } from "./school-directory-batch-50";
import { KINDERGARTEN_BATCH_51 } from "./school-directory-batch-51";
import { KINDERGARTEN_BATCH_52 } from "./school-directory-batch-52";
import { KINDERGARTEN_BATCH_53 } from "./school-directory-batch-53";
import { KINDERGARTEN_BATCH_54 } from "./school-directory-batch-54";
import { KINDERGARTEN_BATCH_55 } from "./school-directory-batch-55";
import { KINDERGARTEN_BATCH_56 } from "./school-directory-batch-56";
import { KINDERGARTEN_BATCH_57 } from "./school-directory-batch-57";
import { KINDERGARTEN_BATCH_58 } from "./school-directory-batch-58";
import { KINDERGARTEN_BATCH_59 } from "./school-directory-batch-59";
import { KINDERGARTEN_BATCH_60 } from "./school-directory-batch-60";
import { KINDERGARTEN_BATCH_61 } from "./school-directory-batch-61";
import { KINDERGARTEN_BATCH_62 } from "./school-directory-batch-62";
import { KINDERGARTEN_BATCH_63 } from "./school-directory-batch-63";
import { KINDERGARTEN_BATCH_64 } from "./school-directory-batch-64";
import { KINDERGARTEN_BATCH_65 } from "./school-directory-batch-65";
import { KINDERGARTEN_BATCH_66 } from "./school-directory-batch-66";
import { KINDERGARTEN_BATCH_67 } from "./school-directory-batch-67";
import { KINDERGARTEN_BATCH_68 } from "./school-directory-batch-68";
import { KINDERGARTEN_BATCH_69 } from "./school-directory-batch-69";
import { KINDERGARTEN_BATCH_70 } from "./school-directory-batch-70";
import { KINDERGARTEN_BATCH_71 } from "./school-directory-batch-71";
import { KINDERGARTEN_BATCH_72 } from "./school-directory-batch-72";
import { KINDERGARTEN_BATCH_73 } from "./school-directory-batch-73";
import { KINDERGARTEN_BATCH_74 } from "./school-directory-batch-74";
import { KINDERGARTEN_BATCH_75 } from "./school-directory-batch-75";
import { KINDERGARTEN_BATCH_76 } from "./school-directory-batch-76";
import { KINDERGARTEN_BATCH_77 } from "./school-directory-batch-77";
import { KINDERGARTEN_BATCH_78 } from "./school-directory-batch-78";
import { KINDERGARTEN_BATCH_79 } from "./school-directory-batch-79";
import { KINDERGARTEN_BATCH_80 } from "./school-directory-batch-80";
import { KINDERGARTEN_BATCH_81 } from "./school-directory-batch-81";
import { KINDERGARTEN_BATCH_82 } from "./school-directory-batch-82";
import { KINDERGARTEN_BATCH_83 } from "./school-directory-batch-83";
import { KINDERGARTEN_BATCH_84 } from "./school-directory-batch-84";
import { KINDERGARTEN_BATCH_85 } from "./school-directory-batch-85";
import { KINDERGARTEN_BATCH_86 } from "./school-directory-batch-86";
import { KINDERGARTEN_BATCH_87 } from "./school-directory-batch-87";
import { KINDERGARTEN_BATCH_88 } from "./school-directory-batch-88";
import { KINDERGARTEN_BATCH_89 } from "./school-directory-batch-89";
import { KINDERGARTEN_BATCH_90 } from "./school-directory-batch-90";
import { KINDERGARTEN_BATCH_91 } from "./school-directory-batch-91";
import { KINDERGARTEN_BATCH_92 } from "./school-directory-batch-92";
import { KINDERGARTEN_BATCH_93 } from "./school-directory-batch-93";
import { KINDERGARTEN_BATCH_94 } from "./school-directory-batch-94";
import { KINDERGARTEN_BATCH_95 } from "./school-directory-batch-95";
import { KINDERGARTEN_BATCH_96 } from "./school-directory-batch-96";
import { KINDERGARTEN_BATCH_97 } from "./school-directory-batch-97";
import { KINDERGARTEN_BATCH_98 } from "./school-directory-batch-98";
import { KINDERGARTEN_BATCH_99 } from "./school-directory-batch-99";
import { KINDERGARTEN_BATCH_100 } from "./school-directory-batch-100";
import { KINDERGARTEN_BATCH_101 } from "./school-directory-batch-101";
import { KINDERGARTEN_BATCH_102 } from "./school-directory-batch-102";
import { KINDERGARTEN_BATCH_103 } from "./school-directory-batch-103";
import { KINDERGARTEN_BATCH_104 } from "./school-directory-batch-104";
import { KINDERGARTEN_BATCH_105 } from "./school-directory-batch-105";
import { KINDERGARTEN_BATCH_106 } from "./school-directory-batch-106";
import { KINDERGARTEN_BATCH_107 } from "./school-directory-batch-107";
import { KINDERGARTEN_BATCH_108 } from "./school-directory-batch-108";
import { KINDERGARTEN_BATCH_109 } from "./school-directory-batch-109";
import { KINDERGARTEN_BATCH_110 } from "./school-directory-batch-110";
import { KINDERGARTEN_BATCH_111 } from "./school-directory-batch-111";
import { KINDERGARTEN_BATCH_112 } from "./school-directory-batch-112";
import { KINDERGARTEN_BATCH_18 } from "./school-directory-batch-18";
import { KINDERGARTEN_BATCH_17 } from "./school-directory-batch-17";
import { KINDERGARTEN_BATCH_16 } from "./school-directory-batch-16";
import { KINDERGARTEN_BATCH_15 } from "./school-directory-batch-15";
import { KINDERGARTEN_BATCH_14 } from "./school-directory-batch-14";
import { KINDERGARTEN_BATCH_13 } from "./school-directory-batch-13";
import { KINDERGARTEN_BATCH_12 } from "./school-directory-batch-12";

export type SchoolStage = "kindergarten" | "primary" | "secondary";

export type SchoolSource = {
  label: string;
  scope: string;
  url: string;
};

export type SchoolDetail = {
  label: string;
  value: string;
  period?: string;
  sourceUrl: string;
};

export type SchoolDetailSection = {
  title: string;
  note?: string;
  featured?: boolean;
  details: SchoolDetail[];
};

export type PilotSchool = {
  stage: SchoolStage;
  slug: string;
  name: string;
  nameEn: string;
  district: string;
  districts?: string[];
  address: string;
  telephone?: string;
  schoolNumber?: string;
  registrationStatus?: string;
  principal?: string;
  establishedYear?: string;
  sponsoringBody?: string;
  schoolType: string;
  schoolCategories?: string[];
  curriculumType?: string;
  classificationSources?: SchoolSource[];
  gender?: string;
  religion?: string;
  schoolNet?: string;
  tuition?: string;
  language?: string;
  languageSourceUrl?: string;
  gradeSpan: string;
  website: string;
  dataYear: string;
  reviewedAt?: string;
  sourceNote: string;
  reportSlug?: string;
  relatedReportSlugs?: string[];
  /** Explicitly clear generated report links when the available report is for another campus. */
  clearDirectoryReports?: boolean;
  registryKey?: string;
  registryLocations?: number;
  /** Append reviewed school-specific sections to the generated registered-school facts. */
  appendDirectoryDetails?: boolean;
  /** Replace generated overview sections while retaining the registered identity section. */
  replaceDirectoryDetails?: boolean;
  /** Remove selected generated sections/sources when a newer school-specific source supersedes them. */
  omitDirectoryDetailTitles?: string[];
  omitDirectorySourceUrls?: string[];
  /** Replace the broad generated source list with a reviewed, school-specific list. */
  replaceDirectorySources?: boolean;
  /** Scope curated details to the school as a whole or to one registered location. */
  directoryDetailScope?: "school" | "location";
  /** Use a manually checked Chinese school name when generated directory data lacks it. */
  directoryNameOverride?: boolean;
  sources: SchoolSource[];
  detailSections?: SchoolDetailSection[];
};

export const SCHOOL_STAGES: Record<SchoolStage, {
  label: string;
  shortLabel: string;
  intro: string;
  description: string;
  directoryHref: string;
  guides: { label: string; description: string; href: string }[];
}> = {
  kindergarten: {
    label: "幼稚園",
    shortLabel: "幼稚園",
    intro: "先看孩子每天會經歷什麼，再比較課程、語言、照顧與升小安排。",
    description: "按區份瀏覽香港幼稚園的基本資料，先確認學校身份、地址與公開安排，再進一步看個別學校報告。",
    directoryHref: "/schools/kindergarten/directory",
    guides: [
      { label: "K1 報名與面試", description: "按申請時間、文件、面見和註冊次序準備。", href: "/blog/topics/kindergarten-admission" },
      { label: "幼稚園比較與升小", description: "比較課程、語言、照顧和升小銜接，不把聯繫當成保證。", href: "/blog/topics/kindergarten-selection" },
      { label: "學費與資助", description: "拆分學費、雜費與不同資助，估算實際家庭支出。", href: "/blog/topics/kindergarten-fees-support" },
    ],
  },
  primary: {
    label: "小學",
    shortLabel: "小學",
    intro: "把校網、入學制度、教學安排和升中出口放在同一個選校框架。",
    description: "先按學校類別與地區縮小名單，再核對小一入學安排、課程、費用和升中銜接。",
    directoryHref: "/schools/primary/directory",
    guides: [
      { label: "小一派位與入學", description: "按自行分配、統一派位和校本申請安排下一步。", href: "/blog/topics/primary-admission" },
      { label: "校網與地區選校", description: "先核實住址與校網，再看志願次序和派位風險。", href: "/blog/topics/primary-school-net" },
      { label: "小學專題與比較", description: "由具體學校資料比較課程、收生和升中路徑。", href: "/blog/topics/primary-school-profiles" },
    ],
  },
  secondary: {
    label: "中學",
    shortLabel: "中學",
    intro: "先分清升中制度、學校收生方式與課程路線，再判斷學校定位是否適合孩子。",
    description: "按地區瀏覽本地中學及本站已有資料頁的國際學校；收費、課程和收生安排均按來源年度標示。",
    directoryHref: "/schools/secondary/directory",
    guides: [
      { label: "直屬、一條龍與聯繫", description: "看清不同升學關係代表什麼，不把保留學額誤讀成無條件直升。", href: "/blog/through-train-guide" },
      { label: "中學深度報告", description: "從課程、收生、升學和家庭適配度逐校分析。", href: "/reports" },
      { label: "先定孩子的升學路線", description: "比較 DSE、IB、A-Level 等路線，再核對學校實際提供的課程。", href: "/planning?stage=secondary" },
    ],
  },
};

const EDB_KC_KG = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kc.html";
const EDB_SSP = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ssp.html";
const EDB_ST = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-st.html";
const EDB_CANNAN = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=531910000112";
const KGP_CANNAN = "https://kgp2026.kindergartenprofile.com/school/?schid=5319100001";
const KGP_SUN = "https://kgp2026.kindergartenprofile.com/school/?schid=2156780002";
const CANNAN_ABOUT = "https://www.cannan.edu.hk/about";
const CANNAN_KG_CURRICULUM = "https://www.cannan.edu.hk/kindergarten";
const SUN_PROFILE = "https://sunisland.edu.hk/zh/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/";
const SUN_CURRICULUM = "https://sunisland.edu.hk/zh/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B/";
const SUN_TKW = "https://sunisland.edu.hk/zh/我們的分校/土瓜灣分校/";
const EDB_POA_40 = "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net40.pdf";
const PSP_PUIKEI = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=323";
const PSP_FCMS = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=175";
const FCMS_MISSION = "https://www.fcms.edu.hk/tc/%E8%BE%A6%E5%AD%B8%E5%AE%97%E6%97%A8";
const FCMS_PROFILE = "https://www.fcms.edu.hk/tc/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B";
const SSP_DBS = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=2";
const SSP_PLK83 = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=4";
const DBS_MISSION = "https://www.dbs.edu.hk/index.php?m=schoolmission&s=profile";
const DBS_POLICY = "https://www.dbs.edu.hk/index.php?m=schoolpolicy&s=profile";
const DBS_FEE = "https://www.dbs.edu.hk/index.php?m=schoolfee&s=admission";
const DBS_G7 = "https://www.dbs.edu.hk/index.php?m=g7appc&s=admission";
const KGP_BRAEMAR = "https://kgp2026.kindergartenprofile.com/school/?schid=5659380002";
const KGP_BRAEMAR_HISTORICAL = "https://kgp2022.azurewebsites.net/edb/SchoolPDF/565938c-0002.pdf";
const BRAEMAR_HOME = "https://bhns.edu.hk/en/index.html";
const BRAEMAR_PHILOSOPHY = "https://bhns.edu.hk/en/school-philosophy.html";
const BRAEMAR_MISSION = "https://www.braemarhillnurseryschool.edu.hk/tc/our-mission.html";
const EDB_WAN_CH_KG = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-wch.html";
const EDB_BRAEMAR_FEE = "https://applications.edb.gov.hk/schoolsearch/schoolfee/565938.pdf";
const PSP_MOSLL = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=320";
const MOSLL_MISSION = "https://mosllps.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&nocache=&refid=1668";
const SSP_SPCC = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=275";
const SPCC_MISSION = "https://www.spcc.edu.hk/chi//about/the-school/vision-and-mission";
const CCKG_HOME = "https://www.cckg.edu.hk/";
const CCKG_CURRICULUM = "https://www.cckg.edu.hk/curriculum-approach";
const CCKG_LANGUAGE = "https://www.cckg.edu.hk/medium-of-instruction";
const CCKG_FEES = "https://www.cckg.edu.hk/fees";
const CCKG_CONTACT = "https://www.cckg.edu.hk/contact-us";
const CCKG_RELIGION = "https://www.cckg.edu.hk/religious-affiliation";
const CCKG_PRINCIPAL = "https://www.cckg.edu.hk/our-principal";
const EDB_CCKG_FEES_CERT = "https://applications.edb.gov.hk/schoolsearch/schoolfee/210196.pdf";
const EDB_SUNKEI = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=1&scrn=522171000123";
const PSP_CMASK = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=219";
const CMASK_MISSION = "https://www.sunkei.edu.hk/tc/%E7%B0%A1%E4%BB%8B";
const SSP_DGS = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=3";
const DGS_ADMISSIONS = "https://www.dgs.edu.hk/school-profile/82-dgs/admissions";
const KGP_STCAT_NORFOLK = "https://kgp2026.kindergartenprofile.com/school/?schid=2151200001";
const KGP_STCAT_ESSEX = "https://kgp2026.kindergartenprofile.com/school/?schid=2151200002";
const PSP_SKHHPS = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=311";
const SKHHPS_PHILOSOPHY = "https://www.skhhsps.edu.hk/zh_tw/site/view?name=%E8%BE%A6%E5%AD%B8%E7%90%86%E5%BF%B5";
const SKHHPS_OVERVIEW_2025 = "https://www.skhhsps.edu.hk/uploads/files/%E8%81%96%E5%85%AC%E6%9C%83%E4%B8%BB%E9%A2%A8%E5%B0%8F%E5%AD%B8%20%E7%B0%A1%E4%BB%8Bv6-2%282%29.pdf";
const SSP_LASALLE = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=177";
const LASALLE_MISSION = "https://www.lasalle.edu.hk/our-college/vision-mission/";
const LASALLE_CURRICULUM = "https://www.lasalle.edu.hk/our-college/academic/subject-offered/";
const KCBK_CAMPUS = "https://www.kcbckg.edu.hk/校園介紹/";
const KCBK_CURRICULUM = "https://www.kcbckg.edu.hk/課程特色/";
const KCBK_MORAL_EDUCATION = "https://www.kcbckg.edu.hk/品德教育/";
const PLK_TAYSF_ADMISSION = "https://www.plkkgs.edu.hk/plktaysfmkg/hk/custom/custom_page/32";
const PLK_TAYSF_ENGLISH = "https://www.poleungkuk.org.hk/service/education/plktaysfmkg20241112";
const TAKSUN_KG_PROFILE = "https://taksunkg.edu.hk/?page_id=37";
const TAKSUN_KG_CURRICULUM = "https://taksunkg.edu.hk/?page_id=40";
const HFC_PROFILE_2026 = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=85";
const HFC_MISSION = "https://www.hfkc.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=1211";
const SSP_MCS = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=213";
const MCS_MISSION = "https://www.mcs.edu.hk/mission-and-vision";
const MCS_SCHOOL_CURRICULUM = "https://mcs.edu.hk/school-based-curriculum";
const SOKA_ABOUT = "https://soka.edu.hk/about-us";
const SOKA_ADMISSION = "https://soka.edu.hk/admission";
const KGP_SOKA = "https://kgp2026.kindergartenprofile.com/school/?schid=3258560001";
const PSP_LCHHDS = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=474";
const LCHHDS_CURRICULUM = "https://htsps.edu.hk/tc/content.php?wid=292";
const LCHHDS_HOME = "https://www.htsps.edu.hk/tc/";
const SSP_QUEENS = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=128";
const QUEENS_MISSION = "https://www.qc.edu.hk/en/site/view?name=Mission+Statement";
const QUEENS_LANGUAGE = "https://www.qc.edu.hk/en/site/view?name=Language+of+Instruct";
const SPK_PROFILE = "https://www.spk.edu.hk/w2/public/";
const SPK_ADMISSION = "https://www.spk.edu.hk/w2/public/admission.php?id=8";
const KGP_SPK = "https://kgp2026.kindergartenprofile.com/school/?schid=2146120001";
const SPK_REGISTRY = "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-wch.html";
const SPN_EDB = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=563188000113";
const KGP_ICHKHLY = "https://kgp2026.kindergartenprofile.com/school/?schid=2309440001";
const ICHK_KG = "https://ichkhly.edu.hk/about-ichkhly/our-school/kindergarten/";
const EDB_BASIC_REGISTER = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const ICHK_OVERVIEW = "https://ichkhly.edu.hk/about-ichkhly/our-school/ichkhly-at-a-glance/";
const ICHK_FEES = "https://ichkhly.edu.hk/admissions/dates-fees-more/";
const KGP_PLK_EKLKC = "https://kgp2026.kindergartenprofile.com/school/?schid=6057350001";
const PLK_EKLKC_INFO = "https://www.plkkgs.edu.hk/plkeklkckg/hk/info/6";
const PLK_EKLKC_CURRICULUM = "https://www.plkkgs.edu.hk/plkeklkckg/hk/info/28";
const PLK_POSED = "https://www.plkkgs.edu.hk/shared/hk/custom/parent_zone/25";
const KGP_TAI_O = "https://kgp2026.kindergartenprofile.com/school/?schid=1552330002";
const TAI_O_HOME = "https://www.cmataiokg.com/";
const KGP_AOGUC = "https://kgp2026.kindergartenprofile.com/school/?schid=5438610001";
const AOGUC_HOME = "https://www.aoguck.edu.hk/zh";
const AOGUC_MEDIA = "https://www.aoguck.edu.hk/wp-content/uploads/2024/05/%E8%8D%B7%E8%8A%B1%E5%87%BA%E7%89%88%E7%A4%BE%E3%80%8AOURS%E3%80%8B.pdf";
const KGP_STJAMES = "https://kgp2026.kindergartenprofile.com/school/?schid=3257080001";
const STJAMES_ABOUT = "https://www.sjck.edu.hk/zh-hant/about/";
const KGP_SINGYAN = "https://kgp2026.kindergartenprofile.com/school/?schid=1584100001";
const SINGYAN_CURRICULUM = "https://singyan.edu.hk/tc/content.php?wid=11";
const SINGYAN_SUPPORT = "https://singyan.edu.hk/tc/content.php?wid=57";
const KGP_KOWLOON_CANNAN = "https://kgp2026.kindergartenprofile.com/school/?schid=3249300002";
const KOWLOON_CANNAN_CURRICULUM = "https://www.cannan.edu.hk/kindergarten";
const KGP_YMCA_KC = "https://kgp2026.kindergartenprofile.com/school/?schid=5646800001";
const YMCA_KC_OVERVIEW = "https://www.kccymca.edu.hk/wp-content/uploads/2025/09/%E7%B5%84%E5%90%88-1.pdf";
const KGP_STTHOMAS = "https://kgp2026.kindergartenprofile.com/school/?schid=5325330001";
const STTHOMAS_INFO = "https://www.stthomas.edu.hk/chi/about-us/general-information";
const STTHOMAS_ADMISSIONS = "https://www.stthomas.edu.hk/admissions";
const KGP_TWGH_GM = "https://kgp2026.kindergartenprofile.com/school/?schid=3257670002";
const TWGH_GM_HOME = "https://www.twghsgmk.edu.hk/";
const KGP_KATHERINE_MA = "https://kgp2026.kindergartenprofile.com/school/?schid=6110930001";
const KATHERINE_MA_HOME = "https://www.katherine-kindergarten.edu.hk/";
const KATHERINE_MA_ADMISSION = "https://www.katherine-kindergarten.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/";
const KGP_CHAN_KING_HAR = "https://kgp2026.kindergartenprofile.com/school/?schid=1573840001";
const CHAN_KING_HAR_HOME = "https://www.twghckhkg.edu.hk/";
const KGP_EPIPHANY = "https://kgp2026.kindergartenprofile.com/school/?schid=1590000001";
const EPIPHANY_HOME = "https://www.coekg.edu.hk/";
const EPIPHANY_ADMISSION = "https://www.coekg.edu.hk/l/fa09cCQ9VAQ";
const KGP_FANLING_BAPTIST = "https://kgp2026.kindergartenprofile.com/school/?schid=1562300001";
const FANLING_BAPTIST_HOME = "http://www.fbclmckg.edu.hk/";
const FANLING_BAPTIST_PLAN_2018 = "https://www.fbclmckg.edu.hk/wp-content/uploads/2019/05/2018-19%E5%B9%B4%E5%BA%A6%E9%80%B1%E5%B9%B4%E8%A8%88%E5%8A%83.pdf";
const CHU_SUI_LAN_HOME = "https://www.cslkg.edu.hk/";
const CHU_SUI_LAN_ADMISSION = "https://www.cslkg.edu.hk/%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92-admission-arrangements";
const KGP_SA_CCF = "https://kgp2026.kindergartenprofile.com/school/?schid=5767430001";
const SA_CCF_CURRICULUM = "https://salvationarmy.org.hk/esd/ccfkg/our-curriculum.html";
const SA_CCF_SERVICES = "https://salvationarmy.org.hk/esd/ccfkg/our-services.html";
const KGP_KHALSA_TIN_HAU = "https://kgp2026.kindergartenprofile.com/school/?schid=3238530002";
const KHALSA_CURRICULUM = "https://www.kdkkindergarten.edu.hk/?page_id=1066";
const KHALSA_HOME = "https://www.kdkkindergarten.edu.hk/";
const KGP_MANSANG_WEST = "https://kgp2026.kindergartenprofile.com/school/?schid=6037240001";
const MANSANG_CURRICULUM = "https://mansangkg.edu.hk/curriculum?lang=cht";
const MANSANG_SESSIONS = "https://mansangkg.edu.hk/sessions?lang=cht";
const KGP_JADE = "https://kgp2026.kindergartenprofile.com/school/?schid=5243600002";
const JADE_PROFILE = "https://vichykg.tripod.com/jade/content.htm";
const KGP_TAI_PO_RHENISH = "https://kgp2026.kindergartenprofile.com/school/?schid=1508600003";
const TAI_PO_RHENISH_HOME = "https://www.rcktp.edu.hk/";
const TAI_PO_RHENISH_CURRICULUM = "https://www.rcktp.edu.hk/?page_id=706";
const TAI_PO_RHENISH_SCHOOL_INFO = "https://www.rcktp.edu.hk/?page_id=11676";
const TAI_PO_RHENISH_BACKGROUND = "https://www.rcktp.edu.hk/?page_id=623";
const KGP_SKH_KG = "https://kgp2026.kindergartenprofile.com/school/?schid=1316360002";
const SKH_KG_CURRICULUM = "https://www.skhkg.edu.hk/課程與支援/教學目標及策略/";
const SKH_KG_CLASSES = "https://www.skhkg.edu.hk/about-us/classes-and-fees/";
const KGP_MK_AGNES = "https://kgp2026.kindergartenprofile.com/school/?schid=5169290001";
const KGP_MK_AGNES_2023 = "https://kgp2023.azurewebsites.net/edb/SchoolPDF/516929c-0001.pdf";
const KGP_MAYNGA_BRANCH = "https://kgp2026.kindergartenprofile.com/school/?schid=3257750002";
const MAYNGA_HOME = "https://www.maynga.edu.hk/";
const MAYNGA_INFO_2025 = "https://www.maynga.edu.hk/download/pdf/2026-2027/25-26學校資料(加網頁).pdf";
const KGP_BUDDHIST_WKM = "https://kgp2026.kindergartenprofile.com/school/?schid=1587200001";
const BUDDHIST_WKM_ABOUT = "https://www.bwkk.edu.hk/學校簡介";
const BUDDHIST_WKM_HOME = "https://www.bwkk.edu.hk/";
const KGP_CREATIVE_MOS = "https://kgp2026.kindergartenprofile.com/school/?schid=6271780001";
const CREATIVE_MOS_HOME = "https://creative.edu.hk/ckmos/";
const KGP_CHUEN_YUEN = "https://kgp2026.kindergartenprofile.com/school/?schid=5599620001";
const CHUEN_YUEN_HOME = "https://www.ccccyk.edu.hk/";
const CHUEN_YUEN_REPORT_2024 = "https://www.ccccyk.edu.hk/wp-content/uploads/2025/10/24-25-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A-%E5%85%A8%E5%AE%8C%E5%B9%BC%E7%A8%9A%E5%9C%92%E7%B6%B2%E9%A0%81%E7%89%88_compressed-1.pdf";
const KGP_YMCA_TSW = "https://kgp2026.kindergartenprofile.com/school/?schid=5412300001";
const YMCA_TSW_HOME = "https://www.tswcymca.edu.hk/";
const YMCA_TSW_PARENT = "https://ymca.org.hk/service/school/";
const KGP_QINGSUNG_YUNGA = "https://kgp2026.kindergartenprofile.com/school/?schid=5201440002";
const QINGSUNG_YUNGA_HOME = "https://www.ccynkg.edu.hk/background";
const QINGSUNG_YUNGA_KGP_2023 = "https://kgp2023.azurewebsites.net/edb/SchoolPDF/520144c-0002.pdf";
const KGP_PLK_TLLC = "https://kgp2026.kindergartenprofile.com/school/?schid=1586230002";
const PLK_TLLC_HOME = "https://www.plkkgs.edu.hk/plktllckg/hk";
const PLK_TLLC_CURRICULUM_2023 = "https://kgp2023.azurewebsites.net/edb/SchoolPDF/158623c-0002.pdf";
const PLK_TLLC_ACTIVITIES = "https://www.plkkgs.edu.hk/plktllckg/hk/info/4";
const KGP_FU_HENG = "https://kgp2026.kindergartenprofile.com/school/?schid=1589090001";
const KGP_FAOG = "https://kgp2026.kindergartenprofile.com/school/?schid=1337790001";
const FAOG_PHILOSOPHY = "https://faogkg.edu.hk/teaching-philosophy-tc/";
const FAOG_CURRICULUM = "https://faogkg.edu.hk/curriculum-tc/";
const PLK_KAM_HING_HOME = "https://www.plkkgs.edu.hk/plkkhkg/";
const PLK_KAM_HING_CURRICULUM = "https://www.plkkgs.edu.hk/plkkhkg/hk/about/101";
const KGP_PLK_QUEENS_HILL = "https://kgp2026.kindergartenprofile.com/school/?schid=5163840002";
const PLK_QUEENS_HILL_ABOUT = "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/about/10";
const PLK_QUEENS_HILL_FEES = "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/info/27";
const KGP_CACLWT_YT = "https://kgp2026.kindergartenprofile.com/school/?schid=5231780002";
const CACLWT_YT_HOME = "https://www.caclwtkg.edu.hk/";
const CACLWT_YT_ADMISSION = "https://www.caclwtkg.edu.hk/入學申請/";
const KGP_CANNAN_TW = "https://kgp2026.kindergartenprofile.com/school/?schid=5163760001";
const CANNAN_KG = "https://www.cannan.edu.hk/kindergarten";
const KGP_TRUE_LIGHT_KG = "https://kgp2026.kindergartenprofile.com/school/?schid=1320470001";
const TRUE_LIGHT_FEES = "https://applications.edb.gov.hk/schoolsearch/schoolfee/132047.pdf";
const TRUE_LIGHT_KG_SITE = "https://www.tlmshkps.edu.hk/kindergarten";
const KGP_FUN_CREATIVE_KT = "https://kgp2026.kindergartenprofile.com/school/?schid=3230550001";
const FUN_CREATIVE_CURRICULUM = "https://www.funcreative.edu.hk/en/our-school/curriculum/";
const FUN_CREATIVE_FEES = "https://www.funcreative.edu.hk/學與教/學校收費/學校收費/";
const FUN_CREATIVE_KT_ADDRESS = "https://www.funcreative.edu.hk/聯絡我們/觀塘分校/";
const KGP_ANCHORS_TP = "https://kgp2026.kindergartenprofile.com/school/?schid=5360670001";
const ANCHORS_TP_EDB_FEES = "https://applications.edb.gov.hk/schoolsearch/schoolfee/536067.pdf";
const KGP_CARITAS_SF_SH = "https://kgp2026.kindergartenprofile.com/school/?schid=3205440002";
const CARITAS_SF_KGP_2023 = "https://kgp2023.azurewebsites.net/edb/SchoolPDF/320544c-0002.pdf";
const CARITAS_SF_EDB_REPORT_2021 = "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_StFrancis.pdf";
const KGP_SHEUNG_SHUI_RHENISH = "https://kgp2026.kindergartenprofile.com/school/?schid=1574060001";
const KGP_KAI_CHI = "https://kgp2026.kindergartenprofile.com/school/?schid=6249180001";
const KGP_MAN_SANG_QB = "https://kgp2026.kindergartenprofile.com/school/?schid=6306400001";
const KGP_GUIDEPOSTS_TUEN_MUN = "https://kgp2026.kindergartenprofile.com/school/?schid=1569300001";
const KGP_WOFOO = "https://kgp2026.kindergartenprofile.com/school/?schid=6301600001";
const KGP_SUN_ISLAND_TKW = "https://kgp2026.kindergartenprofile.com/school/?schid=2156780002";
const KGP_SUN_ISLAND_TKW_0001 = "https://kgp2026.kindergartenprofile.com/school/?schid=2156780001";
const KGP_KORNHILL_MOS = "https://kgp2026.kindergartenprofile.com/school/?schid=2158480002";
const KGP_CREATIVE_TUNG_CHUNG = "https://kgp2026.kindergartenprofile.com/school/?schid=2158300002";
const KGP_CHU_SUI_LAN = "https://kgp2026.kindergartenprofile.com/school/?schid=1583800001";
const KGP_SUN_ISLAND_SYP = "https://kgp2026.kindergartenprofile.com/school/?schid=5527390002";
const GUIDEPOSTS_TUEN_MUN_HOME = "https://www.guideposts.edu.hk/SiuOnSchool/index.php";
const SUN_ISLAND_FAQ = "https://sunisland.edu.hk/zh/%E5%B8%B8%E2%BE%92%E5%95%8F%E9%A1%8C/";
const MANSANG_QB_APPLICATION = "https://mansangkg.edu.hk/cms/images/data/HKMSKG%20-%202026-2027%20Application%20Form.pdf";
const NTWJWA_EARLY_CHILDHOOD = "https://www.ntwjwa.org.hk/zh/early-childhood";
const NTWJWA_WOFOO_ANNOUNCEMENT = "https://www.ntwjwa.org.hk/zh/news/news20260402";
const KAI_CHI_HOME = "https://ccskg.edu.hk/";
const KORNHILL_HOME = "https://www.kcackg.edu.hk/";
const CREATIVE_CURRICULUM = "https://creative.edu.hk/curriculum/";
const CREATIVE_ADMISSION = "https://creative.edu.hk/admissions/";
const SUN_ISLAND_SYP_HOME = "https://sunisland.edu.hk/branches/saiyingpun-branch";
const SUN_ISLAND_SYP_FEES = "https://applications.edb.gov.hk/schoolsearch/schoolfee/552739.pdf";
const KGP_CHUEN_YUEN_CHURCH = "https://kgp2026.kindergartenprofile.com/school/?schid=1522690001";
const CHUEN_YUEN_CHURCH_HOME = "https://www.cychurch.edu.hk/";
const CHUEN_YUEN_CHURCH_ADMISSION = "https://www.cychurch.edu.hk/tc/%E5%A0%B1%E5%90%8D%E6%B5%81%E7%A8%8B";
const SHEUNG_SHUI_RHENISH_HOME = "https://sskg.ppe.rhenish.org/";
const SHEUNG_SHUI_RHENISH_KGP_2023 = "https://kgp2023.azurewebsites.net/edb/SchoolPDF/157406c-0001.pdf";
const FU_HENG_HOME = "https://www.fuhengkg.edu.hk/";
const FU_HENG_PRINCIPAL = "https://www.fuhengkg.edu.hk/校長心聲/";
const FU_HENG_ADMISSION_2026 = "https://www.fuhengkg.edu.hk/入學申請/";
const KGP_MK_AGNES_2025 = "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6810";
const BUDDHIST_WKM_CURRICULUM = "https://www.bwkk.edu.hk/課程";
const CHUEN_YUEN_CURRICULUM = "https://www.ccccyk.edu.hk/?page_id=389";
const CHUEN_YUEN_REPORT_2023_24 = "https://www.ccccyk.edu.hk/wp-content/uploads/2024/11/2023-2024-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%EF%BC%88%E6%95%B4%E5%90%88%EF%BC%89%E7%B6%B2%E9%A0%81%E7%89%88.pdf";
const YMCA_TSW_KGP_2025 = "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6732";
const QINGSUNG_YUNGA_KGP_2025 = "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6737";
const PLK_TLLC_KGP_2025 = "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6545";
const FU_HENG_PROFILE = "https://kgp2026.kindergartenprofile.com/school/?schid=1589090001";
const PSP_HTY = "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=49";
const HTY_CURRICULUM = "https://www.hkcwc-htyps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=40&pageId=42&webPageId=35";
const HTY_LIFE_EDUCATION = "https://www.hkcwc-htyps.edu.hk/CP/pG/61/583/69";
const HTY_DIGITAL_EDUCATION = "https://www.hkcwc-htyps.edu.hk/CP/pG/152/1859/158";
const SSP_HEEP_YUNN = "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=399";
const HYS_ABOUT = "https://www.hys.edu.hk/en/explore/about/";
const HYS_CURRICULUM = "https://www.hys.edu.hk/curriculum/";
const HYS_ADMISSION = "https://www.hys.edu.hk/en/admission/form1admissions/";

/** Reviewed local-school profile records; international schools are a later batch. */
export const PILOT_SCHOOLS: PilotSchool[] = [
  ...KINDERGARTEN_BATCH_32,
  ...KINDERGARTEN_BATCH_31,
  ...KINDERGARTEN_BATCH_30,
  ...KINDERGARTEN_BATCH_29,
  ...KINDERGARTEN_BATCH_28,
  ...KINDERGARTEN_BATCH_27,
  ...KINDERGARTEN_BATCH_26,
  ...KINDERGARTEN_BATCH_25,
  ...KINDERGARTEN_BATCH_24,
  ...KINDERGARTEN_BATCH_23,
  ...KINDERGARTEN_BATCH_20,
  ...KINDERGARTEN_BATCH_21,
  ...KINDERGARTEN_BATCH_22,
  ...KINDERGARTEN_BATCH_19,
  ...KINDERGARTEN_BATCH_18,
  ...KINDERGARTEN_BATCH_17,
  ...KINDERGARTEN_BATCH_16,
  ...KINDERGARTEN_BATCH_15,
  ...KINDERGARTEN_BATCH_14,
  ...KINDERGARTEN_BATCH_13,
  ...KINDERGARTEN_BATCH_12,
  {
    stage: "kindergarten",
    slug: "cannan-kindergarten-kowloon-tong",
    name: "迦南幼稚園（九龍塘）",
    nameEn: "Cannan Kindergarten (Kowloon Tong)",
    district: "九龍城區",
    address: "九龍九龍塘金巴倫道 9 及 11 號地下部分及 1 樓",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    gradeSpan: "K1–K3；此校址沒有 2–3 歲班",
    telephone: "+852 2338 3262",
    schoolNumber: "531910 / 校址 0001",
    principal: "關燕芬女士",
    establishedYear: "1999（《概覽》所列）",
    tuition: "K1–K3 上午／下午班：每年 HK$5,440（10 期；2026/27，扣減政府資助後）",
    language: "校方稱推行兩文三語活動及雙語發展；未公布各語言每週授課時數",
    website: "https://www.cannan.edu.hk/",
    dataYear: "《幼稚園概覽》2026/27；師生及學生數為 2025 年 9 月資料",
    sourceNote: "學費是參加幼稚園教育計劃並扣減政府資助後的 2026/27 年度核准金額；不等於全部家庭支出。2025 年 9 月在讀人數及課室總容額均不是 2027/28 年 K1 招生學額。官網的辦學理念與課程特色屬迦南全校介紹，九龍塘校址的實際安排以分校和《概覽》資料核對；校方提供的課程描述不代表教育局對成效作獨立認證。",
    reportSlug: "canaan-klt",
    sources: [
      { label: "《幼稚園及幼稚園暨幼兒中心概覽 2026/27》：迦南（九龍塘）", scope: "本校址的學校類別、班制、收費、師生比例、在讀人數、課程及支援；各統計項目按原頁標示年度。", url: KGP_CANNAN },
      { label: "教育局學校搜尋：迦南幼稚園（九龍塘）", scope: "登記校名、學校編號、辦學類別、地區、地址、電話及校方網址。", url: EDB_CANNAN },
      { label: "教育局九龍城區學校名冊", scope: "區內名冊列出校址、學校編號與校方網址；名冊日期 2026 年 8 月 31 日。", url: EDB_KC_KG },
      { label: "迦南幼稚園官方網站", scope: "校方自有資訊入口；招生、班級和收費以當屆公告為準。", url: "https://www.cannan.edu.hk/" },
      { label: "迦南幼稚園：辦學宗旨及目標", scope: "校方整體辦學理念、遊戲學習與全人發展目標；並非九龍塘校址獨立公布的成效。", url: CANNAN_ABOUT },
      { label: "迦南幼稚園：幼稚園課程", scope: "校方整體課程的興趣角、閱讀、英語、普通話活動與家校合作做法。", url: CANNAN_KG_CURRICULUM },
    ],
    detailSections: [
      {
        title: "辦學理念與特色",
        featured: true,
        details: [
          { label: "辦學方向", value: "校方以兒童為本，重視品德、認知與語言、身體、情意與群性、美感的均衡發展；主張透過遊戲及親身探索培養學習興趣。這是校方的教育目標。", sourceUrl: CANNAN_ABOUT },
          { label: "孩子怎樣學", value: "迦南的整體課程把生活主題、故事及興趣角結合，讓幼兒先計劃活動、動手實踐，再與老師和同伴回顧。九龍塘校址的具體安排以分校當屆課程為準。", sourceUrl: CANNAN_KG_CURRICULUM },
          { label: "閱讀與語言特色", value: "校方課程介紹列繪本伴讀、英語原音拼合法及普通話互動遊戲；這些是教學方式，不能據此推算英語或普通話的每週教時。", sourceUrl: CANNAN_KG_CURRICULUM },
          { label: "家校互動", value: "校方列家長會、觀課、家長義工及個別面談，讓家長了解孩子的學習與適應情況；參與方式須向九龍塘校址確認。", sourceUrl: CANNAN_KG_CURRICULUM },
        ],
      },
      {
        title: "班制與學生規模",
        note: "以下人數是當時在讀學生，不是新學年可供申請的學額。",
        details: [
          { label: "班級與時段", value: "開設 K1、K2、K3 上午及下午班；《概覽》未列全日班。此校址沒有提供 2–3 歲幼兒服務。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
          { label: "K1 在讀人數", value: "上午班 187 人、下午班 73 人，合計 260 人。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
          { label: "全校在讀人數", value: "上午班 380 人、下午班 384 人，合計 764 人。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
          { label: "課室", value: "註冊課室 16 間；已使用課室總容額 784 人，不能當作 K1 招生名額。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
        ],
      },
      {
        title: "教學與語言",
        details: [
          { label: "課程類別", value: "本地課程；校方稱以生活主題、繪本、興趣角及遊戲探索組織學習。", sourceUrl: KGP_CANNAN },
          { label: "語言安排", value: "校方稱重視雙語發展，設兩文三語活動及中英文閱讀；《概覽》沒有逐科、逐週的粵語、普通話、英語時數。", sourceUrl: KGP_CANNAN },
          { label: "學習評估", value: "以日常觀察、主題評估、作品及學習歷程檔案記錄進展；校方稱每學年有兩次總結性評估。", sourceUrl: KGP_CANNAN },
        ],
      },
      {
        title: "師資、設施與支援",
        details: [
          { label: "師生比例", value: "上午 1:9.3、下午 1:9.4；原表註明比例不含 2–3 歲班。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
          { label: "教學人員", value: "校長及教學人員共 41 人，其中 34 人持有學位；41 人均持幼兒教育證書或以上。", period: "2025 年 9 月", sourceUrl: KGP_CANNAN },
          { label: "校園設施", value: "設戶外遊戲場、圖書室及特別活動室；《概覽》列室內遊戲場和音樂室為「沒有」。", sourceUrl: KGP_CANNAN },
          { label: "學生支援", value: "校方列有新生適應、駐校社工觀察與小一銜接活動；並註明參與到校學前康復服務。", sourceUrl: KGP_CANNAN },
        ],
      },
      {
        title: "收費與申請",
        details: [
          { label: "教育計劃", value: "參加 2026/27 學年幼稚園教育計劃；K1–K3 上午及下午班扣減資助後每年均為 HK$5,440，分 10 期繳付。", period: "2026/27", sourceUrl: KGP_CANNAN },
          { label: "其他核准收費", value: "報名費 HK$40；半日班註冊費 HK$970。校服、課本等用品費另見《概覽》的 2025/26 學年價目。", period: "2026/27（用品費為 2025/26）", sourceUrl: KGP_CANNAN },
          { label: "下一屆入學", value: "《概覽》請家長到學校網站查看 2027/28 申請表及日期；校方網站設當屆網上申請入口。", period: "2027/28", sourceUrl: "https://www.cannan.edu.hk/" },
        ],
      },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sun-island-english-kindergarten",
    name: "太陽島英文幼稚園",
    nameEn: "Sun Island English Kindergarten",
    district: "九龍城區",
    address: "九龍土瓜灣馬坑涌道 8–10 號祥雲大廈地下 B 號舖及 A 號舖後座",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    gradeSpan: "K1–K3；2025 年 9 月另有 PN 服務",
    telephone: "+852 2714 5545",
    schoolNumber: "215678 / 校址 0002",
    principal: "馬克勤女士",
    establishedYear: "1984（《概覽》所列）",
    tuition: "K1–K3 半日／全日班：免費（2026/27，扣減政府資助後）；PN 另收費",
    language: "校方稱設外籍英語教師小組活動及普通話教師；未公布各語言每週授課時數",
    website: "https://www.sunisland.edu.hk/",
    dataYear: "《幼稚園概覽》2026/27；師生及學生數為 2025 年 9 月資料",
    sourceNote: "本頁限於學校編號 215678、校址 0002 的土瓜灣分校；勿與樂民及其他太陽島分校混用。官網的願景與課程為太陽島整體介紹，分校特色另按土瓜灣頁標明。2026/27 K1–K3 免費是扣減資助後的核准學費，PN 不是免費班。PN 服務及收費是《概覽》所標示的 2025 年 9 月資料；校方 2026/27 分校頁對 PN 開班註明有待批核，報名前須向分校確認。",
    sources: [
      { label: "《幼稚園及幼稚園暨幼兒中心概覽 2026/27》：太陽島英文幼稚園", scope: "校址 0002 的身分、2026/27 學費、PN、師生比例、在讀人數、課程及支援。", url: KGP_SUN },
      { label: "太陽島土瓜灣分校官方頁", scope: "土瓜灣校址、聯絡電話、2026/27 上課時段、校舍和語言教師安排。", url: SUN_TKW },
      { label: "教育局九龍城區學校名冊", scope: "列出 215678 / 0002 校舍的登記名稱、區份、地址及校方網址；名冊日期 2026 年 8 月 31 日。", url: EDB_KC_KG },
      { label: "太陽島學校官方網站", scope: "校方自有資訊入口；當屆課程、校址與收費請以校方最新公告核對。", url: "https://www.sunisland.edu.hk/" },
      { label: "太陽島學校簡介", scope: "集團整體願景「自信、自理、自學」、以幼兒為本及家校合作理念。", url: SUN_PROFILE },
      { label: "太陽島學校課程", scope: "集團整體主題探索、品德、體能和 K3 升小銜接設計。", url: SUN_CURRICULUM },
    ],
    detailSections: [
      {
        title: "辦學理念與特色",
        featured: true,
        details: [
          { label: "辦學方向", value: "太陽島以「自信、自理、自學」概括教育方向，主張從愉快的生活經驗培養好奇心、獨立性及與人相處的能力；這是集團整體理念。", sourceUrl: SUN_PROFILE },
          { label: "孩子怎樣學", value: "校方的整體課程採循序漸進的主題探索，由老師引導孩子發問、動手嘗試及分享發現，並把品德、社交與環境議題融入活動。", sourceUrl: SUN_CURRICULUM },
          { label: "土瓜灣分校重點", value: "分校頁特別提出訓練幼兒照顧自己的能力，並與社區機構合作，為有不同學習需要的孩子提供支援。", sourceUrl: SUN_TKW },
          { label: "升小準備", value: "校方整體 K3 課程列有模擬課堂、情緒適應、時間管理及專注習慣的練習；土瓜灣分校的實際安排應向校方確認。", sourceUrl: SUN_CURRICULUM },
        ],
      },
      {
        title: "班制與學生規模",
        note: "K1 在讀人數、課室總容額均不是下一屆的招生學額；PN 與 K1–K3 的收費制度不同。",
        details: [
          { label: "班級與時段", value: "設 K1、K2、K3；2025 年 9 月另有 PN 服務。校方列上午 9:00–12:00、下午 13:30–16:30、全日 9:00–16:30；2026/27 PN 開班標示有待批核，實際組合須向分校核對。", period: "2026/27；PN 統計為 2025 年 9 月", sourceUrl: SUN_TKW },
          { label: "K1 在讀人數", value: "上午班 13 人、下午班 11 人、全日班 19 人，合計 43 人。", period: "2025 年 9 月", sourceUrl: KGP_SUN },
          { label: "全校在讀人數", value: "K1–K3 上午班 44 人、下午班 25 人、全日班 72 人，合計 141 人；另有 2–3 歲級別 13 人。", period: "2025 年 9 月", sourceUrl: KGP_SUN },
          { label: "課室", value: "註冊課室 12 間；已使用課室總容額 328 人，不能當作 K1 招生名額。", period: "2025 年 9 月", sourceUrl: KGP_SUN },
        ],
      },
      {
        title: "教學與語言",
        details: [
          { label: "課程類別", value: "本地課程；校方稱以生活主題、活動教學、分組、閱讀及校外參觀組織學習。", sourceUrl: KGP_SUN },
          { label: "語言安排", value: "土瓜灣分校頁稱設外籍英語老師及普通話老師；《概覽》另列外籍英語老師小組活動。沒有公開粵語、普通話和英語各佔多少教時。", sourceUrl: SUN_TKW },
          { label: "學習評估", value: "校方以日常觀察、評量表、總結評估與個人學習歷程檔案記錄進度。", sourceUrl: KGP_SUN },
        ],
      },
      {
        title: "師資、設施與支援",
        details: [
          { label: "師生比例", value: "上午 1:7.1、下午 1:5.6；原表註明比例包含 2–3 歲班。", period: "2025 年 9 月", sourceUrl: KGP_SUN },
          { label: "教學人員", value: "校長及教學人員共 18 人，其中 13 人持有學位；18 人均持幼兒教育證書或以上。", period: "2025 年 9 月", sourceUrl: KGP_SUN },
          { label: "校園設施", value: "《概覽》列室內遊戲場、音樂室、英文室、圖書室、普通話室及建構區。", sourceUrl: KGP_SUN },
          { label: "校巴", value: "校方土瓜灣分校頁列有校巴服務；路線和名額需向分校確認。", sourceUrl: SUN_TKW },
          { label: "學生支援", value: "校方列新生適應、非華語學童中文及翻譯支援，並註明參與到校學前康復服務。", sourceUrl: KGP_SUN },
        ],
      },
      {
        title: "收費與申請",
        details: [
          { label: "教育計劃及 K1–K3", value: "參加 2026/27 學年幼稚園教育計劃；扣減政府資助後，K1–K3 上午、下午及全日班全年學費均列「免費」。", period: "2026/27", sourceUrl: KGP_SUN },
          { label: "PN 收費", value: "2–3 歲幼兒服務全年收費：《概覽》列半日 HK$30,072、全日 HK$57,408；不適用於 K1–K3。2026/27 PN 開班須再向校方確認。", period: "《概覽》2025 年 9 月資料", sourceUrl: KGP_SUN },
          { label: "其他核准收費", value: "報名費 HK$40；半日班註冊費 HK$970、全日班 HK$1,570。校服、課本等用品費另見《概覽》的 2025/26 學年價目。", period: "2026/27（用品費為 2025/26）", sourceUrl: KGP_SUN },
          { label: "下一屆入學", value: "校方提供網上報名；《概覽》請家長到學校網站查看 2027/28 申請日期。不同分校的申請和面見分別處理。", period: "2027/28", sourceUrl: "https://sunisland.edu.hk/zh/報名程序/" },
        ],
      },
    ],
  },
  {
    stage: "kindergarten",
    slug: "braemar-hill-nursery-school",
    name: "寶山幼兒園",
    nameEn: "Braemar Hill Nursery School",
    district: "灣仔區",
    address: "香港渣甸山春暉道 9 號春暉中心 1 樓連天台",
    telephone: "+852 2578 7922",
    schoolNumber: "565938 / 校址 0002",
    establishedYear: "1979（校方網站歷史介紹）",
    schoolType: "私立獨立幼稚園暨幼兒中心",
    gender: "男女校",
    religion: "基督教",
    tuition: "半日班 HK$135,000/年（教育局收費證明書生效日：2024-08-01；報名前確認有無更新）",
    language: "校方介紹兩文三語教育模式；未見公開各語言每週課時比例",
    gradeSpan: "歷史《幼稚園概覽》曾列 PN（2–3 歲）及 K1–K3；各級當屆班制與學額以學校公告為準",
    website: BRAEMAR_HOME,
    dataYear: "教育局學校名冊：2026-09-30；學費證明書：2024-08-01 起生效；校方歷史與理念頁未標更新日期",
    sourceNote: "寶山是私立獨立幼稚園暨幼兒中心，不參加幼稚園教育計劃。教育局收費證明書列半日班每年 HK$135,000、分 12 期，生效日為 2024-08-01；本輪未找到較新的收費證明書，不應假定此數字仍是 2026/27 收費。師生比例及 PN／K1 當屆招生學額亦未在本輪的可讀官方頁面核實，報名前請向校方索取當屆書面資料。校方理念頁沒有標示更新日期，特色屬學校自述，不是教育局評估結果。",
    reportSlug: "braemar-hill",
    sources: [
      { label: "《幼稚園及幼稚園暨幼兒中心概覽 2026/27》：寶山幼兒園", scope: "教育局當屆概覽原頁入口；本次瀏覽工具未能讀取正文，頁面連結供家長查看最新班制、收費和師生資料。", url: KGP_BRAEMAR },
      { label: "歷史《幼稚園概覽 2022/23》：寶山幼兒園", scope: "歷史校址及 PN、K1–K3 級別資料；不能替代當屆開班情況。", url: KGP_BRAEMAR_HISTORICAL },
      { label: "教育局灣仔區學校名冊", scope: "2026 年 9 月 30 日名冊列出校址 0002、登記地址、電話、校長及班制時段。", url: EDB_WAN_CH_KG },
      { label: "教育局收費證明書：寶山幼兒園", scope: "半日班每年 HK$135,000、分 12 期；證明書生效日 2024 年 8 月 1 日，不視作已核實的 2026/27 收費。", url: EDB_BRAEMAR_FEE },
      { label: "寶山幼兒園官方網站：School Philosophy", scope: "家長角色、全球公民、自我認同、領導力及終身學習等校方教育目標；頁面未標更新日期。", url: BRAEMAR_PHILOSOPHY },
      { label: "寶山幼兒園官方網站：The BHNS Story / Our Approach", scope: "校方稱 1979 年創辦，並以四組短語概括學習取向；未提供每級課表及教時。", url: BRAEMAR_HOME },
      { label: "寶山幼兒園官方網站：辦學使命", scope: "校方公布的全人發展及兩文三語教育方向；頁面未標更新日期。", url: BRAEMAR_MISSION },
      { label: "教育局學校搜尋：寶山幼兒園", scope: "核對登記名稱、校址及聯絡資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=565938000212" },
      { label: "寶山幼兒園深度報告", scope: "查看本平台另行整理的課程、收生、升小及來源限制；報告中的歷史收費不代表當屆收費。", url: "/cn/reports/braemar-hill" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "本節整理校方自述的辦學方向；理念聲明不等同外部評估或學生實際成效。", details: [
        { label: "家校角色", value: "校方把家長視為孩子的主要教育者，學校的角色是支援家庭引導孩子學習。對家長而言，這個定位意味著家校溝通與家庭配合值得在參觀時一併了解。", sourceUrl: BRAEMAR_PHILOSOPHY },
        { label: "孩子發展目標", value: "校方提出培養全球公民、自我認同、自信、領導素質及終身學習能力，並重視孩子面對挑戰的能力；這些屬教育目標，並非可量化的升小成果。", sourceUrl: BRAEMAR_PHILOSOPHY },
        { label: "課程取向", value: "校方使命頁提到以啟發性的教學活動促進全人發展，並以兩文三語模式發展幼兒語言能力。公開頁面沒有交代各語言每日或每週課時，也不宜直接解讀為英語主導。", sourceUrl: BRAEMAR_MISSION },
        { label: "學習路徑", value: "校方網站以「Fun to Fulfillment、Play to Potential、Learning to Leading、Imagination to Creation」概括教學取向，連結遊戲、潛能、領導與創作。這些是校方的框架標語，未提供各級課表或活動頻率；家長參觀時可請校方舉例說明孩子在 K1、K2、K3 的具體學習安排。", sourceUrl: BRAEMAR_HOME },
        { label: "申請前要問", value: "如果家庭重視英語沉浸或較自由的遊戲時間，建議直接向校方索取現行時間表、課程安排和額外活動收費，並確認理念頁面所述安排是否適用於申請校址及當屆。", sourceUrl: BRAEMAR_PHILOSOPHY },
      ] },
      { title: "班制與收費核對", note: "不把舊底庫數字包裝成當屆招生名額或核准學費。", details: [
        { label: "登記校址", value: "學校編號 565938、校址 0002；地址為渣甸山春暉道 9 號春暉中心 1 樓連天台。", period: "《幼稚園概覽》2026/27", sourceUrl: KGP_BRAEMAR },
        { label: "班制與費用", value: "教育局 2026 年 9 月名冊顯示學校列有上午及下午班；教育局收費證明書列半日每年 HK$135,000、分 12 期，生效日為 2024 年 8 月 1 日。未找到更新證明書，申請前須確認當屆收費。", period: "名冊日期 2026-09-30；收費證明書自 2024-08-01 生效", sourceUrl: EDB_BRAEMAR_FEE },
        { label: "招生名額", value: "在讀人數、課室容量或舊年度班數都不能直接當作當屆 K1／PN 對外招生名額；如校方未公布，應標示未公開。", sourceUrl: KGP_BRAEMAR },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "stewards-pooi-kei-primary-school",
    name: "培基小學",
    nameEn: "Stewards Pooi Kei Primary School",
    district: "沙田區",
    address: "新界沙田火炭樂霞坊 2 號",
    telephone: "+852 2602 5353",
    principal: "嚴慧儀女士",
    establishedYear: "1990",
    sponsoringBody: "香港神託會",
    schoolType: "資助小學",
    gender: "男女校",
    religion: "基督教",
    schoolNet: "91 校網",
    tuition: "不收學費；家教會會費 HK$80，額外外籍教師項目約 HK$1,120/年（自願參與；2026/27）",
    language: "中文（包括普通話）及英文",
    gradeSpan: "小一至小六",
    website: "https://www.pooikei.edu.hk/",
    dataYear: "《小學概覽 2026》：2026/27；教師資料：2025/26",
    sourceNote: "校方現行網站把校址寫作「樂霞坊 2 號」；《小學概覽 2026》使用「樂霞坊第 43 區標準小學校舍」的地段描述。2026/27 小一班數不是可申請學額；教師資料屬 2025/26 學年。概覽所列課程與校務內容由學校提供及核實。",
    reportSlug: "puikei",
    sources: [
      { label: "《小學概覽 2026》：培基小學", scope: "2026/27 班級、收費、校網、教學、校園生活和升學關係；教師統計另按 2025/26 學年。", url: PSP_PUIKEI },
      { label: "教育局沙田區學校名冊", scope: "校名、地區、校址、辦學類別、電話及校方網址；名冊日期 2026 年 9 月 30 日。", url: EDB_ST },
      { label: "培基小學官方網站", scope: "學校願景、使命、現行通訊地址與 2027 年小一自行分配學位申請入口。", url: "https://www.pooikei.edu.hk/tc/index.php" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "以下為校方公布的辦學方向與課程做法，不能視為個別學生的學習成效。", details: [
        { label: "辦學方向", value: "以基督教全人教育及「信、望、愛、誠」為核心；校方希望學生在學科以外發展獨立思考、創作能力和服務社會的態度。", sourceUrl: "https://www.pooikei.edu.hk/tc/index.php" },
        { label: "思考與課業", value: "按年級教授不同學習策略與思維工具，配合分層課業；校方亦以專題研習及跨學科主題教學培養研習、協作與明辨思考能力。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
        { label: "環境教育", value: "校方把環保生態園、太陽能及蝴蝶觀察等設施和活動連到科學課程，讓學生從校園環境學習保育。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
        { label: "課室外學習", value: "學校列有全校學科活動、戶外學習及星期五下午的留校或離校活動選擇；具體參與安排仍按當屆通知。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
      ] },
      { title: "班級與入學", note: "班數不等於當年可供申請的學額；小一派位仍須按教育局當屆規則。", details: [
        { label: "小一校網", value: "91 校網；資助、全日制、男女校。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
        { label: "班級結構", value: "小一至小六每級 4 班，合共 24 班；其中小一 4 班是教育局批核班數。", period: "2026/27", sourceUrl: PSP_PUIKEI },
        { label: "升中關係", value: "《概覽》的一條龍、直屬及聯繫中學欄均列「—」；此欄不代表學生沒有升中去向。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
        { label: "當屆入學資訊", value: "校方網站已設 2027 年 9 月小一自行分配學位申請公告，具體日期與材料以公告為準。", period: "2027 年入學", sourceUrl: "https://www.pooikei.edu.hk/tc/index.php" },
      ] },
      { title: "教學與語言", details: [
        { label: "授課語言", value: "校方列中文以普通話授課，數學及科學以英語為主要教學語言；不宜把概覽的「中英文」簡化成全科英語授課。", period: "2026/27", sourceUrl: PSP_PUIKEI },
        { label: "教學模式", value: "平均分班，以合作學習為主要模式；一年級設雙班主任。小四至小六數學分五組，小五、小六各有一班精英班。", period: "2026/27", sourceUrl: PSP_PUIKEI },
        { label: "評估安排", value: "小一上學期以進展性評估代替測考；《概覽》列小一全年全科測驗 1 次、考試 1 次，二至六年級測驗 1 次、考試 2 次。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
      ] },
      { title: "師資與校園生活", details: [
        { label: "教師資料", value: "全校教師 56 人；已接受師資培訓 96%、持學士學位 100%。百分比的分母為全校教師，並非每班師生比例。", period: "2025/26", sourceUrl: PSP_PUIKEI },
        { label: "校舍與服務", value: "24 間課室、1 個禮堂、3 個操場；概覽列校車及保姆車服務，並設斜道、暢通易達升降機和洗手間。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
        { label: "上課時間", value: "一般上課時間 8:00–15:10；午膳後設午休及導修時段。", period: "《小學概覽 2026》", sourceUrl: PSP_PUIKEI },
      ] },
      { title: "收費", details: [
        { label: "學費與其他費用", value: "學費及堂費欄為「—」；家教會會費 HK$80。兩名額外非教育局全職外籍老師項目約 HK$1,120/年，概覽標註自願參與。", period: "2026/27", sourceUrl: PSP_PUIKEI },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "fr-cucchiara-memorial-school-sham-shui-po",
    name: "郭怡雅神父紀念學校（深水埗）",
    nameEn: "Fr. Cucchiara Memorial School",
    district: "深水埗區",
    address: "九龍深水埗荔盈街 5 號",
    telephone: "+852 2495 1922",
    principal: "蔡偉傑先生",
    establishedYear: "1977",
    sponsoringBody: "天主教香港教區",
    schoolType: "資助小學",
    gender: "男女校",
    religion: "天主教",
    schoolNet: "40 校網",
    tuition: "不收學費；家教會會費 HK$20、核准非標準項目 HK$400、學生證 HK$40（2026/27）",
    language: "《小學概覽》列中文（包括普通話）及英文；未列明逐科授課語言",
    gradeSpan: "小一至小六",
    website: "https://www.fcms.edu.hk/tc",
    dataYear: "《小學概覽 2026》：2026/27；教師統計為 2025/26",
    sourceNote: "校方聯絡頁、《小學概覽 2026》和教育局 40 校網名單均指向深水埗荔盈街校址。2026/27 小一 4 班是批核班數，不是入學名額；舊青衣校址的校車路線不應直接套用現址。概覽所列課程與校務內容由學校提供及核實。",
    sources: [
      { label: "《小學概覽 2026》：郭怡雅神父紀念學校", scope: "2026/27 班級、校網、收費、教學、評估、設施與校園生活；教師資料為 2025/26。", url: PSP_FCMS },
      { label: "郭怡雅神父紀念學校辦學宗旨", scope: "校方公布的天主教辦學理念、校訓與全人教育目標。", url: FCMS_MISSION },
      { label: "郭怡雅神父紀念學校簡介", scope: "校方公布的因材施教方式、品德培育與跨科學習活動。", url: FCMS_PROFILE },
      { label: "郭怡雅神父紀念學校官方聯絡頁", scope: "校方公布的地址、電話和電郵。", url: "https://www.fcms.edu.hk/tc/聯絡我們" },
      { label: "教育局深水埗區學校名冊", scope: "校名、地區、地址、學校編號及電話；名冊日期 2026 年 9 月 30 日。", url: EDB_SSP },
      { label: "教育局小一學校網 40 名單", scope: "列出此校在 40 校網及當屆小一派位基本資料。", url: EDB_POA_40 },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "校方理念與所列課程活動反映辦學方向，不等於每名學生都取得相同成果。", details: [
        { label: "辦學方向", value: "天主教學校，以「以樂事主」為校訓；辦學宗旨把知識、責任感、關心社會與公益服務放在一起。", sourceUrl: FCMS_MISSION },
        { label: "因材施教", value: "校方稱按學生的興趣、能力和學習風格調整課堂內外的目標與活動，並把學習連到生活經驗，培養自學、自我管理和解難能力。", sourceUrl: FCMS_PROFILE },
        { label: "品德與服務", value: "以信念、自信、慈悲、服務四項校本核心價值，配合德育與輔導活動；學校希望建立關愛與互助的校園文化。", sourceUrl: FCMS_PROFILE },
        { label: "跨科體驗", value: "除各科教學，校方列有每年的 STREAM Week 和多元智能學習月，讓學生在協作和體驗活動中應用所學。", sourceUrl: FCMS_PROFILE },
      ] },
      { title: "班級與入學", note: "小一班數不是招生學額；地址和校網均指深水埗校舍。", details: [
        { label: "小一校網", value: "40 校網；資助、全日制、男女校。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
        { label: "班級結構", value: "小一 4 班；全校小一至小六合共 16 班。", period: "2026/27", sourceUrl: PSP_FCMS },
        { label: "升中關係", value: "《概覽》的一條龍、直屬及聯繫中學欄均列「—」；這不等於升中結果。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
        { label: "入學入口", value: "校方網站設小一入學專頁；目前可見的公告仍以 2026/27 年度為題，下一屆安排應按校方更新核對。", sourceUrl: "https://www.fcms.edu.hk/tc/小一入學" },
      ] },
      { title: "教學與語言", details: [
        { label: "授課語言", value: "概覽列「中文（包括普通話）及英文」，沒有逐科語言表；不能推定全部科目以英語或普通話授課。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
        { label: "教學模式", value: "小一至小六推行小班教學；校方列有中文繪本、數學解難及跨學科 STREAM 活動。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
        { label: "低年級評估", value: "概覽的數字欄列小一全年全科測驗及考試均為 0。小二起的實際評估安排請向校方核對當屆政策。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
      ] },
      { title: "師資與校園生活", details: [
        { label: "教師資料", value: "全校教師 32 人；已接受師資培訓及持學士學位均為 100%。百分比的分母為全校教師。", period: "2025/26", sourceUrl: PSP_FCMS },
        { label: "校舍與服務", value: "30 間課室、1 個禮堂、2 個操場；概覽列校車及保姆車服務，亦設暢通易達升降機與洗手間。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
        { label: "上課時間", value: "一般上課時間 8:10–15:25；午膳時間 12:40–13:30。", period: "《小學概覽 2026》", sourceUrl: PSP_FCMS },
      ] },
      { title: "收費", details: [
        { label: "學費與其他費用", value: "學費及堂費欄為「—」；家教會會費 HK$20、核准非標準項目 HK$400、學生證 HK$40。各項用途和繳付安排以當屆校方通知為準。", period: "2026/27", sourceUrl: PSP_FCMS },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "ma-on-shan-ling-liang-primary-school",
    name: "馬鞍山靈糧小學",
    nameEn: "Ma On Shan Ling Liang Primary School",
    district: "沙田區",
    address: "新界沙田馬鞍山利安邨",
    telephone: "+852 2643 0707",
    schoolNumber: "115797",
    principal: "陳志斌先生",
    establishedYear: "1993",
    sponsoringBody: "基督教靈糧世界佈道會／香港靈糧堂",
    schoolType: "資助小學",
    gender: "男女校",
    religion: "基督教",
    schoolNet: "89 校網",
    tuition: "不收學費；2026/27 校本管理費 HK$450",
    language: "中文及英文；個別年級的跨科或英語安排以校方當屆課程為準",
    gradeSpan: "小一至小六",
    website: "https://www.mosllps.edu.hk/",
    dataYear: "《小學概覽 2026》：身份與班級資料 2026/27；教師資料 2025/26",
    sourceNote: "《小學概覽 2026》資料由學校提供及核實。小一批核班數不是對外招生學額；課程特色是校方公布的安排，不等於每名學生均參與每項拓展或獲得相同成果。",
    reportSlug: "mosllps",
    sources: [
      { label: "《小學概覽 2026》：馬鞍山靈糧小學", scope: "身份、校網、2026/27 班數與收費、教學評估、校園生活及學校自述的課程特色。", url: PSP_MOSLL },
      { label: "馬鞍山靈糧小學：辦學宗旨與校訓", scope: "校方公布的信望愛、基督教教育和全人發展目標。", url: MOSLL_MISSION },
      { label: "馬鞍山靈糧小學官方網站", scope: "校方資訊入口；招生、班級安排及活動以當屆公告為準。", url: "https://www.mosllps.edu.hk/" },
      { label: "馬鞍山靈糧小學深度報告", scope: "查看本站另行整理的收生與家庭選校分析。", url: "/cn/reports/mosllps" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "《小學概覽》的教學和活動內容由學校提供及核實；以下是校方辦學方向，不是獨立成效評估。", details: [
        { label: "辦學方向", value: "學校以「信、望、愛」為校訓，宗旨是透過基礎教育促進德、智、體、群、美、靈均衡發展。這令品格與身心成長成為校方明確表述的教育目標。", sourceUrl: PSP_MOSLL },
        { label: "學習方式", value: "概覽列出以小班教學為基礎，配合活動與合作學習；並設資優學苑，涵蓋語文、數學、STEAM 及資訊科技。家長可進一步確認拔尖與補底支援如何按學生需要安排。", period: "《小學概覽 2026》", sourceUrl: PSP_MOSLL },
        { label: "跨學科與戶外體驗", value: "校方以「彩虹課程」推行跨科學習、參觀和新興運動體驗；概覽亦列出天台生態園、AI 蝴蝶園及水耕種植等環境學習項目。這類安排較適合喜歡動手探索的孩子，實際參與頻率可向學校查詢。", period: "《小學概覽 2026》", sourceUrl: PSP_MOSLL },
        { label: "課業與評估", value: "概覽列明小一上學期以進展性評估代替測驗和考試，並設星期一無功課日；校方稱透過課堂檢測、實作、聽說任務、自評與互評提供回饋。家長應把這理解為評估節奏設計，而不是完全沒有學習要求。", period: "《小學概覽 2026》", sourceUrl: PSP_MOSLL },
      ] },
      { title: "班級與學校資料", note: "班數和班級核准數不等於個別申請途徑可獲學額。", details: [
        { label: "辦學資料", value: "基督教資助男女校，位於沙田區 89 校網；2026/27 全校核准班數為 31 班。", period: "2026/27", sourceUrl: PSP_MOSLL },
        { label: "小一班數", value: "2026/27 批核小一班數為 5 班；這不是可直接套用於自行分配或統一派位的招生名額。", period: "2026/27", sourceUrl: PSP_MOSLL },
        { label: "收費", value: "學費及堂費欄列「—」；校本管理費每年 HK$450，分上下學期各收 HK$225。其他費用按當屆校方通知。", period: "2026/27", sourceUrl: PSP_MOSLL },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "diocesan-boys-school",
    name: "拔萃男書院",
    nameEn: "Diocesan Boys' School",
    district: "九龍城區",
    address: "九龍旺角亞皆老街 131 號（包括宿舍部分）",
    telephone: "+852 2711 5191",
    principal: "鄭基恩先生",
    establishedYear: "1869",
    sponsoringBody: "拔萃男書院校董會",
    schoolType: "直資中學",
    gender: "男校",
    religion: "基督教",
    tuition: "本地生中一至中六：HK$65,980/年（2026/27）；IB 課程另計",
    language: "以英語授課為主；中國語文、中史、普通話等科目另按概覽列示",
    gradeSpan: "中一至中六；另設 IB 預備及文憑課程",
    website: "https://www.dbs.edu.hk/",
    dataYear: "官方學費：2026/27；《中學概覽》資料：2025/26",
    sourceNote: "班數、教師及學科授課語言取自《中學概覽 2025/26》；2026/27 學科表在該概覽中屬「擬開設」，不可當成已開課。學費及 2027 年中一申請資料採校方新公告；本地生、非本地生與 IB 學費不同。中一 6 班不是對外招生學額。",
    reportSlug: "dbs-secondary",
    sources: [
      { label: "拔萃男書院官方學費頁", scope: "校方公布的 2026/27 本地及非本地生學費；IB 費用另列。", url: DBS_FEE },
      { label: "拔萃男書院 2027 年中一入學頁", scope: "2026 年 10 月 17 日至 11 月 17 日取表、甄選準則與 2027 年放榜安排。", url: DBS_G7 },
      { label: "拔萃男書院願景與使命", scope: "校方公布的基督教博雅教育、全人發展及品格培育目標。", url: DBS_MISSION },
      { label: "拔萃男書院學校政策", scope: "校方對思辨、自主學習、課外活動、服務及寄宿教育的說明。", url: DBS_POLICY },
      { label: "《中學概覽 2025/26》：拔萃男書院", scope: "學校身份、地址、地區、辦學類別、性別、宗教及 2025/26 收費。", url: SSP_DBS },
      { label: "拔萃男書院官方聯絡頁", scope: "校方公布的現行地址、電話及校方網址。", url: "https://www.dbs.edu.hk/index.php?m=contactus&s=dbs" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "以下是校方對培育方向及學習機會的說明；參與個別活動和寄宿安排須按當屆要求確認。", details: [
        { label: "辦學方向", value: "校方以基督教原則下的博雅教育為定位，強調知識、品格與社會能力並重，目標是培養有自律、責任感及服務精神的學生。", sourceUrl: DBS_MISSION },
        { label: "學習能力", value: "校方的課程政策同時重視語言與數理基礎、批判思考、自主學習和人際能力；這些是校方培育目標，不是公開量化的學生成效。", sourceUrl: DBS_POLICY },
        { label: "課外成長", value: "學會、興趣小組、學生組織、校隊，以及本地和海外交流及服務活動，構成課堂以外的學習機會。", sourceUrl: DBS_POLICY },
        { label: "寄宿特色", value: "校方把寄宿教育列作特色之一，目標是培養責任感與自律；寄宿名額及申請條件需另向學校核對。", sourceUrl: DBS_POLICY },
      ] },
      { title: "班級與收生", note: "以下 6 班為全級班數，不是校方對外開放的中一學額。", details: [
        { label: "班級結構", value: "中一至中六每級 6 班；全校合共 36 班。", period: "2025/26", sourceUrl: SSP_DBS },
        { label: "收生途徑", value: "不參加中學學位分配辦法的統一派位；中一由學校自行甄選。", period: "適用於 2026 年 9 月入學；2027 年安排見校方頁", sourceUrl: SSP_DBS },
        { label: "2027 年中一申請", value: "校方列 2026 年 10 月 17 日至 11 月 17 日取表；甄選比重為學業 60%、課外活動 20%、面試 15%、其他 5%。", period: "2027 年入學", sourceUrl: DBS_G7 },
      ] },
      { title: "課程與語言", details: [
        { label: "課程路線", value: "校方設香港中學文憑考試（DSE）及國際文憑大學預科課程（IB）；IB 另有申請及收費安排。", sourceUrl: SSP_DBS },
        { label: "授課語言", value: "概覽稱中一至中六以英語授課；2025/26 學科表把中國語文、中史、普通話等列為中文授課，英文、數學和多數理科列為英文授課。", period: "2025/26", sourceUrl: SSP_DBS },
        { label: "2026/27 學科", value: "《中學概覽》另列 2026/27「擬開設」科目；具體開班與選修組合仍以校方當屆安排為準。", period: "2026/27 擬開設", sourceUrl: SSP_DBS },
      ] },
      { title: "師資與設施", details: [
        { label: "教師資料", value: "全校教師 133 人；已接受師資培訓 92%，持學士學位 100%。百分比的分母為全校教師。", period: "2025/26", sourceUrl: SSP_DBS },
        { label: "校園設施", value: "概覽列 44 間課室，以及田徑跑道、草地球場、游泳池、網球場、圖書館、音樂廳與大禮堂。", period: "《中學概覽 2025/26》", sourceUrl: SSP_DBS },
      ] },
      { title: "學費", details: [
        { label: "本地生中一至中六", value: "每年 HK$65,980；不包含 IB 課程及其他個別費用。", period: "2026/27", sourceUrl: DBS_FEE },
        { label: "IB 課程", value: "本地生 IB 一年級、二年級均為每年 HK$151,180；非本地生另有收費表。", period: "2026/27", sourceUrl: DBS_FEE },
        { label: "費用支援", value: "校方設學費減免與教育基金；申請條件和額度以當屆校方文件為準。", sourceUrl: DBS_G7 },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "po-leung-kuk-lo-kit-sing-1983-college",
    name: "保良局羅傑承（一九八三）中學",
    nameEn: "Po Leung Kuk Lo Kit Sing (1983) College",
    district: "葵青區",
    address: "新界青衣長康邨",
    telephone: "+852 2497 7110",
    principal: "羅頴忠女士",
    establishedYear: "1984",
    sponsoringBody: "保良局",
    schoolType: "資助中學",
    gender: "男女校",
    religion: "不適用",
    tuition: "資助中學；中四至中六堂費 HK$340/年（2025/26）",
    language: "英語授課科目包括數學和主要理科；中國語文、中史等以中文授課（2025/26）",
    gradeSpan: "中一至中六",
    website: "https://www.plk83.edu.hk/",
    dataYear: "《中學概覽 2025/26》；校方地址與課程資料需按新學年公告更新",
    sourceNote: "《中學概覽 2025/26》資料由學校提供及核實；2026/27 科目表屬擬開設，不應視作已落實。校方網站現仍展示 2026/27 中一自行分配學位資料，所列 40 個名額和申請日期不可沿用為 2027/28；新一屆應等待校方更新。",
    sources: [
      { label: "《中學概覽 2025/26》：保良局羅傑承（一九八三）中學", scope: "校方核實的學校身份、辦學宗旨、課程、學生活動和收費資料；收費年度為 2025/26。", url: SSP_PLK83 },
      { label: "保良局羅傑承（一九八三）中學官方網站", scope: "校方自有資訊入口及校園資料；課程、招生和地址以當屆校方公告為準。", url: "https://www.plk83.edu.hk/" },
      { label: "保良局羅傑承中學中一自行分配學位程序", scope: "只適用於校方頁面標明的 2026/27 入學年度；不得當作下一屆名額或日期。", url: "https://www.plk83.edu.hk/en/site/view?name=%E4%B8%80%E8%88%AC%E7%94%B3%E8%AB%8B%E6%B5%81%E7%A8%8B" },
      { label: "教育局學校搜尋：保良局羅傑承（一九八三）中學", scope: "教育局登記校名與學校資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=190489000133" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "《中學概覽》的相關段落由學校提供及核實；活動安排可能隨學年調整。", details: [
        { label: "辦學方向", value: "以「愛、敬、勤、誠」為校訓，兼顧德、智、體、群、美；概覽列出的關注事項是主動學習與正向品德。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
        { label: "主動學習", value: "每年列有專題研習、閱讀豐收日及活動課程等安排，讓學生在常規課程外練習閱讀、探究和應用知識。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
        { label: "生涯規劃", value: "校方稱生涯規劃課程涵蓋自我認識、設立目標及升學就業途徑，並安排參觀商業機構，協助學生及早接觸職業資訊。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
        { label: "課外參與", value: "概覽列約 60 個課外活動單位；中一、二學生需參與兩個學會或團隊，中三至中五設幹事培訓。具體選項以當屆校方安排為準。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
      ] },
      { title: "班級與收生", note: "2025/26 班級數及 2026/27 自行分配學額不能當成 2027/28 年度名額。", details: [
        { label: "班級結構", value: "中一至中六每級 4 班；全校合共 24 班。", period: "2025/26", sourceUrl: SSP_PLK83 },
        { label: "收生途徑", value: "接受中一自行分配學位申請，並參加統一派位。兩者屬不同收生階段。", period: "適用於 2026 年 9 月入學", sourceUrl: SSP_PLK83 },
        { label: "舊屆申請資料", value: "校方頁面列 2026/27 年度自行分配學位 40 個，面試比重 40%；這是已過屆資料，不能據此推斷 2027/28 學額。", period: "2026/27；歷史資料", sourceUrl: "https://www.plk83.edu.hk/en/site/view?name=%E4%B8%80%E8%88%AC%E7%94%B3%E8%AB%8B%E6%B5%81%E7%A8%8B" },
      ] },
      { title: "課程與語言", details: [
        { label: "初中授課語言", value: "中國語文、普通話、中史等以中文授課；英文、數學、科學、地理等科目在概覽中列為英語授課。", period: "2025/26", sourceUrl: SSP_PLK83 },
        { label: "高中授課語言", value: "中國語文、中史、公民與社會發展科等列中文授課；英文、數學、物理、化學、生物及經濟等列英語授課。", period: "2025/26", sourceUrl: SSP_PLK83 },
        { label: "2026/27 學科", value: "《中學概覽》列的是擬開設科目；實際選修組合和開班以校方當屆公布為準。", period: "2026/27 擬開設", sourceUrl: SSP_PLK83 },
      ] },
      { title: "師資與設施", details: [
        { label: "教師資料", value: "全校教師 56 人；已接受師資培訓 96%、持學士學位 100%。百分比的分母為全校教師。", period: "2025/26", sourceUrl: SSP_PLK83 },
        { label: "校園設施", value: "概覽列 24 間課室、科學實驗室、語言學習室、圖書館、兩個禮堂和有蓋籃球場。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
        { label: "中一支援", value: "校方稱中一全年設「中一啟航星計劃」，9 至 12 月有午膳時段適應活動，並由高年級輔導領袖生協助新生。", period: "《中學概覽 2025/26》", sourceUrl: SSP_PLK83 },
      ] },
      { title: "收費", details: [
        { label: "學費與堂費", value: "中一至中六學費欄均為「—」；中一至中三堂費欄為「—」，中四至中六堂費每年 HK$340。", period: "2025/26", sourceUrl: SSP_PLK83 },
        { label: "其他費用", value: "家長教師會會費每年 HK$30、學生會會費 HK$10；實際繳付以當屆通知為準。", period: "2025/26", sourceUrl: SSP_PLK83 },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "st-pauls-co-educational-college",
    name: "聖保羅男女中學",
    nameEn: "St. Paul's Co-educational College",
    district: "中西區",
    address: "香港麥當勞道 33 號",
    telephone: "+852 2523 1187",
    establishedYear: "1915",
    sponsoringBody: "聖保羅男女中學校董會",
    schoolType: "直資中學",
    gender: "男女校",
    religion: "基督教",
    tuition: "2026/27：中一至中三 HK$87,800；中四 HK$84,100；中五至中六 DSE HK$79,000、IBDP HK$128,500/年",
    language: "英文為主要教學語言；初中中國語文以普通話授課，其他中文科目按概覽列示",
    gradeSpan: "中一至中六；提供 HKDSE 及 IBDP 課程",
    website: "https://www.spcc.edu.hk/",
    dataYear: "《中學概覽 2025/26》；課程及年度收費按校方當屆公告核對",
    sourceNote: "《中學概覽 2025/26》學校資料由校方提供及核實。課外體驗、IBDP 路線及個別學習機會設有年級、甄選或名額安排；本頁介紹的是學校提供的教育機會，不能視為每位學生必然參與或取得的成果。",
    reportSlug: "spcc-secondary",
    sources: [
      { label: "《中學概覽 2025/26》：聖保羅男女中學", scope: "身份、辦學使命、課程、授課語言、學校特色、學生活動及教師資料；資料由校方提供及核實。", url: SSP_SPCC },
      { label: "聖保羅男女中學：願景與使命", scope: "校方公布的信望愛、品格、服務精神、終身學習及全球視野目標。", url: SPCC_MISSION },
      { label: "聖保羅男女中學：學費及學費減免計劃", scope: "2026/27 中學部按年級及 DSE／IBDP 路線列出的年度學費。", url: "https://www.spcc.edu.hk/chi/page/detail/1085" },
      { label: "聖保羅男女中學：IBDP 課程", scope: "校方說明 IBDP 與本地 DSE 課程並行。", url: "https://www.spcc.edu.hk/page/detail/1074" },
      { label: "聖保羅男女中學官方網站", scope: "學校官方入口；招生、課程和收費以當屆公告為準。", url: "https://www.spcc.edu.hk/" },
      { label: "聖保羅男女中學深度報告", scope: "查看本站另行整理的 DSE／IBDP 路線、課程成本及家庭適配分析。", url: "/cn/reports/spcc-secondary" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "以下列出校方及《中學概覽》公開的培育目標與學習機會；不等於個別學生的選取結果或升學保證。", details: [
        { label: "辦學方向", value: "學校以「信、望、愛」為精神，提出培養具卓越追求、良好品格、利他精神、終身學習熱忱及全球視野的未來領袖。家長可據此評估家庭是否認同其基督教校園文化與全面發展取向。", sourceUrl: SPCC_MISSION },
        { label: "均衡課程", value: "《中學概覽》列宗教、音樂及體育為中一至中六共同必修，並為中二安排由專人教授的藝術及創意學習課程。課程廣度帶來不同學習經驗，也需要學生同時管理多科要求。", period: "《中學概覽 2025/26》", sourceUrl: SSP_SPCC },
        { label: "閱讀與表達", value: "校方列有課外閱讀計劃、指定書目和自選閱讀獎勵，並透過演講、辯論、戲劇及寫作等增潤活動提升兩文三語能力。參加哪些活動及實際投入程度，仍取決於年級安排與學生選擇。", period: "《中學概覽 2025/26》", sourceUrl: SSP_SPCC },
        { label: "課堂外體驗", value: "概覽列出服務學習、歷史文化體驗、院校及企業實習等機會，並包括澳洲四星期戶外體驗課程。這些是校方公開的學習機會，不代表每名學生必然獲派同一項目；家庭宜確認參與資格、名額和費用。", period: "《中學概覽 2025/26》", sourceUrl: SSP_SPCC },
      ] },
      { title: "學校資料與課程路線", note: "學校特色頁不替代當屆招生、收費和選科文件。", details: [
        { label: "辦學資料", value: "中西區直資男女校，基督教背景；學校於 1915 年開始營運。", period: "《中學概覽 2025/26》", sourceUrl: SSP_SPCC },
        { label: "中學課程", value: "提供香港中學文憑考試（HKDSE）及國際文憑大學預科課程（IBDP）路線；選擇條件、銜接和學費須按當屆校方資料核對。", sourceUrl: SSP_SPCC },
        { label: "教學語言", value: "校方以英語為主要教學語言；《中學概覽》把中國語文列為普通話授課、中國歷史等列中文授課。這不是「所有科目全英語」的意思。", period: "2025/26", sourceUrl: SSP_SPCC },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "christ-church-kindergarten",
    name: "基督堂幼稚園",
    nameEn: "Christ Church Kindergarten",
    district: "九龍城區",
    address: "九龍九龍塘志士達道 5 號",
    telephone: "+852 2337 3229",
    schoolNumber: "210196",
    establishedYear: "1969（校方介紹）",
    sponsoringBody: "九龍塘基督堂",
    schoolType: "非牟利私立幼稚園",
    religion: "基督教（聖公會）",
    tuition: "2026/27 上午班全年 HK$76,500，分 10 期（教育局收費證明書；校方網站收費頁仍顯示舊年度）",
    language: "校方稱以英語為主，每日有中文課；未列粵語／普通話比例或每週教時",
    gradeSpan: "校方頁面列 Lower Kindergarten（KG2）及 Upper Kindergarten（KG3），沒有列 K1 或 PN",
    website: CCKG_HOME,
    dataYear: "學費：教育局證明書自 2026-09-01 生效；校方班制與語言頁未標年度",
    sourceNote: "教育局收費證明書列 2026/27 上午幼稚園低班及高班全年 HK$76,500、分 10 期，生效日 2026-09-01；校方網站費用頁仍顯示舊的 2024/25 HK$75,000，本頁採用較新的教育局證明書並註明官網頁面尚未更新。收費證明書中英文地址的樓層範圍不一致，因此本頁只列官方聯絡頁確認的志士達道 5 號，樓層請向校方確認。學校官方頁面另列 KG2、KG3 各三班及每班 29 人，但沒有標示班數所屬學年，因此不能當作當屆可供申請的學額。校方自述的基督教人文教育與教師引導式學習，屬辦學理念，不是獨立評估結果。",
    reportSlug: "cckg",
    sources: [
      { label: "基督堂幼稚園：辦學使命與課程方向", scope: "校方自述的基督教價值、家校合作、人文教育及教師引導的探索式學習方向。", url: CCKG_CURRICULUM },
      { label: "基督堂幼稚園：宗教背景", scope: "校方說明其為非牟利私立幼稚園，由九龍塘基督堂擁有及管理，屬聖公會背景。", url: CCKG_RELIGION },
      { label: "基督堂幼稚園校長介紹", scope: "校方列出 1969 年創立及學校培育方向；歷史為校方自述。", url: CCKG_PRINCIPAL },
      { label: "基督堂幼稚園：授課語言及班級資料", scope: "校方頁面列英語加每日中文課、KG2／KG3 各三班及每班 29 人；未標學年，不能作為當屆學額。", url: CCKG_LANGUAGE },
      { label: "基督堂幼稚園：聯絡資料", scope: "校方地址、電話及官方網站。", url: CCKG_CONTACT },
      { label: "基督堂幼稚園：學費", scope: "校方頁仍列 2024/25 全年 HK$75,000；此頁版本落後於教育局最新證明書。", url: CCKG_FEES },
      { label: "教育局收費證明書：基督堂幼稚園", scope: "學校名稱、地址及 2026-09-01 生效的收費：KG2／KG3 上午班每年 HK$76,500、分 10 期。", url: EDB_CCKG_FEES_CERT },
      { label: "基督堂幼稚園深度報告", scope: "查看本站另行整理的課程、語言與家庭適配分析。", url: "/cn/reports/cckg" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "以下是校方公開的辦學自述；不代表教育局評級或學生結果。", details: [
        { label: "教育方向", value: "校方以基督教原則為基礎，稱希望孩子學會細心聆聽、創意思考、邏輯推理及清晰表達，並透過家校合作培養自律與持續學習的興趣。", sourceUrl: CCKG_HOME },
        { label: "課程取向", value: "校方稱採用以基督教原則為基礎的人文教育；孩子會遊戲、探索和參與不同體驗，但課堂活動由教師設定學習目的並引導。這種安排較重視教師帶領下的知識建構，家長可在參觀時了解活動如何照顧不同孩子的步調。", sourceUrl: CCKG_CURRICULUM },
        { label: "家庭核對點", value: "學校公開理念著重基督教價值與教師主導的學習。若家庭重視宗教氛圍或清晰成人引導，可觀察日常課堂；若優先尋找幼兒自主選擇比重較高的課程，宜直接詢問自由遊戲和主題活動的時間安排。", sourceUrl: CCKG_CURRICULUM },
      ] },
      { title: "班制與學生規模", note: "校方頁面的班數和每班人數未標學年，不等於下一屆招生名額。", details: [
        { label: "校方列出的級別", value: "Medium of Instruction 頁面列 Lower Kindergarten（KG2）及 Upper Kindergarten（KG3），各三班；未列 PN 或 K1。", sourceUrl: CCKG_LANGUAGE },
        { label: "每班人數", value: "同一頁列每班 29 名兒童；頁面沒有提供更新日期，報名前須向校方確認當屆班級及收生安排。", sourceUrl: CCKG_LANGUAGE },
      ] },
      { title: "教學語言與收費", details: [
        { label: "語言安排", value: "校方稱以英語授課，並每日安排中文課；頁面未說明中文課以粵語還是普通話為主，也沒有公布各語言每週課時。", sourceUrl: CCKG_LANGUAGE },
        { label: "2026/27 學費", value: "教育局最新收費證明書列上午幼稚園低班及高班全年 HK$76,500，分 10 期，2026-09-01 生效。校方網站收費頁仍標 2024/25 HK$75,000，兩者有年度差異；本頁採用較新的教育局證明書，繳費前仍應向校方確認是否有其後批核。", period: "2026/27；自 2026-09-01 生效", sourceUrl: EDB_CCKG_FEES_CERT },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "christian-missionary-alliance-sun-kei-primary-school",
    name: "基督教宣道會宣基小學",
    nameEn: "Christian & Missionary Alliance Sun Kei Primary School",
    district: "西貢區",
    address: "新界將軍澳尚德邨",
    telephone: "+852 2191 6996",
    schoolNumber: "522171 / 校址 0001",
    establishedYear: "1998",
    sponsoringBody: "基督教宣道會香港區聯會有限公司",
    schoolType: "資助小學",
    gender: "男女校",
    religion: "基督教",
    schoolNet: "95 校網",
    tuition: "不收學費；2026/27 列家長教師會年費 HK$20、學校發展基金 HK$200",
    language: "《小學概覽 2026》列中文為教學語言",
    gradeSpan: "小一至小六；2026/27 每級核准 5 班，共 30 班",
    website: "https://www.sunkei.edu.hk/tc",
    dataYear: "《小學概覽 2026》；學校官網簡介頁修訂日期 2026-09-01",
    sourceNote: "《小學概覽 2026》註明資料由學校提供及核實。2026/27 班數是教育局批核班級數，不是小一對外招生學額；校方未在本頁公開可供申請的實際空缺。學校列出不設精英班、以合作學習為本，並以生命教育、校本課程及多元智能（LCM）作辦學特色。這些是校方申報的課程安排，不等同每名學生都會取得相同學習成效。",
    reportSlug: "cmask",
    sources: [
      { label: "《小學概覽 2026》：基督教宣道會宣基小學", scope: "校網、地址、辦學團體、學校類別、宗教、費用、班數、學習評估、教學策略、校訓、設施與校方特色；資料由學校提供及核實。", url: PSP_CMASK },
      { label: "教育局學校搜尋：基督教宣道會宣基小學", scope: "核對學校編號、校址識別、電話、地區、全日制、男女校、資助類別及地址。", url: EDB_SUNKEI },
      { label: "基督教宣道會宣基小學：生命教育簡介", scope: "校方說明生命教育的四個範疇和培育目標。", url: CMASK_MISSION },
      { label: "基督教宣道會宣基小學官方網站", scope: "校方當屆招生、課程及學校公告入口。", url: "https://www.sunkei.edu.hk/tc" },
      { label: "基督教宣道會宣基小學深度報告", scope: "查看本站另行整理的課程、入學和家庭適配分析。", url: "/cn/reports/cmask" },
    ],
    detailSections: [
      { title: "辦學理念與特色", featured: true, note: "資料來自學校提供並由家校會刊載的《小學概覽 2026》及校方網站。", details: [
        { label: "LCM 辦學特色", value: "學校以 LCM（生命教育、校本課程、多元智能）作特色，重視生命教育與關愛文化，並以自主學習和多元智能作發展方向。選校時值得看孩子能否投入多元學習，也可問清各年級校本課程如何落實。", sourceUrl: PSP_CMASK },
        { label: "生命教育", value: "校方把生命教育分為人與自己、人與他人、人與環境、人與生命四個範疇，透過知、情、意、行的進程培養品格與價值觀。家長可把這一點與家庭的品格教育方式對照，而不只看活動名稱。", sourceUrl: CMASK_MISSION },
        { label: "合作學習與照顧差異", value: "概覽列明學校不設精英班，以合作學習為本，並透過課程調適照顧個別差異。這種分班取向重視同伴互動；參觀時可進一步了解教師如何分組、跟進不同程度學生，以及小一上學期的過渡安排。", sourceUrl: PSP_CMASK },
        { label: "跨學科服務學習", value: "高年級推行跨學科服務學習，把各科知識連到可持續發展議題和服務實踐；具體題目、年級與參與方式仍按校方當年安排。", period: "《小學概覽 2026》", sourceUrl: PSP_CMASK },
      ] },
      { title: "班級、費用與日常", details: [
        { label: "2026/27 班數", value: "小一至小六每級均列 5 班，共 30 班。這是核准班級數，不代表小一可申請學位數。", period: "2026/27", sourceUrl: PSP_CMASK },
        { label: "基本收費", value: "概覽列學費及堂費為「—」；另列家長教師會年費 HK$20、學校發展基金 HK$200。家庭仍應以當屆繳費通知確認實際項目。", period: "2026/27", sourceUrl: PSP_CMASK },
        { label: "評估與家課節奏", value: "小一上學期以多元進展性評估代替測驗和考試；小一全年列 1 次測驗、1 次考試。小二至小六列 1 次測驗、2 次考試。概覽亦列導修時段，讓學生在教師指導下完成部分家課。", period: "《小學概覽 2026》", sourceUrl: PSP_CMASK },
      ] },
      { title: "教學與支援", details: [
        { label: "學習模式", value: "學校的教學信念包括互動、探究、合作與經歷為本學習，教師主要擔任促導角色；電子學習和校本課程亦用於培養自主學習及高階思維。", sourceUrl: PSP_CMASK },
        { label: "語言", value: "概覽列中文為教學語言。學校設英文、普通話等學科與活動，但這些課程不能直接推導為英語或普通話的授課比例。", sourceUrl: PSP_CMASK },
        { label: "校園設施", value: "概覽列 30 間課室、兩個禮堂、兩個操場、兩個圖書館，以及 STEM Room、英語活動室、音樂室、繪本館和生命教育資源中心。設施清單是校方公布的配置，不等於每名學生可獲相同使用時間。", sourceUrl: PSP_CMASK },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "diocesan-girls-school",
    name: "拔萃女書院",
    nameEn: "Diocesan Girls' School",
    district: "油尖旺區",
    address: "九龍佐敦道 1 號",
    telephone: "+852 2277 9100",
    schoolNumber: "學校註冊編號 E.D. 1/2/4456/57",
    establishedYear: "1860",
    sponsoringBody: "拔萃女書院校董會",
    schoolType: "直資中學",
    gender: "女校",
    religion: "基督教",
    tuition: "本地學生 2026/27 年費 HK$42,000；校方表示可能因教育局審批作小幅調整",
    language: "除中國語文及中文相關科目外，以英語為教學語言；中五起可按個人強項與需要選 HKDSE 或 GCE A-Level",
    gradeSpan: "中一至中六；中五起提供 HKDSE 與 GCE A-Level 路線",
    website: "https://www.dgs.edu.hk/",
    dataYear: "《中學概覽 2025/26》；學費與課程路線按校方 2026/27 招生頁核對",
    sourceNote: "《中學概覽 2025/26》資料一般以學校 2025 年 9 月情況為本，並由學校提供及核實；校方招生頁列本地學生 2026/27 年費 HK$42,000，並提示可能因教育局審批而小幅調整。學校開辦 DSE 及 GCE A-Level 路線，選科和轉換須按當屆校內安排確認。校訓、宗教背景和課程方向屬公開資料，不應被當成錄取或升學結果承諾。",
    reportSlug: "dgs-secondary",
    sources: [
      { label: "《中學概覽 2025/26》：拔萃女書院", scope: "身份、校訓、學校類別、宗教、課程與教學語言、班數、校園設施及學習特色；資料一般以 2025 年 9 月為本並由學校核實。", url: SSP_DGS },
      { label: "拔萃女書院：中學招生與學校介紹", scope: "校方公布 2026/27 本地與非本地學費、英語授課範圍、HKDSE／GCE A-Level 路線及學校培育方向。", url: DGS_ADMISSIONS },
      { label: "拔萃女書院：學校計劃與報告", scope: "校方公布 2024/25–2026/27 學校發展計劃及年度計劃／報告入口。", url: "https://www.dgs.edu.hk/information/school-plans" },
      { label: "拔萃女書院深度報告", scope: "查看本站另行整理的招生、課程路線及家庭適配分析。", url: "/cn/reports/dgs-secondary" },
    ],
    detailSections: [
      { title: "辦學理念與學習方向", featured: true, note: "理念與特色為校方／《中學概覽》自述；本頁不把學校聲譽等同個別學生結果。", details: [
        { label: "全人教育", value: "學校自述以基督教價值和中國傳統文化為基礎，為女生提供全人教育；《中學概覽》另以追求卓越、發揮潛能和熱愛學習概括辦學方向。家庭可據此判斷是否認同其價值框架與學習期待。", sourceUrl: DGS_ADMISSIONS },
        { label: "語文與授課語言", value: "校方表示除中國語文及中文相關科目外，以英語授課；概覽列初中中國語文、中國歷史及普通話以中文授課。若孩子目前主要用中文學習，入學前應評估以英語處理多數學科內容的適應需要。", period: "2026/27 校方招生頁；2025/26 概覽", sourceUrl: DGS_ADMISSIONS },
        { label: "兩條高中課程路線", value: "中五起可按學生強項與需要選擇 HKDSE 或 GCE A-Level。兩條路線的科目組合、評核制度與大學申請要求不同，應按目標升學地區和學科規劃，並向校方核實當屆選科容量與轉換安排。", sourceUrl: DGS_ADMISSIONS },
        { label: "課堂外活動", value: "校方介紹運動校隊、音樂小組／樂團及其他課外活動；概覽亦列出閱讀、健康生活和身心靈發展方向。活動種類多不表示每位學生均能加入特定隊伍，須考慮甄選、時間與學業安排。", period: "2026/27 校方招生頁；《中學概覽 2025/26》", sourceUrl: SSP_DGS },
      ] },
      { title: "班級與收費", details: [
        { label: "班級結構", value: "《中學概覽 2025/26》列中一至中六每級 5 班，共 30 班。班數描述學校結構，不是中一可申請名額。", period: "2025/26", sourceUrl: SSP_DGS },
        { label: "本地學生學費", value: "學校招生頁列本地學生當年年費 HK$42,000，並提示 2026/27 費用可能按教育局審批作小幅調整。概覽的 HK$42,000 是 2025/26 年度資料，應與校方當屆繳費通知區分。", period: "2026/27 校方公布；2025/26 概覽", sourceUrl: DGS_ADMISSIONS },
      ] },
      { title: "公開資料的邊界", details: [
        { label: "課程與科目", value: "《中學概覽》列出 DSE 與 GCE A-Level 的科目範圍；實際開科、班別和學生選科會隨年度調整，應以當屆校方公告確認。", sourceUrl: SSP_DGS },
        { label: "中一收生制度", value: "學校不參加中學學位分配辦法統一派位；資料頁只提示這項制度差異，具體申請期、評核和資格請看校方最新招生公告。", period: "適用於 2026 年 9 月升讀中一的概覽資料", sourceUrl: SSP_DGS },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "st-catherines-international-kindergarten",
    name: "國際英文幼稚園",
    nameEn: "St. Catherine's International Kindergarten & Nursery",
    district: "九龍城區",
    address: "九龍塘羅福道4及6號、雅息士道1號",
    telephone: "+852 2337 7344",
    schoolNumber: "215120",
    schoolType: "私立幼稚園",
    tuition: "2026/27：K1 HK$80,234；K2、K3 HK$87,241，均分11期；其他費用另計",
    gender: "男女校",
    establishedYear: "1970",
    language: "校方表示九龍塘校舍以粵語、英語及普通話建立語言基礎；各語言教時未見公開",
    gradeSpan: "九龍塘校址0001、0002設K1–K3；紅磡PN屬另一登記學校586625",
    website: "https://www.stcatherines.edu.hk/",
    dataYear: "《幼稚園概覽》2026/27；人員統計2025年9月；教育局收費證2026-09-01生效；招生2027/28",
    sourceNote: "本頁只指學校編號215120下的九龍塘兩校址。紅磡海濱南岸另有586625登記，其PN幼兒服務、學費和學生數字不併入本校。2026/27九龍塘費用已用教育局收費證與概覽核對；師生比例為2025年9月整體統計，不是每班人數。課程為校方申報，未公開各語種每日分鐘。",
    reportSlug: "stcat",
    replaceDirectoryDetails: true,
    omitDirectoryDetailTitles: ["幼稚園概覽｜校址 0001", "幼稚園概覽｜校址 0002"],
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號、校址編號、各校址地址、授課時段、電話及官網；資料截至 2026-09-30。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "教育局《學校基本註冊資料》", scope: "學校編號 215120 及不同校址的登記狀態；每日更新資料不包括官立學校。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "《幼稚園概覽 2026/27》：羅福道校址", scope: "校址 0001 的班制、語言、師生比例及學校概覽欄位。", url: KGP_STCAT_NORFOLK },
      { label: "《幼稚園概覽 2026/27》：雅息士道校址", scope: "校址 0002 的班制及校址資料；各校舍資料分開理解。", url: KGP_STCAT_ESSEX },
      { label: "教育局：九龍塘2026/27收費證", scope: "K1及K2/K3每期及全年費用，2026-09-01生效；Nursery在此證指K1而非PN。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf" },
      { label: "校方：2027/28 K1招生須知", scope: "班型、出生日期、申請與面見流程；不把共用表單模板的其他入口當作現行招生。", url: "https://admission.ekinder.com.hk/stcikg/" },
      { label: "2026/27概覽：紅磡586625幼兒服務", scope: "僅用於區分PN服務及2025年9月費用快照，不作當屆PN新報價。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5866250001" },
    ],
    detailSections: [
      { title: "辦學理念與課程特色", featured: true, note: "概覽為校方申報課程方向，不是獨立成效評估。", details: [
        { label: "校本主題與故事學習", value: "以本地中、英、普校本課程為基礎，用主題、故事及多元活動組織學習，兼顧幼兒語言、個人及群體等發展。", sourceUrl: KGP_STCAT_NORFOLK },
        { label: "評估與升小準備", value: "持續觀察幼兒表現，建立個人學習檔案；列有模擬小一生活、參觀小學、家長講座及舊生家長分享，並不提供特定小學保留學位。", sourceUrl: KGP_STCAT_NORFOLK },
        { label: "英粵與英普班型", value: "2027/28招生須知列英粵、英普班型；英普申請另有普通話面見。各語種每日課時未公開，不能由班名推算英語佔一半。", period: "2027/28招生", sourceUrl: "https://admission.ekinder.com.hk/stcikg/" },
      ] },
      { title: "校舍、人員與支援", details: [
        { label: "兩校址師生比例", value: "羅福道上午／下午均1:7.4；雅息士道上午／下午均1:7.9。這是校址整體比例，不是每班只有七八名幼兒。", period: "2025年9月", sourceUrl: KGP_STCAT_NORFOLK },
        { label: "教師及適應支援", value: "羅福道申報98名校長及教學人員，雅息士道37名；概覽列新生適應、個別輔導及到校學前綜合服務，實際支援按兒童需要另向學校確認。", period: "2025年9月人員統計", sourceUrl: KGP_STCAT_ESSEX },
      ] },
      { title: "級別、時段與費用", details: [
        { label: "九龍塘K1–K3", value: "教育局215120收費證列K1上午及下午，K2下午、K3上午。證上的Nursery指K1幼兒班，不是2–3歲PN。", period: "2026/27", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf" },
        { label: "核准學費", value: "K1每年HK$80,234（HK$7,294×11）；K2、K3每年HK$87,241（HK$7,931×11）。用品、校車等支出另計。", period: "2026/27；2026-09-01生效", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf" },
        { label: "紅磡PN須分開核對", value: "海濱南岸幼兒服務屬另一學校編號586625；概覽PN年費HK$90,244屬2025年9月資料，不作當屆新報價，也不併入九龍塘學額。", period: "PN統計2025年9月", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5866250001" },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "skh-holy-spirit-primary-school",
    name: "聖公會主風小學",
    nameEn: "S.K.H. Holy Spirit Primary School",
    district: "沙田區",
    address: "新界沙田瀝源邨",
    telephone: "+852 2604 8987",
    schoolNumber: "114472 / 校址 0001",
    schoolType: "資助小學",
    gender: "男女校",
    religion: "基督教",
    schoolNet: "91",
    establishedYear: "1976",
    tuition: "免學費；2026/27 家教會年費 HK$50，特定用途費 HK$400（包括冷氣費）",
    language: "中文授課；《小學概覽》未細分各科粵語／普通話教時",
    gradeSpan: "小一至小六；全日制",
    website: "https://www.skhhsps.edu.hk/",
    dataYear: "《小學概覽 2026》；辦學理念校方網頁；學校簡介 2025/26",
    sourceNote: "小一校網、學校類別、課程及年度收費按家校會《小學概覽 2026》及校方資料列示。2026/27 核准班數是班級結構，不等於實際可供申請學額。學校理念與教學支援為校方／概覽自述；一年級雙班主任只適用於小一，不能推廣為全校每班配置。學校沒有列一條龍、直屬或聯繫中學，升中仍按當屆制度及學生志願辦理。",
    reportSlug: "skhmfps",
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號、校址、地區、電話、授課時間及官方網站；資料截至 2026-09-30。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "教育局《學校基本註冊資料》", scope: "學校編號 114472、校址 0001 及登記狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "家校會《小學概覽 2026》：聖公會主風小學", scope: "校網、班數、學費／收費、教師資料、課程、教學支援及升中聯繫欄位；學校資料由校方提供及核實。", url: PSP_SKHHPS },
      { label: "聖公會主風小學：辦學理念", scope: "校方以聖公會基督教價值和全人教育說明辦學方向。", url: SKHHPS_PHILOSOPHY },
      { label: "聖公會主風小學：2025/26 學校簡介", scope: "學校關注事項、校舍與學習支援等學年資料；不把年度活動當作長期固定安排。", url: SKHHPS_OVERVIEW_2025 },
    ],
    detailSections: [
      { title: "辦學理念與學習特色", featured: true, note: "學校資料由校方提供及核實；以下呈現校方方向與公開安排，不等於獨立成效評估。", details: [
        { label: "基督教全人教育", value: "學校稱課程設計與實踐建基於基督信仰，並把基督教核心價值視為全校課程的一部分；校方亦說明學生需參與學校課程與學習活動。重視宗教教育的家庭可把這項日常安排列入適配度考量。", sourceUrl: SKHHPS_PHILOSOPHY },
        { label: "近年校務重點", value: "2025/26 學校簡介列出兩項關注：透過多元學習經歷鞏固學習效能，以及推行價值教育；當年主題為「感恩寬恕、擁抱健康生活」。這是年度工作重點，之後學年可能調整。", period: "2025/26", sourceUrl: SKHHPS_OVERVIEW_2025 },
        { label: "學習支援方式", value: "《小學概覽 2026》稱支援教師會在課堂協作教學或抽離教學；小一各班另設雙班主任。這些安排有助家長了解低年級照顧模式，但抽離支援的對象與頻率需按個別需要向學校查詢。", period: "《小學概覽 2026》", sourceUrl: PSP_SKHHPS },
      ] },
      { title: "班級、費用與升中銜接", details: [
        { label: "2026/27 核准班數", value: "小一至小六各 4 班，共 24 班。這是教育局批核的班級數，不是小一實際招生名額。", period: "2026/27", sourceUrl: PSP_SKHHPS },
        { label: "學費與核准收費", value: "免學費；2026/27 家教會年費 HK$50，特定用途費 HK$400（包括冷氣費）。校服、書簿、午膳與交通等家庭支出需另行核對。", period: "2026/27", sourceUrl: PSP_SKHHPS },
        { label: "升中關係", value: "《小學概覽 2026》沒有列一條龍、直屬或聯繫中學。家長應按小六當屆中學學位分配制度規劃，不把同一辦學團體或宗教背景理解為升中保證。", period: "《小學概覽 2026》", sourceUrl: PSP_SKHHPS },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "la-salle-college",
    name: "喇沙書院",
    nameEn: "La Salle College",
    district: "九龍城區",
    address: "九龍喇沙利道 18 號",
    telephone: "+852 2338 7171",
    schoolNumber: "512583 / 校址 0001",
    schoolType: "資助中學",
    gender: "男校",
    religion: "天主教",
    establishedYear: "1932",
    tuition: "免學費；2025/26 堂費中一至中三每年 HK$3,000、中四至中六每年 HK$3,360；另有核准收費",
    language: "除中國語文、中國歷史、普通話及法文外，概覽列其他科目以英語授課；法文班以法語授課",
    gradeSpan: "中一至中六；本地中學課程以 HKDSE 為主",
    website: "https://www.lasalle.edu.hk/",
    dataYear: "家校會《中學概覽 2025/26》（修訂 2025-12-05）；校方課程與理念頁",
    sourceNote: "本頁以家校會《中學概覽 2025/26》及校方網站資料整理。學校類別為資助、男校、天主教；「免學費」不代表沒有堂費、家教會費或其他核准收費。堂費數額及開科資料按 2025/26 年度列示，下一屆費用、科目和招生安排須按校方最新通告確認。辦學理念、課程特色和課外活動為校方自述，不構成成績或升學結果保證。",
    reportSlug: "la-salle-secondary",
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號、校址、地區、電話、授課時間及官方網站；資料截至 2026-09-30。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "教育局《學校基本註冊資料》", scope: "學校編號 512583、校址 0001 及登記狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "家校會《中學概覽 2025/26》：喇沙書院", scope: "辦學類別、性別、宗教、校訓、費用、教學語言、課程、班級及學生支援；資料由學校提供及核實。", url: SSP_LASALLE },
      { label: "喇沙書院：願景與使命", scope: "校方對信德、服務、社群、全人教育及學生個別發展的自述。", url: LASALLE_MISSION },
      { label: "喇沙書院：課程與科目", scope: "校方公布初中、高中科目選擇與課程架構。", url: LASALLE_CURRICULUM },
    ],
    detailSections: [
      { title: "辦學理念與學習特色", featured: true, note: "以下為校方與《中學概覽》所述方向和安排，不代表學生必然取得特定成績或活動名額。", details: [
        { label: "信德、服務與全人教育", value: "校方以信德、服務和社群為核心價值，重視每名男生的個別性，並稱會關注較需要支援的學生；學術、體育與藝術均被納入培育方向。這種定位適合重視天主教傳統及服務文化的家庭，也要確認孩子對相關校園生活的接受度。", sourceUrl: LASALLE_MISSION },
        { label: "英語授課與課程", value: "《中學概覽 2025/26》列除中國語文、中國歷史、普通話及法文外，多數科目以英語授課；法文班以法語授課。家長需按孩子現有英文讀寫能力評估跨科學習要求，不能只看英文科成績。", period: "2025/26", sourceUrl: SSP_LASALLE },
        { label: "學習與課外參與", value: "概覽列出 BYOD、自主學習、小班教學及約 50 個學會／興趣小組；2025/26 安排要求中一參與服務、藝術、體育三類活動，中二以上參與兩項。活動種類和參與要求可能更新，宜向校方核對當屆細則。", period: "2025/26", sourceUrl: SSP_LASALLE },
      ] },
      { title: "班級與家庭費用", details: [
        { label: "班級結構", value: "2025/26 學年中一至中六各 7 班。班數反映當年結構，不等於中一可申請名額。", period: "2025/26", sourceUrl: SSP_LASALLE },
        { label: "學費與堂費", value: "資助學校不收學費；2025/26 堂費為中一至中三每年 HK$3,000、中四至中六每年 HK$3,360。家教會會費及核准非標準收費另計。", period: "2025/26", sourceUrl: SSP_LASALLE },
        { label: "升中途徑", value: "《中學概覽》列學校接受自行分配學位申請，並參加適用於 2026 年 9 月升讀中一的統一派位。具體名額、比重及時程屬年度資料，申請前應重看當屆公告。", period: "2026 年 9 月升讀中一適用資料", sourceUrl: SSP_LASALLE },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "kowloon-city-baptist-kg",
    name: "九龍城浸信會幼稚園",
    nameEn: "Kowloon City Baptist Church Kindergarten",
    district: "九龍城區",
    address: "九龍亞皆老街２０６號三及四樓",
    schoolType: "非牟利幼稚園",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午、下午及全日班；PN 未列",
    website: "https://www.kcbckg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30、註冊資料下載於 2026-10-23；《幼稚園概覽 2026/27》；校方理念頁查核 2026-10-23",
    sourceNote: "以下辦學理念與課程描述來自校方網頁；班制、語言、師生比例及學費沿用教育局《幼稚園概覽 2026/27》對應校址資料。校方列出品德教育、自由遊戲、戲劇和雙語課程等安排，不代表每名幼兒都參與每項活動或取得相同學習成效。概覽列授課語言為粵語，不能據此推算英語／普通話課時比例。",
    reportSlug: "kowloon-city-baptist-kg",
    appendDirectoryDetails: true,
    sources: [
      { label: "九龍城浸信會幼稚園：校園介紹", scope: "校方背景、辦學宗旨、班別與上課時間；班制以校方公布及概覽年度為準。", url: KCBK_CAMPUS },
      { label: "九龍城浸信會幼稚園：課程特色", scope: "校方自述兒童為本、幼兒興趣與生活經驗、探索、分享及參觀體驗安排。", url: KCBK_CURRICULUM },
      { label: "九龍城浸信會幼稚園：品德教育", scope: "校方自述品格故事、好孩子紀錄冊及每週宗教課安排。", url: KCBK_MORAL_EDUCATION },
    ],
    detailSections: [
      { title: "校方理念與學習特色", featured: true, note: "以下是校方公布的教育目標與課程安排，不是外部成效評估。", details: [
        { label: "兒童本位與生活探索", value: "校方表示以兒童為本，課程會考慮幼兒的興趣、能力及生活經驗，透過多元教學、探索分享和外出參觀接觸不同事物。對家長而言，這代表課堂不只按教材推進；可進一步向學校了解活動如何配合不同孩子的語言與發展需要。", sourceUrl: KCBK_CURRICULUM },
        { label: "品德與宗教教育", value: "校方以基督教教育為基礎，透過品格故事和「好孩子紀錄冊」記錄幼兒的良好行為；學校另稱每週安排一節約 25–30 分鐘的宗教課。重視宗教教育的家庭可把這項固定安排納入考量，也宜確認孩子在校日常接觸宗教內容的方式。", period: "校方網頁查核 2026-10-23", sourceUrl: KCBK_MORAL_EDUCATION },
        { label: "課程類型", value: "校方列出藝術、戲劇、雙語、自由遊戲、品德教育及奧福音樂等課程元素。網頁沒有提供各元素每週時數或全體學生的參與比例，因此適合把它們視為課程方向，報名前再向校方核對每日流程。", sourceUrl: KCBK_CURRICULUM },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "plk-tam-au-yeung-siu-fong",
    name: "保良局譚歐陽少芳紀念幼稚園",
    nameEn: "Po Leung Kuk Tam Au-Yeung Siu Fong Memorial Kindergarten",
    district: "九龍城區",
    address: "九龍紅磡黃埔花園第七期地下3B舖",
    schoolType: "非牟利幼稚園",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午及下午班；PN 未列",
    website: "https://www.plkkgs.edu.hk/plktaysfmkg",
    dataYear: "教育局位置資料截至 2026-09-30、註冊資料下載於 2026-10-23；《幼稚園概覽 2026/27》；校方收生資料涵蓋 2027/28 學年",
    sourceNote: "學校理念、課程與收生說明以校方及保良局公開頁面為依據；班制、語言、師生比例與收費沿用《幼稚園概覽 2026/27》對應校址資料。校方強調兩文三語，但沒有公布各語言授課時數，故不推算英語或普通話佔比。招生時程及非華語支援按 2027/28 收生頁面理解，應以最新一屆通告為準。",
    reportSlug: "plk-tam-au-yeung-siu-fong",
    appendDirectoryDetails: true,
    sources: [
      { label: "保良局譚歐陽少芳紀念幼稚園：收生資料簡介", scope: "校方自述辦學方向、語言發展、教學形式、2027/28 招生程序與非華語面見支援。", url: PLK_TAYSF_ADMISSION },
      { label: "保良局：譚歐陽少芳紀念幼稚園服務頁", scope: "保良局對該校語言環境及每班中文、英文班主任安排的介紹。", url: PLK_TAYSF_ENGLISH },
    ],
    detailSections: [
      { title: "校方理念與教學語言", featured: true, note: "語言安排依校方自述；校方未公布各語言每週授課時數。", details: [
        { label: "主動學習與主題活動", value: "校方表示，課程希望培養幼兒主動學習、獨立思考和「學會學習」能力，並以小組教學和主題活動組織課堂；遊戲、戲劇、角落活動、戶外學習及社區活動用來延伸主題。這種安排提供多種表達和體驗方式，家長可觀察孩子是否適應小組互動與活動轉換。", sourceUrl: PLK_TAYSF_ADMISSION },
        { label: "兩文三語的實際安排", value: "校方把母語、英語及普通話應用列為發展重點；保良局服務頁另稱各班由英文與中文班主任共同照顧，並設英語活動統籌教師。這說明孩子有多語接觸機會，但不等於三種語言平均授課，也不能單憑「兩文三語」判斷日常英語強度。", period: "保良局服務頁查核 2026-10-23；學校收生資料頁查核 2026-10-23", sourceUrl: PLK_TAYSF_ENGLISH },
        { label: "非華語家庭支援", value: "校方的 2027/28 收生資料表示，面見非華語兒童時可按需要提供中文或英文面見，並可安排傳譯／翻譯服務，或接納家長與兒童由懂中文的親友陪同。若家庭有語言支援需要，報名前應先聯絡學校確認如何預約。", period: "2027/28 收生資料", sourceUrl: PLK_TAYSF_ADMISSION },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tak-sun-kg",
    name: "德信幼稚園",
    nameEn: "Tak Sun Kindergarten",
    district: "油尖旺區",
    address: "九龍柯士甸道103號",
    schoolType: "非牟利幼稚園",
    gradeSpan: "K1–K3；上午及下午班；校方頁面稱設外籍英語導師與普通話導師",
    website: "https://taksunkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30、註冊資料下載於 2026-10-23；《幼稚園概覽 2026/27》；校方理念及課程頁查核 2026-10-23",
    sourceNote: "德信幼稚園的基本班制、授課語言、比例及收費按《幼稚園概覽 2026/27》列示；校方簡介與課程頁仍列 2025/26 年度免費學費資訊，故未把該年度價格當作新學年報價。課程頁自述約六成畢業男生升讀德信學校，但沒有列分母、年份及統計口徑，本頁不把這句當作升學比例或保證。",
    reportSlug: "tak-sun-kg",
    appendDirectoryDetails: true,
    sources: [
      { label: "德信幼稚園：學校簡介", scope: "校方自述辦學宗旨、家校合作、師資、班別、校舍及學費年度。", url: TAKSUN_KG_PROFILE },
      { label: "德信幼稚園：課程特色", scope: "校方自述主題教學、品德培育、語言活動、觀察評估及幼小銜接安排。", url: TAKSUN_KG_CURRICULUM },
    ],
    detailSections: [
      { title: "校方理念與課程特色", featured: true, note: "校方頁面未清楚標示課程頁最近更新時間；學費和招生安排須按新學年通告再核實。", details: [
        { label: "天主教價值與品德培育", value: "校方以天主教信仰和校訓「勤而樂」說明辦學方向，重視關愛、尊重與品德發展；另稱會透過德育週會及日常課堂培養禮貌、責任和分享。這個取向適合重視價值教育的家庭，仍需確認孩子對宗教與校園文化的接受度。", sourceUrl: TAKSUN_KG_PROFILE },
        { label: "主題式學習", value: "課程頁稱以主題教學結合參觀、討論與探索，並透過持續觀察記錄幼兒在校表現。語文方面，中文以聆聽、互動和閱讀活動為主；英語透過遊戲、歌曲及話劇接觸，普通話則以故事和交談為例。頁面未公布各語言課時，不宜把導師安排理解成英普沉浸式教學。", sourceUrl: TAKSUN_KG_CURRICULUM },
        { label: "幼小銜接與家庭參與", value: "校方稱高班會參觀同址小學並體驗小學課堂，也會舉辦升小家長講座；校方另把家長視為孩子的重要教育者，提供親職講座或工作坊。這些是學校公布的銜接與家校安排，實際日期、參與方式和每屆內容應向校方確認。", sourceUrl: TAKSUN_KG_PROFILE },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "hfc",
    name: "嘉諾撒聖家學校",
    nameEn: "Holy Family Canossian School",
    district: "九龍城區",
    address: "九龍九龍城聯合道102號",
    schoolNumber: "512060 / 校址 0001",
    schoolType: "資助小學",
    gender: "女校",
    religion: "天主教",
    schoolNet: "41",
    tuition: "免學費；2026/27 家教會年費 HK$50、特定用途收費 HK$100",
    language: "中文",
    gradeSpan: "小一至小六；全日制",
    website: "https://www.hfkc.edu.hk/",
    dataYear: "家校會《小學概覽 2026》資料以 2026 年 5 月學校情況為本；校方辦學宗旨頁查核 2026-10-23",
    sourceNote: "此登記學校編號下有多個校址，基本地址仍按教育局登記清單分列；本段理念資料取自嘉諾撒聖家學校校方頁面，並以校方在《小學概覽 2026》申報資料作年度事實核對。校方公布此校址屬 41 校網、資助女校、中文授課，並列嘉諾撒聖家書院為直屬中學；直屬關係不等於每名學生無條件直升，實際名額及資格須看當屆升中安排。",
    reportSlug: "hfc",
    appendDirectoryDetails: true,
    sources: [
      { label: "家校會《小學概覽 2026》：嘉諾撒聖家學校", scope: "校網、辦學類別、授課語言、費用、直屬中學及校方申報的年度校務資料。", url: HFC_PROFILE_2026 },
      { label: "嘉諾撒聖家學校：辦學宗旨", scope: "校方自述嘉諾撒教育使命、謙遜仁愛、全人教育及照顧學生差異的方向。", url: HFC_MISSION },
    ],
    detailSections: [
      { title: "辦學理念與學習定位", featured: true, note: "本段對應聯合道校址；登記學校另有校址資料，校網和收費應按相應校址的《小學概覽》紀錄閱讀。", details: [
        { label: "謙遜仁愛與全人教育", value: "學校以嘉諾撒仁愛女修會的教育使命為基礎，強調謙遜仁愛、關懷弱小、服務社群及德智體群美靈均衡發展。這讓家長看到學校對品格與社群參與的明確要求；若家庭主要按學術成績或英語授課選校，還需把「中文授課、天主教教育」一併納入比較。", sourceUrl: HFC_MISSION },
        { label: "因材施教與校園關係", value: "校方表示重視每名學生的獨特性，並希望透過互相關愛的學習環境照顧學生身心需要。這是辦學方向的自我陳述，不能直接推論個別支援的頻率或成效；如孩子有特定學習需要，建議向校方詢問可提供的支援方式和聯絡流程。", sourceUrl: HFC_MISSION },
        { label: "升中銜接", value: "《小學概覽 2026》把嘉諾撒聖家書院列為直屬中學。家長可把這看作制度上的升中銜接因素，但仍需了解當屆直屬學位安排、申請資格與學生選擇，不宜理解成自動升讀。", period: "《小學概覽 2026》", sourceUrl: HFC_PROFILE_2026 },
      ] },
    ],
  },
    {
      stage: "secondary",
      slug: "maryknoll-convent-school-secondary",
    name: "瑪利諾修院學校（中學部）",
    nameEn: "Maryknoll Convent School (Secondary Section)",
    district: "九龍城區",
    address: "九龍塘何東道5號",
    schoolType: "資助中學",
    gender: "女校",
    religion: "天主教",
    tuition: "免學費；2025/26 家教會費及核准收費按《中學概覽》列示",
    language: "2025/26 除中國語文、中國歷史及普通話外，多數科目以英語授課",
    gradeSpan: "中一至中六；本地中學課程",
    website: "https://www.mcs.edu.hk/",
    dataYear: "家校會《中學概覽 2025/26》；校方使命與課程頁查核 2026-10-23",
    sourceNote: "授課語言、學校類別和年度課程資料依《中學概覽 2025/26》；校方使命和課程頁用來補充學校自述的教育方向。2025/26 中一至中六各級班數、科目與入學安排屬年度快照，不能直接當作下一學年安排。學校以英語教授大多數科目，除中文、中國歷史及普通話外；這表示孩子需有足夠英文閱讀與書寫能力來應付跨科學習。",
    reportSlug: "maryknoll-convent-school-secondary",
    appendDirectoryDetails: true,
    sources: [
      { label: "家校會《中學概覽 2025/26》：瑪利諾修院學校（中學部）", scope: "本地中學類別、性別、宗教、授課語言、開設科目與班級結構；學校資料按年度提供及核實。", url: SSP_MCS },
      { label: "瑪利諾修院學校：使命與願景", scope: "校方自述瑪利諾精神、全人教育、服務、品格與女孩教育方向。", url: MCS_MISSION },
      { label: "瑪利諾修院學校：校本課程", scope: "校方對六年以學生為中心課程及課程設計原則的說明。", url: MCS_SCHOOL_CURRICULUM },
    ],
    detailSections: [
      { title: "辦學理念與課程特色", featured: true, note: "課程設計與價值方向為校方自述；科目授課語言按 2025/26 概覽列示。", details: [
        { label: "瑪利諾精神與女孩教育", value: "校方以「Sola Nobilitas Virtus」（唯德至上）說明學校精神，重視道德與宗教價值、學術能力、服務他人及持續自我發展，並提供全人教育。對家庭而言，這所學校把品格、信仰與學業並置，不能只按傳統名校印象判斷是否合適。", sourceUrl: MCS_MISSION },
        { label: "以學生為中心的六年課程", value: "校方表示，六年課程以學生為中心，設計時參照學校使命、學生需要與興趣、香港課程要求及真實生活經驗，並回應科技和社會變化。這說明課程設計方向；實際選科、延伸學習和 STEAM 活動仍按年級及校內安排執行。", sourceUrl: MCS_SCHOOL_CURRICULUM },
        { label: "英語授課環境", value: "《中學概覽 2025/26》列除中國語文、中國歷史及普通話外，多數科目以英文授課。家長應評估孩子用英文理解數學、科學、人文及寫作任務的能力，而非只看英文科分數；中文科的語言安排亦需與家庭預期核對。", period: "2025/26", sourceUrl: SSP_MCS },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "soka",
    name: "香港創價幼稚園",
    nameEn: "Hong Kong Soka Kindergarten",
    district: "九龍城區",
    address: "九龍塘慕禮道 4 號",
    schoolType: "非牟利幼稚園（參加幼稚園教育計劃）",
    gender: "男女校",
    tuition: "2026/27 半日班每期 HK$197，共 11 期（扣除政府資助後）；用品費另計",
    language: "《幼稚園概覽 2026/27》列中文（普通話）；未公布各語言課時比例",
    gradeSpan: "K1–K3；2026/27 校方資料列 K1 上午及下午班各預計收生 90 人",
    website: "https://soka.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方招生及費用資料 2026/27",
    sourceNote: "K1 上午、下午各 90 人是校方對 2026/27 學年的預計收生人數，不是往後年度的固定學額或錄取保證。學費為扣除幼稚園教育計劃資助後的 2026/27 金額；教育用品、茶點等另計。人本教育及課程安排屬校方自述，不代表每名幼兒都取得相同學習成效。",
    reportSlug: "soka",
    replaceDirectoryDetails: true,
    sources: [
      { label: "香港創價幼稚園：幼稚園簡介及辦學宗旨", scope: "校方自述人本教育、尊重兒童個性及提供全面均衡課程的方向。", url: SOKA_ABOUT },
      { label: "香港創價幼稚園：2026/27 招生及學校資料", scope: "2026/27 K1 預計收生人數、學費、報名費、註冊費、師生比例與設施；不代表之後年度安排。", url: SOKA_ADMISSION },
      { label: "教育局《幼稚園概覽 2026/27》：香港創價幼稚園", scope: "校址 3258560001 的班制、授課語言、師生比例及核准收費；按該年度解讀。", url: KGP_SOKA },
    ],
    detailSections: [
      { title: "辦學理念與學習特色", featured: true, note: "以下方向由校方自述；公開資料沒有提供獨立學習成效評估。", details: [
        { label: "人本教育", value: "校方以人本教育為辦學宗旨，強調兒童各有個性與發展潛能，並希望營造愉快、開放、多元的學習環境。家長可在參觀時觀察老師如何讓幼兒表達選擇、興趣與想法。", sourceUrl: SOKA_ABOUT },
        { label: "課程與發展目標", value: "校方表示課程以全面、均衡及適切為方向，重視身心健康、自主性、群性、個別差異及對未來的希望。這是教育目標，不能直接當作每名幼兒的實際成效。", sourceUrl: SOKA_ABOUT },
        { label: "語言資料怎樣看", value: "《幼稚園概覽 2026/27》授課語言欄列中文（普通話）；這能確認概覽所列語言，不能據此估算普通話、粵語或英語的每日時數。若家庭重視粵語或英語環境，宜向校方索取班級日程。", period: "2026/27", sourceUrl: KGP_SOKA },
      ] },
      { title: "班制、收費與接送", note: "收生數字、課室容額與實際錄取名額不是同一概念；接送路線需按營辦商逐年確認。", details: [
        { label: "K1 預計收生", value: "校方 2026/27 資料列上午班及下午班各預計收生 90 人。這是該學年預計收生數，不等於申請人數、錄取率或下一年度學額。", period: "2026/27", sourceUrl: SOKA_ADMISSION },
        { label: "半日學費", value: "校方 2026/27 收費資料列參加幼稚園教育計劃後每期 HK$197，全年 11 期。概覽資料庫同年度將參與計劃概括標示為半日免費，與校方列出的實際應繳金額並不一致；家長應以校方當屆收費證明及註冊通知確認應繳款項。", period: "2026/27", sourceUrl: SOKA_ADMISSION },
        { label: "師生比例與校舍", value: "校方 2026/27 學校資料列師生比例 1:8、註冊課室 11 間，並設室內及戶外活動區。教育局概覽的師生比例為 1:7.1；兩來源數值不同且未交代統計口徑，故分別列明，不合併推算個別班級人數。", period: "2026/27", sourceUrl: KGP_SOKA },
        { label: "接送安排", value: "學校沒有自營校車；校方提供褓母車營辦商資料作參考，實際路線及收費由營辦商決定。跨區申請前宜先確認去程和放學後接送。", sourceUrl: SOKA_ADMISSION },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "lchhds",
    name: "獅子會何德心小學",
    nameEn: "Lions Clubs International Ho Tak Sum Primary School",
    district: "元朗區",
    address: "新界元朗天水圍三區第四期（第二小學）",
    telephone: "+852 2617 9682",
    schoolType: "資助全日制小學",
    gender: "男女校",
    schoolNet: "72 校網",
    tuition: "免學費；2026/27 家教會會費 HK$30，非標準項目核准收費 HK$300",
    language: "中文；校方另公布小一至小三校本英語課程安排",
    gradeSpan: "小一至小六",
    website: "https://www.htsps.edu.hk/tc/",
    dataYear: "家校會《小學概覽 2026》：2026/27 班級、收費及課程；校方課程頁查核 2026-10-23",
    sourceNote: "2026/27 概覽列小一核准班數 5 班；這是教育局批核班數，不是可供自行申請或派位的個人學額。校方所述初小英語課程及英語增潤安排屬公開課程設計，實際分班、參與安排和課時應向學校確認。學校沒有一條龍、直屬或聯繫中學，升中仍按相關派位制度及個人選擇處理。",
    reportSlug: "lchhds",
    appendDirectoryDetails: true,
    sources: [
      { label: "家校會《小學概覽 2026》：獅子會何德心小學", scope: "2026/27 校網、班數、教學語言、收費、評估安排、課程重點及學生支援；資料由學校提供及核實。", url: PSP_LCHHDS },
      { label: "獅子會何德心小學：獅小課程設計", scope: "校方自述七項課程方針，包括多元評估、閱讀文化、英文語境及創科教育。", url: LCHHDS_CURRICULUM },
      { label: "獅子會何德心小學官方網站", scope: "辦學使命、校訓及當屆公告入口；招生日期以當屆公告為準。", url: LCHHDS_HOME },
    ],
    detailSections: [
      { title: "辦學方向與課程特色", featured: true, note: "辦學理念與課程內容是校方自述及家校會概覽所載安排，不是獨立成效評估。", details: [
        { label: "校訓與全人教育", value: "校方以「忠、禮、勤、樸」為校訓，並以全人教育、正面價值觀、自學及創新思考作為培育方向。對家庭而言，校方把品格與學習能力並列；可在家長日了解如何落實於日常課堂和校園規範。", sourceUrl: LCHHDS_HOME },
        { label: "初小英語安排", value: "《小學概覽 2026》列小一至小三設校本英語課程（含 IB 設計元素）及初小英語拔尖計劃；校方稱設英語語境和外籍英語教師。公開資料未交代各班名額比例和實際每週課時，不應理解為所有學生都進入同一課程。", period: "2026/27", sourceUrl: PSP_LCHHDS },
        { label: "多元評估與探究", value: "概覽列數學說數及實作評估、常識專題研習與時事評論、體育技能錄影評估；校方課程頁另把數據應用、閱讀文化及 STEM 列為課程方針。家長可據此詢問孩子如何收到評估回饋，而不只看考試次數。", period: "《小學概覽 2026》", sourceUrl: PSP_LCHHDS },
        { label: "學習支援", value: "校方列有小一新生學長計劃、不同需要的功課班及學生支援組；支援方式會因學生需要而異，應直接詢問評估、轉介和家校溝通流程。", period: "《小學概覽 2026》", sourceUrl: PSP_LCHHDS },
      ] },
      { title: "入學與家庭配套", note: "班數與收費依《小學概覽 2026》所列年度理解；報名須以教育局和校方當屆公告為準。", details: [
        { label: "校網及升中關係", value: "學校屬元朗區 72 校網資助小學；概覽的直屬、一條龍及聯繫中學欄均未列相關關係。這表示沒有該類指定升中安排，不代表學生沒有升中選擇。", period: "2026/27", sourceUrl: PSP_LCHHDS },
        { label: "班級結構", value: "2026/27 小一至小六核准班數依次為 5、4、3、4、5、4 班。小一 5 班是批核數目，不可視為個人可申請學位數。", period: "2026/27", sourceUrl: PSP_LCHHDS },
        { label: "學費及附加收費", value: "學費及堂費欄列免收；家教會會費 HK$30，非標準項目核准收費 HK$300。實際項目及收取情況以學校當屆通告為準。", period: "2026/27", sourceUrl: PSP_LCHHDS },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "queens-college-secondary",
    name: "皇仁書院",
    nameEn: "Queen's College",
    district: "灣仔區",
    address: "香港銅鑼灣高士威道 120 號",
    telephone: "+852 2576 1992",
    schoolType: "官立中學",
    gender: "男校",
    religion: "不適用",
    tuition: "免學費；《中學概覽 2025/26》另列家教會、學生會及核准項目收費",
    language: "英文（中國語文、中國文學、中國歷史及普通話科除外）",
    gradeSpan: "中一至中六；中一收生參加中學學位分配辦法",
    website: "https://www.qc.edu.hk/",
    dataYear: "家校會《中學概覽 2025/26》；校方語言及收生網頁查核 2026-10-23",
    sourceNote: "授課語言與課程特色按《中學概覽 2025/26》及校方現行公開頁面分別標示；學校資料中的中一收生方法為中學學位分配辦法，具體自行分配及統一派位細節須看當屆教育局和校方公告。免學費不等於沒有其他校內費用；本文列出的附加收費只對應 2025/26 概覽年度。",
    reportSlug: "queens-college-secondary",
    replaceDirectoryDetails: true,
    sources: [
      { label: "家校會《中學概覽 2025/26》：皇仁書院", scope: "學校自述的辦學宗旨、教學語言、課程與教學策略、班級及 2025/26 收費資料。", url: SSP_QUEENS },
      { label: "皇仁書院：使命宣言", scope: "校方公開的全人發展及學生領導才能培育方向。", url: QUEENS_MISSION },
      { label: "皇仁書院：教學語言及收生制度", scope: "校方目前列明的授課語言例外科目及中一收生制度。", url: QUEENS_LANGUAGE },
    ],
    detailSections: [
      { title: "辦學方向與學習特色", featured: true, note: "課程及教學描述來自學校提供的《中學概覽》或校方網頁；不構成獨立排名或成績保證。", details: [
        { label: "全人發展與領導培育", value: "校方使命涵蓋德、智、體、人際及美育發展，並希望學生在獨立思考與創意中成長為未來領袖。這說明學校的教育取向；家長仍應比較孩子對全英文學習、校園節奏和活動投入的適應度。", sourceUrl: QUEENS_MISSION },
        { label: "英語授課環境", value: "校方列英文為授課語言，例外科目包括中國語文、中國文學、中國歷史及普通話。對學生而言，適應不只看英文科成績，也涉及以英文閱讀題目、表達學科推理及完成跨科任務。", sourceUrl: QUEENS_LANGUAGE },
        { label: "自主學習與探究", value: "《中學概覽 2025/26》描述以提問和回饋培養高階思維，配合電子學習、自學工具、閱讀和跨課程專題；初中課程亦列校本數學資優課程及加入 STEAM 的「創意科學」。活動是否適合個別學生，需再看年級要求與實際參與方式。", period: "2025/26", sourceUrl: SSP_QUEENS },
      ] },
      { title: "課程與入學資料", note: "年度班數與當屆收生辦法不可互相替代；入學安排按學年更新。", details: [
        { label: "課程選擇", value: "《中學概覽 2025/26》列高中以 3X 選修為主，能力較佳學生可選修音樂或視覺藝術作第四個選修科；選科須按校方安排及學生能力確認。", period: "2025/26", sourceUrl: SSP_QUEENS },
        { label: "中一收生", value: "校方現行頁面列中一透過中學學位分配辦法收生；自行分配學位名額、申請評核及統一派位流程須按當屆公告核實。", sourceUrl: QUEENS_LANGUAGE },
        { label: "學費與其他費用", value: "《中學概覽 2025/26》列中一至中六免學費；另列家教會年費 HK$100、學生會費 HK$20–50，以及核准學校管理項目費 HK$150。下一學年金額可能調整。", period: "2025/26", sourceUrl: SSP_QUEENS },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "spk",
    name: "聖保祿幼稚園",
    nameEn: "St. Paul's Kindergarten",
    district: "灣仔區",
    address: "香港銅鑼灣禮頓道 1018 地段地下至二樓",
    telephone: "+852 2576 3793",
    schoolNumber: "214612 / 校址 0001",
    registrationStatus: "註冊",
    schoolType: "非牟利私立幼稚園",
    gender: "男女校",
    religion: "天主教",
    tuition: "《幼稚園概覽 2026/27》列 HK$34,050/年，分 10 期；用品等另計",
    language: "校方公開資料未列出每日各語言課時比例",
    gradeSpan: "K1–K3；2026/27 概覽列上午及下午班，沒有 PN 或全日班",
    website: "https://www.spk.edu.hk/",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽 2026/27》；校方 2027/28 K1 招生資料查核 2026-10-23",
    sourceNote: "本頁只指教育局學校編號 214612、校址 0001 的聖保祿幼稚園（禮頓道 1018 地段）。《幼稚園概覽 2026/27》列上午、下午班，不設 PN 及全日班；禮頓道 140A 的聖保祿幼兒園是另一所學校，教育局編號 563188，其 PN、全日制、師生比例及收費不應套用至本校。2027/28 K1 申請資料所列日期已過，下一年度須等校方新公告。",
    reportSlug: "spk",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《灣仔區學校名單》：聖保祿幼稚園", scope: "學校編號 214612、校址 0001、地址、類別、電話、授課時段及學校網址；名錄日期 2026-09-30。", url: SPK_REGISTRY },
      { label: "聖保祿幼稚園：學校宗旨", scope: "校方自述的「愛」的教育及德、智、體、群、美、靈全人發展方向。", url: SPK_PROFILE },
      { label: "教育局《幼稚園概覽 2026/27》：聖保祿幼稚園", scope: "校址 214612/0001 的班制、學費、師生比例、兒童人數與校方自述課程資料；不與校號 563188 的聖保祿幼兒園混用。", url: KGP_SPK },
      { label: "聖保祿幼稚園：2027/28 招生簡章", scope: "該年度 K1 網上申請程序、報名費、文件及申請期間；該期間已於 2026-10-04 截止。", url: SPK_ADMISSION },
      { label: "教育局：聖保祿幼兒園（校號 563188）", scope: "確認禮頓道 140A 登記為另一所全日制幼兒園，並非本頁幼稚園的第二校址。", url: SPN_EDB },
    ],
    detailSections: [
      { title: "校方理念與家長閱讀", featured: true, note: "理念是校方自述；它描述教育目標，不能代替對日常課堂和孩子適配度的了解。", details: [
        { label: "以愛為核心的全人教育", value: "校方以聖保祿「為一切人成為一切」的精神推動愛的教育，目標涵蓋德、智、體、群、美、靈，並希望培養自信、有禮、關心他人、喜歡學習和具創意的幼兒。家長可在參觀時觀察這些目標如何落實在師生互動、生活常規和活動中。", sourceUrl: SPK_PROFILE },
        { label: "校址與相近校名辨識", value: "本校是教育局編號 214612、禮頓道 1018 地段的聖保祿幼稚園。禮頓道 140A 的聖保祿幼兒園編號為 563188，是另一所獨立登記學校；不能把該校全日班、PN 或收費當成本校安排。", period: "教育局名錄截至 2026-09-30", sourceUrl: SPK_REGISTRY },
      ] },
      { title: "K1 申請安排", note: "以下只描述已公布的 2027/28 年度申請規則；日期已過，不代表下一年度安排。", details: [
        { label: "申請方式與費用", value: "校方 2027/28 招生簡章規定只接受網上申請，報名費 HK$40，須先繳費並上載收據；同一幼兒只可提交一份申請，已繳報名費不設退款。這些規則可協助家長備件，但下一年度應以新簡章為準。", period: "2027/28（申請期已於 2026-10-04 截止）", sourceUrl: SPK_ADMISSION },
        { label: "文件與溝通", value: "簡章列幼兒近照、出生證明／身份證明文件及報名費收據；洗禮證明屬「如有」文件。家長應留意申請確認電郵並按校方指引更正資料，不要重複遞交申請。", period: "2027/28", sourceUrl: SPK_ADMISSION },
        { label: "招生資訊的限制", value: "已查到校方公布申請步驟，未把面見形式、錄取比率或直升安排寫成已確認條件；有關資料應直接向學校查詢。", sourceUrl: SPK_ADMISSION },
      ] },
      { title: "班制、學費與師生比例", note: "以下數字按校號 214612、校址 0001 的《幼稚園概覽 2026/27》列示；不包含校號 563188 的另一所幼兒園。", details: [
        { label: "班制與 PN", value: "2026/27 概覽列上午、下午 K1–K3 班，沒有 2–3 歲 PN 班，也沒有全日班。網上其他相近校名資料若顯示全日或 PN，應先核對校號是否為 563188。", period: "2026/27", sourceUrl: KGP_SPK },
        { label: "全年學費", value: "2026/27 上午及下午班各級全年學費均為 HK$34,050，分 10 期；校服、書包和其他用品的 2025/26 資料未公開，家長應以校方最新清單計算總支出。", period: "2026/27", sourceUrl: KGP_SPK },
        { label: "師生比例", value: "概覽按 2025 年 9 月資料列上午及下午時段均為 1:9.0，並註明比例不包括 2–3 歲班；這是全校時段統計，不等於每班固定人數。", period: "2025 年 9 月統計", sourceUrl: KGP_SPK },
        { label: "語言資料", value: "學校公開資料未列出中文、英文在每日課程中的時數比例。家庭如重視某一語言環境，宜向校方索取各級課程表，不從未能核實的語言標籤推算實際授課比重。", sourceUrl: SPK_PROFILE },
      ] },
    ],
  },
  {
    stage: "primary",
    slug: "hkcwcyw",
    name: "香港中國婦女會丘佐榮學校",
    nameEn: "The H.K.C.W.C. Hioe Tjo Yoeng Primary School",
    district: "東區",
    address: "香港筲箕灣西灣河街 61 號",
    telephone: "+852 2560 2051",
    schoolNumber: "514497 / 校址 0001",
    registrationStatus: "註冊",
    schoolType: "資助全日制小學",
    gender: "男女校",
    schoolNet: "16 校網",
    tuition: "免學費；2026/27 家教會會費 HK$80，非標準項目核准收費 HK$350",
    language: "中文；《小學概覽 2026》列二至六年級每級兩班以普通話教授中文",
    gradeSpan: "小一至小六；2026/27 核准小一 4 班，其餘級別各 5 班",
    website: "https://www.hkcwc-htyps.edu.hk/",
    dataYear: "家校會《小學概覽 2026》；校方課程及生命教育頁查核 2026-10-23；教師資料為 2025/26 學年",
    sourceNote: "2026/27 小一核准班數為教育局批核班級數，不等於個人可申請學額或實際收生人數。普通話教中文只見於二至六年級每級兩班；校方沒有說明學生如何編班，家庭宜直接查詢。學校沒有一條龍、直屬或聯繫中學；升中仍須自行規劃。",
    reportSlug: "hkcwcyw",
    replaceDirectoryDetails: true,
    sources: [
      { label: "家校會《小學概覽 2026》：香港中國婦女會丘佐榮學校", scope: "校網、教學語言、費用、班數、教師、校車、課程與支援資料；資料由學校提供及核實。", url: PSP_HTY },
      { label: "香港中國婦女會丘佐榮學校：課程特色", scope: "校方自述普通話中文班、英語閱讀與寫作、數學應用題、STEM 和自主學習安排。", url: HTY_CURRICULUM },
      { label: "香港中國婦女會丘佐榮學校：生命教育", scope: "校方自述以關愛及六項核心生命素質為主軸的校本課程。", url: HTY_LIFE_EDUCATION },
      { label: "香港中國婦女會丘佐榮學校：數字教育", scope: "校方自述數字工具如何支援教學、家校溝通與行政。", url: HTY_DIGITAL_EDUCATION },
    ],
    detailSections: [
      { title: "辦學方向與學習特色", featured: true, note: "課程安排以《小學概覽 2026》及校方公開頁為據；校方自述不等於獨立成效評估。", details: [
        { label: "中文教學語言有分班安排", value: "《小學概覽 2026》列二至六年級每級兩班以普通話教授中文；其餘班別的具體安排及編班方法未在該欄交代。若家庭重視粵語或普通話使用，宜查詢孩子入讀年級的實際安排，而不要把「每級兩班」理解成全級普通話教學。", period: "2026/27", sourceUrl: PSP_HTY },
        { label: "中英數課程設計", value: "校方課程頁列二至六年級部分班別以普通話教中文、三至六年級 ELTA 英語課程、英文閱讀與寫作，以及數學應用題解題策略；另加入 STEM、電子學習與高階思維。各項安排按年級及班別而異，家長可具體查問小一英語與數學課堂如何分組。", sourceUrl: HTY_CURRICULUM },
        { label: "生命教育與校園價值", value: "校本生命教育以「關愛」為軸心，並按級別培養關愛、堅毅、盡責、自律和自信等素質。這讓家庭能進一步了解學校如何處理品格與成長教育；實際體驗仍取決於課堂、活動和個別學生需要。", sourceUrl: HTY_LIFE_EDUCATION },
        { label: "數字學習", value: "校方描述以學習數據和數碼工具支援課程調整及學生參與。這是學校公開的數字教育方向；家長若關心螢幕使用或學生資料如何運用，可向校方了解不同年級的平台、課時與家長查閱方式。", sourceUrl: HTY_DIGITAL_EDUCATION },
      ] },
      { title: "班數、支援與升中", note: "班數與校網用於理解制度背景，不應解讀成個人錄取或升中保證。", details: [
        { label: "小一核准班數", value: "《小學概覽 2026》列 2026/27 學年小一核准 4 班，二至六年級各 5 班。班數是教育局批核資料，並非小一申請名額，也不能單獨推算競爭程度。", period: "2026/27", sourceUrl: PSP_HTY },
        { label: "學習支援與校園生活", value: "概覽列課後輔導、英語拔尖、社交訓練、校本言語治療及教育心理服務；亦列校車服務。實際支援對象和名額須按學生需要及學校安排確認。", period: "《小學概覽 2026》", sourceUrl: PSP_HTY },
        { label: "升中銜接", value: "概覽沒有列一條龍、直屬或聯繫中學。家庭若以特定中學為目標，應及早了解自行分配、統一派位和校內升中支援，不應把校訓或辦學團體關係當作保留學位。", sourceUrl: PSP_HTY },
        { label: "2026/27 費用", value: "學校為資助小學，概覽列免學費；另列家教會會費 HK$80、非標準項目核准收費 HK$350。這兩項不涵蓋個別家庭的交通、活動或自選支出。", period: "2026/27", sourceUrl: PSP_HTY },
      ] },
    ],
  },
  {
    stage: "secondary",
    slug: "heep-yunn-secondary",
    name: "協恩中學",
    nameEn: "Heep Yunn School",
    district: "九龍城區",
    address: "九龍農圃道 1 號",
    telephone: "+852 2711 0862",
    schoolNumber: "511935 / 校址 0001",
    registrationStatus: "註冊",
    schoolType: "直資全日制中學",
    gender: "女校",
    religion: "基督教（聖公會）",
    tuition: "《中學概覽 2025/26》列各級 HK$43,748/年；2026/27 及 IAL 收費須向校方核實",
    language: "英語為主；中、史、普通話、家庭與生活教育、服務學習及外語等按科目安排（參照 2025/26 概覽）",
    gradeSpan: "中一至中六；2026/27 起高中設 HKDSE 與 IAL 兩條課程路徑",
    website: "https://www.hys.edu.hk/",
    dataYear: "家校會《中學概覽 2025/26》；校方現行課程及收生頁查核 2026-10-23",
    sourceNote: "2025/26 概覽列學費 HK$43,748/年及每級 5 班；不能當作 2026/27 或 IAL 路徑的現行收費。校方資料稱 2026/27 起於中五開辦 IAL 國際課程，並逐步延伸至中六；課程路徑、銜接要求和費用須按學生年級向校方確認。中一招生不參加教育局統一派位，須按校方當屆直接申請程序辦理。",
    reportSlug: "heep-yunn-secondary",
    replaceDirectoryDetails: true,
    sources: [
      { label: "家校會《中學概覽 2025/26》：協恩中學", scope: "學校類別、性別、宗教、2025/26 班數與學費、語言、課程和支援資料。", url: SSP_HEEP_YUNN },
      { label: "協恩中學：校史與辦學方向", scope: "校方自述學校歷史、聖公會背景、校訓及全人教育使命。", url: HYS_ABOUT },
      { label: "協恩中學：課程", scope: "校方現行 HKDSE/IAL 課程、初中及高中科目安排；IAL 於 2026/27 起開辦。", url: HYS_CURRICULUM },
      { label: "協恩中學：中一收生", scope: "校方現行直接申請制度及不參加中學學位分配統一派位的安排；申請日期按年度更新。", url: HYS_ADMISSION },
    ],
    detailSections: [
      { title: "學校定位與課程路徑", featured: true, note: "辦學使命屬校方自述；課程路徑和費用要按學生所屬年級及年度確認。", details: [
        { label: "基督教全人教育與服務", value: "校方以基督教教育、品格培育、群體精神和服務社會描述辦學方向，校訓為「In strength and grace we stand united; In faith and love we are committed」。這種定位適合重視基督教價值與服務教育的家庭；家長仍應了解校內宗教生活和活動投入是否適合孩子。", sourceUrl: HYS_ABOUT },
        { label: "高中有 HKDSE 與 IAL 選擇", value: "校方公布 2026/27 起於中五開辦 IAL 國際課程，並逐步延伸至中六；課程包括數學、生物、化學和經濟等，校方同時保留 HKDSE 路徑。IAL 不是所有學生自動修讀，家庭需了解銜接條件、科目組合、評核和相關費用。", period: "2026/27 起", sourceUrl: HYS_CURRICULUM },
        { label: "初中校本學習", value: "初中課程涵蓋八個學習領域，校方另設家庭與生活教育、科學與科技等校本科目；高中亦有服務學習。選修法文、日文、西班牙文或韓文的安排可能由校外機構提供並另行收費，應查當屆課表及費用。", sourceUrl: HYS_CURRICULUM },
        { label: "授課語言", value: "《中學概覽 2025/26》以英文授課為主，並逐項列出以中文授課的科目，例如中國語文、中國歷史、普通話及家庭生活教育；高中另有服務學習等安排。家長宜按孩子年級查閱科目表，不把「英文為主」理解成每堂皆以英文授課。", period: "2025/26", sourceUrl: SSP_HEEP_YUNN },
      ] },
      { title: "入學、費用與家庭準備", note: "入學與收費均按年度更新；目前頁面不把已過期日期當作未來申請指引。", details: [
        { label: "中一直接申請", value: "校方明確表示不參加教育局中學學位分配統一派位，並接受全港申請；中一申請須依校方自行公布的表格、文件和評核安排。這意味着家庭需自行跟進申請和後續註冊，不能只等待統一派位結果。", sourceUrl: HYS_ADMISSION },
        { label: "費用與減免", value: "家校會《中學概覽 2025/26》列各級年費 HK$43,748，屬該年度資料；校方設學費全免或四分之三、二分之一、四分之一減免。2026/27 及 IAL 課程的實際收費、減免資格和申請期限，須向校方核實。", period: "2025/26 概覽；減免以校方當屆規則為準", sourceUrl: SSP_HEEP_YUNN },
        { label: "年度班數", value: "《中學概覽 2025/26》列中一至中六各 5 班。這是班級結構資料，不是自行招生名額或錄取機會。", period: "2025/26", sourceUrl: SSP_HEEP_YUNN },
        { label: "家庭可先核實的三件事", value: "若以中一申請為目標，先向校方核實當屆申請時間與評核內容；若考慮未來走 IAL，了解進入中四銜接班及中五選科條件；若預算敏感，將年費、校外語言課和學費減免資格分開計算。", sourceUrl: HYS_ADMISSION },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "international-college-hong-kong-hong-lok-yuen-kindergarten-section-230944",
    name: "International College Hong Kong Hong Lok Yuen Kindergarten Section",
    nameEn: "International College Hong Kong Hong Lok Yuen (Kindergarten Section)",
    district: "大埔區",
    address: "新界大埔康樂園二十街 3 號",
    telephone: "+852 3955 3000",
    schoolNumber: "230944 / 校址 0001",
    schoolType: "國際學校幼稚園部",
    gender: "男女校",
    tuition: "2026/27 全日 Nursery 學費 HK$152,400；另有年度資本徵費 HK$20,500 及申請／面見費",
    language: "校方稱英語為主要授課語言，另設每日普通話；未公布兩者每日課時比例",
    gradeSpan: "校方列 Pre-Nursery、Nursery、Reception 及小學 Year 1–6；各級按出生年份及年度收生指引核對",
    website: "https://ichkhly.edu.hk/",
    dataYear: "教育局學校位置及註冊資料：2026-09 至 2026-10；《幼稚園概覽》2026/27；校方費用及課程：2026/27",
    sourceNote: "本頁只指教育局學校編號 230944、校址 0001 的 Hong Lok Yuen 幼稚園部。教育局《學校位置及資料》與校方現行地址列康樂園二十街 3 號；《學校基本註冊資料》曾列 5 號，兩份來源不一致，前往前宜向校方確認正門及接送點。校方的年級稱為 Pre-Nursery、Nursery、Reception，與本地 K1–K3 並非可直接等同的班級命名。《幼稚園概覽》列上午、下午及全日班、師生比例 1:7；校方另公布 2026/27 Pre-Nursery 至小學的年級及收費。年度資本徵費、申請費、面見費與學費須分開計算；英文及普通話的語言活動不代表固定課時比例。",
    replaceDirectoryDetails: true,
    omitDirectoryDetailTitles: ["聯絡與授課資料"],
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "本校址的班制、授課語言、師生比例及幼稚園類別；概覽未列核准學費。", url: KGP_ICHKHLY },
      { label: "ICHK HLY Kindergarten：課程與教學", scope: "校方自述 PYP、遊戲學習、每日普通話、專科音樂／視藝及戶外學習。", url: ICHK_KG },
      { label: "ICHK HLY：2026/27 Dates, Fees & More", scope: "Pre-Nursery 至 Nursery 的年級年齡指引、學費和 Association Charges；費用按 2026/27 公布。", url: ICHK_FEES },
      { label: "教育局《學校位置及資料》", scope: "校號及校址 0001 的地址；名錄截至 2026-09-30，列二十街 3 號。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "教育局《學校基本註冊資料》", scope: "每日更新的非政府學校登記資料；2026-10-23下載版本列二十街 5 號，與位置資料和校方現行地址不一致。", url: EDB_BASIC_REGISTER },
    ],
    detailSections: [
      { title: "課程理念與孩子的學習方式", featured: true, note: "以下課程描述來自校方；屬學校公開的設計方向，不代表每名孩子的學習成效。", details: [
        { label: "IB PYP 與延展課程", value: "校方稱以 IB 小學項目（PYP）發展延展式課程，從孩子的興趣、熱情與能力設定學習目標，並培養思考、社交、溝通、自我管理和研究能力。", sourceUrl: ICHK_KG },
        { label: "遊戲是主要學習方式", value: "課程把兒童主導與成人支援的遊戲經驗並置，也安排直接教學與技能練習。家長參觀時可觀察老師如何在自由探索與明確指導之間切換。", sourceUrl: ICHK_KG },
        { label: "語言與創藝", value: "校方稱孩子每日透過故事、歌曲和遊戲接觸普通話，並有專科音樂與視覺藝術課。學校沒有在此頁公布每日各語言課時，不能把「每日接觸」理解成普通話主教。", sourceUrl: ICHK_KG },
        { label: "戶外學習", value: "學校把戶外教育列為辦學重點，稱會定期安排戶外學習，並透過教室材料、色彩與生物連結自然及可持續生活。", sourceUrl: ICHK_KG },
      ] },
      { title: "班制、收費與家長核對", note: "國際學校 Pre-Nursery／Nursery 名稱與本地 K1–K3 不作直接換算；費用以校方 2026/27 頁面為準。", details: [
        { label: "教育局登記地址存在差異", value: "位置資料與校方現行地址均列二十街 3 號；2026-10-23下載的基本註冊資料列 5 號。頁面地址按位置資料及校方地址呈列；前往前請向校方確認入口及接送點。", period: "教育局資料查核：2026-10-23", sourceUrl: EDB_BASIC_REGISTER },
        { label: "概覽班制與師生比例", value: "《幼稚園概覽 2026/27》按校址 0001 列上午、下午、全日班；師生比例為 1:7。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_ICHKHLY },
        { label: "Pre-Nursery 與 Nursery 年齡", value: "校方 2026/27 年齡表把 Pre-Nursery 對應 2024 年出生、Nursery 對應 2023 年出生；校方說明香港學生可由 2 歲 8 個月起申請 Pre-Nursery。每屆生日界線和學位安排仍以招生頁為準。", period: "2026/27", sourceUrl: ICHK_FEES },
        { label: "學費與額外費用", value: "校方公布 2026/27 全日 Nursery 學費 HK$152,400，另列年度資本徵費 HK$20,500、申請費 HK$1,850、面見費 HK$800，以及一次性資本徵費 HK$75,000。各項收費性質不同，應按實際錄取級別及付款階段計算。", period: "2026/27", sourceUrl: ICHK_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "po-leung-kuk-eleanor-kwok-law-kwai-chun-kindergarten-605735",
    name: "保良局郭羅桂珍幼稚園",
    nameEn: "Po Leung Kuk Eleanor Kwok Law Kwai Chun Kindergarten",
    district: "元朗區",
    address: "新界元朗洪福邨第五座洪塱樓地下",
    telephone: "+852 2466 7666",
    schoolNumber: "605735 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日班費用須按校方當屆書面收費核對",
    language: "《概覽》列粵語；校方另公布非華語學生支援，不據此推算英語或普通話課時",
    gradeSpan: "K1–K3；《概覽》列上午及下午，校方 2026/27 招生文件另列全日班，班制資料需向校方確認",
    website: "https://www.plkkgs.edu.hk/plkeklkckg/hk",
    dataYear: "《幼稚園概覽》2026/27；校方 2026/27 招生文件及現行校本課程頁查核 2026-10-23",
    sourceNote: "本頁以教育局學校編號 605735、校址 0001 配對。來源對班制列法不完全一致：《幼稚園概覽 2026/27》按校址列上午及下午班，校方 2026/27 新生申請須知則列上午、下午及全日班；申請前應向校方確認當屆實際開班與全日班收費。免費指參加幼稚園教育計劃後的半日班學費，不代表校服、書簿、茶點或其他家庭支出全免。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：郭羅桂珍幼稚園", scope: "校址 0001 的上午／下午班、粵語、師生比例及半日班學費資料。", url: KGP_PLK_EKLKC },
      { label: "校方：校本課程", scope: "遊戲、小組教學、方案教學、自主與合作學習、自理及德育安排。", url: PLK_EKLKC_CURRICULUM },
      { label: "校方：2026/27 新生入學申請須知", scope: "校方文件列出的 K1–K3 班制與申請安排；與概覽班制欄有差異，須向校方確認。", url: "https://www.plkkgs.edu.hk/plkeklkckg/api/cms/pdf/download/1607" },
      { label: "保良局屬下幼稚園：正向教育計劃", scope: "辦學團體公布的正向教育框架；屬保良局屬校計劃，不等同郭羅桂珍校址的個別成效評估。", url: PLK_POSED },
    ],
    detailSections: [
      { title: "校本課程與學習經驗", featured: true, note: "課程特色按校方公開介紹；家長可參觀時了解不同年級實際使用比例。", details: [
        { label: "遊戲與小組教學", value: "校方以《幼稚園教育課程指引》為藍本，說明以遊戲作教學策略主軸，日常採小組教學。這意味着家長可具體詢問孩子一天有多少自主遊戲、小組活動與教師示範。", sourceUrl: PLK_EKLKC_CURRICULUM },
        { label: "方案、自主與合作學習", value: "校方稱會按幼兒興趣和能力加入方案教學，並推動自主及合作學習，以延伸主題經驗；這是校本課程設計，不是固定每週專題時數的承諾。", sourceUrl: PLK_EKLKC_CURRICULUM },
        { label: "生活常規與品德", value: "課程介紹列自理能力與德育培養，目標是協助幼兒建立習慣和價值觀。家長可留意學校怎樣在進餐、整理物品和同伴衝突中落實。", sourceUrl: PLK_EKLKC_CURRICULUM },
        { label: "團體正向教育", value: "保良局屬下幼稚園公布以成長型思維、性格強項、正向情緒、健康、關係和意義為主題推動正向教育；屬辦學團體框架，學校層面的做法需向本園確認。", sourceUrl: PLK_POSED },
      ] },
      { title: "班制與費用核對", details: [
        { label: "概覽資料", value: "《幼稚園概覽 2026/27》列上午、下午班，粵語授課，師生比例 1:9.7；半日班扣除政府資助後列免費。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_PLK_EKLKC },
        { label: "全日班安排有來源差異", value: "校方 2026/27 招生須知列上午 9:00–12:00、下午 13:30–16:30、全日 9:00–16:30；《概覽》同年度資料只列上午及下午。家長應確認全日班是否為當屆常設班及其核准收費。", period: "2026/27", sourceUrl: "https://www.plkkgs.edu.hk/plkeklkckg/api/cms/pdf/download/1607" },
        { label: "非華語學生支援", value: "學校資訊目錄列有非華語學童支援服務；可向校方詢問面見傳譯、入學後中文支援及個別學生適用方式。", sourceUrl: PLK_EKLKC_INFO },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "christian-and-missionary-alliance-tai-o-kindergarten-155233",
    name: "基督教宣道會大澳幼稚園",
    nameEn: "Christian & Missionary Alliance Tai O Kindergarten",
    district: "離島區",
    address: "教育局名錄列大嶼山大澳永安街 81 號課室 B；《幼稚園概覽》另列 81、83A 及 83B 號",
    telephone: "+852 2985 6202",
    schoolNumber: "155233 / 校址 0002",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日班費用另向校方確認",
    language: "《概覽》列粵語；校方另有英語及普通話活動，未公布各語言課時比例",
    gradeSpan: "K1–K3；《概覽》列上午及全日班，PN 資料未列",
    website: "http://www.cmataiokg.com",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；校方課程資料查核 2026-10-23",
    sourceNote: "教育局位置資料以課室 B、永安街 81 號描述校址；《幼稚園概覽 2026/27》對應校址 0002，另列 81、83A、83B 號。保留兩個官方來源各自的地址口徑，家長需確認子女實際上課入口和所在課室。概覽列上午及全日班、粵語及半日免費；校方另列英語、普通話等活動，不能據此推算語言主次或每日課時。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：大澳幼稚園校址 0002", scope: "概覽所列地址、班制、粵語、師生比例及半日班學費。", url: KGP_TAI_O },
      { label: "基督教宣道會大澳幼稚園：課程特色", scope: "校方頁面列繪本、遊戲、樂高、英語和普通話活動，以及宗教與德育活動。", url: TAI_O_HOME },
      { label: "教育局《學校位置及資料》", scope: "教育局登記地址為課室 B、永安街 81 號；與概覽地址逐項保留，不合併為同一門牌描述。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
    ],
    detailSections: [
      { title: "課程與社區學習", featured: true, note: "以下特色來自校方公開課程介紹，活動是否每名幼兒參加及每年安排需向校方確認。", details: [
        { label: "繪本與遊戲", value: "校方把繪本教學和遊戲活動列為課程特色，讓故事、語言和遊戲經驗連在一起。家長可詢問不同年級的繪本閱讀、自由遊戲和教師帶領活動如何分配。", sourceUrl: TAI_O_HOME },
        { label: "英語、普通話與粵語", value: "學校網站列英語及普通話活動；教育局《概覽》列授課語言為粵語。這兩種資料談的是不同層次，沒有公開課時比例，不能只憑活動名稱判斷哪種語言佔主導。", sourceUrl: KGP_TAI_O },
        { label: "宗教與品德教育", value: "校方將宗教及德育活動列入課程特色；對重視基督教教育的家庭，建議進一步了解每週活動、家庭參與和節慶安排。", sourceUrl: TAI_O_HOME },
        { label: "樂高課程", value: "校方網站列有樂高課程；公開頁沒有說明各級內容、授課頻率或是否全體幼兒參與，需按當屆安排查詢。", sourceUrl: TAI_O_HOME },
      ] },
      { title: "班制與校址核對", details: [
        { label: "班制與師生比例", value: "《幼稚園概覽 2026/27》列上午及全日班；比例為 1:6，這是學校時段統計，不等於每班固定人數。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_TAI_O },
        { label: "PN 與招生學額", value: "概覽未列 PN 資料，也沒有在本輪可配對資料中確認 K1 招生名額；不把在讀人數、課室或概覽班制當作空缺數。", period: "2026/27", sourceUrl: KGP_TAI_O },
        { label: "校址門牌差異", value: "教育局位置名錄記「永安街 81 號課室 B」；《概覽》列「永安街 81、83A、83B 號」。看校或報名時宜向學校確認實際入口、上課位置和全日班安排。", period: "教育局位置資料截至 2026-09-30；概覽 2026/27", sourceUrl: TAI_O_HOME },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "assembly-of-god-union-church-kindergarten-543861",
    name: "基督教神召會合一堂幼稚園",
    nameEn: "Assembly of God Union Church Kindergarten",
    district: "沙田區",
    address: "新界沙田愉翠苑二期停車場及服務設施大樓一樓",
    telephone: "+852 2278 0022",
    schoolNumber: "543861 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；教材、茶點等另計",
    language: "《概覽》列粵語；媒體訪問提及英語及普通話教材，未有各語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午及下午班",
    website: "https://www.aoguck.edu.hk/zh",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；媒體訪問 2024 年",
    sourceNote: "本頁的學校身份、班制、學費和師生比例按教育局校號 543861、校址 0001 配對。校方網站本輪受存取限制，課程特色採用 2024 年《OURS》媒體訪問，並明確標為媒體報道而非教育局評核；2025/26 校方課本清單只證明曾有英文、普通話和聖經教材，不代表現年教時。費用按《幼稚園概覽 2026/27》半日班免費列示，不包括其他代辦費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：合一堂幼稚園", scope: "校址 0001 的班制、粵語、師生比例、核准學費和課程資料。", url: KGP_AOGUC },
      { label: "《OURS》訪問：合一堂幼稚園的多元教學（2024）", scope: "訪問描述探究活動、高廣度教學及自由遊戲；屬媒體轉述，不作獨立成效認證。", url: AOGUC_MEDIA },
      { label: "學校官方網站", scope: "學校官方入口；本次爬取受限，頁面內容需家長直接核對。", url: AOGUC_HOME },
      { label: "校方 2025/26 上學期書簿與代辦費通告", scope: "該年度 K1 教材、代辦項目和收費；不外推至 2026/27。", url: "https://www.aoguck.edu.hk/wp-content/uploads/2025/10/2025-2026%E5%B9%B4%E5%BA%A6%E4%B8%8A%E5%AD%B8%E6%9C%9F%E6%9B%B8%E7%B0%BF%E5%8F%8A%E5%85%B6%E4%BB%96%E4%BB%A3%E8%BE%A6%E8%B2%BB-%E5%B9%BC%E5%85%92%E7%8F%AD.pdf" },
    ],
    detailSections: [
      { title: "學習方式與家庭觀察", featured: true, note: "本校課程描述取自 2024 年媒體訪問；不是校方現行課程表，也不證明每個班的實施頻率。", details: [
        { label: "探究與自主學習", value: "2024 年媒體訪問報道校方按照幼兒發展階段和興趣設計課程，使用探究活動引導孩子思考、討論並從親身探索建立新經驗。家長可在校園參觀時查看孩子是否有實際操作與表達機會。", period: "2024 年媒體訪問", sourceUrl: AOGUC_MEDIA },
        { label: "自由遊戲與多元教學", value: "該訪問亦提及高廣度教學及自由遊戲。資料沒有交代每日時數、分級安排或個別班級做法，宜向校方查問幼兒自由選擇活動的空間。", period: "2024 年媒體訪問", sourceUrl: AOGUC_MEDIA },
        { label: "語言教材的證據範圍", value: "2025/26 K1 代辦清單列生活學習、英文、普通話和聖經教材；教材清單只能證明相關教材存在，不能用來推算粵語、普通話或英語授課比例。", period: "2025/26", sourceUrl: "https://www.aoguck.edu.hk/wp-content/uploads/2025/10/2025-2026%E5%B9%B4%E5%BA%A6%E4%B8%8A%E5%AD%B8%E6%9C%9F%E6%9B%B8%E7%B0%BF%E5%8F%8A%E5%85%B6%E4%BB%96%E4%BB%A3%E8%BE%A6%E8%B2%BB-%E5%B9%BC%E5%85%92%E7%8F%AD.pdf" },
      ] },
      { title: "班制與費用底數", details: [
        { label: "班制與比例", value: "《幼稚園概覽 2026/27》列上午及下午班，師生比例 1:9.5；概覽未列 PN。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_AOGUC },
        { label: "學費與其他支出", value: "概覽列參加幼稚園教育計劃的半日班扣資助後免費；2025/26 K1 通告曾列書簿、校本練習、茶點及其他代辦項目，當屆金額應重新查校方通告。", period: "學費 2026/27；代辦清單 2025/26", sourceUrl: KGP_AOGUC },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "st-james-catholic-kindergarten-325708",
    name: "天主教聖雅各伯幼稚園",
    nameEn: "St. James Catholic Kindergarten",
    district: "觀塘區",
    address: "九龍觀塘嘉榮街 8 號天主教聖雅各伯堂地下部分及 1 樓",
    telephone: "+852 2348 9344",
    schoolNumber: "325708 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "天主教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日班及其他費用以校方當屆表列為準",
    language: "《概覽》列粵語；校方稱有英語及普通話小組活動，未公布各語言課時比例",
    gradeSpan: "K1–K3；《概覽 2026/27》列上午、下午及全日，校方簡介頁列上午及全日",
    website: "http://www.sjck.edu.hk",
    dataYear: "《幼稚園概覽》2026/27；校方辦學及課程頁查核 2026-10-23；質素評核頁所述為 2022 年",
    sourceNote: "本頁按教育局校號 325708、校址 0001 配對。班制來源有差異：《幼稚園概覽 2026/27》列上午、下午及全日班；校方簡介頁列上午及全日班，未標明更新年度。家長應核實當屆是否開下午班及全日班費用。校方頁面引用的學前機構質素評核結果為 2022 年資料，不當作 2026/27 新評核。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：聖雅各伯幼稚園", scope: "校址 0001 的班制、授課語言、師生比例和學費。", url: KGP_STJAMES },
      { label: "天主教聖雅各伯幼稚園：學校簡介與課程特色", scope: "校方自述基督宗教全人教育、自主學習、英語／普通話小組、繪本教學及 2022 年質素評核內容。", url: STJAMES_ABOUT },
    ],
    detailSections: [
      { title: "辦學方向與孩子的日常", featured: true, note: "宗教教育和學習特色屬校方自述；引用的質素評核摘要有明確年份。", details: [
        { label: "天主教全人教育", value: "校方以基督精神全人教育為辦學方向，校訓為「忠、勇、仁、愛」，並把責任、關愛家人和尊重他人融入品德教育。重視宗教教育的家庭，可參觀了解禮儀和宗教活動在日常中的比重。", sourceUrl: STJAMES_ABOUT },
        { label: "自主學習與學習區", value: "校方稱幼兒可在多元學習區自選活動，透過小組研習與互動體驗發展自主學習；家長可詢問教師如何觀察孩子選擇及何時介入引導。", sourceUrl: STJAMES_ABOUT },
        { label: "英語、普通話與繪本", value: "學校介紹以小組及生動活動促進英語、普通話學習，並以繪本帶出互動體驗和閱讀習慣；沒有公開各語言每日課時。", sourceUrl: STJAMES_ABOUT },
        { label: "自然與生命教育", value: "校方列有機種植園圃及生命、環保教育活動；此項資料來自學校自述，具體場地開放及級別參與安排應向學校確認。", sourceUrl: STJAMES_ABOUT },
      ] },
      { title: "班制與評核資料", details: [
        { label: "班制與比例", value: "概覽列上午、下午及全日班，比例 1:8.6。校方簡介頁列上午及全日班，沒有標出頁面更新年度；報名時應確認下午班是否仍開辦。", period: "概覽 2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_STJAMES },
        { label: "質素評核年份", value: "校方頁面稱學校通過 2022 年學前機構質素評核，並摘要家校溝通、教師觀察及個別支援等內容。這不是本年度新的評級，家長可向校方索取完整報告了解評核範圍。", period: "2022 年質素評核", sourceUrl: STJAMES_ABOUT },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "long-ping-estate-sing-yan-kindergarten-158410",
    name: "朗屏邨聖恩幼稚園",
    nameEn: "Long Ping Estate Sing Yan Kindergarten",
    district: "元朗區",
    address: "新界元朗朗屏邨鳳屏樓（第 10 座）地下",
    telephone: "+852 2473 3266",
    schoolNumber: "158410 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；用品等代辦支出另計",
    language: "《概覽》列粵語；學校另設非華語學生中文支援，並非英語主教的證據",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午、下午及全日班",
    website: "https://singyan.edu.hk/tc",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；校方課程及支援頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 158410、校址 0001 配對。課程、支援和活動內容來自校方公開頁，屬校方安排的介紹；興趣班、到校服務和支援須按當屆時間、名額及個別需要確認。概覽的半日班免費只指扣減政府資助後的核准學費，不代表其他家庭支出免費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：朗屏邨聖恩幼稚園", scope: "校址 0001 的班制、粵語、師生比例及半日班學費。", url: KGP_SINGYAN },
      { label: "朗屏邨聖恩幼稚園：課程設計理念", scope: "兒童本位、生活化／戶外學習、自由遊戲、戲劇與繪本教學及興趣班。", url: SINGYAN_CURRICULUM },
      { label: "朗屏邨聖恩幼稚園：學校支援服務", scope: "駐校社工、到校學前康復服務及非華語學生中文支援；適用資格和安排須按學校當屆資料確認。", url: SINGYAN_SUPPORT },
    ],
    detailSections: [
      { title: "課程特色與孩子的校園生活", featured: true, note: "以下課程與支援由校方公開介紹；不代表每名學生必定參與所有活動或服務。", details: [
        { label: "生活化與戶外探索", value: "校方稱課程從孩子能力、經驗和興趣出發，統整六大學習範疇，並利用學校及社區資源安排生活化活動、戶外參觀與感官探索。", sourceUrl: SINGYAN_CURRICULUM },
        { label: "自由遊戲、戲劇與繪本", value: "學校以自由遊戲及戲劇教育營造關愛、尊重與包容的學習氛圍，另用繪本故事帶出關愛主題和品德訊息。家長可了解老師如何把遊戲經驗連回語言表達和同伴相處。", sourceUrl: SINGYAN_CURRICULUM },
        { label: "興趣班", value: "校方列制服團隊、花式跳繩、爵士舞、創意黏土、水墨畫及油畫等課外興趣班；班別、收費和參加名額以當屆通告為準。", sourceUrl: SINGYAN_CURRICULUM },
        { label: "學生與家庭支援", value: "校方列駐校社工、家長講座及工作坊、到校學前康復團隊，以及非華語學生中文支援。服務對象、轉介程序與課後安排宜按孩子需要直接查詢。", sourceUrl: SINGYAN_SUPPORT },
      ] },
      { title: "班制與收費", details: [
        { label: "概覽班制", value: "《幼稚園概覽 2026/27》列上午、下午和全日班；師生比例為 1:9.9。比例是全校時段統計，不等於每班固定人數。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_SINGYAN },
        { label: "核准學費", value: "概覽列參加幼稚園教育計劃的半日班扣減資助後免費；書簿、校服、茶點或其他代辦項目須另看校方當屆清單。", period: "2026/27", sourceUrl: KGP_SINGYAN },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "kowloon-cannan-anglo-chinese-kindergarten-324930",
    name: "九龍迦南中英文幼稚園",
    nameEn: "Kowloon Cannan Anglo-Chinese Kindergarten",
    district: "九龍城區",
    address: "九龍土瓜灣九龍城道 6 號津匯地下 A 舖及九龍城道 8 號津匯 1 樓",
    telephone: "+852 2336 2096",
    schoolNumber: "324930 / 校址 0002",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；家庭總支出仍需計用品費",
    language: "《概覽》按此校址列英語；校方集團課程亦介紹普通話及粵語活動，未公布各語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午及下午班，PN 資料未列",
    website: "https://www.cannan.edu.hk/",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；迦南課程頁查核 2026-10-23",
    sourceNote: "本頁只指教育局校號 324930、校址 0002 的九龍迦南中英文幼稚園，不與九龍塘總校或其他迦南分校合併。教育局《幼稚園概覽 2026/27》按本校址列英語和上午、下午班；校方課程頁屬迦南集團幼稚園課程，不能據此斷定本校址的語言課時、教師配置或全部活動完全一致。半日班免費指扣除政府資助後的核准學費，其他用品費另計。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：九龍迦南中英文幼稚園校址 0002", scope: "本校址的班制、英語標示、師生比例及半日班學費；與九龍塘校址資料分開。", url: KGP_KOWLOON_CANNAN },
      { label: "迦南幼稚園：Kindergarten 課程", scope: "集團課程的兒童本位、六大範疇、英語與普通話活動、HighScope plan-do-review、遊戲及評估做法；不是本分校單獨課表。", url: KOWLOON_CANNAN_CURRICULUM },
      { label: "教育局《學校位置及資料》", scope: "校號、校址編號、土瓜灣地址、電話及授課時段；位置名錄截至 2026-09-30。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
    ],
    detailSections: [
      { title: "集團課程特色與分校界線", featured: true, note: "以下教學模式來自迦南集團課程頁；九龍城校址的實際課表需向分校確認。", details: [
        { label: "兒童本位與動手學習", value: "校方課程頁稱以兒童本位方式統整六大學習範疇，重視動手經驗、探索環境及按幼兒興趣調整學習目標。這是集團課程介紹，不能視為九龍城校址獨立評核。", sourceUrl: KOWLOON_CANNAN_CURRICULUM },
        { label: "HighScope 的計劃、實踐、回顧", value: "集團課程頁介紹以 plan、do、review 組織學習：幼兒先計劃活動、動手進行，再與教師回顧。家長可詢問本校址各年級一天內實際安排。", sourceUrl: KOWLOON_CANNAN_CURRICULUM },
        { label: "語言活動", value: "校方集團頁列英語及普通話活動，亦以粵語環境支援日常溝通；EDB 概覽對本校址的教學語言欄標示英語。兩者不等於每日授課時數比例，應向分校索取時間表。", sourceUrl: KGP_KOWLOON_CANNAN },
        { label: "家校互動與評估", value: "集團頁介紹日常觀察、主題持續評估、作品分析和學習歷程紀錄，並列家長觀課、義工和面談等參與形式；本校址參與安排依當屆通告。", sourceUrl: KOWLOON_CANNAN_CURRICULUM },
      ] },
      { title: "校址數據與家長核對", details: [
        { label: "班制、語言與比例", value: "《幼稚園概覽 2026/27》按九龍城校址 0002 列上午、下午班，授課語言標示英語，師生比例 1:9.5。概覽沒有列 PN。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_KOWLOON_CANNAN },
        { label: "費用", value: "概覽列半日班扣除政府資助後免費；家庭仍要把書簿、校服及其他用品費納入預算，不能用免費學費代表零支出。", period: "2026/27", sourceUrl: KGP_KOWLOON_CANNAN },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chinese-ymca-kwai-chung-kindergarten-564680",
    name: "中華基督教青年會葵涌幼稚園",
    nameEn: "Chinese YMCA Kwai Chung Kindergarten",
    district: "葵青區",
    address: "新界葵涌邨葵涌商場 3 樓平台 3 號",
    telephone: "+852 2257 9025",
    schoolNumber: "564680 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；其他代辦費按校方當屆通告",
    language: "《概覽》列粵語；校方課程材料不支持推算英語或普通話課時",
    gradeSpan: "K1–K3；《概覽 2026/27》按校址列上午、下午及全日班",
    website: "https://www.kccymca.edu.hk/",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；校方簡介文件 2025/26",
    sourceNote: "本頁按教育局校號 564680、校址 0001 配對。校方 2025 年 9 月發布的學校簡介曾列 K1 全日、K2/K3 上午班安排；這是 2025/26 學年文件，不替代當前 2026/27 開班資料。《幼稚園概覽 2026/27》列學校提供上午、下午及全日時段，但沒有逐級分布；報名前請向校方核對年級對應班制和當屆收費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：中華基督教青年會葵涌幼稚園", scope: "校址 0001 的班制、粵語、師生比例和半日班學費。", url: KGP_YMCA_KC },
      { label: "校方學校簡介（2025/26）", scope: "辦學宗旨、課程設計和該年度 K1 全日、K2/K3 上午班資料；不外推至 2026/27。", url: YMCA_KC_OVERVIEW },
      { label: "中華基督教青年會葵涌幼稚園官方網站", scope: "學校官方資訊入口；最新年級班制與收費須看當屆通告。", url: "https://www.kccymca.edu.hk/" },
    ],
    detailSections: [
      { title: "辦學理念與學習安排", featured: true, note: "辦學宗旨和教學模式來自校方 2025/26 文件；不代表其後年度未有改動。", details: [
        { label: "基督教全人教育", value: "校方以「非以役人、乃役於人」描述辦學精神，並以德、智、體、群、美、靈均衡發展為目標。這屬辦學宗旨，家長可進一步了解日常宗教活動和品德教育方式。", period: "校方簡介 2025/26", sourceUrl: YMCA_KC_OVERVIEW },
        { label: "遊戲與設計中學習", value: "學校簡介稱尊重幼兒發展次序，安排愉快學習經歷，透過遊戲和設計活動培養思維與多元能力。文件未列每天活動時數或按級教學表。", period: "校方簡介 2025/26", sourceUrl: YMCA_KC_OVERVIEW },
        { label: "校方當年班級例子", value: "2025/26 學校簡介列 K1 全日班、K2/K3 上午班；這是該年度安排，不能直接當作 2026/27 及之後的固定班制。", period: "2025/26", sourceUrl: YMCA_KC_OVERVIEW },
      ] },
      { title: "概覽數據與費用", details: [
        { label: "概覽列出的班制", value: "《幼稚園概覽 2026/27》按校址列上午、下午及全日班，師生比例 1:11.4；概覽未列 PN。各級具體時段沒有分列。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_YMCA_KC },
        { label: "半日班學費", value: "概覽列參加幼稚園教育計劃的半日班扣除資助後免費；書簿、校本練習和其他代辦項目須按校方新學年通告核算。", period: "2026/27", sourceUrl: KGP_YMCA_KC },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "st-thomas-catholic-kindergarten-532533",
    name: "天主教聖多默幼稚園",
    nameEn: "St. Thomas' Catholic Kindergarten",
    district: "葵青區",
    address: "新界青衣青綠街 5 號",
    telephone: "+852 2449 9879",
    schoolNumber: "532533 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "天主教",
    tuition: "2026/27 半日班 HK$0；全日班全年 HK$11,200，均以持有效入學註冊證為條件",
    language: "《幼稚園概覽 2026/27》列粵語；其他語言活動及時數須向校方核對",
    gradeSpan: "K1–K3；校方 2026/27 班表列上午及全日，沒有列下午班",
    website: "https://www.stthomas.edu.hk/",
    dataYear: "《幼稚園概覽》2026/27；校方 2026/27 班級與收費資料查核 2026-10-23",
    sourceNote: "本頁按教育局校號 532533、校址 0001 配對。校方 2026/27 資料列 K1 上午及全日各 1 班、K2 上午及全日各 2 班、K3 上午及全日各 2 班；沒有列下午班。《幼稚園概覽》按校址列上午、下午及全日，班制口徑不同，以報名年度學校公告為準。半日免費及全日 HK$11,200/年均以持有效「幼稚園入學註冊證」為條件；未持證家庭的全額學費需另向校方查詢。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：聖多默幼稚園", scope: "校址 0001 的概覽班制、粵語、師生比例和參加計劃資料。", url: KGP_STTHOMAS },
      { label: "聖多默幼稚園：學校環境、班級編制與收費", scope: "校方 2026/27 年級班數、上課時段、校舍設施及學費條件。", url: STTHOMAS_INFO },
      { label: "聖多默幼稚園：收生安排", scope: "校方當屆收生程序和註冊事項，日期按年度更新。", url: STTHOMAS_ADMISSIONS },
    ],
    detailSections: [
      { title: "校園環境與日常照顧", featured: true, note: "設施是校方公布的場地資料，不等同每個級別每天均使用。", details: [
        { label: "校舍空間", value: "校方資料稱校舍位於聖多默宗徒堂，面積約 1,250 平方米，有 7 間標準課室，另設小禮堂、音樂舞蹈室、電腦室、圖書室、畫廊及多用途室。家長可參觀了解幼兒實際使用的活動空間。", sourceUrl: STTHOMAS_INFO },
        { label: "2026/27 班級安排", value: "校方列 K1 上午 1 班、全日 1 班；K2 上午 2 班、全日 2 班；K3 上午 2 班、全日 2 班。班數描述已開設班級，並非可供新生申請的個人學額。", period: "2026/27", sourceUrl: STTHOMAS_INFO },
        { label: "收費條件", value: "校方列持有效入學註冊證學生半日班免費，全日班年費 HK$11,200 分 10 期；未持有效註冊證者須繳全額學費。家庭應在註冊前按證件情況索取書面收費表。", period: "2026/27", sourceUrl: STTHOMAS_INFO },
      ] },
      { title: "班制、語言與比例", details: [
        { label: "兩個官方班制口徑", value: "校方 2026/27 班表只列上午及全日；《幼稚園概覽 2026/27》另列上午、下午及全日。報名前應以校方當屆收生通知確認實際可報的時段。", period: "2026/27", sourceUrl: STTHOMAS_INFO },
        { label: "概覽師生比例", value: "《幼稚園概覽 2026/27》列師生比例 1:10；此數為全校時段統計，不等同班內每位教師負責固定 10 名兒童。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_STTHOMAS },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "twghs-ginny-man-kindergarten-325767",
    name: "東華三院文頴怡幼稚園",
    nameEn: "TWGHs Ginny Man Kindergarten",
    district: "北區",
    address: "新界粉嶺龍馬路 66 號皇后山邨皇匯樓地下",
    telephone: "+852 2348 4438",
    schoolNumber: "325767 / 校址 0002",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日班及其他代辦費按校方當屆通告",
    language: "校方稱以母語教學，並設外籍英語教師及普通話專科教師；未公布各語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》按校址列上午、下午及全日班",
    website: "https://www.twghsgmk.edu.hk/",
    dataYear: "教育局位置名錄截至 2026-09-30；《幼稚園概覽》2026/27；校方課程頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 325767、校址 0002（皇后山）配對；不與東華三院其他幼稚園合併。師生比例、班制與半日班核准學費依《幼稚園概覽 2026/27》；校方網頁列全人發展、英語及普通話教師和繪本／戲劇教學，但沒有公開各語言每週課時。校方網站部分收生資料仍顯示 2024/25 年份，費用與班級安排須以當屆通告更新。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：東華三院文頴怡幼稚園校址 0002", scope: "皇后山校址的班制、粵語、師生比例及半日班學費。", url: KGP_TWGH_GM },
      { label: "東華三院文頴怡幼稚園：課程與教學、兩文三語及繪本教學", scope: "校方對全人發展、英語／普通話教師配置及繪本與戲劇活動的介紹；網頁部分收生資料仍有較舊年度。", url: TWGH_GM_HOME },
    ],
    detailSections: [
      { title: "課程特色與語言環境", featured: true, note: "以下語言與課程安排是校方自述，未提供逐日課時表或獨立成效數據。", details: [
        { label: "全人與正向學習", value: "校方把全人發展、正向學習思維、美感、自我解難和勇於接受挑戰列為課程方向。家長可詢問校本活動如何按 K1、K2、K3 的發展需要調整。", sourceUrl: TWGH_GM_HOME },
        { label: "兩文三語師資", value: "學校稱以母語教授，並設外籍英語教師及普通話專科教師；這說明師資安排，不等於英語或普通話佔主要教學時間。可向校方索取各年級時間表及語言活動頻率。", sourceUrl: TWGH_GM_HOME },
        { label: "繪本、藝術與戲劇", value: "校方介紹以繪本設計多元活動，結合藝術和戲劇元素，期望提升語文和共通能力；公開頁沒有列每週課時或是否所有級別採用相同做法。", sourceUrl: TWGH_GM_HOME },
      ] },
      { title: "校址數據與年度限制", details: [
        { label: "班制與比例", value: "《幼稚園概覽 2026/27》按皇后山校址 0002 列上午、下午及全日班；師生比例 1:10.1。比例按全校時段統計，不等於固定班額。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_TWGH_GM },
        { label: "學費與校方公告年份", value: "概覽列半日班扣減政府資助後免費；校方網站可見部分學費／招生頁仍沿用 2024/25 年資料，報名前應索取 2026/27 或下一屆通告核對全日班及代辦費。", period: "概覽 2026/27；校方部分舊頁為 2024/25", sourceUrl: KGP_TWGH_GM },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "twghs-katherine-ma-kindergarten-611093",
    name: "東華三院馬陳家歡幼稚園",
    nameEn: "TWGHs Katherine Ma Kindergarten",
    district: "屯門區",
    address: "新界屯門欣田邨逸田樓（第 2 座）地下",
    telephone: "+852 2885 7313",
    schoolNumber: "611093 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；用品及其他代辦費另計",
    language: "《概覽》列粵語；校方另設外籍英語教師及普通話專科教師，未公布語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午及下午班",
    website: "https://www.katherine-kindergarten.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程及收生頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 611093、校址 0001 配對。概覽列上午、下午、粵語、師生比例 1:10.7 及半日班免費；比例是全校時段統計，不代表每班固定人數。校方課程頁介紹自由遊戲、繪本、綜合藝術及英語／普通話專科教師，但沒有提供每日語言課時或逐級時間表。",
    replaceDirectoryDetails: true,
    omitDirectoryDetailTitles: ["聯絡與授課資料"],
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：馬陳家歡幼稚園校址 0001", scope: "校址 0001 的班制、粵語、師生比例及半日班資助後學費。", url: KGP_KATHERINE_MA },
      { label: "東華三院馬陳家歡幼稚園：課程及教學", scope: "校方自述自由遊戲、繪本、綜合藝術與兩文三語師資；不代表固定課時或學生成效。", url: KATHERINE_MA_HOME },
      { label: "東華三院馬陳家歡幼稚園：收生指南", scope: "2026/27 新生申請入口及校方收生資料；動態日期以當屆公告為準。", url: KATHERINE_MA_ADMISSION },
    ],
    detailSections: [
      { title: "課程與語言安排", featured: true, note: "課程內容為校方自述；公開頁未提供語言課時比例或逐級時間表。", details: [
        { label: "自由遊戲、繪本與藝術", value: "校方把自由遊戲、繪本及綜合藝術教育列為課程主軸，並以生活情境和探究活動延展學習。家長參觀時可觀察教師如何把孩子的遊戲興趣接回語言、藝術與日常概念。", sourceUrl: KATHERINE_MA_HOME },
        { label: "繪本連結生活與探究", value: "學校稱以繪本統整學習經驗，並採用建構及發現式學習。這種設計較重視討論、操作和表達；校方沒有公布每週各類活動比例，宜向學校索取實際時間表。", sourceUrl: KATHERINE_MA_HOME },
        { label: "英語及普通話師資", value: "校方稱除母語教學外，另設外籍英語教師和專科普通話教師。這只能說明師資配置，不能推斷英語或普通話是主要教學語言；概覽的授課語言欄列粵語。", sourceUrl: KATHERINE_MA_HOME },
      ] },
      { title: "校址數據與家長核對", details: [
        { label: "班制及比例", value: "概覽按校址 0001 列上午及下午班，師生比例 1:10.7；比例按 2025 年 9 月統計，並非班額。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_KATHERINE_MA },
        { label: "半日班收費", value: "概覽列參加幼稚園教育計劃後半日班免費；校服、書簿、膳食和其他代辦支出仍須按校方當屆收費表核對。", period: "2026/27", sourceUrl: KGP_KATHERINE_MA },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "twghs-chan-king-har-kindergarten-157384",
    name: "東華三院馬陳景霞幼稚園",
    nameEn: "Tung Wah Group of Hospitals Chan King Har Kindergarten",
    district: "沙田區",
    address: "新界沙田新翠邨新月樓地下",
    telephone: "+852 2604 4380",
    schoolNumber: "157384 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；其他家庭支出另計",
    language: "《概覽》列粵語；校方另設英語及普通話活動，沒有公布各語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午、下午及全日班",
    website: "https://www.twghckhkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 157384、校址 0001 配對。概覽列上午、下午及全日班、粵語、師生比例 1:9.5 及半日免費。校方網站介紹六大學習範疇、兩文三語及繪本教學；相關活動頻率、分班語言和個別支援名額未有公開，不作推算。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：馬陳景霞幼稚園校址 0001", scope: "班制、授課語言、師生比例與半日班資助後學費。", url: KGP_CHAN_KING_HAR },
      { label: "東華三院馬陳景霞幼稚園：學校特色及課程", scope: "校方自述六大學習範疇、生活化主題、兩文三語師資及繪本教學。", url: CHAN_KING_HAR_HOME },
    ],
    detailSections: [
      { title: "校本課程與語言環境", featured: true, note: "這些是校方公開的課程安排，不是獨立成效評估；語言課時未公布。", details: [
        { label: "六大範疇連結生活", value: "校方以體能與健康、語文、幼兒數學、大自然與生活、個人與群體、藝術與創意六個範疇組織課程，並以生活化主題連結幼兒經驗。家長可問學校如何把主題延伸到家中觀察或操作。", sourceUrl: CHAN_KING_HAR_HOME },
        { label: "英語和普通話專科老師", value: "校方稱設三位外籍英語教師及普通話教師，透過生活情境、故事和兒歌讓幼兒接觸語言。概覽授課語言仍列粵語，校方未公布不同語言每日或每週所佔時間。", sourceUrl: CHAN_KING_HAR_HOME },
        { label: "繪本教學", value: "學校以繪本帶出故事理解、語文和創意活動。家長可查看孩子作品和課堂分享，了解閱讀如何延伸成表達、提問或創作，而不只停留在聽故事。", sourceUrl: CHAN_KING_HAR_HOME },
      ] },
      { title: "班制與費用", details: [
        { label: "班制與師生比例", value: "概覽按校址 0001 列上午、下午及全日班，比例為 1:9.5；全日班的逐級名額及當屆安排應向校方確認。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_CHAN_KING_HAR },
        { label: "核准半日班學費", value: "概覽列半日班扣減政府資助後免費。書簿、校服、膳食、全日班差額及校車費用須另看當屆通告。", period: "2026/27", sourceUrl: KGP_CHAN_KING_HAR },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hong-kong-sheng-kung-hui-church-of-epiphany-kindergarten-159000",
    name: "香港聖公會基督顯現堂幼稚園",
    nameEn: "Hong Kong Sheng Kung Hui The Church of The Epiphany Kindergarten",
    district: "葵青區",
    address: "新界青衣青綠街 1 號偉景花園",
    telephone: "+852 2435 6666",
    schoolNumber: "159000 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；用品等代辦支出另計",
    language: "《概覽》列粵語；翻譯服務可按家庭需要向校方查詢",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午、下午及全日班",
    website: "https://www.coekg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方招生頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 159000、校址 0001 配對。概覽列上午、下午及全日、粵語、比例 1:8.9 及半日免費。校方網站以基督教價值、遊戲學習、共同成長與閱讀作公開定位，沒有提供逐級課程時數。校方 2027/28 招生頁中部分日期及年度文字互相不一致，故不把該頁的動態日期當作可靠現行時間表。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：基督顯現堂幼稚園校址 0001", scope: "班制、授課語言、師生比例及半日班資助後學費。", url: KGP_EPIPHANY },
      { label: "香港聖公會基督顯現堂幼稚園：學校首頁", scope: "校方公開的辦學經文、遊戲學習、共同成長及閱讀方向；為學校自述。", url: EPIPHANY_HOME },
      { label: "香港聖公會基督顯現堂幼稚園：收生程序", scope: "校方收生步驟、面見形式及翻譯查詢方式；頁面內部分年度日期有矛盾，不引用為當屆日期。", url: EPIPHANY_ADMISSION },
    ],
    detailSections: [
      { title: "辦學方向與孩子的日常", featured: true, note: "辦學價值來自校方自述；實際活動頻率和每名幼兒參與情況需向學校核實。", details: [
        { label: "以基督教價值培育幼兒", value: "校方以聖經經文和基督教精神描述辦學方向，首頁並列感恩、共同成長與關懷。若家庭重視宗教教育，可在參觀時了解祈禱、崇拜及節期活動在校園生活中的安排。", sourceUrl: EPIPHANY_HOME },
        { label: "遊戲與閱讀", value: "學校把遊戲學習和喜愛閱讀列為重點。對幼兒而言，關鍵是遊戲有沒有教師觀察、語言互動和延伸材料；家長可詢問學校如何記錄孩子的探索和閱讀興趣。", sourceUrl: EPIPHANY_HOME },
        { label: "家長面見及翻譯支援", value: "校方收生頁列小組及／或個別面見，家長須陪同；並表示有需要可聯絡校方安排翻譯或傳譯。由於該頁年度日期文字存在不一致，本頁只保留程序類資訊，報名前須索取最新通知。", sourceUrl: EPIPHANY_ADMISSION },
      ] },
      { title: "班制與校址數據", details: [
        { label: "概覽班制", value: "《幼稚園概覽 2026/27》按校址 0001 列上午、下午及全日班，授課語言為粵語。", period: "2026/27", sourceUrl: KGP_EPIPHANY },
        { label: "師生比例與學費", value: "師生比例 1:8.9，按全校時段統計；半日班扣減政府資助後免費，其他支出另計。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_EPIPHANY },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "fanling-baptist-church-lui-ming-choi-kindergarten-156230",
    name: "粉嶺浸信會呂明才幼稚園",
    nameEn: "Fanling Baptist Church Lui Ming Choi Kindergarten",
    district: "北區",
    address: "新界粉嶺沙頭角道龍躍頭段 3 號（不包括 101 課室及有蓋操場）",
    telephone: "+852 2669 4315",
    schoolNumber: "156230 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；其他代辦費另計",
    language: "《概覽》列粵語；沒有足夠當屆資料可確認英語及普通話授課比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午及下午班",
    website: "http://www.fbclmckg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程文件為 2018/19 至 2022/23 年度資料",
    sourceNote: "本頁按教育局校號 156230、校址 0001 配對。概覽列上午及下午班、粵語、比例 1:9 及半日免費。校方網站公開可讀的部分課程資料為較早年度文件；只作歷史課程例子，不推定為現行全校實施安排。家長應向校方索取當屆課程與語言時間表。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：粉嶺浸信會呂明才幼稚園", scope: "校址 0001 班制、粵語、師生比例及半日班資助後學費。", url: KGP_FANLING_BAPTIST },
      { label: "粉嶺浸信會呂明才幼稚園：2018/19 周年計劃", scope: "當年以 5E 探究式教學規劃的歷史例子；不作現行課程承諾。", url: FANLING_BAPTIST_PLAN_2018 },
      { label: "教育局學校搜尋：校號 156230", scope: "校址、電話、辦學類別和登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=156230000111" },
    ],
    detailSections: [
      { title: "課程資料與年度限制", featured: true, note: "校方可檢索的課程文件有明確年份；不能把舊年度計劃寫成現行校務安排。", details: [
        { label: "探究式學習的歷史例子", value: "校方 2018/19 周年計劃曾記錄以 5E 探究步驟設計課堂：引起興趣、探索、解釋、延展及評鑑。這顯示該年度的教學發展方向，不能證明現屆所有級別仍用同一模式。", period: "2018/19（歷史文件）", sourceUrl: FANLING_BAPTIST_PLAN_2018 },
        { label: "如何向校方核實現行做法", value: "由於較新的可讀校方課程材料不足，家長宜在參觀時詢問目前主題課如何安排孩子觀察、操作和表達；並索取本年度語言安排及評估樣本。這比把舊計劃當作現況更可靠。", sourceUrl: FANLING_BAPTIST_HOME },
      ] },
      { title: "班制與概覽數據", details: [
        { label: "班制與比例", value: "《幼稚園概覽 2026/27》按校址列上午及下午班，師生比例 1:9；比例為全校時段統計，不是班額。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_FANLING_BAPTIST },
        { label: "學費", value: "概覽列參加幼稚園教育計劃後半日班免費；書簿、校服及代辦用品另計。當屆收費以校方最新通告為準。", period: "2026/27", sourceUrl: KGP_FANLING_BAPTIST },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chu-sui-lan-anglo-chinese-kindergarten-158380",
    name: "世界龍岡學校朱瑞蘭（中英文）幼稚園",
    nameEn: "Lung Kong World Federation School Limited Chu Sui Lan Anglo-Chinese Kindergarten",
    district: "屯門區",
    address: "新界屯門良景邨良傑樓地下 1–10 號",
    telephone: "+852 2456 2677",
    schoolNumber: "158380 / 校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；其他用品支出另計",
    language: "《概覽》按校址列英語；校方亦接納非華語學生並可按需要安排翻譯，未公布語言課時比例",
    gradeSpan: "K1–K3；《幼稚園概覽 2026/27》列上午、下午及全日班",
    website: "https://www.cslkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程及收生頁查核 2026-10-23",
    sourceNote: "本頁按教育局校號 158380、校址 0001 配對。概覽列上午、下午及全日、英語、比例 1:8.9 及半日免費。校方課程與活動頁介紹中華文化校本活動、課室外體驗學習及非華語家庭支援；這些是學校提供的安排，未有公開各級語言課時或每項活動的名額。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：朱瑞蘭幼稚園校址 0001", scope: "班制、概覽授課語言、師生比例及半日班資助後學費。", url: KGP_CHU_SUI_LAN },
      { label: "世界龍岡學校朱瑞蘭幼稚園：校方課程與活動", scope: "校本課程、中華文化、課室外體驗學習及支援服務的官方入口。", url: CHU_SUI_LAN_HOME },
      { label: "世界龍岡學校朱瑞蘭幼稚園：收生安排", scope: "校方說明接受非華語學生申請並可聯絡安排翻譯；招生日期按年度變動。", url: CHU_SUI_LAN_ADMISSION },
    ],
    detailSections: [
      { title: "校本特色與家庭支援", featured: true, note: "以下為校方公布的課程與服務；個別班級實際頻率和支援名額須向學校查詢。", details: [
        { label: "中華文化校本活動", value: "學校把中華文化列為校本學習活動，並展示節慶及文化主題活動。家長可了解活動如何連結幼兒生活經驗，而非只作節日表演。", sourceUrl: CHU_SUI_LAN_HOME },
        { label: "課室外體驗學習", value: "校方設有課室外體驗學習活動及校園支援資訊。實地探索可讓孩子把課堂概念連到社區和環境；可向校方確認各級外出活動的頻率、交通安排及家長費用。", sourceUrl: CHU_SUI_LAN_HOME },
        { label: "非華語家庭安排", value: "校方收生資料表示接受非華語學生申請，有需要可安排翻譯或支援。若家庭需要語言協助，應在申請前確認會面、家校溝通及入學後中文支援的實際方式。", sourceUrl: CHU_SUI_LAN_ADMISSION },
      ] },
      { title: "校址數據與語言", details: [
        { label: "班制與概覽語言", value: "概覽按校址 0001 列上午、下午及全日班，授課語言欄標示英語；此欄不表示所有科目只用英語，亦不能推算粵語或普通話的每日時數。", period: "2026/27", sourceUrl: KGP_CHU_SUI_LAN },
        { label: "比例與半日學費", value: "師生比例為 1:8.9；參加幼稚園教育計劃後半日班免費，校服、書簿及其他代辦費另計。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_CHU_SUI_LAN },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "salvation-army-centaline-charity-fund-kindergarten-576743",
    name: "救世軍中原慈善基金幼稚園",
    nameEn: "The Salvation Army Centaline Charity Fund Kindergarten",
    district: "沙田區",
    address: "新界沙田大圍美田邨美滿樓地下（校址 0001；另有校址 0002，須分開查詢）",
    telephone: "+852 2886 2340",
    schoolNumber: "576743 / 主要課程資料校址 0001",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日照顧及代辦費另向校方確認",
    language: "《概覽》按校址 0001 列粵語；校方未公布語言教學時數",
    gradeSpan: "K1–K3；概覽列上午、下午及全日班；本頁課程來源地址為校址 0001",
    website: "https://www.salvationarmy.org.hk/esd/ccfkg/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程／服務頁查核 2026-10-23",
    sourceNote: "本校號有兩個教育局登記校址。本頁可讀的校方課程及服務頁明確列出大圍美田邨地址，故課程細節只按校址 0001 描述；元朗朗天苑校址 0002 的具體安排不從大圍校址外推。概覽按校址 0001 列三種時段、粵語、比例 1:9.4 及半日免費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：中原慈善基金幼稚園校址 0001", scope: "大圍校址的班制、授課語言、師生比例及半日班學費。", url: KGP_SA_CCF },
      { label: "救世軍中原慈善基金幼稚園：課程", scope: "校方課程頁列專題研習、蒙特梭利及持續觀察評估；網頁聯絡地址為大圍校址 0001。", url: SA_CCF_CURRICULUM },
      { label: "救世軍中原慈善基金幼稚園：服務", scope: "校方公布全日／半日時段、駐校社工、學前康復及校車資訊；各項服務資格和費用以校方當屆安排為準。", url: SA_CCF_SERVICES },
    ],
    detailSections: [
      { title: "課程設計與照顧支援（校址 0001）", featured: true, note: "校方課程頁聯絡地址為大圍美田邨；不得自動外推至同校另一登記校址。", details: [
        { label: "自由遊戲延伸專題", value: "校方介紹以幼兒興趣開展專題研習，從觀察、討論和實踐建構理解，並把遊戲經驗延伸成探究。家長可問老師如何記錄孩子提出的問題，以及活動怎樣連結語文、數理或社交。", sourceUrl: SA_CCF_CURRICULUM },
        { label: "蒙特梭利教具操作", value: "學校把日常生活、感官、數學及地理文化內容融入蒙特梭利活動，並稱透過操作教具培養專注、獨立和邏輯思考。這是校方的教學設計描述，不是對每名幼兒成效的保證。", sourceUrl: SA_CCF_CURRICULUM },
        { label: "持續觀察與家庭支援", value: "校方稱以觀察及學習歷程檔案評估幼兒發展；服務頁另列每週三天駐校社工、到校學前康復服務及校車合作。適用資格、轉介程序與費用需逐項向校方確認。", sourceUrl: SA_CCF_SERVICES },
      ] },
      { title: "班制與校址邊界", details: [
        { label: "校址 0001 概覽資料", value: "《幼稚園概覽 2026/27》列上午、下午及全日班，授課語言為粵語，師生比例 1:9.4。比例是全校時段統計，不是固定班額。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_SA_CCF },
        { label: "另一登記校址", value: "教育局另登記校址 0002，位於元朗朗天苑 A 座地下。現有可讀校方課程頁未能確認該校址的逐級班制、課程及服務完全相同，申請前須直接向該校址核對。", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "khalsa-diwan-kindergarten-323853",
    name: "卡莎迪曼幼稚園",
    nameEn: "Khalsa Diwan Kindergarten",
    district: "灣仔區",
    address: "香港天后永興街 10–12 號田華閣 3 樓 B 室（校址 0002；另有校址 0001）",
    telephone: "+852 2702 0366",
    schoolNumber: "323853 / 校址 0002",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "錫克教",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；其他支出按校方通告",
    language: "《概覽》按校址 0002 列粵語；校方另以中文為非華語幼兒建立語言環境，未公布語言課時比例",
    gradeSpan: "K1–K3；校址 0002 的概覽列上午班，校址 0001 不與本頁校址混用",
    website: "https://www.kdkkindergarten.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方課程頁查核 2026-10-23",
    sourceNote: "卡莎迪曼幼稚園有兩個登記校址。本頁以概覽校址 0002（天后）作班制、語言及比例依據，概覽列上午班、粵語、比例 1:3.5 及半日免費；校址 0001（皇后大道東）保留在教育局登記資料中，不把單一校址數據套用到另一校址。校方課程頁指出多數幼兒的中文並非母語，並描述分階段中文學習設計。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：卡莎迪曼幼稚園校址 0002", scope: "天后校址班制、授課語言、師生比例及半日班學費。", url: KGP_KHALSA_TIN_HAU },
      { label: "卡莎迪曼幼稚園：課程", scope: "校方自述課程指引、非華語幼兒中文語言環境及分階段學習框架。", url: KHALSA_CURRICULUM },
      { label: "卡莎迪曼幼稚園：學校首頁", scope: "校方對小組教學、家校合作及非華語家庭支援的介紹；不採用缺分母的升小成果宣傳數字。", url: KHALSA_HOME },
    ],
    detailSections: [
      { title: "中文學習與小組教學", featured: true, note: "校方表示大部分學生為非華語幼兒；這是學校自述，不代表每班學生組成比例。", details: [
        { label: "把中文放進生活環境", value: "校方稱會透過環境文字和日常使用營造中文語境，並按入門、發展、應用階段規劃學習。對家中主要使用其他語言的孩子，家長可了解學校如何觀察理解與表達進度，以及如何與家庭分享可在家使用的詞彙。", sourceUrl: KHALSA_CURRICULUM },
        { label: "K1 不要求執筆抄寫", value: "課程頁表示 K1 不要求兒童執筆，並不安排機械式抄寫或操練式計算。家長如重視早期書寫準備，可進一步詢問學校如何以遊戲、口語和精細動作活動建立相關基礎。", sourceUrl: KHALSA_CURRICULUM },
        { label: "小組教學與家校溝通", value: "校方首頁介紹小組教學及家校合作，目標是支援個別需要；公開頁沒有提供每組人數、語言支援人手或服務時數。家長可在參觀時確認實際分組方式。", sourceUrl: KHALSA_HOME },
      ] },
      { title: "校址 0002 概覽數據", details: [
        { label: "時段及比例", value: "教育局概覽按天后校址 0002 列上午班，師生比例 1:3.5；小校人數較少時比例會較敏感，仍不應直接當作每班人數。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_KHALSA_TIN_HAU },
        { label: "學費與校址", value: "概覽列半日班扣減政府資助後免費。皇后大道東校址 0001 的班制、比例與收費未以本頁校址資料代替；報讀前須確認申請的實際校址。", period: "2026/27", sourceUrl: KGP_KHALSA_TIN_HAU },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hong-kong-man-sang-kindergarten-western-district-603724",
    name: "香港民生幼稚園（西區）",
    nameEn: "Hong Kong Man Sang Kindergarten (Western District)",
    district: "中西區",
    address: "香港皇后大道西 513–519 號尼斯花園地下 A 舖及 1 樓",
    telephone: "+852 2336 3232 / 2348 8366",
    schoolNumber: "603724 / 校址 0001",
    schoolType: "私立幼稚園暨幼兒中心",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列 PN 及半日、全日收費；級別與班別須按西區校當屆收費表核對",
    language: "校方列兩文三語班及英普雙語班；概覽校址 0001 授課語言欄列粵語，未公布各語言課時比例",
    gradeSpan: "PN、K1–K3；《概覽》校址 0001 列上午、下午及全日班",
    website: "https://www.mansangkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方所列月費為 2025/26 學年",
    sourceNote: "本頁只指校號 603724、校址 0001 的西區校，不與北角校或其他分校混用。教育局概覽列 PN、上午、下午及全日班、粵語及師生比例 1:8.1；校方網站介紹兩文三語班與英普雙語班，並公布西區校 2025/26 月費。校方及概覽年度不同，故收費資料分年標示，下一學年應重新索取書面收費表。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：香港民生幼稚園西區校址 0001", scope: "PN、班制、概覽語言、師生比例和教育計劃學費資料。", url: KGP_MANSANG_WEST },
      { label: "香港民生幼稚園：課程", scope: "校方介紹校本中、英文和普通話課程及不同語言班別；屬學校自述。", url: MANSANG_CURRICULUM },
      { label: "香港民生幼稚園：班級、時段及收費（2025/26）", scope: "西區校 PN、K1–K3 班制與該學年月費；不外推為 2026/27 費用。", url: MANSANG_SESSIONS },
    ],
    detailSections: [
      { title: "班別語言與課程安排", featured: true, note: "語言班別及費用按校方公開頁；概覽授課語言欄是另一資料欄位，兩者不代表每日課時比例。", details: [
        { label: "兩文三語與英普雙語班", value: "校方列兩文三語班以英語、粵語及普通話為學習語言；英普雙語班以英語和普通話為主，另有粵語活動。這給家庭不同語言取向，但家長應先確認西區校當屆開班、幼兒分班條件及各語言實際課時。", sourceUrl: MANSANG_CURRICULUM },
        { label: "英語拼音與日常表達", value: "校方介紹 Jolly Phonics、故事、動作、Show and Tell 和日常對話活動；普通話則以遊戲、歌謠和專業導師設計的拼音教材作介紹。這是課程方向，不等於各項活動每日固定安排。", sourceUrl: MANSANG_CURRICULUM },
        { label: "PN 至 K3 及校址差異", value: "校方把 PN、K1、K2、K3 納入年級表，並列北角與西區校不同月費。家庭應確認所申請校址和級別，不能把北角校收費或班別直接套到西區校。", sourceUrl: MANSANG_SESSIONS },
      ] },
      { title: "西區校班制與收費年份", details: [
        { label: "概覽班制與比例", value: "《幼稚園概覽 2026/27》按校址 0001 列 PN、上午、下午及全日班，授課語言為粵語，比例 1:8.1。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_MANSANG_WEST },
        { label: "校方月費（舊一學年）", value: "校方 2025/26 西區校收費頁列 PN 半日 HK$5,825、全日 HK$8,090；K1–K3 半日早班 HK$5,825、下午班 HK$5,675、全日 HK$8,090。這是舊學年月費，不當作 2026/27 報價。", period: "2025/26", sourceUrl: MANSANG_SESSIONS },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "jade-kindergarten-524360",
    name: "殷翠幼稚園",
    nameEn: "Jade Kindergarten",
    district: "元朗區",
    address: "新界元朗大棠道崇正新村 153 號地下",
    telephone: "+852 2442 7729",
    schoolNumber: "524360 / 校址 0002",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    tuition: "《幼稚園概覽 2026/27》列半日班免費；全日班及代辦支出須按校方當屆通告",
    language: "《概覽》列粵語；校方舊版介紹另有英文及普通話課程，未能確認目前課時",
    gradeSpan: "K1–K3；概覽列上午、下午及全日班",
    website: "https://www.jadekg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方可讀課程頁未標示更新日期",
    sourceNote: "本頁按教育局校號 524360、校址 0002 配對。2026/27 概覽列上午、下午及全日班、粵語、比例 1:6.8 及半日免費。校方網站連結目前呈現的課程介紹未見更新日期，雖提及中文為主及英語、普通話活動，不能當作 2026/27 班別或課時承諾；報名前應向校方索取當屆課程表和全日班收費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：殷翠幼稚園校址 0002", scope: "班制、概覽授課語言、師生比例及半日班資助後學費。", url: KGP_JADE },
      { label: "殷翠幼稚園：學校簡介與課程（未標日期）", scope: "校方頁面介紹兒童本位、遊戲活動、生活化課程和語言課程；頁面未顯示更新日期。", url: JADE_PROFILE },
    ],
    detailSections: [
      { title: "課程概念與資料時效", featured: true, note: "校方網頁未標示更新日期；只呈現其公開自述方向，年度實施狀況尚待確認。", details: [
        { label: "兒童本位及遊戲學習", value: "校方簡介稱以兒童為中心，透過遊戲和活動讓幼兒參與、理解概念，並照顧個別差異。家長可在參觀時觀察遊戲區如何連結課堂目標與生活經驗。", sourceUrl: JADE_PROFILE },
        { label: "生活化主題課程", value: "頁面把語文、數學、常識、美勞與音樂等活動配合主題，並列健康、生活、家庭及倫理教育。由於頁面未標年度，不能據此確認現屆教材、教學時數或全日班內容。", sourceUrl: JADE_PROFILE },
        { label: "語言安排須問當屆校方", value: "舊版介紹稱以中文為主，並設英語及普通話課程；2026/27 概覽授課語言欄列粵語。兩項資料不矛盾地證明語言課時比例，家長應索取最新各級時間表。", sourceUrl: KGP_JADE },
      ] },
      { title: "概覽班制與費用", details: [
        { label: "班制及師生比例", value: "概覽按校址 0002 列上午、下午及全日班，師生比例 1:6.8；這是全校時段統計，不是每班人數。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_JADE },
        { label: "半日班免費的範圍", value: "概覽列參加幼稚園教育計劃後半日班免費，書簿、校服、膳食及其他代辦支出另計；全日班核准費用應按校方當屆收費表確認。", period: "2026/27", sourceUrl: KGP_JADE },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tai-po-rhenish-church-kindergarten-150860",
    name: "大埔禮賢會幼稚園",
    nameEn: "Tai Po Rhenish Church Kindergarten",
    district: "大埔區",
    address: "大埔區兩校址：汀角路正校及富蝶邨鳳蝶樓富蝶分校（各校址見教育局登記資料）",
    telephone: "+852 2144 0708（汀角路正校）；+852 2657 4168（富蝶分校）",
    schoolNumber: "150860 / 按校址分別核對",
    schoolType: "非牟利幼稚園",
    gender: "男女校",
    religion: "基督教",
    tuition: "《幼稚園概覽 2026/27》列參加幼稚園教育計劃；各校址班別費用依校方當屆收費表",
    language: "《概覽》按富蝶校址列粵語；校方另介紹英語與普通話活動，未公布語言課時比例",
    gradeSpan: "K1–K3；校方 2025/26 班級表分汀角路正校及富蝶分校列示上午與全日班數",
    website: "https://www.rcktp.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方班級資料 2025/26；富蝶分校 2025-08 遷址",
    sourceNote: "大埔禮賢會幼稚園有多個校址，2025 年 8 月安富道分校遷入富蝶邨新校舍。校方 2025/26 班級資料分汀角路正校與富蝶分校列出各級人數和班數；這些是該學年在讀人數，不是下一屆學額。《幼稚園概覽 2026/27》本頁對應校址 0003（富蝶），不能用來代替汀角路正校數據。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：大埔禮賢會幼稚園校址 0003", scope: "富蝶校址班制、授課語言、師生比例及幼稚園教育計劃資料。", url: KGP_TAI_PO_RHENISH },
      { label: "大埔禮賢會幼稚園：課程編排", scope: "校本課程、生活化主題、專題延展及持續觀察評估。", url: TAI_PO_RHENISH_CURRICULUM },
      { label: "大埔禮賢會幼稚園：2025/26 班級編制", scope: "分校址列出的在讀人數、班數和課堂時段；不代表當屆新生名額。", url: TAI_PO_RHENISH_SCHOOL_INFO },
      { label: "大埔禮賢會幼稚園：校史及富蝶分校背景", scope: "汀角路正校與富蝶分校沿革、富蝶分校遷址年份。", url: TAI_PO_RHENISH_BACKGROUND },
    ],
    detailSections: [
      { title: "課程與孩子的學習經驗", featured: true, note: "課程介紹適用於校方所列課程方向；分校每日安排仍應分別核實。", details: [
        { label: "生活化主題與專題延伸", value: "校方按幼兒發展和生活經驗設計校本課程，以主題統整學習活動，再用專題作延伸，讓幼兒從觀察和實作中學習。家庭可留意孩子是否有機會提出問題、嘗試不同方法並分享發現。", sourceUrl: TAI_PO_RHENISH_CURRICULUM },
        { label: "持續觀察評估", value: "校方稱按學習範疇及發展階段持續觀察，並參考家長提供的幼兒資料和幼兒作品自評。家長可了解評估如何轉化成個別回饋，而不只是學期末的一張記錄。", sourceUrl: TAI_PO_RHENISH_CURRICULUM },
        { label: "兩個校址，班數分開看", value: "正校位於汀角路，分校在 2025 年 8 月遷入富蝶邨。兩處地址、校舍和班級容量不同；申請前要確認實際上課校址及接送安排。", period: "分校遷址：2025 年 8 月", sourceUrl: TAI_PO_RHENISH_BACKGROUND },
      ] },
      { title: "富蝶分校數據與名額邊界", details: [
        { label: "2025/26 在讀班級", value: "校方列富蝶分校 K1 上午 15 人、全日 30 人；K2 上午 11 人、全日 33 人；K3 上午 21 人、全日 26 人，共 136 名學生、6 班。這是 2025/26 在讀數，不可當成 2026/27 新生名額。", period: "2025/26", sourceUrl: TAI_PO_RHENISH_SCHOOL_INFO },
        { label: "概覽校址 0003", value: "《幼稚園概覽 2026/27》按校址 0003（富蝶）列上午、下午及全日班，粵語，師生比例 1:8.1；汀角路正校資料另按其校址查詢。", period: "2026/27；比例按 2025 年 9 月統計", sourceUrl: KGP_TAI_PO_RHENISH },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "skh",
    name: "聖公會幼稚園",
    nameEn: "Sheng Kung Hui Kindergarten",
    district: "灣仔區",
    address: "教育局位置資料列有銅鑼灣及畢拉山登記校址；實際上課地點須以校方最新通知為準",
    telephone: "+852 2523 4905",
    schoolNumber: "131636 / KGP 校址 0002；另有校址 0003",
    schoolType: "私立幼稚園（沒有參加幼稚園教育計劃）",
    gender: "男女校",
    religion: "基督教",
    tuition: "2025/26 年全年學費 HK$71,830；校方 2026/27 家長簡介會只曾預計 HK$90,000–120,000，須以正式核准收費表為準",
    language: "《幼稚園概覽 2026/27》校址 0002 列中、英文；校方未公布各語言課時比例",
    gradeSpan: "K1–K3；校方目前公開班級資料列半日班",
    website: "https://www.skhkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；正式學費 2025/26；新校舍安排按校方 2025/26 招生及 2026/27 家長簡介資料",
    sourceNote: "校號 131636 有多個登記校址。2026/27 概覽校址 0002 仍列銅鑼灣東院道資料；校方早前文件表示目標於 2026 年 9 月啟用畢拉山新校舍，但目前可讀的官方資料未足以確認實際遷校及新址收生細節。學費只把 2025/26 正式費用與校方對 2026/27 的預計分開列示，不把預算當成核准收費。",
    replaceDirectoryDetails: true,
    omitDirectoryDetailTitles: ["幼稚園概覽｜校址 0002"],
    omitDirectorySourceUrls: [KGP_SKH_KG],
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：聖公會幼稚園校址 0002", scope: "校址 0002 班制、概覽授課語言及師生比例；不可視作新校舍現行資料。", url: KGP_SKH_KG },
      { label: "聖公會幼稚園：班級編制及學費（2025/26）", scope: "舊校舍半日班、每級班數、人數、課時及該學年正式學費。", url: SKH_KG_CLASSES },
      { label: "聖公會幼稚園：校方使命及課程", scope: "基督教教育理念、學習探索方向；學校自述。", url: "https://www.skhkg.edu.hk/" },
      { label: "聖公會幼稚園：2026/27 家長簡介會", scope: "校方當時對新校舍啟用年度和學費的預計，不等於已確認的實際遷校日或正式收費。", url: "https://www.skhkg.edu.hk/wp-content/uploads/2025/09/2026-27%E5%B9%B4%E5%BA%A6%E7%94%B3%E8%AB%8B%E4%BA%BA%E5%AE%B6%E9%95%B7%E7%B0%A1%E4%BB%8B%E6%9C%83%E7%B6%B2%E4%B8%8A%E5%88%8A%E7%99%BB-%E7%B9%81.pdf" },
    ],
    detailSections: [
      { title: "辦學取向與校舍轉換", featured: true, note: "學校使命屬校方自述；新校舍是否已投入服務、校址及新學年安排須直接向學校確認。", details: [
        { label: "基督教關懷與探索", value: "校方以基督精神和「愛」作辦學表述，並提到接納幼兒學習、鼓勵探索及欣賞表現。對家庭而言，值得在參觀時觀察這些理念如何落實在自由探索、師生互動及幼兒表達，而不只看校園設施。", sourceUrl: "https://www.skhkg.edu.hk/" },
        { label: "新校舍狀態要先確認", value: "官方招生及家長簡介資料曾表示，學校計劃於 2026 年遷往畢拉山校舍，部分文件以 2026 年 9 月為目標。教育局概覽的校址 0002 仍是銅鑼灣資料；本頁不推定遷校已完成，報名前應確認上課地址、校車路線及新址招生安排。", period: "校方公布：2025 年；目標啟用：2026 年", sourceUrl: "https://www.skhkg.edu.hk/wp-content/uploads/2025/09/2026-27%E5%B9%B4%E5%BA%A6%E7%94%B3%E8%AB%8B%E4%BA%BA%E5%AE%B6%E9%95%B7%E7%B0%A1%E4%BB%8B%E6%9C%83%E7%B6%B2%E4%B8%8A%E5%88%8A%E7%99%BB-%E7%B9%81.pdf" },
      ] },
      { title: "班制、語言與費用年份", details: [
        { label: "舊校舍班級資料", value: "校方 2025/26 班級頁列 K1–K3 半日制，上午及下午每級各三班，每班 30 人，師生比例 1:8；這是頁面標示年度及當時校址的資料，不可直接當作新校舍編制。", period: "2025/26；銅鑼灣校址", sourceUrl: SKH_KG_CLASSES },
        { label: "正式學費與預算分開", value: "校方列 2025/26 年費 HK$71,830。2026/27 家長簡介會曾按新校舍成本預計年費約 HK$90,000–120,000，該數字不是核准費用；應向校方索取最新正式收費證明。", period: "正式收費：2025/26；預計：2026/27", sourceUrl: "https://www.skhkg.edu.hk/wp-content/uploads/2025/09/2026-27%E5%B9%B4%E5%BA%A6%E7%94%B3%E8%AB%8B%E4%BA%BA%E5%AE%B6%E9%95%B7%E7%B0%A1%E4%BB%8B%E6%9C%83%E7%B6%B2%E4%B8%8A%E5%88%8A%E7%99%BB-%E7%B9%81.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "mong-kok-agnes-english-kindergarten-516929",
    name: "旺角雅麗斯英文幼稚園",
    nameEn: "Mong Kok Agnes English Kindergarten",
    district: "油尖旺區",
    address: "九龍旺角亞皆老街 5 號地下至 2 樓",
    telephone: "+852 2390 9988",
    schoolNumber: "516929 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "2026/27 半日班免費；其他代辦費用以當屆校方通告為準",
    language: "《幼稚園概覽 2026/27》列英語；不代表全天以英語授課",
    gradeSpan: "K1–K3；上午及下午班，沒有全日班",
    website: "http://www.mkagneskg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；教學特色引用 2023/24 校方提交資料",
    sourceNote: "教育局校號 516929、校址 0001 對應旺角亞皆老街校舍；概覽列上午、下午班，授課語言英語及師生比例 1:8.8。學校網頁目前未能穩定讀取，因此課程特色只採用校方提交教育局的 2023/24 資料，不能視作現行課堂細節。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：旺角雅麗斯英文幼稚園校址 0001", scope: "校址、班制、概覽語言、師生比例及教育計劃學費。", url: KGP_MK_AGNES },
      { label: "教育局《幼稚園概覽 2025/26》：旺角雅麗斯英文幼稚園", scope: "截至 2024 年 9 月的課室容量、教職員及在讀人數等年度資料。", url: KGP_MK_AGNES_2025 },
      { label: "校方提交教育局的學校資料（2023/24）", scope: "課程理念、低班書寫及操練安排、體驗活動；歷史資料。", url: KGP_MK_AGNES_2023 },
    ],
    detailSections: [
      { title: "課程方向與家庭觀察", featured: true, note: "以下課程細節來自 2023/24 校方提交資料；現屆做法宜向學校索取課程簡介。", details: [
        { label: "低班減少抄寫操練", value: "校方當年表示依《幼稚園課程指引》規劃課程，不要求 K1 幼兒執筆寫字，也不安排機械式抄寫或操練式計算。這適合重視遊戲和發展節奏的家庭；家長仍應了解 K2、K3 的書寫與升小銜接如何逐步安排。", period: "校方提交資料：2023/24", sourceUrl: KGP_MK_AGNES_2023 },
        { label: "體驗式學習", value: "校方資料提及新生適應、社區合作及參觀小學、科學館和超級市場等體驗活動。這些例子可幫助家長理解課程如何連接生活，但未能據此確認每年活動次數或現屆行程。", period: "校方提交資料：2023/24", sourceUrl: KGP_MK_AGNES_2023 },
      ] },
      { title: "班制與語言資料", details: [
        { label: "半日班為主", value: "2026/27 概覽列上午及下午班，沒有全日班；師生比例 1:8.8 是概覽統計，不等同固定每班人數。", period: "2026/27；比例依概覽統計年度", sourceUrl: KGP_MK_AGNES },
        { label: "英語欄位的含義", value: "概覽授課語言欄列英語，學校英文名稱亦含 English；公開資料沒有列出每日英語、粵語和普通話各自課時，因此不應把它解讀成全天全英語環境。", period: "2026/27", sourceUrl: KGP_MK_AGNES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "may-nga-kindergarten-branch-325775",
    name: "美雅幼稚園（分校）",
    nameEn: "May Nga Kindergarten (Branch)",
    district: "九龍城區",
    address: "教育局位置資料列下鄉道 89 號及 91 號兩個登記校址；校方分校資料以 89 號地下為主",
    telephone: "+852 2764 7319",
    schoolNumber: "325775 / 校址 0002；另有校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "半日班免費；全日班膳食及核准費用須按當屆收費表確認",
    language: "《幼稚園概覽 2026/27》校址 0002 列粵語；沒有公開逐語言課時",
    gradeSpan: "PN、K1–K3；概覽校址 0002 列上午、下午及全日班",
    website: "https://www.maynga.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；容額與預計 K1 收生數據來自校方 2025/26 學校資料",
    sourceNote: "校號 325775 下有兩個教育局登記校址；本頁詳述的是校方資料所稱分校，不能將正校班額或費用混入。校方 2025/26 文件列分校總容額及當年預計 K1 收生數，均屬該學年計劃值，不是現屆空缺或保證錄取名額。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：美雅幼稚園（分校）校址 0002", scope: "PN、班制、概覽語言、師生比例和教育計劃資料。", url: KGP_MAYNGA_BRANCH },
      { label: "美雅幼稚園：2025/26 分校學校資料", scope: "分校校址、班級總容額及當屆預計 K1 收生數；不代表下一屆名額。", url: "https://www.maynga.edu.hk/download/pdf/2026-2027/25-26%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99%28%E5%8A%A0%E7%B6%B2%E9%A0%81%29.pdf" },
      { label: "美雅教育機構：學校及課程入口", scope: "校方官方網站及分校資訊索引；具體課程頁未標明校址時不外推。", url: MAYNGA_HOME },
    ],
    detailSections: [
      { title: "分校班制與名額邊界", featured: true, note: "只把校方明確標示為分校的資料放在本節；年度計劃數字不能當成下一屆錄取名額。", details: [
        { label: "PN 至 K3 班制", value: "《幼稚園概覽 2026/27》校址 0002 列 PN、上午、下午及全日班，授課語言粵語，師生比例 1:8.3。全日班可提供照顧時段選擇，但家庭需另核實膳食、延展照顧及全日費用。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_MAYNGA_BRANCH },
        { label: "2025/26 分校容額與預計 K1 收生", value: "校方文件列分校上午班、下午班、全日班總容額分別為 120、120、100；當年預計 K1 收生為上午 85、下午 45、全日 35。這是 2025/26 文件中的預計數，不能推作 2026/27 或 2027/28 的空缺。", period: "2025/26 學校資料", sourceUrl: "https://www.maynga.edu.hk/download/pdf/2026-2027/25-26%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99%28%E5%8A%A0%E7%B6%B2%E9%A0%81%29.pdf" },
      ] },
      { title: "校址及申請前核對", details: [
        { label: "同校號下有兩個校址", value: "教育局位置資料列 0001 與 0002；校方文件把 0002 所在的下鄉道校舍稱作分校，並載有 89 號地下及 89–91 號樓層資料。報名前應確認幼兒所屬校址、上課樓層及接送點。", sourceUrl: "https://www.maynga.edu.hk/download/pdf/2026-2027/25-26%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99%28%E5%8A%A0%E7%B6%B2%E9%A0%81%29.pdf" },
        { label: "課程資訊按校址核實", value: "辦學團體網站列有課程特色及中華文化活動，但頁面並非每項都標出校址或年級。本頁不把未註明分校的活動頻率、語言比例或升小結果當作分校承諾。", sourceUrl: MAYNGA_HOME },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hhckla-buddhist-wai-kwong-ming-wai-kindergarten-158720",
    name: "香海正覺蓮社佛教慧光明慧幼稚園",
    nameEn: "HHCKLA Buddhist Wai Kwong Ming Wai Kindergarten",
    district: "北區",
    address: "新界粉嶺華明邨禮明樓地下",
    telephone: "+852 2677 0813",
    schoolNumber: "158720 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "佛教",
    tuition: "半日班免費；全日班及代辦費用按校方當屆收費表",
    language: "《幼稚園概覽 2026/27》列粵語；校方列英語活動，未公布各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.bwkk.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方現行網站於 2026-10 查閱",
    sourceNote: "教育局目錄與校方網站校址均對應粉嶺華明邨校舍。教育局資料的中文名稱較短，校方現行網站使用「香海正覺蓮社佛教慧光明慧幼稚園」全名；本頁採用校方全名。班制、語言及師生比例以校址 0001 的 2026/27 概覽為準。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：校號 158720、校址 0001", scope: "班制、授課語言、師生比例及教育計劃費用欄。", url: KGP_BUDDHIST_WKM },
      { label: "佛教慧光明慧幼稚園：辦學宗旨及校舍簡介", scope: "校方對辦學理念、學習空間及設施用途的描述。", url: "https://www.bwkk.edu.hk/學校簡介" },
      { label: "佛教慧光明慧幼稚園：課程特色", scope: "校方列出的課程範疇和活動方向，不代表每日課時或每名學生均參加。", url: BUDDHIST_WKM_CURRICULUM },
    ],
    detailSections: [
      { title: "佛化教育與體驗學習", featured: true, note: "課程及設施資訊由校方自述；參觀時可確認實際使用方式和各級安排。", details: [
        { label: "品格與自主探索", value: "校方把教育目標表述為品格與智慧啟蒙，並以佛化教育及慈悲精神支持全人發展。對家庭而言，關鍵不是宗教標籤本身，而是了解日常故事、儀式和品格活動如何融入幼兒生活，以及家庭是否認同這種價值教育。", sourceUrl: "https://www.bwkk.edu.hk/" },
        { label: "操作、探索與同儕合作", value: "校方稱重視體驗式學習，透過實際操作、探索及同儕互動培養溝通、解難和社交能力；課程頁另列 5E 數學探究、科學實驗、英語活動、奧福音樂、視覺藝術及體能課程。公開頁沒有列各活動的每週節數。", sourceUrl: BUDDHIST_WKM_CURRICULUM },
        { label: "校舍空間供觀察", value: "校方介紹閱讀花園、攀爬牆、LEGO 探索區、STEM 牆、藝術科探室和創意區角。設施清單不能單獨證明使用頻率；家長可在參觀時詢問幼兒何時使用、是否按年級輪用。", sourceUrl: "https://www.bwkk.edu.hk/學校簡介" },
      ] },
      { title: "班制與語言資料", details: [
        { label: "時段及師生比例", value: "概覽校址 0001 列上午、下午及全日班，師生比例 1:9.9；比例為整體統計，不是每班固定人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_BUDDHIST_WKM },
        { label: "粵語欄位與英語活動", value: "教育局概覽授課語言欄列粵語；校方課程頁列多元英語活動。兩者沒有提供完整語言時數，不能推算英語沉浸程度或普通話安排。", period: "2026/27 概覽；校方課程頁查閱於 2026-10", sourceUrl: KGP_BUDDHIST_WKM },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "creative-anglo-chinese-kindergarten-ma-on-shan-627178",
    name: "啟思中英文幼稚園（馬鞍山）",
    nameEn: "Creative Anglo-Chinese Kindergarten (Ma On Shan)",
    district: "沙田區",
    address: "新界沙田馬鞍山中心 A1–A 舖及 2 樓",
    telephone: "+852 3585 6706",
    schoolNumber: "627178 / 校址 0001",
    schoolType: "私立幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "半日班、全日班學費以 2026/27 校方正式收費表為準；目前可讀網站資料有較早年度費用，不作現行報價",
    language: "《幼稚園概覽 2026/27》列英語；這不是逐科語言比例",
    gradeSpan: "PN、K1–K3；上午、下午及全日班",
    website: "https://creative.edu.hk/ckmos/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方學校介紹現行頁面於 2026-10 查閱",
    sourceNote: "本頁只對應啟思中英文幼稚園（馬鞍山）校址 0001，不把其他啟思校舍的班制或收費合併。校方現行介紹聚焦自然、藝術及感官探索；網站另有較舊費用資料，故不將舊數字當作 2026/27 學費。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：啟思中英文幼稚園（馬鞍山）", scope: "校址、PN、班制、概覽授課語言及教育計劃資料。", url: KGP_CREATIVE_MOS },
      { label: "啟思幼稚園：馬鞍山校介紹與校園特色", scope: "馬鞍山校舍、植物區、小菜園、魚菜共生、藝術與多感官探索；校方自述。", url: "https://creative.edu.hk/eng/ckmos/" },
      { label: "啟思幼稚園：課程特色", scope: "辦學團體課程方向；未逐項標示校址時不推定馬鞍山校每週課時。", url: "https://creative.edu.hk/curriculum/" },
    ],
    detailSections: [
      { title: "自然、藝術與自主探索", featured: true, note: "以下特色按校方馬鞍山校介紹整理；不將辦學團體的共通課程細節推定為該校固定課時。", details: [
        { label: "把自然環境放進學習", value: "校方介紹馬鞍山校設室外植物區、小菜園及魚菜共生，讓幼兒接觸植物生長、環保和食物來源。這類環境有助把觀察帶回課堂；家長可問清楚幼兒實際參與種植及照料的頻率。", sourceUrl: "https://creative.edu.hk/eng/ckmos/" },
        { label: "藝術及多感官活動", value: "校方列名畫欣賞、自由創作藝術廊、觸感牆和音樂互動等空間與活動，呈現藝術及感官探索取向。參觀時可留意作品是否由幼兒自主創作、教師如何引導，而不只看展示效果。", sourceUrl: "https://creative.edu.hk/eng/ckmos/" },
        { label: "課程方向不等於語言比例", value: "概覽授課語言欄列英語，校方把學校定位為中英文幼稚園；兩項資料均未披露每日各語言課時。若家庭重視英語輸入，應索取校址 0001 現屆時間表。", sourceUrl: KGP_CREATIVE_MOS },
      ] },
      { title: "班制及收費核對", details: [
        { label: "PN 至 K3 與時段", value: "《幼稚園概覽 2026/27》校址 0001 列 PN、上午、下午及全日班。全日班服務時段和膳食安排應直接向馬鞍山校查詢。", period: "2026/27", sourceUrl: KGP_CREATIVE_MOS },
        { label: "不要沿用舊收費", value: "校方網頁可搜尋到的詳細學費表標示 2021/22 學年，已不足以作本年度預算。報名前應取得 2026/27 正式費用及代辦項目清單。", period: "舊表：2021/22；現屆費用待校方確認", sourceUrl: "https://creative.edu.hk/eng/ckmos/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-church-of-christ-in-china-chuen-yuen-kindergarten-559962",
    name: "中華基督教會全完幼稚園",
    nameEn: "The Church of Christ in China Chuen Yuen Kindergarten",
    district: "葵青區",
    address: "新界葵涌葵涌邨商場 3 樓平台 4 號單位",
    telephone: "+852 2401 1899",
    schoolNumber: "559962 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "半日班免費；全日班及膳食費用按校方當屆收費表",
    language: "《幼稚園概覽 2026/27》列粵語；未公布語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.ccccyk.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；學校報告 2023/24；校方課程頁查閱於 2026-10",
    sourceNote: "教育局校號 559962、校址 0001 對應葵涌邨校舍。校方以全人發展、關懷及共融為辦學方向，課程頁強調遊戲、生活經驗、兒童中心及照顧學習差異；2023/24 報告中的活動數據只代表該年度。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：中華基督教會全完幼稚園", scope: "班制、授課語言、師生比例及教育計劃費用欄。", url: KGP_CHUEN_YUEN },
      { label: "中華基督教會全完幼稚園：課程介紹", scope: "遊戲、兒童中心、真實生活經驗、共融及升小銜接方向。", url: CHUEN_YUEN_CURRICULUM },
      { label: "中華基督教會全完幼稚園：2023/24 學校報告", scope: "當年度科學探索、品格及校園活動案例；非現屆課時或成效保證。", url: CHUEN_YUEN_REPORT_2023_24 },
    ],
    detailSections: [
      { title: "遊戲學習與全人關懷", featured: true, note: "課程頁為校方現行自述；具體活動例子另標示年度。", details: [
        { label: "從遊戲和生活經驗建構學習", value: "校方課程頁表示以兒童為中心，重視愉快遊戲、真實生活經驗及自由探索，並把生活與藝術連結以發展創意。這種安排重視幼兒參與過程；家長可觀察老師如何把遊戲延伸到語文、數概念和表達。", sourceUrl: CHUEN_YUEN_CURRICULUM },
        { label: "照顧差異及升小銜接", value: "學校表示會按有特殊教育需要幼兒調整教學方法和內容，並與小學連繫資源、設施及環境，協助 K3 過渡至小一。公開頁未說明個別支援的名額或服務時數，宜按孩子需要與校方逐項討論。", sourceUrl: CHUEN_YUEN_CURRICULUM },
        { label: "課室內的科學探索案例", value: "2023/24 學校報告記錄「水、風、光與影」主題，幼兒透過觀察、操作和簡單實驗接觸預測及記錄；這是當年案例，不代表每年原樣重複。", period: "2023/24", sourceUrl: CHUEN_YUEN_REPORT_2023_24 },
      ] },
      { title: "班制與日常安排", details: [
        { label: "班制及比例", value: "概覽校址 0001 列上午、下午及全日班，師生比例 1:10.8。比例是整體統計，不是單一課室師生數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_CHUEN_YUEN },
        { label: "活動與升小資訊分年度閱讀", value: "校方網站列有體驗活動和小一派位資料，但報告、活動記錄及派位頁各自涵蓋不同年度。查看升小去向時，需先確認年級、年份及分母，不能把個別錄取例子理解成升學率。", sourceUrl: "https://www.ccccyk.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chinese-y-m-c-a-kindergarten-541230",
    name: "中華基督教青年會幼稚園（天水圍）",
    nameEn: "Chinese Y.M.C.A. Kindergarten",
    district: "元朗區",
    address: "新界天水圍天悅邨服務設施大樓 2 樓幼稚園",
    telephone: "+852 2445 2320",
    schoolNumber: "541230 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "2025/26 半日班免費；全日班全年 HK$11,000（概覽列示）；新學年費用以校方最新通告為準",
    language: "《幼稚園概覽 2026/27》列粵語；不推算英語或普通話課時比例",
    gradeSpan: "PN、K1–K3；上午及全日班為主，當屆安排以校方通告為準",
    website: "https://www.tswcymca.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；班額、師資及學費引用《幼稚園概覽 2025/26》（2024-09 統計）；現屆班制引用《概覽》2026/27",
    sourceNote: "教育局校號 541230、校址 0001 對應天水圍天悅邨校舍。2025/26 概覽載 2024 年 9 月課室容額 145、註冊課室 7、教職員 12 人及全日班收費；這些是歷史年度統計，不能當成當前入學空缺。校方網頁與 YMCA 服務目錄用於核對學校身份及地址。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：中華基督教青年會幼稚園校址 0001", scope: "現行概覽中的班制、授課語言、師生比例及教育計劃資料。", url: KGP_YMCA_TSW },
      { label: "教育局《幼稚園概覽 2025/26》：中華基督教青年會幼稚園校址 0001", scope: "截至 2024 年 9 月的容額、班數、教職員、在讀人數與 2025/26 費用。", url: YMCA_TSW_KGP_2025 },
      { label: "香港中華基督教青年會：學校服務", scope: "辦學團體幼稚園服務與學校資訊入口。", url: YMCA_TSW_PARENT },
    ],
    detailSections: [
      { title: "規模資料與家庭核對重點", featured: true, note: "容量、師資與費用是 2025/26 歷史快照；面見前應索取新年度資料。", details: [
        { label: "校舍與班額快照", value: "教育局 2025/26 概覽列 7 間註冊課室、2024 年 9 月課室總容額 145 人、教職員 12 人；在讀人數為上午 59 人、全日 82 人。這些數字描繪當時規模，不等於 2026/27 可招收名額。", period: "統計截至 2024-09；刊於 2025/26 概覽", sourceUrl: YMCA_TSW_KGP_2025 },
        { label: "上午與全日安排", value: "2025/26 概覽顯示當年上午及全日班有在讀學生，下午班為零；2026/27 概覽須以當屆公開班制為準。若需要全日照顧，應確認新學年是否開班、放學時間及膳食費用。", period: "在讀班別：2024-09 統計", sourceUrl: YMCA_TSW_KGP_2025 },
      ] },
      { title: "課程方向、語言及支援", details: [
        { label: "愛的教育與主題活動", value: "教育局 2025/26 概覽所載校方資料以基督教精神、品格和全人教育為方向，並以主題活動及設計活動啟發幼兒；校方亦表示重視幼兒閱讀和探索。這是校方申報的課程描述，不是外部成效評估。", period: "校方申報：2025/26", sourceUrl: YMCA_TSW_KGP_2025 },
        { label: "母語基礎及英普興趣活動", value: "同一份校方資料稱以母語為基礎，配合英語及普通話興趣活動，並透過合作學習和同伴討論培養思考。沒有公布各語言每週節數，家長可索取現屆時間表確認實際輸入。", period: "校方申報：2025/26", sourceUrl: YMCA_TSW_KGP_2025 },
        { label: "概覽授課語言", value: "2026/27 概覽授課語言欄列粵語；欄位沒有提供英語或普通話每週課時，也不能據此判斷幼兒實際接觸語言的強度。", period: "2026/27", sourceUrl: KGP_YMCA_TSW },
        { label: "家校及非華語支援", value: "2025/26 概覽記錄新生適應、小一銜接、個別轉介、家訪、駐校社工與家長小組，也載有非華語學生中文支援安排。這些是學校申報服務項目；個別幼兒可用服務、時數及轉介程序需直接查詢。", period: "2025/26 概覽", sourceUrl: YMCA_TSW_KGP_2025 },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "ching-chung-yu-nga-kindergarten-520144",
    name: "青松裕雅幼稚園",
    nameEn: "Ching Chung Yu Nga Kindergarten",
    district: "離島區",
    address: "新界東涌裕雅苑雅盛閣地下",
    telephone: "+852 2885 9168",
    schoolNumber: "520144 / 校址 0002",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "道教",
    tuition: "半日班免費；全日班及代辦費用按校方當屆收費表",
    language: "《幼稚園概覽 2026/27》列粵語；未公布各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.ccynkg.edu.hk/background",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；教學方向引用校方提交教育局的 2023/24 概覽資料",
    sourceNote: "本頁按教育局校號 520144、校址 0002 配對東涌裕雅苑校舍。校方網站背景頁未能提供完整可讀課程文字，因此課程細節採用 2023/24 教育局校方資料並標明年度，不當作現屆時間表或活動保證。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：青松裕雅幼稚園校址 0002", scope: "班制、授課語言、師生比例及教育計劃資料。", url: KGP_QINGSUNG_YUNGA },
      { label: "教育局《幼稚園概覽》校方提交資料（2023/24）：青松裕雅幼稚園校址 0002", scope: "校方當時提交的課程理念及教學安排；歷史資料。", url: QINGSUNG_YUNGA_KGP_2023 },
      { label: "青松裕雅幼稚園：學校背景", scope: "官方學校背景頁；文字內容無法完整讀取，故不據此推斷課程細節。", url: QINGSUNG_YUNGA_HOME },
    ],
    detailSections: [
      { title: "課程理念與年期邊界", featured: true, note: "可讀的校方課程細節來自 2023/24 學校資料；年度更新狀態未明。", details: [
        { label: "兒童中心與多元活動", value: "校方 2023/24 教育局資料以兒童為中心，描述透過多元活動和遊戲建構學習，並以愉快學習、全人發展及培養獨立思考作方向。家長可詢問現屆課程是否保留相同設計，以及各級如何呈現幼兒的學習進度。", period: "校方資料：2023/24", sourceUrl: QINGSUNG_YUNGA_KGP_2023 },
        { label: "不要把語言活動當成課時承諾", value: "教育局概覽授課語言欄列粵語；校方歷史資料對課程的介紹不構成英語或普通話每週課時證明。需要語言比例時，應向學校索取當屆時間表。", period: "概覽：2026/27；課程資料：2023/24", sourceUrl: KGP_QINGSUNG_YUNGA },
      ] },
      { title: "班制與比例", details: [
        { label: "上午、下午及全日班", value: "概覽校址 0002 列 K1–K3 上午、下午及全日班，師生比例 1:11.1。全日班服務、膳食及實際開班級別應按當屆安排確認。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_QINGSUNG_YUNGA },
        { label: "全日班費用核對", value: "半日班按幼稚園教育計劃免費資料列示；全日班費用與代辦項目應以校方最新核准收費表為準，不以歷史資料推算。", period: "2026/27", sourceUrl: KGP_QINGSUNG_YUNGA },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "po-leung-kuk-thomas-liu-lit-ching-kindergarten-158623",
    name: "保良局廖烈正幼稚園",
    nameEn: "Po Leung Kuk Thomas Liu Lit Ching Kindergarten",
    district: "屯門區",
    address: "新界屯門菁田邨菁喜樓地下",
    telephone: "+852 2455 0445",
    schoolNumber: "158623 / 校址 0002",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "半日班免費；全日班全年學費及膳食費按當屆教育局概覽與校方收費表核對",
    language: "《幼稚園概覽 2026/27》列粵語；校方未公布逐語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.plkkgs.edu.hk/plktllckg/hk",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方活動計劃 2025/26；課程原則引用教育局校方資料 2023/24",
    sourceNote: "此校址為屯門菁田邨校舍，不與保良局其他幼稚園混用。校方現行網站以玩樂中的自主自強、關愛共融為定位，並公布 2025/26 課室外體驗式學習計劃；課程細節引用校方提交教育局的 2023/24 資料，故保留年度界線。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：校號 158623、校址 0002", scope: "班制、授課語言、師生比例及教育計劃資料。", url: KGP_PLK_TLLC },
      { label: "保良局廖烈正幼稚園：校本課程及 2025/26 體驗學習計劃", scope: "課程與課室外體驗活動的官方入口；各活動以計劃頁為準。", url: PLK_TLLC_ACTIVITIES },
      { label: "教育局《幼稚園概覽》校方提交資料（2023/24）", scope: "校本課程、學習範疇、遊戲及幼兒自主方向；歷史資料。", url: PLK_TLLC_CURRICULUM_2023 },
      { label: "保良局廖烈正幼稚園：學校首頁及招生資訊", scope: "最新學校身份、辦學表述、地址及招生公告索引。", url: PLK_TLLC_HOME },
    ],
    detailSections: [
      { title: "玩樂中的自主與體驗學習", featured: true, note: "校方宣傳定位與歷史課程資料已分開；家長可向校方確認現屆實施細節。", details: [
        { label: "自主自強與共融", value: "校方以「締造關愛共融的校園文化，使孩子能於玩樂中自主自強」概括教育取向。這個定位適合重視遊戲和自主性的家庭；參觀時可觀察教師如何在自由活動與明確學習目標之間取得平衡。", sourceUrl: PLK_TLLC_HOME },
        { label: "課程與幼兒發展", value: "校方提交教育局的 2023/24 資料描述本地課程、遊戲和生活化學習，涵蓋不同學習範疇並避免以機械操練作主要教學方式。這是當年資料；若家長重視書寫、數概念或升小準備，宜了解 K2 至 K3 的漸進安排。", period: "校方資料：2023/24", sourceUrl: PLK_TLLC_CURRICULUM_2023 },
        { label: "課室外體驗及支援", value: "校方網站列 2025/26 體驗式學習計劃，也設有非華語學童支援、駐校社工及家校支援資訊。實際活動名額、服務對象和安排需按最新計劃及個別需要向校方確認。", period: "2025/26", sourceUrl: PLK_TLLC_ACTIVITIES },
      ] },
      { title: "班制與入學資訊", details: [
        { label: "概覽班制", value: "教育局概覽校址 0002 列上午、下午及全日班，授課語言粵語，師生比例 1:10.5。比例是整體統計，不代表每班人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_PLK_TLLC },
        { label: "申請流程每年更新", value: "校方已公布 2027/28 新生申請資訊及 2026/27 K1–K3 新生招生消息。每屆收生時程、面見形式及名額均可能變動，應直接查看校方當屆公告，不沿用舊申請表日期。", period: "校方網站於 2026-10 查閱", sourceUrl: PLK_TLLC_HOME },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "fu-heng-baptist-lui-kwok-pat-fong-kindergarten-158909",
    name: "富亨浸信會呂郭碧鳳幼稚園",
    nameEn: "Fu Heng Baptist Lui Kwok Pat Fong Kindergarten",
    district: "大埔區",
    address: "新界大埔富亨邨亨泰樓第 1 座地下",
    telephone: "+852 2660 8128",
    schoolNumber: "158909 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "半日班免費；全日班、膳食及代辦費用以當屆正式收費表為準",
    language: "《幼稚園概覽 2026/27》列粵語；未公布各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.fuhengkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09-30；《幼稚園概覽》2026/27；校方辦學理念與招生資料查閱於 2026-10",
    sourceNote: "教育局校號 158909、校址 0001 對應大埔富亨邨校舍。校方自述以基督教關愛、探索學習、創意思維及同儕關係為教育方向；2026/27 招生頁列全年接受申請及面見安排，但收生仍受學位限制，不代表申請者必獲錄取。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：富亨浸信會呂郭碧鳳幼稚園", scope: "校址、班制、授課語言、師生比例及教育計劃資料。", url: FU_HENG_PROFILE },
      { label: "富亨浸信會呂郭碧鳳幼稚園：校長心聲", scope: "校方辦學理念、探索學習、創意思維及同儕關係自述。", url: FU_HENG_PRINCIPAL },
      { label: "富亨浸信會呂郭碧鳳幼稚園：2026/27 入學申請", scope: "該屆申請時程、面見、優先考慮與全日班家庭安排；不構成錄取承諾。", url: FU_HENG_ADMISSION_2026 },
    ],
    detailSections: [
      { title: "基督教關懷與探索學習", featured: true, note: "辦學目標為校方自述；收生標準不代表錄取保證。", details: [
        { label: "以探索引發學習", value: "校長介紹學校以基督的愛服務區內家庭，並透過適切課程引發探索精神、創意思維和良好同儕關係。這給家長一個可觀察的方向：孩子是否有機會提問、動手嘗試並與同伴合作，而非只接受教師講解。", sourceUrl: FU_HENG_PRINCIPAL },
        { label: "家校合作與品格教育", value: "校方亦強調家長合作、尊重接納及建立正確價值觀。若家庭認同基督教辦學背景，可進一步了解宗教活動如何融入日常，以及學校如何與不同信仰背景家庭溝通。", sourceUrl: FU_HENG_PRINCIPAL },
      ] },
      { title: "班制與招生核對", details: [
        { label: "班制及師生比例", value: "概覽校址 0001 列上午、下午及全日班，師生比例 1:11.6；比例為全校統計，不能視為每班師生數。", period: "2026/27；比例按概覽統計年度", sourceUrl: FU_HENG_PROFILE },
        { label: "全年接受申請不代表全年有位", value: "校方 2026/27 招生安排表示全年派表並面見申請兒童，收生不按遞表先後；同時列明學位有限，家庭背景等只屬優先考慮因素。申請前應確認該年度剩餘學額及結果通知安排。", period: "2026/27 招生安排", sourceUrl: FU_HENG_ADMISSION_2026 },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "first-assembly-of-god-kindergarten-133779",
    name: "神召第一幼稚園",
    nameEn: "First Assembly of God Kindergarten",
    district: "九龍城區",
    address: "九龍亞皆老街 123 號",
    telephone: "+852 2713 2395",
    schoolNumber: "133779 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "2026/27 半日班免費；全日班學費以校方最新核准收費表為準",
    language: "《幼稚園概覽 2026/27》列粵語；未公開各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://faogkg.edu.hk/",
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；課程方向按校方現行網頁",
    sourceNote: "校號 133779、校址 0001 對應亞皆老街校舍。教育局概覽列粵語及半日免費；校方以基督教教育、蒙特梭利、自主探索及生活化學習介紹課程。學校理念屬校方自述，實際每日語言比例及活動安排未公開。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：神召第一幼稚園校址 0001", scope: "班制、授課語言、師生比例及幼稚園教育計劃資料。", url: KGP_FAOG },
      { label: "神召第一幼稚園：教學理念", scope: "基督教教育、品德、大自然科學探索及多元活動的校方表述。", url: FAOG_PHILOSOPHY },
      { label: "神召第一幼稚園：課程簡介", scope: "校本課程及蒙特梭利教學等學校自述；不代表逐日課時。", url: FAOG_CURRICULUM },
    ],
    detailSections: [
      { title: "信仰、探索與課程取向", featured: true, note: "以下理念與教學方式為校方公開自述；實際課程時間及各班安排未見公開。", details: [
        { label: "基督教教育與品格培育", value: "校方以聖經課程為基礎，並把自律、尊重、溝通和關愛列為培育方向。對家庭而言，選校時應同時考慮是否認同宗教教育，以及學校如何讓不同信仰背景的家長理解日常宗教活動。", sourceUrl: FAOG_PHILOSOPHY },
        { label: "蒙特梭利與主動操作", value: "校方介紹以蒙特梭利教具和親身操作引導幼兒由具體經驗走向抽象理解，並配合主題、繪本和方案教學。這種安排較重視幼兒探索與表達；家長參觀時可觀察教師如何給予選擇，同時維持清晰的學習秩序。", sourceUrl: FAOG_CURRICULUM },
        { label: "科學與生活連結", value: "學校稱透過科學遊戲、主題和生活經驗發展好奇心及實踐能力。公開資料沒有列明活動頻率或每級課時，不宜把課程理念解讀成固定的實驗課安排。", sourceUrl: FAOG_PHILOSOPHY },
      ] },
      { title: "班制與資料核對", details: [
        { label: "概覽班制與師生比例", value: "教育局概覽校址 0001 列上午、下午及全日班，授課語言為粵語，師生比例 1:11.7。比例是概覽統計，不等同每班固定人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_FAOG },
        { label: "半日班與全日班收費分開看", value: "半日班列入幼稚園教育計劃免費安排；全日班實際學費、膳食及代辦項目應按校方當屆核准收費表確認。", period: "2026/27", sourceUrl: KGP_FAOG },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "po-leung-kuk-kam-hing-kindergarten-325821",
    name: "保良局金卿幼稚園",
    nameEn: "Po Leung Kuk Kam Hing Kindergarten",
    district: "黃大仙區",
    address: "九龍鑽石山鳳德邨鳳鑽苑地下",
    telephone: "+852 2322 0133",
    schoolNumber: "325821 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "2026/27 半日班免費；全日班費用以校方當屆收費表為準",
    language: "《幼稚園概覽 2026/27》列粵語；未公開各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.plkkgs.edu.hk/plkkhkg/",
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；課程按校方現行網頁",
    sourceNote: "校號 325821、校址 0001 對應鳳德邨校舍。校方以兒童為本、遊戲與探索為核心，並介紹高廣度教學、全語文活動及正向教育；這些是校方課程描述，不能直接推定每級課時或學習成果。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：保良局金卿幼稚園校址 0001", scope: "班制、粵語、師生比例及教育計劃資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3258210001" },
      { label: "保良局金卿幼稚園：課程目標與架構", scope: "兒童為本、遊戲學習、六大學習範疇及校本課程特色。", url: PLK_KAM_HING_CURRICULUM },
      { label: "保良局金卿幼稚園：學校首頁", scope: "高廣度教學、全語文、遊戲教學及正向教育的校方介紹。", url: PLK_KAM_HING_HOME },
    ],
    detailSections: [
      { title: "兒童本位與遊戲探索", featured: true, note: "課程名稱和特色按校方現行介紹；公開網頁未列各級實際課時。", details: [
        { label: "由遊戲和興趣帶動學習", value: "學校把「兒童為本」列為課程核心，重視幼兒的發展差異，並以遊戲、生活化主題和自由探索組織學習。這類安排讓孩子有機會從興趣出發，但家長應了解教師如何把探索延伸到語文、數學和小學銜接，而不只看活動是否熱鬧。", sourceUrl: PLK_KAM_HING_CURRICULUM },
        { label: "高廣度、全語文與正向教育", value: "校方首頁把高廣度教學、全語文活動、遊戲教學及正向教育列為課程特色，並以自主探索、解難和接受挑戰描述學習目標。這些是校方的課程定位；家長可進一步詢問教師如何記錄孩子進度，以及如何向家庭提供具體回饋。", sourceUrl: PLK_KAM_HING_HOME },
        { label: "均衡發展而非單一操練", value: "校方課程架構涵蓋語文、幼兒數學、大自然與生活、藝術、體能及個人群體等範疇。若家庭重視提早書寫或學科操練，宜先比較學校公開的課程目標與孩子目前需要，並詢問 K2、K3 的升小準備方式。", sourceUrl: PLK_KAM_HING_CURRICULUM },
      ] },
      { title: "班制與收費邊界", details: [
        { label: "概覽班制與比例", value: "教育局概覽校址 0001 列上午、下午及全日班，授課語言為粵語，師生比例 1:13.1。比例為全校統計，不代表每班人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3258210001" },
        { label: "計劃資助不等於全日免費", value: "半日班按幼稚園教育計劃列為免費；全日班學費、膳食和代辦費需以學校當屆收費資料核對，不能從半日資助推算全日家庭支出。", period: "2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3258210001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "po-leung-kuk-yip-ng-bun-bun-queen-s-hill-kindergarten-516384",
    name: "保良局葉吳彬彬皇后山幼稚園",
    nameEn: "Po Leung Kuk Yip Ng Bun Bun Queen's Hill Kindergarten",
    district: "北區",
    address: "新界粉嶺皇后山邨皇順樓平台",
    telephone: "+852 2669 9813",
    schoolNumber: "516384 / 校址 0002",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "2026/27 半日班免費；全日班 HK$1,175／月，另膳食費 HK$563／月（各繳 10 個月）",
    language: "校方以粵語為主要教學語言，另安排英語及普通話活動；未公布逐語言課時",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/",
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；收費 2026/27；課程方向按校方現行網頁",
    sourceNote: "校號 516384、校址 0002 對應皇后山邨校舍。此校承接保良局戴蘇小韞幼稚園的校史，校方資料稱 1995 年創立；授課安排、現校址和費用以皇后山校舍資料為準。校方的課程及語言描述不等於每日固定課時。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：皇后山校址 0002", scope: "新校址班制、概覽語言、師生比例及教育計劃資料。", url: KGP_PLK_QUEENS_HILL },
      { label: "保良局葉吳彬彬皇后山幼稚園：學校簡介及課程", scope: "校史、課程理念、語言活動及教材支援的校方自述。", url: PLK_QUEENS_HILL_ABOUT },
      { label: "保良局葉吳彬彬皇后山幼稚園：2026/27 收費", scope: "半日班資助後學費、全日班學費及膳食費。", url: PLK_QUEENS_HILL_FEES },
    ],
    detailSections: [
      { title: "體驗學習與語言支援", featured: true, note: "課程與教學細節按校方現行網頁；個別課時及孩子實際進度未公開。", details: [
        { label: "從主題體驗到表達創作", value: "校方介紹以體驗式和主題學習帶動幼兒參與，並把音樂、戲劇和藝術等活動納入課程方向。對喜歡動手、表達和角色扮演的孩子，這種學習形式可能較容易投入；家長可觀察教師如何把活動連回語文、數概念與生活理解。", sourceUrl: PLK_QUEENS_HILL_ABOUT },
        { label: "中、英語教材與家庭延伸", value: "學校稱設計具點讀功能的中英文教材，並提供點讀筆外借服務，讓家庭可配合孩子在家學習。這說明學校有家校延伸工具，但不代表各家庭必須自行承擔相同的語言教學責任；報名前可詢問借用、支援和使用安排。", sourceUrl: PLK_QUEENS_HILL_ABOUT },
        { label: "語言活動與課時界線", value: "校方提及英語及普通話活動，教育局概覽則按授課語言欄列粵語。公開資料沒有列出三種語言每日各佔多少課時，不能把「有英普活動」解讀為雙語或三語沉浸式教學。", period: "概覽 2026/27；校方課程頁現行資料", sourceUrl: KGP_PLK_QUEENS_HILL },
      ] },
      { title: "校址與家庭支出", details: [
        { label: "班制及師生比例", value: "皇后山校址 0002 的概覽列上午、下午及全日班，師生比例 1:10.1；比例是統計值，不是每班人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_PLK_QUEENS_HILL },
        { label: "全日班支出", value: "2026/27 半日班在持有有效幼稚園入學註冊證的條件下免費；全日班每月學費 HK$1,175，另每月膳食費 HK$563，全年各繳 10 個月。比較時要把全日照顧價值與膳食及接送支出一併計入。", period: "2026/27", sourceUrl: PLK_QUEENS_HILL_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "christian-alliance-chen-lee-wing-tsing-kindergarten-yau-tong-523178",
    name: "宣道會陳李詠貞幼稚園幼兒園（油塘）",
    nameEn: "Christian Alliance Chen Lee Wing Tsing Kindergarten & Nursery (Yau Tong)",
    district: "觀塘區",
    address: "九龍油塘欣榮街 131 號高宏苑鯉魚門服務設施大樓一樓",
    telephone: "+852 2952 4488",
    schoolNumber: "523178 / 校址 0002（原秀茂坪校舍已遷往油塘）",
    schoolType: "幼稚園及幼兒園（教育局登記）",
    gender: "男女校",
    gradeSpan: "PN、K1–K3；現行班制及級別須按油塘校舍當屆公告確認",
    website: "https://www.caclwtkg.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09；校方遷校公告 2026-04；課程舊址資料只作歷史參考",
    sourceNote: "校方公告表示已於 2026 年 4 月 13 日遷往油塘，並改用現名；教育局位置資料校址 0002 對應新址。新校舍班制、語言、費用及課程細節須以當屆校方與教育局最新資料確認，本頁不沿用舊址數據冒充新址現況。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：校號 523178、校址 0002", scope: "油塘新校址身份及有公開的校址資料；未列項目不作推算。", url: KGP_CACLWT_YT },
      { label: "宣道會陳李詠貞幼稚園幼兒園（油塘）：遷校公告及校方首頁", scope: "遷校日期、現名、油塘地址及 2026/27 新生安排。", url: CACLWT_YT_HOME },
      { label: "宣道會陳李詠貞幼稚園幼兒園（油塘）：入學申請", scope: "校方入學公告索引；具體日期與班級以當屆通知為準。", url: CACLWT_YT_ADMISSION },
    ],
    detailSections: [
      { title: "遷校後先核對現行安排", featured: true, note: "學校已遷往油塘；舊址課程資料不可直接視作新校舍現況。", details: [
        { label: "新校名與地址", value: "校方公布已於 2026 年 4 月 13 日遷往油塘高宏苑鯉魚門服務設施大樓一樓，並改名為「宣道會陳李詠貞幼稚園幼兒園（油塘）」。家長應以新校址規劃接送，並確認交通、入校安排及實際開課位置。", period: "遷校：2026-04-13", sourceUrl: CACLWT_YT_HOME },
        { label: "幼兒班資料需看當屆公告", value: "2026/27 校方遷校公告提及新校舍招收新生；現有資料顯示校號 523178 曾涉及舊址與新址轉換。PN、K1 至 K3 的實際開班、授課語言和費用需按油塘校舍當屆正式資料確認，不引用舊址比例或學費。", period: "校方公告：2026/27", sourceUrl: CACLWT_YT_ADMISSION },
        { label: "課程特色的證據邊界", value: "校方目前公開頁面以遷校、招生及校園資訊為主，未能核實新校舍現行課程的逐級安排。家庭可在報名時索取新校舍課程簡介，特別詢問 PN 適應、語言使用、全日照顧和升小準備。", sourceUrl: CACLWT_YT_HOME },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "canaan-kindergarten-tsuen-wan-516376",
    name: "迦南幼稚園（荃灣）",
    nameEn: "Cannan Kindergarten (Tsuen Wan)",
    district: "荃灣區",
    address: "新界荃灣海盛路 28 號祈德尊新邨商場一樓 4 號舖",
    telephone: "+852 2411 6833",
    schoolNumber: "516376 / 校址 0001",
    reportSlug: undefined,
    relatedReportSlugs: undefined,
    clearDirectoryReports: true,
    schoolType: "幼稚園（教育局登記）",
    gender: "男女校",
    gradeSpan: "K1–K3；教育局位置資料列上午及下午班",
    website: "http://www.cannan.edu.hk/",
    dataYear: "教育局位置及註冊資料截至 2026-10；課程方向按迦南幼稚園官方網站現行內容",
    sourceNote: "教育局校號 516376、校址 0001 對應荃灣海盛路校舍。迦南官方網站介紹幼兒園整體課程理念，但未能由可讀資料確認荃灣校址當屆收費、師生比例、PN 開班及每日語言課時；這些項目不從其他分校推算。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：迦南幼稚園（荃灣）校址 0001", scope: "荃灣校址的班制及可讀概覽欄位；空缺資料不推算。", url: KGP_CANNAN_TW },
      { label: "迦南幼稚園：課程編排及課程特色", scope: "集團課程理念、主題延展、全語文與英語活動；不能替代分校課時或收費資料。", url: CANNAN_KG },
      { label: "迦南幼稚園：辦學理念", scope: "遊戲學習、探索和幼兒發展的校方整體表述。", url: CANNAN_ABOUT },
    ],
    detailSections: [
      { title: "校本課程與分校資料邊界", featured: true, note: "課程方向來自迦南官方整體介紹；荃灣校址個別安排仍需向分校確認。", details: [
        { label: "兒童本位與綜合學習", value: "迦南官方課程介紹以兒童為主體，結合六大學習範疇和主題延展，讓幼兒透過操作、觀察和生活經驗建構理解。對家長而言，重點不只是課程名稱，而是孩子能否有穩定的探索時間，以及教師如何引導孩子把經驗轉化成語言和思考。", sourceUrl: CANNAN_KG },
        { label: "閱讀與英語活動", value: "校方介紹以生活及品德主題選書，透過伴讀和讀寫環境培養文字興趣；英語課程則列出原音拼合法及專任外籍教師。網站沒有標示荃灣校址各級每週英語課時，因此不能據此判定英語授課比例。", sourceUrl: CANNAN_KG },
        { label: "分校費用與班級要另核", value: "荃灣校址 0001 與其他迦南分校使用不同校址資料。當前可核資料未提供本校址的核准學費、師生比例或 PN 班資料；家長應索取荃灣分校當屆收費證明及班級安排，避免以九龍塘或其他分校數字代替。", sourceUrl: KGP_CANNAN_TW },
      ] },
      { title: "接送與入學核對", details: [
        { label: "登記校址與班制", value: "教育局位置資料列荃灣海盛路祈德尊新邨商場校舍，上午及下午班；校方網站的綜合課程資料不代表每個級別兩個時段均實際開班。", period: "位置資料截至 2026-09；班制按 2026/27 概覽", sourceUrl: KGP_CANNAN_TW },
        { label: "報名前直接確認四項", value: "建議向分校確認當屆 K1 名額及申請日程、上午與下午的開班情況、半日及全日收費（如有），並詢問英語活動的級別和頻率。這些直接影響家庭作息與預算，目前不以其他校址資料代答。", sourceUrl: KGP_CANNAN_TW },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-true-light-school-of-hong-kong-primary-and-kindergarten-section-132047",
    name: "香港真光中學附屬小學暨幼稚園",
    nameEn: "The True Light School of Hong Kong, Primary and Kindergarten Section",
    district: "灣仔區",
    address: "香港大坑道 50 號（幼稚園部）",
    telephone: "+852 2577 3569",
    schoolNumber: "132047 / 校址 0001",
    schoolType: "私立幼稚園，沒有參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "2026/27 上午及下午幼兒班、低班及高班：每月 HK$4,960，全年 10 期，合計 HK$49,600",
    language: "《幼稚園概覽 2026/27》列粵語；校方資料提中、英文學習，未公布語言課時比例",
    gradeSpan: "K1–K3；上午及下午班",
    website: "http://www.tlmshkps.edu.hk/kindergarten",
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；收費證明生效 2026-09-01",
    sourceNote: "校號 132047、校址 0001 對應大坑道小學及幼稚園部。教育局收費證明列 2026/27 幼稚園每期學費 HK$4,960、10 期，全年 HK$49,600；幼稚園與同一辦學團體小學有關聯，但不等同保證升讀。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：香港真光中學附屬小學暨幼稚園", scope: "校址、班制、授課語言及師生比例。", url: KGP_TRUE_LIGHT_KG },
      { label: "教育局收費證明書：香港真光中學附屬小學暨幼稚園", scope: "生效日期 2026-09-01；幼稚園各級每期學費和期數。", url: TRUE_LIGHT_FEES },
      { label: "香港真光中學附屬小學暨幼稚園：幼稚園部", scope: "幼稚園部辦學宗旨、課程及學校資訊入口；校方網站。", url: TRUE_LIGHT_KG_SITE },
      { label: "香港真光中學附屬小學暨幼稚園：小學概覽 2026", scope: "只用於辨識同一辦學團體小學及其制度；不可推定幼稚園學生直升。", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=420" },
    ],
    detailSections: [
      { title: "真光教育與幼小關係", featured: true, note: "幼稚園課程按校方及教育局資料；同團體小學關係不代表升小保證。", details: [
        { label: "基督化全人教育", value: "校方以「爾乃世之光」為教育精神，強調全人發展、品格、服務和創意。對認同基督教辦學的家庭，這提供了清晰的價值方向；報名前可了解宗教活動如何融入幼稚園日常，以及家校如何溝通不同信仰背景。", sourceUrl: TRUE_LIGHT_KG_SITE },
        { label: "幼稚園與小學在同一校園體系", value: "幼稚園部與香港真光中學附屬小學同屬一個辦學體系，孩子有機會接觸熟悉的校園文化及升小資訊；但小學自行收生，並非教育局一條龍，家長仍須按小學公布的收生準則另行申請。", sourceUrl: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=420" },
        { label: "教學與評估", value: "校方概覽資料描述以兒童為中心，透過討論、分享、觀察和探索安排學習，並以日常表現作持續評估。這類安排較適合重視多元學習經驗的家庭；可向校方索取最新課程簡介，了解語言及升小準備如何逐級安排。", sourceUrl: KGP_TRUE_LIGHT_KG },
      ] },
      { title: "班制與實際費用", details: [
        { label: "班制與概覽比例", value: "教育局概覽校址 0001 列上午及下午班，授課語言粵語，師生比例 1:8.4。比例是概覽統計，不等同每班人數或個別幼兒可獲得的固定照顧時數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_TRUE_LIGHT_KG },
        { label: "2026/27 正式學費", value: "教育局收費證明列幼兒班、低班及高班上午與下午每月學費 HK$4,960，各繳 10 期，全年 HK$49,600。除證明書列明費用外，如有其他獲批收費，應以校方及教育局最新資料核實。", period: "生效日期：2026-09-01", sourceUrl: TRUE_LIGHT_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "fun-creative-kindergarten-kwun-tong-branch-323055",
    name: "歡樂創意幼稚園（觀塘分校）",
    nameEn: "Fun Creative Kindergarten (Kwun Tong Branch)",
    district: "觀塘區",
    address: "九龍觀塘坪石邨金石樓地下",
    telephone: "+852 2323 6363",
    schoolNumber: "323055 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "2026/27 半日班免費；全日班及膳食費按校方最新核准收費表確認",
    language: "《幼稚園概覽 2026/27》列粵語；未公開各語言課時比例",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.funcreative.edu.hk/",
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；課程及收費按校方網站查閱",
    sourceNote: "校號 323055、校址 0001 對應坪石邨觀塘分校。校方網站同時介紹將軍澳及觀塘校舍；課程共通資料不視作分校獨有活動。當屆費用頁的年度文字需再與正式收費證明核對，因此本頁只確認半日班教育計劃資助，不列全日班金額。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：歡樂創意幼稚園觀塘分校校址 0001", scope: "地址、班制、授課語言、師生比例及教育計劃資料。", url: KGP_FUN_CREATIVE_KT },
      { label: "歡樂創意幼稚園：課程介紹", scope: "校方課程理念、主題教學及遊戲學習；網頁為學校共通課程入口。", url: FUN_CREATIVE_CURRICULUM },
      { label: "歡樂創意幼稚園：2026/27 學校收費頁", scope: "學校公布收費的入口；年度文字與正式證明仍須核對。", url: FUN_CREATIVE_FEES },
      { label: "歡樂創意幼稚園：觀塘分校聯絡資料", scope: "觀塘分校地址和聯絡方式。", url: FUN_CREATIVE_KT_ADDRESS },
    ],
    detailSections: [
      { title: "遊戲、主題與體驗學習", featured: true, note: "校方網站的課程頁為兩校舍共通介紹，不把特定活動推定為觀塘分校固定安排。", details: [
        { label: "兒童中心與主題學習", value: "校方以兒童為中心設計課程，透過主題和繪本活動連接孩子的生活經驗，並以遊戲引發探索。這較適合需要在具體情境中理解新事物的幼兒；家長可詢問觀塘校舍如何安排自由遊戲、教師觀察和活動後的語言表達。", sourceUrl: FUN_CREATIVE_CURRICULUM },
        { label: "減少機械式操練", value: "校方提交教育局的 2023/24 資料表示，遵照幼稚園課程指引，K1 不要求執筆寫字，也不安排機械式抄寫或操練式計算。這是有年份的校方申報資料，不能直接視為現屆所有年級的教學保證；升小準備仍應詢問 K2、K3 的漸進安排。", period: "校方提交資料：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/323055c-0001.pdf" },
        { label: "分校交通與校址", value: "教育局登記地址為坪石邨金石樓地下。校方另有將軍澳校舍，申請時應確認孩子所屬校址、上課時間、校車或接送安排，不把另一校舍的交通和活動當作本校資料。", sourceUrl: FUN_CREATIVE_KT_ADDRESS },
      ] },
      { title: "班制與收費核對", details: [
        { label: "概覽班制和比例", value: "教育局概覽列上午、下午及全日班，授課語言為粵語，師生比例 1:8.5。比例為統計值，不表示每班實際人數。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_FUN_CREATIVE_KT },
        { label: "費用以正式證明為準", value: "校方收費頁列半日班及全日班收費，但年度欄文字出現不一致的年份格式。故本頁只列半日班按計劃免費；全日班、膳食、書簿和代辦費應索取觀塘分校最新教育局收費證明核對。", period: "校方收費頁查閱：2026-10", sourceUrl: FUN_CREATIVE_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "anchors-kindergarten-536067",
    name: "安基司幼稚園",
    nameEn: "Anchors Kindergarten",
    district: "大埔區",
    address: "新界大埔翠樂街 8 號富萊花園 G07B 舖地下至二樓（幼兒中心專用部分除外）",
    telephone: "+852 2664 4133",
    schoolNumber: "536067 / 校址 0001",
    schoolType: "私立幼稚園，沒有參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "收費證明自 2025-09-01 生效：半日班每年 HK$68,200；全日班每年 HK$102,300，另全日班膳食費每年 HK$6,919",
    language: "教育局概覽及校方現行可讀資料未能確認此校址的授課語言比例",
    gradeSpan: "K1–K3；教育局列上午、下午及全日班；PN 服務須按幼兒中心與幼稚園分開確認",
    website: "http://www.anchors.edu.hk/",
    dataYear: "教育局位置及註冊資料截至 2026-09；收費證明生效 2025-09-01；課程未見可配對此校址的現行詳情",
    sourceNote: "此頁只對應校號 536067、校址 0001 的安基司幼稚園（大埔翠樂街）；不與同址的安基司國際幼兒園（不同學校編號）混為一校。現行課程詳情未能由可讀的校方資料配對到這個校號，故不把國際幼兒園的 EYFS 或 STEAM 課程套用於本頁。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：安基司幼稚園校址 0001", scope: "校址、班制、師生比例及可讀概覽資料。", url: KGP_ANCHORS_TP },
      { label: "教育局學校位置資料：安基司幼稚園（大埔）", scope: "校號 536067、校址 0001、電話及校方網址。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tp.html" },
      { label: "教育局收費證明書：安基司幼稚園", scope: "生效日期 2025-09-01；半日及全日課程學費、膳食費。", url: ANCHORS_TP_EDB_FEES },
    ],
    detailSections: [
      { title: "先分清同址的兩個教育服務", featured: true, note: "以下只談學校編號 536067；不把安基司國際幼兒園的課程、學費或招生安排套用過來。", details: [
        { label: "同一地址不代表同一校種", value: "教育局分別登記安基司幼稚園（校號 536067）及安基司國際幼兒園（校號 565199），兩者共用翠樂街校園部分地址，但屬不同學校記錄。比較課程或收費前，先確認申請表、班級和收據所列的正式校名及校號。", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tp.html" },
        { label: "課程資料暫不跨校推定", value: "安基司集團亦有國際幼兒園課程介紹，但現有可讀官方材料不足以確認該 EYFS、STEAM 或英語／普通話安排是否適用於本頁這所本地幼稚園。因此家長應向 536067 校址索取當屆課程及語言簡介，避免以同址另一校的資訊作決策。", sourceUrl: KGP_ANCHORS_TP },
      ] },
      { title: "班制與收費資料", details: [
        { label: "教育局列出的班制", value: "2026/27 概覽列上午、下午及全日班；授課語言及 PN 資料需以對應校址的完整概覽或校方回覆為準。幼兒中心與幼稚園班級不是同一收費或註冊項目。", period: "2026/27", sourceUrl: KGP_ANCHORS_TP },
        { label: "教育局核准收費", value: "教育局收費證明自 2025 年 9 月 1 日生效，列半日班每年 HK$68,200、全日班每年 HK$102,300；全日膳食費每年 HK$6,919。由於這不是 2026/27 新收費證明，報名前仍須向校方核實當屆是否已有更新。", period: "證明生效：2025-09-01", sourceUrl: ANCHORS_TP_EDB_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "caritas-st-francis-kindergarten-320544",
    name: "明愛聖方濟各幼稚園",
    nameEn: "Caritas St. Francis Kindergarten",
    district: "北區",
    address: "2 個登記校址（本頁課程資料按上水校址 0002）",
    schoolNumber: "320544 / 本頁概覽校址 0002；另有校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    tuition: "校址 0002：半日班按計劃免費；全日班收費按當屆教育局收費證明核對",
    language: "校址 0002《幼稚園概覽 2026/27》列粵語；未公布各語言課時比例",
    gradeSpan: "K1–K3；校址 0002 列上午及全日班；另一校址班制須分開查",
    website: "https://sfkg.caritas.org.hk/index.aspx",
    dataYear: "教育局位置資料截至 2026-09；《幼稚園概覽》2026/27 校址 0002；課程資料引用校方提交教育局 2023/24",
    sourceNote: "校號 320544 有兩個登記校址：上水寶石湖邨 0002 及中環堅道 0001。以下班制、師生比例和課程例子只按上水校址 0002；不能把兩址資料合併理解為同一校舍安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：明愛聖方濟各幼稚園校址 0002", scope: "上水校址班制、授課語言、師生比例及教育計劃資料。", url: KGP_CARITAS_SF_SH },
      { label: "校方提交教育局的學校資料（2023/24，校址 0002）", scope: "上水校址課程方向、遊戲學習、語言及校舍資料；歷史年度。", url: CARITAS_SF_KGP_2023 },
      { label: "香港明愛：明愛聖方濟各幼稚園服務簡介", scope: "服務對象、教育照顧理念及服務單位身份。", url: "https://ngo.hkcss.org.hk/zh/service_units/1506" },
    ],
    detailSections: [
      { title: "上水校址的遊戲學習", featured: true, note: "教育局概覽資料與 2023/24 校方申報分開標示；中環校址不套用以下班制與課程細節。", details: [
        { label: "自由遊戲與幼兒自主", value: "校方提交教育局的 2023/24 資料描述以自由遊戲和可塑性高的材料，鼓勵幼兒按興趣建構遊戲、協作和解難。這種取向讓家長看到孩子不只是完成活動，也要有空間發起想法；但該文件是歷史年度，現屆實施細節應再向上水校舍核對。", period: "校方提交資料：2023/24；校址 0002", sourceUrl: CARITAS_SF_KGP_2023 },
        { label: "全語言與創意表達", value: "校方當年提到綜合課程、全語言教學及故事改編、創作等學習活動，目標涵蓋語言、品德和創意思維。家長可詢問現屆如何把自由遊戲的觀察轉化成教師回饋和幼兒學習記錄。", period: "校方提交資料：2023/24；校址 0002", sourceUrl: CARITAS_SF_KGP_2023 },
        { label: "照顧服務與家庭需要", value: "香港明愛服務資料介紹為不同家庭及有多元學習需要兒童提供幼兒教育與照顧服務。具體支援需按孩子需要、服務資格及校舍現行安排確認，不把機構層面的服務描述成每位學生均可使用的個別服務。", sourceUrl: "https://ngo.hkcss.org.hk/zh/service_units/1506" },
      ] },
      { title: "上水校址班制與比例", details: [
        { label: "概覽校址 0002", value: "上水寶石湖邨校址 0002 的 2026/27 概覽列上午及全日班，授課語言為粵語，師生比例 1:10.1。中環校址 0001 的登記地址和授課時間不同，應另行查閱該校址資料。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_CARITAS_SF_SH },
        { label: "班級容量不可當作招生名額", value: "較早年度教育局資料列出的課室數、在讀人數或費用只能反映當年狀況，不能推算 2026/27 空缺或新生名額。申請前應確認實際上課校址、班別及全日班費用。", sourceUrl: KGP_CARITAS_SF_SH },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sheung-shui-rhenish-church-kindergarten-157406",
    name: "上水禮賢會幼稚園",
    nameEn: "Sheung Shui Rhenish Church Kindergarten",
    district: "北區",
    address: "新界上水彩園邨彩華樓地下 101–107 及 109–111 號",
    telephone: "+852 2673 2929",
    schoolNumber: "157406 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gender: "男女校",
    religion: "基督教",
    tuition: "2026/27 半日班免費；全日班費用以校方當屆核准收費表為準",
    language: "《幼稚園概覽 2026/27》列粵語；校方資料另提英語及普通話活動，未公開逐語言課時",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: SHEUNG_SHUI_RHENISH_HOME,
    dataYear: "教育局位置及註冊資料截至 2026-10；《幼稚園概覽》2026/27；課程補充引用校方提交教育局 2023/24",
    sourceNote: "校號 157406、校址 0001 對應彩園邨校舍。校方網站提供教學特色及教學編排入口；可核的細節包括 2023/24 校方申報的遊戲學習、英語及普通話活動和持續評估，該部分保留年度，不當作每年固定安排。",
    replaceDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：上水禮賢會幼稚園校址 0001", scope: "班制、粵語、師生比例及幼稚園教育計劃資料。", url: KGP_SHEUNG_SHUI_RHENISH },
      { label: "上水禮賢會幼稚園：校方首頁及教學特色入口", scope: "校方身份、校址及教學特色、教學編排索引。", url: SHEUNG_SHUI_RHENISH_HOME },
      { label: "校方提交教育局的學校資料（2023/24）", scope: "遊戲學習、兩文三語活動、體能及學習歷程評估；歷史年度。", url: SHEUNG_SHUI_RHENISH_KGP_2023 },
    ],
    detailSections: [
      { title: "遊戲學習與家校合作", featured: true, note: "課程細節引用校方申報的 2023/24 資料；不是當屆活動時數或成果承諾。", details: [
        { label: "由遊戲建立主動學習", value: "校方當年以多元教材和活動配合遊戲學習，培養幼兒的興趣和主動性；宗教課程及週會亦納入德育與靈育方向。家長可留意教師如何在孩子自主遊戲時觀察、提問和提供適切支架。", period: "校方提交資料：2023/24", sourceUrl: SHEUNG_SHUI_RHENISH_KGP_2023 },
        { label: "英語、普通話與體能活動", value: "2023/24 校方資料提到外語老師帶領英語及普通話活動，並由體適能導師設計體能活動；沒有公開現行各語言課時或每週次數。家長若重視語言環境，應向校方問清楚授課語言、師資和日常使用場景。", period: "校方提交資料：2023/24", sourceUrl: SHEUNG_SHUI_RHENISH_KGP_2023 },
        { label: "學習歷程記錄", value: "校方資料描述以日常觀察、活動記錄、主題評估、家長回饋、幼兒自評及作品建立學習歷程檔案。這種方式有助家長看見發展過程，但仍需了解回饋頻率，以及教師如何把觀察轉化為下一步支援。", period: "校方提交資料：2023/24", sourceUrl: SHEUNG_SHUI_RHENISH_KGP_2023 },
      ] },
      { title: "班制與家庭安排", details: [
        { label: "概覽班制與比例", value: "教育局概覽列上午、下午及全日班，授課語言粵語，師生比例 1:11.8。比例為全校統計，不等於班級人數；全日服務、膳食和延長照顧需另向校方確認。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_SHEUNG_SHUI_RHENISH },
        { label: "接送及當屆費用", value: "校址位於上水彩園邨彩華樓地下。半日班按幼稚園教育計劃列免費；全日班學費、膳食及校車安排應按當屆通告核實，並按家庭上下班時間評估實際接送成本。", period: "2026/27", sourceUrl: KGP_SHEUNG_SHUI_RHENISH },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chan-s-creative-kindergarten-624918",
    name: "啟基幼稚園",
    nameEn: "CHAN'S CREATIVE KINDERGARTEN",
    district: "深水埗區",
    address: "九龍界限街 71 號舊翼",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolNumber: "624918 / 校址 0001",
    schoolType: "幼稚園（教育局登記；臨時註冊）",
    website: KAI_CHI_HOME,
    dataYear: "教育局位置及註冊資料截至 2026-10；校方幼稚園部於 2026-07 公布成立及招生",
    sourceNote: "啟基學校（幼稚園部）於 2026 年成立，校方公布現正招收 2026/27 插班生及 2027/28 新生。官方資料稱以愉快、體驗和探索學習為方向；幼稚園與同址小學的升學安排不據校名或校園關係推定，須以校方最新書面政策為準。",
    appendDirectoryDetails: true,
    sources: [
      { label: "啟基幼稚園官方網站", scope: "幼稚園部成立時間、校方公布的辦學方向、校址及聯絡資料。", url: KAI_CHI_HOME },
      { label: "啟基幼稚園：加入啟基", scope: "校方現行招生年度、面見方式及常見入學問題；年度安排以頁面更新為準。", url: "https://ccskg.edu.hk/en/join-us/" },
      { label: "教育局《幼稚園概覽 2026/27》：啟基幼稚園校址 0001", scope: "登記校址、當屆班制及已公布概覽欄位；未列費用或班級資料不推算。", url: KGP_KAI_CHI },
    ],
    detailSections: [
      { title: "新設幼稚園部與探索學習", featured: true, note: "本園於 2026 年成立，校方公布的招生年度和課程介紹較新；部分運作經驗仍待首屆家長累積。", details: [
        { label: "2026 年新成立", value: "校方於 2026 年 7 月公布幼稚園部正式成立，並接受 2026/27 插班及 2027/28 新生申請。新園選擇不能只看辦學團體既有小學的口碑；家長應親自了解幼稚園團隊、課室日程、照顧安排及首屆家校溝通機制。", period: "校方公告：2026-07", sourceUrl: KAI_CHI_HOME },
        { label: "愉快、體驗與探索", value: "校方以「從我開始，探索世界」描述課程方向，強調愉快學習、體驗學習及安全、溫馨、具啟發性的環境。這些是辦學理念而非成效證據；參觀時可觀察孩子是否有自主操作時間，以及教師如何把探索活動連回語言、思考和生活習慣。", sourceUrl: KAI_CHI_HOME },
        { label: "招生與升小關係須問清楚", value: "現行招生頁把面見安排放在親子體驗課中，也列出幼稚園部與小學部關係的常見問題。不要由「同一校名」推斷自動直升或保留學位；報名前應索取幼稚園生升讀小學部的正式條款和適用年度。", sourceUrl: "https://ccskg.edu.hk/en/join-us/" },
      ] },
      { title: "家庭報名前核對", details: [
        { label: "首屆校園日常", value: "新設園的首要核對點是實際運作：每日作息、午膳和午睡、師生安排、代課支援、家長通訊頻率，以及新生適應方案。現有公開資料未提供逐項細節，宜在校園參觀時逐一確認。", sourceUrl: KAI_CHI_HOME },
        { label: "班制及收費以校址概覽為準", value: "教育局位置資料可確認登記校址，2026/27 概覽提供的班制資訊按原欄位列示；本頁不以同址小學資料推算幼稚園學費、班額或升學安排。", period: "概覽：2026/27", sourceUrl: KGP_KAI_CHI },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hong-kong-man-sang-kindergarten-quarry-bay-630640",
    name: "香港民生幼稚園（鰂魚涌）",
    nameEn: "HONG KONG MAN SANG KINDERGARTEN (QUARRY BAY)",
    district: "東區",
    address: "香港北角英皇道 901–907 號 1 樓及地下",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolNumber: "630640 / 校址 0001",
    schoolType: "幼稚園（教育局登記）",
    website: "https://mansangkg.edu.hk/",
    dataYear: "教育局位置及註冊資料截至 2026-10；校方課程及申請資料按 2026/27 公開頁面",
    sourceNote: "以下課程介紹取自香港民生幼稚園暨國際幼兒園的校方資料；鰂魚涌校的申請表明確要求把申請交到北角校舍。不同校舍的班制、語言組別與服務時段應按申請表所選校舍核實。",
    appendDirectoryDetails: true,
    sources: [
      { label: "香港民生幼稚園暨國際幼兒園：課程", scope: "校方介紹兩文三語、英普雙語及校本主題課程；語言課時及校舍實施須另核。", url: MANSANG_CURRICULUM },
      { label: "香港民生幼稚園：2026/27 入學申請表（鰂魚涌校）", scope: "校舍地址、PN–K3 班級選項、語言組別及申請遞交校舍。", url: MANSANG_QB_APPLICATION },
      { label: "教育局《幼稚園概覽 2026/27》：香港民生幼稚園（鰂魚涌）", scope: "對應教育局登記校址的班制及已公開資料；不套用其他校舍數據。", url: KGP_MAN_SANG_QB },
    ],
    detailSections: [
      { title: "語言組別與校本課程", featured: true, note: "語言課程是校方描述；申請時要確認所選校舍、級別是否開辦相應組別及實際課時。", details: [
        { label: "兩文三語及英普組別", value: "校方把兩文三語班描述為英語、粵語老師授課，並配合普通話活動；另設英普雙語班，由英語及普通話老師授課，配合粵語活動。兩種安排的語言環境不同，家長應先想清楚家庭希望孩子以哪種語言建立表達基礎，再問清每日各語言課時。", sourceUrl: MANSANG_CURRICULUM },
        { label: "主題教學與兒童設計活動", value: "中文課程以主題教學和兒童設計活動配合，校方稱課程參照學前教育課程指引，按孩子的生活經驗和能力安排活動。判斷重點是主題如何延展、教師如何回應孩子提問，而不是只看課程名稱或教材數量。", sourceUrl: MANSANG_CURRICULUM },
        { label: "英語拼音安排", value: "校方列出 Jolly Phonics，並稱透過故事、動作、字母發音和拼合等方式培養英語讀寫。這說明課程有系統語音教學元素，但公開頁面未列每週課時或成果指標；可在參觀時看課堂示例及家庭練習要求。", sourceUrl: MANSANG_CURRICULUM },
      ] },
      { title: "鰂魚涌校的申請與接送", details: [
        { label: "申請表列明校舍與班級", value: "2026/27 申請表把鰂魚涌校與其他校舍分開列出，提供 PN、K1 至 K3 及上午、下午、全日班選項。表格亦提示鰂魚涌校申請需到北角校舍遞交；家庭應把申請辦理地點和孩子實際上課地址分開記錄。", period: "申請表：2026/27", sourceUrl: MANSANG_QB_APPLICATION },
        { label: "入學先確認校舍與組別", value: "同一機構有多個校舍，選校時不要只按校名判斷通勤。報名前應確認孩子實際上課地點、可選語言班、全日服務時段及當屆收費；教育局概覽缺項不以北角或西區校舍資料補寫。", sourceUrl: KGP_MAN_SANG_QB },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "guideposts-kindergarten-tuen-mun-branch-156930",
    name: "佳寶幼稚園（屯門分校）",
    nameEn: "GUIDEPOSTS KINDERGARTEN (TUEN MUN BRANCH)",
    district: "屯門區",
    address: "新界屯門兆安苑定賢閣地下",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "156930 / 校址 0001",
    website: GUIDEPOSTS_TUEN_MUN_HOME,
    dataYear: "教育局《幼稚園概覽》2026/27；校方招生公告及課程頁按 2026-10 網站內容",
    sourceNote: "校方網站把屯門分校的招生、課程特色與活動消息獨立列示。本頁採教育局概覽的校址資料，校方介紹的 STEAM 及體驗學習屬課程方向，未公開每日各學習範疇時數或幼兒成果比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "佳寶幼稚園（屯門分校）官方網站", scope: "屯門分校最新公告、課程特色、校園活動及招生入口。", url: GUIDEPOSTS_TUEN_MUN_HOME },
      { label: "教育局《幼稚園概覽 2026/27》：佳寶幼稚園（屯門分校）", scope: "校址、授課語言、師生比例、教育計劃及班制資料。", url: KGP_GUIDEPOSTS_TUEN_MUN },
      { label: "佳寶幼稚園：2026/27 入學申請表（屯門分校）", scope: "校方申請文件、申請程序與所需資料；不可當作 2027/28 收費。", url: "https://www.guideposts.edu.hk/application2026-2027/Guideposts-SiuOn2026-27.pdf" },
    ],
    detailSections: [
      { title: "體驗學習與 STEAM 取向", featured: true, note: "校方提供屯門分校專屬課程介紹；課程標籤不等於每天固定課時或校外評估成果。", details: [
        { label: "以體驗建構理解", value: "校方為屯門分校提供課程特色介紹及體驗學習內容。對幼兒來說，體驗活動的價值取決於教師是否引導孩子觀察、表達和回顧；參觀時可請校方示範一個主題如何從遊戲延伸至語文、數學或自然探索。", sourceUrl: GUIDEPOSTS_TUEN_MUN_HOME },
        { label: "STEAM 是學習態度，不是保證成果", value: "校方將 STEAM 描述為成長態度，並公開相關課程介紹。家長宜了解活動是否包含幼兒提出問題、嘗試材料、合作解難和分享結果，而不要單憑 STEAM 名稱推斷有固定器材、編程課時或競賽成果。", sourceUrl: GUIDEPOSTS_TUEN_MUN_HOME },
        { label: "在校園活動中觀察適配度", value: "校方公告包含新生適應、文化藝術和校園活動。對需要較長時間熟悉環境的孩子，報名時可詢問適應日、家長陪同安排及教師如何協助分離；公開資訊未提供個別適應成效數據。", sourceUrl: GUIDEPOSTS_TUEN_MUN_HOME },
      ] },
      { title: "報名前核對項目", details: [
        { label: "按屯門校址核實班制與比例", value: "2026/27 概覽列屯門分校上午及下午班、粵語授課，師生比例 1:10.8；概覽比例是統計值，不等於實際每班人數。PN、全日班與各級開班情況以當屆校方和教育局資料為準。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_GUIDEPOSTS_TUEN_MUN },
        { label: "招生文件留意校舍專屬要求", value: "校方把屯門分校申請表和公告獨立提供。遞交前請核對年度、申請校舍、班別、所需文件和費用；舊年度表格可說明程序，不可代替新年度收費或名額。", sourceUrl: "https://www.guideposts.edu.hk/application2026-2027/Guideposts-SiuOn2026-27.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "new-territories-women-and-juveniles-welfare-association-wofoo-kindergarten-630160",
    name: "新界婦孺福利會和富幼稚園",
    nameEn: "NEW TERRITORIES WOMEN & JUVENILES WELFARE ASSOCIATION WOFOO KINDERGARTEN",
    district: "西貢區",
    address: "新界西貢安禧街 8 號地下",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolNumber: "630160 / 校址 0001",
    schoolType: "幼稚園（教育局登記；2026 年新設）",
    website: "https://www.ntwjwa.org.hk/zh/early-childhood",
    dataYear: "教育局位置及註冊資料截至 2026-10；辦學團體公告 2026-04-02",
    sourceNote: "新界婦孺福利會於 2026 年 4 月公布在西貢安禧街 8 號開辦和富幼稚園。辦學團體公開幼兒教育服務方向，但截至本次查閱未見和富幼稚園獨立課程、招生及收費細節；不能把該會其他幼兒學校的服務或資助套用於本園。",
    appendDirectoryDetails: true,
    sources: [
      { label: "新界婦孺福利會：和富幼稚園啟航公告", scope: "新校址、辦學團體及創辦公告日期。", url: NTWJWA_WOFOO_ANNOUNCEMENT },
      { label: "新界婦孺福利會：幼兒教育服務", scope: "辦學團體的學前教育目標及服務單位清單；不是和富幼稚園個別課程說明。", url: NTWJWA_EARLY_CHILDHOOD },
      { label: "教育局《幼稚園概覽 2026/27》：新界婦孺福利會和富幼稚園", scope: "以校號 630160、校址 0001 配對的班制及公開欄位。", url: KGP_WOFOO },
    ],
    detailSections: [
      { title: "2026 年新設園：公開資料仍有限", featured: true, note: "這所幼稚園於 2026 年新設，辦學團體公告不可替代校方當屆課程、招生和收費文件。", details: [
        { label: "校址與創辦公告", value: "辦學團體於 2026 年 4 月公布將在西貢安禧街 8 號開辦和富幼稚園，並以「以家為本、省德立人」描述機構辦學方向。家長可把這視為辦學團體價值主張；課程如何落實、教師配置及家校安排仍須看本園文件。", period: "公告：2026-04-02", sourceUrl: NTWJWA_WOFOO_ANNOUNCEMENT },
        { label: "機構方向與校本安排分開看", value: "新界婦孺福利會介紹其幼兒教育服務涵蓋多所幼兒學校和幼稚園，也列出促進兒童均衡發展及家長教育等方向。這些是辦學團體層面的服務概況，不能推定和富幼稚園具備同一兼收支援、專業人員或課程內容。", sourceUrl: NTWJWA_EARLY_CHILDHOOD },
        { label: "新園家庭應索取書面資料", value: "本次可讀的公開材料未列和富幼稚園獨立課程手冊、各級日程、語言課時或招生流程。報名前建議直接索取校方當屆簡介，特別確認 K1 開班、半日／全日服務、師生比例、接送及家長溝通方式。", sourceUrl: KGP_WOFOO },
      ] },
      { title: "當屆班制與費用", details: [
        { label: "只採用本園校號資料", value: "教育局學校名冊與 2026/27 幼稚園概覽可按校號 630160 配對本園校址。若概覽個別欄位未列，本頁不以辦學團體其他幼稚園資料補寫。", period: "概覽：2026/27", sourceUrl: KGP_WOFOO },
        { label: "費用與班額不作推算", value: "新園早期課室容額、登記班制或辦學團體其他學校的收費都不能直接等同當屆 K1 招生名額與家庭總支出；請以本園教育局核准收費和正式取錄通知為準。", sourceUrl: KGP_WOFOO },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sun-island-english-kindergarten-215678",
    name: "太陽島英文幼稚園",
    nameEn: "SUN ISLAND ENGLISH KINDERGARTEN",
    district: "九龍城區",
    address: "2 個登記校址（詳見下方）",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "215678 / 本頁課程參照校址 0002；另有校址 0001",
    website: "http://www.sunisland.edu.hk",
    dataYear: "教育局位置及註冊資料截至 2026-10；課程語言說明按太陽島官方常見問題現行頁面",
    sourceNote: "校號 215678 有兩個登記校址；概覽和班制應按校址編號閱讀。太陽島官方常見問題描述機構層面的中文班和雙語班語言安排，實際開辦組別及時數仍須向申請校址核實。",
    appendDirectoryDetails: true,
    sources: [
      { label: "太陽島英文幼稚園：常見問題", scope: "機構公布的中文班、雙語班語言安排、報名和校車資訊；不代表每個校址均開辦相同組別。", url: SUN_ISLAND_FAQ },
      { label: "教育局《幼稚園概覽 2026/27》：太陽島英文幼稚園校址 0002", scope: "該登記校址的班制、語言、師生比例與費用資料。", url: KGP_SUN_ISLAND_TKW },
      { label: "教育局《幼稚園概覽 2026/27》：太陽島英文幼稚園校址 0001", scope: "同校號另一登記校址的校址資料；不與校址 0002 混算。", url: KGP_SUN_ISLAND_TKW_0001 },
    ],
    detailSections: [
      { title: "中文班與雙語班的日常差異", featured: true, note: "以下是校方對課程組別的機構層面說明；兩個登記校址的實際開班安排須分別確認。", details: [
        { label: "中文班以粵語為主", value: "校方說明中文班以廣東話為主要授課語言，並安排英語教師小組活動及普通話課堂。家長若希望孩子先以粵語建立理解和表達，再接觸英普，應確認所選校址及年級是否提供此組別，以及外語活動的頻率。", sourceUrl: SUN_ISLAND_FAQ },
        { label: "雙語班以英語為主", value: "校方稱雙語班以英語為主要授課語言，中文課約佔上課時間六分之一，並由中文科教師以粵語教授。這與「每天接觸英語」不是同一概念；若家庭重視中文閱讀和口語，也要問清楚其餘中文學習場景。", sourceUrl: SUN_ISLAND_FAQ },
        { label: "按分校確認交通與課程", value: "太陽島設多個校址，校方 FAQ 指大部分校舍有校車服務，但路線須向分校查詢。家庭比較時應把上課地址、實際可選班別和接送路線放在一起，不以機構總體介紹代替分校安排。", sourceUrl: SUN_ISLAND_FAQ },
      ] },
      { title: "校址 0002 的概覽資料", details: [
        { label: "授課語言和比例", value: "教育局 2026/27 概覽對校址 0002 列英文及師生比例 1:8.2。這是該校址的概覽欄位，不代表兩個校址或各語言組別具有相同課時和班額。", period: "2026/27；比例按概覽統計年度", sourceUrl: KGP_SUN_ISLAND_TKW },
        { label: "兩個校址不可合併看名額", value: "教育局登記資料把校址 0001 和 0002 分列。課室容量、收費與當屆空缺應逐校址查詢；其中一址的容額不是另一址的 K1 招生學額。", period: "校址編號按教育局資料", sourceUrl: KGP_SUN_ISLAND_TKW_0001 },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "kornhill-christian-anglo-chinese-kindergarten-215848",
    name: "基督教康山中英文幼稚園",
    nameEn: "KORNHILL CHRISTIAN ANGLO-CHINESE KINDERGARTEN",
    district: "多區（沙田區、東區）",
    address: "2 個登記校址（詳見下方）",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "215848 / 本頁以校址 0002 為現址；另列校址 0001",
    website: KORNHILL_HOME,
    dataYear: "教育局位置資料截至 2026-09；校方公布現址遷至馬鞍山；概覽按校址分列",
    sourceNote: "校方現行首頁同時列出舊址康怡廣場及新址馬鞍山錦柏苑，教育局登記資料將兩個校址編號分開。本頁不把舊址 0001 的班制、比例或收費套用到現址 0002。",
    appendDirectoryDetails: true,
    sources: [
      { label: "基督教康山中英文幼稚園官方網站", scope: "校方現行網站列明舊址與馬鞍山新址，並提供課程、申請和校園資訊入口。", url: KORNHILL_HOME },
      { label: "教育局《幼稚園概覽 2026/27》：基督教康山中英文幼稚園校址 0002", scope: "馬鞍山現址可配對的班制及概覽欄位。", url: KGP_KORNHILL_MOS },
    ],
    detailSections: [
      { title: "從康山舊址遷至馬鞍山", featured: true, note: "校名仍含「康山」，但校方已公布新址；查詢與報名應以教育局校址編號和上課地址確認。", details: [
        { label: "現址已在馬鞍山", value: "校方現行網站同時列出舊址香港鰂魚涌康山道和新址新界馬鞍山恆泰路錦柏苑。教育局把地址分列為校址 0001 和 0002。若只看校名或舊網頁，容易把康怡一帶當成現行上課地點；接送規劃應先確認錄取通知所列校址。", sourceUrl: KORNHILL_HOME },
        { label: "課程頁面要按校址核實", value: "校方網站列有辦學宗旨、課程特色、教學模式及上課安排等資訊入口；但頁面是否適用於遷址後現行班別，應直接向校方核實。不要用舊址班制或收費推算新址服務。", sourceUrl: KORNHILL_HOME },
        { label: "過渡期家庭要確認實際服務", value: "校址轉換可能影響校車、接送時間、熟悉的校園設施和跨區照顧。家庭可詢問新址各級開班情況、校車路線、午膳與延長照顧安排，並確認 0001 舊址是否仍有實際授課或只保留登記用途。", sourceUrl: KGP_KORNHILL_MOS },
      ] },
      { title: "新址概覽與家庭核對", details: [
        { label: "僅引用新址 0002 資料", value: "教育局概覽應按校址 0002 查閱馬鞍山現址的班制、師生比例與費用；過往鰂魚涌校址資料不作替代。家庭應保留校方最新通告及教育局核准收費文件。", period: "概覽：2026/27；按校址 0002", sourceUrl: KGP_KORNHILL_MOS },
        { label: "申請前確認四件事", value: "請向校方確認上課地址、所選級別及班別、當屆收費和校車路線。若家庭原先是按鰂魚涌地址選校，應重新估算通勤與接送安排後再作比較。", sourceUrl: KORNHILL_HOME },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "creative-anglo-chinese-kindergarten-tung-chung-215830",
    name: "啟思中英文幼稚園（東涌）",
    nameEn: "CREATIVE ANGLO-CHINESE KINDERGARTEN (TUNG CHUNG)",
    district: "多區（離島區、東區）",
    address: "2 個登記校址（東涌校址 0002；詳見下方）",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "215830 / 本頁以校址 0002 為東涌校舍；另列校址 0001",
    website: "http://www.creative.edu.hk/",
    dataYear: "教育局位置資料截至 2026-09；課程與招生按校方現行共通頁及東涌校舍公告",
    sourceNote: "東涌校舍按教育局校址 0002 配對；啟思網站另列其他校舍，課程與招生時間可能因校舍而異。以下課程內容是校方機構層面介紹，不能推定東涌校舍每級均開設所有語言或全日班。",
    appendDirectoryDetails: true,
    sources: [
      { label: "啟思幼稚園：課程特色", scope: "校方對自主學習、主題活動、探索及語言課程的整體說明；不代表東涌逐級課時。", url: CREATIVE_CURRICULUM },
      { label: "啟思幼稚園：入學申請及常見問題", scope: "參加幼稚園教育計劃的校舍清單、各校舍年度招生消息和校舍間班制差異。", url: CREATIVE_ADMISSION },
      { label: "教育局《幼稚園概覽 2026/27》：啟思中英文幼稚園（東涌）校址 0002", scope: "東涌校址的班制、語言與統計資料。", url: KGP_CREATIVE_TUNG_CHUNG },
    ],
    detailSections: [
      { title: "啟發式學習與語言環境", featured: true, note: "啟思課程頁涵蓋多所校舍；東涌實際班別、課時與師資配置須以校方分校資料確認。", details: [
        { label: "由主題活動帶動自主學習", value: "校方課程介紹以環境創設、主題活動、經驗分享、模擬遊戲和感官探索培養孩子主動學習。這類安排的家庭價值在於孩子能否參與提問和表達，而不只是完成活動；可向東涌校舍詢問教師如何記錄學習過程並回饋家長。", sourceUrl: CREATIVE_CURRICULUM },
        { label: "語言課程須逐校舍確認", value: "啟思共通課程頁提及中、英、普及其他語言活動，東涌校舍則另有自己的招生和學校概覽頁。家長不應由集團整體「多語」描述推定東涌校舍的語言組合或每日英語時數，應索取本校舍課程表。", sourceUrl: CREATIVE_ADMISSION },
        { label: "N 班與 K1 不能視為自動銜接", value: "校方招生常見問題指出，部分校舍會以校內評核與校外申請者一併處理 K1；各校舍小組班時段也不相同。家庭若考慮由 PN/N 班升 K1，須確認東涌校舍當屆的實際政策和申請流程。", sourceUrl: CREATIVE_ADMISSION },
      ] },
      { title: "東涌校舍的班制與申請", details: [
        { label: "先核對現行上課地址", value: "教育局登記名錄把東涌校址列為校址 0002，並與同校號其他地址分開。班制、師生比例、費用和交通安排均以東涌校舍資料為準。", period: "概覽：2026/27；校址 0002", sourceUrl: KGP_CREATIVE_TUNG_CHUNG },
        { label: "年度招生通告會更新", value: "校方公布東涌校舍接受 2027/28 新生申請，申請時間及面見形式應以當屆公告為準。不要沿用其他校舍的過往日期；報名前核對校舍、入學年度和孩子出生日期資格。", period: "招生公告：2027/28", sourceUrl: CREATIVE_ADMISSION },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lung-kong-world-federation-school-limited-chu-sui-lan-anglo-chinese-kindergarten-158380",
    name: "世界龍岡學校朱瑞蘭（中英文）幼稚園",
    nameEn: "LUNG KONG WORLD FEDERATION SCHOOL LIMITED CHU SUI LAN ANGLO-CHINESE KINDERGARTEN",
    district: "屯門區",
    address: "新界屯門良景邨良傑樓地下 1–10 號",
    gradeSpan: "幼稚園班級；各校址班制見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "158380 / 校址 0001",
    website: CHU_SUI_LAN_HOME,
    dataYear: "教育局《幼稚園概覽》2026/27；課程現行頁及 2026/27 招生安排按校方網站",
    sourceNote: "校方以兒童為本、遊戲、多元教學和生活化探索介紹課程，並獨立列出中華文化活動及非華語申請支援。語言課時、課室日常和活動頻率未見公開，需向校方核實。",
    appendDirectoryDetails: true,
    sources: [
      { label: "世界龍岡學校朱瑞蘭幼稚園：課程及教學", scope: "兒童本位、遊戲學習、品德教育、兩文三語及多元智能的校方課程方向。", url: "https://www.cslkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8-curriculum-and-teaching" },
      { label: "世界龍岡學校朱瑞蘭幼稚園：收生安排", scope: "校方公布的當屆申請安排、非華語申請支援及註冊事項。", url: CHU_SUI_LAN_ADMISSION },
      { label: "教育局《幼稚園概覽 2026/27》：世界龍岡學校朱瑞蘭幼稚園", scope: "班制、語言、師生比例及教育計劃資料。", url: KGP_CHU_SUI_LAN },
    ],
    detailSections: [
      { title: "遊戲學習與文化體驗", featured: true, note: "校方課程理念與活動相片是學校自述，不等於外部評級或每名孩子的成果。", details: [
        { label: "尊重發展差異的兒童本位課程", value: "校方表示課程以兒童為本，按幼兒成長需要循序漸進，透過遊戲、多元教學、感官探索及生活化經驗培養主動求知和自信。家庭可觀察教師在自由探索時如何給予適量引導，以及課程能否兼顧不同語言和發展步伐。", sourceUrl: "https://www.cslkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8-curriculum-and-teaching" },
        { label: "兩文三語與多元學習", value: "校方把兩文三語列為課程特色，並安排品德教育、多元智能及中華文化校本活動。網頁未列英語、粵語和普通話各自的課時；若家庭重視語言沉浸程度，需詢問日常授課語言和不同級別的活動頻率。", sourceUrl: "https://www.cslkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8-curriculum-and-teaching" },
        { label: "文化活動保留年度界線", value: "校方公開 2023/24 等年度的中華文化活動紀錄，內容包括節慶、藝術及親子活動。這可說明曾有校本文化活動，但不能代表每年相同安排或每名學生參與程度；參觀時可問現行學年活動計劃。", period: "公開活動紀錄：2022/23–2023/24", sourceUrl: "https://www.cslkg.edu.hk/%E4%B8%AD%E8%8F%AF%E6%96%87%E5%8C%96%E6%A0%A1%E6%9C%AC%E5%AD%B8%E7%BF%92%E6%B4%BB%E5%8B%95" },
      ] },
      { title: "申請與家庭支援", details: [
        { label: "全年派表與當屆面見", value: "校方收生頁列明全年派發申請表，並公布 2026/27 個別面見及註冊流程。2027/28 的具體日期須按新公告核對，不要把上一年度面見時間當成本屆日程。", period: "申請資訊：2026/27；請查看新年度公告", sourceUrl: CHU_SUI_LAN_ADMISSION },
        { label: "非華語家庭可先查詢支援", value: "校方表示接受非華語學生申請，並可按需要安排翻譯及支援。這是可用支援的校方說明；家庭應在面見前告知語言需要，確認翻譯方式及日常家校溝通語言。", sourceUrl: CHU_SUI_LAN_ADMISSION },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sun-island-english-kindergarten-sai-ying-pun-branch-552739",
    name: "太陽島英文幼稚園（西營盤分校）",
    nameEn: "SUN ISLAND ENGLISH KINDERGARTEN (SAI YING PUN BRANCH)",
    district: "中西區",
    address: "香港皇后大道西 323 號安達中心 1 樓",
    gradeSpan: "幼稚園班級；校址 0001 及 0002 分列，見教育局概覽",
    schoolType: "幼稚園（教育局登記）",
    schoolNumber: "552739 / 主要授課校址 0002；教育局另列校址 0001",
    website: SUN_ISLAND_SYP_HOME,
    dataYear: "教育局位置及註冊資料截至 2026-10；收費證明生效 2025-04-03；課程按校方現行 FAQ",
    sourceNote: "教育局把西營盤分校的兩個校址編號分列：卑路乍街 0001、皇后大道西 0002。收費證明亦同時列兩址，費用以證明書生效日為準；未找到更新至 2026/27 的同校號收費證明，故不把 2025 數字說成當屆最新。",
    appendDirectoryDetails: true,
    sources: [
      { label: "太陽島英文幼稚園（西營盤分校）官方校舍頁", scope: "分校聯絡和校舍資訊入口。", url: SUN_ISLAND_SYP_HOME },
      { label: "太陽島英文幼稚園：常見問題", scope: "機構公布的中文班／雙語班、報名與校車安排；以分校當屆實際提供為準。", url: SUN_ISLAND_FAQ },
      { label: "教育局收費證明：太陽島英文幼稚園（西營盤分校）", scope: "證明生效 2025-04-03；列兩個校址和全日班膳食費，未視為 2026/27 更新。", url: SUN_ISLAND_SYP_FEES },
      { label: "教育局《幼稚園概覽 2026/27》：太陽島西營盤分校校址 0002", scope: "皇后大道西校址的班制及已公布概覽欄位。", url: KGP_SUN_ISLAND_SYP },
    ],
    detailSections: [
      { title: "西營盤校址與語言班選擇", featured: true, note: "學校編號下有兩個登記校址；選班、接送、費用需按實際上課地址確認。", details: [
        { label: "先分清兩個校址", value: "教育局核准資料把卑路乍街和皇后大道西安達中心列作不同校址。兩址的課室容量、班制和上課地點不能合併理解；家長收到面見或取錄通知後，應再核對具體地址。", sourceUrl: SUN_ISLAND_SYP_FEES },
        { label: "語言組別帶來不同學習重心", value: "太陽島官方 FAQ 說明中文班以粵語為主，雙語班以英語為主，中文課時約佔六分之一。此為機構層面的課程說明，家長須確認西營盤校址當屆是否開辦所選組別及各級實際安排。", sourceUrl: SUN_ISLAND_FAQ },
        { label: "校巴路線先以地址核對", value: "校方表示大部分分校委託校巴服務公司，但路線需向分校查詢。西營盤兩個地址相距並不代表可互換接送，家庭應按孩子實際上課校址取得校巴站點、時間和收費。", sourceUrl: SUN_ISLAND_SYP_HOME },
      ] },
      { title: "班制與費用年份", details: [
        { label: "校址 0002 概覽資料", value: "教育局《幼稚園概覽 2026/27》按校址 0002 列示皇后大道西校舍資料；該校址的班制和師生比例應獨立閱讀，不能套用 0001。", period: "2026/27；校址 0002", sourceUrl: KGP_SUN_ISLAND_SYP },
        { label: "舊收費證明仍須重核", value: "可讀的教育局收費證明生效日為 2025 年 4 月 3 日，列全日班膳食費等項目。因未找到同一校號更新的 2026/27 證明，本頁不以該數字代表現行全年支出，報名前應索取最新核准收費表。", period: "證明生效：2025-04-03", sourceUrl: SUN_ISLAND_SYP_FEES },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chuen-yuen-church-kindergarten-152269",
    name: "全完堂幼稚園",
    nameEn: "CHUEN YUEN CHURCH KINDERGARTEN",
    district: "荃灣區",
    address: "新界荃灣大屋街 2 至 4 號地下",
    gradeSpan: "K1–K3；上午及下午班",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    schoolNumber: "152269 / 校址 0001",
    website: CHUEN_YUEN_CHURCH_HOME,
    dataYear: "教育局《幼稚園概覽》2026/27；校方 2027/28 入學資訊及 2026/27 代辦費用",
    sourceNote: "全完堂幼稚園是荃灣辦學逾半世紀的教會幼稚園。校方已公布 2027/28 入學流程；收費表區分學費與書簿、茶點、校服等代辦支出。本頁保留各項年度，家庭總支出仍須按孩子級別及實際購買項目計算。",
    appendDirectoryDetails: true,
    sources: [
      { label: "全完堂幼稚園官方網站：學校背景與辦學方向", scope: "校方公布創辦背景、校訓、教會關係及品格教育方向。", url: CHUEN_YUEN_CHURCH_HOME },
      { label: "全完堂幼稚園：報名流程及代辦項目收費", scope: "2027/28 招生流程，以及 2026/27 校服、書簿和茶點收費；年度及未定項目按原頁保留。", url: CHUEN_YUEN_CHURCH_ADMISSION },
      { label: "教育局《幼稚園概覽 2026/27》：全完堂幼稚園校址 0001", scope: "班制、師生比例、授課語言及幼稚園教育計劃資料。", url: KGP_CHUEN_YUEN_CHURCH },
    ],
    detailSections: [
      { title: "教會辦學與品格教育", featured: true, note: "學校歷史和宗教方向來自校方自述；家庭應同時了解日常課程、宗教活動和家校溝通方式。", details: [
        { label: "社區連結與基督教價值", value: "校方介紹幼稚園於 1964 年創辦，隸屬中華基督教會全完堂，並以教養孩童、建立品格和學習基礎作辦學方向。對認同教會文化的家庭，價值教育可能是重要選校因素；家長也可詢問宗教活動的日常安排及如何照顧不同信仰背景。", sourceUrl: CHUEN_YUEN_CHURCH_HOME },
        { label: "升小資訊與家庭參與", value: "校方網站設有升小資訊、家長工作及校本活動入口，反映家校合作是公開資訊的一部分。家庭可留意升小講座提供哪些制度資訊、家長參與是否有固定要求，以及教師如何回饋孩子的學習進度。", sourceUrl: CHUEN_YUEN_CHURCH_HOME },
        { label: "費用不止學費一項", value: "校方 2026/27 收費頁列上、下學期課本費、全年茶點費及校服用品價格；同頁說明持有效幼稚園入學註冊證的 K1–K3 上午及下午學費為零。家長應把已知必需項目與自選用品分開編列預算。", period: "校方收費表：2026/27", sourceUrl: CHUEN_YUEN_CHURCH_ADMISSION },
      ] },
      { title: "2027/28 入學時間線", details: [
        { label: "校方公布的面見與註冊安排", value: "校方公布 2027/28 新生申請於 2026 年 9 月開始，全年接受申請，面見日為 2026 年 11 月 7 日，並於 12 月 11 日前通知取錄；正選生註冊安排於 2027 年 1 月 7 至 9 日。若校方更新日期，以最新通告為準。", period: "入學年度：2027/28", sourceUrl: CHUEN_YUEN_CHURCH_ADMISSION },
        { label: "非華語申請者可預先安排溝通", value: "校方表示面見非華語兒童時可按需要安排傳譯或翻譯，也可由懂中文的親友陪同協助溝通。家庭應在面見前聯絡校方，確認可用語言及文件形式。", sourceUrl: CHUEN_YUEN_CHURCH_ADMISSION },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chinese-international-school-215589",
    name: "漢基國際學校",
    nameEn: "Chinese International School",
    district: "東區",
    address: "香港北角寶馬山校園徑 1 號",
    schoolNumber: "215589 / 校址 0001",
    schoolType: "私立國際學校幼稚園部",
    gradeSpan: "Reception；半日制",
    website: "https://www.cis.edu.hk/",
    dataYear: "招生及課程資料查閱於 2026-10；入學年度 2027/28",
    sourceNote: "本頁幼稚園資料指漢基國際學校 Reception 入學級別，不把小學或中學課程內容套用到幼稚園。入學名額、年齡、語言要求和觀察流程按校方當屆招生頁核對。",
    appendDirectoryDetails: true,
    sources: [
      { label: "漢基國際學校：Reception 入學", scope: "2027/28 入學年齡、半日安排、名額、申請程序及觀察要求。", url: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
      { label: "漢基國際學校：入學要求", scope: "Reception 對英語、普通話或粵語其中一種語言能力的要求。", url: "https://www.cis.edu.hk/admissions/entry-requirements" },
      { label: "教育局《幼稚園概覽 2026/27》：漢基校址 0001", scope: "教育局所列授課語言及其他可取得的校址統計。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2155890001" },
    ],
    detailSections: [
      { title: "Reception 入學與語言準備", featured: true, note: "以下為校方招生要求，不代表錄取承諾；每屆名額與日期以最新公告為準。", details: [
        { label: "從 Reception 開始銜接", value: "校方把 Reception 列為漢基入學級別，申請兒童須於入學年度 8 月 31 日前滿 4 歲；該級為半日制，校方列出 96 個名額。家庭應把這看作具體招生規模，而非保證錄取或固定每年增補名額。", period: "入學年度：2027/28", sourceUrl: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
        { label: "先掌握一種語言即可申請", value: "校方要求 Reception 申請者能以英語、普通話或粵語其中一種語言作有力溝通，並明確表示申請時不要求已有雙語能力。對家庭的實際意義是：不必為了申請先把孩子訓練成雙語者，但要留意校方會評估孩子在適齡階段的認知、社交與情緒發展。", sourceUrl: "https://www.cis.edu.hk/admissions/entry-requirements" },
        { label: "家庭也在評估範圍內", value: "申請包括家長問卷、必須參加的資訊會，以及孩子的小組觀察；校方明言重視家庭是否理解並認同學校使命。家長宜先確認雙語、跨文化教育是否符合全家的長期期待，再安排觀察和申請。", period: "入學年度：2027/28", sourceUrl: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "canadian-international-school-of-hong-kong-216011",
    name: "香港加拿大國際學校",
    nameEn: "Canadian International School of Hong Kong",
    district: "南區",
    address: "香港仔南朗山道 36 號及黃竹坑香葉道 11 號 THE SOUTHSIDE",
    schoolNumber: "216011 / 幼稚園校址 0005、0006",
    schoolType: "私立國際學校幼稚園部",
    gradeSpan: "Nursery、Early Years 1；各校址班級不同",
    website: "https://www.cdnis.edu.hk/",
    dataYear: "校舍資料查閱於 2026-10；學費 2026/27",
    sourceNote: "教育局把 CDNIS 幼稚園校址分列為南朗山道 0005 和 THE SOUTHSIDE 0006。新增課程與收費內容只針對校方明確說明的 Early Years Centre，家庭需在申請前核對實際校址、級別和時段。",
    appendDirectoryDetails: true,
    sources: [
      { label: "CDNIS Early Years Centre：課程與常見問題", scope: "THE SOUTHSIDE 校址的兩歲 Nursery、三歲 Early Years 1、雙語探究式遊戲學習及上課時段。", url: "https://www.cdnis.edu.hk/academics/nursery-eng" },
      { label: "CDNIS：學費及費用", scope: "2026/27 Nursery、EY1、EY2 官方學費及相關費用項目。", url: "https://www.cdnis.edu.hk/admissions/tuition-fees" },
      { label: "教育局《幼稚園概覽 2026/27》：CDNIS 校址 0005", scope: "南朗山道校址資料，不套用於 THE SOUTHSIDE 校址。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2160110005" },
    ],
    detailSections: [
      { title: "THE SOUTHSIDE 幼兒教育中心", featured: true, note: "此節只描述教育局校址 0006；不應與南朗山道主校舍的班制或名額合併。", details: [
        { label: "兩歲 Nursery 與三歲 EY1", value: "校方在 THE SOUTHSIDE 幼兒教育中心提供兩歲 Nursery 及三歲 Early Years 1。兩個級別均以半日形式運作，平日三小時；這較適合希望幼兒先以短時段適應校園的家庭，接送安排則需配合早上或下午時段。", sourceUrl: "https://www.cdnis.edu.hk/academics/nursery-eng" },
        { label: "中英雙語配合探究式遊戲", value: "校方描述兩個級別透過中英雙語接觸、IB 探究學習與遊戲活動，讓幼兒在安全環境中發展感官、語言、社交情緒和解難能力。這是校方課程設計方向，不代表每名孩子的語言成果；參觀時可了解中英文教師如何共同帶課及回饋學習進度。", sourceUrl: "https://www.cdnis.edu.hk/academics/nursery-eng" },
        { label: "2026/27 學費與額外支出分開看", value: "校方 2026/27 費用表列 Nursery 半日學費每年 HK$142,780、Early Years 1 半日 HK$161,000；其後級別另有不同費用及資本徵費安排。報名前應將申請費、學費和適用的資本徵費逐項確認，不能只按學費估算家庭總投入。", period: "2026/27", sourceUrl: "https://www.cdnis.edu.hk/admissions/tuition-fees" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "harrow-little-lions-kindergarten-627275",
    name: "哈羅小獅幼稚園",
    nameEn: "Harrow Little Lions Kindergarten",
    district: "觀塘區",
    address: "九龍觀塘道 55 號",
    schoolNumber: "627275 / 校址 0001",
    schoolType: "私立國際幼稚園",
    gradeSpan: "Nursery（K1）、Reception（K2）",
    website: "https://www.harrowhongkong.hk/hll/",
    dataYear: "課程與招生資料查閱於 2026-10；2025/26 費用只作指定年度參考",
    sourceNote: "哈羅小獅採用校方自訂的 Little Lions Curriculum，課程以英國 Early Years Foundation Stage 為參照並融入哈羅價值。官網亦提及 Gold Coast 延續幼兒班安排；申請時須確認孩子所屬校址及當屆班額，不能把不同校址資訊合併。",
    appendDirectoryDetails: true,
    sources: [
      { label: "哈羅小獅幼稚園：課程", scope: "Little Lions Curriculum、課程年齡及學習領域。", url: "https://www.harrowhongkong.hk/hll/academic/curriculum/" },
      { label: "哈羅小獅幼稚園：教學法", scope: "以遊戲、觀察、個別興趣與互動支持幼兒探索的校方說明。", url: "https://www.harrowhongkong.hk/hll/academic/pedagogy/" },
      { label: "哈羅小獅幼稚園：常見問題", scope: "課室語言、普通話課時、師生配置、校址及優先銜接安排；費用僅按原列年度引用。", url: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
      { label: "教育局《幼稚園概覽 2026/27》：哈羅小獅校址 0001", scope: "觀塘道登記校址班制與概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6272750001" },
    ],
    detailSections: [
      { title: "Little Lions 課程與語言安排", featured: true, note: "課程、師資和校址內容以校方現行 FAQ 為準；過往學費不可當作本學年收費。", details: [
        { label: "課程不只追求提早學科化", value: "校方把課程分為十個學習領域和五項學習習慣，並以記憶、觀察、推理和分類等能力作為幼兒學習過程的一部分。遊戲與教師觀察是重要教學方式；若家庭重視清晰的紙筆進度，參觀時應直接問校方如何記錄學習成果。", sourceUrl: "https://www.harrowhongkong.hk/hll/academic/curriculum/" },
        { label: "英語為課堂主要溝通語言", value: "校方表示課堂語言為英語，並為所有幼兒安排每週一小時普通話；Reception 階段開始較正式的拼音教學。家長可據此評估孩子是否能在英語環境中適應，同時確認普通話安排是否符合家庭的語言期望。", sourceUrl: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
        { label: "先查清楚校址及升讀條件", value: "官方 FAQ 表示小獅幼稚園學生申請哈羅香港國際學校 Year 1 可獲優先考慮，並非無條件直升；FAQ 亦提及 Gold Coast 校址仍有 Nursery 和 Reception 班。家長應向招生處確認孩子所屬校址、可用學額與優先安排的具體條款。", sourceUrl: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "yew-chung-international-school-325147",
    name: "耀中國際學校",
    nameEn: "Yew Chung International School of Hong Kong",
    district: "九龍城區",
    address: "九龍九龍塘森麻實道 3、3A 及 22 號",
    schoolNumber: "325147 / 校址 0006",
    schoolType: "私立國際幼稚園及幼兒教育課程",
    gradeSpan: "幼兒教育課程；兩歲及三至四歲班別",
    website: "https://www.ycis-hk.com/tc/academics",
    dataYear: "校方課程資料查閱於 2026-10；教育局概覽 2026/27",
    sourceNote: "以下課程重點按耀中香港幼兒教育官方頁整理，校方列有九龍塘幼稚園校舍。不同年齡班別的時間、師生比例及課程節奏並不完全相同，應按申請級別核對。",
    appendDirectoryDetails: true,
    sources: [
      { label: "耀中國際學校：幼兒教育課程", scope: "英中雙語、遊戲為本、雙教師制、年齡課程與家校活動。", url: "https://www.ycis-hk.com/tc/academics" },
      { label: "耀中國際學校：幼兒教育課程（英文課程詳情）", scope: "各年齡班別的課程安排、師生配置及每日時間表。", url: "https://www.ycis-hk.com/en/academics/early-childhood?tab_timeline=kindergarten-two-s" },
      { label: "教育局《幼稚園概覽 2026/27》：耀中校址 0006", scope: "教育局按校址列出的班制、授課語言及統計資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3251470006" },
    ],
    detailSections: [
      { title: "雙教師與遊戲為本的雙語環境", featured: true, note: "下列是耀中香港幼兒教育課程介紹；日程和師生配置按年齡班別區分。", details: [
        { label: "英語與中文教師共同帶班", value: "校方介紹幼兒班由英語教師與中文教師共同支援，讓幼兒在英語和粵語環境中自然互動；三至四歲級別的官方資料列每班兩名共同教學人員，兩歲級別的安排另有說明。這種模式適合重視雙語日常接觸的家庭，實際語言比例仍應看班別時間表。", sourceUrl: "https://www.ycis-hk.com/tc/academics" },
        { label: "由孩子主導的遊戲與觀察", value: "課程以遊戲、兒童興趣和教師觀察推進，並透過個人學習記錄追蹤成長。家長可把重點放在教師如何將孩子的興趣轉成語言、數概念或社交活動，而不是只比較活動名稱。", sourceUrl: "https://www.ycis-hk.com/en/academics/early-childhood?tab_timeline=kindergarten-two-s" },
        { label: "家庭參與是校方教育模式一部分", value: "校方把家長及照顧者工作坊、課程分享和家校互動納入幼兒教育介紹。對雙職家庭而言，宜預先了解活動頻率、溝通平台與家長參與方式，衡量這種合作模式是否可持續。", sourceUrl: "https://www.ycis-hk.com/tc/academics" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "invictus-kindergarten-615366",
    name: "INVICTUS KINDERGARTEN",
    nameEn: "Invictus Kindergarten",
    district: "西貢區",
    address: "新界將軍澳唐俊街 23 號 MONTEREY PLACE 地下 G27–G28 號舖",
    schoolNumber: "615366 / 校址 0001",
    schoolType: "私立國際幼稚園",
    gradeSpan: "Nursery 至 Reception；半日及全日班",
    website: "https://www.invictus.edu.hk/tko",
    dataYear: "課程資料查閱於 2026-10；教育局概覽 2026/27",
    sourceNote: "以將軍澳校舍目前的校方頁為準。校方現行介紹採用 Cambridge Early Years；較舊宣傳冊所用課程名稱已不沿用，中文課程描述亦只作學校自述，不代表教育局概覽所列授課語言課時。",
    appendDirectoryDetails: true,
    sources: [
      { label: "Invictus 將軍澳校舍：幼稚園課程", scope: "現行 Cambridge Early Years、六個發展領域、中國語文及半日／全日作息。", url: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
      { label: "教育局《幼稚園概覽 2026/27》：Invictus 校址 0001", scope: "教育局所列校址班制、語言及師生比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6153660001" },
    ],
    detailSections: [
      { title: "Cambridge Early Years 與作息重心", featured: true, note: "課程採校方現行頁說法；所述課時安排不等同教育局概覽的授課語言統計。", details: [
        { label: "六個發展領域作為課程框架", value: "校方列出語言與讀寫、數學、創意表達、認識世界、體能發展及個人社交情緒六個範疇，並稱採用 Cambridge Early Years。這種框架把學科準備與社交、身體發展並列，家長可進一步了解各級如何把領域落實到每日活動。", sourceUrl: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
        { label: "上午與下午活動方向不同", value: "校方介紹半日班上午較側重語言和數學；全日班下午則安排體能、創意及探究活動。選半日或全日不只是照顧時間差異，也會改變孩子接觸不同課程範疇的時段，報名前應取得當屆作息表。", sourceUrl: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
        { label: "中文課程與英語授課欄分開理解", value: "校方稱幼兒另學中文，並以繁體字為課程特色；教育局《幼稚園概覽》授課語言欄列英語。兩者描述的不是同一指標，不能據此推算中英課時比例；若家庭希望了解粵語、普通話和英語的實際使用情況，應索取班級時間表。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6153660001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tt",
    name: "崇真小學暨幼稚園",
    nameEn: "Tsung Tsin Primary School and Kindergarten",
    district: "深水埗區",
    address: "九龍大埔道 58 號東翼教學大樓",
    schoolNumber: "514659 / 校址 0001",
    schoolType: "私立幼稚園部",
    gradeSpan: "幼稚園部；中英文及英語普通話課程安排須按當屆確認",
    website: "https://www.ttpskg.edu.hk/primary-school/tc/",
    dataYear: "校方網站查閱於 2026-10；教育局概覽 2026/27；部分課程介紹為歷史資料",
    sourceNote: "崇真小學暨幼稚園同址設有不同學段。幼稚園的官方網站提供幼稚園課程、教育理念和招生入口；本頁不將小學課程欄目當作幼稚園教學內容，雙語／英普班別只在找到當屆文件支持時才作說明。",
    appendDirectoryDetails: true,
    sources: [
      { label: "崇真小學暨幼稚園：幼稚園部教育理念及課程入口", scope: "幼稚園部教育理念、課程發展、評估和家校合作資料。", url: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/site_map.php?lang=zh&menuid=4&mode=published" },
      { label: "崇真小學暨幼稚園：幼稚園部招生表", scope: "校方公開的部別及家校合作要求；表格內容可能按招生年度更新。", url: "https://www.ttpskg.edu.hk/it-school/php/webcms/files/upload/tinymce/kg/04_01_kg_enrolment_form_1276525132.pdf" },
      { label: "教育局《幼稚園概覽 2026/27》：崇真校址 0001", scope: "教育局所列幼稚園部可取得的班制、語言和費用資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5146590001" },
    ],
    detailSections: [
      { title: "基督教全人教育與家校配合", featured: true, note: "校方招生表為較早版本；當屆班別名稱、語言安排及收生細節須向學校確認。", details: [
        { label: "家庭是否認同辦學理念是重要配合點", value: "校方幼稚園招生文件把支持學校使命與教育理念列為申請家庭須理解的事項，並以基督教全人教育和多元發展作方向。這對家庭的選校意義不止宗教背景，也包括是否接受學校對生活習慣、品格和家校合作的要求。", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/files/upload/tinymce/kg/04_01_kg_enrolment_form_1276525132.pdf" },
        { label: "課程與幼兒支援有獨立欄目", value: "官方網站為幼稚園部設有教育理念、課程發展、學習評估、家長合作和學生支援等入口。家長可在參觀時逐項了解孩子學習如何被觀察記錄、遇到適應或發展需要時如何跟進，而不要只以同名小學的課程資料代替幼稚園資訊。", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/site_map.php?lang=zh&menuid=4&mode=published" },
        { label: "申請前確認幼稚園部別與語言流", value: "學校曾以中英文幼稚園部及英語普通話幼稚園部區分課程；目前官網列有幼稚園部課程入口，但舊招生表不能證明 2026/27 各級仍以相同名稱及模式開班。家長應直接確認孩子申請的部別、中文／英文／普通話使用方式和現屆名額。", period: "部別說明來自校方歷史招生資料；現況待校方確認", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/files/upload/tinymce/kg/04_01_kg_enrolment_form_1276525132.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "pc",
    name: "香港培正小學（幼稚園）",
    nameEn: "Pui Ching Primary School (Kindergarten)",
    district: "九龍城區",
    address: "九龍窩打老道 80 號",
    schoolNumber: "513350 / 校址 0001",
    schoolType: "私立幼稚園",
    gradeSpan: "K1–K3；上午及下午班",
    website: "https://www.pcps.edu.hk/kg/tc",
    dataYear: "幼稚園課程及活動查閱於 2026-10；教育局概覽 2026/27",
    sourceNote: "此頁只介紹香港培正小學附設幼稚園的幼兒課程，不把培正小學課程或升小去向當作幼稚園學習成果。校方課程以生活主題連結多個發展範疇，普通話另有獨立課程說明。",
    appendDirectoryDetails: true,
    sources: [
      { label: "培正小學（幼稚園）：主題教學", scope: "幼稚園生活化主題、六個學習範疇及課程目標。", url: "https://www.pcps.edu.hk/kg/en/subject/thematic-approach" },
      { label: "培正小學（幼稚園）：普通話課程", scope: "幼兒普通話聆聽、說話、唐詩、兒歌及拼音活動。", url: "https://www.pcps.edu.hk/kg/tc/subject/putonghua" },
      { label: "培正小學（幼稚園）：學校活動", scope: "2026 年家長會、幼兒適應日及 K1–K3 活動公告。", url: "https://www.pcps.edu.hk/kg/tc/activities" },
      { label: "教育局《幼稚園概覽 2026/27》：培正校址 0001", scope: "教育局按幼稚園登記校址所列語言、班制及師生統計。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5133500001" },
    ],
    detailSections: [
      { title: "生活主題與幼小銜接", featured: true, note: "課程說明來自培正幼稚園官方頁；學習內容不等同小學取錄或直升保證。", details: [
        { label: "主題把六個範疇連成生活經驗", value: "校方以生活化主題串連體能與健康、語文、幼兒數學、大自然與生活、個人與群體、藝術與創意，讓孩子把活動和日常經驗相連。家長可觀察孩子是否有機會用說話、操作和創作表達理解，而非只完成單一練習。", sourceUrl: "https://www.pcps.edu.hk/kg/en/subject/thematic-approach" },
        { label: "普通話不是只背拼音", value: "幼稚園普通話課程包括聆聽、說話、故事理解、唐詩、唱歌和拼音，並以遊戲及兒歌帶入日常詞彙。若家庭希望判斷中英普的實際比重，仍須向校方索取各級時間表；單一課程介紹不能推出每週課時。", sourceUrl: "https://www.pcps.edu.hk/kg/tc/subject/putonghua" },
        { label: "有幼小活動，但不代表升小承諾", value: "校方活動頁曾列「飛躍小一課程」及 K1 適應日，反映校內有銜接與入園適應活動。家長應分清幼兒學習支援和小一取錄機制，並向校方確認本屆升小安排、名額及評估方式。", period: "活動公告：2026", sourceUrl: "https://www.pcps.edu.hk/kg/tc/activities" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-international-montessori-school-an-imef-school-548430",
    name: "蒙特梭利國際學校",
    nameEn: "The International Montessori School (An IMEF School)",
    district: "多區（南區、東區、中西區）",
    address: "4 個教育局登記校址；地址按校址分列",
    schoolNumber: "548430",
    schoolType: "私立國際幼稚園及學校",
    gradeSpan: "Foundation 至 Casa dei Bambini（約 2–6 歲）；各校址安排不同",
    website: "https://www.ims.edu.hk/en/programmes",
    dataYear: "課程資料查閱於 2026-10；教育局概覽 2026/27 分校址列示",
    sourceNote: "蒙特梭利國際學校有多個教育局登記校址，課程介紹為學校層面資料；班制、PN、授課語言、比例與收費須分別按校址核對。不要把某一校址的數據代表整間學校。",
    directoryDetailScope: "school",
    appendDirectoryDetails: true,
    sources: [
      { label: "IMS：課程及年齡階段", scope: "Foundation、Casa dei Bambini 等校方課程階段及發展目標。", url: "https://www.ims.edu.hk/en/programmes" },
      { label: "IMS：Casa dei Bambini（3–6 歲）", scope: "混齡課室、兒童主導活動、英中語言及家長溝通安排。", url: "https://www.ims.edu.hk/en/programmes/casa-dei-bambini" },
      { label: "IMS：蒙特梭利教學特色", scope: "教師個別或小組教學、依兒童能力和興趣調整材料與學習步伐。", url: "https://www.ims.edu.hk/en/about-ims/the-montessori-difference" },
      { label: "教育局《幼稚園概覽 2026/27》：IMS 各校址", scope: "校址 0003、0004、0006、0007 分別列示班制、語言和費用資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5484300006" },
    ],
    detailSections: [
      { title: "蒙特梭利課室與混齡學習", featured: true, note: "本節是校方層面的課程介紹；各校址的日程、年齡組別與師生配置應分別查詢。", details: [
        { label: "3–6 歲 Casa dei Bambini 為三年課程", value: "校方把 Casa dei Bambini 列為約 3 至 6 歲的三年課程，並介紹混齡學習、兒童主導活動和重複操作。孩子可在不同能力的同伴間觀察和合作；家長需確認申請校址是否開辦該級，以及孩子入讀時實際的年齡組合。", sourceUrl: "https://www.ims.edu.hk/en/programmes/casa-dei-bambini" },
        { label: "學習步伐依孩子發展而調整", value: "校方描述教師會以個別或小組方式提供材料和示範，並依孩子興趣、能力和發展階段安排工作。這種模式重視自主投入；參觀時可留意教師如何協助孩子選擇活動、觀察進度，以及處理需要額外支持的情況。", sourceUrl: "https://www.ims.edu.hk/en/about-ims/the-montessori-difference" },
        { label: "語言、校址與費用不能用一組數字概括", value: "IMS 在多區設有四個登記校址，教育局概覽按校址分列班制、語言、比例和學費；校方課程頁所述的英中學習屬機構課程介紹。家庭比較時應以實際申請校址和年齡級別重新核對所有數字。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5484300006" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tsuen-wan-trade-association-chung-loi-kindergarten-158640",
    name: "荃灣商會鍾來幼稚園",
    nameEn: "Tsuen Wan Trade Association Chung Loi Kindergarten",
    district: "葵青區",
    address: "新界青衣牙鷹洲街 3 號青雅苑地下",
    telephone: "+852 2433 3881",
    schoolNumber: "158640 / 校址 0001",
    schoolType: "非牟利幼稚園，參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.twtaclk.edu.hk/",
    dataYear: "招生資料：2027/28；課程及概覽：2026/27；官網查閱於 2026-10",
    sourceNote: "學校位於青衣，教育局資料歸葵青區；校方 2027/28 新生資料列明 K1 預計半日班及全日班各 45 個學額，這是該屆公布數字，不代表日後每年固定招生量。",
    appendDirectoryDetails: true,
    sources: [
      { label: "荃灣商會鍾來幼稚園：課程及學校資料", scope: "以幼兒為本、遊戲策略、活動教學、語言活動、家校支援與持續觀察評估。", url: "https://www.twtaclk.edu.hk/l/fa42cCwtQ" },
      { label: "荃灣商會鍾來幼稚園：2027/28 K1 招生安排", scope: "申請時程、面見程序、考慮因素及該屆 K1 班額。", url: "https://www.twtaclk.edu.hk/l/fabd9Cw1X" },
      { label: "教育局《幼稚園概覽 2026/27》：鍾來幼稚園校址 0001", scope: "班制、粵語授課、師生比例及免費計劃資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1586400001" },
    ],
    detailSections: [
      { title: "遊戲策略、個別差異與家校觀察", featured: true, note: "理念與活動安排為校方自述；該屆招生數字不應外推為長期固定學額。", details: [
        { label: "活動教學讓幼兒從經驗建構理解", value: "校方說明課程依教育局指引編訂，以幼兒為本、遊戲為策略，透過主題活動、小組與團體活動、參觀和探索建立學習經驗。家長可在參觀時觀察孩子是否有充足表達和操作機會，並了解教師如何按不同發展需要調整活動。", sourceUrl: "https://www.twtaclk.edu.hk/l/fa42cCwtQ" },
        { label: "兩文三語是接觸機會，不是課時比例", value: "校方介紹中文、英文及普通話接觸，並提到按個別幼兒需要設計課程；教育局概覽授課語言欄列粵語。兩種資料應分開理解，不能直接推算每天各語言所佔時間。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1586400001" },
        { label: "2027/28 K1 公布半日、全日各 45 席", value: "校方 2027/28 招生資料列出 K1 全日班 45 人、半日班 45 人，並會安排申請幼兒面見。這為家庭提供該屆招生規模參考，不能當作空缺數或每年固定學額；實際班額和班別仍以校方最新公告為準。", period: "入學年度：2027/28", sourceUrl: "https://www.twtaclk.edu.hk/l/fabd9Cw1X" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "york-klt",
    name: "約克英文小學暨幼稚園（九龍塘）",
    nameEn: "York English Primary School & Kindergarten (Kowloon Tong)",
    district: "九龍城區",
    address: "九龍九龍塘金巴倫道 49 號",
    schoolNumber: "322822 / 校址 0002",
    schoolType: "私立幼稚園",
    gradeSpan: "幼稚園班級；實際年齡級別按當屆校方安排",
    website: "https://www.york.edu.hk/",
    dataYear: "教學資料查閱於 2026-10；教育局概覽 2026/27；費用按校方當屆表格",
    sourceNote: "約克於多區設有幼稚園校舍，這頁只對應九龍塘教育局校址 0002。校方網站的語言與音樂課程介紹為機構自述，申請時要確認九龍塘該級別的實際班制、課時、收費和校車路線。",
    appendDirectoryDetails: true,
    omitDirectoryDetailTitles: ["聯絡與授課資料"],
    sources: [
      { label: "約克國際幼稚園：語言課程", scope: "英語、粵語及普通話的課程方式、故事、歌曲、角色扮演與閱讀安排。", url: "https://york.edu.hk/en/languages.html" },
      { label: "約克英文小學暨幼稚園：校舍與幼兒課程", scope: "約克機構幼稚園課程及各校舍資料入口。", url: "https://york.edu.hk/mobile/" },
      { label: "約克英文小學暨幼稚園：2026/27 費用資料", scope: "申請級別、收費及其他適用費項；按原文件版本使用。", url: "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO_8-10.pdf" },
      { label: "教育局《幼稚園概覽 2026/27》：約克九龍塘校址 0002", scope: "九龍塘校址班制、授課語言、師生比例及核准學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3228220002" },
    ],
    detailSections: [
      { title: "語言接觸與音樂特色", featured: true, note: "校方課程頁涵蓋機構層面內容；家庭須向九龍塘校舍核對各級實際開辦安排。", details: [
        { label: "英語、粵語與普通話並行接觸", value: "校方介紹英語課程由英語母語教師帶領，並以小組活動、共讀和角色扮演支援讀寫；中文部分涵蓋粵語及普通話，透過遊戲、歌曲、故事和活動反覆練習。家長若在意粵普比例，應索取九龍塘校舍和所申請班級的時間表。", sourceUrl: "https://york.edu.hk/en/languages.html" },
        { label: "小提琴作為音樂教學特色", value: "校方網站稱在學前課程中以小提琴教育作音樂教學方法之一。對孩子的實際體驗，家庭應進一步確認課程適用年級、上課頻率、是否包含在學費，以及樂器或額外活動費用。", sourceUrl: "https://york.edu.hk/mobile/" },
        { label: "校址與服務逐項核對", value: "約克有多個登記校舍，教育局概覽按校址 0002 列出九龍塘資料。官網提及校巴服務覆蓋香港多區，但實際路線和接送點要按家庭住址向該校舍確認；不要把其他分校的班制或路線套用到九龍塘。", period: "概覽：2026/27；校址 0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3228220002" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tai-ping-kindergarten-158593",
    name: "太平幼稚園",
    nameEn: "TAI PING KINDERGARTEN",
    district: "北區",
    address: "新界上水太平邨平易樓地下",
    telephone: "+852 2673 3199",
    schoolNumber: "158593 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園班級；班制按教育局概覽及當屆校方資料",
    website: "https://www.taiping.edu.hk/",
    dataYear: "課程及招生資料查閱於 2026-10；收費：2025/26；教育局概覽：2026/27",
    sourceNote: "校方以故事教學、主題活動、方案教學和戶外考察介紹課程；招生程序與費用按各自適用年度理解。2025/26 收費不可當作 2026/27 或之後的核准收費。",
    appendDirectoryDetails: true,
    sources: [
      { label: "太平幼稚園：課程特色", scope: "校方公布的活動式、故事、主題及方案教學和持續觀察評估。", url: "https://www.taiping.edu.hk/課程特色/" },
      { label: "太平幼稚園：入學申請", scope: "校方公布的 2027/28 新生申請、面見及註冊安排。", url: "https://www.taiping.edu.hk/入學申請/" },
      { label: "太平幼稚園：代辦項目及學費", scope: "2025/26 半日及全日班收費與自願購買項目；非現屆收費承諾。", url: "https://www.taiping.edu.hk/代辦項目/" },
      { label: "教育局《幼稚園概覽 2026/27》：太平幼稚園", scope: "校址 0001 的班制、語言、師生比例及學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585930001" },
    ],
    detailSections: [
      { title: "故事教學與主題探索", featured: true, note: "以下為校方對課程的自述；課程名稱不能代替實際課堂觀察。", details: [
        { label: "從聽說延伸到讀寫", value: "校方以故事教學作為語文活動的起點，描述幼兒先聽、說和朗讀，再延伸至讀寫。對剛入園的孩子，家長可觀察教師是否鼓勵幼兒預測情節、描述圖畫和用自己的話回應，而不只跟讀或背誦。官網沒有列出各級每週語言課時。", sourceUrl: "https://www.taiping.edu.hk/課程特色/" },
        { label: "方案、主題與戶外考察", value: "校方表示會配合幼兒興趣安排方案教學、主題活動和課外考察，並以探索、討論及戶外觀察支持主動學習。家長參觀時可問一個主題如何由孩子的提問開始、最後怎樣整理學習經驗；官網沒有提供可用來比較的活動頻率或外部成效數據。", sourceUrl: "https://www.taiping.edu.hk/課程特色/" },
        { label: "報名與家庭開支按年度分開", value: "校方已公布 2027/28 新生申請安排，另有 2025/26 收費頁列出半日班免費、全日班每月 350 元（11 期）及部分代辦項目。兩組資料屬不同年度；若考慮全日班，需向校方索取 2027/28 正式收費及膳食安排。", period: "招生：2027/28；收費：2025/26", sourceUrl: "https://www.taiping.edu.hk/入學申請/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "s-k-h-kindly-light-church-holy-carpenter-kindergarten-branch-607886",
    name: "聖公會慈光堂聖匠幼稚園（分校）",
    nameEn: "S.K.H. KINDLY LIGHT CHURCH HOLY CARPENTER KINDERGARTEN (BRANCH)",
    district: "觀塘區",
    address: "九龍藍田碧雲道 139 號康栢苑停車場大廈 7 樓 2 號",
    schoolNumber: "607886 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K2–K3（校方 2024 年媒體訪問所述）；當屆級別須向分校確認",
    website: "https://skhklchc.edu.hk/",
    dataYear: "辦學宗旨及校舍資料查閱於 2026-10；分校課程報道：2024-09；教育局概覽：2026/27",
    sourceNote: "教育局資料把分校登記為獨立學校編號 607886。現行官網由正校及分校共用；校方宗旨可作機構層面參考。2024 年到校報道描述分校當時提供 K2、K3 及食農教育，不能代替本屆分班和課程核實。",
    appendDirectoryDetails: true,
    sources: [
      { label: "聖公會慈光堂聖匠幼稚園幼兒園：校方網站", scope: "共用網站列明分校身份、辦學宗旨、校舍設施及家校合作方向；不是分校本屆課時表。", url: "https://skhklchc.edu.hk/" },
      { label: "GoodSchool 到校直擊：聖匠幼稚園分校食農教育", scope: "2024 年 9 月對分校當時 K2、K3 課程及食農活動的媒體訪問；不能視為 2026/27 固定安排。", url: "https://www.goodschool.hk/news/%E9%A3%9F%E8%BE%B2%E6%95%99%E8%82%B2%E3%80%80%E5%9F%B9%E9%A4%8A%E8%B2%AC%E4%BB%BB%E6%84%9F%E3%80%80%E9%AB%94%E9%A9%97%E5%A4%9A%E5%85%83%E5%AD%B8%E7%BF%92%E7%B6%93%E6%AD%B7" },
      { label: "教育局《幼稚園概覽 2026/27》：分校校址 0001", scope: "學校編號 607886 校址的班制、語言、師生比例及教育計劃欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6078860001" },
    ],
    detailSections: [
      { title: "共用辦學理念與分校體驗", featured: true, note: "官網同時介紹正校和分校；分校專屬活動只按明確標示的資料列出。", details: [
        { label: "基督教服務精神與全人發展", value: "校方共用網站以基督服務精神為辦學宗旨，強調幼兒在德、智、體、群、美、靈各方面均衡發展，也把家校合作、家訪和家長觀課列為工作方向。這些是校方的教育目標；報名前可詢問分校本屆家長觀課、家校溝通和適應支援的實際安排。", sourceUrl: "https://skhklchc.edu.hk/" },
        { label: "2024 年報道中的食農活動", value: "2024 年媒體到校直擊記錄分校以園圃種植、照顧植物及親手製作食物作為食農教育活動，並指出當時課程提供 K2、K3。這呈現了該次訪問中的體驗方式，但不能推定現在每級均有相同活動或分校仍只開辦這兩級；請以當屆校方答覆為準。", period: "媒體訪問：2024-09", sourceUrl: "https://www.goodschool.hk/news/食農教育　培養責任感　體驗多元學習經歷" },
        { label: "語言和級別不要由校名推斷", value: "教育局 2026/27 概覽按 607886 校址列出語言、班制及師生比例；這些欄位不能說明各語言的每日比例。家長應向分校確認 K1 是否開班、孩子實際入讀級別，以及普通話和英語由誰、以何種活動教授。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6078860001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "christian-and-missionary-alliance-church-union-tseung-kwan-o-alliance-kindergarten-159255",
    name: "基督教宣道會香港區聯會將軍澳宣道幼稚園",
    nameEn: "CHRISTIAN & MISSIONARY ALLIANCE CHURCH UNION TSEUNG KWAN O ALLIANCE KINDERGARTEN",
    district: "西貢區",
    address: "新界將軍澳裕明苑裕榮閣地下",
    telephone: "+852 2623 3156",
    schoolNumber: "159255 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；班制按教育局概覽及當屆校方資料",
    website: "https://www.cmatkokg.edu.hk/",
    dataYear: "課程及 2027/28 招生資料查閱於 2026-10；教育局概覽：2026/27",
    sourceNote: "校方以聖經教育、兒童興趣和專題研習描述課程，並聘有外籍英語及普通話教師。2027/28 招生頁列出面見日期、優先考慮及全日班家庭需要審視；優先條件不等於取錄保證。",
    appendDirectoryDetails: true,
    sources: [
      { label: "將軍澳宣道幼稚園：校園簡介及課程模式", scope: "辦學宗旨、專題研習、戶外參觀、外語教師及家校合作。", url: "https://www.cmatkokg.edu.hk/" },
      { label: "將軍澳宣道幼稚園：2027/28 報名方法", scope: "當屆申請與面見時間、收生準則、全日班考慮方式及非華語支援。", url: "https://www.cmatkokg.edu.hk/報名方法/" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "該校址班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1592550001" },
    ],
    detailSections: [
      { title: "專題研習與語言環境", featured: true, note: "課程特色取自校方介紹；實際語言接觸時數和每年開班情況沒有在相關頁面量化。", details: [
        { label: "由幼兒興趣帶入專題研習", value: "校方以兒童興趣為本，列出戶外參觀、資料搜集、討論、科學實驗和藝術創作等學習方式。這類安排適合家長重視探索和表達的取向；參觀時可問老師如何把一次活動整理成孩子能理解的概念，而不只看活動照片。", sourceUrl: "https://www.cmatkokg.edu.hk/" },
        { label: "外語教師不等於英普雙語主課", value: "校方表示聘有外籍英語及普通話教師，目標是提供外語學習環境；教育局概覽的授課語言欄另列粵語。兩項資料並不提供每天英語、普通話和粵語的課時比例，若語言是家庭主要考量，應向校方索取級別時間表。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1592550001" },
        { label: "2027/28 面見與全日班申請", value: "校方公布 2027/28 K1 面見日期為 2026 年 11 月 14 日，並稱會綜合幼兒面見表現考慮收生；全日班學額有限，校方會考慮家庭照顧需要。這讓家長應及早準備申請及說明照顧安排，但公告沒有公開名額、競爭比或錄取概率。", period: "入學年度：2027/28", sourceUrl: "https://www.cmatkokg.edu.hk/報名方法/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "st-matthew-s-church-kindergarten-319813",
    name: "聖馬太堂幼稚園",
    nameEn: "ST. MATTHEW'S CHURCH KINDERGARTEN",
    district: "中西區",
    address: "香港荷李活道 232–234 號及新街 29–31 號地下、1 樓及 4 樓",
    telephone: "+852 2548 4777",
    schoolNumber: "319813 / 校址 0001",
    sponsoringBody: "聖公會聖馬太堂",
    schoolType: "非牟利基督教幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班按當屆安排",
    website: "https://stmattkg.edu.hk/",
    dataYear: "課程及招生資料查閱於 2026-10；2026/27 招生文件；教育局概覽：2026/27",
    sourceNote: "校方以啟發式活動、主題和自由選擇學習描述課堂，並將基督教關愛融入教育。2026/27 收生文件的年齡、優先條件和時程只適用該屆；全日班優先考慮不構成取錄保證。",
    appendDirectoryDetails: true,
    sources: [
      { label: "聖馬太堂幼稚園：學校簡介及課程", scope: "辦學團體、基督教非牟利背景、課程模式和教育目標。", url: "https://stmattkg.edu.hk/en/about-us/" },
      { label: "聖馬太堂幼稚園：2026/27 收生安排", scope: "申請程序、年齡、優先考慮與全日班申請說明；只代表 2026/27。", url: "https://stmattkg.edu.hk/wp-content/uploads/2025/07/26-27%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92Admission-Arrangements.pdf" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言及師生比例等概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3198130001" },
    ],
    detailSections: [
      { title: "啟發式活動與自由選擇", featured: true, note: "校方課程理念不等於外部評核結果；家長宜在校園參觀中看實際師生互動。", details: [
        { label: "以活動和遊戲帶動思考", value: "校方表示採用啟發式活動教學，按主題透過小組學習和自由選擇活動，鼓勵幼兒運用思考、記憶、創意、想像和判斷。若孩子較需要明確指令，家長可觀察教師如何在自主選擇與日常秩序間提供支架。", sourceUrl: "https://stmattkg.edu.hk/en/about-us/" },
        { label: "基督教關愛融入日常", value: "校方把基督教關愛及品德發展列入辦學方向，描述幼兒在友善環境中發展德、智、體、群、美、靈。對重視宗教教育的家庭，可進一步了解日常祈禱、聖經故事或節期活動的形式；官網沒有公開各級宗教活動的頻率。", sourceUrl: "https://stmattkg.edu.hk/en/about-us/" },
        { label: "當屆收生條件逐年核對", value: "2026/27 文件列明校方考慮幼兒發展表現，並對教職員子女、聖公會教友子女、在讀生兄姊等設優先考慮；申請全日班者可因家庭需要優先考慮，但文件明確提示學額有限。不要把優先條件理解成必然錄取。", period: "入學年度：2026/27", sourceUrl: "https://stmattkg.edu.hk/wp-content/uploads/2025/07/26-27%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92Admission-Arrangements.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "shun-sang-anglo-chinese-kindergarten-216259",
    name: "信生中英文幼稚園",
    nameEn: "SHUN SANG ANGLO-CHINESE KINDERGARTEN",
    district: "黃大仙區",
    address: "九龍慈雲山慈安苑安欣閣地下 B 及 C 翼",
    telephone: "+852 2323 1074",
    schoolNumber: "216259 / 校址 0001",
    schoolType: "非牟利基督教幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午及下午班",
    website: "https://ssack.edu.hk/",
    dataYear: "校方網站查閱於 2026-10；教育局概覽：2026/27",
    sourceNote: "校方網站可確認辦學名稱、地址、聯絡方式及招收 2026/27 新生公告；網站公開的課程細節有限。本頁只採用概覽中可配對該校址的資料，不從「中英文」校名推斷英語授課比例或課程特色。",
    appendDirectoryDetails: true,
    sources: [
      { label: "基督教信生會信生中英文幼稚園官方網站", scope: "校方名稱、地址、聯絡資料及 2026/27 新生招生公告。", url: "https://ssack.edu.hk/" },
      { label: "教育局《幼稚園概覽 2026/27》：信生中英文幼稚園", scope: "校址 0001 的班制、授課語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2162590001" },
      { label: "教育局收費證明書：信生中英文幼稚園", scope: "教育局刊載的核准收費證明；金額及適用班別須按文件年度核對。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/216259.pdf" },
    ],
    detailSections: [
      { title: "公開資料與報名前核對", featured: true, note: "目前校方公開頁面的課程資訊較少，以下不把校名或第三方介紹當作校方課程承諾。", details: [
        { label: "校方現時公開的招生入口", value: "校方網站公布招收 2026/27 學年新生，並提供入學申請入口及聯絡方式；首頁未提供完整的課程手冊、每日作息或英語教學時數。若家庭考慮報名，應直接向校方索取當屆課程簡介及班別選擇。", period: "招生公告：2026/27；網站查閱：2026-10", sourceUrl: "https://ssack.edu.hk/" },
        { label: "不要由校名推斷英語主導", value: "教育局概覽按 216259 校址列示授課語言、班制和師生比例；這些資料較適合確認官方登記與比較底數，不能推導英語課時、外籍教師配置或孩子的英語成果。報名前可詢問英語由誰教授、每週安排及語言使用情境。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2162590001" },
        { label: "學費需看核准證明的適用年度", value: "教育局收費證明書提供學費核准依據，但網頁版概覽或歷年費證不一定等於當屆實際家庭支出。請向校方索取 2026/27 或最新年度正式費用表，並分開核對學費、膳食、校服、書簿及其他代辦費。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/216259.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sun-island-english-kindergarten-yuen-long-branch-231010",
    name: "太陽島英文幼稚園（元朗分校）",
    nameEn: "SUN ISLAND ENGLISH KINDERGARTEN (YUEN LONG BRANCH)",
    district: "元朗區",
    address: "新界元朗朗日路 8 號形點 II 3 樓 L3 號舖",
    telephone: "+852 2479 0116",
    schoolNumber: "231010 / 校址 0002",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；分校頁列半日及全日班，實際級別按當屆開班",
    website: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/",
    dataYear: "分校班制及收費：2026/27；教育局概覽：2026/27",
    sourceNote: "本頁只對應教育局校址 0002。太陽島官網公布元朗校舍的班別、時段、校車和 2026/27 收費；PN 服務頁明確指向土瓜灣幼兒中心，不能套用到元朗分校。分校實際開班以校方確認為準。",
    appendDirectoryDetails: true,
    sources: [
      { label: "太陽島：元朗分校介紹及班制", scope: "元朗校舍地址、2026/27 班別時段、雙語班、校車及 PN 服務邊界。", url: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/" },
      { label: "太陽島：元朗分校 2026/27 收費", scope: "註冊費、學費、書本、校服及全日班膳食費。", url: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/元朗分校學費/" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0002", scope: "元朗分校班制、授課語言、師生比例及費用欄位；不套用其他校址資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2310100002" },
    ],
    detailSections: [
      { title: "元朗分校班制與語言選擇", featured: true, note: "分校網頁說明校舍層面的服務；最新各級開班情況仍須向校方確認。", details: [
        { label: "半日班與全日班時段", value: "元朗分校 2026/27 頁面列上午班 9:00–12:00、下午班 13:30–16:30、全日班 9:00–16:30，並提供雙語班選項。這有助家庭先估算接送和照顧銜接，但官網提示最新開班詳情要向分校查詢。", period: "2026/27", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/" },
        { label: "雙語班要確認實際語言比例", value: "元朗分校列有雙語班，但校址頁沒有說明各級的語言教學時數。機構 FAQ 對不同班別的語言介紹不能自動代表本分校當屆課表；如家庭重視粵語或普通話基礎，報名前應問清中文班與雙語班的實際授課安排。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/" },
        { label: "PN 不在元朗分校頁列出的服務範圍", value: "官方元朗分校頁把 PN 指向土瓜灣幼兒中心，並未列為元朗校舍的班級。不要把太陽島其他校舍的 PN 班當成元朗分校學位；若孩子未滿三歲，應直接查詢相應幼兒中心。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/" },
        { label: "2026/27 家庭費用不只看學費", value: "元朗分校 2026/27 費用表列半日班扣資助後月費免費，全日班亦列免費但需付膳食費；另有註冊費、書本和校服等項目。全日班頁面標示只適用 K2、K3，申請前應確認孩子年級是否開班及最新費單。", period: "2026/27", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/元朗分校/元朗分校學費/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "veo-cwb",
    name: "銅鑼灣維多利亞國際幼稚園",
    nameEn: "CAUSEWAY BAY VICTORIA INTERNATIONAL KINDERGARTEN",
    district: "灣仔區",
    address: "香港銅鑼灣興發街 32–36 號三樓及天台",
    telephone: "+852 2578 9998",
    schoolNumber: "325651 / 校址 0001",
    sponsoringBody: "銅鑼灣街坊福利促進會",
    schoolType: "非牟利幼稚園；IB PYP 世界學校",
    gradeSpan: "PN–K3；班別與時段按校方當屆安排",
    website: "https://www.cbvictoria.edu.hk/",
    dataYear: "校方簡介及 2026/27 收費入口查閱於 2026-10；教育局概覽：2026/27",
    sourceNote: "本頁按教育局校號 325651 對應國際幼稚園登記；同一辦學團體另有相鄰註冊名稱，不能混用不同學校編號的概覽數據。IB PYP 和校方語言政策屬課程框架，實際語言流別及收費按當屆文件核實。",
    appendDirectoryDetails: true,
    sources: [
      { label: "銅鑼灣維多利亞幼稚園：學校一瞥", scope: "校方列出的校址、成立年份、課室與設施、上課時間、課程及 2026/27 收費入口。", url: "https://www.cbvictoria.edu.hk/tc/quick_facts/" },
      { label: "銅鑼灣維多利亞幼稚園：IB 課程", scope: "校方介紹 IB PYP、兒童中心學習及國際視野與中國文化。", url: "https://www.cbvictoria.edu.hk/sc/ib/" },
      { label: "教育局《幼稚園概覽 2026/27》：校號 325651", scope: "該校號對應校址的班制、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256510001" },
    ],
    detailSections: [
      { title: "IB PYP 與校址身份", featured: true, note: "同一校舍有不同註冊名稱；本頁課程定位按校方資料，統計欄位按 325651 校號。", details: [
        { label: "校方提供 IB 小學項目（PYP）", value: "校方把自己列為 IB 世界學校並開辦小學項目，理念包括兒童中心學習、國際視野和中國文化。PYP 是課程框架，不代表所有班級採用相同語言比例或等同小學直升；家庭可觀察孩子是否會在活動中提問、探究和表達。", sourceUrl: "https://www.cbvictoria.edu.hk/sc/ib/" },
        { label: "課室規模與日程可供參觀核對", value: "校方簡介列 15 間登記課室、戶外遊樂場、多用途禮堂、圖書館和 STEAM 室；亦列 PN 至 K2 下午班 13:00–16:00，K3 下午班時間略有不同。設施清單不等於每天使用時數，參觀時可問各級活動安排。", sourceUrl: "https://www.cbvictoria.edu.hk/tc/quick_facts/" },
        { label: "語言班別與費用按入學年度核對", value: "校方簡介把課程列為 IB PYP 和語言政策，並提供 AY 2026–27 學費文件入口；官網另列 PN 招生和 K1–K3 插班登記。申請前應確認語言組別、所選年級學費和其他費項，不能把「國際」或「雙語」標籤視為每日英語比例。", period: "校方頁面查閱：2026-10", sourceUrl: "https://www.cbvictoria.edu.hk/tc/quick_facts/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "canaan-41",
    name: "迦南幼稚園（景峰花園）",
    nameEn: "CANNAN KINDERGARTEN (PRIME VIEW GARDEN)",
    district: "屯門區",
    address: "新界屯門景峰徑 2 號景峰花園第 4 座地下（部分）及第 5 座地下",
    schoolNumber: "609641 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園班級；PN 只限有開辦幼兒園部的校舍",
    website: "https://www.cannan.edu.hk/",
    dataYear: "課程及校舍資訊查閱於 2026-10；教育局概覽：2026/27",
    sourceNote: "迦南有多間分校；本頁只對應景峰花園登記校址。校方幼稚園課程是機構層面介紹，分校的實際級別、語言班和日程仍要按申請校址及當屆資料確認。",
    appendDirectoryDetails: true,
    directoryDetailScope: "location",
    sources: [
      { label: "迦南幼稚園：辦學目標與課程", scope: "機構課程的兒童本位、遊戲學習、繪本、英語拼音和家校參與。", url: "https://www.cannan.edu.hk/kindergarten" },
      { label: "迦南幼稚園：分校資料", scope: "校方列出分校網絡及各校舍資料入口；分校班制仍需向景峰花園校舍確認。", url: "https://www.cannan.edu.hk/campuses/" },
      { label: "教育局《幼稚園概覽 2026/27》：景峰花園校址 0001", scope: "校址 0001 的班制、授課語言、師生比例及費用資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6096410001" },
    ],
    detailSections: [
      { title: "遊戲、繪本與英語語音", featured: true, note: "迦南課程頁屬機構層面介紹；分校實施方式與每日課時需另向景峰花園校舍確認。", details: [
        { label: "從遊戲和生活經驗建構學習", value: "校方以幼兒為本，描述透過遊戲、探索和生活化主題培養學習興趣、語言表達和解難能力。這種取向是否適合孩子，取決於日常是否有足夠自主操作和教師回應；家長可請校方示範一個普通上課日的作息，而不只看活動成果。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
        { label: "繪本與英語 Synthetic Phonics", value: "校方課程頁提到以繪本和親子閱讀培養讀寫興趣，英語活動使用 Synthetic Phonics（原音拼合法）教授字母音及拼合技巧。這說明課程包含系統語音教學元素，但官網未列校址 0001 的每週課時或每級英語比例，不能推算英語主導程度。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
        { label: "景峰分校的當屆安排須逐項確認", value: "迦南網站列有景峰花園分校，但同一機構不同校舍可有不同班制和幼兒園部服務。教育局概覽應按 609641 校址 0001 閱讀；報名前請確認 K1–K3 開班、PN 是否提供、授課語言、全日服務和收費。", period: "概覽：2026/27；校址 0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6096410001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "ho-ching-kindergarten-sponsored-by-sik-sik-yuen-525758",
    name: "嗇色園主辦可正幼稚園",
    nameEn: "HO CHING KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    district: "西貢區",
    address: "新界將軍澳廣明苑廣寧閣 F 座地下",
    telephone: "+852 2178 2244",
    schoolNumber: "525758 / 校址 0001",
    sponsoringBody: "嗇色園",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；半日班及全日班按當屆安排",
    website: "https://www.hochingkg.edu.hk/",
    dataYear: "校方課程及 2026/27 招生資料查閱於 2026-10；費用表：2025/26；教育局概覽：2026/27",
    sourceNote: "校方明確列出兒童中心、生活主題、戶外體驗、自由遊戲、科學探索和兩文三語方向。2025/26 費用表只作歷史參考；須另索取最新年度核准費用。",
    appendDirectoryDetails: true,
    sources: [
      { label: "可正幼稚園官方網站：課程及校園資料", scope: "兒童中心、生活主題、戶外學習、科學探索、自由遊戲、兩文三語及上課時間。", url: "https://www.hochingkg.edu.hk/" },
      { label: "可正幼稚園：2026/27 收生準則", scope: "該屆收生準則及申請文件；不能代替 2027/28 招生公告。", url: "https://www.hochingkg.edu.hk/wp-content/uploads/2025/10/收生準則中英教育局2026-2027.pdf" },
      { label: "嗇色園：可正幼稚園介紹", scope: "辦學團體對可正幼稚園及探究教學的介紹。", url: "https://www2.siksikyuen.org.hk/education-services/kindergartens-and-child-care-centres/ho-ching" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "該校址班制、語言、比例及學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5257580001" },
    ],
    detailSections: [
      { title: "探索、自由遊戲與生活主題", featured: true, note: "課程介紹為校方自述；兩文三語並不等同已公開的授課時數比例。", details: [
        { label: "從生活題材引導幼兒探索", value: "校方表示課程依教育局指引，以生活化主題和多元活動引發幼兒主動學習、思考、探索、求證和解難。家長可問孩子是否有機會先提出想法、動手試驗，再回顧發現；這比單看課程名稱更能判斷孩子是否適應。", sourceUrl: "https://www.hochingkg.edu.hk/" },
        { label: "自由遊戲、科學探索和戶外體驗", value: "校方網站把自由遊戲、科學探索、中華文化、多元學習和戶外體驗列為課程主題。這反映校方重視多種學習情境，但公開頁面沒有列每日活動時間或幼兒成果統計，家庭應在參觀時確認各級安排和戶外活動頻率。", sourceUrl: "https://www.hochingkg.edu.hk/" },
        { label: "兩文三語需看實際課堂語境", value: "校方列出粵語、英文和普通話的語言方向，教育局概覽授課語言欄按該校址列示。官網沒有公開各語言每週課時；若家庭重視英語沉浸或普通話口語，宜詢問各級教師配置、語言使用場景及家課安排。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5257580001" },
        { label: "家庭成本按最新費表重核", value: "教育局概覽及校方費表應按年度分開看。網站可查到 2025/26 費用文件，不能視為 2026/27 最新金額；報名時請向校方索取當屆學費、膳食及代辦項目清單，並確認半日與全日班是否有不同費用。", period: "可查費表：2025/26", sourceUrl: "https://www.hochingkg.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "yuen-kong-kindergarten-158321",
    name: "元岡幼稚園",
    nameEn: "YUEN KONG KINDERGARTEN",
    district: "元朗區",
    address: "新界元朗八鄉錦上路元崗村（丈量約份第 106 約地段）",
    telephone: "+852 3483 1350",
    schoolNumber: "158321 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園班級；班制按教育局概覽及當屆校方資料",
    website: "https://sites.google.com/view/yuenkongkg/",
    dataYear: "校方網站及教育局資料查閱於 2026-10；教育局概覽：2026/27",
    sourceNote: "元岡幼稚園官方網站目前公開地址和聯絡方式，但未見可供核實的課程理念、招生時程或詳細校園介紹。本頁因此以教育局校址及概覽資料為主，不從地區、校名或其他幼稚園推測課程和收生安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "元岡幼稚園官方網站", scope: "校方公開的中英文名稱、地址、電話、傳真及電郵；未列課程手冊或招生細節。", url: "https://sites.google.com/view/yuenkongkg/" },
      { label: "教育局《幼稚園概覽 2026/27》：元岡幼稚園", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1583210001" },
    ],
    detailSections: [
      { title: "公開資料有限：報名前直接確認", featured: true, note: "學校官方網站目前以聯絡資料為主，以下不推測校方課程特色或招生競爭。", details: [
        { label: "官方網站可確認的基本資訊", value: "元岡幼稚園官方頁面列出學校名稱、元朗八鄉錦上路元崗村地址、電話、傳真和電郵；沒有公開課程理念、每日作息、招生日期或班級安排。這表示家長需要直接向校方索取簡介，而非依賴搜尋摘要或同區其他學校資料。", sourceUrl: "https://sites.google.com/view/yuenkongkg/" },
        { label: "教育局概覽作為比較底數", value: "2026/27 幼稚園概覽按校址 0001 列出授課語言、班制、師生比例和費用欄位。師生比例是概覽統計，不代表實際每班人數；家長仍應確認當屆 K1 開班、每日授課時段、PN 是否提供及是否參加幼稚園教育計劃。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1583210001" },
        { label: "聯絡校方時建議問清四項", value: "報名前可向校方確認：本屆 K1 班額與班制、粵語／普通話／英語的實際使用方式、半日或全日服務與膳食、學費及必需雜費。這些細節目前未見於可讀的校方公開頁面，因此不在本頁作推算。", sourceUrl: "https://sites.google.com/view/yuenkongkg/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "esf-west-kowloon-kindergarten-629529",
    name: "英基西九龍幼稚園",
    nameEn: "ESF WEST KOWLOON KINDERGARTEN",
    district: "油尖旺區",
    address: "香港西九龍海輝道 8 號浪澄灣高層地下幼稚園單位 1 號",
    schoolNumber: "629529 / 校址 0001",
    schoolType: "私立幼稚園；教育局登記狀態為臨時註冊",
    gradeSpan: "校方列年齡 3–5 歲；實際年級以當屆招生安排為準",
    website: "https://wkk.esf.edu.hk/en/",
    dataYear: "教育局位置資料截至 2026-09-30；註冊狀態截至 2026-10-23；校方課程資料查閱於 2026-10",
    sourceNote: "學校於 2026 年開辦，教育局截至 2026-10-23 列為臨時註冊。英基校方資料列明採用 IB PYP 及探究式學習，並有英語／雙語班別選項；幼稚園概覽沒有可配對的 2026/27 校址資料，故不推算學費、師生比例、PN 或招生名額。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》及註冊資料", scope: "學校編號、校址、學段及截至 2026-10-23 的臨時註冊狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "英基西九龍幼稚園：校長介紹及校園資料", scope: "校方公布的辦學方向、地址、聯絡方法及探究式 PYP 課程。", url: "https://wkk.esf.edu.hk/en/about_us/principals_welcome/" },
      { label: "英基西九龍幼稚園：英基學校介紹", scope: "校方列出的創校年份、年齡範圍、IB PYP 及英語／雙語課程選項；不視作學額或實際在讀人數。", url: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
    ],
    detailSections: [
      { title: "IB PYP 與探究式學習", featured: true, note: "課程特色為校方自述；此校於 2026 年新開辦，尚未有可按校址核對的 2026/27 幼稚園概覽數據。", details: [
        { label: "以 IB PYP 為課程框架", value: "英基校方列明學校採用 IB 小學項目（PYP），並以探究式學習鼓勵幼兒提問、探索和表達。這說明課程設計方向，不能單憑課程名稱判斷孩子實際學習成效；參觀時可看教師如何引導孩子把問題延伸成觀察、遊戲和分享。", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
        { label: "英語／雙語選項須按申請班別確認", value: "英基資料列出英語及雙語課程選項，但沒有在該校介紹頁交代兩種語言的每日課時比例。若家庭希望孩子以粵語或普通話為主要日常語言，報名前宜向校方索取所申請班別的語言安排。", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
        { label: "新校資料尚未形成年度比較底數", value: "學校在 2026 年開辦，教育局截至 2026-10-23 的註冊資料仍列臨時註冊；目前不能以歷年師生比例、學費或升小數據比較。家長應直接確認當屆學費、PN 是否開辦、班級安排及英基升學銜接條件。", period: "教育局資料截至 2026-10-23", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "esf-quarry-bay-school-kindergarten-629910",
    name: "英基鰂魚涌小學幼稚園",
    nameEn: "ESF QUARRY BAY SCHOOL KINDERGARTEN",
    district: "東區",
    address: "香港鰂魚涌康愉街 14 號",
    schoolNumber: "629910 / 校址 0001",
    schoolType: "私立幼稚園；教育局登記狀態為臨時註冊",
    gradeSpan: "校方列年齡 3–5 歲；實際年級以當屆招生安排為準",
    website: "https://qbsk.esf.edu.hk/en/",
    dataYear: "教育局位置資料截至 2026-09-30；註冊狀態截至 2026-10-23；校方課程資料查閱於 2026-10",
    sourceNote: "英基鰂魚涌小學幼稚園於 2026 年開辦，教育局截至 2026-10-23 列為臨時註冊。校方把它定位為 Quarry Bay School 社群的一部分並採用 IB PYP；幼稚園概覽未見可配對的 2026/27 校址資料，費用、師生比例和招生名額須向校方確認。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》及註冊資料", scope: "學校編號、校址、學段及截至 2026-10-23 的臨時註冊狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "英基鰂魚涌小學幼稚園：課程及社群介紹", scope: "校方對 IB PYP、遊戲與探究學習、學校社群及年齡範圍的介紹。", url: "https://join-us.esf.edu.hk/schools/esf-quarry-bay-school-kindergarten/" },
      { label: "英基鰂魚涌小學幼稚園：校舍與交通", scope: "校址、附近交通與上學時段道路情況。", url: "https://qbsk.esf.edu.hk/en/about_us/campus_find_us/" },
      { label: "英基：鰂魚涌小學幼稚園開校及銜接資料", scope: "2026/27 開校安排及主流教育適用條件下的英基小學銜接政策；申請年度條款須以當屆更新為準。", url: "https://join-us.esf.edu.hk/esf-to-open-new-kindergarten-in-kornhill/" },
    ],
    detailSections: [
      { title: "PYP 課程與小學銜接", featured: true, note: "以下為校方公布的課程及銜接安排；入讀幼稚園不等於不受條件限制的升小承諾。", details: [
        { label: "遊戲和探究是校方描述的學習主軸", value: "校方介紹以 IB PYP 為框架，透過遊戲、探索、紀錄和幼兒分享推進學習，並強調孩子的歸屬感與表達。家長參觀時可觀察教師如何把孩子的興趣轉成持續探究，也應詢問中文及普通話在不同班別的實際安排。", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-quarry-bay-school-kindergarten/" },
        { label: "英基小學銜接有明確資格條件", value: "英基公布新校與 Quarry Bay School 的銜接路徑，適用於可接受主流教育的學生；這是制度安排，不代表所有孩子無條件自動升讀。報名前應向校方確認當屆資格、評估及註冊要求，並把小學學費與名額一併納入長期預算。", sourceUrl: "https://join-us.esf.edu.hk/esf-to-open-new-kindergarten-in-kornhill/" },
        { label: "接送是此校址的實際考量", value: "校方提醒上學繁忙時段，私家車、的士及巴士進出校址一帶可能較慢，並提供港島及九龍多條校巴路線作參考。接送點和路線會按需求調整，居住較遠的家庭應先確認校巴是否覆蓋住址，再評估每日通勤時間。", sourceUrl: "https://qbsk.esf.edu.hk/en/about_us/campus_find_us/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "esf-renaissance-college-kindergarten-629162",
    name: "英基啓新書院幼稚園",
    nameEn: "ESF RENAISSANCE COLLEGE KINDERGARTEN",
    district: "大埔區",
    address: "新界海映路 8 號西沙 GO PARK 2 地下 G01 號舖",
    schoolNumber: "629162 / 校址 0001",
    schoolType: "私立幼稚園；教育局登記狀態為臨時註冊",
    gradeSpan: "校方列年齡 3–5 歲；不設 Pre-K；實際年級以當屆招生安排為準",
    website: "https://rchkk.esf.edu.hk/en/",
    dataYear: "教育局位置資料截至 2026-09-30；註冊狀態截至 2026-10-23；校方課程資料查閱於 2026-10",
    sourceNote: "校方確認幼稚園於 2026 年 8 月在西沙啟用，採 IB PYP 並設英語／雙語課程選項；教育局截至 2026-10-23 列為臨時註冊。英基公布完成 K2 後符合主流教育條件的學生可獲啓新書院 Year 1 學位；學費及本屆申請細則須另向校方確認。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》及註冊資料", scope: "學校編號、校址、學段及截至 2026-10-23 的臨時註冊狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "英基啓新書院幼稚園：校園及課程", scope: "新校址、2026 年啟用、IB PYP 課程、室內外學習區及校方課程介紹。", url: "https://rchkk.esf.edu.hk/en/" },
      { label: "英基啓新書院幼稚園：英基學校介紹", scope: "校方列出的年齡範圍、課程及升學銜接概要。", url: "https://join-us.esf.edu.hk/schools/esf-renaissance-college-kindergarten/" },
      { label: "英基：啓新書院幼稚園常見問題", scope: "K2 後銜接 Year 1 的主流教育資格條件、沒有 Pre-K 的安排及學費待教育局核准的公告。", url: "https://join-us.esf.edu.hk/new-esfrenaissancecollegekindergarten-announcement-faq/" },
    ],
    detailSections: [
      { title: "西沙新校與啓新升學路徑", featured: true, note: "校舍和課程為校方自述；升小銜接只適用於符合主流教育資格的學生，費用須按校方當屆公告確認。", details: [
        { label: "2026 年 8 月遷至西沙新校舍", value: "英基確認幼稚園於 2026 年 8 月在西沙 GO PARK 2 開校，並列出藝術工作室、積木遊戲、角色扮演及體能活動空間。這些設施提供不同的遊戲與探索場景；家庭可實地了解日常使用安排和戶外活動時段。", period: "校方資料查閱：2026-10", sourceUrl: "https://rchkk.esf.edu.hk/en/" },
        { label: "K2 後銜接啓新書院有主流教育條件", value: "英基公告表示，完成 K2 且符合主流教育資格的學生可獲啓新書院 Year 1 學位。對希望減少小一另行申請不確定性的家庭，這是一項重要制度優勢；但若孩子需要非主流教育安排，或家庭尚未確認資格，不能把它理解成無條件直升。", sourceUrl: "https://join-us.esf.edu.hk/new-esfrenaissancecollegekindergarten-announcement-faq/" },
        { label: "沒有 Pre-K，費用仍需直接核對", value: "校方 FAQ 明確表示此校不開辦 Pre-K，並曾說明學費待教育局核准；目前公開頁面未提供可核對的完整現行費表。家長應向校方確認 K1、K2 收費、額外費用、雙語班安排及當屆申請資格，再與啓新書院後續學費合併估算。", sourceUrl: "https://join-us.esf.edu.hk/new-esfrenaissancecollegekindergarten-announcement-faq/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hong-kong-ling-liang-church-sau-tak-kindergarten-campus-2-601861",
    name: "香港靈糧堂秀德幼稚園（二校）",
    nameEn: "HONG KONG LING LIANG CHURCH SAU TAK KINDERGARTEN (CAMPUS 2)",
    district: "深水埗區",
    address: "九龍荔枝角道 873 號一號．西九龍西九龍薈一樓",
    telephone: "+852 3520 2238",
    schoolNumber: "601861 / 校址 0001",
    sponsoringBody: "香港靈糧堂",
    schoolType: "私立非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午及下午班",
    website: "https://www.lingliang.org.hk/zh-CN/campuses/sau-tak-2",
    dataYear: "教育局概覽 2026/27；校方校舍資料未標明統計年度；課程資料查閱於 2026-10",
    sourceNote: "教育局《幼稚園概覽 2026/27》按校址 0001 列上午、下午班、粵語及師生比例 1:10；校方校舍頁另列 1:11，未標示該比例所屬年度，故並列提醒並建議直接核對。校方以靈育、主題、方案及遊戲為課程主軸。",
    appendDirectoryDetails: true,
    sources: [
      { label: "香港靈糧堂秀德幼稚園（二校）：校舍資料", scope: "校址、創校年份、班制、設施與校方公布的師生比例；該比例頁面未標示統計年度。", url: "https://www.lingliang.org.hk/zh-CN/campuses/sau-tak-2" },
      { label: "香港靈糧堂：學習與支援", scope: "靈育、兒童自主、校本教材、學習區、藝術和遊戲教學的校方說明。", url: "https://lingliang.org.hk/programme" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言、2026/27 師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6018610001" },
    ],
    detailSections: [
      { title: "遊戲、主題與藝術學習", featured: true, note: "課程理念屬校方自述；師生比例在兩個公開來源出現差異，應以當屆校方確認為準。", details: [
        { label: "以靈育、主題和遊戲組織學習", value: "校方把靈育列為核心，以主題教學、方案教學和遊戲串連學習，並介紹團體、小組及分區活動。這種設計讓家長可觀察孩子是否有時間自主選擇、動手探索和回顧經驗；校方描述的課程方向不等同每名孩子的學習成效。", sourceUrl: "https://lingliang.org.hk/programme" },
        { label: "校本學習區延伸日常探索", value: "分校頁列有探索區、積木區、視藝室、圖書室和室內遊戲場等設施。家長參觀時可詢問各班使用頻率、教師如何觀察孩子的興趣，以及設施是否在不同年級都能使用，而不只把房間數量當成課程品質指標。", sourceUrl: "https://www.lingliang.org.hk/zh-CN/campuses/sau-tak-2" },
        { label: "師生比例公開值有 1:10 與 1:11 之別", value: "教育局《幼稚園概覽 2026/27》按校址 0001 列 1:10；校方分校頁另列 1:11，且沒有標示該數字的統計年份。兩者不可混成單一確定值；如比例是家庭比較重點，應向校方確認當屆口徑和是否包括校長。", period: "教育局概覽：2026/27；校方頁未標年份", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6018610001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-christian-and-missionary-alliance-scholars-anglo-chinese-kindergarten-216135",
    name: "宣道會上書房中英文幼稚園",
    nameEn: "THE CHRISTIAN AND MISSIONARY ALLIANCE SCHOLARS ANGLO-CHINESE KINDERGARTEN",
    district: "東區",
    address: "香港杏花邨盛泰道 100 號（第 35 座側）",
    telephone: "+852 2556 0171",
    schoolNumber: "216135 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.scholarskg.edu.hk/",
    dataYear: "教育局概覽 2026/27；招生資料：2027/28；課程資料查閱於 2026-10",
    sourceNote: "教育局概覽列有上午、下午及全日班、英語授課欄及 1:8.4 師生比例；校方介紹中英文班主任、每日英語活動、普通話課和每日自由遊戲。英語活動及雙語教師安排不能直接換算成全日英語授課比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "宣道會上書房中英文幼稚園：課程理念及編排", scope: "中英文班主任、每日英語活動、小組教學、自由遊戲和普通話課。", url: "https://www.scholarskg.edu.hk/course/" },
      { label: "宣道會上書房中英文幼稚園：入學查詢", scope: "校方招生年度安排及申請程序；只按頁面當屆資訊理解。", url: "https://www.scholarskg.edu.hk/query/" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2161350001" },
    ],
    detailSections: [
      { title: "語言活動與遊戲課程", featured: true, note: "班主任配置及課程活動為校方自述；教育局授課語言欄和校方語言活動說明口徑不同，不推算各語言時數。", details: [
        { label: "中英文班主任並行，但各級實際語境仍要問清", value: "校方稱上午及下午班均有中文與英文班主任；概覽授課語言欄列英語，兩者反映的資料類型不同，不能據此推算每日英語授課比例。家長可索取申請級別時間表，確認中文、英文和普通話分別在哪些活動中使用。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2161350001" },
        { label: "每日英語活動、Phonics 與普通話課", value: "校方介紹外籍教師每日帶領英語活動和 Phonics，另設普通話老師以兒歌、音樂及遊戲教學。這提供了語言接觸的具體方式，但校方頁沒有列出每週課時或幼兒語言成果，適合重視英普接觸的家庭進一步了解課堂實況。", sourceUrl: "https://www.scholarskg.edu.hk/course/" },
        { label: "小組教學和每日自由遊戲", value: "校方表示以小組活動照顧幼兒差異，並安排每日 30 分鐘自由遊戲，開放同級課室和走廊供幼兒活動。家長可留意自由遊戲期間教師如何支持輪流、協商和收拾，並確認所申請班別是否按同一時段安排。", sourceUrl: "https://www.scholarskg.edu.hk/course/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tsung-tsin-mission-of-hong-kong-on-chung-kindergarten-609137",
    name: "基督教香港崇真會安頌幼稚園",
    nameEn: "TSUNG TSIN MISSION OF HONG KONG ON CHUNG KINDERGARTEN",
    district: "沙田區",
    address: "新界沙田水泉澳邨修泉樓接鄰地下 KG01 號舖",
    telephone: "+852 3595 3490",
    schoolNumber: "609137 / 校址 0001",
    sponsoringBody: "基督教香港崇真會",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://og.ttmssd.org/",
    dataYear: "教育局概覽 2026/27；校方課程資料以概覽學校自述欄為準；教育局質素評核：2021-10",
    sourceNote: "教育局概覽列出校址 0001 班制、粵語、師生比例 1:9.7 及免費計劃資料；校方學校網站目前無法讀取其課程頁，故本頁不補寫未能直接核對的教學細節。教育局 2021 年質素評核報告是歷史評核資料，不作現況評級。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：安頌幼稚園", scope: "校址、辦學類別、班制、授課語言、師生比例、設施及校方提交的課程資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6091370001" },
      { label: "教育局：安頌幼稚園質素評核報告", scope: "2021 年 10 月 4、5、7 日的教育局質素評核；只代表該次評核時點。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnChung.pdf" },
      { label: "基督教香港崇真會社會服務部：安頌幼稚園服務單位", scope: "辦學團體列出的校名及水泉澳邨校址。", url: "https://web.ttmssd.org/units" },
    ],
    detailSections: [
      { title: "校址資料與公開內容邊界", featured: true, note: "課程和師資資料以教育局《幼稚園概覽 2026/27》所載學校自述為基礎；官方網站本次無法讀取，未能核對最新招生細節。", details: [
        { label: "幼稚園概覽列有三種上課時段", value: "教育局《幼稚園概覽 2026/27》按校址 0001 列上午、下午及全日班，授課語言欄列粵語，師生比例為 1:9.7。比例是概覽統計，不代表每班實際人數；是否開辦某一班別及名額仍須以校方當屆公布為準。", period: "概覽：2026/27；校址 0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6091370001" },
        { label: "教育局曾進行質素評核，但報告有年份界線", value: "教育局公開的質素評核報告日期為 2021 年 10 月。這是一次歷史評核，不應被理解為持續有效的評級，也不能替代家長了解現屆課程、教師配置和支援服務。", period: "評核日期：2021-10-04 至 2021-10-07", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnChung.pdf" },
        { label: "課程與招生細節宜直接向學校確認", value: "校方官方網站列於教育局概覽，但本次無法讀取課程與招生頁，因此不以其他幼稚園或搜尋摘要補寫。報名前可直接確認 K1 班別、全日班膳食安排、2027/28 時程，以及英語／普通話活動和非華語支援是否延續。", sourceUrl: "https://og.ttmssd.org/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-endeavourers-chan-cheng-kit-wan-kindergarten-325619",
    name: "勵志會陳鄭潔雲幼稚園",
    nameEn: "THE ENDEAVOURERS CHAN CHENG KIT WAN KINDERGARTEN",
    district: "東區",
    address: "香港柴灣翠灣邨翠壽樓地下",
    telephone: "+852 2556 3536",
    schoolNumber: "325619 / 校址 0001",
    sponsoringBody: "香港勵志會",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.tekg.edu.hk/",
    dataYear: "教育局概覽 2026/27；校方課程資料查閱於 2026-10",
    sourceNote: "校方課程資料聚焦繪本貫通六大學習範疇、英語 5G Program、JELIC 腦思維活動及兒童自主學習；這些是課程設計方向，不是獨立成效評估。教育局概覽列校址 0001 授課語言、比例和免費計劃資料。",
    appendDirectoryDetails: true,
    sources: [
      { label: "勵志會陳鄭潔雲幼稚園：課程特色", scope: "繪本教學、5G 英語課程、腦思維學習及兒童自主學習的校方介紹。", url: "https://www.tekg.edu.hk/" },
      { label: "香港勵志會：陳鄭潔雲幼稚園簡介", scope: "創校沿革、活動教學、繪本探知館及校方辦學方向；沿革資料不代表現屆班級安排。", url: "https://www.endeavourers.org.hk/勵志會陳鄭潔雲幼稚園" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256190001" },
    ],
    detailSections: [
      { title: "繪本、英語與自主學習", featured: true, note: "特色名稱及設計目的為校方自述；未有公開的課時比例及獨立成效數據。", details: [
        { label: "繪本教學貫通多個學習範疇", value: "校方表示以繪本培養閱讀興趣，並把故事連結六大學習範疇。家長可了解教師如何由共讀延伸到孩子的提問、表達、創作和生活經驗；報名時也可確認不同年級的繪本主題和家長共讀要求。", sourceUrl: "https://www.tekg.edu.hk/" },
        { label: "5G Program 與 JELIC 屬校方課程項目", value: "校方把 5G Program 列作英語發展策略，把 JELIC 列作腦思維學習活動。公開介紹呈現的是校方的課程設計，不代表英語能力或認知成果已獲獨立驗證；家庭可問清授課語言、每週時數及活動是否適用所有班別。", sourceUrl: "https://www.tekg.edu.hk/" },
        { label: "概覽語言欄列粵語，英語活動另行理解", value: "教育局《幼稚園概覽 2026/27》按校址 0001 列粵語授課及 1:9.9 師生比例；校方另介紹英語課程特色。兩者不提供英語每週課時比例，家庭若以英文環境作主要條件，應索取當屆班級時間表。", period: "概覽：2026/27；校址 0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3256190001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lingnan-kindergarten-siu-sai-wan-589144",
    name: "嶺南幼稚園（小西灣）",
    nameEn: "LINGNAN KINDERGARTEN (SIU SAI WAN)",
    district: "東區",
    address: "香港小西灣道 23 號富怡花園幼稚園大樓 1 樓",
    telephone: "+852 2893 2686",
    schoolNumber: "589144 / 校址 0001",
    sponsoringBody: "嶺南教育機構",
    schoolType: "非牟利基督教幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://lingnankn.edu.hk/",
    dataYear: "教育局概覽 2026/27；校方第二校簡介查閱於 2026-10",
    sourceNote: "校方第二校介紹稱學校於 2019 年創辦，以基督教及嶺南教育理念辦學，提供上午、下午和全日班；教育局概覽按校址 0001 列粵語及 1:10.3 師生比例。課程理念屬校方自述，不能替代家長核對實際班級日程。",
    appendDirectoryDetails: true,
    sources: [
      { label: "嶺南幼稚園：小西灣第二校簡介", scope: "第二校沿革、辦學理念、班制、校址與聯絡方法。", url: "https://lingnankn.edu.hk/幼稚園二校簡介/" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5891440001" },
      { label: "教育局《學校位置及資料》及註冊資料", scope: "校址、校名、電話及註冊狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
    ],
    detailSections: [
      { title: "嶺南教育與生活化學習", featured: true, note: "教育理念取自校方第二校介紹；設施與課程目標為校方描述，不代表個別幼兒的學習結果。", details: [
        { label: "基督教與嶺南教育理念並行", value: "校方把基督教教育理念與嶺南教育傳統列為辦學基礎，並以溫暖、啟發和安全的環境描述學校方向。這有助家庭判斷價值取向是否合適；參觀時可進一步了解宗教活動在一週課程中的位置，以及非基督教家庭如何參與。", sourceUrl: "https://lingnankn.edu.hk/幼稚園二校簡介/" },
        { label: "半日與全日班都需按級別確認", value: "校方介紹設上午、下午及全日課程；教育局概覽 2026/27 按校址 0001 列三種時段、粵語授課及 1:10.3 師生比例。公開資料未說明本屆每級實際開班數，報名前應確認 K1 班別、膳食、延長照顧和校車服務。", period: "概覽：2026/27；校址 0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5891440001" },
        { label: "新校舍與課程日常宜實地觀察", value: "校方以安全環境和適齡教材介紹第二校，教育局概覽另列語言、比例和班制。這些資料未能說明孩子每天如何使用課室和遊戲空間；參觀時可觀察自由遊戲、小組活動與戶外活動的實際安排。", sourceUrl: "https://lingnankn.edu.hk/幼稚園二校簡介/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "st-anthony-s-kindergarten-belvedere-garden-231584",
    name: "聖安多尼中英文幼稚園（麗城花園）",
    nameEn: "ST. ANTHONY'S KINDERGARTEN (BELVEDERE GARDEN)",
    district: "荃灣區",
    address: "新界荃灣青山公路 625 號麗城花園第三期第 1 座平台",
    telephone: "+852 2490 7311",
    schoolNumber: "231584 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.belvedere-garden.stanthonyskg.edu.hk/",
    dataYear: "教育局概覽 2026/27；校方課程資料查閱於 2026-10",
    sourceNote: "此頁只對應麗城花園校址 0001；同一辦學團體在中西區另有校址，不能把地址、收費或課程安排混為一談。校方以探索、實驗、解難和高階思維描述課程，教育局概覽列英文授課欄及 1:7.6 師生比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "聖安多尼中英文幼稚園：麗城花園校舍及課程", scope: "麗城校址、聯絡方式、辦學方向、課程與評估方式。", url: "https://www.belvedere-garden.stanthonyskg.edu.hk/" },
      { label: "教育局《幼稚園概覽 2026/27》：麗城花園校址 0001", scope: "該校址班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2315840001" },
      { label: "教育局《學校位置及資料》及註冊資料", scope: "校名、麗城花園地址、電話及註冊狀態。", url: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
    ],
    detailSections: [
      { title: "探索、解難與個別觀察", featured: true, note: "課程及評估為校方自述；教育局概覽資料只對應麗城花園校址 0001。", details: [
        { label: "以動手探索和問題解決組織活動", value: "校方表示課程鼓勵幼兒探索、實驗和克服挑戰，並融入本地與國際研究方法及高階思維教育。這是課程取向，不是經獨立評估的成果保證；家長可留意孩子是否有時間試錯、表達想法，以及教師如何支援不同能力。", sourceUrl: "https://www.belvedere-garden.stanthonyskg.edu.hk/" },
        { label: "持續觀察與學習檔案", value: "校方介紹教師會觀察和記錄幼兒發展，並以學習檔案向家長呈現成長。這有助家長了解回饋方式；參觀時可問清檔案更新頻率、家長會議安排，以及若孩子需要額外支援時如何跟進。", sourceUrl: "https://www.belvedere-garden.stanthonyskg.edu.hk/" },
        { label: "英語授課欄與中英文校名應分開理解", value: "教育局《幼稚園概覽 2026/27》按校址 0001 列英文授課及 1:7.6 師生比例；校方公開頁未提供每日粵語、普通話和英語的課時比例。若家庭重視中文能力或雙語平衡，宜索取所申請級別的時間表。", period: "概覽：2026/27；校址 0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2315840001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "yan-oi-tong-mrs-cheng-ting-kong-kindergarten-618594",
    name: "仁愛堂鄭丁港夫人幼稚園",
    nameEn: "YAN OI TONG MRS CHENG TING KONG KINDERGARTEN",
    district: "沙田區",
    address: "新界沙田火炭桂地街 20 號駿洋邨駿洋商場地下 KG01 號舖",
    telephone: "+852 2682 4000",
    schoolNumber: "618594 / 校址 0001",
    sponsoringBody: "仁愛堂",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1–K3；上午、下午及全日班",
    website: "https://www.yotmctk.edu.hk/",
    dataYear: "教育局概覽 2026/27；收費證明書生效日 2025-09-01；校方課程資料查閱於 2026-10",
    sourceNote: "校方以兒童為本、多元活動和戲劇體驗描述課程；教育局概覽 2026/27 列校址 0001 粵語及 1:10.6。全日班費用證明書生效日為 2025-09-01，不能當作 2026/27 現行費用，報名前應索取最新收費表。",
    appendDirectoryDetails: true,
    sources: [
      { label: "仁愛堂鄭丁港夫人幼稚園：辦學宗旨及學校資料", scope: "兒童為本、多元活動、親身實踐及戲劇元素的校方描述。", url: "https://www.yotmctk.edu.hk/" },
      { label: "教育局《幼稚園概覽 2026/27》：校址 0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6185940001" },
      { label: "仁愛堂鄭丁港夫人幼稚園：收費證明書", scope: "2025-09-01 起生效的學費及膳食費，不代表之後年度費率。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/618594.pdf" },
      { label: "仁愛堂鄭丁港夫人幼稚園：家長教師會", scope: "2024/25 學年成立家長教師會及其家校合作職能。", url: "https://www.yotmctk.edu.hk/parents-zone/parent-teacher-association/" },
    ],
    detailSections: [
      { title: "戲劇體驗與生活學習", featured: true, note: "教學特色為校方自述；費用證明書為 2025/26 生效資料，須與當屆收費分開。", details: [
        { label: "以戲劇元素支持角色體驗和表達", value: "校方表示課程加入戲劇元素，讓幼兒透過角色和情境體驗提升創意思維、自信及品德發展。這項特色適合重視表達、想像和情境學習的家庭；參觀時可觀察教師如何讓不同性格的孩子參與，而不把上台表演當作唯一成果。", sourceUrl: "https://www.yotmctk.edu.hk/" },
        { label: "多元活動重視親身操作", value: "學校宗旨以兒童為本，提及透過多元活動讓幼兒親身實踐、在愉快經驗中學習。家長可問清 K1 的遊戲、主題活動和戶外學習如何安排，並了解教師會如何記錄幼兒進度、向家長提供回饋。", sourceUrl: "https://www.yotmctk.edu.hk/" },
        { label: "學費及膳食費要按年度重核", value: "教育局《幼稚園概覽 2026/27》列半日免費計劃資料及 1:10.6 師生比例；教育局收費證明書顯示全日班學費及膳食費，但生效日期是 2025-09-01。家庭估算現屆支出時，應向校方索取最新費表及必需雜費清單。", period: "概覽：2026/27；收費證明書：2025-09-01 生效", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/618594.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chinese-ymca-sheung-shui-kindergarten-575429",
    name: "中華基督教青年會上水幼稚園",
    nameEn: "CHINESE Y.M.C.A. SHEUNG SHUI KINDERGARTEN",
    district: "北區",
    address: "新界上水清河邨清潤樓地下B翼及C翼",
    schoolNumber: "575429 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://www.sscymca.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程報告：2022/23",
    sourceNote: "教育局 2026/27 概覽按校址列基本班制及比例；課程細節來自校方 2022/23 學校報告，並非現屆課時或評核結果。報名前宜向校方確認現行課程、PN、全日班及費用安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的授課語言、班制、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5754290001" },
      { label: "教育局學校搜尋", scope: "學校編號、校址編號、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=575429000111" },
      { label: "香港中華基督教青年會：學校及教育服務", scope: "辦學團體列出的上水幼稚園名稱、電話及校址。", url: "https://ymca.org.hk/service/school/" },
      { label: "中華基督教青年會上水幼稚園：2022/23 學校報告", scope: "該年度校方所述主題課程、遊戲及體能活動安排；不代表現屆課表。", url: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    ],
    detailSections: [
      { title: "遊戲、主題與體能活動", featured: true, note: "課程內容來自校方 2022/23 學校報告；頁面沒有把舊報告當作 2026/27 現況。", details: [
        { label: "以主題和幼兒發展興趣組織學習", value: "校方 2022/23 報告描述以幼兒為中心，按發展興趣設計主題學習，讓孩子在遊戲及生活經驗中接觸不同內容。對家長而言，這能說明當年課程設計方向；若你重視現時的專題形式、語文或評估安排，宜索取本年度課表和課程簡介再比較。", period: "校方報告：2022/23", sourceUrl: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
        { label: "報告記錄的體能活動不等於現屆時數", value: "該年度報告提及早上安排體能活動，全日班另有較短的自由體能活動時段。這是 2022/23 的校方紀錄，不能用來推斷現在每週體能課時或每名幼兒的參與量；參觀時可直接問校方目前戶外活動頻率和雨天安排。", period: "校方報告：2022/23", sourceUrl: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "ho-yan-kindergarten-sponsored-by-sik-sik-yuen-324850",
    name: "嗇色園主辦可仁幼稚園",
    nameEn: "HO YAN KINDERGARTEN (SPONSORED BY SIK SIK YUEN)",
    district: "南區",
    address: "香港鴨脷洲邨利添樓地下21至40號室",
    schoolNumber: "324850 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://www.hoyankg.edu.hk/",
    dataYear: "教育局概覽：2026/27；創校資料及課程：校方網站（查閱於 2026-10）",
    sourceNote: "教育局概覽列示校址年度資料；校方自述創辦於 1982 年，課程以兒童為本及自主遊戲為主軸。班制、語言課時與收費須按當屆校方資料確認。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3248500001" },
      { label: "教育局學校搜尋", scope: "學校編號、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=324850000113" },
      { label: "嗇色園主辦可仁幼稚園：課程及學校介紹", scope: "校方自述的辦學方針、創校年份、課程理念、語言環境及課程活動。", url: "https://www.hoyankg.edu.hk/" },
      { label: "嗇色園主辦可仁幼稚園：2023/24 概覽存檔", scope: "歷史課程描述及資料年份核對，不作現行收費來源。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324850c-0001.pdf" },
    ],
    detailSections: [
      { title: "兒童主導、自主遊戲與科學探索", featured: true, note: "課程特色為校方自述；「兩文三語」沒有公開各語言課時比例。", details: [
        { label: "讓幼兒透過遊戲和探索主動學習", value: "校方表示按幼兒的能力、興趣和需要設計活動，並採用兒童為中心的自主學習方式，內容包括遊戲、科學實驗、音體美藝和戶外參觀。對偏好動手探索、需要在活動中表達想法的孩子，這是值得在觀課時核實的課程方向；校方理念本身不代表每節課的實際比例。", sourceUrl: "https://www.hoyankg.edu.hk/" },
        { label: "三種語言的存在不等於主要授課語言", value: "校方列出粵語、英文和普通話，但沒有公布每日或每週課時分配。若家庭希望孩子在特定語言中建立較穩定的學習環境，報名前可索取各級課表，分清日常照顧語言、專科活動和主題課所用語言。", sourceUrl: "https://www.hoyankg.edu.hk/" },
        { label: "全日安排應連同家庭作息核對", value: "校方網站列出上午班及全日班時段，並介紹已參加幼稚園教育計劃；實際班別、名額、午膳和當屆收費仍應以校方最新通知為準。對跨區接送家庭，全日班放學時間與接送安排會直接影響日常可行性。", sourceUrl: "https://www.hoyankg.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "twghs-wai-cheung-chi-memorial-kindergarten-325414",
    name: "東華三院韋祥智紀念幼稚園",
    nameEn: "TWGHS WAI CHEUNG CHI MEMORIAL KINDERGARTEN",
    district: "黃大仙區",
    address: "九龍鑽石山啟鑽苑啟濤閣地下KG01室",
    schoolNumber: "325414 / 校址 0002",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://wcc-kindergarten.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程及校舍資料：查閱於 2026-10",
    sourceNote: "教育局年度概覽與校方網站均指向啟鑽苑校址。學校為 2024 年開辦的新校，課程介紹屬校方自述；尚不宜以短期資料推斷升小去向或長期學習成效。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0002 的班制、語言、師生比例及年度費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3254140002" },
      { label: "教育局學校搜尋：校址與登記", scope: "學校編號、校址編號及啟鑽苑地址。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=325414000211" },
      { label: "東華三院韋祥智紀念幼稚園：課程及教學", scope: "校方列出的六大範疇、生活經驗、參觀、戲劇、故事及英語教學內容。", url: "https://wcc-kindergarten.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8/" },
      { label: "東華三院韋祥智紀念幼稚園：聯絡資料", scope: "校址、聯絡電話及辦公時間。", url: "https://wcc-kindergarten.edu.hk/contact/" },
    ],
    detailSections: [
      { title: "生活經驗、故事與多元表達", featured: true, note: "新校課程描述來自校方；課程目標不等於已驗證的學生學習結果。", details: [
        { label: "六大學習範疇連結日常經驗", value: "校方課程頁列出藝術與創意、中文、幼兒數學、個人與群體、體能與健康，以及大自然與生活等範疇，並說明會運用兒童的實際生活經驗設計活動。家長可觀察教師如何把生活素材轉成對話、操作和回顧，而不只看課程主題名稱。", sourceUrl: "https://wcc-kindergarten.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8/" },
        { label: "故事、戲劇和參觀是校方列出的學習形式", value: "校方列出故事、戲劇及參觀等多樣活動，並設有繪本教學及英語教學內容。這些形式對喜歡聽故事、角色扮演或實地觀察的孩子可能較有吸引力；公開頁沒有提供各活動的每週頻率或語言課時，需向校方索取當屆時間表。", sourceUrl: "https://wcc-kindergarten.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8/" },
        { label: "新校階段的家長核對重點", value: "東華三院在 2024 年公布學校開幕，故目前缺少可供多年比較的校本升小走勢。選校時宜優先看本屆課表、師生安排、家校溝通方式和鑽石山通勤，再把升小規劃視作家庭另行安排的事項。", period: "校方開幕：2024 年", sourceUrl: "https://www.tungwah.org.hk/press-release/%E6%9D%B1%E8%8F%AF%E4%B8%89%E9%99%A2%E9%9F%8B%E7%A5%A5%E6%99%BA%E7%B4%80%E5%BF%B5%E5%B9%BC%E7%A8%9A%E5%9C%92%E8%88%89%E8%A1%8C%E9%96%8B%E5%B9%95%E5%85%B8%E7%A6%AE-%E8%87%B4%E5%8A%9B%E6%8E%A8%E5%8B%95/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "cannan-kindergarten-central-caine-road-619841",
    name: "迦南幼稚園（中環堅道）",
    nameEn: "CANNAN KINDERGARTEN (CENTRAL CAINE ROAD)",
    district: "中西區",
    address: "香港中環堅道99號豐樂閣一樓前座",
    schoolNumber: "619841 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；校方列出 K1 至 K3，實際班別以當屆安排為準",
    website: "https://www.cannan.edu.hk/",
    dataYear: "教育局概覽：2026/27；課程為迦南幼稚園官方課程頁（查閱於 2026-10）",
    sourceNote: "學校編號及中環堅道校址按教育局校址資料核對。課程頁為迦南幼稚園整體課程介紹，並未提供堅道校舍獨有的課時或活動比例，因此不把集團課程描述成此校舍獨有安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及年度費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6198410001" },
      { label: "教育局學校搜尋", scope: "學校編號、校址、區份、授課時間及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=619841000112" },
      { label: "迦南幼稚園：官方幼稚園課程介紹", scope: "迦南幼稚園整體課程中的六大學習範疇、動手學習、遊戲及學習紀錄；非堅道校舍專屬課時。", url: "https://www.cannan.edu.hk/kindergarten" },
      { label: "教育局校舍容額資料：中環堅道校址", scope: "校址 0001 登記課室及半日班核准容額；不等於實際招生學額。", url: "https://applications.edb.gov.hk/schoolsearch/permittedaccommodation.aspx?langno=2&scrn=619841000111" },
    ],
    detailSections: [
      { title: "動手學習與六大範疇", featured: true, note: "課程內容屬迦南幼稚園整體自述，學校未公布堅道校舍的語言課時及活動比例。", details: [
        { label: "以實作經驗整合六個學習範疇", value: "迦南課程頁說明幼兒透過動手經驗學習，並整合六大學習範疇，重視全人、均衡和適切發展。對堅道校舍的家長，這可作為品牌層面的課程參考；參觀時仍應確認該校址如何落實、每週有哪些活動，以及幼兒如何記錄學習。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
        { label: "校舍容額不是招生名額", value: "教育局校舍資料列有四間課室及各課室半日班核准容額；這是校舍可容納上限，不能直接解讀成 2026/27 K1 學額或空缺。申請前應向校方核實各級實際班數、上午／下午安排與是否接受插班。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/permittedaccommodation.aspx?langno=2&scrn=619841000111" },
        { label: "新校舍的歷年結果仍有限", value: "教育局資料顯示該校址於 2023 年臨時註冊、2024 年正式註冊。學校歷史較短，家長不宜只依賴其他迦南校舍或品牌整體的升小資料；應直接詢問堅道校址可提供的畢業去向和家校支援紀錄。", period: "教育局註冊資料：2024 年正式註冊", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=619841000112" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "tung-wah-group-of-hospitals-tsui-tsin-tong-kindergarten-158534",
    name: "東華三院徐展堂幼稚園",
    nameEn: "TUNG WAH GROUP OF HOSPITALS TSUI TSIN TONG KINDERGARTEN",
    district: "北區",
    address: "新界上水天平邨第六座天喜樓地下",
    schoolNumber: "158534 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://www.twghtttkg.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程資料：查閱於 2026-10",
    sourceNote: "教育局概覽按上水天平邨校址列年度資料；校方課程頁列四大發展領域、粵語及英語／普通話語言環境和繪本教學。語言介紹不提供實際授課比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585340001" },
      { label: "教育局學校搜尋", scope: "學校編號、校址、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=158534000113" },
      { label: "東華三院徐展堂幼稚園：學校特色與課程教學", scope: "校方所述四大發展領域、兩文三語環境及繪本、藝術與戲劇課程。", url: "https://www.twghtttkg.edu.hk/" },
      { label: "東華三院幼稚園教育", scope: "辦學團體課程框架及徐展堂幼稚園基本聯絡資料；集團概況不替代校址年度數據。", url: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
    ],
    detailSections: [
      { title: "繪本、藝術與多語言接觸", featured: true, note: "特色為校方及辦學團體公開的課程描述；沒有公開不同語言的實際課時。", details: [
        { label: "繪本教學延伸到藝術和戲劇", value: "校方表示以繪本設計校內外活動，並把藝術及戲劇元素放入課程，目標是提升語文和共通能力。這種設計提供較多故事理解、表達和創作的學習入口；家長可看孩子是否有機會自己講述、提問和創作，而非只聽教師講解。", sourceUrl: "https://www.twghtttkg.edu.hk/" },
        { label: "粵語為母語環境，另接觸英語及普通話", value: "校方介紹以粵語作母語學習，另建立英語及普通話接觸環境。頁面未列三種語言的課時或主題課比例；若家庭有明確語言目標，應索取分級課表並確認日常教學語言。", sourceUrl: "https://www.twghtttkg.edu.hk/" },
        { label: "把東華三院課程框架與本校安排分開看", value: "辦學團體描述旗下幼稚園採學生為中心、遊戲中學習，結合繪本、藝術、德育和生活學習；這是集團方向。實際教材、活動密度和班級做法仍應以徐展堂幼稚園的當屆安排為準。", sourceUrl: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lui-cheung-kwong-lutheran-kindergarten-157074",
    name: "路德會呂祥光幼稚園",
    nameEn: "LUI CHEUNG KWONG LUTHERAN KINDERGARTEN",
    district: "屯門區",
    address: "新界屯門友愛邨愛廉樓高座地下",
    schoolNumber: "157074 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://www.lckk.edu.hk/",
    dataYear: "教育局概覽：2026/27；理念：校方網站（查閱於 2026-10）",
    sourceNote: "教育局概覽按友愛邨校址列班制和比例；校方理念頁以愉快學習、啟發性和趣味性課程為核心。理念頁沒有提供完整語言課時或現屆招生空額。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1570740001" },
      { label: "教育局學校搜尋", scope: "學校編號、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=157074000113" },
      { label: "路德會呂祥光幼稚園：辦學理念", scope: "校方所述愉快學習、趣味課程及幼兒個別差異理念。", url: "https://www.lckk.edu.hk/l/fada9CQpRDw" },
      { label: "香港路德會：校本課程改革文章", scope: "2024 年出版文章中對呂祥光及建生兩校課程改革的回顧，不作現行課表證據。", url: "https://www.lutheran.org.hk/wp-content/uploads/2024/02/%E8%B7%AF%E5%BE%B7%E6%95%99%E8%82%B222%E6%9C%9F.pdf" },
    ],
    detailSections: [
      { title: "愉快學習與個別差異", featured: true, note: "校方辦學理念反映課程目標；實際課程仍要看當屆課表及課堂觀察。", details: [
        { label: "課程強調啟發性和趣味性", value: "校方以「愉快學習」作為核心教育理念，表示課程兼顧啟發性與趣味性。對慢熱或需要透過活動投入的幼兒，家長可留意教師如何安排選擇、探索和轉換活動，也應了解孩子遇到挫折時如何獲得個別引導。", sourceUrl: "https://www.lckk.edu.hk/l/fada9CQpRDw" },
        { label: "課程改革有歷史脈絡，不能代替現行資料", value: "路德會 2024 年文章回顧呂祥光及建生兩校的校本課程改革經驗。這能提供課程發展背景，但不能證明目前每級採用完全相同的教學流程；報名前應向校方確認主題活動、評估方式和家長回饋安排。", period: "辦學團體文章：2024 年", sourceUrl: "https://www.lutheran.org.hk/wp-content/uploads/2024/02/%E8%B7%AF%E5%BE%B7%E6%95%99%E8%82%B222%E6%9C%9F.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "yuen-long-lutheran-life-kindergarten-155624",
    name: "元朗信義會生命幼稚園",
    nameEn: "YUEN LONG LUTHERAN LIFE KINDERGARTEN",
    district: "元朗區",
    address: "新界元朗安信街丈量約份第120約地段第3713及3714號",
    schoolNumber: "155624 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；班別與招生安排以校方當屆公告為準",
    website: "https://lifekg.edu.hk/",
    dataYear: "教育局概覽：2026/27；學習活動：校方網站（查閱於 2026-10）",
    sourceNote: "教育局概覽列示元朗安信街校址的年度班制資料；校方公開遊戲中學習、故事綜合、小組討論、專題和戶外體驗等活動。活動頁未列各級每週課時分配。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1556240001" },
      { label: "教育局學校搜尋", scope: "學校編號、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=155624000112" },
      { label: "元朗信義會生命幼稚園：課堂活動", scope: "校方所述遊戲中學習、故事綜合、小組討論、專題、藝術與戶外活動。", url: "https://lifekg.edu.hk/%E6%B4%BB%E5%8B%95%E7%9B%B8%E7%89%87/" },
      { label: "元朗信義會生命幼稚園：招生簡章", scope: "校方介紹招生簡介會內容及 2026/27 英語增潤課程；具體招生日期以新年度公告為準。", url: "https://lifekg.edu.hk/wp-content/uploads/2025/09/%E6%8B%9B%E7%94%9F%E7%B0%A1%E7%AB%A0%E4%B8%AD%E6%96%8711-9-2025%E6%9B%B4%E6%96%B0.pdf" },
    ],
    detailSections: [
      { title: "遊戲、故事與課室外體驗", featured: true, note: "活動形式來自校方介紹；校方沒有在活動頁公布每週時數或各語言比例。", details: [
        { label: "多種活動圍繞遊戲中學習", value: "校方列出的教學形式包括故事綜合、小組討論、專題研習、親子習作、藝術活動和戶外參觀，並提及以實物和視聽教材支援具體學習經驗。家庭可看這種安排是否符合孩子透過操作、對話和外出觀察學習的需要；活動清單不等於每週固定課時。", sourceUrl: "https://lifekg.edu.hk/%E6%B4%BB%E5%8B%95%E7%9B%B8%E7%89%87/" },
        { label: "語言增潤需與主課程分開判斷", value: "校方 2026/27 招生簡章提及下午 K1 的英語增潤課程；這是特定班別安排，不能概括為全校以英語授課。若語言是家庭選校條件，應核對當屆 K1 至 K3 的課表和活動語言。", period: "招生簡章：2026/27", sourceUrl: "https://lifekg.edu.hk/wp-content/uploads/2025/09/%E6%8B%9B%E7%94%9F%E7%B0%A1%E7%AB%A0%E4%B8%AD%E6%96%8711-9-2025%E6%9B%B4%E6%96%B0.pdf" },
        { label: "留意不同班制與家庭接送成本", value: "教育局年度概覽顯示學校的班制欄位，校方亦按年度發布招生資料。家長宜先確認心儀級別的實際上課時段、是否提供所需照顧服務，以及校車路線是否覆蓋住址，再把活動特色和每日通勤一起考慮。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1556240001" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lok-sin-tong-stephen-leung-kindergarten-157864",
    name: "樂善堂梁泳釗幼稚園",
    nameEn: "LOK SIN TONG STEPHEN LEUNG KINDERGARTEN",
    district: "沙田區",
    address: "新界沙田美城苑暉誠閣地下",
    schoolNumber: "157864 / 校址 0001",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；各級及班制以當屆校方安排為準",
    website: "https://www.lstslkg.edu.hk/zh-hant",
    dataYear: "教育局概覽：2026/27；課程與收費：校方頁面（查閱於 2026-10）",
    sourceNote: "教育局概覽按美城苑校址列示年度資料；校方課程頁列體驗式自主探索、繪本藝術、兩文三語、創科遊戲和情智教育。網站另有 2026/27 收費頁，應以校方最新收費證明與必需雜費確認實際支出。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1578640001" },
      { label: "教育局學校搜尋", scope: "學校編號、地址及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=157864000111" },
      { label: "樂善堂梁泳釗幼稚園：課程簡介", scope: "校方列出的體驗式探索、英語和普通話課程、創科遊戲、綜合藝術及情智教育安排。", url: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
      { label: "樂善堂梁泳釗幼稚園：2026/27 收費項目", scope: "校方公布的當年度收費項目；需留意學費、膳食與其他雜費的不同口徑。", url: "https://www.lstslkg.edu.hk/zh-hant/school_info/chargingitem2627" },
    ],
    detailSections: [
      { title: "探索、語言與情智教育", featured: true, note: "校方公開的課程內容提供方向，不代表各項活動在每級有相同課時。", details: [
        { label: "從體驗和繪本延伸到多元課程", value: "校方以體驗式自主探索為課程主軸，並列出創意繪本綜合藝術、環保與生命教育、品德教育及戶外體驗。對喜歡提問和親身操作的幼兒，這種設計可能較容易把生活經驗帶入學習；家長可觀課了解教師如何讓孩子表達自己的觀察。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
        { label: "英語和普通話均有專門活動", value: "課程頁提及駐校外籍英語教師每天以小組或大班教授英語，並由普通話專科教師透過遊戲和故事教聽說。這能確認校方有相關課程安排，但沒有公布每級實際分鐘數；若你希望某語言成為主要學習語言，仍需索取周課表。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
        { label: "創科遊戲和情緒教育要看日常落實", value: "校方列出簡單編程玩具、每週 Smart Play Day，以及 Kimochis 情智教育課程。家長可詢問孩子如何輪流操作教具、怎樣處理挫折，以及學校會如何把情緒教育的觀察回饋給家長；課程名稱本身不證明個別幼兒的成果。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "telford-gardens-kindergarten-324736",
    name: "德福幼稚園",
    nameEn: "TELFORD GARDENS KINDERGARTEN",
    district: "觀塘區",
    address: "九龍觀塘九龍灣德福花園",
    telephone: "27575749",
    schoolNumber: "324736 / 校址 0001",
    schoolType: "私立幼稚園；本地課程",
    gradeSpan: "幼稚園；實際班別以當屆校方安排為準",
    website: "https://www.telfordkindergarten.org/",
    dataYear: "教育局登記資料查閱於 2026-10；校方理念查閱於 2026-10；課程補充資料：2023/24",
    sourceNote: "教育局確認德福幼稚園為獨立登記學校，授課時間列全日；校方理念強調兒童為本、遊戲與經驗學習。部分課程細節只見於 2023/24 教育局概覽存檔，不能當作現屆課程時數或費用。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局學校搜尋：德福幼稚園", scope: "學校編號、校址、全日授課時間、私立類別及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=324736000113" },
      { label: "教育局《幼稚園概覽 2023/24》：本地課程資料", scope: "2023/24 學年校方提交的課程規劃、主題活動及評估方式，屬歷史資料。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324736c-0001Y.pdf" },
      { label: "德福幼稚園：辦學理念", scope: "校方目前公開的兒童為本、品德、遊戲及經驗學習理念。", url: "https://www.telfordeducation.com/chinese" },
      { label: "德福幼稚園：2025 年入學申請表", scope: "校方把德福幼稚園、德福英文幼稚園及嬰幼樂園列作不同選項；僅作機構內學校身份區分。", url: "https://www.telfordeducation.com/wp-content/uploads/2025/12/%E5%BE%B7%E7%A6%8F%E5%B9%BC%E7%A8%9A%E5%9C%92%E4%B8%89%E6%A0%A1%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
    ],
    detailSections: [
      { title: "兒童為本、遊戲與經驗學習", featured: true, note: "校方目前公布辦學理念；具體課程資料來自 2023/24 存檔，實際安排須向校方確認。", details: [
        { label: "辦學理念重視兒童差異和品德培養", value: "校方表示以兒童為本，關注幼兒不同特質和需要，並希望培養品德、解難及溝通能力。對選校家庭而言，核心問題是教師如何在日常生活中處理不同步調的孩子；參觀時可問適應支援、班級照顧和家校溝通做法。", sourceUrl: "https://www.telfordeducation.com/chinese" },
        { label: "歷史課程資料提及探索和綜合故事", value: "教育局 2023/24 概覽存檔記錄校方當時採用探索教育、綜合故事與創意活動，並以主題、小組和戶外參觀支持學習；評估以持續觀察和學習檔案為主。這些是舊年度資料，不代表現屆課表，應先向學校索取最新課程簡介。", period: "概覽：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324736c-0001Y.pdf" },
        { label: "勿與同園區的英文幼稚園混為一校", value: "辦學團體的申請表把德福幼稚園和德福英文幼稚園分列為不同選項，教育局亦各有學校編號。申請和比較時要核對課程、授課時段及收費對應哪一間學校，避免把另一校的英語安排或費用套用到本校。", sourceUrl: "https://www.telfordeducation.com/wp-content/uploads/2025/12/%E5%BE%B7%E7%A6%8F%E5%B9%BC%E7%A8%9A%E5%9C%92%E4%B8%89%E6%A0%A1%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "telford-gardens-english-kindergarten-601985",
    name: "德福英文幼稚園",
    nameEn: "TELFORD GARDENS ENGLISH KINDERGARTEN",
    district: "觀塘區",
    address: "九龍九龍灣德福花園平台三樓（K4課室除外）",
    telephone: "27575749",
    schoolNumber: "601985 / 校址 0001",
    schoolType: "私立幼稚園；不參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；課程和班別以當屆校方安排為準",
    website: "https://www.telfordkindergarten.org/",
    dataYear: "教育局概覽：2026/27；課程資料為校方提供的 2025/26 概覽；收費證明書生效年度須另核",
    sourceNote: "教育局與校方入學表均把德福英文幼稚園列作獨立學校，校址與德福幼稚園不同。教育局 2026/27 概覽可供比較基本數據；課程說明採 2025/26 校方資料，收費以當屆教育局證明書為準。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址 0001 的班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6019850001" },
      { label: "教育局學校搜尋", scope: "學校編號、校址、學校類別及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=601985000111" },
      { label: "教育局《幼稚園概覽 2025/26》校方課程描述", scope: "德福英文幼稚園當年提交的全英普雙語、主題綜合及持續觀察資料；不是各班的語言比例。", url: "https://kgp2025.kindergartenprofile.com/school/?schid=6019850001" },
      { label: "德福教育機構：三校入學申請表（2025）", scope: "確認德福英文幼稚園與德福幼稚園為分開列示的申請選項。", url: "https://www.telfordeducation.com/wp-content/uploads/2025/12/%E5%BE%B7%E7%A6%8F%E5%B9%BC%E7%A8%9A%E5%9C%92%E4%B8%89%E6%A0%A1%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
      { label: "教育局收費證明書", scope: "官方批准收費，但證明書須按生效年度解讀；申請前核對當屆最新版本。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/601985.pdf" },
    ],
    detailSections: [
      { title: "英語與普通話課程的實際安排", featured: true, note: "英語特色以校方提交的 2025/26 概覽為據；沒有公開各語言逐日課時，不據此推算全日語言比例。", details: [
        { label: "校方描述全英普雙語教學與主題活動", value: "教育局概覽中的校方資料將教學模式描述為全英普雙語，並提及主題綜合活動、設計活動、小組學習及戶外參觀。這比校名更具體，但仍不能推出英語和普通話各佔多少課時；家長宜索取當屆分級時間表，確認日常照顧及主題課所用語言。", period: "校方資料：2025/26", sourceUrl: "https://kgp2025.kindergartenprofile.com/school/?schid=6019850001" },
        { label: "以持續觀察和學習檔案記錄學習", value: "同一年度的校方資料提及持續觀察、單元及總結性評估和學習檔案。家長可進一步詢問檔案多久更新一次、家長如何查看，以及學校會否以具體例子解釋孩子在語言、社交和自理方面的進展。", period: "校方資料：2025/26", sourceUrl: "https://kgp2025.kindergartenprofile.com/school/?schid=6019850001" },
        { label: "先分清學費和年度版本", value: "此校不參加幼稚園教育計劃，年度學費需與免費計劃幼稚園分開比較。教育局收費證明書曾列每期學費，但網頁可見版本有其生效日期；家庭預算應以最新核准證明書、註冊費及必需雜費一併核算。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/601985.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "semple-kindergarten-216070",
    name: "深培中英文幼稚園",
    nameEn: "SEMPLE KINDERGARTEN",
    district: "油尖旺區",
    address: "九龍大角咀柳樹街10號地下（部分）、一樓全層、二樓（部分）及三樓全層",
    schoolNumber: "216070",
    registryKey: "kindergarten/216070",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "K1 至 K3；班制按當屆校方安排",
    website: "https://semplekg.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程資料查閱於 2026-10",
    sourceNote: "深培中英文幼稚園網站明確列出以實作、遊戲和生活經驗支持學習，並稱每週設英語、普通話及體育課。KGP 基本資料按學校編號 216070、校址 0001 對應；語言課時、班制和收費仍以 2026/27 概覽及最新校方通知為準。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 216070、校址 0001 的班制、PN、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2160700001" },
      { label: "教育局《學校位置及資料》", scope: "學校名稱、學校編號、校址、地區、學校類別及官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "深培中英文幼稚園：課程特色", scope: "校方按 K1、K2、K3 分列的課程方向、實作與遊戲學習，以及每週英語、普通話和體育課介紹。", url: "https://semplekg.edu.hk/en/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      { label: "深培中英文幼稚園：學校首頁", scope: "校方以故事引入主題、按幼兒興趣開展專題研習，以及外籍英語和普通話教師的介紹。", url: "https://semplekg.edu.hk/" },
    ],
    detailSections: [
      { title: "實作探索與語言活動", featured: true, note: "課程內容為校方自述；「每週課」不等於已公開具體課時或全日語言比例。", details: [
        { label: "故事引題，再按孩子興趣延伸專題", value: "校方表示課程從故事引入主題，並會因應孩子興趣發展專題研習；課堂重視動手、遊戲、生活經驗、討論和分享。家長可詢問專題如何從幼兒提問開始，以及教師如何照顧不同參與程度的孩子。", sourceUrl: "https://semplekg.edu.hk/" },
        { label: "K1 至 K3 課程方向有分級說明", value: "校方課程頁分別說明 K1 的合作、感官與生活經驗，K2 的探索和藝術活動，以及 K3 的討論、社交和安全意識。這提供了由低至高班的課程脈絡；實際作業、評估和活動頻率仍應在參觀時按年級核對。", sourceUrl: "https://semplekg.edu.hk/en/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
        { label: "英語、普通話及體育有每週課程安排", value: "校方列出每週英語、普通話和體育課，亦表示有外籍英語老師及專任普通話老師。這證明有明確課程項目，但沒有列各語言每週分鐘數或日常照顧使用語言；如家庭追求沉浸式英語，應先索取當屆時間表。", sourceUrl: "https://semplekg.edu.hk/en/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hk-true-light-caine-kg",
    name: "香港真光幼稚園（堅道）",
    nameEn: "HONG KONG TRUE LIGHT KINDERGARTEN (CAINE ROAD)",
    district: "中西區",
    address: "香港堅道７５號地下至二樓",
    schoolNumber: "536911",
    registryKey: "kindergarten/536911",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://www.truelightk-c.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程與收生資料查閱於 2026-10",
    sourceNote: "課程和師資安排引用香港真光幼稚園堅道校址自己的頁面，不套用真光小學或其他真光學校資料。校方明確描述每日外籍英語教師小組課和普通話活動；實際班級名額、學費和收生條件要以當屆教育局概覽及校方公告為準。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 536911、校址 0001 的班制、語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5369110001" },
      { label: "教育局《學校位置及資料》", scope: "堅道校址的正式校名、學校編號、類別、分區、地址及官方網站。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "香港真光幼稚園（堅道）：課程簡介", scope: "該校址的課程目標、英文小組課、普通話活動和教學安排。", url: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
      { label: "香港真光幼稚園（堅道）：入學資訊", scope: "校方當屆招生、註冊與幼小銜接程序；年度變動需依最新公告。", url: "https://www.truelightk-c.edu.hk/m05_entry_page01.php" },
    ],
    detailSections: [
      { title: "英語小組課與幼小銜接", featured: true, note: "課程描述來自堅道校址官方頁；學位條件及升讀安排須按當屆公告核實。", details: [
        { label: "外籍英文教師每日以小組授課", value: "校方說明由持學士學歷的全職外籍英文教師每天以小組方式教學，活動包括談話、故事、閱讀、遊戲、歌曲和拼音。這比只標示「有英語」更具體；家長可再問各級分組人數、每組時長和教師如何跟進孩子開口情況。", sourceUrl: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
        { label: "普通話以故事、遊戲與歌曲接觸", value: "課程頁列出普通話談話、故事、閱讀、遊戲、歌曲和拼音活動。粵語仍是教育局概覽列示的授課語言，普通話課程本身不能推成全日普通話環境；選校前可了解各語言在主題課、生活照顧和家長溝通中的分工。", sourceUrl: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
        { label: "升小銜接有校本評核和小學面試環節", value: "校方招生頁明確表示高班學生須報名、通過幼稚園校本評核及真光小學面試評核，方可升讀小學一年級。這代表家庭需要提前了解評核和面試安排；不能把幼稚園在讀身份理解為自動直升。", sourceUrl: "https://www.truelightk-c.edu.hk/m05_entry_page01.php" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "aberdeen-baptist-church-pak-kwong-kindergarten-523089",
    name: "香港仔浸信會白光幼稚園",
    nameEn: "ABERDEEN BAPTIST CHURCH PAK KWONG KINDERGARTEN",
    district: "南區",
    address: "香港香港仔水塘道十一號（擴建部分）",
    schoolNumber: "523089",
    registryKey: "kindergarten/523089",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；PN 與各班制按教育局概覽及校方當屆安排",
    website: "https://www.pkkg.edu.hk/tc/",
    dataYear: "教育局概覽：2026/27；校方課程頁查閱於 2026-10",
    sourceNote: "GBA「全腦潛能開發」是校方自訂課程名稱和教學主張；學校網頁所述能力提升沒有作獨立成效驗證。PN、班制和收費須以香港仔校址的最新教育局概覽及收費文件確認。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 523089、校址 0001 的班制、PN、語言、師生比例及核准學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5230890001" },
      { label: "香港仔浸信會白光幼稚園：課程特色", scope: "校方對 GBA、主題教學、繪本、英語及中文活動的自述。", url: "https://www.pkkg.edu.hk/tc/content.php?wid=4" },
      { label: "香港仔浸信會白光幼稚園：教學理念", scope: "校方兒童為本精神、六大範疇與學習方法說明。", url: "https://www.pkkg.edu.hk/tc/" },
    ],
    detailSections: [
      { title: "校本課程與語言活動", featured: true, note: "校方把 GBA 描述為自主研發課程；其成效主張不等於獨立評估結果。", details: [
        { label: "GBA 是學校主打的校本設計", value: "校方介紹「全腦潛能開發課程」包含多種聆聽、記憶和感官遊戲。這是該園鮮明的課程特色，但網頁所列專注力、記憶力等效益屬校方主張，家長宜實地觀課，了解每項活動如何融入日常課程，並詢問如何記錄幼兒進展。", sourceUrl: "https://www.pkkg.edu.hk/tc/content.php?wid=4" },
        { label: "主題與繪本活動連接多個範疇", value: "課程頁亦列出把語文、數學、常識、美勞、音樂和體能融入主題教學，並以繪本支持觀察、想像和閱讀。對喜歡故事和具體操作的孩子，家長可詢問幼兒是否有足夠表達和自主探索機會，而非只完成教師預設步驟。", sourceUrl: "https://www.pkkg.edu.hk/tc/content.php?wid=4" },
        { label: "普通話、粵語及英語需看實際課時", value: "校方公開趣味中文（普通話／粵語）及循序英語拼音等安排；網頁沒有提供各年級每週課時比例，因此不宜只看「兩文三語」判斷主要教學語言。若你在意英語或普通話沉浸程度，應索取當屆時間表和語言活動例子。", sourceUrl: "https://www.pkkg.edu.hk/tc/content.php?wid=4" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "pt",
    name: "香港培道小學幼稚園",
    nameEn: "POOI TO PRIMARY SCHOOL KINDERGARTEN",
    district: "九龍城區",
    address: "九龍馬頭涌福祥街3號",
    schoolNumber: "324477",
    registryKey: "kindergarten/324477",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班、幼低班及幼高班；上午及下午班",
    website: "https://kids.ptps.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程與班制：校方網站查閱於 2026-10",
    sourceNote: "培道幼稚園官網公開上午和下午班及以生活經驗為本的課程理念；招生班數、校車路線及雜費會隨年度調整。本頁不把歷年班數當作當屆學額或保證升讀培道小學的名額。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 324477、校址 0001 的年度班制、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3244770001" },
      { label: "香港培道小學幼稚園：一般資料", scope: "校方公布的班級、上午／下午上課時間、聯絡及校址。", url: "https://kids.ptps.edu.hk/" },
      { label: "香港培道小學幼稚園：課程特色", scope: "校方課程簡介、杜威「從做中學」理念及教學活動說明。", url: "https://kids.ptps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=6&pageId=3&webPageId=3" },
      { label: "香港培道小學幼稚園：2026/27 學校簡介", scope: "2026/27 招生簡介所列課程、班級和師資資料；只按該學年理解。", url: "https://kids.ptps.edu.hk/download/Resource/pdf/2026-2027%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B.pdf" },
    ],
    detailSections: [
      { title: "生活經驗與體驗式學習", featured: true, note: "課程主張來自校方；年度班數、師資及招生安排請依當屆資料核對。", details: [
        { label: "以生活經驗組織綜合課程", value: "校方表示課程配合幼兒生活經驗和能力發展，採用主題、遊戲、戲劇和故事等方式。對重視孩子能否把學習連到日常的家庭，參觀時可看課室作品與活動紀錄，並請老師說明孩子如何參與設計和分享。", sourceUrl: "https://kids.ptps.edu.hk/" },
        { label: "校方引用杜威的「從做中學」理念", value: "培道把「從做中學」和「教育即生活」列作課程理念。這種表述值得進一步核實到課堂：家長可觀察幼兒是否有實際操作、角色扮演、討論與反思的時間，不要只憑理念標語判斷教學方式。", sourceUrl: "https://kids.ptps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=6&pageId=3&webPageId=3" },
        { label: "上午與下午班會影響家庭日程", value: "校方一般資料列上午 9:00–12:00、下午 1:30–4:30。若家庭需要全日照顧或接送支援，應再核對當屆是否開辦所需班制、保姆車路線和延展服務；舊年度的班數不能當成新一屆收生名額。", sourceUrl: "https://kids.ptps.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "smart-kids-anglo-chinese-kindergarten-622869",
    name: "卓爾中英文幼稚園",
    nameEn: "SMART KIDS ANGLO-CHINESE KINDERGARTEN",
    district: "油尖旺區",
    address: "九龍尖沙咀彌敦道136A號地下及一樓",
    schoolNumber: "622869",
    registryKey: "kindergarten/622869",
    schoolType: "幼稚園；以教育局概覽所列年度類別為準",
    gradeSpan: "K1 至 K3；上午、下午及全日班以當屆安排為準",
    website: "https://www.smartkidskg.edu.hk/tc/index.php",
    dataYear: "教育局概覽：2026/27；校方背景及課程資料查閱於 2026-10",
    sourceNote: "校方頁面列出中英文園名、班級年齡、半日與全日上課時段及由尖沙咀街坊福利會管理。課程頁的兩文三語和教學效益屬校方介紹，未公布語言比例；校園面積及活動場地亦不等同每名幼兒可用時數。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 622869、校址 0001 的年度班制、授課語言、師生比例與費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6228690001" },
      { label: "卓爾中英文幼稚園：學校背景", scope: "辦學團體、年級年齡、上課時段、校舍和聯絡資料。", url: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
      { label: "卓爾中英文幼稚園：課程教學", scope: "校方列出的主題、設計活動、繪本、自由遊戲及兩文三語教學方法。", url: "https://www.smartkidskg.edu.hk/tc/content.php?wid=13" },
    ],
    detailSections: [
      { title: "主題活動與中英文學習", featured: true, note: "以下是校方課程介紹；具體課時和班別安排應索取當屆時間表。", details: [
        { label: "主題教學和設計活動並行", value: "卓爾列出主題教學、設計活動、繪本及自由遊戲等模式。這讓家長可以把注意力放在課堂是否有孩子主導的探索與實作；參觀時可問同一主題如何按 K1、K2、K3 的能力調整，而不只看活動照片。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=13" },
        { label: "尖沙咀校舍有室內外活動空間", value: "校方介紹校園分布於兩層，設有多間課室和室內外活動場地。對每天在市區接送的家庭，除了空間配置，也要確認接送動線、孩子戶外活動頻率和雨天安排；校舍描述本身不能說明每班使用時段。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
        { label: "校方稱提供兩文三語教學", value: "課程頁列有兩文三語教學，但沒有標示粵語、英語和普通話在各級所佔時間。若你希望孩子以英語為主要教學語言，應要求校方提供日程、教師配置及課堂例子，再與其他學校比較。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=13" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "c-c-c-mongkok-church-jeannette-kindergarten-547069",
    name: "中華基督教會望覺堂賢貞幼稚園",
    nameEn: "C C C MONGKOK CHURCH JEANNETTE KINDERGARTEN",
    district: "油尖旺區",
    address: "九龍旺角弼街56號望覺基督教大樓地下、一樓及三樓",
    schoolNumber: "547069",
    registryKey: "kindergarten/547069",
    schoolType: "幼稚園；類別與參加計劃情況按 2026/27 概覽",
    gradeSpan: "幼稚園；班級和班制以當屆教育局概覽為準",
    website: "http://mkcjk.ccc.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方歷史及活動資料查閱於 2026-10",
    sourceNote: "教育局資料以學校編號 547069 配對；望覺堂賢貞幼稚園校址在多用途基督教大樓內，登記校舍範圍有部分時段不包括特定課室，不能把大樓所有空間視為幼稚園專用。校方公開的競賽紀錄屬指定年度結果，不代表每位幼兒均參與或可取得相同成果。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 547069、校址 0001 的年度班制、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5470690001" },
      { label: "中華基督教會望覺堂賢貞幼稚園：學校歷史", scope: "校方記錄的辦學沿革及 2002 年於重建後重新註冊開辦的資料。", url: "https://mkcjk.ccc.edu.hk/%E5%AD%B8%E6%A0%A1%E6%AD%B7%E5%8F%B2/" },
      { label: "中華基督教會望覺堂賢貞幼稚園：官方網站", scope: "校訓、最新招生公告及 2023/24 不插電編程比賽名次公告。", url: "https://mkcjk.ccc.edu.hk/" },
    ],
    detailSections: [
      { title: "辦學沿革與活動機會", featured: true, note: "活動獎項按校方所列賽事年度理解，不能視為全體學生的學習成效。", details: [
        { label: "校舍位於重建後的教會大樓", value: "校方歷史記載幼稚園於 1968 年開辦，曾因大樓重建停辦，並於 2002 年在原址重新註冊。這段沿革有助區分現行學校與過往辦學歷史；登記校址對部分課室有使用時段限制，參觀時宜確認幼兒實際活動空間。", sourceUrl: "https://mkcjk.ccc.edu.hk/%E5%AD%B8%E6%A0%A1%E6%AD%B7%E5%8F%B2/" },
        { label: "校方曾公布不插電編程比賽獎項", value: "學校首頁列出 2023/24 學年參加協和小學不插電編程挑戰賽並獲獎的公告。這只能證明有參賽和獲獎紀錄，不能代表所有班級都有同等訓練或每名幼兒的成果；家長可詢問活動如何納入日常課程。", period: "校方公告：2023/24", sourceUrl: "https://mkcjk.ccc.edu.hk/" },
        { label: "招生與班級資料需看當屆公告", value: "網站目前列有 2026/27 及 2027/28 入學申請資訊，但名額、面見安排和班制均會按年度變動。若你有意申請，先核對目標入學年度頁面，再確認校址課室安排、授課時段和所需文件。", sourceUrl: "https://mkcjk.ccc.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "kowloon-city-baptist-church-ka-fuk-kindergarten-516627",
    name: "九龍城浸信會嘉福幼稚園",
    nameEn: "KOWLOON CITY BAPTIST CHURCH KA FUK KINDERGARTEN",
    district: "北區",
    address: "新界粉嶺嘉盛苑嘉耀閣地下",
    schoolNumber: "516627",
    registryKey: "kindergarten/516627",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班、低班及高班；上午、下午及全日安排按當屆班制",
    website: "https://www.kafukkg.com/",
    dataYear: "教育局概覽：2026/27；校方課程資料查閱於 2026-10",
    sourceNote: "嘉福是位於粉嶺嘉盛苑的九龍城浸信會辦學幼稚園，校名中的「九龍城」不是校址分區。校方公布 Cambridge English、奧福音樂、閱讀計劃和 Wizefloor 等安排，但不代表每項活動每級有相同時間或每名孩子可達相同成果。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 516627、校址 0001 的班制、PN、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5166270001" },
      { label: "九龍城浸信會嘉福幼稚園：課程特色", scope: "校方兒童為本課程、自由遊戲、Cambridge English、奧福音樂、閱讀及持續觀察評估安排。", url: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      { label: "九龍城浸信會嘉福幼稚園：關於我們", scope: "辦學團體、宗教背景、校址、班級及校方使命。", url: "https://www.kafukkg.com/aboutus/" },
    ],
    detailSections: [
      { title: "遊戲、英語與音樂課程", featured: true, note: "以下是學校公布的課程安排；具體頻率和幼兒參與方式仍需向校方核實。", details: [
        { label: "自由遊戲與兒童主導探索", value: "校方把自主遊戲列為學習方式，讓孩子操作低結構物料並與同伴合作。這類安排對需要透過動手和互動學習的幼兒可能較合適；家長可觀察教師如何在自由探索和明確引導之間取得平衡。", sourceUrl: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
        { label: "Cambridge English、朗讀和奧福音樂均有明確項目", value: "嘉福列出 Cambridge English、分級朗讀計劃及奧福音樂教學，另有互動投影地板遊戲。家長若重視英語，宜問清楚各級每週課時、語言使用情境與師資配置；證書和設備不是語言能力的直接保證。", sourceUrl: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
        { label: "持續觀察及幼小銜接活動有家校配合", value: "校方說明以觀察和個人發展檔案記錄孩子在六大範疇的學習，也為高班安排小學參觀、模擬活動和家長講座。這些是支援機會，不等於升小派位結果；可向校方了解回饋頻率和家長如何參與。", sourceUrl: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "christian-and-missionary-alliance-church-tai-wo-kindergarten-158577",
    name: "基督教宣道會太和幼稚園",
    nameEn: "CHRISTIAN & MISSIONARY ALLIANCE CHURCH TAI WO KINDERGARTEN",
    district: "大埔區",
    address: "新界大埔太和邨新和樓地下",
    schoolNumber: "158577",
    registryKey: "kindergarten/158577",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼稚園；班級與班制按當屆校方資料",
    website: "https://www.cmtwkg.edu.hk/",
    dataYear: "教育局概覽：2026/27；課程和創校資料查閱於 2026-10",
    sourceNote: "校方自述於 1989 年創校，並以主題、小組、遊戲、品德與英語活動組成課程。該校參與的 SCOLAR 英語計劃及其他專項項目須按適用年級和年度理解；網頁沒有提供語言課時比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 158577、校址 0001 的班制、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585770001" },
      { label: "基督教宣道會太和幼稚園：課程特色", scope: "主題與小組教學、遊戲、品德、情緒社交及英語課程的校方說明。", url: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      { label: "基督教宣道會太和幼稚園：學校簡介", scope: "辦學宗旨、1989 年創校背景、校方發展方向和地址。", url: "https://www.cmtwkg.edu.hk/" },
    ],
    detailSections: [
      { title: "遊戲探索、品格與語言", featured: true, note: "課程為校方自述；SCOLAR 計劃和課堂頻率應按目標年級向學校確認。", details: [
        { label: "主題課從實物和戶外觀察出發", value: "學校說明會以實物、主題活動、戶外觀察和參觀鼓勵幼兒主動參與；並以生活經驗設計六大範疇活動。家長可以問孩子是否有機會提出問題、自己操作材料，以及活動後如何整理和表達發現。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
        { label: "自由遊戲與 3Es 情緒社交安排", value: "校方列出 Playwork、自主遊戲，以及與教育局合作的 3Es 情緒社交計劃，重點為及早預防、識別和介入。家長若在意情緒支援，可了解如何觀察幼兒、何時聯絡家長及支援服務是否按個別需要安排。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
        { label: "英語活動和家校聯繫值得一併了解", value: "課程頁提及外籍英語教師的拼音、會話、歌曲與英文故事，並表示 K2、K3 曾參與 SCOLAR 學前英語計劃。由於公開資料沒有列逐級課時，若你把英語環境列為優先條件，應索取當屆周課表；家長觀課和家長日則可幫你理解實際回饋方式。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "ihm",
    name: "聖母無玷聖心幼稚園",
    nameEn: "IMMACULATE HEART OF MARY KINDERGARTEN",
    district: "沙田區",
    address: "新界沙田文禮路31-37號",
    schoolNumber: "151009",
    registryKey: "kindergarten/151009",
    schoolType: "幼稚園；班制及計劃身份按教育局 2026/27 概覽",
    gradeSpan: "幼兒班、低班及高班；半日制為主，詳情按當屆安排",
    website: "https://www.ihmk.edu.hk/",
    dataYear: "教育局概覽：2026/27；課程資料查閱於 2026-10",
    sourceNote: "校方公布活動教學、蒙特梭利教具、K3 專題研習及普通話和外籍英語教師等安排；沒有列明各語言的實際分鐘數。本頁不把校方的課程目標當作成效，也不以教師配置推算師生比例。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 151009、校址 0001 的班制、PN、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1510090001" },
      { label: "聖母無玷聖心幼稚園：課程及教學法", scope: "主題活動、蒙特梭利教學、K3 專題研習、語言教師與學習評估的校方說明。", url: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
      { label: "聖母無玷聖心幼稚園：班級編制", scope: "校方列出的半日班、年級與當屆班級安排入口。", url: "https://www.ihmk.edu.hk/tc/class-arrangement" },
    ],
    detailSections: [
      { title: "蒙特梭利、專題研習與兩文三語", featured: true, note: "語言課時及不同級別教學安排未在頁面完整量化，報名前應索取當屆時間表。", details: [
        { label: "活動教學結合蒙特梭利教具", value: "校方表示以生活主題配合遊戲、參觀和藝術活動，並運用蒙特梭利環境及教具，教師按觀察提供個別指導。這對需要按自身步調操作和探索的孩子可能有吸引力；參觀時可看教師如何示範、何時介入，以及孩子能否持續使用教具。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
        { label: "K3 專題研習安排孩子參與探索", value: "課程頁說明高班會透過討論、小組和實驗進行專題研習，並讓幼兒分享作品。這是具體的高班學習機會，但不能推定每個孩子承擔相同角色；家長可問主題如何選定、教師如何支援不善表達的孩子。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
        { label: "普通話與英語教師不等於語言沉浸比例", value: "校方指出 K1 至 K3 各級有普通話及外籍英語教師，也以故事、戲劇和角色扮演提供語言經驗。未公布課時比例前，不能由教師職稱推論主要教學語言；若你重視某一語言，應核對普通話、英語和粵語在日常照顧與主題課中的實際使用。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "chinese-christian-worker-s-fellowship-ltd-choi-po-kindergarten-157791",
    name: "神召會華人同工聯會彩蒲幼稚園",
    nameEn: "CHINESE CHRISTIAN WORKER'S FELLOWSHIP LTD. CHOI PO KINDERGARTEN",
    district: "北區",
    address: "新界上水彩蒲苑停車場大廈地下",
    schoolNumber: "157791",
    registryKey: "kindergarten/157791",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班、幼低班及幼高班；各級班制按當屆安排",
    website: "https://choipokg.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程、校園及計劃資料查閱於 2026-10",
    sourceNote: "彩蒲公布兒童為本、遊戲、實作探索及持續觀察記錄；校方亦列出校巴覆蓋北區和部分深圳區域。校巴路線、協作計劃及服務安排均可能變動，須向校方確認住址覆蓋、目標年級和當年度名額。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號 157791、校址 0001 的班制、語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1577910001" },
      { label: "神召會華人同工聯會彩蒲幼稚園：課程資料", scope: "兒童為本、遊戲策略、親身經驗、持續觀察評估、班制及校車範圍的校方資料。", url: "https://choipokg.edu.hk/en/curriculum/" },
      { label: "神召會華人同工聯會彩蒲幼稚園：學校設施", scope: "註冊課室數目及校方列出的室內活動空間。", url: "https://choipokg.edu.hk/about/about-facilities/" },
      { label: "神召會華人同工聯會彩蒲幼稚園：學校首頁", scope: "辦學使命、近期招生公告及活動資訊。", url: "https://choipokg.edu.hk/" },
    ],
    detailSections: [
      { title: "遊戲探索、校園空間與交通", featured: true, note: "課程和設施為校方資料；校巴路線及協作計劃須以入學年度最新公告核對。", details: [
        { label: "遊戲、親身經驗和小組活動是主要方法", value: "校方表示按兒童為本和遊戲策略設計課程，讓幼兒透過小組活動、線上學習、親身經驗和探索建構知識；低班和高班亦有特定英語協作項目。家長可詢問低齡班與高班的活動如何遞進，以及英語項目目前適用年級。", sourceUrl: "https://choipokg.edu.hk/en/curriculum/" },
        { label: "校方公布持續觀察和學習歷程記錄", value: "學校稱會持續觀察和記錄幼兒的學習表現，並供家長和教師參考。選校時可問何時向家長展示記錄、是否包含孩子自己的作品，以及如何據此調整下一步活動。", sourceUrl: "https://choipokg.edu.hk/en/curriculum/" },
        { label: "活動場地和校巴範圍要落到家庭日常", value: "設施頁列出大肌肉室、唱遊室、圖書室、探索區等場地；課程頁亦提到校巴網絡覆蓋北區及部分深圳區域。這些配置可能方便部分家庭，但不代表所有班別都有相同使用時間或路線適用；應核對實際接送點、費用及幼兒每日戶外活動安排。", sourceUrl: "https://choipokg.edu.hk/about/about-facilities/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "sham-shui-po-tak-shin-kindergarten-325830",
    name: "深水埗德善幼稚園",
    nameEn: "SHAM SHUI PO TAK SHIN KINDERGARTEN",
    district: "深水埗區",
    address: "九龍通州街200號一樓",
    schoolNumber: "325830",
    registryKey: "kindergarten/325830",
    schoolType: "幼稚園；類別及參加計劃情況以2026/27概覽為準",
    gradeSpan: "幼兒班至高班；上午、下午及全日安排按當屆概覽",
    website: "https://www.ssptakshin.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方活動及支援公告查閱於 2026-10",
    sourceNote: "教育局位置資料與2026/27幼稚園概覽確認學校編號、校址和班制。校方曾公布課室外體驗活動及支援服務；體驗活動公告日期為2024年，應視為曾公布的做法，不推作每級每年的固定安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號325830、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3258300001" },
      { label: "教育局《學校位置及資料》", scope: "學校編號、註冊校址、分區、電話和官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "深水埗德善幼稚園：官方網站及公告", scope: "校方聯絡資料、2024年課室外體驗式學習公告及2026年支援服務公告。", url: "https://www.ssptakshin.edu.hk/" },
    ],
    detailSections: [
      { title: "體驗活動與支援", featured: true, note: "校方首頁列出的體驗活動公告日期為2024年；具體支援服務及適用年級要向學校確認。", details: [
        { label: "校方曾安排課室外體驗學習", value: "學校於2024年公布課室外體驗式學習活動，顯示課程曾安排幼兒走出教室接觸實際環境。這是有日期的活動紀錄，不足以證明每年、每級都有固定次數；家長可詢問本學年活動如何配合主題，以及幼兒如何在活動後回顧和表達觀察。", period: "校方公告：2024-08", sourceUrl: "https://www.ssptakshin.edu.hk/index.php/section/page/3082" },
        { label: "2026年有支援服務公告", value: "校方於2026年4月發布支援服務資訊。家庭如關注言語、情緒或發展需要，可直接詢問服務內容、轉介方式、可支援的年級及等候安排；公告本身沒有說明每類服務的名額或個別兒童可獲服務時數。", period: "校方公告：2026-04", sourceUrl: "https://www.ssptakshin.edu.hk/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lok-sin-tong-man-ng-wing-yee-kindergarten-546038",
    name: "樂善堂文吳泳沂幼稚園",
    nameEn: "LOK SIN TONG MAN NG WING YEE KINDERGARTEN",
    district: "觀塘區",
    address: "九龍秀茂坪邨秀華樓地下",
    schoolNumber: "546038",
    registryKey: "kindergarten/546038",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://lstmnwy.loksintongkg.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程及校曆查閱於 2026-10",
    sourceNote: "校方目前公開每日英語活動、粵英雙語班、普通話接觸、探索學習、社區參觀、情智教育及奧福音樂。這些是校方列出的課程安排，沒有公開各語言課時比例；具體活動仍須按班別和年度核對。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號546038、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5460380001" },
      { label: "教育局《學校位置及資料》", scope: "學校編號、地址、分區及官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "樂善堂文吳泳沂幼稚園：課程簡介", scope: "創校年份、雙語班、每日英語活動、探索式學習、社區探索、Kimochis情智教育和奧福音樂。", url: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
      { label: "樂善堂文吳泳沂幼稚園：首頁", scope: "2026/27招生公告、校曆和現行校方聯絡資料。", url: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/home" },
    ],
    detailSections: [
      { title: "語言活動與探索課程", featured: true, note: "校方介紹課程方向，未公開各語言每日或每週課時比例。", details: [
        { label: "粵英雙語班每日安排英語活動", value: "校方稱設粵英雙語班，每天安排英語學習活動，並由英語教師帶領聽說活動。教育局概覽把粵語列為授課語言；家長若以英語沉浸為主要考量，應再索取目標班別時間表和英語活動時長。", sourceUrl: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
        { label: "觀察、操作、驗證和分享構成探索流程", value: "學校把探索式學習描述為觀察、探索、操弄、驗證和分享，亦列有社區參觀。這套流程讓家長可觀察孩子是否有機會自己嘗試和說明發現；網頁沒有提供各級活動頻率，參觀時可問K1至K3如何逐步增加自主程度。", sourceUrl: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
        { label: "情緒教育與音樂另有校本項目", value: "校方列出以Kimochis角色和故事認識情緒，並以奧福音樂活動接觸節奏和音樂概念。這些是課程項目，不代表臨床情緒支援或特定能力成效；有相關需要的家庭應確認教師如何回饋孩子的日常表現。", sourceUrl: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hong-kong-taoist-association-fung-ying-tung-sin-queen-s-hill-kindergarten-542326",
    name: "香港道教聯合會蓬瀛通善皇后山幼稚園",
    nameEn: "HONG KONG TAOIST ASSOCIATION FUNG YING TUNG SIN QUEEN'S HILL KINDERGARTEN",
    district: "北區",
    address: "新界粉嶺皇后山邨皇澄樓地下",
    schoolNumber: "542326",
    registryKey: "kindergarten/542326",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://fytsqhkg.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程資料查閱於 2026-10",
    sourceNote: "本校址的校方課程頁以兒童為本、遊戲、主題、方案及繪本教學為主，並列有英語及普通話教師、品格和體能活動。學校編號下的校址號為0002，課程資料按皇后山校址核對，不套用其他同辦學團體幼稚園的安排。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號542326、校址0002的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5423260002" },
      { label: "教育局《學校位置及資料》", scope: "校址、地區、學校編號和官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "蓬瀛通善皇后山幼稚園：課程規劃", scope: "兒童為本課程、主題／方案／繪本教學、語言教師、情緒社交、美藝及體能安排。", url: "https://fytsqhkg.edu.hk/en/curriculum-planning/" },
      { label: "蓬瀛通善皇后山幼稚園：聯絡資料", scope: "皇后山邨校址和校方電話、電郵。", url: "https://fytsqhkg.edu.hk/contact-us/" },
    ],
    detailSections: [
      { title: "遊戲、語言與身心發展", featured: true, note: "以下為校方課程自述；教師配置和活動項目不等於已知課時或每名幼兒的參與量。", details: [
        { label: "生活化主題配合遊戲、方案與繪本", value: "學校以兒童為本，透過主題、方案和繪本教學，讓幼兒運用感官探索和處理問題。家長可留意課堂是否容許孩子提出問題、反覆嘗試並表達想法；這比單看活動名稱更能判斷教學是否符合孩子的學習方式。", sourceUrl: "https://fytsqhkg.edu.hk/en/curriculum-planning/" },
        { label: "校方聘有英語和普通話教師", value: "課程頁稱聘請駐校英語及普通話教師，透過語境和遊戲接觸兩種語言。這不表示全日以英語或普通話授課；如語言比例影響家庭選擇，應詢問不同年級的課堂分工、每週時間及日常照顧用語。", sourceUrl: "https://fytsqhkg.edu.hk/en/curriculum-planning/" },
        { label: "情緒社交、藝術及體能亦列入課程", value: "校方提到社區參觀、小組合作、音樂美藝活動及幼兒體能計劃。這些安排可作為參觀時的觀察清單：孩子每天有多少自由活動、如何練習自理和合作、家長會收到甚麼進展回饋。參與計劃不代表每名學生都獲相同活動時數。", sourceUrl: "https://fytsqhkg.edu.hk/en/curriculum-planning/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "buddhist-cheung-mui-kwai-kindergarten-517518",
    name: "佛教張梅桂幼稚園",
    nameEn: "BUDDHIST CHEUNG MUI KWAI KINDERGARTEN",
    district: "離島區",
    address: "新界大嶼山大澳龍田邨第二期幼稚園座KG01室",
    schoolNumber: "517518",
    registryKey: "kindergarten/517518",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；半日及全日班按當屆安排",
    website: "https://www.bcmk.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程理念引用2025/26入學資料",
    sourceNote: "寶蓮禪寺主辦的佛教幼稚園。校方2025/26入學資料以學生為本和全人發展為辦學方向，列出半日及全日班；該文件的收生日期、名額和費用已過適用年度，不在此作現行招生資訊。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號517518、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5175180001" },
      { label: "教育局《學校位置及資料》", scope: "學校註冊地址、地區、校種及網站。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "佛教張梅桂幼稚園：2025/26入學資料", scope: "寶蓮禪寺主辦、校方的佛教辦學理念、全人發展方向及半日／全日學制。", url: "https://www.bcmk.edu.hk/upload/images/1722831398818.pdf" },
      { label: "佛教張梅桂幼稚園：官方網站", scope: "學校聯絡方式、辦學團體及校方課程特色入口。", url: "https://www.bcmk.edu.hk/" },
    ],
    detailSections: [
      { title: "佛教理念與全人課程", featured: true, note: "辦學理念按校方2025/26文件標示；招生、班額與費用須查閱最新年度資料。", details: [
        { label: "以佛教慈悲精神和全人發展為辦學方向", value: "校方在2025/26入學資料中表示，以佛教慈悲精神辦學，重視德、智、體、群、美的均衡發展和獨立思考。家長可在參觀時了解價值教育如何落到日常生活，而不只在節日或宗教活動出現；這是校方目標，不是對學生結果的獨立評估。", period: "校方文件：2025/26學年", sourceUrl: "https://www.bcmk.edu.hk/upload/images/1722831398818.pdf" },
        { label: "半日及全日班均曾在校方資料列明", value: "校方文件列有K1至K3半日及全日班。不同家庭可據照顧時段比較，但當年度班別、服務時間和全日班收生優先條件會變；2025/26文件中的日期和收費不可直接當作現行條件。", period: "校方文件：2025/26學年", sourceUrl: "https://www.bcmk.edu.hk/upload/images/1722831398818.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "the-hong-kong-chinese-church-of-christ-the-light-kindergarten-519634",
    name: "香港華人基督會煜明幼稚園",
    nameEn: "THE HONG KONG CHINESE CHURCH OF CHRIST THE LIGHT KINDERGARTEN",
    district: "西貢區",
    address: "新界將軍澳煜明苑熹明閣地下",
    schoolNumber: "519634",
    registryKey: "kindergarten/519634",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午及全日班按當屆安排",
    website: "https://www.hkccclk.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方課程及收生資料查閱於 2026-10",
    sourceNote: "校方以兒童為本和繪本課程作特色，另設雙語班、專科普通話、體適能和音樂活動。2026/27招生頁列出上午及全日班；語言活動的具體時長需按班級時間表確認。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號519634、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5196340001" },
      { label: "教育局《學校位置及資料》", scope: "學校名稱、校址、分區、校種及官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "香港華人基督會煜明幼稚園：課程設計", scope: "雙語班、繪本課程、校外體驗、普通話、體適能和音樂安排。", url: "https://www.hkccclk.edu.hk/課程設計/" },
      { label: "香港華人基督會煜明幼稚園：2026/27入學申請", scope: "校方列出的年度班制、收生程序和全日班費用。", url: "https://www.hkccclk.edu.hk/admission/" },
    ],
    detailSections: [
      { title: "繪本、語言與專科活動", featured: true, note: "校方課程介紹沒有列出語言教學時數；收生與費用須按入學年度更新。", details: [
        { label: "繪本是品格和主題學習的入口", value: "校方表示以繪本故事連接生活化學習內容，並用故事情境呈現品格教育；亦安排校外參觀擴展生活經驗。家長可詢問孩子會否有機會重述、提問和延伸創作，了解繪本是主動探究媒介還是主要由教師講述。", sourceUrl: "https://www.hkccclk.edu.hk/課程設計/" },
        { label: "雙語班與普通話專科課各有安排", value: "學校稱雙語班由專業教師和外籍教師協作，並為K1開始加入拼音課程；普通話由專科教師以對話、朗讀、唱誦和遊戲進行。這些資料說明學校提供哪些課程，不足以判斷粵語、英語或普通話在全日生活中的比例。", sourceUrl: "https://www.hkccclk.edu.hk/課程設計/" },
        { label: "全日班下午另有藝術活動", value: "校方列出全日班下午的兒童舞蹈、樂器、繪本視藝和English Fun Time等活動。對需要較長照顧時段的家庭，應同時核對當屆全日班學費、膳食費、活動安排及接送時間；活動項目不代表每名兒童的學習成果。", sourceUrl: "https://www.hkccclk.edu.hk/admission/" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "lok-sin-tong-cheung-yip-mou-ching-kindergarten-158836",
    name: "樂善堂張葉茂清幼稚園",
    nameEn: "LOK SIN TONG CHEUNG YIP MOU CHING KINDERGARTEN",
    district: "屯門區",
    address: "新界屯門兆畦苑兆強閣地下1－5室及11－15室（A及B翼）",
    schoolNumber: "158836",
    registryKey: "kindergarten/158836",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://www.lstcymck.edu.hk/",
    dataYear: "教育局概覽：2026/27；校方資料及2025年媒體專訪查閱於 2026-10",
    sourceNote: "校方網站列出安全、健康、互動的學習環境；校方轉載的2025年香港01專訪具體介紹雙語語境、戲劇、美藝及Kimochis情智學習。專訪內容按當時安排理解，不能當作每個年級現行課時或成效保證。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號158836、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1588360001" },
      { label: "教育局《學校位置及資料》", scope: "校址、學校編號、地區及網站。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "樂善堂張葉茂清幼稚園：校方介紹", scope: "辦學理念、校訓及目前網站列出的學校定位。", url: "https://www.lstcymck.edu.hk/zh-hant/" },
      { label: "樂善堂張葉茂清幼稚園：香港01專訪（校方轉載）", scope: "2025年報道中的雙語班、英語活動、戲劇教學及情智教育安排。", url: "https://www.lstcymck.edu.hk/zh-hant/school_info/articles/article/10" },
    ],
    detailSections: [
      { title: "雙語、戲劇與情緒教育", featured: true, note: "特色內容源自校方轉載的2025年專訪；具體班別和本學年安排應再向學校確認。", details: [
        { label: "雙語班以生活情境增加英語接觸", value: "校方轉載的2025年專訪稱，當時幼兒班推行雙語班，由本地班主任和外籍英語教師共同陪伴幼兒學習和日常互動。這種描述比單列英語課更重視生活語境；家長仍需確認2026/27各級是否沿用，以及粵語、英語和普通話的實際分工。", period: "香港01專訪：2025-04", sourceUrl: "https://www.lstcymck.edu.hk/zh-hant/school_info/articles/article/10" },
        { label: "戲劇和美藝活動著重表達與創作", value: "專訪介紹繪本延伸戲劇和美藝活動，讓幼兒代入角色、觀察作品並創作。若孩子需要更多表達機會，參觀時可看教師是否容許不同答案和孩子主導的演繹；報道呈現課程設計，並非獨立評估結果。", period: "香港01專訪：2025-04", sourceUrl: "https://www.lstcymck.edu.hk/zh-hant/school_info/articles/article/10" },
        { label: "Kimochis用角色和情境談情緒", value: "校方介紹以不同情緒角色和情境協助幼兒辨認、表達感受。這是校本情智教育項目，不等於治療服務；如家庭有個別支援需要，應直接查詢教師跟進、家校回饋和轉介安排。", period: "香港01專訪：2025-04", sourceUrl: "https://www.lstcymck.edu.hk/zh-hant/school_info/articles/article/10" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "yuen-long-merchants-association-kindergarten-159018",
    name: "元朗商會幼稚園",
    nameEn: "YUEN LONG MERCHANTS ASSOCIATION KINDERGARTEN",
    district: "元朗區",
    address: "新界天水圍天耀邨耀興樓地下A及B翼",
    schoolNumber: "159018",
    registryKey: "kindergarten/159018",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://www.ylmakg.info/",
    dataYear: "教育局概覽：2026/27；校方課程與活動資料查閱於 2026-10",
    sourceNote: "學校目前網站以兒童為本，列出主題探索、遊戲學習、生活體驗和腦科學及思維教學。腦科學教學頁稱相關做法自2015年引入，並列示2023年學院認證；這些是校方描述和認證紀錄，不應直接推成學習成效。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號159018、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1590180001" },
      { label: "教育局《學校位置及資料》", scope: "校址、分區、校種及聯絡資料。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "元朗商會幼稚園：以腦科學及思維為本的教學", scope: "校方所述合作學習、小組討論、開放式提問和思維策略；頁面記載2023年認證。", url: "https://www.ylmakg.info/brainbased" },
      { label: "元朗商會幼稚園：學校首頁", scope: "校方現行校址、聯絡方式、2027/28招生入口及學校自述的教育理念。", url: "https://www.ylmakg.info/" },
    ],
    detailSections: [
      { title: "思維教學與孩子參與", featured: true, note: "腦科學和思維教學為校方採用的課程框架；效益未作獨立成效驗證。", details: [
        { label: "小組合作和肢體回應提高課堂參與", value: "校方稱自2015年引入以腦科學為本的教學策略，課堂包括合作學習、小組討論、肢體回應和分享。對喜歡討論和動手的幼兒，家長可觀察不同性格的孩子是否都能參與，而不是只由較主動的孩子回答。", sourceUrl: "https://www.ylmakg.info/brainbased" },
        { label: "開放式提問要求孩子說出想法", value: "學校介紹教師以開放式問題引導孩子表達、分析和整理已有知識，並列舉小組討論和實作活動。參觀時可看教師是否給孩子足夠思考時間、如何接住不同答案，以及活動後怎樣記錄學習；這是校方教學目標，不是外部測量的成效。", sourceUrl: "https://www.ylmakg.info/brainbased" },
        { label: "校方列有2023年認證紀錄", value: "網站記載學校於2023年獲腦科學與思維教育學院認證為「腦友善學校」銀獎。這屬校方公布的認證紀錄，不能代替家長觀察日常教學，也不等同教育局質素評級。", period: "校方記載：2023-12", sourceUrl: "https://www.ylmakg.info/brainbased" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "hhckla-buddhist-lam-wong-ming-wai-kindergarten-524204",
    name: "香海正覺蓮社佛教林黃明慧幼稚園",
    nameEn: "HHCKLA BUDDHIST LAM WONG MING WAI KINDERGARTEN",
    district: "元朗區",
    address: "新界天水圍天慈邨慈心樓B及C翼地下",
    schoolNumber: "524204",
    registryKey: "kindergarten/524204",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午及全日班按當屆資料",
    website: "http://www.blwmwk.edu.hk",
    dataYear: "教育局概覽：2026/27；校方課程自述資料為2023/24；社工服務名單截至2026-05",
    sourceNote: "教育局資料確認天慈邨校址。校方在2023/24概覽自述兒童為本、主題及專題研習、觀察評估和不操練書寫；社署2026年學前單位名單亦列有該校。校方網站目前未能取得可核對的更新課程頁，故舊課程內容明確標為歷史資料。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號524204、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5242040001" },
      { label: "教育局《學校位置及資料》", scope: "學校編號、登記地址、分區、校種及官方網站。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "教育局《幼稚園概覽》校方課程資料：2023/24", scope: "校方當時公布的兒童為本理念、主題與專題研習、評估方式及學生支援服務。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/524204c-0001.pdf" },
      { label: "社會福利署：學前單位社工服務參與名單", scope: "截至2026-05-12列出的學前單位社工服務參與機構及該校校址。", url: "https://www.swd.gov.hk/storage/asset/section/270/tc/List%20of%20Participating%20Pre-primary%20Institutions_TC_as%20at%2012_5_2026.pdf" },
    ],
    detailSections: [
      { title: "課程方向與家庭支援", featured: true, note: "課程敘述來自2023/24校方概覽，屬有年份的舊資料；應向校方確認目前是否沿用。", details: [
        { label: "舊版校方資料強調兒童為本和專題研習", value: "校方在2023/24概覽中稱，課程會參考幼兒能力、需要、經驗和興趣，以主題教學及專題研習組織活動，並透過觀察記錄學習。由於目前未能取得更新課程頁，家長應把這些視為有年份的校方自述，並在參觀時確認現行做法。", period: "校方概覽資料：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/524204c-0001.pdf" },
        { label: "社署2026年名單列有學前單位社工服務", value: "社署截至2026年5月的參與名單收錄該校，表示學校列入學前單位社工服務網絡。名單不能說明個別家庭可獲服務的形式、頻率或等候時間；如需要支援，應向學校了解申請及轉介方式。", period: "社署名單截至：2026-05-12", sourceUrl: "https://www.swd.gov.hk/storage/asset/section/270/tc/List%20of%20Participating%20Pre-primary%20Institutions_TC_as%20at%2012_5_2026.pdf" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "guideposts-kindergarten-3rd-branch-tin-shui-estate-159190",
    name: "佳寶幼稚園第三分校（天瑞邨）",
    nameEn: "GUIDEPOSTS KINDERGARTEN 3RD BRANCH (TIN SHUI ESTATE)",
    district: "元朗區",
    address: "新界元朗天水圍天瑞邨第4期瑞林樓第十一座地下",
    schoolNumber: "159190",
    registryKey: "kindergarten/159190",
    schoolType: "非牟利幼稚園；參加幼稚園教育計劃",
    gradeSpan: "幼兒班至高班；上午、下午及全日班按當屆安排",
    website: "https://www.guideposts.edu.hk/TinShuiSchool/index.php",
    dataYear: "教育局概覽：2026/27；分校收生及活動資料查閱於 2026-10",
    sourceNote: "這筆資料限定佳寶天瑞分校，不代表佳寶其他校址。校方網站公布2026/27分校入學文件、適應日及生命教育項目；不同分校的課程活動、收生與服務不應互相套用。",
    appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號159190、校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1591900001" },
      { label: "教育局《學校位置及資料》", scope: "學校及天瑞校址的登記身份、地址和官方網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "佳寶幼稚園天瑞分校：分校專頁", scope: "該分校的2026/27新生適應、2027/28收生入口、分校活動及家長資訊。", url: "https://www.guideposts.edu.hk/TinShuiSchool/index.php" },
      { label: "佳寶幼稚園：天瑞分校地址", scope: "天瑞分校地址、電話和電郵；不混用其他分校地址。", url: "https://guideposts.edu.hk/Map/index.html" },
      { label: "佳寶幼稚園：天瑞分校生命教育計劃", scope: "天瑞分校的生活化主題及生命教育校本項目；文件為2016年計劃資料。", url: "https://guideposts.edu.hk/en/QEF/TinShuiQEF2016.pdf" },
    ],
    detailSections: [
      { title: "天瑞分校的活動與支援", featured: true, note: "課程項目限於天瑞分校；2016年生命教育文件只說明當時計劃內容。", details: [
        { label: "校方把新生適應活動列入2026/27校園資訊", value: "天瑞分校專頁目前列有2026/27幼兒班適應日片段，以及2027/28招生入口。新生家庭可藉此了解開學前如何熟悉校園；片段不能代替個別兒童的適應支援安排，家長宜詢問哭鬧、午睡和分離焦慮時的溝通方式。", period: "校方網站查閱：2026-10", sourceUrl: "https://www.guideposts.edu.hk/TinShuiSchool/index.php" },
        { label: "分校曾有生命教育校本計劃", value: "校方公開的優質教育基金文件介紹天瑞分校生命教育，以生活化、多元和趣味主題組織學習。文件屬2016年計劃，不能直接證明目前仍以相同形式推行；如重視情緒和品格教育，應查問現行課程內容及家長參與方式。", period: "校方計劃文件：2016", sourceUrl: "https://guideposts.edu.hk/en/QEF/TinShuiQEF2016.pdf" },
        { label: "分校校址和交通須按天瑞校舍核對", value: "佳寶官方地址頁和分校專頁分別列出天瑞校址及聯絡方式。佳寶有多個校址，家長應確認申請、校車和課程資訊均指向天瑞分校，避免把其他分校的班制或活動當成該校安排。", sourceUrl: "https://guideposts.edu.hk/Map/index.html" },
      ] },
    ],
  },
  {
    stage: "kindergarten",
    slug: "skh",
    name: "聖公會幼稚園",
    nameEn: "SHENG KUNG HUI KINDERGARTEN",
    district: "灣仔區",
    address: "多個登記校址；校址編號0002及0003",
    schoolNumber: "131636",
    registryKey: "kindergarten/131636",
    schoolType: "私立幼稚園；不參加幼稚園教育計劃",
    gradeSpan: "K1至K3；校址班制分別按教育局概覽列示",
    website: "https://www.skhkg.edu.hk/",
    dataYear: "教育局位置資料：截至2026-09-30；校方課程資料：2025/26；校方首頁查閱於2026-10",
    sourceNote: "聖公會幼稚園有兩個教育局登記校址，課程內容在此按校方層面資料介紹，不將某一校址的班制、語言或收費套用到另一校址。校方已公告遷往畢拉山新校舍；實際遷校日期及新址使用安排應以最新校方和教育局資料核對。",
    appendDirectoryDetails: true,
    directoryDetailScope: "school",
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "該校址的班制、語言、師生比例及費用；不代表同校址0003。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1316360002" },
      { label: "教育局《學校位置及資料》", scope: "學校編號131636、校址0002及0003的登記校址和校址基本資料。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
      { label: "聖公會幼稚園：教育局《幼稚園概覽 2025/26》校方課程資料", scope: "校方當時提供的全語文、英語及普通話課程、螺旋式課程、小組及專題研習、持續觀察評估。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6672" },
      { label: "聖公會幼稚園：官方首頁", scope: "校方使命、近期公告及畢拉山新校舍遷址提示。", url: "https://www.skhkg.edu.hk/" },
    ],
    detailSections: [
      { title: "全語文與主題探索", featured: true, note: "課程內容為校方層面資料；班制、學費和具體教學安排須逐一按校址及入學年度查核。", details: [
        { label: "全語文、英語與普通話均列入課程", value: "校方在2025/26幼稚園概覽中表示，設全語文、英語及普通話課程，目標是建立兩文三語基礎。這說明學校提供的語言課程種類，但沒有在該資料中列出每日課時或各校址的分配；家庭若重視某一語言，應索取目標校址的時間表。", period: "校方概覽：2025/26學年", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6672" },
        { label: "螺旋式課程配合小組與專題研習", value: "學校稱課程由淺入深，按兒童認知發展編排，並採用小組學習、專題研習和親身經歷活動。家長可觀察孩子是否有機會反覆運用概念、提出問題及分享發現；校方資料沒有比較兩個校址的課堂執行差異。", period: "校方概覽：2025/26學年", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6672" },
        { label: "持續觀察用於了解孩子進展", value: "校方表示會透過持續觀察了解兒童強弱項，並讓教師和家長掌握學習情況。家長可以詢問回饋頻率、評估範例和跟進方式；這是校方所述評估安排，不能據此推斷每名孩子獲得相同程度的個別支援。", period: "校方概覽：2025/26學年", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6672" },
      ] },
    ],
  },
  ...KINDERGARTEN_BATCH_33,
  ...KINDERGARTEN_BATCH_34,
  ...KINDERGARTEN_BATCH_35,
  ...KINDERGARTEN_BATCH_36,
  ...KINDERGARTEN_BATCH_37,
  ...KINDERGARTEN_BATCH_38,
  ...KINDERGARTEN_BATCH_39,
  ...KINDERGARTEN_BATCH_40,
  ...KINDERGARTEN_BATCH_41,
  ...KINDERGARTEN_BATCH_42,
  ...KINDERGARTEN_BATCH_43,
  ...KINDERGARTEN_BATCH_44,
  ...KINDERGARTEN_BATCH_45,
  ...KINDERGARTEN_BATCH_46,
  ...KINDERGARTEN_BATCH_47,
  ...KINDERGARTEN_BATCH_48,
  ...KINDERGARTEN_BATCH_49,
  ...KINDERGARTEN_BATCH_50,
  ...KINDERGARTEN_BATCH_51,
  ...KINDERGARTEN_BATCH_52,
  ...KINDERGARTEN_BATCH_53,
  ...KINDERGARTEN_BATCH_54,
  ...KINDERGARTEN_BATCH_55,
  ...KINDERGARTEN_BATCH_56,
  ...KINDERGARTEN_BATCH_57,
  ...KINDERGARTEN_BATCH_58,
  ...KINDERGARTEN_BATCH_59,
  ...KINDERGARTEN_BATCH_60,
  ...KINDERGARTEN_BATCH_61,
  ...KINDERGARTEN_BATCH_62,
  ...KINDERGARTEN_BATCH_63,
  ...KINDERGARTEN_BATCH_64,
  ...KINDERGARTEN_BATCH_65,
  ...KINDERGARTEN_BATCH_66,
  ...KINDERGARTEN_BATCH_67,
  ...KINDERGARTEN_BATCH_68,
  ...KINDERGARTEN_BATCH_69,
  ...KINDERGARTEN_BATCH_70,
  ...KINDERGARTEN_BATCH_71,
  ...KINDERGARTEN_BATCH_72,
  ...KINDERGARTEN_BATCH_73,
  ...KINDERGARTEN_BATCH_74,
  ...KINDERGARTEN_BATCH_75,
  ...KINDERGARTEN_BATCH_76,
  ...KINDERGARTEN_BATCH_77,
  ...KINDERGARTEN_BATCH_78,
  ...KINDERGARTEN_BATCH_79,
  ...KINDERGARTEN_BATCH_80,
  ...KINDERGARTEN_BATCH_81,
  ...KINDERGARTEN_BATCH_82,
  ...KINDERGARTEN_BATCH_83,
  ...KINDERGARTEN_BATCH_84,
  ...KINDERGARTEN_BATCH_85,
  ...KINDERGARTEN_BATCH_86,
  ...KINDERGARTEN_BATCH_87,
  ...KINDERGARTEN_BATCH_88,
  ...KINDERGARTEN_BATCH_89,
  ...KINDERGARTEN_BATCH_90,
  ...KINDERGARTEN_BATCH_91,
  ...KINDERGARTEN_BATCH_92,
  ...KINDERGARTEN_BATCH_93,
  ...KINDERGARTEN_BATCH_94,
  ...KINDERGARTEN_BATCH_95,
  ...KINDERGARTEN_BATCH_96,
  ...KINDERGARTEN_BATCH_97,
  ...KINDERGARTEN_BATCH_98,
  ...KINDERGARTEN_BATCH_99,
  ...KINDERGARTEN_BATCH_100,
  ...KINDERGARTEN_BATCH_101,
  ...KINDERGARTEN_BATCH_102,
  ...KINDERGARTEN_BATCH_103,
  ...KINDERGARTEN_BATCH_104,
  ...KINDERGARTEN_BATCH_105,
  ...KINDERGARTEN_BATCH_106,
  ...KINDERGARTEN_BATCH_107,
  ...KINDERGARTEN_BATCH_108,
  ...KINDERGARTEN_BATCH_109,
  ...KINDERGARTEN_BATCH_110,
  ...KINDERGARTEN_BATCH_111,
  ...KINDERGARTEN_BATCH_112,
];

const REGISTERED_SCHOOL_RECORDS = allRegisteredSchoolDirectory as PilotSchool[];
const directoryRecords = [...REGISTERED_SCHOOL_RECORDS];
const registrationCode = (value?: string) => String(value || "").replace(/\D/g, "").slice(0, 6);
const normalizeSchoolName = (value?: string) => String(value || "").normalize("NFKC").toLowerCase().replace(/[\s（）()·,，.．'’：:、]/g, "");

// Keep the hand-checked pages as the preferred version when they refer to a registered school.
for (const sample of PILOT_SCHOOLS) {
  let index = sample.reportSlug
    ? directoryRecords.findIndex((school) => school.stage === sample.stage && school.slug === sample.reportSlug)
    : -1;
  if (index < 0 && sample.schoolNumber) {
    const sampleCode = registrationCode(sample.schoolNumber);
    if (sampleCode) index = directoryRecords.findIndex((school) => school.stage === sample.stage && school.registryKey === `${sample.stage}/${sampleCode}`);
  }
  if (index < 0) {
    const sampleName = normalizeSchoolName(sample.name);
    index = directoryRecords.findIndex((school) => school.stage === sample.stage && normalizeSchoolName(school.name) === sampleName && (!sample.district || school.district === sample.district));
  }
  if (index < 0) directoryRecords.push(sample);
  else {
    const registered = directoryRecords[index];
    const multiLocation = (registered.registryLocations || 0) > 1;
    const sampleSections = sample.detailSections || [];
    const { appendDirectoryDetails, replaceDirectoryDetails, omitDirectoryDetailTitles, omitDirectorySourceUrls, replaceDirectorySources, clearDirectoryReports, directoryDetailScope, directoryNameOverride, ...sampleProfile } = sample;
    const omittedTitles = new Set(omitDirectoryDetailTitles || []);
    const omittedSourceUrls = new Set(omitDirectorySourceUrls || []);
    const registeredSources = (registered.sources || []).filter((source) => !omittedSourceUrls.has(source.url));
    const registeredSections = (registered.detailSections || []).filter((section) => !omittedTitles.has(section.title));
    directoryRecords[index] = {
      ...registered,
      ...sampleProfile,
      ...(appendDirectoryDetails || replaceDirectoryDetails ? {
        sources: replaceDirectorySources
          ? sample.sources || []
          : [...new Map([...registeredSources, ...(sample.sources || [])].map((source) => [source.url, source])).values()],
        detailSections: replaceDirectoryDetails && !multiLocation
          ? [...registeredSections.filter((section) => section.title === "聯絡與授課資料"), ...sampleSections]
          : [...registeredSections, ...sampleSections],
      } : {}),
      // The generated school-level identity and address list remain authoritative;
      // retain reviewed branch-specific prose as a clearly scoped section.
      ...(multiLocation ? {
        name: directoryNameOverride ? sample.name : registered.name,
        nameEn: registered.nameEn,
        district: registered.district,
        districts: registered.districts,
        address: registered.address,
        telephone: registered.telephone,
        schoolNumber: registered.schoolNumber,
        schoolType: registered.schoolType,
        gender: registered.gender,
        religion: registered.religion,
        website: registered.website,
        detailSections: [
          ...registeredSections,
          ...sampleSections.map((section) => directoryDetailScope === "school" ? ({
            ...section,
            note: ["以下是校方公布的學校層面課程資料；校舍間班制、收費及實際安排仍須分別核對。", section.note].filter(Boolean).join(" "),
          }) : ({
            ...section,
            title: `指定校址參考｜${section.title}`,
            note: ["以下內容來自人工核對的指定分校資料，不代表同一學校編號下的所有校址。", section.note].filter(Boolean).join(" "),
          })),
        ],
      } : {}),
      registryKey: registered.registryKey,
      registryLocations: registered.registryLocations,
      relatedReportSlugs: clearDirectoryReports ? [] : [...new Set([...(sample.relatedReportSlugs ?? registered.relatedReportSlugs ?? []), ...(sample.reportSlug ? [sample.reportSlug] : [])])],
    };
  }
}

// A profile can precede its deep report release; only link reports in the published catalogue.
const publishedReports = new Set([...reportMeta.PS_REPORTS, ...reportMeta.KG_REPORTS, ...reportMeta.SS_REPORTS].map((report) => report.c));
// Keep the same first match used by getPilotSchool, with one catalogue/sitemap entry per URL.
const uniqueDirectoryRecords = [...directoryRecords.reduce((records, school) => {
  const key = `${school.stage}/${school.slug}`;
  if (!records.has(key)) records.set(key, school);
  return records;
}, new Map<string, PilotSchool>()).values()];
function validProfileReport(school: PilotSchool, slug: string): boolean {
  // SPK (214612) and St Paul's Day Nursery (563188) are separate schools.
  // The SPK report's reviewed source note explicitly excludes the nursery.
  return publishedReports.has(slug) && !(school.stage === "kindergarten" && school.schoolNumber === "563188" && slug === "spk");
}

export const DIRECTORY_SCHOOLS: PilotSchool[] = uniqueDirectoryRecords.map(applyReviewedProfileFacts).map((school) => ({
  ...school,
  ...classifyKindergarten(school),
  ...classifyPrimary(school),
  ...prepareSecondaryProfile(school),
  reportSlug: school.reportSlug && validProfileReport(school, school.reportSlug) ? school.reportSlug : undefined,
  relatedReportSlugs: school.relatedReportSlugs?.filter((slug) => validProfileReport(school, slug)),
})).map(applyKindergartenReviewedFields);

export function getPilotSchool(stage: string, slug: string): PilotSchool | undefined {
  return DIRECTORY_SCHOOLS.find((school) => school.stage === stage && school.slug === slug);
}

export function schoolsForStage(stage: SchoolStage, locale: Locale = "tc"): PilotSchool[] {
  return DIRECTORY_SCHOOLS.filter((school) => school.stage === stage).map((school) => ({
    ...school,
    name: locale === "sc" ? school.name.replaceAll("（", "(").replaceAll("）", ")") : school.name,
    district: locale === "sc" ? school.district.replace("九龍", "九龙").replace("區", "区").replace("灣", "湾").replace("沙田", "沙田").replace("深水埗", "深水埗") : school.district,
    districts: school.districts?.map((district) => locale === "sc" ? district.replace("九龍", "九龙").replace("區", "区").replace("灣", "湾").replace("沙田", "沙田").replace("深水埗", "深水埗") : district),
  }));
}

export function stageLabel(stage: SchoolStage, locale: Locale = "tc"): string {
  const label = SCHOOL_STAGES[stage].label;
  if (locale === "tc") return label;
  return label.replace("幼稚園", "幼稚园").replace("小學", "小学").replace("中學", "中学");
}

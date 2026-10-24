import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const registered = registeredDirectory as PilotSchool[];
const DATASET = "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

function profile(
  schoolNumber: string,
  sourceNote: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
  overrides: Partial<PilotSchool> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const omittedSourceUrls = new Set(overrides.omitDirectorySourceUrls || []);
  const overviewSections = (school.detailSections || [])
    .filter((section) => section.title.includes("幼稚園概覽"))
    .map((section) => ({
      ...section,
      details: section.details.map((detail) => ({
        ...detail,
        period: detail.period && /^[\d,]+$/.test(detail.period) ? "教育局概覽：2026/27學年" : detail.period,
      })),
    }));
  return {
    ...school,
    website,
    ...overrides,
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    sources: [...new Map([
      ...school.sources.filter((source) => !omittedSourceUrls.has(source.url)),
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "資料集版本與教育局學校位置資料的更新資訊。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}及註冊校址識別；資料快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 60: source-linked facts scoped to each registered school/location. */
export const KINDERGARTEN_BATCH_60: PilotSchool[] = [
  profile("322822", "按教育局校號322822、校址編號0002及金巴倫道49號識別約克英文小學暨幼稚園（九龍塘）。教育局學校搜尋頁列上午授課，但2026/27幼稚園概覽列上午及下午班；兩者口徑不同，申請時應向校方確認所選級別和班別。本頁不沿用註冊資料XML中與校頁不一致的下午時段。", "https://www.york.edu.hk/", [
    { label: "教育局學校搜尋：約克英文小學暨幼稚園（九龍塘）", scope: "校號322822、校址編號0002、校址、授課時間、男女校及註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=322822000211" },
    { label: "約克英文小學暨幼稚園：2026/27費用及債券資料", scope: "該校址的當屆費用及課程安排；各級及班別收費不同，報名前按最新校方文件核對。", url: "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO_8-10.pdf" },
    { label: "約克：九龍塘校舍地址", scope: "區分金巴倫道校舍與約克集團其他校舍。", url: "https://york.edu.hk/zh/addresses.html" },
  ], [{ title: "校址辨識、班別與課程特色", featured: true, note: "教育局學校搜尋頁與《幼稚園概覽》對授課時段的列示不同；家長應按申請級別向校方確認，不以單一欄位推斷所有班別。課程特色為校方自述。", details: [
    { label: "教育局兩份資料對上課時段的列示不同", value: "教育局學校搜尋頁按校號322822、校址0002列上午授課；2026/27《幼稚園概覽》則列上午及下午班。金巴倫道49號地下及一樓是本頁對應校址，報名時需確認目標級別實際開辦時段，不能由校址或品牌自行推定。", period: "教育局學校搜尋；幼稚園概覽：2026/27", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=322822000211" },
    { label: "英語、粵語與普通話並行接觸", value: "校方介紹英語課程由英語母語教師帶領，並以小組活動、共讀和角色扮演支援讀寫；中文部分涵蓋粵語及普通話，透過遊戲、歌曲、故事和活動反覆練習。家長若在意粵普比例，應索取九龍塘校舍和所申請班級的時間表。", sourceUrl: "https://york.edu.hk/en/languages.html" },
    { label: "小提琴是校方介紹的音樂教學特色", value: "校方網站稱在學前課程中以小提琴教育作音樂教學方法之一。家長應確認此安排適用年級、上課頻率、是否包含在學費，以及樂器或額外活動費用。", sourceUrl: "https://york.edu.hk/mobile/" },
    { label: "費用要按該校址、年級和班別核對", value: "校方提供2026/27費用及債券文件；不同級別、課程和時段並非同一收費。家庭比較時應把學費、債券或其他一次性款項分開看，並確認文件所列項目是否適用於申請的這個校址。", period: "校方費用文件：2026/27", sourceUrl: "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO_8-10.pdf" },
  ] }], { schoolType: "私立幼稚園", language: "本地及非本地課程；語言安排按課程／班別核對", omitDirectoryDetailTitles: ["聯絡與授課資料"], omitDirectorySourceUrls: ["https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.json"] }),

  profile("609137", "按教育局校號609137及水泉澳邨修泉樓旁KG01校址識別基督教香港崇真會安頌幼稚園。教育局現行分區名錄列為非牟利；課程資料取自教育局概覽中的校方申報，並非獨立成效評估。", "https://web.ttmssd.org/services/child", [
    { label: "教育局沙田區學校名錄（2026-09-30）", scope: "校名、校號／校址編號、地址、授課時段、男女校及非牟利標記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-st.html" },
    { label: "教育局幼稚園概覽：安頌幼稚園（2025/26）", scope: "校方申報的生命教育課程、課程方向與家校協作；年度資料不等於當屆課表。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6979&schoolname=&schoolno=&voucher=" },
    { label: "教育局質素評核報告：安頌幼稚園", scope: "教育局視學報告；只支持報告所列評核範圍及當時觀察。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnChung.pdf" },
  ], [{ title: "生命教育與家校配合", featured: true, details: [
    { label: "生命教育是校方申報課程的主軸", value: "教育局2025/26概覽所載校方資料，稱課程以生命教育為軸心，配合幼兒體能、認知與語言、品德、情意與群性及美感發展。這讓家長可在參觀時追問主題如何落到日常活動和情緒教育；它是學校對課程的描述，不是學生發展結果的保證。", period: "教育局概覽：2025/26；現行基礎資料：2026/27", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6979&schoolname=&schoolno=&voucher=" },
    { label: "有到校學前支援服務資料，須按轉介及輪候規則申請", value: "社會福利署名單列出該校參與到校學前康復服務。這不表示所有學生均會自動獲得個別訓練；有需要的家庭應向校方查詢評估、轉介、輪候次序和可提供的支援時段。", sourceUrl: "https://www.swd.gov.hk/oprs/common_file/OPRS_KG_List_SC.pdf" },
  ] }], { schoolType: "非牟利幼稚園", website: "http://web.ttmssd.org/services/child", tuition: "半日班按2026/27概覽參加幼稚園教育計劃；全日班費用另核" }),

  profile("324736", "按教育局校號324736及校址編號0001識別德福幼稚園。教育局分區名錄標示NPM（非牟利辦學），學校搜尋頁的「資助種類」欄則列私立；兩欄屬不同分類，不應混作同一概念。", "https://www.telfordeducation.com/chinese", [
    { label: "教育局觀塘區學校名錄（2026-09-30）", scope: "德福幼稚園的NPM標記、校號324736、校址及班制。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kt.html" },
    { label: "教育局學校搜尋：德福幼稚園", scope: "校號324736、校址編號0001、授課時間、資助種類（私立）及註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=324736000113" },
    { label: "教育局收費證明書：德福幼稚園", scope: "2025-09-01生效的全日班學費及膳食費，僅適用於文件列出的幼兒班和高班。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/324736.pdf" },
    { label: "德福幼稚園：辦學理念與遊戲學習", scope: "校方自述的兒童為本、品德、遊戲、故事和感官探索課程方向。", url: "https://www.telfordeducation.com/chinese" },
  ], [{ title: "遊戲學習與全日班預算", featured: true, details: [
    { label: "辦學性質與資助分類要分開理解", value: "教育局2026年9月分區名錄以NPM標示非牟利辦學；學校搜尋頁的「資助種類」欄列為私立。前者描述辦學性質，後者是教育局資料欄位分類，並不互相抵銷。", period: "教育局名錄及學校搜尋：2026-09-30", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=324736000113" },
    { label: "校方以遊戲和生活經驗組織學習", value: "校方理念頁描述透過遊戲、故事、感官探索和真實情景引發學習，並重視品德、溝通和情緒表達。對孩子而言，這意味參觀時可觀察教師是否讓幼兒操作、選擇和表達；理念頁沒有提供各級每週課時。", sourceUrl: "https://www.telfordeducation.com/chinese" },
    { label: "全日班費用須把學費與膳食費分列", value: "教育局收費證明書列出2025年9月生效的全日幼兒班及高班每月學費2,364元，另列每月膳食費373元，均為12期；文件未以相同方式列出所有級別。這是該證明書列明的費率，申請2026/27或之後級別前應向校方確認最新收費。", period: "教育局收費證明書：2025-09-01生效", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/324736.pdf" },
  ] }], { schoolType: "非牟利幼稚園", religion: "基督教", tuition: "全日班按級別收費；2025年9月生效收費見下方，需核對新年度" }),

  profile("601985", "按教育局校號601985及德福花園平台三樓校址識別德福英文幼稚園；這是與校號324736德福幼稚園分開登記的校舍。校方資料涉及多個班別，語言和費用只按明確對應的英文課程文件引用。", "https://www.telfordeducation.com/", [
    { label: "教育局學校搜尋：德福英文幼稚園", scope: "校號601985、校址編號0001、平台三樓地址、授課時間與註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=601985000111" },
    { label: "德福教育：課程語言安排", scope: "校方對國際英文班及雙語班授課語言的說明；並非每個德福校號／班別通用。", url: "https://www.telfordeducation.com/curriculum" },
    { label: "教育局收費證明書：德福英文幼稚園", scope: "2023-09-01生效的歷史費用表；不得作現行學費。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/601985.pdf" },
    { label: "德福幼稚園及英文幼稚園：入學申請表", scope: "校方把本地班和國際英文班分開列示；用於提醒家庭核對校號與課程，不代表當屆學額。", url: "https://www.telfordeducation.com/wp-content/uploads/2025/12/%E5%BE%B7%E7%A6%8F%E5%B9%BC%E7%A8%9A%E5%9C%92%E4%B8%89%E6%A0%A1%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
  ], [{ title: "英文班別與校址辨識", featured: true, details: [
    { label: "平台三樓是獨立的英文幼稚園登記校址", value: "教育局將德福英文幼稚園列作校號601985，地址為德福花園平台三樓；德福幼稚園則是另一校號及另一註冊校址。若家庭在意課程媒介或接送點，報名表上的學校全名、校號與校址要一併核對。", period: "教育局名錄：2026-09-30", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=601985000111" },
    { label: "英文媒介和普通話安排只適用於指定課程", value: "德福教育的課程頁稱國際班以英語授課，雙語班使用英語和普通話；招生表把英文班別獨立列出。這些說明不能推作全校所有時段的語言比例。教育局可取得的英文幼稚園收費證明書生效於2023年，已屬歷史資料；現行收費和班別需向校方索取。", period: "語言安排：校方課程頁；收費證明書：2023-09-01生效", sourceUrl: "https://www.telfordeducation.com/curriculum" },
  ] }], { schoolType: "私立幼稚園", tuition: "2026/27現行學費需向校方確認", language: "校方列出英文班及雙語班；依實際班別核對" }),

  profile("563544", "按教育局校號563544及粉嶺祥華邨祥和樓地下校址識別東華三院洪王家琪幼兒園。這是幼稚園暨幼兒中心，並設PN幼兒班；全日班收費不可與半日幼稚園混為一談。", "https://www.twghhwkgkg.edu.hk/", [
    { label: "東華三院洪王家琪幼兒園：學校特色與課程", scope: "繪本統整、建構學習、自由遊戲、生活教育及語文活動的校方介紹。", url: "https://www.twghhwkgkg.edu.hk/?p=382" },
    { label: "教育局幼稚園概覽：洪王家琪幼兒園（2026/27）", scope: "校址級班制、PN、語言、師生比例與核准費用；不等同剩餘學額。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5635440001" },
    { label: "東華三院幼兒教育服務概覽", scope: "辦學團體及幼兒教育服務背景。", url: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
  ], [{ title: "繪本探究、自由遊戲與PN照顧", featured: true, details: [
    { label: "繪本和「做中學」是校方公開的課程特色", value: "校方介紹以繪本統整幼兒經驗，並以建構學習、發現式學習和自由遊戲設計探究情境；英語及普通話教師亦透過遊戲、兒歌和故事與幼兒互動。頁面沒有列出各級語言時數，不能因此判定英語或普通話是主要授課語言。", sourceUrl: "https://www.twghhwkgkg.edu.hk/?p=382" },
    { label: "PN服務與全日費用要按家庭照顧需要評估", value: "教育局2026/27概覽列有幼兒班（PN），並列全日班學費每年47,664元；全日服務適合需要較長照顧時段的家庭，但還需確認膳食、延長照顧、交通及實際可申請年齡。師生比例不是班級固定人數，也不能代表個別支援名額。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5635440001" },
  ] }], { schoolType: "非牟利幼稚園暨幼兒中心", tuition: "全日班 $47,664/年（2026/27概覽；其他費用另核）" }),

  profile("156019", "按教育局校號156019及沙田瀝源邨壽全樓地下校址識別慈光幼稚園；不與其他名稱近似的佛教幼稚園混同。教育局2026年分區名錄仍列出本校。園方網站目前無法讀取，故不引用未能核實的當屆招生或課程資訊。", "http://www.belight.edu.hk", [
    { label: "教育局沙田區學校名錄（2026-09-30）", scope: "校號156019、瀝源邨地址及非牟利辦學標記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-st.html" },
    { label: "教育局學校搜尋：慈光幼稚園", scope: "校號156019、校址編號、校址、授課時間及註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=156019000112" },
    { label: "教育局《幼稚園概覽》：慈光幼稚園（2022/23）", scope: "學校當年申報的課程、班制、師生比例與費用；不代表現行課程或收費。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/156019e-0001.pdf" },
    { label: "慈光幼稚園官方網站", scope: "教育局名錄所列官方網址；本次無法讀取，未用於支持課程或招生描述。", url: "http://www.belight.edu.hk" },
  ], [{ title: "生活經驗與多元活動", featured: true, details: [
    { label: "校方公開資料描述生活經驗與多元活動課程", value: "教育局2022/23《幼稚園概覽》收錄校方申報的全人基督教教育方向，並列出戶外參觀、啟發式學習、科學實驗、模擬遊戲、分組學習和音樂活動等例子。資料年份較早，適合作為了解過往課程取向的線索；現行課程內容和語言安排需直接向學校確認。", period: "教育局概覽：2022/23；現行校址名錄：2026-09-30", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/156019e-0001.pdf" },
    { label: "舊概覽有校址級別的師生比例與費用，不能當作現行數字", value: "2022/23概覽記錄上午班師生比例約1:8、下午班約1:9.3；同一份資料列有當年半日班及全日班費用。這些數字只反映該年度申報，不能用來判斷現時收費、班級人數或學額；教育局2026年名錄仍列出該校，但官方網站本次無法讀取。建議先致電學校核實現行營運、班制和收費。", period: "教育局概覽：2022/23；教育局名錄：2026-09-30", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/156019e-0001.pdf" },
  ] }], { schoolType: "非牟利幼稚園", tuition: "現行收費未核實；先向校方查詢" }),

  profile("543357", "按教育局校號543357及東區愛東邨愛旭樓地下校址識別筲箕灣循道衞理幼稚園。校方課程頁提供體驗式學習和生命教育資料，但頁面內容未標明現行學年，故不把細節寫成最新課表。", "https://www.skwmk.edu.hk/", [
    { label: "筲箕灣循道衞理幼稚園：課程編排", scope: "兒童為本、按年級漸進、親子閱讀與參觀活動的校方說明；網頁未標更新學年。", url: "https://www.skwmk.edu.hk/course.php?type=2" },
    { label: "筲箕灣循道衞理幼稚園：本園特色與支援", scope: "基督教品格教育、早苗計劃資格與轉介方式、駐校社工服務。", url: "https://www.skwmk.edu.hk/about.php?type=6" },
    { label: "教育局東區學校名錄（2026-09-30）", scope: "校名、註冊校址、授課時間和教育局登記資訊。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-e.html" },
  ], [{ title: "體驗式課程、生命教育與支援資格", featured: true, details: [
    { label: "課程按K1至K3逐步增加學習經驗", value: "校方課程頁把幼兒班、低班和高班分別描述為基礎、多元化及多向度學習，並列親子閱讀和校外參觀。這是校方課程框架，不是近期課表；家長可詢問不同年級的活動比例，以及慢熱幼兒在外出活動時如何獲支援。", sourceUrl: "https://www.skwmk.edu.hk/course.php?type=2" },
    { label: "早苗計劃須經評估及社署輪候編配", value: "校方列有早苗計劃到校學前康復服務和駐校社工。園方同時說明康復服務需先經評估，再透過社署中央轉介系統輪候；因此不能把校內設有服務理解為每位有需要兒童可即時獲得個別訓練。", sourceUrl: "https://www.skwmk.edu.hk/about.php?type=6" },
  ] }], { schoolType: "非牟利幼稚園", tuition: "參加幼稚園教育計劃；核對2026/27核准費用" }),

  profile("214612", "按教育局校號214612及禮頓道校址識別聖保祿幼稚園。校方說明幼稚園與聖保祿學校小學及中學部有聯繫，但行政獨立；不可把升讀其他學部理解為自動銜接或保證。", "https://www.spk.edu.hk/", [
    { label: "聖保祿幼稚園：學校資料與歷史", scope: "創校背景、與小學／中學部的關係、行政獨立性、班級與授課時間。", url: "https://www.spk.edu.hk/w2/public/schoolinfo.php?id=1" },
    { label: "聖保祿幼稚園：2027/28 K1入學申請", scope: "該屆申請日期、文件與程序；申請期已過，不用作下一屆日期。", url: "https://www.spk.edu.hk/w2/public/admission.php?id=8" },
    { label: "教育局學校搜尋：聖保祿幼稚園", scope: "校號214612、校址編號、註冊狀態、地址及授課時段。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=214612000112" },
  ], [{ title: "與小學及中學部的關係", featured: true, details: [
    { label: "有校史聯繫，但幼稚園行政獨立", value: "校方記載幼稚園部於1950年成立，現名「聖保祿幼稚園」，與小學及中學部有聯繫但行政獨立。這段關係可作校史背景，不能推作幼稚園學生可自動升讀同一辦學體系的其他學部；有銜接考量的家庭應直接問校方收生政策。", sourceUrl: "https://www.spk.edu.hk/w2/public/schoolinfo.php?id=1" },
    { label: "教育局登記時段與校方網站所列班制有差異", value: "教育局學校搜尋頁目前列下午授課；校方資料頁則列出上午及下午班級編制，但沒有標示資料年度。兩者口徑未能直接對上，不能僅憑舊網頁推定現時仍有上午班。報名前應向學校確認當屆開辦時段、每級班數和收生安排。", period: "教育局學校搜尋：現行頁面；校方資料頁：未標年份", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=214612000112" },
  ] }], { schoolType: "私立幼稚園", tuition: "約$34,000/年（教育局概覽2026/27；以最新收費表為準）" }),

  profile("159042", "按教育局校號159042及天水圍天耀邨耀昌樓地下A、B翼校址識別宣道會陳李詠貞紀念幼稚園。校方網站現正公布2027/28招生及雙語課程資料；課程語言按該頁列明的下午班適用範圍表述。", "https://caclwtmk.edu.hk/", [
    { label: "宣道會陳李詠貞紀念幼稚園：課程簡介", scope: "遊戲、專題研習、自由遊戲、STEM、繪本、生命教育及下午班雙語安排。", url: "https://caclwtmk.edu.hk/" },
    { label: "宣道會陳李詠貞紀念幼稚園：聯絡資料", scope: "天耀邨校址和聯絡方式。", url: "https://caclwtmk.edu.hk/?p=1662" },
    { label: "教育局元朗區學校名錄（2026-09-30）", scope: "校號159042、校址、授課時間及登記資料。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-yl.html" },
  ], [{ title: "遊戲探究與下午班雙語", featured: true, details: [
    { label: "主題研習、自由遊戲和創意STEM提供操作式學習", value: "校方課程介紹列出專題研習、自由遊戲、創意STEM、繪本和戶外觀察，並稱透過遊戲、探索和解難建構學習經驗。家庭參觀時可觀察教師如何引導孩子說出發現和回顧活動；課程目標不等於每名孩子會有相同學習成果。", sourceUrl: "https://caclwtmk.edu.hk/" },
    { label: "雙語安排明確標示為下午班K1至K3", value: "校方現行頁面稱下午班K1至K3推行雙語教學，由中文與英文教師擔任班主任並配合劍橋英語課程。這是下午班的校方安排，不可延伸為上午班或全校所有課堂均以英語授課；報名時要確認所選時段和當屆課表。", period: "校方頁面：2027/28招生資訊", sourceUrl: "https://caclwtmk.edu.hk/" },
  ] }], { schoolType: "非牟利幼稚園", religion: "基督教" }),

  profile("159093", "按教育局校號159093及大窩口邨富泰樓地下校址識別仁愛堂彭鴻樟幼稚園。校方2025年發布的課程介紹強調兒童為本、自由遊戲與家校合作；資料不外推至仁愛堂其他幼稚園。", "http://ppe.yot.org.hk", [
    { label: "仁愛堂彭鴻樟幼稚園：校長的話", scope: "校方對活動角、自由遊戲、個別差異及家校合作的自述。", url: "https://www.yotphc.edu.hk/introduction/words-from-the-principal/" },
    { label: "教育局名錄所列仁愛堂彭鴻樟幼稚園網站", scope: "教育局2026-09-30名錄所列校方網址；招生日期按當屆公告核實。", url: "http://ppe.yot.org.hk" },
    { label: "教育局葵青區學校名錄（2026-09-30）", scope: "校號159093、地址、授課時間及註冊資料。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kwt.html" },
    { label: "教育局幼稚園概覽：彭鴻樟幼稚園（2026/27）", scope: "校址級班制、語言、師生比例和核准費用；空缺須另行確認。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1590930001" },
  ], [{ title: "自由遊戲與家校合作", featured: true, details: [
    { label: "活動角和自由遊戲讓教師按個別差異調節", value: "校長介紹稱，幼兒可在活動角選擇學習，教師依孩子特點調整進度，並透過自由遊戲培養創意、社交能力和學習動機。這套安排對需要較多自主探索的孩子值得實地觀察；網站沒有公布各級活動時數或獨立成效數據。", sourceUrl: "https://www.yotphc.edu.hk/introduction/words-from-the-principal/" },
    { label: "教育局校址列下午授課，接送時間要先納入考慮", value: "教育局以校號159093列出富泰樓校舍，授課時間為下午；校方頁面亦有2026/27 K1申請資訊入口。若家庭需要上午照顧，應先確認是否有其他可申請班別，並以當屆校方公告核實申請時程，不能沿用舊流程圖日期。", period: "教育局名錄：2026-09-30；校方招生入口：2026/27", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=159093000111" },
  ] }], { schoolType: "非牟利幼稚園", tuition: "參加幼稚園教育計劃；按2026/27核准費用確認" }),
];

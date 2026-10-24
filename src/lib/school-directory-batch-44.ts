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
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewSections = (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽"));
  return {
    ...school,
    website,
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    sources: [...new Map([
      ...school.sources,
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}登記資料；名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    // Multi-location pages already retain the generated overview in the
    // directory merge. Single-location profiles replace generated sections,
    // so keep their official overview here.
    detailSections: (school.registryLocations || 0) > 1 ? details : [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 44: campus-scoped public facts and school-published evidence. */
export const KINDERGARTEN_BATCH_44: PilotSchool[] = [
  profile("581852", "按教育局校號581852識別約克國際幼稚園；只把金巴倫道校址作幼稚園資料，並與約克其他學前班及小學校舍區分。三語與課程重點按校方自述，不能推算語言課時比例。", "https://www.york.edu.hk/en/index.html", [
    { label: "York International Kindergarten：學校理念", scope: "校方對全人發展、藝術、科學和語言的定位。", url: "https://www.york.edu.hk/en/index.html" },
    { label: "York International Kindergarten：地址及校舍列表", scope: "金巴倫道51號幼稚園校址，並區分Pre-School、English Pre-School及其他York校舍。", url: "https://www.york.edu.hk/en/addresses.html" },
    { label: "York：語言課程", scope: "英語、粵語及普通話課程描述；課時比例未在頁面列明。", url: "https://york.edu.hk/en/languages.html" },
    { label: "York：2026/27學費及入學資料", scope: "校方公布的當屆學費文件、校舍和申請基本程序。", url: "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO.pdf" },
  ], [{ title: "三語、藝術與探究學習", featured: true, note: "課程語言和教育理念為校方自述；學費、班制和師生比例按教育局幼稚園概覽所列校址及年度閱讀。", details: [
    { label: "課程重點包括藝術、科學與語言", value: "校方把學校定位為重視全人發展的國際幼稚園，並明列藝術、數理科學和語言為課程重點。這說明學校希望讓幼兒接觸多個學習範疇；家長參觀時可觀察活動是否讓孩子動手、提問和表達，而非只看課程名稱。", sourceUrl: "https://www.york.edu.hk/en/index.html" },
    { label: "校方稱幼兒接觸英語、粵語和普通話", value: "York語言頁稱幼兒從兩歲起接觸英語、粵語和普通話，並提到小組活動、共讀和角色扮演等語言經驗。網頁沒有提供各語言的每日課時表，因此不能據此判斷哪種語言佔主導；若家庭重視某一語言，應索取當屆班別時間表。", sourceUrl: "https://york.edu.hk/en/languages.html" },
    { label: "金巴倫道幼稚園與York其他校舍需分開辨認", value: "校方地址頁把York International Kindergarten列於九龍塘金巴倫道51號，另將Pre-School、English Pre-School、York English Primary School & Kindergarten及蒙特梭利校舍分列。教育局校號581852的概覽數據只對應其登記校址，不宜把其他分校的班制、收費或課程直接套入。", sourceUrl: "https://www.york.edu.hk/en/addresses.html" },
    { label: "2026/27學費須按班級及校方文件確認", value: "校方已提供2026/27學費及債券資料文件；這份文件同時列多個York校舍和班別。報名前應按孩子申請的班級確認學費、其他費用及校舍分配，勿把另一個Pre-School或小學暨幼稚園的價格當作本校同一班別收費。", period: "2026/27學年；校方公布", sourceUrl: "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO.pdf" },
  ] }]),

  profile("214949", "按教育局校號214949識別法國國際學校。其幼兒教育校址為柴灣及將軍澳；山頂及藍塘道校舍屬較高年級，不把其課程和校園資料混入幼稚園介紹。教育局登記中另有未能由現行校園頁配對的校址紀錄，故只介紹校方現列的兩個Early Years校舍。", "https://www.fis.edu.hk/campuses", [
    { label: "FIS：校舍及學段總覽", scope: "四個校舍的學段分布；柴灣及將軍澳提供Early Years。", url: "https://www.fis.edu.hk/campuses" },
    { label: "FIS：柴灣校舍", scope: "柴灣地址、法文及International兩條課程線、年級、作息和設施。", url: "https://www.fis.edu.hk/campuses/chai-wan" },
    { label: "FIS：將軍澳校舍", scope: "將軍澳校舍地址與所涵蓋的幼兒至中學學段。", url: "https://www.fis.edu.hk/campuses/tseung-kwan-o" },
    { label: "FIS：2026/27開學安排", scope: "各校舍及課程線的當屆開學與實務安排。", url: "https://www.fis.edu.hk/fr/back-to-school-2026-27-1" },
  ], [{ title: "兩條課程線、兩個幼兒校舍", featured: true, note: "課程線與年級分布按FIS校舍頁列示；法國課程與International課程各自有年級架構，申請時須確認校舍、課程線和銜接安排。", details: [
    { label: "柴灣校舍設法文及International兩條幼兒課程線", value: "FIS校舍頁列柴灣校舍提供3至6歲幼兒教育：法文課程線由Petite Section至CP，International課程線由Nursery至Y2。學校並列週一至五約上午9時至下午3時15分的上課時間；實際入讀年級和日程仍須按孩子年齡及課程線向招生處確認。", sourceUrl: "https://www.fis.edu.hk/campuses/chai-wan" },
    { label: "將軍澳校舍由幼兒教育延伸至較高年級", value: "校方列將軍澳校舍法文線涵蓋Petite Section至3ème，International線涵蓋Nursery至Y6。與柴灣校舍相比，將軍澳校舍提供更長的校內學段；這不代表兩個校舍必然有相同班級、交通或收生名額，應按申請課程線查明校址安排。", sourceUrl: "https://www.fis.edu.hk/campuses/tseung-kwan-o" },
    { label: "校方按法文線及International線分開招生聯絡", value: "FIS總覽為法文線和International線列出不同招生聯絡方式，反映兩條課程路徑不是同一班型的語言選修。若家庭考慮以法文為主要學習語言，或走英語International路線，應在申請前了解課程要求、後續轉線條件及銜接校舍。", sourceUrl: "https://www.fis.edu.hk/campuses" },
    { label: "各校舍對應年級不同，跨校舍升級要問清楚", value: "校方目前列柴灣為Early Years及Early Primary、將軍澳為Early Years至Middle School；Jardine's Lookout和Blue Pool Road則分別以小學、中學為主。對幼兒家庭而言，這意味著校舍位置可能隨年級路徑而變，報名前宜把未來接送、校車及校舍轉換一併考慮。", sourceUrl: "https://www.fis.edu.hk/campuses" },
  ] }]),

  profile("535818", "按教育局校號535818及校址編號分開整理九龍塘與黃埔校舍；只有校址0003對應的教育局概覽數據列入概覽卡，Whampoa校舍特色只按校方頁面描述。", "https://anfield.com.hk/", [
    { label: "Anfield：九龍塘校舍", scope: "校舍地址、課程取向、基督教價值和校園介紹。", url: "https://anfield.com.hk/kowloon-tong/" },
    { label: "Anfield：黃埔校舍", scope: "黃埔地址、校園環境與校方對遊戲學習的說明。", url: "https://anfield.com.hk/whampoa/" },
    { label: "Anfield：常見問題", scope: "EYFS、普通話安排及不同幼兒班的師生配置說明；以校方現行頁面為準。", url: "https://anfield.com.hk/faq/" },
    { label: "Anfield：聯絡資料", scope: "兩個幼稚園校舍地址和聯絡方法。", url: "https://anfield.com.hk/contact-us/" },
  ], [{ title: "EYFS、英語環境與基督教價值", featured: true, note: "EDB概覽所列班制及師生比例屬九龍塘校址；黃埔校舍的資料以校方頁面為據，班型與實際空額須分校查詢。", details: [
    { label: "九龍塘與黃埔是兩個不同登記校址", value: "校方聯絡頁列九龍塘金巴倫道5號及黃埔海逸豪園一期L2兩個校舍，電話亦分開。教育局概覽資料對應九龍塘校址0003；不能把該校址的班制或比例直接當作黃埔校舍數據。", sourceUrl: "https://anfield.com.hk/contact-us/" },
    { label: "課程以EYFS和遊戲探索作幼兒學習基礎", value: "校方介紹幼兒課程依循英國Early Years Foundation Stage（EYFS），透過遊戲、動手活動、角色扮演和戶外探索培養好奇、創意及社交發展。這是校方的課程設計描述；參觀時可觀察教師如何在自由探索與清晰日常規律之間取得平衡。", sourceUrl: "https://anfield.com.hk/kowloon-tong/" },
    { label: "校方重視英語並安排普通話接觸", value: "校方FAQ稱普通話由Playgroup延伸至小學，Playgroup、Pre-K和First Steps每日有普通話課；部分早期幼兒課程則以英語為授課語言。各班安排有差異，網站沒有公布所有K1至K3班的逐科時數，申請時應核對所選校舍和班級的課表。", sourceUrl: "https://anfield.com.hk/faq/" },
    { label: "天主教價值是課程定位的一部分", value: "校方招生政策將九龍塘幼稚園定位為天主教國際幼稚園，並提到尊重、包容、責任感和基督信仰教育。家庭選校時可了解宗教活動在日常課程中的呈現方式；這是校方自述的價值方向，不代表每個孩子會有相同體驗。", sourceUrl: "https://anfield.com.hk/wp-content/uploads/2025/06/KG-Admission-Prospectus-v1_2425.pdf" },
  ] }]),

  profile("156515", "按教育局校號156515及屯門大興邨興盛樓地下及二樓識別。教育局截至2026-09-30的分區名冊仍列此校及上午、下午、全日班；校方網站當次無法載入，故不以搜尋摘要或第三方內容補寫課程特色。", "http://www.rck.edu.hk", [
    { label: "教育局屯門區學校名冊（2026-09-30）", scope: "校號156515、校址0001、校名、聯絡資料及授課時段。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "教育局幼稚園概覽（校址0001）", scope: "年度班制、授課語言、師生比例及收費欄位；按2026/27學年資料閱讀。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1565150001" },
    { label: "教育局學校搜尋：天后中英文幼稚園", scope: "校名、校址和官方網站入口的交叉核對。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=156515000112" },
    { label: "天后中英文幼稚園：官方網站", scope: "官方網站入口；目前頁面載入未能完成，故不作未讀取內容的依據。", url: "http://www.rck.edu.hk" },
  ], [{ title: "屯門大興邨校址與班制", featured: true, note: "本頁只列可直接核實的EDB身份、年度概覽及班制資料。校方網站本次無法讀取，未確認的課程、招生和收費細節不作補寫。", details: [
    { label: "教育局名冊列出校號、校址及三種授課時段", value: "教育局2026年9月30日屯門區名冊以校號156515／校址0001列出天后中英文幼稚園，地址為屯門大興邨興盛樓地下及二樓，並標示上午、下午及全日班。這些是名冊記錄，不代表每一級每年都同時開辦三種時段；申請前應向校方確認當屆班別。", period: "教育局名冊截至2026-09-30", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "2026/27概覽列授課語言及師生比例", value: "教育局幼稚園概覽對應校址0001列授課語言為英語，師生比例為1:5.6；這是概覽的學年資料，不應延伸解讀成全日常規都以英語進行，也不等於各班實際人數。若語言環境是主要考慮，需向校方了解中英文及普通話的日常安排。", period: "2026/27學年概覽", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1565150001" },
    { label: "校方網站暫未能讀取，特色與招生細節留待直接確認", value: "EDB學校搜尋提供校方網站入口，但本次讀取未能取得其頁面內容，因此不採用第三方摘要重述課程或面試安排。家長可直接致電2462 2949，確認2027/28招生時間、語言分配、班級時段和最新核准收費。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=156515000112" },
  ] }]),

  profile("605662", "按教育局校號605662及牛頭角下邨貴華樓地址識別；香港基督教服務處另有沙田校舍，但其校號及地點不同，本頁只使用牛頭角校舍資料。", "https://pokg.hkcschild.edu.hk/", [
    { label: "香港基督教服務處：雋樂幼稚園", scope: "幼稚園服務、課程理念、適齡範圍、班制、時段和牛頭角校址。", url: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "雋樂幼稚園（牛頭角）：校方網站", scope: "牛頭角校舍資訊與入學申請入口。", url: "https://pokg.hkcschild.edu.hk/" },
    { label: "EDB幼稚園概覽（校址0001）", scope: "2026/27學年班制、語言、師生比例及免費計劃費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6056620001" },
  ], [{ title: "幼兒本位、主題研習與全日服務", featured: true, note: "課程理念由辦學團體介紹；時間為機構服務頁公布時段，費用及個別班別仍應以該學年學校公告為準。", details: [
    { label: "課程以主題、專題和生活探索帶動自主學習", value: "香港基督教服務處稱課程以幼兒為本，採循序漸進的螺旋式教學，結合單元主題、專題研習、生活體驗、戶外考察和專家分享。對孩子來說，重點是能否在重複接觸中逐步建立概念；家長可詢問學校如何把活動連回語文、數學和生活經驗。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "藝文活動與全人發展是辦學團體列出的方向", value: "機構列出創意美術、戲劇、舞蹈和音樂等活動，並以品德、健康習慣和學習態度作育人方向。頁面說明的是課程設計和活動類別，沒有提供每名學生可參加的頻率或成果指標；參觀時可問清各級實際安排。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "機構頁列出半日及全日服務時間", value: "機構服務頁列牛頭角校舍上午班約8:30至12:00、下午班13:00至16:30、全日班9:00至16:30，服務對象為3至6歲兒童。這是機構頁公布時段，照顧服務和學校正式上課時間可能不同，報名前宜確認交收時間、膳食與延長照顧安排。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "牛頭角與沙田雋樂幼稚園不可混用數據", value: "香港基督教服務處頁面同時列牛頭角和沙田兩所獲資助幼稚園；兩校地址、電話和學校編號各異。此頁教育局概覽資料只對應牛頭角校號605662／校址0001，沙田校舍的收費或班制需另查其自身資料。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
  ] }]),

  profile("157627", "按教育局校號157627整理祥豐樓及祥裕樓兩個登記校址。課程與延長照顧資料按校方公布，並標明其中招生及時間安排適用於何校址，避免將兩校舍視為完全相同。", "https://elchkcw.edu.hk/", [
    { label: "祥華幼稚園：校方網站", scope: "辦學理念、校園特色、全年招生資訊及祥豐樓校址。", url: "https://elchkcw.edu.hk/" },
    { label: "基督教香港信義會：屬下單位", scope: "祥華幼稚園的辦學團體名錄及祥豐樓聯絡資料。", url: "https://www.elchk.org.hk/屬下單位/?type=3" },
    { label: "EDB幼稚園概覽（校址0002）", scope: "校址0002的2026/27班制、語言、師生比例和收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1576270002" },
    { label: "EDB幼稚園概覽（校址0001）", scope: "校址0001的2026/27班制、語言、師生比例和收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1576270001" },
  ], [{ title: "孩童本位、表達力與延長照顧", featured: true, note: "教育理念為校方及辦學團體自述。登記校址0001和0002的時段不同；網站的服務延長時間只按校方公布，個別校址及學生資格需確認。", details: [
    { label: "學校以孩童、愛心及美育為辦學重點", value: "校方把理念概括為「孩童為本、愛心為本、美育為本」，並以個別需要、基督教關懷和藝術欣賞作為培育方向。對家庭而言，這套定位適合希望幼兒在關係和表達中建立自信的家長；可進一步詢問學校如何觀察孩子的個別需要。", sourceUrl: "https://elchkcw.edu.hk/" },
    { label: "校園小記者及中英文校園電視台提供表達場景", value: "校方介紹中文台、英文台及校園小記者活動，目標是讓幼兒練習訪問和公開表達。這是校方公布的校園活動，不代表每名學生都會同等頻率參與；家長可問清活動適用年級和語言支援方式。", sourceUrl: "https://elchkcw.edu.hk/" },
    { label: "祥豐樓與祥裕樓是兩個教育局登記校址", value: "教育局資料以校號157627分列校址0001（祥豐樓）及0002（祥裕樓）；辦學團體現行名錄列出祥豐樓校址和電話。概覽資料分校址呈現，頁面保留兩個校址標識，不把某一校址的語言、班制或師生比例代表另一處。", sourceUrl: "https://www.elchk.org.hk/屬下單位/?type=3" },
    { label: "校方公布的延長照顧時段需按班別核對", value: "校方表示全日班學生可於上午8時起入校，最遲下午6時離校，並稱此安排是為配合家庭需要。這屬校方公布的照顧服務時間，不應直接理解為課堂時數；申請時應確認所選校址、班別及是否需要預先登記。", sourceUrl: "https://elchkcw.edu.hk/" },
  ] }]),

  profile("324230", "按教育局校號324230整理筲箕灣海寧街及西灣河街登記校址；不把奧運校資料混入本校，並依照EDB概覽只呈現海寧街校址數據。招生頁中已過期的2026/27日期不當作現行程序。", "https://www.dominicsaviokg.edu.hk/", [
    { label: "明我幼稚園：學校網站及校址", scope: "校方對筲箕灣校舍的聯絡資料和網站入口。", url: "https://www.dominicsaviokg.edu.hk/" },
    { label: "明我幼稚園：收生簡介", scope: "幼稚園及幼兒園年齡、班制、時段和相關費用基礎；其中個別日期屬2026/27舊年度。", url: "https://www.dominicsaviokg.edu.hk/hk?page_id=967" },
    { label: "明我幼稚園：新生資訊", scope: "校方發布的申請流程、面見和註冊資訊；僅按頁面標示年度使用。", url: "https://www.dominicsaviokg.edu.hk/hk?lang=en&page_id=1248" },
    { label: "EDB幼稚園概覽（校址0001）", scope: "2026/27海寧街校址班制、PN、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3242300001" },
  ], [{ title: "筲箕灣校舍、幼兒班與K1至K3", featured: true, note: "幼稚園與幼兒園為不同服務，且兩個登記校址功能不同。招生頁列有舊年度資料，本頁只保留不易過期的學制與按年度標註的概覽數據。", details: [
    { label: "幼稚園與幼兒園服務分別列出", value: "校方收生頁把幼稚園K1至K3和2至3歲幼兒園分開，幼稚園低班年齡約32個月至4歲，全日班範圍只適用於港島校。家長申請前需確認孩子報讀的是幼兒園PN還是K1，兩者年齡、班別和費用不能混為一談。", sourceUrl: "https://www.dominicsaviokg.edu.hk/hk?page_id=967" },
    { label: "教育局概覽數據只對應海寧街校址0001", value: "校號324230另有西灣河街登記地址，資料類別標示幼稚園暨幼兒中心；本頁列出的K1至K3概覽項目只配對海寧街校址0001。若家庭希望申請幼兒園或查詢另一地址，應直接向校方確認校址、班別和收生窗口。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3242300001" },
    { label: "校方列三語活動與循序漸進教學方向", value: "校方頁面描述中文、英語及普通話活動，並提及外籍教師帶領英語遊戲，以及按幼兒興趣和進度調整學習內容。該招生頁包含特定年度安排，不能由「三語並行」推算各語言課時比例；家長應索取當屆課表，並問清不同校址的安排是否一致。", sourceUrl: "https://www.dominicsaviokg.edu.hk/hk?page_id=967" },
    { label: "過往招生日期已過，不以舊時間表代替新一屆公告", value: "校方新生資訊頁可用來理解過往申請文件和註冊流程，但所列2026/27報名日期及結果時間已屬歷史資料。準備下一屆申請時，請以校方更新頁面為準，並直接核實面見安排、候補通知及註冊費。", period: "頁面含2026/27入學年度資料", sourceUrl: "https://www.dominicsaviokg.edu.hk/hk?lang=en&page_id=1248" },
  ] }]),

  profile("565628", "按教育局校號565628及梨木樹邨翠樹樓地下識別世德幼稚園梨木樹校址；校方另設天水圍校舍，特色描述雖有共同課程方向，地址與概覽數據仍按梨木樹校址使用。", "https://castar.edu.hk/", [
    { label: "世德幼稚園：課程特色", scope: "體驗式及混齡學習、語言活動、德育、實物編程和自由遊戲。", url: "https://castar.edu.hk/我們的學校/課程特色/" },
    { label: "世德幼稚園：學校介紹及梨木樹校舍", scope: "辦學理念、校址、校方介紹的學習與支援安排。", url: "https://castar.edu.hk/我們的學校/學校簡介/" },
    { label: "世德幼稚園：教育局質素評核報告", scope: "教育局過往評核時對課程及兒童本位教學的觀察，作歷史背景。", url: "https://www.castar.edu.hk/我們的學校/質素評核報告/" },
    { label: "EDB幼稚園概覽（校址0001）", scope: "2026/27梨木樹校址班制、語言、師生比例和免費計劃費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5656280001" },
  ], [{ title: "體驗學習、混齡互動與三語活動", featured: true, note: "課程特色是校方自述；評核報告只代表其評核年份的觀察。教育局年度班制與師生比例以梨木樹校址為準。", details: [
    { label: "體驗式學習要求幼兒親身操作和反思", value: "校方稱以接近真實情境的活動讓幼兒觀察、操作、對話和反思，再把新概念連回生活。這種課程重視過程而非只做成品；家長參觀時可觀察孩子是否有選擇、試錯和重述經驗的空間。", sourceUrl: "https://castar.edu.hk/我們的學校/課程特色/" },
    { label: "部分體驗活動採混齡方式", value: "校方介紹混齡活動希望透過跨年齡互動，鼓勵模仿、合作和同伴引導。混齡安排不等於所有課堂都混班，也不保證每名孩子都適應相同節奏；家長可問清哪些活動採混齡，以及教師如何照顧年齡和發展差異。", sourceUrl: "https://castar.edu.hk/我們的學校/課程特色/" },
    { label: "英語活動每日進行，體能活動融入普通話", value: "校方稱星期一至五由英語教師帶領英語活動，並把普通話用於體能活動；中文、英語和普通話的內容亦透過故事、遊戲及生活情境延伸。官方頁沒有列出完整課時表，不能把這些活動描述換算為中英普比例。", sourceUrl: "https://castar.edu.hk/我們的學校/課程特色/" },
    { label: "梨木樹與天水圍校舍要分開查詢", value: "校方網站同時介紹世德幼稚園及世德幼稚園（梨木樹），兩址分別在天水圍天華邨和梨木樹邨。本頁的校號565628、電話及概覽數據對應梨木樹校舍；查詢學費、支援和收生時應報明校舍。", sourceUrl: "https://castar.edu.hk/我們的學校/學校簡介/" },
  ] }]),

  profile("542598", "按教育局校號542598及馬鞍山錦豐苑錦荷閣校址識別ICS幼稚園。只呈現幼稚園校園的Reception 1–2資料，不把石門主校區小一至中六的考試、學生人數或比例當作幼稚園數據。", "https://www.ics.edu.hk/academics-kindergarten/", [
    { label: "ICS：幼稚園課程", scope: "Reception 1及2、主題課程、四個發展範疇和基督教教育定位。", url: "https://www.ics.edu.hk/academics-kindergarten/" },
    { label: "ICS：學校與校園總覽", scope: "馬鞍山幼稚園校園、年級及校方公布的幼稚園學生數。", url: "https://www.ics.edu.hk/" },
    { label: "ICS：幼稚園學生手冊（2025/26）", scope: "馬鞍山校園交收與校園管理安排；手冊適用年度已標明。", url: "https://www.ics.edu.hk/wp-content/uploads/2025/08/ICSKG_StudentHandbook_V01.pdf" },
    { label: "EDB幼稚園概覽（校址0002）", scope: "校址0002的2026/27班制和概覽列出的幼兒級別資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5425980002" },
  ], [{ title: "主題課程、基督教價值與R1–R2", featured: true, note: "ICS校方網頁的跨校區成績與人數不套用到幼稚園；幼稚園課程以馬鞍山校園專頁為準。", details: [
    { label: "幼稚園只設Reception 1及Reception 2", value: "ICS課程頁把幼稚園列為Reception 1和2，並以主題課程發展身體、認知與語言、社交情緒及審美四個範疇。這是以英語國際學制為基礎的幼兒階段；家長應按孩子出生日期和校方年齡表核對入讀級別。", sourceUrl: "https://www.ics.edu.hk/academics-kindergarten/" },
    { label: "主題課程把早期能力與基督教信仰結合", value: "校方稱課程以有目的的主題設計，建立基礎能力並認識上帝的愛，整體定位以基督為中心。對家庭而言，這意味著信仰不是單獨的節慶活動；選校前可了解日常祈禱、聖經故事與多元文化家庭的參與方式。", sourceUrl: "https://www.ics.edu.hk/academics-kindergarten/" },
    { label: "幼稚園位於馬鞍山獨立校園", value: "ICS校方分開介紹石門主校區和馬鞍山幼稚園校園，並稱幼稚園設Reception 1至2。幼稚園校園與中小學主校區並非同一地址，接送和日後升級安排應向招生處確認；不能由同一品牌推斷必然直升或保證學位。", sourceUrl: "https://www.ics.edu.hk/" },
    { label: "學生交收和校園規則值得在申請前先看", value: "2025/26學生手冊說明馬鞍山校園並不允許車輛在校門外直接落客或接載。若家庭依賴私家車或需照顧多名子女，這類日常交通限制會直接影響接送安排；手冊屬該年度版本，最新規則應再向校方核實。", period: "2025/26學生手冊", sourceUrl: "https://www.ics.edu.hk/wp-content/uploads/2025/08/ICSKG_StudentHandbook_V01.pdf" },
  ] }]),

  profile("518077", "按教育局校號518077及安蔭邨耀蔭樓、德蔭樓登記校址識別。荃灣商會辦學團體確認校名、地址與電話；校方網站本次無法讀取，因此課程特色僅使用有年份的校方文件，不把舊材料說成現行全貌。", "https://www.ykfk.edu.hk/", [
    { label: "荃灣商會教育基金：屬會學校", scope: "邱健峰幼稚園校名、安蔭邨耀蔭樓地址和聯絡電話。", url: "https://www.twta.com.hk/web/subpage.php?mid=24" },
    { label: "邱健峰幼稚園：校方網站", scope: "官方網站入口；本次頁面未能載入，未讀取部分不作事實來源。", url: "https://www.ykfk.edu.hk/" },
    { label: "邱健峰幼稚園：校方刊物與訪問（2022）", scope: "校方及辦學團體當時公開的課程、品格和親子教育內容；作歷史課程例子。", url: "https://www.twta.com.hk/upload/userfiles/day_220513/202205131216381835.pdf" },
    { label: "EDB幼稚園概覽（校址0001）", scope: "2026/27校址0001班制、授課語言、師生比例及免費計劃費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5180770001" },
  ], [{ title: "安蔭邨校址與課程資料的年份界線", featured: true, note: "學校身份由EDB及辦學團體名錄交叉核對。校方網站本次無法讀取，2022年課程材料只作已公開過的課堂方向，不代表現行安排必然相同。", details: [
    { label: "教育局及辦學團體資料指向安蔭邨兩座校舍", value: "校號518077的登記地址涵蓋安蔭邨耀蔭樓及德蔭樓；荃灣商會教育基金屬會學校頁另列耀蔭樓地址和電話2422 6838。教育局概覽提供校址0001年度資料，兩個校址的班制和班級數應分開向校方確認。", sourceUrl: "https://www.twta.com.hk/web/subpage.php?mid=24" },
    { label: "概覽列半日及全日班，語言欄以粵語為主", value: "教育局2026/27概覽對應校址0001列上午、下午及全日班，授課語言為粵語，師生比例為1:9.1。語言欄呈現概覽分類，不表示沒有英語或普通話活動；若家庭關心語言接觸頻率，應索取該校址當屆課表。", period: "2026/27學年概覽", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5180770001" },
    { label: "2022年校方刊物曾介紹主題研習與多元感官活動", value: "辦學團體刊物在2022年介紹邱健峰幼稚園透過主題、探索和活動安排幼兒學習。這可作為校方曾公開的課程例子，但年份較早，不能替代當前課程說明；報名時宜直接詢問現行課程設計、評估方法和家校溝通。", period: "校方刊物：2022年", sourceUrl: "https://www.twta.com.hk/upload/userfiles/day_220513/202205131216381835.pdf" },
    { label: "官方學校網站本次未能讀取，招生安排不沿用舊資料", value: "校方網站入口仍由辦學團體名錄列出，但本次無法成功讀取頁面。由於幼稚園申請日期、面見及收費會隨年度變動，這裡不引用舊年度招生細節；家長可致電辦學團體列出的電話，索取當屆資料。", sourceUrl: "https://www.ykfk.edu.hk/" },
  ] }]),
];

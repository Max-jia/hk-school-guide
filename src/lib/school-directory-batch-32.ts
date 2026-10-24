import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(schoolNumber: string, year: string, note: string, website: string, sources: PilotSchool["sources"], details: NonNullable<PilotSchool["detailSections"]>): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear: year, sourceNote: note, replaceDirectoryDetails: true, website, sources, detailSections: details };
}

/** Kindergarten profile batch 32: ten unique, locally registered schools. */
export const KINDERGARTEN_BATCH_32: PilotSchool[] = [
  profile("153087", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "聖公會荊冕堂士德幼稚園以兒童為中心，採設計活動配合結構式學習，校方已公布2027/28 K1招生流程。概覽授課語言和師生比例按2026/27校址資料理解；不據此推算課時或實際班級人數。", "https://skhcotsd.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號153087、荃灣德士古道地址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費；比例不是每班實際人數。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1530870001" },
    { label: "聖公會荊冕堂士德幼稚園：辦學宗旨及教學理念", scope: "基督教辦學自述、兒童為本、設計活動及結構式學習。", url: "https://skhcotsd.edu.hk/" },
    { label: "聖公會荊冕堂士德幼稚園：2027/28入學申請", scope: "校方當屆K1申請日期及招生程序。", url: "https://skhcotsd.edu.hk/入學申請/" },
    { label: "教育局：質素評核報告名錄", scope: "士德幼稚園評核日期及官方報告入口；評核不是排名。", url: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTW.html" },
  ], [{ title: "設計活動教學與新生適應", featured: true, note: "教學方向及招生時間來自校方網頁；課堂比例和錄取機會沒有公開，不作估算。", details: [
    { label: "設計活動讓幼兒從經驗中建構知識", value: "校方以兒童為中心，讓幼兒透過遊戲、活動、師生互動及參觀體驗學習，並配合結構式學習。家長可在參觀時看孩子是否有提問、選擇和分享過程，並詢問教師如何從幼兒興趣延伸成主題。", sourceUrl: "https://skhcotsd.edu.hk/" },
    { label: "2027/28 K1已公布申請流程", value: "校方已列網上與親身交表日期，並安排新生簡介會、遊戲日和會見；該屆流程另列兄姊在讀優先考慮，同時明言學位有限、優先不等於必獲取錄。下一屆日期須重新核對。", period: "2027/28 K1招生", sourceUrl: "https://skhcotsd.edu.hk/入學申請/" },
    { label: "評核報告有明確時間邊界", value: "教育局名錄列出該校2024年2月的評核日期。家長可讀原報告了解當時的觀察與建議，但不應把舊評核結果當作2026/27每班即時情況或排名。", period: "評核日期：2024年2月26日至3月1日", sourceUrl: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTW.html" },
  ] }]),

  profile("154601", "教育局位置及註冊資料：2026-10；概覽：2026/27；教育局評核：2024-01", "聖公會聖約瑟堂幼稚園位於元朗八鄉吳家村，校方網站提供學校入口；教育局概覽按校址列示語言、班制和學費，教育局亦保留2024年質素評核報告。校方公開課程細節本輪可讀性有限，不移用第三方轉述。", "http://www.sjckg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號154601、八鄉吳家村地址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和核准費用，均按當屆資料理解。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1546010001" },
    { label: "聖公會聖約瑟堂幼稚園：校方網站", scope: "官方學校入口；報名及校務安排以校方當屆公告為準。", url: "http://www.sjckg.edu.hk/" },
    { label: "教育局質素評核報告名錄", scope: "列出該校2024年1月評核日期及官方報告入口。", url: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTW.html" },
  ], [{ title: "八鄉校址、概覽數據與資料邊界", featured: true, note: "教育局概覽與評核報告可核；校方網站本輪未能穩定讀取課程頁，未以其他學校或聚合網站補寫。", details: [
    { label: "校址在元朗八鄉吳家村", value: "教育局登記資料列校號154601及八鄉吳家村83A號。選校時建議先實際試走居住地至校址的接送路線；周邊交通與校車覆蓋須向學校確認。", sourceUrl: EDB_LOCATION },
    { label: "2026/27概覽是比較班制和費用的底數", value: "教育局概覽按校址列出授課語言、上午／下午班、師生比例及核准收費。比例是概覽統計，不等於孩子班內即時師生數；若關心全日照顧、普通話或英語課時，應索取本年度日程表。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1546010001" },
    { label: "教育局質素評核報告可作歷史參照", value: "教育局名錄列出2024年1月23、24及26日的評核日期。報告反映評核時段的觀察，不足以代表當屆教師、課程或班級現況；閱讀時需留意報告年份。", period: "評核日期：2024年1月23日至26日", sourceUrl: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTW.html" },
  ] }]),

  profile("152978", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方活動：2025/26–2026/27", "長洲聖心幼稚園以兒童為本和遊戲體驗為校方自述方向，近期校園紀錄展示區角、體能、音樂、主題活動及家長觀課。離島家庭還需把船程、天氣和接送備案納入日常評估。", "https://www.ccshkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號152978、長洲東灣校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1529780001" },
    { label: "長洲聖心幼稚園：辦學理念及校園活動", scope: "兒童為本、遊戲互動、多元體驗與家校合作的校方自述及活動紀錄。", url: "https://www.ccshkg.edu.hk/" },
    { label: "長洲聖心幼稚園：家長教師會", scope: "家校合作組織及具日期的親子活動紀錄。", url: "https://www.ccshkg.edu.hk/parent-teacher-association/" },
  ], [{ title: "遊戲體驗、家校參與與離島通勤", featured: true, note: "校方活動紀錄證明曾公布相關活動，不代表每名幼兒都能參加或每年固定舉辦。", details: [
    { label: "以遊戲和親身體驗組織學習", value: "校方介紹以孩子為中心，透過遊戲互動和參觀、藝術、音樂、運動及表演等活動支持學習。近期校園紀錄還展示課前自由活動、主題活動、體能活動和區角自選。家長可觀察自由遊戲是否有足夠時間，以及教師如何照顧不同步調。", sourceUrl: "https://www.ccshkg.edu.hk/" },
    { label: "家長觀課和親子活動提供了解日常的入口", value: "校方公布家長教師會及親子活動紀錄，曾安排家長觀課、親子活動和發展主題工作坊。活動照片可幫助了解校園生活，但名額、頻率和家長參與程度要向學校核實。", sourceUrl: "https://www.ccshkg.edu.hk/parent-teacher-association/" },
    { label: "離島接送要把交通不確定性算進去", value: "校址在長洲東灣，教育局概覽列當屆班制和校址資料。家長應按上學時間實測船班銜接、候船與步行時間，並預想惡劣天氣或航班延誤時的接送方案；校車、保姆車服務需向校方確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1529780001" },
  ] }]),

  profile("133019", "教育局位置及註冊資料：2026-10；概覽：2026/27；學校報告：2024/25", "寶血幼稚園位於跑馬地冬青道，校方以天主教價值、生活化課程和品格培育為辦學表述；2024/25學校報告記錄新生適應、非華語支援和個別學習需要安排。報告內容有學年界線，不能當作所有班別固定服務承諾。", "https://www.pbk.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號133019、跑馬地冬青道地址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1330190001" },
    { label: "寶血幼稚園：課程特色", scope: "校方課程自述，包括品格培育、生活化學習和語言活動。", url: "https://www.pbk.edu.hk/curriculum/curriculum.html" },
    { label: "寶血幼稚園：2024/25學校報告及2025/26工作計劃", scope: "該學年新生適應活動、非華語支援和特殊學習需要服務記錄。", url: "https://pbk.edu.hk/site/publicinfo/report/寶血幼稚園_學校報告24-25及學校發展計劃25-26.pdf" },
  ], [{ title: "生活化課程、新生適應與個別支援", featured: true, note: "學校報告反映2024/25執行情況，不能延伸為每屆名額、固定服務時數或錄取承諾。", details: [
    { label: "課程強調生活經驗和品格培育", value: "校方課程頁表示從幼兒興趣、能力與經驗選取內容，透過生活化主題、討論、觀察和實驗引導探索，並把品德培育融入課程與宗教活動。家長可問清楚現行自由遊戲、英語及普通話活動分別如何編入日程。", sourceUrl: "https://www.pbk.edu.hk/curriculum/curriculum.html" },
    { label: "2024/25報告記錄入學前適應活動", value: "該年度學校報告記錄歡笑樂園、愉快課堂和新生家長會，讓幼兒與家長先接觸教師及校園。這些是特定學年的安排，報名前應向學校確認下一屆是否延續及活動日期。", period: "2024/25學校報告", sourceUrl: "https://pbk.edu.hk/site/publicinfo/report/寶血幼稚園_學校報告24-25及學校發展計劃25-26.pdf" },
    { label: "非華語與個別需要支援有具體例子", value: "2024/25報告提到支援非華語幼兒的中文環境、英文版家校資料及文化活動，也記錄與專業團隊協作的到校支援。服務對象、評估流程與當屆資源需個別確認，不宜由報告推斷每名申請者可獲同等支援。", period: "2024/25學校報告", sourceUrl: "https://pbk.edu.hk/site/publicinfo/report/寶血幼稚園_學校報告24-25及學校發展計劃25-26.pdf" },
  ] }]),

  profile("138835", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "宣道幼稚園位於九龍塘蘭開夏道，校方網站分列課程簡介、英語、普通話、品德靈育和戶外參觀項目，並於2026年公布27/28招生消息。學校屬私立；費用與語言活動時數應按申請年度向校方確認。", "https://www.ktak.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號138835、蘭開夏道校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0003", scope: "班制、授課語言、師生比例及私立學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1388350003" },
    { label: "宣道幼稚園：課程項目及校務消息", scope: "校方列出的英語、普通話、品德靈育、戶外參觀和2027/28招生入口。", url: "https://www.ktak.edu.hk/" },
    { label: "宣道幼稚園：課程簡介", scope: "校方課程介紹入口；個別頁的課程時數未能從公開文字確認。", url: "https://www.ktak.edu.hk/課程簡介/課程簡介/" },
  ], [{ title: "私立學費與語言課程需逐項問清", featured: true, note: "網站列有英語和普通話項目，但公開頁未呈現足夠文字以確認課時、教學模式及額外費用。", details: [
    { label: "校方把語文和品德靈育分成不同課程入口", value: "宣道幼稚園網站分列英語計劃、普通話學習、品德靈育、校內活動和各級戶外參觀。這說明校方提供相應課程資訊入口，但不能據此推斷兩種語言的每日比例；申請前應索取本級時間表和課程說明。", sourceUrl: "https://www.ktak.edu.hk/" },
    { label: "2027/28招生已在校方首頁公布", value: "校方2026年9月公布27/28年度招生消息。具體報名、面見、費用和註冊規則應以招生頁當屆文件為準，並留意私立學校的學費及雜費不由免費計劃一欄代替。", period: "2027/28招生資訊；首頁消息日期2026-09-17", sourceUrl: "https://www.ktak.edu.hk/" },
    { label: "課程頁需要家長直接核對細節", value: "教育局2026/27概覽列校址0003的班制、授課語言和核准學費資料。由於校方課程頁的公開文字未列課時，若家庭把英語或普通話沉浸度作主要選校條件，應直接詢問授課教師、每週接觸時數及所含費用。", period: "2026/27學年；校址0003", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1388350003" },
  ] }]),

  profile("610291", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方服務：網頁查核於2026-10", "基督教家庭服務中心楊蔡慧嫻紀念幼稚園設半日及全日班，校方公開遊戲、主動學習、生活自理與品格教育方向；亦提供非華語家庭傳譯、駐校社工及到校學前康復服務資訊。支援安排須按兒童需要和當屆名額確認。", "https://ycwh.cfsc.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號610291、安達邨校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6102910001" },
    { label: "楊蔡慧嫻紀念幼稚園：認識我們與支援服務", scope: "校方課程方向、班別時間、社工、非華語家庭傳譯及到校學前康復服務。", url: "https://ycwh.cfsc.edu.hk/" },
    { label: "社會福利署：學前服務資料", scope: "學前單位與到校支援服務資料的官方目錄入口。", url: "https://www.swd.gov.hk/" },
  ], [{ title: "遊戲、自主學習與校本支援", featured: true, note: "服務存在由校方公開資料支持；是否適用於個別幼兒、等候安排和支援頻率仍須查詢。", details: [
    { label: "校方重視遊戲經驗和幼兒自主步調", value: "學校列出豐富遊戲經驗、主動提問、按自己的步調學習、生活自理及品格教育等方向。家長可詢問教師如何把自由探索轉成觀察與回饋，並了解半日與全日班的作息差異。", sourceUrl: "https://ycwh.cfsc.edu.hk/" },
    { label: "非華語家庭可查詢翻譯及傳譯安排", value: "校方表示提供英語及普通話翻譯／傳譯服務，並以多元活動協助非華語幼兒融入及學習中文。若家長需要即時翻譯，應在申請或面見前預約並確認可提供的語言。", sourceUrl: "https://ycwh.cfsc.edu.hk/" },
    { label: "社工與到校康復支援需看個別需要", value: "校方介紹駐校社工和到校學前康復服務，並提到早期識別、訓練及家長輔導。此類服務有適用條件和轉介流程，家庭宜先向學校及服務營辦機構確認評估、等候和服務時段。", sourceUrl: "https://ycwh.cfsc.edu.hk/" },
  ] }]),

  profile("595365", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方活動報告：2024/25", "救世軍中原慈善基金油塘幼稚園位於油麗邨停車場大樓，教育局資料列上午、下午和全日班。校方2024/25活動報告記錄花展及海洋公園學習活動，反映實地觀察是具體活動形式，不能推作每級固定行程。", "https://www.salvationarmy.org.hk/esd/ccfytkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號595365、油麗邨登記校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5953650001" },
    { label: "救世軍油塘幼稚園：2024/25活動津貼運用報告", scope: "該年度按級別記錄的花展、海洋公園及體驗活動。", url: "https://salvationarmy.org.hk/esd/ccfytkg/cms/sites/default/files/web/YTKG_幼稚園活動津貼運用報告_24-25.pdf" },
    { label: "救世軍教育服務部：學前教育服務", scope: "辦學團體的教育服務自述及幼稚園名單。", url: "https://www.salvationarmy.org.hk/esd/hk/" },
  ], [{ title: "實地探索活動與全日班日常", featured: true, note: "活動例子只對應2024/25年度報告；交通、膳食、延長照顧和全日班收費需向校方查詢。", details: [
    { label: "2024/25活動以觀察和體驗延伸主題", value: "校方活動津貼報告記錄幼兒班參觀花展、觀察花卉和裝置藝術，也記錄高班參與海洋公園學院活動，藉觀察生物認識環境保護。家長可問這些體驗如何接回課堂主題，以及不同級別是否有相近活動。", period: "2024/25活動津貼報告", sourceUrl: "https://salvationarmy.org.hk/esd/ccfytkg/cms/sites/default/files/web/YTKG_幼稚園活動津貼運用報告_24-25.pdf" },
    { label: "教育局概覽列出三種班制", value: "2026/27概覽按油塘校址列上午、下午及全日班。對雙職家庭而言，全日班能否配合下班時間，還取決於放學後照顧、校車路線、膳食和延長服務，應逐項向學校確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5953650001" },
    { label: "救世軍辦學定位屬機構自述", value: "教育服務部以「心向神、手助人」及全人教育描述其辦學使命。這是辦學團體的價值表述；家庭應進一步了解本校每日宗教活動、生活常規及家校溝通如何落實。", sourceUrl: "https://www.salvationarmy.org.hk/esd/hk/" },
  ] }]),

  profile("590614", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "英揚樂兒中英文幼稚園位於天水圍天麗苑，校方公開英語、普通話、日語、電腦及奧福音樂課程入口，並已列2027/28 K1招生資料。教育局概覽授課語言欄不能代替各語言實際課時。", "https://www.elitekg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號590614、天水圍天麗苑校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5906140001" },
    { label: "英揚樂兒中英文幼稚園：課程特色", scope: "英語、普通話及奧福音樂課程的校方自述。", url: "https://elitekg.edu.hk/school-features/" },
    { label: "英揚樂兒中英文幼稚園：2027/28招生及收費入口", scope: "當屆K1招生程序和2026/27收費表入口。", url: "https://elitekg.edu.hk/admission/" },
  ], [{ title: "多語課程入口與實際授課比例", featured: true, note: "課程項目來自校方網站；每日或每週課時、各班是否相同及額外收費須按當屆確認。", details: [
    { label: "英語、普通話與音樂活動並列", value: "校方稱英語課堂由外籍教師任教，普通話課程以拼音、發音、故事、歌曲和遊戲為入口，另列電腦及奧福音樂課程。家長應分別詢問每週時數、教學語言、師資安排和是否包含在學費內。", sourceUrl: "https://elitekg.edu.hk/school-features/" },
    { label: "招生頁已列2027/28 K1程序", value: "校方招生頁提供27/28幼兒班申請程序，並同時保留26/27收費表入口。日期、註冊費及退費安排按頁面所屬年度區分，不能直接沿用到下一屆。", period: "2027/28 K1招生；費用表標示2026/27", sourceUrl: "https://elitekg.edu.hk/admission/" },
    { label: "校方以兒童為中心描述服務方向", value: "學校自述以兒童為中心、尊重個別差異，並希望發展自主學習、社交情緒和創造力。參觀時可觀察教師如何讓孩子選擇活動，以及語言課程是否仍保留足夠遊戲和休息時間。", sourceUrl: "https://elitekg.edu.hk/" },
  ] }]),

  profile("539872", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28；學校報告：2023/24", "保良局蔡冠深幼稚園以「愛敬勤誠」、多元活動和家校合作為校方定位；2023/24報告列出英語課堂、拼音、閱讀及自由遊戲安排，校方已公布2027/28 K1申請。學校活動名單不是升小錄取保障。", "https://www.plkkgs.edu.hk/plkckskg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號539872、屯門澤豐花園校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5398720001" },
    { label: "保良局蔡冠深幼稚園：校園簡介及招生資訊", scope: "辦學方向、2027/28招生入口、家校及非華語支援安排。", url: "https://www.plkkgs.edu.hk/plkckskg/hk/custom/custom_page/44" },
    { label: "保良局蔡冠深幼稚園：2023/24學校報告", scope: "該年度課程、每日英語接觸、拼音、閱讀、自由遊戲及活動週。", url: "https://www.plkkgs.edu.hk/plkckskg/api/cms/pdf/download/1351" },
  ], [{ title: "英語日常、自由遊戲與幼小銜接", featured: true, note: "課程細節取自2023/24學校報告；現行安排須向校方核對。幼小同盟活動不代表直升或保證派位。", details: [
    { label: "學校報告記錄每日英語學習安排", value: "2023/24校方報告提到每日學習時段編排英語課堂、班內設英語區、推行拼音活動和English Fun Week，也使用自由遊戲時段作多元智能活動。這些是該年度學校報告內容；家庭若重視英語比例，應索取現行日課表確認是否延續。", period: "2023/24學校報告", sourceUrl: "https://www.plkkgs.edu.hk/plkckskg/api/cms/pdf/download/1351" },
    { label: "校方兼顧閱讀、體驗與升小準備", value: "報告記錄繪本閱讀、社區參觀、小一適應週及親子活動。可把這些視為校方當年安排的實例；家長宜了解不同級別的活動頻率，以及升小支援是一般準備還是個別選校諮詢。", period: "2023/24學校報告", sourceUrl: "https://www.plkkgs.edu.hk/plkckskg/api/cms/pdf/download/1351" },
    { label: "2027/28招生資料已公開", value: "校方首頁列2027/28 K1申請注意事項、新生行事日程和簡介會／開放日資訊。申請家庭應以當屆文件為準，並把兄姊或保良局幼小活動視作校務安排，不推斷為升讀某所小學的優先權。", period: "2027/28 K1招生", sourceUrl: "https://www.plkkgs.edu.hk/plkckskg/" },
  ] }]),

  profile("549304", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "元朗東莞同鄉會熊定嘉幼稚園位於天水圍天恩邨，校方公開2027/28 K1及2026/27插班申請入口，並有2025/26健康活力操、迎新及班級生活紀錄。本輪校方課程簡介頁無法穩定讀取，故不推斷課程模式或語言比例。", "https://www.tkhtkk.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號549304、天水圍天恩邨校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5493040001" },
    { label: "元朗東莞同鄉會熊定嘉幼稚園：校方首頁及最新通告", scope: "2027/28 K1申請、2026/27插班申請與2025/26校園活動。", url: "https://www.tkhtkk.edu.hk/" },
    { label: "教育局質素評核報告名錄", scope: "列出該校2023年2月評核日期及官方報告入口。", url: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/NTW.html" },
  ], [{ title: "招生入口、校園生活與課程待核項", featured: true, note: "校方首頁可核最新招生及活動公告；課程簡介頁本輪無法穩定讀取，語言和教學模式不作推測。", details: [
    { label: "校方已分開公布K1與插班申請", value: "首頁於2026年8月公布2027/28幼兒班申請表及2026/27插班生報名表。兩者入學年級和申請流程不同；家庭應先確認申請年度、孩子年齡與可申請級別，再按校方表格遞交。", period: "K1：2027/28；插班：2026/27", sourceUrl: "https://www.tkhtkk.edu.hk/" },
    { label: "近期校園紀錄包括健康活力操和幼班生活", value: "學校首頁列2025/26健康活力操、「開心上學100天」及班級生活等內容，可作了解日常活動風格的起點。活動展示不等於每名孩子每學年參與相同項目。", period: "2025/26校園紀錄", sourceUrl: "https://www.tkhtkk.edu.hk/" },
    { label: "課程與語言細節需直接向校方確認", value: "教育局2026/27概覽可核班制、概覽語言、師生比例和費用；校方網站雖有課程簡介入口，本輪未能穩定讀取正文。若重視粵語、普通話或英語比例，應向學校索取本年度日課表和課程簡介。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5493040001" },
  ] }]),
];

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

/** Kindergarten profile batch 30: ten unique locally registered schools. */
export const KINDERGARTEN_BATCH_30: PilotSchool[] = [
  profile("152269", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "全完堂幼稚園位於荃灣大屋街，1964年創辦。學校以教會辦學和品格培育為背景，2027/28招生流程已公布；課程介紹未有公開逐級課時，故不推算活動比例。", "https://www.cychurch.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號152269、荃灣大屋街地址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1522690001" },
    { label: "全完堂幼稚園：關於我們", scope: "創校年份、辦學團體和校訓背景。", url: "https://www.cychurch.edu.hk/" },
    { label: "全完堂幼稚園：2027/28報名流程", scope: "當屆申請時間線、非華語面見支援及代辦費用。", url: "https://www.cychurch.edu.hk/tc/%E5%A0%B1%E5%90%8D%E6%B5%81%E7%A8%8B" },
  ], [{ title: "教會背景、品格培育與社區連結", featured: true, note: "宗旨按校方自述；招生日期及費用只適用於頁面標出的學年。", details: [
    { label: "教會辦學背景可從校訓和社區活動理解", value: "校方記錄1964年創辦，隸屬中華基督教會全完堂，並以品格和學習基礎作辦學方向。網站展示親子體適能、社區送暖及親子共讀等活動例子；這些是公開活動紀錄，不代表每名幼兒參與頻率。", sourceUrl: "https://www.cychurch.edu.hk/" },
    { label: "2027/28招生安排已具體列出", value: "校方列2026年9月派表、11月7日面見、12月11日前通知，並於2027年1月7至9日辦理註冊；非華語兒童可按需要申請傳譯／翻譯。這是2027/28時間表，申請前仍應查看校方最新通告。", period: "2027/28招生；校方頁面查核：2026-10", sourceUrl: "https://www.cychurch.edu.hk/tc/%E5%A0%B1%E5%90%8D%E6%B5%81%E7%A8%8B" },
    { label: "教育局概覽與校方宗旨各有用途", value: "2026/27概覽按校址0001列上午、下午班、粵語授課及約1:5.9師生比例；比率不是固定班額。學校宗教活動、課堂語言比例和每日流程需向校方確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1522690001" },
  ] }]),

  profile("158640", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生及課程：2026/27–2027/28", "荃灣商會鍾來幼稚園現址在青衣青雅苑，校方於2027/28 K1招生頁公布45個半日班及45個全日班計劃學額。校方課程採活動與遊戲教學，並列語言和全日班活動；這些招生數字只屬該屆計劃。", "https://www.twtaclk.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158640、青雅苑校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1586400001" },
    { label: "荃灣商會鍾來幼稚園：教學及支援", scope: "遊戲、主題及活動教學，語言、全日班活動和學習評估。", url: "https://www.twtaclk.edu.hk/l/fa42cCwtQ" },
    { label: "荃灣商會鍾來幼稚園：2027/28 K1申請須知", scope: "學額計劃數、面見、優先考慮與註冊日期。", url: "https://www.twtaclk.edu.hk/l/fabd9Cw1X" },
  ], [{ title: "遊戲課程、語言接觸與年度學額", featured: true, note: "課程和學額以校方頁面為依據；英語與普通話接觸機會不等同主要授課語言或等量課時。", details: [
    { label: "兒童本位的活動與遊戲教學", value: "校方介紹按幼兒需要採活動教學，以小組／團體活動、主題網絡、遊戲和參觀建構經驗，並以持續觀察記錄學習。全日班另列Lego Six Bricks及美食製作等活動；各級頻率未公開。", sourceUrl: "https://www.twtaclk.edu.hk/l/fa42cCwtQ" },
    { label: "2027/28招生公布半日與全日名額計劃", value: "校方本屆K1須知列半日班45人、全日班45人，並說明面見、優先考慮條件及註冊安排。這是該屆規劃數字，不是現在空缺，也不能據此算錄取率。", period: "2027/28 K1招生", sourceUrl: "https://www.twtaclk.edu.hk/l/fabd9Cw1X" },
    { label: "概覽列粵語授課與約1:8", value: "教育局2026/27概覽對應青衣校址0001，列上午、下午及全日班、粵語授課和約1:8師生比例。校方另稱提供英語和普通話接觸機會，沒有公開逐語言課時。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1586400001" },
  ] }]),

  profile("589144", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方簡介查核：2026-10", "嶺南幼稚園（小西灣）由東山台校址遷至富怡花園後於2012年以現址辦學。校方列基督教辦學、半日和全日班；教育局概覽列粵語授課。幼兒園部另有2至3歲小組，與K1至K3幼稚園班需區分。", "https://lingnankn.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號589144、富怡花園校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "現址班制、概覽授課語言、師生比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5891440001" },
    { label: "嶺南幼稚園：小西灣校舍簡介", scope: "遷址沿革、宗教、K1至K3班制和創校宗旨。", url: "https://lingnankn.edu.hk/%E5%B9%BC%E7%A8%9A%E5%9C%92%E7%B0%A1%E4%BB%8B%EF%BC%88%E5%B0%8F%E8%A5%BF%E7%81%A3%EF%BC%89/" },
    { label: "嶺南幼兒園：班級簡介", scope: "2至3歲幼兒小組班別，不與K1至K3混為一談。", url: "https://lingnankn.edu.hk/%E5%B9%BC%E5%85%92%E5%9C%92%E7%B0%A1%E4%BB%8B-about-the-nursery/" },
  ], [{ title: "基督教辦學、K1至K3與幼兒小組分流", featured: true, note: "學校曾遷址；現址資料只取小西灣校舍頁。幼兒園PN／小組與幼稚園班級分開表述。", details: [
    { label: "現址校舍沿革和幼稚園學制", value: "校方記錄1992年在東山台辦學，2012年遷至小西灣富怡花園；現有K1至K3半日及全日制。其宗旨以基督教和嶺南教育精神、尊重幼兒發展及啟迪多元智能為方向，屬校方自述。", sourceUrl: "https://lingnankn.edu.hk/%E5%B9%BC%E7%A8%9A%E5%9C%92%E7%B0%A1%E4%BB%8B%EF%BC%88%E5%B0%8F%E8%A5%BF%E7%81%A3%EF%BC%89/" },
    { label: "幼兒園部另有2至3歲小組", value: "同一辦學團體網站另列上午、下午及全日幼兒小組班。這與幼稚園K1至K3級別不同；家庭應按孩子年齡確認申請的是哪一部門、班別及收費。", sourceUrl: "https://lingnankn.edu.hk/%E5%B9%BC%E5%85%92%E5%9C%92%E7%B0%A1%E4%BB%8B-about-the-nursery/" },
    { label: "教育局概覽列粵語與約1:10.3", value: "2026/27概覽對應小西灣校址0001，列上午、下午及全日班、粵語授課和約1:10.3師生比例。其他語言的每日時數未見公開。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5891440001" },
  ] }]),

  profile("231584", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程和招生：2024/25–2026/27", "聖安多尼中英文幼稚園（麗城花園）屬聖安多尼中英文小學暨幼稚園的分校，須與西環校址分開看。麗城校方公布創意思維遊戲課程、文化活動和非華語支援；歷年派位名單不推算整屆比例。", "https://www.belvedere-garden.stanthonyskg.edu.hk/zh/home-%E4%B8%AD%E6%96%87-%E9%A6%99%E6%B8%AF/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號231584及麗城花園登記校址；不套用西環同校名校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "麗城校址班制、概覽授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2315840001" },
    { label: "聖安多尼麗城校園：課程", scope: "高層次思維遊戲、六大範疇、中華文化活動及非華語學生策略。", url: "https://www.belvedere-garden.stanthonyskg.edu.hk/zh/%E8%AA%B2%E7%A8%8B-curriculum/" },
    { label: "聖安多尼麗城校園：招生及聯絡", scope: "麗城獨立校址、收費與接送服務資料。", url: "https://www.belvedere-garden.stanthonyskg.edu.hk/zh/%E6%8B%9B%E7%94%9F-admissions/" },
  ], [{ title: "創意思維課程與校址辨識", featured: true, note: "校方同時有西環和麗城校址；本頁只引用麗城資料。派位結果頁為校方公布個別年度去向，沒有分母時不概括比例。", details: [
    { label: "遊戲活動對應六大學習範疇", value: "校方說明以高層次思維遊戲活動配合語文、個人與群體、幼兒數學、體能健康、大自然生活、藝術創意六大範疇，並安排中華文化參觀活動。家長可觀察教師如何讓孩子表達推理，而非只完成遊戲任務。", sourceUrl: "https://www.belvedere-garden.stanthonyskg.edu.hk/zh/%E8%AA%B2%E7%A8%8B-curriculum/" },
    { label: "全日班費用及交通另作預算", value: "校方招生頁顯示半日班參加幼稚園教育計劃而免學費，頁面列全日班費用及校車服務；費用適用年度需以頁面最新公告核對，書簿、校服和交通另計。", period: "校方招生資料查核：2026-10", sourceUrl: "https://www.belvedere-garden.stanthonyskg.edu.hk/zh/%E6%8B%9B%E7%94%9F-admissions/" },
    { label: "校址0001概覽列英語授課", value: "教育局2026/27概覽對應麗城花園校址0001，列英語授課和約1:7.6師生比例。這是概覽欄位，不等於各科全日以英語授課；實際語言安排宜向該校址查詢。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2315840001" },
  ] }]),

  profile("618594", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方網站查核：2026-10", "仁愛堂鄭丁港夫人幼稚園位於火炭駿洋邨。校方表示以孩子為本，配合戲劇和多元化操作活動，並公布2026/27新生英語體驗活動及申請資訊；舊招生公告的日期不套用至新年度。", "https://www.yotmctk.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號618594、駿洋邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6185940001" },
    { label: "仁愛堂鄭丁港夫人幼稚園：校方宗旨及最新消息", scope: "兒童本位、戲劇元素及2026/27新生英語活動。", url: "https://www.yotmctk.edu.hk/" },
    { label: "仁愛堂鄭丁港夫人幼稚園：招生程序", scope: "全年申請、面見準則及全日班家庭優先條件。", url: "https://www.yotmctk.edu.hk/admission-information/admissions-procedure/" },
  ], [{ title: "戲劇體驗與孩子主動參與", featured: true, note: "戲劇和多元活動依校方自述；英語體驗班屬指定年度活動，並非當屆全體課程時數。", details: [
    { label: "戲劇元素讓孩子在情境中表達", value: "校方表示以兒童為本，透過多元活動和戲劇體驗促進創意思維、自信和品德。參觀時可留意教師是否讓幼兒輪流說、演和作選擇；辦學目標本身不等同獨立成效評估。", sourceUrl: "https://www.yotmctk.edu.hk/" },
    { label: "招生準則含面見與家庭需要", value: "校方招生頁列面見表現、家長認同辦學理念及全日班家庭需要等考慮因素，同時提醒學位有限，符合優先條件不保證錄取。申請時間和註冊日期應依當屆公告。", sourceUrl: "https://www.yotmctk.edu.hk/admission-information/admissions-procedure/" },
    { label: "概覽列粵語與約1:10.6", value: "教育局2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:10.6師生比例。校方的外籍英語活動為額外接觸安排，不應推成整日英語授課。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6185940001" },
  ] }]),

  profile("324850", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與收費：2025/26及現行頁面", "嗇色園主辦可仁幼稚園位於鴨脷洲邨，1982年創辦。校方公開自主學習、自由遊戲、科學探索、戶外體驗及兩文三語課程；2025/26代辦費用頁不當作2026/27核准學費。", "https://www.hoyankg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號324850、鴨脷洲邨校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3248500001" },
    { label: "嗇色園主辦可仁幼稚園：課程簡介", scope: "學生為本、遊戲、科學實驗、戶外活動及兩文三語自述。", url: "https://www.hoyankg.edu.hk/" },
    { label: "嗇色園主辦可仁幼稚園：代辦項目收費", scope: "校方公布的2025/26學費及代辦項目，保留年度。", url: "https://www.hoyankg.edu.hk/fees-list/" },
  ], [{ title: "自主遊戲、科學探索與品德教育", featured: true, note: "教學方式為校方公開課程方向；2025/26費用與2026/27概覽分開呈列。", details: [
    { label: "以幼兒主導活動累積探索經驗", value: "校方稱按幼兒能力、興趣及需要設計活動，透過遊戲、科學實驗、音體美藝和戶外參觀實踐自主學習，另列中華文化、品德教育及自由遊戲板塊。家庭可觀察孩子在活動中能否提問、操作和回顧。", sourceUrl: "https://www.hoyankg.edu.hk/" },
    { label: "語言安排仍要核對日常課表", value: "學校網站列粵語、英語和普通話的兩文三語方向，但未公開各語言每日所佔時間。若家庭重視英語沉浸程度，報名前應直接索取當屆課表，並分清課程接觸與主要授課語言。", sourceUrl: "https://www.hoyankg.edu.hk/" },
    { label: "費用按年度拆分", value: "校方代辦費用頁標示2025/26學費半日班免費、全日班按月收費及膳食費；教育局2026/27概覽提供現屆核准學費。兩個年度不可混作同一收費表，其他用品多屬另計。", period: "校方費用頁：2025/26；概覽：2026/27", sourceUrl: "https://www.hoyankg.edu.hk/fees-list/" },
  ] }]),

  profile("158534", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程資料查核：2026-10", "東華三院徐展堂幼稚園位於上水天平邨。校方以繪本教學、藝術和戲劇元素發展語文與共通能力，並設英語及普通話語言環境；概覽列粵語授課，兩者不代表各語言時數相等。", "https://www.twghtttkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158534、天平邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585340001" },
    { label: "東華三院徐展堂幼稚園：學校特色", scope: "四大發展領域、兩文三語與繪本教學的校方說明。", url: "https://www.twghtttkg.edu.hk/" },
    { label: "東華三院幼稚園：2025/26概覽", scope: "當屆校方資料入口及學校登記名稱。", url: "https://www.twghtttkg.edu.hk/wp-content/uploads/2025/08/2025-26-KG-Profile.pdf" },
  ], [{ title: "繪本、藝術與戲劇教學", featured: true, note: "校方以繪本和表演藝術作課程特色；語言活動頻率未量化。", details: [
    { label: "繪本活動連接語言與共通能力", value: "校方把繪本教學用於設計校內外活動，並將藝術和戲劇融入課程，目標是發展語文、創造力及共通能力。家長可以觀察孩子是否有講述故事、角色扮演和創作的機會。", sourceUrl: "https://www.twghtttkg.edu.hk/" },
    { label: "母語和第二語言環境分開理解", value: "校方稱以粵語等母語活動為基礎，另建立英語及普通話語言環境；教育局概覽欄列粵語授課。網站沒有公布三種語言逐日課時，選校時可索取當屆時間表。", sourceUrl: "https://www.twghtttkg.edu.hk/" },
    { label: "概覽列約1:9.8師生比例", value: "教育局2026/27概覽對應天平邨校址0001，列上午、下午及全日班、粵語授課和約1:9.8師生比例。此數字是概覽統計，不是每班學生人數或招生學額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1585340001" },
  ] }]),

  profile("325830", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方網站查核：2026-10", "深水埗德善幼稚園位於通州街迦南大廈。校方近期網站列支援服務和課室外體驗學習活動入口；本輪公開頁可核的校本課程細節有限，故不把一般德善或同名學校資料套用過來。", "https://www.ssptakshin.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號325830、通州街校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3258300001" },
    { label: "深水埗德善幼稚園：校方網站", scope: "2026年支援服務公告、體驗式學習活動和聯絡資料入口。", url: "https://www.ssptakshin.edu.hk/" },
  ], [{ title: "先確認照顧和支援內容", featured: true, note: "校方網站可見近期支援服務及課室外學習入口，未見足以核實的現屆逐級課程表；相關安排以校方答覆為準。", details: [
    { label: "校方近期公開支援服務資訊", value: "學校網站於2026年更新支援服務消息，並設家長資訊與課室外體驗式學習活動區。公開頁未列服務對象、提供頻率或各級活動安排，家長宜按孩子需要向學校查詢。", period: "校方網站更新：2026-04至2026-10", sourceUrl: "https://www.ssptakshin.edu.hk/" },
    { label: "教育局概覽提供可比的現屆基本欄目", value: "2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:6師生比例。課程、英語／普通話活動、收生準則及最新費用以校方當屆資料為準。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3258300001" },
  ] }]),

  profile("546038", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程：現行網頁及2024/25活動資料", "樂善堂文吳泳沂幼稚園位於秀茂坪秀華樓。校方課程頁列每日英語活動、探索式學習、社區參觀、Kimochis情智教育及奧福音樂；語言接觸的具體分鐘數未公開。", "https://lstmnwy.loksintongkg.edu.hk/zh-hant", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號546038、秀茂坪校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5460380001" },
    { label: "樂善堂文吳泳沂幼稚園：課程簡介", scope: "英語、探索、社區體驗、情智教育與音樂教學自述。", url: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
    { label: "樂善堂文吳泳沂幼稚園：校外體驗活動", scope: "配合品德教育的社區參觀活動例子。", url: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/school_life/activityk3" },
  ], [{ title: "探索式課程與情緒教育", featured: true, note: "校方課程介紹中的語文標籤未換算成每日課時；2024活動例子不當作每學年固定安排。", details: [
    { label: "觀察、操作和驗證串連探索", value: "校方將探索式學習描述為觀察、探索、操作、驗證和分享，並配合社區參觀、Kimochis情智教育及奧福音樂。這些安排把解難、情緒辨識和生活經驗納入課程；現屆各級頻率宜向校方確認。", sourceUrl: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
    { label: "校方稱設每日英語活動", value: "課程頁稱推行粵語和英語雙語班，每天有英語學習活動，並安排外籍教師教授英語及普通話。教育局概覽仍列粵語作授課語言，兩者記錄不同層面；具體英語和普通話課時未公開。", sourceUrl: "https://lstmnwy.loksintongkg.edu.hk/zh-hant/about_us/course-introduction" },
    { label: "概覽列約1:8.8師生比例", value: "教育局2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:8.8師生比例。比例不是固定班額，招生名額按當屆校方公告確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5460380001" },
  ] }]),

  profile("542326", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程及活動：2025/26–2026/27", "香港道教聯合會蓬瀛通善皇后山幼稚園位於粉嶺皇后山邨。校方公開遊戲、生活化主題、繪本及方案教學，並有駐校英語和普通話教師；概覽列粵語授課，並不代表其餘語言沒有活動。", "https://fytsqhkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號542326、皇后山邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5423260001" },
    { label: "蓬瀛通善皇后山幼稚園：教學特色", scope: "兒童本位、生活化主題、綜合課程、遊戲、語言及體能活動。", url: "https://fytsqhkg.edu.hk/" },
    { label: "蓬瀛通善皇后山幼稚園：協作計劃", scope: "語文教育及研究常務委員會英語課程項目和閱讀支援計劃。", url: "https://fytsqhkg.edu.hk/collaborative-plan/" },
  ], [{ title: "生活主題、繪本與三語環境", featured: true, note: "英語和普通話以校方公布的教師及語境安排描述；不推算各語言授課時間。", details: [
    { label: "生活主題、遊戲與方案教學", value: "校方依2017幼稚園課程指引，以兒童為本和生活化主題綜合六大範疇，並用遊戲、主題、方案和繪本教學提供感官探索。家庭可觀察孩子是否有機會把日常經驗轉成提問和表達。", sourceUrl: "https://fytsqhkg.edu.hk/" },
    { label: "英語和普通話由專科教師營造語境", value: "學校表示聘請駐校英語及普通話老師，透過遊戲語境提升幼兒運用兩文三語的信心；協作計劃頁另列英語教育支援。教育局概覽列粵語授課，並未提供逐語言課時。", sourceUrl: "https://fytsqhkg.edu.hk/collaborative-plan/" },
    { label: "皇后山校址及比例按0001概覽", value: "教育局2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:10.5師生比例。該比例不代表每班實際人數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5423260001" },
  ] }]),
];

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

/** Kindergarten profile batch 31: ten unique locally registered schools. */
export const KINDERGARTEN_BATCH_31: PilotSchool[] = [
  profile("156205", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方入學：2026/27", "樂景幼稚園位於荔景邨，校方以尊重、讚美及關係建立作育人方向，並公開2026/27面見和註冊安排。收生優先條件和班別費用只適用於該年度。", "https://www.lokking.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號156205、荔景邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1562050001" },
    { label: "樂景幼稚園：教學使命", scope: "校方使命自述及校址聯絡資料。", url: "https://www.lokking.edu.hk/" },
    { label: "樂景幼稚園：2026/27收生程序", scope: "面見、收生準則、非華語面見支援及註冊費。", url: "https://www.lokking.edu.hk/收生程序/" },
  ], [{ title: "關係教育、面見安排與班別選擇", featured: true, note: "教育理念屬校方自述；收生程序和費用按2026/27頁面，不推作下一屆安排。", details: [
    { label: "教學使命重視尊重和安全感", value: "校方以讚美啟迪智慧、尊重孩子尊嚴、在被愛中學會愛作為使命。家庭可在參觀或面見時觀察教師如何回應孩子的情緒和個別差異；這是辦學方向，不是已獨立評估的成效。", sourceUrl: "https://www.lokking.edu.hk/" },
    { label: "面見包括幼兒與家長", value: "校方2026/27安排所有申請者面見，家長或監護人陪同；網站列禮貌、自理、說話、理解和觀察力作參考，並為非華語家庭按需要提供傳譯／翻譯。", period: "2026/27招生", sourceUrl: "https://www.lokking.edu.hk/收生程序/" },
    { label: "全日班優先條件與費用須分開看", value: "校方列兄姊曾就讀者優先處理；申請全日班時，有家庭需要者可獲優先考慮。2026/27半日班免費，全日班學費以核准資料為準；條件不代表錄取保證。", period: "2026/27招生", sourceUrl: "https://www.lokking.edu.hk/en/admission-criteria/" },
  ] }]),

  profile("578126", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程：網頁查核於2026-10", "柴灣浸信會學前教育中心呂明才幼稚園（小西灣）以靈育和心智培育為辦學方向，校方稱課程靈活多元、培養思考和解難。中心提供半日及全日服務；語言時數須按班別查詢。", "https://www.cwbc.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號578126、小西灣邨瑞富樓校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5781260001" },
    { label: "柴灣浸信會學前教育中心呂明才幼稚園：辦學宗旨", scope: "靈育、幼兒發展、思考及解難方向；小西灣校址。", url: "https://www.cwbc.edu.hk/" },
    { label: "柴灣浸信會學前教育中心：幼稚園服務及2026/27入學安排", scope: "半日／全日服務、校址及當屆招生入口。", url: "https://cwbc.org.hk/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=343&Pid=32&Version=0&page=0" },
  ], [{ title: "靈育、思考訓練與班制查詢", featured: true, note: "辦學目標來自校方自述；校方未在首頁提供各語言的分級課時。", details: [
    { label: "校方以靈育和心智培育定調", value: "校方表示以基督教辦學，按幼兒需要推行靈活多元課程，期望發展潛能並訓練思考和解難。家庭可了解宗教活動在日常課程中的位置，以及課堂如何讓幼兒自己嘗試。", sourceUrl: "https://www.cwbc.edu.hk/" },
    { label: "半日與全日學前服務", value: "校方服務頁列半日班和全日學前服務，並設校車接送。不同班別的午膳、延長照顧和交通收費應按最新通告逐項確認。", sourceUrl: "https://cwbc.org.hk/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=343&Pid=32&Version=0&page=0" },
    { label: "教學語言以概覽和課表分層理解", value: "教育局2026/27概覽按小西灣校址列授課語言及師生比例；校方公開頁未列每日粵語、英語和普通話時數。若家庭以英語沉浸或雙語平衡為主要目標，應索取所申請班別時間表。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5781260001" },
  ] }]),

  profile("153907", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "荃灣聖母幼稚園是天主教辦學，校方2027/28 K1頁公布該屆180個幼兒班名額和親身交表安排。課程以兒童為本，繪本、遊戲和戲劇作教學入口；名額不代表錄取率。", "https://www.twolkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號153907、德華街校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1539070001" },
    { label: "荃灣聖母幼稚園：2027/28招生須知", scope: "該屆K1名額、申請日期、交表方式和註冊文件。", url: "https://www.twolkg.edu.hk/chi/admissions/registration" },
    { label: "荃灣聖母幼稚園：辦學理念與課程", scope: "天主教價值、兒童為本、繪本、遊戲與戲劇教學自述。", url: "https://www.twolkg.edu.hk/eng/school-information/school-vision-mission" },
  ], [{ title: "繪本、遊戲與年度招生規模", featured: true, note: "180個名額只屬2027/28 K1公告；不作長期招生量或錄取率推算。", details: [
    { label: "繪本故事帶入戲劇與遊戲", value: "校方按天主教價值及幼兒發展設計兒童為本課程，透過繪本故事開展主題，再融入戲劇和遊戲，讓幼兒探索與表達。家長可觀察孩子在活動中是否有主動選擇、說出想法和與同伴協作的機會。", sourceUrl: "https://www.twolkg.edu.hk/eng/school-information/school-vision-mission" },
    { label: "2027/28 K1公布180個名額", value: "校方公布2027/28幼兒班名額180人，申請表須於指定日期親身遞交，並提交身份、健康紀錄及照片等文件；個別家庭的宗教文件只在適用情況下提交。", period: "2027/28 K1招生", sourceUrl: "https://www.twolkg.edu.hk/chi/admissions/registration" },
    { label: "申請流程較集中，需提早備妥文件", value: "校方頁列明派表和收表時段，並稱非華語面見可按需要安排翻譯。家長應先核對當屆日期及文件要求，不能把本屆時間表直接套到下一屆。", period: "2027/28 K1招生", sourceUrl: "https://www.twolkg.edu.hk/chi/admissions/registration" },
  ] }]),

  profile("153451", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生：2027/28", "粉嶺神召會幼稚園校方已公布2027/28 K1申請，課程包括專科語文活動、自由遊戲和生命成長挑戰。繩索、攀爬等是校方列出的活動項目，不等於所有幼兒均參與相同時數。", "https://www.aogkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號153451、粉嶺馬會道校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1534510001" },
    { label: "粉嶺神召會幼稚園：2027/28入學申請", scope: "該屆K1申請時間、程序及註冊證提示。", url: "https://www.aogkg.edu.hk/入學申請/2027-28學年幼兒班入學申請須知/" },
    { label: "粉嶺神召會幼稚園：專科專教及生命成長課程", scope: "英語、普通話教學模式和繩索／攀爬挑戰活動。", url: "https://www.aogkg.edu.hk/學與教/專科專教/" },
  ], [{ title: "專科語文、自由遊戲與挑戰活動", featured: true, note: "英語和普通話的活動設計來自校方；逐日課時未公開。", details: [
    { label: "生命成長課程讓孩子練習面對挫折", value: "校方列繩索、攀爬及滑輪拉動等活動，目標是讓孩子在反覆嘗試中面對不安和挫敗。家庭可詢問教師如何按年齡和個別能力調整活動，安全規範亦應於參觀時了解。", sourceUrl: "https://www.aogkg.edu.hk/學與教/生命成長及自我挑戰課程/" },
    { label: "英語與普通話採專科活動", value: "校方介紹英語透過遊戲、兒歌、故事和語音拼讀學習；普通話由專任教師設計教材，以互動遊戲和生活用語練習。校方未公布各級每週時數。", sourceUrl: "https://www.aogkg.edu.hk/學與教/專科專教/" },
    { label: "當屆K1申請已公布", value: "校方網站列2027/28幼兒班入學申請須知及流程。申請家庭應以當屆頁面的派表、面見和註冊日期為準，並向學校確認是否有更新。", period: "2027/28 K1招生", sourceUrl: "https://www.aogkg.edu.hk/入學申請/" },
  ] }]),

  profile("155560", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方活動：2026", "葵涌浸信會幼稚園以基督教價值和家庭關懷為校方公開定位，近期公布英語遊戲體驗日。網站列有劍橋課程入口；實際適用級別、內容與課時需向校方確認。", "https://www.kcbck.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號155560、大隴街校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1555600001" },
    { label: "葵涌浸信會幼稚園：學校概況", scope: "校方教育方向、家庭關懷、劍橋課程入口及近期消息。", url: "https://www.kcbck.edu.hk/" },
    { label: "葵涌浸信會幼稚園：英語遊戲體驗日", scope: "2026年英語遊戲體驗活動公告。", url: "https://www.kcbck.edu.hk/" },
  ], [{ title: "家庭關懷與英語遊戲體驗", featured: true, note: "網站活動公告不代表常設課程或每日英語時數；劍橋課程適用安排待校方確認。", details: [
    { label: "校方把家庭關懷放在學校定位", value: "校方引用聖經箴言作教育信念，表示希望孩子在愛和家庭關懷中健康成長。家長可了解家校溝通、親子活動及校本宗教教育如何安排。", sourceUrl: "https://www.kcbck.edu.hk/" },
    { label: "2026年公布英語遊戲體驗活動", value: "學校於2026年4月公布英語遊戲體驗日。這可作為了解英語活動風格的入口，但單次體驗不能代表全學年英語授課比例。", period: "2026年活動公告", sourceUrl: "https://www.kcbck.edu.hk/" },
    { label: "劍橋課程需查明級別和課時", value: "校方網站設有劍橋課程入口，但公開首頁未交代適用級別、課程內容、頻率或額外費用。教育局概覽授課語言欄與校方課程品牌應分開理解。", sourceUrl: "https://www.kcbck.edu.hk/" },
  ] }]),

  profile("133744", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程：查閱於2026-10", "香港靈糧堂幼稚園銅鑼灣正校以靈育為核心，採主題、方案、高廣度教學和遊戲，設小組、團體及分區學習。幼稚園辦學與同團體分校升學安排不可混為一談。", "https://lingliang.org.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號133744、銅鑼灣禮頓里校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1337440001" },
    { label: "香港靈糧堂幼稚園：課程理念", scope: "靈育、主題教學、高廣度教學、方案教學、遊戲與學習環境。", url: "https://lingliang.org.hk/" },
    { label: "香港靈糧堂幼稚園：銅鑼灣正校", scope: "正校地址與校方資訊；與同團體其他校址分開。", url: "https://lingliang.org.hk/campuses/causeway-bay" },
  ], [{ title: "靈育核心、主題方案與遊戲學習", featured: true, note: "課程為校方自述；資料只對應銅鑼灣正校，不移用其他靈糧堂分校的招生或收生安排。", details: [
    { label: "校方以靈育貫穿課程設計", value: "校方將靈育作核心，以主題教學、方案教學及遊戲串連學習，並稱參照高廣度教學法的核心經驗規劃環境。其公開做法包括團體、小組和分區學習，以及觀察記錄成長。", sourceUrl: "https://lingliang.org.hk/" },
    { label: "自由遊戲提供幼兒自主選擇", value: "校方描述幼兒可自行選擇遊戲內容、同伴和開始時間，並把遊戲與認知、語文、創意和社交發展連結。家長參觀時可觀察教師如何支援遊戲，而非只看教具或活動名稱。", sourceUrl: "https://lingliang.org.hk/" },
    { label: "地址與年度基本資料按正校核對", value: "本頁只對應銅鑼灣禮頓里正校。教育局概覽2026/27按校址0001列當屆班制、語言、師生比例及學費；各分校資料不應套用到正校。", period: "2026/27學年；校址0001", sourceUrl: "https://lingliang.org.hk/campuses/causeway-bay" },
  ] }]),

  profile("548723", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方活動：2025/26–2026/27", "保良局劉陳小寶幼稚園以繪本和探究式學習作公開特色，近期活動紀錄包括STEAM、親子和社區參觀。活動名單只證明校方曾公布，不表示每名幼兒每年均參加。", "https://www.plkkgs.edu.hk/plklcspkg/hk", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號548723、富昌邨富潤樓校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5487230001" },
    { label: "保良局劉陳小寶幼稚園：學校首頁及活動", scope: "課程特色、2026通告、家長活動、STEAM、參觀及校園生活。", url: "https://www.plkkgs.edu.hk/plklcspkg/hk" },
    { label: "保良局：劉陳小寶幼稚園介紹", scope: "探究式學習、興趣活動和辦學團體幼小協作背景。", url: "https://www.poleungkuk.org.hk/service/education/plklcspkg20240905" },
  ], [{ title: "繪本、探究學習與幼小協作", featured: true, note: "校方公開活動為具日期的例子；保良局幼小協作不等於個別小學錄取保障。", details: [
    { label: "繪本和探究活動鼓勵幼兒主動提問", value: "校方及辦學團體介紹以繪本、趣味探究和問題解難引導幼兒探索；公開活動紀錄包括STEAM體驗、親子工作坊和社區參觀。家長可了解活動如何接回班級主題與日常學習。", sourceUrl: "https://www.poleungkuk.org.hk/service/education/plklcspkg20240905" },
    { label: "家長參與是公開校務的一部分", value: "網站列有家長教育課程、義工活動、開放日和親子活動。這反映學校提供多種家校接觸入口，但家庭投入程度和活動名額應以個別通知為準。", sourceUrl: "https://www.plkkgs.edu.hk/plklcspkg/hk" },
    { label: "幼小協作是資源連結，不是升學保證", value: "保良局說明屬下幼稚園與小學透過幼小同盟分享資源和協作。這可增加幼兒接觸小學活動的機會，但不能據此推斷升讀某所小學的優先權或比例。", sourceUrl: "https://www.poleungkuk.org.hk/service/education/po-leung-kuk-kindergarten" },
  ] }]),

  profile("600890", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方資料：查閱於2026-10", "佛教陳策文伉儷幼稚園位於啟德德朗邨，校方設校園360、招生和參觀入口，並以佛教教育背景辦學。公開頁未列足夠當屆課程細節，故不推斷每日教學內容。", "https://www.bccm.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號600890、德朗邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6008900001" },
    { label: "佛教陳策文伉儷幼稚園：校方網站", scope: "學校聯絡資料、招生、參觀和校園設施入口。", url: "https://www.bccm.edu.hk/" },
    { label: "教育局質素評核報告", scope: "教育局曾作質素評核及報告入口；報告結論不延伸為排名。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CCMKG.pdf" },
  ], [{ title: "佛教辦學與參觀核實清單", featured: true, note: "校方現行公開網頁的課程資料有限；以下不把辦學團體通用課程套成本校現行課時。", details: [
    { label: "辦學背景與當屆課程應分別核實", value: "教育局資料確認校址、班制和概覽語言等基本欄位，校方網站提供招生和校園參觀入口。佛教辦學的價值取向可作家庭適配考量；每日宗教教育、主題活動和語言課時宜直接詢問學校。", sourceUrl: "https://www.bccm.edu.hk/" },
    { label: "校園參觀可檢視活動空間", value: "校方網站展示校園360和課室、音樂室、戶外場地等設施影像。照片只能說明校方展示的環境，不能替代實地了解幼兒實際使用安排、自由遊戲時間及教師照顧方式。", sourceUrl: "https://www.bccm.edu.hk/" },
    { label: "教育局概覽數據按年度與校址解讀", value: "2026/27概覽按德朗邨校址列班制、授課語言、師生比例和核准學費；比例不是每班實際人數。若需要確認今年課程和招生名額，應以校方最新公告為準。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6008900001" },
  ] }]),

  profile("599700", "教育局位置及註冊資料：2026-10；概覽：2026/27；課程報告：2024/25；招生：2027/28", "港青基信幼稚園（啟晴）以幼兒聖經基礎課程、生活實踐和創造探究組織學習，校方2024/25報告描述混齡下午活動和持續觀察評估；2027/28入學資訊另行公布。", "https://www.ymcahk.org.hk/ckkc/tc/home/index.html", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號599700、啟晴邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽語言、師生比例及當屆核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5997000001" },
    { label: "港青基信幼稚園：2024/25學校報告", scope: "幼兒聖經基礎課程、生活實踐、創造探究、混齡活動和持續評估自述。", url: "https://www.ymcahk.org.hk/ckkc/filemanager/en/content_817/2024-2025學校報告.pdf" },
    { label: "港青基信幼稚園：2027/28入學資訊", scope: "學校當屆新生招生入口。", url: "https://www.ymcahk.org.hk/ckkc/tc/home/index.html" },
  ], [{ title: "聖經主題、生活實踐與創造探究", featured: true, note: "課程報告為2024/25校方自評；家長問卷比例只屬該年度樣本，不作全體家庭共識。", details: [
    { label: "四個課程範疇連結生活與品格", value: "校方2024/25報告介紹以聖經主題、祈禱時間、生活實踐和創造探究組織課程，並用角色扮演、實驗和參觀延伸學習。這是校方自評描述，未能證明每級每週固定活動次數。", period: "2024/25學校報告", sourceUrl: "https://www.ymcahk.org.hk/ckkc/filemanager/en/content_817/2024-2025學校報告.pdf" },
    { label: "持續觀察取代默書和測驗", value: "校方概覽資料稱不設默書及測驗，透過日常觀察、前中後評和學習檔案記錄幼兒進度，再於學期末與家長分享。家庭可確認現行回饋頻率和個別支援流程。", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/599700c-0001.pdf" },
    { label: "混齡活動與雙語接觸需看班表", value: "2024/25報告列下午混齡活動，也提到英文和普通話教學計劃；未列逐語言日課時。若重視語言比例或孩子在混齡情境的適應，應索取本年度時間表。", period: "2024/25學校報告", sourceUrl: "https://www.ymcahk.org.hk/ckkc/filemanager/en/content_817/2024-2025學校報告.pdf" },
  ] }]),

  profile("153931", "教育局位置及註冊資料：2026-10；概覽：2026/27；質素評核：教育局已發布報告", "惠平幼稚園位於坪洲，教育局註冊資料確認為全日制、男女校；教育局曾發布質素評核報告。校方網站本輪未能提供足夠可讀課程細節，因此只補官方可核的基本與評核資料。", "http://www.waipeng.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號153931、坪洲地址、全日授課和登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1539310001" },
    { label: "教育局質素評核報告：惠平幼稚園", scope: "教育局評核報告原文；只供讀者了解評核時的觀察，不等於當屆結果或排名。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WaiPeng.pdf" },
    { label: "教育局學校搜尋：惠平幼稚園", scope: "校號153931、校址0001及官方登記欄位。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=153931000111" },
  ], [{ title: "離島全日制資料與公開內容邊界", featured: true, note: "校方官方網站本輪可讀課程資料有限；不以第三方學校介紹或其他坪洲學校課程填補。", details: [
    { label: "坪洲全日制校址", value: "教育局學校搜尋列惠平幼稚園校號153931、坪洲志仁里8號C、全日授課和註冊狀態。離島通勤需另外規劃船程、校車／接送及天氣備案，並直接向學校確認接送支援。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=153931000111" },
    { label: "教育局曾發布質素評核報告", value: "教育局公開質素評核報告入口，可供家長查看評核時的觀察與跟進建議。報告具有評核日期邊界，不應當作2026/27每班現況或學校排名。", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/WaiPeng.pdf" },
    { label: "課程特色與收生詳情需向校方確認", value: "教育局2026/27概覽列當屆班制、語言、比例和學費欄位；校方網站本輪未能提供足以核實課程特色與招生流程的公開頁面。家長可向學校索取本年度課程簡介、日課表及收費表。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1539310001" },
  ] }]),
];

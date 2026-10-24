import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  dataYear: string,
  sourceNote: string,
  sources: PilotSchool["sources"],
  detailSections: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear, sourceNote, appendDirectoryDetails: true, sources, detailSections };
}

/** Official-source profile supplements reviewed in kindergarten batch 19. */
export const KINDERGARTEN_BATCH_19: PilotSchool[] = [
  profile("325414", "教育局概覽：2026/27；校方課程與2025/26校訊查核：2026-10", "學校特色頁及2025/26校訊均以鑽石山啟鑽苑校址為對象；繪本教學、兩文三語和非華語支援均按校方自述介紹，未把校方目標寫成獨立成效。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號325414、啟鑽苑校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：東華三院韋祥智紀念幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3254140002" },
    { label: "東華三院韋祥智紀念幼稚園：學校特色", scope: "繪本教學、課程、兩文三語和辦學方向。", url: "https://wcc-kindergarten.edu.hk/" },
    { label: "東華三院韋祥智紀念幼稚園：非華語支援與收生指南", scope: "指定校址的面見傳譯、中文學習支援及校園資料。", url: "https://wcc-kindergarten.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
    { label: "東華三院韋祥智紀念幼稚園：2025/26校訊", scope: "學校當屆以繪本連結語文與生活的校長訊息。", url: "https://wcc-kindergarten.edu.hk/wp-content/uploads/2025/11/%E6%9D%B1%E8%8F%AF%E4%B8%89%E9%99%A2%E9%9F%8B%E6%99%BA%E7%A5%A5%E7%B4%80%E5%BF%B5%E5%B9%BC%E7%A8%9A%E5%9C%92_25-26%E6%A0%A1%E8%A8%8A_%E7%AC%AC%E4%B8%80%E6%9C%9F.pdf" },
  ], [{ title: "繪本閱讀與關愛社群", featured: true, note: "課程與支援為校方自述；校訊內容標明2025/26，不作長期固定安排推論。", details: [
    { label: "繪本作為綜合課程的入口", value: "校方稱教師按幼兒能力、需要、興趣和生活經驗選擇繪本，再從故事設計多元活動；2025/26校訊亦把閱讀和關愛社群並列為校本主題。家長可問各級如何從故事延伸至口語、藝術和生活探索。", period: "2025/26校訊；校方現行特色頁", sourceUrl: "https://wcc-kindergarten.edu.hk/" },
    { label: "校方提供英文語境及非華語面見協助", value: "學校特色頁介紹英語活動，收生指南則說明可按需要安排傳譯／翻譯，也接受懂中文親友陪同。指南並列繪本、戲劇和自由遊戲作中文學習支援例子；實際支援內容須由家長按孩子需要與校方確認。", sourceUrl: "https://wcc-kindergarten.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
    { label: "新校舍面積和課室數是設施資料，不是班額", value: "校方收生指南稱校園面積逾9,000平方呎，設7個課室和2個多用途室。設施數不能直接換算當屆學額或班級人數；申請前應按年級及時段查詢招生名額。", sourceUrl: "https://wcc-kindergarten.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
  ] }]),

  profile("157074", "教育局概覽：2026/27；校方理念與活動頁查核：2026-10", "校方公開理念以愉快學習、關愛和孩子主動探索為重點，並公布2026/27課程體驗活動；活動日期已過，不作現行招生安排或名額依據。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號157074、屯門友愛邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：路德會呂祥光幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1570740001" },
    { label: "路德會呂祥光幼稚園：校長的話", scope: "愉快學習、關愛陪伴及啟發性課程理念。", url: "https://www.lckk.edu.hk/l/fada9CQpRDw" },
    { label: "路德會呂祥光幼稚園：2026/27課程體驗活動", scope: "校方當時為準新生安排的英文課程體驗日；活動已過期。", url: "https://www.lckk.edu.hk/a/fa4c1DQ9TAQ" },
  ], [{ title: "關愛陪伴與愉快學習", featured: true, note: "此校公開頁以辦學理念和活動為主，未提供可核實的現行語言課時或詳細課程時間表。", details: [
    { label: "以愉快學習作為校方核心理念", value: "校長的話把孩子視為獨特個體，強調關愛陪伴、主動發現和積極嘗試，並希望讓孩子從活動中的成功感累積自信。這是校方的教育定位；參觀時可留意孩子是否有選擇、嘗試和分享的空間。", sourceUrl: "https://www.lckk.edu.hk/l/fada9CQpRDw" },
    { label: "英文體驗活動只能證明曾有該項安排", value: "校方2026/27活動頁曾邀請新生參與英文課程體驗日，內容包括遊戲和互動。活動已於2025年公布並已結束，不能據此推斷現屆英語課時或日常主要授課語言；如語言環境是選校重點，應向校方索取當屆課表。", period: "2026/27新生體驗活動；公告日期2025-09", sourceUrl: "https://www.lckk.edu.hk/a/fa4c1DQ9TAQ" },
    { label: "可先問清家庭與校方的合作方式", value: "校方把家長視為同行的教育夥伴。家長可進一步了解家校溝通、幼兒適應和教師回饋的安排；網站未列出固定會面頻率，故不作推定。", sourceUrl: "https://www.lckk.edu.hk/l/fada9CQpRDw" },
  ] }]),

  profile("155624", "教育局概覽：2026/27；校方課程及2027/28招生頁查核：2026-10", "學校辦學理念、遊戲學習、半日班資料和學校發展均取自元朗信義會生命幼稚園校方網站。2026/27招生簡章和其日期僅作已標年份的例子，不推作2027/28安排。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號155624、元朗安信街校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：元朗信義會生命幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1556240001" },
    { label: "元朗信義會生命幼稚園：辦學理念與質素評核", scope: "1974年創辦背景、基督教全人教育方向及2025年教育局質素評核摘要。", url: "https://lifekg.edu.hk/%E8%83%8C%E6%99%AF/" },
    { label: "元朗信義會生命幼稚園：申請入學與班級", scope: "校方列出的K1至K3、半日制、班級編制和上課時段。", url: "https://lifekg.edu.hk/%E7%94%B3%E8%AB%8B%E5%85%A5%E5%AD%B8/" },
    { label: "元朗信義會生命幼稚園：2026/27招生簡章", scope: "該屆K1下午班自願英語增潤課程、時數和招生程序。", url: "https://lifekg.edu.hk/wp-content/uploads/2025/09/%E6%8B%9B%E7%94%9F%E7%B0%A1%E7%AB%A0%E4%B8%AD%E6%96%8711-9-2025%E6%9B%B4%E6%96%B0.pdf" },
  ], [{ title: "全人教育與生活化學習", featured: true, note: "2026/27招生簡章只用於說明該屆自願課程；不得外推至2027/28或其他班別。", details: [
    { label: "信義會辦學方向重視全人和服務", value: "學校自述自1974年起以基督教香港信義會的全人成長教育為方向，重視靈性、德智體群美發展和按幼兒發展培育潛能。這是辦學理念，不等於第三方評級；家庭可衡量是否接受宗教教育融入校園。", sourceUrl: "https://lifekg.edu.hk/%E8%83%8C%E6%99%AF/%E8%BE%A6%E5%AD%B8%E7%90%86%E5%BF%B5-school-background/" },
    { label: "K1至K3採半日制，18班是校方列明的班級編制", value: "校方入學頁列初、低、高三級共18班、每班容額30人，並列上午和下午時段。這是該頁公布的註冊班級編制，並非新一屆K1空缺數，也不能用來推算錄取機會。", sourceUrl: "https://lifekg.edu.hk/%E7%94%B3%E8%AB%8B%E5%85%A5%E5%AD%B8/" },
    { label: "英語增潤屬2026/27下午K1自願安排", value: "該屆招生簡章稱下午初班有英語增潤課程，每週1至2節、每節45分鐘，課程免費但教材另購，留校參加屬自願。這不是全校日常英語課時比例，也不代表2027/28沿用同一安排。", period: "2026/27招生簡章", sourceUrl: "https://lifekg.edu.hk/wp-content/uploads/2025/09/%E6%8B%9B%E7%94%9F%E7%B0%A1%E7%AB%A0%E4%B8%AD%E6%96%8711-9-2025%E6%9B%B4%E6%96%B0.pdf" },
  ] }]),

  profile("157864", "教育局概覽：2026/27；校方課程和校務頁查核：2026-10", "校方課程頁列體驗探索、外籍英語教師、普通話專科、創科遊戲室、情智教育和戶外活動；課程特色是校方自述，沒有轉寫為教學成效保證。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號157864、美城苑校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：樂善堂梁泳釗幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1578640001" },
    { label: "樂善堂梁泳釗幼稚園：課程簡介", scope: "體驗探索、兩文三語、創科智能遊戲、藝術、環保和情智教育。", url: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
    { label: "樂善堂梁泳釗幼稚園：學校簡介", scope: "校訓、兒童為本及德智體群美課程綱領。", url: "https://www.lstslkg.edu.hk/zh-hant/about_us/school_profile" },
  ], [{ title: "體驗探索與創科遊戲", featured: true, note: "英語、普通話課程由校方描述；沒有課時合計，不推算語言主次。", details: [
    { label: "動手探索與生活題材相連", value: "校方稱依幼兒生活經驗和興趣設計活動，安排參觀和主題體驗，讓幼兒從做中學。家長可問孩子是否參與提出問題、操作材料和回顧結果，而不只旁觀成人示範。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
    { label: "校方列出創科與情緒社交課程", value: "課程頁介紹編程玩具、每週Smart Play Day小實驗、Kimochis情智教育和環保生命教育。這些是校方公開的課程設計；每級參與頻率、分組方式和活動年度應在參觀時確認。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
    { label: "英語每天、普通話由專科教師教授", value: "校方課程頁稱設五天駐校外籍英語教師及普通話專科教師，並列出唱遊、故事和拼音等活動。頁面沒有列各級每週課時，故不能判斷全日主要授課語言或兩種語言是否等量。", sourceUrl: "https://www.lstslkg.edu.hk/zh-hant/about_us/curriculum" },
  ] }]),

  profile("158909", "教育局概覽：2026/27；校方辦學理念頁查核：2026-10", "校方現行可讀介紹聚焦於基督教服務、探索學習、創意思維和同儕關係；招生指南可見的具體流程屬2026/27並已過期，未作現行招生依據。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號158909、富亨邨亨泰樓校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：富亨浸信會呂郭碧鳳幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1589090001" },
    { label: "富亨浸信會呂郭碧鳳幼稚園：校長心聲", scope: "辦學背景、探索學習、創意思維、社交及家校合作方向。", url: "https://www.fuhengkg.edu.hk/%E6%A0%A1%E9%95%B7%E5%BF%83%E8%81%B2/" },
    { label: "富亨浸信會呂郭碧鳳幼稚園：官方首頁", scope: "學校校訓、聯絡資料與招生入口。", url: "https://www.fuhengkg.edu.hk/" },
  ], [{ title: "探索學習與基督教關愛", featured: true, note: "校方介紹提供辦學方向，未提供現行完整課程及語言課時；不採用過期招生頁中的具體日期。", details: [
    { label: "校方以基督教關愛和全人成長為方向", value: "校方稱以基督的愛服務區內家庭，並按兒童需要編制課程，重視品格、價值觀和接納他人。家庭應把宗教教育納入適配考量；網站未提供宗教活動在每週時間表中的比重。", sourceUrl: "https://www.fuhengkg.edu.hk/%E6%A0%A1%E9%95%B7%E5%BF%83%E8%81%B2/" },
    { label: "探索活動是校方明確的學習目標", value: "校長介紹把探索精神、創意思維和同儕人際關係列為培育方向，並提及完善設備和豐富學習環境。這些是學校的自我描述，不是對個別幼兒發展結果的保證；家長可參觀時觀察孩子如何使用設施。", sourceUrl: "https://www.fuhengkg.edu.hk/%E6%A0%A1%E9%95%B7%E5%BF%83%E8%81%B2/" },
    { label: "當屆班制和招生條件需另行確認", value: "校方首頁設招生入口，但可讀的詳細收生流程頁為2026/27。家庭應向學校索取2027/28最新班別、全日服務和申請安排，不能把舊優先條件當成現行政策。", period: "詳細公開招生頁：2026/27；已非下一屆安排", sourceUrl: "https://www.fuhengkg.edu.hk/" },
  ] }]),

  profile("622869", "教育局概覽：2026/27；校方學校背景與班級頁查核：2026-10", "校方頁介紹尖沙咀校址、K1至K3年齡和上午／下午／全日時段；網頁未列最新年度費用或各級實際學額，故不作推算。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號622869、彌敦道校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：卓爾中英文幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6228690001" },
    { label: "卓爾中英文幼稚園：學校背景及班級編制", scope: "辦學團體、校園設施、K1至K3年齡及上課時段。", url: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
    { label: "卓爾中英文幼稚園：官方首頁", scope: "學校資料、校務公告及收生入口。", url: "https://www.smartkidskg.edu.hk/en/index.php" },
  ], [{ title: "校舍配置與班制選擇", featured: true, note: "學校背景頁提供班制和校園描述，沒有課程細節和現行收費表；家長應再向校方索取目標年級資料。", details: [
    { label: "K1至K3均列上午、下午和全日時段", value: "校方頁列K1至K3年齡範圍約3至6歲，上午9時至12時、下午1時30分至4時30分、全日9時至4時30分。這些是校方公布的班級時間，不能理解為每個時段當屆仍有學位。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
    { label: "位於尖沙咀，校方稱有兩層校園空間", value: "校方介紹學校位於尖沙咀彌敦道，校園分兩層並設教學課室及室內外活動場地。對跨區家庭，通勤和接送比場地描述更值得先核實；官方頁未提供交通或校車範圍。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
    { label: "中英文校名不能代替語言課時資料", value: "校名為中英文幼稚園，但學校背景頁沒有列各語言授課時數或日常使用比例。若家庭希望以英語作主要語言環境，應直接查詢目標級別課表和教師配置。", sourceUrl: "https://www.smartkidskg.edu.hk/tc/content.php?wid=49" },
  ] }]),

  profile("516627", "教育局概覽：2026/27；校方課程與班級頁查核：2026-10", "嘉福校方課程頁說明自主遊戲、劍橋英語、奧福音樂及閱讀計劃；校方兩個官方頁對「學額」數字口徑不一，故沒有把網站上的靜態總數寫成現行招生額。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號516627、嘉盛苑校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：九龍城浸信會嘉福幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5166270001" },
    { label: "九龍城浸信會嘉福幼稚園：課程特色", scope: "兒童本位、品德、自主遊戲、劍橋英語、奧福音樂及朗讀計劃。", url: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "九龍城浸信會嘉福幼稚園：班級及學校背景", scope: "K1至K3班制、上課時段和學校背景；校方公開頁的學額總數與另一頁數字口徑不同。", url: "https://www.kafukkg.com/aboutus/" },
  ], [{ title: "自主遊戲與語文閱讀", featured: true, note: "校方不同網頁列出不同學額數字，本頁不採用；每屆班額和招生空缺應直接向校方查詢。", details: [
    { label: "自主遊戲讓孩子操作和合作", value: "校方設自主遊戲時間，讓幼兒使用低結構物料與同伴合作交流，並把遊戲作為建構知識和技能的策略。家庭可觀察教師如何介入、孩子能否延續自己的想法，以及遊戲後如何回顧。", sourceUrl: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "英語、閱讀和音樂有校本課程設計", value: "課程頁列劍橋英語、家長與孩子共讀、K2及K3自主朗讀，以及奧福音樂活動。這些是校方公布的課程項目；若家庭關心英語授課比例或全日班安排，仍需索取當屆時間表。", sourceUrl: "https://www.kafukkg.com/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "全日班與半日班都涵蓋K1至K3", value: "校方班級資料頁列上午、下午及全日班，三個年級均有對應時段。由於另一官方介紹頁列出的靜態學額數與班級頁不同，這裡只保留班制，不將學額數用作當屆招生名額。", sourceUrl: "https://www.kafukkg.com/aboutus/" },
  ] }]),

  profile("158577", "教育局概覽：2026/27；校方課程頁查核：2026-10", "太和宣道幼稚園課程頁詳述主題／小組、自由遊戲、情緒社交及英語活動；頁面引用2017課程指引屬課程依據，不代表當屆招生和班額。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號158577、太和邨新和樓校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：基督教宣道會太和幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585770001" },
    { label: "基督教宣道會太和幼稚園：課程特色", scope: "主題及小組教學、六大學習範疇、自由遊戲、3Es情緒社交和英語活動。", url: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "基督教宣道會太和幼稚園：學校簡介", scope: "1989創校背景、基督教辦學方向及品德教育。", url: "https://www.cmtwkg.edu.hk/" },
  ], [{ title: "主題探索與情緒社交", featured: true, note: "課程頁為校方自述；沒有各語言每週課時表，不推算粵語、英語或普通話佔比。", details: [
    { label: "實物、戶外觀察和小組教學並用", value: "校方稱以幼兒生活經驗及興趣設計主題，透過實物、戶外觀察和參觀鼓勵主動參與。課程把六大學習範疇連在一起，家長可問各級主題如何延伸到日常遊戲和幼兒自己的提問。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "自由遊戲和3Es計劃關注自我調節", value: "校方課程頁介紹以遊戲工作為基礎的自由遊戲，並列與教育局合作的3Es情緒及社交技巧計劃。這說明校方設計方向；個別支援方式、轉介條件和現屆服務需向學校確認。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "英文繪本和外語教師是校方列出的活動", value: "學校介紹外語教師教授拼音、會話、唱歌和故事，並提到低、高班參與學前優質英語教學計劃。頁面沒有列各級英語課時或日常溝通語言比例，不宜把它概括成全英語環境。", sourceUrl: "https://www.cmtwkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
  ] }]),

  profile("151009", "教育局概覽：2026/27；校方課程及班級頁查核：2026-10", "聖母無玷聖心幼稚園公布蒙特梭利、主題活動、高班專題研習及K1至K3語言教師安排；課程細節是校方自述，沒有把教師配置推算成語言課時。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號151009、沙田文禮路校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：聖母無玷聖心幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1510090001" },
    { label: "聖母無玷聖心幼稚園：課程及教學法", scope: "主題活動、蒙特梭利、K3專題研習、英語及普通話教師、學習評估。", url: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
    { label: "聖母無玷聖心幼稚園：班級編制", scope: "校方所述半日制和年級班型入口。", url: "https://www.ihmk.edu.hk/tc/class-arrangement" },
  ], [{ title: "蒙特梭利與高班專題研習", featured: true, note: "語言教師配置按校方課程頁呈現；各語言實際授課時間仍須查閱當屆課表。", details: [
    { label: "生活主題、遊戲和教具引導幼兒探索", value: "校方稱以八個生活化主題組織活動，結合遊戲、藝術、戶外參觀和蒙特梭利教具，並由教師觀察幼兒需要作個別引導。家長可問教具操作是否有固定工作周期，以及教師如何記錄個別進度。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
    { label: "高班設專題研習，重點是幼兒主導過程", value: "學校表示K3會以討論、分組、實驗和成果分享進行專題研習，讓幼兒練習探索、合作和解難。這是高班課程安排說明，家長可詢問當屆主題如何選擇，以及孩子的個人參與如何呈現。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
    { label: "各級有普通話及外籍英語教師", value: "校方稱K1至K3各級除兩位班主任外，另有普通話和外籍英語教師。這描述人手配置，不等於兩種語言課時相等，也不能判斷日常課堂以哪種語言為主。", sourceUrl: "https://www.ihmk.edu.hk/tc/curriculum-and-teaching-pedagogy" },
  ] }]),

  profile("157791", "教育局概覽：2026/27；校方課程及2027/28招生頁查核：2026-10", "彩蒲幼稚園校方頁列遊戲、親身體驗和觀察評估，並已公布2027/28招生訊息；班制、語言和收費仍按當屆教育局概覽及校方正式文件核對。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號157791、彩蒲苑校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：神召會華人同工聯會彩蒲幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1577910001" },
    { label: "神召會華人同工聯會彩蒲幼稚園：課程資料", scope: "兒童本位、遊戲、團隊活動、親身探索和持續觀察評估。", url: "https://choipokg.edu.hk/en/curriculum/" },
    { label: "神召會華人同工聯會彩蒲幼稚園：學校設施", scope: "註冊課室數、探索區、大肌肉室、圖書室及家長資源室。", url: "https://choipokg.edu.hk/about/about-facilities/" },
    { label: "神召會華人同工聯會彩蒲幼稚園：2027/28招生", scope: "當屆K1報名時間及非華語申請人翻譯支援入口。", url: "https://choipokg.edu.hk/admissions/" },
  ], [{ title: "遊戲、探索與中文學習支援", featured: true, note: "課程頁有部分英文標題，但課程及設施說明均對應彩蒲苑校址；招生條件僅適用2027/28。", details: [
    { label: "以遊戲和親身經驗建立概念", value: "校方稱依循幼稚園教育課程指引設計兒童本位課程，透過遊戲、小組活動、網上學習和第一身探索建立知識；K1不要求機械抄寫或操練計算。家長可查詢各級如何安排書寫和數學活動。", sourceUrl: "https://choipokg.edu.hk/en/curriculum/" },
    { label: "校舍設有多種探索及家長支援空間", value: "校方設施頁列6個註冊課室，以及大肌肉室、唱遊室、圖書室、綜合區、電腦區、探索區和家長資源室。這是場地資料，不表示每班每日都使用所有空間；可向校方查詢輪用頻率。", sourceUrl: "https://choipokg.edu.hk/about/about-facilities/" },
    { label: "非華語申請可查詢翻譯安排", value: "校方招生頁提供傳譯／翻譯服務聯絡方式，課程頁則提及持續觀察並向家長和教師記錄幼兒學習。申請家庭可確認面見語種、課程內的中文支援和評估回饋如何實施。", period: "2027/28招生入口；校方現行課程頁", sourceUrl: "https://choipokg.edu.hk/admissions/" },
  ] }]),
];

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
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的版本與更新資訊。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記狀態及校址識別；名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 57: exact school numbers and campus-specific sources. */
export const KINDERGARTEN_BATCH_57: PilotSchool[] = [
  profile("547069", "按教育局校號547069及旺角弼街56號望覺基督教大樓校址識別。校方公布2026/27及2027/28招生入口；課程與活動以校方自述為準，歷年比賽或校友消息不當作一般學生結果。", "https://mkcjk.ccc.edu.hk/", [
    { label: "中華基督教會望覺堂賢貞幼稚園：校方網站", scope: "校訓、課程特色、活動與2026/27、2027/28招生入口。", url: "https://mkcjk.ccc.edu.hk/" },
    { label: "中華基督教會望覺堂賢貞幼稚園：聯絡我們", scope: "旺角弼街56號望覺基督教大樓地下、一樓及三樓的校址和聯絡資料。", url: "https://mkcjk.ccc.edu.hk/contact-2/" },
  ], [{ title: "基督教辦學與學習活動", featured: true, details: [
    { label: "校方以聖經校訓說明品格教育方向", value: "校方以箴言校訓作為辦學表述，並設有課程特色、中華文化活動和親子參觀等內容。這些資料說明學校希望傳遞的價值與活動形式，不能推斷每名幼兒的參與頻率或學習成果。參觀時可詢問宗教故事、節日活動如何融入日常課程，並觀察孩子是否適應其表達方式。", sourceUrl: "https://mkcjk.ccc.edu.hk/" },
    { label: "目前開放跨年度申請，程序仍須看當屆通告", value: "校方網站列出2026/27及2027/28入學申請入口，並另設插班資訊。申請表、面見形式、註冊文件和截止日期會隨年度調整；如正安排下一屆報名，先查看該年度頁面，再向校方確認面見和註冊要求。", period: "校方網站所列招生年度：2026/27、2027/28", sourceUrl: "https://mkcjk.ccc.edu.hk/" },
  ] }]),

  profile("519634", "按教育局校號519634及將軍澳煜明苑熹明閣地下識別。校方課程頁介紹繪本、雙語語境和基督少年軍小綿羊隊；英語拼音及活動安排屬校方公布內容，頁面未提供各級逐週課時。", "https://www.hkccclk.edu.hk/", [
    { label: "香港華人基督會煜明幼稚園：課程設計", scope: "校方公布的繪本教學、英語拼音、普通話、戶外參觀及品格教育內容。", url: "https://www.hkccclk.edu.hk/課程設計/" },
    { label: "香港華人基督會煜明幼稚園：校方首頁", scope: "校址、聯絡方式、兒童為本及雙語教學的學校自述。", url: "https://www.hkccclk.edu.hk/" },
  ], [{ title: "繪本、語文與品格教育", featured: true, details: [
    { label: "繪本延伸語文和品格學習", value: "校方把繪本課程與品格培育相連，並介紹英語拼音、普通話、體能及音樂活動；英語拼音由K1開始的描述見校方課程頁。對重視語言接觸的家庭，這能說明課程元素，但不是英語主導的證明；報名前宜索取當屆各級時間表。", sourceUrl: "https://www.hkccclk.edu.hk/課程設計/" },
    { label: "基督少年軍小綿羊隊屬校方課程特色", value: "校方介紹隊制服團隊以聖經、品格、詩歌、祈禱和步操作活動內容。若家庭希望了解宗教教育的實際比重，可詢問活動是否適用所有學生、安排頻率，以及幼兒不參與時的替代安排。", sourceUrl: "https://www.hkccclk.edu.hk/課程設計/" },
  ] }]),

  profile("158836", "按教育局校號158836及屯門兆畦苑兆強閣地下校址識別。校方自述創校於1990年，並公布辦學理念、校園活動及2026年獲「守護兒童優質學校」殊榮；可讀到的課程介紹頁沒有列出具體教學流程，故不作延伸推測。", "https://www.lstcymck.edu.hk/", [
    { label: "樂善堂張葉茂清幼稚園：校方首頁及學校簡介", scope: "創校年份、辦學理念、校訓、校舍地址及近期校園消息。", url: "https://www.lstcymck.edu.hk/" },
    { label: "樂善堂張葉茂清幼稚園：課程介紹", scope: "校方課程頁入口；頁面未提供可核實的逐級課程細節。", url: "https://www.lstcymck.edu.hk/zh-hant/about_us/curriculum" },
  ], [{ title: "辦學理念與資料邊界", featured: true, note: "校方課程介紹頁目前未列出具體課程內容，本段不以同辦學團體其他幼稚園資料代填。", details: [
    { label: "校方以「仁、愛、勤、誠」及全人發展描述辦學方向", value: "學校介紹提到1990年創校，秉承樂善堂興學育才理念，以「仁、愛、勤、誠」為校訓，並以安全、健康、互動環境作辦學方向。這些是學校自我定位，不代表可直接比較教學成效；家長可在參觀時了解日常課程如何落實品格教育和幼兒自主。", sourceUrl: "https://www.lstcymck.edu.hk/" },
    { label: "校方公布兒童守護認可，課程細節仍宜面談核實", value: "校方於2026年10月公布獲國際培幼會頒發「守護兒童優質學校」殊榮；這是安全與兒童保障方面的認可，不是學術排名。校方課程介紹頁目前沒有展示各級教學流程，若你重視語言、遊戲和評估方式，建議直接索取當屆課程簡介。", period: "校方消息：2026-10-02", sourceUrl: "https://www.lstcymck.edu.hk/" },
  ] }]),

  profile("159018", "按教育局校號159018及天水圍天耀邨耀興樓A、B翼地下識別。校方網站有2027/28招生、學習特色與學生支援資訊；網站呈現的小一銜接、社工及非華語支援是校方服務介紹，不代表每名家庭必然使用或獲得相同安排。", "https://www.ylmakg.info/", [
    { label: "元朗商會幼稚園：學校背景與特色", scope: "校方辦學理念、遊戲和主題教學、校園地址及聯絡資料。", url: "https://www.ylmakg.info/en/about-school" },
    { label: "元朗商會幼稚園：學生支援", scope: "小一適應、非華語學生支援、駐校社工和到校學前康復服務的校方介紹。", url: "https://www.ylmakg.info/support" },
    { label: "元朗商會幼稚園：2027/28入學申請", scope: "校方目前列出的招生流程、面見日期及參觀安排；報名前應確認有沒有更新。", url: "https://www.ylmakg.info/2026-2027學年入學申請" },
  ], [{ title: "遊戲學習與家庭支援", featured: true, details: [
    { label: "校方以兒童為本，把主題探索和遊戲經驗連在一起", value: "學校介紹以兒童為本的綜合課程，透過主題、遊戲和生活體驗帶出語言、情感、社交、體能及創意發展；官方資料亦展示戶外參觀和腦科學／思維教學內容。這些是校方公布的課程安排，家長可到校了解如何分配自由遊戲、教師引導與紙筆活動。", sourceUrl: "https://www.ylmakg.info/en/about-school" },
    { label: "支援服務涵蓋升小適應與個別需要", value: "校方列出高班模擬小學上課、家長參觀和升小講座，亦介紹非華語中文支援、駐校社工及到校學前康復服務。支援方式和服務名額可能按年度及個別需要調整；若家庭有具體需要，應在申請前確認服務資格、接觸頻率和轉介流程。", period: "社工合作資料：校方稱自2024年9月起；服務安排需向校方確認", sourceUrl: "https://www.ylmakg.info/support" },
  ] }]),

  profile("524204", "按教育局校號524204及天水圍天慈邨慈心樓B、C翼地下識別。2026/27教育局概覽用於班制、語言、師生比例和收費；目前可讀到的詳細教學資料來自2023年概覽，頁面明確保留年份，不把舊課程敘述當作現況。", "http://www.blwmwk.edu.hk", [
    { label: "教育局《幼稚園概覽2023/24》：佛教林黃明慧幼稚園", scope: "當年學校申報的課程規劃、學習模式和非華語支援內容；不是現屆教學承諾。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/524204c-0001.pdf" },
    { label: "佛教林黃明慧幼稚園：網上入學申請平台", scope: "校方網上申請入口和申請文件要求；動態申請期以最新頁面為準。", url: "https://admission.ekinder.com.hk/blwmwk" },
    { label: "教育局學校搜尋：佛教林黃明慧幼稚園", scope: "校號、校址、區域、學校類別和官網網址。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=5242040001" },
  ], [{ title: "佛教辦學與舊年度課程資料", featured: true, note: "此校目前未找到可讀取的校方課程介紹頁；下述具體教學描述僅代表教育局2023/24概覽中的學校申報。", details: [
    { label: "2023/24概覽記錄以兒童為本和主題研習", value: "教育局2023/24概覽所載的校方資料提到，以兒童能力、需要、興趣和生活經驗規劃課程，透過主題教學和專題研習鼓勵互動；並稱幼兒班不要求執筆寫字或機械式抄寫、計算。這是舊年度資料，不能確認現屆是否完全延續；報名前應向校方索取新課程簡介。", period: "教育局概覽：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/524204c-0001.pdf" },
    { label: "非華語支援資料亦須按現屆確認", value: "同一份概覽提及校方當時以中文語言環境、家校溝通和共融活動支援非華語家庭。概覽沒有證明目前人手、語言服務頻率或個別支援名額；如家庭需要翻譯或中文學習協助，應在面見前直接核實。", period: "教育局概覽：2023/24；非現行服務承諾", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/524204c-0001.pdf" },
  ] }]),

  profile("536911", "按教育局校號536911及香港堅道75號地下至二樓識別香港真光幼稚園（堅道）。校方課程頁介紹繪本、每週普通話小組、每日英語小組和每年兩次方案研習；頁面未標明更新年度，家長應確認2026/27實際課表。", "https://www.truelightk-c.edu.hk/", [
    { label: "香港真光幼稚園（堅道）：課程簡介", scope: "繪本、英文及普通話小組、方案研習和持續觀察評估的校方說明。", url: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
    { label: "香港真光幼稚園（堅道）：最新消息與招生", scope: "校方近期公告及2027/28招生入口；動態日期以最新通告為準。", url: "https://www.truelightk-c.edu.hk/" },
  ], [{ title: "繪本研習與兩文三語", featured: true, details: [
    { label: "英語和普通話均有小組時段，粵語繪本承接主題探索", value: "校方課程介紹稱，繪本會以粵語和普通話發音，引導思考、表達、解難和創作；全職外籍英文教師每天以小組形式授課，普通話教師每週一至兩天以小組授課。這些是校方公布的課程描述，頁面沒有總課時比例，不能據此判斷全天以哪種語言為主。", sourceUrl: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
    { label: "方案研習讓幼兒參與資料整理與成果分享", value: "校方表示幼兒可選擇感興趣的題目，搜集和整理資料，再籌劃展覽向全校分享；網站列明每年兩次、每次約兩至三週。這種安排較重視表達與合作，家長可了解各級的主題選擇空間及教師如何協助慢熱幼兒參與。", sourceUrl: "https://www.truelightk-c.edu.hk/m04_course_page01.php" },
  ] }]),

  profile("159190", "按教育局校號159190及天水圍天瑞邨瑞林樓第十一座地下識別佳寶幼稚園第三分校。教育局註冊資料確認校址和上午授課；分校官方頁提供天瑞校舍活動資料。佳寶集團其他分校的課程或班制不自動套用於本校。", "https://www.guideposts.edu.hk/TinShuiSchool/index.php", [
    { label: "教育局學校搜尋：佳寶幼稚園第三分校（天瑞邨）", scope: "校號159190、校址、上午授課、男女校、元朗區及學校官方網站。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=159190000111" },
    { label: "佳寶幼稚園：天瑞分校", scope: "天瑞分校舉辦的中華文化及藝術活動；本網站讀取不穩，報名前宜直接向校方確認最新安排。", url: "https://www.guideposts.edu.hk/TinShuiSchool/index.php" },
    { label: "佳寶幼稚園第三分校（天瑞邨）：2025/26招生文件", scope: "舊年度招生文件只作校舍與程序背景，不把日期、費用或空缺當作現屆資料。", url: "https://www.guideposts.edu.hk/application2025-2026/Guideosts_TinShui_Admisson_cht.pdf" },
  ], [{ title: "分校識別與課程核實", featured: true, note: "校方分校網站讀取不穩，頁面只採用教育局現行校址資料及可定位至天瑞分校的官方內容。", details: [
    { label: "這是天瑞邨瑞林樓的上午班分校", value: "教育局學校搜尋列出校號159190、上午授課和天瑞邨瑞林樓第十一座地下，並指向佳寶官方網站。佳寶有多個校舍，報名、面見或查詢班制時應確認是「第三分校（天瑞邨）」，不要把其他分校的時間表或收費當成本校資料。", period: "教育局名錄：2026-09-30；註冊狀態快照：2026-10-23", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=159190000111" },
    { label: "分校頁可見中華文化與藝術活動，現行頻率未公開", value: "佳寶官方天瑞分校頁列出推廣中華文化及藝術的活動內容，但沒有足夠可讀資料核對各級安排、每週頻率或現屆招生細節。若這是家庭選校重點，建議在參觀時請校方提供本分校當屆課程及活動表。", sourceUrl: "https://www.guideposts.edu.hk/TinShuiSchool/index.php" },
  ] }]),

  profile("216070", "按教育局校號216070及大角咀柳樹街10號校址識別深培中英文幼稚園。校方現行網站介紹故事主題、專題研習、遊戲和每週英語、普通話及體能課，另設專任語文教師；頁面未列各語言的每日總時數。", "https://semplekg.edu.hk/", [
    { label: "深培中英文幼稚園：課程特色", scope: "各級課程、遊戲探索、品格與信仰教育、每週語文及體能課的校方說明。", url: "https://semplekg.edu.hk/" },
    { label: "深培中英文幼稚園：校方首頁", scope: "辦學理念、創校年份、地址及聯絡資料。", url: "https://semplekg.edu.hk/" },
  ], [{ title: "故事主題與三語接觸", featured: true, details: [
    { label: "以故事帶出主題，再按幼兒興趣做專題研習", value: "校方把故事作為主題起點，按幼兒發展由淺入深，並稱會依孩子興趣設計專題研習，鼓勵觀察、探究和自主學習。網站亦展示動手遊戲、生活經驗和校外參觀。對喜歡操作和分享的孩子，家長可了解教師如何把活動連回語言、數概念和生活自理。", sourceUrl: "https://semplekg.edu.hk/" },
    { label: "每週英語、普通話及體能課，不等於雙語平均分配", value: "學校網站稱每週安排英語、普通話和體能課，並設專任普通話教師及外籍英語教師。由於未公開各級每週節數與課堂語言時數，不能把「兩文三語」直接解讀為英語或普通話主導；有語言目標的家庭可索取當屆時間表。", sourceUrl: "https://semplekg.edu.hk/" },
  ] }]),

  profile("325953", "按教育局校號325953及深水埗怡靖苑閒靜閣地下1至8室識別香港基督教女青年會宏恩幼稚園。校方公布2027/28招生入口、品格與語文教學重點，以及幼兒支援服務；全日班收費需按當屆校方收費表確認。", "https://kga.ywca.org.hk/tc/About-Us/Introduction.html", [
    { label: "宏恩幼稚園：學校簡介", scope: "辦學宗旨、教學重點、1993年創校、計劃參與及校址。", url: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
    { label: "宏恩幼稚園：課程特色與支援服務", scope: "愛＋閱讀、家庭健康維他命、駐校社工、融合及非華語支援入口。", url: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
  ], [{ title: "品格、語文與家庭支援", featured: true, details: [
    { label: "校方把品格、中文英文基礎和思考創意列為教學重點", value: "校方以基督精神和全人發展為辦學方向，並明列品格培育、中文及英文基礎、思考與創意。網站另設「愛＋閱讀」等課程特色入口。這能幫家庭判斷學校自述的優先次序，但不代表任何一科的實際課時；申請前可了解低班和高班如何延伸閱讀與表達。", sourceUrl: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
    { label: "全日班家庭須另核膳食和實際收費", value: "校方簡介稱提供免費半日制及低收費全日制，另設幼兒膳食、融合服務、非華語學生和駐校社工等資訊入口。各項服務資格、全日班費用和膳食安排應看當屆細則；若家庭有支援需要，建議先約校方了解服務頻率和申請方式。", sourceUrl: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
  ] }]),

  profile("324078", "按教育局校號324078及九龍城亞皆老街206號校址識別九龍城浸信會幼稚園。教育局名錄列三、四樓，校方課程／聯絡頁列二、三樓；頁面採用教育局登記地址並提醒家長向校方核實實際樓層。校方網站列兒童為本、自主遊戲及多元課程。", "https://www.kcbckg.edu.hk/", [
    { label: "九龍城浸信會幼稚園：課程特色", scope: "自主遊戲、品德、藝術、戲劇、雙語及奧福音樂課程入口。", url: "https://www.kcbckg.edu.hk/課程特色/" },
    { label: "九龍城浸信會幼稚園：校園介紹", scope: "1976年創校、辦學團體、宗教、班制時間及校方理念。", url: "https://www.kcbckg.edu.hk/校園介紹/" },
    { label: "九龍城浸信會幼稚園：入學申請", scope: "校方現行申請表及2027/28 K1招生資訊；報名前須重核通告。", url: "https://www.kcbckg.edu.hk/入學申請/" },
  ], [{ title: "自主遊戲與多元課程", featured: true, details: [
    { label: "自由遊戲結合品德教育，讓幼兒在活動中練習選擇和合作", value: "校方以兒童為本，列出自由遊戲、品德教育、藝術、戲劇、雙語及奧福音樂等課程元素，並稱會從幼兒興趣、能力和生活經驗引導探索與分享。家長可在參觀時觀察教師如何設定遊戲邊界、介入衝突及支持孩子表達，而不只看活動種類。", sourceUrl: "https://www.kcbckg.edu.hk/課程特色/" },
    { label: "校方樓層與教育局登記資料有差異，先確認實際校舍", value: "教育局名錄地址列亞皆老街206號三及四樓，校方網站聯絡資料則列二樓及三樓；本頁按教育局登記地址識別學校，但不把兩者視為已核實一致。報名或安排接送前，請向校方確認面見及日常上課樓層。校方班別資料另列幼兒班上午9時至中午12時、全日班至下午4時30分。", sourceUrl: "https://www.kcbckg.edu.hk/校園介紹/" },
  ] }]),
];

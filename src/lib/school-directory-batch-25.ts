import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
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

/** Ten further kindergarten profiles, matched to their EDB school and location numbers. */
export const KINDERGARTEN_BATCH_25: PilotSchool[] = [
  profile("230944", "教育局概覽：2026/27；ICHK HLY幼稚園課程頁查核：2026-10", "本頁對應香港國際學校（大埔）（幼稚園部）校址0001。校方以IB小學項目（PYP）組織學習，並描述以遊戲為核心、每日普通話接觸和戶外學習；學費未由引用資料可靠確認，故不填數字。", [
    { label: "教育局《學校位置及資料》", scope: "校號230944、校址0001、地址及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：ICHK Hong Lok Yuen", scope: "校址0001班制、授課語言、師生比例及概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2309440001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及登記校址資料；每日資料不包括政府學校。", url: EDB_REGISTRY },
    { label: "ICHK HLY：幼稚園課程", scope: "遊戲學習、普通話、音樂藝術及戶外教育的校方課程說明。", url: "https://ichkhly.edu.hk/about-ichkhly/our-school/kindergarten/" },
    { label: "ICHK HLY：課程架構", scope: "IB PYP、戶外學習及雙語學習支援的學校說明。", url: "https://ichkhly.edu.hk/about-ichkhly/our-school/curriculum/" },
    { label: "ICHK HLY：學校簡介", scope: "校址、聯絡及招生資訊入口。", url: "https://ichkhly.edu.hk/about-ichkhly/our-school/ichkhly-at-a-glance/" },
  ], [{ title: "遊戲探究、普通話與戶外學習", featured: true, note: "以下為校方課程自述。中學部及小學部資料不套用至幼稚園部；公開課程頁沒有列出逐日語言課時或本學年幼稚園學費。", details: [
    { label: "遊戲是幼稚園主要學習方式", value: "校方稱以遊戲作核心，讓孩子在自主發起和成人引導的經驗之間練習技能，再延伸遊戲。這種安排適合重視主動探索的家庭；參觀時可觀察教師如何把遊戲中的問題帶回語言、數學或同伴合作。", sourceUrl: "https://ichkhly.edu.hk/about-ichkhly/our-school/kindergarten/" },
    { label: "每日以故事、歌曲和遊戲接觸普通話", value: "幼稚園課程頁明言孩子每天透過故事、歌曲和遊戲接觸普通話，也安排音樂及視覺藝術專科課。這表示普通話是日常課程的一部分，但頁面沒有公布普通話佔全天教學的比例；家長應按孩子現有語言經驗詢問適應支持。", sourceUrl: "https://ichkhly.edu.hk/about-ichkhly/our-school/kindergarten/" },
    { label: "校園位置支持戶外教育", value: "校方把戶外教育列為課程特色，稱會讓孩子定期在戶外學習，並以自然元素佈置教室。家庭可進一步確認戶外活動頻率、雨天替代安排及不同年級的參與方式。", sourceUrl: "https://ichkhly.edu.hk/about-ichkhly/our-school/kindergarten/" },
  ] }]),

  profile("611093", "教育局概覽：2026/27；校方課程及2026/27收生頁查核：2026-10", "東華三院馬陳家歡幼稚園位於屯門欣田邨逸田樓。教育局概覽列粵語授課、上午及下午班；校方另介紹繪本、自由遊戲、綜合藝術和兩文三語安排，沒有公開逐科語言課時。", [
    { label: "教育局《學校位置及資料》", scope: "校號611093、校址0001、欣田邨地址及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：東華三院馬陳家歡幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6110930001" },
    { label: "東華三院《幼稚園教育》", scope: "辦學團體幼稚園整體課程方向及馬陳家歡幼稚園地址、開辦年份。", url: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
    { label: "東華三院馬陳家歡幼稚園：學校首頁", scope: "校方2026/27招生入口、課程特色、語言和聯絡資料。", url: "https://www.katherine-kindergarten.edu.hk/" },
    { label: "東華三院馬陳家歡幼稚園：收生指南", scope: "2026/27入學資訊及校方最新招生頁面入口。", url: "https://www.katherine-kindergarten.edu.hk/收生指南/" },
  ], [{ title: "繪本、自由遊戲與兩文三語", featured: true, note: "概覽資料與校方課程自述分開呈現；課程特色不等同外部成效評估。", details: [
    { label: "繪本用來連結多個學習經驗", value: "校方稱以繪本統整幼兒經驗，配合生活教育和親師合作，並透過建構、發現及做中學安排探究情境。家長可詢問不同年級如何從同一本繪本延伸到語文、藝術或生活主題，了解課程是否有連貫的學習脈絡。", sourceUrl: "https://www.katherine-kindergarten.edu.hk/" },
    { label: "自由遊戲與綜合藝術是校方列明的課程方式", value: "校方介紹透過自由遊戲、繪本和綜合藝術培養幼兒共通能力，並以「5A」作為培育方向。這些是學校所述的課程目標，不是已經量化的學生表現；參觀時可觀察孩子是否有選擇活動、表達想法和完成作品的機會。", sourceUrl: "https://www.katherine-kindergarten.edu.hk/" },
    { label: "有外籍英語及普通話專科教師", value: "校方稱設外籍英語教師和普通話專科教師，教育局概覽則把主要授課語言列為粵語。兩項資料可合併理解為粵語教學基礎上另有英語和普通話接觸；實際時數及年級安排未公開。", sourceUrl: "https://www.katherine-kindergarten.edu.hk/" },
  ] }]),

  profile("576743", "教育局概覽：2026/27（校址0001）；救世軍課程頁查核：2026-10", "救世軍中原慈善基金幼稚園有兩個教育局登記校址：沙田大圍美田邨美滿樓（0001）及元朗朗天苑（0002）。本頁的概覽班制、授課語言、師生比例和費用只引用0001；校方課程頁未明確拆分兩校址的差異，相關課程描述視作辦學團體頁面自述，不推定兩址課表完全相同。", [
    { label: "教育局《學校位置及資料》", scope: "校號576743及兩個登記校址的名稱、地址和班制。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "沙田校址0001的班制、語言、師生比例及年度學費；不代表校址0002。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5767430001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及兩個校址的註冊資料。", url: EDB_REGISTRY },
    { label: "救世軍中原慈善基金幼稚園：課程", scope: "自由遊戲、專題研習及蒙特梭利元素的校方課程介紹。", url: "https://salvationarmy.org.hk/esd/ccfkg/our-curriculum.html" },
    { label: "救世軍中原慈善基金幼稚園：服務", scope: "學校社工的公開服務說明及服務範圍。", url: "https://salvationarmy.org.hk/esd/ccfkg/our-services.html" },
  ], [{ title: "自由遊戲、專題研習與支援服務", featured: true, note: "概覽數據只屬沙田校址0001；組織共同課程頁及服務頁未逐一標明校址，家長須向孩子申請的校址確認是否提供相同安排。", details: [
    { label: "校方以自由遊戲延伸專題研習", value: "學校課程頁列出蒙特梭利日常生活、感官、數學及地理文化知識，並以自由遊戲和專題研習延伸幼兒探索。家庭可詢問孩子如何提出主題、記錄發現及展示成果，避免只以活動名稱判斷課程深度。", sourceUrl: "https://salvationarmy.org.hk/esd/ccfkg/our-curriculum.html" },
    { label: "有社工支援，但服務校址和頻率要先確認", value: "校方服務頁說明社工提供親職教育、學生管教、行為及情緒支援、輔導和轉介。由於頁面沒有明確列出兩個登記校址各自的服務時數與適用對象，雙校址家庭宜直接確認所申請校舍的支援安排。", sourceUrl: "https://salvationarmy.org.hk/esd/ccfkg/our-services.html" },
    { label: "沙田校址以粵語授課，設上午、下午及全日班", value: "教育局2026/27概覽只對應校址0001，列明粵語、上午／下午／全日班及師生比例約1:9.4。這些年度概覽不表示目前仍有學額；元朗校址的班制與費用須另按校址資料核對。", period: "教育局概覽：2026/27，校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5767430001" },
  ] }]),

  profile("323853", "教育局概覽：2026/27（校址0002）；卡莎迪曼校方課程及2027/28新生資料查核：2026-10", "卡莎迪曼幼稚園有皇后大道東錫克廟（0001）和天后永興街田華閣（0002）兩個登記校址；本頁概覽欄位只對應0002。校方網頁呈現共用課程及招生內容，沒有清楚拆分兩校址服務差異，報名前應向申請校址確認。", [
    { label: "教育局《學校位置及資料》", scope: "校號323853及皇后大道東、永興街兩個登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "天后校址的班制、授課語言、師生比例與年度資料；不代表校址0001。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3238530002" },
    { label: "教育局《學校基本註冊資料》", scope: "校號及兩個校址的註冊資料。", url: EDB_REGISTRY },
    { label: "卡莎迪曼幼稚園：課程", scope: "課程指引、學習範疇及中文學習階段。", url: "https://www.kdkkindergarten.edu.hk/?page_id=1066" },
    { label: "卡莎迪曼幼稚園：教學理念", scope: "校方對品德、文化及家庭價值的辦學自述。", url: "https://www.kdkkindergarten.edu.hk/?page_id=1075" },
    { label: "卡莎迪曼幼稚園：2027/28新生資料", scope: "校方最新年度年齡要求、收生考慮因素及費用說明。", url: "https://www.kdkkindergarten.edu.hk/?page_id=1115" },
  ], [{ title: "中文學習階段與多元文化教育", featured: true, note: "教育局概覽數據只屬校址0002；課程頁為校方網站共用內容，不能據此斷定兩址課表、師資及收生安排相同。", details: [
    { label: "校方按課程指引規劃六個學習範疇", value: "課程頁列出體能與健康、自然與生活、個人與群體、幼兒數學、語文、藝術與創意，並稱按學習歷程分階段支援中文。校方亦表示K1不要求書寫、K2及K3不作機械抄寫和聽寫；這為家長提供了查問升小準備方式的入口。", sourceUrl: "https://www.kdkkindergarten.edu.hk/?page_id=1066" },
    { label: "中文支援面向非華語家庭", value: "校方稱不少學生以中文以外的語言為家庭語言，因此透過豐富語言環境及循序學習階段讓孩子在生活中接觸中文字。家長可詢問兩校址是否均設相同支援、分組方式和當屆可用人手。", sourceUrl: "https://www.kdkkindergarten.edu.hk/?page_id=1066" },
    { label: "2027/28收生資料列出兄弟姊妹、居住距離及面見表現", value: "校方新生資訊列出兄弟姊妹、居住距離和面見表現等考慮因素，並說明半日班費用按計劃資助處理。這些條件只作該校招生參考，沒有公開權重或取錄概率；兩校址所收年級與時段宜再確認。", period: "校方公布：2027/28入學", sourceUrl: "https://www.kdkkindergarten.edu.hk/?page_id=1115" },
  ] }]),

  profile("156930", "教育局概覽：2026/27；佳寶屯門分校2027/28招生頁查核：2026-10", "本頁只對應佳寶幼稚園屯門分校（兆安苑定賢閣）。佳寶官方網站另列建生、天瑞及南昌等校址；其各校的班制、地址與收生安排不可互相代用。", [
    { label: "教育局《學校位置及資料》", scope: "校號156930、兆安苑定賢閣校址及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：佳寶屯門分校", scope: "校址0001班制、授課語言、師生比例及年度概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1569300001" },
    { label: "佳寶幼稚園：屯門分校", scope: "分校2027/28招生入口、校方活動及課程特色影片。", url: "https://www.guideposts.edu.hk/SiuOnSchool/index.php" },
    { label: "佳寶幼稚園：各校地址", scope: "屯門分校地址、電話及電郵；與其他佳寶校址區分。", url: "https://guideposts.edu.hk/Map/index.html" },
    { label: "佳寶幼稚園：2027/28屯門分校收生安排", scope: "屯門分校當屆K1招生文件及面見／註冊安排。", url: "https://www.guideposts.edu.hk/SiuOnSchool/index.php" },
  ], [{ title: "屯門分校體驗學習與當屆收生", featured: true, note: "課程特色目前以校方影片及分校消息呈現；未從文字頁確認其細項或每日語言比例，不自行補寫。", details: [
    { label: "校方為屯門分校另設課程特色介紹", value: "分校頁列有「課程特色」影片及體驗學習主題報道，顯示家長可以分校為單位了解課程，而不應把佳寶其他校舍內容直接當成屯門分校安排。公開文字頁沒有逐項呈現影片內容，本文不推定STEAM課時或固定活動。", sourceUrl: "https://www.guideposts.edu.hk/SiuOnSchool/index.php" },
    { label: "2027/28 K1資訊已按屯門分校發布", value: "校方頁面已列屯門分校2027/28入學申請表、網上報名及K1收生安排入口。家長應以該分校文件確認申請日期、面見形式、文件及註冊費，不沿用其他佳寶校址或舊年度流程。", period: "入學年度：2027/28", sourceUrl: "https://www.guideposts.edu.hk/SiuOnSchool/index.php" },
    { label: "教育局概覽列半日授課及粵語", value: "2026/27概覽對應屯門分校校址0001，列上午、下午班、粵語授課及師生比例約1:10.8。這是當屆學校概覽資料，不表示現時空缺或分校每級招生名額。", period: "教育局概覽：2026/27，校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1569300001" },
  ] }]),

  profile("516929", "教育局概覽：2026/27；教育局2025/26校方申報及2023質素視學資料查核：2026-10", "旺角雅麗斯英文幼稚園位於旺角亞皆老街5號地下至二樓。教育局概覽列英語授課；可讀的課程細節主要來自2025/26概覽內校方申報，師資及課室數據截至2024年9月，不標示為現況。", [
    { label: "教育局《學校位置及資料》", scope: "校號516929、校址0001、地址、授課時間及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：旺角雅麗斯英文幼稚園", scope: "校址0001班制、授課語言、師生比例及年度資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5169290001" },
    { label: "教育局《幼稚園概覽 2025/26》：校方申報", scope: "校本課程、學習方法及支援自述；課室與教職員統計截至2024年9月。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6810&schoolname=&schoolno=&voucher=" },
    { label: "教育局：旺角雅麗斯英文幼稚園學校資料", scope: "學校編號516929、校址0001、英文校名及登記地址。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=516929000111" },
    { label: "旺角雅麗斯英文幼稚園：校方網站", scope: "校方公開校務及聯絡入口；當屆安排以校方最新公告為準。", url: "http://www.mkagneskg.edu.hk/" },
  ], [{ title: "主題學習與幼兒適切的讀寫要求", featured: true, note: "課程細節來自2025/26教育局概覽所載校方申報，並非外部課程成效評估；歷年人手和班額不代表現況。", details: [
    { label: "校方申報採主題、專題及小組活動", value: "2025/26概覽的校方申報提到主題學習、專題研習、小組活動及參觀體驗，並稱按幼兒發展需要和興趣設計校本課程。家長可詢問孩子如何從參觀或主題活動整理觀察，以及不同能力孩子如何在小組內參與。", period: "校方申報：2025/26概覽", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6810&schoolname=&schoolno=&voucher=" },
    { label: "校方申報K1不要求執筆，K2及K3避免機械操練", value: "同一份概覽記載校方不要求幼兒班執筆，也不安排機械抄寫及操練式計算。這可以幫家長釐清學校對早期讀寫的取態；若重視升小銜接，宜再問校方如何循序建立握筆、閱讀和數概念。", period: "校方申報：2025/26概覽", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6810&schoolname=&schoolno=&voucher=" },
    { label: "英語授課不等於已知課時比例", value: "教育局概覽列授課語言為英語；公開資料沒有列每日語言時數或各科語言分配。2025/26概覽的6間註冊課室和截至2024年9月的6名校長及教學人員只作歷史背景，不推算現時師生比或班額。", period: "班制與語言：概覽2026/27；歷史統計：截至2024-09", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5169290001" },
  ] }]),

  profile("215678", "教育局概覽：2026/27（校址0002）；太陽島校方課程及2027/28報名程序查核：2026-10", "太陽島英文幼稚園有炮仗街（0001）和馬坑涌道（0002）兩個土瓜灣登記校址。本頁班制、PN、語言、師生比例及全日費用只對應馬坑涌道0002；校方集團FAQ涵蓋不同分校，分校課程和班級仍須向該址確認。", [
    { label: "教育局《學校位置及資料》", scope: "校號215678及兩個土瓜灣登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "馬坑涌道校址班制、PN、授課語言、師生比例及全日年度學費；不代表校址0001。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2156780002" },
    { label: "太陽島：課程及語言FAQ", scope: "中文班及雙語班教學語言差異、學校教學模式與服務說明。", url: "https://sunisland.edu.hk/registration/faq/" },
    { label: "太陽島：報名程序", scope: "2027/28統一註冊時間及當屆申請、面見和註冊程序。", url: "https://sunisland.edu.hk/zh/報名程序/" },
    { label: "太陽島：學校首頁", scope: "辦學歷史、課程及2026/27校方最新消息入口。", url: "https://sunisland.edu.hk/" },
  ], [{ title: "中文班與雙語班的語言定位", featured: true, note: "太陽島校方內容屬集團層級；本頁的教育局班制與學費只對應馬坑涌道0002，不能外推至同校其他校址。", details: [
    { label: "中文班以粵語為主，雙語班以英語為主", value: "校方FAQ明確區分中文班和英語—粵語雙語班：中文班以粵語為主要授課語言，另有普通話及英語學習；雙語班則以英語為主要授課語言，中文教師約佔校時六分之一以粵語授課。這是選班時最需要先問清楚的差異。", sourceUrl: "https://sunisland.edu.hk/registration/faq/" },
    { label: "校址0002的概覽列PN及全日班", value: "教育局2026/27概覽對應馬坑涌道校址0002，列上午、下午、全日班和幼兒班（PN），授課語言列為英語，師生比例約1:8.2，並列全日年費。請注意，此數據是指定校址及年度的概覽欄位，不代表炮仗街校址或個別班別已確認為雙語班。", period: "教育局概覽：2026/27，校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2156780002" },
    { label: "2027/28 K1申請需按統一註冊日期完成", value: "校方報名頁已列2027/28 K1統一註冊日期為2027年1月7至9日，並要求獲取錄家庭提交註冊證或教育局處理證明。分校面見和班別名額仍需跟申請校址的最新通知核對。", period: "入學年度：2027/28", sourceUrl: "https://sunisland.edu.hk/zh/報名程序/" },
  ] }]),

  profile("325775", "教育局概覽：2026/27（校址0002）；美雅校方2026/27資料及2027/28招生頁查核：2026-10", "美雅幼稚園（分校）設下鄉道89號地下及89至91號一樓兩個登記校址；教育局概覽及本頁課程地址資料對應校址0002。校方2025/26學校資料所列名額僅為舊年度，不用作當屆招生名額。", [
    { label: "教育局《學校位置及資料》", scope: "校號325775及下鄉道89號／91號兩個分校登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "下鄉道89號校址班制、PN、授課語言、師生比例及年度概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3257750002" },
    { label: "美雅教育機構：分校及招生資訊", scope: "2027/28招生入口、分校地址及非華語支援說明。", url: "https://www.maynga.edu.hk/" },
    { label: "美雅教育機構：2025/26學校資料", scope: "指定舊年度的分校學費、班級總容額及K1預計收生；不代表2026/27或現有空位。", url: "https://www.maynga.edu.hk/download/pdf/2026-2027/25-26%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99%28%E5%8A%A0%E7%B6%B2%E9%A0%81%29.pdf" },
    { label: "美雅教育機構：教育機構首頁", scope: "分校2027/28收生、校本文化活動及校方公開課程資料入口。", url: "https://www.maynga.edu.hk/" },
  ], [{ title: "校本品德、文化活動與非華語支援", featured: true, note: "校方2025/26的容額與收生預計是歷史資料，不作當屆招生保證；官方地址中一樓與地面舖位按校址分開。", details: [
    { label: "校方以每月品德目標配合行動練習", value: "美雅網站介紹按年級設計「行動承諾」小冊子，圍繞禮貌、積極等品德詞設定相應行動要求。家長可在校訪時了解品德主題如何融入班級日常，以及如何向家庭回饋孩子的實踐情況。", sourceUrl: "https://www.maynga.edu.hk/" },
    { label: "文化藝術活動及非華語支援有公開說明", value: "校方稱透過中華藝術文化活動讓幼兒體驗傳統文化，並列出非華語支援小組、傳譯或翻譯安排、中文教材及到校社工等措施。家庭可確認本年度服務對象、頻率、申請方式及所屬校址是否提供相同安排。", sourceUrl: "https://www.maynga.edu.hk/" },
    { label: "校址0002有PN，概覽列粵語授課", value: "教育局2026/27概覽對應下鄉道89號校址0002，列上午、下午、全日班、PN及粵語授課，師生比例約1:8.3。校方2025/26曾公布分校K1預計收生數和總容額，這些只作舊年度背景，不能當作本年度招生人數。", period: "教育局概覽：2026/27；比較用舊年度：2025/26", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3257750002" },
  ] }]),

  profile("629529", "教育局位置及註冊資料：2026-09/10；ESF West Kowloon官方開校、課程及收生頁查核：2026-10", "英基西九龍幼稚園於2026年8月開校。教育局位置及註冊資料列西九龍海輝道8號浪澄灣校址；校方介紹IB PYP及英語／雙語課程路線。新校初期的實際班額、現有空位及2027/28招生安排應以校方即時答覆為準。", [
    { label: "教育局《學校位置及資料》", scope: "校號629529、西九龍浪澄灣地址及學校類別。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "新校登記狀態及校址資料；登記狀態截至本次配對日期。", url: EDB_REGISTRY },
    { label: "英基：西九龍幼稚園開校公告", scope: "校方2025年公告所列2026年8月開校安排。", url: "https://join-us.esf.edu.hk/esf-to-open-new-kindergarten-in-west-kowloon/" },
    { label: "英基西九龍幼稚園：學校資料及課程", scope: "校址、年齡、PYP、英語／雙語路線、戶外探究及交通資訊。", url: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
    { label: "英基西九龍幼稚園：收生及參觀", scope: "中央收生、家長簡介會、校園參觀及聯絡資料。", url: "https://wkk.esf.edu.hk/en/admissions/" },
  ], [{ title: "新校PYP探究課程與升小銜接", featured: true, note: "校方資訊適用於2026年開辦的新校；初期學生人數、招生競爭及學位狀況以校方最新資料為準，不從其他英基校舍外推。", details: [
    { label: "2026年開辦，校方採用IB PYP", value: "英基於2025年公告新校預計2026年8月開辦；校方學校簡介現列IB小學項目（PYP），並以探究方式鼓勵幼兒提問和主導學習。這是新設校舍，家庭宜實地看校園動線、戶外活動空間和日常照顧安排。", period: "開校年度：2026/27", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
    { label: "學校簡介列英語及雙語課程路線", value: "英基學校簡介把課程列為English/Dual Language Stream，但公開頁沒有說明各路線每週課時或班別開設情況。家長應向校方確認申請年級可選路線、師資配置及中英文使用比例。", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-west-kowloon-kindergarten/" },
    { label: "收生由英基中央處理", value: "校方招生頁指出申請由英基中央收生團隊處理，並提供校園參觀和簡介會。新校第一、二屆的實際申請量與取錄情況尚不能從現有公開資料判斷，報名前直接詢問當屆學額及路線選擇。", sourceUrl: "https://wkk.esf.edu.hk/en/admissions/" },
  ] }]),

  profile("530131", "教育局概覽：2026/27（校址0002）；德寶教育機構將軍澳校區課程頁查核：2026-10", "教育局校號530131在將軍澳有富康花園（0001）及寶盈花園（0002）兩個登記校址。本頁概覽資料只對應寶盈花園0002；校方該址稱作Deborah International Pre-school/Play School，與教育局列出的中文及英文校名呈現不同，家長應以地址和校址編號辨認申請單位。", [
    { label: "教育局《學校位置及資料》", scope: "校號530131及將軍澳富康花園、寶盈花園兩個登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "寶盈花園校址班制、語言、師生比例及年度概覽；不代表富康花園校址。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5301310002" },
    { label: "德寶教育機構：Deborah International Pre-school/Play School（將軍澳）", scope: "寶盈花園校址、班別、教學語言、時段及校方設施說明。", url: "https://www.deborah.edu.hk/deborah-international-pre-school-pl-1" },
    { label: "德寶教育機構：學校網絡及辦學介紹", scope: "學校網絡和課程類型概覽；未用作富康花園與寶盈花園共用課表的證據。", url: "https://www.deborah.edu.hk/" },
  ], [{ title: "寶盈花園校區的課程語言與全日照顧", featured: true, note: "本頁所述校方安排專指寶盈花園校區；相同校號下的富康花園校址不在此課程頁範圍。校方未公布各語言實際課時比例。", details: [
    { label: "校方列英語、粵語和普通話教師", value: "寶盈花園校區頁列有受訓英語教師、粵語及普通話教師。這可供家庭了解三種語言均有師資安排，但不能直接推論每種語言所佔時數或英語為全天主要授課語言。", sourceUrl: "https://www.deborah.edu.hk/deborah-international-pre-school-pl-1" },
    { label: "課程涵蓋Playgroup至幼稚園高班及全日服務", value: "校方對應寶盈花園頁面列Playgroup、Nursery及Lower／Upper Kindergarten，並列上午、下午和全日時間。家長可按孩子年齡確認就讀級別名稱、當屆上課時間和午餐照顧安排；校方資料沒有明示空缺。", sourceUrl: "https://www.deborah.edu.hk/deborah-international-pre-school-pl-1" },
    { label: "教育局概覽和校方頁面須按校址辨認", value: "教育局2026/27概覽中530131校址0002對應寶盈花園；德寶網站以國際幼兒園／遊戲學校名稱呈現同一地址。不要把這個校區的學費、班制或特色套用至同號富康花園0001。", period: "教育局概覽：2026/27，校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5301310002" },
  ] }]),
];

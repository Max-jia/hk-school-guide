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

/** Official-source profile supplements reviewed in kindergarten batch 20. */
export const KINDERGARTEN_BATCH_20: PilotSchool[] = [
  profile("617741", "教育局概覽：2026/27；校方辦學理念頁查核：2026-10", "茵晴幼稚園校址、登記狀態及上午班資料按教育局校址記錄與2026/27概覽；跨文化及Reggio Emilia取向屬校方／辦學團體自述，不代表外部成效評估。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號617741、校址0001、地址、類別及網址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：茵晴幼稚園", scope: "校址0001當屆班制、語言及其他概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6177410001" },
    { label: "教育局學校搜尋：茵晴幼稚園", scope: "校名、學校編號、校址編號、上午授課、男女校及註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=617741000111" },
    { label: "Imperial Academy：茵晴幼稚園介紹", scope: "辦學團體對創意學習及Reggio Emilia靈感的自述。", url: "https://www.imperialgroup.asia/en/news/view?id=23" },
  ], [{ title: "創意與跨文化學習", featured: true, note: "教育局資料確認校址和學校類別；教育理念及教學取向為辦學團體自述，網站未提供可量化的學習成效。", details: [
    { label: "辦學團體以Reggio Emilia為靈感", value: "Imperial Academy介紹稱，茵晴幼稚園受Reggio Emilia Approach啟發，重視孩子、教師與家庭之間的交流，並把校園定位為共同學習與反思的空間。這是辦學團體的理念描述；家長參觀時可觀察作品展示、材料選擇和孩子是否有表達想法的機會。", sourceUrl: "https://www.imperialgroup.asia/en/news/view?id=23" },
    { label: "以多種材料引發創作", value: "辦學團體同一介紹提到按不同主題提供物料，鼓勵幼兒創作。公開頁沒有列出每週活動節數或各班實施方式，若家庭重視藝術課程，可向校方索取當屆課程安排。", sourceUrl: "https://www.imperialgroup.asia/en/news/view?id=23" },
  ] }]),

  profile("325732", "教育局概覽：2026/27；校方課程資料查核：2026-10", "課程取向及非華語支援按教育局概覽的校方申報資料呈現；未把概覽中的辦學目標解讀為實際學習成果。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號325732、校址0001、觀塘翠屏邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：路德會聖腓力堂幼稚園", scope: "本校址當屆課程、班制、語言及支援資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3257320001" },
    { label: "教育局觀塘區學校名單：路德會聖腓力堂幼稚園", scope: "校址、學校編號／校址編號、電話及學校網址。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kt.html" },
    { label: "路德會聖腓力堂幼稚園官方網站", scope: "校方公開課程與校務資訊入口；當屆細節須向校方確認。", url: "http://www.splck.edu.hk" },
  ], [{ title: "探索學習與幼兒支援", featured: true, note: "課程理念以教育局概覽所載校方申報為依據；如需了解最新課堂安排，應按校方當屆資料查詢。", details: [
    { label: "以探索和遊戲作為學習主軸", value: "教育局概覽所載校方課程資料以兒童身心發展為基礎，透過探索和遊戲讓幼兒體驗並學習。家長可問清K1書寫、數學活動的實際形式，並了解低班和高班如何逐步銜接小學。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3257320001" },
    { label: "校方申報有非華語學童支援", value: "概覽列出非華語幼兒中文學習支援及傳譯／翻譯服務等安排。這表示校方申報提供相關支援，並不等於每名幼兒都會接受相同強度的個別訓練；有需要的家庭宜在申請前確認支援語言、頻率和家校溝通方式。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3257320001" },
  ] }]),

  profile("556122", "教育局概覽：2026/27；校方收生頁查核：2026-10", "課程和學校資料按逸東邨校址記錄；招生細節特別標明2027/28年度，不能外推至其他學年。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號556122、校址0001、東涌逸東邨地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：善一堂逸東幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5561220001" },
    { label: "善一堂逸東幼稚園：2027/28 K1收生安排", scope: "該年度申請、面見方式、日期和收生準則。", url: "https://www.syt.edu.hk/sytytk/admission.php?type=1" },
    { label: "善一堂逸東幼稚園：官方首頁", scope: "校址、聯絡資料及有日期的校園活動公告。", url: "https://www.syt.edu.hk/sytytk/" },
  ], [{ title: "遊戲面見與家校配合", featured: true, note: "具體申請時序只適用於2027/28 K1；學校公開的活動和支援須以當屆校方公告為準。", details: [
    { label: "2027/28 K1以小組遊戲面見", value: "校方公布該年度所有申請者均獲面見機會，面見以廣東話小組遊戲進行，觀察幼兒與家長、教師及同伴互動，以及語言、理解、大小肌肉協調和社交表現。這不是錄取保證；準備重點是讓孩子熟悉輪流、聆聽和表達，不必把面見訓練成背答案。", period: "2027/28 K1收生安排", sourceUrl: "https://www.syt.edu.hk/sytytk/admission.php?type=1" },
    { label: "非華語家庭可查詢傳譯協助", value: "同一收生頁說明，面見非華語兒童時可按需要安排傳譯／翻譯，或由懂中文親友陪同協助溝通。家庭應預先聯絡校方確認語言和安排方式。", period: "2027/28 K1收生安排", sourceUrl: "https://www.syt.edu.hk/sytytk/admission.php?type=1" },
  ] }]),

  profile("613509", "教育局概覽：2026/27；校方課程與2023/24學校報告查核：2026-10", "課程特色及支援以安泰校址的校方網站為準；師生比、班額等只可採用有明確年份的概覽或報告數據，不在本補充內容中推算。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號613509、校址0001、觀塘安泰邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：光愛樂幼稚園（安泰）", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6135090001" },
    { label: "光愛樂幼稚園：課程特色", scope: "遊戲、探知、彩虹、音樂及健康五類學習環境的校方介紹。", url: "https://www.llhhk.edu.hk/" },
    { label: "光愛樂幼稚園（安泰）2023/24學校報告", scope: "該學年活動、支援及校務資料；不作現屆安排推論。", url: "https://www.llhhk.edu.hk/wp-content/uploads/2024/11/23-24%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
  ], [{ title: "五類校園與遊戲探索", featured: true, note: "五類校園為校方描述的環境設計；學校報告資料屬2023/24，不代表2026/27固定活動。", details: [
    { label: "以五類校園組織學習環境", value: "校方把校園特色分為遊戲、探知、彩虹、音樂和健康五個方向，並以基督教信念及兒童身心發展需要規劃課程。家長可參觀時了解這些空間分別服務哪些年級、如何融入日常課表，而不只看設施數量。", sourceUrl: "https://www.llhhk.edu.hk/" },
    { label: "舊學校報告提供活動例子，不代表現行頻率", value: "2023/24學校報告列有親子英語遊戲、戶外探索和家長培訓等活動。這些資料可作為過往校園實踐的例子；目前是否續辦、由哪些年級參加及頻率，須以最新校訊或向校方查詢為準。", period: "2023/24學校報告", sourceUrl: "https://www.llhhk.edu.hk/wp-content/uploads/2024/11/23-24%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
  ] }]),

  profile("325988", "教育局概覽：2026/27；校方課程、支援及收生頁查核：2026-10", "辦學理念、課程和支援按保良局李徐松聲紀念幼稚園官方頁面記錄；校園面積及課室數是設施資料，不代表新生學位數。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號325988、校址0001、紅磡家維邨地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：保良局李徐松聲紀念幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3259880001" },
    { label: "保良局李徐松聲紀念幼稚園：學校簡介及課程特色", scope: "創校年份、辦學宗旨、兒童主導活動和戶外學習。", url: "https://www.plkkgs.edu.hk/plkltcsmkg/hk/about/10" },
    { label: "保良局李徐松聲紀念幼稚園：非華語幼兒支援", scope: "校方列明的非華語幼兒課程調適和教學支援。", url: "https://www.plkkgs.edu.hk/plkltcsmkg/hk/info/43" },
  ], [{ title: "兒童主導與社區體驗", featured: true, note: "校園設備和課程描述來自校方；未把校方目標轉寫成學生表現保證。", details: [
    { label: "透過有意義的遊戲和活動學習", value: "校方稱課程按幼兒身心發展設計，讓孩子透過活動探索、討論和解決問題，並安排戶外參觀及社區活動。家長可進一步了解各級活動如何從體驗延伸到語言、數學或生活概念。", sourceUrl: "https://www.plkkgs.edu.hk/plkltcsmkg/hk/about/10" },
    { label: "非華語幼兒支援按班本需要調適", value: "學校支援頁稱由非華語支援老師與教師定期交流幼兒學習情況，並按班本需要調整課程和教學步伐。家庭可在面談時確認支援語言、安排頻率和家校溝通方式。", sourceUrl: "https://www.plkkgs.edu.hk/plkltcsmkg/hk/info/43" },
    { label: "2027/28收生頁已公布下一屆申請入口", value: "校方網站列有2027/28 K1申請須知和表格入口；申請日期、面見及註冊細節應以該頁最新版本為準。校舍面積或課室數不能換算為K1實際學額，家庭仍須向校方查詢班別和時段空缺。", sourceUrl: "https://www.plkkgs.edu.hk/plkltcsmkg/hk/custom/custom_page/39" },
  ] }]),

  profile("615080", "教育局概覽：2026/27；校方課程及支援頁查核：2026-10", "趣沂幼稚園的免費半日及低收費全日安排、課程和支援按校方網站自述呈現；未把校方所述質素目標當成外部評價。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號615080、校址0001、東涌滿東邨地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：香港基督教女青年會趣沂幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6150800001" },
    { label: "趣沂幼稚園：學校簡介與辦學宗旨", scope: "創校資料、宗教理念、服務對象及半日／全日課程簡介。", url: "https://kghl.ywca.org.hk/tc/About-Us/Introduction.html" },
    { label: "趣沂幼稚園：課程與日程活動", scope: "遊戲、生活體驗、語言、體能、群性及靈育活動的校方介紹。", url: "https://kghl.ywca.org.hk/tc/School-Life/Schedule-Activities.html" },
  ], [{ title: "遊戲體驗與全人發展", featured: true, note: "校方介紹的課程方向不代表每名幼兒的個別成效；全日班費用與空缺需核對當屆收費證明及招生公告。", details: [
    { label: "課程按幼兒發展、興趣和能力編訂", value: "校方稱課程參照教育局幼稚園課程指引，重視親身體驗和遊戲學習；活動包括故事分享、談話、體能和小手肌練習、合作遊戲及美藝音樂。對家長而言，這種安排著重多方面經驗，仍應詢問語文教學的日常語言及各級課時。", sourceUrl: "https://kghl.ywca.org.hk/tc/School-Life/Schedule-Activities.html" },
    { label: "半日免費、全日低收費屬校方公布的課程選項", value: "學校簡介稱提供免費半日制和低收費全日制課程。家庭比較成本時仍要把膳食、校車和其他雜費一併確認，並以最新教育局收費證明及校方通知為準。", sourceUrl: "https://kghl.ywca.org.hk/tc/About-Us/Introduction.html" },
    { label: "校方列有駐校社工及到校支援服務", value: "首頁介紹配合不同幼兒及家庭需要提供駐校社工、到校支援等服務。公開資料未列出個別服務的輪候時間或每位幼兒可獲的時數，若孩子有具體需要，宜在申請前直接討論支援流程。", sourceUrl: "https://kghl.ywca.org.hk/tc/index.html" },
  ] }]),

  profile("598054", "教育局概覽：2026/27；校方課程及家長常見問題查核：2026-10", "童樂天國際幼稚園採用校方描述的Montessori及Reggio啟發式課程並以英國EYFS為參照；校方自述不代表獨立課程認證或升小結果。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號598054、校址0001、沙田花園城校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：童樂天國際幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5980540001" },
    { label: "童樂天國際幼稚園：課程簡介", scope: "EYFS學習範疇、體能和戶外社區學習等校方課程資料。", url: "https://www.mulberrytree.edu.hk/eyfs-curriculum" },
    { label: "童樂天國際幼稚園：家長常見問題", scope: "遊戲本位、評估及銜接本地或國際小學的校方說明。", url: "https://www.mulberrytree.edu.hk/faqs" },
  ], [{ title: "遊戲本位與小學銜接", featured: true, note: "課程框架及銜接描述來自校方；家庭應另核對教學語言比例、評估方式、學費和小學申請支援。", details: [
    { label: "校方以Montessori與Reggio作課程靈感", value: "學校首頁稱課程受Montessori及Reggio啟發，並以EYFS為框架，提供以遊戲和探索為主的學習。家長可問清孩子每日有多少自主選擇時間，以及教師如何記錄並回饋個別發展。", sourceUrl: "https://www.mulberrytree.edu.hk/" },
    { label: "課程包括戶外與社區學習", value: "EYFS課程頁列音樂律動、瑜伽及每週外出活動，讓孩子在社區延伸課堂經驗。實際外出安排會受年級、天氣及校務安排影響，報名前宜確認當屆頻率和交通方式。", sourceUrl: "https://www.mulberrytree.edu.hk/eyfs-curriculum" },
    { label: "校方說明由四歲起漸進採用教育局評估", value: "常見問題稱，學校由孩子四歲起逐步採用教育局提供的評估，以協助銜接不同小學體系。這是校方對課程安排的說明，不等於保證符合所有小學要求；家長應了解評估內容、回饋形式和升小選校支援。", sourceUrl: "https://www.mulberrytree.edu.hk/faqs" },
  ] }]),

  profile("577987", "教育局概覽：2026/27；校方課程與2026/27招生頁查核：2026-10", "課程特色取自基督教小樹苗幼稚園官方網站；收生流程的日期、費用和優先準則均標明為2026/27，不外推至下一屆。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號577987、校址0001、牛頭角彩盈邨地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：基督教小樹苗幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5779870001" },
    { label: "基督教小樹苗幼稚園：課程特色", scope: "故事綜合教學、小組討論、設計活動、自由遊戲和宗教教育。", url: "https://www.littletree.edu.hk/" },
    { label: "基督教小樹苗幼稚園：2026/27 K1入學申請", scope: "該年度的面見、非華語溝通支援和申請程序。", url: "https://www.littletree.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "故事探究與自由遊戲", featured: true, note: "宗教教育是校園特色之一；對宗教活動的接受程度可納入家庭適配考量。招生頁日期只適用於2026/27。", details: [
    { label: "故事帶入跨範疇活動", value: "校方介紹以故事引入主題，再設計多元活動；另列小組討論和活動式探究，讓孩子聆聽、表達、搜集資料並尋找答案。家長可參觀時詢問孩子在活動中如何提出問題，以及教師如何支援不同語言能力。", sourceUrl: "https://www.littletree.edu.hk/" },
    { label: "每日自由遊戲與區角選擇", value: "學校稱每天設自由遊戲時段，幼兒可選擇區角、遊戲方式和規則，並與不同年齡玩伴互動。這與較多教師主導的操練式安排不同；家庭可問清自由遊戲和教師帶領課程在日程中的平衡。", sourceUrl: "https://www.littletree.edu.hk/" },
    { label: "2026/27收生頁列明非華語面見協助", value: "該屆收生頁表示面見非華語幼兒時可安排傳譯／翻譯，或由懂中文親友陪同；申請與面試日期已屬過往學年資料，不能當作下一屆時間表。", period: "2026/27 K1收生資料", sourceUrl: "https://www.littletree.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ] }]),

  profile("544167", "教育局概覽：2026/27；校方理念與2027/28收生頁查核：2026-10", "大埔浸信會幼稚園天澤邨分校的理念、地址和招生流程按指定分校資料記錄；不把同辦學團體其他校址的課程或空缺移植至本校。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號544167、校址0001、天水圍天澤邨地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：大埔浸信會幼稚園天澤邨分校", scope: "本分校當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5441670001" },
    { label: "大埔浸信會幼稚園天澤邨分校：學校簡介", scope: "創校背景、六育和遊戲活動的辦學目標。", url: "https://www.tpbkg-tceb.edu.hk/tc/content.php?wid=2" },
    { label: "大埔浸信會幼稚園天澤邨分校：2027/28 K1收生", scope: "該年度申請、面見與優先考慮項目。", url: "https://tpbkg-tceb.edu.hk/tc/content.php?wid=42" },
  ], [{ title: "六育發展與家庭需要", featured: true, note: "校方以六育和遊戲活動描述辦學目標；全日班優先考慮不代表保證取得學位。", details: [
    { label: "校方以德智體群美靈六育作教育目標", value: "學校簡介稱透過環境、資源、遊戲和活動，促進幼兒六育發展，並培養生活習慣、獨立思考、嘗試精神和欣賞他人。這是校方教育目標；家長可了解各級如何把目標落在日常活動和觀察回饋中。", sourceUrl: "https://www.tpbkg-tceb.edu.hk/tc/content.php?wid=2" },
    { label: "2027/28面見包括個別安排並考慮家庭需要", value: "校方該年度收生頁說明會安排所有申請者面見，並考慮面見表現；申請全日班時，有家庭需要者可獲優先考慮，但校方明言名額有限，優先條件不保證獲取錄。", period: "2027/28 K1收生安排", sourceUrl: "https://tpbkg-tceb.edu.hk/tc/content.php?wid=42" },
    { label: "半日與全日的註冊費不同", value: "該屆收生頁列半日班註冊費970元、全日班1,570元。這是註冊費而非全年學費；家庭仍需查閱當屆收費證明，計入全日班膳食和其他費用。", period: "2027/28 K1收生安排", sourceUrl: "https://tpbkg-tceb.edu.hk/tc/content.php?wid=42" },
  ] }]),

  profile("528153", "教育局概覽：2026/27；校方教學支援頁查核：2026-10", "葵盛禮賢會幼稚園的教學支援資料來自指定校址官方網站；非華語支援及幼小銜接按校方公開介紹呈現，細節應以孩子當屆年級安排確認。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號528153、校址0001、葵盛東邨盛國樓地址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：葵盛禮賢會幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5281530001" },
    { label: "葵盛禮賢會幼稚園：教學支援", scope: "非華語幼兒校園融入及幼小銜接課程的校方介紹。", url: "https://kskg.ppe.rhenish.org/%E6%95%99%E5%AD%B8%E6%94%AF%E6%8F%B4/" },
    { label: "葵盛禮賢會幼稚園：官方首頁", scope: "該校址校務和校園活動資料入口。", url: "https://kskg.ppe.rhenish.org/" },
  ], [{ title: "多元支援與幼小銜接", featured: true, note: "支援安排由校方公開介紹；網頁沒有列明每名幼兒的服務時數或固定課時，不能據此推算。", details: [
    { label: "以同儕互動支援非華語幼兒融入", value: "校方教學支援頁提到，透過幼兒互動協助非華語孩子認識本地文化和生活習慣，建立融和的校園生活。家庭可詢問中文支援如何融入課堂、是否有翻譯服務，以及家長如何收到孩子適應情況回饋。", sourceUrl: "https://kskg.ppe.rhenish.org/%E6%95%99%E5%AD%B8%E6%94%AF%E6%8F%B4/" },
    { label: "校方設有幼小銜接課程", value: "同一支援頁設有幼小銜接課程介紹，但公開摘要未列明活動時數或評估標準。家長宜確認課程對自理、課堂常規和學習習慣的具體安排，不宜把幼小銜接直接理解為特定小學錄取優勢。", sourceUrl: "https://kskg.ppe.rhenish.org/%E6%95%99%E5%AD%B8%E6%94%AF%E6%8F%B4/" },
  ] }]),
];

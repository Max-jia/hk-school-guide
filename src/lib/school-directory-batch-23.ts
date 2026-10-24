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

/** School-specific additions for the next ten active, single-location kindergarten profiles. */
export const KINDERGARTEN_BATCH_23: PilotSchool[] = [
  profile("539554", "教育局概覽：2025/26；校方課程與收生資料查核：2026-10", "香港浸信會聯會寶田幼稚園位於屯門寶田商場。可讀到的教育局概覽為2025/26年度，統計以概覽標示日期為準；課程特色採校方現行公開資料，不把舊年度班額或費用寫成當前數據。", [
    { label: "教育局《學校位置及資料》", scope: "校號539554、校址0001、屯門寶田商場地址與學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2025/26》：香港浸信會聯會寶田幼稚園", scope: "校址0001、參加教育計劃、校方申報的課程和非華語支援；年度統計不代表現時空缺。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6554" },
    { label: "教育局《學校基本註冊資料》", scope: "校號及校址登記狀態；每日資料不包括政府學校。", url: EDB_REGISTRY },
    { label: "香港浸信會聯會寶田幼稚園：學校網站", scope: "校方公開課程、招生及家校資訊。", url: "https://potinkg.edu.hk/" },
  ], [{ title: "遊戲學習與非華語支援", featured: true, note: "年度概覽由校方申報；支援措施及教學目標不是外部成效評估。", details: [
    { label: "依幼稚園課程指引安排遊戲學習", value: "2025/26教育局概覽記錄校方依循《幼稚園教育課程指引》，並避免要求幼兒班兒童執筆抄寫或做操練式計算。這表示課程描述較重視發展適切的活動；家長可向學校了解K2、K3如何逐步建立書寫與數概念。", period: "教育局概覽：2025/26；校方申報", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6554" },
    { label: "列有非華語中文支援措施", value: "教育局概覽列出增聘支援人員、翻譯傳譯、豐富中文環境及每週遊戲式中文活動等安排。這些是校方申報的支援項目；家庭宜確認目前服務對象、課堂頻率及個別幼兒如何獲安排。", period: "教育局概覽：2025/26；校方申報", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6554" },
  ] }]),

  profile("536040", "教育局概覽：2026/27；校方課程資料查核：2026-10", "路德會聖雅各幼稚園位於柴灣興華（一）邨。校方課程資料同時提到蒙特梭利、自主遊戲與主題探索；家庭可據此觀察孩子是否適應有秩序的自主操作，不把理念描述當成個別學習成效。", [
    { label: "教育局《學校位置及資料》", scope: "校號536040、校址0001及柴灣登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：路德會聖雅各幼稚園", scope: "校址0001當屆班制、語言、師生比例與核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5360400001" },
    { label: "路德會聖雅各幼稚園：課程特色", scope: "主題探索、校本教材、English Starter、蒙特梭利及自由遊戲。", url: "https://www.sjlk.edu.hk/課程特色/" },
    { label: "路德會聖雅各幼稚園：辦學宗旨", scope: "辦學團體及全人教育方向。", url: "https://www.sjlk.edu.hk/學校介紹/辦學宗旨/" },
  ], [{ title: "自主探索、蒙特梭利與自由遊戲", featured: true, note: "以下為校方課程自述，應在校訪時確認各級的實際課堂安排。", details: [
    { label: "主題活動從觀察、討論走到求證", value: "校方稱課程以生活經驗為起點，讓孩子透過觀察、討論及求證建構新知識；另設校本練習冊、詩歌集和小肌肉活動冊。家長可詢問孩子在自由探索後如何整理和表達發現，了解活動與語文、數學學習的連結。", sourceUrl: "https://www.sjlk.edu.hk/課程特色/" },
    { label: "蒙特梭利與自由遊戲並行", value: "校方介紹以預備好的環境及教具支持幼兒自主操作，並重視秩序感、專注、手眼協調和自理；自由遊戲則讓孩子選擇材料、同伴及玩法。對較需要成人提示的孩子，家長可觀察教師如何在自主和引導之間調節。", sourceUrl: "https://www.sjlk.edu.hk/課程特色/" },
    { label: "英文課程有系統，但未公布逐日課時", value: "校方列出English Starter教材及K1至K3螺旋式學習，也稱內容連結日常生活。公開頁沒有列出每日英語時數，不能據此推定英語為主要授課語言。", sourceUrl: "https://www.sjlk.edu.hk/課程特色/" },
  ] }]),

  profile("315435", "教育局概覽：2026/27；校方學費與課程資料查核：2026-10", "北角聖彼得堂幼稚園依循教育局課程指引，以繪本帶動遊戲、跨範疇學習與宗教教育。校方2026/27收費頁另列全日班學費及膳食，和半日資助班分開計算。", [
    { label: "教育局《學校位置及資料》", scope: "校號315435、校址0001及炮台山道地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：北角聖彼得堂幼稚園", scope: "校址0001當屆班制、語言、師生比例及概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3154350001" },
    { label: "北角聖彼得堂幼稚園：簡介及課程特色", scope: "創校背景、課程指引、繪本遊戲、宗教教育及不採機械式操練的校方說明。", url: "https://www.stpnpkg.edu.hk/zh_tw/site/view?name=%E7%B0%A1%E4%BB%8B" },
    { label: "北角聖彼得堂幼稚園：上課時間及學費", scope: "2026/27班制、上課時間、學費、膳食及代辦費。", url: "https://www.stpnpkg.edu.hk/zh_tw/site/view?name=%E4%B8%8A%E8%AA%B2%E6%99%82%E9%96%93%E5%8F%8A%E5%AD%B8%E8%B2%BB" },
  ], [{ title: "繪本遊戲、宗教教育與家庭預算", featured: true, note: "課程定位和費用均採校方公開資料；活動成果及實際課堂比例未作推算。", details: [
    { label: "以繪本把不同學習範疇串起來", value: "校方介紹以繪本為媒介，設計遊戲和思考活動，讓幼兒在嘗試、探索及解難中建構知識；同時融入宗教教育與品格培育。這類課程適合重視故事、遊戲和價值教育的家庭；可向校方索取不同年級的主題例子。", sourceUrl: "https://www.stpnpkg.edu.hk/zh_tw/site/view?name=%E7%B0%A1%E4%BB%8B" },
    { label: "校方明確表示不要求K1機械抄寫操練", value: "學校稱依據《幼稚園教育課程指引》規劃課程，不要求幼兒班兒童執筆寫字或做機械抄寫、操練式計算。若家庭希望了解升小前的讀寫準備，宜問清校方如何循序建立握筆、閱讀與數概念。", sourceUrl: "https://www.stpnpkg.edu.hk/zh_tw/site/view?name=%E7%B0%A1%E4%BB%8B" },
    { label: "全日班需把學費與膳食分開預算", value: "校方2026/27頁列半日班學費為零；全日班全年學費HK$18,000及膳食費HK$8,500，均分十期，另有課本、練習簿、茶點等代辦項目。比較時應按所選班制計算全年總支出。", period: "2026/27學年", sourceUrl: "https://www.stpnpkg.edu.hk/zh_tw/site/view?name=%E4%B8%8A%E8%AA%B2%E6%99%82%E9%96%93%E5%8F%8A%E5%AD%B8%E8%B2%BB" },
  ] }]),

  profile("323969", "教育局概覽：2026/27；校方資料查核：2026-10", "懷恩浸信會幼稚園由北角懷恩浸信會創辦，校方資料列創校於1975年，並介紹英語教師及免費英語興趣班。概覽校址編號為0002，與教育局註冊校址呈現方式分開標示。", [
    { label: "教育局《學校位置及資料》", scope: "校號323969、北角校址及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：懷恩浸信會幼稚園", scope: "概覽校址0002的班制、語言、師生比例及收費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3239690002" },
    { label: "懷恩浸信會幼稚園：學校背景", scope: "辦學團體、創校年份與校舍沿革的校方說明。", url: "https://www.gbkg.edu.hk/" },
    { label: "懷恩浸信會幼稚園：入學申請", scope: "免費幼稚園教育計劃及英語教師、興趣班等校方公布安排；招生條件需按新年度確認。", url: "https://www.gbkg.edu.hk/?lang=zh&page_id=9" },
  ], [{ title: "北角社區辦學與英語接觸", featured: true, note: "英語安排為校方介紹；公開頁未列課堂時數或每級參與方式。", details: [
    { label: "辦學歷史可追溯至1975年", value: "校方介紹幼稚園由香港懷恩浸信會於1975年創辦，後於2002年搬至北角國賓大廈。對重視社區型辦學的家庭，這項背景有助了解學校的辦學脈絡，但不等同對教學質素的獨立評價。", sourceUrl: "https://www.gbkg.edu.hk/" },
    { label: "校方稱設駐校英語教師及免費興趣班", value: "入學頁介紹學校重視幼兒語文發展，設有駐校英國籍英語教師，並為園生提供免費英語興趣班。公開頁沒有交代各級頻率及課時；若家庭以英語沉浸為目標，應索取課表確認。", sourceUrl: "https://www.gbkg.edu.hk/?lang=zh&page_id=9" },
  ] }]),

  profile("158674", "教育局概覽：2026/27；校方課程資料查核：2026-10", "路德會建生幼稚園位於屯門建生邨，設上午及全日服務。校方公開綜合聲情課程、遊戲和小組表達活動，以及舞蹈、音樂等增潤項目；增潤班別和名額宜按年度確認。", [
    { label: "教育局《學校位置及資料》", scope: "校號158674、校址0001及屯門建生邨康生樓登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：路德會建生幼稚園", scope: "校址0001當屆班制、授課語言、師生比例及核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1586740001" },
    { label: "路德會建生幼稚園：綜合聲情課程", scope: "小組討論、遊戲、角色扮演及正面回饋等校方課程說明。", url: "https://www.kslk.edu.hk/l/fa770CQ1QAA" },
    { label: "路德會建生幼稚園：學校概況", scope: "創校、班制、校舍設施及屯門校址。", url: "https://www.kslk.edu.hk/l/fae0aCQ1RAg" },
  ], [{ title: "小組表達與多元活動", featured: true, note: "課程和設施為校方自述；未據此推斷學生能力成果。", details: [
    { label: "透過遊戲、討論和角色扮演組織課堂", value: "校方把課程稱為「綜合聲情課程」，列出小組任務、遊戲、角色扮演及正面讚賞，讓幼兒在互動中練習表達和溝通。家長可觀察不同性格或語言能力的孩子是否都有發言及展示作品的機會。", sourceUrl: "https://www.kslk.edu.hk/l/fa770CQ1QAA" },
    { label: "增潤內容涵蓋音樂、舞蹈與體能", value: "學校另介紹舞蹈、口風琴、跆拳道及「小綿羊」團隊等增潤活動，並設多元智能日。這些活動可供家庭了解校方課程外延；參加資格、費用和各級實際開班情況應直接向校方確認。", sourceUrl: "https://www.kslk.edu.hk/l/fabfaCQ1TBg" },
    { label: "校舍提供感覺統合及大肌肉活動空間", value: "校方概況列室內大肌肉室、音樂室及感覺統合區等設施。設施存在不代表每名孩子固定使用時數，家長可在參觀時詢問日常安排及雨天活動模式。", sourceUrl: "https://www.kslk.edu.hk/l/fae0aCQ1RAg" },
  ] }]),

  profile("151157", "教育局概覽：2026/27；校方課程與招生資料查核：2026-10", "大埔浸信會幼稚園校址在大埔鄉事會坊，校方以粵語為主要教學語言，並有普通話及英語接觸。校方現有頁面同時含歷年資料，本文不把舊學費或招生日期當成現行安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號151157、校址0001及大埔鄉事會坊地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：大埔浸信會幼稚園", scope: "校址0001當屆班制、授課語言、師生比例及概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1511570001" },
    { label: "大埔浸信會幼稚園：課程特色", scope: "遊戲學習、環保及品德教育、語言、評估與非華語支援。", url: "https://tpbkg.edu.hk/site/page.php?id=14&tpwlang=eng" },
    { label: "大埔浸信會幼稚園：校方首頁", scope: "2027/28年度招生入口及校方最新消息。", url: "https://tpbkg.edu.hk/site/index.php?tpwlang=eng" },
  ], [{ title: "遊戲主導、環保教育與粵語教學", featured: true, note: "語言主次和評估方式依校方課程頁自述；沒有推算語言課時比例。", details: [
    { label: "以粵語為主要教學語言，另有普通話和英語", value: "校方課程頁明確稱以粵語作主要教學語言，並安排普通話及英語語文活動。對希望孩子以粵語打好日常學習基礎、同時接觸其他語言的家庭，仍要確認不同年級的實際課時與專科安排。", sourceUrl: "https://tpbkg.edu.hk/site/page.php?id=14&tpwlang=eng" },
    { label: "遊戲、主題活動連結環境與品德教育", value: "校方把遊戲列為主要教學方法，並將環保、珍惜資源、體操和音樂等元素放入課程；教師透過持續觀察記錄幼兒表現並調整教學。這讓家長可追問孩子如何從活動延伸到生活習慣，而非只看單次活動名稱。", sourceUrl: "https://tpbkg.edu.hk/site/page.php?id=14&tpwlang=eng" },
    { label: "設有非華語幼兒支援及面見傳譯", value: "課程頁列出按需要安排班級或分組、透過同儕與遊戲支持中文學習，並可在面見時提供傳譯或容許懂中文親友陪同。具體支援方式須按孩子需要與當屆資源確認。", sourceUrl: "https://tpbkg.edu.hk/site/page.php?id=14&tpwlang=eng" },
  ] }]),

  profile("156981", "教育局概覽：2026/27；校方招生及課程資料查核：2026-10", "麗晶幼稚園分校位於元朗安樂路明珠樓，應與同名其他校址分開。校方以生活主題、遊戲及操作活動組織課程，並稱每天安排外籍英語教師授課；實際班別及語言時數須按當屆時間表確認。", [
    { label: "教育局《學校位置及資料》", scope: "校號156981、校址0001及元朗登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：麗晶幼稚園分校", scope: "校址0001當屆班制、授課語言、師生比例與學費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1569810001" },
    { label: "麗晶幼稚園分校：官方課程介紹", scope: "生活主題、遊戲策略、德育故事、科學探究、閱讀與語言教學。", url: "https://www.regentkg.edu.hk/" },
    { label: "麗晶幼稚園分校：2026/27招生表", scope: "校址、聯絡資料及該年度接受申請的班級與時段。", url: "https://www.regentkg.edu.hk/wp-content/uploads/2025/08/26-27%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
  ], [{ title: "生活主題、做中學與語文環境", featured: true, note: "課程與每日英語課為校方網站自述；公開頁未列各級逐日課時。", details: [
    { label: "生活主題和遊戲貫穿各學習範疇", value: "校方介紹以生活主題綜合設計課程，透過遊戲、操作和德育故事涵蓋個人與群體、自然、體能健康、藝術、數學和語文；亦按興趣設計科學探索活動。這種安排讓家長可從孩子熟悉的生活經驗理解學習內容。", sourceUrl: "https://www.regentkg.edu.hk/" },
    { label: "校方稱每天安排外籍英語教師授課", value: "官方課程頁列普通話專科教師、圖書閱讀計劃及每天安排外籍英語教師授課。這是校方對語言活動的公開說明，不等於全日英語授課；家庭可索取分級課表確認實際時數。", sourceUrl: "https://www.regentkg.edu.hk/" },
    { label: "當屆申請表列明元朗分校地址", value: "2026/27招生表把分校地址列為元朗安樂路明珠樓一樓，與教育局登記資料所示樓層用字有差異；出發前宜向校方確認入口和實際接送位置。", period: "招生表：2026/27", sourceUrl: "https://www.regentkg.edu.hk/wp-content/uploads/2025/08/26-27%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
  ] }]),

  profile("325511", "教育局概覽：2026/27；校方課程、語言及費用資料查核：2026-10", "德貞幼稚園於2020年遷至深水埗福榮街新校舍，屬寶血會辦學團體。校方列主要教學語言為廣東話，英文和普通話為其他教學語言，並有非華語支援說明。", [
    { label: "教育局《學校位置及資料》", scope: "校號325511、校址0002及深水埗福榮街登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：德貞幼稚園", scope: "校址0002的當屆班制、授課語言、師生比例及學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3255110002" },
    { label: "德貞幼稚園：學校概況", scope: "創校、2020年遷校、辦學宗旨、課程模式、語言及非華語支援。", url: "https://www.tckg.edu.hk/本校概況/本校概況/" },
    { label: "德貞幼稚園：2026年度代辦費", scope: "校方按年級公布的2026年度教育用品及服務代辦項目。", url: "https://www.tckg.edu.hk/本校概況/本校概況/" },
  ], [{ title: "兒童主導課程與多元語言支援", featured: true, note: "語言安排及課程模式為校方自述；未推定英語或普通話的課時比例。", details: [
    { label: "校本課程強調從經驗和感官探索學習", value: "校方稱採兒童主導的校本課程，透過互動活動讓幼兒從經驗學習、感官探索，並在群體生活中練習相處。學校亦把自理、自信與解難列為辦學目標；家長可問清主題活動如何按K1至K3逐步深化。", sourceUrl: "https://www.tckg.edu.hk/本校概況/本校概況/" },
    { label: "主要教學語言為廣東話，另有英文及普通話", value: "學校概況把廣東話列為主要教學語言，英文及普通話為其他教學語言，並列出非華語中文支援。家中主要使用英語或普通話的家庭，可在參觀時確認校內日常溝通和課堂語言安排。", sourceUrl: "https://www.tckg.edu.hk/本校概況/本校概況/" },
    { label: "與同一辦學團體的中小學有教育脈絡連結", value: "校方列出同屬寶血會辦學團體的幼稚園、小學及中學。這是辦學團體關係，並不表示幼稚園學生可自動升讀團體旗下小學或中學；升學須按各校招生安排申請。", sourceUrl: "https://www.tckg.edu.hk/本校概況/本校概況/" },
  ] }]),

  profile("324680", "教育局概覽：2026/27；校方課程資料查核：2026-10", "九龍靈糧堂幼稚園位於九龍城嘉林邊道，教育局概覽列有PN及上午、下午、全日班。校方介紹兒童本位、螺旋式主題課程、自由遊戲及普通話／外籍英語語文活動；幼兒園另址服務不與此校址混為一談。", [
    { label: "教育局《學校位置及資料》", scope: "校號324680、校址0001及九龍城嘉林邊道地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：九龍靈糧堂幼稚園", scope: "校址0001班制、PN、師生比例、語言及核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3246800001" },
    { label: "九龍靈糧堂幼稚園：課程介紹", scope: "兒童本位、螺旋式課程、兩文三語、自由遊戲、家長參與和非華語支援。", url: "https://kllck.edu.hk/kllckg/學校資料/課程介紹/" },
    { label: "九龍靈糧堂幼稚園：招生資料", scope: "校方公布的2026/27招生安排入口；下一屆日期須重新核對。", url: "https://kllck.edu.hk/kllckg/招生資料/" },
  ], [{ title: "兒童本位、自由遊戲與多語接觸", featured: true, note: "課程及語文安排屬校方自述；不把「兩文三語」解讀成平均課時。", details: [
    { label: "按生活經驗與發展需要設計螺旋式課程", value: "校方稱以幼兒生活經驗和發展需要規劃課程，透過螺旋式主題教學、專題研習和藝術活動逐步建構概念。家長可詢問主題如何從孩子的觀察延伸到表達、數概念或生活自理，判斷學習是否貼近孩子的步伐。", sourceUrl: "https://kllck.edu.hk/kllckg/學校資料/課程介紹/" },
    { label: "自由遊戲讓幼兒自行選擇活動", value: "校方介紹幼兒可自行選擇是否參與、和誰玩、玩甚麼及何時玩，教師則透過環境和材料支持探索。這類模式重視自主性；對仍需要較多成人引導的孩子，家長可了解老師如何觀察和介入。", sourceUrl: "https://kllck.edu.hk/kllckg/學校資料/課程介紹/" },
    { label: "普通話及外籍英語教師參與語文活動", value: "學校稱設普通話教師及外籍英語教師進行語文活動，但沒有公布各級每日時數。家長若需要特定語言沉浸程度，應索取校址0001現行課表核對。", sourceUrl: "https://kllck.edu.hk/kllckg/學校資料/課程介紹/" },
  ] }]),

  profile("324787", "教育局概覽：2026/27；校方課程與學生支援資料查核：2026-10", "佛教曾果成中英文幼稚園位於深水埗麗閣邨，校方2026/27招生資訊介紹探索式課程、英語及普通話教師、戶外學習與特色運動；另公開到校支援服務。校方宣傳的課程理念不代表每項活動必然適用每名幼兒。", [
    { label: "教育局《學校位置及資料》", scope: "校號324787、校址0001及深水埗麗閣邨登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：佛教曾果成中英文幼稚園", scope: "校址0001當屆班制、授課語言、師生比例及核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3247870001" },
    { label: "佛教曾果成中英文幼稚園：2026/27招生資訊", scope: "當屆招生頁列出的探索式教學、語文教師與特色運動等校方特色。", url: "https://www.tsangkorsing.edu.hk/?p=8042" },
    { label: "佛教曾果成中英文幼稚園：學生支援", scope: "到校支援、新生適應、情緒社交及家庭服務的校方說明。", url: "https://www.tsangkorsing.edu.hk/?page_id=7939" },
  ], [{ title: "探索式學習、語言活動與到校支援", featured: true, note: "以下課程和支援均來自校方公開資料；服務資格、內容及頻率應個別查詢。", details: [
    { label: "探索活動和戶外學習是校方招生特色", value: "2026/27招生頁提到探索式教學、戶外學習、繪本，以及乒乓球和詠春等特色運動。這些資訊可作校訪問題起點；家長應確認活動是否納入日常課程、各級參與安排及是否另收費。", period: "招生資料：2026/27", sourceUrl: "https://www.tsangkorsing.edu.hk/?p=8042" },
    { label: "有外籍英語教師與普通話教師", value: "校方稱設駐校外籍英語及普通話教師，建立語言環境；公開招生頁沒有列每種語言的課時或主導語言。若家庭重視中英普比例，應索取班級時間表和活動例子。", period: "招生資料：2026/27", sourceUrl: "https://www.tsangkorsing.edu.hk/?p=8042" },
    { label: "公開到校跨專業支援及漸進適應安排", value: "學生支援頁介紹與明愛服務合作，按需要提供校本訓練，並列情緒社交支援、家長教育及新生漸進適應措施。這不等於每名學生自動獲得相同服務，需與學校了解評估、轉介及名額流程。", sourceUrl: "https://www.tsangkorsing.edu.hk/?page_id=7939" },
  ] }]),
];

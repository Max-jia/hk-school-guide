import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const DATASET = "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information";
const KGP_OVERVIEW = "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/index.html";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  note: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const locationDetail = school.detailSections
    ?.flatMap((section) => section.details)
    .find((detail) => detail.label === "教育局登記校址");
  if (!locationDetail) throw new Error(`EDB registered location missing for ${schoolNumber}`);
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校名、地址、類別及授課時段；資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: DATASET },
    { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記地址和狀態；本地名錄下載日期2026-10-23。`, url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    gradeSpan: school.gradeSpan === "幼稚園班級；各校址班制見概覽" ? "班級及年齡按校方當屆資料核對" : school.gradeSpan,
    dataYear: "教育局位置資料截至2026-09-30；註冊資料截至2026-10-23；校方資料按各來源標示年度",
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: [
      ...details,
      {
        title: "教育局年度概覽資料",
        note: "本輪未取得可確認屬於此校號及登記校址的《幼稚園概覽2026/27》個別頁；不以同一辦學團體其他校址的數字代填。",
        details: [{
          label: "教育局概覽中未核實的校址資料",
          value: "教育局年度概覽的個別校址數據未能核實，因此不推算班制、師生比例、資助後學費或招生名額。若上方另有校方公布的課程或收費，按該校方來源和年度理解；報名前向校方索取當屆書面資料。",
          period: "查核日期：2026-10-23",
          sourceUrl: KGP_OVERVIEW,
        }],
      },
    ],
  };
}

/** Kindergarten profile batch 40: ten registered records lacking a usable 2026/27 KGP location profile. */
export const KINDERGARTEN_BATCH_40: PilotSchool[] = [
  profile("630640", "按教育局校號630640及英皇道901—907號登記地址識別。教育局資料列臨時註冊；校方把鰂魚涌校舍列入2026/27申請資料。課程與語言資料採辦學團體頁面，未把其他校舍學費套用到新校址。", "https://mansangkg.edu.hk/", [
    { label: "香港民生幼稚園：校本課程", scope: "主題教學、兒童設計活動、語言課程及情緒健康方向；屬辦學團體網頁的校方說明。", url: "https://mansangkg.edu.hk/curriculum?lang=cht" },
    { label: "香港民生幼稚園：學制與時段", scope: "PN至K3、三語／英普班及時段；所列學費頁標示2025/26，未作為鰂魚涌新校舍當屆學費。", url: "https://mansangkg.edu.hk/sessions?lang=cht" },
    { label: "香港民生幼稚園：2026/27申請表", scope: "列明鰂魚涌校舍地址及校舍選擇；申請表不等同學額或錄取承諾。", url: "https://mansangkg.edu.hk/cms/images/data/HKMSKG%20-%202026-2027%20Application%20Form.pdf" },
  ], [{ title: "新校址、語言班別與校本課程", featured: true, note: "學校網站同時服務多個校舍；校本課程為團體層面的說明。2025/26費用頁並非鰂魚涌校址2026/27收費，不在此引用。", details: [
    { label: "鰂魚涌校舍自2026/27起列入申請", value: "校方2026/27申請表列出鰂魚涌英皇道901至907號校舍，並要求家長選定申請校舍。這代表校方已將新校址納入申請渠道，不代表當屆有位；教育局登記資料截至2026年10月仍標示臨時註冊。報名前應確認校舍啟用安排、班級、上課時段及校址專屬收費。", period: "2026/27申請表；教育局註冊資料截至2026-10-23", sourceUrl: "https://mansangkg.edu.hk/cms/images/data/HKMSKG%20-%202026-2027%20Application%20Form.pdf" },
    { label: "校方設兩種語言班，不能只看『兩文三語』標籤", value: "校方列有英語、粵語、普通話班，以及以英語和普通話為主要學習語言的英普班；教師以雙班主任方式帶領。這是班別設計，不等於每個校址的課時比例。若家中希望孩子以粵語為主或加強普通話，應先確認鰂魚涌校舍當屆是否開辦相應班別及每日語言安排。", sourceUrl: "https://mansangkg.edu.hk/sessions?lang=cht" },
    { label: "課程以主題與兒童活動設計連接生活經驗", value: "校方稱中文課程結合主題教學及兒童設計活動，英語課程採用Jolly Phonics，並設情緒健康課程。對家長而言，值得確認的是不同語言班如何落實這些安排，以及新校址教師如何回饋孩子進展；網站未公布鰂魚涌校舍的分班課時表。", sourceUrl: "https://mansangkg.edu.hk/curriculum?lang=cht" },
  ] }]),

  profile("630160", "按教育局校號630160及西貢安禧街8號登記地址識別。校方所屬新界婦孺福利會的幼兒教育服務頁確認和富幼稚園列入其兩所幼稚園；未把機構對其他幼兒學校的支援服務直接當作本校已開辦服務。", "https://www.ntwjwa.org.hk/zh/early-childhood", [
    { label: "新界婦孺福利會：幼兒教育服務", scope: "辦學團體的幼兒教育宗旨、旗下和富幼稚園名單及家長參與方向；並非該校舍獨立課程文件。", url: "https://www.ntwjwa.org.hk/zh/early-childhood" },
  ], [{ title: "新辦校址與辦學團體的服務方向", featured: true, note: "校方目前可公開核對的課程細節有限；以下把機構層面資料和本校登記事實分開，不推斷未公布的班級、語言或收費。", details: [
    { label: "和富幼稚園列於辦學團體的幼稚園服務名單", value: "新界婦孺福利會服務頁列出兩所幼稚園，其中包括和富幼稚園，並說明機構幼兒教育服務面向2至6歲兒童及家庭。這是機構層面的服務介紹；教育局登記資料列和富幼稚園位於西貢安禧街8號，狀態為臨時註冊。家長可先確認校舍實際開課日期、收生年級及全日照顧時段。", period: "辦學團體頁面查閱：2026-10；註冊資料截至2026-10-23", sourceUrl: "https://www.ntwjwa.org.hk/zh/early-childhood" },
    { label: "機構重視兒童均衡發展與家長參與", value: "辦學團體把智能、體能、語言、社交及情緒均衡發展列為服務方向，並視家長為幼兒教育伙伴。這可作為理解辦學團體價值取向的參考，但尚不足以判斷和富校舍的日常教學做法；參觀時宜問清課程例子、家校溝通方式和新生適應安排。", sourceUrl: "https://www.ntwjwa.org.hk/zh/early-childhood" },
  ] }]),

  profile("629529", "按教育局校號629529及西九龍海輝道8號登記地址識別。英基官方校頁列2026年成立、3至5歲及IB PYP探究式課程；官方學費表列2026/27英語班與雙語班收費。", "https://join-us.esf.edu.hk/zh-hant/schools/esf-west-kowloon-kindergarten/", [
    { label: "英基西九龍幼稚園：校舍與課程", scope: "校址、成立年份、年齡、IB PYP課程及校巴路線。", url: "https://join-us.esf.edu.hk/zh-hant/schools/esf-west-kowloon-kindergarten/" },
    { label: "英基幼稚園：申請程序", scope: "最多四個志願、年齡分級及學位安排；當屆日期須看新公告。", url: "https://join-us.esf.edu.hk/zh-hant/kindergarten-admissions-process/" },
    { label: "英基：2026/27學費", scope: "西九龍幼稚園英語班及雙語班年費；不包括其他非學費支出。", url: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ], [{ title: "新校的IB探究課程與雙語選擇", featured: true, note: "校方資料稱學校於2026年成立；教育局註冊資料仍列臨時註冊。申請及收費均按英基當屆公告核對。", details: [
    { label: "2026年開校，服務3至5歲幼兒", value: "英基校頁列西九龍幼稚園於2026年成立，對象為3至5歲，地址在浪澄灣廣場。這是新校，家長不宜用其他英基校舍的歷年家長經驗推斷本校日常；宜親自查看新校師資、班額、校車站點和入學適應安排。", period: "校方資料查閱：2026-10", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/schools/esf-west-kowloon-kindergarten/" },
    { label: "IB PYP以探究和提問組織學習", value: "校方描述課程採國際文憑小學項目（IB PYP）的探究式教育，鼓勵孩子提問及自主學習，並稱課程框架與英基小學相連。這提供課程連續性的可能，但不等於保證升讀指定小學；家長要另核對英基當屆入學條件與銜接規則。", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/schools/esf-west-kowloon-kindergarten/" },
    { label: "英語班與雙語班的年度學費不同", value: "英基2026/27學費表列西九龍幼稚園英語班每年HK$112,000、雙語班HK$132,000，按一年十個月繳交。報名時需核對班別、按月支出、申請費及其他費用；學費表不代表學位供應或錄取概率。", period: "2026/27學年；港幣", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ] }]),

  profile("629910", "按教育局校號629910及鰂魚涌康愉街14號登記地址識別。英基校頁說明本校採IB PYP、重視社群與實踐學習；英基中央頁公布2026/27收費。教育局名錄未提供可配對的2026/27幼稚園概覽個別頁。", "https://qbsk.esf.edu.hk/zh/", [
    { label: "英基鰂魚涌小學幼稚園：課程與校園", scope: "校方課程、評估、環境保護、實踐學習和社群參與介紹。", url: "https://qbsk.esf.edu.hk/zh/" },
    { label: "英基幼稚園：申請程序", scope: "英基中央申請及年級安排；不是該校舍當屆錄取承諾。", url: "https://join-us.esf.edu.hk/zh-hant/kindergarten-admissions-process/" },
    { label: "英基：2026/27學費", scope: "鰂魚涌小學幼稚園年度學費。", url: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ], [{ title: "IB PYP、實踐學習與校舍社群", featured: true, note: "學校官方頁的課程與校園內容未必等同每班一致安排；具體授課時數、名額和接送須向校舍確認。", details: [
    { label: "採IB PYP並以學習報告及電子作品集呈現進展", value: "校方表示採用IB小學項目框架，評估包括成長進度報告及電子作品集。對家長而言，重點不只是課程名稱，而是教師如何記錄孩子的語言、探究和社交發展；參觀時可索取作品集示例，了解回饋是否具體到下一步。", sourceUrl: "https://qbsk.esf.edu.hk/zh/" },
    { label: "烹飪、園藝與校外活動把學習連到真實情境", value: "校方列出烹飪、室內外園藝及課外活動，並以環境保護和社區參與作為學校重點。這些活動適合重視實作和社群經驗的家庭；但網站沒有列出每級活動頻率，應問清孩子實際參與機會、校外活動安排和所需用品。", sourceUrl: "https://qbsk.esf.edu.hk/zh/" },
    { label: "2026/27年費為HK$117,500", value: "英基中央學費表列鰂魚涌小學幼稚園2026/27學費HK$117,500，一年分十個月繳付。這是學費，不應視為包括校車或其他項目的總成本；申請時請核對當屆費用與可能的非學費支出。", period: "2026/27學年；港幣", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ] }]),

  profile("629162", "按教育局校號629162及西沙GO PARK 2地址識別。英基校方說明西沙校舍於2026年8月開學，提供英語及普通話雙語課程，並採遊戲式探究與IB PYP。官方公告稱符合主流教育條件者可銜接啓新書院；不是無條件錄取保證。", "https://rchkk.esf.edu.hk/zh/", [
    { label: "英基啓新書院幼稚園：學習與校園", scope: "雙語、遊戲式探究、IB PYP、教室及學習環境。", url: "https://rchkk.esf.edu.hk/zh/" },
    { label: "英基：啓新書院幼稚園開校公告", scope: "開校年份、雙語課程及符合主流教育條件者的升學銜接政策說明。", url: "https://join-us.esf.edu.hk/zh-hant/new-esfrenaissancecollegekindergarten-announcement-faq/" },
    { label: "英基幼稚園：申請程序", scope: "中央申請程序與一般年齡安排；實際名額及評估以當屆通知為準。", url: "https://join-us.esf.edu.hk/zh-hant/kindergarten-admissions-process/" },
    { label: "英基：2026/27學費", scope: "啓新書院幼稚園英語班及雙語班學費。", url: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ], [{ title: "西沙新校的雙語探究與升學銜接", featured: true, note: "官方頁稱西沙校舍於2026年8月開學。銜接啓新書院須符合英基主流教育條件，家庭應核對個別評估和支援需要。", details: [
    { label: "以遊戲式探究、開放空間及IB PYP培養主動學習", value: "校方介紹以遊戲式探究和IB PYP組織幼兒學習，教室設建構、藝術、角色扮演和體能活動空間。這種環境讓孩子有較多自主選擇；家長可了解教師如何把自由探索轉成語言、數理和合作能力，並確認新校運作後各項設施的日常使用方式。", sourceUrl: "https://rchkk.esf.edu.hk/zh/" },
    { label: "校方公布英語與普通話雙語課程", value: "英基公告稱新校提供雙語課程，校方網站亦說明英語和普通話融入不同學習領域。這不等於平均各半或固定課時；若家庭重視普通話輸入，應索取當屆時間表並了解中文教師配置。", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/new-esfrenaissancecollegekindergarten-announcement-faq/" },
    { label: "與啓新書院銜接有明確條件，不是自動保證", value: "英基開校公告表示，能接受主流教育的幼稚園學生將獲啓新書院學位。這是附有主流教育條件的政策，不能簡化為無條件直升；家長應預先了解評估、學習支援和學生適應要求，同時保留其他升學選項。", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/new-esfrenaissancecollegekindergarten-announcement-faq/" },
    { label: "2026/27學費按語言班別分列", value: "英基2026/27學費表列啓新書院幼稚園英語班每年HK$122,000、雙語班HK$142,000，一年分十個月繳付。申請前要確認語言班、其他收費、交通安排及升學政策是否符合家庭計劃。", period: "2026/27學年；港幣", sourceUrl: "https://join-us.esf.edu.hk/zh-hant/school-fees/" },
  ] }]),

  profile("629758", "按教育局校號629758及福蔭道海峰園登記地址識別。教育局登記名含『國際幼稚園』，校方網站以『海峰園幼兒園』稱呼該校舍；以下採用同一地址核對，不與其他維多利亞校舍合併收費。", "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/", [
    { label: "維多利亞海峰園校舍：課程與班級", scope: "海峰園校舍年齡、班級、IB PYP、語言班別、校車資訊及地址。", url: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/" },
    { label: "維多利亞：2026/27學費", scope: "按海峰園校舍列出各年級年度學費；與其他校舍分列。", url: "https://www.victoria.edu.hk/zh-hk/tution/" },
    { label: "維多利亞：入學申請程序", scope: "各校舍申請程序及出生月份安排；實際班額須向校舍確認。", url: "https://www.victoria.edu.hk/zh-hk/application-procedure/" },
  ], [{ title: "海峰園校舍的IB課程與兩文三語班", featured: true, note: "校方頁採用『幼兒園』名稱；教育局登記校號和地址作身份依據。課程、學費依海峰園校舍資料，不能套用其他維多利亞校舍。", details: [
    { label: "校方列小組班至K3，收生年齡約1歲10個月至5歲11個月", value: "海峰園校舍頁列出2歲以下及以上小組班，並開設幼兒班至幼稚園高班。年齡區間有助家庭判斷照顧銜接，但出生月份與年級仍須按當屆規則確認；教育局本年度概覽個別資料未取得，不以此校方年齡範圍推算官方班額。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/" },
    { label: "IB小學項目與兩文三語班別同時存在", value: "校方列海峰園採用國際文憑小學項目，並提供英語、普通話及粵語班別。課程框架和語言班是兩個不同資訊；若家庭有特定語言目標，應問清目標班別的實際授課安排及語言使用比例。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/" },
    { label: "海峰園2026/27學費按年級約HK$130,450至148,401", value: "校方2026/27收費表按海峰園不同班級列出年度學費：小組班HK$148,401，幼兒班HK$143,495，低班HK$130,450，高班HK$132,900；所選班級及其他費用需以當屆表格核對。這是私立校舍費用，家庭應按預計入讀年級計算全年支出。", period: "2026/27學年；港幣", sourceUrl: "https://www.victoria.edu.hk/zh-hk/tution/" },
  ] }]),

  profile("532550", "按教育局校號532550及深水埗南昌街72號登記校址識別。智樂官方網站列有多個服務地址；本頁採教育局所列兆昌大廈校址，課程描述只作校方整體介紹，不把其他地址當成本校的登記地址。", "https://www.chelok.edu.hk/", [
    { label: "智樂幼稚園：辦學宗旨與校址", scope: "遊戲中學習、愛與尊重的辦學宗旨，以及校方列出的服務地址。", url: "https://www.chelok.edu.hk/" },
  ], [{ title: "以遊戲和尊重支持幼兒發展", featured: true, note: "校方官網可確認辦學方向及多個地址，但未能從可讀公開頁核實本登記校址的2026/27班制、語言和費用。", details: [
    { label: "校方把遊戲列為幼兒學習的重要方式", value: "智樂幼稚園稱會引導兒童從遊戲中學習，並希望孩子在愛與尊重的環境中成長。對家長來說，參觀時可觀察教師如何參與遊戲、提出問題並延伸孩子想法；公開頁未提供足夠細節判斷各年級的日常課程或評估方式。", sourceUrl: "https://www.chelok.edu.hk/" },
    { label: "先按教育局登記地址確認實際就讀校址", value: "教育局登記地址為南昌街72號兆昌大廈地下及一樓，校方網站另列南昌街和大南街等地址。家長填申請前應讓校方確認該地址對應的校號、班級與上課地點，並實地查看出入口、接送安排及校舍使用範圍。", sourceUrl: "https://www.chelok.edu.hk/" },
  ] }]),

  profile("629030", "按教育局校號629030及西貢安麗苑安昇閣登記地址識別。校方網站稱提供全日制教育與照顧，並附暫託及延長時間服務；教育局登記類別為幼稚園暨幼兒中心，現列臨時註冊。", "https://cyk.edu.hk/", [
    { label: "潮陽幼稚園／幼兒園（安麗苑）：校方介紹", scope: "安麗苑校址、全日教育照顧、暫託及延長時間服務的校方說明。", url: "https://cyk.edu.hk/" },
  ], [{ title: "全日照顧與幼兒中心服務", featured: true, note: "名稱與服務類別同時包含幼稚園和幼兒中心；家長需確認申請的年齡組別、正式上課時數及額外照顧收費。", details: [
    { label: "校方主打全日教育與照顧，並提供延長時間服務", value: "安麗苑校方頁面稱提供全日制教育與照顧，另設暫託及延長時間服務。對雙職家庭而言，這能提供照顧時段上的選擇，但不代表所有班級都使用相同時數或服務名額充足；申請前應確認適用年齡、開放時間、額外收費及服務預約方式。", sourceUrl: "https://cyk.edu.hk/" },
    { label: "登記校址在西貢安麗苑，通勤需按安愉道路線評估", value: "教育局登記地址是安麗苑安昇閣低層地下，校方亦在首頁列出同一地址。由於教育局標示授課時段為上午而校方介紹全日照顧，家長應分清幼稚園課堂、中心照顧及延長服務的時間邊界，並向校方索取當屆日程。", sourceUrl: "https://cyk.edu.hk/" },
  ] }]),

  profile("564524", "按教育局校號564524及嘉林邊道1號4至5樓登記校址識別。與同一辦學團體位於3樓的九龍靈糧堂幼稚園分開處理；本頁只採用幼兒園自身的課程、班制和服務頁。", "https://kllck.edu.hk/kllcdn/", [
    { label: "九龍靈糧堂幼兒園：學校簡介", scope: "幼兒園成立背景、基督教服務使命及登記校址。", url: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/" },
    { label: "九龍靈糧堂幼兒園：課程介紹", scope: "兒童為本、螺旋課程、自由遊戲、兩文三語與社區參訪。", url: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/%E8%AA%B2%E7%A8%8B%E4%BB%8B%E7%B4%B9/" },
    { label: "九龍靈糧堂幼兒園：服務與班級", scope: "全日小組及K1至K3班級、服務時段；頁面收費為舊學年，未作現行學費。", url: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/%E6%9C%8D%E5%8B%99%E4%BB%8B%E7%B4%B9/" },
  ], [{ title: "全日幼兒服務與兒童為本課程", featured: true, note: "幼兒園校址在4至5樓；同一地址3樓另有幼稚園正校。兩校的課程、年齡、班制及收費不可混用。", details: [
    { label: "幼兒園設2至3歲全日小組，並有K1至K3全日班", value: "校方服務頁列出2至3歲全日小組、幼班至高班，以及平日延長服務時段。家長可把它與半日幼稚園比較照顧安排，但要確認實際小組名額、日常作息、膳食和延長服務安排；校方公開費用表年度較舊，不作本學年收費依據。", sourceUrl: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/%E6%9C%8D%E5%8B%99%E4%BB%8B%E7%B4%B9/" },
    { label: "課程以生活經驗、自由遊戲和專題活動為主軸", value: "校方稱按幼兒發展與生活經驗設計兒童為本課程，以螺旋方式累積概念，並安排自由遊戲、藝術活動和社區參訪。這種做法較重視幼兒自主探索；家長可了解教師如何觀察遊戲、支援語言發展，以及如何向家長回饋孩子進度。", sourceUrl: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/%E8%AA%B2%E7%A8%8B%E4%BB%8B%E7%B4%B9/" },
    { label: "語言活動包括普通話教師及外籍英語教師", value: "校方表示會安排普通話教師和外籍英語教師進行語文活動，但沒有公布各語言每日課時。重視粵語、普通話或英語比例的家庭應索取本年度時間表，並確認非華語家庭可用的溝通支援。", sourceUrl: "https://kllck.edu.hk/kllcdn/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/%E8%AA%B2%E7%A8%8B%E4%BB%8B%E7%B4%B9/" },
  ] }]),

  profile("565687", "按教育局校號565687及土瓜灣炮仗街146及146A號地下登記地址識別，對應美雅教育機構的幼兒園，不與同機構正校或分校合併。官方網頁已列2027/28 K1收生入口，但當屆細節按最新表格核對。", "https://www.maynga.edu.hk/", [
    { label: "美雅教育機構：課程、支援及招生資訊", scope: "幼兒園課程特色、非華語支援及2027/28收生頁入口；以各年級及校址公告為準。", url: "https://www.maynga.edu.hk/" },
  ], [{ title: "品德培育、非華語支援與全日幼兒照顧", featured: true, note: "美雅同時營辦正校、分校及幼兒園；本頁只用幼兒園校址與文件。學校網站上的家長心聲屬校方選載，不能當作整體口碑樣本。", details: [
    { label: "幼兒園提供N1照顧，K1收生按當屆申請表安排", value: "美雅官方網站列有幼兒園服務及2027/28 K1收生入口，教育局名錄把本校址列為幼稚園暨幼兒中心、下午授課。兩個來源口徑不同：家長需先確認孩子申請的是幼兒園N1、K1或其他班級，以及每日實際照顧時段，再比較通勤和費用。", period: "校方招生入口查閱：2026-10；教育局註冊資料截至2026-10-23", sourceUrl: "https://www.maynga.edu.hk/" },
    { label: "校方安排品德目標與體驗活動", value: "學校網站介紹按年級設定每月品德關鍵詞和行動目標，並展示校內外體驗活動。這屬校方自述的培育方式；家長可詢問教師如何記錄孩子行為、遇到情緒或社交困難時怎樣跟進，避免只以活動照片判斷課程深度。", sourceUrl: "https://www.maynga.edu.hk/" },
    { label: "設非華語支援小組及家校溝通支援", value: "校方列出非華語支援小組、中文學習教材、多元文化活動，並稱家長可預約翻譯或傳譯安排。若家庭以英語或其他語言溝通，申請前可確認會面語言、支援小組的年級範圍和服務頻率。", sourceUrl: "https://www.maynga.edu.hk/" },
  ] }]),
];

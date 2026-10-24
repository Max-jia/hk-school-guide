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
  gradeSpan = "班級及年齡按校方當屆資料核對",
  clearDirectoryReports = false,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校名、地址、類別及授課時段；資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: DATASET },
    { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}登記資料；本地名錄下載日期2026-10-23。`, url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    gradeSpan,
    dataYear: "教育局位置資料截至2026-09-30；註冊資料截至2026-10-23；校方資料按各來源標示年度",
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    clearDirectoryReports,
    ...(clearDirectoryReports ? { relatedReportSlugs: [] } : {}),
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: [
      ...details,
      {
        title: "教育局年度概覽資料",
        note: "本輪未取得可確認屬於此校號及登記校址的《幼稚園概覽2026/27》個別頁；不以同一辦學團體其他校址的數字代填。",
        details: [{
          label: "班制、比例與收費的資料邊界",
          value: "未能配對教育局當屆個別校址概覽，因此不推算師生比例、學費或招生名額。若上方有校方公布的班級或費用，須按其標示年度理解；報名前向校方索取目標校址的當屆書面資料。",
          period: "查核日期：2026-10-23",
          sourceUrl: KGP_OVERVIEW,
        }],
      },
    ],
  };
}

/** Kindergarten profile batch 41: ten remaining registered records, with location-scoped evidence. */
export const KINDERGARTEN_BATCH_41: PilotSchool[] = [
  profile("566284", "按教育局校號566284及堅道129–133號登記校址識別。校方現行網頁分別介紹幼兒園N1與K1–K3；課程理念採校方自述，舊年度費用不當作現行收費。", "https://www.wisely.edu.hk/", [
    { label: "偉思幼稚園／幼兒園：校方簡介", scope: "創校年份、N1至K3年齡、班級時段及網站所列費用年度。", url: "https://www.wisely.edu.hk/學校簡介/" },
    { label: "偉思幼稚園／幼兒園：辦學理念", scope: "活動教學、多元智能、創意角及品格培育；屬校方理念自述。", url: "https://www.wisely.edu.hk/en/our-philosophy/" },
    { label: "偉思幼稚園／幼兒園：入學須知", scope: "2026/27年度申請年齡、面見與註冊安排；年度日期不外推。", url: "https://www.wisely.edu.hk/入學須知/" },
  ], [{ title: "活動教學與幼兒階段銜接", featured: true, note: "幼兒園N1及幼稚園K1–K3同址服務；以下課程理念為校方自述，2024–2026費用頁已過當屆，不作現行學費引用。", details: [
    { label: "N1至K3按年齡分級，服務時段延伸至放學後", value: "校方簡介列N1為2–3歲、K1至K3為3–6歲，並列上午、下午及全日班；服務時段另延至平日傍晚。對需要較長照顧時段的家庭，應先確認目標年級是否開辦全日班、午膳及延展照顧的費用，幼兒園N1資料不要直接套用到K1–K3。", sourceUrl: "https://www.wisely.edu.hk/學校簡介/" },
    { label: "校方以活動教學和多元智能組織學習", value: "校方稱課程按幼兒發展設計，結合活動教學、多元智能和創意角，並重視愛心、生活習慣及自理。這說明學校的課程取向，不是已證明的學習成效；家長參觀時可看一節日常活動，了解教師怎樣把自由探索連到語言、數感和同伴合作。", sourceUrl: "https://www.wisely.edu.hk/en/our-philosophy/" },
    { label: "2026/27招生頁只能作上一輪流程參考", value: "校方頁面列2026/27申請年齡和面見安排，該輪報名日期已過。新一年度的年齡界線、申請時間和註冊文件須等校方更新；舊頁提到的優先考慮不等於保證取錄。", period: "校方2026/27招生資料；歷史年度", sourceUrl: "https://www.wisely.edu.hk/入學須知/" },
  ] }]),

  profile("566900", "按教育局校號566900及君逸山1樓登記校址識別，與同一地點不同樓層／校號的幼稚園分開。維多利亞校方2026/27課表列何文田PN至K3班別與三語安排；沒有將其他校舍收費套用到此校址。", "https://www.victoria.edu.hk/campus/homantin-campus/", [
    { label: "維多利亞何文田校舍：校舍資料", scope: "校舍年份、年齡範圍、課程框架、三語班別及交通。", url: "https://www.victoria.edu.hk/campus/homantin-campus/" },
    { label: "維多利亞教育機構：2026/27課表", scope: "何文田校舍各級班別及英語、普通話、粵語課程類別；實際開班或調整。", url: "https://www.victoria.edu.hk/programme-class-schedule/" },
    { label: "維多利亞教育機構：申請程序", scope: "當屆申請流程及日期；以目標校舍的新公告為準。", url: "https://www.victoria.edu.hk/zh-hk/application-procedure/" },
  ], [{ title: "三語課程與何文田校址選擇", featured: true, note: "校方資料同時涵蓋PN及幼稚園；不把整個VEO網絡的安排視為何文田每班實際課時。", details: [
    { label: "何文田校舍服務1歲10個月至5歲11個月幼兒", value: "校方列何文田校舍於2005年成立，設PN、幼兒班及K1至K3，並採IB小學項目（PYP）框架。家長要先分清PN照顧需求與K1至K3課程比較；PYP是課程框架，並非升讀特定小學的保證。", sourceUrl: "https://www.victoria.edu.hk/campus/homantin-campus/" },
    { label: "2026/27何文田校舍列三語課程班別", value: "校方課表列PN至K3各級的英語、普通話及粵語課程班別，部分年級只列上午或下午選項。這能幫家庭先篩選語言方向，但未提供每週各語言課時比例；申請前要確認孩子所報年級、時段及班別是否當屆開辦。", period: "2026/27學年", sourceUrl: "https://www.victoria.edu.hk/programme-class-schedule/" },
    { label: "校方的課程定位包括探究與品格發展", value: "校長介紹把探究學習、品格培育和同理心列為校舍方向。家長可把這些理念轉成可觀察問題：教師如何引導孩子提出問題、怎樣記錄學習進度，以及三語環境中如何照顧不同語言起點。", sourceUrl: "https://www.victoria.edu.hk/campus/homantin-campus/" },
  ] }]),

  profile("563188", "按教育局校號563188及銅鑼灣禮頓道140A登記校址識別。此校為全日制幼兒園／幼兒中心，與禮頓道1018號的聖保祿幼稚園（校號214612）是兩所獨立登記學校，班制及收費不可混用。", "https://spn.edu.hk/prospectus", [
    { label: "聖保祿幼兒園：簡章（2026年8月）", scope: "年齡、N1收生、活動時間、學費、申請日期及名額上限。", url: "https://spn.edu.hk/prospectus" },
    { label: "聖保祿幼兒園：使命與服務精神", scope: "非牟利幼兒全日照顧、活動設計及教育目標；屬校方自述。", url: "https://spn.edu.hk/about" },
    { label: "教育局《學校位置及資料》：聖保祿幼兒園", scope: "校號563188、校址及全日授課時段。", url: EDB_LOCATION },
  ], [{ title: "全日照顧與N1收生規則", featured: true, note: "校方簡章更新於2026年8月。這是幼兒園／幼兒中心服務，不應與同名聖保祿幼稚園的半日課程和升學安排混為一談。", details: [
    { label: "只招收滿2歲而未滿3歲的新生", value: "校方簡章列服務對象為2至6歲，但新生只收N1，即滿2歲而未滿3歲兒童；N2至N4為在讀班級編制。若家庭要找K1至K3的新生學位，這份簡章不代表本園提供同類入學路線。", sourceUrl: "https://spn.edu.hk/prospectus" },
    { label: "校方把生活活動、社交禮貌與自主能力放在全人照顧中", value: "校方教育目標提到透過有意義的活動和親身經驗學習，並練習自理、選擇及理解行為後果。這與全日照顧場景相連；家長可了解照顧常規和自由遊戲如何平衡，並確認宗教活動安排是否符合家庭需要。", sourceUrl: "https://spn.edu.hk/about" },
    { label: "平日全日活動由上午8時至下午5時30分", value: "校方列星期一至五全日服務，星期六、日及公眾假期休息。對需要長時間照顧的家庭，須把接送、颱風暴雨停課和臨時接回安排一併納入；服務時段不是幼兒每天都參與相同課程的證據。", sourceUrl: "https://spn.edu.hk/prospectus" },
    { label: "2027/28 N1每年新生不超過54名，空缺時才面見", value: "校方2026年8月簡章列2027/28申請期為2027年3月1日至5日，並指有空缺時才約見，全年新生不超過54名。這是名額上限而非保證學額；家長應預留其他幼兒照顧選項，並以申請年度最新簡章為準。", period: "2027/28申請安排；校方簡章2026-08", sourceUrl: "https://spn.edu.hk/prospectus" },
    { label: "校方明確不承諾自動升讀聖保祿幼稚園", value: "簡章說明幼兒園不負責介紹或保送入讀任何幼稚園或小學，亦不保證自動獲聖保祿幼稚園取錄；在讀幼兒園兒童不會同時獲該幼稚園考慮。家長如有半日班目標，需另按聖保祿幼稚園的獨立招生程序申請。", sourceUrl: "https://spn.edu.hk/prospectus" },
  ] }], "N1至N4（N1新生；N2–N4為校方簡章所列班級）", true),

  profile("215406", "按教育局校號215406識別KELLETT SCHOOL；保留華富及九龍灣兩個註冊校址。校方把兩校舍列為同一學校的預備部，本文課程、收費與入學資訊均屬學校層面，不能據此推斷兩校舍的個別班額。", "https://www.kellettschool.com/", [
    { label: "Kellett School：Reception課程", scope: "EYFS七大學習範疇、遊戲與成人引導比例、專科課程及家校回饋。", url: "https://www.kellettschool.com/preparatory-4-to-11-/reception" },
    { label: "Kellett School：2026/27學費及資本徵費", scope: "Reception至Year 6學費與新生年度資本徵費；不包括所有家庭額外支出。", url: "https://www.kellettschool.com/admissions/fees-debenture-information" },
    { label: "Kellett School：招生程序", scope: "由出生起接受預備部申請、候補安排及2026/27滿額公告。", url: "https://www.kellettschool.com/admissions/admissions-process" },
    { label: "Kellett School：校舍地址", scope: "華富及九龍灣預備部地址與學校多校舍安排。", url: "https://www.kellettschool.com/contact" },
  ], [{ title: "英國EYFS與雙校舍預備部", featured: true, note: "Kellett採Reception–Year 6預備部體系，Reception不是本地幼稚園K1的同義名稱。學校兩個校址均列入教育局登記；個別校舍分配以錄取通知為準。", details: [
    { label: "Reception採英國EYFS，遊戲與教師引導並行", value: "校方列七個學習範疇，並稱以幼兒主導遊戲配合成人引導；學年後段逐步加強系統拼音與讀寫、數感，另有音樂、體育及普通話專科課。這條路線較適合已準備進入英語國際小學課程的家庭；如孩子需要中文為主要教學語言，應先評估家庭語言支持能力。", sourceUrl: "https://www.kellettschool.com/preparatory-4-to-11-/reception" },
    { label: "2026/27預備部學費為HK$218,200，另有年度資本徵費", value: "校方列Reception至Year 6全年學費HK$218,200，並指新生需按條款繳付每年HK$40,000年度資本徵費；校方說明此費不可退還、不可轉讓且不帶來入學優先權。另需預算校巴、校服、午餐及部分課外活動等未包括項目。", period: "2026/27學年；港幣", sourceUrl: "https://www.kellettschool.com/admissions/fees-debenture-information" },
    { label: "申請可由出生起提交，但2026/27已滿額", value: "校方接受預備部由出生起申請，沒有固定截止日，候補名單會隨學額變動；招生頁目前標示2026/27學年已滿。這不代表下一學年同樣滿額，也不能由申請早晚推算錄取機會；提交前先確認意向校舍及等候安排。", period: "校方招生頁查閱：2026-10；2026/27名額狀態", sourceUrl: "https://www.kellettschool.com/admissions/admissions-process" },
    { label: "學校有華富及九龍灣兩個預備部校址", value: "教育局登記列華富華樂徑2號及九龍灣臨興街7號兩個地址；校方亦要求申請家庭說明意向校舍。兩地通勤和上課時段不同，取得offer時要核對校舍、校巴線和接送時間，不能把同一校名視作單一校區。", sourceUrl: "https://www.kellettschool.com/contact" },
  ] }], "Reception（約4歲起；英國預備部年級制，非本地K1–K3分級）"),

  profile("231088", "按教育局校號231088及上水龍琛路26–28號登記校址識別。教育局學校搜尋列全日授課與男女生；校方網址目前無法取得可核對的當屆課程頁，故不引用第三方或舊年度課程說法。", "http://www.bilok-holford.edu.hk", [
    { label: "教育局學校搜尋：比諾中英文幼稚園", scope: "校號、校址、全日授課、性別、註冊日期及校方網站。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=231088000113" },
    { label: "教育局：學校位置及資料", scope: "登記名稱、地區、地址及授課時段。", url: EDB_LOCATION },
  ], [{ title: "登記資料與現行課程資訊邊界", featured: true, note: "本輪未能從校方網站取得可核對的現行課程、語言或招生資料；不以第三方網頁代替校方當屆文件。", details: [
    { label: "教育局登記為上水全日制私立幼稚園", value: "教育局學校搜尋列校號231088、男女校、北區、全日授課，地址為上水石湖墟龍琛路26–28號地下及二樓，並列正式註冊日期。家庭可用校號及地址與校方核實是否為目前接受申請的校址。", period: "教育局註冊資料截至2026-10-23", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=231088000113" },
    { label: "課程與收費須向校方索取最新書面資料", value: "本次未能取得可驗證的2026/27校方課程、授課語言、師生比例及收費資料；其他網站對教學法或收費的說法可能屬舊年度。報名前請直接向學校索取當屆班級時間表、核准收費證明和招生安排。", period: "查核日期：2026-10-23", sourceUrl: "http://www.bilok-holford.edu.hk" },
  ] }]),

  profile("320897", "按教育局校號320897及油麻地新填地街52–58號2樓登記校址識別。校方網頁未能取得現行資料；可查的教育局質素評核報告日期為2016年12月，僅作歷史紀錄，不代表目前課程或質素狀況。", "http://www.saintmayschool.com", [
    { label: "教育局學校搜尋：聖美雅學校", scope: "校號、校址、上午授課、男女生及註冊日期。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=320897000111" },
    { label: "教育局質素評核報告：聖美雅學校", scope: "教育局於2016年12月進行的質素評核；屬歷史文件。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SaintMay.pdf" },
  ], [{ title: "油麻地校址與歷史評核資料", featured: true, note: "2016年評核報告距今已久，不能當作現況評級；本輪未核實校方當屆課程、學費及招生資料。", details: [
    { label: "教育局登記為上午授課私立幼稚園", value: "教育局列校號320897、油麻地新填地街52–58號2樓、男女生及上午授課，註冊日期為1968年11月。這些資料可協助核對校址與學校身份；不能由創校或註冊年份推論現行教學品質。", period: "教育局註冊資料截至2026-10-23", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=320897000111" },
    { label: "可查的教育局評核報告為2016年版本", value: "教育局存檔報告記錄評核於2016年12月6、7及9日進行。由於資料年代較早，本頁不將其中觀察概括為學校現況；家長應向校方索取最新課程簡介、班級時間表及最近一次評核結果。", period: "質素評核：2016-12", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SaintMay.pdf" },
  ] }]),

  profile("325686", "按教育局校號325686及樂富邨樂東樓G樓登記校址識別。教育局與校方公開影像資料可確認該校兼設幼兒園；免費遊戲內容來自校方2020年影片，已標示年份，不當作現行課程完整說明。", "http://www.bcgideon.edu.hk", [
    { label: "教育局《學校位置及資料》：基甸幼稚園", scope: "校號、校址、學校類別、授課時段及性別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽》計劃名單", scope: "該校曾列於幼稚園教育計劃名單；年度以名單封面為準。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2425_WTS_6Sep2024.pdf" },
    { label: "香港伯特利教會基甸幼稚園：自由遊戲介紹", scope: "校方2020年發布的自由遊戲推行介紹影片；只反映當時校方說明。", url: "https://www.youtube.com/watch?v=75uyyPi6_Lo" },
  ], [{ title: "幼稚園與幼兒園同址服務", featured: true, note: "校方2020年影片介紹自由遊戲，現行課程細節及學費應以學校最新文件為準；不可用舊年度數字估計本年度家庭支出。", details: [
    { label: "教育局資料列樂富邨上午授課校址", value: "教育局名錄列校號325686、樂富邨樂東樓G樓、上午授課及男女生。教育局2024/25年度計劃名單曾列本校參加幼稚園教育計劃；此名單只確認該年度參與狀態，不作2026/27收費依據。", period: "位置及註冊資料截至2026-10-23；計劃名單2024/25", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2425_WTS_6Sep2024.pdf" },
    { label: "校方曾以自由遊戲作教學介紹主題", value: "學校官方頻道2020年發布影片介紹自由遊戲的推行。這可作為理解其當時教學分享的線索，但不能證明目前各級仍以相同模式或比例實施；家長可直接詢問日常自由遊戲時段及教師如何觀察、回饋孩子。", period: "校方影片：2020-11-17", sourceUrl: "https://www.youtube.com/watch?v=75uyyPi6_Lo" },
  ] }]),

  profile("563366", "按教育局校號563366及友愛邨愛暉樓地下登記資料識別。仁濟醫院友愛校方網站目前使用「業旺邨」名稱及地址，但電話與登記資料相同；公開資料未能確認遷址及校號沿革，故保留教育局登記地址並明示差異。", "https://www.ychyo.org.hk/", [
    { label: "教育局《學校位置及資料》：校號563366", scope: "教育局登記校名、友愛邨愛暉樓地址及全日授課資料。", url: EDB_LOCATION },
    { label: "仁濟醫院友愛幼稚園：官方網站及聯絡", scope: "網站目前使用的業旺邨校名、地址、電話及交通資訊；未證明與EDB登記校址的遷址關係。", url: "https://www.ychyo.org.hk/" },
    { label: "仁濟醫院友愛幼稚園：2026/27招生安排", scope: "校方列N班及K1名額、遊戲和談話面見與非華語家庭傳譯安排；招生年度頁含日期錯漏，動態日期不引用。", url: "https://www.ychyo.org.hk/?page_id=124" },
    { label: "仁濟醫院友愛幼稚園：品德及公民教育", scope: "校方列五育、年度品德主題及價值教育方向；屬校方自述。", url: "https://www.ychyo.org.hk/?lang=en&page_id=4378" },
  ], [{ title: "校址差異、面見安排與品格教育", featured: true, note: "教育局登記地址與校方現行網站地址不同，雖電話相同仍需校方及教育局確認遷址／校號對應；在確認前，不以新址課程和招生名額直接替代舊登記校址。", details: [
    { label: "EDB登記地址與校方網站地址不一致", value: "教育局位置資料列友愛邨愛暉樓地下；校方現行網站列業旺邨業和樓1樓，兩者電話同為2450 2143。公開資料不足以確認搬遷是否已完成校號／校址更新，因此報名前應向學校確認實際上課地址，並核對教育局註冊資料。", period: "教育局資料截至2026-09-30；校方網站查閱2026-10", sourceUrl: "https://www.ychyo.org.hk/" },
    { label: "2026/27校方頁列K1約18名、N班約20名", value: "校方招生頁公布當年度K1約18個及N班約20個名額，並描述遊戲及談話式個別面見。頁面部分日期文字互有矛盾，故本頁只保留明確標示年度的名額，不引用其報名／放榜日期，也不把名額換算成錄取機率。", period: "2026/27學年；校方招生頁", sourceUrl: "https://www.ychyo.org.hk/?page_id=124" },
    { label: "品德教育以年度主題貫穿全年活動", value: "校方把德育列為核心，並以年度主題設計全年活動，例子包括孝親、禮貌、環保和感恩。家長可詢問教師如何在日常衝突、分享和輪候情境中引導孩子，而不只看節慶活動；這是學校理念，非獨立成效評估。", sourceUrl: "https://www.ychyo.org.hk/?lang=en&page_id=4378" },
  ] }]),

  profile("565032", "按教育局校號565032及九龍塘對衡道20號登記校址識別。校方現行網站確認校址、2026/27及2027/28申請表；官方FAQ稱英語授課及採劍橋國際課程，銜接小學的說法須理解為校方公布的安排而非外部學位保證。", "https://www.kindergarten.funful.hk/gw/", [
    { label: "九龍方方樂趣幼稚園：官方FAQ", scope: "教學語言、課程、申請評估及校方公布的升讀安排。", url: "https://www.kindergarten.funful.hk/gw/faqs.html" },
    { label: "方方樂趣幼稚園：學校及校址", scope: "九龍塘幼稚園地址、電話及與機構其他學段的區分。", url: "https://www.kindergarten.funful.hk/gw/our-schools.html" },
    { label: "方方樂趣幼稚園：申請程序", scope: "2026/27、2027/28申請表及文件流程；應按申請年度確認日期。", url: "https://www.kindergarten.funful.hk/gw/application.html" },
    { label: "方方樂趣幼稚園：校園生活", scope: "校方描述親子、社區及生活體驗活動。", url: "https://www.kindergarten.funful.hk/gw/school-life.html" },
  ], [{ title: "英語課程與升小銜接說法", featured: true, note: "課程及升讀安排採校方FAQ自述；九龍塘幼稚園與弘爵國際學校位於不同校址，家長應核對具體銜接資格。", details: [
    { label: "校方表示幼稚園以英語授課並按劍橋課程綱要教學", value: "官方FAQ稱教師依劍橋國際課程綱要教學，教學語言為英語。家長應了解實際班級使用的中文、普通話及英語安排，並確認語言支援如何配合孩子基礎；課程綱要本身不等於每個科目都採同一授課比例。", sourceUrl: "https://www.kindergarten.funful.hk/gw/faqs.html" },
    { label: "校方設入學評估及代表面談", value: "FAQ稱申請者須完成入學評估並與學校代表面談，用來判斷入讀時適合的班級。這是校方招生程序，不是對孩子能力的公開評級；家長可先問評估涉及的語言、適應和遊戲互動範圍。", sourceUrl: "https://www.kindergarten.funful.hk/gw/faqs.html" },
    { label: "校方列有直升方方樂趣英文小學的安排", value: "校方FAQ稱幼稚園學生可直接升讀九龍塘方方樂趣英文小學。這是校方公布的銜接路徑，不表示不需符合當屆條件或必獲心儀學位；報名時應索取書面規則，並把小學校址及接送安排一併評估。", sourceUrl: "https://www.kindergarten.funful.hk/gw/faqs.html" },
    { label: "親子及社區活動連接生活經驗", value: "學校列親子日、故事比賽、參觀圖書館與社區設施等活動。這類安排可讓幼兒在群體情境練習表達和交往，但網站未列每級參與頻率；家長可問清活動是否全級參與、是否另收費及家長是否需要到場。", sourceUrl: "https://www.kindergarten.funful.hk/gw/school-life.html" },
  ] }]),

  profile("566136", "按教育局校號566136及黃埔花園第9期5號5B地下登記校址識別。登記檔的狀態未能配對，不能因此推斷已停辦或仍在招生；德寶辦學團體其他校址的收費、課程及服務不直接移植至本址。", "http://www.deborah-intl.edu.hk", [
    { label: "教育局《學校位置及資料》：德寶國際幼兒學校", scope: "校號566136、黃埔花園第9期地址、上午授課及網站資料。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "每日更新登記檔中的校號及校址配對；此校號本地快照未能配對狀態。", url: EDB_REGISTRY },
    { label: "德寶國際幼兒學校：校方網站", scope: "校方可公開的課程、分校與招生公告；本輪未取得可明確對應黃埔第9期的當屆頁面。", url: "http://www.deborah-intl.edu.hk" },
  ], [{ title: "黃埔第9期校址的資料核對提示", featured: true, note: "其他德寶分校有各自校號與收費證明，不能用來補此校址。現行網站內容不足以核實本址招生與課程狀態。", details: [
    { label: "登記名錄列上午授課私立幼稚園校址", value: "教育局位置資料列校號566136、紅磡黃埔花園第9期地下、上午授課；本地註冊快照未能配對註冊狀態。狀態未配對不是停辦證據，也不等於確認在招生；家長應先向校方與教育局核實本址是否仍運作。", period: "位置資料截至2026-09-30；註冊資料截至2026-10-23", sourceUrl: EDB_LOCATION },
    { label: "不可套用其他德寶分校資料", value: "網上有德寶其他校址的收費證明和課程介紹，但校號、地址及開辦班別不同。本頁不引用其他分校的學費、N班服務、師生比例或教學語言；確認本址有效營運後，再索取黃埔第9期專屬的最新文件。", period: "查核日期：2026-10-23", sourceUrl: EDB_REGISTRY },
  ] }]),
];

import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  year: string,
  note: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewUrl = school.detailSections
    ?.flatMap((section) => section.details)
    .find((detail) => detail.label === "班制與 PN" && detail.sourceUrl?.includes(`schid=${schoolNumber}`))?.sourceUrl;
  if (!overviewUrl) throw new Error(`EDB Kindergarten Profile missing for ${schoolNumber}`);
  const locationId = overviewUrl.match(/schid=\d{6}(\d{4})/)?.[1];
  if (!locationId) throw new Error(`EDB location id missing for ${schoolNumber}`);
  const overviewDetails = school.detailSections
    ?.find((section) => section.title.startsWith("幼稚園概覽"))?.details ?? [];
  const publishedOverviewDetails = overviewDetails
    .filter((detail) => ["班制與 PN", "授課語言", "師生比例", "學費"].includes(detail.label))
    .map((detail) => ({ label: detail.label, value: detail.value, period: "教育局幼稚園概覽2026/27", sourceUrl: detail.sourceUrl }));
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校址、學校類別、地址及聯絡資料；位置資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information" },
    { label: "教育局《幼稚園概覽2026/27》", scope: `按校址${locationId}查閱班制、授課語言、師生比例及學費；概覽數字不代表現屆實際招生名額。`, url: overviewUrl },
    { label: "教育局《學校基本註冊資料》", scope: "非政府學校每日更新的登記狀態及校址識別資料；政府學校不在此檔案內。", url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    dataYear: year,
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: [
      ...details,
      {
        title: "班制與師生比例",
        note: "以下為教育局《幼稚園概覽2026/27》按本校址列出的資料；師生比例不是每班實際人數，PN未列亦不等同確認沒有PN班。",
        details: publishedOverviewDetails,
      },
    ],
  };
}

/** Kindergarten profile batch 38: ten unique registered schools with an identifiable EDB location. */
export const KINDERGARTEN_BATCH_38: PilotSchool[] = [
  profile("216178", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程及招生：2027/28", "按校號216178及尖沙咀梳士巴利道登記校址識別。校方列英語為主要授課語言，採用英國EYFS及基督教價值課程；2027/28 K1申請於2026年10月開始，過往網站上的學費和名額不可視作現行資料。", "https://ymcahk.org.hk/cikg/en/", [
    { label: "港青基信國際幼稚園：課程與教學", scope: "校方介紹EYFS、聖經基礎幼兒教育及主題活動。", url: "https://ymcahk.org.hk/cikg/en/kindergarten/curriculum_teaching_approach/index.html" },
    { label: "港青基信國際幼稚園：授課語言與師生比例", scope: "校方說明英語主要授課、普通話及西班牙語課程；比例說明屬校方網頁資料。", url: "https://ymcahk.org.hk/cikg/en/kindergarten/medium_of_instruction_teachers_qualification/index.html" },
    { label: "港青基信國際幼稚園：2027/28招生資訊", scope: "校方公布K1申請開始時間及當屆申請程序。", url: "https://www.ymcahk.org.hk/cikg/en/admission/application_information/index.html" },
    { label: "港青基信國際幼稚園：學校生活", scope: "每週閱讀袋、校外學習及家校參與的校方介紹。", url: "https://ymcahk.org.hk/cikg/en/kindergarten/school_life/index.html" },
  ], [{ title: "英語課程與基督教價值", featured: true, note: "課程框架與語言安排依校方介紹；網頁中的舊費用和舊名額不作現行招生依據。", details: [
    { label: "EYFS配合主題活動與聖經價值課程", value: "校方表示以英國早期基礎階段框架組織七個學習範疇，並加入聖經基礎幼兒教育、自然拼音和主題活動。這種安排把語言、體能、社交情緒與認知活動放在同一課程框架內；重視宗教教育的家庭可進一步了解日常故事、祈禱和節慶活動所佔的位置。", sourceUrl: "https://ymcahk.org.hk/cikg/en/kindergarten/curriculum_teaching_approach/index.html" },
    { label: "英語為主，普通話和西班牙語按級別及班制提供", value: "校方稱英語是主要授課語言，半日班每週有普通話課，全日班另有下午普通話課，K2及K3全日班設西班牙語。這適合希望英語成為日常學習媒介、同時接觸其他語言的家庭；公開網頁沒有列出各級每週完整時數，應以目標班別的當屆時間表確認。", sourceUrl: "https://ymcahk.org.hk/cikg/en/kindergarten/medium_of_instruction_teachers_qualification/index.html" },
    { label: "家校共讀是校方公布的日常要求", value: "校方介紹每週發放閱讀袋，K2及K3另有適齡讀本，並鼓勵家長參與分享活動。這表示家庭需要預留固定共讀時間；如家長工作時間較緊，宜先了解借還流程和每日閱讀量，再評估能否持續配合。", sourceUrl: "https://ymcahk.org.hk/cikg/en/kindergarten/school_life/index.html" },
  ] }]),

  profile("578509", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程資料：網站查閱於2026-10", "按校號578509及馬鞍山烏溪沙登記校址識別。校方以IB PYP探究學習、Reggio Emilia取向及戶外Forest／Beach School描述課程；這些是烏溪沙校方公布的教學特色，不代表每週活動頻率或錄取機會。", "https://wksk.esf.edu.hk/en/", [
    { label: "英基烏溪沙國際幼稚園：課程與學習", scope: "IB PYP、遊戲式探究、評估方式及個人發展。", url: "https://wksk.esf.edu.hk/en/" },
    { label: "英基烏溪沙國際幼稚園：戶外學習", scope: "Forest School及Beach School的校方說明；活動安排須按當屆通知。", url: "https://wksk.esf.edu.hk/parent/academic/outdoor_learning/" },
    { label: "英基幼稚園：網上申請", scope: "英基幼稚園申請制度及年度收生資訊；過往周期日期不套用至新年度。", url: "https://join-us.esf.edu.hk/kindergarten-online-application/" },
  ], [{ title: "探究課程與戶外學習", featured: true, note: "課程描述取自烏溪沙校方頁；戶外課程不推定為固定週數或每名學生相同體驗。", details: [
    { label: "IB PYP以遊戲式探究培養自主思考", value: "校方表示按IB小學項目安排遊戲式探究，重視獨立思考與個人發展，並以學習報告和電子作品集呈現進展。若孩子喜歡提問、動手和分享，這種課程方向值得實地觀察；家長可查看作品集樣例，了解教師如何記錄學習，而不只看課程名稱。", sourceUrl: "https://wksk.esf.edu.hk/en/" },
    { label: "Forest School與Beach School把環境帶入學習", value: "校方公布定期安排森林及海灘學習，也有園藝等戶外活動。這對重視自然探索的家庭有吸引力，但戶外課程會受天氣、年級和校方安排影響；報名前應問清楚當屆頻率、裝備要求、交通和惡劣天氣替代方案。", sourceUrl: "https://wksk.esf.edu.hk/parent/academic/outdoor_learning/" },
    { label: "英基申請表可選多所幼稚園，但學額仍逐校處理", value: "英基中央申請頁說明幼稚園網上申請方式和候補安排。填寫選擇不代表各校址均有面試或學位；家庭應把烏溪沙交通、班制及實際可接受的校址放在選校順序前面，並向招生處確認新一屆申請期。", sourceUrl: "https://join-us.esf.edu.hk/kindergarten-online-application/" },
  ] }]),

  profile("230987", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與校園資料：網站查閱於2026-10", "按校號230987及愉景灣登記校址識別。教育局幼稚園概覽把該校址納入幼稚園類別，校方則以Early Years Foundation Stage（EYFS）稱呼早期教育階段；本頁保留兩套名稱，不把國際學制年級直接換算成本地K1至K3。", "https://www.dbis.edu.hk/", [
    { label: "愉景灣國際學校：EYFS課程概覽", scope: "課程基礎、Reggio Emilia取向、語言專科與學習評估。", url: "https://www.dbis.edu.hk/curriculum-early-years" },
    { label: "愉景灣國際學校：Early Years學習環境", scope: "全日安排、班級配置、Forest／Beach School及設施介紹。", url: "https://www.dbis.edu.hk/learning-environment-in-early-years" },
    { label: "愉景灣國際學校：招生", scope: "EYFS年齡階段、全年申請及評估／候補安排；不代表有即時空缺。", url: "https://www.dbis.edu.hk/school-admissions" },
  ], [{ title: "EYFS、全日學習與愉景灣通勤", featured: true, note: "校方以FS-1／FS-2等名稱描述年級；教育局概覽校址班制不等同國際年級對照表。", details: [
    { label: "課程以英國EYFS為基礎，採用Reggio Emilia取向", value: "校方表示課程參考英國EYFS及英格蘭小學課程架構，並以Reggio Emilia理念支持孩子透過遊戲、材料和環境探索。教師會觀察並記錄孩子作品，電子學習紀錄用來呈現進展。這類學習重視過程與表達，家長可查看作品記錄，了解觀察如何轉化為下一步教學。", sourceUrl: "https://www.dbis.edu.hk/curriculum-early-years" },
    { label: "全日安排包含專科課與戶外學習", value: "校方稱EYFS為全日課程，每班有教師和全職助教，並由專科教師教授普通話、音樂、體育及資訊科技；另有Forest／Beach School。這為工作日需要全日照顧的家庭提供一種安排，但課程與接送均需配合愉景灣校址，應把渡輪／巴士和家長接送時間一併計算。", sourceUrl: "https://www.dbis.edu.hk/learning-environment-in-early-years" },
    { label: "全年可申請不等於全年有位", value: "校方招生頁表示可全年提交申請，若該年級有空位會安排評估，否則可能列入候補。這只能說明申請渠道，不代表有即時名額或錄取機會；家長宜先確認孩子對應的EYFS年級、年齡要求和候補情況。", sourceUrl: "https://www.dbis.edu.hk/school-admissions" },
  ] }]),

  profile("216003", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程及招生：2028/29", "按校號216003及南朗山道教育局幼稚園概覽校址0002識別。校方以Preparatory Years（PY1/PY2）稱呼兩年幼兒課程，採英語與普通話雙語安排；教育局概覽所列班制和比例按指定校址，不直接等同校方年級學額。", "https://www.singapore.edu.hk/", [
    { label: "新加坡國際學校：Preparatory Years課程", scope: "PY課程年期、教學語言、科目與校方公布的班級編制。", url: "https://www.singapore.edu.hk/preparatory-years-2/" },
    { label: "新加坡國際學校：Preparatory Years招生", scope: "2028/29 PY1及PY2申請期、評估語言和申請要求。", url: "https://www.singapore.edu.hk/preparatory-years-admissions/" },
  ], [{ title: "英語與普通話雙語的Preparatory Years", featured: true, note: "PY為校方課程年級名稱，申請人數多不代表已知取錄率；申請年度必須按公告更新。", details: [
    { label: "兩年PY課程以雙語和全人發展為主軸", value: "校方把Preparatory Years分為PY1和PY2，課程兼顧語言、道德、情緒、社交、體能、智力和美感發展。校方公布的PY資料以英語和普通話作雙語教學；家庭應確認孩子入讀年份及本地K1/K2年齡的實際對應，不要只按年級名稱推算。", sourceUrl: "https://www.singapore.edu.hk/preparatory-years-2/" },
    { label: "PY1是主要入學入口，PY2學位有限", value: "校方招生頁明言PY1為主要入學年級，PY2學額有限；2028/29的申請期為2026年9月1日至2027年9月30日，截止前遞交可獲安排評估。評估須選英語或普通話作主要語言，申請者仍會接受兩種語言評估。這要求家庭提早決定PY1入學年份及準備雙語表達。", period: "校方2028/29招生頁；查閱於2026-10", sourceUrl: "https://www.singapore.edu.hk/preparatory-years-admissions/" },
    { label: "遲交申請的評估安排受學位空缺限制", value: "校方表示截止後申請者一般須待合適學位出現才安排評估，對新加坡公民或永久居民搬遷個案另有說明。家庭不宜把「接受申請」理解為仍有學額；如錯過期限，應直接向招生處確認資格並同步準備其他學校方案。", sourceUrl: "https://www.singapore.edu.hk/preparatory-years-admissions/" },
  ] }]),

  profile("215520", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程、招生及費用：2026/27", "按校號215520及大埔廣福道／錦山路登記校址識別。校方以IEYC、遊戲式探究和基督教價值描述幼稚園課程；其招生頁列出的2026/27費用只適用該年度，不能代替新年度核准收費。", "https://nis.edu.hk/", [
    { label: "挪威國際學校：幼稚園學習", scope: "IEYC、遊戲學習、普通話及校方基督教教育取向。", url: "https://nis.edu.hk/kindergarten-learning/" },
    { label: "挪威國際學校：招生", scope: "入學年齡、申請流程及面見安排；以網站公布的當屆規則為準。", url: "https://nis.edu.hk/admission/" },
    { label: "挪威國際學校：招生及2026/27費用", scope: "校方列出的入學資訊及2026/27學費、資本徵費；費用只適用該年度。", url: "https://nis.edu.hk/admission/" },
  ], [{ title: "IEYC探索課程與年度費用", featured: true, note: "課程特色屬校方自述；費用按2026/27年度標示，需另查新年度。", details: [
    { label: "IEYC把探究、遊戲與主題學習結合", value: "校方表示幼稚園採用國際幼兒課程（IEYC），以遊戲和探究活動組織學習，並在基督教價值框架下培養孩子。對希望孩子在英語環境中多做、多問的家庭，應觀察教師如何引導孩子表達和合作；課程名稱本身不能說明每週各科時數。", sourceUrl: "https://nis.edu.hk/kindergarten-learning/" },
    { label: "校方列明K1年齡與面見方式", value: "校方招生頁列K1申請年齡及以遊戲形式進行的面見安排。面見形式可以幫助學校觀察孩子在活動中的互動，但不代表無需準備或保證錄取；家庭可先確認入學年度、生日截點、英語和普通話接觸方式。", sourceUrl: "https://nis.edu.hk/admission/" },
    { label: "2026/27學費需連資本徵費一併計算", value: "校方招生頁列2026/27幼稚園學費每年港幣84,900元，另收每年港幣7,310元資本徵費。以當年公布金額估算預算時，應把校車、校服、膳食和其他選修支出另列；下一年度費用可能調整，報名或接受學位前要索取新費用表。", period: "校方招生頁：2026/27費用", sourceUrl: "https://nis.edu.hk/admission/" },
  ] }]),

  profile("542687", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2027/28", "按校號542687及元朗青山公路聯昇樓登記校址識別。教育局概覽列廣東話及半日免費計劃資料；校方2027/28招生頁列全年遞交K1申請、年齡條件及按申請日期安排的原則，不據此推算錄取機會。", "https://www.sagarmathakindergarten.com/", [
    { label: "薩迦瑪塔幼稚園：辦學理念", scope: "校方自述的全人發展、文化多樣性及教學取向。", url: "https://www.sagarmathakindergarten.com/" },
    { label: "薩迦瑪塔幼稚園：2027/28招生", scope: "K1申請方式、年齡要求、申請次序及可能安排的遊戲環節。", url: "https://www.sagarmathakindergarten.com/admissions" },
    { label: "薩迦瑪塔幼稚園：學費及幼稚園教育計劃", scope: "校方列出的2027/28 K1註冊費及計劃說明；不等同所有額外支出。", url: "https://www.sagarmathakindergarten.com/fees-grants" },
  ], [{ title: "多元文化與申請時間", featured: true, note: "學校理念依校方自述；入學次序只是校方公布的處理原則，不足以判斷競爭程度。", details: [
    { label: "校方強調全人發展與多元文化環境", value: "學校自述重視孩子的整體發展和不同文化背景共融。這對希望孩子在多元社群中成長的家庭有參考價值；網站沒有公開各文化背景比例或語言使用時數，家長可在參觀時觀察同伴互動並詢問支援安排。", sourceUrl: "https://www.sagarmathakindergarten.com/" },
    { label: "2027/28 K1申請全年收表，並設最低年齡條件", value: "校方公布可全年下載或索取申請表，孩子須在學年開始的8月前滿2歲8個月；學位按申請日期處理，現／舊生兄弟姊妹有優先，部分申請者可能獲邀參加遊戲環節。提早交表仍不代表一定有位，應確認收件日期、文件齊備和候補狀態。", period: "校方2027/28招生安排", sourceUrl: "https://www.sagarmathakindergarten.com/admissions" },
    { label: "半日免費不等於全年零支出", value: "教育局概覽列半日班參加幼稚園教育計劃，校方2027/28費用頁另列K1註冊費。家庭仍應確認校本雜費、校服、膳食、延長照顧或校車成本，並以新年度正式收費通知作預算。", period: "教育局概覽2026/27；校方收費2027/28", sourceUrl: "https://www.sagarmathakindergarten.com/fees-grants" },
  ] }]),

  profile("215694", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方辦學理念：網站查閱於2026-10", "按校號215694及北角明園大廈登記校址識別。教育局概覽記載的授課語言與校方所稱日本語幼兒教育並非完全同一表述；本頁分別註明官方資料口徑，不推定日語每日課時或雙語比例。", "https://www.oisca-youchien.com/hk/", [
    { label: "奧伊斯嘉香港日本語幼稚園：校方首頁", scope: "現行校名、地址、日籍教師及日語幼兒教育的校方介紹。", url: "https://www.oisca-youchien.com/hk/" },
    { label: "奧伊斯嘉香港日本語幼稚園：教育方針", scope: "四項教育理念及戶外、遊戲、自立生活培養的校方描述。", url: "https://www.oisca-youchien.com/hk/guide.html" },
    { label: "奧伊斯嘉香港日本語幼稚園：園內生活", scope: "校方日程、活動及延長照顧資料；網頁未標年度的安排須重新向校方確認。", url: "https://www.oisca-youchien.com/hk/life.html" },
    { label: "奧伊斯嘉香港日本語幼稚園：入園資訊", scope: "校方申請及日常上課資訊；以當屆公告確認。", url: "https://www.oisca-youchien.com/hk/entrance.html" },
  ], [{ title: "日本語環境與生活自理", featured: true, note: "教育局概覽授課語言欄與校方日語定位分開列示；語言課時、班別及年級須直接確認。", details: [
    { label: "校方以日語幼兒教育和日本文化作定位", value: "校方稱由日本人教師以日語進行幼兒教育，並以強健體魄、純真心靈、思考能力、自立與社會性作四項教育支柱。若家庭希望孩子延續日語或日本文化經驗，應確認孩子入學後的日常語言支持及未來升學銜接；教育局概覽的語言欄是另一項行政資料，不能直接用來推算日語課時。", sourceUrl: "https://www.oisca-youchien.com/hk/guide.html" },
    { label: "活動重視遊戲、體能和基本生活習慣", value: "校方教育方針提到每天透過跑跳活動鍛鍊體能，並在遊戲中培養觀察、判斷和探索能力，也重視穿衣、進食等生活習慣。家長可在參觀時觀察孩子是否能按自己的步調參與，以及教師怎樣協助初入學幼兒適應。", sourceUrl: "https://www.oisca-youchien.com/hk/guide.html" },
    { label: "先確認當屆日程與接送服務", value: "校方生活及入園頁提供上課時段與校車相關說明，但部分頁面未標明適用年度，校車路線亦可能按居住地調整。家長應就目標年級確認最新日程、延長照顧、候車位置和可服務區域，再比較北角校址的通勤時間。", sourceUrl: "https://www.oisca-youchien.com/hk/entrance.html" },
  ] }]),

  profile("549240", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程：網站查閱於2026-10", "按校號549240及西貢孟公屋登記校址識別。校方介紹IB PYP、英語授課及雙語班別，並提供普通話學習；本頁以雅柏校址教育局概覽配對比例及班制，不把其他英基幼稚園的校址資料套用至雅柏。", "https://abacus.esf.edu.hk/en/", [
    { label: "英基雅柏國際幼稚園：學校與課程", scope: "校方介紹IB PYP、英語環境、雙語班及學習社群。", url: "https://abacus.esf.edu.hk/en/" },
    { label: "英基雅柏國際幼稚園：招生", scope: "校方招生入口及英基申請流程；年度日期以中央招生頁更新為準。", url: "https://abacus.esf.edu.hk/en/admissions/" },
    { label: "IB世界學校名錄：ESF Abacus International Kindergarten", scope: "IB官方名錄中的課程與授課語言資訊。", url: "https://ibo.org/programmes/find-an-ib-school/ibap/e/esf-abacus-international-kindergarten/" },
  ], [{ title: "IB PYP與語言環境", featured: true, note: "英基校方頁涵蓋學校層面的課程；班別語言和招生空缺仍以雅柏當屆安排為準。", details: [
    { label: "IB PYP以探究活動構成學習", value: "校方和IB名錄均列雅柏為IB小學項目學校。PYP的探究取向讓孩子透過主題問題、觀察和表達建立理解；家長可在校園參觀時看孩子作品和課堂提問方式，判斷教學是否符合家庭對英語環境與自主探索的期待。", sourceUrl: "https://ibo.org/programmes/find-an-ib-school/ibap/e/esf-abacus-international-kindergarten/" },
    { label: "英語環境與雙語班別要分開看", value: "雅柏校方介紹英語授課環境及雙語班別，並有普通話學習安排。班別選擇會影響孩子的語言接觸，不能把學校整體的雙語描述當成每班課時比例；申請前應問清雅柏校址當屆有哪些班別及名額。", sourceUrl: "https://abacus.esf.edu.hk/en/" },
    { label: "英基中央申請不等同雅柏有位", value: "校方招生頁連結英基幼稚園的中央申請方式。家庭應先核實校址選擇、年齡要求、申請期和候補安排，再安排交通及備選校；不能從申請入口或過往申請數字推算錄取率。", sourceUrl: "https://abacus.esf.edu.hk/en/admissions/" },
  ] }]),

  profile("216275", "教育局位置及註冊資料：2026-09/10；概覽：2026/27校址0006；校方學制及招生：網站查閱於2026-10", "按校號216275及九龍塘羅福道登記校址識別。教育局幼稚園概覽按校址0006列班制與師生比例；校方招生由Reception（約4歲）開始並按澳洲學年編級，與本地K1至K3不作一對一換算。", "https://www.aishk.edu.hk/", [
    { label: "香港澳洲國際學校：招生與年級", scope: "校方所列Reception入學年齡、澳洲學年及轉學分級因素。", url: "https://www.aishk.edu.hk/admissions/" },
    { label: "香港澳洲國際學校：教學與學習", scope: "校方介紹澳洲課程和教學取向。", url: "https://www.aishk.edu.hk/learning/teaching-and-learning" },
  ], [{ title: "澳洲學年與幼兒入學年級", featured: true, note: "此登記幼稚園資料須與學校實際Reception年級區分；不以KGP概覽推定學校開辦本地K1/K2/K3。", details: [
    { label: "學校以Reception而非本地K1作主要幼兒入口", value: "校方招生資料稱學校接收Reception（約4歲）至Year 12學生，採澳洲課程並按1月至12月學年運作。教育局概覽中的幼稚園校址資料不表示年級完全等同本地K1至K3；家長應先用孩子出生日期向校方確認入讀年級及適應安排。", sourceUrl: "https://www.aishk.edu.hk/admissions/" },
    { label: "跨課程轉級會看年齡與發展，不只看原校年級", value: "校方說明分級時會考慮年齡、學業能力、社交情緒發展和既往課程。由本地幼稚園轉入的家庭，需準備孩子的學校紀錄並確認學年銜接；過往K級名稱不能單獨用來判斷對應年級。", sourceUrl: "https://www.aishk.edu.hk/admissions/" },
    { label: "澳洲課程方向需與家庭升學路線一併評估", value: "校方表示採用澳洲課程，較高年級提供澳洲高中證書或IB文憑選擇。對幼兒家庭而言，現在更實際的考量是英語環境、學年時間、學費預算及未來是否願意沿國際課程升學；不應把高中資格直接當成幼兒階段的學習成效。", sourceUrl: "https://www.aishk.edu.hk/learning/teaching-and-learning" },
  ] }]),

  profile("214558", "教育局位置及註冊資料：2026-09/10；概覽：2026/27校址0002；校方課程及招生：網站查閱於2026-10", "按校號214558及薄扶林道校址識別。德瑞幼稚園分德文國際班GIS與英語國際班EIS；兩者語言和後續學制不同，教育局概覽所列英語不能代表GIS全程以英語授課。", "https://www.gsis.edu.hk/en/", [
    { label: "德瑞國際學校：幼稚園課程", scope: "GIS/EIS兩個幼稚園課程、日常作息及專科活動。", url: "https://www.gsis.edu.hk/deivacy/academics/kindergarten?section=core-curriculum" },
    { label: "德瑞國際學校：招生及年齡條件", scope: "GIS與EIS的申請、年齡截點、候補與優先條件。", url: "https://www.gsis.edu.hk/en/admissions/how-to-apply/?section=placement" },
    { label: "德瑞國際學校：兩個學制", scope: "校方說明德文及英語國際班的學制和授課語言差異。", url: "https://www.gsis.edu.hk/enqRp/admissions" },
  ], [{ title: "GIS與EIS的語言和學制選擇", featured: true, note: "須先選擇德文或英語國際班；入學後校方不建議轉班，兩個課程不可視作同一語言路線。", details: [
    { label: "GIS與EIS是兩條不同的幼兒教育路線", value: "校方把幼稚園分為德文國際班GIS和英語國際班EIS。GIS以德語課程為主，幼稚園階段同時接觸德語和英語；EIS則採英語授課的英式課程。這會影響孩子每日使用語言和升學銜接，家庭應先按長期語言目標選班，校方亦指出入學後不建議轉換課程。", sourceUrl: "https://www.gsis.edu.hk/enqRp/admissions" },
    { label: "薄扶林幼稚園有固定校車要求", value: "校方招生資料列明薄扶林校舍學生必須使用校車。這是家庭決策中的硬條件：申請前要確認上落車地點、路線和接送時間，也要評估孩子能否適應較早到校；若家庭無法配合校車，應及早考慮其他校址或學校。", sourceUrl: "https://www.gsis.edu.hk/en/admissions/how-to-apply/?section=placement" },
    { label: "課程有專科活動，日常時間較早開始", value: "校方幼稚園資料列音樂、體育、烹調、科學及圖書館等活動，GIS與EIS另有各自語言課程；薄扶林校舍公布早上約7時15分起到校，上午課程後中午接走。家庭應把校車、工作時間和孩子作息一併核對，而不是只比較班制名稱。", sourceUrl: "https://www.gsis.edu.hk/deivacy/academics/kindergarten?section=core-curriculum" },
  ] }]),
];

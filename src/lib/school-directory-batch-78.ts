import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及學位另確認";
const lhCurriculum = "https://www.learninghabitat.org/en/curriculum/school-based";
const lhFees = "https://www.learninghabitat.org/en/admission/fees";
const ycisEce = "https://www.ycis-hk.com/en/academics/early-childhood";
const ycisArticle = "https://www.ycis-hk.com/en/article/press/the-magic-of-child-led-learning-in-the-early-years";

export const KINDERGARTEN_BATCH_78: PilotSchool[] = [
  profile({
    schoolNumber: "605026", locationId: "0001", website: "https://www.fairchild.edu.hk/home.php", telephone: "28032638", schoolType: "私立獨立幼稚園", principal: "丘穎儀", establishedYear: "2017", gradeSpan: grades,
    language: "官網列英語國際班及英語／普通話雙語班；當屆開班、比例與粵語支援另確認",
    ratio: "上午1:3.1；下午為「-」", ratioIncludesPn: true, teacherCount: 11, classroomCount: 6,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及音樂室；其他特別室未列中文資料。",
    pn: "2025年9月提供2至3歲服務，收錄6人，半日全年104,544元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。Playgroup不等同註冊低齡服務。",
    feeSummary: "K1至K3半日全年104,544元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年104,544元、11期，全日為「-」。有下午核准價不代表當屆一定開班，2025年下午在讀數為0；用品及當屆PN費率另確認。",
    sourceNote: "校號605026在官網明列，西營盤光前大廈地址與28032638吻合，保留教育局完整多門牌範圍。不混用天后Junior Academy；集團2016年成立不改寫本校概覽2017創校年份。",
    sources: [{ label: "楓薈：各年齡課程", scope: "英語國際／英普雙語、瑞吉歐及安省與香港指引；本校地址電話。", url: "https://www.fairchild.edu.hk/program.php" }],
    features: { title: "課程特色｜瑞吉歐與不同語言班型", featured: true, details: [
      { label: "從孩子興趣延伸探究", value: "校方受瑞吉歐理念啟發，把環境視作第三位老師，參考加拿大安省幼稚園課程及香港課程指引，透過遊戲和探究發展好奇心、創意和信心。家長可看一個主題如何從孩子提問延伸，不把自由探索解作沒有教師規劃。", sourceUrl: "https://www.fairchild.edu.hk/program.php" },
      { label: "語言班型與個人成長紀錄", value: "官網PN和K1至K3列英語國際班及英普雙語班；本校概覽另列以Storypark分享個人學習故事。家庭可確認所選班的語言教師與實際日程，並了解如何收到觀察與下一步回饋；課程選項不代表每一時段都有開班。", sourceUrl: kgp("605026") },
    ] },
  }),
  profile({
    schoolNumber: "613681", locationId: "0001", website: "https://www.learninghabitat.org/", telephone: "25015108", schoolType: "私立獨立幼稚園", principal: "黃麗芬", establishedYear: "2019", gradeSpan: grades,
    language: "CE班英語／粵語共教並補普通話；PE班英語／普通話共教；當屆年級班型另確認",
    ratio: "上午1:7.7；下午1:7.7", ratioIncludesPn: true, teacherCount: 29, classroomCount: 8,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及音樂室；其他特別室列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄112人，半日全年86,400元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網2026/27君豪峰PN每期7,500元、12期，全年90,000元，與舊統計分開。",
    feeSummary: "K1至K3半日全年90,000至93,600元／12期；全日未列",
    fees: "2026/27 K1至K3上午下午全年90,000至93,600元、12期；官網Novum East列CE每期7,500元（全年90,000），PE7,800元（全年93,600），全日為「-」。另列每半年PN雜費2,200元、K班2,500元，校服交通另計。",
    sourceNote: "校號613681為英皇道856號君豪峰1樓，官方Novum East頁25015108吻合。PN、空間與其他學之園校舍分開，外出參觀不解作校內有戶外場地。",
    sources: [
      { label: "學之園：君豪峰校舍", scope: "英皇道856號1樓、25015108及校車入口。", url: "https://www.learninghabitat.org/en/campus/quarry-bay/novum-east-campus" },
      { label: "學之園：2026/27分校收費", scope: "Novum East的PN、CE、PE及雜費。", url: lhFees },
      { label: "學之園：校本課程", scope: "CE/PE語言分工及共同探究、閱讀、社交情緒課程。", url: lhCurriculum },
    ],
    features: { title: "課程特色｜雙語分班與成長回饋", featured: true, details: [
      { label: "英粵與英普按家庭語言路線選", value: "共同課程列CE英粵共教並補普通話，PE英普共教，配校本閱讀和生活主題探究。家庭可先核對君豪峰申請年級的班型，再了解中文口語、讀寫及課後陪伴；不能把同品牌其他校舍的開班或PN費率移入本校。", sourceUrl: lhCurriculum },
      { label: "每個主題的回饋如何跟進", value: "本校概覽列主題後持續評估、期終報告、新生適應及小一生活活動，並有故事爸媽與家長觀課。家長可索取評估樣本，問清教師如何把孩子的參與、情緒和理解轉成下一步，而不把小一適應活動當成錄取保證。", sourceUrl: kgp("613681") },
    ] },
  }),
  profile({
    schoolNumber: "614920", locationId: "0001", website: "https://mmlyyns.tungwahcsd.org/", telephone: "25073997", principal: "龔宇萍", gradeSpan: "PN／2至3歲及K1至K3長全日服務；暫託與延展需另申請",
    language: "本校列中英文故事整合教學；中文粵普分工及英普課時未公開",
    ratio: "上午1:7.6；下午1:7.6", ratioIncludesPn: true, teacherCount: 8, classroomCount: 4,
    spaces: "有室內遊戲場地、音樂室及活動室，沒有戶外遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄3人，全日全年58,212元，半日為「-」；參加幼兒中心資助計劃，有暫託及延長服務，沒有2歲以下服務。資助資格、費用及時段另確認。",
    feeSummary: "K1至K3資助後全日全年15,900元／12期；半日未列",
    fees: "2026/27 K1至K3扣減資助後全日全年15,900元、12期，上午下午半日均為「-」。PN屬另一服務及費率，延展、暫託、膳食用品的適用安排另確認，不能以參加計劃推成全免。",
    sourceNote: "校號614920為灣仔東基大廈地下至1樓A至C舖，現行官網地址、25073997吻合。概覽1968年與官網東華幼兒服務創始年相同，未把機構沿革直接當成現址啟用年；舊WCKG入口改用本園獨立官網。",
    sources: [],
    features: { title: "課程特色｜長全日照顧與生活探索", featured: true, details: [
      { label: "故事、磁力片與身體探索", value: "本園概覽以兒童生活經驗出發，中英文故事整合語文，配音樂律動、感知肌能和磁力片操作；跨學科探索把科學、科技、工程、藝術及數學概念連到建構和討論。家庭可問清一天中遊戲、休息和照顧的節奏，評估是否適合長全日生活。", sourceUrl: kgp("614920") },
      { label: "照顧與支援分清申請條件", value: "官網列日間、延展、暫託、駐校社工及學前康復等服務；本校申報每月學習評估、半年發展報告和個別支援。需要長時照顧或轉介的家庭可先確認服務名額、申請條件和收費，不能把列有服務解作隨時可用。", sourceUrl: "https://mmlyyns.tungwahcsd.org/" },
    ] },
  }),
  profile({
    schoolNumber: "613517", locationId: "0001", website: "https://www.ycis-hk.com/zh", telephone: "37584112", schoolType: "非牟利幼稚園（沒有參加幼稚園教育計劃）", principal: "羅少容", gradeSpan: "2歲以下、PN／2至3歲及幼稚園服務；當屆年齡組與班型另確認",
    language: "耀中幼教列英語與粵語共同教學、另有普通話活動；將軍澳當屆日程另確認",
    ratio: "上午1:4.2；下午1:1.4", ratioIncludesPn: true, teacherCount: 17,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及音樂室；註冊課室數未列。共同課程外出或音樂安排不等於校內有專室。",
    pn: "2025年9月提供2至3歲服務，收錄16人，半日全年146,355元、全日223,036元；有2歲以下服務，沒有幼兒中心資助、暫託及延長服務。低齡年齡組、陪同要求及費率另確認。",
    feeSummary: "K1至K3半日全年136,070元；全日K1/K2/K3為235,730／244,233／256,674元，均11期",
    fees: "2026/27 K1至K3上午下午全年136,070元、11期；全日K1為235,730元、K2為244,233元、K3為256,674元，均11期。非牟利不代表資助免費，PN與低齡課程另計，用品交通另核對。",
    sourceNote: "校號613517為至善街3號SAVANNAH PLACE地下G10至G13及1樓119至123、125號，非九龍塘校舍；總部23387106不替代本校37584112。概覽1932為耀中辦學歷史，不當將軍澳校舍啟用年；官網共同課程比率不替代本校時段統計。",
    sources: [
      { label: "耀中：幼兒教育課程", scope: "英粵環境、普通話活動、共同教學及個人成長檔案；是幼教共同說明。", url: ycisEce },
      { label: "耀中轉載訪談：兒童主導學習", scope: "2023-06-07訪談提及將軍澳空間及英粵共教；屬歷史校方受訪描述。", url: ycisArticle },
    ],
    features: { title: "課程特色｜英粵共教與兒童主導", featured: true, details: [
      { label: "雙語關係先從粵語與英語建立", value: "耀中幼教官網列英語與粵語的共同教學環境，較大幼兒另接觸普通話；不能把雙語直接理解為英普。將軍澳家庭可確認所選年齡組的教師分工、普通話安排與幼兒適應語言，再判斷是否符合日常溝通需要。", sourceUrl: ycisEce },
      { label: "興趣延伸與個人成長檔案", value: "校方以兒童主導遊戲延伸探索，教師觀察語言、數量、社交情緒及體能並建立個人成長檔案；2023年訪談另描述將軍澳室內跨齡互動空間。家長可到校核對目前佈置及一份紀錄樣本，不由歷史介紹推定現在固定班額或小學學額。", period: "共同課程查閱2026-10-24；校舍訪談2023-06-07", sourceUrl: ycisArticle },
    ] },
  }),
  profile({
    schoolNumber: "538132", locationId: "0001", website: "https://gracefield.edu.hk/cht", telephone: "22164106", principal: "林敏姿", gradeSpan: "K1至K3；概覽另列2至3歲服務，當屆是否開PN及學位另確認",
    language: "本校列繪本朗讀、語文活動及非華語中文支援；主要粵普語音與英普課時未公開",
    ratio: "上午1:5.0；下午1:5.3", ratioIncludesPn: false, teacherCount: 5, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室；其他特別室為「--」。",
    pn: "2025年9月列有2至3歲服務，但收錄人數為0；半日全年35,000元，全日為「-」。沒有幼兒中心資助、暫託、延長或2歲以下服務；不能把0人視作停辦證據，當屆開PN另確認。",
    feeSummary: "K1至K3各時段均列「申請審核中」，當屆核准費率待確認",
    fees: "2026/27 K1至K3上午、下午及全日均列「申請審核中」。不以過往費率或非牟利身份填成免費；應索取當屆核准費表，PN用品膳食另確認。",
    sourceNote: "校號538132為黃大仙上邨倡善樓地下，官網地址及22164106吻合。課程文字1:11是教學模式描述，與2025年分時段統計不同，未互相替代；有蒙特梭利學具不解作完整蒙特梭利課程。",
    sources: [],
    features: { title: "課程特色｜信仰品格與自主操作", featured: true, details: [
      { label: "先操作，再逐步書寫", value: "本校概覽結合聖經品格、生活主題、感官操作與繪本，明列K1不要求執筆，先練小肌肉及空間感，K2才逐步書寫，不採機械抄寫或計算操練。家庭可了解學具操作如何連到語文、數概和自理，並判斷宗教生活是否與家庭相合。", sourceUrl: kgp("538132") },
      { label: "計劃、活動與回顧", value: "校方以高瞻教學的區角活動讓幼兒安排自己的活動，教師用持續觀察、每兩月評估及半年檔案回饋，另列新生適應與非華語支援。家長可看孩子如何選擇、整理和回顧，再確認實際語言安排及個別支援條件。", sourceUrl: kgp("538132") },
    ] },
  }),
  profile({
    schoolNumber: "590673", locationId: "0001", website: "https://www.witty.edu.hk/", telephone: "28178132", schoolType: "私立獨立幼稚園", principal: "顏小芬", establishedYear: "2012", gradeSpan: grades,
    language: "當屆官方概覽未提供語言細節，校網未能完整取得；粵普／英語主課與課時待確認",
    ratio: "上午1:2.1；下午1:2.3", ratioIncludesPn: true, teacherCount: 7, classroomCount: 7,
    spaces: "有室內遊戲場地、音樂室、大肌肉活動區、室內單車場、攀爬架、自由遊戲及室內遊戲室，沒有戶外遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄7人，半日全年67,100元、全日96,239元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年67,100元、全日86,900元，均11期",
    fees: "2026/27 K1至K3上午下午全年67,100元、11期，全日86,900元、11期。PN全日舊統計與K班費率不同，用品膳食另計；核准下午價不等於當屆已開班或有餘額。",
    sourceNote: "校號590673為卑路乍街16至18號再輝大廈地下高層，EDB搜尋及本校概覽地址電話吻合。官網限制存取，中英文當屆概覽課程細節均缺，未將第三方舊學年介紹或2017年討論當成當屆教學事實。",
    sources: [{ label: "EDB：盈思學校搜尋", scope: "校號590673、校址0001、卑路乍街及28178132。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=590673000112" }],
    features: { title: "服務與資料範圍｜半日及全日", featured: true, details: [
      { label: "先按年齡與時段核對服務", value: "本校概覽列PN與K1至K3，K班有半日及全日核准費率，並有室內大肌肉、單車與攀爬空間。家庭可先確認當屆實際開班、全日午睡膳食與接送，再了解各年齡每天使用哪些活動區；舊統計人數不是現有名額。", sourceUrl: kgp("590673") },
      { label: "課程及語言仍需校方補證", value: "本次未能從當屆官方概覽取得教育理念、語言分工、活動模式及評估細節，官網亦限制讀取。比較時宜向校方索取當屆週課表、語言教師安排及成長紀錄樣本；沒有以其他學校課程或舊論壇說法補齊。", sourceUrl: kgp("590673") },
    ] },
  }),
  profile({
    schoolNumber: "157716", locationId: "0001", website: "https://www.lukyeungkg.edu.hk/", telephone: "24998832", schoolType: "私立獨立幼稚園", principal: "方麗霓", establishedYear: "1984", gradeSpan: "PN／N1及K1至K3；官網時間表K3只列下午班",
    language: "官網列每課室至少一位英語與兩位中文教師共教，另有普通話母語教師；中文主課粵普分工與時數另確認",
    ratio: "上午1:6.1；下午1:5.0", ratioIncludesPn: true, teacherCount: 36, classroomCount: 11,
    spaces: "有室內及戶外遊戲場地，沒有音樂室；其他特別室未列資料。",
    pn: "2025年9月提供2至3歲服務，收錄97人，半日全年63,600元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "上午K1/K2、下午K1至K3全年64,800元／12期；K3上午及全日未列",
    fees: "2026/27上午K1及K2全年64,800元、12期，K3為「-」；下午K1至K3均64,800元、12期，全日為「-」。官網時間表亦只列K3下午，不能當各級都有上午班；PN用品交通另計。",
    sourceNote: "校號157716為綠楊新邨綠楊坊平台，原登記與概覽門牌表述有平台2樓／UP1號舖差異，未另造新校舍。官網三教師共同施教是教學描述，不替代2025師生比，也不當固定班額；不把沒有音樂室解作沒有音樂課。",
    sources: [
      { label: "綠楊：課程目標", scope: "英語與中文教師共同施教、普通話母語教師及STEM融入英語。", url: "https://www.lukyeungkg.edu.hk/lukyeung/course-target.php" },
      { label: "綠楊：班級時間表", scope: "N1、K1、K2早午與K3只有下午；未註學年，當屆另確認。", url: "https://www.lukyeungkg.edu.hk/lukyeung/reg-timetable.php" },
    ],
    features: { title: "課程特色｜共教語境與自主探索", featured: true, details: [
      { label: "英語連到音樂、戲劇與科學", value: "官網列每課室至少一位英語及兩位中文教師共同施教，英語活動融入音樂、戲劇、體能及科學、科技、工程、數學（STEM）；普通話由母語教師以故事、角色扮演和唱遊帶領。家庭可確認這些教師如何輪流或同時參與，以及所選班實際語言日程。", sourceUrl: "https://www.lukyeungkg.edu.hk/lukyeung/course-target.php" },
      { label: "K3下午班要先配合接送", value: "官方時間表K3只列下午1時15分至4時40分，K1/K2早午與PN/N1另有時間。家庭可先核對當屆作息和交通，再了解遊戲探索、持續觀察及模擬小一安排；培養升小適應不等於任何小學保留學額。", sourceUrl: "https://www.lukyeungkg.edu.hk/lukyeung/reg-timetable.php" },
    ] },
  }),
  profile({
    schoolNumber: "590401", locationId: "0001", website: "https://wellcomekg.edu.hk/", telephone: "28132121", schoolType: "私立獨立幼稚園", principal: "梁嘉怡", establishedYear: "2012", gradeSpan: grades,
    language: "本校列三語環境及國際雙語課程；主要粵普／英語分工與時數另確認",
    ratio: "上午1:10.3；下午1:5.7", ratioIncludesPn: true, teacherCount: 12, classroomCount: 15,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另列多用途、KidsDNA學習、芭蕾舞及音樂室。",
    pn: "2025年9月提供2至3歲服務，收錄17人，半日全年69,420元、全日115,524元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "半日K1/K2/K3全年69,036／75,324／82,548元；全日104,256／106,380／108,492元，均12期",
    fees: "2026/27上午下午K1、K2、K3全年分別69,036、75,324、82,548元；全日分別104,256、106,380、108,492元，均12期。學費隨年級不同，PN、用品膳食另確認。",
    sourceNote: "校號590401為藍地福亨村路8號豫豐花園，官網28132121與概覽吻合。官網2027/28公告部分日期與星期標示不一致，不轉作已確認招生時間線；實際約見與註冊應以校方書面通知核對。",
    sources: [],
    features: { title: "課程特色｜三語探索與多元活動", featured: true, details: [
      { label: "三語環境與課程系統", value: "本校概覽依香港課程指引、英國學前框架及KidsDNA課程設計，強調三語環境、探索與創意思考。家庭可請教師用一個單元解釋語文、操作和藝術如何串連，再確認各語言的教師及使用情境，不能由國際名稱推定全英授課。", sourceUrl: kgp("590401") },
      { label: "按半年發展報告跟進", value: "校方列上下學期發展評估及各範疇進度紀錄，另有幼兒與K班申請入口。家長可看一份報告是否能指出孩子需要與下一步，同時核對所選年級半全日的費用；專室種類不代表所有課程已包含在學費。", sourceUrl: kgp("590401") },
    ] },
  }),
  profile({
    schoolNumber: "564338", locationId: "0003", website: "https://kmccc.sjs.org.hk/", telephone: "25962523", principal: "梁碧珊", establishedYear: "1963", gradeSpan: "1歲半至6歲照顧及教育；PN／2至3歲與K1至K3長全日，當屆名額另確認",
    language: "校方列全語文繪本、英語及普通話專任教師；中文粵普主課分工與時數另確認",
    ratio: "上午1:6.7；下午1:6.7", ratioIncludesPn: true, teacherCount: 16, classroomCount: 10,
    spaces: "有室內、戶外遊戲場地及音樂室，另有圖書館、遊戲室、面見室。",
    pn: "2025年9月提供2至3歲服務，收錄29人，全日全年65,520元，半日為「-」；有2歲以下服務、幼兒中心資助、暫託及延長服務。當屆低齡年齡、費表、資格與時段另確認。",
    feeSummary: "K1至K3資助後全日全年30,384元／12期；半日未列",
    fees: "2026/27 K1至K3扣減資助後全日全年30,384元、12期，上午下午半日均為「-」。PN與2歲以下屬另一服務，暫託、延展及膳食用品另核對，不以資助計劃推定全部免費。",
    sourceNote: "校號564338、校址0003為堅尼地道100號3至6樓部分，官網25962523及地址相符，保留完整EDB校址範圍。概覽校史1963不當現址所有樓層啟用年；照顧服務可申請不等於現有空位。",
    sources: [],
    features: { title: "課程特色｜基督關愛與長全日生活", featured: true, details: [
      { label: "主題探索與宗教品格教育", value: "本校概覽以兒童興趣設計主題和專題，透過遊戲、繪本、小週記及分享發展表達，配英語及普通話專任教師；早會、兒童崇拜與Godly Play故事活動融入基督教價值。家庭可了解宗教與一天的照顧節奏，判斷是否與家庭習慣相合。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5643380003" },
      { label: "情緒、適應與個別支援", value: "校方列『比比和朋友』情緒社交課程、新生適應、模擬小一、兼收與學前康復等支援，配每月主題觀察及年度學習檔案。需要長全日或延展的家庭可先確認時段、資格與費用，再了解轉介和家校跟進；不把有支援項目當作無條件即時提供。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5643380003" },
    ] },
  }),
  profile({
    schoolNumber: "593133", locationId: "0001", website: "https://www.tutortime.com.hk/", telephone: "25292288", schoolType: "私立獨立幼稚園", principal: "吳灼敏", gradeSpan: "官網列Playgroup、PN及K1路線；K2/K3當屆服務範圍需另確認",
    language: "集團明列英語／普通話各半；半山另述免費粵語課，適用年齡及時數另確認",
    ratio: "上午1:3.3；下午1:0.5", ratioIncludesPn: true, teacherCount: 4,
    spaces: "概覽列有室內、戶外遊戲場地及音樂室，註冊課室與其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日全年164,760元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網嬰兒陪同PlayLab／Playgroup不作註冊嬰兒服務證據。",
    feeSummary: "K1半日全年158,730元／11期；K2、K3及全日未列",
    fees: "2026/27只列K1上午下午全年158,730元、11期；K2、K3及全日均為「-」。不把集團其他校舍K1至K3費率搬入半山；PN用品另核對。",
    sourceNote: "校號593133登記為堅道5號寶林閣地下B舖；官網校舍聯絡簡寫A至B舖，電話25292288吻合，保留EDB登記範圍。官網正文路線止K1、下方年齡標籤又列3至5歲，K2是否提供需確認；不憑集團0至6歲推定本校級別。",
    sources: [{ label: "多多：半山堅道校舍", scope: "地址電話、PN兼讀及銜接班、免費粵語活動；官網年齡表述有不同，當屆另確認。", url: "https://www.tutortime.com.hk/locations/caine-road/" }],
    features: { title: "課程特色｜英普與半山銜接班", featured: true, details: [
      { label: "英普之外另列粵語活動", value: "集團以英語、普通話各半的浸入式活動教學，半山專頁另列免費粵語課。家長可確認這是常規班內還是另報活動、適用年齡及頻率，再評估孩子在英普日常中如何得到粵語支援；不把有一項粵語活動解作三語平均。", sourceUrl: "https://www.tutortime.com.hk/locations/caine-road/" },
      { label: "PN兼讀與升K安排先問清", value: "半山專頁列PN兼讀及由Playgroup轉入Nursery的銜接班，正文路線止K1。家庭可按每週照顧需要確認實際上課日數，再問清之後是否需轉校舍、另申請及收費；嬰幼兒親子活動與註冊幼兒服務範圍分開。", sourceUrl: "https://www.tutortime.com.hk/locations/caine-road/" },
    ] },
  }),
];

import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile, reviewedKindergartenWithoutOverview as exceptionalProfile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const joyfulFees = "http://www.joyfulenglish.edu.hk/tc/admission3.html";
const joyfulContact = "http://www.joyfulenglish.edu.hk/tc/contact.html";
const eclcNotice = "https://eclc.eduhk.hk/zh/%e6%a0%a1%e9%95%b7%e9%9d%88%e6%84%9f%e6%99%82%e5%88%bb/";

export const KINDERGARTEN_BATCH_81: PilotSchool[] = [
  profile({
    schoolNumber: "600334", locationId: "0002", website: "https://www.masspreschool.com", telephone: "39551588", schoolType: "私立獨立幼稚園", principal: "陳姿安", gradeSpan: grades,
    language: "官網列語言課程，未明列本校K班主要教學語言、中文粵普分工與課時",
    ratio: "上午1:7.0；下午1:3.8", ratioIncludesPn: true, teacherCount: 5,
    spaces: "當屆概覽未列註冊課室數及室內、戶外遊戲場地、音樂室資料；不從場地照片推定配置。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日全年78,600元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆費率另確認。",
    feeSummary: "K1至K3上午全年79,000元，下午72,600至79,000元，均10期",
    fees: "2026/27 K1至K3上午各級全年79,000元、10期，下午各級列72,600至79,000元、10期，全日為「-」。下午區間所對應班型須另核對；PN、用品及其他課程費分開。",
    sourceNote: "校號600334／0002為大坑勵德坊8座地下及低層地下2號舖；官網聯絡同列Lai Tak Plaza Shop 2及39551588。概覽課程欄多項未提供，官網未列教學語言主次，不以『國際』名稱推定全英或英普。",
    sources: [{ label: "善行：聯絡與校舍", scope: "勵德坊Shop 2、地下與低層地下及39551588。", url: "https://www.masspreschool.com/contact" }, { label: "善行：入學安排", scope: "全年申請、個別校園參觀及課程諮詢；沒有據此推算學位或錄取機會。", url: "https://www.masspreschool.com/admission" }],
    features: { title: "課程特色｜好奇心與個別學習", featured: true, details: [
      { label: "互動探索與個別需要", value: "官網以互動活動培養好奇心、創意和領導能力，並表示課程配合每名孩子的學習需要。這是校方的教育方向；家庭可在參觀時看一個具體活動及孩子作品，了解教師如何回應不同進度。", sourceUrl: "https://www.masspreschool.com" },
      { label: "先問清語言與班型", value: "官網列幼稚園、學前班及語言課程，接受全年申請，提供校園參觀及教師會面。現有資料沒有交代K班主要語言和每日粵普英分工；申請前宜索取所選年級日程及正式費表，不把西班牙語興趣活動當作常規主教語言。", sourceUrl: "https://www.masspreschool.com/admission" },
    ] },
  }),
  profile({
    schoolNumber: "541222", locationId: "0001", website: "https://www.gigamind.edu.hk", telephone: "24469210", principal: "范舒喆", establishedYear: "1999", gradeSpan: "2歲以下、PN／2至3歲及K1至K3；當屆班別、年齡與名額另確認",
    language: "本校概覽列廣東話與英語沉浸式合作教學，3至5歲設專科普通話課；各語言時數未列",
    ratio: "上午1:8.6；下午1:8.3", ratioIncludesPn: true, teacherCount: 39, classroomCount: 18,
    spaces: "有室內、戶外遊戲場地及音樂室，另列圖書室與探索空間。",
    pn: "2025年9月提供2至3歲服務，收錄134人，半日全年44,770元，全日為「-」；提供2歲以下服務，沒有幼兒中心資助、暫託或延長服務。低齡服務資格及當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日為「-」。PN不屬這項免費安排；書簿用品、校車等另計，免費不等於所有家庭開支為0。",
    sourceNote: "校號541222、天龍路9號嘉湖山莊美湖居B座與官網24469210吻合。採本校當屆概覽的粵英合作、普通話課安排，未把教育基金整體介紹當作每班日程。",
    sources: [{ label: "激活幼稚園：聯絡", scope: "美湖居B座及24469210，辨認幼稚園而非集團其他學部。", url: "https://www.gigamind.edu.hk/en/kindergarten/contact-us/contact-information" }, { label: "激活：2027/28申請", scope: "網上申請、面試翻譯、外判校車與隨車照顧；實際申請日期見當屆附件。", url: "https://www.gigamind.edu.hk/en/kindergarten/admissions/how-to-apply" }],
    features: { title: "課程特色｜粵英合作與自主探索", featured: true, details: [
      { label: "語言放在日常活動中", value: "本校概覽列中英教師合作，以廣東話及英語沉浸式教學，3至5歲普通話課由專科教師帶領。家庭可按孩子家中用語了解入學適應和中文支援；這不是三種語言平均分配課時的承諾。", sourceUrl: kgp("541222") },
      { label: "探索、藝術與基督品格", value: "校方重自主探索、科學求真及藝術創作，結合基督精神培養關愛和責任，K1不要求執筆或機械抄算，以持續觀察回饋發展。另列新生適應、社工及到校學前康復；家庭可問清服務資格及教師如何記錄孩子的具體進步。", sourceUrl: kgp("541222") },
    ] },
  }),
  profile({
    schoolNumber: "609749", locationId: "0001", website: "https://www.york.edu.hk", telephone: "36898779", schoolType: "私立獨立幼稚園", principal: "李雅玲", establishedYear: "2019", gradeSpan: grades,
    language: "集團語文頁列母語教師英語活動及粵語、普通話中文；本校班型主次與時數另確認",
    ratio: "上午1:8.9；下午1:2.0", ratioIncludesPn: true, teacherCount: 10,
    spaces: "本校當屆概覽未列註冊課室數及室內、戶外遊戲場地、音樂室配置。",
    pn: "2025年9月提供2至3歲服務，收錄39人，半日全年76,200元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日全年86,400至110,400元／12期；全日未列",
    fees: "2026/27 K1至K3上午下午各級列全年86,400至110,400元、12期，全日為「-」。區間不自行對應語言班型；PN及用品另計，不借用約克其他校舍費率。",
    sourceNote: "校號609749為常寧路10號安寧花園幼稚園商業大樓，地址與集團聯絡頁吻合；概覽電話36898779，集團頁另列23685678，保留差異並以本校概覽號碼作主聯絡。本校課程欄未有詳細資料，不由Montessori校名推定完整蒙氏教學認證或日程。",
    sources: [{ label: "約克：分校地址", scope: "將軍澳安寧花園地址、集團所列23685678；與概覽36898779不同。", url: "https://www.york.edu.hk/addresses.html" }, { label: "約克：集團語文課程", scope: "集團英語閱讀、角色扮演及粵普中文方向；本校開班與課時未獨立列明。", url: "https://york.edu.hk/en/languages.html" }],
    features: { title: "課程特色｜語文活動與校舍核對", featured: true, details: [
      { label: "集團語文方向，班型需落實", value: "約克語文頁列英語母語教師帶小組活動、共讀與角色扮演，中文兼顧廣東話及普通話，利用遊戲和故事重複運用詞彙。這是集團介紹；家庭須向將軍澳校舍確認所選班語言安排及與本地或國際小學的銜接。", sourceUrl: "https://york.edu.hk/en/languages.html" },
      { label: "不以名稱或集團成果代替本校課程", value: "當屆本校概覽未提供課程規劃和評估細節。家長宜先索取本校週課表、學習檔案及蒙氏教具的使用方式，了解操作活動佔日常哪些部分；集團歷年測試、交流或升學成果不能直接當作本校每名孩子的結果。", sourceUrl: kgp("609749") },
    ] },
  }),
  profile({
    schoolNumber: "597716", locationId: "0001", website: "http://www.joyfulenglish.edu.hk", telephone: "28060199", schoolType: "私立獨立幼稚園", principal: "馬心怡", establishedYear: "2014", gradeSpan: grades,
    language: "本校概覽明列英語、普通話教學；粵語支援與各語言課時另確認",
    ratio: "上午1:6.3；下午1:3.3", ratioIncludesPn: true, teacherCount: 26, classroomCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另有圖書及科學、探索學習角。",
    pn: "2025年9月提供2至3歲服務，收錄84人，半日全年73,480元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網2026/27麗城PN另列每月6,880元，不與舊年度費率混用。",
    feeSummary: "麗城K1至K3半日全年73,480元／11期；書簿雜費另列",
    fees: "2026/27 K1至K3上午下午全年73,480元、11期，與官網麗城每月6,680元吻合，全日為「-」。官網另按級別列上下學期書簿雜費；PN每月6,880元屬另一級別，不當作K班費率。",
    sourceNote: "校號597716為麗城花園二期麗城薈，官網28060199吻合；登記及概覽含地下部分，保留完整地址，不改成官網簡寫的1樓。PN2025統計與官網2026/27月費分開。",
    sources: [{ label: "心怡天地：各校舍聯絡", scope: "麗城校舍、28060199，不借用荃景及屯門資料。", url: joyfulContact }, { label: "心怡天地：2026/27費表", scope: "麗城K每月6680、PN6880及各級書簿雜費。", url: joyfulFees }],
    features: { title: "課程特色｜英普與繪本活動", featured: true, details: [
      { label: "英普是本校公布的教學語言", value: "麗城概覽以英語和普通話教學，配校本教材、活動及繪本，引導孩子探索和解難。若家中主要說粵語，可先了解初入學如何溝通及提供何種支援，再看英普環境是否配合目標小學；概覽沒有列課時比例。", sourceUrl: kgp("597716") },
      { label: "看學習記錄，也看照顧安排", value: "校方用學習檔案及持續進度報告與家長交流，列家長講故事、義工及親子活動。家庭可看一份孩子作品如何連到教師回饋；本校沒有列全日及延長服務，有下午照顧需求時須另作安排，不套用屯門全日班。", sourceUrl: kgp("597716") },
    ] },
  }),
  profile({
    schoolNumber: "595837", locationId: "0001", website: "http://www.cyckg.edu.hk/yautong", telephone: "23489699", principal: "陶敏兒", establishedYear: "2013", gradeSpan: grades,
    language: "本校列英語、普通話及廣東話教學；主課語音、教師分工與逐級時數未列",
    ratio: "上午1:8.2；下午1:7.1", ratioIncludesPn: true, teacherCount: 13, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另列閱讀、創藝、自然教育、模擬及多功能訓練空間。",
    pn: "2025年9月提供2至3歲服務，收錄17人，半日全年43,770元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年16,320元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年16,320元、10期。PN、膳食用品及額外活動另核對，沒有把半日免費延伸為全日或PN免費。",
    sourceNote: "校號595837、油塘邨第五期3樓及23489699與登記／概覽對應。油塘官網入口本次未能讀取，課程及年度數字均據本校概覽；未挪用基督教中心其他校舍介紹。",
    sources: [],
    features: { title: "課程特色｜生活專題與基督品格", featured: true, details: [
      { label: "主題隨孩子興趣伸展", value: "本校概覽以生活經驗整合六大學習範疇，結合活動、主題及專題研習，每年安排視覺藝術週。K1不要求執筆或機械抄算；家庭可看一個主題如何由孩子提問走到操作、參觀與表達。", sourceUrl: kgp("595837") },
      { label: "品格、情緒與具體回饋", value: "校方以基督精神重自理、習慣與關懷，列校牧、社工、情緒教育、新生適應及小一體驗，用觀察和軼事記錄與家長溝通。家庭可了解宗教生活與支援資格，再核對三語日程；『兩文三語』沒有交代哪種中文語音佔主課。", sourceUrl: kgp("595837") },
    ] },
  }),
  profile({
    schoolNumber: "590860", locationId: "0001", website: "https://swindon.edu.hk", telephone: "26176108", schoolType: "私立獨立幼稚園", principal: "蔡麗芳", gradeSpan: grades,
    language: "官方課程頁明列粵語、英語雙教師共同帶班，普通話輔助；各語言時數另確認",
    ratio: "上午1:9.0；下午1:1.6", ratioIncludesPn: true, teacherCount: 7,
    spaces: "當屆概覽未列註冊課室及室內、戶外遊戲場地、音樂室配置；學習區的校方描述不當作已核實設施清單。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日全年53,200元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年53,200元／10期；全日未列",
    fees: "2026/27 K1至K3上午下午全年53,200元、10期，全日為「-」。PN與K費雖同數仍分開列年份；用品及其他活動另核對。",
    sourceNote: "官網明列EDB校號590860、沙咀道328號寶石大廈商場108號舖及26176108；官方英文課程頁可讀，粵英共教、普通話輔助有明文，沒有只憑校名猜測。",
    sources: [{ label: "思博：聯絡及校號", scope: "590860、寶石大廈108號及26176108。", url: "http://swindon.edu.hk/en/contact/" }, { label: "思博：課程及語言", scope: "粵英共同帶班、普通話輔助、主題活動與親子閱讀。", url: "https://swindon.edu.hk/en/curriculum/target/" }, { label: "思博：分齡課程", scope: "PN適應自理至K3探究與升小準備；校方教育安排。", url: "http://swindon.edu.hk/en/curriculum/course/" }],
    features: { title: "課程特色｜粵英共教與分齡探索", featured: true, details: [
      { label: "粵英日常，普通話輔助", value: "官方課程頁列每班粵語與英語教師共同教學，普通話輔助，透過故事、遊戲、歌曲及親子閱讀接觸語言。家中說粵語的孩子可先了解如何過渡到英語互動；雙教師不等於兩種語言各佔一半課時。", sourceUrl: "https://swindon.edu.hk/en/curriculum/target/" },
      { label: "從自理到容許不同答案", value: "分齡課程由PN分離適應、自理和感官，走到K1群體合作、K2責任創意，以及K3提問、討論和接納不同答案。家長可看該年級活動與學習記錄，了解教師怎樣回應孩子的問題及準備升小，而非只比較練習量。", sourceUrl: "http://swindon.edu.hk/en/curriculum/course/" },
    ] },
  }),
  profile({
    schoolNumber: "583421", locationId: "0001", website: "https://www.mingwai.edu.hk", telephone: "25222688", schoolType: "私立獨立幼稚園", principal: "梁嘉慧", establishedYear: "2010", gradeSpan: grades,
    language: "太子概覽列英語、普通話、粵語母語教師協作，另有日語；主課及各語言時數未列",
    ratio: "上午1:8.0；下午1:6.1", ratioIncludesPn: true, teacherCount: 20, classroomCount: 10,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另列閱讀、科學、創藝、音樂、遊戲及攀爬空間。",
    pn: "2025年9月提供2至3歲服務，收錄76人，半日全年77,660元、全日130,680元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另核對。",
    feeSummary: "太子K1至K3半日全年78,760元、全日135,850元，均11期",
    fees: "2026/27 K1至K3上午下午全年78,760元、11期，全日135,850元、11期。PN、膳食用品及課後項目另核對；北角分校費用不套入太子。",
    sourceNote: "校號583421為運動場道15號京華大廈地下6號舖及1樓1至5室；官網同址25222688，將幼稚園幼兒園合寫地下3至9號及1樓，保留登記範圍。1968是品牌歷史，不替代本太子校舍2010創校年份。",
    sources: [{ label: "明慧：各校舍聯絡", scope: "太子運動場道15號及25222688；幼兒園與幼稚園合併地址不覆蓋註冊範圍。", url: "https://www.mingwai.edu.hk/%e8%81%af%e7%b5%a1%e6%88%91%e5%80%91/?lang=zh-hant" }],
    features: { title: "課程特色｜多語協作與升小練習", featured: true, details: [
      { label: "三語教師協作，另接觸日語", value: "太子概覽列英、普、粵母語教師協作，另加入日語，融合繪本、拼音及STEAM探索，以小組活動帶動表達與思考。家庭可先核對所選班每天的語言分工；三文四語是校方課程方向，不表示四種語言同等熟練。", sourceUrl: kgp("583421") },
      { label: "升小準備與成果分開", value: "校方列面試禮儀、模擬面試、參觀小學及小一模擬，也以六大範疇建立持續評估檔案。家長可比較活動及課後項目的時間與費用，了解是否符合孩子節奏；接觸劍橋、GAPSK內容不等於每名幼兒均參加或達到指定成績。", sourceUrl: kgp("583421") },
    ] },
  }),
  profile({
    schoolNumber: "583340", locationId: "0001", website: "http://www.joyfulenglish.edu.hk", telephone: "24928555", schoolType: "私立獨立幼稚園", principal: "張冠芬", establishedYear: "2010", gradeSpan: grades,
    language: "荃景本校概覽明列英語與普通話教學；粵語支援及各語言時數另確認",
    ratio: "上午1:4.0；下午1:3.2", ratioIncludesPn: true, teacherCount: 19, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地及音樂室，另列圖書及科學、探索學習角。",
    pn: "2025年9月提供2至3歲服務，收錄44人，半日全年70,730元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網2026/27荃景PN每月6,630元，與歷史全年費率分開。",
    feeSummary: "荃景K1至K3半日全年70,730元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年70,730元、11期，與官網荃景每月6,430元吻合，全日為「-」。上下學期書簿雜費另列；PN月費6,630元不當K班費率。",
    sourceNote: "校號583340是荃景圍76至84號荃景花園11至12座地下，官方聯絡24928555吻合；不是沙田或麗城。荃景有戶外遊戲場地而麗城沒有，兩校資料不互借。",
    sources: [{ label: "心怡天地：荃景聯絡", scope: "荃景花園11至12座地下及24928555。", url: joyfulContact }, { label: "心怡天地：2026/27費表", scope: "荃景K每月6430、PN6630及各級書簿雜費。", url: joyfulFees }],
    features: { title: "課程特色｜英普繪本與持續回饋", featured: true, details: [
      { label: "用活動與繪本接觸英普", value: "荃景本校概覽以英語和普通話教學，透過活動、繪本及校本材料引導主動探索與解難。家庭可看一個閱讀主題如何走到討論和遊戲，並核對新生粵語溝通支援，不能只從『國際』名稱判斷語言時數。", sourceUrl: kgp("583340") },
      { label: "小組觀察不等於固定班額", value: "校方列學習檔案、持續進度報告及家長會談，配親子閱讀、義工與體能活動。家庭可了解所選班教師安排及回饋頻率；分時段師生比不是承諾每班只收幾人，亦不能由此判定仍有多少空缺。", sourceUrl: kgp("583340") },
    ] },
  }),
  exceptionalProfile("541613", {
    website: "https://eclc.eduhk.hk/zh/", telephone: "29481638", schoolType: "非牟利幼稚園（已公布分階段停辦）", establishedYear: "2001（停辦前概覽）",
    registrationStatus: "登記檔保留記錄；校方2024至2026分階段停辦安排優先於舊招生頁",
    gradeSpan: "歷史幼稚園資料；不列作當屆新生申請選項", tuition: "停辦前費表不作當屆學費參考", language: "不把歷史課程語言寫成現行教學安排",
    dataYear: "校方2024至2026分階段停辦說明；2023年媒體報道所述2025/26學年後停止營運；2026-10-24複核",
    sourceNote: "校號541613、教大高級教職員宿舍G02至G05室。官網校長靈感時刻明列2024至2026分階段停辦，am730於2023-11-29報道引述通告為2025/26學年後停止營運。2026/27概覽個校頁未返回本校，沒有用缺頁本身證明停辦；官網2024/25費表和舊概覽僅屬歷史資料，沒有把停辦安排當作教育局撤銷註冊日期。",
    sources: [{ label: "教大幼兒發展中心：校方停辦說明", scope: "校長明列2024至2026分階段停辦；辨認原校址與29481638。", url: eclcNotice }, { label: "am730：2026年停辦報道", scope: "2023-11-29引述校方通告，2025/26學年結束後停止營運及過渡安排；非撤銷註冊證明。", url: "https://www.am730.com.hk/article/414318" }, { label: "教大幼兒發展中心：歷史官網", scope: "保留停辦個人資料處理通告入口及原辦學介紹，不能作仍接受申請證據。", url: "https://eclc.eduhk.hk/zh/" }],
    detailSections: [{ title: "辦學狀態｜分階段停辦安排", featured: true, details: [
      { label: "停辦說明先於舊招生資訊", value: "校方明列2024至2026分階段停辦；am730引述家長通告，安排於2025/26學年結束後停止營運。在讀生完成學業及當年插班屬過渡安排，不能據舊網頁認為現在仍可申請K1或PN。", period: "校方停辦說明；媒體2023-11-29", sourceUrl: eclcNotice },
      { label: "保留身份，不沿用舊年度數字", value: "原址為大埔露屏路10號教大高級教職員宿舍地下G02至G05室，聯絡29481638。本頁保留歷史身份供辨認，撤下舊學費、師生比和幼兒服務作當屆比較；需要現行入學選項時，應選有當屆招生文件的在辦學校。", period: "2026-10-24複核", sourceUrl: "https://eclc.eduhk.hk/zh/" },
    ] }],
  }),
  profile({
    schoolNumber: "323896", locationId: "0001", website: "https://www.plkkgs.edu.hk/plkvcktkg", telephone: "28949921", principal: "盧巧藍", establishedYear: "1975", gradeSpan: grades,
    language: "本校列粵語正音、英文學習室及普通話活動空間；主教語言與各語言時數未列",
    ratio: "上午1:8.2；下午1:4.5", ratioIncludesPn: true, teacherCount: 14, classroomCount: 6,
    spaces: "有室內及戶外遊戲場地，沒有獨立音樂室；另列圖書廊、禮堂、感統訓練、英文學習室、普通話動感系統室、種植區與家長活動室。",
    pn: "2025年9月提供2至3歲服務，收錄1人，半日全年47,650元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。1人是當年收錄數，不是PN招生名額。",
    feeSummary: "K1至K3半日資助後免費；全日全年12,060元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年12,060元、10期。PN、膳食用品另核對；課室容額及歷史在讀人數不能換算當屆可申請學額。",
    sourceNote: "校號323896、禮頓道66號與官網28949921吻合；盧巧藍校長亦見本校官網。沒有將蒙氏操作教具寫成全套蒙特梭利課程或由語言特別室推定主課語言。",
    sources: [{ label: "保良局莊啓程：聯絡", scope: "禮頓道66號及28949921；本校而非其他保良局園所。", url: "https://www.plkkgs.edu.hk/plkvcktkg/contact" }],
    features: { title: "課程特色｜生命教育與操作表達", featured: true, details: [
      { label: "專題、戲劇與操作教具", value: "本校概覽以生命教育連結自己、他人及環境，結合兒童專題、戲劇、美藝和蒙特梭利操作教具，培養表達、數概與邏輯。這是校方公布的教學元素，不能由教具推定全天採完整蒙氏制度；家庭可看一個專題如何讓孩子參與與展示。", sourceUrl: kgp("323896") },
      { label: "觀察檔案與家庭支援", value: "校方以作品、觀察及家庭生活記錄建立學習檔案，列新生適應、粵語正音、情緒課程、幼小銜接和陽光電話。家長可核對語言日程與支援資格，了解教師如何將記錄變成下一步協助；有幼小活動不等於保留小學學額。", sourceUrl: kgp("323896") },
    ] },
  }),
];

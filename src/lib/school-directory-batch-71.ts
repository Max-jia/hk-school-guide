import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及名額另確認";

type SalvationSchool = {
  schoolNumber: string;
  route: string;
  telephone: string;
  principal: string;
  establishedYear: string;
  ratio: string;
  teacherCount: number;
  classroomCount?: number;
  spaces: string;
  pn: string;
  feeSummary: string;
  fees: string;
  title: string;
  details: { label: string; value: string }[];
};

function salvationSchool(s: SalvationSchool): PilotSchool {
  const website = `https://www.salvationarmy.org.hk/esd/${s.route}/`;
  const isLaiChiKok = s.schoolNumber === "562955";
  return profile({
    ...s, locationId: "0001", website, gradeSpan: grades,
    language: s.schoolNumber === "523364"
      ? "本校概覽重視聽說讀寫，未列粵語／普通話／英語分工及時數，須直接確認"
      : "本校概覽列英語聆聽、說話及拼讀；粵語／普通話主課及逐級時數未公開",
    ratioIncludesPn: true,
    sourceNote: isLaiChiKok
      ? "本頁為荔枝角道150至174號1樓、校號562955，官網到訪地址168號萬盛閣1樓及27875788可對應；登記範圍不縮成單一門牌。學費、教師及服務均按本校概覽。"
      : `本頁只對應校號${s.schoolNumber}。概覽所列官網本次顯示荔枝角幼兒學校及其地址電話，不作本校課程、場地或服務事實來源；本頁使用本校概覽與本校電話核對。`,
    sources: [{ label: isLaiChiKok ? "救世軍荔枝角：校舍官網" : "概覽所列官網（內容須確認）", scope: isLaiChiKok ? "荔枝角道168號、27875788與本校可對應；最新費率與服務另依本校概覽。" : "此網址現顯示荔枝角校舍內容，不能套用至本校；請改用本校概覽及電話確認。", url: website }],
    features: { title: s.title, featured: true, details: s.details.map((detail) => ({ ...detail, period: "2026/27概覽校方申報", sourceUrl: kgp(s.schoolNumber) })) },
  });
}

export const KINDERGARTEN_BATCH_71: PilotSchool[] = [
  profile({
    schoolNumber: "530735", locationId: "0001", website: "https://lstackg.edu.hk/", telephone: "21770272", principal: "金欣穎", establishedYear: "1999", gradeSpan: grades,
    language: "本校申報每天安排英語及普通話，由專教老師負責；主課語音與實際分鐘數另確認",
    ratio: "上午1:8.9；下午1:6.1", ratioIncludesPn: true, teacherCount: 9, classroomCount: 7, spaces: "有室內遊戲場地、音樂室及多元學習室；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄23人，半日全年35,200元、全日56,694元；沒有幼兒中心資助、暫託及延長時間服務。當屆費率另核對。",
    feeSummary: "K1至K3上午免費；全日全年17,380元／11期，下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」；全日全年17,380元、11期。PN、用品及膳食另計，不能概括成所有半日時段均免費。",
    sourceNote: "本頁為尚德邨尚明樓4樓平台、校號530735，與同機構其他梁省德校號分開。官網本次讀取受限，英普頻率及課程採本校概覽；每天活動不自行換算語言佔比。",
    sources: [],
    features: { title: "課程特色｜探索與每天英普活動", featured: true, details: [
      { label: "英普、音樂、體能和藝術融入日程", value: "尚德本校概覽列每天英語、普通話、音樂、體能及藝術，英普由專教老師負責；主題和方案教學透過遊戲、討論、資料搜集及參觀延伸。家庭可索取一週日程，看語言活動如何與探索連結，而不把每天有課解作長時間全英或全普。", period: "2026/27概覽校方申報", sourceUrl: kgp("530735") },
      { label: "新生時間遞增，家長需配合適應", value: "校方列迎新、家長會及逐步遞增上課時間的適應期，另有駐校社工支援情緒和親職壓力。需要即時全日照顧的家庭宜先了解過渡期長短與接送，再確認升小參觀及家長觀課安排，不假定第一天即可按完整日程留校。", period: "2026/27概覽校方申報", sourceUrl: kgp("530735") },
    ] },
  }),
  profile({
    schoolNumber: "556220", locationId: "0001", website: "https://www.bcykgtc.edu.hk/", telephone: "24322088", principal: "何高冉紋", establishedYear: "2003", gradeSpan: grades,
    language: "本校最新概覽未明確列主課語音及英語／普通話時數，須直接向東涌校舍確認",
    ratio: "上午1:9.7；下午1:7.1", ratioIncludesPn: true, teacherCount: 19, classroomCount: 8, spaces: "有室內及戶外遊戲場地、音樂室、多元智能場、智力遊戲區及舞蹈室。",
    pn: "2025年9月提供2至3歲服務，收錄35人，半日全年33,900元，全日為「-」；沒有幼兒中心資助、暫託及延長服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日免費；全日全年8,600元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日全年8,600元、10期。PN、膳食及用品另計，不能以免費K1預算估算PN。",
    sourceNote: "本頁為東涌逸東商場2樓5號、校號556220。官網本次讀取受限，藝術、多元智能、共融及場地依本校概覽，不借同機構其他幼稚園安排。",
    sources: [],
    features: { title: "課程特色｜藝術與合作遊戲", featured: true, details: [
      { label: "藝術活動帶動區角合作", value: "校方以多元智能和藝術教學，結合自由遊戲、合作及區角活動，讓孩子觀察、討論、研究和回饋。家長可看孩子如何共同決定材料、表達作品想法，以及教師如何按能力調整任務，不能由藝術特色直接推定比賽成果或專科訓練時數。", period: "2026/27概覽校方申報", sourceUrl: kgp("556220") },
      { label: "親子適應與非華語小組有不同用途", value: "本校列新生親子遊戲班、小學參觀、非華語小組、翻譯傳譯、駐校社工及到校康復。家庭可按孩子的語言與適應需要問清組別、資格和家長陪同要求，再了解老師如何透過學習檔案回饋各方面發展。", period: "2026/27概覽校方申報", sourceUrl: kgp("556220") },
    ] },
  }),
  profile({
    schoolNumber: "562890", locationId: "0001", website: "https://www.ychcptkg.edu.hk/", telephone: "24399661", principal: "吳蘭香", establishedYear: "1998", gradeSpan: grades,
    language: "本校官網列外籍老師英語遊戲及普通話音樂律動活動；主課語音和時數另確認",
    ratio: "上午1:8.4；下午1:8.4", ratioIncludesPn: true, teacherCount: 21, classroomCount: 6, spaces: "有室內遊戲場地、音樂室及閱讀室；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄28人，全日全年41,424元，半日為「-」；列有幼兒中心資助、暫託及延長服務。PN當屆費率與資格另確認。",
    feeSummary: "概覽K1至K3各時段列「申請審核中」，尚不能據此確定當屆學費",
    fees: "2026/27概覽K1至K3上午、下午及全日均列「申請審核中」，不填0或改寫免費。教育局可取得的收費證明書生效日期為2025-09-01，不能直接當2026/27核准費用；報名前索取當屆版本。",
    sourceNote: "仁濟街18號1樓及24399661與官網吻合。本頁保留2026/27待審狀態；2025生效舊證明書與2025年9月PN費分別標年，沒有以舊費填當屆空白。",
    sources: [
      { label: "仁濟蔡百泰：理念、課程與聯絡", scope: "仁濟街現址電話、英普活動、主題專題、德育及每周五多元智能日。", url: "https://www.ychcptkg.edu.hk/" },
      { label: "蔡百泰：教育局收費證明書（2025生效）", scope: "目前讀到的生效日期2025-09-01，未當2026/27費率；新學年須索取更新證明。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/562890.pdf" },
    ],
    features: { title: "課程特色｜遊戲專題與多元智能日", featured: true, details: [
      { label: "每周五以多元活動探索興趣", value: "官網列主題和專題研習，以思考、嘗試、求證及表達把遊戲連到學習；每周五的多元智能日涵蓋美術、音樂、戲劇等。家長可看一個近期單元如何讓幼兒選擇及發表，並了解全日班的活動與休息分配。", sourceUrl: "https://www.ychcptkg.edu.hk/" },
      { label: "語言用音樂和互動引發興趣", value: "校方聘外籍老師帶領英語遊戲，普通話亦結合歌唱、律動、舞蹈和團體遊戲；德育計劃則強調日常互動實踐。家庭可詢問各級頻率與教師分工，並按孩子適應或支援需要了解社工、兼收與家校回饋，不能把活動特色當語言程度保證。", sourceUrl: "https://www.ychcptkg.edu.hk/" },
    ] },
  }),
  salvationSchool({
    schoolNumber: "563099", route: "twhns", telephone: "26147662", principal: "麥妙玲", establishedYear: "1987", ratio: "上午1:7.9；下午1:7.9", teacherCount: 11, classroomCount: 4,
    spaces: "室內遊戲場地、音樂室及體能活動室；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄26人，全日全年42,444元，半日為「-」；有幼兒中心資助及暫託，沒有延長服務。當屆資格與費率另核對。",
    feeSummary: "K1至K3全日全年22,716元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年22,716元、12期；上午下午為「-」。PN、膳食用品及暫託另計，不能把暫託當作晚接送延長服務。",
    title: "課程特色｜專題操作與日常自理", details: [
      { label: "由觀察與討論走到自己動手做", value: "大窩口本校概覽以專題研習、蒙特梭利操作、英語聽說拼讀和生命教育，發展探索、自理及秩序感。家長可觀察孩子如何選擇材料、整理環境與表達發現，並詢問沒有戶外場地時，體能室每天怎樣使用。" },
      { label: "暫託有提供，延長照顧另有邊界", value: "本校原表列有暫託、沒有延長服務，另有學生支援教師及社工。需要臨時照顧或經常晚接送的家庭，應分別問清服務資格和時間；全日上課及暫託不自動涵蓋下班後照顧，專業支援亦按個別需要安排。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "563145", route: "wfns", telephone: "25516341", principal: "林穎芹", establishedYear: "1973", ratio: "上午1:6.6；下午1:6.6", teacherCount: 13,
    spaces: "室內遊戲場地、音樂室、蒙特梭利室、體能活動室及親子閱讀室；沒有戶外場地，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄23人，全日全年50,136元，半日為「-」；有幼兒中心資助、暫託及延長服務，當屆資格與費率另確認。",
    feeSummary: "K1至K3全日全年18,852元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年18,852元、12期；上午下午為「-」。PN、膳食用品及暫託延長服務各自核對。",
    title: "課程特色｜自理操作與親子閱讀", details: [
      { label: "操作與語言放在日常生活理解", value: "華富本校概覽列專題、蒙特梭利操作、英文聽說拼讀與生命教育，並有蒙特梭利、體能及親子閱讀空間。家長可了解幼兒每天怎樣輪流使用、如何選擇材料和分享閱讀，不由設有專室推定每級同樣課時。" },
      { label: "延長照顧先確認資格和接送", value: "本校列幼兒中心資助、暫託及延長服務，另有駐校社工、兼收與到校康復。需要照顧配套的家庭可把工作時間、接送及服務費一起核對，並了解支援申請或轉介程序；參加計劃不等於所有兒童自動獲同樣補助或訓練。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "563072", route: "mtns", telephone: "26237555", principal: "張雯麗", establishedYear: "1997", ratio: "上午1:8.4；下午1:8.4", teacherCount: 15,
    spaces: "室內及戶外遊戲場地、音樂室、體能活動室與多用途室；註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄21人，全日全年43,788元，半日為「-」；有幼兒中心資助，沒有暫託及延長服務。當屆資格與費率另確認。",
    feeSummary: "K1至K3全日全年20,880元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年20,880元、12期；上午下午為「-」。PN及用品膳食另計，不把全日班解作有延長服務。",
    title: "課程特色｜戶外探索與自主學習", details: [
      { label: "專題、操作和英語配合全人方向", value: "明德本校概覽以專題觀察、討論和實踐建構知識，結合蒙特梭利操作、英語聽說拼讀及生命教育。校內有室內外與體能空間，家庭可問清一日探索、操作、活動與休息的節奏，以及雨天的安排。" },
      { label: "家長從學習檔案討論適應", value: "本校持續觀察並建立學習檔案，另有支援教師、社工及經轉介的跨專業服務。家庭可用具體作品和行為記錄，了解自理、情緒與同伴合作，再確認支援需要；原表沒有暫託或延長照顧，須另安排接送備援。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "563064", route: "lmns", telephone: "23651994", principal: "羅麗儀", establishedYear: "1974", ratio: "上午1:8.1；下午1:8.1", teacherCount: 13,
    spaces: "有室內及戶外遊戲場地、音樂室、蒙特梭利室與多用途室；註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄18人，全日全年44,436元，半日為「-」；有幼兒中心資助，沒有暫託或延長服務。當屆費率另確認。",
    feeSummary: "K1至K3全日全年22,716元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年22,716元、12期；上午下午為「-」。PN及膳食用品另核對，不套用同機構其他校舍的晚接送服務。",
    title: "課程特色｜操作探索與生命教育", details: [
      { label: "在操作中練自理、專注和解難", value: "樂民本校概覽結合專題、蒙特梭利、英語聽說拼讀及生命教育，透過觀察與實踐發展自主和秩序。家長可了解蒙特梭利室與自由遊戲的分工，並看教師如何按年齡調整材料，不把使用蒙氏元素解作所有課程均採完整蒙氏模式。" },
      { label: "家庭參與與照顧安排分開規劃", value: "校方列家長教師協會、家長義工及聯校家長聯會，並有社工和支援教師。家庭可確認家長活動時間、日常回饋與需要協助時的聯絡方法；全日上課並沒有附帶暫託或延長服務，工作家庭宜先安排接送備援。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "566535", route: "cbns", telephone: "23327963", principal: "鄧以敬", establishedYear: "1985", ratio: "上午1:7.8；下午1:7.8", teacherCount: 12,
    spaces: "有室內遊戲場地、音樂室及小型圖書館；沒有戶外場地，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄16人，全日全年46,416元，半日為「-」；有幼兒中心資助，沒有暫託或延長服務。當屆資格與費率另確認。",
    feeSummary: "K1至K3全日全年29,556元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年29,556元、12期；上午下午為「-」。PN及膳食用品另計，不能套用同機構較低費率或免費半日班。",
    title: "課程特色｜閱讀、操作與品格", details: [
      { label: "把閱讀與動手探索連起來", value: "卜凱賽琳本校概覽列專題、蒙特梭利、英語聽說拼讀及生命教育，校內另有小型圖書館。家長可問孩子如何選書、如何把故事問題變成操作與討論，以及全日作息中閱讀、體能和休息的時間，而不只看認字進度。" },
      { label: "支援按個別需要轉介", value: "本校列學生支援教師、駐校社工、兼收及到校康復，並透過家長教師協會保持聯繫。若孩子有語言、情緒或發展需要，家庭宜先核對申請資格與跟進方式；所在地救世軍總部不代表可使用機構所有服務或保證即時有名額。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "562955", route: "lckns", telephone: "27875788", principal: "梁寶珠", establishedYear: "1995", ratio: "上午1:7.9；下午1:7.9", teacherCount: 10,
    spaces: "有室內遊戲場地及音樂室；沒有戶外場地及其他特別室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄13人，全日全年46,128元，半日為「-」；有幼兒中心資助、暫託及延長服務。當屆資格、時段與費率另確認。",
    feeSummary: "K1至K3全日全年23,940元／12期；PN另計", fees: "2026/27 K1至K3全日扣減資助後全年23,940元、12期；上午下午為「-」。PN、膳食及暫託延長服務各自核對。",
    title: "課程特色｜探索操作與家校照顧", details: [
      { label: "校舍內看實際活動安排", value: "荔枝角本校概覽結合專題、蒙特梭利、英語聽說拼讀及生命教育，以持續觀察建立學習檔案。沒有戶外遊戲場地的家庭可在到訪時重點看大肌肉活動、室內輪流使用和休息安排，並了解教師如何保留孩子的選擇。" },
      { label: "延長服務與教育支援各有程序", value: "本校列暫託、延長服務、駐校社工及學生支援教師，另參與到校康復。家庭可按上班接送及孩子需要，確認當屆服務資格、費率和聯絡方法；本校有延長服務不能推成其他救世軍園所也有同樣安排。" },
    ],
  }),
  salvationSchool({
    schoolNumber: "523364", route: "ptkg", telephone: "27755332", principal: "湯瑩欣", establishedYear: "1997", ratio: "上午1:6.0；下午1:0.7", teacherCount: 6, classroomCount: 6,
    spaces: "室內及戶外遊戲場地、音樂室、感知探索室及蒙特梭利室。",
    pn: "2025年9月提供2至3歲服務，收錄5人，半日全年37,500元，全日為「-」；沒有幼兒中心資助、暫託或延長服務。當屆費率另核對。",
    feeSummary: "K1至K3上午下午免費；全日未列", fees: "2026/27 K1至K3上午下午扣減資助後免費，全日為「-」。PN及用品等另計，低下午比率不是一對一課程承諾或當屆空缺證明。",
    title: "課程特色｜感知探索與主動求證", details: [
      { label: "從觀察求證建立語文與科學基礎", value: "平田本校概覽著重師生互動及親身體驗，讓孩子經觀察、求證、分析與解難運用知識，兼顧語文、科學、合作及藝術。家長可看感知探索室與蒙特梭利室如何服務不同年齡，並請教師用實際活動說明孩子怎樣表達發現。" },
      { label: "半日班與全日幼兒學校不同", value: "本校公開費率只有半日免費K1至K3，PN另有費用，也沒有暫託或延長服務。需要全日照顧的家庭應先確認班制和接送可行性，再了解新生、家長與校牧支援；不能因同屬救世軍就採用其他幼兒學校的全日安排。" },
    ],
  }),
];

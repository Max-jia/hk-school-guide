import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string, loc = "0001") => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}${loc}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與學位另確認";
const annaFee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/215740.pdf";
const annaIntro = "https://www.stanna.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/";
const choiceIntro = "https://www.choicekinder.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B-2/";
const choiceTeam = "https://www.choicekinder.edu.hk/%E8%A1%8C%E6%94%BF%E6%9E%B6%E6%A7%8B/";
const carmelCourse = "https://www.carmel.edu.hk/academics/holly-rofe-early-learning-centre/nursery-prek";
const carmelFaq = "https://www.carmel.edu.hk/academics/holly-rofe-early-learning-centre/faq";

function feeCertificateProfile(school: PilotSchool): PilotSchool {
  return { ...school, dataYear: `${school.dataYear}；K班收費按2026-09-01生效教育局證書修正`, detailSections: school.detailSections?.map((section) => ({ ...section, details: section.details.map((detail) => detail.label === "K1至K3全年學費與期數" ? { ...detail, sourceUrl: annaFee, period: "2026-09-01生效教育局收費證書" } : detail) })) };
}

const anchors = profile({
  schoolNumber: "565199", locationId: "0002", website: "https://www.anchors.edu.hk", telephone: "26506660", schoolType: "私立獨立幼稚園；兩個登記校址分列", principal: "岑慧中", establishedYear: "富萊花園2000；滌濤山2008（各自概覽）", gradeSpan: grades,
  language: "兩址概覽未列主教語言及英粵普時數；不沿用未註年份的粵語標籤",
  ratio: "滌濤山上午1:8.8；下午1:3.8", ratioIncludesPn: true, teacherCount: 13, classroomCount: 7,
  spaces: "滌濤山有室內、戶外遊戲場地及音樂室，另列圖書、情意品德、STEAM、科技實驗及種植園地；不套用富萊花園。",
  pn: "滌濤山2025年9月提供2至3歲服務，收錄23人，半日全年78,000元、全日118,560元；沒有2歲以下、幼兒中心資助、暫託及延長服務。富萊花園另列。",
  feeSummary: "兩址K1至K3半日全年73,700元、核准全日105,600元，均11期；開班另確認",
  fees: "滌濤山2026/27 K1至K3上午下午全年73,700元、11期，全日105,600元、11期；PN及膳食用品另核對。費表列全日不等於各年級現有學位。",
  sourceNote: "同校號565199有紅林路1號滌濤山0002及翠樂街8號富萊花園0001，兩份當屆概覽均另讀原表。主聯絡26506660只屬滌濤山；富萊26665650另列。官網本次瀏覽器被Cloudflare阻擋，未從品牌名稱猜語言。富萊全日費表有數字而2025在讀0、註冊費註無全日班，現行開班須確認。",
  sources: [{ label: "安基司：富萊花園概覽2026/27", scope: "0001地址電話、2000創校、2025統計及獨立PN費率；不套用滌濤山。", url: kgp("565199") }],
  features: { title: "課程特色｜兩校址的探索與情意", featured: true, details: [
    { label: "滌濤山：校本課程加STEAM", value: "滌濤山概覽列『1+S』校本與STEAM課程，每週一天STEAM Day，透過實驗、建構、科技互動及社交情智教育學習。STEAM指科學、科技、工程、藝術及數學；家長可看孩子如何提問和試做，不以機械人等設備代替學習成效。", sourceUrl: kgp("565199", "0002") },
    { label: "富萊花園：主題設計與閱讀", value: "富萊花園以主題、設計活動、社交情緒及閱讀文化培養探索與自我管理，列2至3歲適應和升小過渡。兩址均是校方公布的課程方向，實際語言班型、每日活動和支援資格須按所選校舍確認，不把滌濤山設備搬到富萊。", sourceUrl: kgp("565199") },
  ] },
});

export const KINDERGARTEN_BATCH_82: PilotSchool[] = [
  profile({
    schoolNumber: "533360", locationId: "0002", website: "https://www.think.edu.hk", telephone: "26337800", schoolType: "私立獨立幼稚園", principal: "朱曉敏", establishedYear: "1999", gradeSpan: grades,
    language: "集團列英粵／英普雙語、三語及國際課程；馬鞍山所選班型與課時另確認",
    ratio: "上午1:7.2；下午1:3.4", ratioIncludesPn: true, teacherCount: 11,
    spaces: "本校當屆概覽未列註冊課室及室內、戶外遊戲場地、音樂室配置。",
    pn: "2025年9月提供2至3歲服務，收錄22人，半日全年84,600元、全日148,620元；沒有2歲以下、幼兒中心資助、暫託或延長服務。PN全日費率不作K班全日費率。",
    feeSummary: "K1至K3上午全年79,200元、下午52,800元，均11期；全日未列",
    fees: "2026/27 K1至K3上午全年79,200元、11期，下午52,800元、11期，全日為「-」。雖2025有K全日在讀記錄，當屆全日是否開班與費率仍須另確認；PN與用品另計。",
    sourceNote: "校號533360／0002，新港城中心2樓及26337800與官網聯絡吻合，1999為馬鞍山創校，不是集團麗港城1994。集團雙語課程不直接證明本校所有班均有同一語言比例。",
    sources: [{ label: "朗思：各校舍聯絡", scope: "馬鞍山西沙路628號新港城2樓及26337800。", url: "https://www.think.edu.hk/contact" }, { label: "朗思：課程班型", scope: "集團英粵／英普雙語、國際課程入口；本校選班另核對。", url: "https://www.think.edu.hk/programs" }, { label: "朗思：理念與探究", scope: "集團兒童主導專題、生活語文與戶外探究方向。", url: "https://www.think.edu.hk/philosophy-curriculum" }],
    features: { title: "課程特色｜多語與兒童主導探究", featured: true, details: [
      { label: "以生活語境運用語言", value: "集團課程以母語教師在日常聆聽、表達、共讀和遊戲中帶入英語、普通話及粵語，班型包括英粵／英普雙語等。家庭宜先確認馬鞍山當屆實際班型，再按家中用語和目標小學選擇，不把三語接觸解作平均課時。", sourceUrl: "https://www.think.edu.hk/programs" },
      { label: "由孩子選題，觀察探索過程", value: "朗思理念頁重遊戲、探究與兒童主導專題，由孩子的興趣走到合作、創作及參觀。家長可看本校一份專題記錄，了解提問、嘗試與互相聆聽如何發生；集團所述升小準備並非特定小學的學額保證。", sourceUrl: "https://www.think.edu.hk/philosophy-curriculum" },
    ] },
  }),
  profile({
    schoolNumber: "231240", locationId: "0001", website: "https://www.choicekinder.edu.hk", telephone: "24955595", principal: "廖鳳香", establishedYear: "1987", gradeSpan: "N1及K1至K3半日；官網暫停招收幼稚園全日班",
    language: "官網列兩文四語及英語、普通話、日語專科教師；主要中文粵普分工與時數另確認",
    ratio: "上午1:7.8；下午1:6.2", ratioIncludesPn: true, teacherCount: 32, classroomCount: 11,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另有資源室。",
    pn: "2025年9月提供2至3歲服務，收錄58人，半日全年54,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆N1費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日核准11,760元／10期但官網暫停招生",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，概覽列全日全年11,760元、10期；官網明列暫停招收幼稚園全日班，不作可申請班別。PN、用品及其他活動另核對。",
    sourceNote: "校號231240、青怡花園1座地下及1樓24955595吻合。官網簡介明列暫停全日招生，優先於有核准費率的推斷；官網40名教師／1:9未標統計日期，不覆蓋概覽2025年9月32人及分時段比例。",
    sources: [{ label: "卓思青怡：學校簡介", scope: "1987、校號、地址電話及暫停全日招生。", url: choiceIntro }, { label: "卓思青怡：行政及專科教師", scope: "英語、普通話、日語專科方向；未以未標年份40人替代年度統計。", url: choiceTeam }],
    features: { title: "課程特色｜品德、音藝與多語", featured: true, details: [
      { label: "品德在常規與遊戲中實踐", value: "本校官網按級別設定品德主題，結合常規、遊戲及班本活動，另列奧福音樂、幼兒鼓樂和粵劇。家長可了解孩子是參與日常音藝體驗，還是需另報活動，再看主題分組與區角如何培養合作和表達。", sourceUrl: "https://www.choicekinder.edu.hk" },
      { label: "專科語言與家校觀察", value: "官網列英語、普通話及日語專科教師，概覽用持續評估、課堂觀察及家庭生活記錄追蹤成長。『兩文四語』未說明每班課時和主教語音；家庭可索取所選年級日程及一份回饋樣本，全日需求則要先另找方案。", sourceUrl: choiceTeam },
    ] },
  }),
  profile({
    schoolNumber: "560090", locationId: "0001", website: "https://swt.creative.edu.hk/", telephone: "28732128", principal: "馮慧敏", establishedYear: "2005", gradeSpan: grades,
    language: "本校列生活全語文、英語故事戲劇及中英文閱讀；主要中文粵普分工與時數未列",
    ratio: "上午1:10.2；下午1:5.7", ratioIncludesPn: true, teacherCount: 20, classroomCount: 12,
    spaces: "概覽有室內遊戲場地、無戶外遊戲場地及獨立音樂室；官網另述戶外魚池、種植及自然探索，兩者分類不同，實際使用範圍須確認。另有藝術、圖書、寶寶區及STEM Wall。",
    pn: "2025年9月提供2至3歲服務，收錄64人，半日全年44,580元、全日67,620元；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27 PN半日45,200元、全日連膳食68,560元，屬新年度及不同費用口徑。",
    feeSummary: "K1至K3半日資助後免費；全日純學費22,840元／10期，官網連膳食27,350元",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日純學費全年22,840元、10期；本校官網全日連茶點、午膳及下午茶全年27,350元、10期。用品等另計，含膳食總額不能當純學費。",
    sourceNote: "本校2005創辦、鴨脷洲徑3號28732128及12課室與官網吻合；集團1984非本校創校年。官網戶外活動描述與概覽『沒有戶外遊戲場地』並列，未擅自統一；2024/25升小名單無人數分母，不換升學率。",
    sources: [],
    features: { title: "課程特色｜閱讀戲劇與藝術探索", featured: true, details: [
      { label: "讀故事，也表達與創作", value: "深灣軒本校官網用生活全語文、英語故事戲劇及中英文圖書區引起閱讀興趣，藝術區由欣賞名畫走到創作及分享。家長可看孩子如何講故事、解釋作品及互相欣賞，再了解教師如何處理不同語言程度。", sourceUrl: "https://swt.creative.edu.hk/" },
      { label: "自選活動與觀察回饋", value: "概覽列自由遊戲、自選區的計劃—實踐—回顧，配小組探索及生活化STEM，以持續觀察和總結報告建立學習檔案。家庭可核對每日活動安排及戶外使用方式；校舍有STEM設備不等於孩子已達某種能力或升學結果。", sourceUrl: kgp("560090") },
    ] },
  }),
  profile({
    schoolNumber: "158771", locationId: "0003", website: "https://www.jbkingsland.com", telephone: "27052211", principal: "黃瑞芬", establishedYear: "1987", gradeSpan: grades,
    language: "校方列兩文三語與全語文；主教粵普、英文教師安排及課時未列",
    ratio: "上午1:8.5；下午1:5.2", ratioIncludesPn: true, teacherCount: 13, classroomCount: 5,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有圖書室、大肌肉室和舞台。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日全年45,744元、全日64,356元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3上午資助後免費；全日全年15,408元／12期，下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」，全日全年15,408元、12期。PN、膳食用品另核對，沒有把歷史PN全日費套入K班。",
    sourceNote: "校號158771／0003為煜明苑焜明閣地下，官方首頁地址及27052211吻合。舊校址編號或其他英皇名稱不借用；官網升小統計入口不直接當錄取率。",
    sources: [],
    features: { title: "課程特色｜自理、合作與情緒表達", featured: true, details: [
      { label: "動靜交替，探索與自選並行", value: "本校概覽結合主題、小組、故事與參觀，保留音樂、體能及自選活動，以動靜交替照顧不同需要。校方重自理、自律及共融；家庭可看日程是否給孩子足夠操作和表達的時間，並問清實際三語分工。", sourceUrl: kgp("158771", "0003") },
      { label: "新生適應與情緒支援", value: "校方列試學日、適應週、駐校社工及情緒小組，以主題觀察、作品及孩子自述建立學期檔案。家長可了解如何處理分離焦慮、何時回報及轉介；這些是支援安排，並非每名孩子均需或自動獲同一服務。", sourceUrl: kgp("158771", "0003") },
    ] },
  }),
  profile({
    schoolNumber: "158470", locationId: "0001", website: "https://tlebk.edu.hk", telephone: "27024711", principal: "陳幗寶", establishedYear: "1989", gradeSpan: grades,
    language: "雙語班列每日一至兩位外籍教師英語溝通遊戲；中文粵普分工與語言時數未列",
    ratio: "上午1:8.0；下午1:4.0", ratioIncludesPn: true, teacherCount: 24, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有體能室、圖書館、禮堂及家長教師資源室。",
    pn: "2025年9月提供2至3歲服務，收錄47人，半日全年43,490元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；核准全日全年8,650元／11期，開班另確認",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日列全年8,650元、11期；2025全日在讀0人，現行開班及學位須另確認。PN、膳食用品另計。",
    sourceNote: "校號158470、翠林邨雅林樓地下27024711與登記／當屆概覽對應。官網本次返回405，沒有藉其他園所補空；戶外參觀不等於自設戶外遊戲場。",
    sources: [],
    features: { title: "課程特色｜英語朗讀與走出課室", featured: true, details: [
      { label: "英語互動有具體安排", value: "本校概覽列雙語班每日一至兩位外籍老師與孩子英語溝通、遊戲，『我讀你聽』計劃配外籍教師故事朗讀二維碼，方便家庭共讀。家長可問清所選班實際教師與時數；外籍教師數不直接等於每班全程配置。", sourceUrl: kgp("158470") },
      { label: "戶外經驗與基督品格", value: "校方透過參觀、旅行、表演及主題操作拓展生活經驗，配基督少年軍和親子德育，以作品、照片及觀察建立個人檔案。家庭可了解宗教活動及參觀頻率，區分走出校園的安排和校內沒有戶外遊戲場的條件。", sourceUrl: kgp("158470") },
    ] },
  }),
  { ...anchors, detailSections: [...(anchors.detailSections || []), {
    title: "富萊花園｜校址0001", note: "與滌濤山分開列示；主表師資及校舍欄只屬滌濤山。", details: [
      { label: "校舍與課程", value: "翠樂街8號富萊花園G07B舖部分地下及2樓，26665650，概覽創校2000。採主題、設計活動、情緒教育及閱讀，學習記錄與持續評估追蹤成長；主教語言未列。", sourceUrl: kgp("565199") },
      { label: "PN與照顧服務", value: "2025年9月2至3歲收錄71人，半日全年78,000元、全日117,600元；無2歲以下、幼兒中心資助、暫託或延長服務。此PN全日費與滌濤山118,560元不同，亦非K班費率。", period: "2025年9月", sourceUrl: kgp("565199") },
      { label: "師資、比例與場地", value: "2025年9月校長及教學人員16人（不含0至2歲教師），上午1:7.3、下午1:3.3，包含2至3歲班；註冊課室未列。有室內遊戲場地和音樂室，沒有戶外遊戲場地，不借用滌濤山7課室及戶外空間。", period: "2026/27概覽；人員比例2025年9月", sourceUrl: kgp("565199") },
      { label: "K班費表與開班差異", value: "2026/27 K1至K3上午下午全年73,700元、11期，全日列105,600元、11期；惟2025全日在讀0人，頁末註沒有開辦全日班。家長須先確認現行全日是否開辦，不因費表有數字就當作可申請。", period: "2026/27", sourceUrl: kgp("565199") },
    ],
  }] },
  profile({
    schoolNumber: "216186", locationId: "0002", website: "https://www.carmel.edu.hk", telephone: "22497600", schoolType: "非牟利私立幼稚園；沒有參加教育計劃", principal: "Rachel Friedmann（概覽所列全校校長）", establishedYear: "1991", gradeSpan: "低齡及PN、Nursery（3至4歲）與Pre-K（4至5歲）；不把英文Nursery當PN",
    language: "Nursery以英語主教，普通話每週3課，另學希伯來語；PN及其他年齡課程另列",
    ratio: "上午1:5.4；下午1:1.1", ratioIncludesPn: true, teacherCount: 13, classroomCount: 4,
    spaces: "概覽有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；官網日程有戶外活動，活動地點與登記可用範圍須確認，不搬入其他學部設備。",
    pn: "2025年9月提供2至3歲服務，收錄31人，半日全年84,500元，全日為「-」；有2歲以下服務，無幼兒中心資助、暫託或延長服務。校方課後EDP另報，不等於概覽延長照顧服務。",
    feeSummary: "K1／K2半日全年119,700元／10期；K3及全日未列，課後項目另計",
    fees: "2026/27 K1、K2上午下午列全年119,700元、10期，K3及全日為「-」。本校沒有教育計劃資助；PN、膳食及課後EDP另核對，不借用波老道小學或筲箕灣中學費表。",
    sourceNote: "校號216186／0002、羅便臣道70號及22497600與Holly Rofé Early Learning Centre官方聯絡吻合，不是波老道或筲箕灣學部。登記包含地下兒童遊戲場及3至4樓，概覽簡寫3至4樓，保留完整登記地址；戶外日程不據此改寫概覽場地分類。官方Nursery為3至4歲，PN為2至3歲，EDP為選報課後活動。",
    sources: [{ label: "Carmel：各學部聯絡", scope: "Holly Rofé羅便臣道70號22497600，與另兩個學部區分。", url: "https://www.carmel.edu.hk/about-us/contact-us" }, { label: "Carmel：Nursery及Pre-K", scope: "英語主教、每週3次普通話、猶太文化、探究與3至5歲分齡，不與PN混用。", url: carmelCourse }, { label: "Carmel：早期學習FAQ", scope: "EDP選報、如廁準備、語言和識字安排；課後項目不等於政府統計延長服務。", url: carmelFaq }],
    features: { title: "課程特色｜英語探究與猶太文化", featured: true, details: [
      { label: "英語主教，普通話是語言課", value: "Nursery（3至4歲）以英語主教，普通話每週三課並接觸希伯來語；Pre-K延伸探究，拼音由Pre-K開始，兩級普通話尚不教認中文字。家庭若重本地小學中文讀寫，應先了解銜接支援；不能把有普通話課當作中文主教或識字訓練。", sourceUrl: carmelFaq },
      { label: "宗教文化是日常的一部分", value: "Nursery及小學的國際／猶太路線共用課程，包括希伯來語、猶太節慶、故事與祈禱，並以遊戲和IB探究活動培養合作。家長要將文化生活納入適配判斷，另核對如廁要求、年齡截止及課後EDP；學校一條龍方向不等於無條件保證學額。", sourceUrl: carmelFaq },
    ] },
  }),
  feeCertificateProfile(profile({
    schoolNumber: "215740", locationId: "0001", website: "https://www.stanna.edu.hk", telephone: "25699269", principal: "蕭翠儀", establishedYear: "1986", gradeSpan: grades,
    language: "官網設英語班與雙語班、外籍教師英語活動；兩文三語主次及各班粵普時數另確認",
    ratio: "上午1:9.6；下午1:8.1", ratioIncludesPn: true, teacherCount: 18, classroomCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；官網另列大肌肉活動室。",
    pn: "2025年9月提供2至3歲服務，收錄61人，半日全年32,600元，全日為「-」；有暫託，沒有2歲以下、幼兒中心資助及延長服務。暫託資格、時段及當屆PN費率另確認。",
    feeSummary: "9月生效證書：本地半日資助後免費，全日學費12,000元＋膳食5,050元；國際半日36,430元，均10期",
    fees: "2026-09-01生效EDB證書：本地K1至K3半日扣減資助後免費，全日純學費全年12,000元、10期，膳食另5,050元、10期；非本地國際班半日全年36,430元、10期。概覽原列半日33,190至36,430、全日55,150，未按不同課程與資助清楚區分，本頁以最新證書明列項目為準。PN及用品另計。",
    sourceNote: "校號215740、太古城東海閣與南海閣25699269吻合。概覽收費與2026-09-01生效EDB證書不一致，已讀完整三頁並按本地／非本地及膳食分開修正，來源直接連證書；官網招生確認本地合資格生可獲資助。中文2027/28招生頁與英文頁標題年級不一致，未移入未核實日期。",
    sources: [{ label: "EDB：2026-09-01生效收費證書", scope: "三頁分列國際半日36430、本地半日免費、本地全日學費12000及膳食5050；優先於概覽混列數字。", url: annaFee }, { label: "聖安娜：學校簡介", scope: "1986、9課室、英語班及雙語班、校舍聯絡與教育計劃。", url: annaIntro }, { label: "聖安娜：中文當屆招生", scope: "本地合資格生資助及非華語面試安排；不把可用面試語言當主教語言。", url: "https://www.stanna.edu.hk/%E6%94%B6%E7%94%9F%E7%B0%A1%E4%BB%8B/" }],
    features: { title: "課程特色｜按班型看語言與資助", featured: true, details: [
      { label: "英語班與雙語班先分清", value: "本校設英語及雙語班，外籍教師帶英語活動，藉生活經驗、互動和探索培養主動學習。兩類班的費用與教育計劃資格不同，家庭應先確定所選本地或非本地課程，再問每天的粵語、普通話及英語安排。", sourceUrl: annaIntro },
      { label: "家校觀察與適應支援", value: "概覽以主題、遊戲及方案活動循序發展，用持續單元觀察加家庭回饋了解孩子，另列適應週、幼小銜接與非華語中文支援。家長可看回饋樣本及確認暫託條件；面試可用粵普英，並不證明課堂三語時數相同。", sourceUrl: kgp("215740") },
    ] },
  })),
  { ...profile({
    schoolNumber: "157678", locationId: "0001", website: "https://www.salvationarmy.org.hk/esd/fkkg/", telephone: "26144481", principal: "麥妙玲", establishedYear: "1984", gradeSpan: grades,
    language: "本校概覽列中文及非華語中文支援，未明列主教粵普、英普教師及語言時數",
    ratio: "上午1:8.7；下午1:5.3", ratioIncludesPn: true, teacherCount: 11, classroomCount: 5,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另有體能室。",
    pn: "2025年9月提供2至3歲服務，收錄15人，半日全年36,640元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費表另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年12,620元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年12,620元、10期。PN、膳食用品另核對，PN未列全日費率，不能借K班全日安排替代。",
    sourceNote: "校號157678為大窩口邨富強樓121至140室26144481。舊fkkg網址在Exa及瀏覽器實際均顯示荔枝角幼兒學校、荔枝角道168號及27875788；未使用其理念、設施或聯絡，停用誤導的官網按鈕。現有課程及年度資料均取富強本校概覽及登記。",
    sources: [{ label: "富強舊網址：內容錯置，勿作本校資料", scope: "本次實際顯示荔枝角幼兒學校，不能據此辨認富強或使用其電話、課程。", url: "https://www.salvationarmy.org.hk/esd/fkkg/" }],
    features: { title: "課程特色｜感知、自由遊戲與品格", featured: true, details: [
      { label: "感官經驗走到日常應用", value: "富強本校概覽將感知活動融入課程，以自由遊戲、親身體驗及蒙特梭利教具進行感官與數理學習，K1不要求執筆或機械抄算。家庭可看教師如何從孩子操作記錄下一步協助；使用蒙氏教具不等於全日採完整蒙氏制度。", sourceUrl: kgp("157678") },
      { label: "BRAVO正向品格與支援", value: "校方以基督的愛帶入勇敢、尊重、欣賞、珍惜及樂觀五項品格，設學生支援教師和駐校社工，配觀察評量、親子工作坊及家長觀課。家長可問清宗教生活、語言日程及服務資格，不由舊錯置網站補寫課程。", sourceUrl: kgp("157678") },
    ] },
  }), website: "" },
  profile({
    schoolNumber: "231185", locationId: "0001", website: "http://www.melody-pvg.edu.hk", telephone: "24574433", principal: "鄧美玉", establishedYear: "1986", gradeSpan: grades,
    language: "本校官網列中英文並重、外籍英語及專業普通話教師；主課粵普與各語言時數另確認",
    ratio: "上午1:6.7；下午1:7.0", ratioIncludesPn: true, teacherCount: 8, classroomCount: 5,
    spaces: "有室內、戶外遊戲場地及音樂室，另有遊戲室及圖書室；官網另述午睡室、閱讀及玩具區。",
    pn: "2025年9月提供2至3歲服務，收錄7人，半日全年43,945元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年14,113元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年14,113元、11期；2025下午在讀0人，當屆班別與學位另確認。PN及膳食用品分開核對。",
    sourceNote: "校號231185為屯門景峰花園第一、二座地下24574433，官網本分校課程及聯絡吻合；不用美樂其他園所資料。概覽『三文兩語』與官方兩文三語表述不同，頁面按可明確辨認的中英、英語及普通話教師安排寫，不自行修成語言課時。",
    sources: [{ label: "美樂景峰：課程", scope: "中英文、外籍英語及專業普通話教師、遊戲閱讀與非華語支援。", url: "http://www.melody-pvg.edu.hk/?page_id=28" }, { label: "美樂景峰：聯絡", scope: "景峰花園第一、二座地下24574433。", url: "http://www.melody-pvg.edu.hk/?page_id=53" }],
    features: { title: "課程特色｜全語文與故事探索", featured: true, details: [
      { label: "主題與語言活動互相配合", value: "本校官網以主題和全語文學習，列外籍教師教授英語、專業教師帶普通話；概覽再列故事、繪本、STEM和小組探索。家長可看一個故事如何延伸到操作、提問和表達，再確認中文主課粵普分工。", sourceUrl: "http://www.melody-pvg.edu.hk/?page_id=28" },
      { label: "小一體驗與家庭觀察", value: "校方列高班參觀小學、小學生活體驗、親子閱讀及駐校社工，以六大範疇持續觀察記錄發展。家庭可了解回饋頻率與非華語中文支援；小學參觀和文化活動是學習經驗，並非特定小學的錄取保障。", sourceUrl: kgp("231185") },
    ] },
  }),
];

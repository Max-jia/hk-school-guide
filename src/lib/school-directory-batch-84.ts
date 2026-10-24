import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile, reviewedKindergartenWithoutOverview as exceptionalProfile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const lhFees = "https://www.learninghabitat.org/en/admission/fees";
const lhProgram = "https://www.learninghabitat.org/en/admission/programmes";
const mayMainForm = "https://www.maynga.edu.hk/download/pdf/2026-2027/2026-27%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8(%E6%AD%A3).pdf";
const mayOverview = "https://www.maynga.edu.hk/overview";
const mayFee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/325040.pdf";
const jamesFee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/517712.pdf";

export const KINDERGARTEN_BATCH_84: PilotSchool[] = [
  profile({
    schoolNumber: "561207", locationId: "0001", website: "https://www.learninghabitat.org/en/campus/tai-kok-tsui/hampton-loft-campus", telephone: "25015105", schoolType: "私立獨立幼稚園", principal: "韓燕", establishedYear: "2005", gradeSpan: grades,
    language: "凱帆校K設粵英／普英班；PN粵英，雙教師共教；各班當屆日程另確認",
    ratio: "上午1:8.0；下午1:8.0", ratioIncludesPn: true, teacherCount: 28, classroomCount: 8,
    spaces: "有室內及戶外遊戲場地，沒有獨立音樂室；其他特別室未列資料。",
    pn: "2025年9月提供2至3歲服務，收錄112人，半日全年90,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27凱帆PN每月7,800元、12期（按此計算全年93,600元），見上方班型費表。",
    feeSummary: "K半日全年90,000至93,600元，核准全日107,100至109,500元，均12期；全日開班另確認",
    fees: "2026/27 K1至K3上午下午全年90,000至93,600元、12期，全日列107,100至109,500元、12期。官網當屆只列半日班型及費率，實際全日是否招收及所含項目另確認；PN、教材用品及交通另計。",
    sourceNote: "校號561207是凱帆薈5樓2號25015105，不是同大廈1A號奧運校25015560。官網凱帆半日粵英7500、普英7800與概覽半日區間吻合；全日有概覽費率不作已開班證據。原lh報告關聯保留。",
    sources: [{ label: "學之園：2026/27班型費表", scope: "Hampton Loft PN7800、K粵英7500／普英7800每月，12期；不借其他分校。", url: lhFees }, { label: "學之園：教學班型", scope: "粵英、普英雙教師及半日日程；Full-Time immersion不是全日班。", url: lhProgram }],
    features: { title: "課程特色｜粵英／普英與家庭選班", featured: true, details: [
      { label: "先按中文語音選班", value: "官方列PN至K3粵英班，一位英語及一位粵語教師共教，另有普通話補充課；K1至K3可選普英，配普通話拼音。家庭可先按日常用語和目標小學選班，再核對本校實際日程，不能把『全程沉浸』看成全日制照顧。", sourceUrl: lhProgram },
      { label: "凱帆當屆半日費用", value: "官網2026/27凱帆PN每月7,800元、K粵英7,500元、K普英7,800元，全年12期，對應按月費計算93,600／90,000／93,600元。教材、校服及交通另計；概覽PN舊90,000元不作當屆報價，全日班須另索取確認。", period: "2026/27", sourceUrl: lhFees },
      { label: "主題探索與持續回饋", value: "本校概覽以主題、設計活動及戶外參觀引導探究，主題結束及期終派評估報告，另列新生適應和升小體驗。家長可看具體作品及教師回饋，再衡量家中閱讀投入；升小活動不等於特定小學保留學額。", sourceUrl: kgp("561207") },
    ] },
  }),
  profile({
    schoolNumber: "533858", locationId: "0001", website: "http://www.dominicsaviokg.org", telephone: "26269323", principal: "黃安媚", establishedYear: "2000", gradeSpan: grades,
    language: "本校概覽未明列主教粵普及英語普通話課時；非華語中文支援不等於全英主教",
    ratio: "上午1:9.1；下午1:4.9", ratioIncludesPn: true, teacherCount: 21, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另列圖書及扮演角。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日全年46,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日資助後免費；全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日為「-」。PN及用品等另計，舊品牌申請表列全日選項不證明本奧運校當屆有全日班。",
    sourceNote: "校號533858是海富苑海韻閣地下01至09室26269323，與港島校分開。官網主頁本次未能讀取，搜尋取得2014/15舊表僅能核對歷史校址聯絡，沒有搬用其招生或班制；課程取本校當屆概覽。",
    sources: [],
    features: { title: "課程特色｜預防教育與生活主題", featured: true, details: [
      { label: "鮑思高方向落在日常活動", value: "奧運校概覽依鮑思高預防教育法，以七育全人發展為方向，採生活主題、遊戲、設計與情境創作，另有新聞分享和參觀。家庭可問清宗教生活如何安排，以及教師如何幫助孩子建立規則、信任和表達。", sourceUrl: kgp("533858") },
      { label: "評估節奏與入學適應", value: "校方列每週德育評估、約每六週整體發展評估及成長檔案，開課前可由家長陪同適應，另有小一體驗。家長可看評估如何轉成具體支援，並確認教學語言日程；評估頻率不等於操練量或孩子承受的壓力。", sourceUrl: kgp("533858") },
    ] },
  }),
  profile({
    schoolNumber: "542504", locationId: "0001", website: "https://www.tutortime.com.hk/locations/dorset-crescent/", telephone: "23370822", schoolType: "私立獨立幼稚園", principal: "吳灼敏", establishedYear: "2001", gradeSpan: "PN／2至3歲及K1至K3；低齡親子Playgroup另屬課程，不等於幼兒照顧服務",
    language: "集團明列英語與普通話母語教師沉浸教學，各50%為校方自述；本校班表另確認",
    ratio: "上午1:5.6；下午1:1.4", ratioIncludesPn: true, teacherCount: 7, classroomCount: 4,
    spaces: "本註冊單位概覽未列室內、戶外遊戲場地及音樂室；官網多實街整體校舍述室內外遊戲和感官花園，未將全部範圍當1樓註冊單位配置。",
    pn: "2025年9月提供2至3歲服務，收錄10人，半日全年158,640元，全日為「-」；沒有2歲以下幼兒服務、幼兒中心資助、暫託或延長服務。官網6個月起親子Playgroup不等同概覽2歲以下照顧服務。",
    feeSummary: "K1至K3上午全年166,080元、下午161,760元，均12期；全日未列",
    fees: "2026/27 K1至K3上午全年166,080元、12期，下午161,760元、12期，全日為「-」。PN、親子活動、課後及用品另計；沒有將其他多多分校費用套用九龍塘。",
    sourceNote: "校號542504為多實街1號1樓，官網整體校舍同門牌但電話25739188，概覽23370822，保留差異以概覽為主。官網全校舍設施、6個月起親子活動與本註冊幼稚園資料分開；50/50明確標校方自述，不由網站宣傳推定實測課時。",
    sources: [{ label: "多多：集團課程與語言", scope: "校方自述英普各50%、分齡課程；Playgroup與正式幼兒服務有別。", url: "https://www.tutortime.com.hk/en/home" }],
    features: { title: "課程特色｜英普沉浸與分齡活動", featured: true, details: [
      { label: "英普不是兩節獨立語言課", value: "集團官網自述由母語教師在不同活動中以英語和普通話沉浸式帶領，各佔50%，涵蓋語言、社交和解難。家長可向九龍塘索取所選班日程，確認孩子主要用粵語時如何適應；比例是校方公布的安排，並非我們實測結果。", sourceUrl: "https://www.tutortime.com.hk/en/home" },
      { label: "分清親子活動、PN和K班", value: "多實街校舍列6個月至2歲親子Playgroup、2至3歲Nursery及3至6歲Kindergarten，另有課後活動及課堂直播功能。家庭應按年齡與陪同要求核對所報項目，了解直播權限和日常家校溝通；集團一條龍指校內年齡銜接，並非保證小學錄取。", sourceUrl: "https://www.tutortime.com.hk/locations/dorset-crescent/" },
    ] },
  }),
  exceptionalProfile("517712", {
    website: "https://www.jameskg.edu.hk", telephone: "23868877", schoolType: "幼稚園（當屆辦學及招生狀態待核實）", gradeSpan: "未取得當屆招生及班制文件；先向教育局或校方核實",
    registrationStatus: "2026-10-23登記快照仍有記錄；不代表已確認現行收生",
    tuition: "不列當屆報價；可取得證書部分項目生效於2020／2023年", language: "當屆主教語言、教師及課時未核實，不沿用舊標籤",
    dataYear: "登記快照2026-09-30／2026-10-23；歷史費證2020／2023生效；2026-10-24複核",
    sourceNote: "校號517712、順寧道16號樂年花園地下。2026/27概覽個校頁返回目錄，官網本次未能讀取；第三方有2025停辦線索，但未取得校方或教育局原始公告，沒有據此改寫成已停辦。EDB費證仍可讀，不能由舊證書仍在線判定仍招生；撤下舊PN、師生比及費用作現況比較。",
    sources: [{ label: "EDB：雅各深水埗歷史收費證書", scope: "配對校名及樂年花園地址；部分項目生效2020／2023，不是當屆仍招生證明。", url: jamesFee }, { label: "雅各：官方網站入口", scope: "本次未能讀取當屆資料，聯絡前先向教育局確認現況。", url: "https://www.jameskg.edu.hk" }],
    detailSections: [{ title: "資料狀態｜先確認當屆辦學", featured: true, details: [
      { label: "登記記錄與現行招生分開", value: "教育局快照保留校號517712及樂年花園地址，現行概覽頁及招生文件未取得。家長應先向教育局或校方確認是否仍收生及可用班別，再安排申請和到訪；不能由舊網頁、舊電話或缺頁直接判定在辦或停辦。", period: "2026-10-24複核", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
      { label: "歷史費證只供辨認", value: "可取得EDB證書載部分半日項目2020年、全日項目2023年生效，配對順寧道16號樂年花園地下。這些數字不作2026/27預算；本頁沒有用未註年份的舊PN、師資或課程填補當屆空缺。", period: "2020／2023生效文件", sourceUrl: jamesFee },
    ] }],
  }),
  profile({
    schoolNumber: "523933", locationId: "0001", website: "https://www.sharonlutheran.edu.hk/kindness/zh/", telephone: "23260280", principal: "李麗萍", establishedYear: "1997", gradeSpan: grades,
    language: "本校列非華語中文支援；主要中文粵普及英語普通話教師時數未列",
    ratio: "上午1:9.3；下午1:7.8", ratioIncludesPn: true, teacherCount: 12, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有社工辦公室及輔導室。",
    pn: "2025年9月提供2至3歲服務，收錄26人，半日全年33,198元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年8,300元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年8,300元、10期。舊2025/26全日6,800元不作當屆報價，PN、膳食用品另計。",
    sourceNote: "校號523933、慈愛苑停車場頂層23260280與登記／當屆概覽配對；官網慈愛專頁本次405，不借正校資料。第三方有戶外場地的表述，未覆蓋本校原表『沒有』。",
    sources: [],
    features: { title: "課程特色｜自由建構與基督品格", featured: true, details: [
      { label: "孩子自己選物料和玩法", value: "慈愛分校概覽以生活、多感官活動編課，體能與自選時段提供多種物料，讓孩子按興趣、能力和經驗設計玩法、建構和表達。家長可了解教師如何處理爭執、引導合作及觀察不同進度，而不把自由遊戲看成放任。", sourceUrl: kgp("523933") },
      { label: "宗教生活與家庭支援", value: "校方以基督大愛、早會及宗教活動培養品格，用持續評估建立檔案，列社工輔導、成長課、新生適應及小一生活週。家庭可確認宗教參與、實際語言日程與支援資格；提供支援並非保證所有孩子得到相同時數服務。", sourceUrl: kgp("523933") },
    ] },
  }),
  profile({
    schoolNumber: "325570", locationId: "0001", website: "http://www.yanoikin.edu.hk", telephone: "25547808", principal: "白艷麗", establishedYear: "1988", gradeSpan: grades,
    language: "本校列普通話及英語課程；中文主課粵普與各語言時數未列",
    ratio: "上午1:7.0；下午1:3.4", ratioIncludesPn: true, teacherCount: 9, classroomCount: 5,
    spaces: "有室內、戶外遊戲場地及音樂室；另有電腦圖書室及戶外有機耕種園地『仁愛田園』。",
    pn: "2025年9月提供2至3歲服務，收錄14人，半日全年44,616元、全日50,974元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費表另確認。",
    feeSummary: "K1至K3上午資助後免費；全日全年20,823元／11期；下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」，全日全年20,823元、11期。PN、膳食用品另計；不因親子活動涵蓋全校就推定每年級同一班制。",
    sourceNote: "校號325570為鴨脷洲新市街38號地下25547808，與登記及本校概覽配對；官網仍有2026活動但活動頁不取代當屆費表。沒有把校外親子活動地點當學校地址。",
    sources: [],
    features: { title: "課程特色｜生命教育、音藝與田園", featured: true, details: [
      { label: "宗教與生命教育連到體驗", value: "本校概覽以基督教及生命教育培養感恩和關愛，配奧福音樂融合音樂、舞蹈、戲劇及美術，K1至K3結合主題與方案活動。家長可了解田園觀察及音藝如何連到孩子的提問和作品，而不只看活動相片。", sourceUrl: kgp("325570") },
      { label: "語言、適應與具體回饋", value: "校方列普通話及英語課程、漸進式上課、各主題觀察和半年總結，另有開心升小一、小學體驗及按需轉介。家庭可看一份評估如何提出下一步協助，再確認語言日程與全日作息；宗教親子活動是否參與也宜事前了解。", sourceUrl: kgp("325570") },
    ] },
  }),
  profile({
    schoolNumber: "156949", locationId: "0001", website: "https://www.cmafvpkg.info/", telephone: "24716461", principal: "林琼美", establishedYear: "1981", gradeSpan: grades,
    language: "現官網列外籍英語及普通話教師；主要中文粵普分工和每級時數另確認",
    ratio: "上午1:11.7；下午1:8.6", ratioIncludesPn: true, teacherCount: 25, classroomCount: 11,
    spaces: "有室內、戶外遊戲場地及音樂室，另有幼兒小廚房、美藝室與家長資源室。",
    pn: "2025年9月提供2至3歲服務，收錄67人，半日全年35,255元、全日53,559元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費表另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年7,980元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年7,980元、10期。舊edu.hk網站留2023/24申請及每月1,980元舊費，不覆蓋本屆概覽；PN、膳食用品另計。",
    sourceNote: "現概覽官網改為cmafvpkg.info，校址錦繡花園市中心D及E座1樓、電話24716461及林琼美校長吻合。舊edu.hk多為2021至2023內容，不當當屆招生及收費；新官網教師職銜可能重疊，沒有自行加總代替概覽人數。",
    sources: [],
    features: { title: "課程特色｜基督生命教育與遊戲探索", featured: true, details: [
      { label: "以生命影響生命", value: "現官網以基督的愛、孝親與關懷培養價值觀，透過創意螺旋課程及遊戲發展潛能；概覽配繪本、小組、參觀和創作。家庭可先了解宗教活動如何融入一天，再看是否符合家中價值觀及孩子學習方式。", sourceUrl: "https://www.cmafvpkg.info/" },
      { label: "英普教師與學習支援", value: "現官網列英語及普通話教師，本校概覽用日常及持續觀察回饋，另有新生適應、小一工作坊及到校學前康復。家長可索取年級語言班表、觀察記錄和支援資格；教師人數或外籍背景不直接等於英語課時比例。", sourceUrl: kgp("156949") },
    ] },
  }),
  exceptionalProfile("325040", {
    website: "https://www.maynga.edu.hk", telephone: "27112631", schoolType: "非牟利幼稚園；正校與分校資料分開", establishedYear: "1983（機構所列正校創校）",
    gradeSpan: "正校2026/27申請表列K1至K3；低齡服務屬另註冊單位，須另核對",
    language: "機構介紹列中文教學，未分正校粵普主課或英語普通話時數",
    tuition: "未取得正校2026/27完整費表；可取得EDB證書為2025-09-01生效，分校費率不適用",
    dataYear: "登記快照2026-09-30／2026-10-23；正校申請表2026/27；費證2025-09-01生效；2026-10-24複核",
    sourceNote: "校號325040是炮仗街148及148A地下、146至150號1樓。正校2026/27表格配對炮仗街地址，未因2026/27概覽個校缺頁推定停辦。官網overview年度數字明寫分校325775、下鄉道，不能移入正校；0至6歲是機構跨幼稚園、幼兒園及嬰幼中心服務，不等於325040有0歲班。",
    sources: [{ label: "美雅正校：2026/27入學申請表", scope: "正校炮仗街地址、K1至K3申請身份；表格選項不保證當屆均開班。", url: mayMainForm }, { label: "美雅：機構與分校年度資料", scope: "正校1983、共同中文方向；年度收生及費率明屬325775分校，未套正校。", url: mayOverview }, { label: "美雅正校：歷史收費證書", scope: "2025-09-01生效、本地及資助前後、膳食另列；不作2026/27新報價。", url: mayFee }],
    detailSections: [{ title: "辦學方向｜分清正校與機構", featured: true, details: [
      { label: "共同理念有來源，班表須按正校", value: "機構以有教無類、全人發展及良好品格為方向，列中文教學、家庭溝通和社區合作；正校於1983創辦。家長可向炮仗街正校看一個單元及語言班表，不把機構所有0至6歲服務、分校活動或教師配置視為本註冊幼稚園。", sourceUrl: mayOverview },
      { label: "當屆正校身份可配對", value: "2026/27正校申請表列炮仗街148號地下及146至150號1樓，與教育局登記範圍相符；完整登記另包括148A。申請前可用正校27112631確認班別、報名年度與實際上課範圍，不誤致電下鄉道分校27647319。", period: "2026/27正校表格", sourceUrl: mayMainForm },
    ] }, { title: "正校年度資料｜保留文件年份", details: [
      { label: "舊費證與當屆報價分開", value: "2025-09-01證書列合資格本地K1至K3半日資助後免費、K2／K3全日純學費全年8,239元及膳食4,378元，均11期；另列不獲資助者費率。這是2025文件，不直接當2026/27報價，亦不補出證書未列的K1全日費。", period: "2025-09-01生效", sourceUrl: mayFee },
      { label: "仍需向正校確認的資料", value: "未取得本校2026/27完整概覽及新費表，師資、分時段比例、PN年齡與照顧服務不沿用無年份舊數。官網年度費表標分校325775，其名額、全日連午膳16,357元及收生預計都不適用本校。", period: "2026-10-24複核", sourceUrl: mayOverview },
    ] }],
  }),
  profile({
    schoolNumber: "231363", locationId: "0001", website: "https://www.beverly.edu.hk", telephone: "27027728", principal: "沈妍", establishedYear: "1989", gradeSpan: "2歲以下、PN／2至3歲及K1至K3；低齡資格與班別另確認",
    language: "本校列中英並重雙語及兩文三語；中文主課粵普分工、英普教師與時數未列",
    ratio: "上午1:8.2；下午1:7.5", ratioIncludesPn: true, teacherCount: 13, classroomCount: 12,
    spaces: "有室內、戶外遊戲場地及音樂室，另有圖書角。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日全年66,960元、全日85,428元；有2歲以下服務，沒有幼兒中心資助、暫託或延長服務。當屆年齡資格與費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年15,600元／12期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年15,600元、12期。PN及低齡班、膳食用品另計，不能因K班免費推定同品牌所有年齡班免費。",
    sourceNote: "校號231363為將軍澳康盛花園第5座27027728；當屆概覽官方入口為beverly.edu.hk，本次405，未以德寶集團日本語或國際班宣傳替代本校。保留教育局登記完整範圍，不擅自整理概覽地址重複文字。",
    sources: [{ label: "德寶教育機構：品牌入口", scope: "列Beverly為所屬校；集團多種語言課程未直接當本校開設。", url: "https://www.deborah.edu.hk" }],
    features: { title: "課程特色｜中英雙語與主題探究", featured: true, details: [
      { label: "中英文並重，但主次須問清", value: "本校概覽以中英並重雙語鞏固兩文三語，按孩子發展設主題、專題、小組與參觀。家庭可索取所選年級語言班表，了解中文是粵語或普通話主教，以及英語教師參與方式，不借用集團其他國際或日語班安排。", sourceUrl: kgp("231363") },
      { label: "從觀察記錄看成長與適應", value: "校方用持續觀察、多角度進展評估追蹤孩子，列新生適應、閱讀、小一模擬及社區工作坊。家長可看一份具體記錄和教師回饋，再核對低齡照顧、全日作息及支援條件；在讀人數少不等於已知空缺多。", sourceUrl: kgp("231363") },
    ] },
  }),
  profile({
    schoolNumber: "582417", locationId: "0001", website: "https://www.anchors.edu.hk", telephone: "26762199", schoolType: "私立獨立幼稚園", principal: "吳貝詩", establishedYear: "2010", gradeSpan: grades,
    language: "粉嶺本校概覽未列主教粵普及英語普通話安排；不借大埔校語言標籤",
    ratio: "上午1:11.1；下午1:5.0", ratioIncludesPn: true, teacherCount: 20, classroomCount: 16,
    spaces: "有室內、戶外遊戲場地及音樂室，另有圖書及電腦區。",
    pn: "2025年9月提供2至3歲服務，收錄71人，半日全年78,000元、全日118,440元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "粉嶺K1至K3半日全年73,700元、全日106,700元，均11期",
    fees: "2026/27 K1至K3上午下午全年73,700元、11期，全日106,700元、11期。PN、膳食用品另計；大埔校全日105,600元不適用粉嶺。",
    sourceNote: "校號582417為粉嶺聯捷街2至10號榮輝中心1樓AB及2樓26762199，與大埔565199分開。官網本次只讀到集團入口，具體課程據粉嶺本校概覽；沒有搬入滌濤山每週STEAM Day、機械人或實驗室。",
    sources: [],
    features: { title: "課程特色｜啟發潛能與主題設計", featured: true, details: [
      { label: "相信孩子有能力，也能承擔", value: "粉嶺概覽以基督精神及啟發潛能教育看待幼兒，重自重、自愛和責任，運用主題及設計活動，師生一起規劃並走出課室體驗。家長可看孩子如何提出想法和參與決定，不直接套用大埔校的科技設備或固定STEAM日。", sourceUrl: kgp("582417") },
      { label: "新生與升小過渡", value: "校方列新生適應、升小家長講座、參觀及模擬小一，用個人成長檔案與家長交流。家庭可核對本校語言日程、全日照顧和支援資格，了解檔案如何提出下一步協助；集團校內活動不等於小學保留學額。", sourceUrl: kgp("582417") },
    ] },
  }),
];

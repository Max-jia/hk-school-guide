import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile, reviewedKindergartenWithoutOverview as exceptionalProfile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const kwokNotice = "https://kmvn.edu.hk/zh/%e9%87%8d%e8%a6%81%e9%80%9a%e5%91%8a%e3%80%90%e9%97%9c%e6%96%bc%e6%a0%a1%e8%88%8d%e5%81%9c%e6%ad%a2%e7%87%9f%e8%be%a6%e4%b9%8b%e4%ba%8b%e5%ae%9c%e3%80%91-2526-107/";

export const KINDERGARTEN_BATCH_72: PilotSchool[] = [
  exceptionalProfile("231398", {
    website: "https://mos.tkyw.com", telephone: "26417212", schoolType: "幼稚園（有停辦公告）",
    registrationStatus: "登記檔仍有記錄；另有2025年停辦公告，勿據此視為仍招生",
    gradeSpan: "歷史幼稚園資料；不列作當屆招生選項",
    tuition: "不沿用停辦前學費；未取得當屆招生及收費文件",
    language: "歷史中英文幼稚園；不把舊語言標籤視為現行課程",
    dataYear: "2024年停辦報道；登記快照2026-09-30；2026-10-24複核",
    sourceNote: "校號231398、耀安邨耀榮樓。經濟通2024-05-03報道引述校方家長信，宣布2025-08-01停辦及即時停收K1。2026/27概覽個校連結未返回校頁，官網本次未能讀取；登記檔保留記錄不等於仍辦學。尚未取得教育局撤銷註冊文件，不把媒體所述停辦日期當作撤銷註冊日期。",
    sources: [{ label: "經濟通：耀榮停辦公告報道", scope: "2024-05-03引述校方家長信，2025-08-01停辦及停止K1收生；非教育局撤銷註冊證明。", url: "https://news.cnyes.com/news/id/5545399" }],
    detailSections: [{ title: "辦學狀態｜先排除過期招生資訊", featured: true, details: [
      { label: "校方停辦安排的媒體記錄", value: "經濟通引述家長信：停止招收K1，並安排當時K2學生完成K3；宣布停辦日期為2025年8月1日。這是特定屆別的善後安排，不能當作今天仍接受K1或插班。", period: "2024-05-03報道", sourceUrl: "https://news.cnyes.com/news/id/5545399" },
      { label: "登記身份與實際招生分開看", value: "教育局位置快照仍列耀安邨耀榮樓地下、校號231398。地址與電話僅作辨認歷史學校，沒有據此補寫現行PN、師生比、學位或收費；家長應先選有當屆招生文件的在辦園所。", period: "位置快照2026-09-30；複核2026-10-24", sourceUrl: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
    ] }],
  }),
  exceptionalProfile("322300", {
    website: "https://www.kentville.edu.hk/", telephone: "23386422", schoolType: "私立幼稚園（已停辦）", establishedYear: "1966（Now新聞所述六十年歷史）",
    registrationStatus: "校方已宣布停辦；登記檔記錄與實際辦學狀態分開",
    gradeSpan: "已停辦；2023/24為最後一屆K1", tuition: "已停辦，不列當屆學費", language: "歷史課程資料不作現行教學安排",
    dataYear: "校方逐年停辦公告；2026-06-30停辦報道；2026-10-24複核",
    sourceNote: "校號322300、多實街5至7號。官網保留『逐年停辦新聞稿』入口，Now新聞2026-06-30報道正式停辦，最後一屆學生已完成三年課程。保留既有深度報告連結作歷史參考，不能將其中舊學費、競爭或申請時間當作現行招生資訊。",
    sources: [
      { label: "根德園：官方首頁", scope: "保留逐年停辦新聞稿入口；屬歷史資料，不代表仍招生。", url: "https://www.kentville.edu.hk/" },
      { label: "根德園：逐年停辦新聞稿入口", scope: "校方保留三年逐步停辦公告；本頁沒有將其舊招生安排寫成當屆安排。", url: "https://www.kentville.edu.hk/system/tool/webpage/index.php?charset=big5&netroom_id=1785&tool_id=17717" },
      { label: "Now新聞：2026-06-30正式停辦", scope: "最後一屆畢業、2023/24最後招收K1及完成三年停辦計劃。", url: "https://news.now.com/home/local/player?newsId=652820" },
    ],
    detailSections: [{ title: "辦學狀態｜已完成逐年停辦", featured: true, details: [
      { label: "最後一屆已畢業", value: "Now新聞2026年6月30日報道根德園即日起停辦；2023/24最後招收K1，之後不再收新生，最後一屆已完成三年課程。現時擇校不應把它列入可申請名單。", period: "2026-06-30", sourceUrl: "https://news.now.com/home/local/player?newsId=652820" },
      { label: "官網與歷史報告如何使用", value: "官網仍保留三年逐步停辦新聞稿。登記校址及舊報告有歷史查閱價值，卻不代表仍有學位；本頁撤下舊學費與師生比，避免與現在仍辦學的幼稚園直接比較。", period: "2026-10-24複核", sourceUrl: "https://www.kentville.edu.hk/" },
    ] }],
  }),
  exceptionalProfile("324159", {
    website: "http://www.guideposts.edu.hk/", telephone: "27432800", schoolType: "非牟利幼稚園（正校已遷址）", establishedYear: "1976（原美孚概覽）",
    address: "原登記校址：九龍美孚新邨萬事達廣場5號B平台；校方公告正校已遷東涌，現行到訪地址須另確認",
    gradeSpan: "正校官網公告招收幼兒班及插班；年級與新校舍班制另確認",
    tuition: "原美孚概覽費率不直接套用遷校後；索取東涌校舍核准收費表",
    language: "正校辦學宗旨列兩文三語；新校舍主課語音與各語言時數另確認",
    dataYear: "原美孚概覽2026/27與官網遷校公告分開；2026-10-24複核",
    sourceNote: "本頁是校號324159的正校，並非建生、南昌或其他分校。官方首頁已寫『美孚正校已於8月尾遷往東涌』，舊概覽仍列美孚地址。未取得能對應新校舍的完整登記及年度表，不把原校舍設施、師生比、PN及費用搬到東涌名下；原地區分類暫按登記快照保留，不能作現行通勤依據。",
    sources: [
      { label: "佳寶官網：正校遷東涌公告", scope: "首頁公告已於8月尾遷校；新校舍地址、班別與收費須另核對。", url: "http://www.guideposts.edu.hk/" },
      { label: "正校辦學宗旨", scope: "正校基督教六育、兩文三語、蒙氏操作元素與探索學習；未證明遷校後逐項日程。", url: "http://www.guideposts.edu.hk/teaching_objectives/meifoo.pdf" },
      { label: "2026/27南昌招生文件：正校遷址附註", scope: "列正校暫定遷往東涌雋東邨雋華樓地下及27432800；不能以南昌班別和收費替代正校。", url: "http://www.guideposts.edu.hk/application2026-2027/Guideosts_NamCheong_Admisson_cht.pdf" },
    ],
    detailSections: [{ title: "正校遷址｜先確認實際上課地點", featured: true, details: [
      { label: "美孚舊址與東涌新址須分開", value: "官網首頁已公告正校遷往東涌；2026/27招生文件附註列東涌雋東邨雋華樓地下及27432800。到訪或報名前須向正校確認現行門牌及登記校址編號，不能照舊美孚概覽安排接送。", period: "2026-10-24官網複核", sourceUrl: "http://www.guideposts.edu.hk/" },
      { label: "保留可辨認的辦學方向", value: "正校宗旨文件以基督教六育發展、兩文三語、主題探索與蒙氏操作元素培養自理和求知。這是校方公布的教育方向；新環境的戶外空間、語言時數、班制及費用要重新了解，不沿用舊校舍數字。", period: "正校宗旨文件，未標學年", sourceUrl: "http://www.guideposts.edu.hk/teaching_objectives/meifoo.pdf" },
    ] }],
  }),
  exceptionalProfile("581836", {
    website: "https://boxhill.edu.hk/tko/", schoolType: "私立幼稚園暨幼兒中心", directoryDetailScope: "school",
    gradeSpan: "校方課程列PN至K3；各登記校址的開班須分別確認",
    language: "校方課程：英語為教學及溝通主要語言，粵語與普通話為輔；未列課時比例",
    tuition: "2026-08-01生效證書：K1至K3半日79,200元／11期；全日109,780元／11期，膳食另計（限證書兩校址）",
    dataYear: "登記快照2026-09-30；收費證明2026-08-01生效；2026-10-24複核",
    sourceNote: "校號581836在本地登記快照有0001都會駅、0002翠嶺峰、0003The Parkside三址。現行官網將軍澳到訪地址及教育局2026-08-01收費證書均指向The Parkside／翠嶺峰，沒有把新費率套用都會駅；最新概覽個校連結未能返回原表，不沿用2024年師資比。登記地址列表保留作校址身份辨認，不能據此推定三址同時招生。",
    sources: [
      { label: "博士山將軍澳：校舍頁", scope: "The Parkside唐俊街18號101至103室、將軍澳招生入口。", url: "https://boxhill.edu.hk/tko/" },
      { label: "博士山：各校舍聯絡", scope: "將軍澳26230023、The Parkside現行到訪地址；其他分校電話不互借。", url: "https://boxhill.edu.hk/contact/" },
      { label: "博士山：課程及語言", scope: "EYFS、英語為主粵普為輔、PN至K3年齡與觀察檔案。", url: "https://boxhill.edu.hk/curriculum/" },
      { label: "教育局：將軍澳收費證明", scope: "2026-08-01生效；只列翠嶺峰及The Parkside，K1至K3費用不等於PN。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/581836.pdf" },
    ],
    detailSections: [
      { title: "課程特色｜英語為主的遊戲探索", featured: true, details: [
        { label: "EYFS與日常語言", value: "官網以英國早期基礎階段框架（EYFS）組織主題、故事、拼音及動手活動；明確列英語為教學與溝通主要語言，粵語和普通話為輔。希望兼顧中文的家庭可索取各級粵普活動表，不能由『有中文課』推定中文與英語課時相等。", sourceUrl: "https://boxhill.edu.hk/curriculum/" },
        { label: "從觀察檔案了解孩子", value: "校方列觀察日常活動、記錄作品及每學期／學年提供學習檔案，涵蓋溝通、社交情緒、體能及讀寫等。PN課程年齡由2歲起，K1由2歲8個月起；實際出生日期資格、校舍與班別以當屆安排核對。", sourceUrl: "https://boxhill.edu.hk/curriculum/" },
      ] },
      { title: "將軍澳校址與收費", note: "登記快照三址保留在上方；以下費用只適用收費證書明列的兩個地址。", details: [
        { label: "現行校舍聯絡", value: "校方將軍澳頁列The Parkside唐俊街18號商場1樓101至103室，聯絡頁電話26230023。都會駅舊址是否仍辦課程須另確認，不用其舊電話推斷現況。", period: "2026-10-24官網複核", sourceUrl: "https://boxhill.edu.hk/contact/" },
        { label: "K1至K3與膳食費分開", value: "2026-08-01生效證書列翠嶺峰及The Parkside：K1至K3上午／下午全年79,200元（11期，每期7,200元），全日109,780元（11期，每期9,980元）；全日膳食另5,489元（11期，每期499元）。證書所稱Nursery為幼兒班K1，不能當2歲PN費用。PN及其他用品另索取當屆表。", period: "2026-08-01生效", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/581836.pdf" },
      ] },
    ],
  }),
  exceptionalProfile("527211", {
    website: "https://kmvn.edu.hk/zh/", telephone: "29810066", principal: "周靜文（停辦前官網所列）", establishedYear: "2013",
    schoolType: "非牟利幼稚園暨幼兒園（已宣布停止營辦）", registrationStatus: "校方公告2026-07-31後停止營辦；登記資料保留作身份記錄",
    gradeSpan: "歷史N1及K1至K3；停止營辦後不列作當屆招生選項",
    tuition: "停辦前2025/26費表僅作歷史資料，不作當屆預算", language: "停辦前官網列兩文三語、英語及普通話教師；不作現行開課承諾",
    dataYear: "校方2026-03-30通告、2026-07-31後停辦；2026-10-24複核",
    sourceNote: "校號527211、幼兒園CCC/683、長洲長碩路33號碧濤軒商業樓地下與官網、舊收費證書吻合。官網中文首頁有2026-03-30停辦通告，英文首頁及舊申請頁仍留招生字樣；應以較新的停止營辦公告為先，不能據舊頁繼續推薦報名。",
    sources: [
      { label: "國民：停止營辦官方通告", scope: "校董會決定2026年7月31日學年結束後停止營辦；優先於舊招生頁。", url: kwokNotice },
      { label: "國民：學校簡介及校號", scope: "2013年創校、主辦團體、兩文三語、長洲地址與電話；屬停辦前辦學介紹。", url: "https://kmvn.edu.hk/zh/" },
      { label: "教育局：國民歷史收費證明", scope: "2025-08-01生效、原址及舊K1至K3費率，沒有作2026/27仍招生證據。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/527211.pdf" },
    ],
    detailSections: [{ title: "辦學狀態｜以停止營辦通告為先", featured: true, details: [
      { label: "2026年7月31日學年結束後停止營辦", value: "2026年3月30日官方通告指出，經校董會決策，學校於2026年7月31日學年結束後停止營辦。舊網頁仍列N1、K1及插班申請，不能當作今天仍接受申請或有學位。", period: "官方通告2026-03-30", sourceUrl: kwokNotice },
      { label: "歷史課程與身份保留", value: "學校2013年8月由香港漢文師範同學會與國民學校相關會所聯合主辦；原有兩文三語、多元活動及家校合作方向。保留校號、長洲地址及過往理念供辨認，不沿用舊學費、教師名單或兒童服務作現行擇校比較。", period: "停辦前官網介紹", sourceUrl: "https://kmvn.edu.hk/zh/" },
    ] }],
  }),
  profile({
    schoolNumber: "613916", locationId: "0001", website: "https://www.puikiukg.edu.hk/", telephone: "35902121", schoolType: "私立獨立幼稚園", principal: "葉淑娟", establishedYear: "2019", gradeSpan: grades,
    language: "概覽列英普／英粵班及校本英文課程；各班主課語音與逐級時數另確認",
    ratio: "上午1:10.9；下午1:8.2", ratioIncludesPn: true, teacherCount: 9, classroomCount: 6,
    spaces: "有室內遊戲場地、音樂室及圖書館；沒有戶外遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄25人，半日全年73,200元，全日為「-」；沒有幼兒中心資助、暫託或延長服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日全年68,200至71,500元／11期；全日未列",
    fees: "2026/27 K1至K3上午、下午每級列全年68,200至71,500元、11期；全日為「-」。區間須按所選課程核對，不自行對應英普或英粵班，PN及用品另計。",
    sourceNote: "只對應大涌橋路52號富豪花園商場2期1樓、校號613916；不是培僑柏傲莊校號622389。官網有兩個聯絡號碼，主表採本校概覽35902121；班型與費用區間須向富豪花園校舍確認。",
    sources: [],
    features: { title: "課程特色｜英普／英粵與主題探索", featured: true, details: [
      { label: "按班型確認語言環境", value: "本校概覽列PN國際課程、英普／英粵班、全語文教學、方案活動及校本英文課程。家長應按所選班型了解中文語音與英語活動，而不是把所有孩子視為同一套語言配比；原表未列各語言分鐘數。", period: "2026/27概覽校方申報", sourceUrl: kgp("613916") },
      { label: "探索與升小適應分開看", value: "主題配合戶外參觀，持續觀察及成長檔案記錄學習；另列新生適應、升小講座、參觀小學與模擬課程。這些是學習及過渡安排，不構成升讀培僑小學的學額保障。需要全日照顧的家庭也要留意本校沒有列全日班及延長服務。", period: "2026/27概覽校方申報", sourceUrl: kgp("613916") },
    ] },
  }),
  profile({
    schoolNumber: "231266", locationId: "0001", website: "https://www.catiline.edu.hk/", telephone: "26463988", schoolType: "私立獨立幼稚園", principal: "周燕珍", establishedYear: "1988", gradeSpan: grades,
    language: "沙田官網列半日班每天約50分鐘英語及約50分鐘普通話；其餘主課語音與全日安排另確認",
    ratio: "上午1:9.7；下午1:5.0", ratioIncludesPn: true, teacherCount: 9, classroomCount: 10,
    spaces: "有室內遊戲場地、音樂室、圖書室、學習室及小舞台；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日全年56,100元、全日85,800元；沒有幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年64,200元／12期；全日85,560元／12期",
    fees: "2026/27 K1至K3上午下午全年64,200元、12期；全日85,560元、12期。PN與K1費率及登記範圍分開核對，不把全日班解作可延長接送。",
    sourceNote: "校號231266為沙田第一城34至36座地下，官網幼稚園電話26463988吻合；同站幼兒園電話26462789不混用。最新概覽課程欄未列，英普活動採沙田官網課程頁，未推算語言百分比。",
    sources: [
      { label: "嘉德麗沙田：英語課程", scope: "半日每天約50分鐘、外籍專科教師、合成拼音、指導閱讀與自編教材；校方自述。", url: "https://www.catiline.edu.hk/englishhk.html" },
      { label: "嘉德麗沙田：普通話課程", scope: "半日每天約50分鐘、語委測試認證及歌曲故事律動；未推成主課全普。", url: "https://www.catiline.edu.hk/pthhk.html" },
    ],
    features: { title: "課程特色｜每天英普與語文應用", featured: true, details: [
      { label: "英語由拼音走向故事和句子", value: "沙田官網列半日班每天約50分鐘外籍老師英語，涵蓋合成拼音、劍橋Super Minds／Super Safari、角色扮演、自編教材和指導閱讀。家庭可索取所讀年級的實際日程，了解閱讀與遊戲如何配合；不把校方課程目標當孩子入讀後的能力保證。", sourceUrl: "https://www.catiline.edu.hk/englishhk.html" },
      { label: "普通話有獨立活動時段", value: "校方另列半日班每天約50分鐘普通話，透過歌曲、律動、故事、遊戲及《樂學普通話》教材學習，並融入禮儀與文化。重視粵語的家庭仍要確認其餘主課使用什麼語音；每天有普通話課不等於所有中文活動皆用普通話。", sourceUrl: "https://www.catiline.edu.hk/pthhk.html" },
    ] },
  }),
  profile({
    schoolNumber: "325457", locationId: "0001", website: "https://www.stdominic.edu.hk/", telephone: "28970701", principal: "容美琪", establishedYear: "1986", gradeSpan: grades,
    language: "最新概覽未列粵語／普通話主課分工及英語時數，須向杏花邨本校確認",
    ratio: "上午1:7.2；下午1:5.5", ratioIncludesPn: true, teacherCount: 13, classroomCount: 10,
    spaces: "有室內、戶外遊戲場地及音樂室；其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄17人，半日全年37,090元，全日為「-」；有暫託，沒有幼兒中心資助及延長服務。當屆費率與資格另核對。",
    feeSummary: "K1至K3半日免費；全日全年12,060元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日全年12,060元、10期。PN、用品及膳食另計，暫託不等於固定延長照顧。",
    sourceNote: "杏花邨1座側幼稚園A、校號325457。官網本次讀取受限，課程、設施與服務採本校概覽原表，沒有以『中英文』校名推定英語課時或中文語音。",
    sources: [],
    features: { title: "課程特色｜不以機械操練作起點", featured: true, details: [
      { label: "K1不要求執筆寫字", value: "本校概覽明確申報不要求幼兒班兒童執筆寫字，亦不要求機械抄寫或操練式計算；課程採主題、螺旋式學習與遊戲方案活動。若家庭希望很早進入書寫操練，應先了解校方如何用操作、語言和感官經驗建立基礎。", period: "2026/27概覽校方申報", sourceUrl: kgp("325457") },
      { label: "家校觀察與適應支援", value: "校方持續記錄在校表現，透過親子承諾書了解在家學習，並列新生適應週、幼小銜接、故事媽媽及親子伴讀。非華語及康復支援按資格與需要安排；家長可問清回饋頻率、暫託時段與申請程序。", period: "2026/27概覽校方申報", sourceUrl: kgp("325457") },
    ] },
  }),
  profile({
    schoolNumber: "566080", locationId: "0001", website: "https://citykidshk.org/", telephone: "25224446", schoolType: "非牟利幼稚園（沒有參加幼稚園教育計劃）", principal: "MS RENDALL, KHARDINE",
    language: "官網列英國EYFS課程；本次未取得主課語言與粵普英時數明細，不由英文網站推算",
    gradeSpan: "概覽K1至K3及2至3歲服務；官網另有成人陪同Little Stars活動，兩者分開",
    ratio: "上午1:7.5；下午1:7.5", ratioIncludesPn: false, teacherCount: 6,
    spaces: "概覽未列註冊課室、室內外遊戲場地及音樂室；官網描述歷史建築環境，不自行補寫場地數目。",
    pn: "2025年9月原表列有2至3歲服務，收錄人數0，半日全年54,890元，全日為「-」；無幼兒中心資助、暫託或延長服務。0人為該次統計，不等於今天停收PN。",
    feeSummary: "K1至K3半日全年56,650元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年56,650元、11期；全日為「-」。官網Little Stars成人陪同活動及PN不是同一費率；非牟利亦不等於獲免費幼稚園資助。",
    sourceNote: "校號566080，概覽及登記列波老道12號3樓東翼，官網到訪地址列2樓東翼，電話25224446一致；報名前須確認使用樓層及登記範圍。概覽創校年1979、官網1984不一致，本頁不擇一當作已交叉確認的創校年。",
    sources: [{ label: "City Kids：課程、年齡與聯絡", scope: "EYFS遊戲學習、10月齡至3歲成人陪同活動、2至3歲及2.8至5.5歲組別；樓層與創校年差異明示。", url: "https://citykidshk.org/" }],
    features: { title: "課程特色｜遊戲與按步調探索", featured: true, details: [
      { label: "EYFS關注社交、情緒與自主", value: "官網以英國早期基礎階段框架（EYFS）結合遊戲和有組織活動，讓孩子選擇、探索，並重視自信、創意和社交情緒。家長可到訪了解一日活動與家校溝通，再確認中文與英文的實際安排；課程框架不能替代語言時數資料。", sourceUrl: "https://citykidshk.org/" },
      { label: "成人陪同班不等於註冊PN", value: "Little Stars標示10個月至3歲，需成人陪同；官網另有2至3歲及2歲8個月至5歲半組別。這些年齡入口不自動等於教育局登記的2歲以下幼兒服務，家庭應確認報讀的是遊戲活動、PN還是幼稚園，以及是否需要家長留場。", sourceUrl: "https://citykidshk.org/" },
    ] },
  }),
  profile({
    schoolNumber: "609919", locationId: "0001", website: "https://tys.good-health.edu.hk/", telephone: "24882318", schoolType: "私立獨立幼稚園", principal: "陳綺芬", establishedYear: "2018", gradeSpan: grades,
    language: "青衣南官網呈現英語及普通話活動；主課語音、各級時數與班型另確認",
    ratio: "上午1:8.0；下午1:6.5", ratioIncludesPn: true, teacherCount: 23, classroomCount: 13,
    spaces: "有室內外遊戲場地、音樂室、圖書館、創意藝術室、兒童廚房、思維遊戲室、攀石場及戶外種植園地。",
    pn: "2025年9月提供2至3歲服務，收錄66人，半日全年64,900元、全日96,910元；沒有幼兒中心資助、暫託或延長服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日全年63,470元／11期；全日93,500元／11期",
    fees: "2026/27 K1至K3上午下午全年63,470元、11期；全日93,500元、11期。PN及用品膳食另計；全日學費不能視為已包含放學後延長服務。",
    sourceNote: "青衣南專屬官網地址美景花園11至12座商場L1至L2及24882318與概覽相符；不借用青衣或馬鞍山校舍數字。官網家長分享只作校方選載內容，沒有當作獨立口碑或全體學生的語言、表演成果。",
    sources: [],
    features: { title: "課程特色｜基督教品格與生活探索", featured: true, details: [
      { label: "從做中學，家校同步", value: "青衣南官網以基督的愛與德育為先，列興趣、遊戲、觀察、探究、思考和想像作學習方法，透過生活經驗設計跨學科活動。家庭可了解課程如何把待人、自理與合作放進日常，並確認宗教活動及家長參與安排。", sourceUrl: "https://tys.good-health.edu.hk/" },
      { label: "多種專室要看實際使用日程", value: "概覽列兒童廚房、攀石、藝術、思維遊戲及種植等空間。這些提供不同操作可能，但不代表每個年級每天均能使用；到訪時可問一週輪用、教師帶領及全日休息安排。校方列無延長服務，工作家庭需另外核對接送。", period: "2026/27概覽", sourceUrl: kgp("609919") },
    ] },
  }),
];

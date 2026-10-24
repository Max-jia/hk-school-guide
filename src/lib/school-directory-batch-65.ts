import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及名額另確認";
const noPn = "2025年9月概覽列沒有提供2至3歲幼兒服務、收錄0人；下一屆是否新增服務須向現校址確認，不能從機構其他校舍推定。";

export const KINDERGARTEN_BATCH_65: PilotSchool[] = [
  profile({
    schoolNumber: "510726", locationId: "0001", website: "https://www.asburymkg.edu.hk/", telephone: "24296669", principal: "魏玉卿", establishedYear: "1960", gradeSpan: grades,
    language: "概覽未列粵語／普通話／英語逐級時間安排，需向校方確認",
    ratio: "上午1:8.4；下午1:7.2", ratioIncludesPn: true, teacherCount: 12, classroomCount: 6, spaces: "室內及戶外遊戲場地、音樂室、視聽室、禮堂、活動室及祈禱室。",
    pn: "2025年9月提供2至3歲服務，收錄11人，半日全年38,580元；全日費用格為「-」。PN當屆費率及名額另確認，不能套用K1免費格。",
    feeSummary: "K1至K3上午免費；全日全年11,858元／11期",
    fees: "2026/27 K1至K3上午班扣減資助後免費；全日全年11,858元、11期，下午各格為「-」。PN、膳食及書簿等須按當屆清單另外核對。",
    sourceNote: "本頁為大窩口上角街1號、校號510726，並非亞斯理小學。網站本次擷取受限，課程採教育局概覽所收錄的本校自述；沒有用宗教或機構名稱推定授課語言。",
    sources: [],
    features: { title: "課程特色｜高瞻探索與基督教品格", featured: true, details: [
      { label: "把課堂延伸到參觀、訪問和探究", value: "校方概覽列高瞻教學模式，配合延展活動、校外參觀、訪問和搜集資料，以螺旋式課程逐步深化經驗。家庭可觀察孩子是否有選擇、動手和回顧的機會，並請教師舉例說明同一主題如何按年齡調節。", period: "2026/27概覽校方申報", sourceUrl: kgp("5107260001") },
      { label: "用學習檔案和新生支援連結家庭", value: "校方透過持續觀察及作品整理學習檔案，新生有愉快學習週及家訪，另列駐校社工支援情緒、學習和社交需要。家長宜了解回饋頻率及家訪安排；這些是校方提供的支援方向，並非每名孩子獲相同介入時數的承諾。", period: "2026/27概覽校方申報", sourceUrl: kgp("5107260001") },
    ] },
  }),
  profile({
    schoolNumber: "563676", locationId: "0001", website: "https://www.poleungkuk.org.hk/child-care-services/ftkgn/school-info", telephone: "24111799", principal: "鍾佩珊", establishedYear: "1988", gradeSpan: grades,
    language: "校方申報外籍教師教授英語；粵語／普通話／英語課時另核對",
    ratio: "上午1:8.1；下午1:8.1", ratioIncludesPn: true, teacherCount: 11, classroomCount: 4, spaces: "室內遊戲場地、音樂室；沒有戶外遊戲場地或其他特別室。",
    pn: "2025年9月提供2至3歲服務，收錄19人，全日全年42,456元；半日為「-」。列參加幼兒中心資助計劃及提供暫託、延長時間服務。官網另一欄仍列2025/26月費，與本欄年度及費率口徑不同，PN當屆費率須直接索取核准文件。",
    feeSummary: "K1至K3全日全年25,968元／12期；PN另計",
    fees: "2026/27概覽列K1至K3全日扣減資助後全年25,968元、12期；上午及下午為「-」。官網仍列2025/26的K1至K3月費2,104元，不能拿該舊年價格取代2026/27全年數；膳食及其他項目另核對。",
    sourceNote: "本頁為麗城花園第一期閣樓校號563676，改用保良局本校專頁。官網的機構總聯絡電話不覆蓋本校教育局聯絡24111799；各服務按年齡、資助資格及當屆收費分開。",
    sources: [{ label: "保良局方譚遠良：學校資料", scope: "1988創校、2至6歲日間照顧、膳食及服務；頁內2025/26收費不作2026/27現價。", url: "https://www.poleungkuk.org.hk/child-care-services/ftkgn/school-info" }],
    features: { title: "課程特色｜多感官探索與日間照顧", featured: true, details: [
      { label: "科學、戲劇和奧福音樂連結生活", value: "校方概覽列探究科學、戲劇、奧福音樂、情意教育和創意美術，透過個別、小組和專題活動，鼓勵實物探索與解難。家庭可觀察孩子如何操作、協商和表達，並了解這些活動如何納入全日日程。", period: "2026/27概覽校方申報", sourceUrl: kgp("5636760001") },
      { label: "照顧、膳食與轉介要一起比較", value: "校方專頁列日間照顧和自設廚房；概覽另列社工、康復及家庭轉介等支援。對需要長時間照顧的家庭，應把接送、膳食、延長時間和申請資格連同學費查清，並了解遇到情緒、語言或發展需要時的實際跟進程序。", sourceUrl: "https://www.poleungkuk.org.hk/child-care-services/ftkgn/school-info" },
    ] },
  }),
  profile({
    schoolNumber: "531898", locationId: "0001", website: "https://www.cannan.edu.hk/", telephone: "21756202", principal: "莫淑賢", establishedYear: "1999", gradeSpan: grades,
    language: "本校申報兩文三語、雙語互動及中英文閱讀；主課語音和逐級時數另確認",
    ratio: "上午1:8.8；下午1:8.5", ratioIncludesPn: true, teacherCount: 18, classroomCount: 6, spaces: "室內遊戲場地、音樂室、兒童圖書區；沒有戶外遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄60人，半日全年36,905元；全日為「-」。PN費率與K1至K3補貼後收費分開，收錄人數不是下屆招生額。",
    feeSummary: "K1至K3半日扣減資助後全年3,440元／10期；PN另計",
    fees: "2026/27概覽列K1至K3上午及下午班扣減資助後全年3,440元、10期，並非免費；全日各格為「-」。PN、校服和書簿等另核對。",
    sourceNote: "本頁只對應海庭道8號富榮花園12座、校號531898。迦南各分校收費和班制不同，不把另一校的免費或全日班安排套入；既有富榮花園報告連結保留。",
    sources: [{ label: "迦南：機構課程與家校方向", scope: "兒童為本、繪本及親子閱讀等機構自述；本頁數據及班制以富榮花園概覽為準。", url: "https://www.cannan.edu.hk/" }],
    features: { title: "課程特色｜繪本與自選分組", featured: true, details: [
      { label: "故事引發問題，興趣角支持五感探索", value: "富榮花園校方概覽以生活主題及故事引發解難，配合繪本、材料豐富的興趣角和自選分組，並重視雙語互動。家庭可留意孩子能否選擇活動、試驗材料和說出發現，而不只看每天完成多少頁教材。", period: "2026/27概覽校方申報", sourceUrl: kgp("5318980001") },
      { label: "親子閱讀與每年兩次總結評估", value: "校方列中英文網上親子閱讀、持續觀察及每年兩次總結評估，作品與活動相片納入學習歷程檔案。家長可索取一份評估樣本，了解讀寫、品格和社交如何回饋，以及家庭每天需要怎樣參與閱讀。", period: "2026/27概覽校方申報", sourceUrl: kgp("5318980001") },
    ] },
  }),
  profile({
    schoolNumber: "616443", locationId: "0001", website: "https://www.pips.edu.hk/lohas/index.asp", telephone: "26311299", schoolType: "私立獨立幼稚園", principal: "羅雪儀", establishedYear: "2021", gradeSpan: grades,
    language: "康城官網列英普或英粵兩語言組別，英語與中文教師共同帶班；時數另確認",
    ratio: "上午1:4.0；下午未列", ratioIncludesPn: true, teacherCount: 8, classroomCount: 9, spaces: "室內遊戲場地、音樂室、創研室、感統遊戲場、五感探索室及兒童圖書室。",
    pn: "2025年9月提供2至3歲服務，收錄21人，半日全年91,200元；全日為「-」。PN當屆費率、班別和名額須另查。",
    feeSummary: "K1至K3半日全年85,800元／12期；PN另計",
    fees: "2026/27概覽列K1至K3上午及下午全年85,800元、12期；全日各格為「-」。沒有參加教育計劃；PN及其他一次性款項、用品等費用另核對。",
    sourceNote: "本頁只對應康城7期3樓校號616443，與栢基九龍、陽明山莊及其他分校分開。1989為機構首校歷史，康城概覽所列創校年份為2021，沒有混用；語言採本校康城官網的雙軌說明。",
    sources: [{ label: "栢基康城：本校課程及聯絡", scope: "康城地址、26311299電話、英普／英粵兩軌及共同帶班自述；IB描述不轉述成升學保障。", url: "https://www.pips.edu.hk/lohas/index.asp" }],
    features: { title: "課程特色｜雙語共同帶班", featured: true, details: [
      { label: "英語教師與中文教師同班配合", value: "康城官網列兩個語言組別：英語配普通話，或英語配粵語，由英語及中文教師共同教學，並介紹IB探究方向。對家庭而言，選哪種中文語音會影響日常輸入；應按孩子語言背景詢問當屆班別和兩位教師如何分工，不把雙語直接解讀成各佔一半。", sourceUrl: "https://www.pips.edu.hk/lohas/index.asp" },
      { label: "空間安排要連到實際活動", value: "本校概覽列感統、五感探索、創研及兒童圖書空間，官網則以創意、好奇心和自信為方向。家長可索取一天日程，了解幼兒使用這些空間的頻率、自由操作時間和教師記錄方式，設施名稱本身不足以判斷學習深度。", sourceUrl: kgp("6164430001") },
    ] },
  }),
  profile({
    schoolNumber: "627550", locationId: "0001", website: "https://ponstp.hkcschild.edu.hk/", telephone: "28699935", principal: "陳珮雯", establishedYear: "2025",
    language: "校方申報中英文閱讀及遊戲；主課語言與普通話安排另確認",
    ratio: "上午1:5.3；下午1:5.3", ratioIncludesPn: false, teacherCount: 3, classroomCount: 6, spaces: "室內遊戲場地、音樂室、蒙特梭利教室、創意藝術室、童書樂園、小組及多功能活動室。", pn: noPn,
    feeSummary: "K1至K3全日全年18,504元／12期",
    fees: "2026/27概覽列K1至K3全日扣減資助後全年18,504元、12期；上午及下午為「-」。膳食及其他用品按當屆清單另核對，不能用舊時代幼兒學校費率替代。",
    sourceNote: "本頁為富蝶邨鳳蝶樓地下2號新校號627550，舊名時代幼兒學校；現官網已交代遷址改名。2025年9月小規模統計不作現時班額或學校質素判斷；舊校家長分享不當作新校舍口碑樣本。",
    sources: [{ label: "雋樂大埔：遷址、理念及聯絡", scope: "時代遷往富蝶邨、更名雋樂、蒙特梭利與藝術方向，並確認現址電話。", url: "https://ponstp.hkcschild.edu.hk/" }],
    features: { title: "課程特色｜蒙特梭利與藝術探索", featured: true, details: [
      { label: "新校舍以自主步伐和藝術為核心", value: "現官網把蒙特梭利與藝術教育列為雋樂大埔的核心，讓幼兒按自身步伐探索，配合創意美術、戲劇、舞蹈和音樂。家長可實地了解蒙特梭利教室如何使用、孩子怎樣選擇工作，以及藝術活動是否容許不同表達方式。", sourceUrl: "https://ponstp.hkcschild.edu.hk/" },
      { label: "主題、新聞分享與文藝活動連結生活", value: "本校概覽列主題與專題研習、每天新聞分享、參觀及藝術活動，另有中英文閱讀和遊戲。家庭可索取現校舍完整一週安排及學習日誌，了解探究、語言、午睡和照顧如何銜接，不把舊校活動自動當作新址每年都提供。", period: "2026/27概覽校方申報", sourceUrl: kgp("6275500001") },
    ] },
  }),
  profile({
    schoolNumber: "581739", locationId: "0002", website: "https://boxhill.edu.hk/ft", telephone: "26882161", schoolType: "私立獨立幼稚園", principal: "黃凱鈴", establishedYear: "2010",
    language: "機構課程頁列英語為教學及溝通主語，粵語、普通話輔助；現校舍課時另確認",
    ratio: "上午及下午均為「-」，未列數值", classroomCount: 6, spaces: "室內及戶外遊戲場地；概覽列沒有音樂室。", pn: noPn,
    feeSummary: "K1至K3半日全年79,200元／11期",
    fees: "2026/27概覽K1至K3上午及下午全年79,200元、11期；全日各格為「-」。沒有參加教育計劃，延伸活動、膳食及當屆幼兒服務另核對。",
    sourceNote: "本頁以星凱．堤岸、校址0002為準，官網2025年11月已公告新火炭校舍開幕；頁首仍有預計開校的舊文字，未當作仍未開校。2010是學校歷史，並非新校舍啟用年。概覽缺人員及比率，未借用舊址或其他博士山校舍數字。",
    sources: [
      { label: "博士山火炭：新校舍及開幕公告", scope: "星凱．堤岸現址與2025年11月開幕消息；頁首舊預告不覆蓋較後公告。", url: "https://boxhill.edu.hk/ft" },
      { label: "博士山：課程及語言", scope: "英國早期基礎階段EYFS、英語主導及粵普輔助的機構自述；按火炭當屆班別確認。", url: "https://boxhill.edu.hk/curriculum/" },
    ],
    features: { title: "課程特色｜英語主導與遊戲探索", featured: true, details: [
      { label: "英國早期框架結合主題活動", value: "機構課程頁列英國早期基礎階段EYFS，以遊戲、參與和探索支持語言、社交、身體與情緒發展，並說明英語為校內教學及溝通主語，粵語和普通話輔助。家庭可詢問新火炭校舍的中文時間及活動樣本，判斷是否符合日後教育路線。", sourceUrl: "https://boxhill.edu.hk/curriculum/" },
      { label: "搬遷後的服務按新址重新核對", value: "官網已公布星凱．堤岸校舍開幕，概覽亦改用校址0002，但2025年9月人員及比率尚未列值。家長宜直接索取現行教師配置、課表與接送資料；機構課程頁有PN介紹，也不能據此認定新校址當屆已提供同一幼兒服務。", sourceUrl: "https://boxhill.edu.hk/ft" },
    ] },
  }),
  profile({
    schoolNumber: "627542", locationId: "0001", website: "https://www.ychyo.org.hk/", telephone: "24502143", principal: "李惠芬", establishedYear: "1982",
    language: "校方申報駐校普通話專任師及英語導師；主課語言與時數另確認",
    ratio: "上午及下午均為「-」，未列數值", classroomCount: 6, spaces: "室內遊戲場地、音樂室、多元活動室、外語室及圖書角；沒有戶外遊戲場地。", pn: noPn,
    feeSummary: "K1至K3全日全年13,500元／12期",
    fees: "2026/27概覽列K1至K3全日扣減資助後全年13,500元、12期；上午及下午均為「-」。膳食及用品等費用另核對，舊校址學費不可直接套用。",
    sourceNote: "本頁按新校號627542及業旺邨業和樓1樓核對，現名仁濟醫院友愛（業旺邨）幼稚園。1982為歷史年份，不是業旺校舍啟用年；網站擷取受限，概覽未列的人員與比率不從舊址補入。",
    sources: [],
    features: { title: "課程特色｜感官體驗與品德", featured: true, details: [
      { label: "讓感官體驗轉化成語言與概念", value: "本校概覽以德育、遊戲和感官學習為方向，採主題與專案研究，例子包括製作時令食物、探索社區和觀察自然變化。家長可了解新校舍如何安排這些體驗，以及活動後是否讓孩子討論、記錄和提出下一個問題。", period: "2026/27概覽校方申報", sourceUrl: kgp("6275420001") },
      { label: "英普導師與家庭評估配合", value: "校方列普通話專任師及英語導師，並透過兒童學習、家庭表現評估和發展報告持續回饋，另有社工及新生支援。這些是本校申報安排，家庭仍應核對新址課表、語言頻率和回饋方式，而不把有專任師當成外語主導。", period: "2026/27概覽校方申報", sourceUrl: kgp("6275420001") },
    ] },
  }),
  profile({
    schoolNumber: "622699", locationId: "0001", website: "https://www.nobelpreschool.org/", telephone: "36188980", schoolType: "私立獨立幼稚園", principal: "溫寶儀", establishedYear: "2023", gradeSpan: grades,
    language: "本校申報英語、普通話、粵語母語教師；品牌官網另列英普雙班主任，當屆分工另確認",
    ratio: "上午1:6.3；下午1:2.7", ratioIncludesPn: true, teacherCount: 3, classroomCount: 4, spaces: "室內及戶外遊戲場地、音樂室；其他特別室列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄9人，半日全年62,700元、全日105,050元。這是幼兒服務當時費率，與2026/27 K1至K3學費分開。",
    feeSummary: "K1至K3半日全年65,835元／11期；全日101,640元／11期",
    fees: "2026/27概覽K1至K3上午及下午全年65,835元、11期；全日各級101,640元、11期。沒有參加教育計劃，PN及雜費另核對。",
    sourceNote: "本頁只對應柴灣康翠臺第7座、校號622699。官網同時列何文田及柴灣，品牌課程方向需按柴灣班別確認；電話按柴灣文字及教育局資料36188980保留，不跟隨網站電話連結誤帶的何文田號碼。",
    sources: [{ label: "樂沛兒：課程方向及柴灣聯絡", scope: "兩文三語、STEAM及兩校校號地址；柴灣聯絡與教育局核對，品牌雙班主任須確認當屆配置。", url: "https://www.nobelpreschool.org/" }],
    features: { title: "課程特色｜三語主題與生活科探", featured: true, details: [
      { label: "以日常小實驗帶動提問和解難", value: "本校概覽採主題及STEAM跨學科學習，即科學、科技、工程、藝術和數學的結合，透過生活小實驗引發討論與反思。家長可觀察孩子是否能提出假設、試不同方法並解釋結果，而不只完成一件指定成品。", period: "2026/27概覽校方申報", sourceUrl: kgp("6226990001") },
      { label: "語言與升小支援要看具體安排", value: "校方列母語英語、普通話及粵語教師、每月主題評估和學習檔案，K2、K3另有小學參觀及家長面談等升小支援。這些服務不代表特定小學錄取率；家庭可核對柴灣當屆語言分工、評估樣本及所需的家長投入。", period: "2026/27概覽校方申報", sourceUrl: kgp("6226990001") },
    ] },
  }),
  profile({
    schoolNumber: "593680", locationId: "0001", website: "https://zenithkindergarten.edu.hk/shatin-campus", telephone: "22426838", principal: "謝綺媚", establishedYear: "2014", gradeSpan: grades,
    language: "機構列兩文三語及國際雙語方向；沙田班別主課語音和時間另確認",
    ratio: "上午1:10.5；下午1:4.8", ratioIncludesPn: true, teacherCount: 4, classroomCount: 5, spaces: "室內及戶外遊戲場地、音樂室；其他特別場地未列。",
    pn: "2025年9月提供2至3歲服務，收錄14人，半日全年80,400元、全日135,276元。PN當屆費率及學額須直接確認，不套用K1費率。",
    feeSummary: "K1至K3半日全年84,000元／12期；全日114,000元／12期",
    fees: "2026/27概覽列K1至K3上午及下午全年84,000元、12期；全日各級114,000元、12期。本校雖為非牟利類別，但沒有參加教育計劃，不能按免費幼稚園預算。",
    sourceNote: "本頁為車公廟路溱岸8號沙田校號593680，校方分校聯絡頁電話地址一致。課程及理念頁為機構共用，未標各校課時，不套用其他分校的班額、費率或成果。",
    sources: [
      { label: "英藝：沙田分校聯絡", scope: "溱岸8號及22426838，與本校概覽交叉核對。", url: "https://zenithkindergarten.edu.hk/contact/" },
      { label: "英藝：課程及學制", scope: "兩文三語、藝術和探索方向，為機構共用課程自述。", url: "https://zenithkindergarten.edu.hk/education-1/" },
      { label: "英藝：課程編排", scope: "六大範疇、主題、專題研習及參觀安排，沙田實施細節另核對。", url: "https://zenithkindergarten.edu.hk/education-2/" },
    ],
    features: { title: "課程特色｜主題探索與藝術", featured: true, details: [
      { label: "以探索、計劃、實踐及分享帶動學習", value: "機構課程頁列兒童為本，以六大範疇、主題和專題研習，配合參觀和考察，讓孩子在探索、計劃、實踐和分享中練習思考與合作。沙田概覽沒有詳細課程文本，家庭應向分校索取現行例子，確認品牌方向如何落實。", sourceUrl: "https://zenithkindergarten.edu.hk/education-2/" },
      { label: "三語與藝術方向不能代替班別日程", value: "校方共用課程頁強調兩文三語、表達及藝術發展，鼓勵幼兒分享和創作。資料未列沙田各班英語、普通話、粵語的時間比例；家長可連同作品和課表了解實際學習節奏，避免僅憑「國際雙語」名稱作選擇。", sourceUrl: "https://zenithkindergarten.edu.hk/education-1/" },
    ] },
  }),
  profile({
    schoolNumber: "575410", locationId: "0001", website: "https://kindergarten.munsang.edu.hk/", telephone: "36553500", principal: "張展鈴", establishedYear: "1926", gradeSpan: "K1至K3；2至3歲服務及獨立幼兒園安排須另確認",
    language: "校方列兩文三語、英語拼音與普通話漢語拼音；逐級主課語音及時間另核對",
    ratio: "上午1:10.2；下午1:10.1", ratioIncludesPn: false, teacherCount: 58, classroomCount: 21, spaces: "室內及戶外遊戲場地、音樂室、圖書室、禮堂、運動場、演講廳、小教堂及室內游泳池；使用範圍按幼稚園日程確認。",
    pn: "2025年9月概覽的2至3歲服務欄列「有」、半日全年76,700元，但收錄人數為0。官網另設民生幼兒園入口，不能把該新部門的當屆收生與費率直接套用本幼稚園校號；須向校方確認實際提供者、班別及核准文件。",
    feeSummary: "K1至K3半日全年53,390元／10期；2至3歲服務另核對",
    fees: "2026/27概覽列K1至K3上午及下午全年53,390元、10期；全日各格為「-」。沒有參加教育計劃，獨立幼兒園、親子班與本校K1至K3收費分開。",
    sourceNote: "本頁為東寶庭道8號校號575410的幼稚園，不混同民生小學、幼兒園或親子班。1926按概覽保留為學校歷史年份；校內銜接活動不能直接當作小學學位保證，設施亦不推定全體幼兒可隨時使用。",
    sources: [
      { label: "民生幼稚園：課程與語言", scope: "自主探究、英語Letterland、普通話拼音、閱讀、品德及小學課堂體驗；電話地址可交叉核對。", url: "https://kindergarten.munsang.edu.hk/index.php?pid=np-68&lang=zh" },
      { label: "民生：不同學部官方入口", scope: "分開幼稚園、幼兒園、親子班及小學，不能把一個入口的收生套入另一學部。", url: "https://www.munsang.edu.hk/" },
    ],
    features: { title: "課程特色｜閱讀、探究與幼小銜接", featured: true, details: [
      { label: "語言學習結合拼音、共讀和創作", value: "幼稚園課程頁列英語Letterland拼音、倫敦音樂學院及劍橋英語課程，普通話採漢語拼音，另有親子、師生和同儕共讀及中英文故事創作。這些是校方所用的教學內容，不表示所有幼兒須參加同一外部考試；家長可按年級核對課時、作品及額外費用。", sourceUrl: "https://kindergarten.munsang.edu.hk/index.php?pid=np-68&lang=zh" },
      { label: "同校小學課室體驗有助認識學習轉變", value: "校方課程頁及概覽均列K3模擬小學課堂、實地使用民生小學課室，幼稚園與小學教師亦定期開課程會議。這能說明兩個學部的教學銜接，但不是錄取比例或學位保證；家庭仍應另查小學當屆申請與評核政策。", sourceUrl: "https://kindergarten.munsang.edu.hk/index.php?pid=np-68&lang=zh" },
    ] },
  }),
];

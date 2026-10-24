import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及名額另確認";

export const KINDERGARTEN_BATCH_69: PilotSchool[] = [
  profile({
    schoolNumber: "213632", locationId: "0002", website: "https://www.central-western.stanthonyskg.edu.hk/", telephone: "24948848", principal: "陳映娥", establishedYear: "1965", gradeSpan: grades,
    language: "本校未公開粵語／普通話／英語的主課及逐級時數，不能由中英文校名推定比例",
    ratio: "上午1:7.7；下午1:6.0", ratioIncludesPn: true, teacherCount: 15, classroomCount: 8, spaces: "室內遊戲場地、音樂室、幻想遊戲及大肌肉活動空間；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄30人，半日全年49,800元，全日為「-」；沒有暫託及延長時間服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日免費；K2、K3全日全年13,180元／10期，K1全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日K1格為「-」，只有K2及K3列全年13,180元、10期。不概括為三個年級都有全日班；PN、膳食及用品另計。",
    sourceNote: "本頁只對應日富里7至13號富基大廈1樓、校址0002，電話雖為2494字頭，官網與概覽一致，沒有自行改寫。名稱含小學不構成目前有小學部或直升關係的證明；荃灣麗城校舍資料另計。",
    sources: [{ label: "聖安多尼：中西區校舍", scope: "日富里現址、24948848及2至6歲教學方向；同頁麗城聯絡不套用。", url: "https://www.central-western.stanthonyskg.edu.hk/" }],
    features: { title: "課程特色｜探索解難與品格", featured: true, details: [
      { label: "讓孩子在操作中嘗試和表達", value: "中西區校方以探索、實驗、解難及高層次思維為方向，結合本地課程與品格教育，鼓勵孩子在支持氣氛中接受挑戰。家長可看教師如何追問想法、容許不同做法，以及活動難度是否配合孩子發展；理念名稱不等於每位孩子已達相同成果。", sourceUrl: "https://www.central-western.stanthonyskg.edu.hk/" },
      { label: "用學習檔案討論成長", value: "校方持續觀察發展里程碑，以學習檔案向家長回饋；本校概覽另列新生適應、K3小一心理及模擬支援。家庭可詢問每個主題如何記錄孩子的探索與情緒，以及何時與家長討論下一步，不能由校名推定已有小學學位保障。", period: "2026/27概覽校方申報", sourceUrl: kgp("2136320002") },
    ] },
  }),
  profile({
    schoolNumber: "158860", locationId: "0001", website: "https://www.tbcpl.edu.hk/", telephone: "26356933", principal: "潘佩子", establishedYear: "1991", gradeSpan: grades,
    language: "本校列兩文三語，英文及普通話專教、英語日及普通話日；主課語音和時數另確認",
    ratio: "上午1:8.8；下午1:5.1", ratioIncludesPn: true, teacherCount: 18, classroomCount: 7, spaces: "室內及戶外遊戲場地、探索角、畫畫牆、圖書、教材與模擬區；沒有音樂室。",
    pn: "2025年9月提供2至3歲服務，收錄22人，半日全年52,720元，全日為「-」；沒有幼兒中心資助、暫託及延長時間服務。當屆費率另確認。",
    feeSummary: "K1至K3半日免費；全日全年27,140元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日全年27,140元、10期。PN及膳食、用品等另計，半日免費不等於全日免費。",
    sourceNote: "本頁為沙田安景街19至21號碧濤花園平台、校號158860，與同會其他校號分開。官網本次讀取受限，課程、語言及健康支援採本校概覽。",
    sources: [],
    features: { title: "課程特色｜繪本遊戲與健康校園", featured: true, details: [
      { label: "繪本、專題與語言日連結生活", value: "碧濤校方結合基督教品德、繪本、專題、小組實驗及模擬活動，安排英文和普通話專教及語言日。家庭可看故事如何延伸至自主遊戲與生活表達，並確認專教頻率及平日語境，不把兩個語言日理解為整天全英或全普。", period: "2026/27概覽校方申報", sourceUrl: kgp("1588600001") },
      { label: "身心支援也要看家校跟進", value: "本校列駐校護士、健康諮詢、社工、新生適應及小一家長會，並以學習歷程和eClass保持聯繫。家庭可詢問發現情緒或適應問題後如何通知家長、何時轉介，以及全日休息與活動的實際節奏。", period: "2026/27概覽校方申報", sourceUrl: kgp("1588600001") },
    ] },
  }),
  profile({
    schoolNumber: "622265", locationId: "0001", website: "https://zenithkindergarten.edu.hk/", telephone: "26901828", principal: "謝綺媚", establishedYear: "2014", gradeSpan: grades,
    language: "機構列兩文三語；賞湖班別的主課語音、教師配置及時數須向本校確認",
    ratio: "上午1:5.5；下午1:2.8", ratioIncludesPn: true, teacherCount: 6, classroomCount: 6, spaces: "室內及戶外遊戲場地、音樂室及舞蹈室。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日全年74,400元、全日115,728元。當屆PN費率、開班及名額另確認。",
    feeSummary: "K1至K3半日全年74,400元、全日106,800元，均12期",
    fees: "2026/27 K1至K3上午下午全年74,400元、12期；全日106,800元、12期。非牟利但沒有參加教育計劃，不按免費幼稚園預算；PN另計。",
    sourceNote: "本頁為嘉湖山莊賞湖居、校號622265。新官網聯絡頁本次只列沙田及兆康，賞湖當屆供應須直接確認；不以其他分校的新課表、聯絡電話或學費替代。",
    sources: [
      { label: "英藝：機構課程理念", scope: "兒童為本、兩文三語、專題探索及藝術；賞湖現行安排另確認。", url: "https://zenithkindergarten.edu.hk/education-1/" },
      { label: "英藝：聯絡頁", scope: "本次只列沙田及兆康，不能據此宣稱賞湖已停辦或仍按同樣班制招生。", url: "https://zenithkindergarten.edu.hk/contact/" },
    ],
    features: { title: "課程資料｜三語探索與分校確認", featured: true, details: [
      { label: "品牌方向有依據，賞湖課表另核對", value: "英藝機構課程以兒童需要及興趣為本，結合兩文三語、藝術和專題，讓幼兒經歷探索、計劃、實踐及分享。賞湖最新概覽沒有詳細課程文本，家長宜向本校索取近期課表和活動例子，確認這些方向在賞湖如何實施。", sourceUrl: "https://zenithkindergarten.edu.hk/education-1/" },
      { label: "先核對當屆校舍，再辦入學", value: "賞湖概覽仍有本校數據，但機構新聯絡頁未列這個校舍。家庭可按26901828及校號622265確認當屆課程、到訪地址和申請窗口；登記資料、歷史在學統計及目前有沒有空缺是三件不同的事。", sourceUrl: kgp("6222650001") },
    ] },
  }),
  profile({
    schoolNumber: "616311", locationId: "0001", website: "https://www.maplebear.hk/", telephone: "26998588", schoolType: "私立獨立幼稚園", principal: "施婷婷", establishedYear: "2019", gradeSpan: grades,
    language: "校方列英語及中文沉浸式雙語；康城中文採粵語或普通話及實際時數須確認",
    ratio: "上午1:10.2；下午1:4.0", ratioIncludesPn: true, teacherCount: 5, classroomCount: 4, spaces: "有室內遊戲場地及音樂室；沒有戶外場地，其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄24人，半日全年75,600元、全日129,540元。當屆PN費率、時段和名額另核對。",
    feeSummary: "K1至K3半日全年82,800元、全日118,800元，均12期",
    fees: "2026/27 K1至K3上午下午全年82,800元、12期；全日118,800元、12期。PN及用品膳食另計，不套用油塘及將軍澳Alto校舍費率。",
    sourceNote: "官網康城領都L1及26998588與校號616311吻合。校網所述加拿大PISA及全球校數不屬本校成績，未拿來評價康城幼兒成果。",
    sources: [
      { label: "楓葉小熊：理念與雙語", scope: "加拿大及香港雙語教育、遊戲學習與全人方向；未明確中文語音比例。", url: "https://www.maplebear.hk/" },
      { label: "楓葉小熊：康城聯絡", scope: "領都L1及26998588；其他校舍不混入。", url: "https://www.maplebear.hk/contact" },
    ],
    features: { title: "課程特色｜雙語與遊戲學習", featured: true, details: [
      { label: "用遊戲和日常對話接觸雙語", value: "校方以英語及中文沉浸式環境，結合加拿大與香港教育方向，透過遊戲發展身體、認知、情緒及社交。家長可向康城校舍確認中文語音、兩位語言教師如何分工，以及日常對話和活動各佔多少時間，不由品牌名稱推定全英。", sourceUrl: "https://www.maplebear.hk/" },
      { label: "校內沒有戶外場地，問清體能安排", value: "康城原表列室內遊戲及音樂空間，沒有戶外場地。家庭宜看每日大肌肉、戶外體驗及雨天替代安排；官網列多個校舍與課外活動中心，不能把其他場地的設施或活動直接當作康城常規課程。", sourceUrl: kgp("6163110001") },
    ] },
  }),
  profile({
    schoolNumber: "519871", locationId: "0002", website: "https://discoverymind.edu.hk/", telephone: "29878088", schoolType: "私立獨立幼稚園", principal: "方俊雅", establishedYear: "1996", gradeSpan: grades,
    language: "校方列國際及英語／普通話雙語課程；實際組別與語言時數按愉景灣校舍確認",
    ratio: "上午1:11.2；下午未列", ratioIncludesPn: true, teacherCount: 6, classroomCount: 4, spaces: "室內及戶外遊戲場地；沒有音樂室，其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄12人，半日全年90,200元，全日為「-」；沒有暫託及延長服務。當屆PN費率及組別另確認。",
    feeSummary: "K1至K3半日全年99,550元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年99,550元、11期，全日為「-」；PN及其他費用另核對。核准下午費率不代表當屆有下午班空缺。",
    sourceNote: "本頁為愉景灣海澄湖畔路92號102舖、校址0002，電話29878088與官網愉景灣聯絡吻合。東涌幼稚園及小學為不同校舍，課程及學位不合併。",
    sources: [{ label: "弘志：幼稚園課程", scope: "英國早期基礎階段、國際及英普雙語方向，愉景灣聯絡電話可核對。", url: "https://discoverymind.edu.hk/kindergarten/" }],
    features: { title: "課程特色｜英普探索與持續觀察", featured: true, details: [
      { label: "國際與雙語課程先分清組別", value: "校方國際課程採英國早期基礎階段框架，雙語課程以英語及普通話溝通，強調幼兒發起探索，兼顧語言、社交、情緒、體能、數學與藝術。家庭可按目標小學和孩子中文基礎，核對愉景灣當屆可選組別與日程。", sourceUrl: "https://discoverymind.edu.hk/kindergarten/" },
      { label: "從對話與觀察了解學習進展", value: "本校概覽以日常行為、軼事及孩子對話作持續目標評估，並列每學期家長面談、親子閱讀和材料創作。家長可要求教師用具體例子說明孩子的表達、合作及獨立性，並確認幼小銜接安排；機構另有小學不等於保證升讀。", period: "2026/27概覽校方申報", sourceUrl: kgp("5198710002") },
    ] },
  }),
  profile({
    schoolNumber: "216267", locationId: "0001", website: "https://www.think.edu.hk/", telephone: "27274747", schoolType: "私立獨立幼稚園", principal: "黃泰茵", establishedYear: "1994", gradeSpan: grades,
    language: "機構列雙語／三語及英語國際課程；麗港城各班的中文語音、語言分工與時間另確認",
    ratio: "上午1:9.3；下午1:1.3", ratioIncludesPn: true, teacherCount: 12, classroomCount: 8, spaces: "室內及戶外遊戲場地、音樂室；沒有其他特別室。",
    pn: "2025年9月提供2至3歲服務，收錄37人，半日全年84,600元、全日148,620元；當屆PN課程、時長及費率另確認。",
    feeSummary: "K1至K3上午79,200元、下午52,800元、全日132,000元，均11期",
    fees: "2026/27 K1至K3上午全年79,200元、下午52,800元、全日132,000元，均11期。上午下午價格不同，不概括成單一半日學費；PN及其他費用另核對。",
    sourceNote: "本頁只對應麗港城茶果嶺道99號、校號216267，保留既有朗思品牌報告連結；機構其他校舍、國際小學及總學生數不當本校數據。",
    sources: [{ label: "朗思：理念及麗港城校舍", scope: "探究互動、多語及國際課程方向、麗港城地址及1994創辦背景；組別仍須逐校確認。", url: "https://www.think.edu.hk/" }],
    features: { title: "課程特色｜探究與語言路線", featured: true, details: [
      { label: "先問所選班別服務哪條升小路線", value: "朗思官網並列雙語／三語及英語國際學前課程，希望兼顧本地與國際小學；教學強調探究及互動。家庭可請麗港城校舍說明各班中文語音、教師配置、課表和銜接年齡，再按孩子的家庭語言作選擇，不能把品牌所有課程當作同一班內容。", sourceUrl: "https://www.think.edu.hk/" },
      { label: "下午價格較低，不能自行解釋差別", value: "本校概覽上午與下午學費不同，但沒有逐項說明原因。家長應核對時長、語言組合、教材及活動是否一致，再比較接送和家庭時間；低價不等於相同服務的折扣，也不能從下午歷史比率推算當屆小班承諾。", sourceUrl: kgp("2162670001") },
    ] },
  }),
  profile({
    schoolNumber: "595543", locationId: "0001", website: "https://www.sophiekg.edu.hk/", telephone: "28119929", schoolType: "私立獨立幼稚園", principal: "董晶怡", establishedYear: "2014", gradeSpan: grades,
    language: "2022/23歷史概覽曾列英語與中文雙班主任及普通話活動；當屆安排未能核實，須向本校確認",
    ratio: "上午1:12.8；下午1:2.1", ratioIncludesPn: true, teacherCount: 10, spaces: "室內遊戲場地及音樂室；沒有戶外場地，註冊課室數與其他特別室最新資料未列。",
    pn: "2025年9月提供2至3歲服務，收錄56人，半日全年87,600元，全日為「-」；當屆費率和班別另核對。",
    feeSummary: "K1至K3半日全年85,800元、全日132,000元，均12期",
    fees: "2026/27 K1至K3上午下午全年85,800元、12期；全日132,000元、12期。PN費率與雜費另核對，不能把2022/23舊費用沿用為現況。",
    sourceNote: "本頁是浪澄灣8至10號、校號595543。最新概覽課程欄缺詳細文本，官網瀏覽本次受限；歷史課程僅作明確標年的參考，未驗證仍沿用。官網搜尋頁的2026/27、2027/28招生提示不能證明各級仍有空缺。",
    sources: [{ label: "蔚思：2022/23官方歷史概覽", scope: "只支持當年繪本專題、英中雙班主任及普通話活動；不作當屆師資、課室數、費率或課程證明。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/595543c-0001.pdf" }],
    features: { title: "課程資料｜歷史方向與當屆核實", featured: true, details: [
      { label: "曾以繪本和專題培養表達", value: "2022/23官方概覽中，校方曾以繪本故事、互動及專題研習，讓孩子思考、探索、合作和解難，英語與中文教師擔任雙班主任，普通話另以故事、遊戲和兒歌教授。這是歷史方向，家長應索取當屆課表和教師分工，再判斷是否符合孩子的語言需要。", period: "2022/23歷史資料；尚未確認當屆沿用", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/595543c-0001.pdf" },
      { label: "目前可確認的數字與課程分開看", value: "最新概覽可確認本頁列出的費率、人員和幼兒服務，但課程內容缺詳細文本。家庭可向校方確認閱讀、書寫、評估及幼小銜接的實際安排，尤其全日與半日的活動及休息差別；不以舊課程、舊場地或升小名單替代當屆說明。", sourceUrl: kgp("5955430001") },
    ] },
  }),
  profile({
    schoolNumber: "622982", locationId: "0001", website: "https://oasiskindergarten.com/", telephone: "28919897", schoolType: "私立獨立幼稚園", principal: "駱詠詩", establishedYear: "2023", gradeSpan: grades,
    language: "官網標示英語60%、普通話及粵語各20%；屬校方宣傳口徑，適用班別與課時計法另確認",
    ratio: "上午1:10.5；下午未列", ratioIncludesPn: true, teacherCount: 6, classroomCount: 9, spaces: "有室內及戶外遊戲場地、音樂室；其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄14人，半日全年55,000元，全日為「-」；沒有2歲以下服務。官網另有playgroup，不能直接當成本校號的育嬰服務。",
    feeSummary: "K1至K3半日全年56,100元／11期；沒有全日費率",
    fees: "2026/27 K1至K3上午下午全年56,100元、11期，全日為「-」；官網K1至K3月費5,100元、11期可互相對應。PN歷史55,000元與官網月費5,000元、11期一致，但當屆核准及雜費仍須確認。",
    sourceNote: "華景商場21號及1樓1號與官網地址一致；本校號概覽創校2023，官網自述品牌2010／15年經驗不替代本校創校年。官網95%升名小未有可核分母，未收錄成果宣稱。",
    sources: [
      { label: "奧基：課程、語言及費用", scope: "華景地址、校方語言比例、11期月費及遊戲方向；95%成果宣稱未採用。", url: "https://oasiskindergarten.com/" },
      { label: "奧基：2026/27英文概覽課程", scope: "中文版寫沒有中文資料，英文版另有主題進度和每月生活報告；課程內容依英文原文。", url: "https://kgp2026.kindergartenprofile.com/en/school/?schid=6229820001" },
    ],
    features: { title: "課程特色｜生活主題與三語", featured: true, details: [
      { label: "英文概覽有具體主題進度", value: "校方英文概覽按學期編排自己、家庭、食物、交通、季節、社區及自然環境等主題，採主題教學，並向家長提供每月生活報告。家長可用近期主題詢問孩子做了哪些遊戲與觀察，以及教師如何回饋適應和表達；中文版缺文字不等於沒有公開課程。", period: "2026/27英文概覽校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/en/school/?schid=6229820001" },
      { label: "英語比重較高的自述須落到課表", value: "官網標示英語60%、普通話和粵語各20%，並列遊戲、故事、音樂和日常對話。重視英語又希望保留中文的家庭，可索取所選年級課表，確認百分比是課程、活動還是接觸時間；這些校方標示不等於孩子入學後的語言能力保證。", sourceUrl: "https://oasiskindergarten.com/" },
    ] },
  }),
  profile({
    schoolNumber: "158569", locationId: "0001", website: "https://www.haynienkg.edu.hk/", telephone: "26487073", principal: "張銀英", establishedYear: "1989", gradeSpan: grades,
    language: "本校列雙語班、外籍英語教師及故事拼音日常互動；中文語音與逐級時數另確認",
    ratio: "上午1:10.1；下午1:10.4", ratioIncludesPn: true, teacherCount: 14, classroomCount: 7, spaces: "室內遊戲場地、音樂室、軟積木、親子圖書區、攀爬牆及牆上遊戲區；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄37人，半日全年36,575元，全日為「-」；沒有幼兒中心資助、暫託及延長時間服務。當屆費率另確認。",
    feeSummary: "K1至K3半日免費；全日全年6,941元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日全年6,941元、11期。PN、膳食及用品另計，不能把半日免費套到PN。",
    sourceNote: "校名含九龍城浸信會，但本校在沙田廣源邨廣榕樓；官網地址及26487073吻合，不與九龍城其他幼稚園混合。官網24/25雙語班公告屬歷史背景，現行安排另依本校最新概覽核對。",
    sources: [{ label: "禧年：學校官網與聯絡", scope: "廣源邨現址、電話及雙語班訊息入口；公告各自按年度看。", url: "https://www.haynienkg.edu.hk/" }],
    features: { title: "課程特色｜雙語與混齡體驗", featured: true, details: [
      { label: "英語融入故事、遊戲和日常", value: "本校概覽雙語班由外籍英語老師透過故事、拼音、音樂、體能及師生互動培養聽說讀寫；主題和專題配合混齡體驗，讓不同年齡孩子互相引導。家庭可問清混齡出現在哪些時段、各年齡如何分工，以及中文語音如何安排。", period: "2026/27概覽校方申報", sourceUrl: kgp("1585690001") },
      { label: "品格與情緒支援看日常做法", value: "校方以基督教品格、服務及關愛為方向，並列駐校社工、護士、新生與升小適應，配合觀察檔案、家長觀課和面談。家長可請教師描述孩子衝突或情緒低落時的處理方式，再判斷是否適合家庭的教養方式。", period: "2026/27概覽校方申報", sourceUrl: kgp("1585690001") },
    ] },
  }),
  profile({
    schoolNumber: "621986", locationId: "0001", website: "https://llhome.org.hk/chi/llhhkghk_home.html", telephone: "28336675", principal: "駱秋燕", establishedYear: "2023", gradeSpan: grades,
    language: "校方列中、英、普全語文及雙語繪本；粵語／普通話主課分工與時數另確認",
    ratio: "上午1:8.4；下午1:6.5", ratioIncludesPn: true, teacherCount: 10, classroomCount: 6, spaces: "室內遊戲場地、音樂室、攀爬牆、感官活動區與感官牆、親子閱讀區及小舞台；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄35人，半日全年30,800元、全日51,700元；沒有幼兒中心資助、暫託及延長服務。當屆費率和名額另確認。",
    feeSummary: "K1至K3半日免費；全日全年12,400元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日全年12,400元、10期。PN及膳食用品另計，不能把光愛其他校舍費率套用。",
    sourceNote: "官網明列校號621986、顯徑顯貴樓KG01及G01、28336675，與本校概覽吻合。網站頁腳荔景山路為機構聯絡，不當成本校地址；首頁2026/27 PN及K1招生提示不當作2027/28公告。",
    sources: [{ label: "光愛樂顯徑：學校主頁", scope: "顯徑校號、校舍聯絡、校訓及明確標年招生入口；機構頁腳與本校分開。", url: "https://llhome.org.hk/chi/llhhkghk_home.html" }],
    features: { title: "課程特色｜繪本、探索與正向教育", featured: true, details: [
      { label: "六類校園活動貫穿生活主題", value: "顯徑校方以繪本、探知、遊戲、彩虹、健康和藝術六類方向統整生活主題，透過雙語繪本、探索和同伴分享發展語言與解難；音樂及藝術亦有不同演出體驗。家長可請教師用一個主題說明各項活動如何連接，而不只看活動名稱。", period: "2026/27概覽校方申報", sourceUrl: kgp("6219860001") },
      { label: "正向與信仰如何落在孩子日常", value: "校方把聖經真理與正向教育結合，並列新生、小一適應、個別差異支援小組及學期末家長面談。家庭可詢問教師如何回應孩子的挫折、合作和情緒，並核對需要支援時的安排；全語文是教學方式，不能解作全英語授課。", period: "2026/27概覽校方申報", sourceUrl: kgp("6219860001") },
    ] },
  }),
];

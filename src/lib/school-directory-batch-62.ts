import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}`;
const noPn = "概覽列明沒有提供2至3歲幼兒服務，亦沒有收錄該年齡兒童；此為2025年9月資料，下一屆級別供應仍以校方公告為準。";

export const KINDERGARTEN_BATCH_62: PilotSchool[] = [
  profile({
    schoolNumber: "157643", locationId: "0001", website: "https://www.greenville.edu.hk/Kindergarten/", telephone: "24877334", principal: "吳凱珊", establishedYear: "1984",
    language: "校方重視英語接觸與閱讀；粵語／普通話／英語逐級課時未公開",
    ratio: "上午1:12.0；下午1:4.5", ratioIncludesPn: false, teacherCount: 5, classroomCount: 6, spaces: "多功能活動室。", pn: noPn,
    feeSummary: "半日免費；K2、K3全日班全年20,020元／10期",
    fees: "K1至K3上午及下午班扣減政府資助後免費；K2及K3全日班全年20,020元、10期。K1全日班費用格為「-」，不推定有開設；膳食及書簿等費用另核對。",
    sourceNote: "本頁對應葵芳校舍。官網聯絡頁仍有2024/25及2025/26舊收費／收生資料，費用採用2026/27概覽，不混合不同年度。",
    sources: [{ label: "嘉言中英文幼稚園：聯絡及收費頁", scope: "校址和電話可交叉確認；頁內舊年度收費只作歷史資料。", url: "https://www.greenville.edu.hk/Kindergarten/contactUs" }],
    features: { title: "課程特色｜生活主題與閱讀", featured: true, details: [
      { label: "把生活習慣、英語接觸和閱讀放進主題活動", value: "2026/27概覽所載校方資料列出主題綜合及設計教學，並重視生活習慣、圖書閱讀、英語接觸、創意思維和解難。家庭可留意孩子是否在活動中有提問、選擇和表達的機會；課程名稱本身不能說明每天的操練量或語言比例。", period: "2026/27概覽校方申報", sourceUrl: kgp("1576430001") },
      { label: "用三年學習檔案連續追蹤發展", value: "校方申報採持續學習評估，為幼兒建立三年學習檔案紀錄冊；另列家長觀課、新生適應及升小銜接。家長可詢問檔案多久更新、如何討論孩子的強弱項，以及升小銜接包含哪些實際活動。", period: "2026/27概覽校方申報", sourceUrl: kgp("1576430001") },
    ] },
  }),
  profile({
    schoolNumber: "131466", locationId: "0001", website: "https://www.stpaulchurchkg.edu.hk/", telephone: "24533766", principal: "梁慧芬", establishedYear: "1950",
    language: "公開課程資料未列粵語／普通話／英語逐級課時，請向校方確認",
    ratio: "上午1:9.0；下午1:5.4", ratioIncludesPn: false, teacherCount: 22, classroomCount: 12, spaces: "有蓋操場、校園電視台。", pn: noPn,
    feeSummary: "上午及下午班免費；概覽未列全日班學費",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各格為「-」。書簿、校服及接送費不等於免費，應按當屆清單核對。",
    sourceNote: "本頁為己連拿利校址，並非其他以聖保羅命名的學校。教育局分區名錄、概覽及校方網站均列電話24533766，按原文保留，不因號碼格式自行改動。",
    sources: [
      { label: "聖保羅堂幼稚園：校方聯絡資料", scope: "己連拿利校址、官方電話及非華語家庭查詢安排。", url: "https://www.stpaulchurchkg.edu.hk/index.php/section/school/1096" },
      { label: "教育局中西區名錄（2026-09-30）", scope: "校號131466／校址0001、地址、電話及班制。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-cw.html" },
    ],
    features: { title: "課程特色｜品德與生活應用", featured: true, details: [
      { label: "基督教品格教育配合活動與實地參觀", value: "校方在2026/27概覽中提出基督化全人教育，以生活主題貫通學習範疇，透過遊戲、自主探索和實地參觀累積經驗。家長可在參觀時了解宗教活動如何融入日常，並觀察教師如何把規則、關懷和自理放進生活情境。", period: "2026/27概覽校方申報", sourceUrl: kgp("1314660001") },
      { label: "單元及學期評估並行，適應與升小支援另列", value: "校方申報每個主題有單元評估，上下學期各有一次總結報告，並透過持續觀察提供回饋；新生支援包括親子上學日，升小支援列有小一體驗及校友分享。這些安排可幫助家庭了解適應節奏，實際頻率及參與年級仍應向校方確認。", period: "2026/27概覽校方申報", sourceUrl: kgp("1314660001") },
    ] },
  }),
  profile({
    schoolNumber: "323497", locationId: "0001", website: "https://www.buddhist-kam-lai-kg.edu.hk/", telephone: "23465162", principal: "楊劍欽", establishedYear: "1973",
    language: "校方把兩文三語融入話劇與活動；逐級語言比例未公開",
    ratio: "上午1:8.9；下午1:6.8", ratioIncludesPn: false, teacherCount: 27, classroomCount: 8, spaces: "玩具圖書館、兒童烹飪室、圖書館、英語／普通話活動室、音樂室、體能室及科研探索區等。", pn: noPn,
    feeSummary: "上午及下午班免費；概覽未列全日班學費",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班費用格為「-」。興趣活動、書簿及校服等另核對。",
    sourceNote: "教育局登記及校方均指向藍田康雅苑校舍。官網的480+學生、38+教職員屬未標統計年度宣傳數字，本頁沒有把它們與2025年9月概覽統計合併。",
    sources: [{ label: "佛教金麗幼稚園：校方課程與聯絡", scope: "故事、遊戲、兩文三語話劇及玩具圖書館等校方自述；未標學年的宣傳人數不作現行統計。", url: "https://www.buddhist-kam-lai-kg.edu.hk/" }],
    features: { title: "課程特色｜故事、遊戲與話劇", featured: true, details: [
      { label: "故事綜合與遊戲並用", value: "2026/27概覽列校方採用故事綜合及遊戲學習，把課程內容放進故事、操作和遊戲情境。校方官網另介紹以玩具圖書館的遊戲材料支持探索。家長可觀察材料是否讓孩子反覆嘗試和討論，而不只看設施名稱。", period: "2026/27概覽及校方課程頁", sourceUrl: kgp("3234970001") },
      { label: "以話劇練習兩文三語表達", value: "校方表示把兩文三語融入話劇表演，讓孩子接觸角色、語言表達與合作。這是具體的活動方向，但公開資料未列普通話或英語每週時數；家庭應確認語言教師、班別及表演機會是否適用於申請年級。", sourceUrl: "https://www.buddhist-kam-lai-kg.edu.hk/" },
    ] },
  }),
  profile({
    schoolNumber: "600814", locationId: "0001", website: "https://www.montessori-ami.edu.hk/", telephone: "28129668", schoolType: "私立獨立國際幼稚園", gradeSpan: "DMA愉景灣校舍3至6歲學前課程；集團其他校舍及小學部另核對",
    language: "校方列英語及普通話雙語蒙特梭利課程；按DMA愉景灣班別確認",
    ratio: "上午1:4.6；下午1:2.4", ratioIncludesPn: false, teacherCount: 5, spaces: "概覽未列課室數及其他場地資料；以DMA愉景灣校舍導賞核對。", pn: noPn,
    feeSummary: "半日全年109,780元／11期；全日160,600元／11期",
    fees: "2026/27概覽列K1至K3半日班全年109,780元、11期；全日班全年160,600元、11期，沒有參加幼稚園教育計劃。其他一次性款項及雜費須核對校方DMA學前班收費表。",
    sourceNote: "本頁是愉景灣北1座DMA校址。集團同時介紹DMS其他校舍的1至3歲課程及DMA小學部，這些資料不直接套用到本校號的學前班；IB認證及小學課程也不轉述成幼稚園升學保障。",
    sources: [
      { label: "Discovery Montessori：DMS與DMA課程", scope: "校方對DMA3至6歲學前、6至12歲小學及英普雙語蒙特梭利的說明；需區分學段與校舍。", url: "https://www.montessori-ami.edu.hk/" },
      { label: "教育局離島區名錄（2026-09-30）", scope: "DMA校號600814／校址0001、愉景灣北1座地址及電話。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-i.html" },
    ],
    features: { title: "課程特色｜英普雙語蒙特梭利", featured: true, details: [
      { label: "重視操作、自主和連貫的學習環境", value: "校方把DMA學前課程定位為英語及普通話雙語蒙特梭利，以準備好的環境及實物、感官材料支持孩子獨立探索。家庭應實地了解混齡安排、教師如何記錄進度，以及一天中自主操作和集體活動的比例。", sourceUrl: "https://www.montessori-ami.edu.hk/" },
      { label: "把學前班與集團小學部資料分開看", value: "校方同時介紹3至6歲學前及6至12歲小學課程。家長評估長線路徑時，應分別核對小學申請、學費與課程要求；集團具備多個學段，並不能單憑品牌推定幼稚園學生可自動升讀或所有校舍使用同一課表。", sourceUrl: "https://www.montessori-ami.edu.hk/" },
    ] },
  }),
  profile({
    schoolNumber: "618527", locationId: "0001", website: "http://www.guideposts.edu.hk", telephone: "26811208", principal: "邱家敏", establishedYear: "2021",
    language: "概覽未列逐級粵語／普通話／英語課時，需向南昌分校確認",
    ratio: "上午1:9.9；下午1:10.4", ratioIncludesPn: false, teacherCount: 11, classroomCount: 6, spaces: "多用途遊戲區、小組教學室、藝術展覽區、水濤角。", pn: noPn,
    feeSummary: "半日免費；全日全年17,391元／11期",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班全年17,391元、11期。膳食、校服及書簿等另核對。",
    sourceNote: "只引用海達邨南昌分校的概覽，沒有借用佳寶建生、美孚或其他分校的課程、費用和班額。校方網站瀏覽器存取受限，課程資料以教育局收錄的本分校自述為準。",
    sources: [{ label: "教育局深水埗區名錄（2026-09-30）", scope: "南昌分校校號618527、校址0001、海達邨地址及聯絡。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ssp.html" }],
    features: { title: "課程特色｜主題操作與生活技能", featured: true, details: [
      { label: "在動靜交替活動中加入解難與情緒學習", value: "南昌分校2026/27概覽的校方申報列主題綜合、分組、遊戲、角色扮演、實物觀察及戶外參觀，課程亦加入科學探索、生活技能、解難和情緒處理。家長可透過觀課了解孩子如何操作材料、與同伴協商和整理經驗。", period: "2026/27概覽校方申報", sourceUrl: kgp("6185270001") },
      { label: "以持續觀察配合幼兒發展", value: "校方申報用持續觀察記錄評估進度，讓教師和家長了解學習情況。對家庭而言，值得了解的不只是報告有多少項指標，還包括教師何時反饋，以及遇到語言、社交或適應需要時如何跟進。", period: "2026/27概覽校方申報", sourceUrl: kgp("6185270001") },
    ] },
  }),
  profile({
    schoolNumber: "158232", locationId: "0002", website: "https://www.plkkgs.edu.hk/plkynbbkg", telephone: "27010822", principal: "戴嘉雯", establishedYear: "1988",
    language: "校方申報兩文三語及遊戲式英語活動；逐級課時比例未公開",
    ratio: "上午1:11.9；下午1:7.4", ratioIncludesPn: false, teacherCount: 14, classroomCount: 6, spaces: "互動體感室、圖書館、感覺統合室、創意藝術室及戶外遊戲環境。", pn: noPn,
    feeSummary: "半日免費；全日全年18,530元／10期",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年18,530元、10期。膳食及其他學習用品費另核對。",
    sourceNote: "本頁以雍明苑雍明商場校址0002為準，沒有引用舊校址0001的規模或課程數字。創校年份是學校歷史，不代表現校舍啟用年份。",
    sources: [{ label: "保良局葉吳彬彬幼稚園：校方網站", scope: "本校校務、活動及招生入口；使用雍明苑現校址資料。", url: "https://www.plkkgs.edu.hk/plkynbbkg" }],
    features: { title: "課程特色｜多感官與遊戲探索", featured: true, details: [
      { label: "把遊戲、戲劇和多感官操作結合", value: "2026/27概覽的校方資料稱，依幼兒生活經驗、興趣和能力設計遊戲課程，配合戲劇、積木、戶外遊戲牆及互動體感等環境，讓孩子探索、提問、搜集資料和分享。家庭可觀察設施如何實際進入課堂，並詢問不同年級的使用頻率。", period: "2026/27概覽校方申報", sourceUrl: kgp("1582320002") },
      { label: "兩文三語以遊戲方式接觸，另有成長檔案", value: "校方申報透過遊戲營造兩文三語環境，並用持續評估及兒童成長檔案記錄表現。文件沒有列明英語或普通話佔整日課程的比例；若家庭特別重視語言輸入量，可連同孩子的評估回饋方式一併查詢。", period: "2026/27概覽校方申報", sourceUrl: kgp("1582320002") },
    ] },
  }),
  profile({
    schoolNumber: "615315", locationId: "0001", website: "https://www.tkk-kindergarten.edu.hk/", telephone: "26777266", principal: "談樂芹", establishedYear: "2020",
    language: "校方申報雙語班及兩文三語學習；未公開逐級語言比例",
    ratio: "上午1:8.6；下午1:10.3", ratioIncludesPn: false, teacherCount: 15, classroomCount: 6, spaces: "感統遊戲室；校方課程申報另介紹閱讀區、積木牆和活動空間。", pn: noPn,
    feeSummary: "半日免費；全日全年12,300元／10期",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年12,300元、10期。膳食和用品費另核對。",
    sourceNote: "按長沙灣凱樂苑現校舍及校號615315核對，校方網頁的活動和課程描述屬自述，未當作獨立成效評價。",
    sources: [{ label: "東華三院譚錦球伉儷幼稚園：校方網站", scope: "核對凱樂苑校址、電話及2026/27招生入口；網站部分頁面可能限制自動擷取。", url: "https://www.tkk-kindergarten.edu.hk/" }],
    features: { title: "課程特色｜中英繪本與生活態度", featured: true, details: [
      { label: "以中英文繪本和遊戲串連六大範疇", value: "2026/27概覽所載校方資料稱，運用中英文繪本和遊戲設計課程，提供雙語班及兩文三語學習經驗；透過分享時間，讓幼兒按主題練習表達。家長可了解各級如何選書、延伸操作和回饋孩子的語言進度。", period: "2026/27概覽校方申報", sourceUrl: kgp("6153150001") },
      { label: "學習態度與正念被列入校本課程", value: "校方稱其氣質教育重視良好態度、積極學習、美感、正念及適應能力，也列出校外參觀和持續觀察檔案。這些是學校希望培養的方向；家庭可在觀課時看教師如何引導孩子處理困難、輪候和同伴互動，避免只按理念名稱判斷。", period: "2026/27概覽校方申報", sourceUrl: kgp("6153150001") },
    ] },
  }),
  profile({
    schoolNumber: "540579", locationId: "0001", website: "https://mosgraceful.edu.hk/", telephone: "31247322", principal: "文彥之", establishedYear: "2001",
    language: "校方介紹每日外籍教師英語課及分組活動；普通話與整日語言比例另核對",
    ratio: "上午1:11.5；下午1:8.8", ratioIncludesPn: false, teacherCount: 17, classroomCount: 7, spaces: "圖書館、社工會客室及學習活動空間。", pn: noPn,
    feeSummary: "半日免費；全日全年13,937元／11期",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年13,937元、11期。膳食及其他費用須按當屆清單核對。",
    sourceNote: "校方網站教學介紹未標資料學年；語言活動按校方自述列出，師生比採用最新概覽的2025年9月分時段統計，不沿用網站未標年份的約1:11。",
    sources: [{ label: "崇真會美善幼稚園（馬鞍山）：學校介紹", scope: "故事教學、英語活動、作息、社工與家長支援的校方自述；頁面未標學年。", url: "https://mosgraceful.edu.hk/about-us1/" }],
    features: { title: "課程特色｜故事語文與英語活動", featured: true, details: [
      { label: "用每日故事連結聽、講、讀、寫", value: "校方以適合幼兒生活經驗的故事作課程重點，並結合活動、參觀和探索；2026/27概覽也收錄故事模式讀寫萌發課程。家長可了解教師如何按年齡選書、讓孩子表達和回顧，並確認讀寫活動是否切合孩子發展。", period: "2026/27概覽及校方介紹頁", sourceUrl: kgp("5405790001") },
      { label: "校方介紹每日20分鐘外籍教師英語課", value: "官網未標學年的介紹頁列每日20分鐘外籍教師英語課，另有分組故事和英語遊戲；頁面也列半日班三個半小時。這比「兩文三語」標籤更具體，但分組時段不能直接當作每名學生每天額外一小時英語，申請前應確認當屆級別時間表。", sourceUrl: "https://mosgraceful.edu.hk/about-us1/" },
    ] },
  }),
  profile({
    schoolNumber: "563692", locationId: "0001", website: "https://www.wwcwdkindergarten.org.hk/", telephone: "25461030", schoolType: "非牟利幼稚園暨幼兒中心", gradeSpan: "2至3歲幼兒服務及K1至K3；現行班別與服務名額另核對", principal: "温志倫", establishedYear: "1959",
    language: "校方列閱讀、故事與戲劇等語文活動；粵語／普通話／英語課時未公開",
    ratio: "上午1:11.0；下午1:11.0", ratioIncludesPn: true, teacherCount: 5, spaces: "兒童圖書館、幼兒醫學博覽館及戶外遊戲場地；概覽未列註冊課室數。",
    pn: "2025年9月列有2至3歲全日服務、收錄7名兒童，當時全年費率40,536元；列有幼兒中心資助計劃、暫托及延長服務。費率、資助資格和當屆服務名額須另問校方，7名是在讀人數，並非招生名額。",
    feeSummary: "K1至K3全日班全年4,824元／12期；PN另計",
    fees: "K1至K3全日班扣減政府資助後全年4,824元、12期；半日班費用格為「-」。這與2至3歲服務的40,536元歷史費率屬不同年齡及統計欄位，不能當作同一班別比較。",
    sourceNote: "K1至K3幼稚園學費與2至3歲幼兒服務分開列出；PN費率在2025年9月幼兒服務統計欄，沒有改標成2026/27現行費率。",
    sources: [{ label: "香港西區婦女福利會幼稚園：校方網站", scope: "必列啫士街60號校址、電話及聯絡；現行照顧服務另向校方核對。", url: "https://www.wwcwdkindergarten.org.hk/" }],
    features: { title: "課程特色｜生活探索與全日照顧", featured: true, details: [
      { label: "把語文與生活情境連結", value: "2026/27概覽的校方資料列故事、遊戲、參觀和專題研習，語文活動包括親子閱讀、朗讀、兒歌、故事演講和戲劇；另有品格及小領袖活動。家長可了解活動如何配合孩子興趣，以及幼兒是否有實際操作和分享的空間。", period: "2026/27概覽校方申報", sourceUrl: kgp("5636920001") },
      { label: "全日、PN與延展服務要分開查詢", value: "概覽列出K1至K3全日班及2至3歲服務，並在幼兒服務欄列暫托和延長照顧。對雙職家庭，這些安排比單看半日或全日標籤更實用；應逐項確認接送時間、膳食、假期服務、輪候和收費，不能把服務存在當作隨到隨有名額。", period: "2026/27概覽；幼兒服務統計為2025年9月", sourceUrl: kgp("5636920001") },
    ] },
  }),
  profile({
    schoolNumber: "623580", locationId: "0001", website: "https://lsttcb.loksintongkg.edu.hk/", telephone: "25187608", principal: "李潔文", establishedYear: "2024", gradeSpan: "PN／2至3歲服務及K1至K3；班別供應按當屆安排",
    language: "校方申報每班外籍及本地教師共同教學，另有普通話課；逐級課時另核對",
    ratio: "上午1:7.6；下午1:5.5", ratioIncludesPn: true, teacherCount: 13, classroomCount: 6, spaces: "概覽列有室內遊戲場地；其他特別室欄列沒有。",
    pn: "2025年9月列有2至3歲服務，收錄16名兒童；當時半日全年29,000元、全日58,500元，沒有列繳費期數。這是幼兒服務欄的統計與費率，2026/27或2027/28的PN費率及名額應另確認。",
    feeSummary: "K1至K3半日免費、全日全年11,750元／10期；PN另計",
    fees: "K1至K3上午及下午班扣減政府資助後免費；全日班全年11,750元、10期。PN不套用這個免費或全日費率，膳食及雜費另核對。",
    sourceNote: "學校位於白田邨朗田樓1樓。兩文三語、繪本和生活技能資料有校方及概覽文字；只呈現校方申報的教學安排，不把活動或考試個案當成全校能力保證。",
    sources: [{ label: "樂善堂董清波幼稚園：校方介紹及聯絡", scope: "白田邨校址、雙語定位、校方理念及電話；活動獎項不等同全體學生表現。", url: "https://lsttcb.loksintongkg.edu.hk/" }],
    features: { title: "課程特色｜雙語繪本與生活技能", featured: true, details: [
      { label: "外籍與本地教師共同營造雙語環境", value: "校方及2026/27概覽稱，每班設外籍及本地教師，配合繪本遊戲教學，另有普通話專科課。家長可觀察兩位教師如何分工、使用哪種中文語音，以及孩子是否能在日常活動中回應和表達；網站沒有提供逐級語言時間表。", period: "2026/27概覽及校方介紹", sourceUrl: kgp("6235800001") },
      { label: "從繪本探索延伸到親身生活經驗", value: "校方申報以具兒童文學元素的繪本作主題，再延伸專題研習、外出參觀及生活技能，讓孩子整理經驗並應用。這對重視操作和表達的家庭有參考價值，參觀時可追問具體單元和活動頻率，避免只按「雙語」或「體驗式」名稱作選擇。", period: "2026/27概覽校方申報", sourceUrl: kgp("6235800001") },
    ] },
  }),
];

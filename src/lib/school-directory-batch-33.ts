import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(schoolNumber: string, year: string, note: string, website: string, sources: PilotSchool["sources"], details: NonNullable<PilotSchool["detailSections"]>): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear: year, sourceNote: note, replaceDirectoryDetails: true, website, sources, detailSections: details };
}

/** Kindergarten profile batch 33: ten distinct active schools, checked against the EDB registry. */
export const KINDERGARTEN_BATCH_33: PilotSchool[] = [
  profile("151696", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與招生：查閱於2026-10", "萊恩幼稚園（元朗）同時提供英文部及雙語多元智能部，另有本地與非本地教程選擇。選校時應先確認所申請班別及課程版本；校方介紹不能代替課堂觀察，公開資料亦未列各語言每週課時。", "https://www.st-lorraine.edu.hk/zh/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號151696、元朗西菁街校址與登記狀態；位置資料截至2026-09-30，登記資料查閱於2026-10。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "上午／下午班、概覽授課語言及師生比例；不據此推算每班人數或語言課時。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1516960001" },
    { label: "萊恩幼稚園（元朗）：教程資料", scope: "元朗校舍英文部與雙語多元智能部的課程名稱及班別；未提供各語言逐週課時。", url: "https://www.st-lorraine.edu.hk/applicationform/%E8%90%8A%E6%81%A9%E8%8B%B1%E6%96%87%E5%B9%BC%E7%A8%9A%E5%9C%92%28%E5%85%83%E6%9C%97%29%E6%95%99%E7%A8%8B.pdf" },
    { label: "萊恩教育機構：入學申請", scope: "校方鼓勵家長親訪，並稱校長會面見申請家庭；學額及安排以所申請校舍當屆通知為準。", url: "https://www.st-lorraine.edu.hk/zh/Admission.html" },
    { label: "萊恩教育機構：中文課程", scope: "校方對中文口語及普通話課程的自述；屬機構課程介紹，不代表已核實的教學成效。", url: "https://www.st-lorraine.edu.hk/zh/chinese.html" },
  ], [{ title: "先選課程路線，再比較語言環境", featured: true, note: "元朗校舍資料與機構課程介紹分開理解；「英文部」或「雙語」名稱不等於已公布的語言時數。", details: [
    { label: "元朗校舍列出兩種教程方向", value: "校方教程表把元朗校舍班別分為非本地課程英文部，以及雙語多元智能部。這是選校前最需要問清的一項：課程名稱、使用語言及班別安排不同，不能只憑校名判斷孩子每天接觸英語或普通話的比例。", sourceUrl: "https://www.st-lorraine.edu.hk/applicationform/%E8%90%8A%E6%81%A9%E8%8B%B1%E6%96%87%E5%B9%BC%E7%A8%9A%E5%9C%92%28%E5%85%83%E6%9C%97%29%E6%95%99%E7%A8%8B.pdf" },
    { label: "校方把藝術、科學和語文列為發展重點", value: "萊恩教育機構介紹藝術、科學及語文三個核心領域，並提供多元教程。這說明機構的課程取向；家長仍應在元朗校舍參觀，查看實際課室活動、每日時間表及額外費用。", sourceUrl: "https://www.st-lorraine.edu.hk/zh/" },
    { label: "申請前安排校舍面談與課程核對", value: "校方鼓勵家長到校了解，並表示校長會接見申請學童和家長，但亦提醒學額有限、未必能即時安排所有家庭。建議先確認面見日期、申請班別及課程版本，再問明語言時數、收費和校車路線。", sourceUrl: "https://www.st-lorraine.edu.hk/zh/Admission.html" },
  ] }]),

  { ...profile("151947", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與收費：2026/27", "聖公會青山聖彼得堂幼稚園（青雲路）以主題探研、自由探索和專科英語／普通話活動作為校方公開特色，並提供半日與全日班。校方同一網站亦介紹另一註冊校址及幼兒中心；本頁只取校號151947、校址0001（青雲路22號D、E座）資料。", "https://www.skhspcmain.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號151947及校址0001的登記身份、屯門青雲路地址與註冊狀態；不與同址其他牌照合併。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "本校址班制、授課語言、師生比例與學費欄位；與同址校號566179分開。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1519470001" },
    { label: "聖公會青山聖彼得堂幼稚園：教學模式", scope: "主題教學、探索活動、英語／普通話專科活動、奧福音樂及品格生命教育的校方介紹。", url: "https://www.skhspcmain.edu.hk/teaching-mode/" },
    { label: "聖公會青山聖彼得堂幼稚園：2026/27學校資料", scope: "本校號學費、註冊費、課室時間及代辦用品費；區分幼稚園與相鄰幼兒中心。", url: "https://www.skhspcmain.edu.hk/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/" },
    { label: "聖公會青山聖彼得堂幼稚園：2027/28 K1招生", scope: "當屆K1申請安排；2026年9月申請期已過，下一屆日期須待校方公布。", url: "https://www.skhspcmain.edu.hk/k1%E7%8F%AD%E6%8B%9B%E7%94%9F%E5%AE%89%E6%8E%92-2/" },
  ], [{ title: "探索式課程與同址校牌照辨別", featured: true, note: "校方網站同時介紹青雲路幼稚園、另一所幼稚園及幼兒中心；收費與班制只引用教育局校號151947的0001校址。", details: [
    { label: "主題探研後安排分享", value: "校方以主題教學和探研活動引導幼兒觀察、提問，再分享成果；並鼓勵家長參與部分校園活動。這種安排較重視過程表達和探索，家長可到校觀察教師如何引導提問，以及孩子是否有充足自由操作時間。", sourceUrl: "https://www.skhspcmain.edu.hk/teaching-mode/" },
    { label: "英語和普通話有每日專科活動", value: "校方介紹由專科外語教師透過故事、遊戲和角色扮演進行英語及普通話活動，但未公布每日各語言時數。若家庭目標是較高英語沉浸度，應索取申請班別時間表，不能只按「兩文三語」定位推斷比例。", sourceUrl: "https://www.skhspcmain.edu.hk/teaching-mode/" },
    { label: "全日班成本包含學費及膳食", value: "校方2026/27資料把全日班收費拆為學費與膳食，另列校服、茶點、課本及作業等用品費；半日班學費列為免費。申請前應按實際班別核對最新收費表，並把自願代辦項目與學費分開計算。", period: "2026/27學年；校址0001", sourceUrl: "https://www.skhspcmain.edu.hk/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99/" },
  ] }]), omitDirectorySourceUrls: ["http://www.spckg.edu.hk/jing/jing.html"] },

  profile("132896", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與校務：查閱於2026-10", "聖士提反女子中學附屬幼稚園採兒童為本的主題課程，融合音樂、美藝、感官探索和家長觀課；校方亦公布持續觀察、作品紀錄及學習評估。地址與班制以幼稚園本身為準，不把附屬小學或中學資料當作升學保證。", "https://ssgckg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號132896、柏道33號幼稚園校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽語言、師生比例及免費計劃費用；數據按幼稚園校址。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1328960001" },
    { label: "聖士提反女子中學附屬幼稚園：校本課程與支援", scope: "兒童為本主題教學、課程範疇、評估、家長參與與非華語幼兒支援的校方資料。", url: "https://ssgckg.edu.hk/en/objectives/" },
    { label: "聖士提反女子中學附屬幼稚園：校舍及班制", scope: "學年時間、上午／下午班與級別的校方介紹；屬公開頁面資料。", url: "https://ssgckg.edu.hk/en/schoolprofile/" },
    { label: "聖士提反女子中學附屬幼稚園：校方首頁及活動", scope: "近期活動紀錄與校園生活入口，僅反映已公布活動。", url: "https://ssgckg.edu.hk/" },
  ], [{ title: "主題教學、藝術整合與家長觀課", featured: true, note: "課程特色及學習評估為校方自述；活動機會和個別支援需按孩子情況及當屆安排確認。", details: [
    { label: "生活經驗轉化為主題課程", value: "校方以兒童生活經驗和發展需要編排主題，配合故事、音樂、美術及感官活動。這種整合式安排讓語文、早期數學和創意活動在同一主題中交織；參觀時可問教師如何照顧不同語言背景和發展步伐。", sourceUrl: "https://ssgckg.edu.hk/en/objectives/" },
    { label: "評估依靠日常觀察與作品紀錄", value: "學校表示會綜合日常觀察、作品和總結性評估了解幼兒發展，並以此規劃課程。家長可進一步確認評估結果會如何回饋家庭，以及家長觀課、工作坊和閱讀活動的頻率。", sourceUrl: "https://ssgckg.edu.hk/en/objectives/" },
    { label: "非華語支援有明確溝通安排", value: "校方表示可提供中英文申請資料，並會按非華語幼兒的語言能力調整學習內容，也可安排懂中文親友陪同面見。這是校方公開的支援方向；個別家庭應預先聯絡學校確認可提供的語言和流程。", sourceUrl: "https://ssgckg.edu.hk/en/objectives/" },
  ] }]),

  profile("132870", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與招生：查閱於2026-10", "協恩中學附屬幼稚園的校方課程介紹包括兩文三語、多元智能及親子伴讀；教育局概覽列上午、下午班及粵語授課。附屬中學的名氣不等於幼稚園畢業生直升或保證升學，家長應分開評估課程適配與升小路徑。", "https://www.hykg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號132870、九龍城農圃道1號及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "上午／下午班、概覽授課語言及師生比例；不能推算普通話或英語比重。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1328700001" },
    { label: "協恩中學附屬幼稚園：課程特色", scope: "親子伴讀、學習評估、兩文三語及多元智能等校方課程介紹。", url: "https://www.hykg.edu.hk/" },
    { label: "協恩中學附屬幼稚園：招生申請", scope: "當屆招生入口；首頁所列2026/27招生消息屬上一屆，不作2027/28日期依據。", url: "https://www.hykg.edu.hk/%E7%94%B3%E8%AB%8B%E5%85%A5%E5%AD%B8/" },
  ], [{ title: "親子伴讀、三語目標與升小判斷", featured: true, note: "「兩文三語」是校方課程方向，公開資料未列逐週語言課時；附屬中學關係不代表幼稚園升小保證。", details: [
    { label: "校方重視親子伴讀與持續了解學習", value: "學校課程頁建議家長在家與孩子伴讀，並以學習評估了解成長；這意味家校合作不只看校內活動，也需要家庭投入閱讀和觀察。家長宜問清楚評估回饋方式，以及家庭是否需要配合指定閱讀或活動。", sourceUrl: "https://www.hykg.edu.hk/" },
    { label: "校方提出兩文三語與多元智能", value: "校方把中英語言發展和多元智能列為課程特色；教育局概覽將授課語言列為粵語。兩者描述層次不同，不能把課程標語解讀為英語或普通話主導，建議索取K1實際時間表。", sourceUrl: "https://www.hykg.edu.hk/" },
    { label: "不要把附屬關係當作直升安排", value: "學校名稱與協恩中學相連，但本次可查的幼稚園資料沒有建立畢業生直升中學制度。若家庭重視升學銜接，應分別核對小學派位、校本申請與中學收生政策，不以幼稚園品牌推定結果。", sourceUrl: "https://www.hykg.edu.hk/" },
  ] }]),

  profile("588130", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與招生：2027/28", "德望小學暨幼稚園幼稚園部以基督精神、主題和分區活動推行全人教育，並重視家校合作。2027/28 K1申請已截止；幼稚園與同校小學的收生屬不同階段，不能把幼稚園學額或畢業生去向理解為小學直升承諾。", "https://www3.ghs.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號588130、扎山道校址與幼稚園部登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言及師生比例；學費與小學部收費分開。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5881300001" },
    { label: "德望小學暨幼稚園：幼稚園課程", scope: "校方基督精神、全人教育、主題與分區活動及家校合作的自述。", url: "https://www3.ghs.edu.hk/about/curriculum/" },
    { label: "德望小學暨幼稚園：K1招生", scope: "2027/28幼稚園K1申請已截止；不代表下一屆日期。", url: "https://www3.ghs.edu.hk/admission/" },
    { label: "德望小學暨幼稚園：學校歷史", scope: "幼稚園部重辦及校名沿革。", url: "https://www3.ghs.edu.hk/about/history/" },
  ], [{ title: "主題活動與家校合作", featured: true, note: "校方把全人教育及品格目標作辦學自述；活動形式與收生政策需按幼稚園部當屆公告確認。", details: [
    { label: "主題與分區活動承載全人教育", value: "校方以主題教學和分區活動培養幼兒的語文能力、探索興趣及品格，並強調愛心、希望、喜樂和感恩。參觀時可觀察孩子是否有實際選擇和操作時間，也可問教師如何把品格教育落實到日常相處。", sourceUrl: "https://www3.ghs.edu.hk/about/curriculum/" },
    { label: "家校合作是校方課程理念的一部分", value: "校方指出家庭教育和親子關係會影響幼兒成長，期望家長與學校合作。這對重視家校溝通的家庭有吸引力，也意味家長應先了解溝通渠道、家長活動頻率和家庭配合要求。", sourceUrl: "https://www3.ghs.edu.hk/about/curriculum/" },
    { label: "2027/28 K1已停止接受申請", value: "校方招生頁明示2027/28 K1申請期已結束。若仍有意報讀，應直接查詢候補或其他年級插班安排；不要把已結束的報名日期套用至下一屆。", period: "2027/28 K1招生", sourceUrl: "https://www3.ghs.edu.hk/admission/" },
  ] }]),

  profile("324647", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生資料：2026/27（歷史招生周期）", "聖馬可堂白普理幼稚園於2013年復辦，以基督教信仰、品行、自信和獨立思考為校方定位。公開的2026/27招生文件曾列親子面見觀察項目與優先考慮類別；該屆面試已完成，不能當作下一屆政策。", "https://stmarkschurch.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號324647、何文田石鼓街校址與註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "上午、下午及全日班、概覽授課語言與師生比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3246470001" },
    { label: "聖馬可堂白普理幼稚園：辦學理念", scope: "2013年復辦及培養品行、愛主愛人愛學習、自信與獨立思考的校方自述。", url: "https://stmarkschurch.edu.hk/" },
    { label: "聖馬可堂白普理幼稚園：2026/27收生安排", scope: "該屆K1名額、親子面見觀察項目、優先考慮及候補安排；屬已完成的歷史招生周期。", url: "https://stmarkschurch.edu.hk/wp-content/uploads/2025/09/2026-2027_%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92_%E4%B8%AD%E8%8B%B1%E7%A8%BF.pdf" },
    { label: "聖馬可堂白普理幼稚園：入學申請頁", scope: "2026/27面見已完成及插班資訊入口。", url: "https://stmarkschurch.edu.hk/%E5%85%A5%E5%AD%B8%E5%8F%8A%E7%94%B3%E8%AB%8B/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "親子面見看互動，不宜臨時操練", featured: true, note: "面見細節只引述2026/27已完成的校方文件；下一屆收生要求需待新公告。", details: [
    { label: "親子面見重視孩子在活動中的反應", value: "2026/27招生文件列出禮貌、守規、情緒、對答和活動投入度等觀察面向。對家長而言，準備重點是讓孩子熟悉與成人交流和參與遊戲，而非背誦答案；但這些項目只代表該屆校方文件。", period: "2026/27招生文件；面見已於2025-11完成", sourceUrl: "https://stmarkschurch.edu.hk/wp-content/uploads/2025/09/2026-2027_%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92_%E4%B8%AD%E8%8B%B1%E6%96%87%E7%A8%BF.pdf" },
    { label: "校方曾列兄姊及教友子女優先考慮", value: "該屆文件列現讀生或畢業生弟妹、聖馬可堂教友子女為優先考慮，並提到全日班有需要家庭會優先處理。家長須等候下一屆文件確認規則是否延續，不能把優先考慮視為取錄保證。", period: "2026/27招生安排", sourceUrl: "https://stmarkschurch.edu.hk/wp-content/uploads/2025/09/2026-2027_%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92_%E4%B8%AD%E8%8B%B1%E6%96%87%E7%A8%BF.pdf" },
    { label: "課程目標偏品行與主動學習", value: "校方表示希望培養幼兒愛主、愛人、愛學習的態度，以及自信和獨立思考。參觀時可把抽象目標轉為可觀察問題：孩子能否自主選擇活動、教師如何處理衝突，以及學校如何向家庭回饋品格發展。", sourceUrl: "https://stmarkschurch.edu.hk/" },
  ] }]),

  profile("158780", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方招生與課程：2027/28", "保良局莊啓程夫人幼稚園提供K1至K3半日及全日班，校方以兒童為中心、遊戲和親手探索為課程重點，並公布2027/28新生安排。全日班的校方收費頁另列膳食費；半日免費不代表全日班或代辦用品均免費。", "https://www.plkkgs.edu.hk/plkmrsvckg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158780、粉嶺華明邨耀明樓地址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及學費欄位；校方實際費用按當屆資料核對。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1587800001" },
    { label: "保良局莊啓程夫人幼稚園：課程特色", scope: "兒童中心、遊戲、親手操作與探索的校方介紹。", url: "https://www.plkkgs.edu.hk/plkmrsvckg/hk/about/38" },
    { label: "保良局莊啓程夫人幼稚園：2027/28入學申請", scope: "新生報名入口及非華語家庭傳譯支援說明；實際日期以當屆文件為準。", url: "https://www.plkkgs.edu.hk/plkmrsvckg/hk/custom/custom_page/76" },
    { label: "保良局莊啓程夫人幼稚園：基本資料及收費", scope: "校方公開班制、上課時間及2024/25收費基準；費用不可作2026/27現行價。", url: "https://www.plkkgs.edu.hk/plkmrsvckg/en/about/39" },
  ], [{ title: "遊戲探索、半日／全日選擇與家庭成本", featured: true, note: "校方基本資料頁展示2024/25費用，2027/28招生資料較新；不要把舊收費當作目前報價。", details: [
    { label: "幼兒透過遊戲親手操作和探索", value: "校方表示按幼兒能力與興趣安排活動，透過遊戲和環境設計讓孩子操作、探索並建構新知識。這種安排適合希望幼兒在活動中學習的家庭；參觀時可觀察孩子是否有主動選擇和延續探索的空間。", sourceUrl: "https://www.plkkgs.edu.hk/plkmrsvckg/hk/about/38" },
    { label: "全日班要把膳食和用品另行計算", value: "校方基本資料列K1至K3半日及全日班；其公開收費頁的2024/25資料顯示半日班免費，全日班另收學費和膳食費。這是舊年度參考，報名時應索取2027/28當屆學費、餐費、書簿和校服清單。", period: "班制資料查閱於2026-10；收費頁標示2024/25", sourceUrl: "https://www.plkkgs.edu.hk/plkmrsvckg/en/about/39" },
    { label: "非華語家庭可先確認面見語言支援", value: "校方招生頁表示可按需要安排傳譯或翻譯服務，也容許家長和孩子由懂中文親友陪同面見。家庭應在提交申請前聯絡學校，確認可提供的語言及預約方式。", sourceUrl: "https://www.plkkgs.edu.hk/plkmrsvckg/hk/custom/custom_page/76" },
  ] }]),

  profile("605620", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程：查閱於2026-10", "救世軍水泉澳幼稚園以兒童為本，將專題研習、自由遊戲、蒙特梭利活動和生命教育放入課程；校方說明K1與K2至K3的蒙特梭利訓練重點不同。家庭可據此了解學習風格，但語言時數和個別支援安排仍須向校方確認。", "https://www.salvationarmy.org.hk/esd/scokg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號605620、水泉澳邨河泉樓校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "半日／全日班、概覽授課語言、師生比例和學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6056200001" },
    { label: "救世軍水泉澳幼稚園：教學理念", scope: "兒童為本、專題研習、自由遊戲、蒙特梭利及品德培育的校方自述。", url: "https://salvationarmy.org.hk/esd/scokg/our-philosophy.html" },
    { label: "救世軍水泉澳幼稚園：課程", scope: "K1與K2–K3學習重點、英語拼音、自由遊戲和持續評估的校方介紹。", url: "https://salvationarmy.org.hk/esd/scokg/our-curriculum.html" },
    { label: "救世軍水泉澳幼稚園：校園環境", scope: "校園設施與學習環境介紹；不作學生可使用時數或名額推斷。", url: "https://salvationarmy.org.hk/esd/scokg/facilities-and-environment.html" },
  ], [{ title: "專題研習與自由遊戲的日常", featured: true, note: "學習策略是校方自述；活動場地和外籍教師安排不代表每名學生均獲相同接觸時間。", details: [
    { label: "專題研習讓孩子從問題出發", value: "校方鼓勵孩子觀察、發問、討論和親身嘗試，以專題研習建立知識；自由遊戲則讓幼兒選擇遊戲地點、同伴和材料。這種路線較重視過程和自主，家長可看教師如何在自由探索與日常規範之間取得平衡。", sourceUrl: "https://salvationarmy.org.hk/esd/scokg/our-curriculum.html" },
    { label: "不同級別的蒙特梭利重點有區分", value: "學校介紹K1著重感官、前書寫和建立常規，K2至K3則加入數學邏輯訓練。這提供了課程縱向安排的線索；家長可詢問如何按個別幼兒的發展速度調整活動，而非只看教材名稱。", sourceUrl: "https://salvationarmy.org.hk/esd/scokg/our-curriculum.html" },
    { label: "英語活動與評估方式需問實際安排", value: "校方稱外籍教師會以拼音、遊戲和活動營造英語環境，並以觀察、學習歷程檔案和進展報告了解成長。公開頁沒有每週英語時數，家長可索取時間表並了解評估如何回饋家庭。", sourceUrl: "https://salvationarmy.org.hk/esd/scokg/our-curriculum.html" },
  ] }]),

  { ...profile("575518", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程與校務：查閱於2026-10", "迦南幼稚園（黃埔花園）是教育局名冊中的獨立校號和校址，與同址幼兒園分開。迦南校方網站介紹故事教學、雙語發展及家長觀課等機構安排；申請前仍要核實黃埔分校班別、語言時數、學費和接送。", "https://www.cannan.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號575518、黃埔花園第十期部分商場平台地下幼稚園校址與註冊狀態；不含幼兒中心。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "上午／下午班、概覽授課語言及師生比例；不把同址幼兒園班別混入。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5755180001" },
    { label: "教育局：2026/27幼稚園教育計劃名單", scope: "確認迦南幼稚園（黃埔花園）列於當屆計劃名單；不代表所有費用項目免費。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2627_KC.pdf" },
    { label: "教育局：迦南幼稚園（黃埔花園）學校資料", scope: "教育局列出的本校地址與電話；幼稚園校址不含幼兒中心。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=575518000111" },
    { label: "迦南幼稚園：幼稚園課程及家校活動", scope: "機構層面的雙語發展、教學內容及家長參與介紹；不代表黃埔分校逐日課時。", url: "https://www.cannan.edu.hk/" },
  ], [{ title: "分校身份、課程理念與實際班別核對", featured: true, note: "校方網站內容部分屬迦南機構整體介紹；本頁不把其他分校課程細節當成黃埔校址獨有安排。", details: [
    { label: "教育局把幼稚園與幼兒園分開列址", value: "黃埔花園幼稚園校址為第十期商場平台地下，幼兒園另有獨立地址及電話。家長預約參觀或交表時應確認所申請的是K1幼稚園，而非同址機構的幼兒園班別。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=575518000111" },
    { label: "校方介紹故事教學與雙語發展", value: "迦南網站以故事教學、主題研習和雙語發展介紹課程方向，也列家長會、觀課及課程講座等家校活動。這些是機構層面的資訊；申請前可請黃埔分校提供本級時間表和近期觀課安排。", sourceUrl: "https://www.cannan.edu.hk/" },
    { label: "交通及額外費用需按黃埔校址查詢", value: "教育局位置資料和學校首頁不足以確認當屆校車覆蓋及代辦用品費；家長宜向黃埔分校核對實際接送路線、校車服務、書簿和校服費。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=575518000111" },
  ] }]), reportSlug: undefined, relatedReportSlugs: [], omitDirectorySourceUrls: ["https://kgp2026.kindergartenprofile.com/school/?schid=5163760001", "https://kgp2026.kindergartenprofile.com/school/?schid=5319100001", "https://kgp2026.kindergartenprofile.com/school/?schid=6096410001", "https://kgp2026.kindergartenprofile.com/school/?schid=6198410001"], clearDirectoryReports: true },

  profile("158453", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方活動與課程：2026-10", "保良局曹金霖夫人幼稚園位於青衣長安邨，校方近期校曆和2026/27 K1通知顯示學校仍在運作。公開可讀資料對詳細課程理念交代有限，因此本頁聚焦可核對的學年資訊與校園活動，不把保良局其他幼稚園的課程特色套用到本校。", "https://www.plkkgs.edu.hk/plkcklkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158453、青衣長安邨安潤樓校址與註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1584530001" },
    { label: "保良局曹金霖夫人幼稚園：校方首頁及校曆", scope: "2026年校園活動日期、學校入口和校方近期運作資訊。", url: "https://www.plkkgs.edu.hk/plkcklkg/" },
    { label: "保良局曹金霖夫人幼稚園：2026/27 K1校務通知", scope: "2026/27 K1新生書簿及雜費通知；不是學費或來年收費。", url: "https://www.plkkgs.edu.hk/plkcklkg/en/news/1" },
    { label: "保良局幼稚園：機構學校名錄", scope: "辨認曹金霖夫人幼稚園為獨立校舍，避免把其他保良局校舍資料混用。", url: "https://www.plkkgs.edu.hk/hk" },
  ], [{ title: "按本校資料判斷，不借用同機構校本特色", featured: true, note: "校方近期活動與班級通知可核；本輪未找到足夠本校課程細節，故不推斷教學模式或特色。", details: [
    { label: "校曆顯示近期校園活動", value: "校方校曆列出2026年中秋活動及高班參觀消防局。這能證明學校有公布節慶與校外體驗活動，但不表示活動每年固定、每名幼兒都參加，家長可詢問各級活動頻率和交通安排。", period: "2026年校曆", sourceUrl: "https://www.plkkgs.edu.hk/plkcklkg/" },
    { label: "教育局概覽提供比較底數", value: "2026/27概覽按本校址列上午、下午和全日班、授課語言、師生比例及費用欄位。師生比例是概覽統計，不等於實際班內人數；如需全日照顧或英語課時，應向本校索取時間表與收費表。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1584530001" },
    { label: "把活動通知與教學特色分開看", value: "校方現行首頁可讀內容以活動和校務通知為主；本輪未找到足夠、可明確歸屬本校的課程說明。選校時可直接詢問主題設計、語言安排、幼兒評估及支援服務，避免以辦學團體其他幼稚園的做法代替本校答案。", sourceUrl: "https://www.plkkgs.edu.hk/plkcklkg/" },
  ] }]),
];

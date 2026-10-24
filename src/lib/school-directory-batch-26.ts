import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  dataYear: string,
  sourceNote: string,
  sources: PilotSchool["sources"],
  detailSections: NonNullable<PilotSchool["detailSections"]>,
  overrides: Partial<PilotSchool> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear, sourceNote, appendDirectoryDetails: true, sources, detailSections, ...overrides };
}

/** Kindergarten profile batch 26: ten schools not already in the reviewed profile set. */
export const KINDERGARTEN_BATCH_26: PilotSchool[] = [
  profile("216208", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27", "地利亞英文小學暨幼稚園有兩個教育局登記校址。本頁呈現概覽可配對的校址0001資料；英文授課、半日免費及師生比例均只適用於該校址。校方招生時請確認實際上課校址及課程安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號216208及美孚登記校址資料。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號216208兩個Location ID及註冊資料；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "美孚百老匯街校址的班制、授課語言、師生比例及學費；不代表校址0002。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2162080001" },
  ], [{ title: "美孚校址與英語授課資料", featured: true, note: "本校同時設小學部；以下班制和語言只引用幼稚園概覽校址0001。小學部公開資料不能替代幼稚園課程說明。", details: [
    { label: "校址0001列上午、下午及全日班", value: "教育局2026/27幼稚園概覽列出上午、下午及全日班；校址0002另有登記，不應把0001的班制、費用或比例套用到另一地址。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2162080001" },
    { label: "該校址概覽列英語授課", value: "概覽把美孚校址0001的主要授課語言列為英語，師生比例約1:9.6，半日班列入幼稚園教育計劃。這些是年度概覽指標，不表示每個活動只用英語，也不代表當屆仍有空缺。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2162080001" },
  ] }]),

  profile("597384", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方課程頁查核：2026-10", "遵道幼稚園有兩個教育局登記校址；概覽數據只按校址0002列示。校方課程頁以生活化主題、遊戲探索及綜合學習為主軸，另列安吉遊戲等活動；過往計劃或活動不視為每屆固定安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號597384及南邊圍、丈量約份兩個登記校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "校址0002的班制、語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5973840002" },
    { label: "遵道幼稚園：課程目標與架構", scope: "生活化主題、遊戲探索及六個學習範疇的校方課程說明。", url: "https://www.abiding.edu.hk/?page_id=381" },
    { label: "遵道幼稚園：使命與願景", scope: "兒童為本、感官探索、遊戲學習及照顧差異的校方自述。", url: "https://www.abiding.edu.hk/?page_id=86" },
  ], [{ title: "生活主題與遊戲探索", featured: true, note: "校方所述課程理念不是外部成效評估。學校有兩個登記校址，參觀和報名時需確認所屬校址；本頁年度數據對應0002。", details: [
    { label: "從日常生活主題串連學習範疇", value: "校方表示會以家庭、食物、交通、社區和四季等幼兒熟悉的經驗作主題，連結語文、數學、大自然、個人與群體、藝術等學習。對家庭而言，這種編排重視孩子能否把所學帶回生活；參觀時可看孩子是否有提問、操作和分享的機會。", sourceUrl: "https://www.abiding.edu.hk/?page_id=381" },
    { label: "遊戲中保留自由探索", value: "學校把遊戲學習、感官探索及按幼兒發展步伐調整課程列為理念。校方首頁亦介紹曾參與香港安吉遊戲學習圈計劃；該項參與資訊不等於每年每班均有相同形式或時數，宜在參觀時問清當屆安排。", sourceUrl: "https://www.abiding.edu.hk/?page_id=86" },
    { label: "校址0002的概覽語言與班制", value: "教育局2026/27概覽對應校址0002，列上午及下午班、粵語授課、師生比例約1:8.6；半日班列入幼稚園教育計劃。學校另有校址0001，不能把這組數字套用到另一校址。", period: "2026/27學年；校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5973840002" },
  ] }]),

  profile("215244", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方網站查核：2026-10", "九龍浸信會幼稚園的教育局登記資料列兩個校址。教育局概覽可配對校址0002；校方網站以九龍城校址作招生聯絡點。概覽師生比例與校方所列每班上限口徑不同，本文標示差異並建議向校方核實。", [
    { label: "教育局《學校位置及資料》", scope: "校號215244、兩個登記校址及授課時間。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "兩個Location ID的登記狀況及地址；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "校址0002的班制、英語授課及師生比例。概覽列私立收費待確認。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2152440002" },
    { label: "九龍浸信會幼稚園：課程", scope: "基督教校本課程、遊戲學習及校方所列教學語言與活動。", url: "https://www.kbck.edu.hk/curriculum/" },
    { label: "九龍浸信會幼稚園：招生", scope: "申請程序及校方列示的九龍城招生聯絡地址；頁面收費年度為2025/26。", url: "https://www.kbck.edu.hk/admission/" },
  ], [{ title: "遊戲本位的英語學習環境", featured: true, note: "學校網站主要呈現校方整體課程及九龍城招生聯絡資料；教育局登記另列兩個校址。當屆上課地點、收費及適用班別應向校方確認。", details: [
    { label: "校方以遊戲和幼兒主導經驗組織課程", value: "校方稱以基督教校本課程配合遊戲學習，透過教師支架和由幼兒發起的活動，讓孩子按自己的步伐探索。這表示家長可留意課堂是否容許孩子選擇、嘗試和表達，而非只看活動表上的項目。", sourceUrl: "https://www.kbck.edu.hk/curriculum/" },
    { label: "英文為概覽所列授課語言，另設中文、音樂及體育課", value: "教育局2026/27概覽對應校址0002，列英語授課；校方課程頁另列中文、音樂及體育特別課。官方資料沒有列出各語言每週課時比例，因此不宜把「英語授課」理解為全天只用英語。", period: "2026/27學年；校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2152440002" },
    { label: "兩個登記校址需分開確認", value: "教育局登記資料列九龍塘聯合道及九龍城嘉林邊道兩址；校方招生頁提供嘉林邊道聯絡地址。現行各年級實際上課校址及名額應直接向校方核實。", sourceUrl: EDB_LOCATION },
    { label: "師生比例兩種公開口徑不同", value: "教育局2026/27概覽校址0002列師生比例約1:2.7；校方課程頁則稱每位教師最多照顧11名幼兒。兩者口徑或年度未能由公開頁面對齊，故不將其中一項當作可直接比較的班額，報名前宜索取當屆各級師生配置說明。", period: "教育局概覽：2026/27；校方頁面查核：2026-10", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2152440002" },
  ] }], { name: "九龍浸信會幼稚園", directoryNameOverride: true, omitDirectoryDetailTitles: ["幼稚園概覽｜校址 0002"] }),

  profile("323080", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；辦學團體資料：七十周年特刊（年份未明）", "基督教挪威差會主辦信義中英文幼稚園位於九龍又一村。概覽列英語授課、上午下午及全日班；課程特色補充引用辦學團體七十周年特刊，反映校方曾公開的辦學理念，不代表現行課時或班別安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號323080、九龍又一村校址及聯絡資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例及年度收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3230800001" },
    { label: "基督教香港信義會：屬下單位", scope: "辦學團體列出的幼稚園名稱、地址及電話。", url: "https://www.elchk.org.hk/%E5%B1%AC%E4%B8%8B%E5%96%AE%E4%BD%8D/?type=3" },
    { label: "基督教香港信義會七十周年特刊：信義中英文幼稚園", scope: "校方在七十周年特刊中介紹的辦學特色與核心價值；公開檔案未能確認學年。", url: "https://www.elchk.org.hk/wp-content/uploads/2026/01/%E4%B8%83%E5%8D%81%E5%91%A8%E5%B9%B4%E7%89%B9%E5%88%8A%E7%B8%BD%E8%BE%A6PREVIEW_R3.pdf" },
  ], [{ title: "雙語環境與幼兒主導活動", featured: true, note: "雙語及幼兒主導是辦學團體特刊中的校方自述，沒有公開逐科課時。家長可在參觀時觀察英語、中文實際使用情境，並確認現行班制。", details: [
    { label: "校方曾把幼兒活動選擇權列為核心價值", value: "辦學團體七十周年特刊介紹，校方重視啟發學習興趣、由幼兒選擇活動，以及家校和社區連結。對孩子而言，關鍵在於活動選擇是否伴隨教師引導和回顧；這是校方理念描述，不是對每班日常的獨立評核。", period: "辦學團體七十周年特刊；學年未明", sourceUrl: "https://www.elchk.org.hk/wp-content/uploads/2026/01/%E4%B8%83%E5%8D%81%E5%91%A8%E5%B9%B4%E7%89%B9%E5%88%8A%E7%B8%BD%E8%BE%A6PREVIEW_R3.pdf" },
    { label: "教育局概覽列英語授課及三種班制", value: "2026/27概覽對應校址0001，列上午、下午和全日班、英語授課及師生比例約1:7.4。語言欄是概覽分類，不能推導英語的每日授課時數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3230800001" },
  ] }]),

  profile("133582", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方課程資料查核：2026-10", "德信幼稚園位於柯士甸道，教育局概覽列粵語授課及上午、下午班。校方公開的主題教學、品德教育和中英普活動可以看到課程方向；英文和普通話的實際課時比例未公開。", [
    { label: "教育局《學校位置及資料》", scope: "校號133582、地址及授課時間。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及概覽年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1335820001" },
    { label: "德信幼稚園：課程特色", scope: "主題教學、語言活動、品德培育及升小銜接的校方介紹。", url: "https://taksunkg.edu.hk/?page_id=40" },
    { label: "德信幼稚園：學校簡介", scope: "辦學宗旨、師資、班制和校方公布的英語及普通話導師安排。", url: "https://taksunkg.edu.hk/?page_id=37" },
  ], [{ title: "主題探索與品德培育", featured: true, note: "課程和語言活動按校方公開說明整理。校方頁面仍載有2025/26收費資訊，本頁不把該年度費用當作現行收費。", details: [
    { label: "以主題活動連結參觀、討論和探索", value: "校方表示以主題教學串連參觀、討論及探索，並透過合作和解難活動提升表達與思考。家長可留意孩子是否有足夠時間自己嘗試，以及教師怎樣把參觀經驗帶回課堂整理。", sourceUrl: "https://taksunkg.edu.hk/?page_id=40" },
    { label: "粵語為主的概覽分類，另安排英語及普通話接觸", value: "教育局概覽列粵語授課；校方則介紹聘有外籍英語導師及普通話導師，並以遊戲、歌曲、故事等方式接觸語言。來源沒有提供每週時數，家庭若重視英語沉浸，宜再問各級每日使用語言和課堂比例。", period: "教育局概覽：2026/27；校方課程頁查核：2026-10", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1335820001" },
    { label: "升小銜接安排是體驗，不是升讀保證", value: "校方介紹高班學生會參觀同址小學並體驗小學課堂模式，作為幼小銜接活動；校方頁面所述畢業去向比例沒有附上清晰年度和分母，本頁不作升讀比例推算。", sourceUrl: "https://taksunkg.edu.hk/?page_id=40" },
  ] }]),

  profile("323268", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方頁面查核：2026-10", "基督教佈道中心樂富幼稚園位於樂富邨樂謙樓，概覽列粵語授課。校方網站介紹多元教學策略、普通話及外籍教師活動，並提供非華語幼兒中文支援；網站部分招生舊頁仍保留過期年度，報名日期應以最新公告為準。", [
    { label: "教育局《學校位置及資料》", scope: "校號323268、地址及授課時間。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、粵語授課、師生比例及概覽年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3232680001" },
    { label: "樂富幼稚園：教學方式及活動", scope: "探索式活動、普通話及外籍教師安排和多元智能興趣活動的校方說明。", url: "https://www.lokfukg.edu.hk/%E5%AD%B8%E8%88%87%E6%95%99/%E5%AD%B8%E7%BF%92%E6%95%99%E5%AD%B8%E6%96%B9%E5%BC%8F%E5%8F%8A%E6%B4%BB%E5%8B%95/" },
    { label: "樂富幼稚園：非華語學童支援", scope: "校方參與中文支援計劃及校本增潤課的說明。", url: "https://www.lokfukg.edu.hk/%E5%AD%B8%E8%88%87%E6%95%99/%E9%9D%9E%E8%8F%AF%E8%AA%9E%E5%AD%B8%E7%AB%A5%E7%9A%84%E6%94%AF%E6%8F%B4/" },
    { label: "樂富幼稚園：最新消息", scope: "核對最新年度招生公告；舊招生說明頁日期不可直接沿用。", url: "https://www.lokfukg.edu.hk/" },
  ], [{ title: "粵語日常與多語活動並行", featured: true, note: "概覽分類為粵語授課，校方另安排普通話及外籍教師活動；沒有公開逐科時數。支援服務是否適合個別孩子，需向校方確認評估及名額。", details: [
    { label: "以故事、討論、參觀和小組活動引導探索", value: "校方列出故事、討論、參觀、資料搜集及小組活動等方式，重點是觀察、思考和解難。對喜歡動手探索的幼兒，這種設計有較多參與入口；家長可參觀時看教師如何兼顧不同步伐。", sourceUrl: "https://www.lokfukg.edu.hk/%E5%AD%B8%E8%88%87%E6%95%99/%E5%AD%B8%E7%BF%92%E6%95%99%E5%AD%B8%E6%96%B9%E5%BC%8F%E5%8F%8A%E6%B4%BB%E5%8B%95/" },
    { label: "英語和普通話以活動形式接觸", value: "學校概覽列粵語授課；校方另稱每週安排普通話及外籍教師活動。這能確認有相關活動，但公開頁沒有列出每級每週時數，不宜等同英語或普通話為主要授課語言。", period: "教育局概覽：2026/27；校方頁面查核：2026-10", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3232680001" },
    { label: "非華語幼兒中文支援有校本安排", value: "校方表示參與大學及慈善團體合作的非華語幼兒中文支援計劃，並設中文作為第二語言的增潤課。家長應直接詢問目前服務對象、評估方法和名額。", sourceUrl: "https://www.lokfukg.edu.hk/%E5%AD%B8%E8%88%87%E6%95%99/%E9%9D%9E%E8%8F%AF%E8%AA%9E%E5%AD%B8%E7%AB%A5%E7%9A%84%E6%94%AF%E6%8F%B4/" },
  ] }]),

  profile("158488", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方課程資料查核：2026-10", "保良局張心瑜幼稚園位於大窩口邨富靜樓。校方及辦學團體介紹以正向回饋、遊戲化英文、繪本和生活探索作課程特色；教育局概覽列粵語授課。相關特色屬校方描述，不代表每名學生的成果。", [
    { label: "教育局《學校位置及資料》", scope: "校號158488、校址及聯絡資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及概覽年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1584880001" },
    { label: "保良局張心瑜幼稚園：課程簡介", scope: "校本課程與藝術、語文、英語和普通話的安排。", url: "https://www.plkkgs.edu.hk/plkfcsykg/hk/about/22" },
    { label: "保良局：張心瑜幼稚園特色介紹", scope: "正向思考、遊戲化英文及生活探索的辦學團體介紹。", url: "https://www.poleungkuk.org.hk/en/service/education/plkfcsykg20240924" },
  ], [{ title: "正向回饋、繪本與生活探索", featured: true, note: "以下特色來自校方及辦學團體介紹。概覽所列粵語是年度主要授課語言分類；英語及普通話活動的課時仍應向學校確認。", details: [
    { label: "遊戲化英文配合角色扮演、歌曲和故事", value: "辦學團體介紹校本英文課程透過角色扮演、唱歌、故事和團隊遊戲進行。它的參考價值在於孩子有機會在情境中運用語言；公開資料未交代每天課時或英語教師配置，家長可在參觀時再問。", sourceUrl: "https://www.poleungkuk.org.hk/en/service/education/plkfcsykg20240924" },
    { label: "把日常經驗轉為探索問題", value: "校方介紹會連繫生活設計探索活動，讓幼兒觀察、提問和尋找答案；課程頁亦提到藝術、語文、音樂及體育等跨領域活動。家長可觀察教師會否讓孩子自己提出想法，而不只跟隨示範完成作品。", sourceUrl: "https://www.plkkgs.edu.hk/plkfcsykg/hk/about/22" },
    { label: "教育局概覽列粵語及三種班制", value: "2026/27概覽列上午、下午及全日班、粵語授課，師生比例約1:9.2。比例是概覽申報的整體指標，不是固定每班人數，也不能推算現有學額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1584880001" },
  ] }]),

  profile("544744", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方網站查核：2026-10", "啓思小學附屬幼稚園位於九龍塘牛津道。教育局概覽列粵語授課及上午、下午班；校方另介紹體驗式、探究式學習與中英普課程。校方公開的學費頁面屬2025/26，本文不沿用作現行收費。", [
    { label: "教育局《學校位置及資料》", scope: "校號544744、牛津道地址及校舍登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言及年度學校資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5447440001" },
    { label: "啓思小學附屬幼稚園：課程", scope: "體驗式、探究式學習及校方課程定位。", url: "https://www.cpskg.edu.hk/curriculum?lang=zh" },
    { label: "啓思小學附屬幼稚園：學校資料", scope: "校方列示的班制、教學語言、校舍、師生及年度費用資料。", url: "https://www.cpskg.edu.hk/shool-s-information?lang=zh" },
    { label: "啓思小學附屬幼稚園：入學申請", scope: "校方當屆申請入口與程序；年度日期以最新公告為準。", url: "https://www.cpskg.edu.hk/admissions?lang=zh" },
  ], [{ title: "體驗探究與中英普並行", featured: true, note: "課程取向為校方自述。校方學校資料頁中的學費年度為2025/26，不能視為2026/27收費；申請日程要看當屆公告。", details: [
    { label: "體驗式和探究式學習是校方公開定位", value: "校方稱會以設計好的課程引導孩子探索和發現，透過活動與遊戲培養好奇心。這種安排對喜歡提問、操作和分享的孩子較容易投入；參觀時可看教師是否讓孩子解釋自己的發現。", sourceUrl: "https://www.cpskg.edu.hk/curriculum?lang=zh" },
    { label: "校方列廣東話、英文和普通話", value: "學校資料頁列出廣東話、英文、普通話三種教學語言，並設上午及下午班。公開資料沒有提供三種語言的每日或每週課時比例，不能據此判定哪種語言佔主導。", sourceUrl: "https://www.cpskg.edu.hk/shool-s-information?lang=zh" },
    { label: "與小學有連繫不等同保證升讀", value: "校方資料介紹幼稚園與啓思小學有升學銜接資訊。這有助家庭了解下一階段路徑，但不應推作自動直升或保證錄取；家長宜查看當屆小學收生政策。", sourceUrl: "https://www.cpskg.edu.hk/shool-s-information?lang=zh" },
  ] }]),

  profile("325996", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方網站查核：2026-10", "迦南幼稚園（小西灣）是迦南多校址網絡中的一所分校。本頁只寫小西灣校址；集團層面的課程資訊只有在校方明確說明適用範圍時才採用。幼稚園與幼兒園屬不同服務，不能以幼兒園資料補幼稚園。", [
    { label: "教育局《學校位置及資料》", scope: "校號325996、富景花園小西灣校址及聯絡資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "小西灣幼稚園校址的班制、授課語言及師生比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3259960001" },
    { label: "迦南幼稚園及幼兒園：官方網站", scope: "核對小西灣分校、園部課程和當屆招生入口；不把其他分校資訊當作小西灣專屬安排。", url: "https://www.cannan.edu.hk/" },
    { label: "教育局《幼稚園概覽2025/26》：小西灣幼稚園", scope: "2024年9月課室容額及校方資料，僅作上一學年背景，不代表現時學額。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5907" },
  ], [{ title: "小西灣校址與雙語學習方向", featured: true, note: "迦南有多間分校，跨校資訊不可直接當作小西灣校舍安排。官方網站提及的課程特色為集團介紹；小西灣當屆班制和語言細節應向分校確認。", details: [
    { label: "小西灣校址概覽列粵語授課及上午、下午班", value: "教育局2026/27概覽對應富景花園校址0001，列上午及下午班、粵語授課，師生比例約1:8.8。這是校址層級的年度資料，不等於當屆每級均同時開班或尚有空缺。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3259960001" },
    { label: "校方強調兒童為本與雙語發展", value: "迦南官方網站把兒童為本、培育知識技能與價值觀、注重雙語發展及繪本閱讀列作辦學方向。這是集團官網的整體描述；家長應向小西灣分校確認英語活動頻率及實際班級安排。", sourceUrl: "https://www.cannan.edu.hk/" },
    { label: "幼稚園校舍與幼兒園服務分開核對", value: "教育局2025/26概覽資料列小西灣幼稚園課室容額330人，但該數據截至2024年9月，且不是招生名額。社署另列同址幼兒園服務，屬不同年齡及服務類別，不可混為K1學位數。", period: "課室容額資料：2024年9月；概覽：2025/26", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5907" },
  ] }]),

  profile("548278", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方發展計劃：2024-2027", "鯉魚門循道衞理幼稚園位於鯉魚門邨鯉興樓。教育局概覽校址0002列粵語授課及上午、下午班；校方發展計劃把藝術創作、情緒健康和表達列為發展重點，屬校方計劃方向而非已證實成果。", [
    { label: "教育局《學校位置及資料》", scope: "校號548278、鯉魚門邨校址及聯絡資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "上午校址的班制、粵語授課、師生比例及年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5482780002" },
    { label: "鯉魚門循道衞理幼稚園：校方網站", scope: "辦學宗旨、活動及聯絡地址。", url: "https://lymmkg.edu.hk/" },
    { label: "鯉魚門循道衞理幼稚園：2024-2027學校發展計劃", scope: "三年發展目標中提到音樂、美藝、情感表達及幼兒藝術創意。", url: "https://lymmkg.edu.hk/wp-content/uploads/2024/09/2024-2027%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83-1.pdf" },
  ], [{ title: "藝術表達與正向價值培育", featured: true, note: "藝術及情緒表達列於2024-2027校方發展計劃，是校方計劃目標，不能等同已驗證學習成效。概覽資料只對應校址0002。", details: [
    { label: "校方發展計劃關注藝術創作和情緒表達", value: "學校2024-2027發展計劃提出優化音樂及美藝教學策略，培養幼兒藝術創意，並關注情感表達及心靈健康。家長可問學校如何把這些目標落實到日常課堂，而不是只看成果展演。", period: "學校發展計劃：2024-2027", sourceUrl: "https://lymmkg.edu.hk/wp-content/uploads/2024/09/2024-2027%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83-1.pdf" },
    { label: "2025-2026年度活動重視合作與解難", value: "校方首頁列出該年度目標包括建立正向價值觀、增強解難能力、發揮團隊精神及啟發幼兒潛能。這是2025-2026的校本目標；家長可在校園參觀時觀察孩子是否有合作和自己嘗試的機會。", period: "校方年度目標：2025-2026", sourceUrl: "https://lymmkg.edu.hk/" },
    { label: "概覽列粵語授課及上午、下午班", value: "教育局2026/27概覽對應校址0002，列上午及下午班、粵語授課、師生比例約1:12.3。網上過往報表可見另一校址編號；比較資料時應按Location ID核對，不把比例混用。", period: "2026/27學年；校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5482780002" },
  ] }]),
];

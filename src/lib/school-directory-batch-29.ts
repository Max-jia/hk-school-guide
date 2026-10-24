import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(schoolNumber: string, year: string, note: string, schoolUrl: string, sources: PilotSchool["sources"], details: NonNullable<PilotSchool["detailSections"]>): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear: year, sourceNote: note, appendDirectoryDetails: true, website: schoolUrl, sources, detailSections: details };
}

/** Kindergarten profile batch 29: ten unique registered local schools. */
export const KINDERGARTEN_BATCH_29: PilotSchool[] = [
  profile("539104", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程及招生：2026/27–2027/28", "保良局譚歐陽少芳紀念幼稚園位於紅磡黃埔花園。校方已公布2027/28 K1申請安排，並以遊戲、戲劇、角落活動及主題／小組教學介紹課程；兩文三語是課程方向，未見公開逐語言課時。", "https://www.plkkgs.edu.hk/plktaysfmkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號539104、校址及登記狀態；查核日期2026-10-23。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5391040001" },
    { label: "保良局譚歐陽少芳紀念幼稚園：收生簡介", scope: "兩文三語、遊戲／戲劇／角落活動及2027/28招生入口。", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/custom/custom_page/32" },
    { label: "保良局譚歐陽少芳紀念幼稚園：教學理念", scope: "辦學宗旨、班制、遊戲教學及校園設施自述。", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/about/10" },
  ], [{ title: "遊戲、戲劇與語言運用", featured: true, note: "校方課程自述與2026/27教育局概覽分開呈列；校方沒有公開逐語言課時比例。", details: [
    { label: "以遊戲和戲劇帶動語言使用", value: "校方介紹透過遊戲、戲劇和角落活動發展母語、英語及普通話，並配合主題與小組教學。對家長而言，參觀時可觀察孩子有沒有實際對話、角色扮演和表達選擇的機會；「兩文三語」不等於三種語言課時相同。", sourceUrl: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/custom/custom_page/32" },
    { label: "2027/28申請資訊已更新", value: "校方首頁於2026年10月更新2027/28 K1申請安排。招生日期和面見規則應以當屆頁面為準；過往招生須知不能直接套用到新一屆。", period: "2027/28招生；校方更新：2026-10", sourceUrl: "https://www.plkkgs.edu.hk/plktaysfmkg/" },
    { label: "當屆班制與師生比例按校址0001", value: "教育局2026/27概覽對應黃埔校址0001，列上午、下午班、粵語授課及約1:8.7師生比例。這是概覽統計口徑，不能讀作固定班額或招生名額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5391040001" },
  ] }]),

  profile("528609", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程頁查核：2026-10", "中華基督教會香港志道堂基博幼稚園（將軍澳）位於廣明苑。校方公開英語、普通話及課程資訊；教育局概覽列粵語授課，語言活動頁不能替代整日授課比例。", "https://www.keipok.edu.hk/?lang=zh", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號528609、廣明苑校址及登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5286090001" },
    { label: "基博幼稚園：校方介紹", scope: "創校及辦學團體背景、課程與校址。", url: "https://www.keipok.edu.hk/?lang=zh" },
    { label: "基博幼稚園：英語課程", scope: "駐校外籍教師、課程設計和英語活動例子。", url: "https://www.keipok.edu.hk/?lang=zh&page_id=28" },
  ], [{ title: "廣東話主線與英語環境", featured: true, note: "語言安排依教育局概覽及校方分科課程頁分開描述，不將英語活動等同英語授課。", details: [
    { label: "英語由駐校外籍教師設計及任教", value: "校方表示由駐校外籍教師編寫並教授英語課程，內容按幼兒語文能力、興趣和需要設計，並以故事共讀等活動建立真實語境。這說明英語是校本課程的一部分，但公開頁沒有每日課時比例。", sourceUrl: "https://www.keipok.edu.hk/?lang=zh&page_id=28" },
    { label: "學校自述基督教辦學與全人發展", value: "校方以基督信仰及六育發展描述辦學方向。家長可在參觀時了解宗教活動如何融入日常，以及學校如何照顧不同語言背景幼兒；不以辦學宗旨推斷學習成效。", sourceUrl: "https://www.keipok.edu.hk/?lang=zh" },
    { label: "教育局概覽列粵語及約1:12.9", value: "2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:12.9師生比例。概覽授課語言欄與英語專科活動是不同資料口徑。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5286090001" },
  ] }]),

  profile("157473", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程資料：2025/26", "聖公會青山聖彼得堂山景邨幼稚園位於屯門山景邨景貴樓。教育局概覽列粵語作概覽授課語言；校方2025/26課程資料另描述遊戲中學習和分時段三語主題教學，該頁不提供三語課時比例。", "https://skhspc.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號157473、山景邨地址及註冊狀況。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=157473000111" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "現屆班制、概覽語言、比例和核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1574730001" },
    { label: "教育局《幼稚園概覽2025/26》：課程資料", scope: "校方申報的遊戲、宗教、語文及學習評估描述。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6550" },
    { label: "聖公會青山聖彼得堂山景邨幼稚園：校方網站", scope: "校方聯絡、交通與招生入口。", url: "https://skhspc.edu.hk/" },
  ], [{ title: "遊戲探索與三語主題活動", featured: true, note: "教學細節取自校方2025/26概覽申報；沒有把三語主題活動換算成各語言課時。", details: [
    { label: "課程以遊戲、科學探索和藝術活動組合", value: "校方在2025/26概覽中描述遊戲活動、宗教課程、奧福音樂、區角、藝術、科學探索及德育活動，並表示不要求幼兒班機械抄寫或操練計算。這是該年度校方申報的課程安排；現屆執行情況宜向學校確認。", period: "2025/26學年校方申報", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6550" },
    { label: "語文採分時段主題教學", value: "同份申報稱以小組形式進行粵語、英語和普通話主題教學；全日班另列英語及普通話興趣活動。教育局2026/27概覽則列粵語授課，兩者反映不同欄位，不代表英語或普通話是主要授課語言。", period: "校方課程資料：2025/26；概覽：2026/27", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6550" },
    { label: "校址及比率按0001核對", value: "教育局資料把校號157473配對至山景邨景貴樓校址0001；2026/27概覽列約1:7.8師生比例。此比例不等於每班固定人數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1574730001" },
  ] }]),

  profile("156752", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方網站查核：2026-10", "東華三院廖恩德紀念幼稚園位於沙田禾輋邨。校方強調自主探索、繪本教學和兩文三語，並公開2026/27收生資料及非華語家庭面試支援；歷屆活動和比賽不當作全體幼兒成果。", "https://www.twghlytkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號156752、禾輋邨校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、語言、師生比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1567520001" },
    { label: "東華三院廖恩德紀念幼稚園：學校特色", scope: "全人發展、兩文三語、繪本教學與最新校訊。", url: "https://www.twghlytkg.edu.hk/" },
    { label: "東華三院廖恩德紀念幼稚園：2026/27收生指南", scope: "當屆學制、上課時間及非華語家庭申請支援。", url: "https://www.twghlytkg.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
  ], [{ title: "繪本教學與語言支援", featured: true, note: "學校特色依校方現行網站整理；招生日期只代表2026/27公告，下一屆須重新核對。", details: [
    { label: "自主探索與繪本活動是校方特色", value: "校方表示以幼兒為本的活動鼓勵自主探索，並透過繪本故事發展語文和共通能力。對家長而言，值得觀察教師是否讓孩子預測、描述和重述故事，而不只聽教師講解。", sourceUrl: "https://www.twghlytkg.edu.hk/" },
    { label: "非華語申請可使用面試支援", value: "校方收生指南列中英文申請表、英文面試及按需要安排傳譯／翻譯，也接受懂中文親友陪同溝通。這是申請支援安排，不代表課堂語言或中文支援時數。", period: "校方收生頁；核對：2026-10", sourceUrl: "https://www.twghlytkg.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
    { label: "概覽列粵語與約1:8", value: "教育局2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:8師生比例。校方另聘英語及普通話教師，未見當屆逐語言課時表。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1567520001" },
  ] }]),

  profile("156779", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程及校舍資料查核：2026-10", "保良局吳多泰幼稚園位於沙田穗禾苑，提供半日及全日班。校方介紹戶外綠化、遊戲分區及6P課程元素；部分網頁招生資料按年度更新，申請日期須看當屆公告。", "https://www.plkkgs.edu.hk/plknttkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號156779、穗禾苑地址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "當屆班制、語言、比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1567790001" },
    { label: "保良局吳多泰幼稚園：使命及校園設施", scope: "校方辦學方向、學制和遊戲場地分區。", url: "https://www.plkkgs.edu.hk/plknttkg/hk/about/10" },
    { label: "保良局吳多泰幼稚園：6P課程元素", scope: "Play、Positive Thinking、Proactiveness、Problem Solving、Pleasure、Potential及語文課程。", url: "https://www.plkkgs.edu.hk/plknttkg/hk/about/24" },
  ], [{ title: "戶外遊戲與6P學習元素", featured: true, note: "校園設施和課程目標是校方自述；不推斷每名學生使用頻率或課堂成效。", details: [
    { label: "戶外場地分成多種遊戲區", value: "校方列出藝術廊、小舞台、積木、閱讀、種植、模擬遊戲、體能和單車活動區，並介紹魚菜共生及天台遊戲空間。家庭參觀時可留意室內外活動如何配合天氣、年齡和安全照顧。", sourceUrl: "https://www.plkkgs.edu.hk/plknttkg/hk/about/10" },
    { label: "6P把遊戲和解難放進校園生活", value: "校方以遊戲、正向思想、主動、解難、樂趣和潛能六項元素描述課程活動，另有英語及普通話課程頁。這些是學校設定的課程方向；公開網頁未列各語言每週時數。", sourceUrl: "https://www.plkkgs.edu.hk/plknttkg/hk/about/24" },
    { label: "2026/27概覽列粵語及約1:11.8", value: "校址0001概覽列上午、下午班和粵語授課，約1:11.8師生比例。2025/26舊概覽中的在讀人數和課室容額不應當作當屆招生名額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1567790001" },
  ] }]),

  profile("156973", "教育局位置及註冊資料：2026-10；概覽：2026/27；辦學團體資料查核：2026-10", "救世軍田家炳幼稚園位於沙田乙明邨。教育局現屆概覽提供校址班制、粵語和比例等基礎資料；校方網站入口可確認辦學團體及校務渠道，但本輪未找到可核實的當屆校本課程詳情。", "https://www.salvationarmy.org.hk/esd/tkpkg", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號156973、乙明邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1569730001" },
    { label: "救世軍教育服務：幼稚園名單及辦學方向", scope: "屬下幼稚園名錄與救世軍教育服務的整體辦學自述。", url: "https://salvationarmy.org.hk/esd/hk/" },
    { label: "救世軍田家炳幼稚園：校方網站入口", scope: "校務、家長及招生資訊入口；當屆課程需向學校確認。", url: "http://www.salvationarmy.org.hk/esd/tkpkg" },
  ], [{ title: "先核實校址，再向校方確認課程細節", featured: true, note: "本校公開可查的詳細校本課程資料有限；沒有把救世軍整體理念寫成此園已核實的課堂做法。", details: [
    { label: "辦學團體背景與學校個別資料分開", value: "救世軍教育服務頁列田家炳幼稚園及其整體教育方向；這只能說明辦學團體背景，不能代替本園自己的課程設計、日常宗教活動或支援服務說明。家長可向校方索取現屆課程簡介。", sourceUrl: "https://salvationarmy.org.hk/esd/hk/" },
    { label: "現屆公開概覽數據", value: "教育局2026/27概覽對應乙明邨校址0001，列上午及下午班、粵語授課和約1:8.6師生比例。概覽數據可協助比較班制及照顧配置，但不是招生名額或每班人數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1569730001" },
  ] }]),

  profile("313637", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方及EDB課程資料：2025/26", "聖德蘭幼稚園位於赤柱東頭灣道，設本地課程及全日班。校方2025/26概覽申報以兒童為本，重視體驗、探索、遊戲和戲劇，並明確反對K1機械抄寫；所列收費和課室容額需按年份閱讀。", "https://www.sttkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號313637、赤柱校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "當屆班制、語言、比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3136370001" },
    { label: "教育局《幼稚園概覽2025/26》：課程及校舍資料", scope: "校方申報的課程方向、創校資料、設施與人員口徑。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6386" },
    { label: "聖德蘭幼稚園：課堂花絮", scope: "校方公開的校園活動例子和近期課堂內容入口。", url: "https://www.sttkg.edu.hk/?lang=zh&page_id=967" },
  ], [{ title: "體驗探索與遊戲學習", featured: true, note: "課程細節取自2025/26校方申報，2026/27概覽用於現屆年度欄目；不混用兩個年度的費用或容額。", details: [
    { label: "以遊戲、戲劇和生活經驗建立自主學習", value: "校方在2025/26概覽中表示，課程按幼兒能力、興趣及生活經驗設計，透過體驗、探索、遊戲和戲劇促進自主學習；亦稱不要求幼兒班機械抄寫或操練計算。這反映校方公開的教學取向，家長仍可觀察現屆課堂如何落實。", period: "2025/26學年校方申報", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6386" },
    { label: "赤柱位置與全日班值得一併考慮", value: "校址在赤柱東頭灣道，交通時間和全日接送安排對家庭選擇有實際影響。校方2025/26概覽曾列82個課室容額，這不是2026/27 K1學額；現屆費用和名額應分別查最新概覽及招生頁。", period: "校址及課程：2025/26–2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3136370001" },
    { label: "概覽授課語言不表示只有一種語言", value: "教育局2026/27概覽對應校址0001，列粵語授課與約1:8.4師生比例。校方的英語或普通話活動若有安排，應按當屆課表核實，不能從概覽單一欄位推出課時分布。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3136370001" },
  ] }]),

  profile("159034", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程及招生：2026/27", "保良局曾星如幼稚園位於天水圍天瑞邨。校方公布藝術語文綜合課程、英語和普通話活動、戶外參觀及2026/27招生須知；課程特色按校方自述，不能推斷幼兒成效或下一屆費用。", "https://www.plkkgs.edu.hk/plkcsykg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號159034、天瑞邨校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽語言、師生比例和核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1590340001" },
    { label: "保良局曾星如幼稚園：課程簡介", scope: "藝術語文綜合課程、英語及普通話安排、戶外學習和課堂方式。", url: "https://www.plkkgs.edu.hk/plkcsykg/hk/about/22" },
    { label: "保良局曾星如幼稚園：2026/27申請須知", scope: "K1招生年級、申請方式及該年度公告收生人數。", url: "https://www.plkkgs.edu.hk/plkcsykg/api/cms/pdf/file/3155" },
  ], [{ title: "藝術語文綜合與戶外學習", featured: true, note: "課程和招生資訊屬不同年份資料，兩文三語未換算成課時比例；公布的招生數字只限所標年度。", details: [
    { label: "藝術活動融入語文教學", value: "校方介紹透過音樂、體育和美術學習語文，並配合小組及全班活動、生活經驗和戶外觀察。這種設計對重視多感官學習的家庭有參考價值；可向校方了解語文活動在每週課程中的實際安排。", sourceUrl: "https://www.plkkgs.edu.hk/plkcsykg/hk/about/22" },
    { label: "招生人數須綁定2026/27年度", value: "校方2026/27 K1申請須知曾列當年上午、下午及全日幼兒班合共招收90人。這是該屆招生計劃數字，不等於當前空缺、每年固定學額或錄取率。", period: "2026/27招生資料", sourceUrl: "https://www.plkkgs.edu.hk/plkcsykg/api/cms/pdf/file/3155" },
    { label: "概覽列粵語與約1:10.3", value: "教育局2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:10.3師生比例。英語及普通話活動屬校方課程說明，沒有公開的精確每日時數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1590340001" },
  ] }]),

  profile("132152", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方課程頁查核：2026-10", "中華基督教會協和幼稚園位於九龍西洋菜街北。校方以兒童本位、綜合學習和遊戲為課程主軸，並公開外籍英語教師及每週兩次普通話活動；這不代表每日英語或普通話課時相同。", "https://www.heepwohkg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號132152、西洋菜街北校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "當屆班制、授課語言、師生比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1321520001" },
    { label: "中華基督教會協和幼稚園：課程特色", scope: "遊戲學習、六大範疇、外籍英語教師與普通話活動頻率。", url: "https://www.heepwohkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "中華基督教會協和幼稚園：辦學宗旨及校務", scope: "基督教辦學宗旨、地址和2026/27招生消息。", url: "https://www.heepwohkg.edu.hk/" },
  ], [{ title: "遊戲綜合課程與語言時段", featured: true, note: "語言安排引用校方課程頁；以現行課表確認時數，勿把活動頻率概括為授課語言比例。", details: [
    { label: "六大學習範疇以遊戲串連", value: "校方按幼稚園課程指引，以兒童為本的綜合學習和遊戲涵蓋個人與群體、大自然與生活、體能與健康、藝術與創意、幼兒數學及語文。對家長來說，可觀察孩子是否能在遊戲中操作、表達和合作。", sourceUrl: "https://www.heepwohkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "英語每日活動、普通話每週兩次", value: "校方課程頁稱設外籍教師每日英語活動，普通話活動每週兩次，並採用識字教學法。這是校方公布的安排；教育局概覽列粵語授課，表示兩種來源記錄不同層面的語言資訊。", sourceUrl: "https://www.heepwohkg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "辦學宗旨及年度招生分開閱讀", value: "校方以基督愛人精神及全人發展作辦學宗旨，網站顯示2026/27及2027/28招生消息。申請條件、日期和收費應按當屆招生頁核對。", period: "校方網站查核：2026-10", sourceUrl: "https://www.heepwohkg.edu.hk/" },
  ] }]),

  profile("156272", "教育局位置及註冊資料：2026-10；概覽：2026/27；校方網站查核：2026-10", "富瑤幼稚園位於葵涌麗瑤邨富瑤樓，教育局2026/27概覽列上午、下午及全日班、粵語授課和約1:6.8師生比例。校方網站公開地址及活動入口，未找到足以確認現屆具體課程時數的頁面。", "https://www.fy.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號156272、麗瑤邨校址及註冊狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例及核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1562720001" },
    { label: "富瑤幼稚園：校方網站", scope: "校方名稱、辦學格言、校址與課堂花絮入口。", url: "https://www.fy.edu.hk/" },
    { label: "富瑤幼稚園：聯絡我們", scope: "當前校方聯絡資料及登記地址。", url: "https://www.fy.edu.hk/%E8%81%AF%E7%B5%A1%E6%88%91%E5%80%91/" },
  ], [{ title: "公開資料有限，先核對照顧與課程安排", featured: true, note: "不以校方格言推斷教學法；網站未公開的課程、英語／普通話比例及招生細節不作補寫。", details: [
    { label: "教育局現屆概覽可作基本比較", value: "2026/27概覽按校址0001列上午、下午及全日班、粵語授課和約1:6.8師生比例。比率可協助理解概覽所載的人手配置，但不保證每班實際人數，也不是學額數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1562720001" },
    { label: "課程細節宜直接向學校索取", value: "校方網站現有公開頁主要提供學校及聯絡入口，未找到當屆逐級課程、語言課時和招生準則的詳細說明。選校前可向校方索取一週時間表、課程簡介及最新收費表，尤其核實全日班膳食和接送安排。", period: "校方網站查核：2026-10", sourceUrl: "https://www.fy.edu.hk/" },
  ] }]),
];

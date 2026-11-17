import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Image from "next/image";
import { EDITORIAL_REVIEWER, METHODOLOGY_DESCRIPTION, METHODOLOGY_UPDATED_AT } from "@/lib/editorial-policy";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { ORGANIZATION_ID, breadcrumbJsonLd, jsonLdGraph, serializeJsonLd, webPageJsonLd } from "@/lib/structured-data";

function methodologyJsonLd(locale: Locale) {
  const path = "/about/data-methodology";
  return jsonLdGraph(locale, [
    { ...webPageJsonLd({ path, title: "資料來源與評估方法", description: METHODOLOGY_DESCRIPTION, locale, type: "AboutPage" }), dateModified: METHODOLOGY_UPDATED_AT, about: { "@id": ORGANIZATION_ID } },
    breadcrumbJsonLd(path, [{ name: "首頁", path: "/" }, { name: "資料來源與評估方法", path }], locale),
  ]);
}

const sections = [
  {
    title: "資料從哪裡來",
    paragraphs: [
      "學校名錄涵蓋幼稚園、小學與中學，身份及校址主要按教育局「學校位置及資料」及學校登記資料整理；課程、學費、師資和校方理念再參考幼稚園概覽（KGP）、小學概覽（PSP）、中學概覽（SSP）及各校公開資料。概覽中的教學理念是學校自述，不等於獨立成效評估。不同欄位的資料年份可能不同，請以各頁標示的來源及校方當屆公布為準。",
      "報告亦可能引用校方網站、公開媒體報道及家長公開討論。家長分享只反映個別經驗，不代表學校政策或所有家庭的共同經歷。",
    ],
  },
  {
    title: "資料怎樣整理和更新",
    paragraphs: [
      "先找教育局或學校原件，記下校名、校址、適用學年和查閱日。報名、面試、放榜及註冊分別核對，不能把某一屆的日期套到下一屆。師資統計與收費的年份也要分開標示。",
      "兩份官方資料有出入時，先檢查是否同一校址、年級、學年及收費範圍，再找正式通告或收費證明。仍無法釐清的，同時列出差異和待問事項，不把兩個不同數字寫成互相印證。",
      "家長經驗與平台分析另行標示。個別取錄名單不能換算成全校錄取率；沒有申請人數和獲錄人數，就不給孩子估算成功概率。",
    ],
  },
  {
    title: "誰負責哪一類內容",
    paragraphs: [
      "港學薈對本站資料的整理、分析和更正負責，內容審核署名為Max Jia。教育局和學校是原始資料來源，不為本站的比較、評分或建議背書。",
      "文章的日期和來源說明，表示該頁所列內容的整理範圍，不代表全站已在同一天重查。未確認的欄位會保留標示；學校自述的教學理念，也不等於獨立驗證的學習成效。",
    ],
  },
  {
    title: "發現資料有誤，怎樣幫我們更正",
    paragraphs: [
      "透過本頁的微信或WhatsApp入口，把文章網址、具體句子或欄位、疑似錯誤和官方連結一併發來。涉及孩子的通知，先遮去姓名、申請編號及證件資料。",
      "我們會對照原件，分辨是年份不同、校方更新，還是本站整理有誤。確認後修正文與摘要，補上修訂日期；仍有衝突的保留待核說明。面試或註冊快到期時，請直接向學校確認，勿等待網站更正才處理。",
    ],
  },
  {
    title: "數據與分析怎樣區分",
    paragraphs: [
      "學費、校網、班級、師生比例等可核對資料，與報告中的定位分析、評分和擇校觀察並非同一類內容。遇到主觀分析，請把它當作整理思路的參考，不要當成官方結論或錄取預測。",
      "報告正文會用「來源說明」「平台分析」「公開分享」和「待核」等標籤，協助你分辨內容性質；多方核實、單一可靠來源和有限來源則說明來源交叉程度。這些標示不代表所有報告都採用完全相同的評分公式。",
    ],
  },
  {
    title: "評分可以怎樣使用",
    paragraphs: [
      "港學荟的學校評分及分級屬平台整理與分析，並非教育局或學校的官方評級。不同學校類型、資料年份或報告維度不一定適合直接橫向比較。",
      "分數不代表孩子的取錄機會，也不保證升學結果。選校時還要核對家庭需要、收生條件、校網、課程、交通和實際預算。",
    ],
  },
  {
    title: "幼稚園擇校參考評級（2026 年 10 月試行）",
    paragraphs: [
      "新加入的幼稚園報告會按課程特色、師資與支援、升小證據、申請與費用透明度，以及家庭適配限制，給出 A 或 B 的編輯參考級別。A 表示有較充分的官方資料和清楚的適用家庭；B 表示值得納入候選，但仍有重要條件需要書面核對。B 不代表教學質素差。",
      "這項擇校參考評級與較早按家長平台共識整理的 S／A+／A 名氣分級口徑不同，不宜直接排序。沒有可核算的多屆升小結果時，不會因個別取錄名單或校名而給予 S／A+；教育局質素評核也須連同評核年份及改善建議閱讀。",
      "學費看適用學年，師資看統計月份。即使同在一份概覽內，也不能把所有欄位都當作今年的即時資料。",
    ],
  },
  {
    title: "小學條件式參考評級（2026 年 10 月）",
    paragraphs: [
      "新加入的小學報告會分別查核升中路徑、教學實施、家庭成本與申請安排，以及家庭適配和可追溯的口碑。等級是編輯對具體家庭選校價值的判斷，並非教育局評級、全港排名或升中取錄率；沒有加權總分，資料未公開亦不會被算作零分。",
      "A 表示升中制度及至少一屆具名去向人數可核對，另有獨立課堂評估，適合相關家庭重點比較。B 表示課程、費用和升中制度清楚，值得列入候選，但逐校人數、畢業分母或獨立課堂資料等關鍵條件仍需向學校查證。B 不等於教學質素差。S／A+ 需要更完整的多屆結果及獨立證據。",
      "報告會另列資料把握程度及限制：聯繫中學不等於直升，目的校名單不等於全體去向，家長留言也不能推成全校共識。這套條件式口徑與尚未按此方法重評的舊小學報告分級不可直接排序；請先看第一章的具體理由，再按孩子的校網、語言和通勤條件判斷。",
    ],
  },
  {
    title: "資料時效與引用",
    paragraphs: [
      "不同資料集有各自的日期，不能把全站視為同一天的快照。三學段名錄的學校位置資料截至 2026 年 9 月 30 日（教育局於 10 月 5 日更新）；非政府學校登記狀態按 2026 年 10 月 23 日的每日資料配對。政府學校不在這份非政府學校登記檔內，不能因未能配對而判定未註冊。",
      "課程與收費保留概覽的適用學年；中學中文資料可配對的部分來自《中學概覽 2025/26》，其他學段及個別校方資料的年份請看欄位旁的來源。概覽內的在讀人數、容額和班數是不同指標，不能直接當作當屆招生學額。",
      "公開 JSON 檔為 2026 年 9 月 4 日的舊版工具資料快照，內含 126 份報告元資料，不代表目前網站全部學校或報告庫。查閱現有學校請從三學段名錄進入；深度分析以各份報告的來源和核對日期為準。",
      "引用本網站內容時，請連同學校名稱、學段、適用學年、原頁連結及其來源說明一起引用；如涉及收生、學費或課程安排，請再查閱教育局或學校當年的正式公布。",
    ],
  },
];

const officialSources = [
  {
    label: "教育局：學校位置及資料",
    href: "https://data.gov.hk/en-data/dataset/hk-edb-schinfo-school-location-and-information",
    note: "三學段學校身份、辦學類別及校址的基礎名錄；同一學校與不同校址分別識別。",
  },
  {
    label: "教育局：學校登記資料",
    href: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml",
    note: "非政府學校的登記狀態、聯絡及授課資料。政府學校不在這份登記檔內。",
  },
  {
    label: "教育局：小學概覽（PSP）",
    href: "https://www.edb.gov.hk/psp_sc/",
    note: "小學基本資料、校網及部分收生相關欄位的主要公開入口。",
  },
  {
    label: "教育局：幼稚園教育概覽",
    href: "https://www.edb.gov.hk/en/edu-system/preprimary-kindergarten/overview/index.html",
    note: "幼稚園教育制度、公開資料及相關安排的官方入口。",
  },
  {
    label: "家校會：《中學概覽 2025/26》中文開放資料",
    href: "https://www.chsc.hk/datagovhk/ssp_2025_2026_tc.csv",
    note: "可唯一配對的本地中學課程、語言政策、校訓及教學安排；內容由學校提供。",
  },
  {
    label: "教育局：小學教育",
    href: "https://www.edb.gov.hk/en/edu-system/primary-secondary/primary/index.html",
    note: "小學教育制度與政策背景的官方說明。",
  },
];

export default function MethodologyPage({ locale = "tc" }: { locale?: Locale }) {
  const jsonLd = methodologyJsonLd(locale);

  return (
    <main className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <SiteHeader locale={locale} />
      <article className="mx-auto max-w-[1000px] px-4 pb-24 pt-8">
        <nav aria-label={L("麵包屑", locale)} className="mb-8 text-sm text-[var(--p-secondary)]">
          <a href={localeHref("/", locale)} className="text-[var(--p-fg)] underline underline-offset-4">
            {L("首頁", locale)}
          </a>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{L("資料來源與評估方法", locale)}</span>
        </nav>

        <header className="mb-10 max-w-[780px]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--p-secondary)]">
            {L("資料說明", locale)}
          </p>
          <h1 className="mt-3 font-serif text-[clamp(34px,6vw,58px)] font-bold leading-tight text-[var(--p-fg)]">
            {L("資料來源與評估方法", locale)}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--p-secondary)]">
            {L(METHODOLOGY_DESCRIPTION, locale)}
          </p>
          <p className="mt-4 text-sm text-[var(--p-secondary)]">{L("內容審核與更正", locale)}：{EDITORIAL_REVIEWER} · {L("本頁修訂", locale)} <time dateTime={METHODOLOGY_UPDATED_AT}>{METHODOLOGY_UPDATED_AT}</time></p>
          <a href="#corrections" className="mt-3 inline-block py-2 font-semibold underline underline-offset-4">{L("發現資料有誤？查看更正入口", locale)} →</a>
        </header>

        <section className="mb-8 rounded-xl border border-[var(--p-gray-300)] p-5 sm:p-7" aria-labelledby="brand-identity">
          <h2 id="brand-identity" className="font-serif text-2xl font-bold">{L("核對品牌，先看官網域名", locale)}</h2>
          <p className="mt-3 leading-7 text-[var(--p-secondary)]">{L("本站名稱為港學薈，官網為hkschool.guide，提供香港學校資料與升學規劃內容。其他帳號或服務即使同名，也不能單憑名稱判定與本站有關。", locale)}</p>
        </section>

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          <a
            href={localeHref("/reports", locale)}
            className="rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-5 text-[var(--p-fg)] no-underline transition-transform hover:-translate-y-0.5"
          >
            <span className="font-serif text-xl font-bold">{L("看學校報告", locale)}</span>
            <span className="mt-2 block text-sm text-[var(--p-secondary)]">
              {L("查看各校的來源註記、資料年份與分析內容。", locale)}
            </span>
          </a>
          <a
            href="/data/school-data.json"
            className="rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-5 text-[var(--p-fg)] no-underline transition-transform hover:-translate-y-0.5"
          >
            <span className="font-serif text-xl font-bold">{L("查看舊版工具資料快照", locale)}</span>
            <span className="mt-2 block text-sm text-[var(--p-secondary)]">
              {L("2026-09-04 舊版 JSON，含 126 份報告元資料；不代表目前完整名錄。", locale)}
            </span>
          </a>
        </div>

        <section className="mb-10 rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-gray-100)] p-5 sm:p-7">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">
            {L("主要官方來源入口", locale)}
          </h2>
          <p className="mt-3 leading-7 text-[var(--p-secondary)]">
            {L(
              "以下是本網站整理學校資料時使用的官方入口。不同學校、欄位和年份的來源可能不同；請以各頁標示的來源和日期為準。",
              locale
            )}
          </p>
          <ul className="mt-4 space-y-3">
            {officialSources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[var(--p-fg)] underline underline-offset-4"
                >
                  {L(source.label, locale)}
                </a>
                <span className="ml-2 text-sm text-[var(--p-secondary)]">
                  {L(source.note, locale)}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="space-y-5">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-5 sm:p-7"
            >
              <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">
                <span className="mr-3 font-mono text-sm text-[var(--p-secondary)]">0{index + 1}</span>
                {L(section.title, locale)}
              </h2>
              <div className="mt-4 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="m-0 leading-8 text-[var(--p-secondary)]">
                    {L(paragraph, locale)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section id="corrections" className="mt-8 scroll-mt-6 rounded-xl border border-[var(--p-gray-300)] p-5 sm:p-7" aria-labelledby="correction-title">
          <h2 id="correction-title" className="font-serif text-2xl font-bold">{L("資料更正，直接聯絡我們", locale)}</h2>
          <p className="mt-3 leading-7 text-[var(--p-secondary)]">{L("透過以下現有聯絡入口提出資料更正，由Max Jia跟進。請附文章網址、原句或欄位、問題及官方依據。", locale)}</p>
          <div className="mt-5 flex flex-wrap gap-6">
            {[{ name: "微信", src: "/brand/wechat-qr.jpg", width: 630 }, { name: "WhatsApp", src: "/brand/whatsapp-qr.jpg", width: 515 }].map((channel) => <a key={channel.src} href={channel.src} target="_blank" rel="noreferrer" className="block text-center underline underline-offset-4">
              <Image src={channel.src} width={channel.width} height={channel.width} alt={L(`${channel.name}聯絡二維碼`, locale)} unoptimized className="mb-2 h-32 w-32 object-contain" />
              {L(`查看${channel.name}二維碼`, locale)}
            </a>)}
          </div>
          <p className="mt-5 rounded-lg bg-[var(--p-gray-100)] p-4 text-sm leading-7">{L("更正訊息範本：文章網址［　］；原句／欄位［　］；疑似錯誤［　］；官方來源及適用年份［　］。", locale)}</p>
        </section>

        <aside className="mt-8 rounded-xl border-l-4 border-[var(--p-green)] bg-[var(--p-gray-100)] p-5 text-sm leading-7 text-[var(--p-secondary)]">
          {L(
            "使用提醒：學校收生、學費、課程和學位安排以教育局及校方最新公布為準；港學荟的評分和分析只供家長整理選校資訊時參考。",
            locale
          )}
        </aside>
      </article>
      <SiteFooter locale={locale} />
    </main>
  );
}

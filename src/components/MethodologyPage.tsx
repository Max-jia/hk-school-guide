import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

function methodologyJsonLd(locale: Locale) {
  const pageUrl = `${SITE_URL}${localeHref("/about/data-methodology", locale)}`;
  const organizationId = `${SITE_URL}/#organization`;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: L("資料來源與評估方法", locale),
    description: L(
      "港學薈學校資料、來源標示、評估分析及使用限制說明。",
      locale
    ),
    url: pageUrl,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: L("首頁", locale), item: `${SITE_URL}${localeHref("/", locale)}` },
        { "@type": "ListItem", position: 2, name: L("資料來源與評估方法", locale), item: pageUrl },
      ],
    },
  };
}

const sections = [
  {
    title: "資料從哪裡來",
    paragraphs: [
      "學校基本資料主要整理自香港教育局學校概覽（小學 PSP、幼稚園 KGP）及各校公開資料。不同欄位的資料年份可能不同；報告會在相關內容附近列出來源或年份，請以該校最新公布為準。",
      "報告亦可能引用校方網站、公開媒體報道及家長公開討論。家長分享只反映個別經驗，不代表學校政策或所有家庭的共同經歷。",
    ],
  },
  {
    title: "資料怎樣整理和更新",
    paragraphs: [
      "我們先把教育局、學校公開資料、公開報道和家長公開分享分開記錄，再把可以核對的內容整理到學校欄位。能找到來源網址、資料年份或核驗日期的，會在相關頁面保留；找不到的內容不應被寫成已核實事實。",
      "校網、收生安排、學費、課程、學額和升學規則都有時效。這些欄位不能只靠一次快照長期沿用；家長作決定前，應查看頁面標示的年份和來源，並向教育局或學校核對當屆安排。",
      "港學荟的整理和分析由平台內容流程維護；報告中的平台評分、定位和建議不等同教育局、學校或招生機構的官方結論。",
    ],
  },
  {
    title: "誰負責哪一類內容",
    paragraphs: [
      "教育局制度、學校公開資料、課程和收生欄位，先按來源網址、資料年份和核驗日期整理；沒有足夠來源的內容會保留為待核，不能當作已確認事實。",
      "平台分析、比較、評分和選校建議由港學荟的內容流程整理，目的是幫家長提出下一步要核對的問題，不代表教育局、學校或具官方資格的招生意見。",
      "如果不同來源有出入，應優先查看教育局或學校當年正式公布，再把報告中的資料年份、來源和限制一起閱讀。網站會按資料更新逐步修訂公開內容，不會用沒有證據的作者資歷或第三方背書代替核驗。",
    ],
  },
  {
    title: "發現資料有誤，怎樣幫我們更正",
    paragraphs: [
      "如果你發現學費、校網、收生日期、課程或學校基本資料可能過期，請一併記下學校名稱、報告章節或欄位、問題內容，以及教育局或學校官方來源連結。只有指出具體欄位和來源，才方便我們重現和核對。",
      "收到資料後，我們會先分辨是來源年份不同、校方更新未同步，還是平台整理錯誤；必要時保留「待核」標示，不會在未完成核對前把家長提供的單一說法當成官方事實。修訂後會更新相關頁面的來源範圍和核驗日期。",
      "本頁不承諾所有資料即時更新，也不代替學校或教育局處理申請。涉及當屆收生、學費或學位的決定，仍應以官方最新公告為準。",
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
      "例如德萃的 2025/26 校方收費頁與幼稚園概覽的年費口徑不同，報告會同時列出兩者，將當屆書面收費列為家長下一步核對事項。評級、學費和收生資料均須隨新公告再評估。",
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
      "公開學校資料會更新。網站學校資料快照標示日期為 2026 年 9 月 4 日；個別報告或文章可能採用不同年度的資料。查看數字時，請一併留意該頁標出的來源和年份。",
      "引用本網站內容時，請連同原頁及其來源說明一起引用；如涉及收生、學費或課程安排，請再查閱教育局或學校當年的正式公布。",
    ],
  },
];

const officialSources = [
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            {L(
              "這裡說明港學荟的學校資料從哪裡整理、報告評分代表甚麼，以及閱讀時需要留意的限制。",
              locale
            )}
          </p>
        </header>

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
            <span className="font-serif text-xl font-bold">{L("查看結構化學校資料", locale)}</span>
            <span className="mt-2 block text-sm text-[var(--p-secondary)]">
              {L("開啟公開的學校資料 JSON 快照。", locale)}
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

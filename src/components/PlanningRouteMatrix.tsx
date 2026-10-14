import { L, type Locale } from "@/lib/i18n";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type RouteKey = EducationRoute;

type MatrixRow = {
  label: string;
  dse: string;
  ib: string;
  "a-level": string;
};

const ROUTE_LABELS: Record<RouteKey, string> = {
  dse: "DSE",
  ib: "IB",
  "a-level": "A-Level",
};

const ROUTE_INTRO: Record<RouteKey, string> = {
  dse: "本地課程與公開考試路線，下一步要把學校實際科目、選科和本地／海外出口分開核對。",
  ib: "國際課程框架，下一步要先確認學校開辦的學段、語言、評核方式和銜接安排。",
  "a-level": "以國際考試資格為主，下一步要核對考試局、科目組合、成績要求和目標地區申請規則。",
};

const MATRIX_ROWS: MatrixRow[] = [
  {
    label: "先確認什麼",
    dse: "學校是否提供完整高中階段、哪些選修科，以及實際教學與評估安排。",
    ib: "學校提供 PYP、MYP 還是 DP；是否由同一校網銜接，及實際授課語言。",
    "a-level": "學校提供 IGCSE、AS 還是 A-Level；考試局和目標科目是否固定。",
  },
  {
    label: "主要比較材料",
    dse: "學校課程文件、科目表、HKDSE 及 JUPAS 當屆官方資料。",
    ib: "IB 官方課程資料、學校 subject guide、評核及升學要求。",
    "a-level": "考試局 syllabus、學校科目表、院校入學要求及申請時間線。",
  },
  {
    label: "不能直接推斷",
    dse: "DSE 成績或學校名次不能直接等同個人錄取機會。",
    ib: "有 IB 課程不等於每個學段都開辦，也不代表所有出口都相同。",
    "a-level": "A-Level 名稱不等於每所學校的科目、考試局和海外認可完全相同。",
  },
  {
    label: "需要列入成本",
    dse: "學費、交通、補習／支援、考試和申請的時間成本。",
    ib: "學費、評核與活動要求、額外支援，以及轉換路線的成本。",
    "a-level": "學費、考試費、科目補強、申請費和目標地區的生活成本。",
  },
  {
    label: "保留的後手",
    dse: "按孩子進度保留其他課程資格或不同升學申請渠道。",
    ib: "先確認轉換窗口，不把國際課程當作不能回頭的單一路線。",
    "a-level": "按目標地區和科目需要，保留 DSE 或 IB 的比較資料。",
  },
];

const ROUTE_ORDER: RouteKey[] = ["dse", "ib", "a-level"];

export default function PlanningRouteMatrix({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const focus = route ? ROUTE_LABELS[route] : L("尚未選定", locale);
  const stageNote = stage === "secondary"
    ? "中學階段先比較學校實際開辦的課程，再把出口和申請要求接上。"
    : "這張表只作為早期方向整理；真正選校前，仍要回到當前階段和目標學校的公開資料。";

  return (
    <section className="mx-auto w-full min-w-0 max-w-[1280px] px-4 pb-14" aria-labelledby="planning-route-matrix-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">05 / {L("路線比較矩陣", locale)}</p>
            <h2 id="planning-route-matrix-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
              {L("先比較要核對的東西，再比較學校名稱", locale)}
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--p-secondary)]">{L(`目前主線：${focus}`, locale)}</span>
        </div>
        <p className="mt-3 max-w-[800px] text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("這不是路線排名、匹配分數或錄取預測，而是一張比較工作表：把制度、校本資料、成本和後手放在同一個框架內。", locale)}
        </p>
        <div className="mt-4 border-l-4 border-[var(--p-green)] bg-[var(--p-gray-50)] px-4 py-3 text-sm leading-relaxed text-[var(--p-secondary)]">
          {L(stageNote, locale)}
        </div>

        <div className="mt-6 min-w-0 max-w-full overflow-x-auto border border-[var(--p-gray-300)] bg-[var(--p-card)]">
          <table className="min-w-[760px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[var(--p-fg)]">
                <th scope="col" className="w-[18%] p-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--p-secondary)]">{L("比較維度", locale)}</th>
                {ROUTE_ORDER.map((key) => (
                  <th
                    key={key}
                    scope="col"
                    className={`p-4 align-top ${route === key ? "bg-[var(--p-bg-yellow)]" : ""}`}
                  >
                    <span className="font-serif text-2xl font-bold text-[var(--p-fg)]">{ROUTE_LABELS[key]}</span>
                    <span className="mt-2 block text-sm font-normal leading-relaxed text-[var(--p-secondary)]">{L(ROUTE_INTRO[key], locale)}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX_ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[var(--p-gray-300)] last:border-b-0">
                  <th scope="row" className="p-4 align-top font-mono text-xs font-bold text-[var(--p-fg)]">{L(row.label, locale)}</th>
                  {ROUTE_ORDER.map((key) => (
                    <td key={key} className={`p-4 align-top text-sm leading-relaxed text-[var(--p-secondary)] ${route === key ? "bg-[var(--p-bg-yellow)]/40" : ""}`}>
                      {L(row[key], locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--p-secondary)]">
          {L("表內的路線描述是研究框架，不代表所有學校或大學的實際要求；涉及開辦、科目、收生、費用和截止日期，必須逐校逐年核實。", locale)}
        </p>
      </div>
    </section>
  );
}

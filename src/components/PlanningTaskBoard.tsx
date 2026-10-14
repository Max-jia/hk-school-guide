"use client";

import { useEffect, useMemo, useState } from "react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { trackPlanningEvent } from "@/lib/analytics";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type Task = {
  id: string;
  kind: "事实" | "材料" | "行动" | "备选";
  title: string;
  description: string;
  href?: string;
};

const STAGE_TASKS: Record<PlanningStage, Task[]> = {
  kindergarten: [
    { id: "conditions", kind: "材料", title: "列出家庭不能退让的条件", description: "校网、預算、語言、接送和照顧安排，先分清必要與可調整。", href: "/tools" },
    { id: "schools", kind: "事实", title: "核对三所幼稚园的公开资料", description: "查看收生、學費、班級、教學語言和升小安排，不把宣傳語句當成結論。", href: "/reports" },
    { id: "visit", kind: "行动", title: "安排一次到访或直接向校方提问", description: "把公開資料沒有回答的問題整理成清單，再以當年度校方公告核實。" },
    { id: "shortlist", kind: "备选", title: "保留两至三所候选学校", description: "先保留不同取向的選擇，再按申請結果和家庭變化調整。", href: "/shortlist" },
  ],
  "primary-one": [
    { id: "self-check", kind: "事实", title: "确认自行分配计分和资格", description: "逐項對照官方規則，分清必收資格、計分項目和同分抽籤。", href: "/tools/p1-self-check" },
    { id: "school-net", kind: "材料", title: "核对校网、性别和学校条件", description: "把孩子可以選、想試和不適合的學校分開，不只按熱門度排序。", href: "/tools/p1-discretionary" },
    { id: "simulator", kind: "行动", title: "分开整理甲部和乙部志愿", description: "先理解兩套規則，再用模擬器檢查志願次序和滑檔風險。", href: "/tools/p1-simulator" },
    { id: "p1-backup", kind: "备选", title: "预留叩门和替代方案", description: "不要等放榜後才開始找後手，先記下需要核對的申請窗口和文件。" },
  ],
  primary: [
    { id: "compare", kind: "事实", title: "先比较两至三所学校", description: "把入學途徑、收費、校網、語言和升中安排放在同一張表。", href: "/compare" },
    { id: "reports", kind: "事实", title: "逐校查看来源和核验状态", description: "先看公開資料和核驗日期，再把平台分析與官方事實分開。", href: "/reports" },
    { id: "transition", kind: "行动", title: "记录下一次升学节点", description: "把升中、轉校或課程選擇的時間點寫下來，不等到最後一年才處理。" },
    { id: "primary-backup", kind: "备选", title: "保留一所不同取向的学校", description: "用不同課程、地區或費用取向保留一個可行後手。", href: "/shortlist" },
  ],
  secondary: [
    { id: "programme", kind: "事实", title: "核对学校实际开办的课程", description: "不要把英文教學、國際化或學校名稱直接等同於 DSE、IB 或 A-Level。", href: "#planning-route-title" },
    { id: "requirements", kind: "材料", title: "列出招生和升学要求", description: "按學校、學段和課程分開記錄，未有官方來源的項目先標為待核實。", href: "#planning-route-title" },
    { id: "route-review", kind: "行动", title: "比较主线与备选路线", description: "明确目前先看哪條路，以及什麼情況下需要重新評估。" },
    { id: "secondary-backup", kind: "备选", title: "保留一个可切换的出口", description: "先記下 DSE、IB、A-Level 之間的轉換成本和待確認問題，不急於下結論。", href: "#planning-route-title" },
  ],
};

const ROUTE_TASKS: Record<EducationRoute, Task[]> = {
  dse: [
    { id: "dse-basics", kind: "事实", title: "先看 DSE、JUPAS 和出口关系", description: "把考試、選科、本地大學、海外和非聯招出口分開理解。", href: "#planning-route-title" },
    { id: "dse-school", kind: "材料", title: "核对学校实际课程和科目", description: "以學校和官方公開資料為準，不用學校標籤推斷實際開辦科目。", href: "#planning-route-title" },
    { id: "dse-next", kind: "行动", title: "写下下一次要作的决定", description: "先決定要比較學校、課程，還是選科和升學出口。" },
    { id: "dse-backup", kind: "备选", title: "保留 IB 或 A-Level 作为比较对象", description: "備選不是預測結果，只是避免家庭過早鎖定單一路線。", href: "#planning-route-title" },
  ],
  ib: [
    { id: "ib-stage", kind: "事实", title: "确认学校开办的 IB 学段", description: "先分清 PYP、MYP、DP 和實際銜接，不把 IB 名稱當成完整路線證明。", href: "#planning-route-title" },
    { id: "ib-assessment", kind: "材料", title: "核对课程和评核方式", description: "记录學校課程安排、語言要求、評核方式和家庭配合成本。", href: "#planning-route-title" },
    { id: "ib-next", kind: "行动", title: "对照目标升学地区要求", description: "按目標地區記錄需要向學校和大學官方資料核對的事項。" },
    { id: "ib-backup", kind: "备选", title: "保留 DSE 或 A-Level 比较", description: "先記錄轉換時點和成本，不把備選路線寫成排除結論。", href: "#planning-route-title" },
  ],
  "a-level": [
    { id: "alevel-stage", kind: "事实", title: "确认学校提供的资格阶段", description: "分清 IGCSE、AS、A-Level 和實際開辦科目，逐校核實。", href: "#planning-route-title" },
    { id: "alevel-subjects", kind: "材料", title: "列出目标科目和地区要求", description: "把選科、預測成績、申請文件和截止時間分開整理。", href: "#planning-route-title" },
    { id: "alevel-next", kind: "行动", title: "先比较学校课程和成本", description: "將學費、考試、補強和海外申請成本放在同一個決策框架。", href: "#planning-route-title" },
    { id: "alevel-backup", kind: "备选", title: "保留 DSE 或 IB 比较", description: "備選路線要寫清切換窗口和需要補足的資料。", href: "#planning-route-title" },
  ],
};

const kindLabel: Record<Task["kind"], string> = { 事实: "事实", 材料: "材料", 行动: "行动", 备选: "备选" };

function storageKey(stage?: PlanningStage, route?: EducationRoute) {
  return `hk-guide-planning-tasks-v1:${stage ?? "none"}:${route ?? "none"}`;
}

function readCompleted(key: string): string[] {
  try {
    const raw = window.localStorage.getItem(key);
    const value = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) && value.every((item) => typeof item === "string") ? value : [];
  } catch {
    return [];
  }
}

export default function PlanningTaskBoard({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const tasks = useMemo(() => (stage ? STAGE_TASKS[stage] : route ? ROUTE_TASKS[route] : []), [route, stage]);
  const key = useMemo(() => storageKey(stage, route), [route, stage]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    // Read browser-only task state after hydration.
    setCompleted(readCompleted(key));
  }, [key]);

  if (tasks.length === 0) return null;

  const toggle = (task: Task) => {
    setCompleted((current) => {
      const next = current.includes(task.id) ? current.filter((id) => id !== task.id) : [...current, task.id];
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Progress remains available for this session if storage is blocked.
      }
      if (!current.includes(task.id)) {
        trackPlanningEvent("planning_task_completed", { stage, route, task: task.id, source: "planning" });
      }
      return next;
    });
  };

  const reset = () => {
    setCompleted([]);
    try {
      window.localStorage.removeItem(key);
    } catch {
      // No-op when storage is blocked.
    }
  };

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-task-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">08 / {L("行动任务板", locale)}</p>
            <h2 id="planning-task-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">{L("把资料、动作和后手分开处理", locale)}</h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-[var(--p-secondary)]">
            <span>{L(`已完成 ${completed.length} / ${tasks.length}`, locale)}</span>
            {completed.length > 0 && <button type="button" onClick={reset} className="font-bold text-[var(--p-fg)] underline underline-offset-2">{L("重新开始", locale)}</button>}
          </div>
        </div>
        <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">{L("这不是学校官方时间表，而是把当前规划拆成可以逐项完成的工作。勾选状态只保存在这个浏览器。", locale)}</p>
        <ol className="m-0 mt-6 grid list-none gap-3 p-0 md:grid-cols-2">
          {tasks.map((task, index) => {
            const done = completed.includes(task.id);
            return (
              <li key={task.id} className={`border border-[var(--p-gray-300)] p-4 ${done ? "bg-[var(--p-gray-50)]" : "bg-[var(--p-card)]"}`}>
                <div className="flex items-start gap-3">
                  <input type="checkbox" checked={done} onChange={() => toggle(task)} aria-label={`${L("完成", locale)} ${L(task.title, locale)}`} className="mt-1 h-4 w-4 shrink-0 accent-[var(--p-fg)]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--p-secondary)]">{index + 1} · {L(kindLabel[task.kind], locale)}</span>
                      {done && <span className="font-mono text-[10px] font-bold text-[#0F766E]">{L("已完成", locale)}</span>}
                    </div>
                    <h3 className={`mt-2 font-serif text-xl font-bold leading-tight text-[var(--p-fg)] ${done ? "line-through decoration-2" : ""}`}>{L(task.title, locale)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(task.description, locale)}</p>
                    {task.href && <a href={task.href.startsWith("#") ? task.href : localeHref(task.href, locale)} className="mt-4 inline-flex font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline">{L("打开相关资料", locale)} →</a>}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

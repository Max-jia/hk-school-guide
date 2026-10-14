"use client";

import { L, type Locale } from "@/lib/i18n";
import { summarizeReportActions, type ReportActionTimeline } from "@/lib/report-action-timeline";

function Signal({ found, locale }: { found: boolean; locale: Locale }) {
  return (
    <span className={`font-mono text-[10px] font-bold ${found ? "text-[#0F766E]" : "text-[var(--p-secondary)]"}`}>
      {found ? L("正文有提及", locale) : L("当前章节未提及", locale)}
    </span>
  );
}

function actionLabel(category: ReportActionTimeline["datedActions"][number]["category"], locale: Locale) {
  const labels = {
    application: "申请窗口",
    interview: "面试或评估",
    visit: "开放日或到访",
    transfer: "候补或插班",
    other: "正文时间提示",
  } as const;
  return L(labels[category], locale);
}

export default function ReportActionTimeline({
  body,
  locale = "tc",
}: {
  body: string;
  locale?: Locale;
}) {
  // 只分析公开 body；付费 premiumHtml 不会传入这个组件。
  const timeline = summarizeReportActions(body);

  return (
    <details className="mb-5 rounded-[10px] border border-[#BFDAD5] bg-[#F2FBF8] text-[var(--p-fg)]">
      <summary className="cursor-pointer list-none px-4 py-3 font-bold marker:hidden">
        <span className="mr-2 text-[#0F766E]">→</span>
        {L("申请与到访行动时间线", locale)}
        <span className="ml-2 text-sm font-normal text-[var(--p-secondary)]">
          {L("按公开章节提示安排下一步", locale)}
        </span>
      </summary>
      <div className="border-t border-[#BFDAD5] px-4 pb-4 pt-3">
        <p className="text-xs leading-relaxed text-[var(--p-secondary)]">
          {L("这是一张核对清单，不是学校当年度日程。没有提及不代表学校没有安排，报名、面试、开放日及插班日期必须以校方最新公告为准。", locale)}
        </p>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          <li className="rounded-[8px] border border-[#BFDAD5] bg-white/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">1 · {L("申请窗口", locale)}</strong>
              <Signal found={timeline.application} locale={locale} />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--p-secondary)]">{L("先保存校方入学页面，核对当年度申请资格、截止日期和文件清单。", locale)}</p>
          </li>
          <li className="rounded-[8px] border border-[#BFDAD5] bg-white/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">2 · {L("面试或评估", locale)}</strong>
              <Signal found={timeline.interview} locale={locale} />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--p-secondary)]">{L("确认是否需要面试、笔试、作品或额外评估，并记录校方公布的形式。", locale)}</p>
          </li>
          <li className="rounded-[8px] border border-[#BFDAD5] bg-white/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">3 · {L("开放日或到访", locale)}</strong>
              <Signal found={timeline.visit} locale={locale} />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--p-secondary)]">{L("若学校开放预约，优先安排到访；重点核对课室、接送、课外活动和实际校园动线。", locale)}</p>
          </li>
          <li className="rounded-[8px] border border-[#BFDAD5] bg-white/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm">4 · {L("候补或插班", locale)}</strong>
              <Signal found={timeline.transfer} locale={locale} />
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--p-secondary)]">{L("如果错过首轮申请，另查候补、叩门或插班条件，不要把不同申请通道混为一谈。", locale)}</p>
          </li>
        </ol>
        {timeline.dateMentions.length > 0 && (
          <p className="mt-3 border-t border-[#BFDAD5] pt-3 text-xs text-[var(--p-secondary)]">
            {L("正文出现的时间提示", locale)}：{timeline.dateMentions.join(" · ")}。{L("这些不是自动确认的截止日期。", locale)}
          </p>
        )}
        {timeline.datedActions.length > 0 && (
          <div className="mt-3 border-t border-[#BFDAD5] pt-3">
            <div className="text-xs font-bold text-[var(--p-fg)]">{L("正文时间线线索", locale)}</div>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {timeline.datedActions.map((action, index) => (
                <div key={`${index}-${action.date}-${action.context}`} className="rounded-[8px] border border-[#BFDAD5] bg-white/60 p-2 text-xs leading-relaxed">
                  <div className="font-bold text-[#0F766E]">{action.date} · {actionLabel(action.category, locale)}</div>
                  <div className="mt-1 text-[var(--p-secondary)]">{action.context}</div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-[var(--p-secondary)]">{L("以上仅为正文线索摘录，不能替代学校当年度时间表。", locale)}</p>
          </div>
        )}
      </div>
    </details>
  );
}

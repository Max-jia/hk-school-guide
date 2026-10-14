"use client";

import { L, type Locale } from "@/lib/i18n";
import { summarizeReportVerification } from "@/lib/report-verification";
import { DATA_UPDATED_AT } from "@/lib/data-version";

export default function ReportVerificationPanel({
  body,
  kind,
  locale = "tc",
}: {
  body: string;
  kind: "primary" | "kindergarten";
  locale?: Locale;
}) {
  // 只接收公开 body；付费 premiumHtml 不会传入这里。
  const summary = summarizeReportVerification(body);
  const sourceProfile = kind === "primary"
    ? {
        label: "教育局学校概览（PSP）＋2027/28 小一学校网名册（官津学校适用）",
        href: "https://www.chsc.hk/psp2026/",
      }
    : {
        label: "教育局幼稚园概览（KGP）＋校方公开资料",
        href: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/index.html",
      };
  const status = summary.hasLayeredDisclaimer
    ? L("正文有分层核实说明", locale)
    : L("正文未找到统一核实分层", locale);
  const sourceStatus = summary.hasOfficialSourceMarker
    ? L("有官方或机构来源标注", locale)
    : L("未在当前章节识别到官方来源标注", locale);

  return (
    <details className="mb-5 rounded-[10px] border border-[#E8C8A9] bg-[#FFF9F1] text-[var(--p-fg)]">
      <summary className="cursor-pointer list-none px-4 py-3 font-bold marker:hidden">
        <span className="mr-2 text-[#C2410C]">⌁</span>
        {L("资料来源与核验", locale)}
        <span className="ml-2 text-sm font-normal text-[var(--p-secondary)]">
          {L("只显示当前公开章节的核验提示", locale)}
        </span>
      </summary>
      <div className="border-t border-[#E8C8A9] px-4 pb-4 pt-3">
        <div className="grid gap-3 text-sm sm:grid-cols-4">
          <div>
            <div className="text-xs text-[var(--p-secondary)]">{L("核验说明", locale)}</div>
            <div className="mt-1 font-bold">{status}</div>
          </div>
          <div>
            <div className="text-xs text-[var(--p-secondary)]">{L("资料基准", locale)}</div>
            <a href={sourceProfile.href} target="_blank" rel="noreferrer" className="mt-1 block font-bold underline underline-offset-2">
              {L(sourceProfile.label, locale)}
            </a>
          </div>
          <div>
            <div className="text-xs text-[var(--p-secondary)]">{L("来源标注", locale)}</div>
            <div className="mt-1 font-bold">
              {summary.sourceNotes.length} {L("条来源注释", locale)}
            </div>
          </div>
          <div>
            <div className="text-xs text-[var(--p-secondary)]">{L("时间标注", locale)}</div>
            <div className="mt-1 font-bold">
              {summary.freshness || L("当前章节未统一标注", locale)}
            </div>
            <div className="mt-1 text-[11px] font-normal text-[var(--p-secondary)]">
              {L("本站数据核对", locale)}：{DATA_UPDATED_AT}
            </div>
          </div>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-[var(--p-secondary)]">{sourceStatus}。{L("资料基准和本站数据核对时间适用于本报告的公开数据层；正文中的时间标注若缺失，不代表校方没有更新。报名、学额、收费及日期应以学校或教育局最新公告为准。", locale)}</p>

        {summary.sourceNotes.length > 0 ? (
          <ul className="mt-3 space-y-2 border-t border-[#E8C8A9] pt-3 text-xs leading-relaxed text-[var(--p-secondary)]">
            {summary.sourceNotes.map((note, index) => (
              <li key={`${index}-${note.slice(0, 24)}`}>
                <span className="mr-1 font-bold text-[#C2410C]">{index + 1}.</span>
                {L(note, locale)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 border-t border-[#E8C8A9] pt-3 text-xs text-[var(--p-secondary)]">
            {L("当前公开章节没有可独立提取的来源注释，请直接查看正文中的来源标记。", locale)}
          </p>
        )}
      </div>
    </details>
  );
}

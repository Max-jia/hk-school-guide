"use client";

import { L, type Locale } from "@/lib/i18n";
import type { ReportCommuteInfo } from "@/lib/report-commute";

export default function ReportCommutePanel({
  info,
  locale = "tc",
}: {
  info: ReportCommuteInfo;
  locale?: Locale;
}) {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info.mapQuery)}`;
  const busLabel = info.schoolBus
    ? info.schoolBus === "有" || info.schoolBus === "有校車"
      ? L("现有资料标注有校车", locale)
      : info.schoolBus === "无" || info.schoolBus === "無"
        ? L("现有资料标注无校车", locale)
        : info.schoolBus
    : L("未找到校车资料", locale);

  return (
    <details className="mb-5 rounded-[10px] border border-[#BFD0E5] bg-[#F5F9FF] text-[var(--p-fg)]">
      <summary className="cursor-pointer list-none px-4 py-3 font-bold marker:hidden">
        <span className="mr-2 text-[#2563EB]">⌖</span>
        {L("到校与通勤核对", locale)}
        <span className="ml-2 text-sm font-normal text-[var(--p-secondary)]">
          {L("先确认实际接送成本", locale)}
        </span>
      </summary>
      <div className="border-t border-[#BFD0E5] px-4 pb-4 pt-3">
        <p className="text-xs leading-relaxed text-[var(--p-secondary)]">
          {L("地图按钮只打开学校名称搜索，不代表本站确认了路线或行车时间。请在上学时段分别测试步行、公共交通、校车和家长接送。", locale)}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[8px] border border-[#BFD0E5] bg-white/70 p-3">
            <div className="text-xs text-[var(--p-secondary)]">{L("地区", locale)}</div>
            <div className="mt-1 text-sm font-bold">{info.district || L("未统一标注", locale)}</div>
          </div>
          <div className="rounded-[8px] border border-[#BFD0E5] bg-white/70 p-3 sm:col-span-2">
            <div className="text-xs text-[var(--p-secondary)]">{L("地址", locale)}</div>
            <div className="mt-1 text-sm font-bold">{info.address || L("请以校方最新资料确认", locale)}</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--p-secondary)]">
          <span className="rounded-full border border-[#BFD0E5] px-3 py-1 font-bold text-[#2563EB]">{busLabel}</span>
          <span>{L("校车资料可能随年度、路线和年级调整。", locale)}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#BFD0E5] pt-3">
          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-[7px] bg-[#2563EB] px-3 py-1.5 text-xs font-bold text-white no-underline"
          >
            {L("打开地图搜索 →", locale)}
          </a>
          <span className="self-center text-xs text-[var(--p-secondary)]">{L("下一步：记录单程时间、转车次数和接送备份方案", locale)}</span>
        </div>
      </div>
    </details>
  );
}

// 数据版本与续费提示（P2：每年 9 月更新 = 复购钩子）
import { DATA_LABEL, NEXT_UPDATE_LABEL, RENEW_NOTE } from "@/lib/data-version";
import { L, type Locale } from "@/lib/i18n";

export default function DataVersionBadge({
  compact = false,
  locale = "tc",
}: {
  compact?: boolean;
  locale?: Locale;
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--p-secondary)]">
      <span className="rounded-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2.5 py-1">
        {L("数据版本：", locale)}
        {L(DATA_LABEL, locale)}
      </span>
      <span className="rounded-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2.5 py-1">
        {L("下一版：", locale)}
        {L(NEXT_UPDATE_LABEL, locale)}
      </span>
      {!compact && (
        <span className="basis-full text-[11px] leading-relaxed sm:basis-auto">{L(RENEW_NOTE, locale)}</span>
      )}
    </div>
  );
}

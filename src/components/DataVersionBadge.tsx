// 数据版本与续费提示（P2：每年 9 月更新 = 复购钩子）
import { DATA_LABEL, NEXT_UPDATE_LABEL, RENEW_NOTE } from "@/lib/data-version";

export default function DataVersionBadge({ compact = false }: { compact?: boolean }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--p-secondary)]">
      <span className="rounded-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2.5 py-1">
        数据版本：{DATA_LABEL}
      </span>
      <span className="rounded-full border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-2.5 py-1">
        下一版：{NEXT_UPDATE_LABEL}
      </span>
      {!compact && <span className="basis-full text-[11px] leading-relaxed sm:basis-auto">{RENEW_NOTE}</span>}
    </div>
  );
}

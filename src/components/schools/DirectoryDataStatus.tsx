"use client";

import { L, type Locale } from "@/lib/i18n";

export default function DirectoryDataStatus({ status, pendingFilters, retry, locale }: {
  status: "idle" | "loading" | "ready" | "error";
  pendingFilters: boolean;
  retry: () => Promise<void>;
  locale: Locale;
}) {
  if (status !== "error" && !(pendingFilters && status !== "ready")) return null;
  return <div className="my-3 rounded-lg border border-[var(--p-gray-300)] p-3 text-sm" role={status === "error" ? "alert" : "status"}>
    <p className="m-0">{L(status === "error" ? "未能載入完整名錄。當頁學校仍可瀏覽，篩選條件已保留，請重試。" : "正在載入完整名錄以套用篩選；暫時顯示當頁學校。", locale)}</p>
    {status === "error" && <button className="mt-2 underline" type="button" onClick={() => void retry()}>{L("重新載入名錄", locale)}</button>}
  </div>;
}

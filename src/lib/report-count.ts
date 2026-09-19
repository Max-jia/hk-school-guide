import reportMeta from "@/content/report-meta.json";

// 报告数量：从 report-meta.json 动态读取，避免每新增一份报告就要手动同步
// 站内多处文案（首页、目录页、导航菜单、付费墙、页脚卡片）。
//
// 背景：这个数字在 2026-09 之前是写死的「126」，新增报告后前后修过两次；
// 只要还写死就一定会再次过期。所以这里统一取单一来源。
const META = reportMeta as { PS_REPORTS: unknown[]; KG_REPORTS: unknown[] };

export const REPORT_COUNT = META.PS_REPORTS.length + META.KG_REPORTS.length;

// SEO 辅助函数:日期转 ISO、标题整理、正文提取描述

export const SITE_URL = "https://hkschool.guide";

// meta 日期「8月24日」→ ISO「2026-08-24」
export function toISODate(d: string): string {
  const m = d.match(/^(\d{1,2})月(\d{1,2})日$/);
  if (!m) return "";
  return `2026-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
}

// 不在 HTML <title> 中硬截字；搜索结果的展示长度由搜索引擎决定。
// 需要缩短的标题应在文章元数据中逐篇编辑，避免输出半句和字面省略号。
export function trimTitle(title: string): string {
  return title.replace(/\s+/g, " ").trim();
}

// 正文 → 描述:去 h1/日期行/HTML/emoji,取前 ~150 字,在句号处断
export function makeDescription(body: string): string {
  const plain = body
    .replace(/<h1>[\s\S]*?<\/h1>/g, " ")
    .replace(/<p class="blog-meta">[\s\S]*?<\/p>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  const cut = plain.slice(0, 160);
  const lastDot = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("！"), cut.lastIndexOf("?"));
  return (lastDot > 40 ? cut.slice(0, lastDot + 1) : cut).trim();
}

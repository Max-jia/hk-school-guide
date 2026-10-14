export type ReportVerificationSummary = {
  sourceNotes: string[];
  freshness: string | null;
  hasLayeredDisclaimer: boolean;
  hasOfficialSourceMarker: boolean;
};

function stripMarkup(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " · ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&middot;/gi, "·")
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&#0*34;|&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function findFreshness(source: string): string | null {
  const patterns = [
    /报告生成日期\s*[:：]\s*([^<\n。]+)/i,
    /報告生成日期\s*[:：]\s*([^<\n。]+)/i,
    /(?:数据|資料)(?:更新时间|更新日期|更新時間|更新日期)\s*[:：]\s*([^<\n。]+)/i,
    /截至\s*([^<\n。]+)/i,
    /截至\s*([^<\n。]+)/i,
  ];
  for (const pattern of patterns) {
    const match = source.match(pattern);
    if (match?.[1]) return stripMarkup(match[1]);
  }
  return null;
}

export function summarizeReportVerification(html: string): ReportVerificationSummary {
  const sourceNotes: string[] = [];
  const notePattern = /<(p|div|span)\b[^>]*class=["'][^"']*\bsource-note\b[^"']*["'][^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(notePattern)) {
    const note = stripMarkup(match[2]);
    if (note && !sourceNotes.includes(note)) sourceNotes.push(note);
  }

  const plain = stripMarkup(html);
  return {
    sourceNotes,
    freshness: findFreshness(plain),
    hasLayeredDisclaimer: /多方核实|多方核實|單一可靠來源|单一可靠来源|有限来源|有限來源/.test(plain),
    hasOfficialSourceMarker: /教育局|校方官网|校方官網|政府公开数据|政府公開數據|CHSC|EDB/.test(plain),
  };
}

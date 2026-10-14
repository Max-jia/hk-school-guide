export type ReportActionTimeline = {
  application: boolean;
  interview: boolean;
  visit: boolean;
  transfer: boolean;
  dateMentions: string[];
  datedActions: {
    category: "application" | "interview" | "visit" | "transfer" | "other";
    date: string;
    context: string;
  }[];
};

function toPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&middot;/gi, "·")
    .replace(/\s+/g, " ")
    .trim();
}

export function summarizeReportActions(html: string): ReportActionTimeline {
  const plain = toPlainText(html);
  const datePattern = /(?:20\d{2}\s*[年年]\s*)?(?:[一二三四五六七八九十两\d]{1,2}(?:\s*[-至~～]\s*[一二三四五六七八九十两\d]{1,2})?)\s*月(?:\s*\d{1,2}\s*[日号號])?/g;
  const dates = plain.match(datePattern) || [];
  const sentences = plain.split(/[。！？；]/).map((sentence) => sentence.trim()).filter(Boolean);
  const datedActions = sentences.flatMap((sentence) => {
    const date = sentence.match(datePattern)?.[0]?.trim();
    if (!date) return [];
    const category: ReportActionTimeline["datedActions"][number]["category"] = /报名|報名|申请|申請|收生|入学安排|入學安排|自行分配/.test(sentence)
      ? "application"
      : /面试|面試|笔试|筆試|评估|評估/.test(sentence)
        ? "interview"
        : /开放日|開放日|开放课堂|開放課堂|参观|參觀|校园开放|校園開放/.test(sentence)
          ? "visit"
          : /插班|叩门|叩門|候补生|候補生|求位/.test(sentence)
            ? "transfer"
            : "other";
    const context = sentence.length > 180 ? `${sentence.slice(0, 177)}…` : sentence;
    return [{ category, date, context }];
  });

  return {
    application: /申请|申請|报名|報名|收生|入学安排|入學安排|自行分配/.test(plain),
    interview: /面试|面試|笔试|筆試|评估|評估/.test(plain),
    visit: /开放日|開放日|开放课堂|開放課堂|参观|參觀|校园开放|校園開放/.test(plain),
    transfer: /插班|叩门|叩門|候补生|候補生|求位/.test(plain),
    dateMentions: [...new Set(dates.map((date) => date.trim()))].slice(0, 4),
    datedActions: datedActions.filter((action, index, all) =>
      all.findIndex((candidate) => candidate.date === action.date && candidate.context === action.context) === index
    ).slice(0, 6),
  };
}

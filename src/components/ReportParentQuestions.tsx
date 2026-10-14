"use client";

import { L, localeHref, type Locale } from "@/lib/i18n";
import questions from "@/content/questions.json";

type CuratedQuestion = {
  n: string;
  yr?: string;
  sources?: string | string[];
  rounds?: { title?: string; items?: string[] }[];
};

type QuestionDigest = {
  question: string;
  confidence: "多源" | "单源" | "未标注";
  evidence: string;
  round: string;
};

const QUESTION_BANK = (questions as (CuratedQuestion | null)[]).filter(
  (item): item is CuratedQuestion => Boolean(item?.n)
);

function normalizeName(name: string): string {
  return L(name, "sc")
    .replace(/[（）()·・\s]/g, "")
    .toLowerCase();
}

function findSchoolQuestions(schoolName: string): CuratedQuestion | null {
  const target = normalizeName(schoolName);
  if (!target) return null;
  return (
    QUESTION_BANK.find((item) => normalizeName(item.n) === target) ||
    QUESTION_BANK.find((item) => {
      const candidate = normalizeName(item.n);
      return candidate.length > 5 && (candidate.includes(target) || target.includes(candidate));
    }) ||
    null
  );
}

function buildDigests(item: CuratedQuestion): QuestionDigest[] {
  const parentPattern = /家长[:：]|家長[:：]|家庭[:：]|父母[:：]|親子|为何选择|為何選|对学校的期望|對學校的期望|培养阅读习惯|培養閱讀習慣|作息|教育理念|爸爸(?:参与|參與|教育|期望)|妈妈(?:参与|參與|教育|期望)|媽媽(?:參與|教育|期望)/;
  const candidates = (item.rounds || []).flatMap((round) => {
    const roundIsParentFocused = /家长陪同|家長陪同|家庭面见校长|家庭面見校長|家长面谈|家長面談|见校长|見校長/.test(round.title || "");
    return (round.items || [])
      .filter((entry) => parentPattern.test(entry) || roundIsParentFocused)
      .map((entry) => ({ entry, round: round.title || "家长相关环节" }));
  });

  return candidates.slice(0, 4).map(({ entry, round }) => {
    const sourceMarker = entry.match(/\[(多源|單源|单源)\]\s*(.*)$/);
    const confidence = sourceMarker?.[1] === "多源" ? "多源" : sourceMarker?.[1] ? "单源" : "未标注";
    return {
      question: sourceMarker ? entry.slice(0, sourceMarker.index).trim() : entry,
      confidence,
      evidence: sourceMarker?.[2]?.trim() || (typeof item.sources === "string" ? item.sources : (item.sources || []).join("·")),
      round,
    };
  });
}

export default function ReportParentQuestions({
  schoolName,
  locale = "tc",
}: {
  schoolName: string;
  locale?: Locale;
}) {
  const item = findSchoolQuestions(schoolName);
  if (!item) return null;
  const digests = buildDigests(item);
  if (!digests.length) return null;

  return (
    <details className="mb-5 rounded-[10px] border border-[#D8C7E8] bg-[#FBF8FF] text-[var(--p-fg)]">
      <summary className="cursor-pointer list-none px-4 py-3 font-bold marker:hidden">
        <span className="mr-2 text-[#7C3AED]">?</span>
        {L("家长问题摘要", locale)}
        <span className="ml-2 text-sm font-normal text-[var(--p-secondary)]">
          {L("公开题库整理 · ", locale)}{L(item.yr || "年份未标注", locale)}
        </span>
      </summary>
      <div className="border-t border-[#D8C7E8] px-4 pb-4 pt-3">
        <p className="text-xs leading-relaxed text-[var(--p-secondary)]">
          {L("以下只整理公开题库中出现过、且明确属于家长或家庭环节的问题，不代表本年度必考，也不等于学校官方要求。多源/单源只说明资料交叉程度，不是录取概率。", locale)}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {digests.map((digest, index) => (
            <article key={`${index}-${digest.question}`} className="rounded-[8px] border border-[#D8C7E8] bg-white/70 p-3">
              <div className="flex items-start gap-2">
                <span className="font-mono text-xs font-bold text-[#7C3AED]">Q{index + 1}</span>
                <div>
                  <p className="text-sm font-bold leading-relaxed">{L(digest.question, locale)}</p>
                  <p className="mt-1 text-[11px] text-[var(--p-secondary)]">{L(digest.round, locale)}</p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-[var(--p-secondary)]">
                <span className="rounded-full border border-[#D8C7E8] px-2 py-0.5 font-bold text-[#7C3AED]">{L(digest.confidence, locale)}</span>
                <span>{L(item.yr || "年份未标注", locale)}</span>
                {digest.evidence && <span>{L(digest.evidence, locale)}</span>}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#D8C7E8] pt-3 text-xs text-[var(--p-secondary)]">
          <span>{L("来源：公开题库中的家长分享与学校资料，具体来源见题内标注。", locale)}</span>
          <a href={localeHref("/questions", locale)} className="font-bold text-[#7C3AED] underline underline-offset-2">
            {L("查看完整题库 →", locale)}
          </a>
        </div>
      </div>
    </details>
  );
}

"use client";

import Localize from "@/components/Localize";
import { type Locale } from "@/lib/i18n";

import { useCallback, useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toPng } from "html-to-image";

const GROUP_A = [
  { v: "work", label: "父/母全职在与该小学同一校址的幼稚园或中学部工作", pts: 20 },
  { v: "sec", label: "兄/姊在与该小学同一校址的中学部就读", pts: 20 },
  { v: "manager", label: "父/母为该小学的校董", pts: 20 },
  { v: "grad", label: "父/母或兄/姊为该小学的毕业生", pts: 10 },
  { v: "first", label: "首名出生子女（家庭中最年长的孩子）", pts: 5 },
];

const GROUP_B = [
  { v: "religion", label: "与该校办学团体有相同宗教信仰", pts: 5 },
  { v: "member", label: "父/母为该小学主办社团的成员", pts: 5 },
];

const CHECKS = [
  "已对照官方计分表算过分（用上面的计算器）",
  "已确认所属校网（以住址证明为准，租住同样适用）",
  "关键日期已写入日历：9月17–25日交自行分配、11月23日放榜、1月填统一派位表",
  "志愿表有明确梯度：冲刺/匹配/保底，至少一间保底校",
  "叩门材料已备齐（出生证明、住址证明、成绩、奖项、自荐信）",
];

function bandOf(score: number) {
  if (score >= 30) return { t: "底牌很硬", d: "关系项拿满，一般学校机会很高；顶级名校同分仍要抽签，志愿别忘留保底。" };
  if (score === 25) return { t: "典型强组合", d: "校友/强关系＋宗教＋适龄。一般学校机会不错；热门学校竞争仍大，统一派位结构要排好。" };
  if (score === 20) return { t: "新来港常见组合", d: "宗教＋首名＋适龄。热门学校要靠抽签，统一派位志愿梯度要仔细排，至少一间保底。" };
  if (score === 15) return { t: "底牌偏弱", d: "自行阶段机会有限，重点放统一派位；志愿金字塔（冲刺/匹配/保底）一定要做满。" };
  return { t: "仅适龄分", d: "自行阶段基本陪跑，全力准备统一派位＋叩门预案。别焦虑，也别被中介 PUA。" };
}

export default function P1SelfCheck({ locale = "tc" }: { locale?: Locale }) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [checks, setChecks] = useState<boolean[]>(Array(CHECKS.length).fill(false));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const va = p.get("a");
    const vb = p.get("b");
    const vc = p.get("c");
    if (va && GROUP_A.some((o) => o.v === va)) setA(va);
    if (vb && GROUP_B.some((o) => o.v === vb)) setB(vb);
    if (vc) {
      const n = Math.max(0, Math.min(CHECKS.length, Number(vc) || 0));
      setChecks(Array.from({ length: CHECKS.length }, (_, i) => i < n));
    }
  }, []);

  const aPts = GROUP_A.find((o) => o.v === a)?.pts ?? 0;
  const bPts = GROUP_B.find((o) => o.v === b)?.pts ?? 0;
  const age = 10;
  const score = aPts + bPts + age;
  const band = bandOf(score);
  const done = checks.filter(Boolean).length;
  const verdict =
    done === CHECKS.length
      ? "✅ 自查通过：结构没有明显遗漏，可以安心交表。"
      : `⚠️ 还有 ${CHECKS.length - done} 项没做完：先按清单补齐，再动手交表。`;

  const shareUrl = useMemo(() => {
    const p = new URLSearchParams();
    if (a) p.set("a", a);
    if (b) p.set("b", b);
    if (done > 0) p.set("c", String(done));
    const qs = p.toString();
    return `https://hkschool.guide/tools/p1-self-check${qs ? `?${qs}` : ""}`;
  }, [a, b, done]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }, [shareUrl]);

  const download = useCallback(async () => {
    const node = document.getElementById("p1-result-card");
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.download = "小一派位自查卡.png";
      link.href = dataUrl;
      link.click();
    } catch {
      /* ignore */
    }
  }, []);

  const today = new Date().toLocaleDateString("zh-HK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[880px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · 小一派位</p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            交表前，先给自己做个派位体检
          </h1>
          <p className="mt-2 max-w-[600px] text-[var(--p-secondary)]">
            派位一年一次、交表后不可改。这个工具帮你算清乙类计分、过一遍交表前 5 条自查清单，
            生成一张可以截图分享的结果卡。免费、即时，数据来自教育局 2027/28 官方文件。
          </p>
          <p className="mt-3 rounded-[8px] border-l-4 border-[var(--p-hl-yellow-border)] bg-[var(--p-hl-yellow-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            ⚠️ 本工具只做<strong>表结构自查</strong>，不预测录取概率：统一派位含随机编号，
            任何「保录取」承诺都是假的。
          </p>
        </div>

        <section className="rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">① 乙类计分计算器</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            依据教育局 2027/28《计分办法准则》——「关系项」和「办学团体项」各只能选一项。
          </p>

          <div className="mt-5">
            <p className="font-mono text-xs uppercase text-[var(--p-secondary)]">关系项（只可选一项）</p>
            <div className="mt-2 grid gap-2">
              {GROUP_A.map((o) => (
                <label
                  key={o.v}
                  className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-[var(--p-gray-300)] px-4 py-3 text-sm text-[var(--p-fg)]"
                >
                  <input type="radio" name="gA" value={o.v} checked={a === o.v} onChange={() => setA(o.v)} className="mt-0.5" />
                  <span className="flex-1">{o.label}</span>
                  <span className="font-mono font-bold">{o.pts}分</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="font-mono text-xs uppercase text-[var(--p-secondary)]">办学团体项（只可选一项）</p>
            <div className="mt-2 grid gap-2">
              {GROUP_B.map((o) => (
                <label
                  key={o.v}
                  className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-[var(--p-gray-300)] px-4 py-3 text-sm text-[var(--p-fg)]"
                >
                  <input type="radio" name="gB" value={o.v} checked={b === o.v} onChange={() => setB(o.v)} className="mt-0.5" />
                  <span className="flex-1">{o.label}</span>
                  <span className="font-mono font-bold">{o.pts}分</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            <span>适龄儿童（翌年 9 月年满 5 岁 8 个月至 7 岁）</span>
            <span className="ml-auto font-mono font-bold">+10分</span>
          </div>

          <div className="mt-6 rounded-[10px] bg-[var(--p-fg)] px-6 py-5 text-[var(--p-bg)]">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-6xl font-extrabold tracking-[-1px]">{score}</span>
              <span className="text-sm opacity-80">乙类计分（最高 35）</span>
            </div>
            <p className="mt-2 font-bold">{band.t}</p>
            <p className="mt-1 text-sm opacity-85">{band.d}</p>
            <p className="mt-3 text-xs opacity-70">同分要抽签：分数只是入场券，不是录取保证。</p>
          </div>
        </section>

        <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">② 交表前 5 条自查清单</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">一条条点过去，完成进度实时更新。</p>
          <div className="mt-4 grid gap-2">
            {CHECKS.map((c, i) => (
              <label
                key={i}
                className="flex cursor-pointer items-start gap-3 rounded-[8px] border border-[var(--p-gray-300)] px-4 py-3 text-sm text-[var(--p-fg)]"
              >
                <input
                  type="checkbox"
                  checked={!!checks[i]}
                  onChange={(e) =>
                    setChecks((s) => s.map((v, j) => (j === i ? e.target.checked : v)))
                  }
                  className="mt-0.5"
                />
                <span className={checks[i] ? "text-[var(--p-secondary)] line-through" : ""}>{c}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-4 py-3 text-sm">
            <span className="font-mono text-[var(--p-secondary)]">完成 {done}/{CHECKS.length}</span>
            <span
              className={
                done === CHECKS.length
                  ? "font-bold text-[var(--p-hl-border)]"
                  : "font-bold text-[#C2410C]"
              }
            >
              {verdict}
            </span>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">③ 你的自查结果卡</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">
            下载图片发家长群/小红书，或复制链接分享给同区家长。
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={download}
              className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)]"
            >
              下载结果卡图片
            </button>
            <button
              onClick={copyLink}
              className="rounded-[8px] border border-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-fg)]"
            >
              {copied ? "已复制 ✓" : "复制分享链接"}
            </button>
          </div>

          <p className="mt-3 text-xs text-[var(--p-secondary)]">
            分享链接（打开后自动恢复你的结果）：
          </p>
          <input
            readOnly
            value={shareUrl}
            onFocus={(e) => e.currentTarget.select()}
            className="mt-1 w-full rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 font-mono text-xs text-[var(--p-secondary)] outline-none"
          />

          <div className="mt-6 overflow-x-auto pb-2">
          <div
            id="p1-result-card"
            className="mx-auto"
            style={{
              backgroundColor: "#F7F1E5",
              border: "3px solid #1C1C1C",
              borderRadius: 12,
              padding: 30,
              width: 540,
              height: 720,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "ui-monospace, Menlo, monospace",
                fontSize: 12,
                color: "#57534E",
                letterSpacing: 1,
              }}
            >
              <span>港学荟 · 小一派位自查</span>
              <span>hkschool.guide</span>
            </div>
            <div
              style={{
                marginTop: 26,
                fontFamily: "Georgia, 'Songti SC', serif",
                fontSize: 26,
                fontWeight: 800,
                color: "#1C1C1C",
              }}
            >
              交表自查卡
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, marginTop: 22 }}>
              <span
                style={{
                  fontFamily: "Georgia, 'Songti SC', serif",
                  fontSize: 92,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: "#1C1C1C",
                }}
              >
                {score}
              </span>
              <span
                style={{
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 13,
                  color: "#57534E",
                  marginBottom: 10,
                }}
              >
                乙类计分 / 最高35
              </span>
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: "Georgia, 'Songti SC', serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#0F766E",
              }}
            >
              {band.t}
            </div>
            <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.7, color: "#1C1C1C" }}>
              {band.d}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ borderTop: "2px solid #1C1C1C", paddingTop: 16 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1C1C1C",
                }}
              >
                <span>交表自查 {done}/{CHECKS.length}</span>
                <span>{done === CHECKS.length ? "✅ 通过" : "⚠️ 未完"}</span>
              </div>
              <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.6, color: "#1C1C1C" }}>
                {verdict}
              </div>
              <div style={{ marginTop: 14, fontSize: 10.5, lineHeight: 1.6, color: "#8A8378" }}>
                依据教育局 2027/28《计分办法准则》· 仅作结构自查，不含录取概率预测
                <br />
                {today} · hkschool.guide/tools/p1-self-check
              </div>
            </div>
          </div>
          </div>
        </section>

        <div className="mt-10 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-card)] p-6 text-sm leading-relaxed text-[var(--p-secondary)]">
          <p className="font-bold text-[var(--p-fg)]">📎 数据来源与说明</p>
          <p className="mt-2">
            计分表依据：教育局《申请二○二七年九月小一入学》资料单张之《计分办法准则》（2026年8月出版），
            完整规则及所需证明文件以教育局公布为准。每年 9 月新学年数据公布后更新。
            更完整流程见
            <a className="underline" href="/blog/hk-p1-admission-guide-2027">
              《香港小一入学2027/28完整攻略》
            </a>
            。
          </p>
        </div>
      </div>
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

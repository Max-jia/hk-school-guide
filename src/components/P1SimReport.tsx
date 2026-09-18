"use client";

import Localize from "@/components/Localize";
import { type Locale } from "@/lib/i18n";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DataVersionBadge from "@/components/DataVersionBadge";
import { toPng } from "html-to-image";
import { runSimCheck, type SimInput } from "@/lib/sim-engine";
import { buildContingency } from "@/lib/sim-engine";
import { DATA_LABEL, DATA_VERSION, DATA_UPDATED_AT } from "@/lib/data-version";
import p1NetsJson from "@/content/p1-nets.json";

const LOCK_KEY = "purchased_p1-sim";
const INPUT_KEY = "p1sim_input";

const STATUS_LABEL: Record<string, string> = { pass: "通过", warn: "需注意", fail: "错误" };

export default function P1SimReport({ locale = "tc" }: { locale?: Locale }) {
  const [input, setInput] = useState<SimInput | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);
  const [img, setImg] = useState<{ dataUrl: string; name: string } | null>(null);

  useEffect(() => {
    function reload() {
      try {
        const raw = localStorage.getItem(INPUT_KEY);
        if (raw) {
          const d = JSON.parse(raw) as SimInput;
          if (d && Array.isArray(d.partA) && Array.isArray(d.partB)) setInput(d);
        }
      } catch { /* ignore */ }
    }
    reload();
    // 模拟器与报告页同时开着时，切回本页自动刷新草稿
    window.addEventListener("focus", reload);
    return () => window.removeEventListener("focus", reload);
  }, []);

  useEffect(() => {
    setUnlocked(localStorage.getItem(LOCK_KEY) === "true");
  }, []);

  const P1 = p1NetsJson as { nets: { net: string; schools: { name: string }[] }[] };

  const report = useMemo(() => {
    if (!input) return null;
    const n = P1.nets.find((x) => x.net === input.net);
    const netCount = n ? Math.min(30, n.schools.length) : 30;
    return runSimCheck({ ...input, netSchoolCount: netCount });
  }, [input, P1]);
  const contingency = useMemo(() => (report ? buildContingency(report.knockList) : null), [report]);

  function buy() {
    setBuying(true);
    fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product: "sim" }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.url) window.location.href = j.url;
        else alert("下单失败：" + (j.error || "请稍后重试"));
      })
      .catch(() => alert("网络错误，请稍后重试"))
      .finally(() => setBuying(false));
  }

  async function downloadPng() {
    const node = document.getElementById("sim-report-page");
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.download = "港学荟-志愿结构体检报告.png";
      a.href = dataUrl;
      a.click();
      setImg({ dataUrl, name: "报告已生成" });
    } catch { /* ignore */ }
  }

  const gradeColor =
    report?.grade === "A" ? "#0F766E" : report?.grade === "B" ? "#B45309" : "#C2410C";

  return (
    <Localize locale={locale}>
    <main className="w-full">
      <SiteHeader locale={locale} />
      <div className="mx-auto max-w-[860px] px-4 pb-24">
        <div className="py-8 print:hidden">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Pro 模拟器 · 体检报告</p>
          <h1 className="font-serif text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            你的志愿结构体检报告
          </h1>
          {unlocked && report && (
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)]"
              >
                保存为 PDF（打印）
              </button>
              <button
                onClick={downloadPng}
                className="rounded-[8px] border border-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-fg)]"
              >
                下载图片
              </button>
              <a
                href="/tools/p1-simulator"
                className="rounded-[8px] border border-[var(--p-gray-300)] px-5 py-2.5 text-sm text-[var(--p-secondary)] no-underline"
              >
                返回修改志愿 ←
              </a>
            </div>
          )}
        </div>

        {!unlocked ? (
          <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-8 text-center">
            <p className="text-4xl">🔒</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[var(--p-fg)]">这份报告还没解锁</h2>
            <p className="mx-auto mt-2 max-w-[420px] text-sm text-[var(--p-secondary)]">
              完整体检报告包含风险等级（A/B/C）、逐项结构检查明细、修改建议和三套预案（叩门 72h／直资私立后手／注册时限），
              可保存为一页 PDF。
            </p>
            <button
              onClick={buy}
              disabled={buying}
              className="mt-6 rounded-[8px] bg-[var(--p-fg)] px-8 py-3 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
            >
              {buying ? "正在前往支付…" : "解锁报告 · HK$68"}
            </button>
            <p className="mt-3 text-xs text-[var(--p-secondary)]">
              支付后自动回跳并解锁，永久可看。
            </p>
            <p className="mt-4 text-sm text-[var(--p-secondary)]">
              有兑换码？<a className="underline" href="/redeem">去兑换 →</a>
            </p>
          </section>
        ) : !report || !input ? (
          <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">还没有模拟数据</h2>
            <p className="mt-2 text-sm text-[var(--p-secondary)]">先回模拟器填好志愿表，再生成报告。</p>
            <a
              href="/tools/p1-simulator"
              className="mt-6 inline-block rounded-[8px] bg-[var(--p-fg)] px-8 py-3 text-sm font-bold text-[var(--p-bg)] no-underline"
            >
              去填志愿表 →
            </a>
          </section>
        ) : (
          <div id="sim-report-page" style={{ backgroundColor: "#FFFFFF" }}>
            {/* ===== 报告本体（打印区域） ===== */}
            <div className="rounded-[12px] border-2 border-[#1C1C1C] p-7" style={{ marginTop: 8 }}>
              {/* 头部 */}
              <div className="flex items-baseline justify-between border-b-2 border-[#1C1C1C] pb-3">
                <span className="font-serif text-xl font-bold text-[#1C1C1C]">港学荟 · 志愿结构体检报告</span>
                <span className="font-mono text-xs text-[#57534E]">Pro 模拟器 · 数据 {DATA_LABEL}</span>
              </div>

              {/* 输入摘要 */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[#57534E]">
                <span>校网：{report.net}</span>
                <span>乙类计分：{report.score} 分</span>
                <span>甲部：{report.partACount}/3</span>
                <span>乙部：{report.partBCount}/{report.targetB}</span>
                <span>结构：冲刺 {report.sprint} · 匹配 {report.match} · 保底 {report.safe}</span>
              </div>

              {/* 志愿表抄录卡（交表时照着抄） */}
              <div className="mt-5 rounded-[10px] border border-[#E4E0D8] p-4">
                <p className="font-serif text-base font-bold text-[#1C1C1C]">志愿表抄录卡（交表时照着抄）</p>
                <div className="mt-2 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-xs font-bold text-[#57534E]">甲部（全港任选 · 最多 3）</p>
                    <ol className="m-0 mt-1 list-none space-y-1 p-0 text-sm">
                      {input.partA.map((s, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="w-5 shrink-0 font-mono text-xs text-[#8A8378]">甲{i + 1}</span>
                          <span className="text-[#1C1C1C]">{s.name.trim() || "（空）"}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="font-mono text-xs font-bold text-[#57534E]">乙部（校网内 · 按顺序填）</p>
                    <ol className="m-0 mt-1 list-none space-y-1 p-0 text-sm">
                      {input.partB.filter((s) => s.name.trim()).map((s, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="w-5 shrink-0 font-mono text-xs text-[#8A8378]">乙{i + 1}</span>
                          <span className="text-[#1C1C1C]">{s.name}</span>
                          <span className="text-[#8A8378]">（{s.tier === "sprint" ? "冲刺" : s.tier === "match" ? "匹配" : "保底"}）</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* 风险等级 */}
              <div className="mt-5 flex items-center gap-5 rounded-[10px] px-6 py-5" style={{ backgroundColor: gradeColor + "14", borderLeft: `6px solid ${gradeColor}` }}>
                <span className="font-serif text-6xl font-extrabold" style={{ color: gradeColor }}>
                  {report.grade}
                </span>
                <div>
                  <p className="text-lg font-bold text-[#1C1C1C]">{report.gradeLabel}</p>
                  <p className="mt-1 text-sm text-[#57534E]">
                    本等级只评价「志愿表结构」，不预测录取结果——统一派位含随机编号，无人能保证结果。
                  </p>
                </div>
              </div>

              {/* 检查明细 */}
              <h3 className="mt-6 font-serif text-lg font-bold text-[#1C1C1C]">检查明细</h3>
              <table className="mt-2 w-full border-collapse text-sm">
                <tbody>
                  {report.checks.map((c) => (
                    <tr key={c.id} style={{ borderBottom: "1px solid #E4E0D8" }}>
                      <td style={{ padding: "10px 8px 10px 0", width: 110, verticalAlign: "top" }}>
                        <span
                          className="inline-block rounded px-2 py-0.5 font-mono text-xs font-bold"
                          style={{
                            backgroundColor:
                              c.status === "pass" ? "#E7F6F2" : c.status === "warn" ? "#FEF3E2" : "#FDEBE7",
                            color: c.status === "pass" ? "#0F766E" : c.status === "warn" ? "#B45309" : "#C2410C",
                          }}
                        >
                          {STATUS_LABEL[c.status]}
                        </span>
                      </td>
                      <td style={{ padding: "10px 8px", verticalAlign: "top" }}>
                        <p className="font-bold text-[#1C1C1C]">{c.title}</p>
                        <p className="mt-0.5 text-[#57534E]">{c.detail}</p>
                        {c.fix && <p className="mt-1 text-[#0F766E]">建议：{c.fix}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 修改建议 */}
              <h3 className="mt-6 font-serif text-lg font-bold text-[#1C1C1C]">修改建议</h3>
              <ol className="m-0 mt-2 list-decimal pl-5 text-sm text-[#1C1C1C]">
                {report.suggestions.map((s, i) => (
                  <li key={i} className="mb-1">{s}</li>
                ))}
              </ol>

              {/* 三套预案 */}
              <h3 className="mt-6 font-serif text-lg font-bold text-[#1C1C1C]">三套预案（按时间轴行动）</h3>
              {contingency?.map((p) => (
                <div key={p.id} className="mt-4 rounded-[10px] border border-[#E4E0D8] p-4">
                  <p className="font-bold text-[#1C1C1C]">{p.title}</p>
                  <ul className="m-0 mt-2 list-none space-y-1.5 p-0 text-sm">
                    {p.timeline.map((t, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="shrink-0 font-mono text-xs font-bold text-[#57534E]">{t.when}</span>
                        <span className="text-[#44403C]">{t.action}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="m-0 mt-2 list-disc pl-5 text-sm text-[#57534E]">
                    {p.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#8A8378]">出处：{p.source}</p>
                </div>
              ))}

              {/* 页脚 */}
              <div className="mt-6 border-t border-[#E4E0D8] pt-3 text-xs leading-relaxed text-[#8A8378]">
                依据：教育局 {DATA_VERSION}《小一入学统筹办法》及官方校网名册（更新于 {DATA_UPDATED_AT}）
                · 本报告仅作结构自查，不构成入学建议、不预测录取结果
                <br />
                港学荟 hkschool.guide · 生成于 {report.generatedAt} · 每年 9 月随新名册更新
              </div>
            </div>
          </div>
        )}
      </div>
      <SiteFooter locale={locale} />
    </main>
    </Localize>
  );
}

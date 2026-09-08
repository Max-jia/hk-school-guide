"use client";

import { useEffect, useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { toPng } from "html-to-image";
import { runSimCheck, type SimInput } from "@/lib/sim-engine";

const LOCK_KEY = "purchased_p1-sim";
const INPUT_KEY = "p1sim_input";

const STATUS_LABEL: Record<string, string> = { pass: "通过", warn: "需注意", fail: "错误" };

export default function P1SimReport() {
  const [input, setInput] = useState<SimInput | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [buying, setBuying] = useState(false);
  const [img, setImg] = useState<{ dataUrl: string; name: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(INPUT_KEY);
      if (raw) {
        const d = JSON.parse(raw) as SimInput;
        if (d && Array.isArray(d.partA) && Array.isArray(d.partB)) setInput(d);
      }
    } catch { /* ignore */ }
    setUnlocked(localStorage.getItem(LOCK_KEY) === "true");
  }, []);

  const report = useMemo(() => (input ? runSimCheck(input) : null), [input]);

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
    <main className="w-full">
      <SiteHeader />
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
              完整体检报告包含风险等级（A/B/C）、8 项结构检查明细、修改建议和叩门预案清单，
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
                <span className="font-mono text-xs text-[#57534E]">Pro 模拟器 · {report.generatedAt}</span>
              </div>

              {/* 输入摘要 */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[#57534E]">
                <span>校网：{report.net}</span>
                <span>乙类计分：{report.score} 分</span>
                <span>甲部：{report.partACount}/3</span>
                <span>乙部：{report.partBCount}/30</span>
                <span>结构：冲刺 {report.sprint} · 匹配 {report.match} · 保底 {report.safe}</span>
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

              {/* 叩门预案 */}
              <h3 className="mt-6 font-serif text-lg font-bold text-[#1C1C1C]">叩门预案（派位结果不理想时用）</h3>
              <ul className="m-0 mt-2 list-none space-y-1 p-0 text-sm">
                {report.knockList.map((k, i) => (
                  <li key={i}>
                    <strong className="text-[#1C1C1C]">{k.name}</strong>
                    <span className="text-[#57534E]"> — {k.reason}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 rounded-[8px] bg-[#FBF9F5] px-4 py-3 text-sm text-[#57534E]">
                <p className="font-bold text-[#1C1C1C]">叩门材料提前备好：</p>
                <p className="mt-1">出生证明 · 住址证明 · 成绩表 · 奖项证明 · 自荐信（附模板）</p>
                <p className="mt-1">时间：放榜（6 月初）后立即行动，别等通知。</p>
              </div>

              {/* 页脚 */}
              <div className="mt-6 border-t border-[#E4E0D8] pt-3 text-xs leading-relaxed text-[#8A8378]">
                依据：教育局 2027/28《小一入学统筹办法》及官方校网名册 · 本报告仅作结构自查，不构成入学建议、不预测录取结果
                <br />
                港学荟 hkschool.guide · 生成于 {report.generatedAt}
              </div>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </main>
  );
}

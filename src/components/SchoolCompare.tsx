"use client";

import { useMemo, useRef, useState } from "react";
import SchoolCombobox from "@/components/SchoolCombobox";
import schoolsJson from "@/content/schools.json";
import p1NetsJson from "@/content/p1-nets.json";
import { toPng } from "html-to-image";

type CompareSchool = {
  name: string;
  typeLabel: string;
  net: string;
  district: string;
  gender: string;
  religion: string;
  sessions: string[];
  through_train: string;
  fees: string;
  language: string;
  quota: number | null;
  inRoster: boolean;
};

const P1 = p1NetsJson as {
  nets: {
    net: string;
    schools: {
      name: string; quota: number | null; finance: string; gender?: string; religion?: string;
      sessions?: string[]; through_train?: string; language?: string;
    }[];
  }[];
};
const SCHOOLS = schoolsJson as {
  name_zh: string; name_display?: string; district_zh?: string; finance_type?: string;
  gender?: string; religion_zh?: string; sessions?: string[]; through_train?: string;
  fees?: string; teaching_language?: string;
}[];

function typeLabel(f: string): string {
  if (f === "官立" || f === "資助") return f === "官立" ? "官立" : "资助";
  if (f === "直资") return "直资";
  if (f === "英基" || (f || "").toUpperCase().includes("PRIVATE INDEPENDENT")) return "国际";
  if (f === "私立") return "私立";
  return f || "—";
}

export default function SchoolCompare({
  unlocked, buying, buy,
}: {
  unlocked: boolean;
  buying: boolean;
  buy: () => void;
}) {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const xhsRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const options = useMemo<CompareSchool[]>(() => {
    const map = new Map<string, CompareSchool>();
    for (const n of P1.nets) {
      for (const sc of n.schools) {
        map.set(sc.name, {
          name: sc.name,
          typeLabel: typeLabel(sc.finance),
          net: n.net,
          district: "",
          gender: sc.gender || "",
          religion: sc.religion || "",
          sessions: sc.sessions || [],
          through_train: sc.through_train || "",
          fees: "",
          language: sc.language || "",
          quota: sc.quota,
          inRoster: true,
        });
      }
    }
    for (const s of SCHOOLS) {
      if (map.has(s.name_zh)) continue;
      map.set(s.name_zh, {
        name: s.name_display || s.name_zh,
        typeLabel: typeLabel(s.finance_type || ""),
        net: "",
        district: s.district_zh || "",
        gender: s.gender || "",
        religion: s.religion_zh || "",
        sessions: s.sessions || [],
        through_train: s.through_train || "",
        fees: s.fees || "",
        language: s.teaching_language || "",
        quota: null,
        inRoster: false,
      });
    }
    return [...map.values()].sort((x, y) => x.name.localeCompare(y.name, "zh-HK"));
  }, []);

  const schoolA = options.find((o) => o.name === a);
  const schoolB = options.find((o) => o.name === b);
  const canCompare = Boolean(schoolA && schoolB && a !== b);
  const locked = !unlocked && count >= 1;

  function doCompare() {
    if (!canCompare || locked) return;
    if (!unlocked) setCount((c) => c + 1);
  }

  async function download() {
    const node = cardRef.current;
    if (!node) return;
    try {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.download = "港学荟-学校对比.png";
      link.href = dataUrl;
      link.click();
    } catch { /* ignore */ }
  }

  async function downloadXhs() {
    const node = xhsRef.current;
    if (!node) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(node, { pixelRatio: 2, cacheBust: true });
      const link = document.createElement("a");
      link.download = "港学荟-两校对比-小红书卡片.png";
      link.href = dataUrl;
      link.click();
    } catch { /* ignore */ }
    setExporting(false);
  }

  function row(label: string, av: string, bv: string) {
    return (
      <tr className="border-b border-[var(--p-gray-300)]">
        <td className="w-24 py-2 pr-3 text-xs text-[var(--p-secondary)]">{label}</td>
        <td className="py-2 pr-2 text-sm text-[var(--p-fg)]">{av || "—"}</td>
        <td className="py-2 text-sm text-[var(--p-fg)]">{bv || "—"}</td>
      </tr>
    );
  }

  return (
    <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">两校对比</h2>
        {!unlocked && (
          <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>
        )}
      </div>
      <p className="mt-1 text-sm text-[var(--p-secondary)]">
        选两所学校并排对比：升中通路 / 学额 / 性别宗教 / 班制 / 学费。免费对比 1 次，解锁后不限次并可导出对比图。
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <SchoolCombobox options={options} value={a} onChange={setA} placeholder="选择第一所学校…" />
        <div className="hidden items-center justify-center font-mono text-xs text-[var(--p-secondary)] md:flex">VS</div>
        <SchoolCombobox options={options} value={b} onChange={setB} placeholder="选择第二所学校…" />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={doCompare}
          disabled={!canCompare || locked}
          className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)] disabled:opacity-40"
        >
          {locked ? "已用免费次数 · 解锁后继续" : "开始对比"}
        </button>
        {unlocked && canCompare && (
          <>
            <button onClick={download} className="rounded-[8px] border border-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-fg)]">
              下载对比图
            </button>
            <button onClick={downloadXhs} disabled={exporting} className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50">
              {exporting ? "生成中…" : "导出小红书卡片（3:4）"}
            </button>
          </>
        )}
      </div>

      {canCompare && schoolA && schoolB && (
        <div className="relative mt-5">
          <div ref={cardRef} className="rounded-[12px] border-2 border-[#1C1C1C] bg-[#FBF9F5] p-5">
            <p className="font-serif text-lg font-bold text-[#1C1C1C]">港学荟 · 两校对比</p>
            <p className="mt-0.5 font-mono text-[11px] text-[#57534E]">hkschool.guide · 2027/28 · 数据可核实</p>
            <table className="mt-3 w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-24 py-2 pr-3 text-left text-xs text-[var(--p-secondary)]">维度</th>
                  <th className="py-2 pr-2 text-left font-serif text-base font-bold text-[#1C1C1C]">{schoolA.name}</th>
                  <th className="py-2 text-left font-serif text-base font-bold text-[#1C1C1C]">{schoolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {row("学校类型", schoolA.typeLabel, schoolB.typeLabel)}
                {row("校网", schoolA.net ? `${schoolA.net} 网` : "不限校网", schoolB.net ? `${schoolB.net} 网` : "不限校网")}
                {row("地区", schoolA.district || "—", schoolB.district || "—")}
                {row("性别", schoolA.gender, schoolB.gender)}
                {row("宗教", schoolA.religion, schoolB.religion)}
                {row("班制", schoolA.sessions.join("/") || "—", schoolB.sessions.join("/") || "—")}
                {row("升中通路", schoolA.through_train || "无公开关系", schoolB.through_train || "无公开关系")}
                {row("教学语言", schoolA.language || "—", schoolB.language || "—")}
                {row("学费", schoolA.fees || (schoolA.inRoster ? "免费（官津）" : "见官网"), schoolB.fees || (schoolB.inRoster ? "免费（官津）" : "见官网"))}
                {row("自行分配学额", schoolA.quota ? `${schoolA.quota} 个` : "不参与派位", schoolB.quota ? `${schoolB.quota} 个` : "不参与派位")}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-[#57534E]">
              {(!schoolA.inRoster || !schoolB.inRoster) && "提示：不参与派位的学校（直资/私立/国际）走自行申请，不限校网，可同时申请多间。"}
              {schoolA.inRoster && schoolB.inRoster && "提示：两所均为官津，比较重点看升中通路与学额稀缺度；志愿顺序按家庭真实意愿排。"}
            </p>
          </div>
          {locked && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-[rgba(255,255,255,.82)]">
              <div className="rounded-[10px] bg-[#FEF3E2] px-6 py-4 text-center text-[#B45309]">
                <p className="font-bold">🔒 对比次数已用完</p>
                <p className="mt-1 text-sm">解锁后可无限对比并导出对比图</p>
                <button
                  onClick={buy}
                  disabled={buying}
                  className="mt-3 rounded-[8px] bg-[var(--p-fg)] px-5 py-2 text-sm font-bold text-[var(--p-bg)] disabled:opacity-50"
                >
                  {buying ? "正在前往支付…" : "解锁完整对比 · HK$68"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 小红书 3:4 导出卡（离屏渲染，仅导出用） */}
      {canCompare && schoolA && schoolB && (
        <div
          ref={xhsRef}
          aria-hidden
          style={{
            position: "fixed",
            left: -9999,
            top: 0,
            width: 540,
            height: 720,
            backgroundColor: "#F7F1E5",
            fontFamily: "'Songti SC','PingFang SC','Microsoft YaHei',serif",
            color: "#1C1C1C",
            padding: 36,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 20 }}>
            <span style={{ fontWeight: 800 }}>港学荟 · 两校对比</span>
            <span style={{ fontSize: 16, color: "#57534E" }}>2027/28</span>
          </div>
          <div style={{ marginTop: 30, textAlign: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.25 }}>
              {schoolA.name}
              <span style={{ margin: "0 16px", color: "#C2410C", fontFamily: "Georgia,serif" }}>VS</span>
              {schoolB.name}
            </div>
            <div style={{ marginTop: 8, fontSize: 16, color: "#57534E" }}>
              {schoolA.typeLabel} · {schoolA.gender || "男女校"}　vs　{schoolB.typeLabel} · {schoolB.gender || "男女校"}
            </div>
          </div>
          <div style={{ marginTop: 28, border: "1.5px solid #1C1C1C", borderRadius: 12, overflow: "hidden", background: "#FFFFFF" }}>
            {[
              ["校网", schoolA.net ? `${schoolA.net} 网` : "不限校网", schoolB.net ? `${schoolB.net} 网` : "不限校网"],
              ["宗教", schoolA.religion || "—", schoolB.religion || "—"],
              ["班制", schoolA.sessions.join("/") || "—", schoolB.sessions.join("/") || "—"],
              ["升中通路", schoolA.through_train || "无公开关系", schoolB.through_train || "无公开关系"],
              ["教学语言", schoolA.language || "—", schoolB.language || "—"],
              ["自行分配学额", schoolA.quota ? `${schoolA.quota} 个` : "不参与派位", schoolB.quota ? `${schoolB.quota} 个` : "不参与派位"],
              ["学费", schoolA.fees || (schoolA.inRoster ? "免费（官津）" : "见官网"), schoolB.fees || (schoolB.inRoster ? "免费（官津）" : "见官网")],
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  borderBottom: i < 6 ? "1px solid #E4E0D8" : "none",
                  fontSize: 18,
                }}
              >
                <div style={{ width: 110, flex: "none", padding: "12px 14px", background: "#FBF9F5", color: "#57534E" }}>
                  {row[0]}
                </div>
                <div style={{ flex: 1, padding: "12px 14px", fontWeight: 700 }}>{row[1]}</div>
                <div style={{ flex: 1, padding: "12px 14px", fontWeight: 700 }}>{row[2]}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 15, color: "#57534E", lineHeight: 1.7 }}>
            别凭感觉选校：升中通路、学额稀缺度、班制差异，一张图看全。
            {(!schoolA.inRoster || !schoolB.inRoster) && " 直资/私立不参与派位，可同时申请多间。"}
          </div>
          <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "1px solid #D8D2C8", fontSize: 14, color: "#8A8378", display: "flex", justifyContent: "space-between" }}>
            <span>数据依据教育局 2027/28 名册，可核实</span>
            <span>hkschool.guide</span>
          </div>
        </div>
      )}
    </section>
  );
}

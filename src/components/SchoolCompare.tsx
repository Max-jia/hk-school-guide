"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import SchoolCombobox from "@/components/SchoolCombobox";
import schoolsJson from "@/content/schools.json";
import p1NetsJson from "@/content/p1-nets.json";
import reportMeta from "@/content/report-meta.json";
import { toPng } from "html-to-image";
import { relativeBand } from "@/lib/sim-engine";

type CompareSchool = {
  name: string;
  simp: string;
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
  tier?: string;
  teacherRatio?: string;
  schoolBus?: string;
  p12027?: boolean;
};

const META = reportMeta as any;
const TIER_CFG = (META.TIER_CFG || {}) as Record<string, { c: string; b: string }>;

const P1 = p1NetsJson as {
  nets: {
    net: string;
    schools: {
      name: string; simp?: string; quota: number | null; finance: string; gender?: string; religion?: string;
      sessions?: string[]; through_train?: string; language?: string;
    }[];
  }[];
};
const SCHOOLS = schoolsJson as {
  name_zh: string; name_display?: string; simp?: string; district_zh?: string; finance_type?: string;
  gender?: string; religion_zh?: string; sessions?: string[]; through_train?: string;
  fees?: string; teaching_language?: string; tier?: string; teacher_ratio?: string;
  school_bus?: string; p1_2027?: boolean;
}[];

const SCHOOL_MAP = new Map(SCHOOLS.map((s) => [s.name_zh, s]));

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
  const [analysed, setAnalysed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const xhsRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const options = useMemo<CompareSchool[]>(() => {
    const map = new Map<string, CompareSchool>();
    for (const n of P1.nets) {
      for (const sc of n.schools) {
        const ext = SCHOOL_MAP.get(sc.name);
        map.set(sc.name, {
          name: sc.name,
          simp: sc.simp || sc.name,
          typeLabel: typeLabel(sc.finance),
          net: n.net,
          district: ext?.district_zh || "",
          gender: sc.gender || "",
          religion: sc.religion || "",
          sessions: sc.sessions || [],
          through_train: sc.through_train || "",
          fees: ext?.fees || "",
          language: sc.language || "",
          quota: sc.quota,
          inRoster: true,
          tier: ext?.tier,
          teacherRatio: ext?.teacher_ratio,
          schoolBus: ext?.school_bus,
          p12027: ext?.p1_2027,
        });
      }
    }
    for (const s of SCHOOLS) {
      if (map.has(s.name_zh)) continue;
      map.set(s.name_zh, {
        name: s.name_display || s.name_zh,
        simp: s.simp || s.name_display || s.name_zh,
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
        tier: s.tier,
        teacherRatio: s.teacher_ratio,
        schoolBus: s.school_bus,
        p12027: s.p1_2027,
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
    setAnalysed(true);
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

  function row(label: string, av: ReactNode, bv: ReactNode, diff = false) {
    return (
      <tr className={"border-b border-[var(--p-gray-300)]" + (diff ? " bg-[#FEF3E2]" : "")}>
        <td className="w-24 py-2 pr-3 text-xs text-[var(--p-secondary)]">
          {diff && <span className="mr-1 font-bold text-[#B45309]">●</span>}{label}
        </td>
        <td className="py-2 pr-2 text-sm text-[var(--p-fg)]">{av || "—"}</td>
        <td className="py-2 text-sm text-[var(--p-fg)]">{bv || "—"}</td>
      </tr>
    );
  }

  function bandLabel(s: CompareSchool): string {
    if (!s.inRoster) return "不参与派位";
    const b = relativeBand(s.name, s.quota ?? null);
    if (b === "稀缺") return "竞争激烈（学额紧张/热门）";
    if (b === "充裕") return "学额较充裕";
    return "竞争一般";
  }

  function tierBadge(tier?: string) {
    const cfg = TIER_CFG[tier || "暂无评级"] || TIER_CFG["暂无评级"];
    return (
      <span style={{ color: cfg.c, border: `1px solid ${cfg.c}`, borderRadius: 6, padding: "1px 7px", fontSize: 12, fontWeight: 700 }}>
        {cfg.b}
      </span>
    );
  }

  const keyDiffs = useMemo(() => {
    if (!schoolA || !schoolB) return [] as string[];
    const out: string[] = [];
    if (schoolA.inRoster !== schoolB.inRoster) {
      out.push(
        `入学通道不同：${schoolA.name} ${schoolA.inRoster ? "参加派位（官津）" : "不派位（自行申请）"}，${schoolB.name} ${schoolB.inRoster ? "参加派位（官津）" : "不派位（自行申请）"}——官津走派位，非官津可自行申请并同时报多间，申请策略完全不同。`
      );
    }
    if ((schoolA.through_train || "") !== (schoolB.through_train || "")) {
      out.push(
        `升中保障不同：${schoolA.through_train || "无公开关系"} vs ${schoolB.through_train || "无公开关系"}——一条龙 > 直属 > 联系 > 无，直接影响初中路径。`
      );
    }
    if (schoolA.inRoster && schoolB.inRoster) {
      const qa = schoolA.quota ?? 0;
      const qb = schoolB.quota ?? 0;
      const ba = relativeBand(schoolA.name, qa);
      const bb = relativeBand(schoolB.name, qb);
      if (ba !== bb) {
        out.push(`入学难度不同：${schoolA.name} ${bandLabel(schoolA)}，${schoolB.name} ${bandLabel(schoolB)}——热门/学额紧张的一所命中主要靠抽签。`);
      } else if (Math.abs(qa - qb) >= 30) {
        out.push(`学额差异大：${schoolA.name} ${qa} 个 vs ${schoolB.name} ${qb} 个——但两者竞争烈度相近（均${ba === "稀缺" ? "热门/紧张" : ba === "充裕" ? "较充裕" : "一般"}），命中仍主要靠抽签。`);
      }
    }
    if (schoolA.gender !== schoolB.gender) {
      out.push(`性别不同：${schoolA.name} ${schoolA.gender || "男女校"}，${schoolB.name} ${schoolB.gender || "男女校"}——按孩子性别只能考虑匹配的一所。`);
    }
    if ((schoolA.tier || "") !== (schoolB.tier || "")) {
      out.push(`本站评级不同：${schoolA.name} ${schoolA.tier || "暂无评级"}，${schoolB.name} ${schoolB.tier || "暂无评级"}——口碑/实力定位有差异（评级非录取依据）。`);
    }
    if ((schoolA.fees || "") !== (schoolB.fees || "")) {
      out.push(`收费不同：${schoolA.fees || "免费（官津）"} vs ${schoolB.fees || "免费（官津）"}——预算差异。`);
    }
    if (out.length === 0) out.push("两所在关键维度上没有明显差异——重点比较课程风格、距离与家庭偏好。");
    return out.slice(0, 4);
  }, [schoolA, schoolB]);

  return (
    <section className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
      <div className="flex items-center gap-2">
        <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">两校对比</h2>
        {!unlocked && (
          <span className="rounded-full bg-[var(--p-fg)] px-2 py-0.5 font-mono text-[10px] font-bold text-[var(--p-bg)]">PRO</span>
        )}
      </div>
      <p className="mt-1 text-sm text-[var(--p-secondary)]">
        选两所学校并排对比：入学通道 / 本站评级 / 升中通路 / 入学难度 / 收费 / 语言班制。差异自动标 ●，顶部给出「这组对比最该看什么」。免费对比 1 次，解锁后不限次并可导出对比图。
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <SchoolCombobox options={options} value={a} onChange={(v) => { setA(v); setAnalysed(false); }} placeholder="选择第一所学校…" />
        <div className="hidden items-center justify-center font-mono text-xs text-[var(--p-secondary)] md:flex">VS</div>
        <SchoolCombobox options={options} value={b} onChange={(v) => { setB(v); setAnalysed(false); }} placeholder="选择第二所学校…" />
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={doCompare}
          disabled={!canCompare || locked}
          className="rounded-[8px] bg-[var(--p-fg)] px-5 py-2.5 text-sm font-bold text-[var(--p-bg)] disabled:opacity-40"
        >
          {locked ? "已用免费次数 · 解锁后继续" : "开始对比"}
        </button>
        {unlocked && canCompare && analysed && (
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

      {analysed && canCompare && schoolA && schoolB && (
        <div className="relative mt-5">
          <div ref={cardRef} className="rounded-[12px] border-2 border-[#1C1C1C] bg-[#FBF9F5] p-5">
            <p className="font-serif text-lg font-bold text-[#1C1C1C]">港学荟 · 两校对比</p>
            <p className="mt-0.5 font-mono text-[11px] text-[#57534E]">hkschool.guide · 2027/28 · 数据可核实</p>
            {keyDiffs.length > 0 && (
              <div className="mt-3 rounded-[8px] bg-[#FEF3E2] px-3 py-2.5 text-xs leading-relaxed text-[#7C4A03]">
                <p className="font-bold text-[#B45309]">这组对比最该看什么</p>
                {keyDiffs.map((d, i) => (
                  <p key={i} className="mt-1">{d}</p>
                ))}
              </div>
            )}
            <table className="mt-3 w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-24 py-2 pr-3 text-left text-xs text-[var(--p-secondary)]">维度</th>
                  <th className="py-2 pr-2 text-left font-serif text-base font-bold text-[#1C1C1C]">{schoolA.name}</th>
                  <th className="py-2 text-left font-serif text-base font-bold text-[#1C1C1C]">{schoolB.name}</th>
                </tr>
              </thead>
              <tbody>
                {row("学校类型", schoolA.typeLabel, schoolB.typeLabel, schoolA.typeLabel !== schoolB.typeLabel)}
                {row("入学通道", schoolA.inRoster ? "参加派位" : "自行申请（不派位）", schoolB.inRoster ? "参加派位" : "自行申请（不派位）", schoolA.inRoster !== schoolB.inRoster)}
                {row("本站评级", tierBadge(schoolA.tier), tierBadge(schoolB.tier), (schoolA.tier || "") !== (schoolB.tier || ""))}
                {row("升中通路", schoolA.through_train || "无公开关系", schoolB.through_train || "无公开关系", (schoolA.through_train || "") !== (schoolB.through_train || ""))}
                {row("入学难度", `${bandLabel(schoolA)}${schoolA.quota ? `（学额${schoolA.quota}）` : ""}`, `${bandLabel(schoolB)}${schoolB.quota ? `（学额${schoolB.quota}）` : ""}`, (schoolA.inRoster && schoolB.inRoster && (relativeBand(schoolA.name, schoolA.quota ?? null) !== relativeBand(schoolB.name, schoolB.quota ?? null) || (schoolA.quota ?? 0) !== (schoolB.quota ?? 0))))}
                {row("教学语言", schoolA.language || "—", schoolB.language || "—", (schoolA.language || "") !== (schoolB.language || ""))}
                {row("课程体系", schoolA.typeLabel === "国际" ? "国际课程（非本地）" : "本地课程（DSE 体系）", schoolB.typeLabel === "国际" ? "国际课程（非本地）" : "本地课程（DSE 体系）", false)}
                {row("班制", schoolA.sessions.join("/") || "—", schoolB.sessions.join("/") || "—", schoolA.sessions.join("/") !== schoolB.sessions.join("/"))}
                {row("师生比", schoolA.teacherRatio || "—", schoolB.teacherRatio || "—", (schoolA.teacherRatio || "") !== (schoolB.teacherRatio || ""))}
                {row("校车", schoolA.schoolBus || "—", schoolB.schoolBus || "—", (schoolA.schoolBus || "") !== (schoolB.schoolBus || ""))}
                {row("性别", schoolA.gender || "男女校", schoolB.gender || "男女校", schoolA.gender !== schoolB.gender)}
                {row("宗教", schoolA.religion || "—", schoolB.religion || "—", (schoolA.religion || "") !== (schoolB.religion || ""))}
                {row("地区 / 校网", `${schoolA.district || "—"}${schoolA.net ? ` · ${schoolA.net} 网` : ""}`, `${schoolB.district || "—"}${schoolB.net ? ` · ${schoolB.net} 网` : ""}`, (schoolA.net || "") !== (schoolB.net || ""))}
                {row("学费", schoolA.fees || (schoolA.inRoster ? "免费（官津）" : "见官网"), schoolB.fees || (schoolB.inRoster ? "免费（官津）" : "见官网"), (schoolA.fees || "") !== (schoolB.fees || ""))}
                {row("2027/28 开班", schoolA.p12027 === false ? "未确认" : "开办", schoolB.p12027 === false ? "未确认" : "开办", false)}
              </tbody>
            </table>
            <p className="mt-3 text-[11px] text-[#57534E]">
              ● = 两校在该维度存在差异，重点核对。评级为本站量化口碑（非录取依据）；课程体系为按学校类型推断，请以校方为准。
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
      {analysed && canCompare && schoolA && schoolB && (
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
              ["本站评级", (TIER_CFG[schoolA.tier || "暂无评级"] || TIER_CFG["暂无评级"]).b, (TIER_CFG[schoolB.tier || "暂无评级"] || TIER_CFG["暂无评级"]).b],
              ["入学通道", schoolA.inRoster ? "参加派位" : "自行申请", schoolB.inRoster ? "参加派位" : "自行申请"],
              ["升中通路", schoolA.through_train || "无公开关系", schoolB.through_train || "无公开关系"],
              ["教学语言", schoolA.language || "—", schoolB.language || "—"],
              ["班制", schoolA.sessions.join("/") || "—", schoolB.sessions.join("/") || "—"],
              ["入学难度", `${bandLabel(schoolA)}${schoolA.quota ? `（${schoolA.quota}学额）` : ""}`, `${bandLabel(schoolB)}${schoolB.quota ? `（${schoolB.quota}学额）` : ""}`],
              ["学费", schoolA.fees || (schoolA.inRoster ? "免费（官津）" : "见官网"), schoolB.fees || (schoolB.inRoster ? "免费（官津）" : "见官网")],
            ].map((row, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  borderBottom: i < 6 ? "1px solid #E4E0D8" : "none",
                  fontSize: 16,
                }}
              >
                <div style={{ width: 100, flex: "none", padding: "10px 12px", background: "#FBF9F5", color: "#57534E" }}>
                  {row[0]}
                </div>
                <div style={{ flex: 1, padding: "10px 12px", fontWeight: 700 }}>{row[1]}</div>
                <div style={{ flex: 1, padding: "10px 12px", fontWeight: 700 }}>{row[2]}</div>
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

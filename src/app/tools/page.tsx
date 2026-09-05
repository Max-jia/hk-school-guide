"use client";

import { useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — match.js 是 UMD（module.exports），webpack 互操作后 default 即 api
import Match from "@/lib/match";
import schoolsJson from "@/content/schools.json";
import kgsJson from "@/content/kindergartens.json";
import netsJson from "@/content/nets.json";
import reportMeta from "@/content/report-meta.json";

/* ---------- 类型 ---------- */
type School = {
  name_zh: string;
  name_display?: string;
  district_zh?: string;
  school_net?: string;
  finance_type?: string;
  religion_zh?: string | null;
  fees?: string;
  through_train?: string;
  teacher_ratio?: string;
  teaching_language?: string;
  school_bus?: string;
  features?: string;
  gender?: string;
  tier?: string;
  lat: number;
  lng: number;
};
type Kg = {
  name_zh: string;
  name_display?: string;
  district_zh?: string;
  category_zh?: string;
  has_pn?: boolean;
  kg_type?: string;
  teaching_language?: string;
  lang_mand?: boolean;
  lang_eng?: boolean;
  fee_year?: number | null;
  fees?: string;
  feeder_primary?: string;
  teacher_ratio?: string;
  sessions?: string[];
  tier?: string;
  lat: number;
  lng: number;
};
type Result = { school: School | Kg; score: number; fit: number; reasons: string[] };

const SCHOOLS = schoolsJson as School[];
const KGS = kgsJson as Kg[];
const NETS = netsJson as Record<string, string>;
const META = reportMeta as any;
const TIER_CFG = META.TIER_CFG as Record<string, { c: string; b: string }>;

/* 报告名 → code 映射（供结果卡片跳深度报告） */
const PS_CODE: Record<string, string> = {};
(META.PS_REPORTS as { n: string; c: string }[]).forEach((r) => (PS_CODE[r.n] = r.c));
const KG_CODE: Record<string, string> = {};
(META.KG_REPORTS as { n: string; c: string }[]).forEach((r) => (KG_CODE[r.n] = r.c));
function reportCode(s: School | Kg, isKg: boolean): string | undefined {
  const name = s.name_display || s.name_zh;
  const map = isKg ? KG_CODE : PS_CODE;
  return map[s.name_zh] || map[name];
}

/* ---------- 小学表单选项 ---------- */
const NET_OPTIONS = (() => {
  const nums = [...new Set(SCHOOLS.map((s) => s.school_net).filter((n): n is string => !!n && /^\d+$/.test(n)))]
    .sort((a, b) => Number(a) - Number(b));
  return [{ v: "", label: "不限校网" }].concat(
    nums.map((n) => {
      const area = NETS[n!] ? "（" + NETS[n!].slice(0, 16) + "…）" : "";
      return { v: n, label: `${n} 网 ${area}` };
    })
  );
})();
const BUDGETS = [
  { v: "free", label: "仅免费（官立 / 资助）" },
  { v: "mid", label: "可接受中等学费（直资）" },
  { v: "high", label: "预算充足（私立 / 国际）" },
];
const TRACKS = [
  { v: "local", label: "本地路线（升中考 DSE）" },
  { v: "dss", label: "直资路线" },
  { v: "international", label: "国际路线" },
  { v: "any", label: "暂未确定" },
];
const PERSONALITIES = [
  { v: "balanced", label: "均衡适应 · 各类型都可以" },
  { v: "active", label: "活泼好动 · 喜欢探索和动手" },
  { v: "quiet", label: "安静专注 · 守规矩、适应传统课堂" },
  { v: "challenge", label: "喜欢挑战 · 抗压能力强、追求卓越" },
];
const GENDERS = [
  { v: "", label: "不限" },
  { v: "男女校", label: "男女校" },
  { v: "男校", label: "男校" },
  { v: "女校", label: "女校" },
];
const TIER_FILTERS = [
  { v: "", label: "不限" },
  { v: "rated", label: "仅已评级名校" },
  { v: "S", label: "S 级 · 顶尖神校" },
  { v: "Aplus", label: "A+ 级及以上" },
  { v: "A", label: "A 级及以上" },
  { v: "B", label: "B 级及以上" },
];
const KG_BUDGETS = [
  { v: "", label: "不限" },
  { v: "0:1", label: "免费 / 半日免费" },
  { v: "0:5000", label: "$5,000 以内" },
  { v: "0:20000", label: "$20,000 以内" },
  { v: "0:50000", label: "$50,000 以内" },
  { v: "0:80000", label: "$80,000 以内" },
  { v: "0:120000", label: "$120,000 以内" },
  { v: "0:200000", label: "$200,000 以内" },
];
const KG_TYPES = [
  { v: "", label: "不限" },
  { v: "券校", label: "券校（免费计划）" },
  { v: "私立", label: "私立" },
  { v: "国际", label: "国际" },
];
const KG_LANGS = [
  { v: "", label: "不限" },
  { v: "普通话", label: "重视普通话" },
  { v: "英语", label: "重视英语" },
  { v: "粤语", label: "粤语即可" },
];
const KG_SESSIONS = [
  { v: "any", label: "不限" },
  { v: "上午", label: "上午班" },
  { v: "下午", label: "下午班" },
  { v: "全日", label: "全日班" },
];
const DISTRICTS = [...new Set(KGS.map((k) => k.district_zh).filter(Boolean) as string[])].sort((a, b) =>
  a.localeCompare(b, "zh-Hant")
);

const INPUT_CLS =
  "w-full rounded-[6px] border border-[rgba(48,48,48,.4)] bg-[var(--p-bg)] p-2 text-sm text-[var(--p-fg)] shadow-[0_2px_1px_rgba(0,0,0,.3)] outline-none";

/* ---------- 组件 ---------- */
export default function ToolsPage() {
  const [tab, setTab] = useState<"ps" | "kg">("ps");

  /* 小学 state */
  const [net, setNet] = useState("");
  const [budget, setBudget] = useState("mid");
  const [track, setTrack] = useState("any");
  const [personality, setPersonality] = useState("balanced");
  const [commute, setCommute] = useState(5);
  const [gender, setGender] = useState("");
  const [tier, setTier] = useState("");
  const [psOnlyReport, setPsOnlyReport] = useState(false);

  /* 幼稚园 state */
  const [district, setDistrict] = useState("");
  const [kCommute, setKCommute] = useState(3);
  const [kBgt, setKBgt] = useState("");
  const [kType, setKType] = useState("");
  const [kLang, setKLang] = useState("");
  const [feeder, setFeeder] = useState("no");
  const [session, setSession] = useState("any");
  const [pn, setPn] = useState("no");
  const [kTier, setKTier] = useState("");
  const [kgOnlyReport, setKgOnlyReport] = useState(false);

  const [results, setResults] = useState<Result[] | null>(null);
  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  function runPs() {
    /* 与正式站 primary.html 相同：校网 → 主流区 → 区中心为家 */
    const inNet = SCHOOLS.filter((s) => s.school_net === net);
    const cnt: Record<string, number> = {};
    inNet.forEach((s) => (cnt[s.district_zh || ""] = (cnt[s.district_zh || ""] || 0) + 1));
    const d = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0] || "";
    const inD = SCHOOLS.filter((s) => s.district_zh === d);
    const base = inD.length ? inD : inNet;
    const home = base.length
      ? { lat: base.reduce((a, s) => a + s.lat, 0) / base.length, lng: base.reduce((a, s) => a + s.lng, 0) / base.length }
      : null;
    const profile = {
      net,
      home,
      homeLabel: d,
      budget,
      track,
      personality,
      maxCommuteKm: +commute,
    };
    let pool: School[] = SCHOOLS;
    if (gender) pool = pool.filter((s) => s.gender === gender);
    if (psOnlyReport) pool = pool.filter((s) => reportCode(s, false));
    if (tier === "rated") pool = pool.filter((s) => s.tier);
    else if (tier === "S") pool = pool.filter((s) => s.tier === "S");
    else if (tier === "Aplus") pool = pool.filter((s) => ["S", "A+"].includes(s.tier || ""));
    else if (tier === "A") pool = pool.filter((s) => ["S", "A+", "A"].includes(s.tier || ""));
    else if (tier === "B") pool = pool.filter((s) => ["S", "A+", "A", "B"].includes(s.tier || ""));
    setResults(Match.rankSchools(pool, profile, 20) as Result[]);
    setLabel(net ? `校网 ${net}` : "全港");
    setNote("推荐分 = 学校实力(45%) + 与你条件的适配(55%)，好学校 + 合适 → 分高；徽章 = 学校等级（参考 · 非官方）。");
    boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function runKg() {
    const inD = KGS.filter((k) => k.district_zh === district);
    const home = inD.length
      ? { lat: inD.reduce((a, k) => a + k.lat, 0) / inD.length, lng: inD.reduce((a, k) => a + k.lng, 0) / inD.length }
      : null;
    let pool: Kg[] = KGS;
    if (session && session !== "any") pool = pool.filter((k) => (k.sessions || []).includes(session));
    if (pn === "yes") pool = pool.filter((k) => k.has_pn);
    if (kTier === "rated") pool = pool.filter((k) => k.tier);
    else if (kTier === "S") pool = pool.filter((k) => k.tier === "S");
    else if (kTier === "Aplus") pool = pool.filter((k) => ["S", "A+"].includes(k.tier || ""));
    else if (kTier === "A") pool = pool.filter((k) => ["S", "A+", "A"].includes(k.tier || ""));
    if (kgOnlyReport) pool = pool.filter((k) => reportCode(k, true));
    const bv = kBgt;
    const profile = {
      home,
      homeLabel: district,
      maxCommuteKm: +kCommute,
      budgetMax: bv ? Number(bv.split(":")[1]) : null,
      typePref: kType || null,
      langPref: kLang || null,
      wantFeeder: feeder === "yes",
    };
    setResults(Match.rankKindergartens(pool, profile, 20) as Result[]);
    setLabel(district || "全港");
    setNote("推荐分 = 学校等级(60%) + 与你条件的适配(40%)，好学校 + 合适 → 分高；徽章 = 学校等级（参考 · 非官方）。");
    boxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[980px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · 择校工具</p>
          <h1 className="font-serif text-[clamp(36px,6vw,56px)] font-bold leading-[1.05] tracking-[-1px] text-[var(--p-fg)]">
            找出最适合孩子的学校
          </h1>
          <p className="mt-2 max-w-[560px] text-[var(--p-secondary)]">
            输入校网、预算、孩子性格等条件，引擎按「实力 45% + 适配 55%」全港排名。数据来自教育局公开资料。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            工具数据来自教育局学校概览与公开资料，支持按校网、类型、性别、师生比、学费等条件筛选，
            匹配结果同时给出适合理由与对应深度报告。筛选结果仅供参考，最终选校请以学校官方资讯为准。
          </p>
          <p className="mt-4 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">
            匹配引擎把「学校实力」与「家庭适配」分开计算：实力看评级、师生比、升学通路等客观指标，
            适配看校网距离、预算、语言环境、宗教与班制偏好。结果页会列出每条命中的理由，并直接链接到
            对应学校的深度报告，方便你从「筛出名单」快速进入「逐校深读」。
          </p>
        </div>

        {/* tab */}
        <div className="mb-6 flex gap-2 font-mono text-sm uppercase">
          {(["ps", "kg"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setResults(null); }}
              className={`rounded-[6px] border border-[var(--p-fg)] px-3 py-1 ${
                tab === t ? "bg-[var(--p-fg)] text-[var(--p-bg)]" : ""
              }`}
            >
              {t === "ps" ? "小学匹配" : "幼稚园匹配"}
            </button>
          ))}
        </div>

        {tab === "ps" ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="校网">
              <select value={net} onChange={(e) => setNet(e.target.value)} className={INPUT_CLS}>
                {NET_OPTIONS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="学费预算">
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={INPUT_CLS}>
                {BUDGETS.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="升学路线">
              <select value={track} onChange={(e) => setTrack(e.target.value)} className={INPUT_CLS}>
                {TRACKS.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="孩子性格">
              <select value={personality} onChange={(e) => setPersonality(e.target.value)} className={INPUT_CLS}>
                {PERSONALITIES.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label={`可接受通勤（${commute} 公里内）`}>
              <input
                type="range" min={1} max={15} step={1} value={commute}
                onChange={(e) => setCommute(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--p-fg)]"
              />
            </Field>
            <Field label="性别">
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={INPUT_CLS}>
                {GENDERS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="评级筛选">
              <select value={tier} onChange={(e) => setTier(e.target.value)} className={INPUT_CLS}>
                {TIER_FILTERS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <div className="flex items-end">
              <button
                onClick={runPs}
                className="w-full rounded-[6px] bg-[var(--p-fg)] px-6 py-3 font-mono text-sm uppercase text-[var(--p-bg)] transition-opacity hover:opacity-85"
              >
                开始匹配 →
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--p-secondary)]">
              <input
                type="checkbox"
                checked={psOnlyReport}
                onChange={(e) => setPsOnlyReport(e.target.checked)}
                className="accent-[var(--p-fg)]"
              />
              只看有深度报告的学校
            </label>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="居住地区">
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className={INPUT_CLS}>
                <option value="">不限地区</option>
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </Field>
            <Field label={`可接受通勤（${kCommute} 公里内）`}>
              <input
                type="range" min={1} max={15} step={1} value={kCommute}
                onChange={(e) => setKCommute(Number(e.target.value))}
                className="mt-3 w-full accent-[var(--p-fg)]"
              />
            </Field>
            <Field label="学费预算">
              <select value={kBgt} onChange={(e) => setKBgt(e.target.value)} className={INPUT_CLS}>
                {KG_BUDGETS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="学校类型">
              <select value={kType} onChange={(e) => setKType(e.target.value)} className={INPUT_CLS}>
                {KG_TYPES.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="授课语言">
              <select value={kLang} onChange={(e) => setKLang(e.target.value)} className={INPUT_CLS}>
                {KG_LANGS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="直属 / 联系小学">
              <select value={feeder} onChange={(e) => setFeeder(e.target.value)} className={INPUT_CLS}>
                <option value="no">不限</option>
                <option value="yes">优先有直属/联系小学</option>
              </select>
            </Field>
            <Field label="时段">
              <select value={session} onChange={(e) => setSession(e.target.value)} className={INPUT_CLS}>
                {KG_SESSIONS.map((o) => (
                  <option key={o.v} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="PN 班">
              <select value={pn} onChange={(e) => setPn(e.target.value)} className={INPUT_CLS}>
                <option value="no">不限</option>
                <option value="yes">须设有 PN 班</option>
              </select>
            </Field>
            <Field label="评级筛选">
              <select value={kTier} onChange={(e) => setKTier(e.target.value)} className={INPUT_CLS}>
                {TIER_FILTERS.map((o) => (
                  <option key={o.v || "all"} value={o.v}>{o.label}</option>
                ))}
              </select>
            </Field>
            <div className="flex items-end">
              <button
                onClick={runKg}
                className="w-full rounded-[6px] bg-[var(--p-fg)] px-6 py-3 font-mono text-sm uppercase text-[var(--p-bg)] transition-opacity hover:opacity-85"
              >
                开始匹配 →
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm text-[var(--p-secondary)]">
              <input
                type="checkbox"
                checked={kgOnlyReport}
                onChange={(e) => setKgOnlyReport(e.target.checked)}
                className="accent-[var(--p-fg)]"
              />
              只看有深度报告的学校
            </label>
          </div>
        )}

        {/* 结果 */}
        <div ref={boxRef} className="scroll-mt-8">
          {results !== null && (
            <>
              <h2 className="mt-12 font-serif text-2xl font-bold text-[var(--p-fg)]">
                为你匹配的前 {results.length} 所（{label}）
              </h2>
              <p className="mb-6 mt-1 text-sm text-[var(--p-secondary)]">{note}</p>
              {results.length === 0 && (
                <p className="py-12 text-center text-[var(--p-secondary)]">
                  没有完全符合条件的学校，试试放宽筛选（例如放宽评级或性别限制）。
                </p>
              )}
              <ul className="m-0 list-none p-0">
                {results.map((r, i) => {
                  const s = r.school as School & Kg;
                  const t = s.tier || "暂无评级";
                  const cfg = TIER_CFG[t] || TIER_CFG["暂无评级"];
                  const isKg = tab === "kg";
                  const code = reportCode(s, isKg);
                  const feeFree = !isKg && (s.finance_type === "官立" || s.finance_type === "资助");
                  const meta = Match.tierMeta(s.tier) as { label: string; blurb: string };
                  return (
                    <li key={i} className="mb-4 rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className="rounded-full px-2 py-1 font-mono text-sm font-bold text-[var(--p-bg)]"
                          style={{ background: cfg.c }}
                        >
                          推荐 {r.score}
                        </span>
                        <span className="font-mono text-sm text-[var(--p-secondary)]">#{i + 1}</span>
                        <span className="font-serif text-xl font-bold text-[var(--p-fg)]">{s.name_display || s.name_zh}</span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-baseline gap-2">
                        <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">{meta.label}</span>
                        <span className="text-xs text-[var(--p-secondary)]">{meta.blurb}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs uppercase text-[var(--p-secondary)]">
                        {!isKg && (
                          <>
                            <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.finance_type || "—"}</span>
                            <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.district_zh || ""}</span>
                            <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">
                              {s.school_net && s.school_net !== "不限校网" ? `${s.school_net} 校网` : "不限校网"}
                            </span>
                            {s.religion_zh && s.religion_zh !== "不适用" && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.religion_zh}</span>
                            )}
                            {s.through_train && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.through_train}</span>
                            )}
                            {s.teacher_ratio && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">师生比 {s.teacher_ratio}</span>
                            )}
                            {s.teaching_language && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.teaching_language}</span>
                            )}
                            {s.school_bus && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.school_bus}</span>
                            )}
                          </>
                        )}
                        {isKg && (
                          <>
                            {s.kg_type && <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.kg_type}</span>}
                            <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.district_zh || ""}</span>
                            {s.feeder_primary && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">直升 {s.feeder_primary}</span>
                            )}
                            {s.fees && <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{s.fees}</span>}
                            {s.teacher_ratio && (
                              <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">师生比 {s.teacher_ratio}</span>
                            )}
                            {(s.sessions || []).map((se) => (
                              <span key={se} className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">{se}班</span>
                            ))}
                          </>
                        )}
                        {feeFree && (
                          <span className="rounded-full border border-[var(--p-gray-300)] px-2 py-0.5">免费（官津）</span>
                        )}
                      </div>
                      <ul className="m-0 mt-3 list-none p-0 text-sm text-[var(--p-fg)]">
                        {r.reasons.map((x, j) => (
                          <li key={j} className="mb-0.5">· {x}</li>
                        ))}
                      </ul>
                      {code && (
                        <a
                          href={`/reports/${code}`}
                          className="mt-3 inline-block rounded-[6px] border border-[var(--p-fg)] px-4 py-1.5 font-mono text-xs uppercase text-[var(--p-fg)] no-underline transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
                        >
                          查看完整深度报告 →
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase text-[var(--p-secondary)]">{label}</span>
      {children}
    </label>
  );
}

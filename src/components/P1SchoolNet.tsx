"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import p1NetsJson from "@/content/p1-nets.json";
import reportMeta from "@/content/report-meta.json";
import schoolsJson from "@/content/schools.json";

type SchoolRow = {
  net: string;
  no: string;
  name: string;
  name_en: string;
  type: string;
  finance: string;
  religion: string;
  quota: number | null;
  address: string;
  remarks: string[];
};

const P1 = p1NetsJson as {
  meta: { total_schools: number };
  nets: { net: string; area: string; area_short: string; count: number; schools: SchoolRow[] }[];
};
const META = reportMeta as any;
const DSS = (schoolsJson as {
  school_no?: number; name_zh: string; name_display?: string; district_zh?: string; finance_type?: string; fees?: string;
}[])
  .filter((s) => s.finance_type === "直资")
  .sort((a, b) => (a.district_zh || "").localeCompare(b.district_zh || "", "zh-HK"));
const PS_CODE: Record<string, string> = {};
(META.PS_REPORTS as { n: string; c: string }[]).forEach((r) => (PS_CODE[r.n] = r.c));

const REMARK_LABEL: Record<string, string> = {
  S: "小班教学",
  P: "无障碍设施",
  U1: "一条龙办学",
  H2: "特别附注",
};

function reportOf(name: string): string | undefined {
  return PS_CODE[name];
}

export default function P1SchoolNet() {
  const [net, setNet] = useState(P1.nets[0].net);
  const [q, setQ] = useState("");

  const current = P1.nets.find((n) => n.net === net) || P1.nets[0];
  const list = useMemo(() => {
    if (!q.trim()) return current.schools;
    const chars = q.trim().toLowerCase().split("");
    return current.schools.filter((s) =>
      chars.every((c) => (s.name + " " + s.name_en).toLowerCase().includes(c))
    );
  }, [current, q]);

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[960px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">Tools · 校网数据库</p>
          <h1 className="font-serif text-[clamp(32px,5vw,52px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            输入校网，看网内全部派位小学
          </h1>
          <p className="mt-2 max-w-[640px] text-[var(--p-secondary)]">
            全港 36 个校网、<strong className="text-[var(--p-fg)]">{P1.meta.total_schools} 所官立及资助小学</strong>，
            名单来自教育局《2027年度小一入学 · 各小一学校网小学名册》（2026年8月编制），逐校可核对。
          </p>
          <p className="mt-3 rounded-[8px] border-l-4 border-[var(--p-hl-yellow-border)] bg-[var(--p-hl-yellow-bg)] px-4 py-3 text-sm text-[var(--p-fg)]">
            ⚠️ 名册只收录 2027/28 学年开办小一班级的官立及资助学校；直资/私立/英基及特殊学校不在此列。
            统一派位阶段部分学校亦供其他校网选择（暂定统一派位学额），此处为自行分配阶段所属校网。
          </p>
        </div>

        {/* 校网选择 */}
        <div className="flex flex-wrap gap-2">
          {P1.nets.map((n) => (
            <button
              key={n.net}
              onClick={() => setNet(n.net)}
              className={`rounded-full border px-3 py-1.5 font-mono text-sm transition-colors ${
                net === n.net
                  ? "border-[var(--p-fg)] bg-[var(--p-fg)] text-[var(--p-bg)]"
                  : "border-[var(--p-gray-300)] text-[var(--p-secondary)] hover:border-[var(--p-fg)] hover:text-[var(--p-fg)]"
              }`}
              title={n.area}
            >
              {n.net} 网 · {n.count}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">
              {net} 校网
            </h2>
            <span className="font-mono text-xs uppercase text-[var(--p-secondary)]">
              {current.count} 所官立及资助小学
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="搜索学校名…"
              className="ml-auto w-full rounded-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 text-sm text-[var(--p-fg)] outline-none sm:w-56"
            />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{current.area}</p>

          <ul className="m-0 mt-4 list-none p-0">
            {list.map((s, i) => {
              const code = reportOf(s.name);
              return (
                <li
                  key={s.no + "-" + i}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[var(--p-gray-300)] py-3"
                >
                  <span className="w-10 shrink-0 font-mono text-xs text-[var(--p-secondary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-serif text-base font-bold text-[var(--p-fg)]">{s.name}</span>
                      {s.name_en && (
                        <span className="text-xs text-[var(--p-secondary)]">{s.name_en}</span>
                      )}
                      {code && (
                        <a
                          href={`/reports/${code}`}
                          className="rounded-full border border-[var(--p-hl-border)] px-2 py-0.5 font-mono text-xs text-[var(--p-hl-border)] no-underline hover:bg-[var(--p-hl-border)] hover:text-[var(--p-bg)]"
                        >
                          深度报告 →
                        </a>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-[var(--p-secondary)]">
                      <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">
                        {s.finance === "官立" ? "官立" : "资助"} · {s.type || "—"}
                      </span>
                      {s.religion && (
                        <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">{s.religion}</span>
                      )}
                      <span className="rounded bg-[var(--p-bg)] px-1.5 py-0.5">
                        自行分配约 {s.quota ?? "—"} 个学额
                      </span>
                      {s.remarks.map((r) => (
                        <span key={r} className="rounded bg-[var(--p-hl-yellow-bg)] px-1.5 py-0.5">
                          {REMARK_LABEL[r] || r}
                        </span>
                      ))}
                    </div>
                    {s.address && (
                      <p className="mt-1 text-xs text-[var(--p-secondary)]">{s.address}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {list.length === 0 && (
            <p className="py-8 text-center text-[var(--p-secondary)]">没有匹配的学校</p>
          )}
        </div>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6">
          <h2 className="font-serif text-2xl font-bold text-[var(--p-fg)]">直资小学速查（自行申请 · 不参与派位）</h2>
          <p className="mt-2 text-sm text-[var(--p-secondary)]">
            以下直资小学（含聖保羅書院小學、拔萃男書院、保良局陳守仁等）不在小一统筹办法内，
            不参加官津派位，也不能填进乙部志愿；它们<b className="text-[var(--p-fg)]">自行招生、全港申请、不限校网</b>，
            适合作为派位体系外的自行申请通道。私立/国际学校请直接到各校官网查询收生安排。
          </p>
          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {DSS.map((s2) => (
              <div key={s2.school_no ?? s2.name_zh} className="rounded-[8px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] px-3 py-2 text-sm">
                <p className="font-bold text-[var(--p-fg)]">{s2.name_display || s2.name_zh}</p>
                <p className="text-xs text-[var(--p-secondary)]">
                  {s2.district_zh || "—"} · {s2.fees || "学费见官网"} · 直资
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[var(--p-secondary)]">
            说明：本页上方名单为参加派位的官立/资助学校（名册 433 所）；直资/私立/国际不在名册内，属另一套招生体系。
          </p>
        </div>

        <div className="mt-8 rounded-[12px] border border-[var(--p-gray-300)] bg-[var(--p-white)] p-6 text-sm leading-relaxed text-[var(--p-secondary)]">
          <p className="font-bold text-[var(--p-fg)]">📎 数据来源与核对方式</p>
          <p className="mt-2">
            名单依据教育局《2027年度小一入学 · 自行分配学位阶段各小一学校网小学名册》（2026年8月编制）：
            <a className="underline" href="https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/index.html">
              教育局 · 小一学校网小学名册
            </a>
            。总册与 36 份单网 PDF 交叉核对一致（433 所，0 差异）；校网范围依据《填表须知》附录二概览表。
            每年 9 月新学年名册公布后更新。本页面仅展示官方名单，不预测录取结果。
          </p>
          <p className="mt-2">
            交表前想先算计分、过一遍清单？→{" "}
            <a className="underline" href="/tools/p1-self-check">小一派位交表自查工具</a>
          </p>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}

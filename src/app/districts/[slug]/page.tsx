import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import districts from "@/content/districts.json";
import schools from "@/content/schools.json";
import kindergartens from "@/content/kindergartens.json";
import reportMeta from "@/content/report-meta.json";

const DISTRICTS = districts as { slug: string; zh: string; en: string; blurb: string }[];
const SCHOOLS = schools as any[];
const KGS = kindergartens as any[];
const META = reportMeta as any;
const TIER_CFG = META.TIER_CFG as Record<string, { c: string; b: string }>;

const PS_CODE: Record<string, string> = {};
(META.PS_REPORTS as { n: string; c: string }[]).forEach((r) => (PS_CODE[r.n] = r.c));
const KG_CODE: Record<string, string> = {};
(META.KG_REPORTS as { n: string; c: string }[]).forEach((r) => (KG_CODE[r.n] = r.c));

function reportCode(nameZh: string | undefined, nameDisplay: string | undefined, isKg: boolean): string | undefined {
  const map = isKg ? KG_CODE : PS_CODE;
  return map[nameZh || ""] || map[nameDisplay || ""];
}

function tierLabel(tier: string | undefined): string {
  if (!tier) return "暂无评级";
  const t = String(tier).toUpperCase();
  if (t.startsWith("S")) return "S";
  if (t.startsWith("A+")) return "A+";
  if (t.startsWith("A")) return "A";
  if (t.startsWith("B")) return "B";
  return "暂无评级";
}

export function generateStaticParams() {
  return DISTRICTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: `${d.zh}小学与幼稚园盘点：校网、评级、学费、师生比 | 港学荟`,
    description: `${d.zh}（${d.en}）小学与幼稚园完整盘点：学校清单、平台评级、学费与师生比。${d.blurb}`,
  };
}

function SchoolRow({ s, isKg }: { s: any; isKg: boolean }) {
  const tier = tierLabel(s.tier);
  const cfg = TIER_CFG[tier] || { c: "#9CA3AF", b: tier };
  const code = reportCode(s.name_zh, s.name_display, isKg);
  return (
    <tr className="border-t border-black/10 dark:border-white/10">
      <td className="py-3 pr-3">
        <div className="font-serif text-[15px] font-bold leading-snug text-[var(--p-fg)]">
          {s.name_display || s.name_zh}
        </div>
        {isKg && s.kg_type && (
          <div className="mt-0.5 font-mono text-[11px] uppercase text-[var(--p-secondary)]">{s.kg_type}</div>
        )}
      </td>
      <td className="py-3 pr-3">
        <span
          className="inline-block rounded-full px-2 py-0.5 font-mono text-xs font-bold text-white"
          style={{ background: cfg.c }}
        >
          {tier}
        </span>
      </td>
      <td className="py-3 pr-3 font-mono text-xs text-[var(--p-secondary)]">{s.fees || "—"}</td>
      <td className="py-3 pr-3 font-mono text-xs text-[var(--p-secondary)]">{s.teacher_ratio || "—"}</td>
      <td className="py-3">
        {code ? (
          <a
            href={`/reports/${code}`}
            className="inline-block rounded-[6px] border border-[var(--p-fg)] px-3 py-1 font-mono text-xs uppercase text-[var(--p-fg)] no-underline transition-colors hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
          >
            深度报告 →
          </a>
        ) : (
          <span className="font-mono text-xs text-[var(--p-secondary)]">—</span>
        )}
      </td>
    </tr>
  );
}

export default async function DistrictPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DISTRICTS.find((x) => x.slug === slug);
  if (!d) {
    return (
      <main className="w-full">
        <SiteHeader />
        <p className="p-8 text-[var(--p-secondary)]">找不到该地区。</p>
        <SiteFooter />
      </main>
    );
  }
  const ps = SCHOOLS.filter((s) => s.district_zh === d.zh);
  const kg = KGS.filter((k) => k.district_zh === d.zh);
  const psRated = ps.filter((s) => s.tier).length;
  const kgRated = kg.filter((k) => k.tier).length;

  return (
    <main className="w-full">
      <SiteHeader />
      <div className="mx-auto max-w-[1080px] px-4 pb-24">
        <div className="py-8">
          <p className="font-mono text-sm uppercase text-[var(--p-secondary)]">
            <a href="/districts" className="text-[var(--p-secondary)] no-underline hover:underline">分区盘点</a> · {d.en}
          </p>
          <h1 className="font-serif text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-1px] text-[var(--p-fg)]">
            {d.zh}小学与幼稚园盘点
          </h1>
          <p className="mt-2 max-w-[680px] text-[var(--p-secondary)]">{d.blurb}</p>
          <div className="mt-5 flex flex-wrap gap-3 font-mono text-xs uppercase text-[var(--p-secondary)]">
            <span className="rounded-full border border-[var(--p-fg)] px-3 py-1">小学 {ps.length} 所</span>
            <span className="rounded-full border border-[var(--p-fg)] px-3 py-1">幼稚园 {kg.length} 所</span>
            <span className="rounded-full border border-[var(--p-fg)] px-3 py-1">已评级小学 {psRated}</span>
            <span className="rounded-full border border-[var(--p-fg)] px-3 py-1">已评级幼稚园 {kgRated}</span>
          </div>
        </div>

        <h2 className="mt-8 border-t border-black/10 pt-6 font-serif text-2xl font-bold text-[var(--p-fg)] dark:border-white/10">
          小学（{ps.length} 所）
        </h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="text-left font-mono text-xs uppercase text-[var(--p-secondary)]">
                <th className="py-2 pr-3">学校</th>
                <th className="py-2 pr-3">评级</th>
                <th className="py-2 pr-3">学费</th>
                <th className="py-2 pr-3">师生比</th>
                <th className="py-2">报告</th>
              </tr>
            </thead>
            <tbody>
              {ps.map((s, i) => (
                <SchoolRow key={i} s={s} isKg={false} />
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 border-t border-black/10 pt-6 font-serif text-2xl font-bold text-[var(--p-fg)] dark:border-white/10">
          幼稚园（{kg.length} 所）
        </h2>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="text-left font-mono text-xs uppercase text-[var(--p-secondary)]">
                <th className="py-2 pr-3">学校</th>
                <th className="py-2 pr-3">评级</th>
                <th className="py-2 pr-3">学费</th>
                <th className="py-2 pr-3">师生比</th>
                <th className="py-2">报告</th>
              </tr>
            </thead>
            <tbody>
              {kg.map((k, i) => (
                <SchoolRow key={i} s={k} isKg={true} />
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 font-mono text-xs text-[var(--p-secondary)]">
          数据来源：教育局学校概览（KGP/PSP 2025）与公开资料 · 评级为本平台参考体系 · 不构成入学建议
        </p>
      </div>
      <SiteFooter />
    </main>
  );
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import reportMeta from "@/content/report-meta.json";

export const dynamic = "force-dynamic";

const ROOT = process.cwd();
const META = reportMeta as any;

const PS_CODE: Record<string, string> = {};
(META.PS_REPORTS as { n: string; c: string }[]).forEach((r) => (PS_CODE[r.n] = r.c));
const KG_CODE: Record<string, string> = {};
(META.KG_REPORTS as { n: string; c: string }[]).forEach((r) => (KG_CODE[r.n] = r.c));

type SchoolRow = {
  name: string;
  type: "primary" | "kindergarten";
  district?: string;
  net?: string;
  finance?: string;
  kg_type?: string;
  gender?: string;
  religion?: string;
  fees?: string;
  fee_year?: number | null;
  ratio?: string;
  language?: string;
  free?: boolean;
  pn?: boolean;
  sessions?: string[];
  tier?: string | null;
  report?: string | null;
};

function tierOf(t: unknown): string | null {
  if (!t) return null;
  const s = String(t).toUpperCase();
  if (s.startsWith("S")) return "S";
  if (s.startsWith("A+")) return "A+";
  if (s.startsWith("A")) return "A";
  if (s.startsWith("B")) return "B";
  return null;
}

function loadRows(): SchoolRow[] {
  const out: SchoolRow[] = [];

  const schools = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/content/schools.json"), "utf8")
  ) as any[];
  for (const s of schools) {
    const name = s.name_display || s.name_zh;
    out.push({
      name,
      type: "primary",
      district: s.district_zh,
      net: s.school_net,
      finance: s.finance_type,
      gender: s.gender,
      religion: s.religion_zh,
      fees: s.fees,
      ratio: s.teacher_ratio,
      language: s.teaching_language,
      sessions: s.sessions || [],
      tier: tierOf(s.tier),
      report: PS_CODE[s.name_zh] || PS_CODE[name] || null,
    });
  }

  const kgs = JSON.parse(
    fs.readFileSync(path.join(ROOT, "src/content/kindergartens.json"), "utf8")
  ) as any[];
  for (const k of kgs) {
    const name = k.name_display || k.name_zh;
    out.push({
      name,
      type: "kindergarten",
      district: k.district_zh,
      kg_type: k.kg_type,
      fees: k.fees,
      fee_year: k.fee_year,
      ratio: k.teacher_ratio,
      language: k.teaching_language,
      free: Boolean(k.is_free_scheme),
      pn: Boolean(k.has_pn),
      sessions: k.sessions || [],
      tier: tierOf(k.tier),
      report: KG_CODE[k.name_zh] || KG_CODE[name] || null,
    });
  }

  return out;
}

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const type = sp.get("type"); // primary | kindergarten
  const district = sp.get("district");
  const net = sp.get("net");
  const tier = sp.get("tier");
  const q = sp.get("q");
  const limit = Math.min(Number(sp.get("limit") || 50), 200);
  const offset = Math.max(Number(sp.get("offset") || 0), 0);

  let rows = loadRows();
  if (type === "primary") rows = rows.filter((r) => r.type === "primary");
  if (type === "kindergarten") rows = rows.filter((r) => r.type === "kindergarten");
  if (district) rows = rows.filter((r) => r.district === district);
  if (net) rows = rows.filter((r) => r.net === net);
  if (tier) rows = rows.filter((r) => r.tier === String(tier).toUpperCase());
  if (q) {
    const chars = q.trim().toLowerCase().split("");
    rows = rows.filter((r) => chars.every((c) => r.name.toLowerCase().includes(c)));
  }

  const total = rows.length;
  const items = rows.slice(offset, offset + limit);

  return NextResponse.json({
    ok: true,
    meta: {
      type: type || "all",
      district: district || null,
      net: net || null,
      tier: tier || null,
      q: q || null,
      total,
      offset,
      limit,
    },
    items,
  });
}

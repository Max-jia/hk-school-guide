import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 报告全文接口（保留给旧客户端兼容；当前报告页直接服务端渲染全文）
//
// 当前不再需要 license；服务端仍校验 slug 和文件路径，避免任意文件读取。
export const dynamic = "force-dynamic";

const ROOT = process.cwd();
const REPORTS_DIR = path.join(ROOT, "src/content/reports");

// slug 只允许小写字母/数字/连字符，且必须是目录里真实存在的文件——
// 双保险，避免路径穿越（../../etc/passwd 这类）
function safeSlug(input: unknown): string | null {
  const s = String(input ?? "").replace(/[^a-z0-9-]/g, "");
  if (!s || s !== String(input ?? "")) return null;
  return s;
}

export async function POST(req: NextRequest) {
  let body: { slug?: unknown; license?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const slug = safeSlug(body.slug);
  if (!slug) {
    return NextResponse.json({ ok: false, reason: "bad-slug" }, { status: 400 });
  }

  const file = path.join(REPORTS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) {
    return NextResponse.json({ ok: false, reason: "not-found" }, { status: 404 });
  }

  let data: { free?: boolean; premiumHtml?: string };
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return NextResponse.json({ ok: false, reason: "read-error" }, { status: 500 });
  }

  if (!data.premiumHtml) {
    return NextResponse.json({ ok: false, reason: "not-found" }, { status: 404 });
  }

  // 回传的是简体源文；客户端按当前语言（繁/简）转换后再渲染
  return NextResponse.json(
    { ok: true, slug, html: data.premiumHtml },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}

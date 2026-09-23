import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyLicense } from "@/lib/license";

// 付费章节正文接口（付费墙的「真闸门」）
//
// 背景：2026-09 审计发现，付费章节原本用 <div style="display:none"> 直接输出在
// 静态 HTML 里，解锁判断只读 localStorage 的 "true" 字符串——等于浏览器控制台打
// 一行就能看完全站 169 份报告。现在改成：付费正文不进 HTML，只有带着服务端签名
// license 来换才给。
//
// 免费章节（第 0-1 章）仍然留在静态 HTML 里，给搜索引擎和 AI 抓取器读。
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

  // 服务端验签：客户端伪造不了（HMAC 密钥只在服务端）
  const license = body.license ? verifyLicense(String(body.license), slug) : null;
  if (!license) {
    return NextResponse.json({ ok: false, reason: "no-license" }, { status: 403 });
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

  if (data.free || !data.premiumHtml) {
    return NextResponse.json({ ok: false, reason: "not-premium" }, { status: 400 });
  }

  // 回传的是简体源文；客户端按当前语言（繁/简）转换后再渲染
  return NextResponse.json({ ok: true, slug, html: data.premiumHtml });
}

import { NextRequest, NextResponse } from "next/server";
import { addReply, getReplies, rateLimitCheck } from "@/lib/qa-store";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const items = await getReplies(id);
  return NextResponse.json({ ok: true, count: items.length, items });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: { body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const text = String(body.body || "").trim();
  if (text.length < 2) {
    return NextResponse.json({ ok: false, reason: "too_short" }, { status: 400 });
  }
  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim().slice(0, 64);
  const allowed = await rateLimitCheck("reply", ip);
  if (!allowed) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }
  const item = await addReply(id, text);
  if (!item) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, item });
}

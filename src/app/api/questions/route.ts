import { NextRequest, NextResponse } from "next/server";
import { addQuestion, getQuestions, rateLimitCheck } from "@/lib/qa-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = await getQuestions();
  return NextResponse.json({ ok: true, count: list.length, items: list });
}

export async function POST(req: NextRequest) {
  let body: { school?: string; category?: string; question?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  const question = String(body.question || "").trim();
  if (question.length < 5) {
    return NextResponse.json({ ok: false, reason: "too_short" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim().slice(0, 64);
  const allowed = await rateLimitCheck("post", ip);
  if (!allowed) {
    return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });
  }

  const item = await addQuestion({
    school: body.school,
    category: body.category,
    question,
  });
  return NextResponse.json({ ok: true, item });
}

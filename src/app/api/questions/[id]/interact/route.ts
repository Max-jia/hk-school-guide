import { NextRequest, NextResponse } from "next/server";
import { interactQuestion } from "@/lib/qa-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let body: { type?: string; deviceId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const type = String(body.type || "");
  if (!["like", "favorite", "share"].includes(type)) {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const deviceId = String(body.deviceId || "").slice(0, 64);
  const result = await interactQuestion(id, type as "like" | "favorite" | "share", deviceId || undefined);
  if (!result) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, ...result });
}

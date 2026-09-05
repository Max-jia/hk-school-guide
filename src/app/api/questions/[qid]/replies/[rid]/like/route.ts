import { NextRequest, NextResponse } from "next/server";
import { likeReply } from "@/lib/qa-store";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ qid: string; rid: string }> }) {
  const { qid, rid } = await params;
  let body: { deviceId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }
  const deviceId = String(body.deviceId || "").slice(0, 64);
  const result = await likeReply(qid, rid, deviceId || undefined);
  if (!result) {
    return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, ...result });
}

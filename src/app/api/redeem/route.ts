import { NextRequest, NextResponse } from "next/server";
import { redeemCode } from "@/lib/redeem-store";

// 兑换码核销：小红书购买兑换码 -> 本站 /redeem 输入 -> 解锁 Pro 模拟器报告
export async function POST(req: NextRequest) {
  const { code } = await req.json();
  const result = await redeemCode(String(code || ""));
  if (!result.ok) {
    return NextResponse.json({ ok: false, reason: result.reason });
  }
  return NextResponse.json({ ok: true, type: result.type });
}

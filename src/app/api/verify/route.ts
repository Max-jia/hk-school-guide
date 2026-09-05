import { NextRequest, NextResponse } from "next/server";
import { createLicense } from "@/lib/license";

// 验证 Stripe 支付会话:只有 Stripe 确认「钱已到账」才放行解锁
// 之前漏洞:解锁页无条件放行,点一下「恢复」就白嫖
export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "server not configured" }, { status: 500 });
  }

  const { session_id } = await req.json();
  if (!session_id) {
    return NextResponse.json({ ok: false });
  }

  // 向 Stripe 查询这笔支付会话的真实状态
  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${session_id}`, {
    headers: { Authorization: `Bearer ${key}` },
  });
  const j = await res.json();

  // 只有 payment_status = paid(钱真的到账)才解锁
  if (!res.ok || j.payment_status !== "paid") {
    return NextResponse.json({ ok: false });
  }

  // report/mode 来自订单 metadata(建单时服务端写入,客户端伪造不了)
  const meta = j.metadata || {};
  const report = meta.report || "";
  const mode = meta.mode === "all" ? "all" : "single";
  const license = createLicense(report, mode);
  return NextResponse.json({ ok: true, report, mode, license });
}

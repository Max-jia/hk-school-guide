import { NextRequest, NextResponse } from "next/server";

// 创建 Stripe Checkout 会话(防白嫖核心)
// 价格在此服务端定死,客户端改不了价:
//   all=全解锁 HK$99(9900) / single=单份报告 HK$9.9(990) / sim=志愿体检报告 HK$68(6800)
export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "server not configured" }, { status: 500 });
  }

  const { slug, mode, product } = await req.json();
  const m = mode === "all" ? "all" : "single";

  const origin = new URL(req.url).origin; // 本地测试=localhost,线上=hkschool.guide

  // Pro 模拟器：小一志愿结构体检报告
  if (product === "sim") {
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        mode: "payment",
        "line_items[0][quantity]": "1",
        "line_items[0][price_data][currency]": "hkd",
        "line_items[0][price_data][unit_amount]": "6800",
        "line_items[0][price_data][product_data][name]": "港学荟 · 小一志愿结构体检报告（Pro 模拟器）",
        "line_items[0][price_data][product_data][description]": "冲刺/匹配/保底结构检查＋修改建议＋叩门预案，一页 PDF",
        success_url: `${origin}/unlock?session_id={CHECKOUT_SESSION_ID}&report=p1-sim&mode=single`,
        cancel_url: `${origin}/tools/p1-simulator`,
        "metadata[source]": "hkschool",
        "metadata[report]": "p1-sim",
        "metadata[mode]": "single",
      }),
    });
    const j = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: j.error?.message || "stripe error" }, { status: 500 });
    }
    return NextResponse.json({ url: j.url });
  }

  const cleanSlug = String(slug || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  if (!cleanSlug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      mode: "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "hkd",
      "line_items[0][price_data][unit_amount]": m === "all" ? "9900" : "990",
      "line_items[0][price_data][product_data][name]":
        m === "all" ? "港学荟 · 全站报告解锁" : `港学荟 · 单份报告(${cleanSlug})`,
      "line_items[0][price_data][product_data][description]":
        m === "all" ? "一键解锁全部深度报告" : "深度择校报告单份解锁",
      // {CHECKOUT_SESSION_ID} 由 Stripe 替换成真实支付凭证,解锁页凭它核实
      success_url: `${origin}/unlock?session_id={CHECKOUT_SESSION_ID}&report=${cleanSlug}&mode=${m}`,
      cancel_url: `${origin}/reports/${cleanSlug}`,
      "metadata[source]": "hkschool",
      "metadata[report]": cleanSlug,
      "metadata[mode]": m,
    }),
  });
  const j = await res.json();
  if (!res.ok) {
    return NextResponse.json({ error: j.error?.message || "stripe error" }, { status: 500 });
  }
  return NextResponse.json({ url: j.url });
}

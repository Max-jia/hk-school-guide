import { NextResponse } from "next/server";

// 站内报告与工具现已全部开放。保留旧接口是为了让旧客户端收到明确响应，
// 但不再创建新的 Stripe 订单，避免用户为已公开内容付款。
export async function POST() {
  return NextResponse.json({ error: "content is free" }, { status: 410 });
}

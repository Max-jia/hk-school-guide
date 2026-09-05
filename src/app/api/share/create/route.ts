import { NextRequest, NextResponse } from "next/server";
import { setShare } from "@/lib/share-store";
import { verifyLicense } from "@/lib/license";

// 所有人可生成分享链接：
// - 已购买用户：token 带 2 次完整解锁额度
// - 未购买用户：直接分享报告页（接收者看到未解锁版，不限次数）
export async function POST(req: NextRequest) {
  const { slug, license } = await req.json();
  const cleanSlug = String(slug || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  if (!cleanSlug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const origin = new URL(req.url).origin;
  // 服务端校验 license；无效一律按未购买处理
  const purchased = Boolean(license && verifyLicense(String(license), cleanSlug));
  if (!purchased) {
    return NextResponse.json({
      ok: true,
      purchased: false,
      url: `${origin}/reports/${cleanSlug}`,
    });
  }

  // 已购买：签发 2 次解锁 token
  const token = "shr_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  await setShare(token, {
    slug: cleanSlug,
    used: 0,
    max: 2,
    createdAt: Date.now(),
  });

  return NextResponse.json({
    ok: true,
    purchased: true,
    token,
    url: `${origin}/unlock?token=${token}&report=${cleanSlug}`,
    remaining: 2,
  });
}

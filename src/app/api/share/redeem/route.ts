import { NextRequest, NextResponse } from "next/server";
import { getShare, setShare } from "@/lib/share-store";

// 访客打开分享链接：服务端核销一次额度，超过 2 人则拒绝
export async function POST(req: NextRequest) {
  const { token, slug } = await req.json();
  const cleanSlug = String(slug || "").replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  const cleanToken = String(token || "").slice(0, 64);
  if (!cleanSlug || !cleanToken) {
    return NextResponse.json({ ok: false, reason: "invalid" });
  }

  const rec = await getShare(cleanToken);
  if (!rec || rec.slug !== cleanSlug) {
    return NextResponse.json({ ok: false, reason: "invalid" });
  }
  if (rec.used >= rec.max) {
    return NextResponse.json({ ok: false, reason: "limit" });
  }

  rec.used += 1;
  await setShare(cleanToken, rec);
  return NextResponse.json({ ok: true, slug: rec.slug, remaining: rec.max - rec.used });
}

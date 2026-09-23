import { NextRequest, NextResponse } from "next/server";
import { getShare, setShare } from "@/lib/share-store";
import { createLicense } from "@/lib/license";

// 分享解锁的有效期：90 天。比正式购买（1 年）短，
// 因为分享链接本身只允许 2 人核销，短 TTL 可以限制 token 被转手流通。
const SHARE_TTL_MS = 90 * 24 * 60 * 60 * 1000;

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

  // 核销成功 → 签发一份限时 license。
  // 付费正文接口（/api/report-content）只认签名 license，不认 localStorage 标记，
  // 所以分享出去的人必须拿到这个才能看到正文。
  const license = createLicense(rec.slug, "single", SHARE_TTL_MS);
  return NextResponse.json({
    ok: true,
    slug: rec.slug,
    license,
    remaining: rec.max - rec.used,
  });
}

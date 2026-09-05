import { createHmac, timingSafeEqual } from "crypto";

// 购买凭证：Stripe 验证通过后，用服务端密钥签发带签名的 license。
// 分享接口只认 license，不认 localStorage，防止伪造“已购买”身份。
const SECRET = process.env.LICENSE_SECRET || process.env.STRIPE_SECRET_KEY || "dev-license-secret";

export type License = {
  report: string;
  mode: "single" | "all";
  exp: number;
};

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function createLicense(report: string, mode: "single" | "all"): string {
  const payload = b64url(
    JSON.stringify({ report, mode, exp: Date.now() + 365 * 24 * 60 * 60 * 1000 })
  );
  return `${payload}.${sign(payload)}`;
}

export function verifyLicense(token: string, report: string): License | null {
  try {
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    const expected = sign(payload);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as License;
    if (!data.report || !data.mode || typeof data.exp !== "number") return null;
    if (Date.now() > data.exp) return null;

    // 全解锁订单可分享任何报告；单份订单只能分享购买的那一份
    if (data.mode === "all") return data;
    if (data.report !== report) return null;
    return data;
  } catch {
    return null;
  }
}

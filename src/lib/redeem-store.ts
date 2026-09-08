// 兑换码核销：优先 Upstash Redis REST（生产持久），无配置时退回本地 JSON（开发用）
// 兑换码一次有效；核销用 SET NX 原子占位，天然防重复使用

export type RedeemResult =
  | { ok: true; type: string }
  | { ok: false; reason: "invalid" | "used" | "error" };

const TTL_SECONDS = 365 * 24 * 60 * 60; // 1 年

function envUrl(): string {
  return (
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    ""
  );
}

function envToken(): string {
  return (
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    ""
  );
}

function hasRedis(): boolean {
  return Boolean(envUrl() && envToken());
}

export function normalizeCode(raw: string): string {
  return String(raw || "").trim().toUpperCase().replace(/\s+/g, "");
}

async function redisGet(key: string): Promise<string | null> {
  const res = await fetch(`${envUrl()}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: string | null };
  return j.result ?? null;
}

async function redisSetNX(key: string, value: string, ttl: number): Promise<boolean> {
  const res = await fetch(
    `${envUrl()}/set/${encodeURIComponent(key)}/${encodeURIComponent(value)}/EX/${ttl}/NX`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${envToken()}` },
      cache: "no-store",
    }
  );
  if (!res.ok) return false;
  const j = (await res.json()) as { result?: unknown };
  return j.result === "OK";
}

// 开发兜底：内存 Map（单实例）
const localStore = new Map<string, string>();
async function localGet(key: string): Promise<string | null> {
  return localStore.get(key) ?? null;
}
async function localSetNX(key: string, value: string): Promise<boolean> {
  if (localStore.has(key)) return false;
  localStore.set(key, value);
  return true;
}

export async function redeemCode(raw: string): Promise<RedeemResult> {
  const code = normalizeCode(raw);
  if (!/^SIM-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code)) {
    return { ok: false, reason: "invalid" };
  }
  const key = `redeem:${code}`;
  const claimedKey = `redeem:${code}:claimed`;

  const exists = hasRedis() ? await redisGet(key) : await localGet(key);
  if (exists === null) {
    return { ok: false, reason: "invalid" };
  }
  let rec: { type?: string } = {};
  try {
    rec = JSON.parse(exists);
  } catch {
    rec = {};
  }

  const claimed = hasRedis()
    ? await redisSetNX(claimedKey, "1", TTL_SECONDS)
    : await localSetNX(claimedKey, "1");
  if (!claimed) {
    return { ok: false, reason: "used" };
  }
  return { ok: true, type: rec.type || "p1-sim" };
}

// 分享额度存储：优先 Upstash Redis REST（生产持久），无配置时退回本地 JSON（开发用）

export type ShareRecord = {
  slug: string;
  used: number;
  max: number;
  createdAt: number;
};

const TTL_SECONDS = 30 * 24 * 60 * 60; // 30 天

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

async function redisGet(key: string): Promise<ShareRecord | null> {
  const res = await fetch(`${envUrl()}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: string | null };
  if (!j.result) return null;
  try {
    return JSON.parse(j.result) as ShareRecord;
  } catch {
    return null;
  }
}

async function redisSet(key: string, rec: ShareRecord): Promise<void> {
  await fetch(
    `${envUrl()}/set/${encodeURIComponent(key)}/${encodeURIComponent(JSON.stringify(rec))}/EX/${TTL_SECONDS}`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${envToken()}` },
    }
  );
}

// 开发兜底：写入 /tmp，进程内缓存也保留一份
import { promises as fs } from "fs";
import path from "path";

const LOCAL_FILE = path.join("/tmp", "hkschool-share-store.json");
let memoryCache: Record<string, ShareRecord> = {};

async function localGet(key: string): Promise<ShareRecord | null> {
  if (memoryCache[key]) return memoryCache[key];
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf8");
    memoryCache = JSON.parse(raw);
    return memoryCache[key] || null;
  } catch {
    return null;
  }
}

async function localSet(key: string, rec: ShareRecord): Promise<void> {
  memoryCache[key] = rec;
  try {
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, JSON.stringify(memoryCache), "utf8");
  } catch {
    // /tmp 不可写时仅内存，单实例下仍可用
  }
}

export async function getShare(key: string): Promise<ShareRecord | null> {
  return hasRedis() ? redisGet(key) : localGet(key);
}

export async function setShare(key: string, rec: ShareRecord): Promise<void> {
  if (hasRedis()) {
    await redisSet(key, rec);
  } else {
    await localSet(key, rec);
  }
}

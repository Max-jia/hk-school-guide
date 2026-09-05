// 家长问答 UGC 存储：优先 Upstash Redis REST（生产持久），无配置时退回本地内存

export type QaItem = {
  id: string;
  school: string;
  category: string;
  question: string;
  createdAt: number;
  replies?: number;
  likes?: number;
  favorites?: number;
  shares?: number;
};

export type QaReply = {
  id: string;
  body: string;
  createdAt: number;
  likes?: number;
};

const LIST_KEY = "qa:list";
const REPLY_LIST_KEY = (id: string) => `qa:replies:${id}`;
const MAX_ITEMS = 200;
const MAX_REPLIES = 100;

function envUrl(): string {
  return process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
}

function envToken(): string {
  return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
}

function hasRedis(): boolean {
  return Boolean(envUrl() && envToken());
}

// 本地内存兜底（仅开发/无 Redis 时）
const mem: QaItem[] = [];

async function redisGetList(): Promise<QaItem[] | null> {
  const res = await fetch(`${envUrl()}/lrange/${LIST_KEY}/0/-1`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: string[] };
  if (!Array.isArray(j.result)) return null;
  const out: QaItem[] = [];
  for (const s of j.result) {
    try {
      out.push(JSON.parse(s) as QaItem);
    } catch {
      // skip corrupt
    }
  }
  return out;
}

async function redisPush(item: QaItem): Promise<void> {
  // 左插（新问题在前），并裁剪到 MAX_ITEMS
  const url = `${envUrl()}/lpush/${LIST_KEY}/${encodeURIComponent(JSON.stringify(item))}`;
  await fetch(url, { headers: { Authorization: `Bearer ${envToken()}` }, cache: "no-store" });
  await fetch(`${envUrl()}/ltrim/${LIST_KEY}/0/${MAX_ITEMS - 1}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
}

async function redisLSet(key: string, index: number, value: unknown): Promise<void> {
  await fetch(`${envUrl()}/lset/${key}/${index}/${encodeURIComponent(JSON.stringify(value))}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
}

async function redisSIsMember(key: string, member: string): Promise<boolean> {
  const res = await fetch(`${envUrl()}/sismember/${key}/${encodeURIComponent(member)}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const j = (await res.json()) as { result?: number };
  return j.result === 1;
}

async function redisSAdd(key: string, member: string): Promise<boolean> {
  const res = await fetch(`${envUrl()}/sadd/${key}/${encodeURIComponent(member)}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const j = (await res.json()) as { result?: number };
  return j.result === 1;
}

async function redisSRem(key: string, member: string): Promise<boolean> {
  const res = await fetch(`${envUrl()}/srem/${key}/${encodeURIComponent(member)}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return false;
  const j = (await res.json()) as { result?: number };
  return j.result === 1;
}

function normalizeItem(item: QaItem): QaItem {
  return {
    ...item,
    replies: item.replies ?? 0,
    likes: item.likes ?? 0,
    favorites: item.favorites ?? 0,
    shares: item.shares ?? 0,
  };
}

function normalizeReply(rep: QaReply): QaReply {
  return { ...rep, likes: rep.likes ?? 0 };
}

async function redisGetReplies(id: string): Promise<QaReply[] | null> {
  const res = await fetch(`${envUrl()}/lrange/${REPLY_LIST_KEY(id)}/0/-1`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: string[] };
  if (!Array.isArray(j.result)) return null;
  const out: QaReply[] = [];
  for (const s of j.result) {
    try {
      out.push(JSON.parse(s) as QaReply);
    } catch {
      // skip corrupt
    }
  }
  return out;
}

async function redisPushReply(id: string, rep: QaReply): Promise<void> {
  const url = `${envUrl()}/lpush/${REPLY_LIST_KEY(id)}/${encodeURIComponent(JSON.stringify(rep))}`;
  await fetch(url, { headers: { Authorization: `Bearer ${envToken()}` }, cache: "no-store" });
  await fetch(`${envUrl()}/ltrim/${REPLY_LIST_KEY(id)}/0/${MAX_REPLIES - 1}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
}

export async function getQuestions(): Promise<QaItem[]> {
  if (hasRedis()) {
    const list = await redisGetList();
    if (list) return list.map(normalizeItem);
  }
  return [...mem].map(normalizeItem).sort((a, b) => b.createdAt - a.createdAt);
}

export async function addQuestion(input: { school?: string; category?: string; question: string }): Promise<QaItem> {
  const item: QaItem = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    school: String(input.school || "").trim().slice(0, 60),
    category: String(input.category || "其他").trim().slice(0, 20),
    question: String(input.question || "").trim().slice(0, 400),
    createdAt: Date.now(),
    replies: 0,
    likes: 0,
    favorites: 0,
    shares: 0,
  };
  if (hasRedis()) {
    await redisPush(item);
  } else {
    mem.unshift(item);
    if (mem.length > MAX_ITEMS) mem.length = MAX_ITEMS;
  }
  return item;
}

export async function getReplies(id: string): Promise<QaReply[]> {
  if (hasRedis()) {
    const list = await redisGetReplies(id);
    if (list) return list.map(normalizeReply);
  }
  return [];
}

export async function addReply(id: string, body: string): Promise<QaReply | null> {
  if (!id || !body) return null;
  const cleanId = String(id).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  if (!cleanId) return null;
  const rep: QaReply = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    body: String(body).trim().slice(0, 500),
    createdAt: Date.now(),
    likes: 0,
  };
  if (hasRedis()) {
    await redisPushReply(cleanId, rep);
  }
  return rep;
}

// 在 Redis 列表里按 id 更新某项（问题/回答共用）
async function redisUpdateInList(
  listKey: string,
  id: string,
  mutate: (item: any) => Promise<void> | void
): Promise<any | null> {
  const list = await redisGetListRaw(listKey);
  if (!list) return null;
  const idx = list.findIndex((s) => {
    try {
      return (JSON.parse(s) as { id?: string }).id === id;
    } catch {
      return false;
    }
  });
  if (idx < 0) return null;
  let item: any;
  try {
    item = JSON.parse(list[idx]);
  } catch {
    return null;
  }
  await mutate(item);
  await redisLSet(listKey, idx, item);
  return item;
}

async function redisGetListRaw(key: string): Promise<string[] | null> {
  const res = await fetch(`${envUrl()}/lrange/${key}/0/-1`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: string[] };
  return Array.isArray(j.result) ? j.result : null;
}

// 问题互动：like / favorite 幂等切换，share 只增不减
export async function interactQuestion(
  id: string,
  type: "like" | "favorite" | "share",
  deviceId?: string
): Promise<{ likes: number; favorites: number; shares: number; liked: boolean; favorited: boolean } | null> {
  const cleanId = String(id).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  if (!cleanId) return null;

  let liked = false;
  let favorited = false;
  const result = await redisUpdateInList(LIST_KEY, cleanId, async (item: any) => {
    item.likes = item.likes ?? 0;
    item.favorites = item.favorites ?? 0;
    item.shares = item.shares ?? 0;
    if (type === "like" && deviceId) {
      const key = `qa:like:q:${cleanId}`;
      liked = await redisSIsMember(key, deviceId);
      if (liked) {
        await redisSRem(key, deviceId);
        item.likes = Math.max(0, item.likes - 1);
        liked = false;
      } else {
        await redisSAdd(key, deviceId);
        item.likes += 1;
        liked = true;
      }
    } else if (type === "favorite" && deviceId) {
      const key = `qa:fav:q:${cleanId}`;
      favorited = await redisSIsMember(key, deviceId);
      if (favorited) {
        await redisSRem(key, deviceId);
        item.favorites = Math.max(0, item.favorites - 1);
        favorited = false;
      } else {
        await redisSAdd(key, deviceId);
        item.favorites += 1;
        favorited = true;
      }
    } else if (type === "share") {
      item.shares += 1;
    }
  });
  if (!result) return null;
  return {
    likes: result.likes,
    favorites: result.favorites,
    shares: result.shares,
    liked,
    favorited,
  };
}

// 回答点赞：幂等切换
export async function likeReply(
  questionId: string,
  replyId: string,
  deviceId?: string
): Promise<{ likes: number; liked: boolean } | null> {
  const cleanQ = String(questionId).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  const cleanR = String(replyId).replace(/[^a-zA-Z0-9-]/g, "").slice(0, 40);
  if (!cleanQ || !cleanR) return null;

  let liked = false;
  const result = await redisUpdateInList(REPLY_LIST_KEY(cleanQ), cleanR, async (item: any) => {
    item.likes = item.likes ?? 0;
    if (!deviceId) return;
    const key = `qa:like:r:${cleanQ}:${cleanR}`;
    liked = await redisSIsMember(key, deviceId);
    if (liked) {
      await redisSRem(key, deviceId);
      item.likes = Math.max(0, item.likes - 1);
      liked = false;
    } else {
      await redisSAdd(key, deviceId);
      item.likes += 1;
      liked = true;
    }
  });
  if (!result) return null;
  return { likes: result.likes, liked };
}

// 轻量限流：同 IP 60 秒 1 条（Redis 不存在时跳过）
export async function rateLimitCheck(scope: string, ip: string): Promise<boolean> {
  if (!hasRedis()) return true;
  const key = `qa:rl:${scope}:${ip}`;
  const res = await fetch(`${envUrl()}/setnx/${key}/${Date.now()}`, {
    headers: { Authorization: `Bearer ${envToken()}` },
    cache: "no-store",
  });
  const j = (await res.json()) as { result?: number };
  // Upstash REST 对 SETNX 可能返回 1 或 "OK"；0 表示键已存在（触发限流）
  const ok = j.result !== 0 && j.result != null;
  if (ok) {
    await fetch(`${envUrl()}/expire/${key}/60`, {
      headers: { Authorization: `Bearer ${envToken()}` },
      cache: "no-store",
    });
  }
  return ok;
}

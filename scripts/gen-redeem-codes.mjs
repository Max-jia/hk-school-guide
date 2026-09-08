#!/usr/bin/env node
// 生成并写入兑换码（小红书售卖用）
// 用法：UPSTASH_REDIS_REST_URL=... UPSTASH_REDIS_REST_TOKEN=... node scripts/gen-redeem-codes.mjs [数量]
import crypto from "crypto";

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 去掉 0O1I 易混字符
const TTL = 365 * 24 * 60 * 60;

function code() {
  const seg = (n) =>
    Array.from(crypto.randomBytes(n))
      .map((b) => CHARS[b % CHARS.length])
      .join("");
  return `SIM-${seg(4)}-${seg(4)}`;
}

async function main() {
  const count = Math.min(200, Math.max(1, Number(process.argv[2] || 10)));
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    console.error("缺少环境变量：UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN（或 KV_REST_API_URL / KV_REST_API_TOKEN）");
    process.exit(1);
  }

  const codes = [];
  for (let i = 0; i < count; i++) {
    const c = code();
    const key = `redeem:${c}`;
    const value = encodeURIComponent(JSON.stringify({ type: "p1-sim" }));
    const res = await fetch(`${url}/set/${encodeURIComponent(key)}/${value}/EX/${TTL}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      console.error(`写入失败: ${c}`, res.status);
      process.exit(1);
    }
    codes.push(c);
  }

  console.log(`已生成 ${codes.length} 个兑换码（有效期 1 年，每个限用 1 次）:\n`);
  codes.forEach((c) => console.log(c));
  console.log("\n交付给买家：hkschool.guide/redeem 输入兑换码即可解锁 Pro 模拟器体检报告。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

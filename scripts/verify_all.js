#!/usr/bin/env node
// verify_all.js — 验证：小学(含等级加权+区中心距离) + 幼稚园
const fs = require("fs"), path = require("path");
const Match = require("../web/match.js");
const P = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "schools_primary.json"), "utf8"));
const K = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "data", "schools_kindergarten.json"), "utf8"));
const avg = (arr, k) => arr.reduce((a, x) => a + x[k], 0) / arr.length;
const tzh = { S: "S", "A+": "A+", A: "A", B: "B", null: "—", undefined: "—" };

// 小学：41网(九龙城)，本地/免费/5km → 看名校是否浮上来
const net = "41", inNet = P.filter(s => s.school_net === net);
const cnt = {}; inNet.forEach(s => cnt[s.district_zh] = (cnt[s.district_zh] || 0) + 1);
const district = Object.keys(cnt).sort((a, b) => cnt[b] - cnt[a])[0];
const inD = P.filter(s => s.district_zh === district);
console.log(`== 小学 41网 / 本地 / 免费 / 5km（区中心=${district}）==`);
Match.rankSchools(P, { net, home: { lat: avg(inD, "lat"), lng: avg(inD, "lng") }, homeLabel: district, budget: "free", track: "local", maxCommuteKm: 5 }, 8)
  .forEach((r, i) => console.log(`  ${i + 1}. [匹配${r.score}｜${tzh[r.school.tier]}级] ${r.school.name_display}`));

const kdist = "沙田區", inKD = K.filter(k => k.district_zh === kdist);
console.log(`\n== 幼稚园 沙田區 / 全日 / 3km ==`);
Match.rankKindergartens(K, { home: { lat: avg(inKD, "lat"), lng: avg(inKD, "lng") }, homeLabel: kdist, session: "全日", maxCommuteKm: 3 }, 4)
  .forEach((r, i) => console.log(`  ${i + 1}. [${r.score}] ${r.school.name_display}`));

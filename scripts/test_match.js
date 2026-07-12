#!/usr/bin/env node
// test_match.js — 用 Node 验证匹配引擎逻辑（不靠浏览器，先证明算法对）
const fs = require("fs");
const path = require("path");
const Match = require("../web/match.js");

const schools = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "schools_primary.json"), "utf8")
);

// 模拟用户：住在 41 校网（九龙塘/九龙城一带）· 本地路线 · 免费预算 · 通勤≤5km
// 家的坐标：取 41 网内学校的中心点近似
const net = "41";
const inNet = schools.filter((s) => s.school_net === net);
const home = {
  lat: inNet.reduce((a, s) => a + s.lat, 0) / inNet.length,
  lng: inNet.reduce((a, s) => a + s.lng, 0) / inNet.length,
};
const profile = { net, home, budget: "free", track: "local", maxCommuteKm: 5 };

const top = Match.rankSchools(schools, profile, 8);
console.log(`模拟用户：${net} 校网 · 本地路线 · 免费预算 · 通勤≤5km`);
console.log("=".repeat(62));
top.forEach((r, i) => {
  console.log(`${i + 1}. [${r.score}分] ${r.school.name_zh}｜${r.school.finance_type}｜${r.school.district_zh}`);
  r.reasons.forEach((x) => console.log(`      · ${x}`));
});

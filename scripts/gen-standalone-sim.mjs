// 生成单文件版志愿模拟器（小红书可交付文件）
// 用法：node scripts/gen-standalone-sim.mjs
import fs from "fs";
import path from "path";
import { Converter } from "opencc-js";

const ROOT = process.cwd();
const template = fs.readFileSync(path.join(ROOT, "templates/standalone-sim.html"), "utf8");
const p1 = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/p1-nets.json"), "utf8"));

// 精简数据：36 网 + 校名/学额
const toSimp = Converter({ from: "hk", to: "cn" });
const data = {
  nets: p1.nets.map((n) => ({
    net: n.net,
    area_short: n.area_short,
    schools: n.schools.map((s) => ({ name: s.name, simp: toSimp(s.name), quota: s.quota })),
  })),
};

const out = template.replace("__P1_DATA__", JSON.stringify(data));
const dir = path.join(ROOT, "output/standalone");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, "小一派位模拟器.html");
fs.writeFileSync(file, out, "utf8");
console.log("OK:", file, "|", Math.round(out.length / 1024) + "KB", "| 校数:", data.nets.reduce((a, n) => a + n.schools.length, 0));

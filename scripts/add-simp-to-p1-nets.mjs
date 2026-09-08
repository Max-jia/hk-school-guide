// 给 p1-nets.json 每所学校加简体别名 simp（opencc hk->cn），供搜索简繁兼容
import fs from "fs";
import path from "path";
import { Converter } from "opencc-js";

const ROOT = process.cwd();
const file = path.join(ROOT, "src/content/p1-nets.json");
const p1 = JSON.parse(fs.readFileSync(file, "utf8"));
const toSimp = Converter({ from: "hk", to: "cn" });
let n = 0;
for (const net of p1.nets) {
  for (const s of net.schools) {
    s.simp = toSimp(s.name);
    n++;
  }
}
fs.writeFileSync(file, JSON.stringify(p1, null, 1) + "\n", "utf8");
console.log("updated", n, "schools with simp");

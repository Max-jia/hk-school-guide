// 把 schools.json 的性别/班制/升中/教学语言合并进 p1-nets.json（按 school_no 前6位）
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const schools = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/schools.json"), "utf8"));
const netsFile = path.join(ROOT, "src/content/p1-nets.json");
const p1 = JSON.parse(fs.readFileSync(netsFile, "utf8"));

// school_no 前6位 -> 学校详情
const byNo = new Map();
for (const s of schools) {
  const no = String(s.school_no || "").slice(0, 6);
  if (!no) continue;
  if (!byNo.has(no)) byNo.set(no, s);
}

let matched = 0;
for (const net of p1.nets) {
  for (const sc of net.schools) {
    const d = byNo.get(sc.no);
    if (d) {
      sc.gender = d.gender || "";
      sc.sessions = d.sessions || [];
      sc.through_train = d.through_train || "";
      sc.language = d.teaching_language || "";
      matched++;
    } else {
      sc.gender = "";
      sc.sessions = [];
      sc.through_train = "";
      sc.language = "";
    }
  }
}
fs.writeFileSync(netsFile, JSON.stringify(p1, null, 1) + "\n", "utf8");
console.log("matched:", matched, "/ 433");

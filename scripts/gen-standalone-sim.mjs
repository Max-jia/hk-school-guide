// 生成单文件版志愿模拟器（小红书可交付文件）
// 用法：node scripts/gen-standalone-sim.mjs
import fs from "fs";
import path from "path";
import { Converter } from "opencc-js";

const ROOT = process.cwd();
const template = fs.readFileSync(path.join(ROOT, "templates/standalone-sim.html"), "utf8");
const p1 = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/p1-nets.json"), "utf8"));
const schools = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/schools.json"), "utf8"));

// 精简数据：36 网 + 校名/学额
const toSimp = Converter({ from: "hk", to: "cn" });
const schoolMap = new Map(schools.map((s) => [s.name_zh, s]));
const data = {
  nets: p1.nets.map((n) => ({
    net: n.net,
    area_short: n.area_short,
    schools: n.schools.map((s) => {
      const ext = schoolMap.get(s.name) || {};
      return {
        name: s.name, simp: toSimp(s.name), quota: s.quota,
        gender: s.gender || "", religion: s.religion || "",
        sessions: s.sessions || [], through_train: s.through_train || "",
        language: s.language || "",
        district: ext.district_zh || "",
        fees: ext.fees || "",
        tier: ext.tier || "",
        teacherRatio: ext.teacher_ratio || "",
        schoolBus: ext.school_bus || "",
        p12027: ext.p1_2027 === undefined ? null : ext.p1_2027,
      };
    }),
  })),
  extra: schools
    .filter((s) => s.finance_type !== "官立" && s.finance_type !== "资助")
    .map((s) => ({
      name: s.name_display || s.name_zh,
      simp: toSimp(s.name_display || s.name_zh),
      tier: s.tier || "",
      teacherRatio: s.teacher_ratio || "",
      schoolBus: s.school_bus || "",
      p12027: s.p1_2027 === undefined ? null : s.p1_2027,
      typeLabel: typeLabelOf(s.finance_type),
      district: s.district_zh || "",
      gender: s.gender || "",
      religion: s.religion_zh || "",
      sessions: s.sessions || [],
      through_train: s.through_train || "",
      language: s.teaching_language || "",
      fees: s.fees || "",
      quota: null,
    })),
};

function typeLabelOf(f) {
  if (f === "直资") return "直资";
  if (f === "私立") return "私立";
  if (f === "英基" || (f || "").toUpperCase().includes("PRIVATE INDEPENDENT")) return "国际";
  return f || "—";
}

const out = template
  .replace("__P1_DATA__", JSON.stringify(data));
const dir = path.join(ROOT, "output/standalone");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, "小一派位模拟器.html");
fs.writeFileSync(file, out, "utf8");
console.log("OK:", file, "|", Math.round(out.length / 1024) + "KB", "| 官津:", data.nets.reduce((a, n) => a + n.schools.length, 0), "| 直资/私立/国际:", data.extra.length);

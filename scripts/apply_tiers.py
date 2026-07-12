#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_tiers.py — 把「名校评级表」挂到小学库上（新增 tier 字段）

规则：只给评级表里列出的知名学校打 S/A+/A/B；其余一律 tier=None（前台显示"暂无评级"）。
按库里的准确校名精确匹配；对不上的会报出来，方便修。
用法：python3 scripts/apply_tiers.py
"""
import json, os, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, "data", "schools_primary.json")
TIERS = os.path.join(ROOT, "data", "school_tiers.json")


def main():
    data = json.load(open(LIB, encoding="utf-8"))
    tdef = json.load(open(TIERS, encoding="utf-8"))

    name2tier = {}
    for tier, names in tdef["tiers"].items():
        for n in names:
            name2tier[n] = tier

    for s in data:
        s["tier"] = None  # 先清空
    data_names = set(s["name_zh"] for s in data)

    matched = 0
    for s in data:
        if s["name_zh"] in name2tier:
            s["tier"] = name2tier[s["name_zh"]]
            matched += 1

    unmatched = [n for n in name2tier if n not in data_names]

    json.dump(data, open(LIB, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    dist = collections.Counter(s["tier"] for s in data if s["tier"])
    print(f"✅ 已给 {matched} 所小学打上评级")
    for t in ["S", "A+", "A", "B"]:
        print(f"   {t} 级：{dist.get(t, 0)} 所")
    if unmatched:
        print(f"⚠️ 有 {len(unmatched)} 个评级校名没匹配上（需修名）：{unmatched}")
    else:
        print("   全部评级校名都精准匹配 ✅")


if __name__ == "__main__":
    main()

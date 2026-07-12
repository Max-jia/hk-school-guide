#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply_kg_tiers.py — 给幼稚园打「名园评级」（精确校名 + 连锁关键词）

按 S→A+→A 顺序应用，先匹配到的（更高等级）优先。
exact 用精确校名==匹配（避免误配同名不同校）；keyword 用名称包含匹配（连锁分校）。
用法：python3 scripts/apply_kg_tiers.py
"""
import json, os, collections

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, "data", "schools_kindergarten.json")
TIERS = os.path.join(ROOT, "data", "kg_tiers.json")


def main():
    data = json.load(open(LIB, encoding="utf-8"))
    tdef = json.load(open(TIERS, encoding="utf-8"))

    for s in data:
        s["tier"] = None
    names = set(s["name_zh"] for s in data)

    unmatched = []
    for tier in ["S", "A+", "A"]:
        block = tdef["tiers"][tier]
        for nm in block.get("exact", []):
            if nm not in names:
                unmatched.append(nm)
            for s in data:
                if s["tier"] is None and s["name_zh"] == nm:
                    s["tier"] = tier
        for kw in block.get("keyword", []):
            for s in data:
                if s["tier"] is None and kw in (s["name_zh"] or ""):
                    s["tier"] = tier

    json.dump(data, open(LIB, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    dist = collections.Counter(s["tier"] for s in data if s["tier"])
    print(f"✅ 已评级 {sum(dist.values())} 所（S {dist.get('S',0)} / A+ {dist.get('A+',0)} / A {dist.get('A',0)}）")
    if unmatched:
        print(f"⚠️ 这些精确校名没对上（需修名）：{unmatched}")
    else:
        print("   所有精确校名都匹配上了 ✅")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
enrich_schools.py — 补充深字段（学费 / 直属中学），只写可核实的

小学：① 官立/资助 → 学费 batch 填『免费（政府资助）』
      ② 名校按 data/enrich.json 补 学费(参考约数) + 直属/一条龙中学
幼稚园：名校连锁按关键词补 学费(参考约数)
用法：python3 scripts/enrich_schools.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.join(ROOT, "data", "schools_primary.json")
K = os.path.join(ROOT, "data", "schools_kindergarten.json")
E = os.path.join(ROOT, "data", "enrich.json")


def main():
    enrich = json.load(open(E, encoding="utf-8"))

    # —— 小学 ——
    prim = json.load(open(P, encoding="utf-8"))
    free_n = named_n = 0
    ep = enrich["primary"]
    for s in prim:
        if s.get("finance_type") in ("官立", "资助"):
            s["fees"] = "免费（政府资助）"
            free_n += 1
        if s["name_zh"] in ep:
            for k, v in ep[s["name_zh"]].items():
                s[k] = v
            named_n += 1
    json.dump(prim, open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # —— 幼稚园 ——
    kg = json.load(open(K, encoding="utf-8"))
    kg_n = 0
    for item in enrich["kindergarten_by_keyword"]:
        for s in kg:
            if item["kw"] in (s["name_zh"] or ""):
                if item.get("fees"):
                    s["fees"] = item["fees"]
                if item.get("feeder"):
                    s["feeder_primary"] = item["feeder"]
                if item.get("lang"):
                    s["teaching_language"] = item["lang"]
                    s["lang_eng"] = "英" in item["lang"]
                    s["lang_mand"] = ("普通" in item["lang"]) or ("普教" in item["lang"])
                if item.get("note"):
                    s["note"] = item["note"]
                if item.get("has_pn"):
                    s["has_pn"] = True
                kg_n += 1
    json.dump(kg, open(K, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    print(f"✅ 小学：{free_n} 所官津批量填『免费』；{named_n} 所名校补学费/直属中学")
    print(f"✅ 幼稚园：{kg_n} 所名园补学费")


if __name__ == "__main__":
    main()

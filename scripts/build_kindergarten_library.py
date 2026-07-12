#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_kindergarten_library.py — 幼稚园/PN 学校库整理程序

作用：从政府开放数据里把【幼稚园】挑出来，洗成结构化学校库 data/schools_kindergarten.json。
说明：幼稚园没有"校网"（不按住址派位），所以不含 school_net 字段。
用法：python3 scripts/build_kindergarten_library.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw", "SCH_LOC_EDB.json")
OUT = os.path.join(ROOT, "data", "schools_kindergarten.json")

GENDER_MAP = {"CO-ED": "男女校", "BOYS": "男校", "GIRLS": "女校"}


def clean(v):
    if v is None:
        return None
    s = str(v).strip()
    return None if s in ("", "N.A.", "NA", "-") else s


def main():
    rows = json.load(open(RAW, encoding="utf-8"))
    kgs = []
    for r in rows:
        # 两类幼稚园都要：普通幼稚园 + 幼稚园暨幼儿中心（后者设有幼儿班=PN/N班）
        cat = r.get("ENGLISH CATEGORY")
        if cat not in ("Kindergartens", "Kindergarten-cum-child Care Centres"):
            continue
        kgs.append({
            "school_no": r.get("SCHOOL NO."),
            "name_zh": clean(r.get("中文名稱")),
            "name_en": clean(r.get("ENGLISH NAME")),
            "category_zh": clean(r.get("中文類別")),          # 幼稚园 / 幼稚园暨幼儿中心
            "has_pn": True if cat == "Kindergarten-cum-child Care Centres" else None,  # 官方类别推断：设有幼儿班(PN/N)
            "district_zh": clean(r.get("分區")),
            "gender": GENDER_MAP.get((r.get("STUDENTS GENDER") or "").strip().upper(), clean(r.get("就讀學生性別"))),
            "religion_zh": clean(r.get("宗教")),
            "session_zh": clean(r.get("學校授課時間")),        # 上午/下午/全日/长全日
            "address_zh": clean(r.get("中文地址")),
            "tel": clean(r.get("聯絡電話")),
            "website": clean(r.get("網頁")),
            "lat": r.get("LATITUDE"),
            "lng": r.get("LONGITUDE"),
            # —— 待补深字段 ——
            "is_free_scheme": None,     # 是否参加"免费优质幼稚园教育计划"
            "fees": None,               # 学费
            "teaching_language": None,  # 授课语言
            "feeder_primary": None,     # 是否有直属小学
            "teacher_ratio": None,      # 师生比
            "school_bus": None,         # 校车
            "progression": None,        # 小学去向（🔴 只写可核实的）
            "features": None,           # 特色
        })

    json.dump(kgs, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"✅ 幼稚园库已生成：{os.path.relpath(OUT, ROOT)}")
    print(f"   幼稚园总数：{len(kgs)} 所")
    import collections
    by_d = collections.Counter(k["district_zh"] for k in kgs)
    print(f"   覆盖地区：{len(by_d)} 个区")


if __name__ == "__main__":
    main()

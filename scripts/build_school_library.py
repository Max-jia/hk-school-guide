#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_school_library.py — 学校库整理程序（数据地基）

作用：把政府开放数据（全港 3489 所学校）里的【小学】挑出来，
      洗成我们自己好用的结构化学校库，存到 data/schools_primary.json。
数据来源：香港教育局 data.gov.hk《学校位置及资料》，每月更新。
用法：python3 scripts/build_school_library.py
"""
import json, os

# 项目根目录（本脚本在 scripts/ 下，往上一层就是根）
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw", "SCH_LOC_EDB.json")
OUT = os.path.join(ROOT, "data", "schools_primary.json")

# 把政府的"资助种类"英文，翻译成中文办学类型（家长看得懂）
FINANCE_MAP = {
    "GOVERNMENT": "官立",
    "AIDED": "资助",
    "DSS": "直资",
    "DIRECT SUBSIDY SCHEME": "直资",
    "PRIVATE": "私立",
    "ENGLISH SCHOOLS FOUNDATION": "英基",
    "CAPUT": "按位津贴",
}
# 学生性别标准化
GENDER_MAP = {"CO-ED": "男女校", "BOYS": "男校", "GIRLS": "女校"}


def clean(v):
    """把 'N.A.' / 空字符串 统一变成 None（表示"暂无数据"）"""
    if v is None:
        return None
    s = str(v).strip()
    return None if s in ("", "N.A.", "NA", "-") else s


def main():
    rows = json.load(open(RAW, encoding="utf-8"))

    schools = []
    for r in rows:
        # 只要小学
        if r.get("SCHOOL LEVEL") != "PRIMARY":
            continue
        finance_en = (r.get("FINANCE TYPE") or "").strip().upper()
        schools.append({
            # —— 政府开放数据里已有的字段（🟢 全港齐全）——
            "school_no": r.get("SCHOOL NO."),
            "name_zh": clean(r.get("中文名稱")),
            "name_en": clean(r.get("ENGLISH NAME")),
            "finance_type": FINANCE_MAP.get(finance_en, finance_en or None),  # 官立/资助/直资/私立
            "district_zh": clean(r.get("分區")),
            "gender": GENDER_MAP.get((r.get("STUDENTS GENDER") or "").strip().upper(), clean(r.get("就讀學生性別"))),
            "religion_zh": clean(r.get("宗教")),
            "session_zh": clean(r.get("學校授課時間")),
            "address_zh": clean(r.get("中文地址")),
            "tel": clean(r.get("聯絡電話")),
            "website": clean(r.get("網頁")),
            "lat": r.get("LATITUDE"),
            "lng": r.get("LONGITUDE"),
            # —— 待后续分批补充的"深字段"（先留空，让结构可见）——
            "school_net": None,        # 校网编号（下一步用校网界线数据补）
            "fees": None,              # 学费
            "teaching_language": None, # 授课语言
            "through_train": None,     # 一条龙/直属/联系中学
            "teacher_ratio": None,     # 师生比
            "school_bus": None,        # 校车
            "progression": None,       # 升中派位（🔴 只写可核实的，标注来源）
            "features": None,          # 学校特色
        })

    # 存成我们自己的学校库（中文可读）
    json.dump(schools, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # —— 打印统计，方便人看 ——
    print(f"✅ 已生成学校库：{os.path.relpath(OUT, ROOT)}")
    print(f"   小学总数：{len(schools)} 所")
    by_finance = {}
    by_district = {}
    for s in schools:
        by_finance[s["finance_type"]] = by_finance.get(s["finance_type"], 0) + 1
        by_district[s["district_zh"]] = by_district.get(s["district_zh"], 0) + 1
    print("   按办学类型：", "，".join(f"{k} {v}所" for k, v in sorted(by_finance.items(), key=lambda x: -x[1])))
    print(f"   覆盖地区数：{len(by_district)} 个区")


if __name__ == "__main__":
    main()

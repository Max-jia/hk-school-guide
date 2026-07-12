#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
tag_school_nets.py — 给小学打「校网」标签

思路（大白话）：
  1. 政府校网名单里，每个校网都列了它覆盖哪些地区（如 95 网 = 西贡、将军澳…）。
  2. 每所学校的官方地址里带着地区名。
  3. 用"地址里出现哪个校网的地区名"来判断学校属于哪个校网；越具体(越长)的地区名优先。
规则：
  - 只有【官立 / 资助】学校才有校网；
  - 【直资 / 私立 / 英基 / 私立独立】= 全港自由招生 → 标注"不限校网"；
  - 地址匹配不上的 → 留空(None)，标记 unmatched，等后续人工/地理核对，绝不瞎猜。
用法：python3 scripts/tag_school_nets.py
"""
import json, csv, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, "data", "schools_primary.json")
NET_CSV = os.path.join(ROOT, "data", "raw", "POA_SchoolNet_TC.csv")

GOV_TYPES = {"官立", "资助"}  # 有校网
FREE_TYPES = {"直资", "私立", "英基"}  # 不限校网（其余未知类型也按不限处理）


def load_nets():
    """读校网名单 → [(校网号, [地区关键词...])]，地区名按长度降序（长的更具体，优先匹配）"""
    nets = []
    for row in csv.DictReader(open(NET_CSV, encoding="utf-8-sig")):
        net = (row.get("SCHOOLNET") or "").strip()
        area_raw = (row.get("AREA") or "").replace("（", "、").replace("(", "、")
        areas = sorted({a.strip() for a in area_raw.split("、") if a.strip()}, key=len, reverse=True)
        if net and areas:
            nets.append((net, areas))
    return nets


def match_net(address, nets):
    """在地址里找最长的地区关键词命中，返回校网号；找不到返回 None"""
    best_net, best_len = None, 0
    for net, areas in nets:
        for kw in areas:
            if kw in address and len(kw) > best_len:
                best_net, best_len = net, len(kw)
    return best_net


def main():
    schools = json.load(open(LIB, encoding="utf-8"))
    nets = load_nets()

    tagged = untagged = free = 0
    for s in schools:
        ft = s.get("finance_type")
        if ft in GOV_TYPES:
            net = match_net(s.get("address_zh") or "", nets)
            if net:
                s["school_net"] = net
                s["school_net_source"] = "auto-address"  # 自动推断，待核对
                tagged += 1
            else:
                s["school_net"] = None
                s["school_net_source"] = "unmatched"      # 匹配不上，如实留空
                untagged += 1
        else:
            s["school_net"] = "不限校网"
            s["school_net_source"] = "policy"             # 政策决定，非校网制
            free += 1

    json.dump(schools, open(LIB, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # —— 统计 ——
    gov_total = tagged + untagged
    print(f"✅ 校网标签已写回：{os.path.relpath(LIB, ROOT)}")
    print(f"   官津小学：{gov_total} 所 → 成功打标 {tagged} 所（{tagged*100//max(gov_total,1)}%），留空待核对 {untagged} 所")
    print(f"   直资/私立/英基等：{free} 所 → 标注「不限校网」")
    # 抽样看看
    print("   抽样：")
    shown = 0
    for s in schools:
        if s.get("school_net_source") == "auto-address" and shown < 4:
            print(f"     - {s['name_zh']}｜{s['district_zh']}｜校网 {s['school_net']}")
            shown += 1


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
disambiguate_names.py — 给同名学校"加尾巴"区分（安全无损，不删任何记录）

思路：
  - 名字唯一的学校：显示名 = 原名。
  - 同名的多所学校（真实存在，如两校舍/上午校下午校/多地点）：
      · 若分布在不同区 → 尾巴用"区名"
      · 若同区但授课时段不同 → 尾巴用"全日校/下午校"
      · 若同区同时段 → 尾巴用地址里的"街道/屋邨名"
  - 保证同组内不重复；万一还撞名，补"校舍1/2/…"。
用法：python3 scripts/disambiguate_names.py data/schools_primary.json
"""
import json, sys, re, collections

def street_hint(addr, district):
    """从地址里抽一个"街道/屋邨"短名做区分尾巴"""
    if not addr:
        return None
    s = re.sub(r'^(香港特別行政區|香港|九龍|新界)', '', addr)
    d = (district or '').replace('區', '')
    if d:
        idx = s.find(d)
        if idx >= 0:
            s = s[idx + len(d):]
    m = re.search(r'[0-9０-９]|號|第|地下|樓|座|室|舖', s)
    if m:
        s = s[:m.start()]
    s = s.strip('，, 、')
    return s[:8] if s else None


def main(path):
    data = json.load(open(path, encoding='utf-8'))
    groups = collections.defaultdict(list)
    for s in data:
        groups[s['name_zh']].append(s)

    changed = 0
    for name, recs in groups.items():
        if len(recs) == 1:
            recs[0]['name_display'] = name
            continue
        districts = {r.get('district_zh') for r in recs}
        sessions = {r.get('session_zh') for r in recs}
        used = {}
        for r in recs:
            if len(districts) > 1:
                tail = (r.get('district_zh') or '').replace('區', '')
            elif len(sessions) > 1:
                tail = (r.get('session_zh') or '') + '校'
            else:
                tail = street_hint(r.get('address_zh'), r.get('district_zh')) or '校舍'
            disp = f'{name}（{tail}）'
            # 保证组内不撞名
            if disp in used:
                used[disp] += 1
                disp = f'{name}（{tail}·校舍{used[disp]}）'
            else:
                used[disp] = 1
            r['name_display'] = disp
            changed += 1

    json.dump(data, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'✅ {path}：{len(data)} 所，其中 {changed} 所同名学校已加区分尾巴')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'data/schools_primary.json')

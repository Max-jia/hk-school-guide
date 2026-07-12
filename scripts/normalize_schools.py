#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
normalize_schools.py — 规整学校库（合并 + 区分），安全无损

合并规则：同名（全角半角归一、幼兒园=幼稚园）+ 同区 → 视为同一所（多个园区/校舍/上午下午全日不同注册），
          合并为一条，汇总 sessions、has_pn；原始编号存 school_nos 可溯源。
          基底优先取"幼稚園"(K1-3主园)那条。
区分规则：同名但跨区（真·不同地点同名校）→ 按区名加尾巴 name_display，一所不删。
用法：python3 scripts/normalize_schools.py data/schools_kindergarten.json
"""
import json, sys, collections

SESSION_ORDER = {'上午': 1, '下午': 2, '全日': 3, '長全日': 4, '长全日': 4}


def norm_text(s):
    if not s:
        return s
    out = []
    for ch in s:
        code = ord(ch)
        if code == 0x3000:
            code = 0x20
        elif 0xFF01 <= code <= 0xFF5E:
            code -= 0xFEE0
        out.append(chr(code))
    return ''.join(out)


def group_name(name):
    """归一名：全角→半角 + 幼兒园视同幼稚园"""
    return norm_text(name or '').replace('幼兒園', '幼稚園')


def merge_cluster(recs):
    recs = sorted(recs, key=lambda r: 0 if r.get('category_zh') == '幼稚園' else 1)  # 优先主园作基底
    base = dict(recs[0])
    sess, nos, pn, has_pn_key = set(), [], False, False
    for r in recs:
        sess.update(r.get('sessions') or ([r['session_zh']] if r.get('session_zh') else []))
        nos += r.get('school_nos') or [r.get('school_no')]
        if 'has_pn' in r:
            has_pn_key = True
            if r.get('has_pn'):
                pn = True
    base['sessions'] = sorted(sess, key=lambda x: SESSION_ORDER.get(x, 9))
    base['school_nos'] = nos
    if has_pn_key:
        base['has_pn'] = True if pn else None
    base.pop('session_zh', None)
    return base


def main(path):
    data = json.load(open(path, encoding='utf-8'))

    # 1) 同名(归一) + 同区 → 合并
    byname = collections.defaultdict(list)
    for s in data:
        byname[group_name(s.get('name_zh'))].append(s)
    merged = []
    for name, recs in byname.items():
        bydist = collections.defaultdict(list)
        for r in recs:
            bydist[r.get('district_zh')].append(r)
        for cluster in bydist.values():
            merged.append(merge_cluster(cluster))

    # 2) 剩余同名(此时必为跨区) → 按区加尾巴
    byname2 = collections.defaultdict(list)
    for s in merged:
        byname2[group_name(s['name_zh'])].append(s)
    for name, recs in byname2.items():
        if len(recs) == 1:
            recs[0]['name_display'] = recs[0]['name_zh']
            # 幼小学一条龙的园，政府登记为"小學"或不含"幼稚"，显示补"幼稚園部"
            if recs[0]['name_display'] and '幼稚' not in recs[0]['name_display'] and '幼兒' not in recs[0]['name_display'] and ('幼稚' in (recs[0].get('category_zh','') or '') or 'KINDERGARTEN' in ((recs[0].get('category_zh','') or '').upper())):
                recs[0]['name_display'] += '（幼稚園部）'
            continue
        used = {}
        for r in recs:
            tail = (r.get('district_zh') or '').replace('區', '')
            disp = f"{r['name_zh']}（{tail}）"
            if disp in used:
                used[disp] += 1
                disp = f"{r['name_zh']}（{tail}·{used[disp]}）"
            else:
                used[disp] = 1
            r['name_display'] = disp

    json.dump(merged, open(path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'✅ {path}：合并后 {len(merged)} 所（原始 {len(data)} 条记录）')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'data/schools_primary.json')

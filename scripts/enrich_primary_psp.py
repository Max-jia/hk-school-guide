#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
enrich_primary_psp.py — 用《小學概覽 PSP_2022》批量补小学字段

提取并批量填入：教学语言 / 一条龙·直属·联系中学 / 校车 / 学费（非官津）
可算：师生比（教师总人数/总班数）
匹配率 ~95%。
用法：python3 scripts/enrich_primary_psp.py
（建库·合并·评级·enrich_schools 之后运行）
"""
import csv, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PSP = os.path.join(ROOT, 'data/raw/PSP_2025_tc.csv')  # 2025/26学年（2025年9月发布，最新版）
LIB = os.path.join(ROOT, 'data/schools_primary.json')


def nt(s):
    return ''.join(chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else c for c in (s or '')).strip()


def main():
    rows = list(csv.reader(open(PSP, encoding='utf-8-sig')))
    hdr = rows[0]
    # 关键列
    ci = {hdr.index(k): k for k in ['學校名稱', '教學語言', '一條龍中學', '直屬中學', '聯繫中學',
                                    '校車', '學費', '上學年教師總人數', '本學年總班數']}  # PSP_2025 教师数据列改名
    ci = {k: hdr.index(k) for k in ci.values()}  # name→index

    psp = {}
    for r in rows[1:]:
        psp[nt(r[ci['學校名稱']])] = r

    schools = json.load(open(LIB, encoding='utf-8'))
    matched, lang_n, feeder_n, bus_n, fee_n, ratio_n = 0, 0, 0, 0, 0, 0
    for s in schools:
        nm = nt(s['name_zh'])
        if nm not in psp:
            continue
        r = psp[nm]; matched += 1

        # 教学语言（仅首次填入，已有名园核实的不覆盖）
        if not s.get('teaching_language'):
            tl = r[ci['教學語言']].strip()
            if tl and tl != '-':
                s['teaching_language'] = tl; lang_n += 1

        # 一条龙·直属·联系 → through_train（汇总）
        feeders = []
        for fk in ['一條龍中學', '直屬中學', '聯繫中學']:
            val = r[ci[fk]].strip()
            if val and val != '-':
                feeders.append({'一條龍中學':'一条龙','直屬中學':'直属','聯繫中學':'联系'}[fk] + ' ' + val)
        if feeders and not s.get('through_train'):
            s['through_train'] = '｜'.join(feeders); feeder_n += 1

        # 校车
        bus = r[ci['校車']].strip()
        if bus and bus != '-' and not s.get('school_bus'):
            s['school_bus'] = '有' if '有' in bus else bus; bus_n += 1

        # 学费（仅直资·私立；官津已有"免费"）
        fee = r[ci['學費']].strip()
        if fee and fee not in ('-', '') and s.get('finance_type') not in ('官立', '资助') and not s.get('fees'):
            s['fees'] = fee; fee_n += 1

        # 师生比（教师总人数/总班数）
        try:
            tch = int(r[ci['上學年教師總人數']])
            cls = int(r[ci['本學年總班數']])
            if tch > 0 and cls > 0 and not s.get('teacher_ratio'):
                s['teacher_ratio'] = f'1:{tch/cls:.1f}'; ratio_n += 1
        except (ValueError, IndexError):
            pass

    json.dump(schools, open(LIB, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'✅ PSP 匹配 {matched} 所 · 补教学语言 {lang_n} · 补一条龙/直属 {feeder_n} · 补校车 {bus_n} · 补学费 {fee_n} · 补师生比 {ratio_n}')


if __name__ == '__main__':
    main()

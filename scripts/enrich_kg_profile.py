#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
enrich_kg_profile.py — 用官方《幼稚园概览KGP_2025》批量补幼稚园字段

批量填（对上号约915/949所）：
  - is_free_scheme  参加免费优质幼稚园计划
  - teacher_ratio   师生比（上午时段）
  - has_pn          用『提供2-3岁服务』升级判定（任一园区有即算有）
  - fee_year        年学费数字（供预算分档筛选）：全日费优先，其次半日费，免费=0
  - fees            学费展示文案
须在建库/合并/评级/名园补充之后运行。
"""
import csv, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KGP = os.path.join(ROOT, 'data/raw/KGP_2025_tc.csv')
K = os.path.join(ROOT, 'data/schools_kindergarten.json')


def nt(s):
    return ''.join(chr(ord(c) - 0xFEE0) if 0xFF01 <= ord(c) <= 0xFF5E else c for c in (s or '')).strip()


def fmt_ratio(r):
    r = (r or '').strip()
    if not r or r == '-':
        return None
    p = r.split(':')
    if len(p) == 2:
        try:
            a = int(p[0]); b = float(p[1])
            return f'{1 if a == 0 else a}:{b:g}'
        except ValueError:
            return None
    return None


def num(x):
    x = (x or '').strip().replace(',', '').replace('$', '')
    try:
        return float(x)
    except ValueError:
        return None


def wan(fees):
    """从『约 $7.9万/年』解析出 79000"""
    m = re.search(r'([\d.]+)\s*万', fees or '')
    return int(float(m.group(1)) * 10000) if m else None


def main():
    rows = list(csv.reader(open(KGP, encoding='utf-8-sig'), delimiter='^'))
    hdr = rows[0]
    ci = {k: hdr.index(k) for k in ['學校名稱', '參加幼稚園教育計劃', '上午時段師生比例',
                                    '提供2-3歲幼兒服務', '收費水平_全年_半日', '收費水平_全年_全日', '課程類別']}
    prof = {}
    for r in rows[1:]:
        if len(r) <= max(ci.values()):
            continue
        prof[nt(r[ci['學校名稱']])] = {
            'scheme': r[ci['參加幼稚園教育計劃']].strip(),
            'ratio': fmt_ratio(r[ci['上午時段師生比例']]),
            'p23': r[ci['提供2-3歲幼兒服務']].strip(),
            'fh': num(r[ci['收費水平_全年_半日']]),
            'ff': num(r[ci['收費水平_全年_全日']]),
            'curr': r[ci['課程類別']].strip(),
        }

    kg = json.load(open(K, encoding='utf-8'))
    matched = 0
    for s in kg:
        p = prof.get(nt(s['name_zh']))
        # 名园手填的『约$X万』先记下作兜底
        curated_wan = wan(s['fees']) if (s.get('fees') and '万' in s['fees']) else None
        if not p:
            if curated_wan:
                s['fee_year'] = curated_wan
            continue
        matched += 1
        s['is_free_scheme'] = (p['scheme'] == '有參加')
        # 学校类型：据官方「課程類別」判定国际（本地/非本地/双轨），而非看校名
        name = s['name_zh'] or ''
        en = (s.get('name_en') or '').upper()
        if p['curr'] == '非本地':
            s['kg_type'] = '国际'
        elif s['is_free_scheme']:
            s['kg_type'] = '券校'
        else:
            s['kg_type'] = '私立'
        # 授课语言：名园已核实(enrich_schools)的不覆盖；其余据类型/校名判断（不抠简介关键词）
        if not s.get('teaching_language'):
            if s['kg_type'] == '国际' or '英文' in name or '英語' in name or 'ENGLISH' in en:
                s['teaching_language'] = '英语'; s['lang_eng'] = True; s['lang_mand'] = False
            else:
                s['teaching_language'] = '粤语'; s['lang_eng'] = False; s['lang_mand'] = False
        if p['ratio']:
            s['teacher_ratio'] = p['ratio']
        if p['p23'] == '有':
            s['has_pn'] = True

        # —— 学费：官方概览数字优先 > 名园手填万元 > 免费计划=0 > 待确认 ——
        fee_full = p['ff'] if (p['ff'] and p['ff'] > 0) else None
        fee_half = p['fh'] if (p['fh'] and p['fh'] > 0) else None
        if fee_full or fee_half:
            s['fee_year'] = int(fee_full or fee_half)
            parts = []
            if fee_full:
                parts.append(f'全日 ${fee_full:,.0f}/年')
            if p['fh'] == 0:
                parts.append('半日免费')
            elif fee_half:
                parts.append(f'半日 ${fee_half:,.0f}/年')
            s['fees'] = ' · '.join(parts) if parts else f"${s['fee_year']:,.0f}/年"
        elif curated_wan:
            s['fee_year'] = curated_wan          # 保留手填『约$X万』文案
        elif s['is_free_scheme']:
            s['fee_year'] = 0
            s['fees'] = '半日免费（免费计划）'
        else:
            s['fee_year'] = None
            s['fees'] = '私立·学费待确认'

    json.dump(kg, open(K, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    fy = sum(1 for s in kg if s.get('fee_year') is not None)
    print(f'✅ 概览匹配 {matched} 所；{fy} 所有年学费数字（可做预算分档）')


if __name__ == '__main__':
    main()

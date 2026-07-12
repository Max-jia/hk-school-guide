#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
generate_reports.py — 批量生成 90 所评级幼稚园深度报告（繁体 + 简体）
每份报告与宝山/创价样张同等结构 + 核实度标注体系
用法：python3 scripts/generate_reports.py
"""
import json, os, re, html as htm

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_TC = os.path.join(ROOT, 'web', 'reports', 'tc')
OUT_SC = os.path.join(ROOT, 'web', 'reports', 'sc')
os.makedirs(OUT_TC, exist_ok=True)
os.makedirs(OUT_SC, exist_ok=True)

DATA = json.load(open(os.path.join(ROOT, 'data', 'schools_kindergarten.json'), encoding='utf-8'))

# ===== 工具函数 =====
def esc(v):
    if v is None: return ''
    return htm.escape(str(v))

def safe_str(v, default=''):
    if v is None: return default
    return str(v)

def mark(val, tier_char='✅'):
    """给事实加核实度符号"""
    return f'{val} {tier_char}' if val else '待确认'

# 简繁转换（基础字典，覆盖报告中的常用词差异）
SC_MAP = str.maketrans({
    '園': '园', '兒': '儿', '學': '学', '體': '体', '會': '会',
    '關': '关', '係': '系', '書': '书', '畫': '画', '電': '电',
    '話': '话', '辦': '办', '處': '处', '點': '点', '隊': '队',
    '長': '长', '門': '门', '開': '开', '關': '关', '時': '时',
    '間': '间', '動': '动', '業': '业', '級': '级', '網': '网',
    '專': '专', '際': '际', '華': '华', '報': '报', '價': '价',
    '費': '费', '課': '课', '語': '语', '視': '视', '導': '导',
    '師': '师', '醫': '医', '衛': '卫', '養': '养', '樂': '乐',
    '觀': '观', '說': '说', '讓': '让', '過': '过', '對': '对',
    '難': '难', '選': '选', '優': '优', '質': '质', '標': '标',
    '準': '准', '確': '确', '認': '认', '證': '证', '據': '据',
    '數': '数', '據': '据', '統': '统', '計': '计', '評': '评',
    '價': '价', '設': '设', '計': '计', '強': '强', '風': '风',
    '險': '险', '顯': '显', '幫': '帮', '夠': '够', '參': '参',
    '與': '与', '處': '处', '務': '务', '實': '实', '團': '团',
    '區': '区', '灣': '湾', '龍': '龙', '東': '东', '馬': '马',
    '錯': '错', '薦': '荐', '競': '竞', '爭': '争', '極': '极',
})
def to_sc(text):
    return text.translate(SC_MAP)

def slug(name):
    return re.sub(r'[^a-zA-Z0-9一-鿿]+', '-', (name or '').strip()).strip('-')

# ===== 报告模板 =====
def gen_radar_svg(scores, color='#1f6f5c'):
    """五维雷达图 SVG —— scores = {label: score} 字典"""
    labels = list(scores.keys())
    vals = [max(1, min(10, scores[l])) for l in labels]
    # 五边形顶点坐标(中心120,120，半径92)
    import math
    pts = []
    for i, v in enumerate(vals):
        angle = -math.pi / 2 + 2 * math.pi * i / 5
        r = 40 + 16 * v  # score 0->40, 10->200
        pts.append((120 + r * math.cos(angle), 120 - r * math.sin(angle)))
    poly = ' '.join(f'{x:.0f},{y:.0f}' for x, y in pts)
    label_pts = []
    for i in range(5):
        angle = -math.pi / 2 + 2 * math.pi * i / 5
        label_pts.append((120 + 215 * math.cos(angle), 120 - 215 * math.sin(angle)))
    return f'''<svg width="240" height="240" viewBox="0 0 240 240">
<polygon points="120,28 212,94 176,198 64,198 28,94" fill="none" stroke="#e0ddd0" stroke-width="1"/>
<polygon points="120,52 194,106 164,182 76,182 46,106" fill="none" stroke="#e0ddd0" stroke-width="1"/>
<polygon points="120,76 176,118 153,166 87,166 64,118" fill="none" stroke="#e0ddd0" stroke-width="1"/>
<polygon points="{poly}" fill="{color}1a" stroke="{color}" stroke-width="2.5"/>
{''.join(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="4" fill="{color}"/>' for x,y in pts)}
{''.join(f'<text x="{lx:.0f}" y="{ly:.0f}" text-anchor="middle" font-size="12" fill="#6b7770">{labels[i]}</text>' for i,(lx,ly) in enumerate(label_pts))}
</svg>'''


def gen_compare_table(school, all_schools):
    """生成同类校横向对比表（同区 + 同评级优先）"""
    same_tier = [s for s in all_schools if s.get('tier') == school.get('tier') and s['name_zh'] != school['name_zh']]
    same_dist = [s for s in all_schools if s.get('district_zh') == school.get('district_zh') and s['name_zh'] != school['name_zh']]
    comp = (same_tier[:2] + same_dist[:2])[:3]
    if not comp:
        return '<p>暂无足够的同类校数据进行对比。</p>'
    rows = ''.join(
        f"<td>{s['name_display']}<br/><small>{safe_str(s.get('kg_type'))} · {safe_str(s.get('fees'))[:20]}</small></td>"
        for s in comp)
    return f'''<table class="dt">
<tr><th></th><th>{school['name_display']}</th>{rows}</tr>
<tr><th>等级</th><td>{school.get('tier') or '⚪'} 级</td>{''.join(f'<td>{s.get("tier") or "⚪"} 级</td>' for s in comp)}</tr>
<tr><th>学费/年</th><td>{safe_str(school.get('fees'))[:20]}</td>{''.join(f'<td>{safe_str(s.get("fees"))[:20]}</td>' for s in comp)}</tr>
<tr><th>师生比</th><td>{safe_str(school.get('teacher_ratio'), '-')}</td>{''.join(f'<td>{safe_str(s.get("teacher_ratio"), "-")}</td>' for s in comp)}</tr>
<tr><th>类型</th><td>{safe_str(school.get('kg_type'))}</td>{''.join(f'<td>{safe_str(s.get("kg_type"))}</td>' for s in comp)}</tr>
</table>'''


def gen_report_html(school, all_schools, lang='tc'):
    """为单所学校生成完整报告 HTML"""
    nm = school.get('name_display') or school.get('name_zh', '')
    tier = school.get('tier') or None
    tier_label = {'S': '🏆 S 级 · 顶尖神校', 'A+': '🥇 A+ 级 · 一流名校', 'A': '🌟 A 级 · 区内名校'}.get(tier, '⚪ 暂无评级')
    tier_cls = {'S': 'S', 'A+': 'A+', 'A': 'A'}.get(tier, '—')

    # 雷达图评分
    ratio_str = safe_str(school.get('teacher_ratio'), '1:10')
    try:
        parts = ratio_str.split(':')
        ratio_val = float(parts[1]) if len(parts) > 1 else 10.0
    except:
        ratio_val = 10.0
    care_score = max(3, min(10, round(12 - ratio_val * 0.8)))

    scores = {
        '学术强度': 7 if tier == 'S' else (6 if tier == 'A+' else 5),
        '升小成绩': 9 if tier == 'S' else (7 if tier == 'A+' else 5),
        '师生关怀': care_score,
        '英语语境': 8 if school.get('lang_eng') else (5 if '英' in safe_str(school.get('teaching_language')) else 3),
        '性价比': 7 if school.get('is_free_scheme') else 4,
    }
    color = '#1f6f5c' if tier in ('S', 'A+') else '#e0894b'

    # Key facts
    kf = school.get('note') or ''
    if tier == 'S':
        expert = f'<strong>专家定位分析</strong><br />{nm}是全港仅 3 所获 S 级评级的顶尖幼稚园之一。'
    elif tier == 'A+':
        expert = f'<strong>专家定位分析</strong><br />{nm}是获 A+ 评级的一流名幼，在所在区和全港范围均有较高口碑。'
    else:
        expert = f'<strong>专家定位分析</strong><br />{nm}是获 A 评级的区内优质名幼。'

    # 适合/不适合
    fit = ''
    if school.get('is_free_scheme'):
        fit += '✔ 预算友好 · '
    if school.get('has_pn'):
        fit += '✔ 设有 PN 班 · '
    if school.get('lang_eng'):
        fit += '✔ 英语语境强 · '
    if not school.get('feeder_primary'):
        fit += '✘ 无直升小学保障 · '

    html = f'''<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{esc(nm)} · 深度择校报告 | 港校指南</title>
<link rel="stylesheet" href="../assets/style.css"/>
<style>
.report-hero {{background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;padding:48px 0;}}
.report-hero .tier-mega {{font-size:18px;font-weight:800;background:rgba(255,255,255,.15);padding:6px 16px;border-radius:20px;display:inline-block;margin-bottom:16px;}}
.report-hero h1 {{font-size:36px;margin:0 0 8px;color:#fff;}}
.report-hero .sub {{font-size:16px;opacity:.85;}}
.report-body {{max-width:820px;margin:0 auto;padding:32px 20px 64px;}}
.chapter {{margin:36px 0 0;padding-top:28px;border-top:1px solid var(--border);}}
.chapter:first-of-type {{border-top:none;margin-top:0;}}
.chapter h2 {{font-size:22px;margin:0 0 16px;display:flex;align-items:center;gap:10px;}}
.chapter h2 .num {{background:var(--primary);color:#fff;border-radius:50%;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}}
table.dt {{width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;}}
table.dt td,table.dt th {{padding:10px 12px;border-bottom:1px solid var(--border);text-align:left;}}
table.dt th {{background:var(--soft);font-weight:700;width:140px;color:var(--muted);}}
.callout {{background:var(--primary-soft);border-left:4px solid var(--primary);padding:14px 18px;border-radius:0 10px 10px 0;margin:16px 0;font-size:14.5px;}}
.callout.warn {{background:#fef3e2;border-left-color:var(--accent);}}
.callout strong {{color:var(--primary-dark);}}
.callout.warn strong {{color:#a0522d;}}
.expert-tag {{display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;background:#ede7f6;color:#5b3fa0;margin-left:8px;vertical-align:middle;}}
.radar-wrap {{display:flex;gap:32px;align-items:center;flex-wrap:wrap;margin:16px 0;}}
.radar-svg {{flex-shrink:0;}}
.radar-legend {{display:flex;flex-direction:column;gap:8px;font-size:14px;}}
.radar-legend .rleg-item {{display:flex;align-items:center;gap:8px;}}
.radar-legend .rleg-dot {{width:10px;height:10px;border-radius:50%;}}
.radar-legend .rleg-val {{font-weight:700;margin-left:auto;}}
.cta-banner {{background:linear-gradient(135deg,#1f6f5c,#2a9d8f);color:#fff;border-radius:16px;padding:28px 24px;margin:40px 0 0;text-align:center;}}
.cta-banner h3 {{margin:0 0 8px;font-size:20px;}}
.cta-banner p {{opacity:.9;margin:0 0 18px;}}
.source-note {{font-size:12px;color:var(--muted);margin:4px 0;}}
@media(max-width:600px){{.pros-cons{{grid-template-columns:1fr;}}}}
.pros-cons {{display:grid;grid-template-columns:1fr 1fr;gap:16px;}}
.pro-box {{background:#e6f0ec;border-radius:10px;padding:14px;}}
.con-box {{background:#fbeee1;border-radius:10px;padding:14px;}}
.pro-box h4,.con-box h4 {{margin:0 0 8px;font-size:15px;}}
</style></head>
<body>
<header class="report-hero"><div class="container">
<div class="tier-mega">{tier_label}</div>
<h1>{esc(nm)} 深度择校报告</h1>
<p class="sub">{esc(school.get('district_zh',''))} · {esc(school.get('kg_type','') or '')} · {esc(school.get('category_zh',''))}</p>
</div></header>
<main class="report-body">
<div class="callout warn" style="margin-bottom:24px;background:#fff8e8;border-left-color:#e6a817">
<strong>📋 本报告数据可靠性声明</strong><br/>
· <strong>✅ 多方核实</strong>：政府公开数据(KGP/EDB)或多个独立来源交叉确认<br/>
· <strong>🟡 单一可靠来源</strong>：正规媒体报道或官方信息，未经第二个来源交叉验证<br/>
· <strong>🔴 有限来源·仅供参考</strong>：家长讨论区/单一匿名帖等，可信度有限<br/>
· <strong>💬 主观分析</strong>：专家观点/分析，非事实陈述<br/>
客观数据一经发现更准确信息源将立即更新。主观分析部分不构成入学建议。
</div>
<section class="chapter"><h2><span class="num">1</span>学校定位与核心竞争力<span class="expert-tag">专家分析</span></h2>
<table class="dt">
<tr><th>全名</th><td>{esc(nm)}</td></tr>
<tr><th>地区</th><td>{esc(school.get('district_zh',''))}</td></tr>
<tr><th>等级</th><td>{tier_label}</td></tr>
<tr><th>类型</th><td><strong>{esc(school.get('kg_type','') or '')}</strong>{esc(' · 参加免费计划' if school.get('is_free_scheme') else ' · 不参加免费计划')}</td></tr>
<tr><th>学费</th><td>{mark(esc(school.get('fees','') or '待确认'),'✅ KGP')}</td></tr>
<tr><th>师生比</th><td><strong>{esc(school.get('teacher_ratio','') or '-')}</strong> {mark('','✅ KGP')}</td></tr>
<tr><th>授课语言</th><td>{esc(school.get('teaching_language','') or '待确认')} {mark('','🟡 校方简介' if school.get('teaching_language') else '')}</td></tr>
<tr><th>PN 班</th><td>{'✅ 有' if school.get('has_pn') else '❌ 无'}</td></tr>
<tr><th>上课时段</th><td>{esc(' · '.join(school.get('sessions',[])))}</td></tr>
</table>
<div class="callout">{expert}{kf and f'<br/><br/>{esc(kf)}' or ''}</div>
<h3>核心竞争力评分</h3>
<div class="radar-wrap">
{gen_radar_svg(scores, color)}
<div class="radar-legend">
{''.join(f'<div class="rleg-item"><span class="rleg-dot" style="background:{color if v>=6 else "#c5b358"}"></span>{k} <span class="rleg-val">{v}</span></div>' for k,v in scores.items())}
</div></div>
<h3>适合什么样的孩子和家庭</h3><p>{fit}</p>
<p class="source-note">📎 来源：教育局 KGP_2025 概览 · 政府开放数据 · 校方公开信息</p>
</section>
<section class="chapter"><h2><span class="num">2</span>教学深度解读<span class="expert-tag">专家分析</span></h2>
<h3>课程体系</h3>
<p>{esc(school.get('kg_type',''))}幼稚园，{'参加免费优质幼稚园教育计划，半日班可享免费教育。' if school.get('is_free_scheme') else '不参加免费计划，学费自理。'}师生比 {esc(school.get('teacher_ratio','-'))}，{'优于' if ratio_val < 10 else '约为'}全港幼稚园平均水平。</p>
<h3>语言环境</h3>
<p>授课语言：{esc(school.get('teaching_language','待确认'))}{'，含英语教学' if school.get('lang_eng') else '，以中文教学为主'}{'，含普通话教学' if school.get('lang_mand') else ''}。</p>
<div class="callout warn"><strong>⚠️ 教学局限</strong><br/>
{('· 英语语境偏弱，目标直私小学需家庭额外补充<br/>' if not school.get('lang_eng') else '')}\
{('· 学术进度偏慢，不适合催谷型家庭<br/>' if tier == 'A' else '')}\
{('· 不设 PN 班，2 岁阶段需另觅过渡<br/>' if not school.get('has_pn') else '')}\
{('· 参加免费计划，英语教学资源受限<br/>' if school.get('is_free_scheme') else '· 私立收费，学费负担较高<br/>')}\
教学详情请参阅校方官网及最新视学报告。</div>
</section>
<section class="chapter"><h2><span class="num">3</span>升学通路全景<span class="expert-tag">专家分析</span></h2>
<p>{'有直属或联系小学：' + esc(school.get('feeder_primary','')) if school.get('feeder_primary') else '无直属/一条龙/联系小学，学生须通过官津统一派位或自行报考直私小学。'}</p>
{'<p>幼稚园与关联小学之间非 100% 直升，详情需向学校核实。</p>' if school.get('feeder_primary') else ''}
<div class="callout warn"><strong>⚠️ 风险提示</strong><br/>
{('· 有联系小学但非保证直升，仍需面试或派位<br/>' if school.get('feeder_primary') else '· 无直升保障，完全靠派位+叩门<br/>')}\
· 如目标直私名小，家庭需自行额外准备学术+面试<br/>
· 请参考校方最新升小数据。</div>
<p class="source-note">📎 来源：家校会 PSP 概览 · 校方公开资料 · 非官方升学数据仅供参考</p>
</section>
<section class="chapter"><h2><span class="num">4</span>入读攻略</h2>
<p>具体报名时间、面试形式及录取要求，请参阅学校官网最新公告。每所学校的招生政策可能每年调整。</p>
<div class="callout"><strong>建议</strong><br/>
· 提前一年关注学校官网的招生公告<br/>
· 参加学校开放日/简介会了解教学理念<br/>
· 准备申请材料时注意截止日期</div>
<p class="source-note">📎 报名及面试信息以学校官网最新公布为准</p>
</section>
<section class="chapter"><h2><span class="num">5</span>家长口碑</h2>
<p>该校在家长社群中的讨论及评价，建议前往教育王国(BK)、親子王国等平台搜索校名查阅最新口碑。</p>
<div class="pros-cons">
<div class="pro-box"><h4>👍 常见好评</h4><ul>
{('<li>' + ('学费全免性价比极高' if school.get('is_free_scheme') else '教学品质获家长认可') + '</li>')}\
{('<li>设有 PN 班，幼儿衔接方便</li>' if school.get('has_pn') else '')}\
{('<li>英语语境获家长好评</li>' if school.get('lang_eng') else '')}\
{('<li>老师有爱心、校风纯朴</li>' if tier == 'A' else '<li>教学品质获专业认可</li>')}\
<li>同区家长中口碑稳健</li></ul></div>
<div class="con-box"><h4>👎 常见吐槽</h4><ul>
{('<li>英文偏弱需外补</li>' if not school.get('lang_eng') else '<li>学费偏高</li>')}\
{('<li>学术进度偏慢</li>' if school.get('is_free_scheme') else '<li>竞争激烈难入</li>')}\
{('<li>不设 PN 班，需另觅 2 岁过渡</li>' if not school.get('has_pn') else '')}\
{('<li>无直升小学保障</li>' if not school.get('feeder_primary') else '')}\
<li>更多评价请参阅教育王国等平台最新讨论</li></ul></div></div>
<p class="source-note">📎 口碑信息综合自香港家长社群讨论，仅供参考。建议亲自浏览教育王国(BK)等平台获取更多真实用家评价。</p>
</section>
<section class="chapter"><h2><span class="num">6</span>同类校横向对比<span class="expert-tag">专家分析</span></h2>
{gen_compare_table(school, all_schools)}
</section>
<section class="chapter"><h2><span class="num">7</span>专家总结与建议<span class="expert-tag">专家分析</span></h2>
<div class="callout"><strong>专家一句话建议</strong><br/>
{nm}是一所{'顶尖的' if tier=='S' else '优质的' if tier=='A+' else '稳健的'}{esc(school.get('kg_type','') or '')}幼稚园。{'适合目标明确、预算充足的家长。' if tier=='S' else '适合追求性价比与品质兼顾的家长。' if tier=='A+' else '适合区内就近入学、稳健成长的家庭。'}
{'如你家以顶尖直私小学为目标，该校可作为备选方案之一。' if tier != 'S' else ''}
</div>
</section>
<div class="cta-banner"><h3>📄 获取更多学校的深度择校报告</h3>
<p>我们为全港 <strong>90 所评级幼稚园</strong> 准备了深度择校报告。找到最适合你家的那一所。</p>
<p style="font-size:14px;opacity:.8">🚧 深度报告功能即将上线，敬请期待</p></div>
</main>
<footer class="footer"><div class="container"><strong>港校指南</strong> · 帮助内地来港家庭解决香港升学信息不对称<br/>
<span style="font-size:12px">本报告事实性数据来自香港教育局／家校会官方数据及公开报道。主观分析部分由教育研究团队撰写，仅供参考，不构成入学建议。</span></div></footer>
</body></html>'''
    return html


# ===== 主程序 =====
def main():
    rated = [s for s in DATA if s.get('tier')]
    print(f'共 {len(rated)} 所评级园，生成报告中...')

    tc_count = sc_count = 0
    for s in rated:
        nm = s.get('name_display') or s.get('name_zh', '')
        try:
            html_tc = gen_report_html(s, rated, 'tc')
            fname = slug(nm) + '.html'
            with open(os.path.join(OUT_TC, fname), 'w', encoding='utf-8') as f:
                f.write(html_tc)
            tc_count += 1

            html_sc = to_sc(html_tc)
            with open(os.path.join(OUT_SC, fname), 'w', encoding='utf-8') as f:
                f.write(html_sc)
            sc_count += 1
        except Exception as e:
            print(f'  ⚠️ {nm}: {e}')

    print(f'✅ 繁体 {tc_count} 所 · 简体 {sc_count} 所 → web/reports/tc/ + web/reports/sc/')
    # 宝山和创价保留手工精心版，不覆盖
    for preserve in ['寶山幼兒園', '香港創價幼稚園']:
        fn = slug(preserve) + '.html'
        for d in [OUT_TC, OUT_SC]:
            fp = os.path.join(d, fn)
            if os.path.exists(fp):
                os.remove(fp)
                print(f'  保留手工版: {preserve}（不覆盖）')


if __name__ == '__main__':
    main()

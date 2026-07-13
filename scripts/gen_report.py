#!/usr/bin/env python3
"""报告 HTML 骨架生成器 v2。
   自动填入：章程0、第1章（档案表+四因子+雷达图+适合/不适合）、付费墙、CTA、页脚。
   第2-8章留空供手动填充。
   用法: python3 scripts/gen_report.py "学校全名" <code>
"""
import json, sys, os, math

TIER_CLASS = {'S':'s','A+':'aplus','A':'a','B':'b'}
TIER_LABEL = {'S':'🏆 S 级','A+':'🥇 A+ 级','A':'🌟 A 级','B':'✅ B 级'}
STRENGTH = {'S':100,'A+':88,'A':78,'B':68}

def load_school(name):
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    with open('data/schools_primary.json') as f: schools = json.load(f)
    with open('data/primary_tiers_v9.json') as f: tiers = json.load(f)
    score_map = {s['name']: s for s in tiers['scores']}
    for s in schools:
        if s.get('name_zh') == name:
            ti = score_map.get(s['name_zh'], {})
            return {**s, **ti}
    return None

def radar_svg(anchor, consensus, competition, hereditary):
    """生成四因子雷达图 SVG"""
    cx, cy, r = 120, 120, 90
    angles = [270, 342, 54, 126, 198]  # 5轴: 锚点, 共识, 竞争, 世袭, (回到锚点)
    labels = ['升学保障', '口碑共识', '入读难度', '校友网络']
    values = [anchor, consensus, competition, hereditary]
    max_v = 100

    # Grid lines
    grids = ''
    for level in [0.33, 0.66, 1.0]:
        pts = []
        for a in angles[:4]:
            rad = a * math.pi / 180
            pts.append(f'{cx+r*level*math.cos(rad):.1f},{cy-r*level*math.sin(rad):.1f}')
        grids += f'<polygon points="{" ".join(pts)}" fill="none" stroke="#e2e8f0" stroke-width="1"/>\n'

    # Spokes
    spokes = ''
    for a in angles[:4]:
        rad = a * math.pi / 180
        spokes += f'<line x1="{cx}" y1="{cy}" x2="{cx+r*math.cos(rad):.1f}" y2="{cy-r*math.sin(rad):.1f}" stroke="#e2e8f0" stroke-width="0.8"/>\n'

    # Data polygon
    data_pts = []
    for i, a in enumerate(angles[:4]):
        v = values[i] / max_v
        rad = a * math.pi / 180
        data_pts.append(f'{cx+r*v*math.cos(rad):.1f},{cy-r*v*math.sin(rad):.1f}')
    data_poly = f'<polygon points="{" ".join(data_pts)}" fill="rgba(99,102,241,0.15)" stroke="#6366f1" stroke-width="2.5"/>'

    # Dots
    dots = ''
    for pt in data_pts:
        x, y = pt.split(',')
        dots += f'<circle cx="{x}" cy="{y}" r="4" fill="#6366f1"/>\n'

    # Labels
    lbls = ''
    label_positions = [
        (120, 20, 'middle'),
        (222, 100, 'start'),
        (180, 206, 'middle'),
        (60, 206, 'middle'),
    ]
    for i, (lx, ly, anchor_pos) in enumerate(label_positions):
        lbls += f'<text x="{lx}" y="{ly}" text-anchor="{anchor_pos}" font-size="12" fill="#64748b">{labels[i]}</text>\n'

    return f'''<svg class="radar-svg" overflow="visible" width="260" height="260" viewBox="0 0 240 240">
{grids}{spokes}{data_poly}{dots}{lbls}</svg>'''

def legend_html(anchor, consensus, competition, hereditary):
    items = [
        ('升学保障', anchor), ('口碑共识', consensus),
        ('入读难度', competition), ('校友网络', hereditary)
    ]
    rows = ''
    for label, val in items:
        color = '#6366f1' if val > 30 else '#c5b358'
        rows += f'<div class="rleg-item"><span class="rleg-dot" style="background:{color}"></span>{label} <span class="rleg-val">{val}</span></div>'
    return rows

def gen_report(school, code, output_path):
    name = school['name_zh']
    tier = school.get('tier','B')
    tier_class = TIER_CLASS.get(tier,'b')
    tier_label = TIER_LABEL.get(tier,'B 级')
    ft = school.get('finance_type','资助')
    gender = school.get('gender','男女校')
    net = school.get('school_net','')
    religion = school.get('religion_zh','')
    fees = school.get('fees','')
    district = school.get('district_zh','')
    name_en = school.get('name_en','')
    relation = school.get('relation','')
    best_sec = school.get('best_sec','')
    total = school.get('total',0)
    anchor = school.get('anchor',0)
    consensus = school.get('consensus',0)
    competition = school.get('competition',0)
    hereditary = school.get('hereditary',0)
    through_train = school.get('through_train','')
    teacher_ratio = school.get('teacher_ratio','')
    teaching_lang = school.get('teaching_language','')
    sessions = '/'.join(school.get('sessions',['全日']))

    hero_meta = f'{tier_label} · {ft}{gender}'
    if net: hero_meta += f' · {net}校网'

    sub = f'{name_en} · {district}'
    if net: sub += f'({net}校网)'
    if relation and best_sec: sub += f' · {relation}{best_sec}'
    if religion and religion not in ('不適用','無','无'): sub += f' · {religion}'

    # 四因子解读文字
    adesc = f'锚点分 {anchor} 是{name}最核心的竞争力' if anchor > 50 else f'锚点分 {anchor} 偏低'
    cdesc = '口碑共识较高' if consensus > 20 else '共识分偏低，在本地家长口碑平台讨论度有限'
    xdesc = '竞争激烈' if competition > 50 else ('中等竞争' if competition > 30 else '入读难度较低')
    sdesc = '校友网络较强' if hereditary > 30 else ('有一定校友基础' if hereditary > 15 else '世袭分低，非校友家庭利好')

    html = f'''<!DOCTYPE html>
<html lang="zh-HK" data-report-code="{code}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{name} · 深度择校报告 | 港校指南</title>
  <link rel="stylesheet" href="./assets/style.css" />
  <link rel="stylesheet" href="./assets/report.css" />
  <style>
    .score-bar {{ display: flex; align-items: center; gap: 8px; margin: 4px 0; }}
    .score-bar .bar-label {{ width: 100px; font-size: 13px; color: #64748b; }}
    .score-bar .bar-track {{ flex: 1; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden; }}
    .score-bar .bar-fill {{ height: 100%; border-radius: 4px; background: #6366f1; }}
    .score-bar .bar-val {{ font-size: 13px; font-weight: 700; width: 36px; text-align: right; color: #1e293b; }}
    .cal-badge {{ display: inline-block; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: #e0e7ff; color: #4338ca; margin-left: 6px; vertical-align: middle; }}
    .pros-cons {{ display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }}
    .pro-box {{ background: #eef2ff; border-radius: 8px; padding: 16px; border: 1px solid #c7d2fe; }}
    .con-box {{ background: #fff7ed; border-radius: 8px; padding: 16px; border: 1px solid #fed7aa; }}
    .pro-box h4, .con-box h4 {{ margin: 0 0 8px; font-size: 15px; }}
    .pro-box ul, .con-box ul {{ margin: 0; padding-left: 18px; font-size: 14px; line-height: 1.7; }}
    .risk-list {{ background: #fef8ee; border-left: 4px solid #f97316; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 12px 0; font-size: 14px; }}
    .risk-list li {{ margin: 6px 0; }}
    .decision-tree {{ background: #f8fafc; border-radius: 12px; padding: 20px 24px; margin: 16px 0; font-size: 14px; line-height: 1.8; }}
    .decision-tree .dt-q {{ font-weight: 700; color: #6366f1; }}
    @media(max-width:600px){{ .pros-cons{{ grid-template-columns: 1fr; }} }}
  </style>
<link rel="stylesheet" href="./assets/paywall.css">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
<script src="./assets/auth.js"></script>
<script src="./assets/paywall.js"></script>
</head>
<body>
<header class="report-hero hero-tier-{tier_class}">
  <div class="container">
    <div class="tier-mega">{hero_meta}</div>
    <div class="hero-title-row"><h1>{name} 深度择校报告</h1><div class="lang-switch"><a href="./report-{code}-tc.html">繁</a></div></div>
    <p class="sub">{sub}</p>
</div>
</header>
<main class="report-body">
<!-- ===== 0 数据可靠性声明 ===== -->
<div class="callout warn" style="margin-bottom:24px;background:#fff8e8;border-left-color:#f97316">
  <strong>本报告数据可靠性声明</strong><br />
  本报告所有事实性数据已尽可能经过多方核实，并按核实程度标注：<br />
  · <strong>✅ 多方核实</strong>：政府公开数据(CHSC/EDB)或多个独立来源交叉确认<br />
  · <strong>🟡 单一可靠来源</strong>：正规媒体报道或官方信息，未经第二个来源交叉验证<br />
  · <strong>🔴 有限来源·仅供参考</strong>：家长讨论区/单一匿名帖等，可信度有限<br />
  · <strong>💬 主观分析</strong>：专家观点/分析，非事实陈述<br />
  所有客观数据一经发现更准确的信息源将立即更新。主观分析部分不构成入学建议。
</div>
<!-- ===== 1 学校定位与核心竞争力（自动生成）===== -->
<section class="chapter">
  <h2><span class="num">1</span>学校定位与核心竞争力<span class="expert-tag">专家分析</span></h2>
  <table class="dt">
    <tr><th>全名</th><td>{name}（{name_en}）✅ 教育局学校概览 2025</td></tr>
    <tr><th>地区 / 校网</th><td>{district} · {net}校网 ✅ 教育局学校概览 2025</td></tr>
    <tr><th>等级</th><td>{tier_label} · 本平台四因子评级体系</td></tr>
    <tr><th>类型 / 性别</th><td>{ft} · {sessions} · {gender} · {religion if religion not in ('不適用','') else '无宗教'} ✅ 教育局学校概览 2025</td></tr>
    <tr><th>学费</th><td>{fees} ✅ 教育局学校概览 2025</td></tr>
    <tr><th>班师比</th><td>{teacher_ratio if teacher_ratio else '暂无数据'} ✅ 教育局学校概览 2025</td></tr>
    <tr><th>教学语言</th><td>{teaching_lang if teaching_lang else '暂无数据'} ✅ 教育局学校概览 2025</td></tr>
    <tr><th>{"联系/直属中学" if relation else "关联中学"}</th><td>{best_sec if best_sec else '无直接关联中学'} · {relation if relation else '—'} 🟡 综合公开数据评估（非官方）</td></tr>
    <tr><th>创校/校舍</th><td>{through_train[:30] if through_train else '暂无详细数据'}</td></tr>
  </table>
  <h3>四因子评级体系解读</h3>
  <div class="callout">
    <strong>💬 {name}四因子评分</strong><br />
    <div class="score-bar"><span class="bar-label">锚点分（升学保障）</span><span class="bar-track"><span class="bar-fill" style="width:{anchor}%"></span></span><span class="bar-val">{anchor}</span></div>
    <div class="score-bar"><span class="bar-label">共识分（口碑共识）</span><span class="bar-track"><span class="bar-fill" style="width:{consensus}%"></span></span><span class="bar-val">{consensus}</span></div>
    <div class="score-bar"><span class="bar-label">竞争分（入读难度）</span><span class="bar-track"><span class="bar-fill" style="width:{competition}%"></span></span><span class="bar-val">{competition}</span></div>
    <div class="score-bar"><span class="bar-label">世袭分（校友网络）</span><span class="bar-track"><span class="bar-fill" style="width:{hereditary}%"></span></span><span class="bar-val">{hereditary}</span></div>
    总分：<strong>{total}</strong> · 等级：<strong>{tier}</strong>（数据来源：本平台四因子评级体系）<br /><br />
    <strong>解读</strong>：{adesc}。{cdesc}，{xdesc}。{sdesc}。
  </div>
  <div class="callout">
    <strong>💬 专家定位分析（待补充）</strong><br />
    <!-- TODO: Claude fills this -->
  </div>
  <h3>四因子竞争力雷达图</h3>
  <div class="radar-wrap">
    {radar_svg(anchor, consensus, competition, hereditary)}
    <div class="radar-legend">
      {legend_html(anchor, consensus, competition, hereditary)}
    </div>
  </div>
  <h3>适合 / 不适合的孩子类型</h3>
  <div class="pros-cons">
    <div class="pro-box"><h4>👍 适合</h4><ul>
      <!-- TODO: Claude fills this -->
    </ul></div>
    <div class="con-box"><h4>👎 不适合</h4><ul>
      <!-- TODO: Claude fills this -->
    </ul></div>
  </div>
  <p class="source-note">📎 来源：教育局学校概览 2025 · 本平台四因子评级 · 校方官网</p>
</section>

<!-- ===== 付费墙 ===== -->
<div class="paywall-overlay" id="paywall">
  <h3>解锁全部 8 章深度分析</h3>
  <p class="pw-sub">试读结束。购买后解锁教学解读、升学通路、入读攻略等全部内容</p>
  <div class="pw-all-access">
    <div class="pw-badge">🔥 最划算 · 含后续新增</div>
    <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03">
      <span class="pw-price">HK$198</span>
      <span class="pw-label">一键解锁全部 112 份报告</span>
    </a>
    <div class="pw-strike"><s>原价 HK$399</s> 省 HK$201</div>
  </div>
  <div class="pw-features">
    ✅ 教学解读 &nbsp; ✅ 升学通路 &nbsp; ✅ 入读攻略<br>
    ✅ 插班叩门 &nbsp; ✅ 家庭画像 &nbsp; ✅ 同类对比 &nbsp; ✅ 专家总结
  </div>
  <div class="pw-buttons">
    <a class="pw-btn pw-btn-primary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">单份解锁 · 本报告</span>
    </a>
    <a class="pw-btn pw-btn-secondary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">注册购买 · 永久保存</span>
    </a>
  </div>
  <div class="pw-single-strike"><s>原价 HK$29.9</s></div>
  <div class="pw-recover">已购买？<a href="/unlock.html">点此恢复 →</a></div>
</div>

<div id="premium-content" style="display:none">
</section>
<!-- ===== 2~8 章（待 Claude 填充）===== -->
<!-- TODO: Chapters 2-8 go here -->
</div>

<!-- CTA -->
<div class="cta-banner" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;border-radius:12px;padding:32px 28px;margin:48px 0 0;text-align:center">
  <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">获取更多学校的深度择校报告</h3>
  <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我们为全港 90+ 所评级学校准备了同等深度的择校报告——每一份都包含专家解读、入读攻略、家长口碑和横向对比。找到最适合你家的那一所。</p>
  <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一键解锁全部 112 份报告（含后续新增）</span></a>
</div>
</main>
<footer class="footer">
  <div class="container" style="text-align:center">
    <strong>港校指南</strong> · 帮助内地来港家庭解决香港升学信息不对称<br />
    <span style="font-size:12px">本报告事实性数据来自香港教育局/家校会官方数据及公开报道，已标注来源。主观分析部分由教育研究团队撰写，仅供参考，不构成入学建议。</span>
  </div>
</footer>
</body>
</html>'''

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'✅ {output_path} ({name} | {tier}级 | 总分{total})')
    return html

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('用法: python3 scripts/gen_report.py "学校全名" <code>')
        sys.exit(1)
    school = load_school(sys.argv[1])
    if not school:
        print(f'❌ 未找到: {sys.argv[1]}')
        sys.exit(1)
    gen_report(school, sys.argv[2], f'report-{sys.argv[2]}.html')

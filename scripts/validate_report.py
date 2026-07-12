#!/usr/bin/env python3
"""
validate_report.py — 自动验证幼稚园深度报告是否符合标准
用法: python3 scripts/validate_report.py web/report-xxx.html
检查 7 大类规则（内容/核实度/诚实度/格式检查等），全部通过才放行。
"""
import sys, os, re

def fail(msg):
    print(f'  ❌ {msg}')
    return 1  # 必须返回整数，Python 的 False==0 会导致计数失效

def _visible(seg):
    # 去掉 HTML 标签与所有空白，剩下的就是真正的可见文字量
    return len(re.sub(r'\s', '', re.sub(r'<[^>]+>', '', seg)))

def _check_archive(name, html):
    """历史档案（已停办学校）专用验证：不强求招生/插班/面试等『在校』专属章节，
    只保证文件完整、结构健全、有可靠性声明、每章有实质内容。"""
    errors = 0
    print('  📁 历史档案模式（已停办学校）——按存档标准验证')

    if not html.strip().endswith('</html>'):
        errors += fail('文件未以 </html> 结尾（可能被截断）')
    else:
        print('  ✅ 文件完整')

    if '数据可靠性' not in html and '數據可靠性' not in html:
        errors += fail('缺少「数据可靠性」声明框')
    else:
        print('  ✅ 声明块存在')

    # 章节：至少 3 章，且每章 ≥100 字（档案标准，略低于在校报告的 120）
    sections = html.split('<section class="chapter">')[1:]
    chap_chars = [_visible(s) for s in sections]
    if len(sections) < 3:
        errors += fail(f'档案章节过少（{len(sections)}/最少3）')
    else:
        thin = [f'第{i+1}章{c}字' for i, c in enumerate(chap_chars) if c < 100]
        if thin:
            errors += fail(f'档案有章节过薄（<100字）：{"、".join(thin)}')
        else:
            print(f'  ✅ 档案章节达标（{len(sections)}章·最薄{min(chap_chars)}字）')

    nums = [int(n) for n in re.findall(r'<h2[^>]*>\s*<span class="num">(\d+)</span>', html)]
    if nums != list(range(1, len(nums) + 1)):
        errors += fail(f'章节编号不连续：{nums}')
    else:
        print(f'  ✅ 章节编号连续: 1→{len(nums)}')

    ph = [p for p in ['XXX', 'TODO', 'FIXME', '待填', '占位', 'Lorem', 'lorem'] if p in html]
    ph += re.findall(r'\{[一-鿿\w]{1,20}\}', html)
    if ph:
        errors += fail(f'发现残留占位符：{ph}')
    else:
        print('  ✅ 无残留占位符')

    tag_ok = True
    for tag in ['div', 'table', 'tr', 'svg', 'section']:
        if len(re.findall(rf'<{tag}[\s>]', html)) != len(re.findall(rf'</{tag}>', html)):
            errors += fail(f'<{tag}> 标签开合不平衡')
            tag_ok = False
    if tag_ok:
        print('  ✅ HTML 标签配对平衡')

    if '<td></td>' in html or '<th></th>' in html or '<li></li>' in html:
        errors += fail('发现空表格/列表项')
    else:
        print('  ✅ 无空元素')

    if errors == 0:
        print(f'\n✅ {name}: 历史档案验证通过！可以提交。')
        return 0
    print(f'\n❌ {name}: {errors} 条未通过，请修复后重新验证。')
    return 1

def check(filepath):
    name = os.path.basename(filepath)
    html = open(filepath, encoding='utf-8').read()
    errors = 0

    print(f'🔍 验证: {name}')

    # 历史档案（已停办学校）：仅当「标题区(hero)」标明停办/档案时才算，正文顺带提及不触发
    hero = re.search(r'<header[^>]*report-hero.*?</header>', html, re.DOTALL)
    hero_txt = hero.group(0) if hero else html[:1500]
    if '已停办' in hero_txt or '已停辦' in hero_txt or '历史档案' in hero_txt or '歷史檔案' in hero_txt:
        return _check_archive(name, html)

    # === A. 文件完整性 ===
    if not html.strip().endswith('</html>'):
        errors += fail('文件未以 </html> 结尾（可能被截断）')
    else:
        print('  ✅ 文件完整')

    if '所有客观数据一经更新。</div>' in html and '不构成入学建议' not in html and '不構成入學建議' not in html:
        errors += fail('声明块被截断——只有「一经更新」没有「不构成入学建议」」')
    elif '不构成入学建议' not in html and '不構成入學建議' not in html:
        errors += fail('声明块缺少「不构成入学建议」」结尾')
    else:
        print('  ✅ 声明块完整')

    # === B. 校属性准确性 ===
    if '各校' in html and '分校' not in html:
        errors += fail('发现「各校」字样——请确认该校是否有多所分校')
    else:
        print('  ✅ 校属性无异常')

    # === C. 内容充实度 ===
    chapters = len(re.findall(r'class="chapter"', html))
    if chapters < 8:
        errors += fail(f'章节数不足（{chapters}/8）')
    else:
        print(f'  ✅ 章节数: {chapters}')

    if '<svg class="radar-svg"' not in html and '<polygon points="120,28 212,94' not in html:
        errors += fail('缺少雷达图 SVG')
    else:
        print('  ✅ 雷达图存在')

    # Ch内容充实度：按「真实可见字数」衡量，不再数换行（避免把排版紧凑误判为内容薄）
    sections = html.split('<section class="chapter">')[1:]
    chap_chars = [_visible(s) for s in sections]
    MIN_ANY, MIN_GUIDE = 120, 250  # 顶级深度标准：每章≥120字；入读攻略/插班章≥250字
    # 规则一：每一章都要有实质内容（无一句话占位章）
    thin = [f'第{i+1}章{c}字' for i, c in enumerate(chap_chars) if c < MIN_ANY]
    if thin:
        errors += fail(f'有章节内容过薄（<{MIN_ANY}字）：{"、".join(thin)}')
    elif chap_chars:
        print(f'  ✅ 各章内容量达标（最薄 {min(chap_chars)} 字）')
    # 规则二：第4章（入读攻略）、第5章（插班与求位）须更充实
    for idx, label in [(4, '入读攻略'), (5, '插班与求位')]:
        if len(chap_chars) >= idx:
            c = chap_chars[idx - 1]
            if c < MIN_GUIDE:
                errors += fail(f'第{idx}章（{label}）内容偏少（{c}字/最少{MIN_GUIDE}字）')
            else:
                print(f'  ✅ 第{idx}章: {c}字')

    # 对比表
    if 'class="dt"' not in html or html.count('<tr><th>') < 3:
        errors += fail('对比表不足（最少需要3所竞品的对比行）')
    else:
        print('  ✅ 对比表存在')

    # === D. 来源与核实度 ===
    if '✅' not in html and '🟡' not in html:
        errors += fail('缺少核实度标注（✅/🟡/🔴）')
    else:
        print('  ✅ 核实度标注存在')

    src_count = len(re.findall(r'source-note.*📎', html))
    if src_count < 3:
        errors += fail(f'来源标注偏少（{src_count}/最少3处）')
    else:
        print(f'  ✅ 来源标注: {src_count}处')

    # === E. 诚实度 ===
    warn_count = len(re.findall(r'callout warn.*?⚠️', html, re.DOTALL))
    if warn_count < 2:
        errors += fail(f'诚实提醒（⚠️callout）偏少（{warn_count}/最少2处）')
    else:
        print(f'  ✅ 诚实提醒: {warn_count}处')

    # === F. 技术检查 ===
    if '<td></td>' in html or '<th></th>' in html or '<li></li>' in html:
        errors += fail('发现空表格/列表项')
    else:
        print('  ✅ 无空元素')

    # === G. 格式检查（防出错·章节/占位符/标签/区块）===
    # G1. 章节编号必须连续 1→N，不跳号、不重复
    nums = [int(n) for n in re.findall(r'<h2[^>]*>\s*<span class="num">(\d+)</span>', html)]
    expected = list(range(1, len(nums) + 1))
    if not nums:
        errors += fail('未找到章节编号（<span class="num">）')
    elif nums != expected:
        errors += fail(f'章节编号不连续/有重复：实际 {nums}，应为 {expected}')
    else:
        print(f'  ✅ 章节编号连续: 1→{len(nums)}')

    # G2. 无残留占位符（写报告时忘了替换的坑）
    placeholders = ['XXX', 'TODO', 'FIXME', '待填', '占位', 'Lorem', 'lorem']
    hit = [p for p in placeholders if p in html]
    # 模板占位符 {校名}/{slug} 等（花括号包住中文或英文单词；CSS 的 {} 不会命中）
    tpl = re.findall(r'\{[一-鿿\w]{1,20}\}', html)
    if hit or tpl:
        errors += fail(f'发现残留占位符：{hit + tpl}')
    else:
        print('  ✅ 无残留占位符')

    # G3. HTML 关键标签开合平衡（防标签没闭合导致烂版）
    tag_balanced = True
    for tag in ['div', 'table', 'tr', 'svg']:
        opens = len(re.findall(rf'<{tag}[\s>]', html))
        closes = len(re.findall(rf'</{tag}>', html))
        if opens != closes:
            errors += fail(f'<{tag}> 标签开合不平衡：{opens} 开 / {closes} 合')
            tag_balanced = False
    if tag_balanced:
        print('  ✅ HTML 标签配对平衡')

    # G4. 必备区块存在（标题区 + 可靠性声明框）
    if 'report-hero' not in html:
        errors += fail('缺少 report-hero 标题区')
    elif '数据可靠性' not in html and '數據可靠性' not in html:
        errors += fail('缺少「数据可靠性」声明框')
    else:
        print('  ✅ 必备区块齐全')

    # G5. 章节标题不重复（防整章复制忘改）
    titles = [t.strip() for t in re.findall(r'<span class="num">\d+</span>([^<]+)', html)]
    dupes = sorted({t for t in titles if titles.count(t) > 1})
    if dupes:
        errors += fail(f'章节标题重复：{dupes}')
    else:
        print('  ✅ 章节标题无重复')

    # --- 结果 ---
    if errors == 0:
        print(f'\n✅ {name}: 全部验证通过！可以提交。')
        return 0
    else:
        print(f'\n❌ {name}: {errors} 条未通过，请修复后重新验证。')
        return 1


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('用法: python3 scripts/validate_report.py web/report-xxx.html')
        sys.exit(1)
    sys.exit(check(sys.argv[1]))

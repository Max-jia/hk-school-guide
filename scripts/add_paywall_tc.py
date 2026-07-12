#!/usr/bin/env python3
"""
為繁體中文(-tc)報告批次加上付費牆。
用法：
  測試單份: python3 scripts/add_paywall_tc.py --test
  處理全部: python3 scripts/add_paywall_tc.py
"""

import os, re, sys, glob

# ── 繁體中文付費牆 HTML ──
PAYWALL_HTML = '''<!-- ===== 付费墙 ===== -->
<div class="paywall-overlay" id="paywall">
  <h3>解鎖全部 8 章深度分析</h3>
  <p class="pw-sub">試讀結束。購買後解鎖教學解讀、升學通路、入讀攻略等全部內容</p>

  <!-- 全解鎖（置頂·主推） -->
  <div class="pw-all-access">
    <div class="pw-badge">🔥 最划算 · 含後續新增</div>
    <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03">
      <span class="pw-price">HK$198</span>
      <span class="pw-label">一鍵解鎖全部 112 份報告</span>
    </a>
    <div class="pw-strike"><s>原價 HK$399</s> 省 HK$201</div>
  </div>

  <!-- 單份解鎖 -->
  <div class="pw-features">
    ✅ 教學解讀 &nbsp; ✅ 升學通路 &nbsp; ✅ 入讀攻略<br>
    ✅ 插班叩門 &nbsp; ✅ 家庭畫像 &nbsp; ✅ 同類對比 &nbsp; ✅ 專家總結
  </div>
  <div class="pw-buttons">
    <a class="pw-btn pw-btn-primary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">單份解鎖 · 本報告</span>
    </a>
    <a class="pw-btn pw-btn-secondary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">註冊購買 · 永久保存</span>
    </a>
  </div>
  <div class="pw-single-strike"><s>原價 HK$29.9</s></div>

  <div class="pw-recover">已購買？<a href="/unlock.html">點此恢復 →</a></div>
</div>

<div id="premium-content" style="display:none">
'''

# ── 底部 CTA 橫幅（含按鈕·繁體版）──
CTA_BANNER_HTML = '''<div class="cta-banner" style="background:linear-gradient(135deg,#2d6a4f,#40916c);border-radius:16px;padding:32px 28px;margin:32px 0;text-align:center;color:#fff">
  <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">📄 獲取更多學校的深度擇校報告</h3>
  <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我們爲全港 90+ 所評級學校準備了同等深度的擇校報告——每一份都包含專家解讀、入讀攻略、家長口碑和橫向對比。找到最適合你家的那一所。</p>
  <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一鍵解鎖全部 112 份報告（含後續新增）</span></a>
</div>'''


def get_report_code(filename):
    """從檔名提取報告代碼，例如 report-aogps-tc.html → aogps"""
    name = os.path.basename(filename)
    name = name.replace('report-', '', 1)
    name = name.replace('-tc.html', '')
    name = name.replace('.html', '')
    return name


def process_report(filepath, dry_run=False):
    """為單份繁體報告加上付費牆"""
    filename = os.path.basename(filepath)
    code = get_report_code(filepath)

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    changes = []

    # ── 1. 加 data-report-code ──
    if 'data-report-code' not in content.split('\n')[0]:
        content = content.replace('<html lang="zh-HK">', f'<html lang="zh-HK" data-report-code="{code}">', 1)
        changes.append('✔ data-report-code')

    # ── 2. 加 paywall.css + paywall.js ──
    if 'paywall.css' not in content:
        content = content.replace('</head>',
            '\n<link rel="stylesheet" href="./assets/paywall.css">\n<script src="./assets/paywall.js"></script>\n</head>', 1)
        changes.append('✔ paywall.css + paywall.js')

    # ── 3. 在第二章前插入付費牆 ──
    if 'paywall-overlay' not in content:
        # 三種第二章標記模式（依優先級嘗試）
        ch2_markers = [
            r'<!-- ===== 2 ',                          # 模式A: HTML註解
            r'<section class="chapter">\s*<h2>\s*<span class="num">2</span>',  # 模式B: 章節起始標籤
            r'<h2>\s*<span class="num">2</span>',      # 模式C: 只有標題
        ]
        matched = False
        for marker in ch2_markers:
            match = re.search(marker, content)
            if match:
                pos = match.start()
                content = content[:pos] + PAYWALL_HTML + '\n' + content[pos:]
                changes.append('✔ 付費牆已插入')
                matched = True
                break
        if not matched:
            changes.append('✗ 找不到第二章標記')

    # ── 4. 補 premium-content 結束標籤 ──
    if '<div id="premium-content"' in content:
        # 在 </main> 前加上 </div>
        if '</div>\n</main>' not in content and '</div></main>' not in content:
            content = content.replace('</main>', '</div>\n</main>', 1)
            changes.append('✔ premium-content 結束標籤')

    # ── 5. 處理 CTA 橫幅 ──
    if 'cta-banner' in content:
        # 檢查 CTA 橫幅內是否已有按鈕（不能只看整個檔案，因為付費牆也有 pw-btn-all）
        cta_match = re.search(r'<div class="cta-banner"[^>]*>.*?</div>', content, re.DOTALL)
        cta_has_btn = cta_match and 'pw-btn-all' in cta_match.group(0)
        if not cta_has_btn:
            # 情況A：有多行CTA但缺按鈕 → 補按鈕到「敬請期待」位置
            if '敬請期待' in content:
                # 三種佔位符變體
                placeholders = [
                    '<p style="font-size:14px;opacity:.8">深度報告功能即將上線，敬請期待</p>',
                    '<p style="font-size:14px;opacity:.8">🚧 深度報告功能即將上線，敬請期待</p>',
                    '<p style="font-size:14px;opacity:.8">深度報告功能開發中，敬請期待</p>',
                ]
                replaced = False
                for ph in placeholders:
                    if ph in content:
                        content = content.replace(ph,
                            '<a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一鍵解鎖全部 112 份報告（含後續新增）</span></a>')
                        changes.append('✔ CTA 補按鈕（情況A）')
                        replaced = True
                        break
                if not replaced:
                    changes.append('✗ CTA 有敬請期待但格式不符')
            else:
                # 情況B：單行通用CTA，整段替換
                old_cta = re.search(r'<div class="cta-banner">.*?</div>', content, re.DOTALL)
                if old_cta:
                    content = content.replace(old_cta.group(0), CTA_BANNER_HTML, 1)
                    changes.append('✔ CTA 整段替換（情況B）')
        else:
            changes.append('- CTA 已有按鈕，跳過')

    # ── 輸出結果 ──
    if content != original:
        if not dry_run:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
        status = '✅ 已修改' if not dry_run else '🔍 預覽'
    else:
        status = '⏭ 無需修改'

    return filename, status, changes


def main():
    test_mode = '--test' in sys.argv or '-t' in sys.argv
    dry_run = '--dry' in sys.argv

    # 找所有繁體報告
    all_tc = sorted(glob.glob('report-*-tc.html'))

    if test_mode:
        # 只處理第一份做測試
        targets = [all_tc[0]]
        print(f'🧪 測試模式：只處理 {targets[0]}')
    else:
        targets = all_tc
        print(f'📦 處理 {len(targets)} 份繁體報告')

    if dry_run:
        print('🔍 預覽模式：不實際寫入\n')

    success = 0
    skipped = 0
    errors = 0

    for f in targets:
        name, status, changes = process_report(f, dry_run=dry_run)
        print(f'{status} {name}: {"; ".join(changes)}')
        if '✅' in status:
            success += 1
        elif '⏭' in status:
            skipped += 1
        else:
            errors += 1

    print(f'\n📊 完成：修改 {success} / 跳過 {skipped} / 錯誤 {errors}')


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    main()

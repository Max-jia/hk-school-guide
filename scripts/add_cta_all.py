#!/usr/bin/env python3
"""為缺少 CTA 橫幅的報告頁面補上底部 CTA"""
import os
os.chdir('/Users/maxjia/hk-school-guide')

CTA_SC = '''<div class="cta-banner" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;border-radius:12px;padding:32px 28px;margin:48px 0 0;text-align:center">
  <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">获取更多学校的深度择校报告</h3>
  <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我们为全港 90+ 所评级学校准备了同等深度的择校报告——每一份都包含专家解读、入读攻略、家长口碑和横向对比。找到最适合你家的那一所。</p>
  <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一键解锁全部 112 份报告（含后续新增）</span></a>
</div>'''

CTA_TC = '''<div class="cta-banner" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;border-radius:12px;padding:32px 28px;margin:48px 0 0;text-align:center">
  <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">獲取更多學校的深度擇校報告</h3>
  <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我們為全港 90+ 所評級學校準備了同等深度的擇校報告——每一份都包含專家解讀、入讀攻略、家長口碑和橫向對比。找到最適合你家的那一所。</p>
  <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一鍵解鎖全部 112 份報告（含後續新增）</span></a>
</div>'''

count = 0
for f in sorted(os.listdir('.')):
    if not f.startswith('report-') or not f.endswith('.html'):
        continue

    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()

    # 只處理沒有 CTA 的報告
    if 'cta-banner' in content:
        continue

    is_tc = '-tc' in f
    cta = CTA_TC if is_tc else CTA_SC

    # 在 </main> 前插入 CTA
    if '</main>' in content:
        content = content.replace('</main>', cta + '\n</main>', 1)
    elif '</section>\n' in content:
        # 有些報告沒有 <main> 標籤，在最後一個 </section> 後插入
        last_section = content.rfind('</section>')
        if last_section > 0:
            end_of_section = content.index('\n', last_section)
            content = content[:end_of_section+1] + cta + '\n' + content[end_of_section+1:]
    else:
        print(f'⚠️ {f}: 找不到插入點')
        continue

    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    count += 1

print(f'已為 {count} 份報告補上 CTA 橫幅')

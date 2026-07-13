#!/usr/bin/env python3
"""批次為所有報告頁加入 Supabase SDK + auth.js"""
import os
os.chdir('/Users/maxjia/hk-school-guide')

count = 0
for f in sorted(os.listdir('.')):
    if not f.startswith('report-') or not f.endswith('.html'):
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if 'auth.js' in content:
        continue
    if 'paywall.js' in content:
        content = content.replace(
            '<script src="./assets/paywall.js"></script>',
            '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>\n<script src="./assets/auth.js"></script>\n<script src="./assets/paywall.js"></script>'
        )
    else:
        content = content.replace('</head>',
            '\n<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>\n<script src="./assets/auth.js"></script>\n</head>')
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(content)
    count += 1
print(f'已更新 {count} 份報告')

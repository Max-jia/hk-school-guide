from pathlib import Path
import html,re,json
p=Path(__file__).resolve().parent
fs=sorted(p.glob('0*.md'))
def fmt(s):
 s=html.escape(s)
 s=re.sub(r'\[([^]]+)\]\((https?://[^)]+)\)',r'<a href="\2" target="_blank" rel="noopener">\1</a>',s)
 return re.sub(r'\*\*(.*?)\*\*',r'<strong>\1</strong>',s)
parts=['''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>香港教育术语专题｜审计修订稿</title><style>body{font:17px/1.9 -apple-system,BlinkMacSystemFont,sans-serif;max-width:820px;margin:36px auto;padding:0 22px;color:#253336}nav{background:#edf4ef;padding:18px 24px}article{padding:36px 0;border-bottom:1px solid #ddd}h1{font-size:29px;line-height:1.4}h2{font-size:22px;margin-top:2em}a{color:#126b54}p{overflow-wrap:anywhere}.meta{font-size:14px;color:#53605a}li{margin:.4em 0}article{scroll-margin-top:24px}</style><nav id="目录"><strong>香港教育术语专题 · 审计修订稿</strong><p class="meta">文字审计：2026年11月6日。目录按幼稚园、小学、升中与高中、来港家庭分组阅读。</p>''']
groups=[('幼稚园',['00','01']),('小学',['02','05','06']),('升中与高中',['03','07','08','09']),('来港家庭',['04'])]
for label,ks in groups:
 parts.append('<strong>'+label+'</strong><ul>')
 for k in ks:
  f=next(f for f in fs if f.name.startswith(k));title=f.read_text().splitlines()[0][2:]
  parts.append(f'<li><a href="#{f.stem}">{fmt(title)}</a></li>')
 parts.append('</ul>')
parts.append('</nav>')
for f in fs:
 parts.append(f'<article id="{f.stem}">')
 for x in f.read_text().strip().split('\n\n'):
  if x.startswith('# '):parts.append('<h1>'+fmt(x[2:])+'</h1>')
  elif x.startswith('## '):parts.append('<h2>'+fmt(x[3:])+'</h2>')
  elif re.match(r'^1\. ',x):parts.append('<ol>'+''.join('<li>'+fmt(re.sub(r'^\d+\. ','',s))+'</li>' for s in x.splitlines())+'</ol>')
  else:parts.append('<p>'+fmt(x).replace('\n','<br>')+'</p>')
 parts.append('<p><a href="#目录">返回目录</a></p></article>')
parts.append('</html>');(p/'本地预览.html').write_text(''.join(parts))

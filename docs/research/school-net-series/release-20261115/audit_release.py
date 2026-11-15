from pathlib import Path
from html.parser import HTMLParser
import json,hashlib,re,html
P=Path('/Users/maxjia/.codex/worktrees/school-net-humanizer-release/hkschool.guide');R=Path('/Users/maxjia/hkschool.guide');A=P/'docs/research/school-net-series/release-20261115';items=json.loads((A/'release-items.json').read_text());base=json.loads((A/'production-baseline-sha1.json').read_text());err=[];rows=[]
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.links=[];self.tables=0;self.numbers=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='a':self.links.append(a.get('href',''))
  if t=='table':self.tables+=1
for x in items:
 d=json.loads((P/'src/content/blog'/f"{x['slug']}.json").read_text());s=d['body'];p=Parser();p.feed(s)
 for u in p.links:
  if u.startswith(('https://','http://','#')):continue
  if u.startswith('/blog/'):
   if not (P/'src/content/blog'/(u.split('/')[2].split('#')[0]+'.json')).is_file():err.append((x['slug'],'blog missing',u))
  elif u.startswith('/school-net-reference/'):
   if not (P/'public'/u.split('?')[0].split('#')[0].lstrip('/')).is_file():err.append((x['slug'],'asset missing',u))
  elif not u.startswith('/'):err.append((x['slug'],'nonpublic',u))
 if re.search('本轮未上线|未部署|仅本地|/Users/|审阅稿|TODO|PLACEHOLDER',s):err.append((x['slug'],'residue'))
 source=(R/x['source']).read_text();source_urls=set(re.findall(r'https?://[^\s)]+',source));out_urls=set(html.unescape(u)for u in p.links);missing=source_urls-out_urls
 if missing:err.append((x['slug'],'source URL missing',list(missing)))
 expected=sum(1 for line in source.splitlines() if re.match(r'^\|\s*[-:]+',line))
 if p.tables!=expected:err.append((x['slug'],'table loss',p.tables,expected))
 rows.append(dict(slug=x['slug'],tables=p.tables,links=len(p.links),sourceURLs=len(source_urls)))
allowed={'src/content/blog-meta.json','src/lib/blog-clusters.ts','src/lib/blog-taxonomy.ts','src/lib/blog-related-links.ts','src/content/school-net-scenarios.json','src/app/(tc)/blog/[slug]/page.tsx'}|{f"src/content/blog/{x['slug']}.json"for x in items}|{f"public/covers/blog_{x['slug']}.svg"for x in items}|{f"public/covers/og/{x['slug']}.png"for x in items}
diffs=[]
for n,h in base.items():
 if n in ['next-env.d.ts','tsconfig.tsbuildinfo']:continue
 f=P/n
 if not f.is_file():err.append(('baseline missing',n))
 elif hashlib.sha1(f.read_bytes()).hexdigest()!=h:
  diffs.append(n)
  if n not in allowed:err.append(('unrelated changed',n))
result=dict(articles=rows,errors=err,baselineFiles=len(base),changedBaseline=diffs,tableCount=sum(x['tables']for x in rows));(A/'content-and-baseline-audit.json').write_text(json.dumps(result,ensure_ascii=False,indent=2));print(json.dumps(dict(articles=len(rows),tables=result['tableCount'],errors=err),ensure_ascii=False));assert not err

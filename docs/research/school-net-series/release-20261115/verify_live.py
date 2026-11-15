from pathlib import Path
import json,hashlib,urllib.request,xml.etree.ElementTree as E,concurrent.futures
P=Path('/Users/maxjia/.codex/worktrees/school-net-humanizer-release/hkschool.guide');A=P/'docs/research/school-net-series/release-20261115';base='https://hkschool.guide';errors=[]
def get(path):
 with urllib.request.urlopen(base+path,timeout=90)as r:return r.read(),r.status,dict(r.headers)
b,_,_=get('/sitemap.xml');urls=[x.text for x in E.fromstring(b).iter()if x.tag.endswith('loc')];before=json.loads((A/'sitemap-before.json').read_text());lost=sorted(set(before)-set(urls));assert not lost,lost
items=json.loads((A/'release-items.json').read_text())
for x in items:
 for prefix in ['', '/cn']:assert base+prefix+'/blog/'+x['slug'] in urls
paths=[(str(p.relative_to(P/'public')),hashlib.sha256(p.read_bytes()).hexdigest())for p in (P/'public/school-net-reference').rglob('*')if p.is_file()]
paths += [(f'covers/og/{x["slug"]}.png',hashlib.sha256((P/'public/covers/og'/f'{x["slug"]}.png').read_bytes()).hexdigest()) for x in items]
def check(row):
 path,h=row;b,status,headers=get('/'+path);assert hashlib.sha256(b).hexdigest()==h,path;return dict(path=path,bytes=len(b),status=status,sha256=h)
with concurrent.futures.ThreadPoolExecutor(max_workers=5)as pool:assets=list(pool.map(check,paths))
reports=[]
for slug in ['veo-cwb','lsps','dbs','lh','spccps']:
 f=P/'src/content/reports'/f'{slug}.json'
 if not f.exists():continue
 original=json.loads(f.read_text());data=json.dumps(dict(slug=slug)).encode();req=urllib.request.Request(base+'/api/report-content',data=data,headers={'Content-Type':'application/json'});v=json.load(urllib.request.urlopen(req,timeout=90));assert v['ok'] and v['html']==original['premiumHtml'],slug;reports.append(dict(slug=slug,htmlSHA256=hashlib.sha256(v['html'].encode()).hexdigest(),matchesBaseline=True))
result=dict(deployment='dpl_7V6ex7pfeBxo6KXzyngTK6rPDHJs',sitemapBefore=len(before),sitemapAfter=len(urls),lostURLs=lost,newURLs=sorted(set(urls)-set(before)),assets=assets,reportAPI=reports,errors=[]);(A/'live-http-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print('Verified',len(urls),'sitemap URLs; no loss;',len(assets),'exact public assets;',len(reports),'unchanged report APIs')

from pathlib import Path
import json,re,html,hashlib,shutil
R=Path('/Users/maxjia/hkschool.guide');S=R/'docs/research/school-net-series';P=Path('/Users/maxjia/.codex/worktrees/school-net-humanizer-release/hkschool.guide');A=P/'docs/research/school-net-series/release-20261115';items=json.loads((A/'release-items.json').read_text());manifest=json.loads((S/'reaudit-20261115/预览构建清单.json').read_text());bydir={str((R/x['source']).parent):x for x in items if x['stage']=='secondary'};mapped={};assets=json.loads((A/'public-source-assets.json').read_text());public=P/'public/school-net-reference'
for x in items:mapped[(R/x['source']).resolve()]='/blog/'+x['slug']
methods={'primary-ca2026-20261115/2026学额参考估算.html':'primary-2026.html','primary-population-20261115/小学人数与派位估算.html':'primary-population.html','population-model-20261115/官方人数竞争估算.html':'secondary-method.html'}
for src,dst in methods.items():mapped[(S/src).resolve()]='/school-net-reference/'+dst
owners={'net32-20261114':'net31-kl1-20261113','net34-20261114':'secondary-additions-20261113','net35-20261114':'secondary-additions-20261113','net88-20261114':'net91-nt7-20261114','net89-20261114':'net91-nt7-20261114'}
for m in manifest:
 owner=owners.get(Path(m['directory']).name,Path(m['directory']).name);e=next(x for x in items if x['stage']=='secondary' and Path(x['source']).parent.name==owner);mapped[Path(m['file']).resolve()]='/school-net-reference/'+e['slug']+'.html'
for x in assets:mapped[(R/x['source']).resolve()]=x['url']
def remap(u,origin):
 u=html.unescape(u)
 if u.startswith(('http:','https:','/','#','mailto:')):return u
 parts=re.split(r'(?=[?#])',u,maxsplit=1);q=parts[1] if len(parts)>1 else '';p=(origin/parts[0]).resolve()
 for m in manifest:
  if p==Path(m['file']).resolve() and q in ['#primary','#secondary']:
   row=next((x for x in m['articles'] if x['tab']==q[1:]),None)
   if row:return mapped[(R/row['path']).resolve()]
 if p in mapped:return mapped[p]+q
 if p.suffix in ['.json','.pdf','.txt','.png','.jpg'] and p.is_file():
  data=p.read_bytes();url='/school-net-reference/sources/'+hashlib.sha256(data).hexdigest()[:16]+p.suffix;t=P/'public'/url.lstrip('/');t.parent.mkdir(parents=True,exist_ok=True)
  if p.suffix=='.json':
   def clean(x):
    if isinstance(x,dict):return {k:clean(v)for k,v in x.items()}
    if isinstance(x,list):return [clean(v)for v in x]
    if isinstance(x,str) and x.startswith('/Users/'):return mapped.get(Path(x).resolve(),'research/'+Path(x).name)
    return x
   t.write_text(json.dumps(clean(json.loads(data)),ensure_ascii=False,indent=2)+'\n')
  else:t.write_bytes(data)
  mapped[p]=url;assets.append(dict(source=str(p.relative_to(R)),url=url,sha256=hashlib.sha256(t.read_bytes()).hexdigest()));return url+q
 raise ValueError((u,str(origin)))
def fixtext(x,origin):
 if isinstance(x,dict):return {k:fixtext(v,origin)for k,v in x.items()}
 if isinstance(x,list):return [fixtext(v,origin)for v in x]
 if not isinstance(x,str):return x
 x=re.sub(r'href="([^"]+)"',lambda m:'href="'+html.escape(remap(m[1],origin),quote=True)+'"',x)
 for a,b in [('本轮未上线','资料更新至2026年11月15日'),('本輪未上線','資料更新至2026年11月15日'),('本地试算页','条件试算页'),('本地試算頁','條件試算頁'),('本地稿','条件参考'),('本地預覽','條件參考'),('本地预览','条件参考'),('本地研究','条件研究'),('仅本地','条件参考'),('僅本地','條件參考'),('审阅稿','条件参考'),('審閱稿','條件參考')]:x=x.replace(a,b)
 return x
for src,dst in methods.items():
 p=public/dst;s=p.read_text();origin=(S/src).parent
 for name in ['versions','reviewHTML','sourceHTML','methodHTML']:
  match=re.search(r'const '+name+r'\s*=\s*',s)
  if not match:continue
  a=match.end();v,n=json.JSONDecoder().raw_decode(s[a:]);v=fixtext(v,origin);s=s[:a]+json.dumps(v,ensure_ascii=False).replace('<','\\u003c')+s[a+n:]
 s=fixtext(s,origin);p.write_text(s)
# Classify every new article explicitly and supply the existing related-links layout.
f=P/'src/lib/blog-taxonomy.ts';s=f.read_text()
for key,value in [('const STAGES: Record<string, BlogStage> = {','stage'),('const TOPICS: Partial<Record<string, BlogTopic>> = {','topic')]:
 for x in items:
  if f'"{x["slug"]}"' not in s[s.index(key):s.index('};',s.index(key))]:s=s.replace(key,key+'\n  '+json.dumps(x['slug'])+': '+json.dumps(x['stage'] if value=='stage' else 'comparison')+',',1)
f.write_text(s)
f=P/'src/lib/blog-related-links.ts';s=f.read_text();key='export const BLOG_RELATED_LINKS'
# Find the actual editorial map declaration, preserving all prior entries.
match=re.search(r'(?:export )?const \w+[^\n]*= \{\n',s);print('related map',match.group(0) if match else None)
for x in items:
 if '"'+x['slug']+'": entry(' in s:continue
 anchor='  "primary-net-40-analysis": entry('
 if x['stage']=='primary':val=f'entry("primary", "校网分析 · 申请与升学", [G.through, G.net], [G.psp, G.pNetTopic], "制度与选校", [A.net, A.simulator])'
 else:val='entry("secondary", "校网分析 · 升中派位", [G.sBand, G.sOverview], [G.sResults], "升中资料", [A.secondary, A.shortlist])'
 s=s.replace(anchor,'  '+json.dumps(x['slug'])+': '+val+',\n'+anchor,1)
f.write_text(s)
f=P/'src/app/(tc)/blog/[slug]/page.tsx';s=f.read_text();s=re.sub(r'import SchoolNetScenario[^\n]+\n','',s);s=re.sub(r'import schoolNetScenarios[^\n]+\n','',s);s=re.sub(r'  const scenario = [^\n]+\n','',s);s=s.replace('                {scenario && <SchoolNetScenario config={scenario} locale={locale} />}\n','');f.write_text(s)
(A/'public-source-assets.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n')
shutil.copy2(R/'docs/research/school-net-series/release-20261115/prepare_release.py',A/'prepare_release.py');shutil.copy2(Path(__file__),A/'finalize_release.py')
print('Finalized links and classification;',len(assets),'public source assets')

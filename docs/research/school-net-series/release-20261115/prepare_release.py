from pathlib import Path
import json,re,html,hashlib,shutil,subprocess,base64
R=Path('/Users/maxjia/hkschool.guide');S=R/'docs/research/school-net-series';P=Path('/Users/maxjia/.codex/worktrees/school-net-humanizer-release/hkschool.guide');A=P/'docs/research/school-net-series/release-20261115';A.mkdir(parents=True,exist_ok=True)
def save(p,x):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(x,ensure_ascii=False,indent=2)+'\n')
base=json.loads((A/'production-baseline-sha1.json').read_text())
for n,h in base.items():
 f=P/n
 if f.is_file() and hashlib.sha1(f.read_bytes()).hexdigest()==h:continue
 if not n.startswith(('public/directory-data/','src/content/generated/')):continue
 raw=subprocess.check_output(['vercel','api',f'/v8/deployments/dpl_FBje1Bph1VtaaxFN1NN9q1hPcdbN/files/{h}?teamId=team_5J28m0vO2APAVo8PiQPIQ9u4','--method','GET']);v=json.loads(raw);v=v.get('result',v);data=base64.b64decode(v['data']);assert hashlib.sha1(data).hexdigest()==h,n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(data)
items=json.loads((S/'reaudit-20261115/文章清单.json').read_text());manifest=json.loads((S/'reaudit-20261115/预览构建清单.json').read_text());slugmap={};titles={};entries=[];previewmap={}
for m in manifest:
 d=Path(m['directory']);meta=json.loads((d/'拟用元数据.json').read_text())
 for a in m['articles']:
  p=R/a['path'];stage=a['tab'];v=next(v for v in meta if v['slug'].startswith('primary-net-')==(stage=='primary'));slugmap[p.resolve()]='/blog/'+v['slug'];titles[v['slug']]=v['title'];entries.append(dict(v,file=str(p),stage=stage,batch=d.name));previewmap[(Path(m['file']).resolve(),stage)]='/blog/'+v['slug']
primary=sorted([x for x in entries if x['stage']=='primary'],key=lambda x:int(re.search(r'net-(\d+)',x['slug'])[1]));secondary=sorted([x for x in entries if x['stage']=='secondary'],key=lambda x:['中西','湾仔','油尖','深水','九龙','荃湾','葵青','大埔','沙田'].index(next(z for z in ['中西','湾仔','油尖','深水','九龙','荃湾','葵青','大埔','沙田'] if z in x['title'])))
public=P/'public/school-net-reference';public.mkdir(exist_ok=True);urlmap={};assets=[]
methods={'primary-ca2026-20261115/2026学额参考估算.html':'primary-2026.html','primary-population-20261115/小学人数与派位估算.html':'primary-population.html','population-model-20261115/官方人数竞争估算.html':'secondary-method.html'}
for src,dst in methods.items():urlmap[(S/src).resolve()]='/school-net-reference/'+dst
for e in secondary:
 m=next(m for m in manifest if m['directory'].endswith(e['batch']));urlmap[Path(m['file']).resolve()]='/school-net-reference/'+e['slug']+'.html'
owners={'net32-20261114':'net31-kl1-20261113','net34-20261114':'secondary-additions-20261113','net35-20261114':'secondary-additions-20261113','net88-20261114':'net91-nt7-20261114','net89-20261114':'net91-nt7-20261114'}
for m in manifest:
 if Path(m['file']).resolve() not in urlmap:
  e=next(e for e in secondary if e['batch']==owners[m['directory'].split('/')[-1]])
  urlmap[Path(m['file']).resolve()]='/school-net-reference/'+e['slug']+'.html'
# Local references are either known articles/tools or public supporting documents.
def url(u,origin):
 u=html.unescape(u)
 if u.startswith(('http:','https:','mailto:','tel:','#','/blog/','/cn/','/school-net-reference/')):return u
 parts=re.split(r'(?=[?#])',u,maxsplit=1);q=parts[1] if len(parts)>1 else '';p=(origin/parts[0]).resolve()
 if p in slugmap:return slugmap[p]+q
 if q.startswith('#') and (p,q[1:]) in previewmap:return previewmap[(p,q[1:])]
 if p in urlmap:
  if q.startswith('#') and (p,q[1:]) in previewmap:return previewmap[(p,q[1:])]
  return urlmap[p]+q
 if u.startswith('/'):return u
 if p.is_file() and p.suffix.lower() in ['.pdf','.json','.txt','.png','.jpg','.jpeg']:
  if p not in urlmap:
   data=p.read_bytes();name=hashlib.sha256(data).hexdigest()[:16]+p.suffix.lower();target=public/'sources'/name;urlmap[p]='/school-net-reference/sources/'+name;target.parent.mkdir(exist_ok=True)
   if p.suffix=='.json':
    obj=json.loads(data)
    def clean(v):
     if isinstance(v,dict):return {k:clean(x)for k,x in v.items()}
     if isinstance(v,list):return [clean(x)for x in v]
     if isinstance(v,str) and v.startswith('/Users/'):return slugmap.get(Path(v).resolve(),'research/'+Path(v).name)
     return v
    save(target,clean(obj))
   else:target.write_bytes(data)
   assets.append(dict(source=str(p.relative_to(R)) if p.is_relative_to(R) else p.name,url=urlmap[p],sha256=hashlib.sha256(target.read_bytes()).hexdigest()))
  return urlmap[p]+q
 raise ValueError('Unmapped local reference '+str(p)+' from '+str(origin))
def links(s,origin):return re.sub(r'href="([^"]+)"',lambda m:'href="'+html.escape(url(m[1],origin),quote=True)+'"',s)
renderer=(S/'net62-nt2-20261114/复现脚本/build_secondary_preview.py').read_text();exec(renderer[renderer.index('def inline('):renderer.index('content={')])
meta=json.loads((P/'src/content/blog-meta.json').read_text());original={x['slug']:x for x in meta};rows=[]
for e in primary+secondary:
 p=Path(e['file']);body=links(md(p.read_text()),p.parent);body=body.replace('class="table-wrap"','class="blog-table-wrap school-net-table"');body=re.sub(r'^<h1>.*?</h1>\s*','',body)
 if e['stage']=='primary':tool='/school-net-reference/primary-2026.html?net='+re.search(r'net-(\d+)',e['slug'])[1]
 else:tool='/school-net-reference/'+e['slug']+'.html#tool'
 body+='<h2>按家庭条件试算</h2><p><a href="'+tool+'">打开官方底数条件估算工具</a>。未知条件可以留空；结果只用于比较假设，不是录取概率。</p>'
 save(P/'src/content/blog'/f"{e['slug']}.json",dict(slug=e['slug'],title=e['title'],body=body,premium=False))
 old=original.get(e['slug'],{});tease=e.get('description',old.get('tease',''))
 row=dict(old,cat='guide',slug=e['slug'],date=old.get('date','2026-11-15'),tag='校网逐网分析',cover=old.get('cover','/covers/blog_primary-net-41-analysis.svg'),title=e['title'],scTitle=e['title'],tease=tease,scTease=tease,updatedAt='2026-11-15',verifiedAt='2026-11-15');row.pop('seoTitle',None);row.pop('scSeoTitle',None)
 if e['slug'] in original:meta[meta.index(original[e['slug']])]=row
 else:meta.append(row)
 # Each new route gets a valid social cover, based on the existing series design.
 if e['slug'] not in original:
  cover=(P/'public/covers/blog_primary-net-41-analysis.svg').read_text();cover=cover.replace('41校网',e['title'].split('：')[0]);cp=P/'public/covers'/f"blog_{e['slug']}.svg";cp.write_text(cover);row['cover']='/covers/'+cp.name
  shutil.copy2(P/'public/covers/og/primary-net-41-analysis.png',P/'public/covers/og'/f"{e['slug']}.png")
 rows.append(dict(slug=e['slug'],title=e['title'],stage=e['stage'],source=str(p.relative_to(R)),sourceSHA256=hashlib.sha256(p.read_bytes()).hexdigest(),bodySHA256=hashlib.sha256(body.encode()).hexdigest(),tool=tool))
save(P/'src/content/blog-meta.json',meta)
# Keep existing series renderer and populate all completed articles.
f=P/'src/lib/blog-clusters.ts';s=f.read_text();a=s.index('= [',s.index('export const BLOG_CLUSTERS'))+2;b=s.index('{\n  "slug": "k12-terminology"',a);clusters=json.loads(s[a:b].rstrip().rstrip(',')+']');by={x['slug']:x for x in clusters};ps=[x['slug']for x in primary];ss=[x['slug']for x in secondary];by['school-net-series']['articleSlugs']=ps+ss;by['school-net-series']['description']='已完成14篇小学及9篇升中分析，比较官津、直资私立选择，并用官方人数与历史学额作条件估算。未知条件和来源局限逐项说明。';by['school-net-series']['sections'][0]['articleSlugs']=ps;by['school-net-series']['sections'][1]['articleSlugs']=ss
by['school-net-primary']['articleSlugs']=ps;by['school-net-primary']['description']='14个校网的官津清单、直资私立选择、升中路径，以及2026官方旧学额与2027人口条件参考。';by['school-net-secondary']['articleSlugs']=ss;by['school-net-secondary']['description']='9个升中网的历史名册、官方小六男女底数和条件估算；学校民间分类、未知净留存及共享位假设分别说明。';f.write_text(s[:a]+json.dumps(clusters,ensure_ascii=False,indent=2)[:-1]+',\n'+s[b:])
f=P/'src/lib/blog-taxonomy.ts';s=f.read_text()
for mark,val in [('BLOG_STAGE_OVERRIDES','stage'),('BLOG_TOPIC_OVERRIDES','topic')]:
 # Inspectable overrides are inserted at the beginning of the respective typed map.
 pass
print('taxonomy declarations',re.findall(r'export const \w+[^\n]*',s)[:6])
# Remove the obsolete manual-headcount widget; new verified tools are linked in all articles.
save(P/'src/content/school-net-scenarios.json',{})
# Publish the two primary pages and the secondary methodology, preserving their tested runtime.
for src,dst in methods.items():
 p=S/src;s=p.read_text();s=links(s,p.parent);s=s.replace('本轮未上线','资料更新至2026年11月15日').replace('本地研究草稿 · 未上线','官方资料条件参考').replace('｜本地草稿','｜港学荟').replace('这份本地稿','这份条件参考').replace('本地草稿','条件参考').replace('仅本地预览','条件参考')
 # JSON string literals carry the return-to-article URL and method content.
 for old,new in slugmap.items():
  rel=str(old.relative_to(S));s=s.replace('../'+rel, new)
 (public/dst).write_text(s)
# Secondary calculators retain the already-tested script; only tool content is shipped.
for e in secondary:
 m=next(m for m in manifest if m['directory'].endswith(e['batch']));p=Path(m['file']);s=p.read_text();a=s.index('const payload=')+len('const payload=');payload,end=json.JSONDecoder().raw_decode(s[a:]);payload={'tool':payload['tool']}
 for lang in ['sc','tc']:payload['tool'][lang]=links(payload['tool'][lang],p.parent)
 s=s[:a]+json.dumps(payload,ensure_ascii=False).replace('<','\\u003c')+s[a+end:];s=s.replace("||'secondary'","||'tool'").replace("||'primary'","||'tool'").replace("if(!payload[tab])tab='primary'","if(!payload[tab])tab='tool'")
 s=re.sub(r'<nav[^>]*>[\s\S]*?</nav>','<nav><a href="/blog/'+e['slug']+'">返回校网文章</a><button data-tab="tool">条件估算</button><button id="lang">繁體</button></nav>',s,count=1)
 s=re.sub(r'<header>[\s\S]*?</header>','<header><strong>'+e['title'].split('：')[0]+'：条件估算</strong><p>资料核对：2026年11月15日</p></header>',s,count=1)
 s=re.sub(r'const auditOldMount=mount;mount=function\(\)\{[^\n]*','const auditOldMount=mount;mount=function(){auditOldMount();auditDynamic()};',s)
 s=s.replace('审阅稿保留数据缺口','保留未公开及未知条件').replace('样板审阅','条件估算').replace('未发布','条件参考');s=re.sub(r'<title>.*?</title>','<title>'+e['title'].split('：')[0]+'条件估算｜港学荟</title>',s,count=1)
 (public/(e['slug']+'.html')).write_text(s)
# Rewrite JS-embedded URLs in primary tool data; static href rewriting cannot see escaped attributes.
for p in public.glob('*.html'):
 s=p.read_text()
 for m in manifest:
  src=Path(m['file']);rel='../'+src.parent.name+'/'+src.name
  for tab in ['primary','secondary']:
   if (src.resolve(),tab) in previewmap:s=s.replace(rel+'#'+tab,previewmap[(src.resolve(),tab)])
 for src,dst in methods.items():
  psrc=S/src;new='/school-net-reference/'+dst;s=s.replace('../'+str(psrc.relative_to(S)),new).replace(psrc.name,new)
 # All local method HTML fragments are escaped inside JSON. Resolve them as decoded fragments, then serialize.
 for name in ['methodHTML']:
  token='const '+name+'='
  if token in s:
   a=s.index(token)+len(token);v,n=json.JSONDecoder().raw_decode(s[a:]);v={k:links(x,(S/'primary-ca2026-20261115'))for k,x in v.items()};s=s[:a]+json.dumps(v,ensure_ascii=False).replace('<','\\u003c')+s[a+n:]
 s=s.replace("'sources/official-2026-booklet.pdf#page='",json.dumps(url('sources/official-2026-booklet.pdf',S/'primary-ca2026-20261115')+'#page='))
 s=s.replace('<meta name="robots" content="noindex,nofollow">','<meta name="robots" content="noindex,follow">')
 if 'name="robots"' not in s:s=s.replace('</head>','<meta name="robots" content="noindex,follow"></head>')
 p.write_text(s)
save(A/'release-items.json',rows);save(A/'public-source-assets.json',assets)
# Durable editorial sources and completed audit records, excluded from deployment.
for e in entries:
 p=Path(e['file']);dest=P/p.relative_to(R);dest.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(p,dest)
for name in ['逐篇审计清单.json','数据与来源保留检查.json','浏览器验收.json','验收结论.json','逐段改写.json']:
 shutil.copy2(S/'humanizer-zh-20261115'/name,A/name)
(P/'.vercelignore').write_text('docs/**\n**/.DS_Store\n**/tsconfig.tsbuildinfo\n.git\n.codex\n.claude\n.agents\n')
print('Prepared',len(rows),'articles;',len(assets),'public supporting files')

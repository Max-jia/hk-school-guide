#!/usr/bin/env python3
"""Fetch one already identified official source per school; retain literal language
passages for review, not automatic assertions of a dominant teaching language.
"""
import concurrent.futures,datetime,hashlib,json,pathlib,re,threading,time,urllib.parse,urllib.request,urllib.robotparser,gzip
from lxml import html
UA='SchoolProfileVerification/1.0'
base=pathlib.Path('/private/tmp/kg-official-sites-20261026');base.mkdir(exist_ok=True)
import argparse
ap=argparse.ArgumentParser();ap.add_argument('--queue',default='/private/tmp/kg-official-site-queue.json');ap.add_argument('--output',default='/private/tmp/kg-official-language-evidence.json');a=ap.parse_args()
queue=json.loads(pathlib.Path(a.queue).read_text())
locks={};locks_lock=threading.Lock();robots={}
def norm(s):return re.sub(r'[^a-z0-9\u3400-\u9fff]','',s.lower())
def one(item):
 u=item['url'];key=hashlib.sha256(u.encode()).hexdigest();cache=base/(key+'.html.gz');meta=base/(key+'.json')
 host=urllib.parse.urlsplit(u).netloc
 with locks_lock:lock=locks.setdefault(host,threading.Lock())
 result={**item,'checkedAt':'2026-10-26'}
 try:
  with lock:
   if cache.exists():raw=gzip.decompress(cache.read_bytes());final=json.loads(meta.read_text())['finalUrl']
   else:
    root=urllib.parse.urlsplit(u)
    if host not in robots:
     ru=urllib.parse.urlunsplit((root.scheme,host,'/robots.txt','',''));rp=urllib.robotparser.RobotFileParser()
     try:
      with urllib.request.urlopen(urllib.request.Request(ru,headers={'User-Agent':UA}),timeout=8)as r:rp.parse(r.read(150000).decode('utf-8','replace').splitlines())
      robots[host]=rp
     except Exception:robots[host]=None
    if robots[host] and not robots[host].can_fetch(UA,u):raise ValueError('robots disallows source')
    with urllib.request.urlopen(urllib.request.Request(urllib.parse.quote(u,safe=':/?&=%#@+;,!$()*[]~'),headers={'User-Agent':UA}),timeout=18)as r:raw=r.read(3500000);final=r.url
    if not raw:raise ValueError('empty response')
    cache.write_bytes(gzip.compress(raw));meta.write_text(json.dumps({'finalUrl':final}));time.sleep(.15)
  p=html.fromstring(raw)
  for x in p.xpath('//script|//style|//noscript|//nav|//footer'):x.drop_tree()
  for br in p.xpath('//br'):br.tail='\n'+(br.tail or '')
  text='\n'.join(t.strip()for t in p.itertext()if t.strip());flat=re.sub(r'\s+',' ',text)
  identity=norm(item['name']) in norm(flat) or bool(item['nameEn'] and norm(item['nameEn']) in norm(flat)) or bool(re.sub(r'\D','',item['telephone']) and re.sub(r'\D','',item['telephone']) in re.sub(r'\D','',flat))
  sentences=re.split(r'[。！？\n]|(?<=[.!?])\s+',text)
  relevant=[re.sub(r'\s+',' ',s).strip()for s in sentences if re.search(r'粵語|普通話|英語|兩文三語|授課語言|教學語言|language of instruction|medium of instruction|English.medi|bilingual|trilingual',s,re.I)]
  # Navigation labels and huge unsegmented strings stay outside accepted candidates.
  passages=list(dict.fromkeys(s for s in relevant if 8<=len(s)<=650))[:15]
  result.update({'finalUrl':final,'sha256':hashlib.sha256(raw).hexdigest(),'identityInPage':identity,'title':' '.join(p.xpath('//title/text()')),'passages':passages})
 except Exception as ex:result['error']=f'{type(ex).__name__}: {ex}'
 return result
result=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6)as pool:
 futures={pool.submit(one,q):q for q in queue}
 for f in concurrent.futures.as_completed(futures):
  result.append(f.result())
  if len(result)%25==0:
   pathlib.Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
   print(json.dumps({'done':len(result),'total':len(queue),'errors':sum('error'in x for x in result),'withPassages':sum(bool(x.get('passages'))for x in result)}),flush=True)
pathlib.Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('finished',len(result),flush=True)

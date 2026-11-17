import concurrent.futures as cf,html,json,re,subprocess,sys,xml.etree.ElementTree as ET
from pathlib import Path
from html.parser import HTMLParser
origin=sys.argv[1].rstrip('/')
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.meta={};self.links=[];self.h1=0;self.skip=False;self.visible=[];self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='meta':self.meta[d.get('name',d.get('property',''))]=d.get('content','')
  if t=='link':self.links.append(d)
  if t=='h1':self.h1+=1
  if t in ('script','style'):self.skip=True
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=False
 def handle_data(self,s):
  if not self.skip:self.visible.append(s)
def get(path):return subprocess.check_output(['curl','-fsSL','--retry','2','--max-time','40',origin+path]).decode()
paths=['/','/cn','/reports/rc','/cn/reports/rc','/schools/kindergarten/rc','/cn/schools/kindergarten/rc','/reports','/cn/reports','/compare','/cn/compare','/blog/raimondi-kg-interview-guide','/cn/blog/raimondi-kg-interview-guide','/blog/primary-net-41-analysis','/cn/blog/primary-net-41-analysis']
def check(path):
 s=get(path);p=Page(s);v=' '.join(p.visible)
 assert p.h1==1,(path,'h1',p.h1)
 assert 'noindex' not in p.meta.get('robots',''),(path,'noindex')
 assert any(x.get('rel')=='canonical' and x.get('href','').rstrip('/')==('https://hkschool.guide'+path).rstrip('/') for x in p.links),(path,'canonical')
 if path in ('/','/cn'):
  for x in ('434/524','418/557','82.8%','75.0%'):assert x in v,(path,x)
  for x in ('48 校网官津','48 校網官津','79.6%','70.4%','全港最低'):assert x not in v,(path,x)
 if path.endswith('/reports/rc'):
  for x in ('40,800','2027/28','2026/27','11月14日','21日'):assert x in v,(path,x)
  for x in ('page_id=5175','page_id=4713'):assert x in s,(path,x)
  for x in ('page_id=3933','一条龙保障','一條龍保障','15年一贯','15年一貫','K3成功概率极低'):assert x not in s,(path,x)
  assert '2027/28' in p.meta['description']
  schemas=re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S)
  nodes=[]
  for raw in schemas:
   d=json.loads(raw);nodes.extend(d.get('@graph',[d]))
  a=next(x for x in nodes if x.get('@type')=='Article')
  assert a['dateModified'].startswith('2026-11-17'),a['dateModified']
  assert '5175' in str(a.get('citation')) and '4713' in str(a.get('citation'))
 if path.endswith('/schools/kindergarten/rc'):
  assert 'page_id=3933' not in s and '5175' in s and '4713' in s
 return {'path':path,'h1':p.h1,'result':'PASS'}
with cf.ThreadPoolExecutor(4) as ex:rows=list(ex.map(check,paths))
def urls(s):return {x.text for x in ET.fromstring(s).iter() if x.tag.endswith('}loc')}
before=urls(Path('/tmp/high-fix-sitemap-before.xml').read_text());after=urls(get('/sitemap.xml'));assert before==after,{'lost':list(before-after),'added':list(after-before)}
r={'origin':origin,'pages':rows,'sitemapBefore':len(before),'sitemapAfter':len(after),'lostUrls':0}
Path('/tmp/high-fix-live-result.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n');print(json.dumps(r,ensure_ascii=False,indent=2))

from pathlib import Path
from html.parser import HTMLParser
import concurrent.futures as cf,json,re,subprocess
origin='http://localhost:3427';root=Path(__file__).resolve().parent
slugs=['kg-parent-child-interview-parents-guide','kg-interview-results-waitlist-registration','kg-interview-language-cantonese-putonghua','kg-interview-day-checklist','kg-interview-child-silent']
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.meta={};self.links=[];self.schema=[];self.inSchema=False;self.buf='';self.h1=0;self.worksheets=0;self.fields=0;self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a)
  if t=='meta':self.meta[d.get('name',d.get('property',''))]=d.get('content','')
  if t=='link':self.links.append(d)
  if t=='h1':self.h1+=1
  if t=='section' and 'parent-worksheet' in d.get('class',''):self.worksheets+=1
  if t in ['textarea','input']:self.fields+=1
  if t=='script' and d.get('type')=='application/ld+json':self.inSchema=True;self.buf=''
 def handle_data(self,s):
  if self.inSchema:self.buf+=s
 def handle_endtag(self,t):
  if t=='script' and self.inSchema:self.schema.append(json.loads(self.buf));self.inSchema=False

def get(path):return subprocess.check_output(['curl','-fsSL','--retry','2','--max-time','45',origin+path]).decode()
def check(path):
 s=get(path);p=Page(s);assert p.h1==1,(path,'h1')
 assert any(x.get('rel')=='canonical' and x.get('href')=='https://hkschool.guide'+path for x in p.links),(path,'canonical')
 assert 'noindex' not in p.meta.get('robots','')
 assert {'zh-Hant-HK','zh-Hans','x-default'} <= {x.get('hreflang') for x in p.links}
 if '/blog/kg-' in path:
  assert p.worksheets==1 and p.fields>0,(path,'worksheet')
  assert ('附' in p.meta['description']) and ('工具' in s or '编辑' in s or '編輯' in s)
 if path.endswith('/about/data-methodology'):
  assert 'Max Jia' in s and 'id="corrections"' in s and '/brand/wechat-qr.jpg' in s and '/brand/whatsapp-qr.jpg' in s
  assert 'Max Jia' in p.meta['description'] and 'sameAs' not in s
 if re.search(r'/reports/(pc|canaan|rc)$',path):
  slug=path.rsplit('/',1)[1];locale='sc' if path.startswith('/cn') else 'tc';expected=f'https://hkschool.guide/covers/reports/{slug}-{locale}.png'
  assert p.meta.get('og:image')==expected,(path,p.meta.get('og:image'))
  nodes=[n for g in p.schema for n in g.get('@graph',[g])];a=next(n for n in nodes if n.get('@type')=='Article');assert a['image']==expected and 'datePublished' not in a
  expectedDate={'pc':'2026-11-04','canaan':'2026-11-05','rc':'2026-11-17'}[slug];assert a['dateModified']==expectedDate and bool(re.search(f'<time[^>]+datetime="{expectedDate}"',s,re.I)),(path,'date')
 return {'path':path,'result':'PASS','worksheets':p.worksheets,'fields':p.fields}
paths=[prefix+path for prefix in ['', '/cn'] for path in ['/about/data-methodology']+['/blog/'+s for s in slugs]+['/reports/'+s for s in ['pc','canaan','rc']]+['/blog','/blog/topics/kindergarten-interviews']]
with cf.ThreadPoolExecutor(1) as ex:rows=list(ex.map(check,paths))
result={'origin':origin,'pages':len(rows),'results':rows};(root/'local-page-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2))

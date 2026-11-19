"""Compare crawlable content/SEO and initial JS in two local production builds."""
import json, re, gzip, sys, hashlib
from pathlib import Path
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip=0; self.jsonld=False; self.buffer=''; self.text=[]; self.seo=[]; self.links=[]; self.schemas=[]; self.scripts=[]; self.fields=[]; self.images=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ['script','style']:
            self.skip+=1
            if tag=='script' and a.get('type')=='application/ld+json': self.jsonld=True;self.buffer=''
            if tag=='script' and a.get('src','').startswith('/_next/') and a['src'].endswith('.js'): self.scripts.append(a['src'])
        if tag in ['title','h1','h2','h3','h4','h5','h6']: self.seo.append([tag])
        if tag=='html': self.seo.append(['html',a.get('lang')])
        if tag=='meta' and (a.get('name') or a.get('property')): self.seo.append(['meta',sorted(a.items())])
        if tag=='link' and a.get('rel') in ['canonical','alternate']: self.seo.append(['link',sorted(a.items())])
        if tag=='img': self.images.append([a.get('src'),a.get('alt')])
        if tag=='a': self.links.append(a.get('href',''))
        if tag in ['input','select','textarea']: self.fields.append([tag, a.get('type'),a.get('placeholder'),a.get('aria-label')])
    def handle_endtag(self,tag):
        if tag in ['script','style']:
            if self.jsonld:
                self.schemas.append(json.loads(self.buffer));self.jsonld=False
            self.skip=max(0,self.skip-1)
    def handle_data(self,data):
        if self.jsonld:self.buffer+=data
        if not self.skip:self.text.append(data)
    def facts(self):
        return {'text':re.sub(r'\s+',' ',''.join(self.text)).strip(),'seo':self.seo,'links':self.links,'schemas':self.schemas,'fields':self.fields,'images':self.images}

def parse(p):
    d=Page();d.feed(p.read_text());return d

def size(root,scripts):
    files=[root/'.next'/s.removeprefix('/_next/') for s in set(scripts)]
    assert all(p.is_file() for p in files)
    return {'files':len(files),'rawBytes':sum(p.stat().st_size for p in files),'gzipBytes':sum(len(gzip.compress(p.read_bytes(),mtime=0)) for p in files)}


from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode
origin=sys.argv[1].rstrip('/')
preview=Path(sys.argv[2]); output=Path(sys.argv[3]); expectedDeployment=sys.argv[4]
paths=['/reports/spccps', '/reports/dgjs', '/reports/dbs', '/reports/ywps', '/reports/tsl', '/reports/pkcps', '/reports/plk-choi-kai-yau-primary', '/reports/isf-academy-primary', '/reports/cis-primary', '/reports/hkis-primary', '/reports/think', '/reports', '/', '/blog', '/blog/topics/kindergarten-interviews', '/schools/kindergarten/directory', '/schools/primary/directory', '/schools/secondary/directory', '/about/data-methodology', '/reports/pkps', '/reports/cckg', '/reports/dbs-secondary', '/reports/fkgs', '/reports/tlps', '/districts/sha-tin', '/districts/sham-shui-po', '/districts/yau-tsim-mong', '/blog/primary-net-41-analysis', '/blog/wan-chai-secondary-net-analysis']
paths=[p for path in paths for p in [path, "/cn"+("" if path=="/" else path)]]
def verify(url):
    import subprocess
    raw=subprocess.check_output(['curl','-fsSL','--retry','2','--max-time','40',origin+url]).decode()
    live=Page();live.feed(raw)
    rel=('index' if url=='/' else url.strip('/'))+'.html'
    local=parse(preview/'.next/server/app'/rel)
    # Next/Vercel appends its verified deployment ID to static image URLs, including unoptimized images.
    for image in live.images:
        if not image[0]: continue
        parts=urlsplit(image[0]);query=parse_qsl(parts.query,keep_blank_values=True)
        deployment=[v for k,v in query if k=='dpl']
        if deployment:
            assert deployment==[expectedDeployment],(url,'unexpected image deployment',deployment)
            image[0]=urlunsplit(parts._replace(query=urlencode([(k,v) for k,v in query if k!='dpl'])))
    a,b=local.facts(),live.facts(); differences=[k for k in a if a[k]!=b[k]]
    assert not differences,(url,differences)
    return {'path':url,'result':'PASS','description':next((dict(x[1]).get('content') for x in live.seo if x[0]=='meta' and dict(x[1]).get('name')=='description'),None)}
with ThreadPoolExecutor(3) as pool: rows=list(pool.map(verify,paths))
output.write_text(json.dumps({'origin':origin,'deployment':expectedDeployment,'pages':len(rows),'imageComparison':'Only the verified current deployment dpl parameter is normalized; source, width, quality and alt must match','results':rows},ensure_ascii=False,indent=2)+'\n')
print(len(rows),'live pages match reviewed content and SEO')

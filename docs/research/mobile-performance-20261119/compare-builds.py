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

before,after=map(Path,sys.argv[1:3]);out=Path(sys.argv[3]);out.mkdir(parents=True,exist_ok=True)
a=before/'.next/server/app';b=after/'.next/server/app'
files=sorted(p.relative_to(a) for p in a.rglob('*.html'))
assert set(files)=={p.relative_to(b) for p in b.rglob('*.html')},'Route inventory changed'
mismatches=[];rows=[]
for rel in files:
    x,y=parse(a/rel),parse(b/rel)
    fx,fy=x.facts(),y.facts()
    changes=[k for k in fx if fx[k]!=fy[k]]
    if changes:
        mismatches.append({'path':str(rel),'changed':changes})
        if len(mismatches)<5:
            (out/(str(rel).replace('/','_')+'.before.json')).write_text(json.dumps(fx,ensure_ascii=False,indent=2))
            (out/(str(rel).replace('/','_')+'.after.json')).write_text(json.dumps(fy,ensure_ascii=False,indent=2))
    if str(rel) in ['blog.html','cn/blog.html','blog/topics/kindergarten-interviews.html','cn/blog/topics/kindergarten-interviews.html','schools/kindergarten/directory.html','cn/schools/kindergarten/directory.html','index.html','cn.html']:
        rows.append({'path':str(rel),'before':size(before,x.scripts),'after':size(after,y.scripts),'htmlBeforeBytes':(a/rel).stat().st_size,'htmlAfterBytes':(b/rel).stat().st_size})
result={'pagesCompared':len(files),'mismatches':mismatches,'initialFirstPartyJs':rows,'limits':['Raw/gzip totals are static asset sizes, not mobile transfer timing or Core Web Vitals.','Same locked dependencies and Next.js 16.3.0 Turbopack; two isolated local builds.','Search converter is loaded only after text entry and is excluded from initial scripts.']}
(out/'build-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'pages':len(files),'mismatches':mismatches[:15],'js':rows},ensure_ascii=False,indent=2))
assert not mismatches,'Content or SEO regression found'

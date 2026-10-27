"""Structural gates for the reviewed 32-guide collection; facts still require editorial review."""
import argparse
import collections
import html
import json
import pathlib
import re
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

parser = argparse.ArgumentParser()
parser.add_argument('--ids', help='Comma-separated batch IDs; default: all 32')
parser.add_argument('--output')
args = parser.parse_args()
root = pathlib.Path.cwd()
catalog = json.loads((root / 'src/content/core-guides.json').read_text())
meta = {r['slug']: r for r in json.loads((root / 'src/content/blog-meta.json').read_text())}
selected = set(args.ids.split(',')) if args.ids else {r['id'] for r in catalog}
errors, warnings, records = [], [], []
shared_paragraphs = collections.defaultdict(list)


class ReadGuide(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.hrefs, self.h2 = [], [], 0
        self.tables, self.th, self.wraps, self.nav = 0, 0, 0, 0
        self.table_depth, self.in_thead = 0, 0
        self.tables_with_head, self.current_head = [], False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'a' and a.get('href'): self.hrefs.append(a['href'])
        if tag == 'h2': self.h2 += 1
        if tag == 'nav' and 'guide-contents' in a.get('class', ''): self.nav += 1
        if tag == 'div' and 'blog-table-wrap' in a.get('class', ''): self.wraps += 1
        if tag == 'table': self.tables += 1; self.table_depth += 1; self.current_head = False
        if tag == 'thead': self.in_thead += 1; self.current_head = True
        if tag == 'th': self.th += 1
    def handle_endtag(self, tag):
        if tag == 'thead': self.in_thead -= 1
        if tag == 'table': self.table_depth -= 1; self.tables_with_head.append(self.current_head)


for guide in catalog:
    if guide['id'] not in selected: continue
    gid, slug = guide['id'], guide['slug']
    file = root / f'src/content/blog/{slug}.json'
    local_errors = []
    if not file.exists(): errors.append(f'{gid}: missing article'); continue
    post = json.loads(file.read_text())
    body = post.get('body', '')
    doc = ReadGuide(); doc.feed(body)
    text = html.unescape(re.sub('<[^>]+>', ' ', body))
    chars = len(re.findall(r'[\u3400-\u9fff]', text))
    if post.get('slug') != slug: local_errors.append('slug mismatch')
    if post.get('premium'): local_errors.append('paywall enabled')
    if slug not in meta: local_errors.append('unregistered metadata')
    else:
        entry = meta[slug]
        if entry.get('title') != post['title']: local_errors.append('metadata/H1 source mismatch')
        for field in ['tease', 'scTitle', 'scTease', 'verifiedAt']:
            if not entry.get(field): local_errors.append(f'missing {field}')
        if not (root / 'public' / entry['cover'].lstrip('/')).exists(): local_errors.append('missing cover')
    if not (root / f'public/covers/og/{slug}.png').exists(): local_errors.append('missing share image')
    if doc.h2 < 5: local_errors.append('insufficient section structure')
    if not doc.nav: local_errors.append('no reading navigation')
    if not doc.tables or doc.wraps < doc.tables: local_errors.append('missing scrollable table wrapper')
    if not all(doc.tables_with_head): local_errors.append('table without thead')
    if len(doc.ids) != len(set(doc.ids)): local_errors.append('duplicate HTML IDs')
    for href in doc.hrefs:
        parsed = urlsplit(href)
        if href.startswith('#') and unquote(parsed.fragment) not in doc.ids: local_errors.append(f'broken anchor {href}')
        if href.startswith('/blog/') and not href.startswith('/blog/topics/'):
            target = parsed.path.split('/')[-1]
            if not (root / f'src/content/blog/{target}.json').exists(): local_errors.append(f'missing article target {href}')
        if href.startswith('/reports/') and not (root / f'src/content/reports/{parsed.path.split("/")[-1]}.json').exists(): local_errors.append(f'missing report target {href}')
        if href.startswith(('../', './', '/cn/')): local_errors.append(f'noncanonical source link {href}')
    sources = sorted(set(href for href in doc.hrefs if href.startswith(('https://', 'http://'))))
    if len(sources) < 3: local_errors.append('fewer than three source URLs')
    if '2026年10月27日' not in text: local_errors.append('missing verification date')
    if len(post.get('faq', [])) < 2: local_errors.append('missing structured FAQ')
    for faq in post.get('faq', []):
        if faq['question'] not in text: local_errors.append('schema FAQ absent from visible body')
    if re.search(r'TODO|TBD|待补充|lorem ipsum', text, re.I): local_errors.append('placeholder text')
    if chars < 1500: warnings.append(f'{gid}: {chars} CJK chars; manually assess depth, not a word-count pass')
    paragraphs = []
    for p in re.findall(r'<p\b[^>]*>(.*?)</p>', body, re.S):
        p = re.sub(r'\s+', '', html.unescape(re.sub('<[^>]+>', '', p)))
        if len(p) >= 65 and not p.startswith(('资料核', '本文资料', '手机')):
            paragraphs.append(p); shared_paragraphs[p].append(gid)
    if len(paragraphs) != len(set(paragraphs)): local_errors.append('repeated substantive paragraph within article')
    for item in local_errors: errors.append(f'{gid}: {item}')
    records.append({'id': gid, 'slug': slug, 'cjkCharacters': chars, 'sections': doc.h2, 'tables': doc.tables, 'sourceUrls': sources, 'internalLinks': [h for h in doc.hrefs if h.startswith('/')], 'errors': local_errors})

duplicates = [{'ids': sorted(set(ids)), 'text': text} for text, ids in shared_paragraphs.items() if len(set(ids)) > 1]
result = {'checked': len(records), 'errors': errors, 'warnings': warnings, 'crossArticleRepeatedParagraphs': duplicates, 'articles': records}
if args.output: pathlib.Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'checked': len(records), 'errors': errors, 'warnings': warnings, 'crossArticleRepeatedParagraphs': [{'ids': r['ids'], 'text': r['text'][:90]} for r in duplicates]}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))

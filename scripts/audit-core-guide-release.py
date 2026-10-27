"""Read-only local HTTP acceptance for the 32-guide collection and its links."""
import argparse
import concurrent.futures
import json
import pathlib
import re
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser

p = argparse.ArgumentParser()
p.add_argument('--base', required=True)
p.add_argument('--output', required=True)
args = p.parse_args()
catalog = json.loads(pathlib.Path('src/content/core-guides.json').read_text())
meta = json.loads(pathlib.Path('src/content/blog-meta.json').read_text())
targets, fragments = set(), []


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.h1 = 0
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'a' and a.get('href'): self.links.append(a['href'])


for row in meta:
    body = json.loads(pathlib.Path(f"src/content/blog/{row['slug']}.json").read_text())['body']
    parsed = Links()
    parsed.feed(body)
    for prefix in ['', '/cn']:
        origin = f"{prefix}/blog/{row['slug']}"
        targets.add(origin)
        for href in parsed.links:
            if href.startswith('#'):
                continue
            if not href.startswith('/') or href.startswith('//'):
                continue
            if re.match(r'^/(blog|reports|tools|schools|planning|shortlist)(?=[/"?#]|$)', href):
                href = prefix + href
            part = urllib.parse.urlsplit(href)
            route = urllib.parse.urlunsplit(('', '', part.path, part.query, ''))
            targets.add(route)
            if part.fragment: fragments.append((origin, route, urllib.parse.unquote(part.fragment)))

sidebar = json.loads(pathlib.Path('docs/research/school-directory-guides-plan-2026-10-27/implementation/core32-sidebar-source-final.json').read_text())
for row in sidebar['rows']:
    for prefix in ['', '/cn']:
        part = urllib.parse.urlsplit(prefix + row['href'])
        route = urllib.parse.urlunsplit(('', '', part.path, part.query, ''))
        targets.add(route)
        if part.fragment: fragments.append((row['article'], route, part.fragment))
for prefix in ['', '/cn']:
    for stage in ['kindergarten', 'primary', 'secondary']:
        targets.update([f'{prefix}/schools/{stage}', f'{prefix}/schools/{stage}/directory'])


def fetch(route):
    try:
        with urllib.request.urlopen(args.base.rstrip('/') + route, timeout=25) as response:
            data = response.read()
            mime = response.headers.get_content_type()
            parsed = Links()
            if mime == 'text/html': parsed.feed(data.decode('utf8'))
            return route, {'status': response.status, 'mime': mime, 'bytes': len(data), 'h1': parsed.h1}, parsed.ids
    except Exception as error:
        return route, {'error': str(error)}, set()


results, ids = {}, {}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for route, result, anchors in pool.map(fetch, sorted(targets)):
        results[route], ids[route] = result, anchors
errors = [f'{route}: {r}' for route, r in results.items() if r.get('status') != 200 or (r.get('mime') == 'text/html' and r.get('h1') != 1)]
errors += [f'{origin}: missing {route}#{anchor}' for origin, route, anchor in fragments if anchor not in ids[route]]
out = {'base': args.base, 'articles': len(meta), 'coreGuides': len(catalog), 'uniqueRoutesChecked': len(results), 'crossPageAnchorsChecked': len(fragments), 'errors': errors, 'results': results}
pathlib.Path(args.output).write_text(json.dumps(out, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({k: v for k, v in out.items() if k != 'results'}, ensure_ascii=False, indent=2))
raise SystemExit(bool(errors))

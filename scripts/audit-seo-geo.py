#!/usr/bin/env python3
"""Bounded HTML audit. Captures server HTML, not indexation or field CWV."""
import argparse
import hashlib
import json
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.anchors, self.headings = {}, [], [], []
        self.schemas, self.schema_errors, self.images = [], [], []
        self.title, self.text, self.json_text = [], [], []
        self.in_title, self.skip, self.heading = False, [], None
        self.jsonld = False
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content')
        if tag == 'link': self.links.append(a)
        if tag == 'a' and a.get('href'): self.anchors.append(a['href'])
        if tag == 'img': self.images.append(a)
        if tag == 'title': self.in_title = True
        if tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6'): self.heading = [tag, '']
        if tag in ('script', 'style'):
            self.skip.append(tag)
            self.jsonld = tag == 'script' and a.get('type') == 'application/ld+json'
            self.json_text = []

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if self.heading and tag == self.heading[0]:
            self.headings.append(self.heading)
            self.heading = None
        if tag in ('script', 'style') and self.skip:
            if self.jsonld:
                try: self.schemas.append(json.loads(''.join(self.json_text)))
                except ValueError as err: self.schema_errors.append(str(err))
            self.skip.pop()
            self.jsonld = False

    def handle_data(self, value):
        if self.jsonld: self.json_text.append(value)
        if self.skip: return
        if self.in_title: self.title.append(value)
        if self.heading: self.heading[1] += value
        self.text.append(value)


def schema_types(value):
    if isinstance(value, list): return [t for x in value for t in schema_types(x)]
    if isinstance(value, dict):
        own = value.get('@type', [])
        return ([own] if isinstance(own, str) else own) + [t for k, x in value.items() if k != '@type' for t in schema_types(x)]
    return []


def fetch(url):
    started = time.monotonic()
    request = urllib.request.Request(url, headers={'User-Agent': 'HKSchoolGuide-SEO-Audit/1.0'})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.geturl(), dict(response.headers), response.read(), round(time.monotonic() - started, 3)
    except urllib.error.HTTPError as error:
        return error.code, error.geturl(), dict(error.headers), error.read(), round(time.monotonic() - started, 3)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', default='https://hkschool.guide')
    parser.add_argument('--output', default='/private/tmp/hkschool-seo-geo-20261025')
    args = parser.parse_args()
    base, out = args.base.rstrip('/'), Path(args.output)
    out.mkdir(parents=True, exist_ok=True)
    robots_status, _, _, robots, _ = fetch(base + '/robots.txt')
    if robots_status != 200: raise SystemExit('robots.txt could not be checked; no crawl performed')
    (out / 'robots.txt').write_bytes(robots)
    rules = urllib.robotparser.RobotFileParser()
    rules.parse(robots.decode().splitlines())
    status, _, _, sitemap, _ = fetch(base + '/sitemap.xml')
    if status != 200: raise SystemExit('sitemap unavailable')
    (out / 'sitemap.xml').write_bytes(sitemap)
    root = ET.fromstring(sitemap)
    urls = [e.text for e in root.findall('{*}url/{*}loc')]
    entries = [e for e in root.findall('{*}url')]
    paths = ['/', '/cn', '/schools', '/cn/schools']
    for stage in ('kindergarten', 'primary', 'secondary'):
        paths += [f'/schools/{stage}', f'/cn/schools/{stage}', f'/schools/{stage}/directory', f'/cn/schools/{stage}/directory']
        profiles = [urllib.parse.urlparse(u).path for u in urls if f'/schools/{stage}/' in u and '/cn/' not in u and not u.endswith('/directory')]
        for index in (0, min(55, len(profiles)-1), len(profiles)-1):
            if profiles: paths.append(profiles[index])
    paths += ['/reports', '/cn/reports', '/reports/rcps', '/cn/reports/stcat', '/reports/ying-wa-college-secondary', '/cn/reports/australian-international-school-hong-kong-secondary', '/blog', '/cn/blog', '/blog/hk-kg-k1-transparency-audit-2027-28', '/blog/through-train-guide', '/cn/blog/hk-p1-admission-guide-2027', '/blog/topics/kindergarten-admission', '/about/data-methodology', '/cn/about/data-methodology', '/planning', '/compare', '/tools/p1-school-net', '/shortlist', '/unlock']
    paths = list(dict.fromkeys(paths))[:50]
    results = []
    for index, path in enumerate(paths):
        if not rules.can_fetch('*', base + path):
            results.append({'path': path, 'skipped': 'robots'})
            continue
        try:
            status, final_url, headers, raw, elapsed = fetch(base + path)
            filename = hashlib.sha256(path.encode()).hexdigest()[:12] + '.html'
            (out / filename).write_bytes(raw)
            p = Page()
            p.feed(raw.decode('utf-8', errors='replace'))
            result = {'path': path, 'status': status, 'finalUrl': final_url, 'htmlFile': filename, 'bytes': len(raw), 'fetchSecondsNotCWV': elapsed, 'lang': p.lang, 'title': ''.join(p.title), 'meta': p.meta, 'canonical': [x.get('href') for x in p.links if x.get('rel') == 'canonical'], 'alternates': [x for x in p.links if x.get('hreflang')], 'headings': p.headings, 'schemaTypes': sorted(set(schema_types(p.schemas))), 'schemas': p.schemas, 'schemaErrors': p.schema_errors, 'links': sorted(set(p.anchors)), 'textCharacters': len(''.join(p.text)), 'imagesMissingAlt': len([i for i in p.images if 'alt' not in i]), 'xRobotsTag': headers.get('X-Robots-Tag', headers.get('x-robots-tag'))}
        except Exception as error: result = {'path': path, 'error': str(error)}
        results.append(result)
        print(json.dumps({k: result.get(k) for k in ['path', 'status', 'bytes', 'error']}, ensure_ascii=False), flush=True)
        if index < len(paths)-1: time.sleep(1)
    _, _, _, llms, _ = fetch(base + '/llms.txt')
    (out / 'llms.txt').write_bytes(llms)
    counts = {stage: len([u for u in urls if f'/cn/schools/{stage}/' in u and not u.endswith('/directory')]) for stage in ('kindergarten', 'primary', 'secondary')}
    report = {'base': base, 'capturedAtUTC': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()), 'sitemap': {'urls': len(urls), 'duplicates': len(urls)-len(set(urls)), 'languageEntriesMissing': sum(not e.findall('{*}link') for e in entries), 'schoolCounts': counts}, 'pages': results}
    (out / 'audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'output': str(out / 'audit.json'), 'pages': len(results), 'sitemap': report['sitemap']}, ensure_ascii=False))


if __name__ == '__main__': main()

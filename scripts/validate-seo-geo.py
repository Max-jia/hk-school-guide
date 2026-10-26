#!/usr/bin/env python3
"""Verify built HTML and catalogue reachability; this is not a ranking test."""
import importlib.util
import json
import sys
import urllib.parse
import xml.etree.ElementTree as ET
from pathlib import Path

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('audit', ROOT / 'scripts/audit-seo-geo.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)
BUILT = ROOT / '.next/server/app'
BASE = 'https://hkschool.guide'


def parse(path):
    p = audit.Page()
    p.feed(path.read_text())
    return p


def main():
    xml = ET.fromstring((BUILT / 'sitemap.xml.body').read_bytes())
    urls = [node.text for node in xml.findall('{*}url/{*}loc')]
    paths = {urllib.parse.urlparse(u).path for u in urls}
    errors, coverage, profiles = [], {}, []

    def check(ok, path, message):
        if not ok: errors.append({'path': path, 'error': message})

    for path in sorted(paths):
        if '/schools/' not in path: continue
        file = BUILT / (path.lstrip('/') + '.html')
        check(file.exists(), path, 'missing built HTML')
        if not file.exists(): continue
        p = parse(file)
        check(sum(h[0] == 'h1' for h in p.headings) == 1, path, 'one H1 required')
        canonical = [x.get('href') for x in p.links if x.get('rel') == 'canonical']
        check(canonical == [BASE + path], path, 'self canonical required')
        check(len([x for x in p.links if x.get('hreflang')]) == 3, path, 'three language alternates required')
        check(not p.schema_errors, path, 'JSON-LD parse error')
        check('noindex' not in (p.meta.get('robots') or ''), path, 'unexpected noindex')
        # A valid ItemList may be a standalone JSON-LD node or part of @graph.
        graphs = [node for schema in p.schemas for node in schema.get('@graph', [schema])]
        types = {node.get('@type') for node in graphs}
        check({'Organization', 'WebSite', 'BreadcrumbList'}.issubset(types), path, 'missing shared graph nodes')
        stage = path.split('/schools/', 1)[1].split('/')[0]
        prefix = '/cn' if path.startswith('/cn/') else ''
        if '/directory' in path:
            key = prefix + '/schools/' + stage
            linked = {urllib.parse.urlparse(x).path for x in p.anchors if x.startswith(key + '/')}
            school_links = {x for x in linked if x in paths and '/directory' not in x}
            coverage.setdefault(key, set()).update(school_links)
            items = next((n for n in graphs if n.get('@type') == 'ItemList'), {})
            item_paths = {urllib.parse.urlparse(x['url']).path for x in items.get('itemListElement', [])}
            check(item_paths == school_links, path, 'ItemList differs from HTML profile links')
            page = int(path.rsplit('/', 1)[1]) if '/page/' in path else 1
            check([x['position'] for x in items.get('itemListElement', [])] == list(range((page-1)*50+1, (page-1)*50+len(school_links)+1)), path, 'wrong pagination positions')
            check(items.get('numberOfItems') == len(school_links), path, 'wrong page list count')
        elif path.count('/') == (4 if prefix else 3):
            profiles.append(path)
            check({'School', 'WebPage'}.issubset(types), path, 'missing school / web page')
            school = next((n for n in graphs if n.get('@type') == 'School'), {})
            page = next((n for n in graphs if n.get('@type') == 'WebPage'), {})
            check(school.get('@id') == BASE + path.removeprefix('/cn') + '#school', path, 'unstable multilingual school ID')
            check(page.get('mainEntity', {}).get('@id') == school.get('@id'), path, 'school not linked to page')
            identifier = school.get('identifier')
            check(not identifier or (len(identifier.get('value', '')) == 6 and identifier['value'].isdigit()), path, 'EDB identifier must be six digits, not a campus / legacy registration code')
            check(bool(page.get('citation')), path, 'missing visible source citations')
            description = p.meta.get('description') or ''
            check(description and description in ''.join(p.text), path, 'meta summary absent from rendered text')
            check(p.meta.get('og:title') != '港學薈 · 香港教育規劃第一站', path, 'homepage social metadata inherited')

    for key, linked in coverage.items():
        expected = {p for p in profiles if p.startswith(key + '/')}
        check(linked == expected, key, 'profiles not fully reachable from HTML pagination')

    report_meta = json.loads((ROOT / 'src/content/report-meta.json').read_text())
    expected_reports = {r['c'] for group in ('KG_REPORTS', 'PS_REPORTS', 'SS_REPORTS') for r in report_meta[group]}
    for prefix in ('', '/cn'):
        p = parse(BUILT / (prefix.lstrip('/') + '/reports.html').lstrip('/'))
        linked = {x.removeprefix(prefix + '/reports/') for x in p.anchors if x.startswith(prefix + '/reports/')}
        check(expected_reports <= linked, prefix + '/reports', 'report index missing HTML links')
        for slug in expected_reports:
            report_path = prefix + '/reports/' + slug
            report = parse(BUILT / (report_path.lstrip('/') + '.html'))
            nodes = [node for schema in report.schemas for node in schema.get('@graph', [])]
            article = next((node for node in nodes if node.get('@type') == 'Article'), {})
            schools = article.get('about', [])
            check(bool(schools), report_path, 'missing explicitly matched school entity')
            for school in schools:
                bare = school['@id'].removeprefix(BASE).removesuffix('#school')
                check(prefix + bare in report.anchors, report_path, 'school entity lacks a visible profile link')
            check(article.get('isAccessibleForFree') is True, report_path, 'free report declaration changed')

    baseline = Path('/private/tmp/hkschool-seo-geo-20261025/sitemap.xml')
    missing_baseline = []
    if baseline.exists():
        prior = {e.text for e in ET.fromstring(baseline.read_bytes()).findall('{*}url/{*}loc')}
        missing_baseline = sorted(prior - set(urls))
        check(not missing_baseline, '/sitemap.xml', 'baseline URLs removed')
    check(len(urls) == len(set(urls)), '/sitemap.xml', 'duplicate URLs')
    result = {'sitemapUrls': len(urls), 'missingBaselineUrls': missing_baseline, 'profileHtmlChecked': len(profiles), 'catalogueCoverage': {k: len(v) for k, v in coverage.items()}, 'reportsInHtmlIndex': len(expected_reports), 'errors': errors}
    out = ROOT / 'docs/research/seo-geo-built-validation-2026-10-25.json'
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return bool(errors)


if __name__ == '__main__': sys.exit(main())

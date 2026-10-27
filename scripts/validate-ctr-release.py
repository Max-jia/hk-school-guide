#!/usr/bin/env python3
"""Acceptance of built CTR changes, not a prediction of search performance."""
import argparse
import hashlib
import importlib.util
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('audit', ROOT / 'scripts/audit-seo-geo.py')
audit = importlib.util.module_from_spec(spec)
spec.loader.exec_module(audit)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--build', required=True)
    parser.add_argument('--baseline-build', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    build, baseline = Path(args.build), Path(args.baseline_build)
    app = build / '.next/server/app'
    oldapp = baseline / '.next/server/app'
    errors = []

    def check(ok, path, message):
        if not ok:
            errors.append({'path': str(path), 'error': message})

    def page(path):
        result = audit.Page()
        result.feed((app / (path.lstrip('/') + '.html')).read_text())
        return result

    def sitemap(folder):
        return [x.text for x in ET.fromstring((folder / 'sitemap.xml.body').read_bytes()).findall('{*}url/{*}loc')]

    urls, prior = sitemap(app), sitemap(oldapp)
    check(set(urls) == set(prior), 'sitemap', 'release adds/removes a baseline public URL')
    check(len(urls) == len(set(urls)) == 5172, 'sitemap', 'unexpected sitemap inventory')
    profiles = [u.removeprefix('https://hkschool.guide') for u in urls if re.search(r'/schools/(kindergarten|primary|secondary)/(?!directory)[^/]+$', u)]
    reports = [u.removeprefix('https://hkschool.guide') for u in urls if re.search(r'/reports/[^/]+$', u)]
    titles = {}
    preview = re.compile(r'待(?:核实|核實|确认|確認)|见下[方表]|見下[方表]|详细安排及证据|詳細安排及證據')
    for path in profiles + reports:
        p = page(path)
        description = p.meta.get('description', '')
        check(not p.schema_errors, path, 'invalid JSON-LD')
        check(bool(description), path, 'missing description')
        check(len([h for h in p.headings if h[0] == 'h1']) == 1, path, 'H1 count changed')
        check('noindex' not in p.meta.get('robots', ''), path, 'unexpected noindex')
        check(not preview.search(description), path, 'preview placeholder in search description')
        title = ''.join(p.title).strip()
        check(title not in titles, path, 'duplicate title with ' + titles.get(title, ''))
        titles[title] = path
        if path in reports:
            check('深度' in title and ('报告' in title or '報告' in title), path, 'report intent not identified')
            check(not re.search(r'中[学學][（(]中[学學]部', title), path, 'duplicated secondary scope')
            nodes = [n for s in p.schemas for n in s.get('@graph', [s])]
            article = next((n for n in nodes if n.get('@type') == 'Article'), {})
            citations = article.get('citation', [])
            if isinstance(citations, str): citations = [citations]
            check(not any('/about/data-methodology' in str(c) for c in citations), path, 'methodology is not a school factual citation')
        else:
            check(description in ''.join(p.text), path, 'search summary absent from visible page')
    check(len(profiles) == 4386 and len(reports) == 460, 'inventory', 'unexpected bilingual profile/report count')
    for prefix in ('', '/cn'):
        p = page(prefix + '/reports/cckg')
        check('K2' in ''.join(p.title) and '不设K1' in p.meta.get('description', '').replace('不設', '不设'), prefix + '/reports/cckg', 'CCKG intake scope lost')

    # School records and report bodies are not to be silently replaced by an SEO pass.
    diff = subprocess.check_output(['git', 'diff', '--name-only', 'e689884d', '--', 'src/content'], cwd=ROOT, text=True).splitlines()
    history = json.loads((ROOT / 'docs/research/seo-geo-ctr-2026-10-27/historical-blog-maintenance.json').read_text())
    allowed = {'src/content/blog-meta.json'} | {'src/content/blog/' + s + '.json' for s in history['metadataRowsChanged']}
    check(set(diff) <= allowed, 'src/content', 'unintended school data, report body or core guide edit')
    old_meta = json.loads(subprocess.check_output(['git', 'show', 'e689884d:src/content/blog-meta.json'], cwd=ROOT, text=True))
    new_meta = json.loads((ROOT / 'src/content/blog-meta.json').read_text())
    old_by = {x['slug']: x for x in old_meta}
    new_by = {x['slug']: x for x in new_meta}
    check(old_by.keys() == new_by.keys(), 'blog-meta', 'article inventory changed')
    for slug in old_by:
        if slug not in history['metadataRowsChanged']:
            check(old_by[slug] == new_by[slug], slug, 'unrelated article metadata changed')
        else:
            for field in ('date', 'publishedAt', 'verifiedAt'):
                check(old_by[slug].get(field) == new_by[slug].get(field), slug, 'publication/verification date overwritten')
    for entry in history['records']:
        slug = entry['slug']
        content = json.loads((ROOT / 'src/content/blog' / (slug + '.json')).read_text())
        check(hashlib.sha256(content['body'].encode()).hexdigest() == entry['bodySha256'], slug, 'unreviewed article change')
        for prefix in ('', '/cn'):
            p = page(prefix + '/blog/' + slug)
            check('2026' in ''.join(p.text), slug, 'historical window missing in rendered text')
            check(bool(p.meta.get('og:image')), slug, 'social image missing')
    localized = json.loads((ROOT / 'docs/research/seo-geo-ctr-2026-10-27/blog-metadata-validation.json').read_text())
    for entry in localized['rows']:
        path = ('/cn' if entry['locale'] == 'sc' else '') + '/blog/' + entry['slug']
        p = page(path)
        check(''.join(p.title).strip() == entry['title'] + (' | 港学荟' if entry['locale'] == 'sc' else ' | 港學薈'), path, 'built title differs from locale-normalized editorial title')
        check(p.meta.get('description') == entry['description'], path, 'built description differs from accepted locale')
    # Verify the runtime snapshot has all edited application/public files.
    changed = subprocess.check_output(['git', 'diff', '--name-only', '--', 'src', 'public'], cwd=ROOT, text=True).splitlines()
    changed += subprocess.check_output(['git', 'ls-files', '--others', '--exclude-standard', '--', 'src', 'public'], cwd=ROOT, text=True).splitlines()
    for filename in changed:
        check((build / filename).exists() and (ROOT / filename).read_bytes() == (build / filename).read_bytes(), filename, 'built source snapshot differs from final source')
    ico = (app / 'favicon.ico.body').read_bytes()
    check(ico[:6] == b'\x00\x00\x01\x00\x01\x00', 'favicon', 'invalid single-image ICO header')
    check(ico[6:8] == bytes([48, 48]), 'favicon', 'favicon frame is not 48 square')
    check((app / 'apple-icon.png.body').exists(), 'apple icon', 'missing compiled icon route')
    check((ROOT / 'src/app/robots.ts').read_bytes() == (baseline / 'src/app/robots.ts').read_bytes(), 'robots', 'crawler policy changed')
    result = {'baseline': 'e689884d012690f575a0aeb9c09a58fbc32fb9f7', 'build': str(build), 'sitemapUrls': len(urls), 'profilesChecked': len(profiles), 'reportsChecked': len(reports), 'uniqueTitles': len(titles), 'blogLocaleMetadataChecked': len(localized['rows']), 'historicalArticles': len(history['records']), 'coreGuideAndSchoolDataPreserved': not (set(diff) - allowed), 'errors': errors}
    Path(args.output).write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())

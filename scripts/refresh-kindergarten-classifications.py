#!/usr/bin/env python3
"""Refresh school nature/curriculum from the public KGP 2026/27 filtered lists.

Use --cache-dir to read previously downloaded kg-type-list-*.html evidence.
The website's L filter also matches NL; subtract the explicit NL results.
Never classify using words in a school's name or the registration term 私立.
"""
import argparse
import concurrent.futures
import json
import re
import urllib.request
from datetime import date
from pathlib import Path

QUERIES = {
    'npm': ('nature', '非牟利', 'school-category=non-profit-making'),
    'pi': ('nature', '私立獨立', 'school-category=private-independent'),
    'local': ('curriculum', '本地', 'curriculum-type=L'),
    'non-local': ('curriculum', '非本地', 'curriculum-type=NL'),
    'mixed': ('curriculum', '本地及非本地', 'curriculum-type=Both'),
}
BASE = 'https://kgp2026.kindergartenprofile.com/'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cache-dir', type=Path)
    args = parser.parse_args()

    def read(key):
        if args.cache_dir:
            text = (args.cache_dir / f'kg-type-list-{key}.html').read_text()
        else:
            with urllib.request.urlopen(BASE + '?' + QUERIES[key][2], timeout=45) as response:
                text = response.read().decode('utf-8')
        ids = set(re.findall(r'schid=(\d{10})', text))
        if not ids:
            raise ValueError(f'No school campus IDs found for {key}; keep the existing data')
        return key, ids

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        groups = dict(pool.map(read, QUERIES))
    if groups['npm'] & groups['pi'] or groups['mixed'] & groups['non-local']:
        raise ValueError('Conflicting official classifications; review before replacing data')
    groups['local'] -= groups['non-local'] | groups['mixed']
    campuses = {}
    for key, (field, label, _) in QUERIES.items():
        for campus in sorted(groups[key]):
            record = campuses.setdefault(campus, {})
            if field in record:
                raise ValueError(f'Conflicting {field} for {campus}')
            record[field] = label
    payload = {
        'checkedAt': date.today().isoformat(),
        'academicYear': '2026/27',
        'sources': {label: BASE + '?' + query for _, label, query in QUERIES.values()},
        'campuses': campuses,
    }
    destination = Path(__file__).resolve().parents[1] / 'src/content/kindergarten-classifications-2026.json'
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({key: len(ids) for key, ids in groups.items()}))


if __name__ == '__main__':
    main()

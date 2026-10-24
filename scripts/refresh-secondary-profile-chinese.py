#!/usr/bin/env python3
"""Pair the official CHSC Chinese SSP fields with existing secondary profile IDs.

This repairs the profile display only; it never rewrites the deep reports or the
English source directory used by other tools. Existing curated Chinese is kept.
"""
import argparse
import csv
import hashlib
import html
import json
import re
import unicodedata
import urllib.request
from pathlib import Path
from datetime import date

SOURCE = 'https://www.chsc.hk/datagovhk/ssp_2025_2026_tc.csv'
FIELDS = {'校訓': '校訓', '課程特色': '校本課程', '教學策略': '學習和教學策略', '主要課程重點': '學校課程主要更新重點', '語言政策': '全校語文政策'}


def normalize(value):
    return re.sub(r'[\W_]+', '', unicodedata.normalize('NFKC', value or '')).lower()


def clean(value):
    value = re.sub(r'<br\s*/?>', '\n', value or '', flags=re.I)
    value = html.unescape(re.sub(r'<[^>]*>', '', value)).replace('\r', '')
    value = re.sub(r'[ \t]+', ' ', value)
    return re.sub(r'\n\s*\n+', '\n', value).strip()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--csv', type=Path)
    parser.add_argument('--profiles', type=Path, required=True, help='Merged secondary profiles exported from school-directory-pilot')
    args = parser.parse_args()
    raw = args.csv.read_bytes() if args.csv else urllib.request.urlopen(SOURCE, timeout=60).read()
    rows = list(csv.DictReader(raw.decode('utf-8-sig').splitlines(keepends=True)))
    by_name = {}
    for row in rows:
        by_name.setdefault(normalize(row['學校名稱']), []).append(row)
    schools = json.loads(args.profiles.read_text())
    result = {}
    for school in schools:
        matches = by_name.get(normalize(school['name']), [])
        if len(matches) != 1:
            continue
        row = matches[0]
        if normalize(row['區域'].removeprefix('香港')) != normalize(school['district'].removeprefix('香港')):
            # The directory can cover relocated campuses or more than one district;
            # do not silently transfer a row across that identity boundary.
            continue
        school_id = re.sub(r'\D', '', str(school['schoolNumber']))[:6]
        if school_id in result:
            raise ValueError(f'Duplicate school identifier: {school_id}')
        result[school_id] = {
            'name': row['學校名稱'], 'district': row['區域'],
            'address': clean(row['學校地址']), 'telephone': clean(row['學校電話']),
            'fields': {label: clean(row[column]) for label, column in FIELDS.items()},
        }
    destination = Path(__file__).resolve().parents[1] / 'src/content/secondary-profile-chinese-2025-2026.json'
    payload = {'edition': '2025/26', 'checkedAt': date.today().isoformat(), 'sourceUrl': SOURCE, 'sourceSha256': hashlib.sha256(raw).hexdigest(), 'matching': 'unique normalized Chinese school name and matching district, stored by six-digit EDB school number', 'schools': result}
    destination.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'officialRows': len(rows), 'matchedProfiles': len(result)}))


if __name__ == '__main__':
    main()

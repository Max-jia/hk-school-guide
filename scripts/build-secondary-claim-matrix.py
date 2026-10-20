#!/usr/bin/env python3
"""Build a normalized, claim-level CSV and school coverage summary from the 50 ledgers.

This is a format-normalization aid, not an independent re-verification of sources.
Raw ledger cells are retained so that any automatic field mapping can be audited.
"""

from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "docs/research/secondary-school-reports-first-50-evidence-index-2026-10-20.md"
CSV_OUT = ROOT / "docs/research/secondary-school-reports-first-50-claim-matrix-2026-10-20.csv"
MD_OUT = ROOT / "docs/research/secondary-school-reports-first-50-claim-matrix-2026-10-20.md"

CLAIM_HEADER = re.compile(r"关键断言|關鍵斷言|断言|斷言|主张|主張|报告主张|报告断言|可公开表述的主张|claim|事实主张|報告主張", re.I)
SEPARATOR = re.compile(r"^\|?\s*:?-{3,}.*\|.*-{3,}.*\|?\s*$")
URL_RE = re.compile(r"https?://[^\s|)\]]+")
CLAIM_ID_RE = re.compile(r"^(?:[A-Za-z][A-Za-z0-9_-]*-)?\d+[A-Za-z]?$|^[A-Za-z][A-Za-z0-9_-]*-\d+[A-Za-z]?$|^\d+$")
HEADING_ID_RE = re.compile(r"^\s*#{2,4}\s+([A-Za-z][A-Za-z0-9_-]*-\d+[A-Za-z]?)\s*[:：—–-]?\s*(.*)$")


def cells(line: str) -> list[str]:
    raw = line.strip()
    if raw.startswith("|"):
        raw = raw[1:]
    if raw.endswith("|"):
        raw = raw[:-1]
    return [part.replace(r"\|", "|").strip() for part in re.split(r"(?<!\\)\|", raw)]


def markdown_link_text(value: str) -> str:
    return re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)


def parse_tables(lines: list[str]):
    tables = []
    consumed = set()
    i = 0
    while i + 1 < len(lines):
        if lines[i].lstrip().startswith("|") and SEPARATOR.match(lines[i + 1].strip()):
            header = cells(lines[i])
            start = i
            body = []
            dropped = []
            consumed.add(i)
            consumed.add(i + 1)
            j = i + 2
            while j < len(lines) and lines[j].lstrip().startswith("|"):
                row = cells(lines[j])
                if len(row) > len(header):
                    if len(row) - len(header) > 1:
                        # A following standalone claim row may be contiguous
                        # with the prior table but use a different schema.
                        # Leave it for the orphan-row pass below.
                        break
                    # Preserve supplemental notes in malformed rows by joining
                    # overflow into the final source column rather than losing
                    # the entire assertion.
                    row = row[: len(header) - 1] + [" || ".join(row[len(header) - 1 :])]
                if len(row) == len(header) - 1:
                    # Some hand-written ledger rows omit an empty status cell
                    # between the verification note and limitations. Restore
                    # that explicit blank instead of dropping/misaligning data.
                    status_index = next((k for k, h in enumerate(header) if re.fullmatch(r"\s*(?:状态|狀態)\s*", h)), None)
                    if status_index is not None and status_index > 0:
                        row.insert(status_index, "")
                if len(row) == len(header) and any(row):
                    body.append((j, row))
                elif any(row):
                    break
                consumed.add(j)
                j += 1
            tables.append({"start": start, "header": header, "body": body, "dropped": dropped})
            i = j
        else:
            i += 1
    return tables, consumed


def claim_table(table) -> bool:
    header = " ".join(table["header"])
    return bool(CLAIM_HEADER.search(header)) and not re.search(r"来源索引|來源索引|source index", header, re.I)


def matches_header(header: str, pattern: str) -> bool:
    return bool(re.search(pattern, header, re.I))


def is_claim_statement_header(header: str) -> bool:
    value = re.sub(r"[\s#／/：:；;]", "", header).lower()
    if re.fullmatch(r"(?:claim)?id|编号|編號|序号|序號|#", value):
        return False
    return bool(CLAIM_HEADER.search(header))


def values_for(headers: list[str], row: list[str], pattern: str) -> list[str]:
    return [row[i] for i, h in enumerate(headers) if i < len(row) and matches_header(h, pattern) and row[i].strip()]


def join_values(values: list[str]) -> str:
    # Preserve distinct evidence/fields while removing accidental duplicate columns.
    unique = list(dict.fromkeys(v.strip() for v in values if v.strip()))
    return " || ".join(unique)


def infer_status(headers: list[str], row: list[str]) -> tuple[str, str]:
    status_raw = join_values(values_for(headers, row, r"状态|狀態|核验|核驗|核对|核對|判断|判斷|结论|結論|结果|結果"))
    all_text = " ".join(row)
    text = status_raw or all_text
    if re.search(r"冲突|衝突|不一致|矛盾", text):
        category = "来源冲突/口径不一致"
    elif re.search(r"已核实|已核對|已核对|已核|核实无误|核對無誤|核对无误|逐项核", text):
        if re.search(r"待确认|待核实|待核對|待核对|未公开|未能读取|无法读取|仍需|尚未|不一致", text):
            category = "已核实但含未决边界"
        else:
            category = "账本记录已核实"
    elif re.search(r"部分核实|部分核對|部分核对|间接支持|間接支持|索引可读|索引可讀|未能逐格", text):
        category = "部分核实/间接证据"
    elif re.search(r"待确认|待核实|待核對|待核对|未公开|未能读取|无法读取|尚未公布|尚待|待公布", text):
        category = "待确认/资料未公开"
    elif re.search(r"历史|舊屆|旧届|不外推", text):
        category = "限历史年度"
    elif re.search(r"平台分析|算术|算術|估算|推算|公式", text):
        category = "平台分析/计算"
    else:
        category = "账本未能自动识别状态"
    return category, status_raw


def themes_for(text: str) -> str:
    themes = []
    tests = [
        ("招生", r"招生|申请|申請|入学|入學|候补|候補|报名|報名|录取|錄取|面试|面談|甄选|甄選|学额|學額|申请人"),
        ("课程", r"课程|課程|科目|curriculum|IBDP|IBCP|A.?Level|GCSE|MYP|选科|選科|教学语言|教學語言"),
        ("费用", r"费用|費用|学费|學費|收费|收費|资助|資助|减免|減免|奖学金|獎學金|Capital Levy|fee remission"),
        ("考试与升学", r"成绩|成績|HKDSE|JUPAS|IBDP|GCE|升学|升學|考试|考試|offer|注册|註冊|毕业去向|畢業去向|分母"),
    ]
    for name, pattern in tests:
        if re.search(pattern, text, re.I):
            themes.append(name)
    return ";".join(themes) if themes else "身份/规模/支援/其他"


def field_gaps(headers: list[str], row: list[str], claim: str, source: str, period: str, stats: str, status_raw: str, limits: str):
    gaps = []
    if not claim:
        gaps.append("断言字段未映射")
    if not source:
        gaps.append("来源字段未映射")
    elif not URL_RE.search(source) and not re.search(r"\b[A-Z]{1,5}\b|来源|官方|校方|原件|报告|教育局", source):
        gaps.append("来源需回 ledger 确认")
    if not period:
        gaps.append("年度/适用范围未独立列出")
    if not stats:
        # Explicit qualitative/policy claims may not have a denominator. Keep this as a review flag.
        if re.search(r"\d|%|HK\$|人数|人次|比例|名额|學額|学额|分数|分數|成绩|成績|考生", claim):
            gaps.append("统计对象/单位/分母未独立列出")
        else:
            gaps.append("统计口径未独立列出（可能不适用，须复核）")
    if not status_raw:
        gaps.append("核对状态未独立列出")
    if not limits:
        gaps.append("限制/不可推论未独立列出")
    return gaps


def main():
    index_text = INDEX.read_text(encoding="utf-8")
    roster = []
    for line in index_text.splitlines():
        m = re.match(r"\|\s*(\d+)\s*\|\s*(.*?)\s*\|\s*`([^`]+)`\s*\|\s*\[([^\]]+)\]\(([^)]+)\)", line)
        if m:
            roster.append({"number": int(m.group(1)), "school": m.group(2), "slug": m.group(3), "ledger": Path(m.group(5)).name})
    if len(roster) != 50:
        raise SystemExit(f"Expected 50 frozen schools in evidence index, found {len(roster)}")

    matrix = []
    school_stats = []
    missing_ledger = []
    for school in roster:
        ledger_path = ROOT / "docs/research" / school["ledger"]
        if not ledger_path.exists():
            missing_ledger.append(school["slug"])
            continue
        lines = ledger_path.read_text(encoding="utf-8").splitlines()
        tables, consumed = parse_tables(lines)
        key_tables = [t for t in tables if claim_table(t)]
        if not key_tables:
            raise SystemExit(f"No claim table detected for {school['slug']} ({ledger_path.name})")
        malformed = [(t["start"] + 1, line_no + 1, row) for t in key_tables for line_no, row in t["dropped"]]
        if malformed:
            details = "; ".join(f"table line {table_line}, row line {row_line}: {row!r}" for table_line, row_line, row in malformed[:5])
            raise SystemExit(f"Unmapped non-empty claim-table rows in {ledger_path.name}: {details}")

        # Claim ledgers sometimes put one assertion in a table below a numbered
        # heading instead of repeating the ID as a table column (notably SPCC).
        headings = []
        for heading_line, heading_text in enumerate(lines):
            match = HEADING_ID_RE.match(heading_text)
            if match:
                headings.append((heading_line, match.group(1), match.group(2).strip()))

        def heading_for(line_no: int):
            prior = [item for item in headings if item[0] < line_no]
            return prior[-1] if prior else None

        entries = []
        claimed_lines = set()
        for table in key_tables:
            section = heading_for(table["start"])
            for line_no, row in table["body"]:
                entries.append((line_no, table["header"], row, "table", section))
                claimed_lines.add(line_no)
        # Later ledger updates are sometimes appended as isolated pipe rows with no repeated header.
        claim_headers = [t["header"] for t in key_tables]
        for line_no, line in enumerate(lines):
            if line_no in consumed or line_no in claimed_lines or not line.lstrip().startswith("|"):
                continue
            row = cells(line)
            if len(row) < 3 or not CLAIM_ID_RE.match(row[0].strip()):
                continue
            candidates = [h for h in claim_headers if len(h) == len(row)]
            if candidates and len(markdown_link_text(row[1])) > 12:
                entries.append((line_no, candidates[0], row, "appended row; header inferred by column count", heading_for(line_no)))

        school_counter = Counter()
        for seq, (line_no, headers, row, row_kind, section) in enumerate(sorted(entries, key=lambda x: x[0]), start=1):
            padded = row + [""] * max(0, len(headers) - len(row))
            claim = join_values([padded[i] for i, h in enumerate(headers) if i < len(padded) and is_claim_statement_header(h) and padded[i].strip()])
            position = join_values(values_for(headers, padded, r"章节|章節|位置|字段|字段"))
            if not position and section and section[2]:
                position = f"{section[1]}：{section[2]}"
            source = join_values(values_for(headers, padded, r"来源|來源|证据|證據|原始来源|官方来源|原件|official source"))
            period = join_values(values_for(headers, padded, r"年度|年份|适用|適用|时间|時間|cohort|范围|範圍|发布|發布|更新"))
            stats = join_values(values_for(headers, padded, r"分母|分子|统计对象|統計對象|统计单位|統計單位|对象与口径|對象與口徑|数据／分母|數據／分母|统计口径|統計口徑|单位|單位|公式|定义|定義"))
            status = join_values(values_for(headers, padded, r"状态|狀態|核验|核驗|核对|核對|判断|判斷|结论|結論|结果|結果"))
            limits = join_values(values_for(headers, padded, r"限制|边界|邊界|不能推出|不可推论|不可推論|后续动作|後續動作|状态与限制|核对状态"))
            if not claim:
                # A few ledgers use a numbered claim heading and a table whose
                # first column is already the assertion. Never use arbitrary
                # source/status cells as a silent claim fallback.
                claim_index = next((i for i, h in enumerate(headers) if is_claim_statement_header(h)), None)
                if claim_index is not None and claim_index < len(padded):
                    claim = padded[claim_index]
            source_urls = list(dict.fromkeys(URL_RE.findall(source)))
            status_class, status_text = infer_status(headers, padded)
            gaps = field_gaps(headers, padded, claim, source, period, stats, status or status_text, limits)
            raw_fields = [{"field": h, "value": padded[i]} for i, h in enumerate(headers) if i < len(padded) and padded[i]]
            row_data = {
                "名单序号": school["number"],
                "学校": school["school"],
                "报告slug": school["slug"],
                "claim_id": (section[1] if section and not any(matches_header(h, r"claim.?id|编号|編號|序号|序號") for h in headers) else (padded[0] if padded and CLAIM_ID_RE.match(padded[0].strip()) else f"row-{seq}")),
                "主题（自动标签，须按原文复核）": themes_for(claim + " " + position),
                "报告章节/位置（账本原文）": position or claim[:100],
                "报告关键断言（账本原文）": claim,
                "官方来源/来源ID（账本原文）": source,
                "来源URL（自动提取）": " ; ".join(source_urls),
                "发布日期/核对日（账本原文）": join_values(values_for(headers, padded, r"核对日期|核對日期|核验日期|核驗日期|本轮核验|本輪核驗|核对日|核對日|复核日|複核日")),
                "适用年度/cohort/范围（账本原文）": period,
                "统计对象/分子分母/单位（账本原文）": stats,
                "核对状态（规范分类）": status_class,
                "核对状态及原始说明": status or status_text,
                "限制/冲突/不可推论（账本原文）": limits or status_text,
                "矩阵字段待复核项": "；".join(gaps) if gaps else "无结构缺项（不代表重新核源）",
                "来源账本": school["ledger"],
                "账本行号": line_no + 1,
                "解析记录": row_kind,
                "原始字段（JSON）": json.dumps(raw_fields, ensure_ascii=False),
            }
            matrix.append(row_data)
            school_counter["claims"] += 1
            school_counter[status_class] += 1
            school_counter["rows_with_url"] += bool(source_urls)
            school_counter["rows_with_gaps"] += bool(gaps)
            school_counter["admission"] += "招生" in row_data["主题（自动标签，须按原文复核）"]
            school_counter["curriculum"] += "课程" in row_data["主题（自动标签，须按原文复核）"]
            school_counter["fees"] += "费用" in row_data["主题（自动标签，须按原文复核）"]
            school_counter["results"] += "考试与升学" in row_data["主题（自动标签，须按原文复核）"]
        school_stats.append({**school, **school_counter})

    if missing_ledger:
        raise SystemExit("Missing ledgers: " + ", ".join(missing_ledger))
    if len(school_stats) != 50:
        raise SystemExit(f"Expected 50 schools in generated matrix, got {len(school_stats)}")

    fields = list(matrix[0].keys())
    with CSV_OUT.open("w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        writer.writerows(matrix)

    total_status = Counter(row["核对状态（规范分类）"] for row in matrix)
    gap_counts = Counter()
    for row in matrix:
        for gap in row["矩阵字段待复核项"].split("；"):
            if gap and gap != "无结构缺项（不代表重新核源）":
                gap_counts[gap] += 1

    out = [
        "# 首批 50 所中学报告：关键断言统一核对矩阵",
        "",
        "生成日期：2026-10-20。冻结名单来源：`secondary-school-reports-first-50-evidence-index-2026-10-20.md`。",
        "",
        "> 本矩阵将 50 份逐校 claim ledger 的断言行统一投影到相同字段，并保留每行的原始单元格与账本定位。规范状态沿用账本文字并按规则归类；本次未重新打开全部外部来源，也没有把‘账本已有记录’提升为‘本轮独立复核通过’。任何自动标签、字段映射和缺项提示均须结合原始账本复核。",
        "",
        "## 覆盖和状态",
        "",
        f"- 冻结学校：{len(school_stats)}/50。",
        f"- 统一断言行：{len(matrix)} 行；包括账本主表及可识别的追加断言行。",
        f"- 含可提取 URL 的行：{sum(bool(row['来源URL（自动提取）']) for row in matrix)}；源账本只用来源 ID 或文字描述的记录仍保留原文，不视作缺证。",
        f"- 按账本现有表述自动归类状态：{'; '.join(f'{k} {v}' for k, v in total_status.most_common())}。这些是账本状态的机器归类，不是重新核源结论。",
        "",
        "## 规范字段",
        "",
        "CSV 每行对应一条账本断言，列包含冻结名单号、学校、slug、claim ID、主题标签、报告位置、断言、来源/来源 ID、URL、发布/核对日期、适用年度/cohort、统计对象/分子分母/单位、核对状态、限制、结构缺项、账本文件/行号及原始字段 JSON。原始文本保留在同一行，便于追溯自动映射。",
        "",
        "字段待复核项用于暴露逐校账本格式差异：如果适用年份、统计口径或状态与限制写在同一格，矩阵保留合并文本；若账本没有独立字段则标为待复核，不臆造‘不适用’或分母。",
        "",
        "## 逐校覆盖总览",
        "",
        "| # | 学校 | 断言行 | 招生 | 课程 | 费用 | 考试与升学 | 有URL | 有字段待复核 |",
        "|---:|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for s in school_stats:
        out.append(f"| {s['number']} | {s['school']} (`{s['slug']}`) | {s['claims']} | {s['admission']} | {s['curriculum']} | {s['fees']} | {s['results']} | {s['rows_with_url']} | {s['rows_with_gaps']} |")
    out += ["", "## 全矩阵文件", "", f"[下载统一断言 CSV（{len(matrix)} 行）]({CSV_OUT.name})。", "", "## 当前使用边界", "", "- 自动主题分类用于筛选，不作为完整分类验收；跨章节或同时涉及多领域的断言可带多个主题。",
            "- ‘账本记录已核实’仅是源账本现存记录；需以账本内的核对日期、来源与限定为准。‘已核实但含未决边界’、‘部分核实’、‘待确认’及来源冲突均保留，不得折叠成已通过。",
            "- CSV 中的字段待复核项是下一步逐项补正清单。只有明确写出‘不适用’、‘来源未公开’或分母/单位等内容并给出证据范围后，才可关闭对应字段；空白不等于不适用。",
            "- 矩阵完成了统一结构和 50/50 档案映射，但并不单独证明所有断言已重新核源、报告已修正或整批达到发布门槛。",
            ""]
    MD_OUT.write_text("\n".join(out), encoding="utf-8")
    print(f"schools={len(school_stats)} claims={len(matrix)} csv={CSV_OUT.relative_to(ROOT)} summary={MD_OUT.relative_to(ROOT)}")
    print("status=" + json.dumps(total_status, ensure_ascii=False))
    print("gaps=" + json.dumps(gap_counts, ensure_ascii=False))


if __name__ == "__main__":
    main()

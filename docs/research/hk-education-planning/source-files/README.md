# EDB Secondary 6 Students’ Pathway Survey 原始來源與抽取清單

> 核驗基準日：2026-10-09（香港時間）。所有原始PDF均保留原檔；文字抽取檔為可搜尋工作副本，不取代PDF。

| 年度 | 原始PDF | SHA-256 | PDF頁數 | 文字抽取副本 | 表2.1 | 表2.2 | Chart 2.5 | 表2.3 |
|---|---|---|---:|---|---|---|---|---|
| 2021 | `S6_21.pdf` | `50fcbe93764d05991e4e5029da8e8a1c28617b218e90aae49fbe3dae754497d2` | 20 | `S6_21_extracted_layout.txt` | 印刷6／PDF11 | 印刷9／PDF14 | 印刷11／PDF16 | 印刷14／PDF19 |
| 2022 | `S6_22.pdf` | `36426ab1e3fed6ea343136ca99d67a8faaf8f3c5c6bd6976ecdbe6e6c83fbc00` | 20 | `S6_22_extracted_layout.txt` | 印刷6／PDF11 | 印刷9／PDF14 | 印刷11／PDF16 | 印刷14／PDF19 |
| 2023 | `S6_23.pdf` | `71cfaebbbe8aa5a6be8001d118d68401155b7a48a936e905d3260bdc9d892d0f` | 20 | `S6_23_extracted_layout.txt` | 印刷6／PDF11 | 印刷9／PDF14 | 印刷11／PDF16 | 印刷14／PDF19 |
| 2024 | `S6_24.pdf` | `0072b0f8646679115ae5b855ca8d34b58852bea0c31789a4a00458f1b6e0c408` | 20 | `S6_24_extracted_layout.txt` | 印刷6／PDF11 | 印刷9／PDF14 | 印刷11／PDF16 | 印刷14／PDF19 |
| 2025 | `S6_25.PDF` | `c60c29844cc5abc04a58a7019c180d73e860084a5507796b83e1b3a31f20d210` | 20 | `S6_25_extracted_layout.txt` | 印刷6／PDF11 | 印刷9／PDF14 | 印刷11／PDF16 | 印刷14／PDF19 |

## Extraction and QA

- Four historic PDFs are the official EDB files placed in this directory by the user. The original files were not renamed; filename casing is retained.
- `pdfinfo` confirms each is a 20-page A4 PDF; all four historic PDFs have a readable text layer, so OCR was unnecessary.
- Extraction command: `pdftotext -layout S6_YY.pdf S6_YY_extracted_layout.txt`.
- The key table/chart pages (PDF pp.11, 14, 16, 19) were rendered and visually checked against extracted cells. Printed-page/PDF-page crosswalk is recorded above and within the datasets.
- Table 2.1 sector totals and activity-status counts reconcile; Table 2.2 course counts reconcile to the Table 2.1 full-time-study count; Chart 2.5 HK/outside-HK counts reconcile to full-time-study totals. Table 2.3 ALL destination totals reconcile to Chart 2.5 outside-HK counts; unsuppressed course columns reconcile exactly, while columns containing privacy-suppressed cells are checked against published margins without imputing hidden cells.
- 2024抽取表的Table 2.3 `**`格留空並標記`suppressed_privacy`；2025原有基準列保留字面`**`並標記同一狀態。兩年均不從總數推算隱藏值.
- Full numeric transcription: `../data/edb-s6-destinations-2021-2025-tables-2.1-2.3.csv`; Chart 2.5: `../data/edb-s6-destinations-2021-2025-chart-2.5.csv`; survey denominator/response details: `../data/edb-s6-survey-coverage-2021-2025.csv`.
- Cross-year classification notes: `../data/edb-s6-comparability-crosswalk-2021-2025.csv`; extraction analysis: `../18-phase2-edb-s6-destinations-2021-2024-extraction.md`.

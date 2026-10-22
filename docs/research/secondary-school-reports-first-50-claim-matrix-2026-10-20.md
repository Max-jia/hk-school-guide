# 首批 50 所中学报告：关键断言统一核对矩阵

生成日期：2026-10-20。冻结名单来源：`secondary-school-reports-first-50-evidence-index-2026-10-20.md`。

> 本矩阵将 50 份逐校 claim ledger 的断言行统一投影到相同字段，并保留每行的原始单元格与账本定位。规范状态沿用账本文字并按规则归类；本次未重新打开全部外部来源，也没有把‘账本已有记录’提升为‘本轮独立复核通过’。任何自动标签、字段映射和缺项提示均须结合原始账本复核。

## 覆盖和状态

- 冻结学校：50/50。
- 统一断言行：2630 行；包括账本主表及可识别的追加断言行。
- 含可提取 URL 的行：395；源账本只用来源 ID 或文字描述的记录仍保留原文，不视作缺证。
- 按账本现有表述自动归类状态：账本记录已核实 1311; 账本未能自动识别状态 1098; 平台分析/计算 66; 限历史年度 43; 待确认/资料未公开 42; 已核实但含未决边界 35; 来源冲突/口径不一致 26; 部分核实/间接证据 9。这些是账本状态的机器归类，不是重新核源结论。

## 规范字段

CSV 每行对应一条账本断言，列包含冻结名单号、学校、slug、claim ID、主题标签、报告位置、断言、来源/来源 ID、URL、发布/核对日期、适用年度/cohort、统计对象/分子分母/单位、核对状态、限制、结构缺项、账本文件/行号及原始字段 JSON。原始文本保留在同一行，便于追溯自动映射。

字段待复核项用于暴露逐校账本格式差异：如果适用年份、统计口径或状态与限制写在同一格，矩阵保留合并文本；若账本没有独立字段则标为待复核，不臆造‘不适用’或分母。

## 逐校覆盖总览

| # | 学校 | 断言行 | 招生 | 课程 | 费用 | 考试与升学 | 有URL | 有字段待复核 |
|---:|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | 圣保罗男女中学（SPCC） (`spcc-secondary`) | 141 | 55 | 52 | 35 | 60 | 138 | 78 |
| 2 | 拔萃男书院 (`dbs-secondary`) | 29 | 12 | 6 | 2 | 8 | 29 | 0 |
| 3 | 拔萃女书院 (`dgs-secondary`) | 36 | 6 | 7 | 4 | 10 | 4 | 36 |
| 4 | 喇沙书院 (`la-salle-secondary`) | 29 | 7 | 2 | 2 | 6 | 1 | 0 |
| 5 | 皇仁书院 (`queens-college-secondary`) | 37 | 8 | 3 | 1 | 8 | 4 | 37 |
| 6 | 协恩中学 (`heep-yunn-secondary`) | 54 | 11 | 8 | 6 | 13 | 6 | 54 |
| 7 | 港大同学会书院 (`hkuga-college-secondary`) | 47 | 14 | 4 | 3 | 17 | 0 | 47 |
| 8 | 汉基国际学校 (`cis-secondary`) | 43 | 7 | 9 | 4 | 8 | 0 | 43 |
| 9 | 哈罗香港国际学校 (`harrow-secondary`) | 45 | 7 | 8 | 12 | 2 | 0 | 0 |
| 10 | 圣士提反书院 (`st-stephens-secondary`) | 41 | 6 | 6 | 7 | 8 | 0 | 41 |
| 11 | 英皇书院 (`kings-college-secondary`) | 40 | 10 | 5 | 3 | 9 | 9 | 40 |
| 12 | 华仁书院（九龙） (`wah-yan-college-kowloon-secondary`) | 38 | 12 | 2 | 3 | 7 | 3 | 38 |
| 13 | 香港培正中學 (`pui-ching-middle-school-secondary`) | 61 | 13 | 5 | 4 | 6 | 1 | 61 |
| 14 | 瑪利諾修院學校（中學部） (`maryknoll-convent-school-secondary`) | 49 | 7 | 5 | 3 | 8 | 6 | 49 |
| 15 | 德望學校 (`good-hope-secondary`) | 50 | 7 | 6 | 3 | 10 | 2 | 50 |
| 16 | 圣保罗书院 (`st-pauls-college-secondary`) | 52 | 8 | 5 | 6 | 6 | 0 | 52 |
| 17 | 英华书院 (`ying-wa-college-secondary`) | 60 | 12 | 6 | 2 | 12 | 0 | 60 |
| 18 | 香港华人基督教联会真道书院 (`logos-academy-secondary`) | 65 | 15 | 9 | 7 | 13 | 1 | 65 |
| 19 | 保良局颜宝铃书院 (`plk-ngan-po-ling-college-secondary`) | 60 | 12 | 12 | 6 | 16 | 0 | 60 |
| 20 | 德瑞国际学校（GSIS） (`gsis-secondary`) | 61 | 14 | 8 | 8 | 10 | 2 | 61 |
| 21 | 民生书院 (`munsang-college-secondary`) | 52 | 7 | 3 | 7 | 4 | 7 | 52 |
| 22 | 伊利沙伯中学 (`queen-elizabeth-school-secondary`) | 47 | 6 | 2 | 2 | 6 | 1 | 47 |
| 23 | 庇理罗士女子中学 (`belilios-public-school-secondary`) | 47 | 6 | 1 | 2 | 10 | 5 | 47 |
| 24 | 沙田官立中学 (`sha-tin-government-secondary-school-secondary`) | 46 | 10 | 5 | 1 | 8 | 0 | 46 |
| 25 | 粉岭救恩书院 (`fanling-kau-yan-college-secondary`) | 43 | 7 | 3 | 2 | 7 | 8 | 43 |
| 26 | 香港浸会大学附属学校王锦辉中小学（中学部） (`hkbuas-wong-kam-fai-secondary`) | 51 | 10 | 6 | 4 | 12 | 5 | 51 |
| 27 | 启思中学 (`creative-secondary-school-secondary`) | 64 | 16 | 22 | 9 | 23 | 14 | 5 |
| 28 | 香港管理专业协会李国宝中学 (`hkma-david-li-kwok-po-secondary`) | 46 | 8 | 8 | 6 | 4 | 0 | 46 |
| 29 | 弘立书院 (`isf-academy-secondary`) | 54 | 15 | 12 | 10 | 5 | 14 | 0 |
| 30 | 香港加拿大国际学校 (`cdnis-secondary`) | 51 | 18 | 7 | 12 | 14 | 14 | 51 |
| 31 | 沙田崇真中学 (`shatin-tsung-tsin-secondary`) | 39 | 7 | 2 | 3 | 4 | 6 | 39 |
| 32 | 屯门天主教中学 (`tuen-mun-catholic-secondary`) | 46 | 8 | 6 | 2 | 6 | 9 | 46 |
| 33 | 元朗商会中学 (`yuen-long-merchants-association-secondary`) | 46 | 8 | 2 | 2 | 6 | 10 | 46 |
| 34 | 圣伯多禄中学 (`st-peters-secondary`) | 47 | 10 | 6 | 3 | 7 | 7 | 47 |
| 35 | 迦密爱礼信中学 (`carmel-alison-lam-foundation-secondary`) | 48 | 10 | 2 | 5 | 3 | 0 | 48 |
| 36 | 圣保禄学校 (`st-pauls-convent-secondary`) | 53 | 17 | 7 | 9 | 14 | 14 | 8 |
| 37 | 香港青年协会李兆基书院 (`hkfyg-lee-shau-kee-secondary`) | 75 | 13 | 11 | 11 | 7 | 0 | 75 |
| 38 | 香港神托会培基书院 (`stewards-pooi-kei-secondary`) | 79 | 15 | 11 | 13 | 7 | 0 | 79 |
| 39 | 沪江维多利亚学校 (`victoria-shanghai-academy-secondary`) | 68 | 17 | 11 | 9 | 8 | 0 | 68 |
| 40 | 香港法国国际学校 (`french-international-school-secondary`) | 70 | 10 | 12 | 9 | 15 | 2 | 70 |
| 41 | 香港仔工业学校 (`aberdeen-technical-school-secondary`) | 63 | 13 | 7 | 11 | 10 | 13 | 63 |
| 42 | 顺德联谊总会梁銶琚中学 (`stfa-leung-kau-kui-secondary`) | 39 | 5 | 5 | 4 | 5 | 0 | 39 |
| 43 | 圣士提反堂中学 (`st-stephens-church-college-secondary`) | 55 | 10 | 4 | 3 | 10 | 4 | 49 |
| 44 | 中华基督教会铭基书院 (`ccc-ming-kei-college-secondary`) | 53 | 5 | 8 | 3 | 9 | 16 | 53 |
| 45 | 保良局罗氏基金中学 (`plk-laws-foundation-college-secondary`) | 57 | 11 | 10 | 12 | 8 | 13 | 57 |
| 46 | Kellett School (`kellett-school-secondary`) | 56 | 12 | 15 | 8 | 7 | 0 | 56 |
| 47 | 香港墨爾文國際學校 (`malvern-college-hong-kong-secondary`) | 50 | 12 | 13 | 8 | 11 | 0 | 50 |
| 48 | 英皇佐治五世學校 KGV (`kgv-esf-secondary`) | 52 | 12 | 18 | 2 | 14 | 0 | 52 |
| 49 | 英基港島中學 (`island-school-esf-secondary`) | 51 | 10 | 15 | 1 | 7 | 0 | 51 |
| 50 | 香港澳洲國際學校 AISHK (`australian-international-school-hong-kong-secondary`) | 44 | 11 | 14 | 7 | 14 | 27 | 44 |

## 全矩阵文件

[下载统一断言 CSV（2630 行）](secondary-school-reports-first-50-claim-matrix-2026-10-20.csv)。

## 当前使用边界

- 自动主题分类用于筛选，不作为完整分类验收；跨章节或同时涉及多领域的断言可带多个主题。
- ‘账本记录已核实’仅是源账本现存记录；需以账本内的核对日期、来源与限定为准。‘已核实但含未决边界’、‘部分核实’、‘待确认’及来源冲突均保留，不得折叠成已通过。
- CSV 中的字段待复核项是下一步逐项补正清单。只有明确写出‘不适用’、‘来源未公开’或分母/单位等内容并给出证据范围后，才可关闭对应字段；空白不等于不适用。
- 矩阵完成了统一结构和 50/50 档案映射，但并不单独证明所有断言已重新核源、报告已修正或整批达到发布门槛。

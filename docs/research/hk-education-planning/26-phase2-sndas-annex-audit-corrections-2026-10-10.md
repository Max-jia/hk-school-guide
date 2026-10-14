# Phase 26｜SNDAS官方附件學科標籤勘誤與單一人數複核狀態

> 研究基準日：2026-10-10（香港時間）  
> 目的：對報告25及數據v1.0作第二輪原文核對，修正被縮寫的官方類別名稱，並再次標記PDF文字層不能直接核實的單一人數項。

## 1. 勘誤摘要

第二輪對照政府新聞公報所連官方Annex後，發現v1.0整理表有兩個英文標籤過度縮寫／不精確：

| v1.0整理名稱 | 按官方附件修正的英文名稱 | 說明 |
|---|---|---|
| Architecture | Architecture, Surveying and Town Planning | 原來縮寫漏掉Surveying及Town Planning，不應當作官方原名。 |
| Language Studies and Translation | Language and Translation | 原來加入了官方類別沒有的Studies一詞。 |

其餘類別名稱亦已按官方PDF可讀文本逐列保留。中文欄是研究者翻譯，不代表EDB另有官方中文學科名稱。

## 2. 官方類別表及驗證狀態

| 官方英文學科名稱 | 研究者中文翻譯 | 接受offer人數 | 數值狀態 |
|---|---|---:|---|
| Architecture, Surveying and Town Planning | 建築、測量及城市規劃 | 5 | 附件文字層可核 |
| Arts and Humanities | 藝術及人文學 | 11 | 附件文字層可核 |
| Business | 商學 | 34 | 附件文字層可核 |
| Computing and Engineering | 計算及工程 | 55 | 附件文字層可核 |
| Cross-discipline (Arts and Humanities / Sciences) | 跨學科（藝術及人文／科學） | 5 | 附件文字層可核 |
| Cross-discipline (Computing / Business) | 跨學科（計算／商學） | 2 | 附件文字層可核 |
| Cross-discipline (Sciences / Business) | 跨學科（科學／商學） | 1 | 暫定：文字層孤立的「1」按類別順序配對，儲存格未目視核對 |
| Cross-discipline (Sciences / Social Sciences) | 跨學科（科學／社會科學） | 2 | 附件文字層可核 |
| Education | 教育 | 2 | 附件文字層可核 |
| Environmental Studies | 環境研究 | 1 | 暫定：由公告總數319扣除其他已抽取類別計算的差額 |
| Fashion and Design | 時裝及設計 | 12 | 附件文字層可核 |
| Fine Arts and Visual Arts | 美術及視覺藝術 | 7 | 附件文字層可核 |
| Language and Translation | 語言及翻譯 | 14 | 附件文字層可核 |
| Law | 法律 | 6 | 附件文字層可核 |
| Medicine and Health | 醫學及健康 | 68 | 附件文字層可核 |
| Music | 音樂 | 11 | 附件文字層可核 |
| Physical Education and Sports Science | 體育及運動科學 | 4 | 附件文字層可核 |
| Sciences | 科學 | 57 | 附件文字層可核 |
| Social Sciences | 社會科學 | 22 | 附件文字層可核 |
| **合計** |  | **319** | 與官方公告的接受offer總數一致；含兩項暫定數值 |

### 兩個暫定值如何處理

官方PDF文字層在頁首位置先列出獨立數字序列`55, 5, 2, 1, 2`，其中前後數值可與Computing and Engineering、Cross-discipline及Social Sciences列的版面順序相符；本表將孤立的`1`暫配給Cross-discipline (Sciences / Business)，但沒有原頁圖像檢視，故不能標為確證。Environmental Studies一行的數字未由文字層清楚抽取；列值`1`是按官方公告總接受人數319減去其餘類別後的差額。**總和一致只是算術檢查，不等於原始儲存格已驗證。**

在PDF原頁未目視複核前，對外只宜引用文字層明確對應的主要類別，例如Medicine and Health 68、Sciences 57及Computing and Engineering 55；不應把兩個暫定的1人類別當作獨立重點。

## 3. 版本與檔案更新

- 新增 `data/sndas-2026-accepted-offers-by-discipline-v1.1.csv`，按官方英文原名保留19類。
- 新增 `data/postsecondary-metrics-v1.1.csv`、`data/source-register-v1.1.csv`及`data/postsecondary-population-crosswalk-v0.5.csv`。
- 新增工作簿 `26-phase2-postsecondary-quantitative-dataset-v1.1.xlsx`；v1.0保留作歷史快照。
- 研究總綱更新至v0.6。
- 報告25已加上勘誤提示；本報告26作為現行標籤／數值狀態依據。

## 4. QA

- 指標總量316、來源32、交叉表29；所有新指標與交叉表source IDs均能解析。
- 19個學科列相加為319，與2026年7月9日政府公告的接受offer總數一致。
- 類別名稱已對照官方附件英文；研究者中文翻譯和兩項暫定值分開標示。
- 學科分布限於接受SNDAS firm offer者，不代表院校已註冊／實際入讀、課程學額或一般DSE考生升學機會。

## 官方來源

1. 香港特別行政區政府新聞公報，2026-07-09，*Selection completed for fifth cohort of School Nominations Direct Admission Scheme*：https://www.info.gov.hk/gia/general/202607/09/P2026070900208p.htm
2. 政府新聞公報附件，*Breakdown on Offers Accepted under Fifth Cohort of SNDAS by Discipline of Study*：https://gia.info.gov.hk/general/202607/09/P2026070900208_549827_1_1783565576741.pdf

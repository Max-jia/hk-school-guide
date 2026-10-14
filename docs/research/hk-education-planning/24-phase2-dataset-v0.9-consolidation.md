# Phase 24｜中學後量化資料 v0.9 對齊與待辦清單修訂

> 研究基準日：2026-10-10（香港時間）  
> 目的：把已發布的v0.9 CSV併入可審閱的Excel工作簿，更新研究總綱與待辦狀態。  
> 本階段範圍：資料版本與文件一致性整理；不把缺失的官方數字估算成已完成。

## 1. 本輪完成

1. 建立 `24-phase2-postsecondary-quantitative-dataset-v0.9.xlsx`，以 `22-phase2-postsecondary-quantitative-dataset-v0.8.xlsx` 為基礎，不覆蓋v0.8。
2. 將 `data/postsecondary-metrics-v0.9.csv`、`data/source-register-v0.9.csv`、`data/postsecondary-population-crosswalk-v0.3.csv` 更新至工作簿對應工作表。
3. 增加SNDAS 2026第五屆結果與2027/28運作規則工作表；保留源CSV作逐列核對依據。
4. 重寫工作簿「待提取」清單：標明S6 2021–2025抽取已完成；精確HKDSE分母、JUPAS接受／註冊、SNDAS附件／實際註冊、大學畢業去向、課程級結果及跨學段供需仍未完成。
5. 更新量化工作簿讀取指南及指標字典，修正過時的S6「歷年抽取未開始」描述、含混的分母提示及重複的HKDSE指標解釋。
6. 將 `00-research-charter.md` 升至v0.4，統一研究基準日期並同步資料集和未完事項摘要。

## 2. 資料QA

| 檢查 | 結果 |
|---|---:|
| v0.9量化指標 | 297列；indicator_id唯一 |
| v0.9來源登記 | 30列；source_id唯一 |
| v0.3人口／事件交叉表 | 28列；crosswalk_id唯一 |
| SNDAS 2026結果CSV | 7列 |
| SNDAS 2027/28規則CSV | 7列 |
| 量化指標來源ID | 全部可在v0.9來源登記中解析 |
| 交叉表來源ID | 全部可在v0.9來源登記中解析 |
| SNDAS比率複算 | 325/847=38.37%；319/325=98.15% |
| 歷史版本 | v0.8及更早版本保留，未覆蓋 |

## 3. 仍未解決的研究缺口

- **HKDSE分母：**報告19已界定30,977／約73.2%所用母體為應考相關入學要求科目的日校考生子群；精確子群人數仍未核實。反推數字不作官方值。
- **JUPAS接受及註冊：**報告22已分開申請人、offer與接受／註冊節點；本工作簿不以offer數代替繳費接受或完成註冊aggregate。
- **SNDAS結果：**報告23的接受offer數不升格為實際註冊／入讀。公告提及的學科分布附件仍待抽取，實際入讀仍待開學後官方確認。
- **畢業出口與課程層級：**跨院校畢業生就業口徑、逐課程非聯招／內地／海外比較仍需另行研究。
- **全程供需及逐校資料：**K1至大學各階段的全港縱向供需序列、分區資料與具代表性的逐校抽樣仍未整合。

## 4. 驗收邊界

本階段只完成**研究文件與資料版本對齊**，不代表全港教育規劃研究已完成，也不代表尚未公開的行政數據不存在。遇到未公布／未核實數值，繼續留空並列明來源檢索範圍。v0.9工作簿可作現階段單一量化查閱入口；新增資料仍須先更新CSV、來源登記與QA，再產出下一版。

## 5. 參照文件

- `00-research-charter.md`
- `19-phase2-hkdse-denominator-jupas-crosscheck-2026.md`
- `21-phase2-edb-hkdse-jupas-population-crosswalk.md`
- `22-phase2-jupas-offer-acceptance-admissions-bridge.md`
- `23-phase2-sndas-offer-acceptance-bridge.md`
- `data/postsecondary-metrics-v0.9.csv`
- `data/source-register-v0.9.csv`
- `data/postsecondary-population-crosswalk-v0.3.csv`

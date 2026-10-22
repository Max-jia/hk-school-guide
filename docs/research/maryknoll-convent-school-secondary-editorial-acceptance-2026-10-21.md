# 瑪利諾修院學校（中學部）報告編輯驗收（已通過）

日期：2026-10-21  
報告：`src/content/reports/maryknoll-convent-school-secondary.json`  
內容審計：`docs/research/maryknoll-convent-school-secondary-content-audit-2026-10-16.md`  
關鍵斷言賬本：`docs/research/maryknoll-convent-school-secondary-claim-ledger-2026-10-17.md`

## 內容與當屆資料

- 依新版八章結構檢查：定位、入讀、教學、升學、費用、在校生活、同類比較、專家結論順序完整；第三方 Band 估算與教育局學生 Net Band 區分；跨 2022–2025 年 DSE 匯總、2025 畢業去向與分母限制均有標註；匿名舊論壇材料沒有被寫成現時家長共識。
- 重開校方 2027/28 中一頁：詳情仍預告於 2026 年 11 月公布；收表日期 2027-01-04 至 01-18；當屆名額、申請文件、面試與評分尚未公布。2026/27 的 54 個暫定名額與舊評分權重仍限定為歷史資料。
- 重開校方 2027/28 中二至中四插班頁：資訊預計 2027 年 1 月公布；收集申請表日期 2027-01-19 至 04-30；空缺、評核及正式截止時間仍未列明。
- 重開教育局 SSPA 2027/28 頁：DP 申請 2027-01-04 至 01-18、正取通知 03-31、派位 07-06、註冊 07-08 至 09；電子平台預計 2026 年 11 月中旬開放。報告未把一般平台規則說成校方已承諾電子遞件。

## 工程與瀏覽器驗收

- `node scripts/validate-reports.mjs maryknoll-convent-school-secondary`：通過，0 錯誤、0 提醒。
- `node scripts/audit-report-sources.mjs`：通過，77 份報告、154 個繁簡頁面的可見來源及 JSON-LD 引用一致。
- `npm run build -- --webpack`：通過，656 個靜態頁面生成，TypeScript 通過；`git diff --check` 通過。
- Chrome 實際渲染 CN/TC，390×844 與 1440×1000：每頁完整 8 章、11 張表、20 個來源連結；手機 10 張寬表可在容器內滾到末列，1 張適配視口；頁面寬度等於視口，無橫向溢出，控制台錯誤 0。第 1、6 章手機視口目視檢查通過。
- 本地預覽：`http://127.0.0.1:3101/cn/reports/maryknoll-convent-school-secondary?review=accept-20261021`；`http://127.0.0.1:3101/reports/maryknoll-convent-school-secondary?review=accept-20261021-tc`。

本校達到本地驗收門檻，未部署。下一所按凍結名單為 #15 粉嶺救恩書院。

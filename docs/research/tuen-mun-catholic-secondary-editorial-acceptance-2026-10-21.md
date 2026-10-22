# 屯門天主教中學（中學部）報告編輯驗收（已通過）

日期：2026-10-21  
報告：`src/content/reports/tuen-mun-catholic-secondary.json`  
內容審計：`docs/research/tuen-mun-catholic-secondary-content-audit-2026-10-17.md`  
關鍵斷言賬本：`docs/research/tuen-mun-catholic-secondary-claim-ledger-2026-10-17.md`

## 內容與當屆資料

- 重開校方入學資訊索引及網上申請入口；目前索引列出的中一招生仍為 2026/27，未在該索引找到 2027/28 校本規則。40 席、40/50/10 評核和兩輪面談均限定為舊屆，不外推新屆。
- 重開校方 DSE 頁、課程頁、家校會概覽及學校計劃／報告索引。部分科目比例無逐科考生人數或完整等級分布；英語授課頁面口徑有差異；最新可見校務報告列為 2024/25。報告保留這些來源與分母限制，未將其推成全屆結論。
- 報告保留校方歷屆招生材料、DSE 對照數字、學生 AI／網絡安全活動等各自年份與證據範圍，未把個別活動寫成全體學生的常設機會。

## 工程與瀏覽器驗收

- `node scripts/validate-reports.mjs tuen-mun-catholic-secondary`：0 錯誤、0 提醒。
- `npm run build -- --webpack`：通過，生成 656 個靜態頁面，TypeScript 通過。
- `node scripts/audit-report-sources.mjs`：通過，77 份報告／154 個繁簡頁面的可見來源和 JSON-LD 引用一致。
- `git diff --check`：通過。
- Chrome 本地生產預覽繁簡頁均在 390×844 與 1440×1000 CSS px 實際渲染：9 個頁面章節區塊、9 張表、23 個校方／教育局連結；頁面寬度等於視口，頁面錯誤 0。手機下 9/9 張表可在內部容器滾到末列，第 1、6 章已目視檢查。
- 本地預覽：`http://127.0.0.1:3101/cn/reports/tuen-mun-catholic-secondary?review=accept-20261021`；`http://127.0.0.1:3101/reports/tuen-mun-catholic-secondary?review=accept-20261021-tc`。

本校達到本地驗收門檻，未部署。下一校為凍結名單第 17 所元朗商會中學。

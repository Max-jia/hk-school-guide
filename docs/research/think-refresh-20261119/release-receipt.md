# 朗思幼稚園報告發布回執

發布日期：2026-11-19。應用提交 `2f141fd9`，已推送至既有 `codex/school-net-humanizer-20261115` 分支。

正式域名：https://hkschool.guide

- 繁體：https://hkschool.guide/reports/think
- 簡體：https://hkschool.guide/cn/reports/think
- 新部署：`dpl_9twCnWSaBsMEM8arVbrrt4hUP3Cm`，READY；正式域名已確認切換。
- 保留回滾目標：`dpl_A8PfjGc2rt4axZD9ajmJ9AJLd76H`。未執行回滾。

## 發布門禁與驗收

1. 從最新正式部署1,619個來源檔案的SHA1建立獨立副本，僅四項應用檔案與核准朗思內容相關；未混入校網草稿或其他工作區改動。
2. 完整生產構建、類型檢查、本批ESLint及Git差異檢查通過。5,428個靜態HTML逐頁對比，僅朗思繁簡兩頁有預期正文、來源與SEO變化，其他頁無差異。
3. 獨立生產預覽四組繁簡手機／桌面驗收通過；實際搜尋朗思，核對兩種語言的列表摘要。搜索description、Open Graph、Twitter摘要一致，既有語言標記與canonical保持正確。
4. `--prod --skip-domain`先建立候選部署。完成後核對1,620項實際上傳來源：多出的一項是本地prebuild生成的公開搜索索引，與切換前正式站檔案逐字節相同。其餘來源與準備副本一致，原有27,197條輸出路徑無缺失。
5. 再確認正式域名仍為預期舊版，才透過Vercel的request_promote切換；切換後get_deployment確認正式域名指向新READY部署。
6. 線上44個繁簡頁面的正文、標題、description、canonical、hreflang、結構化資料、連結、表單及圖片屬性與驗收構建一致。圖片網址只在驗證新部署ID後，移除Vercel附加的dpl參數進行比較。
7. 正式站朗思繁簡×390／1440共四組瀏覽器驗收通過，無應用例外或頁面橫向溢出；另兩項繁簡摘要及列表卡片驗收通過。人工查看正式站手機首頁及桌面費用章截圖。
8. 公開report-content介面的html與提交的premiumHtml精確一致；站點地圖切換前後均5,414項且網址集合一致，robots逐字節相同。

官方原始資料及圖片仍保留本機。Git僅收錄核驗清單、文字紀錄及檢查結果；docs由.vercelignore排除，此回執歸檔不需重建部署。

證據：release-preflight.json、build-comparison.json、candidate-verification.json、production-pages.json、production-crawl-and-api.json、production-browser/browser-checks.json、production-browser/summary-checks.json。

# 首期10所小學報告發布回執

2026年11月19日。10篇報告已提交、推送並部署至正式站。應用提交：`53e872cb`、`a8e3742f`；分支：`codex/school-net-humanizer-20261115`。

- 正式站：[hkschool.guide](https://hkschool.guide)
- 首篇聖保羅男女附小：[繁體](https://hkschool.guide/reports/spccps)／[簡體](https://hkschool.guide/cn/reports/spccps)
- 全部10所繁簡連結：同目錄「线上报告链接.md」。
- 部署：`dpl_6KDFVoQkJP3xKPCgyZfKtvt54GVZ`，READY，已透過正式域名映射確認。
- 原正式部署`dpl_9twCnWSaBsMEM8arVbrrt4hUP3Cm`保留作回滾，未刪除或回滾。

## 事實核對

按逐校535項台帳紀錄複核，引用限官方原文及原件。101個去重官方網址中，73個直接取得並解析、26個透過網頁工具閱讀官網；其餘兩個培僑詳細招生頁讀取受限，正文沒有填入未核實的精確日期、面試權重及註冊條款。英華當前連結的未標學年政策仍用常識科，報告保留分科後條件待確認註記。未取得的新學年學費及完整退出合同亦明確說明，沒有當作已核事實。20份重新取得的官方PDF／圖片與上一輪審看原件逐檔一致。

## 發布與頁面驗收

1. 以最近READY正式版1,620個來源檔案為基線，原件SHA1全部一致；本批19項修改、57項新增，未混入其他校網草稿。
2. 全量構建、TypeScript、修改範圍ESLint、Git差異檢查通過。5,428個原有靜態頁逐頁比較，無頁面遺失；新增8個繁簡網址。其他頁只容許首頁報告數239→243及16個相關報告頁尾選單的預期變動，正文、來源與SEO沒有意外差異。
3. 整合過程發現的非目標資料帶變動、pkps來源遺失及地區頁名稱匹配問題，均在建立候選前修復；來源登錄表非目標鍵逐項保持原文。
4. 本地40組繁簡手機／桌面頁面與20張列表卡片通過。候選READY後核實1,677個實際上傳來源與準備副本完全一致；原27,197條輸出路徑全部保留，增加40條。研究原件和本地審閱入口未上傳。
5. 再確認正式域名仍指向預期基線，才執行promote。切換後58個線上頁面的正文、SEO、canonical、hreflang、結構化資料、連結、表單及圖片與驗收構建一致；只在核對部署ID後移除Vercel附加圖片參數作比較。
6. 正式站10篇×繁簡×390/1440像素，共40組瀏覽器檢查全部通過，無執行例外或整頁橫向溢出；20張繁簡卡片與分享圖通過。列表驗收曾使用草稿的「培僑書院（小學部）」而非實際顯示名「培僑書院」造成超時，已按實際卡片名稱重跑完整20項；另確認繁簡搜尋正常，沒有修改產品來掩蓋測試問題。
7. 10個正式站report-content回傳與提交premiumHtml逐字一致，確認運行時未漏掉新增JSON。站點地圖5,414→5,422，僅新增8個本批網址，舊網址無遺失；robots逐字節不變。
8. 人工審看本地與正式站的手機頁首、課程與招生段落、費用章及收尾；寬表在表格內滑動，附提示。

證據：fact-review.json、official-original-parity.json、source-registry-scope.json、build-comparison.json、candidate-verification.json、commit-source-parity.json、production-pages.json、production-crawl-and-api.json、production-browser/browser-checks.json、production-browser/card-checks.json。

官方下載原件及瀏覽器截圖保留本機；Git只收錄核驗台帳、文字及驗收結果，docs由.vercelignore排除。本回執歸檔不需要重建或重新切換部署。

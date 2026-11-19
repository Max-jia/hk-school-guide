# 移動端性能修訂發布紀錄

- 發布日期：2026年11月19日。
- 應用提交：`93071aaf`；分支：`codex/school-net-humanizer-20261115`，已推送。
- 正式網站：https://hkschool.guide
- 正式部署：`dpl_A8PfjGc2rt4axZD9ajmJ9AJLd76H`，READY。
- 部署網址：https://hk-school-guide-gf63bkhdl-max-jia-s-projects.vercel.app
- 上一版基線與回滾目標：`dpl_4umaBm3TwaStzNdzi1sDfsSA2kVy`。保留原部署，未實際執行回滾。

## 發布與驗收證據

1. 上線前重取正式域名及完整源碼清單，只發現本批9個既有上傳檔案有變化，新增12個程式／資料檔。其他源碼與基線相同；未包含校網研究草稿。
2. 先以隔離快照建立不自動切換域名的production候選；READY後核對1,619個實際上傳源碼檔案，全部與準備快照一致。原有27,197個輸出路徑無缺失，再確認正式域名仍是預期基線後promote。
3. 本地完整內容及SEO對比涵蓋5,428個靜態HTML；Vercel完成5,439項頁面／路由輸出。兩者口徑不同。
4. 正式域名40個繁簡頁面的文字、標題、摘要、canonical、hreflang、結構化資料、連結、表單說明及圖片來源／替代說明與驗收版一致。圖片網址比對先驗證並移除平台附加的當前部署`dpl`參數，其他參數均須相同。方法依本地Next.js 16.3.0的deploymentId官方文件核對。
5. 正式站30項手機及繁簡互動檢查通過，包括16種語言／查詢組合、不同螢幕寬度、選單、篩選和兩校比較；未捕捉到應用例外。另3項載入／重試檢查通過。
6. 公開搜尋索引175條，檔案SHA256與本地相同；快取回應包含`public, max-age=31536000, immutable`。站點地圖發布前後均為5,414個網址，無丟失；robots逐字節相同。
7. 類型檢查、Git差異檢查、本批ESLint無錯誤；兩個既有普通img建議仍保留，已補尺寸及延遲載入。修正新檔案末尾空行後才推送應用提交。

## 結論的範圍

- 本次保留了原有學校正文、摘要及SEO設定；統計、廣告及同意管理配置保持原樣。
- 性能數字仍是發布前、排除第三方腳本的本地實驗室對比。繁體目錄未取得穩定改善證據，不能聲稱線上Core Web Vitals達標或搜尋排名已改善。
- 品牌帳號關聯、未證實的首次發布日期沿用待核說明。
- 本紀錄屬部署後證據歸檔；docs由.vercelignore排除，不需再次部署。

原始結果：production-pages.json、production-assets.json、production-browser/、candidate-verification.json；本地性能與全量對比見《審計與本地驗收》。

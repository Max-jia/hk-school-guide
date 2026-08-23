# Design System — 港学荟（hkschool.guide）

## Product Context
- **What this is:** 香港小學/幼稚園深度擇校報告平台（付費報告 HK$9.9 單份 / HK$99 全部），免費工具引流
- **Who it's for:** 內地來港家庭家長（高才/優才），決策壓力高、對數據真偽敏感
- **Space/industry:** 教育資訊 + 付費內容 + 數據報告
- **Project type:** 內容型網站（首頁=封面牆，正文=精裝報告）

## Aesthetic Direction
- **Direction:** Pudding 封面 × 精裝書正文——首屏鮮豔封面牆（內容即視覺），報告正文精裝書排版
- **Decoration level:** intentional——幾何插畫（圓環/山形/波紋）、書頁分隔線
- **Mood:** 視覺衝擊的封面是誘餌（吸引點擊），克制精裝的正文是承諾（讀完可信）。衝擊與權威互為表裡，服務付費轉化
- **Reference sites:** pudding.cool（封面牆/插畫/縮圖網格）、press.stripe.com（書本動效/精裝排版）

## Typography
- **Display/Hero:** Newsreader（襯線，封面校名 44-60px，報告章節 26px）
- **Body:** Roboto（保留現有）→ 中期升級 Instrument Sans
- **UI/Labels:** Roboto 12-14px
- **Data/Tables:** Roboto tabular-nums
- **Loading:** Google Fonts（Newsreader + Roboto 已載入）
- **Scale:** 12 / 14 / 16 / 20 / 26 / 34 / 44 / 60

## Color
- **Approach:** expressive 封面 + restrained 正文
- **封面色板（每校輪換，按卡片 index）:** `#D64550` 紅 / `#2D5BFF` 藍 / `#E8B300` 金 / `#7B5EA7` 紫 / `#12B5CB` 青 / `#F28C28` 橙 / `#2BA84A` 綠 / `#1C1C1C` 黑
- **正文色板（克制）:** 背景 `#FBF9F5` 米白 / 文字 `#1C1C1C` 墨黑 / 次要 `#57534E` 暖灰 / 強調 `#0F766E` 青綠 / 邊框 `#E4E0D8` 暖灰
- **Semantic:** 成功 `#059669` / 警告 `#C2410C` / 錯誤 `#DC2626` / 信息 `#0F766E`
- **Dark mode:** 暫不支援（後續）

## Spacing
- **Base unit:** 8px
- **Density:** 封面牆密集（14px 間距）、正文寬鬆（56px 章節呼吸）
- **Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 56 / 64

## Layout
- **Approach:** hybrid——首頁創意網格（封面牆 auto-fill 200px）、報告頁精裝欄（960px 書頁感）
- **Grid:** 封面牆 auto-fill minmax(200px,1fr)；移動端 2 列
- **Max content width:** 首頁 1152px / 報告 960px
- **Border radius:** 封面 10px / 按鈕 8px / 標籤 6px / 貼紙 50%

## Motion
- **Approach:** intentional
- **Easing:** enter ease-out
- **Duration:** 封面 hover 200ms / 過場 400ms
- 規則：封面 hover 浮起 4px；報告頁「書頁」開啟過場（輕量，不照搬 Stripe 重度 scroll 動畫）

## 設計原則
1. 首屏第一眼 = 鮮豔封面牆（內容即視覺，Pudding 精神）
2. 搜索框是核心功能，保留但低調（小尺寸、右側）
3. 正文保持「數據可核實」的精裝書質感——衝擊是封面的事，信任是正文的事
4. 等級/價格信息永遠清晰（即使封面色不再按等級區分）
5. 零圖片依賴——全部 CSS/SVG 生成

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-08-23 | 3.0 改版：Pudding 封面牆 + 精裝正文 | 用戶確認「衝擊封面+精裝正文」方向，參考 pudding.cool + press.stripe.com |
| 2026-08-23 | 封面色板 8 色輪換（非等級色） | Pudding 精神：每篇獨特視覺；等級用徽章補償 |
| 2026-08-23 | 保留 Newsreader + Roboto | 品牌已建立；Roboto 中期升級 Instrument Sans |

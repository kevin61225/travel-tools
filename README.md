# 💱 出國幣別轉換 + 計算機

出國旅遊用的小工具：即時幣別換算，內建計算機方便算飯店每晚多少錢。單一 `index.html`，不需安裝、可直接放上 GitHub Pages。

## 功能

- **雙向幣別選擇（可搜尋）**：上下兩方都能選幣別，點一下開啟搜尋清單，輸入代碼或中文名稱即可篩選，輸入金額即時換算。
- **即時匯率**：自動抓取 [exchangerate-api.com](https://www.exchangerate-api.com) 最新匯率；抓不到（離線／失敗）時自動改用內建備用匯率。
- **15 種常用幣別**：台幣、日圓、韓元、美金、歐元、人民幣、港幣、泰銖、新加坡幣、英鎊、澳幣、越南盾、馬幣、菲律賓披索、印尼盾。
- **計算機**：加減乘除與百分比，按「↑ 帶入換算」把算出來的金額直接送到換算欄（例：`3500 × 5 晚` → 算出總價再換成台幣）。
- **深色模式**：右上角切換，會跟隨系統預設。
- **記住上次設定**：幣別選擇與主題會存在瀏覽器，下次打開沿用。

## 本機使用

直接用瀏覽器打開 `index.html` 即可。

## 測試（Playwright）

1. 安裝依賴：

	```bash
	npm install
	```

2. 執行 E2E 測試：

	```bash
	npm run test:e2e
	```

3. 以有畫面模式執行（方便觀察操作流程）：

	```bash
	npm run test:e2e:headed
	```

4. 開啟 Playwright UI 模式：

	```bash
	npm run test:e2e:ui
	```

測試執行後的結果會輸出到 `test-results/`。

版本相容提醒：此專案目前使用 `@playwright/test@1.54.1`，需與開發容器的 Playwright image 版本一致（`mcr.microsoft.com/playwright:v1.54.1-jammy`），否則可能出現瀏覽器執行檔不存在的錯誤。

## 備註

- 匯率僅供參考，實際交易以銀行／刷卡為準。
- 要修改內建備用匯率或增減幣別，編輯 `index.html` 裡的 `CURRENCIES` 與 `FALLBACK` 兩個區塊即可。

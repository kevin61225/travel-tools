# Agent 指南

這是一個單檔案的靜態網頁工具，沒有建置流程、沒有套件依賴、沒有測試框架。

## 專案結構

- [index.html](index.html) — 整個應用程式（HTML + CSS + JS 全部內嵌在這一個檔案）。
- [README.md](README.md) — 使用者導向的說明文件（功能介紹、部署到 GitHub Pages 的步驟）。

沒有其他原始碼、沒有 `package.json`、沒有建置工具。直接用瀏覽器開 `index.html` 就能執行。

## 功能概覽

雙功能小工具：
1. **幣別轉換**：15 種幣別互轉，即時抓 `https://open.er-api.com/v6/latest/USD` 匯率，失敗時退回內建的 `FALLBACK` 匯率表。
2. **計算機**：基本四則運算 + 百分比，可把結果「帶入」上方換算欄位。

其他細節：深色模式（跟隨系統，可手動切換並記住）、幣別選擇會存在 `localStorage`。

## 修改時的重點位置（都在 index.html）

- `CURRENCIES`：幣別清單（代碼、國旗 emoji、中文名）— 增減支援幣別在這裡改。
- `FALLBACK`：離線/API 失敗時的備用匯率 — 更新備用匯率在這裡改，並更新 `updated` 欄位的日期。
- `loadRates()`：抓即時匯率的邏輯與 API 端點。
- `convert()`：換算與顯示邏輯，讀取 `selected.fromCur` / `selected.toCur`（不是 DOM `<select>`）。
- 幣別選擇器（可搜尋）：`#fromCurBtn` / `#toCurBtn` 按鈕打開 `#curModal` 彈窗，`renderCurList()` 依 `#curSearch` 輸入即時篩選 `CURRENCIES`，點清單項目寫回 `selected` 物件並存 `localStorage`。若要改成別種 UI（例如原生 `<select>`），這一段要整組換掉。
- `calcEval()` / `calcKey()`：計算機邏輯。注意 `calcEval` 用 `Function()` 執行運算式，前面有 regex 白名單 `^[0-9+\-*/%. ]*$` 限制輸入字元以避免任意程式碼執行 — 如果要擴充運算子，記得同步更新這個白名單。
- `.swap-wrap + .row`（CSS）：這條選擇器負責「從/換成」兩個欄位之間的間距，讓中間的圓形交換按鈕（`#swapBtn`）疊在正確的縫隙上。DOM 結構是 `row → swap-wrap → row`，如果改動這段 HTML 結構，記得同步檢查這條 CSS 選擇器還對不對（曾經因為寫成 `.row + .row` 而永遠不生效，導致交換按鈕蓋掉太多內容）。

## 開發與驗證

- 沒有建置指令、沒有 lint、沒有自動化測試。
- 修改後直接用瀏覽器打開 `index.html` 手動測試（換算、計算機、深色模式切換、離線時的備用匯率）即可驗證。
- 部署方式是把 `index.html` push 到 GitHub 並開啟 GitHub Pages（見 [README.md](README.md)）。

## 風格慣例

- 全部邏輯保持在單一 `index.html`，不要拆成多檔案或引入建置工具，除非使用者明確要求。
- 介面文字與註解使用繁體中文（zh-Hant），與現有風格一致。
- 不要引入外部 JS/CSS 套件依賴（目前是零依賴的純 vanilla 實作）。

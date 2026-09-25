# JLPT N2 歷屆真題資料擷取（第一階段）

## 範圍與目前完成度

- 檢查並處理 9 份 PDF（2021-07 至 2025-07），每份建立第 1–47 題的 metadata，共 423 筆。
- 第一階段只處理文字・語彙・文法，不整理聽解；讀解不做全文整理。
- `data/exams.json` 同時保留逐頁 OCR 原文、來源 PDF、實體 PDF 頁碼和 OCR 信心分數，避免 OCR 猜錯後只留下整理過的版本。
- 題目文字目前以逐頁 transcript 保存，`questions.json` 提供題號、題型、頁碼和 transcript 參照，沒有聲稱已完成 423 題的逐題切分。
- 詞彙資料目前收錄 20 個核心題目詞（18 個納入暫行排行，2 個 OCR 字形需確認）；文法資料收錄 12 個由可讀題目與答案頁判斷的考點，其中 11 個逐題核實、1 個因 OCR 姓氏疑慮待核對。頻率榜是已整理資料的暫行排序，不是九份試卷的完整高頻排行。

## PDF 文字層與 OCR 方法

所有 PDF 都先檢查文字層：

| 考卷 | 文字層判讀 | 最終題目頁處理 |
|---|---|---|
| 2021-07 | 無可用文字 | 300 DPI 日文 OCR |
| 2021-12 | 無可用文字 | 300 DPI 日文 OCR |
| 2022-07 | 無可用文字 | 300 DPI 日文 OCR |
| 2022-12 | 無可用文字 | 300 DPI 日文 OCR |
| 2023-07 | 無可用文字 | 300 DPI 日文 OCR |
| 2023-12 | 只有答案頁有可讀文字；題目頁無可用文字 | 題目頁 300 DPI 日文 OCR；答案頁使用原有文字層 |
| 2024-07 | 有文字層但日文嚴重亂碼，不採用 | 300 DPI 日文 OCR |
| 2024-12 | 無可用文字 | 300 DPI 日文 OCR |
| 2025-07 | 無可用文字 | 300 DPI 日文 OCR |

影像 OCR 使用 Tesseract.js 日文模型。頁面信心分數低於 50 標記為 low；50–81 為 medium；82 以上為 good。信心分數只是頁面品質提示，不代表每個漢字都正確。

## 頁面與題號檢查

九份考卷均建立 1–47 題連續的 metadata。對照 OCR 頁面題號範圍後，題號序列連續；OCR 原文與題目邊界仍需逐題核對，未把頁面 transcript 假裝成逐題辨識結果。

兩份 12 月掃描的 PDF 第 9 頁（內頁編號 7）影像損毀，OCR 主要是噪訊。由於第 10–13 頁可讀且涵蓋第 31–47 題，第 9 頁無法可靠對應題號，故獨立列為低品質頁，未擅自指定缺題號。2021-07 PDF 第 2 頁也是損毀圖樣，但題目範圍從第 3 頁開始。

### 品質較好／較差

- **較好：**2024-07、2025-07 及各年份可讀的題目頁，頁面 OCR 平均多在 80 分以上。
- **較差：**2023-12、2024-12 PDF 第 9 頁，以及 2021-07 PDF 第 2 頁，均為影像損毀或不可辨讀。2024-12 PDF 第 52 頁答案頁也不可讀。
- **版本疑點：**2024-12 檔名標示 2024-12，但內頁頁首印有 `23-2`。資料年月暫依檔名登錄，需人工確認考卷版本。

## 答案與頻率規則

- 目前只在 2023-12 找到可讀答案鍵，答案選項號已保存在 `questions.json`。即使某頁 OCR 不佳，也只記答案號，不推測題目內容。
- 其餘 8 份沒有可讀答案鍵，所有題目均標 `answer_unknown: true`。
- 排行榜只將 `correct_answer` 與 `tested_word` 作為統計類型；文章偶見詞不能算正式考點。詞彙目前採題目標示詞作為 `tested_word`。
- 相同詞的活用形應歸併基本詞條；本批已整理詞條使用基本形。文法用 `grammar_family` / `grammar_variant` 欄位承載合併資訊。
- 目前每個詞／文法多只在單次已整理考點出現，因此 Top 列表按已收錄資料排序，不能用來宣稱跨九份考卷的重複率。補齊更多答案鍵、逐題切分與人工核對後，才能得到可信的跨卷頻率排行。

## 人工確認清單

- 2021-07 PDF 第 2 頁；2023-12 與 2024-12 PDF 第 9 頁；2024-12 PDF 第 52 頁。
- 2024-12 考卷的年份／版本內碼。
- 2023-12 以外 8 份答案鍵與正解選項。
- 所有逐頁 OCR 的漢字、假名、題號及選項對位；目前保留頁面級 OCR 原文，尚未人工逐題校訂。
- 2023-12 題目 q31–42 已對照 300 DPI 原頁及答案頁逐題結構化，其中 11 題可作答、q38 姓氏 OCR 不確定而待複核。其餘 411 題只有頁級 OCR transcript，未逐題切分與核答案，均標記 `needs_review: true`。

## 資料統計

- 成功檢查 PDF：9 份；建立題目 metadata：423 題。
- Vocabulary：20 個詞條（其中 2 個 OCR 詞形待確認）。
- Grammar：12 個考點（11 個已核實，1 個待複核）。
- 完整高頻 Top 30：目前無法負責任地產生。`analysis/vocabulary_frequency.json` 與 `analysis/grammar_frequency.json` 收錄暫行排行及其涵蓋限制；不滿 30 筆的清單不會補猜詞條。

## 輸出檔案

- `data/exams.json`：考卷 metadata 與逐頁 OCR transcript。
- `data/questions.json`：423 筆題目 metadata、題型、答案可知狀態與來源頁碼。
- `data/vocabulary.json`：單字資料庫。
- `data/grammar.json`：文法資料庫。
- `data/generated_questions.json`：同考點變化題；含 33 題可用文法變化題與 3 題待核實項目。
- `analysis/vocabulary_frequency.json`：暫行單字排行。
- `analysis/grammar_frequency.json`：暫行文法排行。
- `analysis/yearly_statistics.json`：考卷／年份統計。
- `analysis/review_needed.json`：低品質頁與待核對資料。



## 學習網站（目前版本）

網站檔案：`index.html`、`css/style.css`、`js/`。網站以原生 HTML、CSS、JavaScript 與靜態 JSON 運作，沒有後端伺服器或建置步驟。所有靜態資源與題庫均使用相對路徑；頁面導覽使用 hash，因此重新整理首頁或 `#practice`、`#vocabulary` 等功能頁不會要求 GitHub Pages 尋找不存在的伺服器路由。

### GitHub Pages 部署

1. 將整個專案推送到 GitHub repository，repository 名稱若為 `jlpt-n2-study`，網址會是 `https://<你的 GitHub 帳號>.github.io/jlpt-n2-study/`。
2. 在 repository 的 **Settings → Pages → Build and deployment**，將 **Source** 設為 **GitHub Actions**。
3. 將變更推送至 `main` 或 `master` 分支，或在 **Actions → Deploy static site to GitHub Pages** 手動執行部署工作流程。部署完成後，從該 workflow 的部署結果開啟網站。
4. 日後更新 `data/*.json` 並推送至相同分支，workflow 會重新部署到同一個網址；瀏覽器若仍顯示舊資料，請強制重新整理。

`.github/workflows/pages.yml` 直接發布 repository 根目錄，`.nojekyll` 避免 GitHub Pages/Jekyll 忽略靜態檔案。無需 Node.js、框架、後端或額外建置工具。本機預覽仍可在專案資料夾執行 `python -m http.server 8000`，再開啟 `http://127.0.0.1:8000/`；請勿用 `file://` 開啟，因瀏覽器會限制 JSON 載入。

目前已完成 Dashboard、單字／文法清單與搜尋、四種單字變化四選一、單字配對、錯題本與知識點統計；答題資料存在瀏覽器 localStorage，與 JSON 題庫分離；題庫版本為 `dataVersion: 1.1`，題目採穩定考期＋題號 ID，更新題庫不會清除學習紀錄。單字題會標示「同考點變化題」，不顯示真題年份。2023-12 的文法題 q31–37、q39–42 已逐題核實，可作答真題共 11 題；q38 及其餘考卷題目仍排除。作答前不顯示答案，作答後顯示答案、中文翻譯及四個選項說明。文法資料有 11 個核實考點，另有 33 個同考點文法變化題供答錯後延後測驗；每個已核實考點有 3 種變化題，3 個源自待核實 q38 的題目已排除。真題答錯後會隔 2–5 題安排尚未作答的同考點變化題。

網站目前仍需完成：逐題核實其餘八份考卷的題幹、四個選項與答案；擴增並持續人工審核文法變化題庫；單字搭配／相似詞練習；完整的每日計畫、配對文法與讀音、完整 Top 20/50 排名，以及其餘八份考卷逐題結構化。

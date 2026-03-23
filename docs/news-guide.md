# News Guide

這份文件說明如何在本專案新增一則最新消息（news）。

## 1. 新增檔案位置

請在 `content/news` 底下用年月分層建立 markdown 檔案：

- `content/news/YYYY/MM/your-slug.md`

範例：

- `content/news/2026/03/my-event.md`

`your-slug` 請使用英文小寫與連字號，避免空白與中文，以確保網址穩定。

## 2. Frontmatter 必填與選填欄位

本專案的欄位規格定義在 `content.config.ts` 的 `news` collection。

### 必填

- `title`: 標題（字串）
- `description`: 摘要（字串）
- `date`: 日期（字串，建議 `YYYY-MM-DD`）
- `category`: 分類（字串，例如：`活動公告`）

### 選填

- `cover`: 封面圖片路徑（例如：`/image/news/xxx.png`）
- `tags`: 標籤陣列（例如：`[AI, 論壇]`）
- `featured`: 是否置頂（`true` / `false`）
- `status`: `upcoming` | `ongoing` | `past`
- `externalLink`: 外部連結
- `draft`: 草稿（`true` 時不會顯示在列表）

## 3. 可直接複製的範本

```md
---
title: 你的消息標題
description: 這則消息的簡短摘要
date: 2026-03-23
category: 活動公告
cover: /image/news/your-image.png
tags:
  - AI
  - 論壇
featured: false
status: upcoming
externalLink: https://example.com
draft: false
---

這裡是內文。

## 小節標題

- 重點 1
- 重點 2
```

## 4. 顯示與排序規則

列表頁實作在 `app/pages/news/index.vue`，目前行為如下：

- 只顯示 `draft !== true` 的文章
- `featured: true` 會排在前面（置頂）
- 其餘依 `date` 由新到舊排序
- 每篇文章可點進 `/news/...slug` 詳情頁

詳情頁實作在 `app/pages/news/[...slug].vue`，會顯示內文與 `externalLink`（若有）。

## 5. 圖片放置建議

- 封面圖請放在 `public/image/news/`
- `cover` 請使用網站相對路徑（以 `/` 開頭）
- 例如：`/image/news/my-event.png`

## 6. 新增後檢查流程

1. 啟動開發模式：`npm run dev`
2. 檢查列表頁：`/news`
3. 檢查詳情頁網址是否可直接開啟與分享
4. 靜態輸出驗證：`npm run generate`

若 `npm run generate` 成功，通常表示可正常部署到 GitHub Pages。

## 7. 常見問題

- 列表看不到新文章：
  - 檢查是否誤設 `draft: true`
  - 檢查 frontmatter 必填欄位是否缺少
  - 檢查檔案是否放在 `content/news/**` 路徑下
- 日期排序怪怪的：
  - 統一使用 `YYYY-MM-DD` 格式
- 圖片沒顯示：
  - 確認檔案存在於 `public/image/news/`
  - 確認 `cover` 路徑是 `/image/news/...`

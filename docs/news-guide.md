# 最新消息維護指南

## 內容位置與雙語

每則消息使用相同相對路徑的中英文檔案：
- `content/news/zh/YYYY/MM/your-slug.md`
- `content/news/en/YYYY/MM/your-slug.md`

`urlname` 與檔案路徑發布後請勿更改。後台 `/admin/` 的結構性欄位使用 `i18n: duplicate`；直接修改 Markdown 時，兩種語言要一起更新。

## 狀態與篩選

活動狀態與報名狀態分開維護：

| 欄位 | 值 | 意義 |
| --- | --- | --- |
| status | upcoming / ongoing / past | 即將開始／進行中／已結束 |
| registrationStatus | open / closed / not_open / unknown | 開放報名／已截止／尚未開放／待確認 |
| externalLinkType | information / registration | 一般資訊或競賽官網／報名表單 |

未填狀態的一般公告只進入「全部消息」。不從文章標題、置頂、有無表單、發布日期推測報名狀態。

- 全部消息：所有非草稿消息。
- 開放報名：`registrationStatus: open` 且 `status` 不是 `past`。
- 即將舉行／進行中：`status` 是 `upcoming` 或 `ongoing`，可能與開放報名重疊。
- 活動回顧：`status: past`；沒有影片的活動也收錄。
- 每個分類內先置頂，再依 `updatedAt`（空白時用 `date`）由新到舊排序。
- 影片標籤獨立於活動狀態；保留 `videos` 或 `videoLink`。

`externalLinkType: registration` 的按鈕只在開放報名時顯示。其他連結保留「前往外部連結」，不把競賽官網誤當成報名表。已關閉的表單資訊可保留於歷史文章內文，頁首會提醒目前未開放報名。

## 日期欄位

- `date`：發布日期，亦決定後台年月目錄；不能改成活動日期。
- `updatedAt`：最近更新日期，選填。
- `eventStart` / `eventEnd`：活動起訖日，`YYYY-MM-DD`，選填；單日填相同日期，系列活動填首末場。末場待定就留空，不以首場當結束日。
- `registrationDeadline`：報名截止，選填。只有日期填 `YYYY-MM-DD`；有精確時刻填 `2026-10-16T23:59:00+08:00`，顯示使用台北時間。

日期用於展示與檢查，**不會自動切換活動或報名狀態**。本站為靜態部署，截止、額滿、延期或活動結束時，編輯者應更新欄位並發布，重新生成網頁與 AI 導覽知識。未確認的報名情況用 `unknown`，不得由競賽繳件截止日推測報名截止。

## 範本

```yaml
---
title: 活動標題
urlname: example-event
description: 活動摘要
date: 2026-09-24
category: 活動公告
status: upcoming
registrationStatus: open
eventStart: 2026-10-02
eventEnd: 2026-10-02
registrationDeadline: 2026-09-30T17:00:00+08:00
externalLink: https://example.com/register
externalLinkType: registration
featured: false
draft: false
---
```

其他欄位：`cover` 為 `/image/news/...` 圖片路徑；`tags` 是標籤陣列；`videos` 是多支影片；`videoLink` 為舊版單支影片；`notesLink` 為筆記連結。

## 發布檢查

1. `node --test scripts/news-state.test.mjs`：分類邊界、排序、連結、日期與中英欄位一致性。
2. `node scripts/check-content-pairs.mjs`：中英文檔案配對。
3. `node scripts/check-news-dates.mjs`：依台北日期提醒可能過期的人工狀態，並檢查日期格式與起訖順序。
4. `npm run generate`：靜態建置並生成 `.output/public/knowledge.txt`。
5. 檢查 `/news`、`/en/news` 的四種篩選、圖片／條列模式、窄螢幕換行、鍵盤焦點與文章連結。

AI 知識會帶入活動狀態、報名狀態與日期。狀態待確認的活動不應被推薦為開放報名。

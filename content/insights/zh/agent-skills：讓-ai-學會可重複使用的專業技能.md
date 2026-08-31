---
title: Agent Skills：讓 AI 學會可重複使用的專業技能
urlname: agent-skills-progressive-disclosure
description: Agent Skills 將工作流程、規則與領域知識封裝成可重複使用的 AI 能力，使模型能透過「漸進式披露」機制執行複雜任務，同時避免佔用過多上下文空間。
date: 2026-08-31
updatedAt: 2026-08-31
audiences:
  - application
  - researcher
  - developer
author: 黃暐宸
affiliation: 國立臺北大學統計學系
tags:
  - Agent Skills
  - Progressive Disclosure
  - Anthropic
  - Last30Days
  - Humanizer
featured: false
draft: false
---

## **Agent Skills**

近期 Agentic AI 值得關注的發展之一，是 [**Agent Skills**](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)。過去使用生成式 AI，常需要每次重新輸入 Prompt、背景資料與工作要求；Agent Skills 則可以把一套工作方法、規則、參考資料與工具封裝成可重複使用的「技能」，讓 AI 在遇到適合的任務時自行載入並執行。這使 AI 不只是回答問題，而是能依照既定流程完成較複雜、重複性高的工作，也讓個人或組織能逐步累積自己的 AI 工作能力。對企業來說，同一套技能也能讓不同人使用相近流程，降低重複教學與操作差異。

## **Progressive Disclosure**

Skill 的重要概念之一是 [**Progressive Disclosure（漸進式披露）**](https://blog.aihao.tw/2026/05/20/llm-knowledge-base/)。AI 不需要一開始就讀取所有 Skills 的完整內容，而是先知道目前有哪些技能，再根據任務判斷需要哪一項，之後才載入相關指令、文件、範例與其他資源。這種方式可以減少 Context 與 Token 的浪費，也避免一次塞入過多資訊影響模型判斷。當 Skills 數量愈來愈多時，這種「需要時才載入」的設計，也讓 Agent 更容易擴充不同領域的專業能力。

## **一般人也能使用Skill**

更重要的是，**Skill 不只適合開發者**。一般使用者也能把經常重複的工作整理成 Skill，例如依公司格式製作會議紀錄、按照固定規則整理研究論文、修改英文履歷、產生每週工作報告，甚至整理旅遊規劃或個人學習流程。使用者主要需要把操作步驟、規則、範例與參考資料整理清楚，不一定要會複雜程式設計，也可以直接使用別人建立好的 Skill，再依自己的需求調整內容。未來使用 AI 的能力可能不只是「會下 Prompt」，而是**懂得把自己的知識與工作流程整理成 AI 可以反覆使用的 Skill**，讓 AI 真正成為可持續累積能力的工作助手。

## **Agent Skills 推薦**

如果想實際體驗 Agent Skills，可以先從 GitHub 上熱門且用途廣泛的專案開始。例如 [**Anthropic 官方 Skills**](https://github.com/anthropics/skills?utm_source=chatgpt.com) 約有 **17.1 萬顆星**，其中包含 PDF、PowerPoint、Word、Excel 等文件處理 Skills，適合日常辦公與資料整理，也是了解 Skill 設計方式最直接的範例。另外，[**Last30Days**](https://github.com/mvanhorn/last30days-skill?utm_source=chatgpt.com) 約有 **5.9 萬顆星**，可以自動搜尋 Reddit、X、YouTube、TikTok、Hacker News 與網路資料，整理某個主題近期的討論與趨勢，很適合做市場調查或新知蒐集。而 [**Humanizer**](https://github.com/blader/humanizer?utm_source=chatgpt.com) 約有 **3.8 萬顆星**，主要功能是協助修改文字中常見的 AI 寫作痕跡，讓文章語氣更自然，對報告、文章與一般文書工作都相當實用。這些案例也顯示，Agent Skills 已不只是開發者的工具，而是逐漸延伸到研究、寫作與日常辦公等一般使用情境。

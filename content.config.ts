import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const newsSchema = z.object({
  title: z.string(),
  description: z.string(),
  // 編輯後台（/admin）用來決定檔名與網址；中英文兩邊必須相同才會配對成功
  urlname: z.string().optional(),
  date: z.string(),
  // 最近更新時間（如影片/筆記上架）。有設定時用於列表排序，讓新更新的活動浮到最上面。
  updatedAt: z.string().optional(),
  category: z.string(),
  cover: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(["upcoming", "ongoing", "past"]).optional(),
  externalLink: z.string().optional(),
  videoLink: z.string().optional(),
  // 多支活動影片（YouTube 連結），會依序以 Part 1、Part 2… 呈現。
  videos: z.array(z.string()).optional(),
  // 會議筆記連結（Notion）。
  notesLink: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

const partnersSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  cover: z.string().optional(),
  logo: z.string().optional(),
  status: z.enum(["upcoming", "ongoing", "ended"]).optional(),
  organizer: z.string().optional(),
  sponsor: z.string().optional(),
  period: z.string().optional(),
  externalLink: z.string().optional(),
  results: z
    .array(
      z.object({
        rank: z.number(),
        team: z.string(),
        school: z.string().optional(),
      }),
    )
    .optional(),
  order: z.number().optional().default(0),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
});

// 前沿新知：知識型長文，非時效性內容，因此不用年月資料夾
const insightsSchema = z.object({
  title: z.string(),
  // 編輯後台用來決定檔名與網址；中英文兩邊必須相同
  urlname: z.string().optional(),
  description: z.string(),
  date: z.string(),
  updatedAt: z.string().optional(),
  // 目標受眾（可複選）。存英文代碼、顯示文字放語言檔，
  // 避免像消息分類那樣中英各自寫出不一致的字串。
  audiences: z.array(z.enum(["application", "developer", "researcher"])).default([]),
  author: z.string().optional(),
  affiliation: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  draft: z.boolean().optional().default(false),
});

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: "page",
      // 中英文各自放在 content/news/{語言}/ 底下——這是編輯後台的 multiple_folders
      // 結構唯一支援的排法，才能把中英視為同一筆內容、一次儲存寫兩個檔。
      // prefix 把網址裡的語言資料夾去掉，維持既有連結不變。
      source: { include: "news/zh/**/*.md", prefix: "/news" },
      schema: newsSchema,
    }),
    news_en: defineCollection({
      type: "page",
      source: { include: "news/en/**/*.md", prefix: "/en/news" },
      schema: newsSchema,
    }),
    insights: defineCollection({
      type: "page",
      source: { include: "insights/zh/**/*.md", prefix: "/insights" },
      schema: insightsSchema,
    }),
    insights_en: defineCollection({
      type: "page",
      source: { include: "insights/en/**/*.md", prefix: "/en/insights" },
      schema: insightsSchema,
    }),
    partners: defineCollection({
      type: "page",
      source: "partners/**/*.md",
      schema: partnersSchema,
    }),
    partners_en: defineCollection({
      type: "page",
      source: "en/partners/**/*.md",
      schema: partnersSchema,
    }),
  },
});

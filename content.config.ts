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

// 常見問題：一題一個檔，body 是答案。沒有獨立網址，urlname 只用於中英配對。
const faqSchema = z.object({
  title: z.string(), // 問題
  answer: z.string(),
  urlname: z.string().optional(),
  order: z.number().default(0),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

// 計畫團隊：一位成員一個檔。分區（section）與版面排列仍在 app/pages/team.vue，
// 因為那屬於版面結構；後台只管成員資料與同一區內的排序。
const teamSchema = z.object({
  title: z.string(), // 姓名
  urlname: z.string().optional(),
  section: z.enum([
    "pi",
    "sigagent",
    "sigrobot",
    "agenticConsultants",
    "roboticsConsultants",
  ]),
  order: z.number().default(0),
  role: z.string().optional(),        // 職稱
  bio: z.string().optional(),         // 簡介
  image: z.string().optional(),
  link: z.string().optional(),
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
    faq: defineCollection({
      type: "page",
      source: { include: "faq/zh/**/*.md" },
      schema: faqSchema,
    }),
    faq_en: defineCollection({
      type: "page",
      source: { include: "faq/en/**/*.md" },
      schema: faqSchema,
    }),
    team: defineCollection({
      type: "page",
      source: { include: "team/zh/**/*.md" },
      schema: teamSchema,
    }),
    team_en: defineCollection({
      type: "page",
      source: { include: "team/en/**/*.md" },
      schema: teamSchema,
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

import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const newsSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  category: z.string(),
  cover: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(["upcoming", "ongoing", "past"]).optional(),
  externalLink: z.string().optional(),
  videoLink: z.string().optional(),
  draft: z.boolean().optional().default(false),
});

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: "page",
      source: "news/**/*.md",
      schema: newsSchema,
    }),
    news_en: defineCollection({
      type: "page",
      source: "en/news/**/*.md",
      schema: newsSchema,
    }),
  },
});

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

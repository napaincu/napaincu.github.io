import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: "page",
      source: "news/**/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string(),
        category: z.string(),
        cover: z.string().optional(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().optional().default(false),
        status: z.enum(["upcoming", "ongoing", "past"]).optional(),
        externalLink: z.string().optional(),
        draft: z.boolean().optional().default(false),
      }),
    }),
  },
});

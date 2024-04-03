import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorLink: z.string(),
    authorAt: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.object({ title: z.string(), color: z.string() })),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

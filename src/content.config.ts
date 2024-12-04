import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorLink: z.string(),
    authorAvatar: z.string().url(),
    authorAt: z.string(),
    publishedAt: z.date(),
    tags: z.array(z.object({ title: z.string(), color: z.string() })),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

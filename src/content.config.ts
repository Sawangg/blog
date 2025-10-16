import { defineCollection, z } from "astro:content";
import { MARKDOWN_PATH } from "astro:env/server";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: MARKDOWN_PATH, pattern: "**/*.md" }),
  schema: z.object({
    author: z.string(),
    authorAt: z.string(),
    authorAvatar: z.string().url(),
    authorLink: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    publishedAt: z.date(),
    tags: z.array(z.object({ color: z.string(), title: z.string() })),
    title: z.string(),
    updatedAt: z.date().optional(),
  }),
});

export const collections = { blog };

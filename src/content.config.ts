import { defineCollection, z } from "astro:content";
import { MARKDOWN_PATH } from "astro:env/server";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: MARKDOWN_PATH }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    authorLink: z.string(),
    authorAvatar: z.string().url(),
    authorAt: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.object({ title: z.string(), color: z.string() })),
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

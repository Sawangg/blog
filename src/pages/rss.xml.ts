import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context: { site: string }) {
  const blog = await getCollection("blog");
  return rss({
    description: "My blog for all tech related news",
    items: blog.map((post) => ({
      description: post.data.description,
      link: `/posts/${post.id}/`,
      pubDate: post.data.publishedAt,
      title: post.data.title,
    })),
    site: context.site,
    title: "Leo Mercier's blog",
  });
}

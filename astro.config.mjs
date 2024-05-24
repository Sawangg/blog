import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  output: "server",
  site: "https://leomercier.blog",
  prefetch: true,
  integrations: [tailwind({ applyBaseStyles: true }), mdx(), react(), sitemap(), robotsTxt()],
  image: {
    remotePatterns: [{ protocol: "https" }],
  }
});

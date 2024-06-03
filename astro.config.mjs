import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  output: "server",
  // adapter: "", // TODO
  site: "https://leomercier.blog",
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  prefetch: true,
  integrations: [
    tailwind({ applyBaseStyles: true }),
    mdx({
      shikiConfig: {
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
      },
    }),
    react(),
    sitemap(),
    robotsTxt(),
  ],
});

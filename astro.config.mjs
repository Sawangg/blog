// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import robotsTxt from "astro-robots-txt";
import { defineConfig, passthroughImageService } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://leomercier.blog",
  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  prefetch: true,
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    mdx({
      shikiConfig: {
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
      },
    }),
    react(),
    playformCompress({
      CSS: false,
    }),
    sitemap(),
    robotsTxt(),
  ],
});

// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import robotsTxt from "astro-robots-txt";
import { defineConfig, envField, passthroughImageService } from "astro/config";

export default defineConfig({
  site: "https://leomercier.blog",
  output: "server",
  adapter: cloudflare(),
  integrations: [
    playformCompress({
      CSS: false,
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
    robotsTxt(),
    sitemap(),
    tailwind(),
  ],
  security: {
    checkOrigin: true,
  },
  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  experimental: {
    clientPrerender: true,
    env: {
      schema: {
        // TODO: Change access to secret for DB_URL and GITHUB_CLIENT_SECRET when getSecret is stable with cloudflar
        DB_URL: envField.string({ context: "server", access: "public" }),
        GITHUB_CLIENT_ID: envField.string({ context: "server", access: "public" }),
        GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "public" }),
        GITHUB_REDIRECT_URI: envField.string({ context: "server", access: "public" }),
      },
    },
  },
});

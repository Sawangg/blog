import cloudflare from "@astrojs/cloudflare";
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
  integrations: [playformCompress({ CSS: false }), react(), robotsTxt(), sitemap(), tailwind()],
  // NOTE: Remove this after this is fixed: https://github.com/withastro/adapters/pull/436
  // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
  // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
  vite: {
    resolve: {
      // @ts-expect-error: only in prod
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  image: {
    service: passthroughImageService(),
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  env: {
    schema: {
      // TODO: Change access to secret for DB_URL and GITHUB_CLIENT_SECRET when getSecret is stable with cloudflare
      DB_URL: envField.string({ context: "server", access: "public" }),
      SESSION_COOKIE: envField.string({ context: "server", access: "public" }),
      SESSION_EXPIRY: envField.number({ context: "server", access: "public" }),
      GITHUB_CLIENT_ID: envField.string({ context: "server", access: "public" }),
      GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "public" }),
      GITHUB_REDIRECT_URI: envField.string({ context: "server", access: "public" }),
    },
    validateSecrets: true,
  },
  experimental: {
    clientPrerender: true,
    svg: true,
  },
});

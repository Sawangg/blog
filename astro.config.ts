import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig, envField, passthroughImageService } from "astro/config";

export default defineConfig({
  site: "https://leomercier.blog",
  output: "server",
  adapter: cloudflare(),
  integrations: [playformCompress(), react(), robotsTxt(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // NOTE: Remove this after this is fixed: https://github.com/withastro/astro/issues/12824
    // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
    // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
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
      // NOTE: Change access to secret for DB_URL and GITHUB_CLIENT_SECRET if you're not using the cloudflare adapter
      MARKDOWN_PATH: envField.string({ context: "server", access: "public" }),
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
    preserveScriptOrder: true,
  },
});

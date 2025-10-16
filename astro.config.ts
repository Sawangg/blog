import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders, passthroughImageService } from "astro/config";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
  adapter: cloudflare(),
  devToolbar: {
    enabled: false,
  },
  env: {
    schema: {
      DB_URL: envField.string({ access: "secret", context: "server" }),
      GITHUB_CLIENT_ID: envField.string({ access: "public", context: "server" }),
      GITHUB_CLIENT_SECRET: envField.string({ access: "secret", context: "server" }),
      GITHUB_REDIRECT_URI: envField.string({ access: "public", context: "server" }),
      MARKDOWN_PATH: envField.string({ access: "public", context: "server" }),
      SESSION_COOKIE: envField.string({ access: "public", context: "server" }),
      SESSION_EXPIRY: envField.number({ access: "public", context: "server" }),
    },
    validateSecrets: true,
  },
  experimental: {
    clientPrerender: true,
    fonts: [
      {
        cssVariable: "--font-aktiv-grotesk",
        fallbacks: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        name: "Aktiv Grotesk",
        provider: "local",
        variants: [
          {
            src: ["./src/assets/fonts/aktivgrotesk.woff2"],
            style: "normal",
            weight: "100 800",
          },
        ],
      },
      {
        cssVariable: "--font-jetbrains-mono",
        fallbacks: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        name: "JetBrains Mono",
        provider: fontProviders.fontsource(),
      },
    ],
    preserveScriptOrder: true,
    staticImportMetaEnv: true,
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
    service: passthroughImageService(),
  },
  integrations: [playformCompress(), react(), robotsTxt(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
  },
  output: "server",
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  site: "https://blog.leomercier.dev",
  vite: {
    plugins: [tailwindcss()],
  },
});

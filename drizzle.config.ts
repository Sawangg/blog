import type { Config } from "drizzle-kit";
import { loadEnv } from "vite";

// NOTE: The modes in this project can be development, staging, production
const mode = process.env.NODE_ENV;
if (!mode) throw new Error("Unable to find the current mode");
const { DB_URL } = loadEnv(mode, process.cwd(), "");

export default {
  casing: "snake_case",
  dbCredentials: {
    url: DB_URL as string,
  },
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  strict: true,
} satisfies Config;

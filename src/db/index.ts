import { DB_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle({ casing: "snake_case", connection: DB_URL });

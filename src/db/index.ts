import { DB_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/neon-http";

// NOTE: We can't use drizzle studio because of astro:env
export const db = drizzle({ connection: DB_URL, casing: "snake_case" });

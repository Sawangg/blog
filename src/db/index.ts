import { DB_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle({ connection: DB_URL, casing: "snake_case" });

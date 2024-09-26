import { DB_URL } from "astro:env/server";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(neon(DB_URL));

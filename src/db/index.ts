import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

let db: ReturnType<typeof drizzle>;

// NOTE: We have to do this check to allow both astro:env & drizzle studio to run
// TODO: Check if declarative import has impact on performance
if (typeof require !== "undefined") {
  const DB_URL = process.env.DB_URL;
  if (!DB_URL) throw new Error("DB_URL not found");
  db = drizzle(neon(DB_URL));
} else {
  (async () => {
    const { DB_URL } = await import("astro:env/server");
    db = drizzle(neon(DB_URL));
  })();
}

export { db };

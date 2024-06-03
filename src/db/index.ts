import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Run in CJS with studio else run in MJS
const dbUrl =
  typeof process !== "undefined" && process.env.DB_URL
    ? process.env.DB_URL
    : typeof import.meta !== "undefined" && import.meta.env && import.meta.env.DB_URL;

//if (!dbUrl) {
//  const { env } = Astro.locals.runtime;
//}

export const db = drizzle(neon(dbUrl));

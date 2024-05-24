import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Run in CJS with studio else run in MJS
const dbUrl = typeof process !== 'undefined' && process.env.DB_URL ? process.env.DB_URL 
  : (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DB_URL);

export const db = drizzle(postgres(dbUrl));

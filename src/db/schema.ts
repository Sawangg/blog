import { db } from "@db/index";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text().primaryKey(),
  admin: boolean().default(false).notNull(),
  username: text().notNull(),
  email: text().unique(),
  image: text().notNull(),
  githubId: text(),
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp({
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const posts = pgTable("posts", {});

export const likes = pgTable("likes", {});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

import { db } from "@db/index";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  admin: boolean("admin").default(false).notNull(),
  username: text("username").notNull(),
  email: text("email"),
  image: text("image").notNull(),
  githubId: text("github_id"),
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const posts = pgTable("posts", {});

export const likes = pgTable("likes", {});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

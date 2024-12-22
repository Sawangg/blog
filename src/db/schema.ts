import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial().primaryKey(),
  email: text().unique().notNull(),
  username: text().unique().notNull(),
  avatar: text().notNull(),
  admin: boolean().default(false).notNull(),
  githubId: integer().unique(),
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable("sessions", {
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp({
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessions.$inferSelect;

export const likes = pgTable("likes", {});

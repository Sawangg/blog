import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  admin: boolean().default(false).notNull(),
  avatar: text().notNull(),
  email: text().unique().notNull(),
  githubId: integer().unique(),
  id: serial().primaryKey(),
  username: text().unique().notNull(),
});

export type User = typeof users.$inferSelect;

export const sessions = pgTable("sessions", {
  expiresAt: timestamp({
    mode: "date",
    withTimezone: true,
  }).notNull(),
  id: text().primaryKey(),
  userId: integer()
    .notNull()
    .references(() => users.id),
});

export type Session = typeof sessions.$inferSelect;

export const likes = pgTable("likes", {});

import { db } from "@db/index";
import { type User, users } from "@db/schema";

export const createUser = async (email: string, username: string, avatar: string, githubId?: number): Promise<User> => {
  const user: typeof users.$inferInsert = {
    email,
    username,
    avatar,
  };

  if (githubId) user.githubId = githubId;

  const rows = await db.insert(users).values(user).returning();
  if (rows.length < 1 || !rows[0]) throw new Error("Unexpected error");
  return rows[0];
};

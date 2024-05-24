import { db } from "@db/index";
import { users } from "@db/schema";
import { eq, sql } from "drizzle-orm";

export const preparedExistingGithubUser = db
  .select()
  .from(users)
  .where(eq(users.githubId, sql.placeholder("githubId")))
  .prepare("existingGithubUser");

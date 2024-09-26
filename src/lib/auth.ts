import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI } from "astro:env/server";
import { adapter } from "@db/schema";
import type { User } from "@db/schema";
import { GitHub } from "arctic";
import { Lucia, TimeSpan } from "lucia";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  sessionExpiresIn: new TimeSpan(4, "w"),
  getUserAttributes: (attributes) => ({ ...attributes }),
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, "githubId">;
  }
}

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_REDIRECT_URI);

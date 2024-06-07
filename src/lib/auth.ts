import { adapter } from "@db/schema";
import { GitHub } from "arctic";
import { Lucia } from "lucia";

type DatabaseUserAttributes = {
  username: string;
  image: string;
  admin: boolean;
};

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: import.meta.env.PROD,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      image: attributes.image,
      admin: attributes.admin,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const github = new GitHub(import.meta.env.GITHUB_CLIENT_ID, import.meta.env.GITHUB_CLIENT_SECRET, {
  redirectURI: import.meta.env.GITHUB_REDIRECT_URI,
});

import type { APIContext } from "astro";
import { db } from "@db/index";
import { preparedExistingGithubUser } from "@db/prepared/userGithub";
import { users } from "@db/schema";
import { github, lucia } from "@lib/auth";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";

type GitHubUser = {
  id: string;
  login: string;
  avatar_url: string;
};

export async function GET(context: APIContext): Promise<Response> {
  const code = context.url.searchParams.get("code");
  const state = context.url.searchParams.get("state");
  const storedState = context.cookies.get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await res.json();

    const existingUser = (await preparedExistingGithubUser.execute({ githubId: githubUser.id }))[0];
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
      return context.redirect("/");
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await db.insert(users).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login,
      image: githubUser.avatar_url,
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return context.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }
    console.log(e);
    return new Response(null, { status: 500 });
  }
}

import { preparedExistingGithubUser } from "@db/prepared/userGithub";
import { github } from "@lib/oauth";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@lib/session";
import { createUser } from "@lib/user";
import { OAuth2RequestError } from "arctic";
import type { APIContext } from "astro";

export async function GET(ctx: APIContext): Promise<Response> {
  const code = ctx.url.searchParams.get("code");
  const state = ctx.url.searchParams.get("state");
  const storedState = ctx.cookies.get("state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response("Please restart the process.", { status: 400 });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
        "User-Agent": "auth", // Needed for Cloudflare
      },
    });
    const githubUser: { id: number; login: string; avatar_url: string } = await userRes.json();

    const existingUser = (await preparedExistingGithubUser.execute({ githubId: githubUser.id }))[0];
    if (existingUser) {
      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, existingUser.id);
      setSessionTokenCookie(ctx, sessionToken, session.expiresAt);
      return ctx.redirect("/");
    }

    const emailRes = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
        "User-Agent": "auth", // Needed for Cloudflare
      },
    });
    const emails: { email: string; verified: boolean; primary: boolean }[] = await emailRes.json();
    if (!Array.isArray(emails) || emails.length < 1) {
      return new Response("Please restart the process.", { status: 400 });
    }
    const email = emails.find((email) => email.primary && email.verified)?.email;
    if (!email) return new Response("Unable to find your email.", { status: 400 });

    const user = await createUser(email, githubUser.login, githubUser.avatar_url, githubUser.id);
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    setSessionTokenCookie(ctx, sessionToken, session.expiresAt);
    return ctx.redirect("/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, { status: 400 });
    }
    return new Response(null, { status: 500 });
  }
}

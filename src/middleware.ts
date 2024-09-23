import { defineMiddleware } from "astro:middleware";
import { lucia } from "@lib/auth";
import { verifyRequestOrigin } from "lucia";

export const onRequest = defineMiddleware(async (ctx, next) => {
  // CSRF protection
  if (ctx.request.method !== "GET") {
    const originHeader = ctx.request.headers.get("Origin");
    const hostHeader = ctx.request.headers.get("Host");
    if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
      return new Response(null, { status: 403 });
    }
  }

  const sessionId = ctx.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    ctx.locals.user = null;
    ctx.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }
  ctx.locals.session = session;
  ctx.locals.user = user;
  return next();
});

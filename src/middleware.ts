import { defineMiddleware, sequence } from "astro:middleware";
import { lucia } from "@lib/auth";

const authMiddleware = defineMiddleware(async (ctx, next) => {
  const sessionId = ctx.cookies.get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    ctx.locals.user = null;
    ctx.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } else if (session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  }

  ctx.locals.session = session;
  ctx.locals.user = user;
  return next();
});

const securityHeadersMiddleware = defineMiddleware(async (_, next) => {
  const response = await next();
  if (response.headers.get("content-type") !== "text/html") return response;

  // NOTE: The nonce should not be create and replace here, it defeats the purpose of the CSP.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'none';
    script-src 'strict-dynamic' 'nonce-${nonce}';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: blob: data:;
    font-src 'self';
    form-action 'self';
    frame-ancestors 'none';
    base-uri 'none';
    connect-src 'self';
    upgrade-insecure-requests;
  `;
  const body = (await response.text()).replaceAll("<script", `<script nonce="${nonce}"`);

  response.headers.set("Access-Control-Allow-Origin", import.meta.env.PROD ? import.meta.env.SITE : "*");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin");
  response.headers.set(
    "Permissions-Policy",
    "accelerometer=(), autoplay=(self), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(self), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), xr-spatial-tracking=()",
  );
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim());
  response.headers.set("X-Nonce", nonce);

  return new Response(body, response);
});

export const onRequest = sequence(authMiddleware, securityHeadersMiddleware);

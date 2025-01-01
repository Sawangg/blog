import { SESSION_COOKIE } from "astro:env/server";
import { defineMiddleware, sequence } from "astro:middleware";
import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "@lib/session";

const authMiddleware = defineMiddleware(async (ctx, next) => {
  const token = ctx.cookies.get(SESSION_COOKIE)?.value ?? null;
  if (!token) {
    ctx.locals.user = null;
    ctx.locals.session = null;
    return next();
  }

  const { session, user } = await validateSessionToken(token);
  session ? setSessionTokenCookie(ctx, token, session.expiresAt) : deleteSessionTokenCookie(ctx);

  ctx.locals.session = session;
  ctx.locals.user = user;
  return next();
});

const securityHeadersMiddleware = defineMiddleware(async (_, next) => {
  const response = await next();
  if (response.headers.get("content-type") !== "text/html") return response;

  // NOTE: The nonce should not be created and replaced here, it defeats the purpose of the CSP.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
    default-src 'none';
    script-src 'strict-dynamic' 'nonce-${nonce}';
    style-src 'self' 'unsafe-inline';
    img-src 'self' https: blob: data:;
    frame-src 'self';
    font-src 'self';
    connect-src 'self';
    prefetch-src 'self';
    base-uri 'none';
    form-action 'self';
    frame-ancestors 'self';
    upgrade-insecure-requests;
  `;
  const body = (await response.text()).replaceAll("<script", `<script nonce="${nonce}"`);

  response.headers.set("Access-Control-Allow-Origin", import.meta.env.PROD ? import.meta.env.SITE : "*");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
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

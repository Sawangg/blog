import type { ActionAPIContext } from "astro:actions";
import { SESSION_COOKIE, SESSION_EXPIRY } from "astro:env/server";
import { db } from "@db/index";
import { type Session, type User, sessions, users } from "@db/schema";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import type { APIContext } from "astro";
import { eq } from "drizzle-orm";

// NOTE: Runtime needs Web Crypto API for this to work
export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const createSession = async (token: string, userId: number): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_EXPIRY),
  };
  await db.insert(sessions).values(session);
  return session;
};

export const validateSessionToken = async (token: string): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (!result[0]) return { session: null, user: null };

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * (SESSION_EXPIRY / 2)) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_EXPIRY);
    await db
      .update(sessions)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessions.id, session.id));
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
};

export const setSessionTokenCookie = (context: APIContext, token: string, expiresAt: Date): void => {
  context.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    expires: expiresAt,
    path: "/",
  });
};

export const deleteSessionTokenCookie = (context: APIContext | ActionAPIContext): void => {
  context.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge: 0,
    path: "/",
  });
};

export type SessionValidationResult = { session: Session; user: User } | { session: null; user: null };

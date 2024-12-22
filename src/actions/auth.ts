import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { github } from "@lib/oauth";
import { deleteSessionTokenCookie, invalidateSession } from "@lib/session";
import { generateCodeVerifier, generateState } from "arctic";

export const auth = {
  login: defineAction({
    accept: "json",
    input: z.object({ provider: z.enum(["github"]) }),
    handler(input, ctx): { url: URL } {
      const state = generateState();
      const codeVerifier = generateCodeVerifier();
      let url: URL | null;

      if (input.provider === "github") {
        url = github.createAuthorizationURL(state, []);
      } else {
        throw new ActionError({ code: "BAD_REQUEST" });
      }

      ctx.cookies.set("state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10, // 10 min
        sameSite: "lax",
      });

      ctx.cookies.set("code_verifier", codeVerifier, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10, // 10 min
        sameSite: "lax",
      });

      return { url };
    },
  }),

  logout: defineAction({
    async handler(_, ctx): Promise<void> {
      if (!ctx.locals.session) throw new ActionError({ code: "UNAUTHORIZED" });

      await invalidateSession(ctx.locals.session.id);
      deleteSessionTokenCookie(ctx);
    },
  }),
};

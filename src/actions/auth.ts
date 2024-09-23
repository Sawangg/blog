import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { github, lucia } from "@lib/auth";
import { generateState } from "arctic";

export const auth = {
  login: defineAction({
    accept: "json",
    input: z.object({ provider: z.enum(["github"]) }),
    handler(input, ctx) {
      const state = generateState();
      let url: URL;

      if (input.provider === "github") {
        url = github.createAuthorizationURL(state, []);
      }

      ctx.cookies.set("state", state, {
        path: "/",
        secure: import.meta.env.PROD,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
      });

      return { url: url.toString() };
    },
  }),
  logout: defineAction({
    async handler(_, ctx) {
      if (!ctx.locals.session) throw new ActionError({ code: "UNAUTHORIZED" });

      await lucia.invalidateSession(ctx.locals.session.id);

      const sessionCookie = lucia.createBlankSessionCookie();
      ctx.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    },
  }),
};

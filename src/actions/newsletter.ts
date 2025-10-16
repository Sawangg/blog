import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { db } from "@db/index";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

export const newsletter = {
  register: defineAction({
    accept: "form",
    async handler(input, ctx) {
      if (!ctx.locals.session || !ctx.locals.user) {
        throw new ActionError({ code: "UNAUTHORIZED", message: "Please login to be able to subscribe" });
      }
      await db.update(users).set({ email: input.email }).where(eq(users.id, ctx.locals.user.id));
    },
    input: z.object({ email: z.string().email() }),
  }),
};

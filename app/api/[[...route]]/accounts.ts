import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createId } from "@paralleldrive/cuid2";
import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(), 
    async (context) => {
      const auth = getAuth(context);

      if (!auth?.userId) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId))

      return context.json({ data });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (context) => {
      const auth = getAuth(context);
      const values = context.req.valid("json");

      if (!auth?.userId) {
        return context.json({ error: "Unauthorized" }, 401);
      }
      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        }).returning();

      return context.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (context) => {
      const auth = getAuth(context);
      const { ids } = context.req.valid("json");

      if (!auth?.userId) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, ids)
          )
        )
        .returning({
          id: accounts.id,
        });
      return context.json({ data });
    }
  )

export default app;
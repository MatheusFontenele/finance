import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono()
  .get(
    "/",
    clerkMiddleware(), 
    async (context) => {
      const auth = getAuth(context);

      if (!auth) {
        return context.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select({
          id: accounts.id,
          name: accounts.name,
        })
        .from(accounts);
      return context.json({ data });
    }
  );

export default app;
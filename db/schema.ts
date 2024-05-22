import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text('id').primaryKey(),
  userId: text('user_id'),
  name: text('name'),
});
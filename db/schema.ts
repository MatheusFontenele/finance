import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text('id').primaryKey(),
  name: text('name'),
  userId: text('user_id'),
  pladeId: text('plade_id'),
});
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";


export const accounts = pgTable("accounts", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
  pladeId: text('plade_id'),
});

export const insertAccountSchema = createInsertSchema(accounts)

export const categories = pgTable("categories", {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
  pladeId: text('plade_id'),
});

export const insertCategorySchema = createInsertSchema(categories)

export const transactions = pgTable("transactions", {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  payee: text('payee').notNull(),
  note: text('note'),
  date: timestamp('date', {mode: "date"}).notNull(),
  accountId: text('account_id').references(() =>accounts.id, {onDelete: "cascade"}).notNull(),
  categoryId: text('category_id').references(() =>categories.id, {onDelete: "set null"}),
});
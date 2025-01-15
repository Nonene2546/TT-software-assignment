import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hn: text().notNull().unique().generatedAlwaysAs('LPAD(id::TEXT, 6, \'0\')'),
  fname: varchar({ length: 255 }).notNull(),
  lname: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
});

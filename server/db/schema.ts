import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  date: timestamp().notNull(),
});

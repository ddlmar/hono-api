import type { InferSelectModel } from "drizzle-orm";
import users from "@dbSchema/user";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export type User = InferSelectModel<typeof users>;

export const selectUsersSchema = createSelectSchema(users).omit({
  password: true,
});

export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchUserSchema = insertUserSchema.partial().omit({
  password: true,
});

export const loginUserSchema = createSelectSchema(users).pick({
  email: true,
  password: true,
});

export const successfullyLoginSchema = createSelectSchema(users).pick({
  id: true,
  email: true,
});

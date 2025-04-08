import users from "@dbSchema/user";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const selectUsersSchema = createSelectSchema(users);

export const insertUserSchema = createInsertSchema(users, {
  name: z.string().min(1).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export const patchUserSchema = insertUserSchema.partial();

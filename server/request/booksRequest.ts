import type { z } from "zod";
import { bookModel } from "@model/booksModel";

export const bookRequestSchema = bookModel.omit({
  id: true,
});

type BookRequestSchema = z.infer<typeof bookRequestSchema>;

export type { BookRequestSchema };

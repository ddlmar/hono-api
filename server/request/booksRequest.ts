import { bookModel } from "@model/booksModel";
import { z } from "zod";

export const bookRequestSchema = bookModel.omit({
  id: true,
});

type BookRequestSchema = z.infer<typeof bookRequestSchema>;

export type { BookRequestSchema };

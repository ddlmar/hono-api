import { z } from "zod";

export const booksSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  date: z.string().min(10).max(10),
});

type Book = z.infer<typeof booksSchema>;

export type { Book };

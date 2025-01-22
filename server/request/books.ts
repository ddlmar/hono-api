import { z } from "zod";
import { bookModel } from "../model/books";

export const bookRequestSchema = bookModel.omit({
  id: true,
});

import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import type { Book } from "@model/booksModel";
import { bookRequestSchema } from "@request/booksRequest";
import { bearerAuth } from "hono/bearer-auth";
import { getCookie } from "hono/cookie";
import { jwt } from "hono/jwt";

const mockedBooks: Array<Book> = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    date: "1960-07-11",
    author: "Harper Lee",
  },
  {
    id: 2,
    title: "1984",
    date: "1949-06-08",
    author: "George Orwell",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    date: "1925-04-10",
    author: "F. Scott Fitzgerald",
  },
];

let id = mockedBooks.reduce((previousValue, currentValue) => {
  if (previousValue > currentValue.id) {
    return previousValue;
  }

  return currentValue.id;
}, 0);

export const booksRoute = new Hono()
  .use(
    "/*",
    jwt({
      secret: Bun.env.SECRET!,
    })
  )
  .get("/", (c) => {
    return c.json({ books: mockedBooks.reverse() });
  })
  .get("/authors", (c) => {
    const authors = mockedBooks.map((book) => book.author);

    return c.json({ authors });
  })
  .post(
    "/",
    zValidator("json", bookRequestSchema),
    bearerAuth({
      verifyToken: (token, c) => token === getCookie(c, "token"),
    }),
    (c) => {
      const data = c.req.valid("json");

      console.log(c.get("jwtPayload"));

      const bookId = mockedBooks.reduce((previousValue, currentValue) => {
        if (previousValue > currentValue.id) {
          return previousValue;
        }

        return currentValue.id;
      }, id);

      id = bookId + 1;

      const books = bookRequestSchema.parse(data);

      mockedBooks.push({ id, ...books });

      return c.json({ ...books });
    }
  )
  .get("/:id{[0-9]+}", (c) => {
    const id = parseInt(c.req.param("id"));

    const filteredBook = mockedBooks.find((book) => book.id === id);

    if (!filteredBook) {
      return c.notFound();
    }

    return c.json(filteredBook);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = parseInt(c.req.param("id"));

    const index = mockedBooks.findIndex((book) => book.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedBook = mockedBooks.splice(index, 1);

    return c.json({ books: deletedBook });
  });

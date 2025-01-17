import { Hono } from "hono";

interface Books {
  title: string;
  date: Date;
  author: string;
}

const mockedBooks: Array<Books> = [
  {
    title: "To Kill a Mockingbird",
    date: new Date("1960-07-11"),
    author: "Harper Lee",
  },
  {
    title: "1984",
    date: new Date("1949-06-08"),
    author: "George Orwell",
  },
  {
    title: "The Great Gatsby",
    date: new Date("1925-04-10"),
    author: "F. Scott Fitzgerald",
  },
];

export const booksRoute = new Hono()
  .get("/", (c) => {
    return c.json({ books: mockedBooks });
  })
  .post("/", async (c) => {
    const booksInJson = await c.req.json();

    mockedBooks.push(booksInJson);

    return c.json({ books: mockedBooks });
  });

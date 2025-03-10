import { authRoute } from "@routes/authRoute";
import { booksRoute } from "@routes/booksRoute";
import { Hono } from "hono";

import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: (origin) => {
      return origin.endsWith("http://localhost:4000")
        ? origin
        : "http://localhost:4000";
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.basePath("/api").route("/books", booksRoute).route("/auth", authRoute);

export default app;

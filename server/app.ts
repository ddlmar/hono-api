import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import { cors } from "hono/cors";
import { booksRoute } from "@routes/booksRoute";
import { authRoute } from "@routes/authRoute";

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

const apiRoutes = app
  .basePath("/api")
  .route("/books", booksRoute)
  .route("/auth", authRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;

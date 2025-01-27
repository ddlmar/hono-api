import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { booksRoute } from "./routes/books";
import { cors } from "hono/cors";

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
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH"],
  })
);

const apiRoutes = app.basePath("/api").route("/", booksRoute);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export default app;
export type ApiRoutes = typeof apiRoutes;

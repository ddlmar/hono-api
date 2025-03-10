import app from "./app";

const port = Bun.env.PORT;

Bun.serve({
  port,
  fetch: app.fetch,
});

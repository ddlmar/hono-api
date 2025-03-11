import env from "@model/env";
import app from "./app";

const port = env.PORT;

Bun.serve({
  port,
  fetch: app.fetch,
});

// eslint-disable-next-line no-console
console.log(`App is running in http://localhost:${port}/`);

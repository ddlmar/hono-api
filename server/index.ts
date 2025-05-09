import { serve } from "@hono/node-server";

import env from "@schema/env";
import app from "./app";

const port = env.PORT;

serve({
  port,
  fetch: app.fetch,
});

// eslint-disable-next-line no-console
console.log(`App is running in http://localhost:${port}/`);

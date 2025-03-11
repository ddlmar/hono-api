import type { PinoLogger } from "hono-pino";
import type { RequestIdVariables } from "hono/request-id";
import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import pinoLogger from "middleware/pinoLogger";
import { notFound, onError } from "stoker/middlewares";

interface Variables {
  Variables: RequestIdVariables & { logger: PinoLogger };
}

const app = new OpenAPIHono<Variables>();

app.use("*", requestId());
app.use("*", pinoLogger());

app.get("/", (c) => {
  return c.text("Hello world");
});

app.notFound(notFound);

app.onError(onError);

export default app;

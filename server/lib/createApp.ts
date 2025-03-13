import type { Variables } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";
import pinoLogger from "middleware/pinoLogger";
import { notFound, onError } from "stoker/middlewares";

export function createRouter() {
  return new OpenAPIHono<Variables>({ strict: false });
}

function createApp() {
  const app = createRouter();

  app.use("*", requestId());
  app.use("*", pinoLogger());

  app.notFound(notFound);

  app.onError(onError);

  return app;
}

export default createApp;

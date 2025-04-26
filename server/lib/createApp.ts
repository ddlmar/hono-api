import type { Variables } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";
import pinoLogger from "@middleware/pinoLogger";
import { requestId } from "hono/request-id";
import { timeout } from "hono/timeout";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

export function createRouter() {
  return new OpenAPIHono<Variables>({ strict: false, defaultHook });
}

function createApp() {
  const app = createRouter();

  app.use("*", requestId());
  app.use("*", pinoLogger());
  app.use("*", timeout(5000));

  app.notFound(notFound);

  app.onError(onError);

  return app;
}

export default createApp;

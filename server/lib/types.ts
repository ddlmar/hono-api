import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { RequestIdVariables } from "hono/request-id";

interface Variables {
  Variables: RequestIdVariables & { logger: PinoLogger };
}

type AppOpenApi = OpenAPIHono<Variables>;

export type { AppOpenApi, Variables };

import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Variables } from "@lib/types";
import type { Env } from "@schema/env";

declare global {

  namespace NodeJS {
    interface ProcessEnv extends Env {
      [key: string]: string | undefined;
    }
  }

    type AppRouterHandler<RouteType extends RouteConfig> = RouteHandler<RouteType, Variables>;

}

export { };

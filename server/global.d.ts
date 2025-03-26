import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Variables } from "@lib/types";

declare global {

type AppRouterHandler<RouteType extends RouteConfig> = RouteHandler<RouteType, Variables>;

}

export {};

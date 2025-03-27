import { createRoute, z } from "@hono/zod-openapi";
import { eventsSchema } from "@schema/events";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Events"];

export const list = createRoute(
  {
    path: "/events",
    method: "get",
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.array(
          eventsSchema,
        ),
        "The list of events",
      ),
    },
  },
);

export type ListRoute = typeof list;

import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@lib/createApp";
import { booksSchema } from "@schema/booksSchema";
import * as HttpStatusCodes from "stoker/http-status-codes";

import { jsonContent } from "stoker/openapi/helpers";

const router = createRouter().openapi(
  createRoute(
    {
      method: "get",
      path: "/books",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          booksSchema,
          "List of books",
        ),
      },
    },
  ),
  (c) => {
    return c.json({
      id: 1,
      author: "Miller",
      title: "White house in burn",
      date: "2000-10-10",
    });
  },
);

export default router;

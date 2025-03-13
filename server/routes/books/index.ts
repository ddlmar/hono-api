import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@lib/createApp";
import { booksSchema } from "@schema/booksSchema";

const router = createRouter().openapi(
  createRoute(
    {
      method: "get",
      path: "/books",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: booksSchema,
            },
          },
          description: "List of books",
        },

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

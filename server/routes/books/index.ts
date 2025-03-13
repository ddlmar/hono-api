import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@lib/createApp";

const router = createRouter().openapi(
  createRoute(
    {
      method: "get",
      path: "/books",
      responses: {
        200: {
          content: {
            "application/json": {
              schema: z.object({
                author: z.string(),
                title: z.string(),
                year: z.number(),
              }),
            },
          },
          description: "List of books",
        },

      },
    },
  ),
  (c) => {
    return c.json({
      author: "Miller",
      title: "White house in burn",
      year: 1900,
    });
  },
);

export default router;

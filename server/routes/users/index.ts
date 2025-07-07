import { createRouter } from "@lib/createApp";

import * as handlers from "@routes/users/handlers";
import * as routes from "@routes/users/routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.retrieve, handlers.retrieve)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;

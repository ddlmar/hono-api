import { createRouter } from "@lib/createApp";

import * as handlers from "@routes/events/handlers";
import * as routes from "@routes/events/routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
;

export default router;

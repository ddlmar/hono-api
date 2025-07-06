import { createRouter } from "@lib/createApp";
import * as handlers from "@routes/auth/handlers";
import * as routes from "@routes/auth/routes";

const router = createRouter()
  .basePath("/auth")
  .openapi(routes.login, handlers.login);

export default router;

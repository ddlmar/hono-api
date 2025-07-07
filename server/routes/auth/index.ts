import { createRouter } from "@lib/createApp";
import * as handlers from "@routes/auth/handlers";
import * as routes from "@routes/auth/routes";

const router = createRouter()
  .basePath("/auth")
  .openapi(routes.signin, handlers.signin)
  .openapi(routes.signup, handlers.signup)
  .openapi(routes.signout, handlers.signout)
  .openapi(routes.getProfile, handlers.getProfile);

export default router;

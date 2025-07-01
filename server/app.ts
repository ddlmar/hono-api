import configureOpenApi from "@lib/configureOpenApi";
import createApp from "@lib/createApp";

import auth from "@routes/auth";
import events from "@routes/events";
import users from "@routes/users";

const app = createApp();

const routes = [events, users, auth];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;

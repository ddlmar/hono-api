import configureOpenApi from "@lib/configureOpenApi";
import createApp from "@lib/createApp";

import events from "@routes/events";
import users from "@routes/users";

const app = createApp();

const routes = [events, users];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;

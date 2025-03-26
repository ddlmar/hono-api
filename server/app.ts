import configureOpenApi from "@lib/configureOpenApi";
import createApp from "@lib/createApp";

import events from "@routes/events";

const app = createApp();

const routes = [
  events,
];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;

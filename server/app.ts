import configureOpenApi from "@lib/configureOpenApi";
import createApp from "@lib/createApp";
import books from "@routes/books";

const app = createApp();

const routes = [
  books,
];

configureOpenApi(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;

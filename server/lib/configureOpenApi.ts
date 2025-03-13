import type { AppOpenApi } from "./types";

import { apiReference } from "@scalar/hono-api-reference";
import packageJSON from "../../package.json";

function configureOpenApi(app: AppOpenApi) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: packageJSON.name,
    },
  });

  app.get("/reference", apiReference({
    url: "/docs",
    pageTitle: "List Of Books Reference",
  }));
}

export default configureOpenApi;

import type { AppOpenApi } from "./types";

import packageJSON from "../../package.json";

function configureOpenApi(app: AppOpenApi) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: packageJSON.name,
    },
  });
}

export default configureOpenApi;

import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  resolve: {
    alias: {
      "@schema": resolve(__dirname, "server/schema"),
      "@request": resolve(__dirname, "server/request"),
      "@routes": resolve(__dirname, "server/routes"),
      "@response": resolve(__dirname, "server/response"),
      "@dbSchema": resolve(__dirname, "server/db/schema"),
      "@db": resolve(__dirname, "server/db"),
      "@lib": resolve(__dirname, "server/lib"),
      "@middleware": resolve(__dirname, "server/middleware"),
      "@utils": resolve(__dirname, "server/utils"),
    },
  },
});

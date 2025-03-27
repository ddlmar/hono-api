import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./server/db/migrations",
  schema: "./server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    // eslint-disable-next-line node/prefer-global/process
    url: process.env.DATABASE_URL!,
  },
});

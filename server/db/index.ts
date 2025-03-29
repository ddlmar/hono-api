import * as schema from "@dbSchema/index";
import env from "@schema/env";

import { drizzle } from "drizzle-orm/node-postgres";

import postgres from "postgres";

export const connection = postgres(env.DATABASE_URL, {
  max: (env.DB_MIGRATING || env.DB_SEEDING) ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => { } : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,
});

export type DB = typeof db;

export default db;

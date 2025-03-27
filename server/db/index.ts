import env from "@schema/env";
import { drizzle } from "drizzle-orm/bun-sql";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
});

export default db;

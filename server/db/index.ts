import env from "@schema/env";
import { drizzle } from "drizzle-orm/node-postgres";

const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
  },
});

export default db;

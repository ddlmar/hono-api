import { migrate } from "drizzle-orm/postgres-js/migrator";
import { connection, db } from ".";

import config from "../../drizzle.config";

async function main() {
  try {
    await migrate(db, { migrationsFolder: config.out as string });

    await connection.end();
  }
  catch {
    throw new Error("Failed to migrate database");
  }
}

main();

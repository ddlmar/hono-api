import env from "@schema/env";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import db, { connection } from ".";

import config from "../../drizzle.config";

if (!env.DB_MIGRATING) {
    throw new Error("You must set DB_MIGRATING to \"true\" when running migrations");
}

async function main() {
    await migrate(db, { migrationsFolder: config.out! });

    await connection.end();
}

main();

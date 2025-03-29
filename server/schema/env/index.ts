import { config } from "dotenv";

import { expand } from "dotenv-expand";
import { z } from "zod";

const stringBoolean = z.coerce.string().transform((val) => {
  return val === "true";
}).default("false");

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  ENV: z.string().default("development"),
  SECRET: z.string().default("1234"),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
  ]),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.string(),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

expand(config());

// eslint-disable-next-line node/prefer-global/process
const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;

export default env;

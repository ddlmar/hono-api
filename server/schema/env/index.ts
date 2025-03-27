import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  SECRET: z.string().default("1234"),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
  ]),
  DATABASE_URL: z.string().url(),
  ENV: z.string().default("development"),
})
  ;

const env = envSchema.parse(Bun.env);

export type Env = z.infer<typeof envSchema>;

export default env;

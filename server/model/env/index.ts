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
  ENV: z.string().default("development"),
});

const env = envSchema.parse(Bun.env);

export default env;

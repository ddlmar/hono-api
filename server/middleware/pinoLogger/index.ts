import env from "@schema/env";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import PinoPretty from "pino-pretty";

function logger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL || "info",
      },
      env.ENV === "production" ? undefined : PinoPretty()
    ),
  });
}

export default logger;

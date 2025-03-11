import env from "@model/env";
import { pinoLogger } from "hono-pino";
import pino from "pino";
import PinoPretty from "pino-pretty";

export default () => {
  return pinoLogger({
    pino: pino({
      level: env.LOG_LEVEL || "info",
    }, env.ENV === "production" ? undefined : PinoPretty()),
  });
};

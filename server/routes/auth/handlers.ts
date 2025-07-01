import type { LoginRoute } from "./routes";
import { db } from "@db/index";
import bcrypt from "bcrypt";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

export const login: AppRouterHandler<LoginRoute> = async (c) => {
  const jsonUser = c.req.valid("json");

  const dbUsers = await db.query.User.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, jsonUser.email);
    },
  });

  if (!dbUsers) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  const isValidLogin = await bcrypt.compare(
    jsonUser.password,
    dbUsers.password
  );

  if (!isValidLogin) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  return c.json({
    message: HttpStatusPhrases.NO_CONTENT,
  });
};

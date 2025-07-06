import bcrypt from "bcrypt";
import type { LoginRoute } from "./routes";
import { db } from "@db/index";
import auth from "@utils/auth";
import fields from "@utils/fields";
import { setCookie } from "hono/cookie";
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

  const token = await auth.generateToken(dbUsers.id);

  setCookie(c, "auth-token", token, auth.cookieOptions);

  const [user] = fields.select(dbUsers, ["id", "email"]);

  return c.json({ ...user, token }, HttpStatusCodes.OK);
};

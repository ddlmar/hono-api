import bcrypt from "bcrypt";
import type {
  GetProfileRoute,
  SignInRoute,
  SignOutRoute,
  SignUpRoute,
} from "./routes";
import { db } from "@db/index";
import auth, { type TokenPayload } from "@utils/auth";
import fields from "@utils/fields";
import { deleteCookie, setCookie } from "hono/cookie";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import users from "@dbSchema/user";

export const signin: AppRouterHandler<SignInRoute> = async (c) => {
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

export const signup: AppRouterHandler<SignUpRoute> = async (c) => {
  const jsonUser = c.req.valid("json");

  const hashedPassword = await bcrypt.hash(jsonUser.password, 10);

  const [inserted] = await db
    .insert(users)
    .values({
      ...jsonUser,
      password: hashedPassword,
    })
    .returning();

  const [user] = fields.omit(inserted, ["password"]);

  return c.json(user, HttpStatusCodes.OK);
};

export const getProfile: AppRouterHandler<GetProfileRoute> = async (c) => {
  const payload: TokenPayload | undefined = c.get("jwtPayload");

  if (!payload) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  const dbUser = await db.query.User.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, Number(payload.sub));
    },
  });

  if (!dbUser) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND
    );
  }

  const [user] = fields.omit(dbUser, ["password"]);

  return c.json(user, HttpStatusCodes.OK);
};

export const signout: AppRouterHandler<SignOutRoute> = async (c) => {
  deleteCookie(c, "auth-token", auth.cookieOptions);

  const payload: TokenPayload | undefined = c.get("jwtPayload");

  if (!payload) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

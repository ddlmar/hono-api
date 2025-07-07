import { createRoute } from "@hono/zod-openapi";
import { notFoundSchema, unauthorizedSchema } from "@lib/constants";
import env from "@schema/env";
import {
  getProfileSchema,
  insertUserSchema,
  loginUserSchema,
  selectUsersSchema,
  successfullyLoginSchema,
} from "@schema/users";
import { jwt } from "hono/jwt";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["auth"];

export const signin = createRoute({
  path: "/signin",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(loginUserSchema, "The user credentials"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successfullyLoginSchema,
      "Successfully signin"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid credentials"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
  },
});

export const signup = createRoute({
  path: "/signup",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertUserSchema, "The user to create"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectUsersSchema, "The created user"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      createErrorSchema(insertUserSchema),
      "Invalid data"
    ),
  },
});

export const getProfile = createRoute({
  path: "/get-profile",
  method: "get",
  tags,
  middleware: jwt({ secret: env.SECRET, cookie: "auth-token" }),
  responses: {
    [HttpStatusCodes.OK]: jsonContent(getProfileSchema, "The user data"),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "User unauthorized"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
  },
});

export const signout = createRoute({
  path: "/signout",
  method: "post",
  tags,
  middleware: jwt({ secret: env.SECRET, cookie: "auth-token" }),
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "User logout",
    },
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "User unauthorized"
    ),
  },
});

type SignInRoute = typeof signin;

type SignUpRoute = typeof signup;

type GetProfileRoute = typeof getProfile;

type SignOutRoute = typeof signout;

export type { SignInRoute, SignUpRoute, GetProfileRoute, SignOutRoute };

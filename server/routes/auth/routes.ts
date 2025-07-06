import { createRoute } from "@hono/zod-openapi";
import { notFoundSchema, unauthorizedSchema } from "@lib/constants";
import { loginUserSchema, successfullyLoginSchema } from "@schema/users";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

const tags = ["auth"];

export const login = createRoute({
  path: "/login",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(loginUserSchema, "The user credentials"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      successfullyLoginSchema,
      "Successfully login"
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      unauthorizedSchema,
      "Invalid credentials"
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "User not found"),
  },
});

type LoginRoute = typeof login;

export type { LoginRoute };

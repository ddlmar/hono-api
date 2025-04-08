import { createRoute, z } from "@hono/zod-openapi";
import { notFoundSchema } from "@lib/constants";
import { insertUserSchema, patchUserSchema, selectUsersSchema } from "@schema/users";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

const tags = ["users"];

export const list = createRoute(
  {
    path: "/users",
    method: "get",
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        z.array(
          selectUsersSchema,
        ),
        "The list of users",
      ),
    },
  },
);

export const create = createRoute(
  {
    path: "/users",
    method: "post",
    request: {
      body: jsonContentRequired(insertUserSchema, "The user to create"),
    },
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        selectUsersSchema,
        "The created user",
      ),
      [HttpStatusCodes.BAD_REQUEST]: jsonContent(
        createErrorSchema(insertUserSchema),
        "Invalid data",
      ),
    },
  },
);

export const retrieve = createRoute(
  {
    path: "/users/{id}",
    method: "get",
    tags,
    request: {
      params: IdParamsSchema,
    },
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        selectUsersSchema,
        "The retrieved user",
      ),
      [HttpStatusCodes.BAD_REQUEST]: jsonContent(
        createErrorSchema(IdParamsSchema),
        "Id is not a number",
      ),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "User not found",
      ),
    },
  },
);

export const patch = createRoute(
  {
    path: "/users/{id}",
    method: "patch",
    request: {
      params: IdParamsSchema,
      body: jsonContentRequired(patchUserSchema, "The user to update"),
    },
    tags,
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        selectUsersSchema,
        "The updated user",
      ),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "User not found",
      ),
      [HttpStatusCodes.BAD_REQUEST]: jsonContent(
        createErrorSchema(patchUserSchema),
        "Invalid data",
      ),
    },
  },
);

export const remove = createRoute(
  {
    path: "/users/{id}",
    method: "delete",
    tags,
    request: {
      params: IdParamsSchema,
    },
    responses: {
      [HttpStatusCodes.NO_CONTENT]: {
        description: "User deleted"
      },
      [HttpStatusCodes.BAD_REQUEST]: jsonContent(
        createErrorSchema(IdParamsSchema),
        "Id is not a number",
      ),
      [HttpStatusCodes.NOT_FOUND]: jsonContent(
        notFoundSchema,
        "User not found",
      ),
    },
  },
);

type ListRoute = typeof list;

type CreateRoute = typeof create;

type RetrieveRoute = typeof retrieve;

type PatchRoute = typeof patch;

type RemoveRoute = typeof remove;

export type { CreateRoute, ListRoute, PatchRoute, RetrieveRoute , RemoveRoute};

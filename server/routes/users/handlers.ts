import type { CreateRoute, ListRoute, PatchRoute, RemoveRoute, RetrieveRoute } from "./routes";
import { db } from "@db/index";
import users from "@dbSchema/user";
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

export const list: AppRouterHandler<ListRoute> = async (c) => {
  const users = await db.query.User.findMany();

  return c.json(users);
};

export const create: AppRouterHandler<CreateRoute> = async (c) => {
  const user = c.req.valid("json");

  const [inserted] = await db.insert(users).values(user).returning();

  return c.json(inserted, HttpStatusCodes.OK);
};

export const retrieve: AppRouterHandler<RetrieveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const user = await db.query.User.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!user) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(user, HttpStatusCodes.OK);
};


export const patch: AppRouterHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const updates = c.req.valid("json");

  const [user] = await db.update(users).set(updates).where(eq(users.id, id)).returning()

  if (!user) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(user, HttpStatusCodes.OK);
};


export const remove: AppRouterHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const result = await db.delete(users).where(eq(users.id, id)).returning()

  if (result.length === 0) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

import { zValidator } from "@hono/zod-validator";
import { loginRequestSchema } from "@request/loginRequest";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

export const authRoute = new Hono().post(
  "/login",
  zValidator("json", loginRequestSchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    if (!password) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    const payload = {
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 2,
    };

    const token = await sign(payload, Bun.env.SECRET!);

    setCookie(c, "token", token);

    return c.json({ payload, token });
  }
);

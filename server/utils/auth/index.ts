import type { CookieOptions } from "hono/utils/cookie";
import env from "@schema/env";
import { sign } from "hono/jwt";

const now = Math.floor(Date.now() / 1000);
const maxAge = 60 * 1;
const maxTokenAge = now + maxAge;

export async function generateToken(id: number) {
  const secret = env.SECRET;

  const token = await sign({ sub: id, iat: now, exp: maxTokenAge }, secret);

  return token;
}

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "Lax",
  path: "/",
  maxAge,
};

export default { generateToken, cookieOptions };

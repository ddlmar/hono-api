import type { z } from "zod";

import { loginModel } from "@model/loginModel";

export const loginRequestSchema = loginModel;

type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

export type { LoginRequestSchema };

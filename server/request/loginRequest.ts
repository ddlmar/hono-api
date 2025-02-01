import { loginModel } from "@model/loginModel";
import type { z } from "zod";

export const loginRequestSchema = loginModel;

type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

export type { LoginRequestSchema };

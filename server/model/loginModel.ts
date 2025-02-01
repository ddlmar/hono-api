import { z } from "zod";

export const loginModel = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type Login = z.infer<typeof loginModel>;

export type { Login };

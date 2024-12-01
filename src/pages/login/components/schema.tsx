import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().min(10).max(50),
  password: z.string().min(6).max(50),
});

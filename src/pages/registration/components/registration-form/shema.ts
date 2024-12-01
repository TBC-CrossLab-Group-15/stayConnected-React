import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(10).max(50).email(),
  password: z.string().min(8).max(50),
  confirmPassword: z.string().min(8).max(50),
});

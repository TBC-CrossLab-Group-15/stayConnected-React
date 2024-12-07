import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "validation.email-invalid" }),
  password: z.string(),
});

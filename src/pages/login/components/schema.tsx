import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(10, { message: "validation.email-min" })
    .max(50, { message: "validation.email-max" })
    .email({ message: "validation.email-invalid" }),
  password: z
    .string()
    .min(8, { message: "validation.password-min" })
    .max(50, { message: "validation.password-max" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "validation.password-strength" }, // Custom message for password strength
    ),
});

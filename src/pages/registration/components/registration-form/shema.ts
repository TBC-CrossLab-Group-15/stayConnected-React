import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "validation.name-min" })
    .max(50, { message: "validation.name-max" }),
  lastName: z
    .string()
    .min(2, { message: "validation.lastName-min" })
    .max(50, { message: "validation.lastName-max" }),
  email: z
    .string()
    .min(10, { message: "validation.email-min" })
    .max(50, { message: "validation.email-max" })
    .email({message: "validation.email-invalid"}),
  password: z
    .string()
    .min(8, { message: "validation.password-min" })
    .max(50, { message: "validation.password-max" }),
  confirmPassword: z
    .string()
    .min(8, { message: "validation.password-min" })
    .max(50, { message: "validation.password-max" }),
});

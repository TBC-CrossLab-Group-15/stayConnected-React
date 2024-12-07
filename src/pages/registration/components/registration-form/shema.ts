import { z } from "zod";

export const registerFormSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "validation.name-min" })
    .max(50, { message: "validation.name-max" }),
  last_name: z
    .string()
    .min(2, { message: "validation.lastname-min" })
    .max(50, { message: "validation.lastName-max" }),
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
  confirm_password: z
    .string()
    .min(8, { message: "validation.password-min" })
    .max(50, { message: "validation.password-max" }),
});
// .refine((data) => data.password === data.confirm_password, {
//   message: "validation.password-mismatch",
//   path: ["confirmPassword"], // Highlight the confirmPassword field
// });

import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(2,{message:"validation.name-min"}).max(50),
  lastName: z.string().min(2,{message:"validation.lastName-min"}).max(50),
  email: z.string().min(10,{message:"validation.email-min"}).max(50).email(),
  password: z.string().min(8,{message:"validation.password-min"}).max(50),
  confirmPassword: z.string().min(8,{message:"validation.password-min"}).max(50),
});


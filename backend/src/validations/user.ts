import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().max(50, "Title must be at most 50 characters long"),
  email: z.email({ error: "Invalid email" }),
  phone: z.string().length(11, "Phone length must be a valid phone number"),
  gender: z.enum(["male", "female"], { error: "Invalid gender" }),
  role: z.enum(["student", "instructor", "admin"], { error: "Invalid role" }),
});

export const CreateUserPasswordSchema = z.object({
  userId: z.string().length(24, "User ID must be a valid ID"),
  password: z
    .string()
    .min(7, "Password must be at minimum 7 characters")
    .max(24, "Password must be at most 24 characters long"),
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;
export type CreateUserPassword = z.infer<typeof CreateUserPasswordSchema>;

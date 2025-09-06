import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
});

export const UserEditProfileSchema = z.object({
  name: z
    .string().optional(),
  password: z.string().max(40).optional(),
  image: z
    .string()
    .startsWith("data:image", { message: "Invalid image format" })
    .optional()
    .nullable(),
});

import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
});

export const UserEditProfileSchema = z.object({
  name: z
    .string()
    .refine((value) => value.trim().length > 0, "Name cannot be only spaces")
    .refine(
      (value) => /^\p{L}+(?:[- ]\p{L}+)*$/u.test(value),
      "Name can be only letters"
    ).optional(),
  password: z.string().max(40).optional(),
  image: z
    .string()
    .startsWith("data:image", { message: "Invalid image format" })
    .optional()
    .nullable(),
});

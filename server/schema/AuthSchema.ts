import { z } from 'zod';

export const SignUpSchema = z.object({
  email: z.string().email().max(30,'email cannot be more then 20 characters'),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(14, 'Name maximum 15 characters')
    .refine((value) => value.trim().length > 0, 'Name cannot be only spaces'),
  password: z.string().min(4, 'Password minimum 4 characters').max(40),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, 'Password minimum 4 characters').max(40),
});

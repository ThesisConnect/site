import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
  rememberMe: z.boolean().optional(),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

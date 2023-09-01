import { z } from 'zod';

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  surname: z
    .string()
    .min(2, { message: 'Surname must be at least 2 characters long' }),
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long' }),
  role: z
    .enum(['advisor', 'advisee'])
    .refine((data) => data === 'advisor' || data === 'advisee', {
      message: 'Role must be either advisor or advisee',
    }),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

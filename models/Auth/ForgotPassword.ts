import {z} from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});

export type ForgotSchemaType = z.infer<typeof ForgotPasswordSchema>;
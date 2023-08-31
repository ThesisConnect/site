import {z} from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});

export type ForgotSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z.object({
  password: z.string().min(8).max(100)
});

export type ResetSchemaType = z.infer<typeof ResetPasswordSchema>;
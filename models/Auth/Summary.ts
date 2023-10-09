import { z } from 'zod';

export const createSummarySchema = z.object({
  // project_id: z.string(),
  // plan_id: z.string(),
  // reciever_id: z.string(),
  // sender_id: z.string(),
  comment: z.string().optional(),
  // file_id: z.array(z.string()),
  // chat_id: z.string(),
  progress: z
    .number()
    .int()
    .min(0, { message: 'Progress must be greater than 0' })
    .max(100, { message: 'Progress must be less than 100' })
    .optional(),
});

export type createSummarySchema = z.infer<typeof createSummarySchema>;

import { z } from 'zod';

export const PlanSchema = z.object({
  name: z.string().min(1, { message: 'Please enter plan name' }),
  description: z.string().min(1, { message: 'Please enter description' }),
  // progress: z.number().int().gte(0).lte(100).default(0),
  task: z.boolean().optional(),
});

export type PlanSchemaType = z.infer<typeof PlanSchema>;

export const PlanEditSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  progress: z
    .number()
    .int()
    .min(0, { message: 'Progress must be greater than 0' })
    .max(100, { message: 'Progress must be less than 100' })
    .optional(),
  // start_date: z.string(),
  // end_date: z.string(),
});
export type PlanEditSchemaType = z.infer<typeof PlanEditSchema>;

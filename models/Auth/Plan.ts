import { z } from 'zod';

export const PlanSchema = z.object({
  project_id: z.string().optional(),
  name: z.string().min(1, { message: 'Please enter plan name' }),
  description: z.string().optional(),
  progress: z.number().int().gte(0).lte(100).default(0),
  start_date: z.string(),
  end_date: z.string(),
  task: z.boolean().optional()
});

export type PlanSchemaType = z.infer<typeof PlanSchema>;

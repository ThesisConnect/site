import { z } from 'zod'

export const createSummarySchema = z.object({
  project_id: z.string(),
  plan_id: z.string(),
  reciever_id: z.string(),
  sender_id: z.string(),
  comment: z.string(),
  file_id: z.array(z.string()),
  chat_id: z.string(),
  progress: z.number(),
})

export type createSummarySchema = z.infer<typeof createSummarySchema>
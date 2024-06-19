import { z } from 'zod'
export const jobFilter = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.string().optional(),
  remote: z.coerce.boolean().optional(),
})

export type JobFilterValues = z.infer<typeof jobFilter>

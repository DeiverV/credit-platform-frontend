import { z } from 'zod'
import type { Country, CreditStatus } from './credits.types'

export const listCreditsSchema = z.object({
  page: z.number().catch(1).optional(),
  limit: z.number().catch(10).optional(),
  toDate: z.string().optional(),
  fromDate: z.string().optional(),
  status: z
    .enum(['PENDING', 'APPROVED', 'REJECTED', 'PROCESSING'] as const)
    .optional(),
  country: z.enum(['CO', 'MX'] as const).optional(),
})

export type ListCreditsFormValues = z.infer<typeof listCreditsSchema>

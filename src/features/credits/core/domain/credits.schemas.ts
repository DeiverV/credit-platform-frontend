import { z } from 'zod'
import type { Country, CreditStatus } from './credits.types'

export const listCreditsSchema = z.object({
  toDate: z.date().optional(),
  fromDate: z.date().optional(),
  status: z
    .enum(['PENDING', 'APPROVED', 'REJECTED', 'PROCESSING'] as [
      CreditStatus,
      ...CreditStatus[],
    ])
    .optional(),
  country: z.enum(['CO', 'MX'] as [Country, ...Country[]]).optional(),
})

export type ListCreditsFormValues = z.infer<typeof listCreditsSchema>

export const listCreditsSearchSchema = z.object({
  toDate: z.string().optional(),
  fromDate: z.string().optional(),
  status: z
    .enum(['PENDING', 'APPROVED', 'REJECTED', 'PROCESSING'] as [
      CreditStatus,
      ...CreditStatus[],
    ])
    .optional(),
  country: z.enum(['CO', 'MX'] as [Country, ...Country[]]).optional(),
})

export type ListCreditsSearchValues = z.infer<typeof listCreditsSearchSchema>

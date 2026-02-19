import { z } from 'zod'
import i18n from '@/i18n/i18n'

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
})

export const registerSchema = z
  .object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('register.passwordsMismatch', { ns: 'auth' }),
    path: ['confirmPassword'],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>

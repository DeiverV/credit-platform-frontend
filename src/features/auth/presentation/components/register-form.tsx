import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useRegisterMutation } from '../../auth.queries'
import {
  registerSchema,
  type RegisterFormValues,
} from '../../core/domain/auth.schemas'
import InputField from '@/components/forms/input-field'

export const RegisterForm = () => {
  const { t } = useTranslation('auth')
  const { mutate: register, isPending, error } = useRegisterMutation()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = ({ confirmPassword, ...values }: RegisterFormValues) =>
    register(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          label={t('register.email')}
          placeholder={t('register.emailPlaceholder')}
          type="email"
          autoComplete="email"
        />
        <InputField
          name="password"
          label={t('register.password')}
          placeholder={t('register.passwordPlaceholder')}
          type="password"
          autoComplete="new-password"
        />
        <InputField
          name="confirmPassword"
          label={t('register.confirmPassword')}
          placeholder={t('register.confirmPasswordPlaceholder')}
          type="password"
          autoComplete="new-password"
        />

        {error && (
          <p className="text-sm text-destructive">
            {(error.response?.data as { message: string })?.message ??
              t('register.errorFallback')}
          </p>
        )}

        <Button
          type="submit"
          className="w-full mt-2 text-white"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('register.submitting')}
            </>
          ) : (
            t('register.submit')
          )}
        </Button>
      </form>
    </Form>
  )
}

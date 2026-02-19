import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useLoginMutation } from '../../auth.queries'
import {
  loginSchema,
  type LoginFormValues,
} from '../../core/domain/auth.schemas'

import InputField from '@/components/forms/input-field'

export const LoginForm = () => {
  const { t } = useTranslation('auth')
  const { mutate: login, isPending, error } = useLoginMutation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginFormValues) => login(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          name="email"
          label={t('login.email')}
          placeholder={t('login.emailPlaceholder')}
          type="email"
          autoComplete="email"
        />
        <InputField
          name="password"
          label={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
          type="password"
          autoComplete="current-password"
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
              {t('login.submitting')}
            </>
          ) : (
            t('login.submit')
          )}
        </Button>
      </form>
    </Form>
  )
}

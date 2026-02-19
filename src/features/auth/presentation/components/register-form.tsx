import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useRegisterMutation } from '../../auth.queries'
import {
  registerSchema,
  type RegisterFormValues,
} from '../../core/domain/auth.schemas'

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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.email')}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.password')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t('register.passwordPlaceholder')}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('register.confirmPassword')}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={t('register.confirmPasswordPlaceholder')}
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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

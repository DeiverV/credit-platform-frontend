import { createFileRoute, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { AuthPage } from '@/features/auth/presentation/auth-page'

export const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    if (Cookies.get('accessToken')) {
      throw redirect({ to: '/credits' })
    }
  },
  component: AuthPage,
})

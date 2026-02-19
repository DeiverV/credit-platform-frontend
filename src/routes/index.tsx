import { createFileRoute, redirect } from '@tanstack/react-router'
import Cookies from 'js-cookie'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    if (Cookies.get('accessToken')) {
      throw redirect({ to: '/credits' })
    }
    throw redirect({ to: '/auth' })
  },
  component: () => null,
})

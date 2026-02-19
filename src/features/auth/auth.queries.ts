import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import Cookies from 'js-cookie'

import { authUseCases } from './core'
import { useAuthStore } from './auth.store'
import type { AxiosError } from 'axios'

const saveSession = (data: {
  accessToken: string
  refreshToken: string
  user: { id: string; email: string; role: string }
}) => {
  Cookies.set('accessToken', data.accessToken)
  Cookies.set('refreshToken', data.refreshToken)
  useAuthStore.getState().setUser(data.user)
}

export const useLoginMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authUseCases.login,
    onSuccess: (data) => {
      saveSession(data)
      router.navigate({ to: '/credits' })
    },
    onError: (error: AxiosError) => {
      return error
    },
  })
}

export const useRegisterMutation = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authUseCases.register,
    onSuccess: (data) => {
      saveSession(data)
      router.navigate({ to: '/credits' })
    },
    onError: (error: AxiosError) => {
      return error
    },
  })
}

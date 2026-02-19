import { handleLogout } from '@/features/auth/api/refresh-manager'
import { authUseCases } from '@/features/auth/core'
import { useMutation } from '@tanstack/react-query'

export const CreditsPage = () => {
  const mutation = useMutation({
    mutationFn: authUseCases.logout,
    onSuccess: () => {
      handleLogout()
    },
  })

  return <button onClick={() => mutation.mutateAsync()}>Logout</button>
}

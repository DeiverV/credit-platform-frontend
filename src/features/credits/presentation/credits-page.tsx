import { useLogoutMutation } from '@/features/auth/auth.queries'

export const CreditsPage = () => {
  const logoutMutation = useLogoutMutation()

  return (
    <main>
      <button
        className="bg-red-500 text-white p-2 rounded"
        onClick={() => logoutMutation.mutateAsync()}
      >
        Logout
      </button>
    </main>
  )
}

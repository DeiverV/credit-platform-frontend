import { useAuthStore } from '@/features/auth/auth.store'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NotificationBell } from '@/features/notifications/components/notification-bell'
import { useNotificationSocket } from '@/features/notifications/hooks/use-notification-socket'

export const Route = createFileRoute('/credits')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuthStore((state) => state.user)
  useNotificationSocket()

  return (
    <main className="container mx-auto py-10 min-h-screen bg-neutral min-w-screen px-[10%] overflow-y-scroll">
      <div className="flex justify-between items-center mb-6 border-b border-text">
        <p>User: {user?.email}</p>
        <NotificationBell />
      </div>
      <Outlet />
    </main>
  )
}

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/credits')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="container mx-auto py-10 min-h-screen bg-neutral min-w-screen px-[10%] overflow-y-scroll">
      <Outlet />
    </main>
  )
}

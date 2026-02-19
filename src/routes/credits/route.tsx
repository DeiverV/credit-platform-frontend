import { CreditsPage } from '@/features/credits/presentation/credits-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/credits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreditsPage />
}

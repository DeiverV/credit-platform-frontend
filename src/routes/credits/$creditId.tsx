import { CreditDetailsPage } from '@/features/credits/presentation/credit-details-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/credits/$creditId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreditDetailsPage />
}

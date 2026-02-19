import { listCreditsSearchSchema } from '@/features/credits/core/domain/credits.schemas'
import { CreditsPage } from '@/features/credits/presentation/credits-page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/credits/')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) =>
    listCreditsSearchSchema.parse(search),
})

function RouteComponent() {
  return <CreditsPage />
}

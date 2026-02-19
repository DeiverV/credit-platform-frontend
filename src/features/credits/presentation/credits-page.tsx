import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useLogoutMutation } from '@/features/auth/auth.queries'
import { Button } from '@/components/ui/button'

import { useListCreditsQuery } from '../credits.queries'
import { CreditsFilters } from './components/credits-filters'
import { CircleDollarSign, LogOut } from 'lucide-react'
import { CreditApplication } from './components/credit-application'

export const CreditsPage = () => {
  const { t } = useTranslation('credits')
  const logoutMutation = useLogoutMutation()

  const search = useSearch({ from: '/credits' })
  const { data, isFetching } = useListCreditsQuery(search)

  return (
    <main className="container mx-auto py-10 min-h-screen bg-neutral min-w-screen px-[10%]">
      <div className="flex justify-between flex-col sm:flex-row items-center mb-8 gap-4">
        <div>
          <h1 className="font-bold tracking-tight">{t('page.title')}</h1>
          <p className="text-muted-foreground">{t('page.listDescription')}</p>
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-primary text-white"
          onClick={() => logoutMutation.mutateAsync()}
        >
          <LogOut className="h-4 w-4 stroke-white" />
          {t('page.logout')}
        </Button>
      </div>

      <CreditsFilters />

      {isFetching && (
        <div className="flex justify-center p-8">
          <p>Cargando...</p>
        </div>
      )}

      {!isFetching && (
        <div className="space-y-4">
          {data?.data.map((credit) => (
            <CreditApplication key={credit.id} credit={credit} />
          ))}
        </div>
      )}

      {!isFetching && data?.data.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 p-8 opacity-70">
          <CircleDollarSign className="h-8 w-8" />
          <p>{t('page.emptyState')}</p>
        </div>
      )}
    </main>
  )
}

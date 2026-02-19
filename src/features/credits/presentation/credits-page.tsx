import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useListCreditsQuery } from '../credits.queries'
import { CreditsFilters } from './components/credits-filters'
import { CircleDollarSign } from 'lucide-react'
import { CreditApplication } from './components/credit-application'
import { CreditsHeader } from './components/credits-header'
import { CreditCreation } from './components/credit-creation'

export const CreditsPage = () => {
  const { t } = useTranslation('credits')

  const search = useSearch({ from: '/credits' })
  const { data, isFetching } = useListCreditsQuery(search)

  return (
    <>
      <CreditsHeader />
      <CreditsFilters />
      <CreditCreation />

      {isFetching && (
        <div className="flex justify-center p-8">
          <p>Cargando...</p>
        </div>
      )}

      {!isFetching && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
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
    </>
  )
}

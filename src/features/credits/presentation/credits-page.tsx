import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { useInfiniteListCreditsQuery } from '../credits.queries'
import { CreditsFilters } from './components/credits-filters'
import { CircleDollarSign, Loader2 } from 'lucide-react'
import { CreditApplication } from './components/credit-application'
import { CreditsHeader } from './components/credits-header'
import { CreditCreation } from './components/credit-creation'
import { Button } from '@/components/ui/button'

export const CreditsPage = () => {
  const { t } = useTranslation('credits')

  const search = useSearch({ from: '/credits' })
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteListCreditsQuery({ ...search, limit: 10 })

  const credits = data?.pages.flatMap((page) => page.data) || []

  return (
    <>
      <CreditsHeader />
      <CreditsFilters />
      <CreditCreation />

      {isLoading && (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {credits.map((credit) => (
            <CreditApplication key={credit.id} credit={credit} />
          ))}
        </div>
      )}

      {!isLoading && credits.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 p-8 opacity-70">
          <CircleDollarSign className="h-8 w-8" />
          <p>{t('page.emptyState')}</p>
        </div>
      )}

      {hasNextPage && (
        <div className="flex justify-center p-8">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('page.loadMore')}
          </Button>
        </div>
      )}
    </>
  )
}

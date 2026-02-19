import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import type {
  CreditStatus,
  ICreditApplicationResume,
} from '@/features/credits/core/domain/credits.types'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

const STATUS_COLORS: Record<CreditStatus, string> = {
  PENDING: 'bg-yellow-500',
  APPROVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
  PROCESSING: 'bg-blue-500',
}

export const CreditApplication = ({
  credit,
}: {
  credit: ICreditApplicationResume
}) => {
  const { t } = useTranslation('credits')

  return (
    <Link
      to="/credits/$creditId"
      params={{ creditId: credit.id }}
      viewTransition
    >
      <Card className="bg-white dark:bg-neutral-900 border-none h-[280px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300 cursor-pointer ">
        <CardHeader className="border-b">
          <CardTitle className="font-semibold text-xl line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {credit.fullName}
          </CardTitle>
          <CardDescription className="flex items-center justify-between gap-2">
            <p>{credit.applicationDate}</p>
            <div className="flex items-center gap-2">
              <p
                className={cn(
                  'font-semibold text-white px-2 py-1 rounded',
                  STATUS_COLORS[credit.status],
                )}
              >
                {credit.status}
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="[&>p>span]:font-semibold grid gap-1">
          <p>
            <span>{t('credit.country')}:</span> {credit.country}
          </p>
          <p>
            <span>{t('credit.documentId')}:</span> {credit.documentId}
          </p>
          <p>
            <span>{t('credit.documentType')}:</span> {credit.documentType}
          </p>
          <p>
            <span>{t('credit.monthlyIncome')}:</span> {credit.monthlyIncome}
          </p>
          <p>
            <span>{t('credit.requestedAmount')}:</span> {credit.requestedAmount}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

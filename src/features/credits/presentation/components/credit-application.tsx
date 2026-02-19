import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import type { ICreditApplication } from '@/features/credits/core/domain/credits.types'
import { useTranslation } from 'react-i18next'

export const CreditApplication = ({
  credit,
}: {
  credit: ICreditApplication
}) => {
  const { t } = useTranslation('credits')
  return (
    <Card key={credit.id}>
      <CardHeader>
        <CardTitle>
          {t('credit.fullName')}: {credit.fullName}
        </CardTitle>
        <CardDescription>
          {t('credit.applicationDate')}: {credit.applicationDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="[p>span]:font-semibold">
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
        {credit.riskNotes && (
          <p>
            <span>{t('credit.riskNotes')}:</span> {credit.riskNotes}
          </p>
        )}
        {credit.riskScore && <p>{credit.riskScore}</p>}
      </CardContent>
    </Card>
  )
}

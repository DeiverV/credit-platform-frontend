import { useNavigate, useParams } from '@tanstack/react-router'
import { useGetCreditByIdQuery } from '../credits.queries'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  User,
  DollarSign,
  FileText,
  Activity,
  Loader2,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-500 hover:bg-yellow-600',
  APPROVED: 'bg-green-500 hover:bg-green-600',
  REJECTED: 'bg-red-500 hover:bg-red-600',
  PROCESSING: 'bg-blue-500 hover:bg-blue-600',
}

export const CreditDetailsPage = () => {
  const { creditId } = useParams({ from: '/credits/$creditId' })
  const { t } = useTranslation('credits')
  const navigate = useNavigate()
  const { data: credit, isFetching } = useGetCreditByIdQuery(creditId)

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!credit) {
    navigate({ to: '/credits' })
    return null
  }

  return (
    <>
      <div className="mb-6">
        <Link to="/credits" viewTransition>
          <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to list
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t('credit.title')}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <span className="font-mono text-sm bg-muted px-2 py-0.5 rounded">
                ID: {credit.id}
              </span>
              <span>•</span>
              <span>
                {new Date(credit.applicationDate).toLocaleDateString()}
              </span>
            </p>
          </div>
          <Badge
            className={`${STATUS_COLORS[credit.status]} text-white border-0 px-4 py-1.5 text-base`}
          >
            {t(`status.${credit.status}`)}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-neutral-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-muted-foreground" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.fullName')}
                  </label>
                  <p className="font-medium">{credit.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.documentType')}
                  </label>
                  <p className="font-medium">{credit.documentType}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.documentId')}
                  </label>
                  <p className="font-medium">{credit.documentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.country')}
                  </label>
                  <p className="font-medium text-2xl">{credit.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card className="bg-white dark:bg-neutral-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                Financial Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.requestedAmount')}
                  </label>
                  <p className="font-bold text-3xl">
                    ${credit.requestedAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {t('credit.monthlyIncome')}
                  </label>
                  <p className="font-medium text-3xl">
                    ${credit.monthlyIncome.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {credit.riskNotes && !Number.isNaN(credit.riskScore) && (
            <Card className="md:col-span-2 bg-white dark:bg-neutral-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-lg font-medium text-muted-foreground block mb-2">
                      {t('credit.riskScore')}
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-6 border-muted">
                        <span className="text-3xl font-bold">
                          {credit.riskScore}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="h-4 w-full bg-muted border rounded-full overflow-hidden">
                          <div
                            className={`h-full ${credit.riskScore > 700 ? 'bg-green-500' : credit.riskScore > 500 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{
                              width: `${(credit.riskScore / 1000) * 100}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Score verification based on internal policies
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-lg font-medium text-muted-foreground mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {t('credit.riskNotes')}
                    </label>
                    <ul className="list-disc pl-8">
                      {credit.riskNotes.split(';').map((note, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}

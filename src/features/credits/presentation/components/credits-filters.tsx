import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import {
  listCreditsSchema,
  type ListCreditsFormValues,
} from '../../core/domain/credits.schemas'
import { SelectField } from '@/components/forms/select-field'
import { CalendarField } from '@/components/forms/calendar-field'
import { Funnel, FunnelX } from 'lucide-react'

export const CreditsFilters = () => {
  const { t } = useTranslation('credits')

  const navigate = useNavigate({ from: '/credits' })
  const search = useSearch({
    from: '/credits',
    structuralSharing: false,
  }) as ListCreditsFormValues

  const form = useForm<ListCreditsFormValues>({
    resolver: zodResolver(listCreditsSchema),
    defaultValues: {
      status: search.status,
      country: search.country,
      fromDate: search.fromDate ? new Date(search.fromDate) : undefined,
      toDate: search.toDate ? new Date(search.toDate) : undefined,
    },
  })

  const onSubmit = ({
    country,
    fromDate,
    status,
    toDate,
  }: ListCreditsFormValues) => {
    navigate({
      search: (prev) => ({
        ...prev,
        country,
        fromDate: fromDate?.toISOString(),
        toDate: toDate?.toISOString(),
        status,
      }),
    })
  }

  const handleClear = () => {
    navigate({ search: {} })
    form.reset({})
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end mb-6 p-4 bg-white dark:bg-neutral-900 rounded-default shadow-xs border border-neutral-200 dark:border-neutral-800"
      >
        <SelectField
          name="country"
          label={t('filters.country')}
          placeholder={t('filters.selectCountry')}
          options={[
            { value: 'CO', label: 'Colombia' },
            { value: 'MX', label: 'Mexico' },
          ]}
        />

        <SelectField
          name="status"
          label={t('filters.status')}
          placeholder={t('filters.selectStatus')}
          options={[
            { value: 'PENDING', label: t('status.PENDING') },
            { value: 'APPROVED', label: t('status.APPROVED') },
            { value: 'REJECTED', label: t('status.REJECTED') },
            { value: 'PROCESSING', label: t('status.PROCESSING') },
          ]}
        />

        <CalendarField name="fromDate" label={t('filters.fromDate')} />
        <CalendarField name="toDate" label={t('filters.toDate')} />

        <div className="flex gap-2">
          <Button
            type="submit"
            className="flex-1 bg-primary text-white"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            <Funnel className="h-4 w-4 stroke-white" />
            {t('filters.apply')}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={handleClear}
          >
            <FunnelX className="h-4 w-4" />
            {t('filters.clear')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

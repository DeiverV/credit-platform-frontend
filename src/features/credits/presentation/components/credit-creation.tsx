import { zodResolver } from '@hookform/resolvers/zod'
import { useCreditsStore } from '../../credits.store'
import {
  createCreditSchema,
  type CreateCreditFormValues,
} from '../../core/domain/credits.schemas'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { useTranslation } from 'react-i18next'
import { SelectField } from '@/components/forms/select-field'
import InputField from '@/components/forms/input-field'
import { Button } from '@/components/ui/button'
import { useCreateCreditMutation } from '../../credits.queries'
import { Loader2, Save } from 'lucide-react'

export const CreditCreation = () => {
  const { t: tCommon } = useTranslation('common')
  const { t: tCredits } = useTranslation('credits')

  const isCreateOpen = useCreditsStore((state) => state.isCreateOpen)
  const setIsCreateOpen = useCreditsStore((state) => state.setIsCreateOpen)
  const createCreditMutation = useCreateCreditMutation()

  const form = useForm<CreateCreditFormValues>({
    resolver: zodResolver(createCreditSchema),
    defaultValues: {
      country: 'CO',
      fullName: '',
      documentId: '',
      requestedAmount: 0,
      monthlyIncome: 0,
    },
  })

  const onSubmit = async (values: CreateCreditFormValues) => {
    await createCreditMutation.mutateAsync(values).then(() => {
      setIsCreateOpen(false)
    })
  }

  return (
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
      <DialogContent className="bg-neutral">
        <DialogHeader>
          <DialogTitle>{tCredits('createCredit.title')}</DialogTitle>
          <DialogDescription>
            {tCredits('createCredit.description')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectField
              name="country"
              label={tCredits('credit.country')}
              placeholder={tCredits('filters.selectCountry')}
              options={[
                { value: 'CO', label: 'Colombia' },
                { value: 'MX', label: 'Mexico' },
              ]}
            />
            <InputField
              name="fullName"
              label={tCredits('credit.fullName')}
              placeholder={tCredits('credit.fullName')}
            />
            <InputField
              name="documentId"
              label={tCredits('credit.documentId')}
              placeholder={tCredits('credit.documentId')}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                name="requestedAmount"
                label={tCredits('credit.requestedAmount')}
                placeholder="12000"
                type="number"
              />
              <InputField
                name="monthlyIncome"
                label={tCredits('credit.monthlyIncome')}
                placeholder="500000"
                type="number"
              />
            </div>

            {createCreditMutation.isError && (
              <div className="text-red-500">
                {createCreditMutation.error.message}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                disabled={createCreditMutation.isPending}
              >
                {createCreditMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {tCommon('cancel')}
              </Button>

              <Button
                type="submit"
                disabled={createCreditMutation.isPending}
                className="text-white"
              >
                {createCreditMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 stroke-white" />
                )}
                {tCommon('save')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

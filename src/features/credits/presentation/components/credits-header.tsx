import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { useLogoutMutation } from '@/features/auth/auth.queries'
import { LogOut, PlusIcon } from 'lucide-react'
import { useCreditsStore } from '../../credits.store'

export const CreditsHeader = () => {
  const { t } = useTranslation('credits')
  const logoutMutation = useLogoutMutation()
  const setIsCreateOpen = useCreditsStore((state) => state.setIsCreateOpen)

  return (
    <div className="flex justify-between flex-col sm:flex-row items-center mb-8 gap-4">
      <div>
        <h1 className="font-bold tracking-tight">{t('page.title')}</h1>
        <p className="text-muted-foreground">{t('page.listDescription')}</p>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        <Button
          variant="outline"
          className="w-full sm:w-auto group hover:bg-text hover:text-neutral"
          onClick={() => setIsCreateOpen(true)}
        >
          <PlusIcon className="h-4 w-4 group-hover:stroke-neutral" />
          {t('page.create')}
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-primary text-white"
          onClick={() => logoutMutation.mutateAsync()}
        >
          <LogOut className="h-4 w-4 stroke-white" />
          {t('page.logout')}
        </Button>
      </div>
    </div>
  )
}

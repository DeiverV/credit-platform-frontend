import { useTranslation } from 'react-i18next'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'

export const AuthPage = () => {
  const { t } = useTranslation('auth')

  return (
    <main className="min-h-screen w-full flex items-center justify-center px-4 bg-linear-to-br from-primary to-neutral">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            {t('page.title')}
          </h1>
          <p className="text-white/60 text-sm mt-1">{t('page.subtitle')}</p>
        </div>

        <Tabs defaultValue="login">
          <Card className="shadow-2xl border border-white/10 bg-neutral">
            <TabsContent value="login">
              <CardHeader className="pt-2">
                <CardTitle className="text-xl text-text">
                  {t('login.title')}
                </CardTitle>
                <CardDescription className="text-text/60 mb-4">
                  {t('login.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader className="pt-2">
                <CardTitle className="text-xl text-text">
                  {t('register.title')}
                </CardTitle>
                <CardDescription className="text-text/60 mb-4">
                  {t('register.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </TabsContent>
          </Card>

          <TabsList className="w-full grid grid-cols-2 bg-neutral mt-2">
            <TabsTrigger
              value="login"
              className="data-[state=active]:bg-primary/80 data-[state=active]:text-white"
            >
              {t('tabs.login')}
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="data-[state=active]:bg-primary/80 data-[state=active]:text-white"
            >
              {t('tabs.register')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </main>
  )
}

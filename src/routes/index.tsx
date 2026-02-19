import { createFileRoute } from '@tanstack/react-router'

import { Seo } from '@/features/landing/components/seo'
import { LandingPage } from '@/features/landing/landing.page'
import { CustomizeStylesMenu } from '@/components/ui/customize-styles-menu'

export const Route = createFileRoute('/')({
  component: () => (
    <>
      <Seo />
      <LandingPage />
      <div className="fixed bottom-4 right-4 md:bottom-12 md:right-12 z-50">
        <CustomizeStylesMenu />
      </div>
    </>
  ),
})

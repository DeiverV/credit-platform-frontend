import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider, createRouter } from '@tanstack/react-router'
import * as TanStackQueryProvider from './providers/tanstack.provider.tsx'

import { routeTree } from './routeTree.gen'
import './i18n/i18n'
import './css/styles.css'
import './css/animations.css'
import { CustomizeStylesMenu } from './components/theme-menu/theme-menu.tsx'

// Restore user theme preferences before first paint
const savedTheme = localStorage.getItem('theme')
const savedPrimary = localStorage.getItem('primary')
if (savedTheme) document.body.setAttribute('data-theme', savedTheme)
if (savedPrimary) document.body.setAttribute('data-theme-primary', savedPrimary)

const TanStackQueryProviderContext = TanStackQueryProvider.getContext()

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 50,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')

if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
        <div className="fixed bottom-6 right-6 z-50">
          <CustomizeStylesMenu alignment="top" />
        </div>
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  )
}

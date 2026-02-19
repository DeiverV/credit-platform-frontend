import type { QueryClient } from '@tanstack/react-query'
import {
  Navigate,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => <Outlet />,
  notFoundComponent: () => <Navigate to="/" />,
  onError: () => <Navigate to="/" />,
})

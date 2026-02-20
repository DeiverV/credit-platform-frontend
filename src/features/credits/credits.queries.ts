import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { creditsUseCases } from './core'
import { CreditsQueryKeys } from './core/domain/credits-query-keys'
import type { IListCreditsPayload } from './core/domain/credits.types'

export const useGetCreditByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [CreditsQueryKeys.GET_CREDIT_BY_ID, id],
    queryFn: () => creditsUseCases.getCreditById(id),
  })
}

export const useInfiniteListCreditsQuery = (params: IListCreditsPayload) => {
  return useInfiniteQuery({
    queryKey: [CreditsQueryKeys.LIST_CREDITS, params],
    queryFn: ({ pageParam = 1 }) =>
      creditsUseCases.getListCredits({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
    initialPageParam: 1,
    refetchOnWindowFocus: true,
  })
}

export const useCreateCreditMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: creditsUseCases.createCredit,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CreditsQueryKeys.LIST_CREDITS],
      })

      queryClient.invalidateQueries({
        queryKey: [CreditsQueryKeys.GET_CREDIT_BY_ID],
      })
    },
  })
}

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { creditsUseCases } from './core'
import { CreditsQueryKeys } from './core/domain/credits-query-keys'
import type { IListCreditsPayload } from './core/domain/credits.types'

export const useGetCreditByIdQuery = (id: string) => {
  return useQuery({
    queryKey: [CreditsQueryKeys.GET_CREDIT_BY_ID, id],
    queryFn: () => creditsUseCases.getCreditById(id),
  })
}

export const useListCreditsQuery = (params: IListCreditsPayload) => {
  return useQuery({
    queryKey: [CreditsQueryKeys.LIST_CREDITS, params],
    queryFn: () => creditsUseCases.getListCredits(params),
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

import { useEffect, useRef } from 'react'
import { useSocket } from '@/providers/socket.provider'
import { useNotificationStore } from '../notifications.store'
import { useQueryClient } from '@tanstack/react-query'
import { CreditsQueryKeys } from '@/features/credits/core/domain/credits-query-keys'

export const useNotificationSocket = () => {
  const { socket } = useSocket()
  const addNotification = useNotificationStore((state) => state.addNotification)
  const queryClient = useQueryClient()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!socket) return

    const handleApplicationCreated = (data: {
      id: string
      country: string
      fullName: string
      status: string
      requestedAmount: number
      timestamp: string
    }) => {
      addNotification({
        id: data.id,
        title: 'New Application',
        message: `New application from ${data.fullName} (${data.country}) for $${data.requestedAmount}`,
        type: 'info',
      })
    }

    const handleStatusUpdated = (data: {
      applicationId: string
      oldStatus: string
      newStatus: string
      timestamp: string
    }) => {
      addNotification({
        id: crypto.randomUUID(),
        title: 'Status Updated',
        message: `Application ${data.applicationId.slice(0, 6)}... changed from ${data.oldStatus} to ${data.newStatus}`,
        type: 'info',
      })
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [CreditsQueryKeys.LIST_CREDITS],
          refetchType: 'all',
          exact: false,
        })
        queryClient.invalidateQueries({
          queryKey: [CreditsQueryKeys.GET_CREDIT_BY_ID],
        })
      }, 2000)
    }

    socket.on('application_created', handleApplicationCreated)
    socket.on('status_updated', handleStatusUpdated)

    return () => {
      socket.off('application_created', handleApplicationCreated)
      socket.off('status_updated', handleStatusUpdated)
    }
  }, [socket, addNotification])
}

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useNotificationStore } from '../notifications.store'
import { NotificationPanel } from './notification-panel'
import { Bell } from 'lucide-react'

export const NotificationBell = () => {
  const unreadCount = useNotificationStore((state) => state.unreadCount)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-none shadow shadow-text/20"
        align="end"
      >
        <NotificationPanel />
      </PopoverContent>
    </Popover>
  )
}

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BellOff, Check, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { useNotificationStore } from '../notifications.store'

export const NotificationPanel = () => {
  const { notifications, markAsRead, markAllAsRead, clearAll } =
    useNotificationStore()

  return (
    <div className="flex flex-col h-[400px] bg-white dark:bg-neutral-900 rounded-md">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-semibold leading-none">Notifications</h4>
        {notifications.length > 0 && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-8 group"
              title="Mark all as read"
            >
              <Check className="h-4 w-4 group-hover:stroke-green-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs h-8 text-destructive hover:text-destructive group"
              title="Clear all"
            >
              <Trash2 className="h-4 w-4 group-hover:stroke-red-600" />
            </Button>
          </div>
        )}
      </div>
      <ScrollArea className="flex-1 min-h-0">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 mt-35 text-muted-foreground gap-2">
            <BellOff className="h-8 w-8 opacity-20" />
          </div>
        ) : (
          <div className="grid gap-1 p-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  relative flex flex-col gap-1 p-3 text-sm text-white transition-colors hover:bg-accent border-b border-neutral-800 rounded-none
                  ${!notification.read ? 'bg-primary/10 font-medium' : ''}
                `}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="font-semibold">{notification.title}</div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-muted-foreground whitespace-normal pr-4">
                  {notification.message}
                </p>
                {!notification.read && (
                  <span className="absolute top-1/2 -translate-y-1/2 right-2 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

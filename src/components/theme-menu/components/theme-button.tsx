import { cn } from '@/lib/utils'
import { LucideCheck } from 'lucide-react'

interface Props {
  active?: boolean
  onClick: () => void
  children: React.ReactNode
  title?: string
}

export const ThemeButton = ({ active, onClick, children, title }: Props) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className={cn(
        'relative h-9 w-9 flex items-center justify-center rounded-default border transition-all duration-200',
        active
          ? 'bg-primary border-primary text-white cursor-pointer shadow-md'
          : 'bg-neutral border-text/15 text-text/70 hover:border-text/40 hover:text-text',
      )}
    >
      {children}
      {active && (
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-neutral flex items-center justify-center">
          <LucideCheck size={8} className="stroke-white stroke-[3px]" />
        </span>
      )}
    </button>
  )
}

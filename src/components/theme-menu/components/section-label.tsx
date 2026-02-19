import type { PropsWithChildren } from 'react'

export const SectionLabel = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-text/50 mb-2">
      {children}
    </p>
  )
}

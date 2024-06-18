import React from 'react'

type Props = {
  children: React.ReactNode
}

export function Badge({ children }: Props) {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  )
}

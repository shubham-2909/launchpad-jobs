import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading: boolean
}

export default function LoadingButton({ children, loading, ...props }: Props) {
  return (
    <Button {...props} type="submit" disabled={props.disabled || loading}>
      <span className="flex items-center justify-center gap-1">
        {loading && <Loader2 size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  )
}

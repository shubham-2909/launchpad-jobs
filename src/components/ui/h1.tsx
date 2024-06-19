import { cn } from '@/lib/utils'

export function H1({
  className,
  ...props
}: React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('text-4xl font-extrabold tracking-tight lg:text-5xl')}
      {...props}
    />
  )
}

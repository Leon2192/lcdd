import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'
type BadgeProps = ComponentPropsWithRef<'span'> & {
  tone?: 'neutral' | 'success' | 'error'
}
export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span {...props} className={cn('badge', `badge--${tone}`, className)} />
  )
}

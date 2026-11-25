import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'
export function Section({
  className,
  ...props
}: ComponentPropsWithRef<'section'>) {
  return <section {...props} className={cn('section', className)} />
}

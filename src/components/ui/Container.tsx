import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'
export function Container({
  className,
  ...props
}: ComponentPropsWithRef<'div'>) {
  return <div {...props} className={cn('container-lcdd', className)} />
}

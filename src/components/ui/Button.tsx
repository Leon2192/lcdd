import type { ComponentPropsWithRef } from 'react'
import { cn } from '@/lib/cn'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  isPending?: boolean
}

export function Button({
  variant = 'primary',
  isPending = false,
  disabled,
  type = 'button',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || isPending}
      aria-busy={isPending || undefined}
      className={cn('button', `button--${variant}`, className)}
    >
      {isPending ? 'Cargando…' : children}
    </button>
  )
}

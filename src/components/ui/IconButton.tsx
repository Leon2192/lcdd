import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import type { ButtonProps } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

type IconButtonProps = Omit<ButtonProps, 'children' | 'aria-label'> & {
  label: string
  children: ReactNode
}
export function IconButton({
  label,
  children,
  className,
  variant = 'ghost',
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      variant={variant}
      aria-label={label}
      className={cn('icon-button', className)}
    >
      {children}
    </Button>
  )
}

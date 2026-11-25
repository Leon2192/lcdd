import type { ReactNode } from 'react'
export function EmptyState({
  title,
  description,
  action,
  headingAs: Heading = 'h2',
}: {
  title: string
  description: string
  action?: ReactNode
  headingAs?: 'h2' | 'h3'
}) {
  return (
    <div className="empty-state">
      <span className="placeholder-mark" aria-hidden="true">
        ✧
      </span>
      <Heading>{title}</Heading>
      <p className="text-muted">{description}</p>
      {action}
    </div>
  )
}

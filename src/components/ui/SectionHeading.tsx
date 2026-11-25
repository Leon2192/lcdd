import type { ReactNode } from 'react'
type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  children: ReactNode
  description?: string
  align?: 'start' | 'center'
}
export function SectionHeading({
  id,
  eyebrow,
  children,
  description,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{children}</h2>
      <span className="heading-ornament" aria-hidden="true">
        ♡
      </span>
      {description && <p className="text-muted">{description}</p>}
    </div>
  )
}

import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Icon } from '@/components/ui/Icon'

type OverlayProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  kind: 'modal' | 'drawer'
  id?: string
}
export function Overlay({
  open,
  onOpenChange,
  title,
  children,
  kind,
  id,
}: OverlayProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const headingId = useId()
  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !open) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    dialog.querySelector<HTMLButtonElement>('button')?.focus()
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus()
    }
  }, [open])
  return (
    <dialog
      id={id}
      ref={ref}
      aria-labelledby={headingId}
      className={`overlay overlay--${kind}`}
      onCancel={(event) => {
        event.preventDefault()
        onOpenChange(false)
      }}
      onClose={(event) => {
        if (open && !event.currentTarget.open) onOpenChange(false)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          onOpenChange(false)
          return
        }
        if (event.key !== 'Tab') return
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>('*'),
        ).filter(
          (element) =>
            element.matches(
              'a[href], button, input, select, textarea, summary, [tabindex]',
            ) &&
            element.tabIndex >= 0 &&
            !element.matches(':disabled') &&
            !element.closest('[hidden], [inert]') &&
            (!element.closest('details:not([open])') ||
              element.tagName === 'SUMMARY'),
        )
        event.preventDefault()
        const activeIndex = controls.findIndex(
          (element) => element === document.activeElement,
        )
        const nextIndex = event.shiftKey
          ? activeIndex <= 0
            ? controls.length - 1
            : activeIndex - 1
          : (activeIndex + 1) % controls.length
        controls[nextIndex]?.focus()
      }}
    >
      <div className="overlay-content">
        <div className="overlay-heading">
          <h2 id={headingId}>{title}</h2>
          <IconButton
            label={`Cerrar ${title.toLowerCase()}`}
            onClick={() => onOpenChange(false)}
          >
            <Icon name="close" />
          </IconButton>
        </div>
        {children}
      </div>
    </dialog>
  )
}

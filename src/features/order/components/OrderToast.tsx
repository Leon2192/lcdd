import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { orderStore } from '../store'

const message = 'Producto agregado al carrito'
const visibleMs = 5_000
const exitMs = 180

export function OrderToast() {
  const [addition, setAddition] = useState(0)
  const [closing, setClosing] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLElement | null>(null)

  useEffect(
    () =>
      orderStore.subscribe((state, previous) => {
        if (state.additionCount === previous.additionCount) return
        trigger.current =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null
        setClosing(false)
        setAddition(state.additionCount)
      }),
    [],
  )

  useEffect(() => {
    if (!addition) return
    const timer = window.setTimeout(
      () => {
        if (closing) setAddition(0)
        else close()
      },
      closing ? exitMs : visibleMs,
    )
    return () => window.clearTimeout(timer)
  }, [addition, closing])

  function close(restoreFocus = true) {
    if (restoreFocus && panel.current?.contains(document.activeElement))
      trigger.current?.focus({ preventScroll: true })
    setClosing(true)
  }

  return (
    <>
      <p role="status" aria-atomic="true" className="sr-only">
        {addition > 0 && !closing && <span key={addition}>{message}</span>}
      </p>
      {addition > 0 && (
        <div
          key={addition}
          ref={panel}
          className="order-toast"
          data-closing={closing}
          inert={closing}
        >
          <span className="order-toast-icon">
            <Icon name="check" />
          </span>
          <div>
            <p aria-hidden="true">{message}</p>
            <Link to="/arma-tu-pedido" onClick={() => close(false)}>
              Ver mi pedido
            </Link>
          </div>
          <IconButton label="Cerrar notificación" onClick={() => close()}>
            <Icon name="close" />
          </IconButton>
        </div>
      )}
    </>
  )
}

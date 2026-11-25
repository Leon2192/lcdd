export function OrderSteps({ current }: { current: 'selection' | 'event' }) {
  return (
    <nav aria-label="Etapas de la solicitud" className="order-steps">
      <ol>
        <li>
          <span
            {...(current === 'selection' ? { 'aria-current': 'step' } : {})}
          >
            1. Tu pedido
          </span>
        </li>
        <li>
          <span {...(current === 'event' ? { 'aria-current': 'step' } : {})}>
            2. Tu evento
          </span>
        </li>
      </ol>
    </nav>
  )
}

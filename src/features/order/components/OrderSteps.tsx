import { Link } from 'react-router'
export function OrderSteps({ current }: { current: 'selection' | 'event' }) {
  return (
    <nav aria-label="Etapas de la solicitud" className="order-steps">
      <ol>
        <li>
          {current === 'selection' ? (
            <span aria-current="step">1. Tu pedido</span>
          ) : (
            <Link to="/arma-tu-pedido">1. Tu pedido</Link>
          )}
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

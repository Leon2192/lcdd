import { getLineLabel } from '../rules'
import { selectOrderProducts } from '../selectors'
import type { OrderLine } from '../persistence'
export function OrderSummary({ lines }: { lines: readonly OrderLine[] }) {
  return (
    <section className="order-summary" aria-labelledby="order-summary-title">
      <h2 id="order-summary-title">Resumen de tu pedido</h2>
      <p>{lines.length} productos seleccionados</p>
      <ul>
        {selectOrderProducts(lines).map(({ line, product }) => (
          <li key={product.id}>
            <strong>{product.name}</strong>
            <span>{getLineLabel(product.id, line.quantity)}</span>
          </li>
        ))}
      </ul>
      <p>
        Las cantidades son referencias para cotizar. No implican disponibilidad
        ni condiciones comerciales confirmadas.
      </p>
    </section>
  )
}

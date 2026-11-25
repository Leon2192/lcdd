import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Button } from '@/components/ui/Button'
import { getOrderRule, orderQuantityRange } from '../rules'
import { useOrder } from '../use-order'
import type { Product } from '@/data/catalog/types'
export function OrderSelection({ product }: { product: Product }) {
  const rule = getOrderRule(product)
  const quantityRef = useRef<HTMLSelectElement>(null)
  const add = useOrder((state) => state.add)
  const [quantity, setQuantity] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (rule.kind === 'consultation') return
    const number = rule.kind === 'service' ? null : quantity
    if (rule.kind === 'quantity' && number === null) {
      setError('Elegí una cantidad del 10 al 200.')
      setStatus('')
      quantityRef.current?.focus()
      return
    }
    setError('')
    const result = add(product.id, number)
    setStatus(
      result === 'added'
        ? ''
        : result === 'exists'
          ? 'Este producto ya está en tu pedido. Podés editar la cantidad desde allí.'
          : 'No se pudo agregar: revisá la modalidad y la cantidad.',
    )
  }
  if (rule.kind === 'consultation')
    return <p>Consultanos por las opciones disponibles.</p>

  return (
    <section
      className="order-selection"
      aria-label={`Selección de ${product.name}`}
    >
      <h2>Sumalo a tu pedido</h2>
      <form onSubmit={submit} noValidate>
        {rule.kind === 'service' ? (
          <p>Servicio digital</p>
        ) : (
          <QuantitySelector
            ref={quantityRef}
            label={rule.label}
            value={quantity}
            {...orderQuantityRange}
            showSteppers={false}
            onChange={(next) => {
              setQuantity(next)
              setError('')
              setStatus('')
            }}
            {...(error ? { error } : {})}
          />
        )}
        <Button type="submit">Agregar a mi pedido</Button>
      </form>
      {status && <p role="status">{status}</p>}
    </section>
  )
}

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getOrderRule } from '../rules'
import { quantitySchema } from '../persistence'
import { useOrder } from '../use-order'
import type { Product } from '@/data/catalog/types'
export function OrderSelection({ product }: { product: Product }) {
  const rule = getOrderRule(product)
  const quantityRef = useRef<HTMLInputElement>(null)
  const add = useOrder((state) => state.add)
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (rule.kind === 'consultation') return
    const number = rule.kind === 'service' ? null : Number(quantity)
    if (
      rule.kind === 'quantity' &&
      (!quantity.trim() || !quantitySchema.safeParse(number).success)
    ) {
      setError('Ingresá una cantidad entera positiva.')
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
          <Input
            ref={quantityRef}
            label={rule.label}
            type="number"
            inputMode="numeric"
            step="1"
            value={quantity}
            onChange={(event) => {
              setQuantity(event.target.value)
              setError('')
              setStatus('')
            }}
            placeholder="Ingresá la cantidad que querés consultar"
            {...(error ? { error } : {})}
          />
        )}
        <Button type="submit">Agregar a mi pedido</Button>
      </form>
      {status && <p role="status">{status}</p>}
    </section>
  )
}

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { getOrderRule } from '../rules'
import { quantitySchema } from '../persistence'
import { useOrder } from '../use-order'
import type { Product } from '@/data/catalog/types'
export function OrderSelection({ product }: { product: Product }) {
  const quantityRef = useRef<HTMLInputElement>(null)
  const rule = getOrderRule(product)
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
      setError(
        'Ingresá una cantidad entera positiva. No se definió un mínimo comercial.',
      )
      setStatus('')
      quantityRef.current?.focus()
      return
    }
    setError('')
    const result = add(product.id, number)
    setStatus(
      result === 'added'
        ? `${product.name} se agregó a tu pedido.`
        : result === 'exists'
          ? 'Este producto ya está en tu pedido. La cantidad no se sumó ni cambió; podés editarla allí.'
          : 'No se pudo agregar: revisá la modalidad y la cantidad.',
    )
  }
  return (
    <section
      className="order-selection"
      aria-label={`Selección de ${product.name}`}
    >
      <h2>Sumalo a tu pedido</h2>
      {rule.kind === 'consultation' ? (
        <p>{rule.reason}</p>
      ) : (
        <form onSubmit={submit} noValidate>
          {rule.kind === 'service' ? (
            <p>Servicio digital · Sin selector de unidades.</p>
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
              hint="Cantidad de referencia para cotizar; mínimos y condiciones comerciales por confirmar."
              {...(error ? { error } : {})}
            />
          )}
          <Button type="submit">Agregar a mi pedido</Button>
        </form>
      )}
      <p role="status">{status}</p>
      <Link className="order-view-link" to="/arma-tu-pedido">
        Ver mi pedido
      </Link>
    </section>
  )
}

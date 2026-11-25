import { describe, it, expect } from 'vitest'
import { orderEnvelope, readOrder, ORDER_STORAGE_KEY } from './persistence'
import type { OrderStorage } from './persistence'
describe('Recuperación y limpieza resilientes', () => {
  it('conserva líneas recuperables aunque falle la escritura de limpieza', () => {
    const valid = {
      productId: 'P-003',
      kind: 'quantity' as const,
      quantity: 25,
    }
    const payload = JSON.stringify(orderEnvelope([valid, valid]))
    const storage: OrderStorage = {
      getItem: () => payload,
      setItem: () => {
        throw new Error('Quota')
      },
      removeItem: () => {
        throw new Error('Denied')
      },
    }
    const result = readOrder(storage)
    expect(result.lines).toEqual([valid])
    expect(result.notice).toContain(
      'No se pudo actualizar el almacenamiento local',
    )
  })
  it('rechaza metadatos personales ajenos al contrato persistido', () => {
    const remove: string[] = []
    const storage: OrderStorage = {
      getItem: () =>
        JSON.stringify({
          ...orderEnvelope([
            { productId: 'P-003', kind: 'quantity', quantity: 25 },
          ]),
          customerName: 'Privado',
        }),
      setItem: () => {},
      removeItem: (key) => {
        remove.push(key)
      },
    }
    expect(readOrder(storage).lines).toEqual([])
    expect(remove).toEqual([ORDER_STORAGE_KEY])
  })
  it('no afirma borrado exitoso si falla limpiar JSON corrupto', () => {
    const storage: OrderStorage = {
      getItem: () => '{corrupto',
      setItem: () => {},
      removeItem: () => {
        throw new Error('Denied')
      },
    }
    const result = readOrder(storage)
    expect(result.lines).toEqual([])
    expect(result.notice).toContain('no se pudo borrar')
  })
})

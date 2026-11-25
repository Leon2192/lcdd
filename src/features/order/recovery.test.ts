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

it('recupera líneas compatibles del catálogo anterior y pide volver a elegir el kit genérico', () => {
  const bath = { productId: 'P-002', kind: 'quantity' as const, quantity: 14 }
  const oldKit = { ...bath, productId: 'P-001', quantity: 9 }
  const catalogRevision =
    '5207b6431d612f46412d96396b8ea88368ab0a3b2fd4144b8ebf90f746ee6a6f'
  const previous = { ...orderEnvelope([oldKit, bath]), catalogRevision }
  let value: string | null = JSON.stringify(previous)
  const storage: OrderStorage = {
    getItem: () => value,
    setItem: (_, stored) => {
      value = stored
    },
    removeItem: () => {
      value = null
    },
  }

  const recovered = readOrder(storage)
  expect(recovered.lines).toEqual([bath])
  expect(recovered.notice).toMatch(
    /volvé a elegir el tuyo en la categoría Kits/i,
  )
  expect(value).toBe(JSON.stringify(orderEnvelope([bath])))
  expect(readOrder(storage)).toEqual({ lines: [bath], notice: '' })

  value = JSON.stringify(orderEnvelope([oldKit, bath]))
  expect(readOrder(storage)).toEqual({ lines: [oldKit, bath], notice: '' })
})

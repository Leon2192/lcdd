import { beforeEach, describe, expect, it } from 'vitest'
import { catalog, getProduct } from '@/data/catalog/catalog'
import { createOrderStore } from './store'
import { getOrderRule } from './rules'
import {
  ORDER_STORAGE_KEY,
  orderEnvelope,
  reconcileOrder,
  readOrder,
} from './persistence'
import type { OrderStorage } from './persistence'
function memoryStorage(): OrderStorage {
  const values = new Map<string, string>()
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value)
    },
    removeItem: (key) => {
      values.delete(key)
    },
  }
}
let storage: OrderStorage
beforeEach(() => {
  storage = memoryStorage()
})
describe('Selección y reglas comerciales', () => {
  it('empieza vacío y permite agregar una cantidad explícita', () => {
    const store = createOrderStore(storage)
    expect(store.getState().lines).toEqual([])
    expect(store.getState().add('P-003', 30)).toBe('added')
    expect(store.getState().lines).toEqual([
      { productId: 'P-003', kind: 'quantity', quantity: 30 },
    ])
  })
  it.each([null, 0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    'rechaza cantidad física inválida %s sin sustituirla por uno',
    (quantity) => {
      const store = createOrderStore(storage)
      expect(store.getState().add('P-003', quantity)).toBe('invalid')
      expect(store.getState().lines).toEqual([])
    },
  )
  it('conserva una selección repetida sin sumar ni reemplazar cantidades', () => {
    const store = createOrderStore(storage)
    store.getState().add('P-003', 30)
    expect(store.getState().add('P-003', 40)).toBe('exists')
    expect(store.getState().lines[0]?.quantity).toBe(30)
  })
  it('edita, rechaza cambios inválidos y elimina sin perder otras líneas', () => {
    const store = createOrderStore(storage)
    store.getState().add('P-003', 30)
    store.getState().add('P-013', null)
    expect(store.getState().updateQuantity('P-003', 12)).toBe(true)
    expect(store.getState().updateQuantity('P-003', 0)).toBe(false)
    expect(store.getState().updateQuantity('P-013', 12)).toBe(false)
    store.getState().remove('P-003')
    expect(store.getState().lines).toEqual([
      { productId: 'P-013', kind: 'service', quantity: null },
    ])
  })
  it.each(['P-013', 'P-014'])(
    'selecciona %s como servicio sin unidades',
    (id) => {
      const store = createOrderStore(storage)
      expect(store.getState().add(id, 1)).toBe('invalid')
      expect(store.getState().add(id, null)).toBe('added')
      expect(store.getState().add(id, null)).toBe('exists')
      expect(store.getState().lines[0]?.quantity).toBeNull()
    },
  )
  it.each([
    ['P-008', 'Cantidad'],
    ['P-011', 'Cantidad de tarjetas'],
    ['P-012', 'Cantidad'],
  ])(
    'agrega %s con cantidad explícita y recupera su línea guardada',
    (id, label) => {
      const product = getProduct(id)
      if (!product) throw new Error('Sin producto')
      expect(getOrderRule(product)).toEqual({ kind: 'quantity', label })
      const store = createOrderStore(storage)
      expect(store.getState().add(id, null)).toBe('invalid')
      expect(store.getState().add(id, 20)).toBe('added')
      expect(createOrderStore(storage).getState().lines).toEqual([
        { productId: id, kind: 'quantity', quantity: 20 },
      ])
    },
  )
  it('no permite referencias fuera del catálogo', () => {
    expect(createOrderStore(storage).getState().add('P-999', 10)).toBe(
      'invalid',
    )
  })
})
describe('Persistencia validada', () => {
  it('recupera selección tras crear una nueva sesión y no guarda información personal', () => {
    const first = createOrderStore(storage)
    first.getState().add('P-003', 20)
    first.getState().add('P-014', null)
    const stored = JSON.parse(storage.getItem(ORDER_STORAGE_KEY) ?? '{}')
    expect(Object.keys(stored).sort()).toEqual([
      'catalogRevision',
      'lines',
      'version',
    ])
    expect(Object.keys(stored.lines[0]).sort()).toEqual([
      'kind',
      'productId',
      'quantity',
    ])
    const second = createOrderStore(storage)
    expect(second.getState().lines).toEqual(first.getState().lines)
  })
  it('recupera JSON corrupto y limpia su clave', () => {
    storage.setItem(ORDER_STORAGE_KEY, '{dañado')
    const result = readOrder(storage)
    expect(result.lines).toEqual([])
    expect(result.notice).toMatch(/dañado/)
    expect(storage.getItem(ORDER_STORAGE_KEY)).toBeNull()
  })
  it('descarta versiones desconocidas y conserva aviso', () => {
    storage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify({ ...orderEnvelope([]), version: 99 }),
    )
    const store = createOrderStore(storage)
    expect(store.getState().lines).toEqual([])
    expect(store.getState().notice).toMatch(
      /No pudimos recuperar el pedido guardado/,
    )
    expect(storage.getItem(ORDER_STORAGE_KEY)).toBeNull()
  })
  it('obliga a revisar selección si el catálogo cambió', () => {
    const result = reconcileOrder({
      ...orderEnvelope([
        { productId: 'P-003', kind: 'quantity', quantity: 20 },
      ]),
      catalogRevision: 'anterior',
    })
    expect(result.lines).toEqual([])
    expect(result.notice).toMatch(/catálogo cambió/)
  })
  it('descarta productos eliminados, repetidos, incompatibles y cantidades corruptas', () => {
    const result = reconcileOrder(
      orderEnvelope([
        { productId: 'P-003', kind: 'quantity', quantity: 20 },
        { productId: 'P-003', kind: 'quantity', quantity: 30 },
        { productId: 'P-999', kind: 'quantity', quantity: 10 },
        { productId: 'P-013', kind: 'service', quantity: 2 },
        { productId: 'P-011', kind: 'service', quantity: null },
        { productId: 'P-004', kind: 'quantity', quantity: -1 },
      ]),
    )
    expect(result.lines).toEqual([
      { productId: 'P-003', kind: 'quantity', quantity: 20 },
    ])
    expect(result.notice).toBeTruthy()
    expect(
      reconcileOrder(
        orderEnvelope(result.lines),
        catalog.products.filter((p) => p.id !== 'P-003'),
      ).lines,
    ).toEqual([])
  })
  it('no reinterpreta una modalidad modificada', () => {
    const modified = catalog.products.map((product) =>
      product.id === 'P-003'
        ? {
            ...product,
            selection: { ...product.selection, mode: 'service' as const },
          }
        : product,
    )
    expect(
      reconcileOrder(
        orderEnvelope([{ productId: 'P-003', kind: 'quantity', quantity: 20 }]),
        modified,
      ).lines,
    ).toEqual([])
  })
  it('vacía explícitamente el pedido y su almacenamiento', () => {
    const store = createOrderStore(storage)
    store.getState().add('P-003', 20)
    store.getState().clear()
    expect(store.getState().lines).toEqual([])
    expect(storage.getItem(ORDER_STORAGE_KEY)).toBeNull()
    expect(createOrderStore(storage).getState().lines).toEqual([])
  })
  it('tolera almacenamiento bloqueado y mantiene estado en memoria con aviso', () => {
    const blocked: OrderStorage = {
      getItem: () => {
        throw new Error('Denied')
      },
      setItem: () => {
        throw new Error('Quota')
      },
      removeItem: () => {
        throw new Error('Denied')
      },
    }
    const store = createOrderStore(blocked)
    expect(store.getState().notice).toBeTruthy()
    expect(store.getState().add('P-003', 20)).toBe('added')
    expect(store.getState().lines).toHaveLength(1)
    expect(store.getState().notice).toMatch(/solo durante esta sesión/)
    store.getState().clear()
    expect(store.getState().lines).toEqual([])
    expect(store.getState().notice).toMatch(/no se pudo borrar/)
  })
})

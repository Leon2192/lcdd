import { createStore } from 'zustand/vanilla'
import { getProduct } from '@/data/catalog/catalog'
import { getOrderRule } from './rules'
import {
  browserOrderStorage,
  readOrder,
  orderEnvelope,
  ORDER_STORAGE_KEY,
  orderLineSchema,
} from './persistence'
import type { OrderLine, OrderStorage } from './persistence'
export type AddResult = 'added' | 'exists' | 'invalid' | 'consultation'
export type OrderState = {
  lines: OrderLine[]
  notice: string
  additionCount: number
  add: (id: string, quantity: number | null) => AddResult
  updateQuantity: (id: string, quantity: number) => boolean
  remove: (id: string) => void
  clear: () => void
}
export function createOrderStore(
  storage: OrderStorage | undefined = browserOrderStorage(),
) {
  const recovered = readOrder(storage)
  const store = createStore<OrderState>()((set, get) => ({
    ...recovered,
    additionCount: 0,
    add: (id, quantity) => {
      const product = getProduct(id)
      if (!product) return 'invalid'
      const rule = getOrderRule(product)
      if (rule.kind === 'consultation') return 'consultation'
      const result = orderLineSchema.safeParse({
        productId: id,
        kind: rule.kind,
        quantity,
      })
      if (
        !result.success ||
        (rule.kind === 'service' ? quantity !== null : quantity === null)
      )
        return 'invalid'
      if (get().lines.some((line) => line.productId === id)) return 'exists'
      set((state) => ({
        lines: [...state.lines, result.data],
        additionCount: state.additionCount + 1,
      }))
      return 'added'
    },
    updateQuantity: (id, quantity) => {
      const line = get().lines.find((item) => item.productId === id)
      if (!line || line.kind !== 'quantity') return false
      const result = orderLineSchema.safeParse({ ...line, quantity })
      if (!result.success || quantity === null) return false
      set({
        lines: get().lines.map((item) =>
          item.productId === id ? result.data : item,
        ),
      })
      return true
    },
    remove: (id) =>
      set({ lines: get().lines.filter((line) => line.productId !== id) }),
    clear: () => {
      set({ lines: [], notice: '' })
      try {
        storage?.removeItem(ORDER_STORAGE_KEY)
      } catch {
        set({
          notice:
            'La selección se vació en esta sesión, pero no se pudo borrar el almacenamiento local. Revisá los permisos del navegador.',
        })
      }
    },
  }))
  store.subscribe((state, previous) => {
    if (state.lines === previous.lines) return
    try {
      if (!storage) throw new Error('Storage unavailable')
      storage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(orderEnvelope(state.lines)),
      )
    } catch {
      store.setState({
        notice:
          'No se pudo guardar el pedido. La selección actual se conserva solo durante esta sesión.',
      })
    }
  })
  return store
}
export const orderStore = createOrderStore()

import { useStore } from 'zustand'
import { orderStore } from './store'
import type { OrderState } from './store'
export function useOrder<T>(selector: (state: OrderState) => T): T {
  return useStore(orderStore, selector)
}

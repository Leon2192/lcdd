import { getProduct } from '@/data/catalog/catalog'
import type { Product } from '@/data/catalog/types'
export const orderQuantityRange = { min: 10, max: 200 } as const

export type OrderRule =
  { kind: 'quantity' | 'service'; label: string } | { kind: 'consultation' }
export function getOrderRule(product: Product): OrderRule {
  if (product.identityStatus !== 'confirmed') return { kind: 'consultation' }
  if (product.selection.mode === 'service')
    return { kind: 'service', label: 'Servicio digital' }
  return {
    kind: 'quantity',
    label:
      product.selection.mode === 'tables_or_units'
        ? 'Cantidad'
        : product.selection.label,
  }
}
export function getLineLabel(
  productId: string,
  quantity: number | null,
): string {
  const product = getProduct(productId)
  if (!product) return 'Producto no disponible'
  const rule = getOrderRule(product)
  return rule.kind === 'service'
    ? 'Servicio digital'
    : rule.kind === 'quantity' && quantity !== null
      ? `${rule.label}: ${quantity}`
      : 'Consultá por este producto'
}

import { getProduct } from '@/data/catalog/catalog'
import type { Product } from '@/data/catalog/types'
export type OrderRule =
  | { kind: 'quantity' | 'service'; label: string }
  | { kind: 'consultation'; reason: string }
export function getOrderRule(product: Product): OrderRule {
  if (product.identityStatus !== 'confirmed')
    return {
      kind: 'consultation',
      reason: 'La identidad de este producto requiere validación.',
    }
  if (product.id === 'P-011')
    return {
      kind: 'consultation',
      reason:
        'Carpa QR: tarjetas/unidades e inclusión del servicio digital pendientes. Consultá sin fijar una cantidad ni una modalidad.',
    }
  if (product.selection.mode === 'tables_or_units')
    return {
      kind: 'consultation',
      reason:
        'La unidad definitiva (mesas o unidades) está pendiente de validación. Podés consultar por este producto sin imponer una modalidad.',
    }
  if (product.selection.mode === 'service')
    return { kind: 'service', label: 'Servicio digital' }
  return { kind: 'quantity', label: product.selection.label }
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
      : 'Modalidad pendiente de definición'
}

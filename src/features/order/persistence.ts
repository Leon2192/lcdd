import { z } from 'zod'
import { catalog } from '@/data/catalog/catalog'
import { catalogSourceSha256 } from '@/data/catalog/catalog.generated'
import type { Product } from '@/data/catalog/types'
import { getOrderRule } from './rules'
export const ORDER_STORAGE_KEY = 'lcdd:order'
export const ORDER_VERSION = 1
export const quantitySchema = z
  .number()
  .int()
  .positive()
  .max(Number.MAX_SAFE_INTEGER)
export const orderLineSchema = z
  .object({
    productId: z.string(),
    kind: z.enum(['quantity', 'service']),
    quantity: quantitySchema.nullable(),
  })
  .strict()
export type OrderLine = z.infer<typeof orderLineSchema>
export type OrderStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>
const envelopeSchema = z
  .object({
    version: z.literal(ORDER_VERSION),
    catalogRevision: z.string(),
    lines: z.array(z.unknown()),
  })
  .strict()
export type Recovery = { lines: OrderLine[]; notice: string }
export function reconcileOrder(
  value: unknown,
  products: readonly Product[] = catalog.products,
  revision = catalogSourceSha256,
): Recovery {
  const parsed = envelopeSchema.safeParse(value)
  if (!parsed.success)
    return {
      lines: [],
      notice:
        'No pudimos recuperar el pedido guardado. Podés iniciar una nueva selección.',
    }
  if (parsed.data.catalogRevision !== revision)
    return {
      lines: [],
      notice:
        'El catálogo cambió. Volvé a seleccionar los productos y sus cantidades.',
    }
  const lines: OrderLine[] = []
  for (const candidate of parsed.data.lines) {
    const result = orderLineSchema.safeParse(candidate)
    if (!result.success) continue
    const line = result.data
    const product = products.find((item) => item.id === line.productId)
    if (!product || lines.some((item) => item.productId === line.productId))
      continue
    const rule = getOrderRule(product)
    if (
      rule.kind === 'consultation' ||
      rule.kind !== line.kind ||
      (line.kind === 'service'
        ? line.quantity !== null
        : line.quantity === null)
    )
      continue
    lines.push(line)
  }
  return {
    lines,
    notice:
      lines.length === parsed.data.lines.length
        ? ''
        : 'Recuperamos parte de tu pedido. Revisá tu selección antes de continuar.',
  }
}
export function orderEnvelope(lines: readonly OrderLine[]) {
  return { version: ORDER_VERSION, catalogRevision: catalogSourceSha256, lines }
}
export function readOrder(storage: OrderStorage | undefined): Recovery {
  if (!storage)
    return {
      lines: [],
      notice:
        'El almacenamiento local no está disponible. Tu selección se conservará solo durante esta sesión.',
    }
  let raw: string | null
  try {
    raw = storage.getItem(ORDER_STORAGE_KEY)
  } catch {
    return {
      lines: [],
      notice:
        'No se pudo acceder al pedido guardado. Podés usar una selección temporal en esta sesión.',
    }
  }
  if (!raw) return { lines: [], notice: '' }
  let value: unknown
  try {
    value = JSON.parse(raw)
  } catch {
    try {
      storage.removeItem(ORDER_STORAGE_KEY)
      return {
        lines: [],
        notice:
          'El pedido guardado estaba dañado y se descartó. Podés iniciar una nueva selección.',
      }
    } catch {
      return {
        lines: [],
        notice:
          'El pedido guardado está dañado y no se pudo borrar. Podés iniciar una selección temporal; revisá los permisos del navegador.',
      }
    }
  }
  const recovery = reconcileOrder(value)
  if (recovery.notice) {
    try {
      if (recovery.lines.length)
        storage.setItem(
          ORDER_STORAGE_KEY,
          JSON.stringify(orderEnvelope(recovery.lines)),
        )
      else storage.removeItem(ORDER_STORAGE_KEY)
    } catch {
      return {
        lines: recovery.lines,
        notice: `${recovery.notice} No se pudo actualizar el almacenamiento local; la selección recuperada está disponible en esta sesión.`,
      }
    }
  }
  return recovery
}
export function browserOrderStorage(): OrderStorage | undefined {
  try {
    return typeof window === 'undefined' ? undefined : window.localStorage
  } catch {
    return undefined
  }
}

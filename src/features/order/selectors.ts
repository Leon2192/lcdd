import { getProduct, getRelatedProducts } from '@/data/catalog/catalog'
import type { OrderLine } from './persistence'
export function selectOrderProducts(lines: readonly OrderLine[]) {
  return lines.flatMap((line) => {
    const product = getProduct(line.productId)
    return product ? [{ line, product }] : []
  })
}
export function selectSuggestions(lines: readonly OrderLine[]) {
  const selected = new Set(lines.map((line) => line.productId))
  const seen = new Set<string>()
  return selectOrderProducts(lines)
    .flatMap(({ product }) => getRelatedProducts(product))
    .filter((product) => {
      if (selected.has(product.id) || seen.has(product.id)) return false
      seen.add(product.id)
      return true
    })
}

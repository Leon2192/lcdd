import { visualAssets } from '@/config/media'
import { officialCatalog } from './catalog.generated'
import type { Catalog, Product, CatalogImage } from './types'
export const catalog: Catalog = officialCatalog
export const categories = officialCatalog.categories
export const productIdentities = officialCatalog.products.map(
  ({ id, name, categoryId }) => ({ id, name, categoryId }),
)
export type ProductId = (typeof officialCatalog.products)[number]['id']
export const getProduct = (id: string) =>
  catalog.products.find((product) => product.id === id)
export const getCategory = (id: string) =>
  catalog.categories.find((category) => category.id === id)
export const getCategoryProducts = (id: string) =>
  catalog.products.filter((product) => product.categoryId === id)
const slug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
export const getProductPath = (product: Pick<Product, 'id' | 'name'>) =>
  `/catalogo/producto/${slug(product.id)}-${slug(product.name)}`
export const getCategoryPath = (id: string) => `/catalogo/categoria/${id}`
export function resolveProduct(value: string) {
  return catalog.products.find(
    (product) =>
      product.id === value ||
      getProductPath(product).split('/').at(-1) === value,
  )
}
export const getRelatedProducts = (product: Product) =>
  product.relatedProducts.ids.flatMap((id) => {
    const item = getProduct(id)
    return item ? [item] : []
  })
// Registrar una fotografía no cambia el estado comercial ni publicationReady del original.
export function getProductMedia(product: Product): readonly CatalogImage[] {
  const identity = productIdentities.find((item) => item.id === product.id)
  return identity ? (visualAssets.products[identity.id] ?? []) : []
}

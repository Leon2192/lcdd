import { ProductCard } from '@/components/ui/ProductCard'
import { getProductMedia, getProductPath } from '@/data/catalog/catalog'
import type { Product } from '@/data/catalog/types'
export function ProductGrid({ products }: { products: readonly Product[] }) {
  return (
    <div
      className={
        products.length <= 2
          ? 'catalog-grid catalog-grid--small'
          : 'catalog-grid'
      }
    >
      {products.map((product) => {
        const image = getProductMedia(product)[0]
        return (
          <ProductCard
            key={product.id}
            name={product.name}
            to={getProductPath(product)}
            {...(image ? { image } : {})}
          />
        )
      })}
    </div>
  )
}

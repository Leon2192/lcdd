import { Carousel } from '@/components/ui/Carousel'
import { ProductCard } from '@/components/ui/ProductCard'
import { getProductMedia, getProductPath } from '@/data/catalog/catalog'
import type { Product } from '@/data/catalog/types'
export function ProductRail({
  products,
  label,
}: {
  products: readonly Product[]
  label: string
}) {
  return (
    <div className="product-rail">
      <Carousel
        label={label}
        layout="rail"
        items={products.map((product) => {
          const image = getProductMedia(product)[0]
          return {
            id: product.id,
            content: (
              <ProductCard
                name={product.name}
                to={getProductPath(product)}
                {...(image ? { image } : {})}
              />
            ),
          }
        })}
      />
    </div>
  )
}

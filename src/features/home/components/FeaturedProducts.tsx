import {
  getProductPath,
  getProduct,
  getProductMedia,
} from '@/data/catalog/catalog'
import { Container } from '@/components/ui/Container'
import { Carousel } from '@/components/ui/Carousel'
import { ProductCard } from '@/components/ui/ProductCard'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProducts } from '@/features/home/home-content'
export function FeaturedProducts() {
  return (
    <Section className="home-featured" aria-labelledby="home-featured-title">
      <Container>
        <SectionHeading id="home-featured-title">
          Productos destacados
        </SectionHeading>
        <Carousel
          label="Carrusel de productos destacados"
          layout="rail"
          items={featuredProducts.map((product) => {
            const fullProduct = getProduct(product.id)
            const image = fullProduct
              ? getProductMedia(fullProduct)[0]
              : undefined
            return {
              id: product.id,
              content: (
                <ProductCard
                  {...(image ? { image } : {})}
                  name={product.name}
                  to={getProductPath(product)}
                />
              ),
            }
          })}
        />
      </Container>
    </Section>
  )
}

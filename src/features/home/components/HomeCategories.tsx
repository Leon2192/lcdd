import { isDisplayImage } from '@/config/image-attribution'
import { visualAssets } from '@/config/media'
import { CategoryCard } from '@/components/ui/CategoryCard'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { categories } from '@/config/categories'
import { homeContent } from '@/features/home/home-content'
export function HomeCategories() {
  return (
    <Section
      className="home-categories"
      aria-labelledby="home-categories-title"
    >
      <Container>
        <SectionHeading
          id="home-categories-title"
          eyebrow={homeContent.categories.eyebrow}
        >
          {homeContent.categories.title}
        </SectionHeading>
        <div className="home-categories-grid">
          {categories.map((category) => {
            const image = visualAssets.categories[category.id]
            return (
              <CategoryCard
                key={category.id}
                {...(isDisplayImage(image) ? { image } : {})}
                name={category.name}
                to={`/catalogo/categoria/${category.id}`}
              />
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

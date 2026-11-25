import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Icon } from '@/components/ui/Icon'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { homeContent } from '@/features/home/home-content'
export function HomeConversion() {
  const content = homeContent.conversion
  return (
    <Section
      className="home-conversion"
      aria-labelledby="home-conversion-title"
    >
      <Container className="conversion-composition">
        <HomeMedia slot="conversion" label="Detalle de presentación" />
        <div className="editorial-copy">
          <p className="eyebrow">Armá tu pedido</p>
          <h2 id="home-conversion-title">{content.title}</h2>
          <p>{content.description}</p>
          <Link className="button button--primary" to="/arma-tu-pedido">
            <Icon name="cart" />
            {content.action}
            <Icon name="arrow" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}

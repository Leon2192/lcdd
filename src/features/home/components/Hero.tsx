import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { homeContent } from '@/features/home/home-content'
export function Hero({ priority }: { priority: boolean }) {
  const { hero } = homeContent
  return (
    <section className="home-hero" aria-labelledby="hero-title">
      <Container className="hero-composition">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title">{hero.title}</h1>
          <p className="hero-description">{hero.description}</p>
          <Link className="button button--primary" to="/catalogo">
            <Icon name="gift" />
            {hero.action}
            <Icon name="arrow" />
          </Link>
        </div>
        <HomeMedia slot="hero" className="hero-media" priority={priority} />
      </Container>
    </section>
  )
}

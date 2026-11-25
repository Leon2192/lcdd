import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { homeContent } from '@/features/home/home-content'
export function Inspiration() {
  const content = homeContent.inspiration
  return (
    <Section
      className="home-inspiration"
      aria-labelledby="home-inspiration-title"
    >
      <Container className="inspiration-composition">
        <div className="editorial-copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="home-inspiration-title">{content.title}</h2>
          <p>{content.description}</p>
          <Link className="button button--primary" to="/inspiracion">
            {content.action}
            <Icon name="arrow" />
          </Link>
        </div>
        <div className="inspiration-collage">
          <HomeMedia slot="inspiration-1" className="inspiration-frame" />
          <HomeMedia slot="inspiration-2" className="inspiration-frame" />
          <HomeMedia slot="inspiration-3" className="inspiration-frame" />
        </div>
      </Container>
    </Section>
  )
}

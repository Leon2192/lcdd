import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { Section } from '@/components/ui/Section'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { homeContent } from '@/features/home/home-content'
import { siteConfig } from '@/config/site'
export function AboutAndProfessionals({ showAbout }: { showAbout: boolean }) {
  const { about, professionals } = homeContent
  return (
    <Section
      className={
        showAbout ? 'home-about' : 'home-about home-about--professionals'
      }
    >
      <Container className={showAbout ? 'about-composition' : undefined}>
        {showAbout && (
          <section
            className="about-editorial"
            aria-labelledby="home-about-title"
          >
            <HomeMedia slot="about" />
            <div className="editorial-copy">
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 id="home-about-title">{siteConfig.name}</h2>
              <p>{about.description}</p>
              <Link className="home-text-link" to="/nosotros">
                {about.action}
                <Icon name="arrow" />
              </Link>
            </div>
          </section>
        )}
        <section
          className="professionals-editorial editorial-copy"
          aria-labelledby="home-professionals-title"
        >
          <Icon name="users" />
          <h2 id="home-professionals-title">{professionals.title}</h2>
          <Link className="button button--outline" to="/profesionales">
            {professionals.action}
            <Icon name="arrow" />
          </Link>
        </section>
      </Container>
    </Section>
  )
}

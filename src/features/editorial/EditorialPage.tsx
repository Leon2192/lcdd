import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { ProductRail } from '@/components/ui/ProductRail'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { Icon } from '@/components/ui/Icon'
import { catalog, getProduct } from '@/data/catalog/catalog'
import { visualAssets } from '@/config/media'
import { editorialContent } from '@/config/editorial'
import { siteConfig } from '@/config/site'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'

type EditorialPageProps = { kind: 'about' | 'professionals' | 'inspiration' }
const labels = {
  about: 'Nosotros',
  professionals: 'Profesionales',
  inspiration: 'Inspiración',
} as const
export function EditorialPage({ kind }: EditorialPageProps) {
  const content = editorialContent[kind]
  const label = labels[kind]
  const contact = getValidatedWhatsAppUrl(
    kind === 'professionals'
      ? 'Hola LCDD, soy profesional de eventos y quisiera consultar por sus productos.'
      : 'Hola LCDD, quisiera consultar por detalles personalizados para mi evento.',
  )
  return (
    <div className="editorial-page">
      <Container>
        <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label }]} />
      </Container>
      <Section className="editorial-hero">
        <Container className="editorial-hero-grid">
          <div className="editorial-copy">
            <h1 className="eyebrow">{label}</h1>
            <p className="editorial-display">{content.title}</p>
            <p className="editorial-lead">{content.intro}</p>
            <Link to="/catalogo" className="button button--primary">
              Explorá el catálogo <Icon name="arrow" />
            </Link>
          </div>
          <HomeMedia
            slot={kind === 'inspiration' ? 'inspiration-1' : 'about'}
          />
        </Container>
      </Section>
      {kind === 'inspiration' ? (
        <>
          <Section aria-labelledby="collections-heading">
            <Container>
              <div className="editorial-copy">
                <p className="eyebrow">Inspiración y combinaciones</p>
                <h2 id="collections-heading">Encontrá tu punto de partida</h2>
                <p>
                  Explorá las colecciones y elegí los productos que quieras
                  combinar para tu evento.
                </p>
              </div>
              <nav
                className="editorial-collection-nav"
                aria-label="Colecciones de inspiración"
              >
                {catalog.collections.map((collection) => (
                  <a key={collection.id} href={`#${collection.id}`}>
                    {collection.name}
                  </a>
                ))}
              </nav>
            </Container>
          </Section>
          {catalog.collections.map((collection) => {
            const image = Object.entries(visualAssets.collections).find(
              ([id]) => id === collection.id,
            )?.[1]
            return (
              <Section
                className="editorial-collection"
                key={collection.id}
                id={collection.id}
                aria-labelledby={`${collection.id}-title`}
              >
                <Container>
                  <div className="editorial-collection-intro">
                    <div className="editorial-cover">
                      {image ? (
                        <>
                          <img
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            loading="lazy"
                            decoding="async"
                          />
                        </>
                      ) : (
                        <MediaPlaceholder />
                      )}
                    </div>
                    <div className="editorial-copy">
                      <h2 id={`${collection.id}-title`}>{collection.name}</h2>
                      <p>
                        Explorá los productos de esta selección y consultá las
                        opciones disponibles para tu evento.
                      </p>
                    </div>
                  </div>
                  <ProductRail
                    label={`Productos de ${collection.name}`}
                    products={collection.productIds.flatMap((id) => {
                      const product = getProduct(id)
                      return product ? [product] : []
                    })}
                  />
                </Container>
              </Section>
            )
          })}
        </>
      ) : (
        <Section>
          <Container>
            <div className="editorial-story">
              <HomeMedia slot="about" />
              <div className="editorial-copy">
                <p className="eyebrow">{siteConfig.name}</p>
                <h2>
                  {kind === 'about'
                    ? 'Quiénes somos'
                    : 'Conversemos sobre tu proyecto'}
                </h2>
                <p>{editorialContent[kind].body}</p>
                <Link to="/arma-tu-pedido" className="button button--outline">
                  Armá tu pedido <Icon name="cart" />
                </Link>
              </div>
            </div>
            <div className="editorial-topics">
              {(kind === 'about'
                ? [
                    'Explorá las propuestas',
                    'Elegí tus detalles',
                    'Contanos tu idea',
                  ]
                : [
                    'El contexto del evento',
                    'Los productos de tu selección',
                    'Las opciones por consultar',
                  ]
              ).map((title, index) => (
                <article className="editorial-topic" key={title}>
                  <span className="editorial-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>
                    {kind === 'about'
                      ? [
                          'Recorré las cinco categorías del catálogo.',
                          'Reuní productos y servicios en tu pedido.',
                          'Prepará una consulta personalizada por WhatsApp.',
                        ][index]
                      : [
                          'Compartí el tipo de celebración y su contexto.',
                          'Consultá por los productos que elegiste.',
                          'Definí los detalles con LCDD antes de confirmar.',
                        ][index]}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}
      <Section className="editorial-contact">
        <Container className="editorial-contact-grid">
          <div>
            <p className="eyebrow">Sigamos conversando</p>
            <h2>¿Tenés una idea en mente?</h2>
            <p>Contanos qué estás buscando para tu evento.</p>
          </div>
          <div className="editorial-actions">
            {contact && (
              <a
                className="button button--primary"
                href={contact}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" /> Consultanos por WhatsApp
              </a>
            )}
            <a
              className="button button--outline"
              href={siteConfig.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="instagram" /> {siteConfig.contact.instagram.handle}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
          </div>
        </Container>
      </Section>
    </div>
  )
}

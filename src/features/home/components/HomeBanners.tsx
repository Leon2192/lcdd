import { Link } from 'react-router'
import { CommercialSlider } from '@/features/home/components/CommercialSlider'
import { visualAssets } from '@/config/media'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'

export function HomeBanners() {
  const combosUrl = getValidatedWhatsAppUrl(
    '¡Hola! Me gustaría recibir información sobre los combos para eventos.',
  )
  const detailsTitle = 'Los detalles hacen la diferencia'
  const combosTitle = 'Combos para tu evento'
  return (
    <CommercialSlider
      label="Banners comerciales"
      slides={[
        {
          id: 'details',
          title: detailsTitle,
          content: (
            <div className="home-banner home-banner--details">
              <img
                src={visualAssets.banners.details.src}
                alt={visualAssets.banners.details.alt}
                width={visualAssets.banners.details.width}
                height={visualAssets.banners.details.height}
                fetchPriority="high"
                decoding="async"
              />
              <div className="home-banner-copy">
                <h2>{detailsTitle}</h2>
                <p>Detalles personalizados para momentos inolvidables.</p>
                <Link to="/catalogo" className="button button--primary">
                  Explorá el catálogo
                </Link>
              </div>
            </div>
          ),
        },
        {
          id: 'combos',
          title: combosTitle,
          content: (
            <div className="home-banner home-banner--combos">
              <img
                src={visualAssets.banners.combos.src}
                alt={visualAssets.banners.combos.alt}
                width={visualAssets.banners.combos.width}
                height={visualAssets.banners.combos.height}
                fetchPriority="low"
                decoding="async"
              />
              <div className="home-banner-copy">
                <h2>{combosTitle}</h2>
                <p>Combiná tus detalles favoritos y armá algo único.</p>
                {combosUrl && (
                  <a
                    className="button button--primary"
                    href={combosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultanos por nuestros combos
                  </a>
                )}
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}

import { Link } from 'react-router'
import type { CatalogImage } from '@/data/catalog/types'
import { Icon } from '@/components/ui/Icon'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
type CategoryCardProps = {
  name: string
  to: string
  image?: Pick<CatalogImage, 'src' | 'alt'> &
    Partial<Pick<CatalogImage, 'width' | 'height' | 'fit' | 'objectPosition'>>
}
export function CategoryCard({ name, to, image }: CategoryCardProps) {
  return (
    <article className="category-card">
      <Link to={to} className="card-link">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            width={image.width ?? 480}
            height={image.height ?? 360}
            data-fit={image.fit}
            style={
              image.objectPosition
                ? { objectPosition: image.objectPosition }
                : undefined
            }
          />
        ) : (
          <MediaPlaceholder />
        )}
        <div className="card-copy">
          <h3>{name}</h3>
          <span className="card-arrow">
            <Icon name="arrow" />
          </span>
        </div>
      </Link>
    </article>
  )
}

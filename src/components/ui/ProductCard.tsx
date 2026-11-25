import { IllustrativeNotice } from '@/components/ui/IllustrativeNotice'
import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
type ProductCardProps = {
  name: string
  to: string
  image?: { src: string; alt: string }
  note?: string
}
export function ProductCard({ name, to, image, note }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link to={to} className="card-link">
        {image ? (
          <>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              width="480"
              height="600"
            />
            <IllustrativeNotice src={image.src} />
          </>
        ) : (
          <MediaPlaceholder />
        )}
        <div className="card-copy">
          <h3>{name}</h3>
          <span className="card-arrow">
            <Icon name="arrow" />
          </span>
          {note && <p className="text-muted">{note}</p>}
        </div>
      </Link>
    </article>
  )
}

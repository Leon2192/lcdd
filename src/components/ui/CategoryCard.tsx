import { IllustrativeNotice } from '@/components/ui/IllustrativeNotice'
import { Link } from 'react-router'
import { Icon } from '@/components/ui/Icon'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
type CategoryCardProps = {
  name: string
  to: string
  image?: { src: string; alt: string }
}
export function CategoryCard({ name, to, image }: CategoryCardProps) {
  return (
    <article className="category-card">
      <Link to={to} className="card-link">
        {image ? (
          <>
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              width="480"
              height="360"
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
        </div>
      </Link>
    </article>
  )
}

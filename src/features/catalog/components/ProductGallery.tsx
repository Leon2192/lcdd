import { IllustrativeNotice } from '@/components/ui/IllustrativeNotice'
import { useState } from 'react'
import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import type { CatalogImage } from '@/data/catalog/types'
export function ProductGallery({
  images,
  name,
}: {
  images: readonly CatalogImage[]
  name: string
}) {
  const [index, setIndex] = useState(0)
  const image = images[index]
  return (
    <section className="catalog-gallery" aria-label={`Galería de ${name}`}>
      {image ? (
        <div className="catalog-gallery-image">
          <img
            className="catalog-main-image"
            decoding="async"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          <IllustrativeNotice src={image.src} />
        </div>
      ) : (
        <MediaPlaceholder />
      )}
      {images.length > 1 && (
        <div
          className="catalog-thumbnails"
          role="group"
          aria-label="Elegir fotografía"
        >
          {images.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Ver fotografía ${i + 1} de ${name}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img
                src={item.src}
                alt=""
                width="72"
                height="90"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

import { IllustrativeNotice } from '@/components/ui/IllustrativeNotice'
import { visualAssets } from '@/config/media'
import type { HomeMediaSlot } from '@/config/media'
import { cn } from '@/lib/cn'
type HomeMediaProps = {
  label: string
  slot?: HomeMediaSlot
  className?: string
  image?: { src: string; alt: string; width: number; height: number }
  priority?: boolean
}
// El componente admite el recurso aprobado futuro sin alterar el layout ni recurrir a mockups.
export function HomeMedia({
  label,
  className,
  image: providedImage,
  slot,
  priority = false,
}: HomeMediaProps) {
  const image = providedImage ?? (slot ? visualAssets.home[slot] : undefined)
  return (
    <div className={cn('home-media', className)}>
      {image ? (
        <>
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
          />
          <IllustrativeNotice src={image.src} />
        </>
      ) : (
        <div className="home-media-placeholder">
          <span aria-hidden="true">✧</span>
          <p>{label}</p>
          <small>Fotografía pendiente de validación</small>
        </div>
      )}
    </div>
  )
}

import { MediaPlaceholder } from '@/components/ui/MediaPlaceholder'
import { visualAssets } from '@/config/media'
import type { HomeMediaSlot } from '@/config/media'
import { cn } from '@/lib/cn'
type HomeMediaProps = {
  slot?: HomeMediaSlot
  className?: string
  image?: { src: string; alt: string; width: number; height: number }
  priority?: boolean
}
// El componente admite el recurso aprobado futuro sin alterar el layout ni recurrir a mockups.
export function HomeMedia({
  className,
  image: providedImage,
  slot,
  priority = false,
}: HomeMediaProps) {
  const image = providedImage ?? (slot ? visualAssets.home[slot] : undefined)
  return (
    <div className={cn('home-media', className)}>
      {image ? (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
      ) : (
        <MediaPlaceholder />
      )}
    </div>
  )
}

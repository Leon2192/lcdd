import { isDisplayImage } from '@/config/image-attribution'
import { visualAssets } from '@/config/media'
import { Link } from 'react-router'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
// Denominación institucional temporal. El original recibido se preserva, no se reconstruye.
export function Brand({ className }: { className?: string }) {
  const logo = visualAssets.logo
  return (
    <Link
      to="/"
      className={cn('brand', className)}
      aria-label={`${siteConfig.name}, inicio`}
    >
      {isDisplayImage(logo) ? (
        <img
          className="brand-image"
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          decoding="async"
        />
      ) : (
        <span className="brand-name">{siteConfig.name}</span>
      )}
    </Link>
  )
}

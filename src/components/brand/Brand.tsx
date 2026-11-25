import { visualAssets } from '@/config/media'
import { Link } from 'react-router'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
// Denominación institucional temporal. El original recibido se preserva, no se reconstruye.
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('brand', className)}
      aria-label={`${siteConfig.name}, inicio`}
    >
      {visualAssets.logo ? (
        <img
          className="brand-image"
          src={visualAssets.logo.src}
          alt={visualAssets.logo.alt}
          width={visualAssets.logo.width}
          height={visualAssets.logo.height}
          decoding="async"
        />
      ) : (
        <span className="brand-name">{siteConfig.name}</span>
      )}
    </Link>
  )
}

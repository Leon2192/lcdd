import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { siteConfig } from '@/config/site'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'

export function FloatingWhatsApp() {
  const url = getValidatedWhatsAppUrl(
    siteConfig.contact.whatsapp.defaultMessage,
  )
  if (!url) return null

  return (
    <a
      className="floating-whatsapp"
      href={url}
      aria-label="Consultanos por WhatsApp (abre una pestaña nueva)"
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
    </a>
  )
}

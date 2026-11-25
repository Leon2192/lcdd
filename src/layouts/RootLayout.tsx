import { RouteMetadata } from '@/routes/RouteMetadata'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'
import { Icon } from '@/components/ui/Icon'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { OrderToast, useOrder } from '@/features/order'
import { QuotationSession } from '@/features/quotation'
import { useState } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Modal } from '@/components/ui/Modal'
import type { LayoutContext } from '@/layouts/layout-context'
import { siteConfig } from '@/config/site'
export function RootLayout() {
  const [contactOpen, setContactOpen] = useState(false)
  const orderCount = useOrder((state) => state.lines.length)
  const whatsappUrl = getValidatedWhatsAppUrl()
  const context: LayoutContext = { openContact: () => setContactOpen(true) }
  return (
    <QuotationSession>
      <div className="site-layout">
        <RouteMetadata />
        <ScrollRestoration />
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header
          orderCount={orderCount}
          onContact={() => setContactOpen(true)}
        />
        <main id="contenido" tabIndex={-1} className="site-main">
          <Outlet context={context} />
        </main>
        <Footer onContact={() => setContactOpen(true)} />
        <div className="site-floating-actions">
          <OrderToast />
          <FloatingWhatsApp />
        </div>
        <Modal
          open={contactOpen}
          onOpenChange={setContactOpen}
          title="Consultas por WhatsApp"
        >
          <p>WhatsApp: {siteConfig.contact.whatsapp.displayNumber}</p>
          {whatsappUrl && (
            <a
              className="button button--primary"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Conversar por WhatsApp
            </a>
          )}
          <p>
            La conversación se abre al elegir el enlace. Vos decidís enviar el
            mensaje.
          </p>
        </Modal>
      </div>
    </QuotationSession>
  )
}

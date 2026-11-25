import { useEffect, useRef } from 'react'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { PageMetadata } from '@/components/PageMetadata'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
export function RouteErrorPage() {
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [])
  return (
    <main className="container-lcdd catalog-page">
      <PageMetadata
        metadata={{
          title: `Problema al cargar | ${siteConfig.name}`,
          description:
            'No pudimos mostrar esta página. Podés volver al catálogo o intentar cargarla nuevamente.',
          kind: 'error',
        }}
      />
      <h1 ref={heading} tabIndex={-1}>
        No pudimos mostrar esta página
      </h1>
      <p>Volvé a cargar o regresá al catálogo para continuar.</p>
      <div className="order-actions">
        <Button onClick={() => window.location.reload()}>
          Volver a cargar
        </Button>
        <a className="button button--outline" href="/catalogo">
          Volver al catálogo
        </a>
      </div>
      <div className="site-floating-actions">
        <FloatingWhatsApp />
      </div>
    </main>
  )
}

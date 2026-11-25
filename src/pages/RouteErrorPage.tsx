import { Link, useRouteError } from 'react-router'
import { claimAssetRetry, RouteAssetError } from '@/routes/route-assets'
import { useEffect, useRef } from 'react'
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp'
import { PageMetadata } from '@/components/PageMetadata'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
export function RouteErrorPage() {
  const retryAsset = useRouteError() instanceof RouteAssetError
  const heading = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    heading.current?.focus({ preventScroll: true })
  }, [])
  useEffect(() => {
    if (retryAsset && navigator.onLine && claimAssetRetry())
      window.location.reload()
  }, [retryAsset])
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
      <p>
        {retryAsset
          ? 'No se pudo cargar esta sección. Volvé a cargar para actualizar la página.'
          : 'Volvé a cargar o regresá al catálogo para continuar.'}
      </p>
      <div className="order-actions">
        <Button onClick={() => window.location.reload()}>
          Volver a cargar
        </Button>
        <Link className="button button--outline" to="/catalogo">
          Volver al catálogo
        </Link>
      </div>
      <div className="site-floating-actions">
        <FloatingWhatsApp />
      </div>
    </main>
  )
}

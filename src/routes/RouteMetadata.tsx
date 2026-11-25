import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { getPageMetadata } from '@/config/seo'
import { PageMetadata } from '@/components/PageMetadata'
export function RouteMetadata() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    if (navigationType === 'POP') return
    const frame = requestAnimationFrame(() => {
      const main = document.querySelector('main')
      const heading = main?.querySelector<HTMLElement>('h1')
      if (!heading) return
      const isProduct = heading.hasAttribute('data-product-focus')
      if (!isProduct && main?.contains(document.activeElement)) return
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
      // En la ficha, ScrollRestoration deja visible el encabezado de la página.
      if (!isProduct)
        heading.scrollIntoView?.({ block: 'start', behavior: 'auto' })
    })
    return () => cancelAnimationFrame(frame)
  }, [navigationType, pathname])
  return <PageMetadata metadata={getPageMetadata(pathname)} />
}

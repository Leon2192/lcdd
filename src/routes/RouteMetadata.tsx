import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { getPageMetadata } from '@/config/seo'
import { PageMetadata } from '@/components/PageMetadata'
export function RouteMetadata() {
  const { pathname } = useLocation()
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current === pathname) return
    previous.current = pathname
    const frame = requestAnimationFrame(() => {
      const main = document.querySelector('main')
      // La navegación no debe interrumpir a quien ya empezó a usar el formulario.
      if (document.activeElement && main?.contains(document.activeElement))
        return
      const heading = main?.querySelector<HTMLElement>('h1')
      if (!heading) return
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
      heading.scrollIntoView?.({ block: 'start', behavior: 'auto' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname])
  return <PageMetadata metadata={getPageMetadata(pathname)} />
}

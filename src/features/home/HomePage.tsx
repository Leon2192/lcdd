import { useSyncExternalStore } from 'react'
import { useOutletContext } from 'react-router'
import { siteConfig } from '@/config/site'
import { CommercialStrip } from '@/features/home/components/CommercialStrip'
import { HomeBanners } from '@/features/home/components/HomeBanners'
import type { LayoutContext } from '@/layouts/layout-context'
import { Hero } from '@/features/home/components/Hero'
import { ValueProposition } from '@/features/home/components/ValueProposition'
import { HomeCategories } from '@/features/home/components/HomeCategories'
import { FeaturedProducts } from '@/features/home/components/FeaturedProducts'
import { Inspiration } from '@/features/home/components/Inspiration'
import { AboutAndProfessionals } from '@/features/home/components/AboutAndProfessionals'
import { HowItWorks } from '@/features/home/components/HowItWorks'
import { EventTypes } from '@/features/home/components/EventTypes'
import { HomeConversion } from '@/features/home/components/HomeConversion'
import { HomeContact } from '@/features/home/components/HomeContact'
// Coincide con el inicio del diseño editorial en home.css.
const editorialViewport = '(min-width: 48rem)'
function subscribeToViewport(onChange: () => void) {
  const media = window.matchMedia?.(editorialViewport)
  media?.addEventListener('change', onChange)
  return () => media?.removeEventListener('change', onChange)
}
function isEditorialViewport() {
  return window.matchMedia?.(editorialViewport).matches ?? false
}

export function HomePage() {
  const { openContact } = useOutletContext<LayoutContext>()
  const editorial = useSyncExternalStore(
    subscribeToViewport,
    isEditorialViewport,
    () => false,
  )
  return (
    <div className="home">
      {editorial ? (
        <>
          <Hero priority />
          <ValueProposition />
        </>
      ) : (
        <>
          <h1 className="sr-only">{siteConfig.name}</h1>
          <CommercialStrip />
          <HomeBanners />
        </>
      )}
      <HomeCategories />
      {editorial && (
        <>
          <FeaturedProducts />
          <Inspiration />
        </>
      )}
      <AboutAndProfessionals />
      {editorial ? <HowItWorks /> : <EventTypes />}
      <HomeConversion />
      {editorial && <HomeContact onContact={openContact} />}
    </div>
  )
}

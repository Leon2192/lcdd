import { useOutletContext } from 'react-router'
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
export function HomePage() {
  const { openContact } = useOutletContext<LayoutContext>()
  return (
    <div className="home">
      <Hero />
      <ValueProposition />
      <HomeCategories />
      <FeaturedProducts />
      <Inspiration />
      <AboutAndProfessionals />
      <HowItWorks />
      <EventTypes />
      <HomeConversion />
      <HomeContact onContact={openContact} />
    </div>
  )
}

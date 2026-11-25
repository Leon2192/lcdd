import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { visualAssets } from './media'
import type { LocalImage } from './media'
import { HomeMedia } from '@/features/home/components/HomeMedia'
import { HomeCategories } from '@/features/home/components/HomeCategories'
import { catalog, getProductMedia } from '@/data/catalog/catalog'
import { Brand } from '@/components/brand/Brand'
const initial = { ...visualAssets }
const fixture: LocalImage = {
  src: '/media/test-only.webp',
  alt: 'Recurso de prueba',
  width: 1200,
  height: 900,
}
beforeEach(() => {
  visualAssets.logo = null
  visualAssets.home = {}
  visualAssets.categories = {}
  visualAssets.products = {}
  visualAssets.collections = {}
})
afterEach(() => {
  visualAssets.logo = initial.logo
  visualAssets.home = initial.home
  visualAssets.products = initial.products
  visualAssets.collections = initial.collections
  visualAssets.categories = initial.categories
})
describe('Integración local de recursos aprobados', () => {
  it('mantiene placeholders mientras no existan fotografías', () => {
    render(<HomeMedia slot="hero" label="Hero pendiente" />)
    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.getByText('Hero pendiente')).toBeVisible()
  })
  it('incorpora Hero por registro sin reconstruir componente ni cargarlo diferido', () => {
    visualAssets.home = { hero: fixture }
    render(<HomeMedia slot="hero" label="Hero" priority />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', fixture.src)
    expect(image).toHaveAttribute('width', '1200')
    expect(image).toHaveAttribute('height', '900')
    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
  it('conecta categorías y logo a registros locales', () => {
    visualAssets.logo = fixture
    visualAssets.categories = { 'kits-para-eventos': fixture }
    render(
      <MemoryRouter>
        <Brand />
        <HomeCategories />
      </MemoryRouter>,
    )
    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(
      screen.getByRole('link', { name: 'La Casa del Detalle, inicio' }),
    ).toBeVisible()
  })
})

it('integra galerías aprobadas sin alterar el estado comercial de Productos', () => {
  const product = catalog.products.find((item) => item.id === 'P-003')
  if (!product) throw new Error('Falta P-003')
  const original = JSON.stringify(product)
  expect(getProductMedia(product)).toEqual([])
  visualAssets.products = {
    'P-003': [
      fixture,
      { ...fixture, src: '/media/detail-test.webp', alt: 'Detalle de prueba' },
    ],
  }
  expect(getProductMedia(product)).toHaveLength(2)
  expect(getProductMedia(product)[0]).toEqual(fixture)
  expect(JSON.stringify(product)).toBe(original)
  expect(product.publicationReady).toBe(false)
})

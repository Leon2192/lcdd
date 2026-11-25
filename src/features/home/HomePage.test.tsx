import { getProductPath } from '@/data/catalog/catalog'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import { routes } from '@/routes/routes'
import { productIdentities } from '@/features/home/catalog-identities'
import {
  featuredProducts,
  featuredSelection,
} from '@/features/home/home-content'
import { Carousel } from '@/components/ui/Carousel'
import officialCatalog from '../../../docs/handoff/productos/PY01_catalogo_publico_v1.0.json'

function renderHome() {
  const router = createMemoryRouter(routes, { initialEntries: ['/'] })
  render(<RouterProvider router={router} />)
  return router
}

describe('Home LCDD', () => {
  it('presenta un único H1 y todas las secciones en el orden editorial', () => {
    renderHome()
    const main = screen.getByRole('main')
    expect(within(main).getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hacé de tu evento un momento único',
    )
    expect(
      within(main)
        .getAllByRole('heading', { level: 2 })
        .map((node) => node.textContent),
    ).toEqual([
      'Encontrá el detalle ideal para tu evento',
      'Productos destacados',
      'Ideas y combinaciones para tu evento',
      'La Casa del Detalle',
      '¿Organizás eventos? Trabajemos juntos',
      '¿Cómo armar tu pedido?',
      'Eventos para cada momento',
      'Hagamos algo especial',
      '¿Tenés dudas o una idea especial?',
    ])
    expect(
      screen.queryByText(
        /vista previa|pendientes de validación|selección de demostración/i,
      ),
    ).not.toBeInTheDocument()
  })
  it('mantiene el marcador agrupado para que icono y número no desplacen el texto a otra celda', () => {
    renderHome()
    const list = screen.getByRole('list', {
      name: 'Pasos para armar tu pedido',
    })
    for (const item of within(list).getAllByRole('listitem')) {
      expect(item.children).toHaveLength(2)
      const marker = item.children[0]
      const text = item.children[1]
      expect(marker).toHaveAttribute('aria-hidden', 'true')
      expect(marker?.querySelector('svg')).not.toBeNull()
      expect(text?.tagName).toBe('P')
      expect(text?.textContent?.trim().length).toBeGreaterThan(0)
    }
  })
  it('utiliza el glyph legítimo de WhatsApp como decoración de controles con nombre accesible', () => {
    renderHome()
    for (const name of [
      'Consultar WhatsApp',
      'Contactanos por WhatsApp',
      'WhatsApp: 1135939460',
    ]) {
      const button = screen.getByRole('button', { name })
      const svg = button.querySelector('svg')
      expect(svg).toHaveAttribute('data-icon', 'whatsapp')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
      expect(svg).toHaveAttribute('focusable', 'false')
    }
  })
  it('mantiene las cinco categorías oficiales y permite navegar a cada una', () => {
    renderHome()
    const section = screen.getByRole('region', {
      name: 'Encontrá el detalle ideal para tu evento',
    })
    const links = within(section).getAllByRole('link')
    expect(links).toHaveLength(5)
    for (const category of officialCatalog.categories) {
      expect(
        within(section).getByRole('link', { name: new RegExp(category.name) }),
      ).toHaveAttribute('href', `/catalogo/categoria/${category.id}`)
    }
  })
  it('deriva identidades y destacados exclusivamente del catálogo oficial, sin cambiarlo', () => {
    expect(productIdentities).toEqual(
      officialCatalog.products.map(({ id, name, categoryId }) => ({
        id,
        name,
        categoryId,
      })),
    )
    expect(officialCatalog.featuredProducts.ids).toBeNull()
    expect(featuredSelection.status).toBe('demonstration')
    expect(featuredProducts.map((product) => product.id)).toEqual([
      'P-003',
      'P-004',
      'P-002',
      'P-005',
      'P-009',
    ])
    expect(featuredProducts).not.toHaveLength(0)
  })
  it('muestra los destacados y enlaza sus fichas sin agregar al pedido', () => {
    renderHome()
    expect(
      screen.queryByText(/selección de demostración|pendiente de aprobación/i),
    ).not.toBeInTheDocument()
    const carousel = screen.getByRole('region', {
      name: 'Productos destacados',
    })
    expect(within(carousel).getAllByRole('link')).toHaveLength(5)
    for (const product of featuredProducts)
      expect(
        within(carousel).getByRole('link', { name: new RegExp(product.name) }),
      ).toHaveAttribute('href', getProductPath(product))
    expect(
      within(carousel).queryByRole('button', { name: /Agregar/ }),
    ).not.toBeInTheDocument()
  })
  it('conserva las imágenes y presenta un placeholder discreto para recursos faltantes', () => {
    renderHome()
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0)
    expect(
      screen.queryByText(/ilustración IA|no es foto real/i),
    ).not.toBeInTheDocument()
    expect(
      screen.getAllByRole('img', { name: 'Home principal' })[0],
    ).toHaveAttribute('src', '/media/home/hero-v01.webp')
    expect(screen.getAllByText('Sin imagen').length).toBeGreaterThan(0)
    expect(document.querySelector('img[src*="lcdd-original"]')).toBeNull()
    expect(document.querySelector('[style*="Mockup"]')).toBeNull()
  })
  it('lleva desde la acción principal al catálogo con el catálogo de Fase 04', async () => {
    const user = userEvent.setup()
    const router = renderHome()
    await user.click(
      screen.getByRole('link', { name: 'Explorá nuestros productos' }),
    )
    expect(router.state.location.pathname).toBe('/catalogo')
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Todos nuestros productos',
      }),
    ).toBeVisible()
    expect(
      screen.getByRole('checkbox', { name: 'Kits para eventos' }),
    ).toBeVisible()
  })
  it('permite acceder a inspiración y profesionales mediante destinos existentes', () => {
    renderHome()
    expect(
      screen.getByRole('link', { name: 'Ver inspiración' }),
    ).toHaveAttribute('href', '/inspiracion')
    expect(
      screen.getByRole('link', { name: 'Más info para profesionales' }),
    ).toHaveAttribute('href', '/profesionales')
  })
  it('abre y cierra el contacto compartido con acceso internacional autorizado', async () => {
    const user = userEvent.setup()
    renderHome()
    const trigger = screen.getByRole('button', {
      name: 'Contactanos por WhatsApp',
    })
    await user.click(trigger)
    const dialog = screen.getByRole('dialog', {
      name: 'Consultas por WhatsApp',
    })
    expect(within(dialog).getByText('WhatsApp: 1135939460')).toBeVisible()
    expect(
      within(dialog).getByRole('link', { name: 'Conversar por WhatsApp' }),
    ).toHaveAttribute('href', 'https://wa.me/5491135939460')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
  it('presenta una guía informativa sin estados enviados ni cantidades comerciales', () => {
    renderHome()
    const guide = screen.getByRole('region', { name: '¿Cómo armar tu pedido?' })
    expect(within(guide).getAllByRole('listitem')).toHaveLength(4)
    expect(screen.queryByText(/solicitud enviada/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
    expect(
      screen.queryByText(/garantía|descuento|checkout/i),
    ).not.toBeInTheDocument()
  })
})

describe('Carrusel horizontal responsive', () => {
  it('navega sin arrastrar, mide extremos y anuncia desplazamiento', async () => {
    const user = userEvent.setup()
    render(
      <Carousel
        label="Productos de prueba"
        layout="rail"
        items={[
          { id: 'a', content: 'Uno' },
          { id: 'b', content: 'Dos' },
          { id: 'c', content: 'Tres' },
        ]}
      />,
    )
    const region = screen.getByRole('region', { name: 'Productos de prueba' })
    const first = within(region).getByRole('group', { name: '1 de 3' })
    const track = first.parentElement
    if (!(track instanceof HTMLElement))
      throw new Error('No se encontró la pista')
    Object.defineProperty(track, 'clientWidth', {
      configurable: true,
      value: 200,
    })
    Object.defineProperty(track, 'scrollWidth', {
      configurable: true,
      value: 600,
    })
    vi.spyOn(first, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      x: 0,
      y: 0,
      top: 0,
      right: 200,
      bottom: 100,
      left: 0,
      toJSON: () => ({}),
    })
    track.scrollTo = vi.fn((options?: ScrollToOptions | number) => {
      track.scrollLeft =
        typeof options === 'number' ? options : (options?.left ?? 0)
      fireEvent.scroll(track)
    })
    fireEvent.scroll(track)
    const next = within(region).getByRole('button', {
      name: 'Siguiente en Productos de prueba',
    })
    await user.click(next)
    expect(track.scrollLeft).toBe(200)
    expect(within(region).getByText('2 / 3')).toHaveAttribute(
      'aria-live',
      'polite',
    )
    track.focus()
    await user.keyboard('{ArrowRight}')
    expect(track.scrollLeft).toBe(400)
    expect(next).toBeDisabled()
    expect(
      within(region).getByRole('button', {
        name: 'Anterior en Productos de prueba',
      }),
    ).not.toBeDisabled()
  })
})

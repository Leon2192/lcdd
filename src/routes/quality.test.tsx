import { act, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { routes } from './routes'
import { catalog, getProductPath } from '@/data/catalog/catalog'
import { getPageMetadata, localRobots } from '@/config/seo'
import { siteConfig } from '@/config/site'
import { orderStore } from '@/features/order/store'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
const cases = [
  { path: '/', label: 'Detalles personalizados para eventos' },
  { path: '/catalogo', label: 'Catálogo' },
  { path: '/arma-tu-pedido', label: 'Armá tu pedido' },
  { path: '/cotizacion', label: 'Tu evento y solicitud de cotización' },
  ...catalog.categories.map((category) => ({
    path: `/catalogo/categoria/${category.id}`,
    label: category.name,
  })),
  ...catalog.products.map((product) => ({
    path: getProductPath(product),
    label: product.name,
  })),
]
function visit(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}
beforeEach(() => {
  orderStore.getState().clear()
  localStorage.clear()
})
afterEach(() => vi.restoreAllMocks())
describe('Rutas, metadatos y enlaces', () => {
  it('normaliza la barra final sin alterar las rutas legibles', () => {
    expect(getPageMetadata('/catalogo/')).toEqual(getPageMetadata('/catalogo'))
    expect(getPageMetadata('/inspiracion/').kind).toBe('page')
    const product = catalog.products[0]
    if (!product) throw new Error('Sin producto')
    expect(getPageMetadata(getProductPath(product) + '/')).toEqual(
      getPageMetadata(getProductPath(product)),
    )
  })

  it.each(cases)(
    'mantiene H1 único y metadata local en $path',
    async ({ path, label }) => {
      visit(path)
      await screen.findByRole('heading', { level: 1 })
      await waitFor(() =>
        expect(document.title).toBe(`${label} | ${siteConfig.name}`),
      )
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(
        document.head.querySelectorAll('meta[name="description"]'),
      ).toHaveLength(1)
      expect(
        document.head.querySelector('meta[name="robots"]'),
      ).toHaveAttribute('content', localRobots)
      expect(
        document.head.querySelector('meta[property="og:locale"]'),
      ).toHaveAttribute('content', 'es_AR')
      expect(
        document.head.querySelector('meta[property="og:title"]'),
      ).toHaveAttribute('content', document.title)
      expect(
        document.head.querySelector('meta[name="twitter:title"]'),
      ).toHaveAttribute('content', document.title)
      expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
      for (const link of screen.getAllByRole('link')) {
        const href = link.getAttribute('href')
        if (!href?.startsWith('/') || href.startsWith('//')) continue
        expect(
          getPageMetadata(new URL(href, 'http://localhost').pathname).kind,
        ).not.toBe('not-found')
      }
    },
  )
  it.each([
    ['/inspiracion', 'Inspiración'],
    ['/nosotros', 'Nosotros'],
    ['/profesionales', 'Profesionales'],
  ])(
    'identifica %s como página editorial con textos propuestos',
    async (path, label) => {
      visit(path)
      expect(
        await screen.findByRole('heading', { level: 1, name: label }),
      ).toBeVisible()
      expect(screen.getByText(/Contenido editorial propuesto/)).toBeVisible()
      expect(getPageMetadata(path).kind).toBe('page')
    },
  )
  it.each([
    '/no-existe',
    '/catalogo/producto/no-existe',
    '/catalogo/categoria/no-existe',
  ])('no presenta %s como página válida', async (path) => {
    visit(path)
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent(
      /no encontrad/,
    )
    expect(getPageMetadata(path).kind).toBe('not-found')
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      localRobots,
    )
  })
  it('actualiza título y foco al navegar y conserva foco durante búsqueda', async () => {
    const user = userEvent.setup()
    visit('/')
    await user.click(
      screen.getByRole('link', { name: 'Explorá nuestros productos' }),
    )
    const heading = await screen.findByRole('heading', {
      name: 'Todos nuestros productos',
      level: 1,
    })
    await waitFor(() => expect(heading).toHaveFocus())
    await user.click(
      screen.getAllByRole('link', { name: 'Ver categoría' })[1] ??
        screen.getAllByRole('link', { name: 'Ver categoría' })[0] ??
        heading,
    )
    const search = await screen.findByRole('searchbox')
    await user.type(search, 'abanicos')
    expect(search).toHaveFocus()
    expect(document.title).toContain('Souvenirs personalizados')
  })
  it('no roba foco cuando el usuario ya empezó a usar el formulario', async () => {
    const frames: FrameRequestCallback[] = []
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback)
      return frames.length
    })
    orderStore.getState().add('P-003', 20)
    const router = visit('/nosotros')
    await act(() => router.navigate('/cotizacion'))
    const name = await screen.findByRole('textbox', {
      name: 'Tu nombre (opcional)',
    })
    name.focus()
    act(() => {
      for (const callback of frames) callback(0)
    })
    expect(name).toHaveFocus()
  })
  it('muestra recuperación genérica sin revelar detalles internos', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    function Broken(): never {
      throw new Error('Dato interno privado que no debe mostrarse')
    }
    render(
      <RouterProvider
        router={createMemoryRouter([
          { path: '/', element: <Broken />, errorElement: <RouteErrorPage /> },
        ])}
      />,
    )
    expect(
      await screen.findByRole('heading', {
        name: 'No pudimos mostrar esta página',
      }),
    ).toBeVisible()
    expect(screen.queryByText(/Dato interno privado/)).toBeNull()
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' }),
    ).toHaveAttribute('href', '/catalogo')
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
      'content',
      localRobots,
    )
  })
  it('utiliza H2 en vacíos de página y H3 dentro de categoría', async () => {
    const router = visit('/arma-tu-pedido')
    expect(
      await screen.findByRole('heading', {
        name: 'Tu pedido está vacío',
        level: 2,
      }),
    ).toBeVisible()
    await act(() =>
      router.navigate('/catalogo/categoria/kits-para-eventos?q=inexistente'),
    )
    expect(
      screen.getByRole('heading', {
        name: 'No encontramos productos',
        level: 3,
      }),
    ).toBeVisible()
    expect(
      within(screen.getByRole('main')).getAllByRole('heading', { level: 1 }),
    ).toHaveLength(1)
  })
})

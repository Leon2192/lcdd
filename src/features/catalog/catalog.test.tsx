import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, it, expect, beforeEach } from 'vitest'
import { orderStore } from '@/features/order/store'
import { getOrderRule } from '@/features/order/rules'
beforeEach(() => {
  orderStore.getState().clear()
  localStorage.clear()
})
import original from '../../../docs/handoff/productos/PY01_catalogo_publico_v1.0.json'
import {
  catalog,
  getCategoryProducts,
  getProductPath,
  getRelatedProducts,
  getProductMedia,
} from '@/data/catalog/catalog'
import { routes } from '@/routes/routes'
import { ProductGallery } from './components/ProductGallery'
function visit(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}
describe('Integridad oficial', () => {
  it('preserva íntegros los datos y los estados sin aprobar publicación', () => {
    expect(catalog).toEqual(original)
    expect(catalog.products).toHaveLength(14)
    expect(catalog.categories).toHaveLength(5)
    expect(new Set(catalog.products.map((p) => p.id)).size).toBe(14)
    expect(catalog.publicationReady).toBe(false)
    expect(catalog.products.every((p) => !p.publicationReady)).toBe(true)
    expect('visibility' in catalog).toBe(false)
  })
  it('preserva referencias, colecciones y modalidades', () => {
    expect(
      catalog.categories.map((c) => getCategoryProducts(c.id).length),
    ).toEqual([2, 5, 3, 2, 2])
    for (const p of catalog.products) {
      expect(getRelatedProducts(p).map((r) => r.id)).toEqual(
        p.relatedProducts.ids,
      )
      expect(getProductMedia(p)).toHaveLength(
        ['P-007', 'P-008', 'P-014'].includes(p.id) ? 0 : 1,
      )
    }
    for (const c of catalog.collections)
      for (const id of c.productIds)
        expect(catalog.products.some((p) => p.id === id)).toBe(true)
    expect(
      catalog.products
        .filter((p) => p.selection.mode === 'service')
        .map((p) => p.id),
    ).toEqual(['P-013', 'P-014'])
    expect(
      catalog.products
        .filter((p) => p.selection.mode === 'tables_or_units')
        .map((p) => p.id),
    ).toEqual(['P-008', 'P-012'])
  })
})
describe('Catálogo y categorías', () => {
  it('filtra por categorías, conserva la URL y permite limpiar', async () => {
    const user = userEvent.setup()
    const router = visit('/catalogo')
    expect(screen.getAllByRole('article')).toHaveLength(14)
    await user.click(
      screen.getByRole('checkbox', { name: 'Kits para eventos' }),
    )
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(router.state.location.search).toContain('kits-para-eventos')
    await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }))
    expect(screen.getAllByRole('article')).toHaveLength(14)
  })
  it('presenta un estado vacío para filtros desconocidos', () => {
    visit('/catalogo?categoria=inexistente')
    expect(
      screen.getByText('No hay productos para estos filtros'),
    ).toBeVisible()
    expect(screen.queryByRole('article')).toBeNull()
  })
  it.each(catalog.categories)('resuelve la categoría $name', (category) => {
    visit(`/catalogo/categoria/${category.id}`)
    expect(
      screen.getByRole('heading', { level: 1, name: category.name }),
    ).toBeVisible()
    expect(screen.getAllByRole('article')).toHaveLength(
      getCategoryProducts(category.id).length,
    )
    const sidebar = within(screen.getByRole('main')).getByRole('navigation', {
      name: 'Categorías del catálogo',
    })
    expect(
      within(sidebar).getByRole('link', { name: category.name }),
    ).toBeVisible()
  })
  it('busca por nombre sin depender de tildes y recupera el estado vacío', async () => {
    const user = userEvent.setup()
    visit('/catalogo/categoria/souvenirs-personalizados')
    const search = screen.getByRole('searchbox')
    await user.type(search, 'abanicos')
    expect(screen.getAllByRole('article')).toHaveLength(1)
    await user.clear(search)
    await user.type(search, 'inexistente')
    expect(screen.getByText('No encontramos productos')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Limpiar búsqueda' }))
    expect(screen.getAllByRole('article')).toHaveLength(5)
  })
})
describe('Fichas oficiales', () => {
  it.each(catalog.products)(
    'muestra $id $name con sus relacionados y sin precios ni cantidades inventadas',
    (product) => {
      visit(getProductPath(product))
      expect(
        screen.getByRole('heading', { level: 1, name: product.name }),
      ).toBeVisible()
      const related = screen.getByRole('heading', {
        name: 'Productos relacionados',
      }).parentElement
      if (!related) throw new Error('Falta la sección relacionada')
      expect(within(related).getAllByRole('article')).toHaveLength(
        product.relatedProducts.ids.length,
      )
      expect(screen.getByRole('heading', { name: 'Descripción' })).toBeVisible()
      if (getOrderRule(product).kind === 'quantity')
        expect(screen.getByRole('spinbutton')).toHaveValue(null)
      else expect(screen.queryByRole('spinbutton')).toBeNull()
      expect(document.body.textContent).not.toMatch(
        /\$|ARS|comprar ahora|checkout|preliminar|pendiente de validación|\bP-\d{3}\b/i,
      )
      expect(
        screen.getByRole('navigation', { name: 'Ruta de navegación' }),
      ).toHaveTextContent(product.name)
    },
  )
  it('redirige enlaces antiguos por ID a la URL legible', async () => {
    const product = catalog.products[0]
    if (!product) throw new Error('Sin productos')
    const router = visit(`/catalogo/producto/${product.id}`)
    expect(
      await screen.findByRole('heading', { level: 1, name: product.name }),
    ).toBeVisible()
    expect(router.state.location.pathname).toBe(getProductPath(product))
  })
  it.each(['P-013', 'P-014'])(
    'mantiene %s como servicio digital sin selector físico',
    (id) => {
      const product = catalog.products.find((p) => p.id === id)
      if (!product) throw new Error('Sin producto')
      visit(getProductPath(product))
      expect(screen.getByText('Servicio digital')).toBeVisible()
      expect(screen.queryByRole('spinbutton')).toBeNull()
    },
  )
  it('ofrece consulta directa para Carpa QR y conserva su discrepancia en los datos', () => {
    visit('/catalogo/producto/p-011-carpa-qr')
    expect(
      screen.getByText('Consultanos por las opciones disponibles.'),
    ).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Consultar por este producto' }),
    ).toBeVisible()
    expect(
      screen.queryByRole('button', { name: 'Agregar a mi pedido' }),
    ).not.toBeInTheDocument()
    expect(
      catalog.pendingNotes.some((note) => note.productId === 'P-011'),
    ).toBe(true)
    expect(screen.queryByRole('spinbutton')).toBeNull()
  })
  it('agrega desde la ficha y permite revisar una selección real', async () => {
    const user = userEvent.setup()
    visit('/catalogo/producto/p-003-vasos-personalizados')
    await user.type(screen.getByRole('spinbutton'), '25')
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    expect(
      screen.getByText('Producto agregado al carrito', { selector: 'p' }),
    ).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Ver mi pedido' }))
    await screen.findByRole('heading', { level: 1, name: 'Armá tu pedido' })
    expect(screen.getByRole('heading', { name: 'Tu selección' })).toBeVisible()
    expect(screen.getByRole('spinbutton')).toHaveValue(25)
    expect(
      JSON.parse(localStorage.getItem('lcdd:order') ?? '{}').lines,
    ).toHaveLength(1)
  })
  it.each([
    '/catalogo/producto/desconocido',
    '/catalogo/categoria/desconocida',
  ])('recupera %s sin inventar fichas', (path) => {
    visit(path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /no encontrad/,
    )
    expect(
      screen.getByRole('link', { name: 'Volver al catálogo' }),
    ).toHaveAttribute('href', '/catalogo')
  })
  it('permite cambiar fotografías locales por teclado', async () => {
    const user = userEvent.setup()
    render(
      <ProductGallery
        name="Prueba"
        images={[
          {
            src: '/prueba-a.png',
            alt: 'Primera toma',
            width: 480,
            height: 600,
          },
          {
            src: '/prueba-b.png',
            alt: 'Segunda toma',
            width: 480,
            height: 600,
          },
        ]}
      />,
    )
    await user.tab()
    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByAltText('Segunda toma')).toBeVisible()
    expect(
      screen.getByRole('button', { name: 'Ver fotografía 2 de Prueba' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })
})

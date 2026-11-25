import { act, fireEvent, render, screen, within } from '@testing-library/react'
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
import operative from '../../../docs/catalog/PY01_catalogo_operativo_v1.2.json'
import {
  catalog,
  getCategoryProducts,
  getProduct,
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
  it('refleja los 16 productos operativos y conserva los estados de publicación', () => {
    expect(catalog).toEqual(operative)
    expect(original.products).toHaveLength(14)
    expect(catalog.products).toHaveLength(16)
    expect(catalog.categories).toHaveLength(5)
    expect(new Set(catalog.products.map((p) => p.id)).size).toBe(16)
    expect(catalog.publicationReady).toBe(false)
    expect(catalog.products.every((p) => !p.publicationReady)).toBe(true)
    expect('visibility' in catalog).toBe(false)
  })
  it('preserva datos comerciales previos y separa los formatos en Kits', () => {
    expect(
      getCategoryProducts('kits-para-eventos').map(({ id, name }) => [
        id,
        name,
      ]),
    ).toEqual([
      ['P-002', 'Kits de baño'],
      ['P-001', 'Kit antiresaca Bolsa'],
      ['P-015', 'Kit antiresaca Pillow'],
      ['P-016', 'Kit antiresaca Craft'],
    ])
    for (const product of original.products.filter(
      ({ id }) => id !== 'P-001',
    )) {
      expect(getProduct(product.id)).toEqual(product)
    }
  })
  it('preserva referencias, colecciones y modalidades', () => {
    expect(
      catalog.categories.map((c) => getCategoryProducts(c.id).length),
    ).toEqual([4, 5, 3, 2, 2])
    for (const p of catalog.products) {
      expect(getRelatedProducts(p).map((r) => r.id)).toEqual(
        p.relatedProducts.ids,
      )
      expect(getProductMedia(p)).toHaveLength(1)
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
    expect(screen.getAllByRole('article')).toHaveLength(16)
    await user.click(screen.getByRole('checkbox', { name: 'Kits' }))
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(router.state.location.search).toContain('kits-para-eventos')
    await user.click(screen.getByRole('button', { name: 'Limpiar filtros' }))
    expect(screen.getAllByRole('article')).toHaveLength(16)
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
      const gallery = within(
        screen.getByRole('region', { name: `Galería de ${product.name}` }),
      )
      const media = getProductMedia(product)[0]
      if (!media) throw new Error('Falta la imagen principal')
      expect(gallery.getByRole('img', { name: media.alt })).toHaveAttribute(
        'src',
        media.src,
      )
      if (media.origin === 'lcdd-supplied')
        expect(
          gallery.queryByText('Imagen ilustrativa'),
        ).not.toBeInTheDocument()

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
  it('lleva el enlace del kit antiresaca genérico a la categoría para elegir formato', async () => {
    const router = visit('/catalogo/producto/p-001-kits-antiresaca')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Kits' }),
    ).toBeVisible()
    expect(router.state.location.pathname).toBe(
      '/catalogo/categoria/kits-para-eventos',
    )
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

it('cotiza los tres formatos por separado y permite modificar y quitar una línea', async () => {
  const kits = getCategoryProducts('kits-para-eventos').filter(
    ({ id }) => id !== 'P-002',
  )
  const first = kits[0]
  if (!first) throw new Error('Faltan formatos de kits')
  const router = visit(getProductPath(first))

  for (const [index, kit] of kits.entries()) {
    await act(() => router.navigate(getProductPath(kit)))
    expect(
      screen.getByRole('heading', { name: kit.name, level: 1 }),
    ).toBeVisible()
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: String(index + 2) },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Agregar a mi pedido' }))
  }
  expect(
    screen.getByRole('link', {
      name: 'Armá tu pedido, 3 productos seleccionados',
    }),
  ).toBeVisible()
  expect(JSON.parse(localStorage.getItem('lcdd:order') ?? '{}').lines).toEqual([
    { productId: 'P-001', kind: 'quantity', quantity: 2 },
    { productId: 'P-015', kind: 'quantity', quantity: 3 },
    { productId: 'P-016', kind: 'quantity', quantity: 4 },
  ])
  await act(() => router.navigate('/arma-tu-pedido'))
  fireEvent.click(
    screen.getByRole('button', {
      name: 'Aumentar cantidad para kit antiresaca pillow',
    }),
  )
  expect(
    screen.getByRole('spinbutton', {
      name: 'Cantidad para Kit antiresaca Pillow',
    }),
  ).toHaveValue(4)
  for (const kit of kits) {
    const media = getProductMedia(kit)[0]
    if (!media) throw new Error('Falta la imagen de un kit')
    const selection = screen.getByRole('region', { name: 'Tu selección' })
    expect(
      within(selection).getByRole('img', { name: media.alt }),
    ).toHaveAttribute('src', media.src)
  }

  await act(() => router.navigate('/cotizacion'))
  fireEvent.click(
    screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
  )
  const link = await screen.findByRole('link', {
    name: 'Enviar solicitud por WhatsApp',
  })
  const message = new URL(link.getAttribute('href') ?? '').searchParams.get(
    'text',
  )
  expect(message).toContain('Kit antiresaca Bolsa — Cantidad de kits: 2')
  expect(message).toContain('Kit antiresaca Pillow — Cantidad de kits: 4')
  expect(message).toContain('Kit antiresaca Craft — Cantidad de kits: 4')

  await act(() => router.navigate('/arma-tu-pedido'))
  fireEvent.click(
    screen.getByRole('button', { name: 'Quitar Kit antiresaca Craft' }),
  )
  expect(
    screen.queryByRole('button', { name: 'Quitar Kit antiresaca Craft' }),
  ).not.toBeInTheDocument()
  expect(
    screen.getByRole('link', {
      name: 'Armá tu pedido, 2 productos seleccionados',
    }),
  ).toBeVisible()
}, 15_000)

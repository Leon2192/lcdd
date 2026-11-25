import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '@/routes/routes'
import { orderStore } from './store'
import { ORDER_STORAGE_KEY } from './persistence'
function visit(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}
beforeEach(() => {
  orderStore.getState().clear()
  localStorage.clear()
  vi.restoreAllMocks()
})
describe('Recorrido de pedido y cotización', () => {
  it('orienta al catálogo con pedido vacío y evita cotización vacía', async () => {
    const router = visit('/cotizacion')
    await screen.findByRole(
      'heading',
      { name: 'Armá tu pedido', level: 1 },
      { timeout: 4_000 },
    )
    expect(router.state.location.pathname).toBe('/arma-tu-pedido')
    expect(screen.getByText('Tu pedido está vacío')).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Cotizar mi pedido' })).toBeNull()
    expect(
      screen.getByRole('link', { name: 'Explorar catálogo' }),
    ).toHaveAttribute('href', '/catalogo')
  })
  it('no inventa una cantidad inicial y muestra errores sin agregar', async () => {
    const user = userEvent.setup()
    visit('/catalogo/producto/p-003-vasos-personalizados')
    const quantity = screen.getByRole('combobox')
    expect(quantity).toHaveValue('')
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    expect(screen.getByText(/Elegí una cantidad del 10 al 200/)).toBeVisible()
    expect(quantity).toHaveAttribute('aria-invalid', 'true')
    expect(orderStore.getState().lines).toEqual([])
    const choices = within(quantity)
      .getAllByRole('option')
      .filter((option) => !option.hasAttribute('disabled'))
    expect(choices.map((option) => option.textContent)).toEqual(
      Array.from({ length: 191 }, (_, index) => String(index + 10)),
    )
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    expect(orderStore.getState().lines).toEqual([])
  })
  it('agrega, informa repetidos y actualiza el indicador del header', async () => {
    const user = userEvent.setup()
    visit('/catalogo/producto/p-003-vasos-personalizados')
    await user.selectOptions(screen.getByRole('combobox'), '20')
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    expect(
      screen.getByRole('link', {
        name: 'Armá tu pedido, 1 producto seleccionado',
      }),
    ).toHaveAttribute('href', '/arma-tu-pedido')
    await user.selectOptions(screen.getByRole('combobox'), '30')
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    expect(screen.getByText(/Este producto ya está en tu pedido/)).toBeVisible()
    expect(orderStore.getState().lines[0]?.quantity).toBe(20)
    expect(orderStore.getState().lines).toHaveLength(1)
  })
  it('permite seleccionar servicios, editar cantidades y quitar líneas', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    visit('/catalogo/producto/p-013-invitaciones-digitales')
    expect(screen.queryByRole('combobox')).toBeNull()
    await user.click(
      screen.getByRole('button', { name: 'Agregar a mi pedido' }),
    )
    await user.click(screen.getByRole('link', { name: 'Ver mi pedido' }))
    await screen.findByRole(
      'heading',
      { level: 1, name: 'Armá tu pedido' },
      { timeout: 4_000 },
    )
    expect(orderStore.getState().lines).toHaveLength(2)
    expect(screen.getAllByRole('combobox')).toHaveLength(1)
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar cantidad para vasos personalizados',
      }),
    )
    expect(screen.getByRole('combobox')).toHaveValue('21')
    await user.click(
      screen.getByRole('button', { name: 'Quitar Invitaciones digitales' }),
    )
    expect(orderStore.getState().lines).toHaveLength(1)
    await user.click(
      screen.getByRole('button', { name: 'Quitar Vasos personalizados' }),
    )
    expect(screen.getByText('Tu pedido está vacío')).toBeVisible()
  })
  it('pide confirmación al vaciar y permite conservar la selección', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    visit('/arma-tu-pedido')
    await screen.findByRole('heading', { level: 1, name: 'Armá tu pedido' })
    await user.click(screen.getByRole('button', { name: 'Vaciar pedido' }))
    await user.click(screen.getByRole('button', { name: 'Conservar pedido' }))
    expect(orderStore.getState().lines).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Vaciar pedido' }))
    await user.click(screen.getByRole('button', { name: 'Sí, vaciar pedido' }))
    expect(orderStore.getState().lines).toHaveLength(0)
    expect(localStorage.getItem(ORDER_STORAGE_KEY)).toBeNull()
    expect(screen.getByText('Tu pedido está vacío')).toBeVisible()
  })
  it('cotiza desde el pedido con la cantidad actual y conserva la selección', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    orderStore.getState().add('P-014', null)
    const router = visit('/arma-tu-pedido')
    const quote = await screen.findByRole(
      'link',
      { name: 'Cotizar mi pedido' },
      { timeout: 4_000 },
    )
    const summary = screen.getByRole('region', { name: 'Resumen de tu pedido' })
    const clear = screen.getByRole('button', { name: 'Vaciar pedido' })
    expect(
      clear.compareDocumentPosition(summary) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    expect(summary.nextElementSibling).toBe(quote)
    expect(
      screen.queryByRole('navigation', { name: 'Etapas de la solicitud' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('textbox', { name: 'Tu nombre (opcional)' }),
    ).not.toBeInTheDocument()
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar cantidad para vasos personalizados',
      }),
    )
    const url = new URL(quote.getAttribute('href') ?? '')
    expect(url.origin).toBe('https://wa.me')
    expect(url.pathname).toBe('/5491135939460')
    const message = url.searchParams.get('text')
    expect(message).toContain('Vasos personalizados — Cantidad de unidades: 21')
    expect(message).toContain('Save the date — Servicio digital')
    expect(message).not.toContain('Datos del evento')
    const stored = localStorage.getItem(ORDER_STORAGE_KEY)
    quote.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    })
    await user.click(quote)
    expect(router.state.location.pathname).toBe('/arma-tu-pedido')
    expect(localStorage.getItem(ORDER_STORAGE_KEY)).toBe(stored)
    expect(orderStore.getState().lines).toHaveLength(2)
  })
  it('ofrece selección manual del texto en la consulta de producto si falla el portapapeles', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(
      new Error('Denied'),
    )
    visit('/catalogo/producto/p-003-vasos-personalizados')
    await user.click(
      screen.getByRole('button', { name: 'Consultar por este producto' }),
    )
    const message = screen.getByRole('textbox', { name: 'Mensaje de consulta' })
    await user.click(screen.getByRole('button', { name: 'Copiar mensaje' }))
    expect(screen.getByText(/No pudimos copiar automáticamente/)).toBeVisible()
    expect(message).toHaveFocus()
    expect(orderStore.getState().lines).toHaveLength(0)
  })
  it.each([
    '/catalogo/producto/p-011-carpa-qr',
    '/catalogo/producto/p-008-capitan-de-mesa',
    '/catalogo/producto/p-012-numeros-de-mesa',
  ])(
    'mantiene consulta directa segura ante reglas pendientes: %s',
    async (path) => {
      const user = userEvent.setup()
      visit(path)
      expect(screen.queryByRole('combobox')).toBeNull()
      expect(
        screen.queryByRole('button', { name: 'Agregar a mi pedido' }),
      ).toBeNull()
      await user.click(
        screen.getByRole('button', { name: 'Consultar por este producto' }),
      )
      const modal = screen.getByRole('dialog', {
        name: 'Consulta por el producto',
      })
      expect(
        within(modal).getByRole('textbox', { name: 'Mensaje de consulta' }),
      ).toHaveProperty(
        'value',
        expect.stringContaining('Necesito asesoramiento sobre su modalidad'),
      )
      expect(orderStore.getState().lines).toHaveLength(0)
    },
  )
  it('conserva la selección al continuar explorando y no muestra importes', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    const router = visit('/arma-tu-pedido')
    await screen.findByRole('heading', { level: 1, name: 'Armá tu pedido' })
    expect(document.body.textContent).not.toMatch(
      /\$|subtotal|total monetario|checkout/i,
    )
    await user.click(screen.getByRole('link', { name: 'Ver más productos' }))
    expect(router.state.location.pathname).toBe('/catalogo')
    expect(orderStore.getState().lines).toHaveLength(1)
    expect(
      screen.getByRole('link', {
        name: 'Armá tu pedido, 1 producto seleccionado',
      }),
    ).toBeVisible()
  })
})

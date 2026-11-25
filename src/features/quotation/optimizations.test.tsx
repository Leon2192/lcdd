import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { routes } from '@/routes/routes'
import { QuotationPage } from './QuotationPage'
import { QuotationSession } from './QuotationSession'
import { orderStore } from '@/features/order/store'
import { ORDER_STORAGE_KEY } from '@/features/order/persistence'
import { siteConfig } from '@/config/site'
import * as whatsapp from '@/lib/whatsapp'
beforeEach(() => {
  orderStore.getState().clear()
  localStorage.clear()
})
afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})
function visit(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}
async function quotation() {
  const router = createMemoryRouter([
    {
      path: '/',
      element: (
        <QuotationSession>
          <QuotationPage />
        </QuotationSession>
      ),
    },
  ])
  render(<RouterProvider router={router} />)
  await screen.findByRole('heading', {
    name: 'Contanos sobre tu evento',
    level: 1,
  })
}
describe('Activación de WhatsApp 05.1', () => {
  it('centraliza el número autorizado y conserva exacto el mensaje en la URL', () => {
    expect(siteConfig.contact.whatsapp.internationalNumberValidated).toBe(true)
    expect(siteConfig.contact.whatsapp.internationalNumber).toBe(
      '5491135939460',
    )
    const message = 'María & José + 🎉\n¿Cotización? #evento'
    const url = whatsapp.getValidatedWhatsAppUrl(message)
    expect(url).not.toBeNull()
    if (!url) throw new Error('Enlace no habilitado')
    expect(new URL(url).pathname).toBe('/5491135939460')
    expect(new URL(url).searchParams.get('text')).toBe(message)
    expect(whatsapp.getValidatedWhatsAppUrl()).toBe(
      'https://wa.me/5491135939460',
    )
  })
  it.each([
    'Consultar WhatsApp',
    'Contactanos por WhatsApp',
    'WhatsApp: 1135939460',
  ])('activa el contacto institucional desde %s', async (name) => {
    vi.stubGlobal('matchMedia', () => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const user = userEvent.setup()
    visit('/')
    expect(screen.queryByRole('dialog')).toBeNull()
    await user.click(screen.getByRole('button', { name }))
    const dialog = screen.getByRole('dialog', {
      name: 'Consultas por WhatsApp',
    })
    const link = within(dialog).getByRole('link', {
      name: 'Conversar por WhatsApp',
    })
    expect(link).toHaveAttribute('href', 'https://wa.me/5491135939460')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(dialog).not.toHaveTextContent(
      /pendiente de validación|no está verificado/i,
    )
  })
  it('integra el menú mobile con el contacto autorizado', async () => {
    const user = userEvent.setup()
    visit('/')
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))
    const menu = screen.getByRole('dialog', { name: 'Menú' })
    await user.click(
      within(menu).getByRole('button', { name: 'Consultar WhatsApp' }),
    )
    expect(
      screen.getByRole('link', { name: 'Conversar por WhatsApp' }),
    ).toHaveAttribute('href', 'https://wa.me/5491135939460')
  })
  it.each([
    ['p-011-carpa-qr', 'Carpa QR'],
    ['p-008-capitan-de-mesa', 'Capitán de mesa'],
    ['p-012-numeros-de-mesa', 'Números de mesa'],
  ])(
    'prepara consulta contextualizada de %s sin imponer modalidad',
    async (slug, name) => {
      const user = userEvent.setup()
      visit(`/catalogo/producto/${slug}`)
      await user.click(
        screen.getByRole('button', { name: 'Consultar por este producto' }),
      )
      const dialog = screen.getByRole('dialog', {
        name: 'Consulta por el producto',
      })
      const link = within(dialog).getByRole('link', {
        name: 'Consultar por WhatsApp',
      })
      const text = new URL(link.getAttribute('href') ?? '').searchParams.get(
        'text',
      )
      expect(text).toContain(name)
      expect(text).not.toMatch(/\bP-\d{3}\b/)
      expect(text).toContain('Necesito asesoramiento')
      expect(text).not.toContain('Cantidad: 1')
      expect(
        within(dialog).getByRole('button', { name: 'Copiar mensaje' }),
      ).toBeVisible()
      expect(orderStore.getState().lines).toHaveLength(0)
    },
  )
})

describe('Formulario de evento en pausa y pistas de producto', () => {
  it.each(['Fiesta de XV', 'Casamiento', 'Cumpleaños', 'Otro'])(
    'incluye la opción aprobada %s al abrir WhatsApp',
    async (eventType) => {
      const user = userEvent.setup()
      const open = vi.spyOn(whatsapp, 'openWhatsApp').mockReturnValue(true)
      orderStore.getState().add('P-003', 20)
      await quotation()
      const select = screen.getByRole('combobox', {
        name: 'Tipo de evento (opcional)',
      })
      expect(select).toHaveValue('')
      expect(select).not.toBeRequired()
      await user.click(select)
      expect(
        within(screen.getByRole('listbox'))
          .getAllByRole('option')
          .map((option) => option.textContent),
      ).toEqual([
        'Seleccioná el tipo de evento',
        'Fiesta de XV',
        'Casamiento',
        'Cumpleaños',
        'Otro',
      ])
      await user.click(screen.getByRole('option', { name: eventType }))
      expect(open).not.toHaveBeenCalled()
      await user.click(
        screen.getByRole('button', { name: 'Cotizar por WhatsApp' }),
      )
      expect(open).toHaveBeenCalledExactlyOnceWith(
        expect.stringContaining(`Tipo de evento: ${eventType}`),
      )
    },
  )

  it('mantiene fecha nativa y envía DD/MM/AAAA al abrir WhatsApp', async () => {
    const user = userEvent.setup()
    const open = vi.spyOn(whatsapp, 'openWhatsApp').mockReturnValue(true)
    orderStore.getState().add('P-003', 20)
    await quotation()
    const date = screen.getByLabelText('Fecha del evento (opcional)')
    expect(date).toHaveAttribute('type', 'date')
    expect(date).toHaveAttribute('lang', 'es-AR')
    fireEvent.change(date, { target: { value: '2027-01-05' } })
    await user.click(
      screen.getByRole('button', { name: 'Cotizar por WhatsApp' }),
    )
    expect(open).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('Fecha del evento: 05/01/2027'),
    )
    expect(open.mock.calls[0]?.[0]).not.toContain('Tipo de evento:')
  })

  it('informa si WhatsApp no está disponible y conserva la selección', async () => {
    const user = userEvent.setup()
    vi.spyOn(whatsapp, 'openWhatsApp').mockReturnValue(false)
    orderStore.getState().add('P-013', null)
    const saved = localStorage.getItem(ORDER_STORAGE_KEY)
    await quotation()
    await user.click(
      screen.getByRole('button', { name: 'Cotizar por WhatsApp' }),
    )
    expect(screen.getByRole('alert')).toHaveTextContent(
      'WhatsApp no está disponible',
    )
    expect(orderStore.getState().lines).toHaveLength(1)
    expect(localStorage.getItem(ORDER_STORAGE_KEY)).toBe(saved)
  })

  it('mantiene relacionados en una pista accesible sin bloquear edición del pedido', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    visit('/arma-tu-pedido')
    await screen.findByRole('heading', { name: 'Armá tu pedido', level: 1 })
    const rail = screen.getByRole('region', {
      name: 'Sugerencias para tu pedido',
    })
    expect(rail).toHaveAttribute('aria-roledescription', 'carrusel')
    expect(
      within(rail).getByRole('button', {
        name: 'Siguiente en Sugerencias para tu pedido',
      }),
    ).toHaveAttribute('aria-controls')
    const slide = within(rail).getByRole('group', { name: /1 de/ })
    expect(slide.parentElement).toHaveAttribute('tabindex', '0')
    expect(within(rail).getAllByRole('article').length).toBeGreaterThan(0)
    await user.click(
      screen.getByRole('button', {
        name: 'Aumentar cantidad para vasos personalizados',
      }),
    )
    expect(screen.getByRole('combobox')).toHaveValue('21')
    expect(
      screen.getByRole('button', { name: 'Quitar Vasos personalizados' }),
    ).toBeVisible()
  })
})

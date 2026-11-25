import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import {
  beforeAll,
  afterAll,
  afterEach,
  beforeEach,
  describe,
  it,
  expect,
  vi,
} from 'vitest'
import { routes } from '@/routes/routes'
import { orderStore } from '@/features/order/store'
import { ORDER_STORAGE_KEY } from '@/features/order/persistence'
import { siteConfig } from '@/config/site'
import { getValidatedWhatsAppUrl } from '@/lib/whatsapp'
const scroll = vi.fn()
const originalScroll = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'scrollIntoView',
)
beforeAll(() =>
  Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
    configurable: true,
    value: scroll,
  }),
)
afterAll(() => {
  if (originalScroll)
    Object.defineProperty(
      HTMLElement.prototype,
      'scrollIntoView',
      originalScroll,
    )
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollIntoView')
})
beforeEach(() => {
  orderStore.getState().clear()
  localStorage.clear()
  scroll.mockClear()
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
  visit('/cotizacion')
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
    const url = getValidatedWhatsAppUrl(message)
    expect(url).not.toBeNull()
    if (!url) throw new Error('Enlace no habilitado')
    expect(new URL(url).pathname).toBe('/5491135939460')
    expect(new URL(url).searchParams.get('text')).toBe(message)
    expect(getValidatedWhatsAppUrl()).toBe('https://wa.me/5491135939460')
  })
  it.each([
    'Consultar WhatsApp',
    'Contactanos por WhatsApp',
    'WhatsApp: 1135939460',
  ])('activa el contacto institucional desde %s', async (name) => {
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
    ['p-011-carpa-qr', 'P-011'],
    ['p-008-capitan-de-mesa', 'P-008'],
    ['p-012-numeros-de-mesa', 'P-012'],
  ])(
    'prepara consulta contextualizada de %s sin imponer modalidad',
    async (slug, id) => {
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
      expect(text).toContain(id)
      expect(text).toContain('Necesito asesoramiento')
      expect(text).not.toContain('Cantidad: 1')
      expect(
        within(dialog).getByRole('button', { name: 'Copiar mensaje' }),
      ).toBeVisible()
      expect(orderStore.getState().lines).toHaveLength(0)
    },
  )
  it('ofrece WhatsApp como acción principal y conserva pedido y persistencia al activarlo', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 25)
    orderStore.getState().add('P-013', null)
    await quotation()
    await user.type(
      screen.getByRole('textbox', { name: 'Tu nombre (opcional)' }),
      'María & José',
    )
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    const link = await screen.findByRole('link', {
      name: 'Enviar solicitud por WhatsApp',
    })
    expect(link).toHaveClass('button--primary')
    expect(screen.getByRole('button', { name: 'Copiar mensaje' })).toHaveClass(
      'button--outline',
    )
    const message = screen.getByRole('textbox', { name: 'Mensaje preparado' })
    expect(message).toHaveProperty(
      'value',
      new URL(link.getAttribute('href') ?? '').searchParams.get('text'),
    )
    const saved = localStorage.getItem(ORDER_STORAGE_KEY)
    link.addEventListener('click', (event) => event.preventDefault(), {
      once: true,
    })
    await user.click(link)
    expect(orderStore.getState().lines).toHaveLength(2)
    expect(localStorage.getItem(ORDER_STORAGE_KEY)).toBe(saved)
    expect(
      screen.queryByText(
        /solicitud enviada|mensaje recibido|compra confirmada/i,
      ),
    ).toBeNull()
  })
})
describe('Revisión accesible y fechas', () => {
  it('invalida el mensaje al cambiar el selector sin perder los demás datos', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    await quotation()
    await user.type(
      screen.getByRole('textbox', { name: 'Tu nombre (opcional)' }),
      'Ana',
    )
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    expect(
      await screen.findByRole('textbox', { name: 'Mensaje preparado' }),
    ).toBeVisible()
    await user.click(
      screen.getByRole('combobox', { name: 'Tipo de evento (opcional)' }),
    )
    await user.click(screen.getByRole('option', { name: 'Cumpleaños' }))
    expect(
      screen.queryByRole('textbox', { name: 'Mensaje preparado' }),
    ).toBeNull()
    expect(
      screen.getByRole('textbox', { name: 'Tu nombre (opcional)' }),
    ).toHaveValue('Ana')
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    expect(
      await screen.findByRole('textbox', { name: 'Mensaje preparado' }),
    ).toHaveProperty(
      'value',
      expect.stringContaining('Tipo de evento: Cumpleaños'),
    )
  })

  it.each(['Fiesta de XV', 'Casamiento', 'Cumpleaños', 'Otro'])(
    'refleja la opción aprobada %s en resumen y WhatsApp',
    async (eventType) => {
      const user = userEvent.setup()
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
      await user.click(
        screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
      )
      expect(
        await screen.findByRole('region', {
          name: 'Datos del evento para revisar',
        }),
      ).toHaveTextContent(eventType)
      expect(
        screen.getByRole('textbox', { name: 'Mensaje preparado' }),
      ).toHaveProperty(
        'value',
        expect.stringContaining(`Tipo de evento: ${eventType}`),
      )
      const link = screen.getByRole('link', {
        name: 'Enviar solicitud por WhatsApp',
      })
      expect(
        new URL(link.getAttribute('href') ?? '').searchParams.get('text'),
      ).toContain(`Tipo de evento: ${eventType}`)
      await user.click(
        screen.getByRole('button', { name: 'Editar datos del evento' }),
      )
      expect(select).toHaveValue(eventType)
      await user.click(select)
      await user.click(
        screen.getByRole('option', { name: 'Seleccioná el tipo de evento' }),
      )
      await user.click(
        screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
      )
      expect(
        await screen.findByRole('textbox', { name: 'Mensaje preparado' }),
      ).toHaveProperty('value', expect.not.stringContaining('Tipo de evento:'))
    },
  )

  it.each([
    [false, 'smooth'],
    [true, 'auto'],
  ])(
    'desplaza y enfoca revisión respetando reduced-motion=%s',
    async (reduce, behavior) => {
      const user = userEvent.setup()
      vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: reduce }))
      orderStore.getState().add('P-003', 20)
      await quotation()
      await user.click(
        screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
      )
      const heading = await screen.findByRole('heading', {
        name: 'Revisá tu solicitud',
      })
      expect(heading).toHaveFocus()
      expect(heading).toHaveAttribute('tabindex', '-1')
      expect(scroll).toHaveBeenCalledWith({ block: 'start', behavior })
    },
  )
  it('vuelve a los datos con foco y conserva valores sin persistir información personal', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    await quotation()
    await user.type(
      screen.getByRole('textbox', { name: 'Tu nombre (opcional)' }),
      'Ana',
    )
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    await user.click(
      await screen.findByRole('button', { name: 'Editar datos del evento' }),
    )
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Contanos sobre tu evento',
      }),
    ).toHaveFocus()
    expect(
      screen.getByRole('textbox', { name: 'Tu nombre (opcional)' }),
    ).toHaveValue('Ana')
    expect(
      screen.queryByRole('textbox', { name: 'Mensaje preparado' }),
    ).toBeNull()
    expect(localStorage.getItem(ORDER_STORAGE_KEY)).not.toContain('Ana')
  })
  it('mantiene fecha nativa con es-AR y resume en DD/MM/AAAA con opciones de evento aprobadas', async () => {
    const user = userEvent.setup()
    orderStore.getState().add('P-003', 20)
    await quotation()
    const date = screen.getByLabelText('Fecha del evento (opcional)')
    expect(date).toHaveAttribute('type', 'date')
    expect(date).toHaveAttribute('lang', 'es-AR')
    fireEvent.change(date, { target: { value: '2027-01-05' } })
    expect(
      screen.getByRole('combobox', { name: 'Tipo de evento (opcional)' }),
    ).toBeVisible()
    expect(screen.getByRole('combobox')).toHaveValue('')
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    const summary = await screen.findByRole('region', {
      name: 'Datos del evento para revisar',
    })
    expect(summary).toHaveTextContent('05/01/2027')
    expect(
      screen.getByRole('textbox', { name: 'Mensaje preparado' }),
    ).toHaveProperty(
      'value',
      expect.stringContaining('Fecha del evento: 05/01/2027'),
    )
  })
  it('anuncia copia confirmada sin afirmar envío ni recepción', async () => {
    const user = userEvent.setup()
    const copy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    orderStore.getState().add('P-013', null)
    await quotation()
    await user.click(
      screen.getByRole('button', { name: 'Revisar solicitud de cotización' }),
    )
    await user.click(
      await screen.findByRole('button', { name: 'Copiar mensaje' }),
    )
    expect(copy).toHaveBeenCalledOnce()
    const status = screen.getByText(
      'Mensaje copiado. Podés pegarlo en WhatsApp.',
    )
    expect(status).toHaveAttribute('role', 'status')
    expect(status).toHaveAttribute('aria-atomic', 'true')
    expect(orderStore.getState().lines).toHaveLength(1)
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
    expect(screen.getByRole('spinbutton')).toHaveValue(21)
    expect(
      screen.getByRole('button', { name: 'Quitar Vasos personalizados' }),
    ).toBeVisible()
  })
})

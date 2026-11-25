import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, it, expect, vi } from 'vitest'
import { encodeWhatsAppUrl, generateQuotationMessage } from './message'
import { emptyQuotation } from './schema'
import { EventSummary } from './EventSummary'
import { MessageReview } from './MessageReview'
afterEach(() => vi.restoreAllMocks())
describe('Mensajes seguros y confirmaciones', () => {
  it('codifica Unicode malformado sin romper la página ni perder emojis válidos', () => {
    const input = 'Hola \uD800 & \uDC00 🎉'
    expect(
      new URL(encodeWhatsAppUrl('5491135939460', input)).searchParams.get(
        'text',
      ),
    ).toBe('Hola \uFFFD & \uFFFD 🎉')
  })
  it('representa texto de usuario como contenido, nunca como HTML ejecutable', () => {
    const payload = '<img src=x onerror=alert(1)><script>alert(1)</script>'
    const data = { ...emptyQuotation, name: payload }
    const message = generateQuotationMessage(
      [{ productId: 'P-003', kind: 'quantity', quantity: 25 }],
      data,
    )
    render(
      <>
        <EventSummary data={data} />
        <MessageReview message={message} />
      </>,
    )
    expect(screen.getByText(payload)).toBeVisible()
    expect(document.querySelector('img')).toBeNull()
    expect(document.querySelector('script')).toBeNull()
    const href = screen
      .getByRole('link', { name: 'Enviar solicitud por WhatsApp' })
      .getAttribute('href')
    expect(new URL(href ?? '').searchParams.get('text')).toBe(message)
  })
  it('actualiza el anuncio accesible al copiar repetidamente', async () => {
    const user = userEvent.setup()
    const copy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    render(<MessageReview message="Consulta" />)
    await user.click(screen.getByRole('button', { name: 'Copiar mensaje' }))
    await user.click(screen.getByRole('button', { name: 'Copiar mensaje' }))
    const region = screen.getByRole('region', { name: 'Revisión del mensaje' })
    expect(within(region).getByRole('status')).toHaveTextContent(
      'Copia número 2.',
    )
    expect(copy).toHaveBeenCalledTimes(2)
  })
})

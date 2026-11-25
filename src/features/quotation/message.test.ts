import { describe, it, expect } from 'vitest'
import { emptyQuotation, quotationSchema, isCalendarDate } from './schema'
import {
  generateQuotationMessage,
  generateDirectConsultation,
  encodeWhatsAppUrl,
  getValidatedWhatsAppUrl,
} from './message'
import type { OrderLine } from '@/features/order/persistence'
const lines: OrderLine[] = [
  { productId: 'P-003', kind: 'quantity', quantity: 25 },
  { productId: 'P-013', kind: 'service', quantity: null },
]
describe('Formulario candidato', () => {
  it('limita tipos de evento a la lista aprobada y permite no elegir', () => {
    for (const eventType of [
      '',
      'Fiesta de XV',
      'Casamiento',
      'Cumpleaños',
      'Otro',
    ])
      expect(
        quotationSchema.safeParse({ ...emptyQuotation, eventType }).success,
      ).toBe(true)
    expect(
      quotationSchema.safeParse({ ...emptyQuotation, eventType: 'No aprobado' })
        .success,
    ).toBe(false)
  })

  it('no inventa obligatoriedad de datos personales', () => {
    expect(quotationSchema.safeParse(emptyQuotation).success).toBe(true)
  })
  it.each(['2026-02-30', '2025-02-29', '31/12/2026', 'no-fecha'])(
    'rechaza fecha inválida %s',
    (eventDate) => {
      expect(
        quotationSchema.safeParse({ ...emptyQuotation, eventDate }).success,
      ).toBe(false)
    },
  )
  it('acepta fechas reales sin imponer anticipación ni fecha futura', () => {
    expect(isCalendarDate('2024-02-29')).toBe(true)
    expect(
      quotationSchema.safeParse({ ...emptyQuotation, eventDate: '2024-02-29' })
        .success,
    ).toBe(true)
    expect(
      quotationSchema.safeParse({ ...emptyQuotation, dateUnknown: true })
        .success,
    ).toBe(true)
  })
  it('rechaza combinar fecha numérica y por definir', () => {
    expect(
      quotationSchema.safeParse({
        ...emptyQuotation,
        dateUnknown: true,
        eventDate: '2026-12-01',
      }).success,
    ).toBe(false)
  })
})
describe('Mensaje y WhatsApp', () => {
  it('incluye nombres oficiales, cantidades semánticas, servicios y datos aportados', () => {
    const message = generateQuotationMessage(lines, {
      ...emptyQuotation,
      name: 'María & José',
      eventType: 'Casamiento',
      eventDate: '2027-01-15',
      location: 'Lanús',
      comments: 'Diseño: corazón ♥\nGracias & saludos',
    })
    expect(message).toContain(
      '- Vasos personalizados — Cantidad de unidades: 25',
    )
    expect(message).toContain('- Invitaciones digitales — Servicio digital')
    expect(message).toContain('Nombre: María & José')
    expect(message).toContain('Fecha del evento: 15/01/2027')
    expect(message).toContain('Localidad: Lanús')
    expect(message).toContain('corazón ♥\nGracias & saludos')
    expect(message).not.toMatch(/\$|checkout|pagado|enviado/i)
  })
  it('omite campos vacíos y declara fecha desconocida solo cuando la eligió el usuario', () => {
    expect(generateQuotationMessage(lines, emptyQuotation)).not.toContain(
      'Nombre:',
    )
    expect(generateQuotationMessage(lines, emptyQuotation)).not.toContain(
      'por definir',
    )
    expect(
      generateQuotationMessage(lines, { ...emptyQuotation, dateUnknown: true }),
    ).toContain('Fecha del evento: por definir')
  })
  it('no genera solicitudes estructuradas vacías, sin cantidad o con modalidad pendiente', () => {
    expect(() => generateQuotationMessage([], emptyQuotation)).toThrow()
    expect(() =>
      generateQuotationMessage(
        [{ productId: 'P-003', kind: 'quantity', quantity: null }],
        emptyQuotation,
      ),
    ).toThrow()
    expect(() =>
      generateQuotationMessage(
        [{ productId: 'P-011', kind: 'quantity', quantity: 10 }],
        emptyQuotation,
      ),
    ).toThrow()
    expect(() =>
      generateQuotationMessage(
        [...lines, { productId: 'P-003', kind: 'quantity', quantity: 25 }],
        emptyQuotation,
      ),
    ).toThrow()
  })
  it('codifica acentos, saltos, signos y emoji sin alterar el texto', () => {
    const message = 'María & José? #evento + ♥ 🎉\nFecha: por definir'
    const url = encodeWhatsAppUrl('5491135939460', message)
    expect(new URL(url).searchParams.get('text')).toBe(message)
    expect(url).toContain('%0A')
    expect(url).toContain('%26')
    expect(() => encodeWhatsAppUrl('+54 911', message)).toThrow()
    expect(() => encodeWhatsAppUrl('5491135939460', '')).toThrow()
  })
  it('activa el número internacional verificado por el propietario', () => {
    expect(getValidatedWhatsAppUrl('Consulta')).toBe(
      'https://wa.me/5491135939460?text=Consulta',
    )
  })
  it('permite consulta contextualizada sin completar cantidades pendientes', () => {
    const message = generateDirectConsultation('P-011')
    expect(message).toContain('Carpa QR')
    expect(message).not.toMatch(/\bP-\d{3}\b/)
    expect(message).not.toMatch(/cantidad: 1|incluye|enviado/i)
    expect(() => generateDirectConsultation('P-999')).toThrow()
  })
})

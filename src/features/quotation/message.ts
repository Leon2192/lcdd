import { catalog, getProduct } from '@/data/catalog/catalog'
import { formatEventDate } from '@/lib/event-date'
export { encodeWhatsAppUrl, getValidatedWhatsAppUrl } from '@/lib/whatsapp'
import { reconcileOrder, orderEnvelope, getLineLabel } from '@/features/order'
import type { OrderLine } from '@/features/order'
import { quotationSchema } from './schema'
import type { QuotationData } from './schema'
export function generateQuotationMessage(
  lines: readonly OrderLine[],
  data: QuotationData,
): string {
  const recovered = reconcileOrder(orderEnvelope(lines))
  if (
    !lines.length ||
    recovered.notice ||
    recovered.lines.length !== lines.length
  )
    throw new Error(
      'Revisá la selección: hace falta al menos un producto con su modalidad y cantidad válidas.',
    )
  const event = quotationSchema.parse(data)
  const productLines = lines
    .map((line) => {
      const product = getProduct(line.productId)
      if (!product) throw new Error('Producto inexistente')
      return `- ${product.name} — ${getLineLabel(product.id, line.quantity)}`
    })
    .join('\n')
  const fields = [
    event.name && `Nombre: ${event.name}`,
    event.eventType && `Tipo de evento: ${event.eventType}`,
    event.eventDate && `Fecha del evento: ${formatEventDate(event.eventDate)}`,
    event.dateUnknown && 'Fecha del evento: por definir',
    event.location && `Localidad: ${event.location}`,
  ].filter(Boolean)
  return [
    'Hola, quisiera solicitar una cotización desde la web de LCDD.',
    `Productos:\n${productLines}`,
    ...(fields.length ? [`Datos del evento:\n${fields.join('\n')}`] : []),
    ...(event.comments ? [`Comentarios: ${event.comments}`] : []),
    'Gracias.',
  ].join('\n\n')
}
export function generateDirectConsultation(productId: string): string {
  const product = catalog.products.find((item) => item.id === productId)
  if (!product) throw new Error('Producto inexistente')
  return `Hola, quisiera consultar desde la web de LCDD por ${product.name}. Necesito asesoramiento sobre su modalidad, cantidades y opciones disponibles. Gracias.`
}

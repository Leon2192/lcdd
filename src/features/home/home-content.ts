import { productIdentities } from '@/features/home/catalog-identities'

// Selección de DEMOSTRACIÓN según UI-01. No es la selección comercial aprobada.
type ProductId = (typeof productIdentities)[number]['id']
export const featuredSelection: {
  status: 'demonstration' | 'approved'
  productIds: readonly ProductId[]
} = {
  status: 'demonstration',
  productIds: ['P-003', 'P-004', 'P-002', 'P-005', 'P-009'],
}
export const featuredProducts = featuredSelection.productIds.map((id) => {
  const product = productIdentities.find((item) => item.id === id)
  if (!product) throw new Error(`Identidad de producto no encontrada: ${id}`)
  return product
})

// Textos de UI-01 vigente; revisión institucional pendiente. No son nuevos claims.
export const homeContent = {
  hero: {
    eyebrow: 'Detalles personalizados para eventos',
    title: 'Hacé de tu evento un momento único',
    description:
      'Souvenirs, kits, detalles de mesa, experiencias e invitaciones digitales, todo personalizado a tu estilo.',
    action: 'Explorá nuestros productos',
  },
  values: [
    { icon: 'heart', text: 'Personalización en cada detalle' },
    { icon: 'sparkles', text: 'Variedad para todo tipo de eventos' },
    { icon: 'truck', text: 'Acompañamiento y atención cercana' },
    { icon: 'award', text: 'Calidad y presentación cuidada' },
  ],
  categories: {
    eyebrow: 'Explorá por categoría',
    title: 'Encontrá el detalle ideal para tu evento',
  },
  inspiration: {
    eyebrow: 'Inspiración',
    title: 'Ideas y combinaciones para tu evento',
    description:
      'Descubrí propuestas, combiná productos y armá una experiencia única y coherente.',
    action: 'Ver inspiración',
  },
  about: {
    eyebrow: 'Sobre nosotros',
    description:
      'Somos LCDD, un espacio dedicado a crear detalles personalizados que realzan cada evento.',
    action: 'Conocé más',
  },
  professionals: {
    title: '¿Organizás eventos? Trabajemos juntos',
    action: 'Más info para profesionales',
  },
  steps: [
    { icon: 'monitor', title: 'Explorá nuestros productos' },
    { icon: 'gift', title: 'Elegí lo que necesitás' },
    { icon: 'whatsapp', title: 'Solicitá tu cotización por WhatsApp' },
    { icon: 'calendar', title: 'Coordinamos los detalles de tu evento' },
  ],
  events: ['Casamiento', '15 años', 'Cumpleaños', 'Eventos especiales'],
  conversion: {
    title: 'Hagamos algo especial',
    description:
      'Contanos sobre tu evento y encontremos juntos los detalles ideales.',
    action: 'Armá tu pedido',
  },
  contact: {
    title: '¿Tenés dudas o una idea especial?',
    action: 'Contactanos por WhatsApp',
  },
} as const

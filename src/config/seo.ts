import { siteConfig } from '@/config/site'
import { getCategory, resolveProduct } from '@/data/catalog/catalog'
export type PageMetadata = {
  title: string
  description: string
  kind: 'page' | 'placeholder' | 'not-found' | 'error'
}
export const localRobots = 'noindex, nofollow, noarchive'
const page = (
  title: string,
  description: string,
  kind: PageMetadata['kind'] = 'page',
): PageMetadata => ({
  title: `${title} | ${siteConfig.name}`,
  description,
  kind,
})
export function getPageMetadata(rawPathname: string): PageMetadata {
  const pathname = rawPathname.replace(/\/+$/, '') || '/'
  if (pathname === '/')
    return page(
      'Detalles personalizados para eventos',
      'Productos personalizados, souvenirs, invitaciones digitales y detalles para eventos. Explorá el catálogo de LCDD y prepará una consulta personalizada.',
    )
  if (pathname === '/catalogo')
    return page(
      'Catálogo',
      'Explorá las cinco categorías de productos y servicios de LCDD para preparar tu solicitud de cotización.',
    )
  if (pathname === '/arma-tu-pedido')
    return page(
      'Armá tu pedido',
      'Revisá y modificá tu selección de productos y servicios para solicitar una cotización personalizada.',
    )
  if (pathname === '/cotizacion')
    return page(
      'Tu evento y solicitud de cotización',
      'Revisá los datos de tu evento y prepará el mensaje de tu solicitud de cotización. No se confirma una compra.',
    )
  const editorialPages: Readonly<
    Record<string, { title: string; description: string }>
  > = {
    '/inspiracion': {
      title: 'Inspiración',
      description:
        'Colecciones conceptuales del catálogo LCDD para explorar combinaciones y preparar tu selección.',
    },
    '/nosotros': {
      title: 'Nosotros',
      description:
        'Conocé la propuesta de La Casa del Detalle y las formas de contacto para tu evento.',
    },
    '/profesionales': {
      title: 'Profesionales',
      description:
        'Explorá el catálogo de LCDD y prepará una consulta para tu proyecto o evento.',
    },
  }
  const editorial = editorialPages[pathname]
  if (editorial) return page(editorial.title, editorial.description)
  const categoryPrefix = '/catalogo/categoria/'
  if (pathname.startsWith(categoryPrefix)) {
    const category = getCategory(pathname.slice(categoryPrefix.length))
    return category
      ? page(
          category.name,
          `Explorá ${category.name} en el catálogo de LCDD y consultá por los productos de esta categoría.`,
        )
      : page(
          'Categoría no encontrada',
          'La categoría solicitada no pertenece al catálogo oficial de LCDD.',
          'not-found',
        )
  }
  const productPrefix = '/catalogo/producto/'
  if (pathname.startsWith(productPrefix)) {
    const product = resolveProduct(pathname.slice(productPrefix.length))
    return product
      ? page(
          product.name,
          `Información de ${product.name} en el catálogo de LCDD para una consulta personalizada.`,
        )
      : page(
          'Producto no encontrado',
          'El producto solicitado no pertenece al catálogo oficial de LCDD.',
          'not-found',
        )
  }
  if (import.meta.env.DEV && pathname === '/__dev/design-system')
    return page(
      'Biblioteca visual',
      'Herramienta local de revisión del sistema de diseño de LCDD.',
    )
  return page(
    'Página no encontrada',
    'La dirección solicitada no está disponible. Volvé al catálogo de LCDD.',
    'not-found',
  )
}

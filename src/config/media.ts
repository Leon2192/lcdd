import type { CatalogImage } from '@/data/catalog/types'
import type { officialCatalog } from '@/data/catalog/catalog.generated'
// Registro único: agregar solamente archivos locales con aprobación de uso y alt real.
export type LocalImage = CatalogImage & { src: `/media/${string}` }
export type HomeMediaSlot =
  | 'hero'
  | 'inspiration-1'
  | 'inspiration-2'
  | 'inspiration-3'
  | 'about'
  | 'conversion'
type CategoryId = (typeof officialCatalog.categories)[number]['id']
type ProductId = (typeof officialCatalog.products)[number]['id']
type CollectionId = (typeof officialCatalog.collections)[number]['id']
const antiresacaIllustration: LocalImage = {
  src: '/media/products/P-001/P-001_principal_01_v01.webp',
  alt: 'Imagen ilustrativa de un kit antiresaca',
  width: 1200,
  height: 1500,
  fit: 'contain',
}
export const visualAssets: {
  banners: Record<'details' | 'combos', LocalImage>
  logo: LocalImage | null
  home: Partial<Record<HomeMediaSlot, LocalImage>>
  categories: Partial<Record<CategoryId, LocalImage>>
  products: Partial<Record<ProductId, readonly LocalImage[]>>
  collections: Partial<Record<CollectionId, LocalImage>>
} = {
  banners: {
    details: {
      src: '/media/home/banner-detalles.webp',
      alt: '',
      width: 1050,
      height: 1400,
      origin: 'lcdd-supplied',
    },
    combos: {
      src: '/media/home/banner-combos.webp',
      alt: '',
      width: 1050,
      height: 1400,
      origin: 'lcdd-supplied',
    },
  },
  logo: null,
  home: {
    hero: {
      src: '/media/home/hero-v01.webp',
      alt: 'Home principal',
      width: 1600,
      height: 1200,
    },
    'inspiration-1': {
      src: '/media/home/inspiration-1-v01.webp',
      alt: 'Inspiración 1',
      width: 1200,
      height: 900,
    },
    'inspiration-2': {
      src: '/media/home/inspiration-2-v01.webp',
      alt: 'Inspiración 2',
      width: 1200,
      height: 900,
    },
    'inspiration-3': {
      src: '/media/home/inspiration-3-v01.webp',
      alt: 'Inspiración 3',
      width: 1200,
      height: 900,
    },
    about: {
      src: '/media/home/hero-v01.webp',
      alt: 'Home principal',
      width: 1600,
      height: 1200,
    },
    conversion: {
      src: '/media/home/hero-v01.webp',
      alt: 'Home principal',
      width: 1600,
      height: 1200,
    },
  },
  categories: {
    'kits-para-eventos': {
      src: '/media/categories/kits-para-eventos-v01.webp',
      alt: 'Kits',
      width: 1000,
      height: 750,
    },
    'souvenirs-personalizados': {
      src: '/media/categories/souvenirs-personalizados-v01.webp',
      alt: 'Souvenirs personalizados',
      width: 1000,
      height: 750,
    },
    'detalles-de-mesa': {
      src: '/media/categories/detalles-de-mesa-v01.webp',
      alt: 'Detalles de mesa',
      width: 1000,
      height: 750,
    },
    'invitaciones-digitales': {
      src: '/media/categories/invitaciones-digitales-v01.webp',
      alt: 'Invitaciones digitales',
      width: 1000,
      height: 750,
    },
  },
  products: {
    'P-015': [antiresacaIllustration],
    'P-016': [
      {
        src: '/media/products/kit-antiresaca-craft.webp',
        alt: 'Envoltorios de papel kraft con mensajes impresos de kit antiresaca',
        width: 1168,
        height: 1462,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-008': [
      {
        src: '/media/products/capitan-de-mesa.webp',
        alt: 'Tarjetas y señaladores de Capitán de mesa con motivos botánicos',
        width: 1220,
        height: 1483,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-007': [
      {
        src: '/media/products/estrellitas.webp',
        alt: 'Estrellitas con etiquetas personalizadas en un florero de vidrio',
        width: 1024,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-014': [
      {
        src: '/media/products/save-the-date.webp',
        alt: 'Tarjeta Save the date con un retrato de pareja en blanco y negro',
        width: 864,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-001': [antiresacaIllustration],
    'P-002': [
      {
        src: '/media/products/kit-de-bano.webp',
        alt: 'Kit de baño con artículos etiquetados en una bandeja',
        width: 1536,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-003': [
      {
        src: '/media/products/P-003/P-003_principal_01_v01.webp',
        alt: 'Vasos personalizados',
        width: 1200,
        height: 1500,
      },
    ],
    'P-004': [
      {
        src: '/media/products/P-004/P-004_principal_01_v01.webp',
        alt: 'Abanicos personalizados',
        width: 1200,
        height: 1500,
      },
    ],
    'P-005': [
      {
        src: '/media/products/lentes-personalizados.webp',
        alt: 'Lentes negros en forma de corazón con iniciales y mensajes blancos',
        width: 1152,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-006': [
      {
        src: '/media/products/diarios-personalizados.webp',
        alt: 'Diarios personalizados con portadas de boda en blanco y negro',
        width: 1178,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-009': [
      {
        src: '/media/products/difusores-personalizados.webp',
        alt: 'Difusor con iniciales, varillas y una tarjeta de agradecimiento',
        width: 1302,
        height: 1536,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-010': [
      {
        src: '/media/products/P-010/P-010_principal_01_v01.webp',
        alt: 'Espejitos personalizados',
        width: 1200,
        height: 1500,
      },
    ],
    'P-011': [
      {
        src: '/media/products/P-011/P-011_principal_01_v01.webp',
        alt: 'Carpa QR',
        width: 1200,
        height: 1500,
      },
    ],
    'P-012': [
      {
        src: '/media/products/P-012/P-012_principal_01_v01.webp',
        alt: 'Números de mesa',
        width: 1200,
        height: 1500,
      },
    ],
    'P-013': [
      {
        src: '/media/products/invitaciones-digitales.webp',
        alt: 'Dos diseños de invitaciones digitales en pantallas de celular',
        width: 1220,
        height: 1525,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
  },
  collections: {
    'COL-001': {
      src: '/media/home/inspiration-1-v01.webp',
      alt: 'Inspiración 1',
      width: 1200,
      height: 900,
    },
    'COL-002': {
      src: '/media/home/inspiration-2-v01.webp',
      alt: 'Inspiración 2',
      width: 1200,
      height: 900,
    },
    'COL-003': {
      src: '/media/home/inspiration-3-v01.webp',
      alt: 'Inspiración 3',
      width: 1200,
      height: 900,
    },
    'COL-004': {
      src: '/media/home/inspiration-1-v01.webp',
      alt: 'Inspiración 1',
      width: 1200,
      height: 900,
    },
    'COL-005': {
      src: '/media/home/inspiration-2-v01.webp',
      alt: 'Inspiración 2',
      width: 1200,
      height: 900,
    },
  },
}

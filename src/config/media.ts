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
const saveTheDate: LocalImage = {
  src: '/media/products/save-the-date.webp',
  alt: 'Tarjeta Save the date con foto de una pareja y un calendario al pie',
  width: 736,
  height: 1104,
  origin: 'lcdd-supplied',
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
    'experiencias-y-detalles-para-eventos': {
      src: '/media/categories/experiencias-y-detalles.webp',
      alt: 'Exhibidor de detalles para invitados decorado con flores y un cartel de agradecimiento',
      width: 736,
      height: 1307,
      origin: 'lcdd-supplied',
      fit: 'contain',
    },
    'kits-para-eventos': {
      src: '/media/categories/kits.webp',
      alt: 'Kit de baño con artículos etiquetados dispuestos en una bandeja',
      width: 736,
      height: 736,
      origin: 'lcdd-supplied',
      objectPosition: '50% 60%',
    },
    'souvenirs-personalizados': {
      src: '/media/categories/souvenirs-personalizados.webp',
      alt: 'Frascos de recuerdo con etiquetas florales personalizadas',
      width: 736,
      height: 981,
      origin: 'lcdd-supplied',
      objectPosition: '50% 58%',
    },
    'detalles-de-mesa': {
      src: '/media/categories/papeleria-eventos.webp',
      alt: 'Tarjeta de número de mesa con el retrato de una pareja sobre un soporte dorado',
      width: 736,
      height: 736,
      origin: 'lcdd-supplied',
      objectPosition: '50% 48%',
    },
    'invitaciones-digitales': saveTheDate,
  },
  products: {
    'P-015': [
      {
        src: '/media/products/kit-antiresaca-pillow.webp',
        alt: 'Cajas blancas con formato Pillow, ilustraciones y nombres personalizados',
        width: 1220,
        height: 1013,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
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
    'P-014': [saveTheDate],
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
        src: '/media/products/vasos-personalizados.webp',
        alt: 'Vasos blancos con sorbetes y nombres personalizados',
        width: 1220,
        height: 1484,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-004': [
      {
        src: '/media/products/abanicos-personalizados.webp',
        alt: 'Abanicos rectangulares con diseño floral, nombres y mango de madera',
        width: 1220,
        height: 1620,
        origin: 'lcdd-supplied',
        fit: 'contain',
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
        src: '/media/products/espejitos-personalizados.webp',
        alt: 'Cuatro espejitos redondos con nombres y motivos florales rojos',
        width: 1220,
        height: 1206,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-011': [
      {
        src: '/media/products/carpa-qr.webp',
        alt: 'Dos tarjetas de mesa plegadas con códigos QR y diseño floral azul',
        width: 1197,
        height: 1457,
        origin: 'lcdd-supplied',
        fit: 'contain',
      },
    ],
    'P-012': [
      {
        src: '/media/products/numeros-de-mesa.webp',
        alt: 'Tarjeta plegada con el número cinco y un motivo de hojas',
        width: 1207,
        height: 1213,
        origin: 'lcdd-supplied',
        fit: 'contain',
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

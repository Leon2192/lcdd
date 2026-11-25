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
export const visualAssets: {
  logo: LocalImage | null
  home: Partial<Record<HomeMediaSlot, LocalImage>>
  categories: Partial<Record<CategoryId, LocalImage>>
  products: Partial<Record<ProductId, readonly LocalImage[]>>
  collections: Partial<Record<CollectionId, LocalImage>>
} = {
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
      alt: 'Kits para eventos',
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
    'P-001': [
      {
        src: '/media/products/P-001/P-001_principal_01_v01.webp',
        alt: 'Kits antiresaca',
        width: 1200,
        height: 1500,
      },
    ],
    'P-002': [
      {
        src: '/media/products/P-002/P-002_principal_01_v01.webp',
        alt: 'Kits de baño',
        width: 1200,
        height: 1500,
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
        src: '/media/products/P-005/P-005_principal_01_v01.webp',
        alt: 'Lentes personalizados',
        width: 1200,
        height: 1500,
      },
    ],
    'P-006': [
      {
        src: '/media/products/P-006/P-006_principal_01_v01.webp',
        alt: 'Diarios personalizados',
        width: 1200,
        height: 1500,
      },
    ],
    'P-009': [
      {
        src: '/media/products/P-009/P-009_principal_01_v01.webp',
        alt: 'Difusores personalizados',
        width: 1200,
        height: 1500,
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
        src: '/media/products/P-013/P-013_principal_01_v01.webp',
        alt: 'Invitaciones digitales',
        width: 1200,
        height: 1500,
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

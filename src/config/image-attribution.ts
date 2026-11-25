import type { CatalogImage } from '@/data/catalog/types'

// Recursos de uso ilustrativo en el sitio.
// Registrar aquí las ilustraciones identificadas mientras estén en uso.
export const illustrativeMediaSources = new Set<string>([
  '/media/categories/detalles-de-mesa-v01.webp',
  '/media/categories/invitaciones-digitales-v01.webp',
  '/media/categories/kits-para-eventos-v01.webp',
  '/media/categories/souvenirs-personalizados-v01.webp',
  '/media/home/banner-detalles.webp',
  '/media/home/banner-combos.webp',
  '/media/home/hero-v01.webp',
  '/media/home/inspiration-1-v01.webp',
  '/media/home/inspiration-2-v01.webp',
  '/media/home/inspiration-3-v01.webp',
  '/media/products/P-001/P-001_principal_01_v01.webp',
  '/media/products/P-003/P-003_principal_01_v01.webp',
  '/media/products/P-004/P-004_principal_01_v01.webp',
  '/media/products/P-010/P-010_principal_01_v01.webp',
  '/media/products/P-011/P-011_principal_01_v01.webp',
  '/media/products/P-012/P-012_principal_01_v01.webp',
])

// Las ilustraciones anteriores se conservan en el registro. Los recursos
// entregados por LCDD, incluidos los banners, pueden mostrarse.
export function isDisplayImage<T extends Pick<CatalogImage, 'src' | 'origin'>>(
  image: T | null | undefined,
): image is T {
  return Boolean(
    image &&
    (image.origin === 'lcdd-supplied' ||
      !illustrativeMediaSources.has(image.src)),
  )
}

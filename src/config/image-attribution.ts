// Ilustraciones conservadas en el registro, fuera de las vistas comerciales y del build.
export const archivedIllustrativeMediaSources = new Set<string>([
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

export const illustrativeMediaSources = new Set([
  ...archivedIllustrativeMediaSources,
  '/media/home/banner-detalles.webp',
  '/media/home/banner-combos.webp',
])

export function isDisplayImage<T extends { src: string }>(
  image: T | null | undefined,
): image is T {
  return Boolean(image && !archivedIllustrativeMediaSources.has(image.src))
}

// Ilustraciones conservadas en el registro, fuera de las vistas comerciales y del build.
export const archivedIllustrativeMediaSources = new Set<string>([
  '/media/home/hero-v01.webp',
  '/media/home/inspiration-1-v01.webp',
  '/media/home/inspiration-2-v01.webp',
  '/media/home/inspiration-3-v01.webp',
  '/media/products/P-001/P-001_principal_01_v01.webp',
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

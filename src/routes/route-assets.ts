export class RouteAssetError extends Error {}

export async function loadRouteModule<T>(load: () => Promise<T>): Promise<T> {
  try {
    return await load()
  } catch (error) {
    if (
      error instanceof Error &&
      /failed to fetch dynamically imported module|error loading dynamically imported module|importing a module script failed|unable to preload css/i.test(
        error.message,
      )
    )
      throw new RouteAssetError('No se pudo cargar el recurso de la ruta.', {
        cause: error,
      })
    throw error
  }
}

const retryKey = 'lcdd:route-asset-retry'

export function claimAssetRetry(storage?: Storage): boolean {
  try {
    const session = storage ?? window.sessionStorage
    if (session.getItem(retryKey)) return false
    session.setItem(retryKey, '1')
    return true
  } catch {
    return false
  }
}

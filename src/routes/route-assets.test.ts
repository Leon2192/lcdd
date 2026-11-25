import { afterEach, expect, it, vi } from 'vitest'
import {
  claimAssetRetry,
  loadRouteModule,
  RouteAssetError,
} from './route-assets'

afterEach(() => window.sessionStorage.clear())

it('identifica fallos de importación sin confundirlos con errores de la página', async () => {
  const stale = new TypeError(
    'Failed to fetch dynamically imported module: /assets/old.js',
  )
  await expect(
    loadRouteModule(() => Promise.reject(stale)),
  ).rejects.toBeInstanceOf(RouteAssetError)
  const other = new Error('Fallo de aplicación')
  await expect(loadRouteModule(() => Promise.reject(other))).rejects.toBe(other)
})

it('permite un único reintento automático por pestaña y tolera almacenamiento bloqueado', () => {
  expect(claimAssetRetry()).toBe(true)
  expect(claimAssetRetry()).toBe(false)
  vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
    throw new Error('Bloqueado')
  })
  expect(claimAssetRetry()).toBe(false)
})

import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { CatalogPage } from '@/features/catalog/CatalogPage'
import { CategoryPage } from '@/features/catalog/CategoryPage'
import { ProductDetailPage } from '@/features/catalog/ProductDetailPage'
import { loadRouteModule } from './route-assets'
import { replace } from 'react-router'
import type { RouteObject } from 'react-router'
import { HomePage } from '@/features/home/HomePage'
import { navigation } from '@/config/navigation'
import { RootLayout } from '@/layouts/RootLayout'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement: <p role="status">Cargando la página…</p>,
    children: [
      ...navigation.map(({ path }): RouteObject => {
        if (path === '/arma-tu-pedido')
          return {
            path,
            lazy: async () => {
              const { OrderPage } = await loadRouteModule(
                () => import('@/features/order/OrderPage'),
              )
              return { Component: OrderPage }
            },
          }
        if (
          path === '/inspiracion' ||
          path === '/nosotros' ||
          path === '/profesionales'
        )
          return {
            path,
            lazy: async () => {
              const { EditorialPage } = await loadRouteModule(
                () => import('@/features/editorial/EditorialPage'),
              )
              const kind =
                path === '/inspiracion'
                  ? 'inspiration'
                  : path === '/nosotros'
                    ? 'about'
                    : 'professionals'
              return { element: <EditorialPage kind={kind} /> }
            },
          }
        return {
          path,
          element: path === '/' ? <HomePage /> : <CatalogPage />,
        }
      }),
      {
        path: '/cotizacion',
        loader: () => replace('/arma-tu-pedido'),
      },
      {
        path: '/catalogo/categoria/:categorySlug',
        element: <CategoryPage />,
      },
      {
        path: '/catalogo/producto/:productSlug',
        element: <ProductDetailPage />,
      },
      ...(import.meta.env.DEV
        ? [
            {
              path: '/__dev/design-system',
              lazy: async () => {
                const { DesignSystemPage } =
                  await import('@/pages/dev/DesignSystemPage')
                return { Component: DesignSystemPage }
              },
            },
          ]
        : []),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

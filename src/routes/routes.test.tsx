import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import { navigation } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { routes } from '@/routes/routes'

function renderRoute(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

describe('Rutas y estructura provisional', () => {
  it.each(navigation)(
    'resuelve $path con el título $label',
    async ({ path, label }) => {
      renderRoute(path)
      expect(
        await screen.findByRole('heading', {
          name:
            path === '/'
              ? 'Hacé de tu evento un momento único'
              : path === '/catalogo'
                ? 'Todos nuestros productos'
                : label,
          level: 1,
        }),
      ).toBeVisible()
      expect(
        screen.getByRole('navigation', { name: 'Navegación principal' }),
      ).toBeVisible()
      if (path !== '/arma-tu-pedido') {
        expect(
          within(
            screen.getByRole('navigation', { name: 'Navegación principal' }),
          ).getByRole('link', { name: label }),
        ).toHaveAttribute('aria-current', 'page')
      } else {
        expect(
          screen.getAllByRole('link', { name: label }).length,
        ).toBeGreaterThan(0)
      }
    },
  )

  it.each([
    ['/catalogo/categoria/ejemplo', 'Categoría no encontrada'],
    ['/catalogo/producto/ejemplo', 'Producto no encontrado'],
  ])('resuelve la ruta dinámica %s', (path, title) => {
    renderRoute(path)
    expect(screen.getByRole('heading', { name: title })).toBeVisible()
  })

  it('permite navegar desde inicio al catálogo', async () => {
    const user = userEvent.setup()
    const router = renderRoute()
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Navegación principal' }),
      ).getByRole('link', { name: 'Catálogo' }),
    )
    expect(router.state.location.pathname).toBe('/catalogo')
    expect(
      screen.getByRole('heading', { name: 'Todos nuestros productos' }),
    ).toBeVisible()
  })

  it('permite recuperar una dirección inexistente', async () => {
    const user = userEvent.setup()
    renderRoute('/no-existe')
    expect(
      screen.getByRole('heading', { name: 'Página no encontrada' }),
    ).toBeVisible()
    await user.click(screen.getByRole('link', { name: 'Volver al inicio' }))
    expect(
      screen.getByRole('heading', {
        name: 'Hacé de tu evento un momento único',
        level: 1,
      }),
    ).toBeVisible()
  })

  it('muestra contactos oficiales y habilita el acceso internacional con una acción explícita', async () => {
    renderRoute()
    expect(
      screen.getByRole('link', { name: siteConfig.contact.email }),
    ).toHaveAttribute('href', `mailto:${siteConfig.contact.email}`)
    expect(
      screen.getByRole('button', {
        name: `WhatsApp: ${siteConfig.contact.whatsapp.displayNumber}`,
      }),
    ).toBeVisible()
    const user = userEvent.setup()
    await user.click(
      screen.getByRole('button', {
        name: `WhatsApp: ${siteConfig.contact.whatsapp.displayNumber}`,
      }),
    )
    expect(
      screen.getByRole('link', { name: 'Conversar por WhatsApp' }),
    ).toHaveAttribute(
      'href',
      `https://wa.me/${siteConfig.contact.whatsapp.internationalNumber}`,
    )
  })
  it('ofrece la demo solo como ruta de desarrollo y fuera de la navegación comercial', async () => {
    renderRoute('/__dev/design-system')
    expect(
      await screen.findByRole('heading', {
        name: 'Biblioteca visual',
        level: 1,
      }),
    ).toBeVisible()
    expect(
      screen.queryByRole('link', { name: 'Sistema de diseño' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getAllByText('Fotografía pendiente de validación').length,
    ).toBeGreaterThan(0)
  })
})

import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { EditorialPage } from './EditorialPage'
import { catalog, getProduct, getProductPath } from '@/data/catalog/catalog'
import { siteConfig } from '@/config/site'

function visit(kind: 'inspiration' | 'about' | 'professionals') {
  render(
    <MemoryRouter>
      <EditorialPage kind={kind} />
    </MemoryRouter>,
  )
}
describe('Páginas editoriales V1.0', () => {
  it('conecta cada colección conceptual con los productos originales sin ofrecer combos', () => {
    visit('inspiration')
    for (const collection of catalog.collections) {
      const section = screen.getByRole('region', { name: collection.name })
      expect(
        within(section).getByRole('heading', { level: 2 }),
      ).toHaveTextContent(collection.name)
      for (const id of collection.productIds) {
        const product = getProduct(id)
        if (!product) throw new Error('Producto relacionado inexistente')
        expect(
          within(section).getByRole('link', {
            name: (name) => name.includes(product.name),
          }),
        ).toHaveAttribute('href', getProductPath(product))
      }
    }
    expect(
      screen.getByText(/elegí los productos que quieras combinar/),
    ).toBeVisible()
    expect(
      screen.queryByText(/aprobadas|propuesta conceptual/i),
    ).not.toBeInTheDocument()
  })
  it.each(['about', 'professionals'] as const)(
    'mantiene el recorrido comercial de %s sin mostrar estados editoriales',
    (kind) => {
      visit(kind)
      expect(
        screen.queryByText(
          /contenido editorial propuesto|pendiente de validación/i,
        ),
      ).not.toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(
        screen.getByRole('link', { name: 'Armá tu pedido' }),
      ).toHaveAttribute('href', '/arma-tu-pedido')
      expect(
        screen.getByRole('link', { name: /Explorá el catálogo/ }),
      ).toHaveAttribute('href', '/catalogo')
      expect(screen.queryByText(/Estamos preparando esta sección/)).toBeNull()
    },
  )
  it('ofrece consulta profesional contextualizada al número aprobado solo como enlace explícito', () => {
    visit('professionals')
    const link = screen.getByRole('link', { name: 'Consultanos por WhatsApp' })
    const url = new URL(link.getAttribute('href') ?? '')
    expect(url.pathname).toBe(
      '/' + siteConfig.contact.whatsapp.internationalNumber,
    )
    expect(url.searchParams.get('text')).toContain('soy profesional de eventos')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})

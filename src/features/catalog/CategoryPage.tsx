import { Icon } from '@/components/ui/Icon'
import { ProductGrid } from '@/components/ui/ProductGrid'
import { useParams, useSearchParams } from 'react-router'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { getCategory, getCategoryProducts } from '@/data/catalog/catalog'
import { CategoryNavigation, CatalogMissing } from './components/CatalogShared'
const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
export function CategoryPage() {
  const { categorySlug = '' } = useParams()
  const [params, setParams] = useSearchParams()
  const category = getCategory(categorySlug)
  if (!category) return <CatalogMissing kind="Categoría" />
  const query = params.get('q') ?? ''
  const products = getCategoryProducts(category.id).filter((product) =>
    normalize(product.name).includes(normalize(query.trim())),
  )
  return (
    <div className="container-lcdd catalog-page">
      <Breadcrumbs
        items={[
          { label: 'Inicio', to: '/' },
          { label: 'Catálogo', to: '/catalogo' },
          { label: category.name },
        ]}
      />
      <header className="catalog-heading">
        <p className="eyebrow">Nuestro catálogo</p>
        <h1>{category.name}</h1>
      </header>
      <div className="catalog-layout">
        <CategoryNavigation />
        <section
          className="catalog-results"
          aria-labelledby="category-products"
        >
          <h2 id="category-products">Productos de esta categoría</h2>
          <div className="catalog-search">
            <span className="catalog-search-icon">
              <Icon name="search" />
            </span>
            <Input
              type="search"
              label="Buscar en esta categoría"
              placeholder="Buscá un producto por su nombre"
              value={query}
              onChange={(event) => {
                const next = new URLSearchParams(params)
                if (event.target.value) next.set('q', event.target.value)
                else next.delete('q')
                setParams(next, { replace: true })
              }}
            />
          </div>
          {products.length ? (
            <div
              className={products.length <= 2 ? 'catalog-small-selection' : ''}
            >
              <ProductGrid products={products} />
            </div>
          ) : (
            <EmptyState
              headingAs="h3"
              title="No encontramos productos"
              description="Probá con otro nombre."
              action={
                <Button onClick={() => setParams({})}>Limpiar búsqueda</Button>
              }
            />
          )}
        </section>
      </div>
    </div>
  )
}

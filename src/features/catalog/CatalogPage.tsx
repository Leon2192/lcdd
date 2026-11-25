import { ProductGrid } from '@/components/ui/ProductGrid'
import { Link, useSearchParams } from 'react-router'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import {
  catalog,
  getCategoryPath,
  getCategoryProducts,
} from '@/data/catalog/catalog'
export function CatalogPage() {
  const [params, setParams] = useSearchParams()
  const selected = params.getAll('categoria')
  const visible = catalog.categories.filter(
    (category) => !selected.length || selected.includes(category.id),
  )
  function toggle(id: string) {
    const next = new URLSearchParams(params)
    next.delete('categoria')
    const values = selected.includes(id)
      ? selected.filter((value) => value !== id)
      : [...selected, id]
    values.forEach((value) => next.append('categoria', value))
    setParams(next)
  }
  return (
    <div className="container-lcdd catalog-page">
      <Breadcrumbs
        items={[{ label: 'Inicio', to: '/' }, { label: 'Catálogo' }]}
      />
      <header className="catalog-heading">
        <p className="eyebrow">Detalles para compartir</p>
        <h1>Todos nuestros productos</h1>
        <p>Explorá las cinco categorías de La Casa del Detalle.</p>
      </header>
      <div className="catalog-layout">
        <aside className="catalog-sidebar">
          <details className="catalog-filter-disclosure" open>
            <summary>Filtrar categorías</summary>
            <fieldset>
              <legend>Filtrar por categoría</legend>
              {catalog.categories.map((category) => (
                <Checkbox
                  key={category.id}
                  label={category.name}
                  checked={selected.includes(category.id)}
                  onChange={() => toggle(category.id)}
                />
              ))}
            </fieldset>
          </details>
          {selected.length > 0 && (
            <Button variant="ghost" onClick={() => setParams({})}>
              Limpiar filtros
            </Button>
          )}
        </aside>
        <div className="catalog-results" aria-live="polite">
          {visible.length ? (
            visible.map((category) => (
              <section
                className="catalog-group"
                key={category.id}
                aria-labelledby={`category-${category.id}`}
              >
                <header className="catalog-group-heading">
                  <h2 id={`category-${category.id}`}>{category.name}</h2>
                  <Link to={getCategoryPath(category.id)}>Ver categoría</Link>
                </header>
                <ProductGrid products={getCategoryProducts(category.id)} />
              </section>
            ))
          ) : (
            <EmptyState
              title="No hay productos para estos filtros"
              description="Probá con otra categoría."
              action={
                <Button onClick={() => setParams({})}>Limpiar filtros</Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  )
}
